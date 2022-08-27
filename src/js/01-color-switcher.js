btnStart = document.querySelector('button[data-start]');
btnStop = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timerId = null;
btnStop.disabled = true;


btnStart.addEventListener('click', onStartChangeColor);
btnStop.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
    btnStart.disabled = true;
    btnStop.disabled = false;

  timerId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
  }, 1000);
}

function onStopChangeColor() {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
}