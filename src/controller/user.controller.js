import connectToDb from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { comparePassword, generateToken, hashPassword } from "../utils/helper.js";

let db = await connectToDb();

const retailRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { firstName, secondName, lastName, email, residentialAddress, zipCode, country, city, state, phoneNo, username, password, gender } = reqBody;

    if (!firstName || !secondName || !lastName || !email || !zipCode || !country || !city || !state || !phoneNo || !residentialAddress || !username || !password || !gender) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    // Check for duplicate email or username
    const checkEmailSql = `SELECT * FROM retail_user WHERE email = ? OR username = ?`;
    const emailParams = [email, username];
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

    const sql2 = `INSERT INTO retail_user (firstName, secondName, lastName, email, gender, residentialAddress, zipCode, country, state, city, phoneNo, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const hashedPassword = await hashPassword(password);

    const params = [firstName, secondName, lastName, email, gender, residentialAddress, zipCode, country, state, city, phoneNo, username, hashedPassword];

    const [result, fields] = await db.query(sql2, params);

    // Send Mail
    await sendMail(
        email,
        "Welcome to TGES",
        `<h1>Hi ${firstName} ${lastName}, Welcome to TGES.</h1>`
    )

    return res.status(201).json(
        new ApiResponse(
            201,
            null,
            "Retail User Created Successfully"
        )
    );
});

const corprateRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { industry, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, password, website, address1, address2, address3 } = reqBody;

    if (!industry || !companyName || !zipCode || !country || !city || !state || !gender || !phoneNo1 || !phoneNo2 || !landlineNo || !email || !password || !website || !address1 || !address2 || !address3) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    // Check for duplicate email or username
    const checkEmailSql = `SELECT * FROM corporate_user WHERE email = ?`;
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

    const insertSql = `INSERT INTO corporate_user (industry, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, password, website, address1, address2, address3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const hashedPassword = await hashPassword(password);

    const params = [industry, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, hashedPassword, website, address1, address2, address3];

    const [result, fields] = await db.query(insertSql, params);

    // Send Mail
    // await sendMail(
    //     email,
    //     "Welcome to TGES",
    //     `<h1>Hi ${companyName},</h1>
    //     <p>Congratulations on registering with TGES Travel.</p>
    //     <p>Below are the details of your registration:</p>
    //     <style>
    //         table, th, td {
    //             border: 1px solid black;
    //         }
    //         table {
    //             border-collapse: collapse;
    //         }
    //     </style>
    //     <table>
    //         <tr>
    //             <th style="width: 20%">Industry</th>
    //             <td style="width: 80%">${industry}</td>
    //         </tr>
    //         <tr>
    //             <th>Company Name</th>
    //             <td>${companyName}</td>
    //         </tr>
    //         <tr>
    //             <th>Zip Code</th>
    //             <td>${zipCode}</td>
    //         </tr>
    //         <tr>
    //             <th>Country</th>
    //             <td>${country}</td>
    //         </tr>
    //         <tr>
    //             <th>City</th>
    //             <td>${city}</td>
    //         </tr>
    //         <tr>
    //             <th>State</th>
    //             <td>${state}</td>
    //         </tr>
    //         <tr>
    //             <th>Gender</th>
    //             <td>${gender}</td>
    //         </tr>
    //         <tr>
    //             <th>Phone No. 1</th>
    //             <td>${phoneNo1}</td>
    //         </tr>
    //         <tr>
    //             <th>Phone No. 2</th>
    //             <td>${phoneNo2}</td>
    //         </tr>
    //         <tr>
    //             <th>Landline No.</th>
    //             <td>${landlineNo}</td>
    //         </tr>
    //         <tr>
    //             <th>Email</th>
    //             <td>${email}</td>
    //         </tr>
    //         <tr>
    //             <th>Website</th>
    //             <td>${website}</td>
    //         </tr>
    //         <tr>
    //             <th>Address Line 1</th>
    //             <td>${address1}</td>
    //         </tr>
    //         <tr>
    //             <th>Address Line 2</th>
    //             <td>${address2}</td>
    //         </tr>
    //         <tr>
    //             <th>Address Line 3</th>
    //             <td>${address3}</td>
    //         </tr>
    //     </table>
    //     <p>Regards,<br>
    //     TGES Travel Team</p>`
    // )

    return res.status(201).json(
        new ApiResponse(
            201,
            null,
            "Corporate User Created Successfully"
        )
    );
});

const vendorRegister = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { areaOfWork, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, password, website, address1, address2, address3 } = reqBody;

    if (!areaOfWork || !companyName || !zipCode || !country || !city || !state || !gender || !phoneNo1 || !phoneNo2 || !landlineNo || !email || !password || !website || !address1 || !address2 || !address3) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    // Check for duplicate email or username
    const checkEmailSql = `SELECT * FROM vendor WHERE email = ?`;
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

    const insertSql = `INSERT INTO vendor (areaOfWork, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, password, website, address1, address2, address3) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const hashedPassword = await hashPassword(password);

    const params = [areaOfWork, companyName, zipCode, country, city, state, gender, phoneNo1, phoneNo2, landlineNo, email, hashedPassword, website, address1, address2, address3];

    const [result, fields] = await db.query(insertSql, params);

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

    const sql = `SELECT * FROM retail_user WHERE email = ?`;
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

    const sql = `SELECT * FROM corporate_user WHERE email = ?`;
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

    const sql = `SELECT * FROM vendor WHERE email = ?`;
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