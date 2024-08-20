import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import connectToDb from "../config/db.js";
import fs from 'fs';

let db = await connectToDb();

/**
 * @addCabRateCard
 * @params req, res
 * @Description : This function is used to add cab rate card data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
const addCabRateCardFile = asyncHandler(async (req, res) => {
    const file = req.file;
    const { type } = req.body || {};

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

/**
 * @downloadCabRateCardFile
 * @params req, res
 * @Description : This function is used to download cab rate card data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
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

/**
 * @addCabRateCard
 * @params req, res
 * @Description : This function is used to add cab rate card data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
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

/**
 * @updateCabRateCard
 * @params req, res
 * @Description : This function is used to update cab rate card data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
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
                const params = [type, city, vehicleType, airportPickupRate, airportDropRate, fourHourRate, eightHourRate, twelveHourRate, extraKmRate, extraHourRate, nightRate, outstationRate, outstationExtraKmRate, outstationExtraHourRate, outstationNightRate, rateValidFrom, rateValidTill, id];
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

/**
 * @deleteCabRateCard
 * @params req, res
 * @Description : This function is used to delete cab rate card data in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
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

/**
 * @getCabRateCardDetails
 * @params req, res
 * @Description : This function is used to get cab rate card details in the 'cab_rate_card' table of the 'tges' database using the MySQL module
 */
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


const addHotelRateCardFile = asyncHandler(async (req, res) => {
    const file = req.file;
    const { type } = req.body || {};

    if (!file) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "Hotel rate card file is required"
            )
        );
    }

    try {
        const sql = 'SELECT * FROM hotel_rate_card WHERE userId = ?';
        const params = [req.user.id];
        const [existedUser] = await db.query(sql, params);

        if(existedUser.length > 0) {
            return res.status(400).json(
                new ApiResponse(
                    400,
                    null,
                    "Hotel rate card already exists"
                )
            );
        }

        const filePath = file.path;
        const insertSql = 'INSERT INTO hotel_rate_card (userId, filePath, type, fileExists) VALUES (?, ?, ?, ?)';
        const insertParams = [req.user.id, filePath, type, true];

        const [result] = await db.query(insertSql, insertParams);

        if (result.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(
                    500,
                    null,
                    "Failed to add hotel rate card file"
                )
            );
        }

        return res.status(201).json(
            new ApiResponse(
                201,
                null,
                "Hotel rate card file added successfully"
            )
        );
    } catch (error) {
        console.error("Error while adding hotel rate card file: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while adding hotel rate card file"
            )
        );
    }
})

