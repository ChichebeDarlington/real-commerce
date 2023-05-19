import express from "express";
import {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
  readAllCategory,
  categoryById,
} from "../controllers/categoryController.js";
import { isAdmin, isAuth } from "../controllers/authController.js";
import { userById } from "../controllers/userController.js";

const router = express.Router();

// use the authroute to make sure that it is only admin can add products, later. dont forget
router.post("/category/create", createCategory);
router.get("/category/read/:categoryId", readCategory);
router.put("/category/update/:categoryId/:userId", updateCategory);
router.delete("/category/delete/:categoryId/:userId", deleteCategory);
router.get("/category/read-all/", readAllCategory);

router.param("userId", categoryById);
router.param("userId", userById);

export default router;
