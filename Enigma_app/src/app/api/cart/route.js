import dbConnect from "@/lib/dbConnect";
import Cart from "@/lib/models/cart";
import Product from "@/lib/models/product";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { verifyToken } from "@/lib/auth";

const calculateTotalPrice = (cart) => {
    return cart.items.reduce((total, item) => {
      if (item.product && item.product.price) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
};

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
        const status = searchParams.get("status") || "ACTIVE";
        
        let cart = await Cart.findOne({user: userId, status }).populate("user").populate("items.product");
        var totalPrice;
        if (!cart && status == "ACTIVE") {
            cart = await Cart.create({user: userId, items: [], status: "ACTIVE" });
            totalPrice = 0
        }else{
            totalPrice = calculateTotalPrice(cart);
        }
        return NextResponse.json({cart: cart, totalPrice: totalPrice});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const POST = async (req) => {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const token = req.cookies.get("token")?.value;
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;
        
        const { productId, quantity } = await req.json();
        
        const product = await Product.findById(productId).session(session);
        if (!product) {
            return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
        }
        
        let cart = await Cart.findOne({ user: userId, status: "ACTIVE" }).populate("items.product").session(session);
        if (!cart) {
            cart = new Cart({ user: userId, items: [], status: "ACTIVE" });
        }
        
        if (cart.items && Array.isArray(cart.items)) {
            const existingItem = cart.items.find(item => item.product.equals(productId));
            if (existingItem) {
                existingItem.quantity = Math.min(existingItem.quantity + quantity, product.stock);
            } else {
                cart.items.push({ product: productId, quantity });
            }
        }
        
        await cart.save({ session });
        await session.commitTransaction();
        session.endSession();
        return NextResponse.json(cart);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PUT = async (req) => {
    await dbConnect();
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { cartId, status } = await req.json();
        var token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.split(" ")[1];
        const user = await verifyToken(token);
        if (!user) {
            return NextResponse.json({ message: "Invalid token" }, { status: 403 });
        }
        const userId = user.id;
        
        let cart = await Cart.findOne({ _id: cartId, user: userId }).populate("items.product").session(session);
        if (!cart) {
            return NextResponse.json({ error: "Cart not found or unauthorized" }, { status: 403 });
        }
        
        if (status === "ORDERED") {
            for (let item of cart.items) {
                const product = await Product.findById(item.product).session(session);
                if (!product || product.stock < item.quantity) {
                    return NextResponse.json({ error: "Not enough stock" }, { status: 400 });
                }
                product.stock -= item.quantity;
                await product.save({ session });
            }
            const paymentSuccess = await payWithMoMo(cart);
            if (!paymentSuccess) {
                return NextResponse.json({ error: "Payment failed" }, { status: 400 });
            }
        } else if (status === "CANCELED" && cart.status === "ORDERED") {
            await Product.updateMany(
                { _id: { $in: cart.items.map(i => i.product) } },
                { $inc: { stock: 1 } },
                { session }
            );
        }
        
        cart.status = status;
        await cart.save({ session });
        await session.commitTransaction();
        session.endSession();
        return NextResponse.json(cart);
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};

const PATCH = async (req) => {
    await dbConnect();
    try {
        const { cartId, status } = await req.json();

        if (status !== "COMPLETED" && status !== "CANCELED") {
            return NextResponse.json(
                { message: "Invalid status update. Only 'COMPLETED' or 'CANCELED' allowed." },
                { status: 400 }
            );
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        }

        if (cart.status !== "ORDERED") {
            return NextResponse.json(
                { message: "Cart status must be 'ORDERED' to update." },
                { status: 400 }
            );
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { status }, // Set the new status
            { new: true } // Return the updated cart
        );

        return NextResponse.json(updatedCart); // Return the updated cart object

    } catch (error) {
        console.error("Error updating cart status:", error);
        return NextResponse.json(
            { message: "Error updating cart status" },
            { status: 500 }
        );
    }
}

const payWithMoMo = async (cart) => {
    try {
        if (!cart) return false;
        const totalPrice = await calculateTotalPrice(cart);
        // const momoResponse = await fetch("https://test-payment.momo.vn/v2/gateway/api/create", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //         amount: totalPrice,
        //         orderId: cart._id,
        //         orderInfo: "Payment for cart",
        //         returnUrl: "https://your-site.com/payment-success",
        //         notifyUrl: "https://your-site.com/api/payment-notify"
        //     })
        // });
        
        // if (!momoResponse.ok) return false;
        // const momoData = await momoResponse.json();
        // return momoData.payUrl ? momoData.payUrl : false;
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export { GET, POST, PUT, PATCH };
