const interfaceContent = document.querySelector(".content");
const sliderSection = document.querySelector("#slider");
const alert = document.querySelector(".alert");

let imagesAsDataURL = [];

// Get the images the user selected
function previewFiles() {
  let files = document.querySelector("input[type=file]").files;

  function readAndPreview(file) {
    let reader = new FileReader();
    reader.onload = function(e) {
      imagesAsDataURL.push(this.result);
    };
    reader.readAsDataURL(file);
  }

  if (files.length < 2 || files.length > 10) {
    alert.classList.add("show");
    files = [];
  } else {
    alert.classList.remove("show");
    sliderSection.classList.add("run");
    interfaceContent.classList.add("hidden");
    createImagesElments();
  }

  if (files) {
    [].forEach.call(files, readAndPreview);
  }
}

// Slider Handling
const track = document.querySelector(".track");
const dots = document.querySelector(".dots");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

// Create element for each item in imagesAsDataURL array
function createImagesElments() {
  setTimeout(function() {
    imagesAsDataURL.forEach((img, i) => {
      let sliderImg = document.createElement("div");
      sliderImg.classList.add("slider-img");
      sliderImg.setAttribute("style", `background-image: url('${img}')`);
      sliderImg.setAttribute("data-img-slider-index", `${i}`);
      sliderSection.querySelector(".track").appendChild(sliderImg);
      if (i === 0) {
        sliderImg.classList.add("active");
      }
      creatDots(i);
    });
    watchIfcheckboxIsChecked();
    prevBtn.addEventListener("click", handleSliderLogic);
    nextBtn.addEventListener("click", handleSliderLogic);
  }, 100);
}

// Init dots
function creatDots(index) {
  let dot = document.createElement("span");
  dot.classList.add("dot");
  dots.appendChild(dot);
  dot.setAttribute("data-dot-slider-index", `${index}`);
  if (index === 0) {
    dot.classList.add("active");
  }
  dots.childNodes.forEach(dot => dot.addEventListener("click", handleDots));
}
function handleDots(e) {
  let index = parseInt(e.target.getAttribute("data-dot-slider-index"));
  currentElement = document.querySelector(`[data-el-slider-index= '${index}']`);
  prevElement = document.querySelector(".slider-img.active");
  activeNewElement(prevElement, index);
}

// watch click events on prev & next btns

function handleSliderLogic(e) {
  let sliderElements = document.querySelectorAll(".slider-img");
  let prevElement = document.querySelector(".slider-img.active");
  let index = parseInt(prevElement.getAttribute("data-img-slider-index"));

  if (e.target.className == "prev") {
    // If first element in my slider
    if (prevElement.getAttribute("data-img-slider-index") == 0) {
      index = sliderElements.length - 1;
      activeNewElement(prevElement, index);
      return;
    } else {
      index = index - 1;
      activeNewElement(prevElement, index);
      return;
    }
  } else if (e.target.className == "next") {
    // If last element in my slider
    if (
      prevElement.getAttribute("data-img-slider-index") ==
      sliderElements.length - 1
    ) {
      index = 0;
      activeNewElement(prevElement, index);
      return;
    } else {
      index = index + 1;
      activeNewElement(prevElement, index);
      return;
    }
  }
}

function activeNewElement(prevElement, index) {
  currentElement = document.querySelector(
    `[data-img-slider-index= '${index}']`
  );
  currentDot = document.querySelector(`[data-dot-slider-index= '${index}']`);
  prevElement.classList.remove("active");
  currentElement.classList.add("active");
  dots.childNodes.forEach(dot => dot.classList.remove("active"));
  currentDot.classList.add("active");
}

// handle Autoplay
function watchIfcheckboxIsChecked() {
  const checkbox = document.querySelector(".checkbox input");
  setInterval(function() {
    if (checkbox.checked == false) {
      return;
    } else {
      handleAutoPlay();
    }
  }, 1500);
}

function handleAutoPlay() {
  let sliderElements = document.querySelectorAll(".slider-img");
  let prevElement = document.querySelector(".slider-img.active");
  let index = parseInt(prevElement.getAttribute("data-img-slider-index"));

  if (
    prevElement.getAttribute("data-img-slider-index") ==
    sliderElements.length - 1
  ) {
    index = 0;
    activeNewElement(prevElement, index);
    return;
  } else {
    index = index + 1;
    activeNewElement(prevElement, index);
    return;
  }
}
