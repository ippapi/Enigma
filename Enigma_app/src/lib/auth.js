/* 
    Define functions to generate jwt token and verify that token

    - generateToken: Create jwt token from loged in user's info
        + input: user: loged in user's info
        + output: created jwt token

    - verifyToken: Verify input token if it match with created one
        + input: token: jwt token
        + output: decoded jwt token

*/

import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
if (!SECRET_KEY || SECRET_KEY.length < 32) {
    throw new Error("JWT_SECRET must be at least 32 characters long.");
}
const secret = new TextEncoder().encode(SECRET_KEY); 

// Generate JWT Token
const generateToken = async (user, time) => {
    const payload = {
        id: user._id,
        email: user.email,
        name: user.username,
        role: user.role,
    }
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(time)
        .sign(secret);
};

// Verify JWT Token
const verifyToken = async (token) => {
    try {
        const { payload } = await jwtVerify(token, secret, {
            algorithms: ['HS256'],
        });
        return payload;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { generateToken, verifyToken };