import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/lib/models/room";
import { verifyToken } from "@/lib/auth";

const GET = async (req) => {
    await dbConnect();

    try {
        const token = req.cookies.get("token")?.value;
    
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        const room_id = req.headers.get("x-room-id");
        if (!room_id)
            return NextResponse.json({ message: "Room ID missing" }, { status: 400 });

        const room = await Room.findOne({ _id: room_id });
        if (!room)
            return NextResponse.json({ message: "No room found" }, { status: 404 });

        const isEnabled = room.enable_user.some(
            (u) => u.id === user.id && u.role === user.role
        );

        if (!isEnabled) {
            return NextResponse.json({ message: "Access denied" }, { status: 403 });
        }

        return NextResponse.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

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
            {_id: room_id},
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
