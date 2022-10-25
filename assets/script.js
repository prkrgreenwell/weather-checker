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

function weatherSearch() {
  var searchInput = $("#city-search").val();

  var cityConvert = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=5&appid=bdb9d6d229602dc33220e9128891fa95`;

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

$("#search").on("click", function (event) {
  event.preventDefault();

  weatherSearch();
});
