import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

/**
 * @healthcheck
 * @params req, res
 * @Description : This function is used to check the health of the server
 */
const healthcheck = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Server is up and running"
        )
    )
})

export {
    healthcheck
}