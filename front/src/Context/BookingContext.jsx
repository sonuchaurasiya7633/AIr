import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";
import { userDataContext } from "./User.Context";
import { listingDataContext } from "./ListingContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const bookingDatacontext = createContext();

const BookingContext = ({ children }) => {
  let [checkIn, setCheckIn] = useState("");
  let [checkOut, setCheckOut] = useState("");
  let [total, setTotal] = useState(0);
  let [night, setNight] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let [bookingData, setBookingData] = useState(null);
  let [booking, setBooking] = useState(false);
  let navigate = useNavigate();
  const handleBooking = async (id) => {
    navigate("/booked");
    setBooking(true);
    try {
      if (!checkIn || !checkOut) {
        throw new Error("Please select check-in and check-out dates");
      }
      let result = await axios.post(
        serverUrl + `/api/booking/create/${id}`,
        {
          checkIn,
          checkOut,
          totalRent: total,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      setBookingData(result.data);
      setCheckIn("");
      setCheckOut("");
      setTotal(0);
      setNight(0);
      console.log(result.data);
      setBooking(false);
      navigate("/booked");
      toast.success("Booking Created Succesfully");
      return result.data;
    } catch (error) {
      console.error("Booking Error:", error.response?.data || error);
      setBookingData(null);
      toast.error(error.response.data.message);
      setBooking(false);
      throw error;
    }
  };

  const cancelBooking = async (id) => {
    try {
      let result = await axios.delete(serverUrl + `/api/booking/cancel/${id}`, {
        withCredentials: true,
      });
      await getCurrentUser();
      await getListing();
      setBookingData(null);
      console.log(result.data);
      toast.success("Booking Cancelled Succesfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  let value = {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    bookingData,
    setBookingData,
    handleBooking,
    cancelBooking,
    booking,
    setBooking,
  };

  return (
    <bookingDatacontext.Provider value={value}>
      {children}
    </bookingDatacontext.Provider>
  );
};

export default BookingContext;
