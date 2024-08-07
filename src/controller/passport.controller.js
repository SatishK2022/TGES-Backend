import connectToDb from "../config/db.js";
import { passportBookingTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { calculateAge } from "../utils/helper.js";
import { sendMail } from "../utils/sendMail.js";

let db = await connectToDb();

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

    try {
        const sql = `SELECT * FROM passport WHERE userId = ?`;
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

        const passportData = passportResult.map(data => {
            const {userId, createdAt, updatedAt, ...rest} = data;
            const calculatedAge = calculateAge(data.dob);
            return {...rest, age: calculatedAge};
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                passportData,
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