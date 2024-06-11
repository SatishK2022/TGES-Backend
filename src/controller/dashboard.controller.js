import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

const getAllRetailUsers = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, retail_user.* FROM retail_user INNER JOIN user ON retail_user.userId = user.id`;
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        console.log(cleanedResult);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No retail users found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "All retail users retrieved successfully"
            )
        )
    } catch (error) {
        console.log("Error getting all retail users:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all retail users"
            )
        )
    }
})

const getAllCorporateUsers = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, corporate_user.* FROM corporate_user INNER JOIN user ON corporate_user.userId = user.id`;
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        console.log(cleanedResult);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No corporate users found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "All corporate users retrieved successfully"
            )
        )
    } catch (error) {
        console.log("Error getting all corporate users:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all corporate users"
            )
        )
    }
})

const getAllVendors = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, vendor.* FROM vendor INNER JOIN user ON vendor.userId = user.id`;
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        console.log(cleanedResult);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No vendors found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "All vendors retrieved successfully"
            )
        )
    } catch (error) {
        console.log("Error getting all vendors:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all vendors"
            )
        )
    }
})

export {
    getAllRetailUsers,
    getAllCorporateUsers,
    getAllVendors
}