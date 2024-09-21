import { pool as db } from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { RETAIL_TYPE_NAME, CORPORATE_TYPE_NAME, VENDOR_TYPE_NAME } from "../constants.js";
import { corporateRegisterTemplate, forgotPasswordTemplate, retailRegisterTemplate, vendorRegisterTemplate } from "../email/email-template.js";
import { comparePassword, generateCompanyId, generateOTP, generateToken, hashPassword } from "../utils/helper.js";


/**
 * @retailRegister
 * @params req, res
 * @Description : This function is used to create retail user data in the 'retail_user' table of the 'tges' database using the MySQL module
*/
const retailRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { firstName, secondName, lastName, email, residentialAddress, zipCode, country, city, state, phoneNumber1, phoneNumber2, stateCode, countryCode, username, password, gender, occupation, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website } = reqBody;

    // Get a connection from the pool
    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();
        // Check for duplicate email or username
        const checkEmailSql = `SELECT * FROM user WHERE email = ? `;
        const emailParams = [email];
        const [existingUserResult, existingUserFields] = await connection.query(checkEmailSql, emailParams);

        console.log(existingUserResult);

        if (existingUserResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email or username"
                )
            );
        }

        const companyId = generateCompanyId(firstName);

        const insertUserSql = `INSERT INTO user (email, zipCode, country, state, city, password, companyId, userType) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, state, city, hashedPassword, companyId, RETAIL_TYPE_NAME];
        const [result, fields] = await connection.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertRetailUserSql = `INSERT INTO retail_user (userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const retailParams = [userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website];
        await connection.query(insertRetailUserSql, retailParams);

        // Send Mail to user
        // try {
        //     sendMail(
        //         email,
        //         "Welcome to TGES",
        //         retailRegisterTemplate({ fullName: `${firstName} ${lastName}`, email, residentialAddress, city, country, state, zipCode, phoneNumber1 })
        //     );
        // } catch (error) {
        //     console.error('Error sending welcome email:', error);
        // }

        // Send Mail to admin
        // try {
        //     sendMail(
        //         "tges@gmail.com",
        //         "Retail Registration",
        //         retailRegisterTemplate({ fullName: `${firstName} ${lastName}`, email, residentialAddress, city, country, state, zipCode, phoneNumber1 })
        //     );
        // } catch (error) {
        //     console.error('Error sending admin notification email:', error);
        // }

        // Commit the transaction
        await connection.commit();

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Retail User Created Successfully"
            )
        );
    } catch (error) {
        // Rollback the transaction
        await connection.rollback();
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    } finally {
        // Release the connection
        connection.release();
    }
});

/**
 * @corporateRegister
 * @params req, res
 * @Description : This function is used to create corporate user data in the 'corporate_user' table of the 'tges' database using the MySQL module
*/
const corporateRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, email, password, zipCode, country, city, state, gstNumber } = reqBody;

    let contactDepartmentTitle = (contactDepartment?.title === 'Other') ? contactDepartment?.otherTitle : contactDepartment?.title;

    // Get a connection from the pool
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        // Check for duplicate email
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult, emailFields] = await connection.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email"
                )
            );
        }

        const companyId = generateCompanyId(companyName);

        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password, companyId, userType) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword, companyId, CORPORATE_TYPE_NAME];
        const [result, fields] = await connection.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertCorprate = `INSERT INTO corporate_user (userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, gstNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const corprateParams = [userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartmentTitle, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, gstNumber];
        await connection.query(insertCorprate, corprateParams);

        // Send Mail
        // try {
        //     sendMail(
        //         email,
        //         "Welcome to TGES",
        //         corporateRegisterTemplate({ companyName, address: `${address1} ${address2} ${address3} ${address4}`, city, country, state, zipCode, phoneNumber, contactPerson: `${contactPersonFirstName} ${contactPersonLastName}`, landlineNumber, email })
        //     )
        // } catch (error) {
        //     console.log("Error while sending welcome email: ", error);
        // }

        // Send Mail to admin
        // try {
        //     sendMail(
        //         "tges@gmail.com",
        //         "Corporate Registration",
        //         corporateRegisterTemplate({ companyName, address: `${address1} ${address2} ${address3} ${address4}`, city, country, state, zipCode, phoneNumber, contactPerson: `${contactPersonFirstName} ${contactPersonLastName}`, landlineNumber, email })
        //     )
        // } catch (error) {
        //     console.log("Error while sending admin notification email: ", error);
        // }

        // Commit the transaction
        await connection.commit();

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Corporate User Created Successfully"
            )
        );
    } catch (error) {
        // Rollback the transaction
        await connection.rollback();
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    } finally {
        // Release the connection
        connection.release();
    }
});

/**
 * @vendorRegister
 * @params req, res
 * @Description : This function is used to create vendor user data in the 'vendor' table of the 'tges' database using the MySQL module
*/
const vendorRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const {
        areaOfWork, companyName, zipCode, country, city, state,
        contactPersonFirstName, contactPersonSecondName, contactPersonLastName,
        landlineCityCode, landlineCountryCode, contactPersonGender,
        phoneNumber, landlineNumber, countryCode, stateCode,
        email, password, website, address1, address2, address3, address4, services, gstNumber
    } = reqBody;

    // Get a connection from the pool
    const connection = await db.getConnection();

    try {
        // Start a transaction
        await connection.beginTransaction();

        // Check for duplicate email
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult] = await connection.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email or username"
                )
            );
        }

        const companyId = generateCompanyId(companyName);
        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password, companyId, userType) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword, companyId, VENDOR_TYPE_NAME];
        const [result] = await connection.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertVendorSql = `INSERT INTO vendor (userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4, services, gstNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const vendorParams = [userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4, JSON.stringify(services), gstNumber];
        await connection.query(insertVendorSql, vendorParams);

        // Commit the transaction
        await connection.commit();

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Vendor Created Successfully"
            )
        );
    } catch (error) {
        // Rollback the transaction in case of an error
        await connection.rollback();
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    } finally {
        // Release the connection back to the pool
        connection.release();
    }
});

