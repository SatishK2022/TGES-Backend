import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";
import { isValuePresent } from "../utils/helper.js";
import { sendMail } from "../utils/sendMail.js";
import { hotelBookingTemplate } from "../email/email-template.js";

let db = await connectToDb();

/**
 * @createHotelBooking
 * @params req, res
 * @Description : This function is used to create hotel travel data in the 'hotel' table of the 'tges' database using the MySQL module
*/
const createHotelBooking = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants } = reqBody;

    if (!isValuePresent(reqBody)) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const hotelTravel = `INSERT INTO hotel (userId, nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hotelParams = [req.user.id, nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants];
        const [insertResult, insertFields] = await db.query(hotelTravel, hotelParams);

        // Send Mail
        // sendMail(
        //     req.user.email,
        //     "Hotel Booking Details",
        //     hotelBookingTemplate({ nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants })
        // )

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Hotel booking created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Hotel Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating hotel travel"
            )
        )
    }
})

const updateHotelBooking = asyncHandler(async (req, res) => {
    // TODO: Implement update travel
})

const deleteHotelBooking = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getHotelBookings = asyncHandler(async (req, res) => {
    const id = req.user.id;

    try {
        const sql = `SELECT * FROM hotel WHERE userId = ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Hotel Travel Details not found"
                )
            )
        }



        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Hotel Details fetched successfully"
            )
        )
    } catch (error) {
        onsole.log("Error getting hotel details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting hotel details"
            )
        )
    }
})

export {
    createHotelBooking,
    updateHotelBooking,
    deleteHotelBooking,
    getHotelBookings
}