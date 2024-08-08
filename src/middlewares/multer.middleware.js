import path from 'path';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({
    storage: multer.diskStorage({
        destination: "./src/static_files/cab_rate_cards",
        filename: (_req, file, cb) => {
            cb(null, `${uuidv4()}_${file.originalname}`);
        }
    }),
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.pdf' && ext !== '.xlsx' && ext !== '.csv') {
            cb(new Error(`Upsupported file type! ${ext}`), false);
            return;
        }
        cb(null, true);
    }
})

export default upload;