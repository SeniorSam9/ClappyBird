const fileDisplay = document.getElementById("file-display");
const removeBtn = document.getElementById("remove-btn");

function dragOverHandler(evt, dropZone) {
  evt.preventDefault();
  dropZone.style.border = "2px dashed #e74c3c";
}

function dropHandler(evt, dropZone) {
  // the default behaviour of the browser is to open the file system when
  // the file is dropped, i wanna ignore that
  evt.preventDefault();
  dropZone.style.border = "2px dashed #3498db";

  if (evt.dataTransfer.items) {
    [...evt.dataTransfer.items].forEach((item, _) => {
      // ignore the item if not file
      if (item.kind === "file") {
        const file = item.getAsFile();
        const fileCustomName = file.name.substring(file.name.charAt(0));
        fileDisplay.innerText = `Dropped file: ${fileCustomName}`;
        removeBtn.style.display = "inline-block";
      }
    });
    // some browsers may not support evt.dataTransfer.items
  } else {
    [...ev.dataTransfer.files].forEach((file, _) => {
      const fileCustomName = file.name.substring(file.name.charAt(0));
      fileDisplay.innerText = `Dropped file: ${fileCustomName}`;
      removeBtn.style.display = "inline-block";
    });
  }
  // i actually dont why i returned true just wanted to sound fancy
  return true;
}

export { dragOverHandler, dropHandler };
