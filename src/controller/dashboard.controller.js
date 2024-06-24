import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

/**
 * @getAllRetailUsers
 * @params req, res
 * @Description : This function is used to get all retail users data in the 'retail_user' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllCorporateUsers
 * @params req, res
 * @Description : This function is used to get all corporate users data in the 'corporate_user' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllVendors
 * @params req, res
 * @Description : This function is used to get all vendors data in the 'vendor' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllTrainDetails
 * @params req, res
 * @Description : This function is used to get all train details data in the 'train' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllAirDetails
 * @params req, res
 * @Description : This function is used to get all air details data in the 'air' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllCabDetails
 * @params req, res
 * @Description : This function is used to get all cab details data in the 'cab' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllBusDetails
 * @params req, res
 * @Description : This function is used to get all bus details data in the 'bus' table of the 'tges' database using the MySQL module
*/
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

/**
 * @getAllHotelDetails
 * @params req, res
 * @Description : This function is used to get all hotel details data in the 'hotel' table of the 'tges' database using the MySQL module
*/
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

const getAllTravelInsurance = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM travelInsurance`;
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
                    "No travel insurance details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Travel insurance details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting travel insurance: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting travel details"
            )
        )
    }
})

const getAllHealthInsurance = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM healthInsurance`;
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
                    "No health insurance details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Health insurance details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting health insurance: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting health details"
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
    getAllHotelDetails,
    getAllTravelInsurance,
    getAllHealthInsurance
}