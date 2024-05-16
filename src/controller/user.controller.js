import connectToDb from "../config/db.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js"
import { sendMail } from "../utils/sendMail.js";
import { hashPassword } from "../utils/helper.js";

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

    const sql = `CREATE TABLE IF NOT EXISTS retail_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstName VARCHAR(255) NOT NULL,
        secondName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        residentialAddress VARCHAR(255) NOT NULL,
        zipCode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        phoneNo VARCHAR(255) NOT NULL,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        Occupation VARCHAR(255) ,
        companyName VARCHAR(255) ,
        designation VARCHAR(255) ,
        companyAddress VARCHAR(255) ,
        reference VARCHAR(255) ,
        preferredCurrency VARCHAR(255) ,
        website VARCHAR(255) ,
        documentType VARCHAR(255) 
    )`;

    await db.query(sql);

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

    const sql = `CREATE TABLE IF NOT EXISTS corporate_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        industry VARCHAR(255) NOT NULL,
        companyName VARCHAR(255) NOT NULL,
        zipCode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        phoneNo1 VARCHAR(255) NOT NULL,
        phoneNo2 VARCHAR(255) NOT NULL,
        landlineNo VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        address1 VARCHAR(255) NOT NULL,
        address2 VARCHAR(255) NOT NULL,
        address3 VARCHAR(255) NOT NULL
    )`;

    await db.query(sql);

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

    const sql = `CREATE TABLE IF NOT EXISTS vendor (
        id INT AUTO_INCREMENT PRIMARY KEY,
        areaOfWork VARCHAR(255) NOT NULL,
        companyName VARCHAR(255) NOT NULL,
        zipCode VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        state VARCHAR(255) NOT NULL,
        gender VARCHAR(255) NOT NULL,
        phoneNo1 VARCHAR(255) NOT NULL,
        phoneNo2 VARCHAR(255) NOT NULL,
        landlineNo VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        website VARCHAR(255) NOT NULL,
        address1 VARCHAR(255) NOT NULL,
        address2 VARCHAR(255) NOT NULL,
        address3 VARCHAR(255) NOT NULL
    )`;

    await db.query(sql);

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

const getUsers = asyncHandler(async (req, res) => {
    const sql = `SELECT * FROM retail_user`;
    const [result, fields] = await db.query(sql);
    // console.log(fields)
    return res.status(200).json(result);
})

export {
    corprateRegister,
    retailRegister,
    vendorRegister,
    getUsers
}