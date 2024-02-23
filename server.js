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
server.use(express.static("assets"));
server.use(express.json());

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
  uploader.single("image"),
  async (req, res) => {
    //   console.log(req.file);
    //   console.log(req.body);
    //   const uploadedImageName = req.file.filename;
    //   const fileExtension = path.extname(uploadedImageName);
    //   try {
    //     const sortedImageName = await sortImage(uploadedImageName, fileExtension);
    //     res.end();
    //   } catch (error) {}
    //   res.end();
    console.log(req.body);
  }
);

server.listen(port, () => {
  console.info(`⚡ Server is running at http://localhost:${port}`);
});
