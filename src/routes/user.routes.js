import express from "express";
import { corporateLogin, corporateRegister, logout, retailLogin, retailRegister, vendorLogin, vendorRegister } from "../controller/user.controller.js";

const router = express.Router();

router.post("/corporate-register", corporateRegister)
router.post("/retail-register", retailRegister)
router.post("/vendor-register", vendorRegister)
router.post("/retail-login", retailLogin)
router.post("/corporate-login", corporateLogin)
router.post("/vendor-login", vendorLogin)
router.get("/logout", logout)

export default router;