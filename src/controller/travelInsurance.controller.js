import { pool as db } from "../config/db.js";
import { travelInsuranceTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.js";
import { calculateAge } from "../utils/helper.js";


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

const updateTravelInsurance = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reqBody = req.body || {};
    const { name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship } = reqBody;

    try {
        const sql = 'SELECT * from travelInsurance WHERE id = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel Insurance not found"
                )
            )
        }

        const updateSql = 'UPDATE travelInsurance SET name = ?, gender = ?, dob = ?, address = ?, contactNo = ?, email = ?, tripType = ?, startDate = ?, endDate = ?, preExistingDisease = ?, diseaseName = ?, smoker = ?, passportNo = ?, dateOfIssue = ?, dateOfExpiry = ?, nomineeName = ?, nomineeGender = ?, nomineeRelationship = ? WHERE id = ?';
        const updateParams = [name, gender, dob, address, contactNo, email, tripType, startDate, endDate, preExistingDisease, diseaseName, smoker, passportNo, dateOfIssue, dateOfExpiry, nomineeName, nomineeGender, nomineeRelationship, id];
        const [updateResult] = await db.query(updateSql, updateParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel Insurance updated successfully"
            )
        )
    } catch (error) {
        console.error("Error updating travel insurance:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating travel insurance"
            )
        )
    }
})

const deleteTravelInsurance = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'SELECT * from travelInsurance WHERE id = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel Insurance not found"
                )
            )
        }

        const sqlDelete = 'DELETE FROM travelInsurance WHERE id = ?';
        const paramsDelete = [id];
        const [deleteResult] = await db.query(sqlDelete, paramsDelete);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel Insurance deleted successfully"
            )
        )
    } catch (error) {
        console.error("Error deleting travel insurance:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting travel insurance"
            )
        )
    }
})

const getTravelInsuranceDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM travelInsurance WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [id, limit, skip];
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

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const travelInsuranceData = result.map((data) => {
            const { userId, createdAt, updatedAt, ...rest } = data;
            const calculatedAge = calculateAge(data.dob);
            return { ...rest, age: calculatedAge };
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: travelInsuranceData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Travel Insurance Details fetched successfully"
            )
        )
    } catch (error) {
        console.error("Error Getting Travel Insurance Details:", error);
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
    updateTravelInsurance,
    deleteTravelInsurance,
    getTravelInsuranceDetails
}