import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ListingPage1 from "./pages/ListingPage1";
import ListingPage2 from "./pages/ListingPage2";
import ListingPage3 from "./pages/ListingPage3";
import { userDataContext } from "./Context/User.Context";
import Home from "./pages/Home";
import MyListing from "./pages/MyListing";
import ViewCard from "./pages/ViewCard";
import MyBooking from "./pages/MyBooking";
import Booked from "./pages/Booked";

const App = () => {
  const { userData } = useContext(userDataContext) || {};

  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/listingpage1"
          element={userData != null ? <ListingPage1 /> : <Navigate to="/" />}
        />
        <Route
          path="/listingpage2"
          element={userData != null ? <ListingPage2 /> : <Navigate to="/" />}
        />
        <Route
          path="/listingpage3"
          element={userData != null ? <ListingPage3 /> : <Navigate to="/" />}
        />

        <Route
          path="/mylisting"
          element={userData != null ? <MyListing/> : <Navigate to="/mylisting" />}
        />

        <Route
          path="/viewcard"
          element={userData != null ? <ViewCard/> : <Navigate to="/viewcard" />}
        />

        
        <Route
          path="/mybooking"
          element={userData != null ? <MyBooking/> : <Navigate to="/mybooking" />}
        />

        <Route
          path="/booked"
          element={userData != null ? <Booked/> : <Navigate to="/booked" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;