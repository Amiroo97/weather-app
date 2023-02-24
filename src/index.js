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
  temperature.innerHTML = Math.round(response.data.main.temp);
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
/*
function changeToCelsius(event) {
  //event.preventDefault();
  let farenheitTemp = document.querySelector("#current-temp");
  farenheitTemp.innerHTML = "8º";
}
function changeToFarenheit(event) {
  //event.preventDefault();
  let celsiusTemp = document.querySelector("#current-temp");
  celsiusTemp.innerHTML = "46º";
}
let celsiusButton = document.querySelector("#btnradio1");
celsiusButton.addEventListener("click", changeToCelsius);
let farenheitButton = document.querySelector("#btnradio2");
farenheitButton.addEventListener("click", changeToFarenheit);
*/

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
