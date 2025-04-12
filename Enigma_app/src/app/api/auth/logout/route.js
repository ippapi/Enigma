/* 
    logout route: Handle logout request by clear jwt token
    
    - input:

    - output: Response with cookie with no token
*/

import bcrypt from "bcryptjs";
import User from "@models/user";
import dbConnect from "@lib/dbConnect";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const POST = async (req) => {
    await dbConnect();

    try {
        const refreshToken = req.cookies.get("refreshToken")?.value;
        if (!refreshToken)
            return NextResponse.json({ error: "No refresh token" }, { status: 401 });
        
        const decoded = await verifyToken(refreshToken);
        if (!decoded)
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });

        const user = await User.findOne({ _id: decoded.id });
        if (!user || !user.refreshToken)
            return NextResponse.json({ error: "User not found" }, { status: 403 });

        const isTokenValid = await bcrypt.compare(refreshToken, user.refreshToken);
        if (!isTokenValid)
            return NextResponse.json({ error: "Invalid refresh token" }, { status: 403 });

        user.refreshToken = "";
        await user.save();

        const response = NextResponse.json({ message: "Logged out successfully" });
        response.cookies.delete("token");
        response.cookies.delete("refreshToken");

        return response;
    } catch (error) {
        console.error("Logout Error:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
};

export { POST };
