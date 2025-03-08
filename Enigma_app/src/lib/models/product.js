/* 
    Define product model for mongodb
*/

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: [{ type: String }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
