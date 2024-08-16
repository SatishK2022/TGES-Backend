import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";
import { sendMail } from "../utils/sendMail.js"
import { airBookingTemplate } from "../email/email-template.js";
import { calculateAge, generateExcelSheet } from "../utils/helper.js";
import { v4 as uuidv4 } from "uuid"
import path from "path";

let db = await connectToDb();

/**
 * @createAirTravel
 * @params req, res
 * @Description : This function is used to create air travel data in the 'air' table of the 'tges' database using the MySQL module
*/
const createAirTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || [];

    if (reqBody.length === 0) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const insertAir = `INSERT INTO air (userId, fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, flightNo, timePreference, remarks) VALUES ?`;

        const airParams = reqBody.map(data => [
            req.user.id,
            data.fullName,
            data.dob,
            data.gender,
            data.contactNo,
            data.email,
            data.travelFrom,
            data.travelTo,
            data.classOfTravel,
            data.travelDate,
            data.flightNo,
            data.timePreference,
            data.remarks
        ])

        const [insertResult, insertFields] = await db.query(insertAir, [airParams]);

        const emailContent = reqBody.map(data => {
            const age = calculateAge(data.dob);
            return {
                ...data,
                age
            };
        });

        const excelContent = emailContent.map((data) => {
            return {
                "Full Name": data.fullName,
                "Age": data.age,
                "DOB": data.dob,
                "Gender": data.gender,
                "Contact No": data.contactNo,
                "Email": data.email,
                "Travel From": data.travelFrom,
                "Travel To": data.travelTo,
                "Travel Mode": "Air",
                "Class Of Travel": data.classOfTravel,
                "Travel Date": data.travelDate,
                "Flight No": data.flightNo,
                "Time Preference": data.timePreference,
                "Remarks": data.remarks
            };
        });

        console.log(emailContent);

        const uniqueFilename = `air_${uuidv4()}.xlsx`;
        const uploadPath = path.join('src', 'static_files', 'email_templates', uniqueFilename);

        generateExcelSheet(excelContent, uploadPath, "Flight No");

        // Send Mail
        try {
            sendMail(
                req.user.email,
                "Air Travel Details",
                airBookingTemplate(emailContent),
                uniqueFilename,
                uploadPath
            )
        } catch (error) {
            console.log("Error while sending air travel mail:", error);
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Air travel created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Air Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating air travel"
            )
        )
    }
})

const updateAirTravel = asyncHandler(async (req, res) => {
    // TODO: Implement update travel
})

const deleteAirTravel = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getAirTravelDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM air WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Air Travel Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const airData = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            if (!user.age) {
                const calculatedAge = calculateAge(user.dob)
                return { ...rest, age: calculatedAge };
            }
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: airData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Air travel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting air travel details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting air travel details"
            )
        )
    }
})

export {
    createAirTravel,
    updateAirTravel,
    deleteAirTravel,
    getAirTravelDetails
}