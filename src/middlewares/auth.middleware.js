import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { pool as db } from "../config/db.js";

/**
 * @isLoggedIn
 * @params req, res, next
 * @Description : This function is used to check if the user is logged in or not
 */
const isLoggedIn = asyncHandler(async (req, res, next) => {
    const tokenDetails = { id: 5 }
    // retail 1
    // corporate 2
    // vendor 5

    // const { token } = req.cookies;

    // if (!token) {
    //     return res.status(401).json(
    //         new ApiResponse(
    //             401,
    //             null,
    //             "Unautherized request"
    //         )
    //     )
    // }

    try {
        // const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);

        const sql = `SELECT * FROM user WHERE id = ?`;
        const params = [tokenDetails.id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Unauthenticated! Please Login"
                )
            )
        }

        const { password, ...others } = result[0];
        req.user = others;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            success: false,
            message: "Unauthenticated! Please Login",
            error
        })
    }
})

/**
 * @isAdmin
 * @params req, res, next
 * @Description : This function is used to check if the user is an admin
 */
const isAdmin = asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Unautherized request"
            )
        )
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);

    const sql = `SELECT * FROM admin WHERE id = ?`;
    const params = [tokenDetails.id];
    const [result, fields] = await db.query(sql, params);

    if (result.length === 0) {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Unauthenticated! Please Login"
            )
        )
    }

    req.user = result[0];

    if (req.user.role && req.user.role === "admin") {
        next();
    } else {
        return res.status(401).json(
            new ApiResponse(
                401,
                null,
                "Unauthenticated! Please Login"
            )
        )
    }
})

export {
    isLoggedIn,
    isAdmin
}
