import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalRent: {
      type: Number,
      required: true,
      min: [0, "Total rent must be a positive number"],
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;