import express from "express";
import upload from "../Middlewares/multer.js";
import {
  addlisting,
  deleteListing,
  findListing,
  getListing,
  ratingListing,
  search,
  updateListing,
} from "../controllers/listing.controller.js";
import isAuth from "../Middlewares/isAuth.js";

let listingRouter = express.Router();

listingRouter.post(
  "/add",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    }
    next();
  },
  addlisting
);

listingRouter.get("/get", getListing);
listingRouter.get("/findlistingbyid/:id", isAuth, findListing);
listingRouter.delete("/delete/:id", isAuth, deleteListing);
listingRouter.post("/ratings/:id", isAuth, ratingListing);
listingRouter.get("/search", search);
listingRouter.put(
  "/update/:id",
  isAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  (err, req, res, next) => {
    if (err) {
      return res
        .status(400)
        .json({ message: `File upload error: ${err.message}` });
    }
    next();
  },
  updateListing
);

export default listingRouter;