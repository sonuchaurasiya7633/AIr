import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    let user = await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landMark isBooked host ratings")
    .populate("booking","title image1 image2 image3 description rent category city landMark isBooked host ratings")
    if (!user) {
      res.status(400).json({ message: "user does not Found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: `getCurrent user error ${error}` });
  }
};
