/* 
    API routes for tarot reader booking management
*/

import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/booking";
import Room from "@/lib/models/room";
import User from "@/lib/models/user";
import { verifyToken } from "@/lib/auth";
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
        let bookings = await Booking.find({ user: userId, status }).populate("reader");

        const now = new Date();

        await Promise.all(bookings.map(async (booking) => {
            const endTime = new Date(booking.time.getTime() + booking.duration * 60000);
            if (booking.status !== "COMPLETED" && endTime < now) {
                booking.time = new Date(Date.now() + 100000);
                booking.status = "CANCELED";
                await booking.save();
            }
        }));

        bookings = await Booking.find({ user: userId, status }).populate("reader");

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
            PENDING: ["PENDING", "CANCELED"],
            SCHEDULED: ["SCHEDULED", "COMPLETED", "CANCELED"],
        };

        if (status && validStatusTransitions[booking.status]?.includes(status)) {
            booking.status = status;
        } else if (status) {
            return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
        }

        if (time) booking.time = time;
        if (duration) booking.duration = duration;

        await booking.save();

        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, POST, PUT};
