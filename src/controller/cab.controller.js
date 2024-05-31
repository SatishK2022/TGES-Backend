import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

/**
 * @createCabTravel
 * @params req, res
 * @Description : This function is used to create cab travel data in the 'cab' table of the 'tges' database using the MySQL module
*/
const createCabTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { tourPlan, name, country, contact, email, cabRequiredFor, pickUpDate, pickUpAddress, dropDate, dropAddress, cabDuration, noOfCab, noOfPersons, travellingWithInfant, otherRequirements } = reqBody;

    if (!tourPlan || !name || !country || !contact || !email || !cabRequiredFor || !pickUpDate || !pickUpAddress || !dropDate || !dropAddress || !cabDuration || !noOfCab || !noOfPersons) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const cabTravel = `INSERT INTO cab (userId, tourPlan, name, country, contact, email, cabRequiredFor, pickUpDate, pickUpAddress, dropDate, dropAddress, cabDuration, noOfCab, noOfPersons, travellingWithInfant, otherRequirements) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const cabParams = [req.user.id, tourPlan, name, country, contact, email, cabRequiredFor, pickUpDate, pickUpAddress, dropDate, dropAddress, cabDuration, noOfCab, noOfPersons, travellingWithInfant, otherRequirements];
        const [insertResult, insertFields] = await db.query(cabTravel, cabParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab travel created successfully"
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
    // TODO: Implement update travel
})

const deleteCabTravel = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getCabTravelDetails = asyncHandler(async (req, res) => {
    // TODO: Implement get travel
})

export {
    createCabTravel,
    updateCabTravel,
    deleteCabTravel,
    getCabTravelDetails
}