import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  /**
   * 1 validate the data email name password x
   * 2 check if the email is existed since we have email unique x
   * 3 hash the password
   * 4 save the use
   * 5 send the response
   */
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({
      success: false,
      message: "Please enter all required fields",
      data: null,
    });
  if (password.length < 6)
    return res.status(400).json({
      message: "Weak password",
      success: false,
      data: null,
    });

  try {
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser)
      return res.status(400).json({
        message: "this email is already registered",
        success: false,
        data: null,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      name: name,
      email: email,
      password: hashedPass,
    });

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(201).json({
      message: "user registered sucessfully",
      success: true,
      data: { user: userWithoutPassword },

      // data: {
      //   user: {
      //     name: user.name,
      //     email: user.email,
      //     id: user._id,
      //   },
      // },
    });
  } catch (error) {
    res.status.json({ message: error.message, success: false, data: null });
  }
};

const signIn = async (req, res) => {
  /**
   * 1 validate the data email password
   * 2 check if the email is existed
   * 3 check if the password is correct
   * 4 jwt token from the id
   * 5 send the client with cookie
   * 6 send the response
   */

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      message: "Please enter all required fields",
      success: false,
      data: null,
    });
  if (password.length < 6)
    return res.status(400).json({
      message: "weak password",
      success: false,
      data: null,
    });

  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        message: "incorrect email adrress",
        success: false,
        data: null,
      });
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res
        .status(400)
        .json({ message: "incorrect password", success: false, data: null });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 day
      secure: process.env.STATUS === "production" ? true : false,
    });
    const { password: _, ...userWithoutPassword } = user._doc; // remove password from the user object
    res.status(200).json({
      message: "login successfully",
      success: true,
      data: { user: userWithoutPassword },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: error.message, success: false, data: null });
  }
};

const signOut = (req, res) => {
  /**
   * 1 remove the token from the cookie using res.clearCookie(name)
   * 2 res signout succesfully
   */

  res
    .clearCookie("token")
    .status(200)
    .json({ message: "signout successfully", success: true, data: null });
};

const currentUser = async (req, res) => {
  /**
   * 1 get token from the cookie
   * 2 if there is no token return 401
   * 3 verify the token using jwt
   * 4 get decoded id from the token
   * 5 if there is no id then return
   * 6 check the user from the db
   * 7 send the user info
   */

  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ message: "unauthorized user", success: false, data: null });

  try {
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

    const { password, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      message: "user retrived successfully",
      success: true,
      data: {
        user: userWithoutPassword,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, data: null });
    console.log(error.message);
  }
};

export { signUp, signIn, signOut, currentUser };
