import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token)
      return res
        .status(401)
        .json({ message: "unauthorized user", success: false, data: null });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id)
      return res
        .status(401)
        .json({ message: "unauthorized", success: false, data: null });

    const user = await userModel.findById(decoded.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "unauthorized", success: false, data: null });

    req.userId = user._id;

    next();
    // req.userId = user._id.toString(); //attach the user id to the request by expanding the object which we will use to identify who is the user
    // console.log(req.userId);
  } catch (error) {
    res
      .status(500)
      .json({ message: "server internal error", success: false, data: null });
    console.log(error.message);
  }
};
