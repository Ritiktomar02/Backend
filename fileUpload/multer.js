import multer from "multer";
import path from "path";
import crypto from "crypto";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, (err, bytes) => {
      const filename =
        bytes.toString("hex") + path.extname(file.originalname);
      cb(null, filename);
    });
  },
});

export const upload = multer({ storage, limits:{
    fileSize:5*1024*1024,
} });
