import connectToDb from "../../config/db.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";

let db = await connectToDb();

/**
 * @createPassport
 * @params req, res
 * @Description : This function is used to create passport travel data in the 'passport' table of the 'tges' database using the MySQL module
*/
const createPassport = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { totalNoOfTravellers, name, nationality, dateOfBirth, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration } = reqBody;

    try {
        const passportTravel = `INSERT INTO passport (userId, totalNoOfTravellers, name, nationality, dateOfBirth, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelEntryDate, travelExitDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const passportParams = [req.user.id, totalNoOfTravellers, name, nationality, dateOfBirth, gender, passportNo, passportIssueDate, passportExpiryDate, passportValidityPeriod, placeOfIssue, nomineeName, nomineeGender, addressWithPinCode, contactNo, email, holdPassportFrom, applyFrom, goTo, travelDuration.entryDate, travelDuration.exitDate];

        const [insertResult, insertFields] = await db.query(passportTravel, passportParams);

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

export {
    createPassport
}