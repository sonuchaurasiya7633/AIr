import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

const ListingPage3 = () => {
  let navigate = useNavigate();
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontEndImage1,
    setFrontEndImage1,
    frontEndImage2,
    setFrontEndImage2,
    frontEndImage3,
    setFrontEndImage3,
    backendEndImage1,
    setBackendEndImage1,
    backendEndImage2,
    setBackendEndImage2,
    backendEndImage3,
    setBackendEndImage3,
    rent,
    setRent,
    city,
    setCity,
    landMark,
    setLandMark,
    category,
    setCategory,
    handleAddListing,
    
  } = useContext(listingDataContext) || {};

  const placeholderImage = "https://placehold.co/300x300"; // Fallback to placehold.co

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-500 via-yellow-400 via-green-400 via-blue-400 via-indigo-500 via-purple-500 via-red-400 via-rose-400 via-cyan-400 to-amber-500 bg-[length:400%_400%] animate-gradient flex items-center justify-center gap-2 sm:gap-4 flex-col overflow-auto relative p-2 sm:p-4">
      {/* Back Button */}
      <div
        className="w-[40px] sm:w-[50px] h-[40px] sm:h-[50px] bg-green-500 hover:bg-green-600 transition duration-300 cursor-pointer rounded-full flex items-center absolute top-[2px] sm:top-[5%] left-2 sm:left-[20px] justify-center text-white shadow-xl hover:scale-105 active:scale-95"
        onClick={() => navigate("/listingpage1")}
      >
        <FaArrowLeft />
      </div>

      {/* Location Title */}
      <div className="w-[90%] sm:w-[95%] md:w-[80%] flex items-center justify-center mb-1 sm:mb-2">
        <h1 className="text-[16px] sm:text-[20px] md:text-[30px] text-white font-bold text-ellipsis text-nowrap overflow-hidden drop-shadow-md ">
          In {landMark?.toUpperCase() || ""}, {city?.toUpperCase() || ""}
        </h1>
      </div>

      {/* Images Section */}
      <div className="w-[90%] sm:w-[95%] md:w-[80%] h-auto flex flex-col sm:flex-row gap-1 sm:gap-2 bg-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md p-1 sm:p-2">
        <div className="w-full sm:w-[60%] aspect-video md:aspect-[4/3] overflow-hidden border-4 border-white rounded-xl shadow-lg">
          <img
            src={frontEndImage1 || placeholderImage}
            alt="Image 1"
            className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src = "https://placehold.co/300x300";
            }} // Fallback on error
          />
        </div>

        <div className="w-full sm:w-[40%] flex flex-col gap-1 sm:gap-2">
          <div className="aspect-square overflow-hidden border-4 border-white rounded-xl shadow-lg">
            <img
              src={frontEndImage2 || placeholderImage}
              alt="Image 2"
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src = "https://placehold.co/300x300";
              }} // Fallback on error
            />
          </div>
          <div className="aspect-square overflow-hidden border-4 border-white rounded-xl shadow-lg">
            <img
              src={frontEndImage3 || placeholderImage}
              alt="Image 3"
              className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              onError={(e) => {
                e.target.src = "https://placehold.co/300x300";
              }} // Fallback on error
            />
          </div>
        </div>
      </div>

      {/* Text Info */}
      <div className="w-[90%] sm:w-[95%] md:w-[80%] text-white text-sm sm:text-lg md:text-2xl font-semibold drop-shadow-lg">
        {title?.toUpperCase() || ""}, {category?.toUpperCase() || ""},{" "}
        {landMark?.toUpperCase() || ""}
      </div>

      <div className="w-[90%] sm:w-[95%] md:w-[80%] text-white text-xs sm:text-base md:text-xl font-medium drop-shadow-md">
        {description?.toUpperCase() || ""}
      </div>

      <div className="w-[90%] sm:w-[95%] md:w-[80%] text-white text-sm sm:text-lg md:text-2xl font-bold drop-shadow-lg">
        Rs. {rent || "0"}/day
      </div>

      {/* Submit Button */}
      <button
        onClick={handleAddListing}
        className="w-full sm:w-[90%] md:w-[80%] h-10 sm:h-12 mt-2 sm:mt-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300"
      >
        Add Listing
      </button>
    </div>
  );
};

export default ListingPage3;
