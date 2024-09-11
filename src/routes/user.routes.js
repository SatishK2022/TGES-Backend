import express from "express";
import { corporateRegister, forgotPassword, login, logout, profile, resetPassword, retailRegister, updateRetailProfile, vendorRegister, verifyOtp } from "../controller/user.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/corporate-register", corporateRegister)
router.post("/retail-register", retailRegister)
router.post("/vendor-register", vendorRegister)
router.post("/login", login)
router.get("/logout", logout)

router.get("/profile", isLoggedIn, profile)
router.post("/update-profile", isLoggedIn, updateRetailProfile)

router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

export default router;