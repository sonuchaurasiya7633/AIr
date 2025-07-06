import React, { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { listingDataContext } from "../Context/ListingContext.jsx";

const ListingPage2 = () => {
  let navigate = useNavigate();
  let { category, setCategory } = useContext(listingDataContext) || {};

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-500 via-yellow-400 via-green-400 via-blue-400 via-indigo-500 via-purple-500 via-red-400 via-rose-400 via-cyan-400 to-amber-500 bg-[length:400%_400%] animate-gradient flex flex-col items-center justify-start p-4 sm:p-8 overflow-auto relative">
      {/* Top Header */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 relative">
        {/* Back Button */}
        <div
          className="w-[50px] h-[50px] bg-green-500 hover:bg-green-600 transition duration-300 cursor-pointer rounded-full flex items-center justify-center text-white shadow-xl hover:scale-105 active:scale-95"
          onClick={() => navigate("/listingpage1")}
        >
          <FaArrowLeft />
        </div>

        {/* Heading */}
        <div className="px-6 py-2 text-[18px] sm:text-[20px] font-semibold bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white rounded-full shadow-lg animate-pulse hover:shadow-2xl">
          Set Your Category
        </div>
      </div>

      <h2 className="text-white text-lg sm:text-xl font-semibold mb-4">
        Which of these best describes your place?
      </h2>

      {/* Category List */}
      <div className="flex flex-wrap justify-center items-center gap-6 w-full max-w-md sm:max-w-lg bg-white/30 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl overflow-auto max-h-[90vh]">
        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "trending" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("trending")}
        >
          <MdWhatshot className="w-[30px] h-[30px]" />
          <h3>Trending</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "villa" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("villa")}
        >
          <GiFamilyHouse className="w-[30px] h-[30px]" />
          <h3>Villa</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "farmHouse" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("farmHouse")}
        >
          <FaTreeCity className="w-[30px] h-[30px]" />
          <h3>Farm House</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "poolHouse" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("poolHouse")}
        >
          <MdOutlinePool className="w-[30px] h-[30px]" />
          <h3>Pool House</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "rooms" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("rooms")}
        >
          <MdBedroomParent className="w-[30px] h-[30px]" />
          <h3>Rooms</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "flat" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("flat")}
        >
          <BiBuildingHouse className="w-[30px] h-[30px]" />
          <h3>Flat</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "pg" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("pg")}
        >
          <IoBedOutline className="w-[30px] h-[30px]" />
          <h3>PG</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "cabin" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("cabin")}
        >
          <GiWoodCabin className="w-[30px] h-[30px]" />
          <h3>Cabin</h3>
        </div>

        <div
          className={`w-[180px] h-[100px] flex flex-col items-center justify-center cursor-pointer border-[2px] hover:border-gray-400 text-[16px] font-medium text-black rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-white/60 ${
            category === "shops" ? "border-3 border-[#8b8b8b]" : ""
          }`}
          onClick={() => setCategory("shops")}
        >
          <SiHomeassistantcommunitystore className="w-[30px] h-[30px]" />
          <h3>Shops</h3>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full h-12 mt-[15px] bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300 "
          onClick={() => navigate("/listingpage3")}
          disabled={!category}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingPage2;