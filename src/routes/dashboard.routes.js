import express from "express";
import { getAllAirDetails, getAllBusDetails, getAllCabDetails, getAllCabRateCard, getAllCorporateUsers, getAllHealthInsurance, getAllHotelDetails, getAllRetailUsers, getAllTrainDetails, getAllTravelInsurance, getAllVendors, loginAdmin, logoutAdmin, registerAdmin } from "../controller/dashboard.controller.js";
import { isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/register")
    .post(registerAdmin);

router.route("/login")
    .post(loginAdmin);

router.route("/logout")
    .get(isAdmin, logoutAdmin);

router.route("/retail")
    .get(isAdmin, getAllRetailUsers);

router.route("/corporate")
    .get(isAdmin, getAllCorporateUsers);

router.route("/vendor")
    .get(isAdmin, getAllVendors);

router.route("/train")
    .get(isAdmin, getAllTrainDetails)

router.route("/air")
    .get(isAdmin, getAllAirDetails)

router.route("/cab")
    .get(isAdmin, getAllCabDetails)

router.route("/bus")
    .get(isAdmin, getAllBusDetails)

router.route("/hotel")
    .get(isAdmin, getAllHotelDetails)

router.route("/healthInsurance")
    .get(isAdmin, getAllHealthInsurance)

router.route("/travelInsurance")
    .get(isAdmin, getAllTravelInsurance)

router.route("/getCabRateCard")
    .get(isAdmin, getAllCabRateCard)

export default router;