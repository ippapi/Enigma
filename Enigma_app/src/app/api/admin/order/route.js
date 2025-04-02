import dbConnect from "@/lib/dbConnect";
import Cart from "@/lib/models/cart";
import { NextResponse } from "next/server";

const GET = async () => {
    await dbConnect();
    try {
        const orders = await Cart.find({ status: "ORDERED" })
            .populate("user")
            .populate("items.product");
        return NextResponse.json(orders);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PUT = async (req) => {
    await dbConnect();
    try {
        const { orderId, status } = await req.json();

        if (!["COMPLETED", "CANCELED"].includes(status)) {
            return NextResponse.json({ error: "Invalid status" }, { status: 400 });
        }

        const order = await Cart.findById(orderId).populate("items.product");
        if (!order || order.status !== "ORDERED") {
            return NextResponse.json({ error: "Order not found or cannot be updated" }, { status: 400 });
        }

        if (status === "CANCELED"){
            for (let item of order.items) {
                await Product.findByIdAndUpdate(item.product._id, { $inc: { stock: item.quantity } });
            }
        }

        order.status = status;
        await order.save();

        return NextResponse.json(order);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export {GET, PUT};
