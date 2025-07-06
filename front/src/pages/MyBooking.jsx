import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useContext } from "react";
import { userDataContext } from "../Context/User.Context";
import Card from "../Components/Card";

const MyBooking = () => {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);

  return (
    <div
      id="particles-js"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-indigo-950 overflow-hidden relative"
    >
      <div
        className="w-[50px] h-[50px] bg-green-500 hover:bg-emerald-400 cursor-pointer fixed top-6 left-6 sm:left-8 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(0,255,0,0.8),_0_0_40px_rgba(0,255,0,0.4)] hover:shadow-[0_0_30px_rgba(0,255,0,1),_0_0_60px_rgba(0,255,0,0.6)] transition-all duration-400 animate-orbit z-50"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>
      <div className="container mx-auto px-4 py-20 text-center pt-24 sm:pt-20">
        <div className="max-w-4xl mx-auto bg-transparent border-2 border-cyan-400/40 rounded-3xl p-8 md:p-12 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,191,255,0.4),_0_10px_20px_rgba(0,191,255,0.3),_inset_0_0_30px_rgba(0,191,255,0.2)] hover:shadow-[0_30px_60px_rgba(0,191,255,0.6),_0_15px_30px_rgba(0,191,255,0.4),_inset_0_0_40px_rgba(0,191,255,0.3)] transition-all duration-700 transform hover:-translate-y-4 hover:rotate-2">
          <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-gradient-to-r from-teal-300 via-cyan-400 to-blue-500 bg-clip-text drop-shadow-[0_0_15px_rgba(0,191,255,0.9)] animate-pulse-infinite mb-12">
            MY BOOKING
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 justify-items-center perspective-1500">
            {userData?.booking?.length > 0 ? (
              userData.booking.map((booking) => (
                <Card
                  key={booking._id}
                  title={booking.listing?.title || "Untitled"}
                  landMark={booking.listing?.landMark || "Unknown"}
                  city={booking.listing?.city || "Unknown"}
                  image1={booking.listing?.image1 || ""}
                  image2={booking.listing?.image2 || ""}
                  image3={booking.listing?.image3 || ""}
                  rent={booking.listing?.rent || 0}
                  id={booking.listing?._id}
                  isBooked={booking.listing?.isBooked || false}
                  host={booking.listing?.host || "Unknown"}
                  ratings={booking.listing?.ratings || "N/A"}
                  className="w-full max-w-[300px] sm:max-w-[250px] md:max-w-[220px] lg:max-w-[500px] transform hover:-rotate-x-8 hover:-translate-y-6 transition-transform duration-500 hover:shadow-[0_0_30px_rgba(0,191,255,0.7)] scale-100 hover:scale-105 image-w-full lg:image-w-[450px] md:image-w-[300px] sm:image-w-[200px] override-img-width"
                />
              ))
            ) : (
              <p className="text-white text-lg">No bookings found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;