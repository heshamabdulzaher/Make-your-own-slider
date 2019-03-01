const interfaceContent = document.querySelector(".content");
const sliderSection = document.querySelector("#slider");
const alert = document.querySelector(".alert");

let imagesAsDataURL = [];

function previewFiles() {
  const files = document.querySelector("input[type=file]").files;

  function readAndPreview(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      imagesAsDataURL.push(this.result);
    };
    reader.readAsDataURL(file);
  }

  if (files.length < 2 || files.length > 10) {
    alert.classList.add("show");
  } else {
    alert.classList.remove("show");
    sliderSection.classList.add("run");
    interfaceContent.classList.add("hidden");
    runSlider();
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}

function runSlider() {
  setTimeout(function() {
    console.log(imagesAsDataURL.length);
    imagesAsDataURL.forEach(img => {
      let sliderImg = document.createElement("img");
      sliderImg.classList.add("slider-img");
      sliderImg.setAttribute("src", `${img}`);
      sliderSection.querySelector(".track").appendChild(sliderImg);
    });
  }, 100);
}
