import { contactUsTemplate } from "../email/email-template.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.js";

const contactUs = asyncHandler(async (req, res) => {
    const { name, email, contactNo, subject, message } = req.body

    try {
        sendMail(
            "bookings@tgestravel.com",
            "Contact Us",
            contactUsTemplate({ name, email, contactNo, subject, message })
        )

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Query posted successfully"
            )
        )
    } catch (error) {
        console.error("Error while posting query:", error);
        return res.status(500).json(
            new ApiResponse(
                500,
                null,
                "An error occurred while posting query"
            )
        )
    }
})

export {
    contactUs
}