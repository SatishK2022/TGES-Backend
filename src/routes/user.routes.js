import express from "express";
import { corporateLogin, corporateRegister, forgotPassword, logout, resetPassword, retailLogin, retailRegister, vendorLogin, vendorRegister, verifyOtp } from "../controller/user.controller.js";

const router = express.Router();

router.post("/corporate-register", corporateRegister)
router.post("/retail-register", retailRegister)
router.post("/vendor-register", vendorRegister)
router.post("/retail-login", retailLogin)
router.post("/corporate-login", corporateLogin)
router.post("/vendor-login", vendorLogin)
router.get("/logout", logout)

router.post("/forgot-password", forgotPassword)
router.post("/verify-otp", verifyOtp)
router.post("/reset-password", resetPassword)

export default router;