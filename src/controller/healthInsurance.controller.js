import connectToDb from "../config/db.js";
import { healthInsuranceTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { calculateAge } from "../utils/helper.js";
import { sendMail } from "../utils/sendMail.js";

let db = await connectToDb();

const createHealthInsurance = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, gender, dob, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship } = reqBody;

    try {
        const healthInsurance = `INSERT INTO healthInsurance (userId, name, gender, dob, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const healthInsuranceParams = [req.user.id, name, gender, dob, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship]

        const [insertResult, insertFields] = await db.query(healthInsurance, healthInsuranceParams);

        // Send Mail
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Health Insurance Details",
        //         healthInsuranceTemplate({ name, gender, dob, address, contactNo, email, preExistingDisease, diseaseName, smoker, nomineeName, nomineeGender, nomineeRelationship })
        //     )
        // } catch (error) {
        //     console.log("Error sending health insurance email:", error);
        // }

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

const getHealthInsuranceDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM healthInsurance WHERE userId = ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(200).json(
                new ApiResponse(
                    200,
                    null,
                    "Health Insurance Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const healthInsuranceData = result.map((data) => {
            const { userId, createdAt, updatedAt, ...rest } = data;
            const calculatedAge = calculateAge(data.dob);
            return { ...rest, age: calculatedAge };
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: healthInsuranceData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Health Insurance Details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error getting health insurance: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting health details"
            )
        )
    }
})

export {
    createHealthInsurance,
    getHealthInsuranceDetails
}