/* 
    Define functions to generate jwt token and verify that token

    - generateToken: Create jwt token from loged in user's info
        + input: user: loged in user's info
        + output: created jwt token

    - verifyToken: Verify input token if it match with created one
        + input: token: jwt token
        + output: decoded jwt token

*/

import jwt from "jsonwebtoken";

export const config = {
    runtime: "nodejs",
};

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Generate JWT Token
const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
};

// Verify JWT Token
const verifyToken = (token) => {
    try{
        return jwt.verify(token, SECRET_KEY);
    }catch(error){
        return null;
    }
};

export { generateToken, verifyToken };