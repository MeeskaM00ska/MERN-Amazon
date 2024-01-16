import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

// want it storaged on server
const storage = multer.diskStorage({
  //obj of some func
  destination(req, file, cb) {
    cb(null, "uploads/"); //null is for error, uploads/ is the route
  },
  filename(req, file, cb) {
    //describe how our file name was
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
