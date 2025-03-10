/* 
    Middleware to protect site, help routing when and when not authorized

    - input: routing request

    - output: Redirect if routing request match with cases
*/

import { NextResponse } from "next/server";
import { verifyToken } from "./lib/auth";

export async function middleware(req) {
    const url = req.nextUrl;
    const cookieHeader = req.headers.get("cookie");

    // Extract token and refreshToken from cookies
    const token = cookieHeader?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];

    const refreshToken = cookieHeader?.split("; ")
        .find((c) => c.startsWith("refreshToken="))
        ?.split("=")[1];

    if (!token && refreshToken) {
        const refreshResponse = await fetch(new URL("/api/auth/refresh", req.url), {
            method: "POST",
            credentials: "include",
            headers: { cookie: `refreshToken=${refreshToken}` },
        });
    
        if (!refreshResponse.ok) {
            console.log("Refresh token invalid");
            return null; // Refresh failed
        }

        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        const newToken = setCookieHeader?.match(/token=([^;]+)/)?.[1];

        const response = NextResponse.redirect(new URL("/", req.url));
        response.cookies.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response; // Return updated response
    }

    // Redirect logged-in users away from /auth
    if (token && url.pathname === "/auth") {
        return NextResponse.redirect(new URL("/", req.url));
    }

    // Protected pages (Require authentication)
    const protectedPages = ["/chat", "/admin"];
    if (protectedPages.includes(url.pathname)) {
        try {
            let decoded;
            try {
                decoded = await verifyToken(token);
            } catch (error) {
                console.log("Token expired, attempting to refresh...");
                decoded = null;
            }

            if (!decoded || refreshToken) {
                const refreshed = await attemptTokenRefresh(refreshToken, req.url);
                if (refreshed) return refreshed;
            }

            // Check if user is an admin for admin routes
            if (url.pathname.startsWith("/admin") && decoded.role !== "admin") {
                return NextResponse.redirect(new URL("/auth", req.url));
            }

            return NextResponse.next(); // Proceed to the next request
        } catch (error) {
            return NextResponse.redirect(new URL("/auth", req.url));
        }
    }

    return NextResponse.next(); // Allow request to continue
}

// Function to attempt token refresh
const attemptTokenRefresh = async (refreshToken, reqUrl) => {
    try {
        const refreshResponse = await fetch(new URL("/api/auth/refresh", reqUrl), {
            method: "POST",
            headers: { cookie: `refreshToken=${refreshToken}` },
            credentials: "include",
        });

        if (!refreshResponse.ok) {
            console.log("Refresh token invalid, clearing cookies...");
            return clearTokensAndRedirect(reqUrl);
        }

        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        const newToken = setCookieHeader?.match(/token=([^;]+)/)?.[1];

        if (!newToken) {
            console.log("No new token returned, clearing cookies...");
            return clearTokensAndRedirect(reqUrl);
        }

        const response = NextResponse.next();
        response.cookies.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });

        return response;
    } catch (error) {
        console.error("Token refresh error:", error);
        return clearTokensAndRedirect(reqUrl);
    }
};

const clearTokensAndRedirect = (reqUrl) => {
    const response = NextResponse.redirect(new URL("/auth", reqUrl));

    response.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0), // Force expiration
    });

    response.cookies.set("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: new Date(0), // Force expiration
    });

    return response;
};

// Apply middleware to protected routes and login page
export const config = {
    matcher: [
        "/api/protected/:path*", 
        "/api/admin/:path*", 
        "/admin/:path*", 
        "/chat", 
        "/auth"
    ],
};
