/* 
    login route: Create POST method to handle login request and create jwt token
    
    - input: {username, password}: username, password from login form

    - output: Response with cookie contains created token
*/

import bcrypt from "bcryptjs";
import User from "@models/user";
import dbConnect from "@lib/dbConnect";
import { generateToken } from "@lib/auth";
import { NextResponse } from "next/server";

const POST = async (req) => {
    // Ensure connected to database
    await dbConnect();

    try {
        // Check for username, password in login form
        const { username, password } = await req.json(); // Parsing username, password from form
        if (!username || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 }); // Response if username or password is missing

        // Search for user with input username
        const user = await User.findOne({ username }); // Query from database with username
        if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }); // Response if found no user

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password); // Compare hashed input password with hashed user password 
        if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 }); // Response if not match

        // Generate jwt token
        const token = await generateToken(user, "1h");
        const refreshToken = await generateToken(user, "24h");

        user.refreshToken = await bcrypt.hash(refreshToken, 10);
        await user.save();

        // Create response with token saved in cookie
        const response = NextResponse.json({ message: "Login successful" });
        response.cookies.delete("token"); // Delete old token
        response.cookies.delete("refreshToken"); // Delete old refreshToken
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 3600,

        });
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 86400,
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 }); // Response if got error
    }
};

export { POST };