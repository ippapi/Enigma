/* 
    login route: Create GET method to get user info from jwt token
    
    - input:

    - output: Response decodee info from jwt token in cookie
*/

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
    runtime: "nodejs",
};

// Get JWT_SECRET key
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

const GET = async (req) => {
    try {
        // Get jwt token from cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        // Response if not found token
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Decode jwt token
        const decoded = jwt.verify(token, SECRET_KEY);
        return NextResponse.json({ user: decoded }, { status: 200 }); // Response decoded info
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 403 }); // Response if got error
    }
};

export { GET };
