import connectToDb from "../config/db.js";
import { travelInsuranceTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.js";
import { calculateAge } from "../utils/helper.js";

let db = await connectToDb();

const createTravelInsurance = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship } = reqBody;

    try {
        const travelInsurance = `INSERT INTO travelInsurance (userId, name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const travelInsuranceParams = [req.user.id, name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship]

        const [insertResult, insertFields] = await db.query(travelInsurance, travelInsuranceParams);

        // Send Mail
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Travel Insurance Details",
        //         travelInsuranceTemplate({ name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship })
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

const getTravelInsuranceDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;

    try {
        const sql = `SELECT * FROM travelInsurance WHERE userId = ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    null,
                    "Travel Insurance Details not found"
                )
            )
        }

        const travelInsuranceData = result.map((data) => {
            const {userId, createdAt, updatedAt, ...rest} = data;
            const calculatedAge = calculateAge(data.dob);
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Travel Insurance Details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Getting Travel Insurance Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting travel insurance details"
            )
        )
    }
})

export {
    createTravelInsurance,
    getTravelInsuranceDetails
}