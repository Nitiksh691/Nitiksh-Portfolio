import { NextResponse } from "next/server";

// Simple in-memory rate limiter for local dev
// In production, use Redis or a DB collection
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") || "local";
  const now = Date.now();

  // Rate limiting check
  const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };
  if (now - rateData.lastReset > RATE_LIMIT_WINDOW) {
    rateData.count = 0;
    rateData.lastReset = now;
  }

  if (rateData.count >= MAX_ATTEMPTS) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  rateData.count++;
  rateLimitMap.set(ip, rateData);

  try {
    const body = await request.json();
    const answers = Array.isArray(body?.answers) ? body.answers : [];

    // Prefer environment variables if set; fall back to fixed answers so deployments don't break
    // Make sure your Vercel env names are exactly ADMIN_Q1_ANSWER and ADMIN_Q2_ANSWER (case-sensitive)
    const q1 = (process.env.ADMIN_Q1_ANSWER || "2025").toString().trim().toLowerCase();
    const q2 = (process.env.ADMIN_Q2_ANSWER || "nitiksh").toString().trim().toLowerCase();

    const a1 = (answers[0] ?? "").toString().trim().toLowerCase();
    const a2 = (answers[1] ?? "").toString().trim().toLowerCase();

    if (a1 === q1 && a2 === q2) {
      // create a NextResponse and attach the cookie to it so the browser receives Set-Cookie
      const res = NextResponse.json({ success: true });
      res.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });

      return res;
    }

    return NextResponse.json({ error: "Incorrect answers. Access denied." }, { status: 401 });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("/api/admin/verify error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
