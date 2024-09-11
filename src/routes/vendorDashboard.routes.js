import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addCabRateCard, addCabRateCardFile, addHotelRateCard, addHotelRateCardFile, deleteCabRateCard, deleteHotelRateCard, downloadCabRateCardFile, downloadHotelRateCardFile, getCabRateCardDetails, getHotelRateCardDetails, updateCabRateCard, updateHotelRateCard, updateProfile } from "../controller/vendorDashboard.controller.js";
import { checkFileExists, checkRateCardExists, upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router
    .route("/update-profile")
    .put(isLoggedIn, updateProfile);

// Cab Rate Card
router
    .route("/ratecard/cab")
    .post(isLoggedIn, addCabRateCard)
    .get(isLoggedIn, getCabRateCardDetails)

router
    .route("/ratecard/cab/:id")
    .put(isLoggedIn, checkRateCardExists, upload.single("cabRateCard"), updateCabRateCard)
    .delete(isLoggedIn, deleteCabRateCard)

router
    .route("/ratecard/cab/upload")
    .post(isLoggedIn, checkFileExists, upload.single("cabRateCard"), addCabRateCardFile)

router
    .route("/ratecard/cab/download")
    .get(isLoggedIn, downloadCabRateCardFile);

// Hotel Rate Card
router
    .route("/ratecard/hotel")
    .post(isLoggedIn, addHotelRateCard)
    .get(isLoggedIn, getHotelRateCardDetails)

router
    .route("/ratecard/hotel/:id")
    .put(isLoggedIn, checkRateCardExists, upload.single("hotelRateCard"), updateHotelRateCard)
    .delete(isLoggedIn, deleteHotelRateCard)

router
    .route("/ratecard/hotel/upload")
    .post(isLoggedIn, checkFileExists, upload.single("hotelRateCard"), addHotelRateCardFile)

router
    .route("/ratecard/hotel/download")
    .get(isLoggedIn, downloadHotelRateCardFile);

export default router;