import express from "express";
import { corprateLogin, corprateRegister, logout, retailLogin, retailRegister, vendorLogin, vendorRegister } from "../controller/user.controller.js";

const router = express.Router();

router.post("/corprate-register", corprateRegister)
router.post("/retail-register", retailRegister)
router.post("/vendor-register", vendorRegister)
router.post("/retail-login", retailLogin)
router.post("/corprate-login", corprateLogin)
router.post("/vendor-login", vendorLogin)
router.get("/logout", logout)

export default router;