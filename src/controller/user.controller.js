import connectToDb from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, generateToken, hashPassword, isValuePresent } from "../utils/helper.js";

let db = await connectToDb();

/**
 * @retailRegister
 * @params req, res
 * @Description : This function is used to create retail user data in the 'retail_user' table of the 'tges' database using the MySQL module
*/
const retailRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { firstName, secondName, lastName, email, residentialAddress, zipCode, country, city, state, phoneNumber1, phoneNumber2, stateCode, countryCode, username, password, gender, occupation, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website } = reqBody;

    if (!isValuePresent(reqBody)) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        // Check for duplicate email or username
        const checkEmailSql = `SELECT * FROM user WHERE email = ? `;
        const emailParams = [email];
        const [existingUserResult, existingUserFields] = await db.query(checkEmailSql, emailParams);

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

        const insertUserSql = `INSERT INTO user (email, zipCode, country, state, city, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, state, city, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertRetailUserSql = `INSERT INTO retail_user (userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const retailParams = [userId, firstName, secondName, lastName, username, gender, phoneNumber1, phoneNumber2, stateCode, countryCode, occupation, residentialAddress, companyName, designation, companyAddress, howDidYouKnow, preferredCurrency, website];
        await db.query(insertRetailUserSql, retailParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Retail User Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
});

/**
 * @corporateRegister
 * @params req, res
 * @Description : This function is used to create corporate user data in the 'corporate_user' table of the 'tges' database using the MySQL module
*/
const corporateRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, email, password, zipCode, country, city, state } = reqBody;

    let contactDepartmentTitle = (contactDepartment?.title === 'Other') ? contactDepartment?.otherTitle : contactDepartment?.title;

    try {
        // Check for duplicate email
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult, emailFields] = await db.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email"
                )
            );
        }

        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertCorprate = `INSERT INTO corporate_user (userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartment, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const corprateParams = [userId, industry, companyName, address1, address2, address3, address4, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactDepartmentTitle, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website];
        await db.query(insertCorprate, corprateParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Corporate User Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
});

/**
 * @vendorRegister
 * @params req, res
 * @Description : This function is used to create vendor user data in the 'vendor' table of the 'tges' database using the MySQL module
*/
const vendorRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { areaOfWork, companyName, zipCode, country, city, state, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, landlineCityCode, landlineCountryCode, contactPersonGender, phoneNumber, landlineNumber, countryCode, stateCode, email, password, website, address1, address2, address3, address4 } = reqBody;

    if (!isValuePresent(reqBody)) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        // Check for duplicate email or username
        const checkEmailSql = `SELECT * FROM user WHERE email = ?`;
        const emailParams = [email];
        const [emailResult, emailFields] = await db.query(checkEmailSql, emailParams);

        if (emailResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email or username"
                )
            );
        }

        const insertUserSql = `INSERT INTO user (email, zipCode, country, city, state, password) VALUES ( ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, zipCode, country, city, state, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);

        const userId = result.insertId;

        const insertVendorSql = `INSERT INTO vendor (userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode,contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const vendorParams = [userId, areaOfWork, companyName, phoneNumber, countryCode, stateCode, landlineNumber, landlineCityCode, landlineCountryCode, contactPersonFirstName, contactPersonSecondName, contactPersonLastName, contactPersonGender, website, address1, address2, address3, address4];
        await db.query(insertVendorSql, vendorParams);

        // Send Mail
        // await sendMail(
        //     email,
        //     "Welcome to TGES",
        //     `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
        // )

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Vendor Created Successfully"
            )
        );
    } catch (error) {
        console.error('Error during user registration:', error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred during registration"
            )
        );
    }
})

/**
 * @retailLogin
 * @params req, res
 * @Description : This function is used to login retail user data in the 'user' table of the 'tges' database using the MySQL module
*/
const retailLogin = asyncHandler(async (req, res) => {
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

    const sql = `SELECT * FROM user WHERE email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];

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
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    // Remove password from user object
    delete user.password;

    // Add user details from retail_user table
    const getRetailUserSql = `SELECT * FROM retail_user WHERE userId = ?`;
    const retailUserParams = [user.id];
    const [retailUserResult, retailUserFields] = await db.query(getRetailUserSql, retailUserParams);

    if (retailUserResult.length > 0) {
        user.retailUser = retailUserResult[0];
    }

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "Login Successful"
            )
        );
})

/**
 * @corporateLogin
 * @params req, res
 * @Description : This function is used to login corporate user data in the 'user' table of the 'tges' database using the MySQL module
*/
const corporateLogin = asyncHandler(async (req, res) => {
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

    const sql = `SELECT * FROM user WHERE email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];

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
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    // Remove password from user object
    delete user.password;

    const getCorporateUserSql = `SELECT * FROM corporate_user WHERE userId = ?`;
    const corporateUserParams = [user.id];
    const [corporateUserResult, corporateUserFields] = await db.query(getCorporateUserSql, corporateUserParams);

    user.corporateUser = corporateUserResult[0];

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "Login Successful"
            )
        );
})

/**
 * @vendorLogin
 * @params req, res
 * @Description : This function is used to login vendor user data in the 'user' table of the 'tges' database using the MySQL module
*/
const vendorLogin = asyncHandler(async (req, res) => {
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

    const sql = `SELECT * FROM user WHERE email = ?`;
    const params = [email];
    const [result, fields] = await db.query(sql, params);
    if (result.length === 0) {
        return res.status(404).json(
            new ApiResponse(
                404,
                null,
                "User not found"
            )
        );
    }

    const user = result[0];
    console.log(user);

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
    })

    const cookieOptions = {
        httpOnly: true,
        secure: true,
    }

    // Remove password from user object
    delete user.password;

    const getVendorSql = `SELECT * FROM vendor WHERE userId = ?`;
    const vendorParams = [user.id];
    const [vendorResult, vendorFields] = await db.query(getVendorSql, vendorParams);
    user.vendor = vendorResult[0];

    return res
        .status(200)
        .cookie("token", token, cookieOptions)
        .json(
            new ApiResponse(
                200,
                user,
                "Login Successful"
            )
        );
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

export {
    corporateRegister,
    retailRegister,
    vendorRegister,
    retailLogin,
    corporateLogin,
    vendorLogin,
    logout
}