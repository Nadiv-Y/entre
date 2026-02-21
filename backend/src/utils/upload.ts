import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

// Define where to store images and how to parse them
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), '..', 'uploads'));
    },
    filename: (req, file, cb) => {
        // Extract the original extension (e.g. .jpg, .png)
        const ext = path.extname(file.originalname);
        // Create a unique filename with uuid to avoid collisions
        const uniqueFileName = `${uuidv4()}${ext}`;
        cb(null, uniqueFileName);
    }
});

// Configure Multer
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit to 5MB
    },
    fileFilter: (req, file, cb) => {
        // Only accept images
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed.'));
        }
    }
});
