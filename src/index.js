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
  temperature.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  console.log(response);
}
function searchCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-name");
  let citySearch = document.querySelector("#search-box");
  if (citySearch.value.length > 0) {
    cityName.innerHTML = `${citySearch.value}`;
  }
  let apiKey = "5354b60afda2b7800186c06153932396";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=${apiKey}&&units=metric`;
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
