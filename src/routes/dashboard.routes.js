import express from "express";
import { getAllAirDetails, getAllBusDetails, getAllCabDetails, getAllCorporateUsers, getAllHealthInsurance, getAllHotelDetails, getAllRetailUsers, getAllTrainDetails, getAllTravelInsurance, getAllVendors } from "../controller/dashboard.controller.js";

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

router.route("/hotel")
    .get(getAllHotelDetails)

router.route("/healthInsurance")
    .get(getAllHealthInsurance)

router.route("/travelInsurance")
    .get(getAllTravelInsurance)

export default router;