function saveImageToAssets(image) {
  if (image) {
    const fileReader = new FileReader();

    fileReader.onload = (evt) => {
      const fileContent = evt.target.result;

      // we wanna create a Baniary large
    };
  }
}

export { saveImageToAssets };
