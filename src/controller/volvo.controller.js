import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { pool as db } from "../config/db.js";
import { volvoBusBookingTemplate } from "../email/email-template.js";
import { sendMail } from "../utils/sendMail.js";
import { calculateAge, generateExcelSheet } from "../utils/helper.js";
import { v4 as uuidv4 } from "uuid"
import path from "path";

/**
 * @createVolvoBusTravel
 * @params req, res
 * @Description : This function is used to create volvo bus travel data in the 'bus' table of the 'tges' database using the MySQL module
*/
const createVolvoBusTravel = asyncHandler(async (req, res) => {
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
        const insertBus = `INSERT INTO bus (userId, fullName, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, busNo) VALUES ?`;
        const busParams = reqBody.map(data => [
            req.user.id,
            data.fullName,
            data.dob,
            data.gender,
            data.contactNo,
            data.email,
            data.pickupLocation,
            data.destination,
            data.travelDate,
            data.seatType,
            data.busNo
        ]);
        const [insertResult, insertFields] = await db.query(insertBus, [busParams]);

        // Logs
        const logs = `INSERT INTO logs (userId, action, userType, message) VALUES (?, ?, ?, ?)`;
        const logsParams = [req.user.id, "CREATE", req.user.userType, "Created a volvo bus travel"];
        await db.query(logs, logsParams);

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
                "Travel From": data.pickupLocation,
                "Travel To": data.destination,
                "Class Of Travel": "",
                "Travel Mode": "Bus",
                "Travel Date": data.travelDate,
                "Bus No": data.busNo,
                "Seat Type": data.seatType,
            };
        });

        const uniqueFilename = `bus_${uuidv4()}.xlsx`;
        const uploadPath = path.join('src', 'static_files', 'email_templates', uniqueFilename);

        generateExcelSheet(excelContent, uploadPath, "Bus No");

        // Send Mail
        try {
            sendMail(
                req.user.email,
                "Volvo Bus Travel Details",
                volvoBusBookingTemplate(emailContent),
                uniqueFilename,
                uploadPath
            )
        } catch (error) {
            console.log("Error sending volvo bus booking email:", error);
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel created successfully"
            )
        );
    } catch (error) {
        console.log("Error Creating Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating volvo bus travel"
            )
        );
    }
});

/**
 * @updateVolvoBusTravel
 * @params req, res
 * @Description : This function is used to update volvo bus travel data in the 'bus' table of the 'tges' database using the MySQL module
*/
const updateVolvoBusTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const id = req.user.id;
    const { fullName, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, busNo } = reqBody;

    try {
        const sql = 'SELECT * FROM bus WHERE userId = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Volvo bus travel not found"
                )
            );
        }

        const updateSql = 'UPDATE bus SET fullName = ?, dob = ?, gender = ?, contactNo = ?, email = ?, pickupLocation = ?, destination = ?, travelDate = ?, seatType = ?, busNo = ? WHERE userId = ?';
        const updateParams = [fullName, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, busNo, id];
        const [updateResult] = await db.query(updateSql, updateParams);

        // Logs
        const logs = `INSERT INTO logs (userId, action, userType, message) VALUES (?, ?, ?, ?)`;
        const logsParams = [req.user.id, "UPDATE", req.user.userType, "Updated a volvo bus travel"];
        await db.query(logs, logsParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel updated successfully"
            )
        );
    } catch (error) {
        console.error("Error updating volvo bus travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating volvo bus travel"
            )
        );
    }
})

/**
 * @deleteVolvoBusTravel
 * @params req, res
 * @Description : This function is used to delete volvo bus travel data in the 'bus' table of the 'tges' database using the MySQL module
*/
const deleteVolvoBusTravel = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'SELECT * FROM bus WHERE id = ?';
        const params = [id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Volvo bus travel not found"
                )
            );
        }

        const sqlDelete = 'DELETE FROM bus WHERE id = ?';
        const paramsDelete = [id];
        const [deleteResult] = await db.query(sqlDelete, paramsDelete);

        // Logs
        const logs = `INSERT INTO logs (userId, action, userType, message) VALUES (?, ?, ?, ?)`;
        const logsParams = [req.user.id, "DELETE", req.user.userType, "Deleted a volvo bus travel"];
        await db.query(logs, logsParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel deleted successfully"
            )
        );
    } catch (error) {
        console.error("Error deleting volvo bus travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting volvo bus travel"
            )
        );
    }
})

/**
 * @getVolvoBusTravelDetails
 * @params req, res
 * @Description : This function is used to get volvo bus travel details in the 'bus' table of the 'tges' database using the MySQL module
*/
const getVolvoBusTravelDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const selectVolvoBus = `SELECT SQL_CALC_FOUND_ROWS * FROM bus WHERE userId = ?`;
        const [selectResult] = await db.query(selectVolvoBus, [id]);

        if (selectResult.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Volvo Bus Travel Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        // Calculate age for each entry
        const busTravelData = selectResult.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            const calculatedAge = calculateAge(user.dob);
            return { ...rest, age: calculatedAge };
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: busTravelData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Volvo bus travel details fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error Fetching Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching volvo bus travel"
            )
        );
    }
})

export {
    createVolvoBusTravel,
    updateVolvoBusTravel,
    deleteVolvoBusTravel,
    getVolvoBusTravelDetails
}