const downloadHotelRateCardFile = asyncHandler(async (req, res) => {
    try {
        const sql = `SELECT * FROM hotel_rate_card WHERE userId = ?`;
        const params = [req.user.id];
        const [result, fields] = await db.query(sql, params);

        const filePath = result[0].filePath;

        if (!filePath) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Hotel rate card not found"
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

const addHotelRateCard = asyncHandler(async (req, res) => {
    const reqBody = req.body || [];

    if (!Array.isArray(reqBody) || reqBody.length === 0) {
        return res.status(400).json(
            new ApiResponse(400, null, "Fields are required")
        );
    }

    try {
        const sql1 = 'SELECT * FROM hotel_rate_card WHERE userId = ?';
        const params1 = [req.user.id];
        const [existedUser] = await db.query(sql1, params1);

        const existingUserWithFileExists = existedUser.some(user => user.fileExists === 1 && user.filePath !== null);
        if (existingUserWithFileExists) {
            return res.status(400).json(
                new ApiResponse(400, null, "Hotel rate card already exists")
            );
        }

        // Prepare data for room insertion
        const roomData = reqBody.map(data => [
            data.weekendType,
            data.roomType,
            data.occupancyType,
            data.roomOnlyRate,
            data.cpaiRate,
            data.mapiRate,
            data.epRate
        ]);

        const sql2 = 'INSERT INTO room (weekendType, roomType, occupancyType, roomOnlyRate, cpaiRate, mapiRate, epRate) VALUES ?';
        const [insertResult] = await db.query(sql2, [roomData]);

        // Check if room insertion was successful
        if (insertResult.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(500, null, "Failed to add room")
            );
        }

        // Get the inserted room IDs
        const roomIds = Array.from({ length: insertResult.affectedRows }, (_, index) => insertResult.insertId + index);

        // Prepare data for hotel rate card insertion
        const rateCardData = reqBody.map((data, index) => [
            req.user.id,
            roomIds[index],  // Use the corresponding roomId for each rate card
            data.type,
            data.submissionDate,
            data.hotelName,
            data.hotelAddress,
            data.hotelState,
            data.hotelCity,
            data.hotelZipCode,
            data.phoneNo,
            data.email,
            data.gstNo,
            data.rateValidFrom,
            data.rateValidTill
        ]);

        const sql3 = 'INSERT INTO hotel_rate_card (userId, roomId, type, submissionDate, hotelName, hotelAddress, hotelState, hotelCity, hotelZipCode, phoneNo, email, gstNo, rateValidFrom, rateValidTill) VALUES ?';
        const [result] = await db.query(sql3, [rateCardData]);

        // Check if hotel rate card insertion was successful
        if (result.affectedRows === 0) {
            return res.status(500).json(
                new ApiResponse(500, null, "Failed to add hotel rate card")
            );
        }

        return res.status(201).json(
            new ApiResponse(201, null, "Hotel rate card added successfully")
        );

    } catch (error) {
        console.error("Error while adding hotel rate card: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error while adding hotel rate card")
        );
    }
});

const updateHotelRateCard = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const id = req.params.id;
    const { type, submissionDate, hotelName, hotelAddress, hotelState, hotelCity, hotelZipCode, phoneNo, email, gstNo, rateValidFrom, rateValidTill, weekendType, roomType, occupancyType, roomOnlyRate, cpaiRate, mapiRate, epRate } = reqBody;

    try {
        const sql = `SELECT * FROM hotel_rate_card WHERE id = ? AND userId = ?`;
        const params = [id, req.user.id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(404, null, "Hotel rate card not found")
            );
        }

        const existingRecord = result[0];
        const filePath = req.file ? req.file.path : null;

        // Logic to handle filePath updates
        if (filePath) {
            if (existingRecord.filePath) {
                // If there is an existing filePath, delete the existing file
                fs.unlink(existingRecord.filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                // Update the filePath
                const updateSql = 'UPDATE hotel_rate_card SET type = ?, filePath = ?, fileExists = 1 WHERE id = ?';
                const updateParams = [type, filePath, id];
                const [updateResult] = await db.query(updateSql, updateParams);

                if (updateResult.affectedRows === 0) {
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to update hotel rate card")
                    );
                }
            } else {
                // If there is no existing filePath, delete the manual fields
                await db.beginTransaction();

                const deleteManualFieldsSql = 'DELETE FROM hotel_rate_card WHERE userId = ?';
                const [deleteManualFieldsResult] = await db.query(deleteManualFieldsSql, [req.user.id]);

                if (deleteManualFieldsResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to delete manual fields")
                    );
                }

                // Check for existing references before deleting room
                const checkReferencesSql = 'SELECT COUNT(*) as count FROM hotel_rate_card WHERE roomId = ?';
                const [referenceCount] = await db.query(checkReferencesSql, [existingRecord.roomId]);

                if (referenceCount[0].count > 0) {
                    await db.rollback();
                    return res.status(400).json(
                        new ApiResponse(400, null, "Cannot delete room; it is still referenced by hotel rate cards")
                    );
                }

                // Delete room fields
                const deleteRoomFields = 'DELETE FROM room WHERE id = ?';
                const [deleteRoomFieldsResult] = await db.query(deleteRoomFields, [existingRecord.roomId]);

                if (deleteRoomFieldsResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to delete room fields")
                    );
                }

                // Then Insert the record with the new filePath
                const insertSql = 'INSERT INTO hotel_rate_card (userId, type, filePath, fileExists) VALUES (?, ?, ?, 1)';
                const insertParams = [req.user.id, type, filePath];
                const [insertResult] = await db.query(insertSql, insertParams);

                if (insertResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to insert new hotel rate card")
                    );
                }

                await db.commit();
            }
        } else {
            if (existingRecord.filePath) {
                await db.beginTransaction();

                // 1. Delete File Path
                fs.unlink(existingRecord.filePath, (err) => {
                    if (err) {
                        console.error('Error deleting file:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });

                const deleteExistingSql = 'DELETE FROM hotel_rate_card WHERE userId = ? AND id = ?';
                const [deleteExistingResult] = await db.query(deleteExistingSql, [req.user.id, id]);

                if (deleteExistingResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to delete hotel rate card")
                    );
                }

                // 2. Insert New Record
                const insertRoomSql = 'INSERT INTO room (weekendType, roomType, occupancyType, roomOnlyRate, cpaiRate, mapiRate, epRate) VALUES (?, ?, ?, ?, ?, ?, ?)';
                const [insertResult] = await db.query(insertRoomSql, [weekendType, roomType, occupancyType, roomOnlyRate, cpaiRate, mapiRate, epRate]);

                if (insertResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to add room")
                    );
                }

                // Get the inserted room ID
                const roomId = insertResult.insertId;

                const insertHotelSql = 'INSERT INTO hotel_rate_card (userId, roomId, type, submissionDate, hotelName, hotelAddress, hotelState, hotelCity, hotelZipCode, phoneNo, email, gstNo, rateValidFrom, rateValidTill) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
                const [result] = await db.query(insertHotelSql, [req.user.id, roomId, type, submissionDate, hotelName, hotelAddress, hotelState, hotelCity, hotelZipCode, phoneNo, email, gstNo, rateValidFrom, rateValidTill]);

                // Check if hotel rate card insertion was successful
                if (result.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to add hotel rate card")
                    );
                }

                await db.commit();
            } else {
                await db.beginTransaction();

                // Update hotel rate card
                const updateHotelSql = 'UPDATE hotel_rate_card SET submissionDate = ?, hotelName = ?, hotelAddress = ?, hotelState = ?, hotelCity = ?, hotelZipCode = ?, phoneNo = ?, email = ?, gstNo = ?, rateValidFrom = ?, rateValidTill = ? WHERE id = ?';
                const updateParams = [submissionDate, hotelName, hotelAddress, hotelState, hotelCity, hotelZipCode, phoneNo, email, gstNo, rateValidFrom, rateValidTill, id];
                const [updateResult] = await db.query(updateHotelSql, updateParams);

                if (updateResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to update hotel rate card")
                    );
                }

                // Update room
                const updateRoomSql = 'UPDATE room SET weekendType = ?, roomType = ?, occupancyType = ?, roomOnlyRate = ?, cpaiRate = ?, mapiRate = ?, epRate = ? WHERE id = ?';
                const updateRoomParams = [weekendType, roomType, occupancyType, roomOnlyRate, cpaiRate, mapiRate, epRate, existingRecord.roomId];
                const [updateRoomResult] = await db.query(updateRoomSql, updateRoomParams);

                if (updateRoomResult.affectedRows === 0) {
                    await db.rollback();
                    return res.status(500).json(
                        new ApiResponse(500, null, "Failed to update room")
                    );
                }

                await db.commit();
            }
        }

        return res.status(200).json(
            new ApiResponse(200, null, "Hotel rate card updated successfully")
        );
    } catch (error) {
        console.error("Error while updating hotel rate card: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error while updating hotel rate card")
        );
    }
});

