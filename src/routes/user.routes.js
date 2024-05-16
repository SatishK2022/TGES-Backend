import express from "express";
import { corprateRegister, getUsers, retailRegister, vendorRegister } from "../controller/user.controller.js";

const router = express.Router();

router.post("/corprate-register", corprateRegister)
router.post("/retail-register", retailRegister)
router.post("/vendor-register", vendorRegister)
router.get("/users", getUsers)

export default router;