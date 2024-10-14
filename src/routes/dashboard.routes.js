import express from "express";
import { addContactDetails, getAllAirDetails, getAllBusDetails, getAllCabDetails, getAllCabRateCard, getAllCorporateUsers, getAllHealthInsurance, getAllHotelDetails, getAllPassportDetails, getAllRetailUsers, getAllTrainDetails, getAllTravelInsurance, getAllVendors, getContactDetails, getLogMessages, loginAdmin, logoutAdmin, registerAdmin, searchContactDetails } from "../controller/dashboard.controller.js";
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

router.route("/passport")
    .get(isAdmin, getAllPassportDetails)

router.route("/healthInsurance")
    .get(isAdmin, getAllHealthInsurance)

router.route("/travelInsurance")
    .get(isAdmin, getAllTravelInsurance)

router.route("/get-logs")
    .get(isAdmin, getLogMessages)

router.route("/getCabRateCard")
    .get(isAdmin, getAllCabRateCard)

router.route("/contact")
    .post(isAdmin, addContactDetails)
    .get(isAdmin, getContactDetails)

router.route("/contact/search/:query/:value")
    .get(isAdmin, searchContactDetails)

export default router;