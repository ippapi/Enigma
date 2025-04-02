import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const readers = await User.find({role: "READER"}).skip(skip).limit(limit);
        const total = await User.countDocuments();

        return NextResponse.json({ readers, total, page, limit });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};
