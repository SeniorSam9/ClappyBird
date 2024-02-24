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
import bodyParser from "body-parser";
import { sortImage } from "./backend/models/sortImage.js";

const server = express();
const port = process.env.PORT || 3300;
const allowedFileTypes = ["image/jpeg", "image/png"];

// use services
server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("originalAssets"));
server.use(express.static("sortedAssets"));
server.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "frontend/originalAssets");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `${timestamp}${extension}`);
  },
});

const fileFilter = (req, file, callback) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    // allow to save it to assets
    callback(null, true);
  } else {
    callback(new Error("File type is invalid!"), false);
  }
};

const uploader = multer({ storage: storage, fileFilter: fileFilter });

// middle-wares
server.post(
  "/upload-original-image",
  uploader.single("originalImage"),
  async (req, res) => {
    const uploadedImageName = req.file.filename;
    const fileExtension = path.extname(uploadedImageName);
    try {
      const { procedure, data } = await sortImage(
        uploadedImageName,
        fileExtension
      );
      res.json({
        procedure: procedure,
        data: data,
      });
    } catch (error) {
      console.error(error);
      res.json({
        procedure: false,
        data: "Failure",
      });
    }
  }
);

server.listen(port, () => {
  console.info(`⚡ Server is running at http://localhost:${port}`);
});
