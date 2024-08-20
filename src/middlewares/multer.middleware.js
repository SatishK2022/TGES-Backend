import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import ApiResponse from '../utils/ApiResponse.js';
import connectToDb from "../config/db.js";
import asyncHandler from '../utils/asyncHandler.js';

let db = await connectToDb();

const upload = multer({
    storage: multer.diskStorage({
        destination: "./src/static_files/uploads",
        filename: (_req, file, cb) => {
            cb(null, `${uuidv4()}_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 5 * 1024 * 1024 // Limit file size to 5 MB
    },
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedTypes = ['.pdf', '.xlsx', '.csv'];

        if (!allowedTypes.includes(ext)) {
            cb(new Error(`Unsupported file type! Supported types are: ${allowedTypes.join(', ')}`), false);
            return;
        }
        cb(null, true);
    }
});

const checkFileExists = asyncHandler(async (req, res, next) => {
    const type = req.query.type;

    try {
        if (type === 'cab') {
            const sql = 'SELECT * FROM cab_rate_card WHERE userId = ?';
            const params = [req.user.id];
            const [existedUser] = await db.query(sql, params);

            if (existedUser.length > 0) {
                return res.status(400).json(
                    new ApiResponse(400, null, "Cab rate card already exists")
                );
            }
        } else if(type === 'hotel') {
            const sql = 'SELECT * FROM hotel_rate_card WHERE userId = ?';
            const params = [req.user.id];
            const [existedUser] = await db.query(sql, params);

            if (existedUser.length > 0) {
                return res.status(400).json(
                    new ApiResponse(400, null, "Hotel rate card already exists")
                );
            }
        }

        next();
    } catch (error) {
        console.error("Error checking file existence: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error checking file existence")
        );
    }
});

const checkRateCardExists = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const type = req.query.type;

    try {
        if (type === 'cab') {
            const sql = `SELECT * FROM cab_rate_card WHERE id = ? AND userId = ?`;
            const params = [id, req.user.id];
            const [result] = await db.query(sql, params);

            if (result.length === 0) {
                return res.status(404).json(
                    new ApiResponse(404, null, "Cab rate card not found")
                );
            }
        } else if (type === 'hotel') {
            const sql = `SELECT * FROM hotel_rate_card WHERE id = ? AND userId = ?`;
            const params = [id, req.user.id];
            const [result] = await db.query(sql, params);

            if (result.length === 0) {
                return res.status(404).json(
                    new ApiResponse(404, null, "Cab rate card not found")
                );
            }
        }

        next();
    } catch (error) {
        console.error("Error checking cab rate card existence: ", error);
        return res.status(500).json(
            new ApiResponse(500, null, "Error checking cab rate card existence")
        );
    }
});

export {
    upload,
    checkFileExists,
    checkRateCardExists
}