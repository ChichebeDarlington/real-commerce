import express from "express";
import {
  userById,
  userRead,
  userUpdate,
} from "../controllers/userController.js";
import { isAdmin, isAuth } from "../controllers/authController.js";

const router = express.Router();

router.get("/test/:userId", (req, res) => {
  res.json({ user: req.profile });
});

router.get("/user/:userId", userRead);
router.put("/user/:userId", userUpdate);

router.param("userId", userById);
// router.get("/hello", requireSignin, (req, res) => {
//   res.send("hello dear");
// });

export default router;
