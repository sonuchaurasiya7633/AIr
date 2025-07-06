import React, { useContext, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import { bookingDatacontext } from "../Context/BookingContext";
import Star from "../Components/Star";
import { useNavigate } from "react-router-dom";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/User.Context";
import { listingDataContext } from "../Context/ListingContext";

const Booked = () => {
  let navigate = useNavigate();
  let { bookingData } = useContext(bookingDatacontext);
  let [star, setStar] = useState(null);
  let { serverUrl } = useContext(authDataContext);
  let { getCurrentUser } = useContext(userDataContext);
  let { getListing } = useContext(listingDataContext);
  let { cardDetails } = useContext(listingDataContext);

  const handleRating = async (id) => {
    try {
      if (!star || star < 1 || star > 5) {
        alert("Please select a rating between 1 and 5.");
        return;
      }
      let result = await axios.post(
        serverUrl + `/api/listing/ratings/${bookingData.listing}`,
        {
          ratings: star,
        },
        { withCredentials: true }
      );
      await getCurrentUser();
      await getListing();
      console.log(result);
      setStar(null); // Reset star rating after submission
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to submit rating.");
    }
  };

  const handleStar = async (value) => {
    setStar(value);
    console.log("You Rated", value);
  };

  return (
    <div className="w-[100vw] min-h-[100vh] flex items-center justify-center gap-[30px] bg-slate-200 flex-col">
      <div className="w-[95%] max-w-[500px] h-[400px] bg-white p-[20px] rounded-lg border-[1.5px] border-[#b5b5b5]  shadow-lg flex flex-col items-center justify-center gap-[20px] md:w-[80%] ">
        <div className="w-[100%] h-[50%] text-[20px] flex items-center justify-center font-semibold flex-col gap-[20px] text-[#333]">
          <GiConfirmed className="w-[100px] h-[100px] text-[green]" /> Booking
          Confirmed
        </div>
        <div className="w-[100%] h-[50%] text-[16px] flex items-center justify-between md:text-[18px] text-[#333]">
          <span>Booking Id : </span>
          <span>{bookingData?._id || "N/A"}</span>
        </div>

        <div className="w-[100%] h-[50%] text-[16px] flex items-center justify-between md:text-[18px] text-[#333]">
          <span>Owner Details : </span>
          <span>{bookingData?.host?.email || "N/A"}</span>
        </div>

        <div className="w-[100%] h-[50%] text-[16px] flex items-center justify-between md:text-[18px] text-[#333]">
          <span>Total Rent : </span>
          <span>{bookingData?.totalRent || "N/A"}</span>
        </div>
      </div>

      <div className="w-[95%] max-w-[600px] h-[200px] bg-white p-[20px] rounded-lg border-[1.5px] border-[#b5b5b5] shadow-lg flex flex-col items-center justify-center gap-[20px] md:w-[80%]">
        <h1 className="text-[18px] font-semibold text-gray-600">
          {star || 0} Out of 5 Rating
        </h1>
        <Star onRate={handleStar} />
        <button
          className="w-[200px] h-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300"
          onClick={() => handleRating(bookingData.listing)}
        >
          Submit
        </button>
      </div>
      <button
        className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Booked;