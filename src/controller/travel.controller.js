import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";

let db = await connectToDb();

// Train Controller
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

// Air Controller
const createAirTravel = asyncHandler(async (req, res) => {
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
        const insertAir = `INSERT INTO air (userId, fullName, dob, gender, contactNo, email, travelFrom, travelTo, classOfTravel, travelDate, flightNo, timePreference, remarks) VALUES ?`;
        
        const airParams = reqBody.map(data => [
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
            data.flightNo,
            data.timePreference,
            data.remarks
        ])

        const [insertResult, insertFields] = await db.query(insertAir, [airParams]);

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
    // TODO: Implement update travel
})

const deleteAirTravel = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getAirTravelDetails = asyncHandler(async (req, res) => {
    // TODO: Implement get travel
})

// Volvo Bus Controller
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

// Cab Controller
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

// Hotel Controller
const createHotelBooking = asyncHandler(async (req, res) => {
    const reqBody = req.body || {};
    const { fullName, contactNo, nationality, email, hotelfullName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants } = reqBody;

    if (!fullName || !contactNo || !nationality || !email || !hotelfullName || !hotelAddress || !hotelContactNo || !mealPlan || !roomCategory || !checkInDate || !checkOutDate || !numberOfNights || !noOfRooms || !adults || !children || !infants) {
        return res.status(400).json(
            new ApiResponse(
                400,
                null,
                "All fields are required"
            )
        )
    }

    try {
        const hotelTravel = `INSERT INTO hotel (userId, fullName, contactNo, nationality, email, hotelfullName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const hotelParams = [req.user.id ,fullName, contactNo, nationality, email, hotelfullName, hotelAddress, hotelContactNo, mealPlan, roomCategory, checkInDate, checkOutDate, numberOfNights, noOfRooms, adults, children, infants];
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
    // TODO: Implement update travel
})

const deleteHotelBooking = asyncHandler(async (req, res) => {
    // TODO: Implement delete travel
})

const getHotelBookings = asyncHandler(async (req, res) => {
    // TODO: Implement get travel
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