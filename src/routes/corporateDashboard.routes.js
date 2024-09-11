import express from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { addBranch, addEmployee, deleteBranch, deleteEmployee, getAllBranches, getAllEmployees, getBranchEmployees, getEmployee, updateBranch, updateEmployee, updateProfile } from "../controller/corporateDashboard.controller.js";
const router = express.Router();

router
    .route("/update-profile")
    .post(isLoggedIn, updateProfile);

router
    .route("/branch")
    .post(isLoggedIn, addBranch);

router
    .route("/branch/:branchId")
    .put(isLoggedIn, updateBranch)
    .delete(isLoggedIn, deleteBranch)

router
    .route("/branch/all")
    .get(isLoggedIn, getAllBranches);

router
    .route("/employee/:branchId")
    .post(isLoggedIn, addEmployee)
    .get(isLoggedIn, getBranchEmployees);

router
    .route("/employee/:employeeId")
    .put(isLoggedIn, updateEmployee)
    .delete(isLoggedIn, deleteEmployee)

router
    .route("/employee")
    .get(isLoggedIn, getEmployee);

router
    .route("/employees")
    .get(isLoggedIn, getAllEmployees);

export default router;