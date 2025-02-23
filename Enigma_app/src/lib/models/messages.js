/* 
    Define message model for mongodb
*/

import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    user: {type: String, required: true},
    message: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
});

// If not exist, use the MessageSchema, else use the existed one
export default mongoose.models.Message || mongoose.model("Message", MessageSchema);