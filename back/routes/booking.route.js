import express from "express";
import isAuth from "../Middlewares/isAuth.js";
import { cancelBooking, createBooking } from "../controllers/booking.controller.js";
let bookingRouter = express.Router();

bookingRouter.post("/create/:id", isAuth, createBooking);
bookingRouter.delete("/cancel/:id", isAuth, cancelBooking);
export default bookingRouter;