import fileSystem from "fs";
import path from "path";

function deleteImages() {
  deleteImagesHelper("frontend/originalAssets");
  deleteImagesHelper("frontend/shuffledAssets");
}

function deleteImagesHelper(directory) {
  fileSystem.readdir(directory, (err, files) => {
    if (err) {
      console.error(`directory not found ${err}`);
      return {
        procedure: false,
      };
    }

    for (let file of files) {
      if (
        file.endsWith(".jpeg") ||
        file.endsWith(".jpg") ||
        file.endsWith(".png")
      ) {
        // delete files
        fileSystem.unlink(path.join(directory, file), (err) => {
          if (err) {
            console.error(`directory not found ${err}`);
            return {
              procedure: false,
            };
          } else {
            console.log(`${file} was deleted`);
          }
        });
      }
    }
  });
  return {
    procedure: true,
  };
}

export { deleteImages };
