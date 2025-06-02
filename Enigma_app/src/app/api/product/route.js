import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const GET = async (req) => {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments();

        return NextResponse.json({ products, total, page, limit });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const POST = async (req) => {
    await dbConnect();
    try {
        const {name, description, price, stock, images} = await req.json();
        const product = new Product({name: name, description: description, price: price, stock: stock, images: images });
        await product.save();
        
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

export { GET, POST };
