import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["USER", "READER", "ADMIN"],
        default: "USER",
    },
    profilePicture: {type: String},
    bio: {type: String},
    refreshToken: {type: String},
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
