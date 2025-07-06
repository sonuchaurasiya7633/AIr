import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authDataContext } from "./AuthContext";
import { data, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const listingDataContext = createContext();

const ListingContext = ({ children }) => {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontEndImage1, setFrontEndImage1] = useState(null);
  let [frontEndImage2, setFrontEndImage2] = useState(null);
  let [frontEndImage3, setFrontEndImage3] = useState(null);
  let [backendEndImage1, setBackendEndImage1] = useState(null);
  let [backendEndImage2, setBackendEndImage2] = useState(null);
  let [backendEndImage3, setBackendEndImage3] = useState(null);

  let [deleting, setDeleting] = useState(false);
  let [updating, setUpdating] = useState(false);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landMark, setLandMark] = useState("");
  let [category, setCategory] = useState("");
  let [listingData, setListingData] = useState([]);
  let [newListData, setNewListData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let { serverUrl } = useContext(authDataContext) || {};
  let[searchData, setSearchData] = useState([]);

  const handleAddListing = async () => {
    // Error checks for required fields and images
    if (
      !title?.trim() ||
      !description?.trim() ||
      !rent ||
      !city?.trim() ||
      !landMark?.trim() ||
      !category ||
      !backendEndImage1 ||
      !backendEndImage2 ||
      !backendEndImage3
    ) {
      alert("All fields and images are required!");
      return;
    }

    // Validate rent
    const rentValue = Number(rent);
    if (isNaN(rentValue) || rentValue <= 0) {
      alert("Please enter a valid positive rent amount.");
      return;
    }

    // Validate image types
    if (
      !backendEndImage1.type.startsWith("image/") ||
      !backendEndImage2.type.startsWith("image/") ||
      !backendEndImage3.type.startsWith("image/")
    ) {
      alert("All uploaded files must be valid images.");
      return;
    }

    // Validate category
    const validCategories = [
      "trending",
      "villa",
      "farmHouse",
      "poolHouse",
      "rooms",
      "flat",
      "pg",
      "cabin",
      "shops",
    ];
    if (!validCategories.includes(category.toLowerCase())) {
      alert("Invalid category selected.");
      return;
    }

    try {
      let formData = new FormData();
      formData.append("title", title.trim());
      formData.append("image1", backendEndImage1);
      formData.append("image2", backendEndImage2);
      formData.append("image3", backendEndImage3);
      formData.append("description", description.trim());
      formData.append("rent", rent); // Send as string to match backend schema
      formData.append("city", city.trim());
      formData.append("landMark", landMark.trim());
      formData.append("category", category.toLowerCase());

      // Debug: Log FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(`FormData: ${key} =`, value);
      }

      let result = await axios.post(serverUrl + "/api/listing/add", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(result)
      toast.success("AddListing Successfully");

      navigate("/");
      setTitle("");
      setDescription("");
      setFrontEndImage1(null);
      setFrontEndImage2(null);
      setFrontEndImage3(null);
      setBackendEndImage1(null);
      setBackendEndImage2(null);
      setBackendEndImage3(null);
      setRent("");
      setCity("");
      setLandMark("");
      setCategory("");
    } catch (error) {
      console.error("Error adding listing:", error.response?.data || error);
      toast.error(error.response.data.message);
    }
  };

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `/api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      console.log(result);
      if (result.data) {
        setCardDetails(result.data);
        navigate("/viewcard");
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
  try {
    let result = await axios.get(serverUrl + `/api/listing/search?query=${data}`)
    setSearchData(result.data)
  } catch (error) {
    setSearchData(null)
    console.log(error)
  }
  }

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setNewListData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getListing();
  }, [deleting, updating]);

  let value = {
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
    listingData,
    setListingData,
    getListing,
    newListData,
    setNewListData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    deleting,
    setDeleting,
    updating,
    setUpdating,
    handleSearch,
    searchData,
    setSearchData,
  };

  return (
    <listingDataContext.Provider value={value}>
      {children}
    </listingDataContext.Provider>
  );
};

export default ListingContext;
