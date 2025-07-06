import Booking from "../models/booking.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const createBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { checkIn, checkOut, totalRent } = req.body;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found" });
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      return res.status(400).json({ message: "Invalid CheckIn/CheckOut date" });
    }

    if (listing.isBooked) {
      return res.status(400).json({ message: "Listing is Already Booked" });
    }

    if (!totalRent || totalRent <= 0) {
      return res.status(400).json({ message: "Total rent must be a positive number" });
    }

    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });
    await booking.populate("host", "email");
    let user = await User.findByIdAndUpdate(
      req.userId,
      {
        $push: { booking: booking._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User is Not Found" });
    }
    listing.guest = req.userId;
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: `Booking error: ${error.message}` });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    let { id } = req.params; 
    let booking = await Booking.findOne({ listing: id, status: "booked" });
    if (!booking) {
      return res.status(404).json({ message: "Booking Not Found" });
    }

    // Update booking status to "cancel"
    booking.status = "cancel";
    await booking.save();

    // Update listing to mark as not booked
    let listing = await Listing.findByIdAndUpdate(
      id,
      { isBooked: false, guest: null },
      { new: true }
    );
    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found" });
    }

    // Remove booking from user's bookings array
    let user = await User.findByIdAndUpdate(
      booking.guest,
      {
        $pull: { booking: booking._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json({ message: "Booking Cancelled" });
  } catch (error) {
    return res.status(500).json({ message: `Booking Cancel Error: ${error.message}` });
  }
};