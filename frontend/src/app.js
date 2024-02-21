import { dragOverHandler, dropHandler } from "./scripts/dragAndDrop.js";
import { handleImage } from "./scripts/handleImage.js";

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const fileDisplay = document.getElementById("file-display");
const removeBtn = document.getElementById("remove-btn");
const submitBtn = document.getElementById("submit-btn");

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
  await handleImage(originalImage);
});
