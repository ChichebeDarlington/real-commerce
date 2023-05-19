import express from "express";
import { signup, signin, signout } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/signout", signout);
// router.get("/hello", requireSignin, (req, res) => {
//   res.send("hello dear");
// });

export default router;
