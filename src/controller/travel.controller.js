import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

// Train Controller
const createTrainTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, trainNo, timePreference } = reqBody;

    if (!name || !dob || !gender || !contactNo || !email || !from || !to || !classOfTravel || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const insertTrain = `INSERT INTO train (userId, name, dob, gender, contactNo, email, \`from\`, \`to\`, classOfTravel, travelDate, trainNo, timePreference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const trainParams = [req.user.id, name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, trainNo, timePreference];

        const [result, fields] = await db.query(insertTrain, trainParams);
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
    const { id } = req.params;
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate } = reqBody;

    if (!name || !dob || !gender || !contactNo || !email || !from || !to || !classOfTravel || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const selectTravel = `SELECT * FROM train WHERE id = ?`;
        const [result, fields] = await db.query(selectTravel, [id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel details not found"
                )
            );
        }

        const updateTrain = `UPDATE train SET name = ?, dob = ?, gender = ?, contactNo = ?, email = ?, \`from\` = ?, \`to\` = ?, classOfTravel = ?, travelDate = ? WHERE id = ?`;
        const trainParams = [name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, id];

        const [updateResult, updateFields] = await db.query(updateTrain, trainParams);
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel updated successfully"
            )
        )
    } catch (error) {
        console.error("Error while updating travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating the travel"
            )
        )
    }
});

const deleteTrainTravel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const selectTravel = `SELECT * FROM train WHERE id = ?`;
        const [result, fields] = await db.query(selectTravel, [id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Travel details not found"
                )
            );
        }

        const deleteTrain = `DELETE FROM train WHERE id = ?`;

        const [deleteResult, deleteFields] = await db.query(deleteTrain, [id]);
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Travel deleted successfully"
            )
        )
    } catch (error) {
        console.error("Error while deleting travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting the travel"
            )
        )
    }
})

const getTrainTravelDetails = asyncHandler(async (req, res) => {
    try {
        const selectTravel = `SELECT * FROM train WHERE userId = ?`;
        const [result, fields] = await db.query(selectTravel, [req.user.id]);
        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Travel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Getting Travel Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting travel details"
            )
        )
    }
})

// Air Controller
const createAirTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, flightNo, timePreference } = reqBody;

    if (!name || !dob || !gender || !contactNo || !email || !from || !to || !classOfTravel || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const insertAir = `INSERT INTO air (userId, name, dob, gender, contactNo, email, \`from\`, \`to\`, classOfTravel, travelDate, flightNo, timePreference) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const airParams = [req.user.id, name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, flightNo, timePreference];
        const [insertResult, insertFields] = await db.query(insertAir, airParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Air travel created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Air Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating air travel"
            )
        )
    }

})

const updateAirTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, flightNo, timePreference } = reqBody;
    const { id } = req.params;

    if (!name || !dob || !gender || !contactNo || !email || !from || !to || !classOfTravel || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const selectAir = `SELECT * FROM air WHERE id = ?`;
        const [result, fields] = await db.query(selectAir, [id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Air travel details not found"
                )
            );
        }

        const updateAir = `UPDATE air SET name = ?, dob = ?, gender = ?, contactNo = ?, email = ?, \`from\` = ?, \`to\` = ?, classOfTravel = ?, travelDate = ?, flightNo = ?, timePreference = ? WHERE id = ?`;
        const airParams = [name, dob, gender, contactNo, email, from, to, classOfTravel, travelDate, flightNo, timePreference, id];
        const [updateResult, updateFields] = await db.query(updateAir, airParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Air travel updated successfully"
            )
        )
    } catch (error) {
        console.log("Error Updating Air Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating air travel"
            )
        )
    }
})

const deleteAirTravel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const selectAir = `SELECT * FROM air WHERE id = ?`;
        const [result, fields] = await db.query(selectAir, [id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Air travel details not found"
                )
            );
        }

        const deleteAir = `DELETE FROM air WHERE id = ?`;
        const [deleteResult, deleteFields] = await db.query(deleteAir, [id]);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Air travel deleted successfully"
            )
        )
    } catch (error) {
        console.log("Error Deleting Air Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting air travel"
            )
        )
    }
})

const getAirTravelDetails = asyncHandler(async (req, res) => {
    try {
        const selectAir = `SELECT * FROM air WHERE userId = ?`;
        const [result, fields] = await db.query(selectAir, [req.user.id]);

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Air travel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Getting Air Travel Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while getting air travel details"
            )
        )
    }
})

