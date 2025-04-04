import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    user: { type: String, required: true },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, default: 1 },
        }
    ],
    status: { type: String, enum: ["ACTIVE", "ORDERED", "COMPLETED"], default: "ACTIVE" },
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
