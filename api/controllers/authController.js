import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

export const signup = async (req, res) => {
  const { password, email, name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const doesEmailExist = await User.findOne({ email });
  if (doesEmailExist) {
    return res.status(400).json({ error: "Email is already in use" });
  }
  const user = await new User(req.body);
  const savedUser = await user.save();
  return res.status(201).json(savedUser);
  // console.log(savedUser);
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ errror: "Such user does not exist..." });
  }
  if (!user.authenticate(password)) {
    return res.status(400).json({ errror: "Password does not match" });
  }
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res.cookie("t", token, { expire: new Date() + 999 });

  return res.json({ token, user });
};

export const signout = (req, res) => {
  res.clearCookie("t");
  res.json({ msg: "You signed out..." });
};

// export const requireSignin = expressJwt({
//   secret: process.env.JWT_SECRET,
//   userProperty: "auth",
// });

export const isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.auth._id;
  if (!user) {
    return res.status(403).json({ errror: "Access denied" });
  }
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Admin course! Access denied" });
  }
  next();
};
