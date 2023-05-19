import express from "express";
import { createCategory } from "../controllers/categoryController.js";
import { isAdmin, isAuth } from "../controllers/authController.js";
import { userById } from "../controllers/userController.js";
import {
  productCreate,
  productById,
  productRead,
  productDelete,
  productReadAll,
  relatedProduct,
  productCategory,
  listBySearch,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/product/read/:productId", productRead);
router.post("/product/create/:userId", productCreate);
router.delete("/product/delete/:productId/:userId", productDelete);
router.get("/product/read-all", productReadAll);
router.get("/product/related-product", relatedProduct);
router.get("/product/product-category", productCategory);
router.post("/product/by/search", listBySearch);

router.param("productId", productById);
router.param("userId", userById);

export default router;
