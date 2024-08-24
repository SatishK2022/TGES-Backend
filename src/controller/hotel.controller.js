import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { pool as db } from "../config/db.js";
import { isValuePresent } from "../utils/helper.js";
import { sendMail } from "../utils/sendMail.js";
import { hotelBookingTemplate } from "../email/email-template.js";


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
        // try {
        //     sendMail(
        //         req.user.email,
        //         "Hotel Booking Details",
        //         hotelBookingTemplate({ nationality, name, contactNo1, contactNo2, email, country, state, city, roomCategory, mealPlan, hotelCategory, priceRange, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants })
        //     )
        // } catch (error) {
        //     console.log("Error sending hotel booking email:", error);
        // }

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    try {
        const sql = `SELECT SQL_CALC_FOUND_ROWS * FROM hotel WHERE userId = ?`;
        const params = [id];
        const [result, fields] = await db.query(sql, params);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Hotel Travel Details not found"
                )
            )
        }

        const totalCountSql = `SELECT FOUND_ROWS() as count`;
        const [totalCountResult] = await db.query(totalCountSql);
        const totalCount = totalCountResult[0].count;

        const hotelData = result.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            return rest
        })

        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: hotelData,
                    pagination: {
                        total_records: totalCount,
                        total_pages: Math.ceil(totalCount / limit),
                        limit: limit,
                        current_page: page,
                        next_page: page < Math.ceil(totalCount / limit) ? page + 1 : null,
                        prev_page: page > 1 ? page - 1 : null
                    }
                },
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