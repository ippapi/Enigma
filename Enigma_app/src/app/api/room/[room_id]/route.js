import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/lib/models/room";
import { verifyToken } from "@/lib/auth";

const GET = async (req, { params }) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }

        const { roomId } = await params;
        if (!roomId) return NextResponse.json({ message: "Room ID missing" }, { status: 400 });

        const room = await Room.findOne({ id: roomId, status: "ACTIVE" });
        if (!room) return NextResponse.json({ message: "No room found" }, { status: 404 });

        const isEnabled = room.enable_user.some((u) => u.id === user.id);
        if (!isEnabled) return NextResponse.json({ message: "Access denied" }, { status: 403 });

        return NextResponse.json(room);
    } catch (error) {
        console.error("Error fetching room:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

const POST = async (req, { params }) => {
    await dbConnect();
    try {
        const body = await req.json();
        const { senderId, senderName, message } = body;
        const { roomId } = await params;

        if (!roomId || !senderId || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const result = await Room.updateOne(
            { id: roomId, status: "ACTIVE" },
            { $push: { messages: { senderId, senderName, message, createdAt: new Date() } } }
        );

        if (result.modifiedCount === 0)
            return NextResponse.json({ message: "No matching room found" }, { status: 404 });

        return NextResponse.json({ message: "Message sent" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

const PATCH = async (req, { params }) => {
    await dbConnect();
    try {
        const { roomId } = await params;
        if (!roomId) return NextResponse.json({ message: "Room ID missing" }, { status: 400 });

        const result = await Room.updateOne({ id: roomId }, { $set: { status: "CLOSED" } });
        if (result.modifiedCount === 0)
            return NextResponse.json({ message: "No matching room found" }, { status: 404 });

        return NextResponse.json({ message: "Room closed" });
    } catch (error) {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
};

export {GET, POST, PATCH};

