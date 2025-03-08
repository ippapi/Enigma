/* 
    Define booking model for mongodb
*/

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: { type: String, required: true },
    reader: { type: String, required: true },
    room: { type: String },

    time: { type: Date, required: true },
    duration: { type: Number, required: true },

    confirmedTime: { type: Date },
    confirmedDuration: { type: Date },

    status: { 
      type: String, 
      enum: ["pending", "rescheduled", "scheduled", "completed", "canceled"], 
      default: "pending" 
    },

    notes: { type: String },
  },
  { timestamps: true }
);

BookingSchema.index({user: 1, reader: 1, confirmedTime: 1}, { unique: true, sparse: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
