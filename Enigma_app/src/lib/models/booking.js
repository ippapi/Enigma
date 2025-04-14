/* 
    Define booking model for mongodb
*/

import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    reader: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Room",
    },

    time: {
      type: Date,
      validate: {
          validator: function (value) {
              return value > new Date();
          },
          message: "Time must be in the future",
      },
    },
    duration: { type: Number, required: true },

    status: { 
      type: String, 
      enum: ["PENDING", "SCHEDULED", "COMPLETED", "CANCELED"], 
      default: "PENDING" 
    },

    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
