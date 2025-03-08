/* 
    Define user model for mongodb
*/

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "reader", "admin"],
        default: "user",
    },
    profilePicture: {type: String},
    bio: {type: String},
    isActive: {type: Boolean, default: true},
    isOnline: {type: Boolean, default: false},
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
