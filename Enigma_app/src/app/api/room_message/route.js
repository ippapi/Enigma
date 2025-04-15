/* 
    Message route: Create POST, GET method to handle display room chat

    - GET method: Send room info to client sides
        + input: 
        + output: Response found room to client sides

    - POST method: Send message to server side and save in room
        + input: {user, message, room_id}: user info, message and which room they send
        + output: Response result of write room change to database
*/

import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/lib/models/room";

// GET METHOD: Get old messages from database
const GET = async (req) => {
    await dbConnect(); // Create connection
    try {
        const room_id = req.headers.get("x-room-id");
        if (!room_id)
            return NextResponse.json({ message: "Room ID missing" }, { status: 400 });

        const room = await Room.findOne({ _id: room_id });
        if (!room)
            return NextResponse.json({ message: "No room found" }, { status: 404 });

        return NextResponse.json(room); // Response found room
    }catch(error){
        return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Response if error
    }
};