const deleteHotelRateCard = asyncHandler(async (req, res) => {
    const id = req.params.id;

    try {
        await db.beginTransaction();

        const sql = 'SELECT * FROM hotel_rate_card WHERE id = ? AND userId = ?';
        const params = [id, req.user.id];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            await db.rollback();
            return res.status(404).json(
                new ApiResponse(404, null, "Hotel rate card not found")
            );
        }

        const hotelRateCard = result[0];
        const roomId = hotelRateCard.roomId;

        // Delete the associated file if it exists
        if (hotelRateCard.fileExists) {
            fs.unlink(hotelRateCard.filePath, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                } else {
                    console.log('File deleted successfully');
                }
            });
        }

        // Delete the hotel rate card
        const deleteSql = 'DELETE FROM hotel_rate_card WHERE id = ? AND userId = ?';
        const deleteParams = [id, req.user.id];
        const [deleteResult] = await db.query(deleteSql, deleteParams);

        if (deleteResult.affectedRows === 0) {
            await db.rollback(); // Rollback if hotel rate card deletion fails
            return res.status(500).json(
                new ApiResponse(500, null, "Failed to delete hotel rate card")
            );
        }

        // Check if the room exists before attempting to delete it
        const roomCheckSql = 'SELECT * FROM room WHERE id = ?';
        const [roomCheckResult] = await db.query(roomCheckSql, [roomId]);

        if (roomCheckResult.length > 0) {
            // Delete the associated room
            const deleteRoomSql = 'DELETE FROM room WHERE id = ?';
            const deleteRoomParams = [roomId];
            const [deleteRoomResult] = await db.query(deleteRoomSql, deleteRoomParams);

            if (deleteRoomResult.affectedRows === 0) {
                await db.rollback(); // Rollback if room deletion fails
                return res.status(500).json(
                    new ApiResponse(500, null, "Failed to delete associated room")
                );
            }
        } else {
            console.log(`Room with ID ${roomId} does not exist, skipping deletion.`);
        }

        // Commit the transaction
        await db.commit();

        return res.status(200).json(
            new ApiResponse(200, null, "Hotel rate card deleted successfully")
        );
    } catch (error) {
        console.error("Error while deleting hotel rate card: ", error);
        await db.rollback(); // Rollback the transaction in case of any error
        return res.status(500).json(
            new ApiResponse(500, null, "Error while deleting hotel rate card")
        );
    }
});

