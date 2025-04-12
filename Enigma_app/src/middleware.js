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

    const { pathname } = req.nextUrl;
    const method = req.method; // GET, POST, etc.

    // **Public Routes (No authentication needed)**
    const publicRoutes = ["/", "/product"];
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // **Public API Routes (No authentication needed for GET)**
    if (pathname.startsWith("/api/product") && method === "GET") {
        return NextResponse.next();
    }

    if (req.nextUrl.pathname === "/api/auth/refresh") {
        return NextResponse.next();
    }

    let user;
    if (!token && refreshToken) {
        console.log("No access token found, trying refresh...");
        const refreshedResponse = await refreshAccessToken(refreshToken, req.url);
        if (refreshedResponse) return refreshedResponse;
    }
    
    if (token) {
        try {
            user = await verifyToken(token);
        } catch (error) {
            console.log("Token expired, attempting refresh...");
            if (refreshToken) {
                const refreshedResponse = await refreshAccessToken(refreshToken, req.url);
                if (refreshedResponse) return refreshedResponse;
            }
            return NextResponse.redirect(new URL("/auth", req.url));
        }
    }

    // **Protected User Routes (Requires Authentication)**
    const protectedUserRoutes = [
        "/booking",
        "/api/booking/user",
        "/cart",
        "/api/cart",
        "/room",
        "/api/room",
        "/profile",
        "/api/user"
    ];
    if (protectedUserRoutes.some((route) => pathname.startsWith(route))) {
        if (!user) {
            const isApi = pathname.startsWith('/api')
            if (isApi) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 })
            } else {
            return unauthorizedResponse() // redirect
            }
        }
    }      

    // **Protected Reader Routes (Requires "READER" Role)**
    const protectedReaderRoutes = [
        "/booking",
        "/api/booking/reader",
        "/room",
        "/api/room",
        "/profile",
    ];
    if (protectedReaderRoutes.some((route) => pathname.startsWith(route))) {
        if (!user || (user.role !== "READER" && user.role !== "ADMIN")) {
            return unauthorizedResponse();
        }
    }

    // **Protected Admin Routes (Requires "ADMIN" Role)**
    const protectedAdminRoutes = ["/admin", "/api/admin", "/api/user/promote"];
    if (protectedAdminRoutes.some((route) => pathname.startsWith(route))) {
        if (!user || user.role !== "ADMIN") return unauthorizedResponse();
    }

    // **Protect Specific Methods for Admins**
    if (pathname.startsWith("/api/product")) {
        if (
            (method === "POST" && pathname === "/api/product") || // Restrict POST /api/product
            (["PUT", "DELETE"].includes(method) && pathname.match(/^\/api\/product\/\w+$/)) // Restrict PUT, DELETE /api/product/[product_id]
        ) {
            if (!user || user.role !== "ADMIN") return unauthorizedResponse();
        }
    }

    if (pathname === "/api/tarotCart" && method === "POST") {
        if (!user || user.role !== "ADMIN") return unauthorizedResponse();
    }

    return NextResponse.next();
}

// Function to refresh token
const refreshAccessToken = async (refreshToken, reqUrl) => {
    try {
        const refreshResponse = await fetch(new URL("/api/auth/refresh", reqUrl), {
            method: "POST",
            headers: { cookie: `refreshToken=${refreshToken}` },
            credentials: "include",
        });

        if (!refreshResponse.ok) return clearTokensAndRedirect(reqUrl);

        const setCookieHeader = refreshResponse.headers.get("set-cookie");
        const newToken = setCookieHeader?.match(/token=([^;]+)/)?.[1];

        if (!newToken) return clearTokensAndRedirect(reqUrl);

        const response = NextResponse.next();
        response.cookies.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 3600,
        });

        return response;
    } catch (error) {
        return clearTokensAndRedirect(reqUrl);
    }
};

// Function to clear tokens and redirect
const clearTokensAndRedirect = (reqUrl) => {
    const response = NextResponse.redirect(new URL("/auth", reqUrl));
    response.cookies.set("token", "", { expires: new Date(0) });
    response.cookies.set("refreshToken", "", { expires: new Date(0) });
    return response;
};

// Function to return unauthorized response
const unauthorizedResponse = () => {
    return NextResponse.redirect(new URL("/auth", process.env.NEXT_PUBLIC_SOCKET_URL));
};
// Middleware Matcher Configuration
export const config = {
    matcher: ["/api/:path*", "/admin/:path*", "/booking/:path*", "/cart/:path*", "/room/:path*", "/profile/:path*"]
};