// Volvo Bus Controller
const createVolvoBusTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, remarks } = reqBody;

    if (!name || !dob || !gender || !contactNo || !email || !pickupLocation || !destination || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const insertBus = `INSERT INTO bus (userId, name, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const busParams = [req.user.id, name, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, remarks];
        const [insertResult, insertFields] = await db.query(insertBus, busParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel created successfully"
            )
        )
    } catch (error) {
        console.log("Error Creating Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while creating volvo bus travel"
            )
        )
    }
})

const updateVolvoBusTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, remarks } = reqBody;
    const { id } = req.params;

    if (!name || !dob || !gender || !contactNo || !email || !pickupLocation || !destination || !travelDate) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        );
    }

    try {
        const selectBus = `SELECT * FROM bus WHERE id = ?`;
        const [result, fields] = await db.query(selectBus, [id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Volvo bus travel details not found"
                )
            );
        }

        const updateBus = `UPDATE bus SET name = ?, dob = ?, gender = ?, contactNo = ?, email = ?, pickupLocation = ?, destination = ?, travelDate = ?, seatType = ?, remarks = ? WHERE id = ?`;
        const busParams = [name, dob, gender, contactNo, email, pickupLocation, destination, travelDate, seatType, remarks, id];
        const [updateResult, updateFields] = await db.query(updateBus, busParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel updated successfully"
            )
        )
    } catch (error) {
        console.log("Error Updating Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating volvo bus travel"
            )
        )
    }
})

const deleteVolvoBusTravel = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const selectBus = `SELECT * FROM bus WHERE id = ?`;
        const [result, fields] = await db.query(selectBus, [id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Volvo bus travel details not found"
                )
            );
        }

        const deleteBus = `DELETE FROM bus WHERE id = ?`;
        const [deleteResult, deleteFields] = await db.query(deleteBus, [id]);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Volvo bus travel deleted successfully"
            )
        )
    } catch (error) {
        console.log("Error Deleting Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting volvo bus travel"
            )
        )
    }
})

const getVolvoBusTravelDetails = asyncHandler(async (req, res) => {
    try {
        const selectBus = `SELECT * FROM bus WHERE userId = ?`;
        const [result, fields] = await db.query(selectBus, [req.user.id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Volvo bus travel details not found"
                )
            );
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Volvo bus travel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Fetching Volvo Bus Travel Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching volvo bus travel details"
            )
        )
    }
})

// Cab Controller
const createCabTravel = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { tourPlan, name, pickupCountry, contactNo, email, cabRequiredFor, pickupDate, pickupTime, pickupAddress, dropDate, dropTime, dropAddress, cabDuration, NoOfCabs, typeOfCabs, noOfPassengers, travellingWith, remarks } = reqBody;

    if (!tourPlan || !name || !pickupCountry || !contactNo || !email || !cabRequiredFor || !pickupDate || !pickupTime || !pickupAddress || !dropDate || !dropTime || !dropAddress || !cabDuration || !NoOfCabs || !typeOfCabs || !noOfPassengers) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const cabTravel = `INSERT INTO cab (userId, tourPlan, name, pickupCountry, contactNo, email, cabRequiredFor, pickupDate, pickupTime, pickupAddress, dropDate, dropTime, dropAddress, cabDuration, NoOfCabs, typeOfCabs, noOfPassengers, travellingWith, remarks) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const cabParams = [req.user.id, tourPlan, name, pickupCountry, contactNo, email, cabRequiredFor, pickupDate, pickupTime, pickupAddress, dropDate, dropTime, dropAddress, cabDuration, NoOfCabs, typeOfCabs, noOfPassengers, travellingWith, remarks];
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
    const { id } = req.params;
    const reqBody = req.body || {};
    const { tourPlan, name, pickupCountry, contactNo, email, cabRequiredFor, pickupDate, pickupTime, pickupAddress, dropDate, dropTime, dropAddress, cabDuration, NoOfCabs, typeOfCabs, noOfPassengers, travellingWith, remarks } = reqBody;

    if (!tourPlan || !name || !pickupCountry || !contactNo || !email || !cabRequiredFor || !pickupDate || !pickupTime || !pickupAddress || !dropDate || !dropTime || !dropAddress || !cabDuration || !NoOfCabs || !typeOfCabs || !noOfPassengers) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const selectCab = `SELECT * FROM cab WHERE id = ?`;
        const [result, fields] = await db.query(selectCab, [id]);

        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab travel details not found"
                )
            );
        }

        const cabTravel = `UPDATE cab SET tourPlan = ?, name = ?, pickupCountry = ?, contactNo = ?, email = ?, cabRequiredFor = ?, pickupDate = ?, pickupTime = ?, pickupAddress = ?, dropDate = ?, dropTime = ?, dropAddress = ?, cabDuration = ?, NoOfCabs = ?, typeOfCabs = ?, noOfPassengers = ?, travellingWith = ?, remarks = ? WHERE id = ?`;
        const cabParams = [tourPlan, name, pickupCountry, contactNo, email, cabRequiredFor, pickupDate, pickupTime, pickupAddress, dropDate, dropTime, dropAddress, cabDuration, NoOfCabs, typeOfCabs, noOfPassengers, travellingWith, remarks, id];
        const [updateResult, updateFields] = await db.query(cabTravel, cabParams);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab travel updated successfully"
            )
        )
    } catch (error) {
        console.log("Error Updating Cab Travel:", error);
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
    const { id } = req.params;

    try {
        const selectCab = `SELECT * FROM cab WHERE id = ?`;
        const [result, fields] = await db.query(selectCab, [id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab travel details not found"
                )
            );
        }

        const deleteCab = `DELETE FROM cab WHERE id = ?`;
        const [deleteResult, deleteFields] = await db.query(deleteCab, [id]);

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Cab travel deleted successfully"
            )
        )
    } catch (error) {
        console.log("Error Deleting Cab Travel:", error);
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
    try {
        const selectCab = `SELECT * FROM cab WHERE userId = ?`;
        const [result, fields] = await db.query(selectCab, [req.user.id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Cab travel details not found"
                )
            );
        }
        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Cab travel details fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Fetching Cab Travel Details:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching cab travel details"
            )
        )
    }
})

