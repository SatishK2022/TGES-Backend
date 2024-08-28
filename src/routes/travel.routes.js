import express from "express"
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createTrainTravel, deleteTrainTravel, getTrainTravelDetails, updateTrainTravel } from "../controller/train.controller.js";
import { createAirTravel, deleteAirTravel, getAirTravelDetails, updateAirTravel } from "../controller/air.controller.js";
import { createVolvoBusTravel, deleteVolvoBusTravel, getVolvoBusTravelDetails, updateVolvoBusTravel } from "../controller/volvo.controller.js";
import { createCabTravel, deleteCabTravel, getCabTravelDetails, updateCabTravel } from "../controller/cab.controller.js";
import { createHotelBooking, deleteHotelBooking, getHotelBookings, updateHotelBooking } from "../controller/hotel.controller.js";
import { createPassport, deletePassport, getPassportDetails, updatePassport } from "../controller/passport.controller.js"
import { createTravelInsurance, deleteTravelInsurance, getTravelInsuranceDetails, updateTravelInsurance } from "../controller/travelInsurance.controller.js"
import { createHealthInsurance, deleteHealthInsurance, getHealthInsuranceDetails, updateHealthInsurance } from "../controller/healthInsurance.controller.js"
const router = express.Router()

// Train Routes
router.route("/train")
    .post(isLoggedIn, createTrainTravel)
    .get(isLoggedIn, getTrainTravelDetails)

router.route("/train/:id")
    .put(isLoggedIn, updateTrainTravel)
    .delete(isLoggedIn, deleteTrainTravel)

// Air Routes
router.route("/air")
    .post(isLoggedIn, createAirTravel)
    .get(isLoggedIn, getAirTravelDetails)

router.route("/air/:id")
    .put(isLoggedIn, updateAirTravel)
    .delete(isLoggedIn, deleteAirTravel)

// Volvo Bus Routes
router.route("/bus")
    .post(isLoggedIn, createVolvoBusTravel)
    .get(isLoggedIn, getVolvoBusTravelDetails)

router.route("/bus/:id")
    .put(isLoggedIn, updateVolvoBusTravel)
    .delete(isLoggedIn, deleteVolvoBusTravel)

// Cab Routes
router.route("/cab")
    .post(isLoggedIn, createCabTravel)
    .get(isLoggedIn, getCabTravelDetails)

router.route("/cab/:id")
    .put(isLoggedIn, updateCabTravel)
    .delete(isLoggedIn, deleteCabTravel)

// Hotel Routes
router.route("/hotel")
    .post(isLoggedIn, createHotelBooking)
    .get(isLoggedIn, getHotelBookings)

router.route("/hotel/:id")
    .delete(isLoggedIn, deleteHotelBooking)
    .put(isLoggedIn, updateHotelBooking)

// Passport Routes
router.route("/passport")
    .post(isLoggedIn, createPassport)
    .get(isLoggedIn, getPassportDetails)

router.route("/passport/:id")
    .put(isLoggedIn, updatePassport)
    .delete(isLoggedIn, deletePassport)

// travelInsurance Routes
router.route("/travelInsurance")
    .post(isLoggedIn, createTravelInsurance)
    .get(isLoggedIn, getTravelInsuranceDetails)

router.route("/travelInsurance/:id")
    .put(isLoggedIn, updateTravelInsurance)
    .delete(isLoggedIn, deleteTravelInsurance)

// healthInsurance Routes
router.route("/healthInsurance")
    .post(isLoggedIn, createHealthInsurance)
    .get(isLoggedIn, getHealthInsuranceDetails)

router.route("/healthInsurance/:id")
    .put(isLoggedIn, updateHealthInsurance)
    .delete(isLoggedIn, deleteHealthInsurance)

export default router;