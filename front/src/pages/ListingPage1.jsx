import React from "react";
import { useContext } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";

const ListingPage1 = () => {
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
  } = useContext(listingDataContext) || {};

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage1(file);
      setFrontEndImage1(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage2(file);
      setFrontEndImage2(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage3(file);
      setFrontEndImage3(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !rent || !city || !landMark) {
      alert("Please fill in all required fields.");
      return;
    }
    const rentValue = Number(rent);
    if (isNaN(rentValue) || rentValue <= 0) {
      alert("Please enter a valid positive rent amount.");
      return;
    }
    navigate("/listingpage2");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-6 bg-[length:400%_400%] bg-gradient-to-br from-pink-500 via-purple-500 via-blue-500 via-indigo-500 via-cyan-500 via-teal-500 via-green-400 via-yellow-400 via-orange-400 to-red-500 animate-gradientSlow">
      {/* Header Buttons */}
      <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-4 md:px-8 z-10">
        <div
          className="w-[45px] h-[45px] md:w-[50px] md:h-[50px] bg-green-600 hover:bg-green-700 cursor-pointer rounded-full flex items-center justify-center shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
        </div>

        <div className="px-4 md:px-6 h-[45px] md:h-[50px] text-base md:text-xl font-semibold bg-gradient-to-r from-red-600 to-pink-500 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
          SetUp Your Home
        </div>
      </div>

      {/* Scrollable Form */}
      
      <form
        action=""
        className="mt-20 md:mt-28 max-w-[990px] w-full md:w-[90%] bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl hover:shadow-[0_0_50px_rgba(124,58,237,0.5)] transition-all duration-500 ease-in-out flex flex-col items-start max-h-[80vh] overflow-y-auto p-6 md:p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="title"
            className="text-lg font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter the title.."
            className="w-full h-12 px-4 rounded-xl bg-white/90 text-gray-900 font-medium border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="des"
            className="text-lg font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="des"
            placeholder="Enter description.."
            className="w-full h-28 px-4 py-2 rounded-xl bg-white/90 text-gray-900 font-medium border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300 resize-none"
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="img1"
            className="text-lg font-semibold text-gray-700"
          >
            Image1
          </label>
          <input
            type="file"
            id="img1"
            accept="image/*"
            className="w-full h-12 file:px-4 file:py-2 file:rounded-xl file:bg-purple-100 file:border-0 file:text-purple-800 file:font-medium bg-white/90 text-gray-700 border border-gray-300 rounded-xl shadow-sm transition-all duration-300"
            required
            onChange={handleImage1}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="img2"
            className="text-lg font-semibold text-gray-700"
          >
            Image2
          </label>
          <input
            type="file"
            id="img2"
            accept="image/*"
            className="w-full h-12 file:px-4 file:py-2 file:rounded-xl file:bg-purple-100 file:border-0 file:text-purple-800 file:font-medium bg-white/90 text-gray-700 border border-gray-300 rounded-xl shadow-sm transition-all duration-300"
            required
            onChange={handleImage2}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="img3"
            className="text-lg font-semibold text-gray-700"
          >
            Image3
          </label>
          <input
            type="file"
            id="img3"
            accept="image/*"
            className="w-full h-12 file:px-4 file:py-2 file:rounded-xl file:bg-purple-100 file:border-0 file:text-purple-800 file:font-medium bg-white/90 text-gray-700 border border-gray-300 rounded-xl shadow-sm transition-all duration-300"
            required
            onChange={handleImage3}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="rent"
            className="text-lg font-semibold text-gray-700"
          >
            Rent
          </label>
          <input
            type="number"
            id="rent"
            placeholder="Enter the rent.."
            className="w-full h-12 px-4 rounded-xl bg-white/90 text-gray-900 font-medium border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            onChange={(e) => setRent(e.target.value)}
            value={rent}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="city"
            className="text-lg font-semibold text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter the City.."
            className="w-full h-12 px-4 rounded-xl bg-white/90 text-gray-900 font-medium border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </div>

        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="landmark"
            className="text-lg font-semibold text-gray-700"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            placeholder="Enter the landmark.."
            className="w-full h-12 px-4 rounded-xl bg-white/90 text-gray-900 font-medium border border-gray-300 outline-none shadow-sm focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            required
            onChange={(e) => setLandMark(e.target.value)}
            value={landMark}
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-gradient-to-r mt-[35px] from-purple-600 via-pink-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300"
        >
          Next
        </button>
      </form>

    </div>
  );
};

export default ListingPage1;