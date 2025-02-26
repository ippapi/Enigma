/* 
    Message route: Create POST, GET method to handle display and send message between users

    - GET method: Send message to client sides
        + input: 
        + output: Response found messeges to client sides

    - POST method: Send message to server side and save in database
        + input: {user, message}: user info and message they send
        + output: Response result of write message to database

    - output: 
*/

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/lib/models/messages";

// GET METHOD: Get old messages from database
const GET = async () => {
    await dbConnect(); // Create connection
    const messages = await Message.find().sort({timestamp: 1}); // Query for any message
    return NextResponse.json(messages); // Response found messages
};

// POST METHOD: Post new messages to database
const POST = async (req) => {
    // Ensure connected to database
    await dbConnect();

    try {
        // Get {username, password}
        const body = await req.json();
        const { user, message } = body; // Parsing input

        // Response if user or message is not found
        if (!user || !message) {
            return NextResponse.json({ error: "Missing user or message" }, { status: 400 });
        }

        // Save {user, message} to database
        const newMessage = await Message.create({ user: user, message: message });

        return NextResponse.json(newMessage); // Response write to db result
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Response if error
    }
};

export {GET, POST};