const API_KEY = "?key=2ed0a5cd6d8a419489101829201710";
const BASE_URL = `http://api.weatherapi.com/v1`;

const searchBar = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-btn");
const onLoadCities = [
  79936,
  90011,
  60629,
  77084,
  11226,
  08701,
  89110,
  85364,
  33101,
  80014,
  98101,
  02101,
  96801,
  20001,
];

const weatherCards = {
  partlyCloudy:
    "https://cdn.pixabay.com/photo/2012/04/18/13/21/clouds-37009__340.png",
};

const onLoad = () => {
  let search = onLoadCities[Math.floor(Math.random() * onLoadCities.length)];
  getCurrentWeather(search);
  getForecast(search);
  getTimeZone(search);
  getAstronamy(search);
};
const intitialSearch = () => {
  // e.preventDefault();
  let search = searchBar.value;
  getCurrentWeather(search);
  getForecast(search);
  getTimeZone(search);
  getAstronamy(search);
};

const getCurrentWeather = async (search) => {
  const CURRENT_WEATHER = `http://api.weatherapi.com/v1/current.json${API_KEY}&q=${search}`;
  try {
    let response = await axios.get(CURRENT_WEATHER);
    displayCurrentWeather(response.data);
  } catch (error) {
    console.log("error");
  }
};

const displayCurrentWeather = (data) => {
  let display = document.querySelector(".curr-content");

  removeElements(document.querySelectorAll(".curr-display"));

  let location = data.location;
  let curr = data.current;
  let currArr = [
    `${location.name}, ${location.region}`,
    `${curr.condition.text}`,
    `Feels like: ${curr.feelslike_f}° F`,
    `Humidity: ${curr.humidity}%`,
    `Temp: ${curr.temp_f}° F`,
    `Visibility: ${curr.vis_miles} Miles`,
    `Gusts: ${curr.gust_mph} MPH`,
    `Wind Direction: ${curr.wind_dir}`,
  ];

  display.style.backgroundImage = `url(${backgroundImage(
    curr.condition.text.toLowerCase()
  )})`;

  currArr.forEach((element) => {
    let currentWeatherDiv = document.createElement("div");
    currentWeatherDiv.className = "curr-display";
    currentWeatherDiv.innerText = element;
    display.appendChild(currentWeatherDiv);
  });
};

const getForecast = async (search) => {
  const FORECAST = `${BASE_URL}/forecast.json${API_KEY}&q=${search}&days=3`;
  try {
    let response = await axios.get(FORECAST);
    displayForecast(response.data);
  } catch (err) {
    console.log(error);
  }
};

const displayForecast = (data) => {
  let display = document.querySelector(".forecast");
  removeElements(document.querySelectorAll(".nextDay"));

  let day = data.forecast.forecastday;
  day.forEach((day) => {
    let date = `${day.date}`;
    let condition = `${day.day.condition.text}`;
    let temp = `Average Temp: ${day.day.avgtemp_f}° F`;
    let humid = `Humidity: ${day.day.avghumidity}%`;
    let chanceRain = `Chance of rain: ${day.day.daily_chance_of_rain}%`;
    let chanceSnow = `Chance of snow: ${day.day.daily_chance_of_snow}%`;
    let precip = `Precipitation: ${day.day.totalprecip_in} in`;
    let high = `High: ${day.day.maxtemp_f}° F`;
    let low = `Low: ${day.day.mintemp_f}° F`;

    let dateDiv = document.createElement("div");
    dateDiv.innerText = date;
    let conditionDiv = document.createElement("div");
    conditionDiv.innerText = condition;
    let tempDiv = document.createElement("div");
    tempDiv.innerText = temp;
    let humidDiv = document.createElement("div");
    humidDiv.innerText = humid;
    let chanceRainDiv = document.createElement("div");
    chanceRainDiv.innerText = chanceRain;
    let chanceSnowDiv = document.createElement("div");
    chanceSnowDiv.innerText = chanceSnow;
    let precipDiv = document.createElement("div");
    precipDiv.innerText = precip;
    let highDiv = document.createElement("div");
    highDiv.innerText = high;
    let lowDiv = document.createElement("div");
    lowDiv.innerText = low;

    let nextDayDiv = document.createElement("div");
    nextDayDiv.className = "nextDay";
    nextDayDiv.style.backgroundImage = `url(${backgroundImage(
      day.day.condition.text.toLowerCase()
    )})`;

    highDiv.appendChild(lowDiv);
    precipDiv.appendChild(highDiv);
    chanceSnowDiv.appendChild(precipDiv);
    chanceRainDiv.appendChild(chanceSnowDiv);
    humidDiv.appendChild(chanceRainDiv);
    tempDiv.appendChild(humidDiv);
    conditionDiv.appendChild(tempDiv);
    dateDiv.appendChild(conditionDiv);
    nextDayDiv.appendChild(dateDiv);

    display.appendChild(nextDayDiv);
  });
};