/**
 * @login
 * @params req, res
 * @Description : This function is used to login retail user data in the 'user' table of the 'tges' database using the MySQL module
*/
const login = asyncHandler(async (req, res) => {
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

    // SQL queries for all user types
    const queries = [
        {
            sql: `SELECT retail_user.*, user.* FROM retail_user INNER JOIN user ON retail_user.userId = user.id WHERE user.email = ?;`,
            params: [email]
        },
        {
            sql: `SELECT corporate_user.*, user.* FROM corporate_user INNER JOIN user ON corporate_user.userId = user.id WHERE user.email = ?;`,
            params: [email]
        },
        {
            sql: `SELECT vendor.*, user.* FROM vendor INNER JOIN user ON vendor.userId = user.id WHERE user.email = ?;`,
            params: [email]
        }
    ];

    let user = null;

    try {
        // Check each user type
        for (const query of queries) {
            const [result] = await db.query(query.sql, query.params);
            if (result.length > 0) {
                user = { ...result[0] };
                break;
            }
        }

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        const passwordMatch = await comparePassword(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Invalid credentials"
                )
            );
        }

        const token = generateToken({
            id: user.id,
            email: user.email,
            userType: user.userType
        });

        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };

        const cleanedResult = {
            ...user,
            otp: undefined,
            otpExpires: undefined,
            password: undefined,
            userId: undefined,
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
                    "Login Successful"
                )
            );
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during login"
            )
        );
    }
});

/**
 * @forgotPassword
 * @params req, res
 * @Description : This function is used to send a forgot password email to the user.
 */
const forgotPassword = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email } = reqBody;

    if (!email) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Email is required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        // Generate OTP
        const otp = generateOTP(6);
        const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

        await db.query('UPDATE user SET otp = ?, otpExpires = ? WHERE email = ?', [otp, otpExpires, email]);

        // Send OTP via email
        try {
            await sendMail(
                email,
                "Forgot Password OTP",
                forgotPasswordTemplate(otp)
            )
        } catch (error) {
            console.log("Error while sending OTP: ", error);
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "OTP sent to your email"
            )
        );
    } catch (error) {
        console.log("Error while forgot password: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while forgot password"
            )
        );
    }
})

/**
 * @verifyOtp
 * @params req, res
 * @Description : This function is used to verify the OTP sent to the user's email.
 */
const verifyOtp = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { email, otp } = reqBody;

    if (!email || !otp) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        if (user.otp !== otp) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "Invalid OTP"
                )
            );
        }

        if (user.otpExpires < Date.now()) {
            return res.status(401).json(
                new ApiResponse(
                    401,
                    null,
                    "OTP expired"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "OTP verified"
            )
        );
    } catch (error) {
        console.log("Error while verifying OTP: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while verifying OTP"
            )
        );
    }
})

/**
 * @resetPassword
 * @params req, res
 * @Description : This function is used to reset the user's password.
 */
