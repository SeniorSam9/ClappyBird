import {
  dragOverHandler,
  dropHandler,
} from "../frontend/src/scripts/dragAndDrop.js";
import { handleOriginalImage } from "../frontend/src/scripts/handleOriginalImage.js";
import {
  dropZone,
  fileInput,
  removeBtn,
  fileDisplay,
  myForm,
} from "../frontend/src/constants/documentConstants.js";

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

myForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const originalImage = fileInput.files[0];
  handleOriginalImage(originalImage);
});
