const clock = document.querySelector(".js-clock .clock__text");

function fomatTime(time) {
  return `${time < 10 ? `0${time}` : time}`;
}

function getTime() {
  const date = new Date();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  clock.innerText = `${fomatTime(hours)}:${fomatTime(minutes)}:${fomatTime(
    seconds
  )}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
