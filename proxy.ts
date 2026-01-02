import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except the challenge page and verification API
    if (pathname.startsWith("/admin") && pathname !== "/admin/challenge") {
        const session = request.cookies.get("admin_session");

        if (!session || session.value !== "authenticated") {
            // Redirect to challenge page
            return NextResponse.redirect(new URL("/admin/challenge", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
