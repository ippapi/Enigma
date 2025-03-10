/* 
    Define room model for mongodb
*/

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    id: {type: String, required: true},
    status: { type: String, enum: ["active", "closed"], default: "waiting" },
    enable_user: [
        {
            id: {type: String, required: true},
            name: {type: String, required: true},
            role: {type: String, required: true},
        }
    ],
    messages: [
        {
          senderId: { type: String, required: true },
          senderName: { type: String, required: true },
          message: { type: String, required: true },
          createdAt: { type: Date, default: Date.now },
        }
    ],
}, { timestamps: true });

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);
