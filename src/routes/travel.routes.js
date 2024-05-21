import express from "express"
import { createAirTravel, createCabTravel, createTrainTravel, createVolvoBusTravel, deleteAirTravel, deleteCabTravel, deleteTrainTravel, deleteVolvoBusTravel, getAirTravelDetails, getCabTravelDetails, getTrainTravelDetails, getVolvoBusTravelDetails, updateAirTravel, updateCabTravel, updateTrainTravel, updateVolvoBusTravel } from "../controller/travel.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
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

export default router;