const getTimeZone = async (search) => {
  const TIMEZONE = `${BASE_URL}/timezone.json${API_KEY}&q=${search}`;
  try {
    let response = await axios.get(TIMEZONE);
    displayTimeZone(response.data.location);
  } catch (error) {
    console.log(error);
  }
};

const displayTimeZone = (data) => {
  let display = document.querySelector(".location");
  removeElements(document.querySelectorAll(".localTime"));
  let location = document.createElement("div");
  location.className = "localTime";
  let date = document.createElement("div");
  date.className = "localTime";
  location.innerText = `${data.name}, ${data.region}`;
  date.innerText = `${data.localtime}`;
  location.appendChild(date);
  display.appendChild(location);
};

const getAstronamy = async (search) => {
  const ATSTRONAMY = `${BASE_URL}/astronomy.json${API_KEY}&q=${search}`;
  try {
    let response = await axios.get(ATSTRONAMY);
    displayAstronamy(response.data.astronomy.astro);
  } catch (error) {
    console.log(error);
  }
};

const displayAstronamy = (data) => {
  let display = document.querySelector(".astronamy");
  removeElements(document.querySelectorAll(".astro"));

  let astroDiv = document.createElement("div");
  astroDiv.className = "astro";
  let sunrise = `Sunrise: ${data.sunrise}`;
  let sunset = `Sunset: ${data.sunset}`;
  let moonRise = `Moon Rise: ${data.moonrise}`;
  let moonSet = `Moon Set: ${data.moonset}`;
  let moonPhase = `MoonPhase: ${data.moon_phase}`;
  let illumination = `Moon Illumination: ${data.moon_illumination}%`;

  let sunriseDiv = document.createElement("div");
  sunriseDiv.innerText = sunrise;
  let sunsetDiv = document.createElement("div");
  sunsetDiv.innerText = sunset;
  let moonRiseDiv = document.createElement("div");
  moonRiseDiv.innerText = moonRise;
  let moonSetDiv = document.createElement("div");
  moonSetDiv.innerText = moonSet;
  let moonPhaseDiv = document.createElement("div");
  moonPhaseDiv.innerText = moonPhase;
  let illuminationDiv = document.createElement("div");
  illuminationDiv.innerText = illumination;

  moonPhaseDiv.appendChild(illuminationDiv);
  moonSetDiv.appendChild(moonPhaseDiv);
  moonRiseDiv.appendChild(moonSetDiv);
  sunsetDiv.appendChild(moonRiseDiv);
  sunriseDiv.appendChild(sunsetDiv);
  astroDiv.appendChild(sunriseDiv);
  display.appendChild(astroDiv);
};

const backgroundImage = (condition) => {
  switch (true) {
    case condition.split(" ").includes("rain"):
      return "https://cdn.pixabay.com/photo/2012/04/18/13/22/cloud-37011__340.png";
      break;
    case condition.split(" ").includes("snow"):
      return "https://cdn.pixabay.com/photo/2012/04/18/13/23/cloudy-37012__340.png";
      break;
    case condition.split(" ").includes("storm"):
      return "https://cdn.pixabay.com/photo/2017/08/21/21/26/cloud-cover-with-the-storm-2667024__340.png";
      break;
    case condition.split(" ").includes("sunny"):
      return "https://cdn.pixabay.com/photo/2013/07/13/10/23/sun-157126__340.png";
      break;
    case condition.split(" ").includes("cloudy"):
      return "https://cdn.pixabay.com/photo/2017/01/17/16/46/cloud-1987416__340.png";
      break;
    case condition.split(" ").includes("clear"):
      return "https://cdn.pixabay.com/photo/2013/07/13/12/12/sun-159392__340.png";
      break;
    case condition.split(" ").includes("mist"):
      return "https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157120__340.png";
      break;
    case condition.split(" ").includes("overcast"):
      return "https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157120__340.png";
      break;
    case condition.split(" ").includes("fog"):
      return "https://cdn.pixabay.com/photo/2013/07/13/10/23/weather-157120__340.png";
      break;
    default:
      return "http://wallpapers-best.com/uploads/posts/2015-10/13_blue_sky.jpg";
      break;
  }
};

const removeElements = (elms) => elms.forEach((el) => el.remove());

searchBar.addEventListener("change", intitialSearch);
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
});

window.onload = onLoad;
