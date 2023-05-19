import Category from "../models/categoryModel.js";

export const categoryById = async (req, res, next, id) => {
  const category = await Category.findById(id).exec();
  if (!category) {
    return res.status(400).json({ error: "Category does not exist" });
  }
  req.category = category;
  next();
};

export const createCategory = async (req, res) => {
  const category = await new Category(req.body);
  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }
  const savedCategory = await category.save();
  return res.status(200).json(savedCategory);
};

export const readCategory = async (req, res) => {
  // return res.status(200).json(req.category);
  const category = await Category.findById(req.params.categoryId);
  return res.status(200).json(category);
};

export const updateCategory = async (req, res) => {
  let category = req.category;
  category.name = req.body.name;
  if (category) {
    return res.status(400).json({ error: "An error occured" });
  }
  category.save();
  return res.status(200).json(category);
};

export const deleteCategory = async (req, res) => {
  console.log(req.category);
  let category = req.category;
  category.deleteOne();
  return res.status(200).json(category);
};

export const readAllCategory = async (req, res) => {
  const category = await Category.find({});
  if (!category) {
    return res.status(200).json({ error: "Category does not exist" });
  }
  return res.status(200).json(category);
};