const getHotelRateCardDetails = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        // Fetch hotel rate card details along with room details using LEFT JOIN
        const sql = `
            SELECT hotel_rate_card.id AS rateCardId, hotel_rate_card.*, 
            room.id AS roomId, room.*
            FROM hotel_rate_card
            LEFT JOIN room ON hotel_rate_card.roomId = room.id
            WHERE hotel_rate_card.userId = ?
            ORDER BY hotel_rate_card.createdAt DESC
            LIMIT ? OFFSET ?`;

        const params = [req.user.id, limit, skip];
        const [result] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Hotel rate card details not found"
                )
            );
        }

        // Format the result to remove unnecessary fields
        const hotelRateResult = result.map(record => {
            const { userId, createdAt, updatedAt, roomId, id, rateCardId, ...hotelRateCardDetails } = record;

            console.log("Hotel Rate Card Details:", hotelRateCardDetails);

            return { id: record.rateCardId, ...hotelRateCardDetails };
        });

        // Count total records for pagination
        const countSql = `SELECT COUNT(*) as total FROM hotel_rate_card WHERE userId = ?`;
        const [countResult] = await db.query(countSql, [req.user.id]);
        const totalCount = countResult[0].total;

        // Return the response
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: hotelRateResult,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
                "Hotel rate card details fetched successfully"
            )
        );
    } catch (error) {
        console.error("Error while getting hotel rate card details: ", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "Error while getting hotel rate card details"
            )
        );
    }
});

export {
    addCabRateCardFile,
    downloadCabRateCardFile,
    getCabRateCardDetails,
    addCabRateCard,
    updateCabRateCard,
    deleteCabRateCard,
    addHotelRateCardFile,
    downloadHotelRateCardFile,
    addHotelRateCard,
    updateHotelRateCard,
    deleteHotelRateCard,
    getHotelRateCardDetails
}