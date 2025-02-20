import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Message from "@/models/messages";

// GET METHOD: Get old messages from database
const GET = async () => {
    await dbConnect(); // Create connection
    const messages = await Message.find().sort({timestamp: 1});
    return NextResponse.json(messages);
};

// POST METHOD: Post new messages to database
const POST = async (req) => {
    await dbConnect(); // Create connection

    try {
        // Get body data
        const body = await req.json();
        const { user, message } = body;

        if (!user || !message) {
            return NextResponse.json({ error: "Missing user or message" }, { status: 400 });
        }

        // Save messages to database
        const newMessage = await Message.create({ user, message });

        return NextResponse.json(newMessage);
    } catch (error) {
        // Debugging
        console.error("Error processing POST request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export {GET, POST};