const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Selects
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2021, 4, 24, 11, 30, 0);

// console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const date = futureDate.getDate();

let weekDay = futureDate.getDay();
weekDay = weekdays[weekDay];

let month = futureDate.getMonth();
month = months[month];

giveaway.textContent = `giveaway ends on ${weekDay} ${date} ${month} ${year} ${hours}:${minutes}`;

// Future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;
  // console.log(t);

  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  // how many ms are in a day
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  // calculate days
  let days = t / oneDay;
  days = Math.floor(days);
  // console.log(days);

  // calculate hours
  let hours = (t % oneDay) / oneHour;
  hours = Math.floor(hours);

  // calculate minutes
  let minutes = (t % oneHour) / oneMinute;
  minutes = Math.floor(minutes);

  // calculate seconds
  let seconds = (t % oneMinute) / 1000;
  seconds = Math.floor(seconds);

  // set values array
  const values = [days, hours, minutes, seconds];

  // functions that adds a 0 if the value is < than 10
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }

  items.forEach((item, index) => {
    item.innerHTML = format(values[index]);
  });

  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, the giveaway is not available</h4>`;
  }

  // console.log(hours);
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
