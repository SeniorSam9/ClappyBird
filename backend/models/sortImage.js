import { savePixels, getPixels } from "ndarray-pixels";
import fileSystem from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function sortImage(imageName, fileExtension) {
  // get image path
  const imagePath = getFilePath(imageName);
  // get image
  const bufferIn = fileSystem.readFileSync(imagePath);
  let typeToSupport;
  try {
    typeToSupport = supportedFileExtension(fileExtension);
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      process: false,
      data: "",
    };
  }
  // convert to pixels
  const pixels = await getPixels(bufferIn, typeToSupport);

  // modifyImage
  const [imageWidth, imageHeight] = pixels.shape;
  // i and j for width, height
  for (let i = 0; i < imageWidth; i++) {
    console.log("width: " + i);
    for (let j = 0; j < imageHeight; j++) {
      console.log("height: " + j);
    }
  }
  return { process: true, data: "" };
}

function supportedFileExtension(extension) {
  let typeToSupport;
  // check image extension
  switch (extension) {
    case ".png":
      typeToSupport = "image/png";
      break;
    case ".jpeg":
      typeToSupport = "image/jpeg";
      break;
    default:
      throw new Error("file type is not supported");
  }

  return typeToSupport;
}

// returns paths to use
function getFilePath(imageName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imagePath = path.join(__dirname, "../../frontend/assets", imageName);
  return imagePath;
}

export { sortImage };