// Hotel Controller
const createHotelBooking = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants } = reqBody;

    if (!name || !contactNo || !nationality || !email || !hotelName || !hotelAddress || !hotelContactNo || !mealPlan || !roomCategory || !checkInDate || !checkOutDate || !numberOfNights || !noOfRooms || !adults || !children || !infants) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const hotelTravel = `INSERT INTO hotel (userId, name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hotelParams = [req.user.id ,name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants];
        const [insertResult, insertFields] = await db.query(hotelTravel, hotelParams);
       
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Hotel travel created successfully"
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
    const reqBody = req.body || {};
    const { name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants } = reqBody;
    const { id } = req.params;

    if (!name || !contactNo || !nationality || !email || !hotelName || !hotelAddress || !hotelContactNo || !mealPlan || !roomCategory || !checkInDate || !checkOutDate || !numberOfNights || !noOfRooms || !adults || !children || !infants) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const selectHotel = `SELECT * FROM hotel WHERE id = ?`;
        const [result, fields] = await db.query(selectHotel, [id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Hotel travel details not found"
                )
            );
        }

        const hotelBooking = `UPDATE hotel SET name = ?, contactNo = ?, nationality = ?, email = ?, hotelName = ?, hotelAddress = ?, hotelContactNo = ?, mealPlan = ?, roomCategory = ?, checkInDate = ?, checkOutDate = ?, numberOfNights = ?, noOfRooms = ?, adults = ?, children = ?, infants = ? WHERE id = ?`;
        const hotelBookingParams = [name, contactNo, nationality, email, hotelName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants, id];
        const [updateResult, updateFields] = await db.query(hotelBooking, hotelBookingParams);
       
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Hotel travel updated successfully"
            )
        )

    } catch (error) {
        console.log("Error Updating Hotel Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while updating hotel travel"
            )
        )
    }
})

const deleteHotelBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
        const selectHotel = `SELECT * FROM hotel WHERE id = ?`;
        const [result, fields] = await db.query(selectHotel, [id]);
        if (result.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    404,
                    null,
                    "Hotel travel details not found"
                )
            );
        }
        const hotelBooking = `DELETE FROM hotel WHERE id = ?`;
        const hotelBookingParams = [id];
        const [deleteResult, deleteFields] = await db.query(hotelBooking, hotelBookingParams);
       
        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Hotel travel deleted successfully"
            )
        )
    } catch (error) {
        console.log("Error Deleting Hotel Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while deleting hotel travel"
            )
        )
    }
})

const getHotelBookings = asyncHandler(async (req, res) => {
    try {
        const selectHotel = `SELECT * FROM hotel`;
        const [result, fields] = await db.query(selectHotel);
        return res.status(200).json(
            new ApiResponse(
                200,
                result,
                "Hotel bookings fetched successfully"
            )
        )
    } catch (error) {
        console.log("Error Fetching Hotel Bookings:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching hotel bookings"
            )
        )
    }
})
    
export {
    createTrainTravel,
    updateTrainTravel,
    deleteTrainTravel,
    getTrainTravelDetails,
    createAirTravel,
    updateAirTravel,
    deleteAirTravel,
    getAirTravelDetails,
    createVolvoBusTravel,
    updateVolvoBusTravel,
    deleteVolvoBusTravel,
    getVolvoBusTravelDetails,
    createCabTravel,
    updateCabTravel,
    deleteCabTravel,
    getCabTravelDetails,
    createHotelBooking,
    updateHotelBooking,
    deleteHotelBooking,
    getHotelBookings
}