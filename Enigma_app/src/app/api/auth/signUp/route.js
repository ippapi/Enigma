/* 
    signUp route: Create POST method to handle sign up request and create jwt token
    
    - input: {name, username, email, password}: sign up info

    - output: Create use and response cookie contain created token
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
        // Check for required field in register form
        const { name, username, email, password } = await req.json(); // Parsing fields from form
        if (!name || !username || !email || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 }); // Response if one field is missing

        // Check if email, username existed
        const existedUser = await User.findOne({ $or: [{email}, {username}] }); // Query for user match email or username
        if (existedUser){
            const errorMessage = existedUser.username === username ? "Username already taken" : "Email already used";
            return NextResponse.json({ error: errorMessage }, { status: 401 }); // Response if username or password used
        } 

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Write user to db
        const user = await User.create({
            name: name,
            username: username,
            email: email,
            password: hashedPassword
        });

        // Generate token
        const token = generateToken(user);

        // Create response with token saved in cookie
        const response = NextResponse.json({ message: "Sign up successful" });
        response.cookies.delete("token"); 
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/"
        });
        
        return response;
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 }); // Response if got error
    }
};

export { POST };