const resetPassword = asyncHandler(async (req, res) => {
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
        const sql = `SELECT * FROM user WHERE email = ?`;
        const params = [email];
        const [result, fields] = await db.query(sql, params);

        const user = result[0];

        if (!user) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        const hashedPassword = await hashPassword(password);

        await db.query('UPDATE user SET password = ? WHERE email = ?', [hashedPassword, email]);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Password reset successful"
            )
        );
    } catch (error) {
        console.log("Error while resetting password: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while resetting password"
            )
        );
    }
})

/**
 * @logout
 * @params req, res
 * @Description : This function is used to logout user by removing the token cookie from the browser.
 */
const logout = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .clearCookie("token")
        .json(
            new ApiResponse(
                200,
                null,
                "Logout Successful"
            )
        );
})

/**
 * @profile
 * @params req, res
 * @Description : This function is used to get the user profile.
 */
const profile = asyncHandler(async (req, res) => {
    const { user } = req;

    console.log(user)

    try {
        const sql = `SELECT * FROM user WHERE id = ?`;
        const params = [user.id];
        const [users, usersField] = await db.query(sql, params);

        console.log(users)

        if (users.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        const sql2 = `SELECT user.id, user.email, user.zipCode, user.country, user.city, user.state, ${users[0].userType === RETAIL_TYPE_NAME ? "retail_user.*" : users[0].userType === CORPORATE_TYPE_NAME ? "corporate_user.*" : users[0].userType === VENDOR_TYPE_NAME ? "vendor.*" : ""} FROM ${users[0].userType === RETAIL_TYPE_NAME ? "retail_user" : users[0].userType === CORPORATE_TYPE_NAME ? "corporate_user" : users[0].userType === VENDOR_TYPE_NAME ? "vendor" : ""} INNER JOIN user ON ${users[0].userType === RETAIL_TYPE_NAME ? "retail_user.userId" : users[0].userType === CORPORATE_TYPE_NAME ? "corporate_user.userId" : users[0].userType === VENDOR_TYPE_NAME ? "vendor.userId" : ""} = user.id WHERE user.id = ?`;
        const params2 = [user.id];
        const [result, resultField] = await db.query(sql2, params2);

        const { userId, createdAt, updatedAt, ...cleanedResult } = result[0];

        return res.status(200).json(
            new ApiResponse(
                200,
                cleanedResult,
                "Profile fetched successfully"
            )
        );
    } catch (error) {
        console.error("Error while getting profile: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting profile"
            )
        );
    }
})

/**
 * @updateRetailProfile
 * @params req, res
 * @Description : This function is used to update the user profile.
 */
const updateRetailProfile = asyncHandler(async (req, res) => {
    const { user } = req;
    const reqBody = req.body || {};
    const { zipCode, country, city, state, firstName, secondName, lastName, gender, occupation, phoneNumber1, phoneNumber2, residentialAddress, countryCode, stateCode, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website } = reqBody;

    const connection = await db.getConnection();

    try {
        const sql = `SELECT * FROM user WHERE id = ?`;
        const params = [user.id];
        const [result, fields] = await connection.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "User not found"
                )
            );
        }

        await connection.beginTransaction();

        const sql1 = `UPDATE user SET zipCode = ?, country = ?, city = ?, state = ? WHERE id = ?`;
        const params1 = [zipCode, country, city, state, user.id];
        await connection.query(sql1, params1);

        const sql2 = `UPDATE retail_user SET firstName = ?, secondName = ?, lastName = ?, gender = ?, occupation = ?, phoneNumber1 = ?, phoneNumber2 = ?, residentialAddress = ?, countryCode = ?, stateCode = ?, companyName = ?, designation = ?, companyAddress = ?, howDidYouKnow = ?, preferredCurrency = ?, website = ? WHERE userId = ?`;
        const params2 = [firstName, secondName, lastName, gender, occupation, phoneNumber1, phoneNumber2, residentialAddress, countryCode, stateCode, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website, user.id];
        await connection.query(sql2, params2);


        await connection.commit();
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Profile updated successfully"
            )
        );
    } catch (error) {
        await connection.rollback();
        console.error("Error while updating retail profile: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while updating retail profile"
            )
        );
    } finally {
        connection.release();
    }
})

export {
    corporateRegister,
    retailRegister,
    vendorRegister,
    login,
    forgotPassword,
    verifyOtp,
    resetPassword,
    logout,
    profile,
    updateRetailProfile
}