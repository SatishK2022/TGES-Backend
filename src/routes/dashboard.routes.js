import express from "express";
import { getAllCorporateUsers, getAllRetailUsers, getAllVendors } from "../controller/dashboard.controller.js";

const router = express.Router();

router.route("/retail")
    .get(getAllRetailUsers);

router.route("/corporate")
    .get(getAllCorporateUsers);

router.route("/vendor")
    .get(getAllVendors);

export default router;