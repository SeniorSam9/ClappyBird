import { dragOverHandler, dropHandler } from "./scripts/dragAndDrop.js";
import { handleOriginalImage } from "./scripts/handleOriginalImage.js";
import {
  dropZone,
  fileInput,
  removeBtn,
  fileDisplay,
  submitBtn,
} from "./constants/documentConstants.js";

dropZone.addEventListener("dragover", (evt) => {
  dragOverHandler(evt, dropZone);
});

dropZone.addEventListener("drop", (evt) => {
  dropHandler(evt, dropZone);
});

fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    removeBtn.style.display = "inline-block";
    fileDisplay.innerText = "";
  } else {
    removeBtn.style.display = "none";
  }
});

removeBtn.addEventListener("click", () => {
  fileInput.value = "";
  removeBtn.style.display = "none";
  fileDisplay.innerText = "Drop the image here or";
});

submitBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  const originalImage = fileInput.files[0];
  await handleOriginalImage(originalImage);
});
