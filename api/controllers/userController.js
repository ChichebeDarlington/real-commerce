import User from "../models/userModel.js";

export const userById = async (req, res, next, id) => {
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  req.profile = user;
  next();
};

export const userRead = (req, res) => {
  req.profile.hash_password = undefined;
  req.profile.salt = undefined;
  return res.status(200).json(req.profile);
};

export const userUpdate = async (req, res) => {
  const update = await User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true }
  );
  if (!update) {
    return res.status(400).json({ error: "Bad request" });
  }
  update.hash_password = undefined;
  update.salt = undefined;
  return res.status(200).json(update);
};
