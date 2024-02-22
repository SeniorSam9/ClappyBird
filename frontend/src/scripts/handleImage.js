const errorMsg = document.getElementById("error");

async function handleImage(file) {
  if (!file || !isImage(file)) {
    displayErrorMsg();
    return;
  }
  const formData = new FormData();
  formData.append("original-image", file);

  try {
    const response = await fetch(
      "http://localhost:3300/upload-original-image",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: formData,
      }
    );

    const sortedImage = await response.json();
    if (!sortedImage.success) {
      throw new Error();
    }
  } catch (err) {
    console.error(`Error: ${err}`);
    displayErrorMsg();
  }

  return sortedImage;
}

function isImage(file) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1) >>> 0);
  return allowedExtensions.includes("." + fileExtension.toLowerCase());
}

function displayErrorMsg() {
  setTimeout(() => {
    errorMsg.style.display = "none";
  }, 4000);
  errorMsg.style.display = "inline-block";
  return;
}

export { handleImage };
