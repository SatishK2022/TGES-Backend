import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addCabRateCard, addCabRateCardFile, deleteCabRateCard, downloadCabRateCardFile, getCabRateCardDetails, updateCabRateCard } from "../controller/vendorDashboard.controller.js";
import { checkCabRateCardExists, checkFileExists, upload } from "../middlewares/multer.middleware.js";
const router = express.Router();

router
    .route("/ratecard/cab")
    .post(isLoggedIn, addCabRateCard)
    .get(isLoggedIn, getCabRateCardDetails)

router
    .route("/ratecard/cab/:id")
    .put(isLoggedIn, checkCabRateCardExists, upload.single("cabRateCard"), updateCabRateCard)
    .delete(isLoggedIn, deleteCabRateCard)

router
    .route("/ratecard/cab/upload")
    .post(isLoggedIn, checkFileExists, upload.single("cabRateCard"), addCabRateCardFile)

router
    .route("/ratecard/cab/download")
    .get(isLoggedIn, downloadCabRateCardFile);

export default router;