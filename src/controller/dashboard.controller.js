import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";
import { comparePassword, generateToken, hashPassword } from "../utils/helper.js";

let db = await connectToDb();

/**
 * @registerAdmin
 * @params req, res
 * @Description : This function is used to create admin data in the 'admin' table of the 'tges' database using the MySQL module
*/
const registerAdmin = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM admin WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        if (result.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "Admin already exists"
                )
            );
        }

        const sql2 = `INSERT INTO admin (email, password) VALUES (?, ?)`;
        const hashedPassword = await hashPassword(password);
        const params2 = [email, hashedPassword];
        const [result2, fields2] = await db.query(sql2, params2);

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Admin registered successfully"
            )
        );
    } catch (error) {
        console.log("Error while registering admin: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while registering admin"
            )
        );
    }
});

/**
 * @loginAdmin
 * @params req, res
 * @Description : This function is used to login admin data in the 'admin' table of the 'tges' database using the MySQL module
*/
const loginAdmin = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, password } = reqBody;

    if (!email || !password) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM admin WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Admin not found"
                )
            );
        }

        const admin = result[0];

        console.log(admin)

        const passwordMatch = await comparePassword(password, admin.password);
        if (!passwordMatch) {
            return res.status(401).json(
                new ApiResponse(401, null, "Invalid credentials")
            );
        }

        const token = generateToken({
            id: admin.id,
            email: admin.email,
        })

        const cookieOptions = {
            httpOnly: true,
            secure: true,
        }

        const cleanedResult = {
            ...admin,
            id: undefined,
            password: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        };

        return res
            .status(200)
            .cookie("token", token, cookieOptions)
            .json(
                new ApiResponse(
                    200,
                    cleanedResult,
                    "Admin logged in successfully"
                )
            );
    } catch (error) {
        console.log("Error while logging in admin: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while logging in admin"
            )
        );
    }
});

/**
 * @logoutAdmin
 * @params req, res
 * @Description : This function is used to logout admin data in the 'admin' table of the 'tges' database using the MySQL module
*/
const logoutAdmin = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token")
        .json(
            new ApiResponse(
                200,
                null,
                "Admin logged out successfully"
            )
        );
});

/**
 * @getAllRetailUsers
 * @params req, res
 * @Description : This function is used to get all retail users data in the 'retail_user' table of the 'tges' database using the MySQL module
*/
const getAllRetailUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Extract search criteria from the request body
    const { firstName, email } = req.body || {};

    try {
        // Initialize SQL query and parameters
        let sql = `
            SELECT SQL_CALC_FOUND_ROWS user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, retail_user.* 
            FROM retail_user 
            INNER JOIN user ON retail_user.userId = user.id`;
        const params = [];

        // Add search conditions if provided
        if (firstName) {
            sql += ` WHERE retail_user.firstName LIKE ?`;
            params.push(`%${firstName}%`); // Use LIKE for partial matches
        }
        if (email) {
            sql += ` AND user.email LIKE ?`;
            params.push(`%${email}%`); // Use LIKE for partial matches
        }

        // Add pagination to the SQL query
        sql += ` ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        params.push(limit, skip);

        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No retail users found"
                )
            );
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "All retail users retrieved successfully"
            )
        );
    } catch (error) {
        console.log("Error getting all retail users:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all retail users"
            )
        );
    }
});

/**
 * @getAllCorporateUsers
 * @params req, res
 * @Description : This function is used to get all corporate users data in the 'corporate_user' table of the 'tges' database using the MySQL module
*/
const getAllCorporateUsers = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Extract search criteria from the request body
    const { companyName, email } = req.body || {};

    try {
        // Initialize SQL query and parameters
        let sql = `
            SELECT SQL_CALC_FOUND_ROWS user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, corporate_user.* 
            FROM corporate_user 
            INNER JOIN user ON corporate_user.userId = user.id`;
        const params = [];

        // Add search conditions if provided
        if (companyName) {
            sql += ` WHERE corporate_user.companyName LIKE ?`;
            params.push(`%${companyName}%`); // Use LIKE for partial matches
        }
        if (email) {
            sql += ` AND user.email LIKE ?`;
            params.push(`%${email}%`); // Use LIKE for partial matches
        }

        // Add ordering and pagination to the SQL query
        sql += ` ORDER BY corporate_user.createdAt DESC LIMIT ? OFFSET ?`;
        params.push(limit, skip);

        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No corporate users found"
                )
            );
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "All corporate users retrieved successfully"
            )
        );
    } catch (error) {
        console.log("Error getting all corporate users:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all corporate users"
            )
        );
    }
});

/**
 * @getAllVendors
 * @params req, res
 * @Description : This function is used to get all vendors data in the 'vendor' table of the 'tges' database using the MySQL module
*/
const getAllVendors = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Extract search criteria from the request body
    const { companyName, email } = req.body || {};

    try {
        // Initialize SQL query and parameters
        let sql = `
            SELECT SQL_CALC_FOUND_ROWS user.id, user.email, user.zipCode, user.country, user.city, user.state, user.password, vendor.* 
            FROM vendor 
            INNER JOIN user ON vendor.userId = user.id`;
        const params = [];

        // Add search conditions if provided
        if (companyName) {
            sql += ` WHERE vendor.companyName LIKE ?`;
            params.push(`%${companyName}%`); // Use LIKE for partial matches
        }
        if (email) {
            sql += ` AND user.email LIKE ?`;
            params.push(`%${email}%`); // Use LIKE for partial matches
        }

        // Add ordering and pagination to the SQL query
        sql += ` ORDER BY vendor.createdAt DESC LIMIT ? OFFSET ?`;
        params.push(limit, skip);

        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No vendors found"
                )
            );
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, password, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "All vendors retrieved successfully"
            )
        );
    } catch (error) {
        console.log("Error getting all vendors:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting all vendors"
            )
        );
    }
});

/**
 * @getAllTrainDetails
 * @params req, res
 * @Description : This function is used to get all train details data in the 'train' table of the 'tges' database using the MySQL module
*/
const getAllTrainDetails = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM train ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No train details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM air ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No air details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM cab ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No cab details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM bus ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No bus details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM hotel ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No hotel details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;
        
        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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

/**
 * @getAllTravelInsurance
 * @params req, res
 * @Description : This function is used to get all travel insurance details data in the 'travelInsurance' table of the 'tges' database using the MySQL module
*/
const getAllTravelInsurance = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM travelInsurance ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No travel insurance details found"
                )
            )
        }
        
        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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

/**
 * @getAllHealthInsurance
 * @params req, res
 * @Description : This function is used to get all health insurance details data in the 'healthInsurance' table of the 'tges' database using the MySQL module
*/
const getAllHealthInsurance = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM healthInsurance ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "No health insurance details found"
                )
            )
        }

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cleanedResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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
    registerAdmin,
    loginAdmin,
    logoutAdmin,
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