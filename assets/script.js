/** @format */

console.log(localStorage);

function getDateFromUnix(unix) {
  var date = new Date(unix * 1000);
  return date.toLocaleDateString();
}

var dates = [
  $("#date-1"),
  $("#date-2"),
  $("#date-3"),
  $("#date-4"),
  $("#date-5"),
];
var winds = [
  $("#wind-1"),
  $("#wind-2"),
  $("#wind-3"),
  $("#wind-4"),
  $("#wind-5"),
];
var temps = [
  $("#temp-1"),
  $("#temp-2"),
  $("#temp-3"),
  $("#temp-4"),
  $("#temp-5"),
];
var humidities = [
  $("#humidity-1"),
  $("#humidity-2"),
  $("#humidity-3"),
  $("#humidity-4"),
  $("#humidity-5"),
];

var cities = [];
var searchCity = $("#city-search").val();
var saveSearch = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
};

function loadCities() {
  var citiesToLoad = localStorage.getItem("cities");

  if (!citiesToLoad) {
    return false;
  } else {
    citiesToLoad = JSON.parse(citiesToLoad);

    for (var i = 0; i < citiesToLoad.length; i++) {
      createButton(citiesToLoad[i]);
    }
  }
}

loadCities();

function weatherSearch(city) {
  var cityConvert =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&limit=5&appid=bdb9d6d229602dc33220e9128891fa95";

  fetch(cityConvert)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var lon = data[0].lon;
      var lat = data[0].lat;

      var getApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=bdb9d6d229602dc33220e9128891fa95&units=imperial`;

      fetch(getApi)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          $("#city").text(
            data.city.name + " (" + getDateFromUnix(data.list[0].dt) + ")"
          );
          $("#current-wind").text(
            "Wind Speed: " + data.list[0].wind.speed + " mph"
          );
          $("#current-humidity").text(
            "Humidity: " + data.list[0].main.humidity + "%"
          );
          $(".current-temp").text(data.list[0].main.temp + "\u00B0 F");
          for (var i = 0; i < 40; i += 8) {
            var j = i / 8;
            dates[j].text(getDateFromUnix(data.list[i].dt));
            temps[j].text(
              "Temperature: " + data.list[i].main.temp + "\u00B0 F"
            );
            winds[j].text("Wind Speed: " + data.list[i].wind.speed + " mph");
            humidities[j].text("Humidity: " + data.list[i].main.humidity + "%");

            console.log(data.city.name);
            console.log(getDateFromUnix(data.list[i].dt));
            console.log(data.list[i].main.temp);
            console.log(data.list[i].wind.speed);
            console.log(data.list[i].main.humidity);
          }
        });
    });
}

function createButton(city) {
  var button = document.createElement("button");

  button.setAttribute("class", "past-city");
  button.setAttribute("data-city", city);
  button.textContent = city;
  $("#past-search").append(button);
}

$("#search").on("click", function (event) {
  event.preventDefault();
  var searchInput = $("#city-search").val();

  weatherSearch(searchInput);
  createButton(searchInput);

  cities.push(searchInput);
  saveSearch();
});

var pastSearch = document.querySelector("#past-search");

var pastSearchHandler = function (event) {
  console.log("click");
  var city = event.target.getAttribute("data-city");

  if (city) {
    weatherSearch(city);
  }
};
pastSearch.addEventListener("click", pastSearchHandler);
