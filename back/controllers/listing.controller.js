import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

export const addlisting = async (req, res) => {
  try {
    let host = req.userId;
    let { title, description, rent, city, landMark, category } = req.body;

    // Validate required fields
    if (!title || !description || !rent || !city || !landMark || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate user existence
    let user = await User.findById(host);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate file uploads
    if (
      !req.files ||
      !req.files.image1 ||
      !req.files.image2 ||
      !req.files.image3
    ) {
      return res.status(400).json({ message: "All images are required" });
    }

    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    // Check if image uploads were successful
    if (!image1 || !image2 || !image3) {
      return res
        .status(500)
        .json({ message: "Failed to upload one or more images" });
    }

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landMark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Listing created successfully", data: listing });
  } catch (error) {
    res.status(500).json({ message: `Add listing error: ${error.message}` });
  }
};

export const getListing = async (req, res) => {
  try {
    let listing = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};

export const findListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      res.status(404).json({ message: "Listing Not Found" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ message: `findListing error ${error}` });
  }
};

export const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, rent, city, landMark, category } = req.body;

    if (!title || !description || !rent || !city || !landMark || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Fetch existing listing to retain images if not updated
    let existingListing = await Listing.findById(id);
    if (!existingListing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    let image1 = existingListing.image1;
    let image2 = existingListing.image2;
    let image3 = existingListing.image3;

    // Update images only if new files are provided
    if (req.files?.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files?.image2) {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files?.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    if (
      (req.files?.image1 && !image1) ||
      (req.files?.image2 && !image2) ||
      (req.files?.image3 && !image3)
    ) {
      return res
        .status(500)
        .json({ message: "Failed to upload one or more images" });
    }

    let listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landMark,
        category,
        image1,
        image2,
        image3,
        host: req.user?._id, // Assuming isAuth sets req.user
      },
      { new: true }
    );

    return res.status(200).json(listing); // Use 200 for successful update
  } catch (error) {
    return res.status(500).json({ message: "Update Error" }); // Use 500 for server errors
  }
};

export const deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    let user = User.findByIdAndUpdate(
      listing.host,
      {
        $pull: { listing: listing._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User is Not Found" });
    }
    return res.status(201).json({ message: "Listing deleted" });
  } catch (error) {
    return res.status(500).json({ message: `DeleteListing Error ${error}` });
  }
};

export const ratingListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { ratings } = req.body;
    
    // Validate ratings
    if (typeof ratings !== "number" || ratings < 0 || ratings > 5) {
      return res.status(400).json({ message: "Ratings must be a number between 0 and 5" });
    }

    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing Not Found" });
    }
    
    listing.ratings = Number(ratings);
    await listing.save();
    return res.status(200).json({ ratings: listing.ratings });
  } catch (error) {
    return res.status(500).json({ message: `Rating Error: ${error.message}` });
  }
};

export const search = async (req,res)=>{
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Query parameter is required" });
    }
    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { landMark: { $regex: query, $options: "i" } },
      ],
    });
    return res.status(200).json(listings);
  } catch (error) {
    return res.status(500).json({ message: `Search Error: ${error.message}` });
  }
}