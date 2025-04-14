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
    room: { type: String },

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

    confirmedTime: {
      type: Date,
      validate: {
          validator: function (value) {
              return value > new Date();
          },
          message: "Confirmed time must be in the future",
      },
    },
    confirmedDuration: { type: Date },

    status: { 
      type: String, 
      enum: ["PENDING", "SCHEDULED", "COMPLETED", "CANCELED"], 
      default: "PENDING" 
    },

    notes: { type: String },
  },
  { timestamps: true }
);

BookingSchema.index({user: 1, reader: 1, confirmedTime: 1}, { unique: true, sparse: true });

export default mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
