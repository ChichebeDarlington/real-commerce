import { error } from "console";
import formidable from "formidable";
// import _ from "loadash";
import fs from "fs";
import Product from "../models/productModel.js";

export const productById = async (req, res, next, id) => {
  const product = await Product.findById(id).exec();
  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }
  req.product = product;
  next();
};

export const productCreate = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    console.log(files);

    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }
    const { description, name, price, shipping, category, quantity } = fields;
    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !shipping ||
      !quantity
    ) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1000000000) {
        return res
          .status(400)
          .json({ error: "Image size must be less than 1mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.type;
    }
    const savedProduct = await product.save();
    res.status(201).json({ savedProduct });
  });
};

export const productRead = async (req, res) => {
  //   req.product.photo = undefined;
  return res.status(200).json(req.product);
};

export const productDelete = async (req, res) => {
  console.log(req.product);
  let product = req.product;
  product.deleteOne();
  return res.status(200).json(product);
};

export const productReadAll = async (req, res) => {
  let order = req.query.order ? req.query.order : "desc";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  const product = await Product.find({})
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit);

  if (!product) {
    return res.status(400).json({ error: "Product not found" });
  }
  return res.status(200).json(product);
};

export const photo = async (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

export const relatedProduct = async (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  const product = await Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .limit(limit)
    .populate("category", "_id name")
    .exec();
  if (!product) {
    return res.status(400).json({ error: "No related product found" });
  }
  return res.status(200).json(product);
};

export const productCategory = async (req, res) => {
  // const product = await Product.distinct("category");
  // if (!product) {
  //   return res.status(400).json({ error: "No product found" });
  // }
  // return res.status(200).json(product);

  Product.distinct("category", {}, (error, product) => {
    if (error) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    res.status(200).json(product);
  });
};

// Still confused about this functionality. Will look into it
export const listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  const product = Product.find(findArgs)
    .select("-select")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec();
  if (!product) {
    return res.status(400).json({ error: "Something went wrong" });
  }
  return res.status(200).json(product);
};
