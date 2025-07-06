import React, { useContext, useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/User.Context";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";
import { bookingDatacontext } from "../Context/BookingContext";
import { toast } from "react-toastify";

const ViewCard = () => {
  let [minDate, setMinDate] = useState("");
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [backendEndImage1, setBackendEndImage1] = useState(null);
  let [backendEndImage2, setBackendEndImage2] = useState(null);
  let [backendEndImage3, setBackendEndImage3] = useState(null);
  let [rent, setRent] = useState(0);
  let [city, setCity] = useState("");
  let [landMark, setLandMark] = useState("");
  let [category, setCategory] = useState("");
  let { cardDetails, getListing } = useContext(listingDataContext);
  let { userData } = useContext(userDataContext);
  let [updatePopUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
  let { deleting, setDeleting } = useContext(listingDataContext);
  let { updating, setUpdating } = useContext(listingDataContext);
  let { serverUrl } = useContext(authDataContext) || {};

  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
    booking,
    setBooking,
  } = useContext(bookingDatacontext);

 useEffect(() => {
  if (checkIn && checkOut && cardDetails) {
    let inDate = new Date(checkIn);
    let outDate = new Date(checkOut);
    let n = Math.max(0, Math.floor((outDate - inDate) / (24 * 60 * 60 * 1000)));
    setNight(n);

    if (cardDetails.rent && n > 0) {
      let airBnbCharge = cardDetails.rent * (7 / 100);
      let tax = cardDetails.rent * (7 / 100);
      setTotal(cardDetails.rent * n + airBnbCharge + tax);
    } else {
      setTotal(0);
    }
  }
}, [checkIn, checkOut, cardDetails]);


  useEffect(() => {
    if (cardDetails) {
      setTitle(cardDetails.title || "");
      setDescription(cardDetails.description || "");
      setRent(cardDetails.rent || 0);
      setCity(cardDetails.city || "");
      setLandMark(cardDetails.landMark || "");
      setCategory(cardDetails.category || "");
    }
  }, [cardDetails]);

  const handleUpdateListing = async () => {
    setUpdating(true);
    if (
      !title?.trim() ||
      !description?.trim() ||
      !rent ||
      !city?.trim() ||
      !landMark?.trim() ||
      !category?.trim()
    ) {
      alert("All fields are required!");
      setUpdating(false);
      return;
    }

    const rentValue = Number(rent);
    if (isNaN(rentValue) || rentValue <= 0) {
      alert("Please enter a valid positive rent amount.");
      setUpdating(false);
      return;
    }

    if (
      (backendEndImage1 && !backendEndImage1.type.startsWith("image/")) ||
      (backendEndImage2 && !backendEndImage2.type.startsWith("image/")) ||
      (backendEndImage3 && !backendEndImage3.type.startsWith("image/"))
    ) {
      alert("All uploaded files must be valid images.");
      setUpdating(false);
      return;
    }

    try {
      let formData = new FormData();
      formData.append("title", title.trim());
      if (backendEndImage1) formData.append("image1", backendEndImage1);
      if (backendEndImage2) formData.append("image2", backendEndImage2);
      if (backendEndImage3) formData.append("image3", backendEndImage3);
      formData.append("description", description.trim());
      formData.append("rent", rent);
      formData.append("city", city.trim());
      formData.append("landMark", landMark.trim());
      formData.append("category", category.trim());

      let result = await axios.put(
        serverUrl + `/api/listing/update/${cardDetails._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result)
      toast.success("Listing Updated ")
      setUpdating(false);
      navigate("/");
      setTitle("");
      setDescription("");
      setBackendEndImage1(null);
      setBackendEndImage2(null);
      setBackendEndImage3(null);
      setRent(0);
      setCity("");
      setLandMark("");
      setCategory("");
    } catch (error) {
      setUpdating(false);
      console.error("Error updating listing:", error.response?.data || error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteListing = async () => {
    setDeleting(true);
    try {
      let result = await axios.delete(
        serverUrl + `/api/listing/delete/${cardDetails._id}`,
        { withCredentials: true }
      );
      console.log(result.data);
      navigate("/");
      toast.success("Listing Deleted ")
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
      console.error("Error deleting listing:", error.response?.data || error);
       toast.error(error.response.data.message);
    }
  };

  const handleBookNow = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      setBooking(false);
      return;
    }
    try {
      const result = await handleBooking(cardDetails._id);
      console.log(result)
      toast.success("Booking Created Succesfully ")
      await getListing(); 
      navigate("/booked");
      setBookingPopUp(false);
    } catch (error) {
      setBooking(false);
      toast.error(error.response.data.message);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage1(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleImage2 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage2(file);
    } else {
      alert("Please select a valid image file.");
    }
  };
  const handleImage3 = (e) => {
    let file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setBackendEndImage3(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-900 animate-gradient-shift relative overflow-auto flex items-center justify-center">
      {/* Particle Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(147,51,234,0.2)_0%,_rgba(0,0,0,0)_70%)] animate-particle-pulse"></div>
      {/* Glowing Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(59,130,246,0.3)_0%,_rgba(0,0,0,0)_70%)] opacity-40 animate-glow-pulse"></div>

      {/* Back Button */}
      <div
        className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all duration-400 ease-in-out cursor-pointer rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-emerald-600/60 hover:scale-110 active:scale-90 transform hover:-rotate-12 z-50 absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8"
        onClick={() => navigate("/")}
        style={{ zIndex: 50 }}
      >
        <FaArrowLeft className="text-lg sm:text-xl md:text-2xl" />
      </div>

      {/* Card Container */}
      <div className="w-[95%] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-[1200px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col gap-4 sm:gap-6 md:gap-8 lg:gap-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
        {/* Location Title */}
        <div className="flex items-center justify-center">
          <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg woonimate-shimmer hover:scale-105 transition-transform duration-300">
            In {cardDetails?.landMark?.toUpperCase() || "UNKNOWN"},{" "}
            {cardDetails?.city?.toUpperCase() || "UNKNOWN"}
          </h1>
        </div>

        {/* Images Section */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-center">
          <div className="w-40 sm:w-48 md:w-56 lg:w-64 h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden border border-white/30 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
            <img
              src={cardDetails?.image1 || "https://placehold.co/200x150"}
              alt="Image 1"
              className="w-full h-full object-cover transition-all duration-400 hover:scale-110 hover:rotate-1 cursor-pointer"
              onError={(e) => {
                e.target.src = "https://placehold.co/200x150";
              }}
            />
          </div>
          <div className="flex flex-row sm:flex-col gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden border border-white/30 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src={cardDetails?.image2 || "https://placehold.co/100x100"}
                alt="Image 2"
                className="w-full h-full object-cover transition-all duration-400 hover:scale-110 hover:rotate-1 cursor-pointer"
                onError={(e) => {
                  e.target.src = "https://placehold.co/100x100";
                }}
              />
            </div>
            <div className="w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 overflow-hidden border border-white/30 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105">
              <img
                src={cardDetails?.image3 || "https://placehold.co/100x100"}
                alt="Image 3"
                className="w-full h-full object-cover transition-all duration-400 hover:scale-110 hover:rotate-1 cursor-pointer"
                onError={(e) => {
                  e.target.src = "https://placehold.co/100x100";
                }}
              />
            </div>
          </div>
        </div>

        {/* Text Info */}
        <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold drop-shadow-lg text-center hover:text-cyan-300 transition-colors duration-300 animate-pulse-slow">
          {cardDetails?.title?.toUpperCase() || "UNTITLED"},{" "}
          {cardDetails?.category?.toUpperCase() || "UNKNOWN"},{" "}
          {cardDetails?.landMark?.toUpperCase() || "UNKNOWN"}
        </div>

        {/* Description */}
        <div className="text-white text-[10px] sm:text-xs md:text-sm lg:text-base font-medium drop-shadow-lg text-center hover:text-cyan-300 transition-colors duration-300 animate-pulse-slow">
          {cardDetails?.description?.toUpperCase() || "NO DESCRIPTION"}
        </div>

        {/* Rent */}
        <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold drop-shadow-lg text-center hover:text-emerald-300 transition-colors duration-300 animate-pulse-slow">
          Rs. {cardDetails?.rent || "0"}/day
        </div>

        {/* Ratings */}
        <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold drop-shadow-lg text-center hover:text-amber-300 transition-colors duration-300 animate-pulse-slow">
          <IoIosStar className="inline text-amber-400" /> {cardDetails?.ratings || "N/A"}
        </div>

        {/* Conditional Buttons */}
        {cardDetails?.host === userData?._id ? (
          <button
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-12 sm:h-14 md:h-16 mx-auto mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:brightness-110 active:scale-95 transition-all duration-400 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-white/40"
            onClick={() => setUpdatePopUp((prev) => !prev)}
          >
            Edit Listing
          </button>
        ) : (
          <button
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-12 sm:h-14 md:h-16 mx-auto mt-4 sm:mt-6 md:mt-8 bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 text-white text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:brightness-110 active:scale-95 transition-all duration-400 ease-in-out transform hover:-translate-y-2 border border-transparent hover:border-white/40"
            onClick={() => setBookingPopUp((prev) => !prev)}
            disabled={cardDetails?.isBooked}
          >
            {cardDetails?.isBooked ? "Already Booked" : "Reserve"}
          </button>
        )}
      </div>

      {/* Update Popup */}
      {updatePopUp && (
        <div className="w-full h-full flex items-center justify-center bg-black/90 absolute top-0 z-[100] backdrop-blur-xl">
          <RxCross2
            className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-rose-700 to-red-800 hover:from-rose-800 hover:to-red-900 transition-all duration-400 ease-in-out cursor-pointer rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-rose-700/70 hover:scale-110 active:scale-90 transform hover:-rotate-12 z-50 absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8"
            onClick={() => setUpdatePopUp(false)}
          />

          <div className="px-3 sm:px-4 md:px-6 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl hover:brightness-110 transition-all duration-300 cursor-pointer absolute top-4 sm:top-6 md:top-8 right-4 sm:right-6 md:right-8"  onClick={handleUpdateListing} disabled={updating}>
           {updating ? "Updating..." : "Updating Your details"}
          </div>

          <form
            action=""
            className="mt-16 sm:mt-20 md:mt-24 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[800px] w-full bg-white/15 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-[0_0_50px_rgba(124,58,237,0.6)] transition-all duration-500 ease-in-out flex flex-col items-start max-h-[80vh] sm:max-h-[85vh] overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="title"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                placeholder="Enter the title.."
                className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-white/50"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="des"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Description
              </label>
              <textarea
                id="des"
                placeholder="Enter description.."
                className="w-full h-20 sm:h-24 md:h-28 px-3 sm:px-4 py-2 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 resize-none placeholder-white/50"
                required
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              ></textarea>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="img1"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Image1{" "}
                <span className="text-xs sm:text-sm text-white/60">
                  (Current: {cardDetails?.image1 ? "Uploaded" : "None"})
                </span>
              </label>
              <input
                type="file"
                id="img1"
                accept="image/*"
                className="w-full h-10 sm:h-11 md:h-12 file:px-3 sm:file:px-4 file:py-2 file:rounded-xl file:bg-cyan-100/20 file:border-0 file:text-cyan-300 file:font-medium bg-white/10 text-white/80 border border-white/30 rounded-xl shadow-sm transition-all duration-300"
                onChange={handleImage1}
              />
              {cardDetails?.image1 && (
                <img
                  src={cardDetails.image1}
                  alt="Current Image 1"
                  className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 object-cover mt-2 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="img2"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Image2{" "}
                <span className="text-xs sm:text-sm text-white/60">
                  (Current: {cardDetails?.image2 ? "Uploaded" : "None"})
                </span>
              </label>
              <input
                type="file"
                id="img2"
                accept="image/*"
                className="w-full h-10 sm:h-11 md:h-12 file:px-3 sm:file:px-4 file:py-2 file:rounded-xl file:bg-cyan-100/20 file:border-0 file:text-cyan-300 file:font-medium bg-white/10 text-white/80 border border-white/30 rounded-xl shadow-sm transition-all duration-300"
                onChange={handleImage2}
              />
              {cardDetails?.image2 && (
                <img
                  src={cardDetails.image2}
                  alt="Current Image 2"
                  className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 object-cover mt-2 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="img3"
                className="text-sm sm:text-base md:font-semibold text-white"
              >
                Image3{" "}
                <span className="text-xs sm:text-sm text-white/60">
                  (Current: {cardDetails?.image3 ? "Uploaded" : "None"})
                </span>
              </label>
              <input
                type="file"
                id="img3"
                accept="image/*"
                className="w-full h-10 sm:h-11 md:h-12 file:px-3 sm:file:px-4 file:py-2 file:rounded-xl file:bg-cyan-100/20 file:border-0 file:text-cyan-300 file:font-medium bg-white/10 text-white/80 border border-white/30 rounded-xl shadow-sm transition-all duration-300"
                onChange={handleImage3}
              />
              {cardDetails?.image3 && (
                <img
                  src={cardDetails.image3}
                  alt="Current Image 3"
                  className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 object-cover mt-2 rounded-xl shadow-sm hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="rent"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Rent
              </label>
              <input
                type="number"
                id="rent"
                placeholder="Enter the rent.."
                className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-white/50"
                required
                onChange={(e) => setRent(e.target.value)}
                value={rent}
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="city"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter the City.."
                className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-white/50"
                required
                onChange={(e) => setCity(e.target.value)}
                value={city}
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="landmark"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                placeholder="Enter the landmark.."
                className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-white/50"
                required
                onChange={(e) => setLandMark(e.target.value)}
                value={landMark}
              />
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 w-full">
              <label
                htmlFor="category"
                className="text-sm sm:text-base md:text-lg font-semibold text-white"
              >
                Category
              </label>
              <input
                type="text"
                id="category"
                placeholder="Enter the category.."
                className="w-full h-10 sm:h-11 md:h-12 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-sm focus:ring-2 focus:ring-cyan-500 transition-all duration-300 placeholder-white/50"
                required
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
            </div>

            <button
              type="submit"
              className="w-full h-10 sm:h-11 md:h-12 bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 text-white text-sm sm:text-base md:text-lg font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:brightness-110 active:scale-95 transition-all duration-400 ease-in-out mt-4 sm:mt-5 md:mt-6"
              onClick={handleUpdateListing}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Listing"}
            </button>

            <button
              type="submit"
              className="w-full h-10 sm:h-11 md:h-12 bg-gradient-to-r from-red-700 via-rose-600 to-pink-600 text-white text-sm sm:text-base md:text-lg font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] hover:brightness-110 active:scale-95 transition-all duration-400 ease-in-out mt-4 sm:mt-5 md:mt-6"
              onClick={handleDeleteListing}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete Listing"}
            </button>
          </form>
        </div>
      )}

      {bookingPopUp && (
        <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 bg-black/90 absolute top-0 z-[100] backdrop-blur-xl p-4 sm:p-6">
          <RxCross2
            className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 bg-gradient-to-br from-rose-700 to-red-800 hover:from-rose-800 hover:to-red-900 transition-all duration-400 ease-in-out cursor-pointer rounded-full flex items-center justify-center text-white shadow-xl hover:shadow-rose-700/70 hover:scale-110 active:scale-90 transform hover:-rotate-12 z-50 absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8"
            onClick={() => setBookingPopUp(false)}
          />

          <form
            className="max-w-[95%] sm:max-w-[450px] md:max-w-[500px] w-full h-[450px] sm:h-[480px] md:h-[520px] overflow-auto bg-white/15 p-4 sm:p-6 md:p-8 rounded-3xl flex items-center justify-start flex-col gap-4 border border-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
            onSubmit={(e) => {
              e.preventDefault();
              handleBookNow();
            }}
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl w-full flex items-center justify-center border-b-2 py-3 sm:py-4 border-white/30 font-extrabold text-white tracking-tight bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 text-transparent">
              Confirm & Book
            </h1>

            <div className="w-full h-[70%] mt-3 sm:mt-4 bg-white/10 rounded-2xl p-3 sm:p-4 md:p-6 flex-col space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                Your Trip
              </h3>

              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <label
                  htmlFor="checkIn"
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white"
                >
                  CheckIn
                </label>
                <input
                  type="date"
                  id="checkIn"
                  min={minDate}
                  className="w-full h-10 sm:h-11 md:h-12 lg:h-14 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ease-in-out placeholder-white/50"
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkIn}
                />
              </div>

              <div className="flex flex-col gap-2 sm:gap-3 w-full">
                <label
                  htmlFor="checkOut"
                  className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white"
                >
                  CheckOut
                </label>
                <input
                  type="date"
                  id="checkOut"
                  min={minDate}
                  className="w-full h-10 sm:h-11 md:h-12 lg:h-14 px-3 sm:px-4 rounded-xl bg-white/10 text-white font-medium border border-white/30 outline-none shadow-md hover:shadow-lg focus:ring-2 focus:ring-cyan-500 transition-all duration-300 ease-in-out placeholder-white/50"
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                  value={checkOut}
                />
              </div>

              <div className="w-full flex items-center justify-center">
                <button
                  type="submit"
                  className="w-full h-10 sm:h-11 md:h-12 lg:h-14 bg-gradient-to-r from-cyan-600 via-teal-500 to-emerald-500 text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:brightness-110 active:scale-95 transition-all duration-400 ease-in-out"
                  disabled={booking}  onClick={()=>navigate("/booked")}
                >
                  {booking ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>

          <div className="max-w-[95%] sm:max-w-[450px] md:max-w-[500px] w-full h-[450px] sm:h-[480px] md:h-[520px] bg-white/15 p-4 sm:p-6 md:p-8 rounded-3xl flex items-center justify-center flex-col gap-4 border border-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]">
            <div className="w-[85%] sm:w-[80%] h-[30%] border border-white/20 rounded-2xl flex justify-center items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 h-20 sm:h-24 md:h-28 lg:h-32 flex items-center justify-center flex-shrink-0 rounded-xl overflow-hidden shadow-sm">
                <img
                  src={cardDetails.image1}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <img
                  src={cardDetails.image2}
                  alt=""
                  className="w-full h-full object-cover hidden"
                />
                <img
                  src={cardDetails.image3}
                  alt=""
                  className="w-full h-full object-cover hidden"
                />
              </div>
              <div className="w-[80%] h-20 sm:h-24 md:h-28 space-y-1 sm:space-y-1.5">
                <h1 className="w-[90%] truncate text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">{`IN ${cardDetails.landMark.toUpperCase()} , ${cardDetails.city.toUpperCase()}`}</h1>
                <h1 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white">
                  {cardDetails.title.toUpperCase()}
                </h1>
                <h1 className="text-[10px] sm:text-xs md:text-sm lg:text-base text-white/80">
                  {cardDetails.category.toUpperCase()}
                </h1>
                <h1 className="flex items-center gap-1 text-xs sm:text-sm md:text-base lg:text-lg">
                  <IoIosStar className="text-amber-400" />
                  <span className="text-white font-medium">
                    {cardDetails.ratings || "N/A"}
                  </span>
                </h1>
              </div>
            </div>
            <div className="w-[95%] h-[60%] border border-white/20 rounded-2xl flex justify-center items-start gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5 flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                Booking Price
              </h1>
              <p className="w-full flex justify-between items-center px-3 sm:px-4 md:px-5">
                <span className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">{`₹${cardDetails.rent} X ${night} nights`}</span>
                <span className="text-white/80 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                  {night > 0 ? cardDetails.rent * night : "0"}
                </span>
              </p>
              <p className="w-full flex justify-between items-center px-3 sm:px-4 md:px-5">
                <span className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">Tax</span>
                <span className="text-white/80 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                  {night > 0 ? (cardDetails.rent * 7) / 100 : "0"}
                </span>
              </p>
              <p className="w-full flex justify-between items-center px-3 sm:px-4 md:px-5 border-b-2 border-white/30 pb-2 sm:pb-3">
                <span className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">Airbnb Charge</span>
                <span className="text-white/80 font-medium text-xs sm:text-sm md:text-base lg:text-lg">
                  {night > 0 ? (cardDetails.rent * 7) / 100 : "0"}
                </span>
              </p>
              <p className="w-full flex justify-between items-center px-3 sm:px-4 md:px-5">
                <span className="font-bold text-white text-xs sm:text-sm md:text-base lg:text-lg">Total Price</span>
                <span className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg">{night > 0 ? total : "0"}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewCard;