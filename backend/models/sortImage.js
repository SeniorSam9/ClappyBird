import { savePixels, getPixels } from "ndarray-pixels";
import fileSystem from "fs";
import path from "path";
import { fileURLToPath } from "url";

async function sortImage(imageName, fileExtension) {
  // get image path
  const imagePath = getFilePath(imageName);
  // get image (read)
  const bufferIn = fileSystem.readFileSync(imagePath);
  let typeToSupport;
  try {
    typeToSupport = supportedFileExtension(fileExtension);
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      procedure: false,
      data: "Failure",
    };
  }
  // convert to pixels
  const pixels = await getPixels(bufferIn, typeToSupport);
  // modifyImage (Array.sort() uses MergeSort leading O(n * log(n)) based on (Mozilla/Firefox)
  // pixels.data just flattened the 2D array
  pixels.data = pixels.data.sort();
  // build the image again (write)
  const bufferOut = await savePixels(pixels, typeToSupport);
  // save to sortedAssets
  const timestamp = Date.now();
  const sortedImageName = `${timestamp}${fileExtension}`;
  const sortedImagePath = setFilePath(sortedImageName);
  fileSystem.writeFileSync(sortedImagePath, bufferOut);
  return {
    procedure: true,
    data: sortedImagePath,
  };
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

function setFilePath(imageName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const sortedImagePath = path.join(
    __dirname,
    "../../frontend/sortedAssets",
    imageName
  );
  return sortedImagePath;
}

// returns paths to use
function getFilePath(imageName) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const imagePath = path.join(
    __dirname,
    "../../frontend/originalAssets",
    imageName
  );
  return imagePath;
}

export { sortImage };
