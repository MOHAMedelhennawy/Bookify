import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../public/images/events");
console.log("Upload directory path:", uploadDir);

if (!fs.existsSync(uploadDir)) {
	console.log("Creating upload directory:", uploadDir);
	fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log("Saving file to directory:", uploadDir);
		cb(null, uploadDir);
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		const extension = path.extname(file.originalname);
		const filename = file.fieldname + "-" + uniqueSuffix + extension;
		
		console.log("Generated filename:", filename);
		cb(null, filename);
	},
});

const upload = multer({ 
	storage: storage,
	fileFilter: (req, file, cb) => {
		// Check file type
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only image files are allowed!'), false);
		}
	},
	limits: {
		fileSize: 5 * 1024 * 1024 // 5MB limit
	}
});

export default upload;