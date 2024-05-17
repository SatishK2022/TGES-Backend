import jwt from "jsonwebtoken"
import asyncHandler from "../utils/asyncHandler";

const isLoggedIn =asyncHandler(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(500).json({
            success: false,
            message: "Unauthorized request"
        })
    }

    const tokenDetails = jwt.verify(token, process.env.JWT_SECRET);
    console.log(tokenDetails)

    const sql = `SELECT * FROM user WHERE id = ?`;
    const [result, fields] = await db.query(sql, [tokenDetails.id]);

    if (!tokenDetails) {
        return res.status(500).json({
            success: false,
            message: "Unauthenticated! Please Login"
        })
    }

    req.user = result[0];
    next();
})

export {
    isLoggedIn
}