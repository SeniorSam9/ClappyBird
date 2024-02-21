const errorMsg = document.getElementById("error");

async function handleImage(file) {
  if (!file || !isImage(file)) {
    setTimeout(() => {
      errorMsg.style.display = "none";
    }, 4000);
    errorMsg.style.display = "inline-block";
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
  } catch (error) {}

  return sortedImage;
}

function isImage(file) {
  const allowedExtensions = [".jpg", ".jpeg", ".png"];
  const fileExtension = file.name.slice((file.name.lastIndexOf(".") - 1) >>> 0);
  return allowedExtensions.includes("." + fileExtension.toLowerCase());
}
export { handleImage };
