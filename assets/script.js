function weatherSearch() {
  var searchInput = $("#city-search").val(); //define search box

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
          console.log(data);
        });
    });
}

$("#search").on("click", function (event) {
  event.preventDefault();

  weatherSearch();
});
