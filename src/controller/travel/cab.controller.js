import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import connectToDb from "../../config/db.js";

let db = await connectToDb();

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