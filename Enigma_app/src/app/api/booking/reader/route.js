/* 
    API routes for tarot reader booking management
*/

import dbConnect from "@/lib/dbConnect";
import Booking from "@/lib/models/booking";
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
        let bookings = await Booking.find({ reader: userId, status }).populate("user");
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
        
        const { bookingId, status, confirmedTime, confirmedDuration } = await req.json();
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

        if (confirmedTime) booking.confirmedTime = confirmedTime;
        if (confirmedDuration) booking.confirmedDuration = confirmedDuration;
        
        await booking.save();
        return NextResponse.json(booking);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, PUT};
