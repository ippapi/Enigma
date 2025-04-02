import dbConnect from "@/lib/dbConnect";
import { verifyToken } from "@/lib/auth";
import User from "@/lib/models/user";

const GET = async (req) => {
    await connectToDB();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;

        const userData = await User.findById(user.id).select("-password");
        return NextResponse.json(userData);
    } catch (error) {
        console.error(error);
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
        
        const updates = await req.json();

        const restrictedFields = ["email", "password", "role", "isActive"];
        restrictedFields.forEach(field => delete updates[field]);

        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true }).select("-password");

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, PUT};
