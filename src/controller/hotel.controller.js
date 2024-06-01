import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

/**
 * @createHotelBooking
 * @params req, res
 * @Description : This function is used to create hotel travel data in the 'hotel' table of the 'tges' database using the MySQL module
*/
const createHotelBooking = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants } = reqBody;

    if (!name || !contactNo || !nationality || !email || !hotelName || !hotelAddress || !hotelContactNo || !mealPlan || !roomCategory || !checkInDate || !checkOutDate || !numberOfNights || !numberOfRooms || !adults || !children || !infants) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const hotelTravel = `INSERT INTO hotel (userId, name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hotelParams = [req.user.id ,name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, numberOfRooms, adults, children, infants];
        const [insertResult, insertFields] = await db.query(hotelTravel, hotelParams);
       
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
    // TODO: Implement get travel
})
    
export {
    createHotelBooking,
    updateHotelBooking,
    deleteHotelBooking,
    getHotelBookings
}