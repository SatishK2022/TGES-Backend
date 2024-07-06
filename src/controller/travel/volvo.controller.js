import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import connectToDb from "../../config/db.js";
import { volvoBusBookingTemplate } from "../../email/email-template.js";
import { sendMail } from "../../utils/sendMail.js";

let db = await connectToDb();

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

        // Send Mail
        // sendMail(
        //     req.user.email,
        //     "Volvo Bus Travel Details",
        //     volvoBusBookingTemplate(reqBody)
        // )

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

const updateVolvoBusTravel = asyncHandler(async (req, res) => {
    // TODO: Implement update travel
})

const deleteVolvoBusTravel = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getVolvoBusTravelDetails = asyncHandler(async (req, res) => {
    // TODO: Implement get travel
})

export {
    createVolvoBusTravel,
    updateVolvoBusTravel,
    deleteVolvoBusTravel,
    getVolvoBusTravelDetails
}