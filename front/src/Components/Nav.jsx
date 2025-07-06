import React, { useState, useCallback } from "react";
import logo from "../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/User.Context";
import { listingDataContext } from "../Context/ListingContext";

function Nav() {
  let [showpopup, setShowpopup] = useState(false);
  let [searchQuery, setSearchQuery] = useState("");
  let [cate, setCate] = useState("");
  let [isLoggingOut, setIsLoggingOut] = useState(false);
  let { listingData, setListingData, newListData, setNewListData } = useContext(listingDataContext) || {};
  let { serverUrl } = useContext(authDataContext) || {};
  let { userData, setUserData } = useContext(userDataContext) || {};
  let navigate = useNavigate();

  const categories = [
    { name: "trending", icon: <MdWhatshot />, label: "Trending" },
    { name: "villa", icon: <GiFamilyHouse />, label: "Villa" },
    { name: "farmHouse", icon: <FaTreeCity />, label: "Farm House" },
    { name: "poolHouse", icon: <MdOutlinePool />, label: "Pool House" },
    { name: "rooms", icon: <MdBedroomParent />, label: "Rooms" },
    { name: "flat", icon: <BiBuildingHouse />, label: "Flat" },
    { name: "pg", icon: <IoBedOutline />, label: "PG" },
    { name: "cabin", icon: <GiWoodCabin />, label: "Cabin" },
    { name: "shops", icon: <SiHomeassistantcommunitystore />, label: "Shops" },
  ];

  const handleLogOut = async () => {
    if (isLoggingOut || !serverUrl) return;
    setIsLoggingOut(true);
    try {
      let result = await axios.post(`${serverUrl}/api/auth/logout`, null, {
        withCredentials: true,
      });
      setUserData(null);
      console.log(result.data);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to log out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handleCategory = useCallback(
    (category) => {
      const lowerCaseCategory = category.toLowerCase();
      setCate(lowerCaseCategory);
      if (lowerCaseCategory === "trending") {
        setNewListData(listingData);
      } else {
        const filteredData = listingData.filter(
          (list) => list.category.toLowerCase() === lowerCaseCategory
        );
        setNewListData(filteredData);
      }
    },
    [listingData, setNewListData]
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setNewListData(listingData);
      return;
    }
    const lowerQuery = searchQuery.toLowerCase();
    const filteredData = listingData.filter(
      (list) =>
        list.city.toLowerCase().includes(lowerQuery) ||
        list.landMark.toLowerCase().includes(lowerQuery) ||
        list.title.toLowerCase().includes(lowerQuery)
    );
    setNewListData(filteredData);
  };

  if (!listingDataContext || !authDataContext || !userDataContext) {
    console.error("Context providers are missing.");
    return <div className="text-white text-center py-4">Error: Application context not found.</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 py-3 flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-500">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <img
            src={logo}
            alt="Logo"
            className="w-16 sm:w-20 rounded-xl shadow-md hover:rotate-1 hover:scale-105 transition-all duration-300"
          />
          <button
            onClick={() => setShowpopup((prev) => !prev)}
            className="sm:hidden p-2 rounded-lg bg-white/10 border border-white/30 shadow-xl hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle menu"
          >
            <GiHamburgerMenu className="w-5 h-5 text-white" />
          </button>
        </div>

        <div className="w-full sm:w-1/2 md:w-2/5 lg:w-1/3 relative mt-3 sm:mt-0">
          <form onSubmit={handleSearch}>
            <input
              id="search-input"
              type="text"
              placeholder="Anywhere | Any Location | Any City"
              className="w-full px-4 py-2 rounded-full bg-white/90 text-gray-800 shadow-inner placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-300 text-sm sm:text-base transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search listings by location or title"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-pink-600 hover:bg-pink-700 rounded-full shadow-lg transition duration-300"
              aria-label="Search"
            >
              <IoSearch className="w-4 h-4 text-white" />
            </button>
          </form>
        </div>

        <div className="hidden sm:flex items-center gap-2 md:gap-4">
          <span
            className="text-sm md:text-base px-3 py-2 text-white hover:bg-white/20 rounded-full cursor-pointer transition-all duration-300"
            onClick={() => navigate("/listingpage1")}
          >
            List Your Home
          </span>
          <button
            onClick={() => setShowpopup((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/30 rounded-full shadow-xl hover:bg-white/20 transition-all duration-300"
            aria-label="Toggle user menu"
          >
            <span className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-black shadow-md hover:scale-105 transition duration-300">
              <GiHamburgerMenu className="w-5 h-5 text-white" />
            </span>
            {userData ? (
              <span className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white text-base md:text-lg font-semibold flex items-center justify-center shadow-md hover:scale-105 transition duration-300">
                {userData?.name?.slice(0, 1).toUpperCase() || "?"}
              </span>
            ) : (
              <span className="p-2 rounded-full bg-gradient-to-br from-gray-800 to-black shadow-md hover:scale-105 transition duration-300">
                <CgProfile className="w-6 h-6 text-white" />
              </span>
            )}
          </button>
        </div>

        {showpopup && (
          <div className="absolute top-full right-0 sm:right-4 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-slide-down">
            <ul className="flex flex-col gap-1 text-sm font-medium py-2 text-gray-800">
              {!userData && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    navigate("/login");
                    setShowpopup(false);
                  }}
                >
                  Login
                </li>
              )}
              {userData && (
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleLogOut}
                >
                  {isLoggingOut ? "Logging out..." : "Logout"}
                </li>
              )}
              <div className="border-t border-gray-200 my-1 mx-4"></div>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/listingpage1");
                  setShowpopup(false);
                }}
              >
                List Your Home
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/mylisting");
                  setShowpopup(false);
                }}
              >
                My Listing
              </li>
              {/* <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  navigate("/mybooking");
                  setShowpopup(false);
                }}
              >
                My Booking
              </li> */}
            </ul>
          </div>
        )}
      </div>

      <div className="w-full bg-white/30 backdrop-blur-md shadow-md border-t border-white/20 overflow-x-auto">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 py-3 whitespace-nowrap transition-all duration-300">
          {categories.map(({ name, icon, label }) => (
            <button
              key={name}
              className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
                cate === name ? "border-b-[1px] border-[#a6a5a5]" : ""
              }`}
              onClick={() => handleCategory(name)}
              aria-label={`Filter by ${label}`}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-pink-300 via-purple-300 to-indigo-400 text-white shadow-xl ring-2 ring-transparent hover:ring-pink-500 transition-all duration-500 hover:scale-110 hover:rotate-2 hover:shadow-xl mb-1">
                <div className="text-lg sm:text-xl group-hover:animate-bounce">{icon}</div>
              </div>
              <h3 className="text-black">{label}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Nav;