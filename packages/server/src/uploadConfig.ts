import path from "path";
import multer from "multer";

export const storageDir = path.join(__dirname, "../", "storage");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, storageDir),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

export default upload;
