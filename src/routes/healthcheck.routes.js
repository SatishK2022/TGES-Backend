import express from "express";
import { healthcheck } from "../controller/healthcheck.controller.js";
const router = express.Router();

router.get("/", healthcheck);

export default router