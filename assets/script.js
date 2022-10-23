var currentWeather = document.getElementById("current");
var searchButton = document.getElementById("search");

function getApi() {
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=40.2969&lon=-111.6946&appid=bdb9d6d229602dc33220e9128891fa95";

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (var i = 0; i < 5; i++) {
        console.log(data.list[i].main.temp);
      }
    });
}

searchButton.addEventListener("click", getApi);
