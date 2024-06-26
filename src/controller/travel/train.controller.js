import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import connectToDb from "../../config/db.js";

let db = await connectToDb();

/**
 * @createTrainTravel
 * @params req, res
 * @Description : This function is used to create train travel data in the 'train' table of the 'tges' database using the MySQL module
*/
const createTrainTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || [];

    console.log(reqBody);

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
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel created successfully"
            )
        )
    } catch (error) {
        console.error("Error while creating travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating the travel"
            )
        )
    }
})

const updateTrainTravel = asyncHandler(async (req, res) => {
    // TODO: Implement update travel
});

const deleteTrainTravel = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getTrainTravelDetails = asyncHandler(async (req, res) => {
    // TODO: Implement get travel
})

export {
    createTrainTravel,
    updateTrainTravel,
    deleteTrainTravel,
    getTrainTravelDetails
}