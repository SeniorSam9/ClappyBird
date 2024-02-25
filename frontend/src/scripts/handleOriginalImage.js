import {
  errorMsg,
  mainCourse,
  originalImage,
  shuffledImage,
} from "../constants/documentConstants.js";

function handleOriginalImage(originalImage) {
  if (!originalImage || !isImage(originalImage)) {
    displayErrorMsg();
    return;
  }
  const formData = new FormData();
  formData.append("originalImage", originalImage);

  fetch("http://localhost:3300/upload-original-image", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.procedure) {
        displayErrorMsg();
        return;
      } else {
        const originalImageToPass = data.originalImage.substring(
          data.originalImage.lastIndexOf("\\") + 1
        );
        const shuffledImageToPass = data.shuffledImage.substring(
          data.shuffledImage.lastIndexOf("\\") + 1
        );
        console.log(originalImageToPass);
        console.log(shuffledImageToPass);
        handleMainCourse(originalImageToPass, shuffledImageToPass);
      }
    })
    .catch((err) => console.error(err));
}

function handleMainCourse(originalImagePath, shuffledImagePath) {
  originalImage.src = `originalAssets/${originalImagePath}`;
  shuffledImage.src = `shuffledAssets/${shuffledImagePath}`;
  mainCourse.style.display = "flex";
  return;
}

function isImage(file) {
  const allowedExtensions = [".jpeg", ".png"];
  const fileExtension = file.name.slice(file.name.lastIndexOf(".") >>> 0);
  console.log(fileExtension);
  console.log(allowedExtensions.includes("." + fileExtension.toLowerCase()));
  return allowedExtensions.includes(fileExtension.toLowerCase());
}

function displayErrorMsg() {
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 4000);
  errorMsg.style.display = "inline-block";
  return;
}

export { handleOriginalImage };
