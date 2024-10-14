import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { pool as db } from "../config/db.js";
import { calculateAge, comparePassword, generateToken, hashPassword } from "../utils/helper.js";


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
    const { firstName, email } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

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
                    200,
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
    const { companyName, email } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

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
                    200,
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
    const { companyName, city, zipCode } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

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
        } else if (city) {
            sql += ' AND user.city LIKE ?';
            params.push(`%${city}%`);
        } else if (zipCode) {
            sql += ` AND user.zipCode LIKE ?`;
            params.push(`%${zipCode}%`); // Use LIKE for partial matches
        }

        // Add ordering and pagination to the SQL query
        sql += ` ORDER BY vendor.createdAt DESC LIMIT ? OFFSET ?`;
        params.push(limit, skip);

        console.log(sql)
        console.log(params)

        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
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
                    200,
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
            if (!user.age) {
                let calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
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
                    200,
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
            let calculatedAge;
            if (!user.age) {
                calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
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
                    200,
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
                    200,
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
            if (!user.dob) {
                let calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
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
                    200,
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
 * @getAllPassportDetails
 * @params req, res
 * @Description : This function is used to get all passport details data in the 'passport' table of the 'tges' database using the MySQL module
*/
const getAllPassportDetails = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM passport ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "No passport details found"
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
                "Passport details fetched successfully"
            )
        )
    } catch (error) {
        console.error("Error getting passport details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting passport details"
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
                    200,
                    null,
                    "No travel insurance details found"
                )
            )
        }

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            if (!user.dob) {
                const calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
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
                    200,
                    null,
                    "No health insurance details found"
                )
            )
        }

        const cleanedResult = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            if (!user.dob) {
                const calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
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

/**
 * @getAllCabRateCard
 * @params req, res
 * @Description : This function is used to get all cab rate card details data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
*/
const getAllCabRateCard = asyncHandler(async (req, res) => {
    const { zipCode, city, companyId, countryId } = req.query; // Added countryId
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    console.log(zipCode, city, companyId, countryId, req.query);

    let sql = `
    SELECT SQL_CALC_FOUND_ROWS user.id, user.email, user.zipCode, user.country, user.state, user.companyId, cab_rate_card.* 
    FROM cab_rate_card 
    INNER JOIN user ON cab_rate_card.userId = user.id`;

    const params = [];
    let whereClauses = [];

    // Search conditions
    if (zipCode) {
        whereClauses.push(`user.zipCode LIKE ?`);
        params.push(`%${zipCode}%`);
    }
    if (city) {
        whereClauses.push(`LOWER(cab_rate_card.city) LIKE ?`);
        params.push(`%${city.toLowerCase()}%`);
    }
    if (companyId) {
        whereClauses.push('LOWER(user.companyId) LIKE ?');
        params.push(`%${companyId.toLowerCase()}%`);
    }

    if (whereClauses.length > 0) {
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
    }

    sql += ` ORDER BY cab_rate_card.createdAt DESC LIMIT ? OFFSET ?`;
    params.push(limit, skip);

    console.log(sql);
    console.log(params);

    try {
        const [result] = await db.query(sql, params);

        console.log(result);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(200, null, "No cab rate card details found")
            );
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cleanedResult = result.map(user => {
            const { userId, type, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(200, {
                data: cleanedResult,
                pagination: {
                    total_records: totalCount,
                    total_pages: Math.ceil(totalCount / limit),
                    limit: limit,
                    current_page: page,
                    next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                    prev_page: page > 1 ? page - 1 : null
                }
            }, "Cab rate card details fetched successfully")
        );
    } catch (error) {
        console.error("Error getting cab rate card: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while getting cab rate card details")
        );
    }
});

/**
 * @getLogMessages
 * @params req, res
 * @Description : This function is used to get all the log messages in the 'logs' table of the 'tges' database using the MySQL module
 */
const getLogMessages = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM logs ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "No log messages found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: result,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Log messages fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting log messages:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting log messages"
            )
        )
    }
})

/**
 * @addContactDetails
 * @params req, res
 * @Description : This function is used to add contact details in the 'contact' table of the 'tges' database using the MySQL module
 */
const addContactDetails = asyncHandler(async (req, res) => {
    const reqBody = req.body;
    const { name, email, phoneNumbers: { phoneNoOne, phoneNoTwo }, address, type, profession } = reqBody;

    try {
        const sql = `INSERT INTO contact (name, email, phoneNoOne, phoneNoTwo, address, type, profession) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [name, email, phoneNoOne, phoneNoTwo, address, type, profession];
        const [result] = await db.query(sql, params);

        if (result.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to add contact details"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Contact details added successfully"
            )
        )
    } catch (error) {
        console.error("Error while adding contact details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while adding contact details"
            )
        )
    }
})

/**
 * @getContactDetails
 * @params req, res
 * @Description : This function is used to get all the contact details in the 'contact' table of the 'tges' database using the MySQL module
 */
const getContactDetails = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM contact ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [limit, skip];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "No contact details found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: result,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Contact details fetched successfully"
            )
        )
    } catch {
        console.error("Error while getting contact details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting contact details"
            )
        )
    }
})

/**
 * @searchContactDetails
 * @params req, res
 * @Description : This function is used to search contact details in the 'contact' table of the 'tges' database using the MySQL module
 */
const searchContactDetails = asyncHandler(async (req, res) => {
    const { query, value } = req.params;

    try {
        let sql = ``;
        let params = [];
        if (query === 'id') {
            sql = `SELECT * FROM contact WHERE id = ?`;
            params = [value];
        } else if (query === 'name') {
            sql = `SELECT * FROM contact WHERE name LIKE ?`;
            params = [`%${value}%`];
        } else if (query === 'email') {
            sql = `SELECT * FROM contact WHERE email LIKE ?`;
            params = [`%${value}%`];
        } else if (query === 'phone') {
            sql = `SELECT * FROM contact WHERE phoneNoOne LIKE ? OR phoneNoTwo LIKE ?`;
            params = [`%${value}%`, `%${value}%`];
        }

        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "No contact details found"
                )
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Contact details fetched successfully"
            )
        )
    } catch (error) {
        console.error("Error while searching contact details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while searching contact details"
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
    getAllPassportDetails,
    getAllTravelInsurance,
    getAllHealthInsurance,
    getAllCabRateCard,
    getLogMessages,
    addContactDetails,
    getContactDetails,
    searchContactDetails
}