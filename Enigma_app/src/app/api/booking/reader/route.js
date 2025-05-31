/* 
    API routes for tarot reader booking management
*/

import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/booking";
import User from "@/lib/models/user";
import Room from "@/lib/models/room";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const GET = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user || user.role !== "READER") {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        let bookings = await Booking.find({ reader: userId, status: status }).populate("user");

        const now = new Date();
        
        await Promise.all(bookings.map(async (booking) => {
            const endTime = new Date(booking.time.getTime() + booking.duration * 60000);
            if (booking.status !== "COMPLETED" && endTime < now) {
                booking.time = new Date(Date.now() + 100000);
                booking.status = "CANCELED";
                await booking.save();
            }
        }));

        bookings = await Booking.find({ reader: userId, status }).populate("reader");

        return NextResponse.json(bookings);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PUT = async (req) => {
    await dbConnect();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user || user.role !== "READER") {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;
        
        const { bookingId, status } = await req.json();
        const booking = await Booking.findOne({ _id: bookingId, reader: userId });
        if (!booking) {
            return NextResponse.json({ error: "Booking not found or unauthorized" }, { status: 404 });
        }

        const validStatusTransitions = {
            PENDING: ["SCHEDULED", "CANCELED"],
            SCHEDULED: ["COMPLETED", "CANCELED"],
        };

        if (status && validStatusTransitions[booking.status]?.includes(status)) {
            booking.status = status;
        } else if (status) {
            return NextResponse.json({ error: "Invalid status transition" }, { status: 400 });
        }

        if (status === "SCHEDULED") {
            const userInfo = await User.findById(booking.user);
            const readerInfo = await User.findById(booking.reader);

            const room = await Room.create({
                status: "ACTIVE",
                enable_user: [
                    { id: booking.user.toString(), name: userInfo?.name || "User", role: userInfo?.role },
                    { id: booking.reader.toString(), name: readerInfo?.name || "Reader", role: readerInfo?.role }
                ],
                messages: []
            });

            booking.room = room._id;
        }
        
        await booking.save();
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, PUT};
