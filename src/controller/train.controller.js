import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { pool as db } from "../config/db.js";
import { sendMail } from "../utils/sendMail.js";
import { trainBookingTemplate } from "../email/email-template.js";
import { calculateAge, generateExcelSheet } from "../utils/helper.js";
import { v4 as uuidv4 } from "uuid"
import path from "path";


/**
 * @createTrainTravel
 * @params req, res
 * @Description : This function is used to create train travel data in the 'train' table of the 'tges' database using the MySQL module
*/
const createTrainTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || [];

    if (reqBody.length === 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "All fields are required")
        );
    }

    try {
        const insertTrain = `INSERT INTO train (userId, fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, trainNo, timePreference) VALUES ?`;
        const trainParams = reqBody.map(data => [
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
            data.trainNo,
            data.timePreference
        ]);

        const [result, fields] = await db.query(insertTrain, [trainParams]);

        const emailContent = reqBody.map(data => {
            const age = calculateAge(data.dob);
            return {
                age,
                ...data
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
                "Travel Mode": "Train",
                "Class Of Travel": data.classOfTravel,
                "Travel Date": data.travelDate,
                "Train No": data.trainNo,
                "Time Preference": data.timePreference,
            };
        });

        console.log(emailContent);

        const uniqueFilename = `train_${uuidv4()}.xlsx`;
        const uploadPath = path.join('src', 'static_files', 'email_templates', uniqueFilename);

        generateExcelSheet(excelContent, uploadPath, "Train No");

        // Send Mail
        try {
            sendMail(
                req.user.email,
                "Train Booking Details",
                trainBookingTemplate(emailContent),
                uniqueFilename,
                uploadPath
            );
        } catch (error) {
            console.log("Error sending train booking email:", error);
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Travel created successfully")
        );
    } catch (error) {
        console.error("Error while creating travel:", error);
        return res.status(500).json(
            new ApiResponse(500, null, "An error occurred while creating the travel")
        );
    }
});

/**
 * @updateTrainTravel
 * @params req, res
 * @Description : This function is used to update train travel data in the 'train' table of the 'tges' database using the MySQL module
 */
const updateTrainTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const id = req.params.id;
    const { fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, trainNo, timePreference } = reqBody;

    try {
        const sql = 'SELECT * from train WHERE id = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel not found"
                )
            );
        }

        const updateSql = 'UPDATE train SET fullName = ?, dob = ?, gender = ?, contactNo = ?, email = ?, travelFrom = ?, travelTo = ?, classOfTravel = ?, travelDate = ?, trainNo = ?, timePreference = ? WHERE id = ?';
        const updateParams = [fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, trainNo, timePreference, id];
        const [updateResult] = await db.query(updateSql, updateParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel updated successfully"
            )
        );
    } catch (error) {
        console.error("Error while updating travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating the travel"
            )
        );
    }
});

/**
 * @deleteTrainTravel
 * @params req, res
 * @Description : This function is used to delete train travel data in the 'train' table of the 'tges' database using the MySQL module
 */
const deleteTrainTravel = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'SELECT * from train WHERE id = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel not found"
                )
            );
        }

        const deleteSql = 'DELETE FROM train WHERE id = ?';
        const deleteParams = [id];
        const [deleteResult] = await db.query(deleteSql, deleteParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel deleted successfully"
            )
        );
    } catch (error) {
        console.error("Error while deleting travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting the travel"
            )
        );
    }
})

/**
 * @getTrainTravelDetails
 * @params req, res
 * @Description : This function is used to get train travel data in the 'train' table of the 'tges' database using the MySQL module
 */
const getTrainTravelDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM train WHERE userId = ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Train Travel Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const trainData = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            if (user.dob) {
                const calculatedAge = calculateAge(user.dob);
                return { ...rest, age: calculatedAge };
            }
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: trainData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Train Travel Details retrieved successfully"
            )
        )
    } catch (error) {
        console.log("Error getting train travel details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting train travel details"
            )
        )
    }
})

export {
    createTrainTravel,
    updateTrainTravel,
    deleteTrainTravel,
    getTrainTravelDetails
}