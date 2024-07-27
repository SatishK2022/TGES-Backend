import connectToDb from "../config/db.js";
import { travelInsuranceTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.js";

let db = await connectToDb();

const createTravelInsurance = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship } = reqBody;

    try {
        const travelInsurance = `INSERT INTO travelInsurance (userId, name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const travelInsuranceParams = [req.user.id, name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship]

        const [insertResult, insertFields] = await db.query(travelInsurance, travelInsuranceParams);

        // Send Mail
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Travel Insurance Details",
        //         travelInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship })
        //     )
        // } catch (error) {
        //     console.log("Error sending travel insurance email:", error);
        // }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel Insurance created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Travel Insurance:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating travel insurance"
            )
        )
    }
})

export {
    createTravelInsurance
}