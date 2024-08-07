import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import connectToDb from "../config/db.js";
import { volvoBusBookingTemplate } from "../email/email-template.js";
import { sendMail } from "../utils/sendMail.js";
import { calculateAge, generateExcelSheet } from "../utils/helper.js";
import { v4 as uuidv4 } from "uuid"
import path from "path";

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

        const emailContent = reqBody.map(data => {
            const age = calculateAge(data.dob);
            return {
                ...data,
                age
            };
        });

        const excelContent = emailContent.map((data) => {
            return {
                "Full Name": data.fullName,
                "Age": data.age,
                "DOB": data.dob,
                "Gender": data.gender,
                "Contact No": data.contactNo,
                "Email": data.email,
                "Travel From": data.pickupLocation,
                "Travel To": data.destination,
                "Class Of Travel": "",
                "Travel Mode": "Bus",
                "Travel Date": data.travelDate,
                "Bus No": data.busNo,
                "Seat Type": data.seatType,
            };
        });

        const uniqueFilename = `bus_${uuidv4()}.xlsx`;
        const uploadPath = path.join('public', 'excel', uniqueFilename);

        generateExcelSheet(excelContent, uploadPath, "Bus No");

        // Send Mail
        try {
            sendMail(
                req.user.email,
                "Volvo Bus Travel Details",
                volvoBusBookingTemplate(emailContent),
                uniqueFilename,
                uploadPath
            )
        } catch (error) {
            console.log("Error sending volvo bus booking email:", error);
        }

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
    const id = req.user.id;

    try {
        const selectVolvoBus = `SELECT * FROM bus WHERE userId = ?`;
        const [selectResult] = await db.query(selectVolvoBus, [id]);

        if (selectResult.length === 0) {
            return res.status(404).json(
                new ApiResponse(
                    200,
                    null,
                    "Volvo Bus Travel Details not found"
                )
            )
        }

        // Calculate age for each entry
        const busTravelData = selectResult.map(user => {
            const { userId, createdAt, updatedAt, ...rest } = user;
            const calculatedAge = calculateAge(user.dob);
            return { ...rest, age: calculatedAge };
        });

        return res.status(200).json(
            new ApiResponse(
                200,
                busTravelData,
                "Volvo bus travel details fetched successfully"
            )
        );
    } catch (error) {
        console.log("Error Fetching Volvo Bus Travel:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while fetching volvo bus travel"
            )
        );
    }
})

export {
    createVolvoBusTravel,
    updateVolvoBusTravel,
    deleteVolvoBusTravel,
    getVolvoBusTravelDetails
}