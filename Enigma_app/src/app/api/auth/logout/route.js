/* 
    logout route: Handle logout request by clear jwt token
    
    - input:

    - output: Response with cookie with no token
*/

import { NextResponse } from "next/server";

const POST = () => {
    // Clear token by asign an expired token
    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.set("token", "", { expires: new Date(0), path: "/" }); // Expire immediately

    return response;
};

export { POST };
