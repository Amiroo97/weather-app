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
  let cityName = document.querySelector("#city-name");
  let temperature = document.querySelector("#current-temp");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemp = Math.round(response.data.temperature.current);

  cityName.innerHTML = response.data.city;
  temperature.innerHTML = `${celsiusTemp}º`;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function searchCity(city) {
  let apiKey = "bdt58a0b3f1ee4817602fa2b7do31ae6";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-box");
  if (citySearch.value.length > 0) {
    searchCity(citySearch.value);
  }
}

function showFarenheitTemp(event) {
  let tempElement = document.querySelector("#current-temp");
  let farenheitTemp = Math.round((celsiusTemp * 5) / 9 + 32);
  tempElement.innerHTML = `${farenheitTemp}º`;
}

function showCelsiusTemp(event) {
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = `${celsiusTemp}º`;
}

let celsiusTemp = null;

let submit = document.querySelector("#search-form");
submit.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#btnradio2");
farenheitLink.addEventListener("click", showFarenheitTemp);

let celsiusLink = document.querySelector("#btnradio1");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Amsterdam");
