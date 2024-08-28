import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { pool as db } from "../config/db.js";
import { sendMail } from "../utils/sendMail.js";
import { cabBookingTemplate } from "../email/email-template.js";


/**
 * @createCabTravel
 * @params req, res
 * @Description : This function is used to create cab travel data in the 'cab' table of the 'tges' database using the MySQL module
*/
const createCabTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements } = reqBody;

    try {
        const insertCab = `INSERT INTO cab (userId, pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const cabParams = [req.user.id, pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements]

        const [result, fields] = await db.query(insertCab, cabParams);

        // Send Mail
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Cab Travel Details",
        //         cabBookingTemplate({pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements})
        //     )
        // } catch (error) {
        //     console.log("Error sending cab booking email:", error);
        // }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Cab Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating cab travel"
            )
        )
    }
})

const updateCabTravel = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reqBody = req.body || {};
    const { pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements } = reqBody;

    try {
        const sql = 'SELECT * FROM cab WHERE id = ?';
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab travel not found"
                )
            )
        }

        const updateSql = 'UPDATE cab SET pickupCountry = ?, nationality = ?, tourPlan = ?, name = ?, contactNo = ?, alternateContactNo = ?, email = ?, cabRequiredAt = ?, cabRequiredFor = ?, localTravelKmsLimit = ?, pickupDateTime = ?, pickupAddress = ?, pickupLandmark = ?, dropDateTime = ?, dropAddress = ?, dropLandmark = ?, cabDuration = ?, noOfCabsRequired = ?, typeOfCabRequired = ?, noOfPersonsTravelling = ?, noOfInfants = ?, noOfChildren = ?, otherRequirements = ? WHERE id = ?';
        const updateParams = [pickupCountry, nationality, tourPlan, name, contactNo, alternateContactNo, email, cabRequiredAt, cabRequiredFor, localTravelKmsLimit, pickupDateTime, pickupAddress, pickupLandmark, dropDateTime, dropAddress, dropLandmark, cabDuration, noOfCabsRequired, typeOfCabRequired, noOfPersonsTravelling, noOfInfants, noOfChildren, otherRequirements, id];
        const [updateResult, updateFields] = await db.query(updateSql, updateParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab travel updated successfully"
            )
        )
    } catch (error) {
        console.error("Error updating cab travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating cab travel"
            )
        )
    }
})

const deleteCabTravel = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'SELECT * FROM cab WHERE id = ?';
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab travel not found"
                )
            )
        }

        const deleteSql = 'DELETE FROM cab WHERE id = ?';
        const deleteParams = [id];
        const [deleteResult, deleteFields] = await db.query(deleteSql, deleteParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab travel deleted successfully"
            )
        )
    } catch (error) {
        console.error("Error deleting cab travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting cab travel"
            )
        )
    }
})

const getCabTravelDetails = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM cab WHERE userId = ? ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
        const params = [id, limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Cab Travel Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const cabData = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest;
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cabData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Cab Travel Details Fetched Successfully"
            )
        )
    } catch (error) {
        console.log("Error getting Cab Travel Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting cab travel details"
            )
        )
    }
})

export {
    createCabTravel,
    updateCabTravel,
    deleteCabTravel,
    getCabTravelDetails
}