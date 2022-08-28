import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('button[data-start]');
const dateTimePicker = document.querySelector('#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

btnStart.disabled = true;
let userData = null;
DELAY = 1000;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate < Date.now()) {
            btnStart.disabled = true;
          window.alert('Please choose a date in the future!');
        }
        btnStart.disabled = false;
        userData = selectedDates[0];
    }
};

flatpickr(dateTimePicker, options);

class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
    btnStart.disabled = true;
  }

  start() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      btnStart.disabled = true;
      const currentTime = Date.now();
      const deltaTime = userData - currentTime;
      const components = convertMs(deltaTime);

      dataDays.textContent = components.days;
      dataHours.textContent = components.hours;
      dataMinutes.textContent = components.minutes;
      dataSeconds.textContent = components.seconds;

      if (deltaTime <= 0) {
        this.stop();
      }
    }, DELAY);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

btnStart.addEventListener('click', () => {
  timer.start();
});

const timer = new Timer();

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = 
    Math.floor(((ms % day) % hour) % minute) / second;

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
