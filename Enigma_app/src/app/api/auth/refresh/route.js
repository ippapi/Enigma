import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import { verifyToken, generateToken } from "@lib/auth";
import { NextResponse } from "next/server";
import User from "@/lib/models/user";

const POST = async (req) => {
    console.log("[DEBUG] Refresh API called!");
    await dbConnect();

    try {
        // Get refresh token from cookies
        const refreshToken = req.cookies.get("refreshToken")?.value;

        if (!refreshToken)
            return NextResponse.json({ error: "Refresh token missing" }, { status: 401 });

        // Verify refresh token
        const decoded = await verifyToken(refreshToken);
        if (!decoded)
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });

        const user = await User.findOne({_id: decoded.id});

        if (!user || !user.refreshToken)
            return NextResponse.json({ error: "Refresh token not found" }, { status: 403 });

        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid)
            return deleteToken("Invalid refresh token");

        const newToken = await generateToken(user, "1h");
        const newRefreshToken = await generateToken(user, "24h");

        user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
        await user.save();

        // Create response with updated token
        const response = NextResponse.json({ message: "Token refreshed" });
        response.cookies.delete("token"); // Delete old token
        response.cookies.delete("refreshToken"); // Delete old refreshToken
        response.cookies.set("token", newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/",
            maxAge: 3600,
        });
        response.cookies.set("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "none",
            path: "/",
            maxAge: 86400,
        });

        return response;
    } catch (error) {
        console.error("Refresh Token Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};

const deleteToken = (errorMessage) => {
    const response = NextResponse.json({ error: errorMessage }, { status: 401 });
    response.cookies.delete("token");
    response.cookies.delete("refreshToken");
    return response;
};

export { POST };
