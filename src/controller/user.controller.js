import connectToDb from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, generateToken, hashPassword } from "../utils/helper.js";

let db = await connectToDb();

const retailRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { firstName, secondName, lastName, email, residentialAddress, zipCode, country, city, state, phoneNo, username, password, gender, occupation, companyName, designation, companyAddress, reference, preferredCurrency, website } = reqBody;

    if (!firstName || !secondName || !lastName || !email || !zipCode || !country || !city || !state || !username || !password || !gender || !residentialAddress || !phoneNo) {
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
        const [existingUserResult, existingUserFields] = await db.query(checkEmailSql, emailParams);
    
        console.log(existingUserResult);
    
        if (existingUserResult.length > 0) {
            return res.status(409).json(
                new ApiResponse(
                    409,
                    null,
                    "User already exists with this email"
                )
            );
        }
    
        const insertUserSql = `INSERT INTO user (email, gender, zipCode, country, state, city, username, password) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, gender, zipCode, country, state, city, username, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);
    
        const userId = result.insertId;
    
        const insertRetailUserSql = `INSERT INTO retail_user (userId, firstName, secondName, lastName, phoneNo, occupation, residentialAddress, companyName, designation, companyAddress, reference, preferredCurrency, website) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const retailParams = [userId, firstName, secondName, lastName, phoneNo, occupation, residentialAddress, companyName, designation, companyAddress, reference, preferredCurrency, website];
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

const corprateRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { industry, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, username, email, password, website, address1, address2, address3 } = reqBody;

    if (!industry || !companyName || !zipCode || !country || !city || !state || !gender || !phoneNo1 || !username || !password || !website || !address1) {
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
                    "User already exists with this email"
                )
            );
        }
    
        const insertUserSql = `INSERT INTO user (email, gender, zipCode, country, state, city, username, password) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, gender, zipCode, country, city, state, username, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);
    
        const userId = result.insertId;
    
        const insertCorprateUserSql = `INSERT INTO corporate_user (userId, industry, companyName, phoneNo1, phoneNo2, landlineNo, website, address1, address2, address3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const corprateParams = [userId, industry, companyName, phoneNo1, phoneNo2, landlineNo, website, address1, address2, address3];
        await db.query(insertCorprateUserSql, corprateParams);
    
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

const vendorRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { areaOfWork, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, username, email, password, website, address1, address2, address3 } = reqBody;

    if (!areaOfWork || !companyName || !zipCode || !country || !city || !state || !gender || !phoneNo1 || !username || !password || !website || !address1 || !address2 || !address3) {
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
                    "User already exists with this email"
                )
            );
        }
    
        const insertUserSql = `INSERT INTO user (email, gender, zipCode, country, city, state, username, password) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hashedPassword = await hashPassword(password);
        const userParams = [email, gender, zipCode, country, city, state, username, hashedPassword];
        const [result, fields] = await db.query(insertUserSql, userParams);
    
        const userId = result.insertId;
    
        const insertVendorSql = `INSERT INTO vendor (userId, areaOfWork, companyName, phoneNo1, phoneNo2, landlineNo, website, address1, address2, address3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const vendorParams = [userId, areaOfWork, companyName, phoneNo1, phoneNo2, landlineNo, website, address1, address2, address3];
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

    const getRetailUserSql = `SELECT * FROM retail_user WHERE userId = ?`;
    const retailUserParams = [user.id];
    const [retailUserResult, retailUserFields] = await db.query(getRetailUserSql, retailUserParams);

    user.retailUser = retailUserResult[0];

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

const corprateLogin = asyncHandler(async (req, res) => {
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
    corprateRegister,
    retailRegister,
    vendorRegister,
    retailLogin,
    corprateLogin,
    vendorLogin,
    logout,
}