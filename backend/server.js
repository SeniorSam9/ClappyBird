/**
 * PLEASE NOTE
 * I COULD'VE BUILT THE BACKEND IN A MORE ORGANIZED WAY
 * USING MVC ARCHITECHTURE, BUT THE APP WAS PLANNED TO BE SIMPLE
 * HANDLING THE IMAGES, SORTING THEM, SEND THEM BACK TO THE CLIENT
 * ONLY
 */

import express from "express";
import multer from "multer";
import path from "path";

const server = express();
const port = 3400;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets");
  },
  filename: (req, file, callback) => {},
});

const uploader = multer({ storage: storage });

server.listen(port, () => {
  console.info(`⚡Server is running at http://localhost:${port}`);
});
