import React, { useContext, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/User.Context";
import { toast } from "react-toastify";
const Login = () => {
  let [show, setShow] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { loading, setLoading } = useContext(authDataContext);
  let navigate = useNavigate();
  let { serverUrl } = useContext(authDataContext);
  let { userData, setUserData } = useContext(userDataContext);
  const handleLogin = async (e) => {
    setLoading(true);
    try {
      e.preventDefault();
      let result = await axios.post(
        serverUrl + "/api/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      setLoading(false);
      setUserData(result.data);
      navigate("/");
      console.log(result);
      toast.success("Login Successfully")
      
    } catch (error) {
      setLoading(false);
      console.log("error = ", error);
      toast.error(error.response.data.message)
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 p-4">
      <div
        className="w-[50px] h-[50px] bg-[green] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center text-white"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft />
      </div>
      <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-white/20 w-full max-w-md p-8 transition-transform duration-500 hover:scale-[1.02]">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
          Welcome to Airbnb
        </h1>

        <form className="flex flex-col gap-6" onSubmit={handleLogin}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-white text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full h-12 px-4 rounded-xl bg-white/80 text-gray-800 font-medium border-none outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all duration-300"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1 relative">
            <label
              htmlFor="password"
              className="text-white text-lg font-semibold"
            >
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              id="password"
              placeholder="Create a password"
              className="w-full h-12 px-4 rounded-xl bg-white/80 text-gray-800 font-medium border-none outline-none shadow-md focus:ring-2 focus:ring-pink-400 transition-all duration-300 relative"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!show && (
              <FaRegEye
                className="w-[22px] h-[22px] absolute right-[8%] bottom-[10px] cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
            {show && (
              <FaRegEyeSlash
                className="w-[22px] h-[22px] absolute right-[8%] bottom-[10px] cursor-pointer"
                onClick={() => setShow((prev) => !prev)}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:brightness-110 active:scale-95 transition-all duration-300" disabled={loading}
          >
            {loading ? "loading...." : "Login"}
          </button>

          {/* Bottom Link */}
          <p className="text-center text-white/80 text-sm mt-2">
            Create New Account?{" "}
            <span
              className="underline text-green-900 hover:text-white cursor-pointer transition"
              onClick={() => navigate("/signup")}
            >
              SignUp
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
