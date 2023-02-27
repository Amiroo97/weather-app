let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = document.querySelector("#days");
day.innerHTML = `${days[now.getDay()]}`;

let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let currentDate = document.querySelector("#date-time");
currentDate.innerHTML = `${now.getDate()} ${
  months[now.getMonth()]
} ${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()} `;

/////////////////////////////////////////////////////////////////////

function showTemp(response) {
  let temperature = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  temperature.innerHTML = Math.round(response.data.temperature.current);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}
function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let citySearch = document.querySelector("#search-box");
  if (citySearch.value.length > 0) {
    cityName.innerHTML = `${citySearch.value}`;
  }
  let apiKey = "bdt58a0b3f1ee4817602fa2b7do31ae6";
  let url = `https://api.shecodes.io/weather/v1/current?query=${citySearch.value}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

let submit = document.querySelector("#search-city");
submit.addEventListener("click", searchCity);

function showPosition(position) {
  let apiKey = "5354b60afda2b7800186c06153932396";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}
function getLoc(event) {
  event.preventDefault();
  Navigator.geolocation.getCurrentPosition(showPosition);
}
let locButton = document.querySelector("#current-loc");
locButton.addEventListener("click", getLoc);
