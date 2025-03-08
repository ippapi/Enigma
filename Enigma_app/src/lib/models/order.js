/* 
    Define order model for mongodb
*/

import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: { type: String, required: true },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
        }
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "canceled"], default: "pending" },
    paymentMethod: { type: String, enum: ["card", "paypal"], required: true },
}, { timestamps: true });

OrderSchema.pre("save", function (next) {
    this.totalPrice = this.products.reduce((total, item) => total + item.price * item.quantity, 0);
    next();
});
  
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
  