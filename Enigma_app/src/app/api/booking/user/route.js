/* 
    API routes for tarot reader booking management
*/

import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/booking";
import Room from "@/lib/models/room";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

const GET = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        let bookings = await Booking.find({ user: userId, status });
        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const POST = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;

        const { reader, time, duration, notes } = await req.json();
        
        const booking = await Booking.create({ user: userId, reader, time, duration, notes, status: "PENDING" });
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PUT = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;
        
        const { bookingId, status, time, duration } = await req.json();
        const booking = await Booking.findOne({ _id: bookingId, user: userId });
        if (!booking) {
            return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
        }

        const validStatusTransitions = {
            RESCHEDULED: ["SCHEDULED"],
            SCHEDULED: ["COMPLETED", "CANCELED"],
        };

        if (status && validStatusTransitions[booking.status]?.includes(status)) {
            booking.status = status;
        } else if (status) {
            return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
        }

        if (time) booking.time = time;
        if (duration) booking.duration = duration;

        if (status === "SCHEDULED") {
            const userInfo = await User.findById(booking.user);
            const readerInfo = await User.findById(booking.reader);

            const room = await Room.create({
                id: uuidv4(),
                status: "ACTIVE",
                enable_user: [
                    { id: booking.user.toString(), name: userInfo?.name || "User", role: userInfo?.role },
                    { id: booking.reader.toString(), name: readerInfo?.name || "Reader", role: readerInfo?.role }
                ],
                messages: []
            });

            booking.room = room.id;
        }

        await booking.save();

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const DELETE = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;
        
        const { bookingId } = await req.json();
        const booking = await Booking.findOne({ _id: bookingId, user: userId, status: "PENDING" });
        if (!booking) {
            return NextResponse.json({ error: "Pending booking not found or unauthorized" }, { status: 404 });
        }
        
        await booking.deleteOne();
        return NextResponse.json({ message: "Booking deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, POST, PUT, DELETE};
