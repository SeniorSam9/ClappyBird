/**
 *                      PLEASE NOTE
 * I COULD'VE BUILT THE BACKEND IN A MORE ORGANIZED WAY
 * USING MVC ARCHITECHTURE, BUT THE APP WAS PLANNED TO BE SIMPLE
 * HANDLING RECEIVED IMAGES, SEND THEM BACK TO THE CLIENT
 * ONLY
 */
import express from "express";
import multer from "multer";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { sortImage } from "/backend/models/sortImage.js";

const server = express();
const port = process.env.PORT || 3300;
const allowedFileTypes = ["image/jpeg", "image/png"];

// use services
server.use(cors());
server.use(express.static("assets"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "frontend/assets");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}${extension}`);
  },
});

const uploader = multer({ storage: storage, fileFilter: fileFilter });

const fileFilter = (req, file, callback) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    // allow to save it to assets
    callback(null, true);
  } else {
    callback(new Error("File type is invalid!"), false);
  }
};

// middle-wares
server.post(
  "/upload-original-image",
  uploader.single("original-image"),
  async (req, res) => {
    const uploadedImageName = req.file.originalname;
    const fileExtension = path.extname(uploadedImageName);
    try {
      const sortedImageName = await sortImage(uploadedImageName, fileExtension);
      res.end();
    } catch (error) {}
    res.end();
  }
);

server.listen(port, () => {
  console.info(`⚡ Server is running at http://localhost:${port}`);
});
