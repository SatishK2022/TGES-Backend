import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";
import fs from 'fs';

let db = await connectToDb();

const addCabRateCardFile = asyncHandler(async (req, res) => {
    const file = req.file;
    const { type } = req.body || {};
    console.log(req.file)

    if (!file) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Cab rate card file is required"
            )
        );
    }

    try {
        const filePath = file.path;
        const insertSql = 'INSERT INTO cab_rate_card (userId, filePath, type, fileExists) VALUES (?, ?, ?, ?)';
        const insertParams = [req.user.id, filePath, type, true];

        const [result] = await db.query(insertSql, insertParams);

        if (result.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to add cab rate card file"
                )
            );
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Cab rate card file added successfully"
            )
        );
    } catch (error) {
        console.error("Error while adding cab rate card file: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while adding cab rate card file"
            )
        );
    }
});

const downloadCabRateCardFile = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM cab_rate_card WHERE userId = ?`;
        const params = [req.user.id];
        const [result, fields] = await db.query(sql, params);

        const filePath = result[0].filePath;

        if (!filePath) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab rate card not found"
                )
            );
        }

        return res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).json(
                    new ApiResponse(
                        500,
                        null,
                        "Error downloading file"
                    )
                )
            }

            console.log('File downloaded successfully:', filePath);
        });
    } catch (error) {
        console.log("Error while downloading rate card: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while downloading rate card"
            )
        );
    }
})

const addCabRateCard = asyncHandler(async (req, res) => {
    const reqBody = req.body || [];

    if (reqBody.length === 0) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Fields are required"
            )
        )
    }

    try {
        const sql1 = 'SELECT * FROM cab_rate_card WHERE userId = ?';
        const params1 = [req.user.id];
        const [existedUser] = await db.query(sql1, params1);

        const existingUserWithFileExists = existedUser.find(user => user.fileExists === 1 && user.filePath !== null);
        if (existingUserWithFileExists) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Cab rate card already exists"
                )
            )
        }

        const sql2 = 'INSERT INTO cab_rate_card (userId, type, city, vehicleType, airportPickupRate, airportDropRate, fourHourRate, eightHourRate, twelveHourRate, extraKmRate, extraHourRate, nightRate, outstationRate, outstationExtraKmRate, outstationExtraHourRate, outstationNightRate, rateValidFrom, rateValidTill) VALUES ?';
        const rateCardParams = reqBody.map((data) => [
            req.user.id,
            data.type,
            data.city,
            data.vehicleType,
            data.airportPickupRate,
            data.airportDropRate,
            data.fourHourRate,
            data.eightHourRate,
            data.twelveHourRate,
            data.extraKmRate,
            data.extraHourRate,
            data.nightRate,
            data.outstationRate,
            data.outstationExtraKmRate,
            data.outstationExtraHourRate,
            data.outstationNightRate,
            data.rateValidFrom,
            data.rateValidTill
        ])
        const [result] = await db.query(sql2, [rateCardParams]);

        if (result.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to add cab rate card"
                )
            );
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Cab rate card added successfully"
            )
        );
    } catch (error) {
        console.error("Error while adding cab rate card: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while adding cab rate card"
            )
        );
    }
})

const updateCabRateCard = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const id = req.params.id;
    const { type, city, vehicleType, airportPickupRate, airportDropRate, fourHourRate, eightHourRate, twelveHourRate, extraKmRate, extraHourRate, nightRate, outstationRate, outstationExtraKmRate, outstationExtraHourRate, outstationNightRate, rateValidFrom, rateValidTill } = reqBody;

    try {
        // Check if the cab rate card exists for the user
        const sql = `SELECT * FROM cab_rate_card WHERE id = ? AND userId = ?`;
        const params = [id, req.user.id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Cab rate card not found")
            );
        }

        const existingRecord = result[0];
        const filePath = req.file ? req.file.path : null;

        // Logic to handle filePath updates
        if (filePath) {
            if (existingRecord.filePath) {
                // delete the previous path
                fs.unlink(existingRecord.filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                // Update the filePath
                const updateSql = 'UPDATE cab_rate_card SET type = ?, filePath = ?, fileExists = 1 WHERE id = ?';
                const updateParams = [type, filePath, id];
                const [updateResult] = await db.query(updateSql, updateParams);

                if (updateResult.affectedRows === 0) {
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to update cab rate card")
                    );
                }
            } else {
                // If there is no existing filePath, delete the manual fields
                const deleteManualFieldsSql = 'DELETE FROM cab_rate_card WHERE userId = ? AND filePath IS NULL';
                await db.query(deleteManualFieldsSql, [req.user.id]);

                // Then Insert the record with the new filePath
                const insertSql = 'INSERT INTO cab_rate_card (userId, type, filePath, fileExists) VALUES (?, ?, ?, 1)';
                const insertParams = [req.user.id, type, filePath];
                const [insertResult] = await db.query(insertSql, insertParams);

                if (insertResult.affectedRows === 0) {
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to insert new cab rate card")
                    );
                }
            }
        } else {
            if (existingRecord.filePath) {
                // Update the existing field
                const updateSql = 'UPDATE cab_rate_card SET type = ?, city = ?, vehicleType = ?, airportPickupRate = ?, airportDropRate = ?, fourHourRate = ?, eightHourRate = ?, twelveHourRate = ?, extraKmRate = ?, extraHourRate = ?, nightRate = ?, outstationRate = ?, outstationExtraKmRate = ?, outstationExtraHourRate = ?, outstationNightRate = ?, rateValidFrom = ?, rateValidTill = ?, filePath = NULL, fileExists = 0 WHERE id = ?';
                const params = [type, city, vehicleType, airportPickupRate, airportDropRate, fourHourRate, eightHourRate, twelveHourRate, extraKmRate, extraHourRate, nightRate, outstationRate, outstationExtraKmRate, outstationExtraHourRate, outstationNightRate, rateValidFrom, rateValidTill , id];
                const [insertResult] = await db.query(updateSql, params);

                // delete the previous path
                fs.unlink(existingRecord.filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                if (insertResult.affectedRows === 0) {
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to insert new manual fields")
                    );
                }
            } else {
                // Update the manual fields
                const updateSql = 'UPDATE cab_rate_card SET type = ?, city = ?, vehicleType = ?, airportPickupRate = ?, airportDropRate = ?, fourHourRate = ?, eightHourRate = ?, twelveHourRate = ?, extraKmRate = ?, extraHourRate = ?, nightRate = ?, outstationRate = ?, outstationExtraKmRate = ?, outstationExtraHourRate = ?, outstationNightRate = ?, rateValidFrom = ?, rateValidTill = ? WHERE id = ?';
                const updateParams = [type, city, vehicleType, airportPickupRate, airportDropRate, fourHourRate, eightHourRate, twelveHourRate, extraKmRate, extraHourRate, nightRate, outstationRate, outstationExtraKmRate, outstationExtraHourRate, outstationNightRate, rateValidFrom, rateValidTill, id];
                const [updateResult] = await db.query(updateSql, updateParams);

                if (updateResult.affectedRows === 0) {
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to update cab rate card")
                    );
                }
            }
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Cab rate card updated successfully")
        );
    } catch (error) {
        console.error("Error while updating cab rate card: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error while updating cab rate card")
        );
    }
});

const deleteCabRateCard = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        const sql = 'SELECT * FROM cab_rate_card WHERE id = ? AND userId = ?';
        const params = [id, req.user.id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab rate card not found"
                )
            );
        }

        if (result[0].fileExists) {
            fs.unlink(result[0].filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        const deleteSql = 'DELETE FROM cab_rate_card WHERE id = ? AND userId = ?';
        const deleteParams = [id, req.user.id];
        const [deleteResult] = await db.query(deleteSql, deleteParams);

        if (deleteResult.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to delete cab rate card"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab rate card deleted successfully"
            )
        );
    } catch (error) {
        console.error("Error while deleting cab rate card: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while deleting cab rate card"
            )
        );
    }
});

const getCabRateCardDetails = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT * FROM cab_rate_card WHERE userId = ? ORDER BY createdAt LIMIT ? OFFSET ?`;
        const params = [req.user.id, limit, skip];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab rate card details not found"
                )
            );
        }

        const cabRateResult = result.map(record => {
            const { userId, createdAt, updatedAt, ...rest } = record;
            return rest;
        });

        const countSql = `SELECT COUNT(*) as total FROM cab_rate_card WHERE userId = ?`;
        const [countResult] = await db.query(countSql, [req.user.id]);
        const totalCount = countResult[0].total;

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: cabRateResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Cab rate card details fetched successfully"
            )
        )
    } catch (error) {
        console.error("Error while getting cab rate card details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting cab rate card details"
            )
        );
    }
})

export {
    addCabRateCardFile,
    downloadCabRateCardFile,
    getCabRateCardDetails,
    addCabRateCard,
    updateCabRateCard,
    deleteCabRateCard,
}