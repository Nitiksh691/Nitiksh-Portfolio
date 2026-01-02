import { NextResponse } from "next/server";
import { cookies } from "next/headers";

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
        const { answers } = await request.json();

        // Validate answers against environment variables
        const q1 = process.env.ADMIN_Q1_ANSWER || "typescript";
        const q2 = process.env.ADMIN_Q2_ANSWER || "2025";
        const q3 = process.env.ADMIN_Q3_ANSWER || "adarsh";

        if (
            answers[0]?.toLowerCase() === q1.toLowerCase() &&
            answers[1]?.toLowerCase() === q2.toLowerCase() &&
            answers[2]?.toLowerCase() === q3.toLowerCase()
        ) {
            // Success - set cookie
            const cookieStore = await cookies();
            cookieStore.set("admin_session", "authenticated", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 1 day
                path: "/",
            });

            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Incorrect answers. Access denied." }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
