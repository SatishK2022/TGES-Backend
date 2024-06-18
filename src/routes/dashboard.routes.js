import express from "express";
import { getAllAirDetails, getAllBusDetails, getAllCabDetails, getAllCorporateUsers, getAllRetailUsers, getAllTrainDetails, getAllVendors } from "../controller/dashboard.controller.js";

const router = express.Router();

router.route("/retail")
    .get(getAllRetailUsers);

router.route("/corporate")
    .get(getAllCorporateUsers);

router.route("/vendor")
    .get(getAllVendors);

router.route("/train")
    .get(getAllTrainDetails)

router.route("/air")
    .get(getAllAirDetails)

router.route("/cab")
    .get(getAllCabDetails)

router.route("/bus")
    .get(getAllBusDetails)

export default router;