import connectToDb from "../../config/db.js";
import { healthInsuranceTemplate } from "../../email/email-template.js";
import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { sendMail } from "../../utils/sendMail.js";

let db = await connectToDb();

const createHealthInsurance = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship } = reqBody;

    try {
        const healthInsurance = `INSERT INTO healthInsurance (userId, name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const healthInsuranceParams = [req.user.id, name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship]

        const [insertResult, insertFields] = await db.query(healthInsurance, healthInsuranceParams);

        // Send Mail
        // sendMail(
        //     req.user.email,
        //     "Health Insurance Details",
        //     healthInsuranceTemplate({ name, gender, dateOfBirth, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship })
        // )

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Health Insurance created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Health Insurance:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating health insurance"
            )
        )
    }
});

export {
    createHealthInsurance
}