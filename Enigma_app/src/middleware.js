/* 
    Middleware to protect site, help routing when and when not authorized

    - input: routing request

    - output: Redirect if routing request match with cases
*/

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

export function middleware(req) {
    const url = req.nextUrl;
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
        ?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

    // Redirect logged-in users away from /login
    if (token && url.pathname === "/auth") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Protect specified pages
    const protectedPages = ["/chat"];
    if (protectedPages.includes(url.pathname)) {
        if (!token) {
            return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to auth page
        }

        try {
            // Verify jwt token
            if(verifyToken(token, SECRET_KEY))
                return NextResponse.next(); // Redirect to the next page
        } catch (error) {
            console.error("JWT Verification Error:", error);
            return NextResponse.redirect(new URL("/auth", req.url)); // Redirect to auth page
        }
    }

    return NextResponse.next();
}

// Apply middleware to protected routes and login page
export const config = {
    matcher: ["/api/protected/:path*", "/chat", "/auth"],
};
