import dbConnect from "@/lib/dbConnect";
import User from "@/lib/models/user";
import { NextResponse } from "next/server";

const GET = async (req) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const id = searchParams.get("id");
        const name = searchParams.get("name");
        const email = searchParams.get("email");

        let filter = {};

        if (id) {
            filter._id = id;
        } else {
            if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive name search
            if (email) filter.email = { $regex: email, $options: "i" }; // Case-insensitive email search
        }

        const users = await User.find(filter).skip(skip).limit(limit);
        const total = await User.countDocuments(filter);

        return NextResponse.json({ users, total, page, limit });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};


const PUT = async (req) => {
    await dbConnect();

    try {
        const body = await req.json();
        const { userId, newRole } = body;

        if (!userId || !newRole) {
            return NextResponse.json({ error: "Missing userId or newRole" }, { status: 400 });
        }

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (newRole !== "USER" && newRole !== "READER") {
            return NextResponse.json({ error: "Invalid role" }, { status: 400 });
        }

        user.role = newRole;
        await user.save();

        return NextResponse.json({ message: "User role updated", user });
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};


export { GET, PUT };
