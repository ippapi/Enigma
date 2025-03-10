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
        const room = await Room.findOne({room_id: room_id}).sort({timestamp: 1}); // Query for matching room

        if(!room)
            return NextResponse.json({message: "No room found"}, {status: 404});

        return NextResponse.json(room); // Response found room
    }catch(error){
        return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Response if error
    }
};

// POST METHOD: Post new messages to database
const POST = async (req) => {
    // Ensure connected to database
    await dbConnect();

    try {
        const body = await req.json();
        const { room_id, senderId, senderName, message } = body; // Parsing input

        // Handle empty message
        if(!message)
            return NextResponse.json({message: "Please say something hahaha!"});

        // Response if room, user is not found
        if (!room_id || !senderId)
            return NextResponse.json({ error: "Missing info" }, { status: 400 });

        const new_message = {senderId: senderId, senderName: senderName, message: message};

        // Save new message to database
        const result = await Room.updateOne(
            {id: room_id},
            {$push: {messages: new_message}}
        );

        // Handle not found room_id
        if(result.modifiedCount === 0)
            return NextResponse.json({message: "No matching document found"});

        return NextResponse.json(result); // Response write to db result
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 }); // Response if error
    }
};

export {GET, POST};