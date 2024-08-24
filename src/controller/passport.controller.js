import { pool as db } from "../config/db.js";
import { passportBookingTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { calculateAge } from "../utils/helper.js";
import { sendMail } from "../utils/sendMail.js";


/**
 * @createPassport
 * @params req, res
 * @Description : This function is used to create passport travel data in the 'passport' table of the 'tges' database using the MySQL module
*/
const createPassport = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { totalNoOfTravellers, name, nationality, dob, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration } = reqBody;

    try {
        const passportTravel = `INSERT INTO passport (userId, totalNoOfTravellers, name, nationality, dob, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelEntryDate, travelExitDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const passportParams = [req.user.id, totalNoOfTravellers, name, nationality, dob, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration.entryDate, travelDuration.exitDate];

        const [insertResult, insertFields] = await db.query(passportTravel, passportParams);

        // Send Mail
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Passport Details",
        //         passportBookingTemplate({ totalNoOfTravellers, name, nationality, dob, age: calculateAge(dob) , gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration })
        //     )
        // } catch (error) {
        //     console.log("Error sending passport booking email:", error);
        // }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Passport created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Passport:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating passport"
            )
        )
    }
})

const getPassportDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM passport WHERE userId = ?`;
        const [passportResult, passportFields] = await db.query(sql, [id]);

        if (passportResult.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Passport details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const passportData = passportResult.map(data => {
            const { userId, createdAt, updatedAt, ...rest } = data;
            const calculatedAge = calculateAge(data.dob);
            return { ...rest, age: calculatedAge };
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: passportData,
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
        console.error("Error Fetching Passport Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching passport details"
            )
        )
    }
})

export {
    createPassport,
    getPassportDetails
}