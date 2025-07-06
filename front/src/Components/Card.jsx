import React, { useContext, useState } from "react";
import { userDataContext } from "../Context/User.Context";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";
import { IoIosStar } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import { FcCancel } from "react-icons/fc";
import { bookingDatacontext } from "../Context/BookingContext";

const Card = React.memo(
  ({
    title = "Untitled",
    landMark = "Unknown",
    image1 = "",
    image2 = "",
    image3 = "",
    rent = 0,
    city = "Unknown",
    id,
    ratings,
    className,
    isBooked,
    host,
  }) => {
    const navigate = useNavigate();
    const { userData } = useContext(userDataContext);
    const { handleViewCard, getListing } = useContext(listingDataContext);
    const { cancelBooking } = useContext(bookingDatacontext);
    const [popUp, setPopUp] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    const handleClick = () => {
      if (userData) {
        handleViewCard(id);
      } else {
        navigate("/login");
      }
    };

    const handleCancelBooking = async (e) => {
      e.stopPropagation();
      setIsCanceling(true);
      try {
        await cancelBooking(id);
        await getListing(); // Refresh listing data after cancellation
        alert("Booking cancelled successfully!");
        setPopUp(false);
      } catch (error) {
        alert(error.response?.data?.message || "Failed to cancel booking.");
      } finally {
        setIsCanceling(false);
      }
    };

    return (
      <div
        className={`relative w-full max-w-sm bg-white/30 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${className}`}
        onClick={() => !isBooked ? handleClick() : null}
      >
        {/* Booked Badge */}
        {isBooked && (
          <div className="absolute top-3 right-3 bg-green-200 text-green-900 text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10 shadow-md">
            <GiConfirmed className="w-4 h-4" /> Booked
          </div>
        )}

        {/* Cancel Badge */}
        {isBooked && host === userData?._id && (
          <div
            className={`absolute top-12 right-3 bg-red-200 text-red-900 text-xs px-3 py-1 rounded-full flex items-center gap-1 z-10 cursor-pointer hover:bg-red-300 transition ${
              isCanceling ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              if (!isCanceling) setPopUp(true);
            }}
          >
            <FcCancel className="w-4 h-4" />
            Cancel
          </div>
        )}

        {/* Cancel Popup */}
        {popUp && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-xs text-center">
              <p className="text-lg font-semibold text-gray-800 mb-4">Cancel Booking?</p>
              <div className="flex justify-center gap-4">
                <button
                  className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ${
                    isCanceling ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={handleCancelBooking}
                  disabled={isCanceling}
                >
                  {isCanceling ? "Canceling..." : "Yes"}
                </button>
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopUp(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Section */}
        <div className="w-full h-60 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent relative group rounded-t-3xl">
          <div className="flex w-max h-full">
            {[image1, image2, image3].map((img, i) =>
              img ? (
                <img
                  key={i}
                  src={img}
                  alt={`${title} - Image ${i + 1}`}
                  className="w-[400px] h-60 object-cover flex-shrink-0"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : null
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 rounded-t-3xl" />
        </div>

        {/* Details Section */}
        <div className="p-5 bg-white/60 backdrop-blur-lg rounded-b-3xl">
          <div className="flex justify-between text-sm text-gray-700 mb-1 font-medium">
            <span>
              {landMark.toUpperCase()}, {city.toUpperCase()}
            </span>
            <span className="flex items-center gap-1 text-yellow-500">
              <IoIosStar className="text-lg" />
              {typeof ratings === "number" ? ratings : "N/A"}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{title.toUpperCase()}</h3>
          <p className="text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent mt-1">
            ₹{rent}/day
          </p>
        </div>
      </div>
    );
  }
);

export default Card;