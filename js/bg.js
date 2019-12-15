const body = document.querySelector("body");
const IMAGE_COUNT = 3;

function getRandom() {
  return Math.floor(Math.random() * IMAGE_COUNT);
}

function setImage(ran) {
  const img = new Image();
  img.src = `images/background${ran + 1}.jpg`;
  img.classList.add("background-img");
  body.prepend(img);
}

function init() {
  const ran = getRandom();
  setImage(ran);
}

init();
