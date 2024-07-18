import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addBranch, addEmployee, getBranches, getEmployees } from "../controller/corporateDashboard.controller.js";
const router = express.Router();

router
    .route("/branch")
    .post(isLoggedIn, addBranch)
    .get(isLoggedIn, getBranches);

router
    .route("/employee")
    .post(isLoggedIn, addEmployee)
    .get(isLoggedIn, getEmployees);

export default router;