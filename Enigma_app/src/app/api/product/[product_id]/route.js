import dbConnect from "@/lib/dbConnect";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

const GET = async (req, { params }) => {
    await dbConnect();
    try {
        const { product_id } = await params;
        const product = await Product.findById(product_id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({product});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PUT = async (req, { params }) => {
    await dbConnect();
    try {
        const { product_id } = await params;
        const {name, description, price, stock, images} = await req.json();
        console.log(images.map(img => img.length)); 
        const product = await Product.findByIdAndUpdate(product_id, {name: name, description: description, price: price, stock: stock, images: images}, { new: true, runValidators: true });
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
};

const DELETE = async (req, { params }) => {
    await dbConnect();
    try {
        const { product_id } = await params;
        const product = await Product.findByIdAndDelete(product_id);
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

export { GET, PUT, DELETE };
