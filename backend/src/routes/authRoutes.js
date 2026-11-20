import express from "express";
import { registerUser , GetUser  , GetAllUser , loginUser} from "../controllers/authController.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", protect, GetUser);
router.get("/users", GetAllUser);

export default router;