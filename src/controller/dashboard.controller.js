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

const getAllTrainDetails = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM train`
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No train details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Train details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting train details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting train details"
            )
        )
    }
})

const getAllAirDetails = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM air`
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No air details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Air details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting air details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting air details"
            )
        )
    }
})

const getAllCabDetails = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM cab`
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No cab details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Cab details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting cab details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting cab details"
            )
        )
    }
})

const getAllBusDetails = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM bus`
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No bus details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Volvo details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting volvo details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting volvo details"
            )
        )
    }
})

const getAllHotelDetails = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM hotel`
        const [result, fields] = await db.query(sql);

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No hotel details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Hotel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting hotel details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting hotel details"
            )
        )
    }
})

export {
    getAllRetailUsers,
    getAllCorporateUsers,
    getAllVendors,
    getAllTrainDetails,
    getAllAirDetails,
    getAllCabDetails,
    getAllBusDetails,
    getAllHotelDetails
}