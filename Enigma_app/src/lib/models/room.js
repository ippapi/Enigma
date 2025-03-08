/* 
    Define room model for mongodb
*/

import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    status: { type: String, enum: ["active", "closed"], default: "waiting" },
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
