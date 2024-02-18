import { dragOverHandler, dropHandler } from "/src/scripts/dragAndDrop.js";

const dropZone = document.getElementById("drop-zone");
const fileInput = document.getElementById("file-input");
const fileDisplay = document.getElementById("file-display");
const removeBtn = document.getElementById("remove-btn");
const submitBtn = document.getElementById("submit-btn");
let isDropped = false;

dropZone.addEventListener("dragover", (evt) => {
  dragOverHandler(evt, dropZone);
});

dropZone.addEventListener("drop", (evt) => {
  dropHandler(evt, dropZone);
});

fileInput.addEventListener("change", () => {
  console.log(isDropped);
  if (fileInput.files.length > 0) {
    removeBtn.style.display = "inline-block";
  } else {
    removeBtn.style.display = "none";
  }
});

removeBtn.addEventListener("click", () => {
  fileInput.value = "";
  removeBtn.style.display = "none";
  fileDisplay.innerText = "Drop the image here";
});

submitBtn.addEventListener("submit", (evt) => {
  evt.preventDefault();
});
