const interfaceContent = document.querySelector(".content");
const alert = document.querySelector(".alert");

let imagesAsDataURL = [];

function previewFiles() {
  const files = document.querySelector("input[type=file]").files;

  function readAndPreview(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      imagesAsDataURL.push(this.result);
    };
    if (files.length < 2 || files.length > 10) {
      alert.classList.add("show");
    } else {
      alert.classList.remove("show");
      interfaceContent.classList.add("hidden");
      startTheShow();
    }
    reader.readAsDataURL(file);
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}

function startTheShow() {
  console.log(imagesAsDataURL);
}
