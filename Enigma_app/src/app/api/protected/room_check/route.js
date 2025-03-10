import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Room from "@/lib/models/room";
import { verifyToken } from "@/lib/auth";  // Ensure token verification

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

        const room = await Room.findOne({ id: room_id });
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

export { GET };
