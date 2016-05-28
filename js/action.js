$(document).ready(function() {
  var tempK, tempC, tempF, location, icon, iconLink;

  // get users location
  $.getJSON("http://ip-api.com/json", success, error);

  function success(data) {
    var lat = data.lat;
    var lon = data.lon;
    // request information based on coordinates
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=65949ebb4e52fdf5a9c302b32759fbe2", successWeather, error);
  };

  function error(fail) {
    console.log(fail);
  };

  function successWeather(data) {

    // store JSON in variables
    tempK = data.main.temp;
    location = data.name;
    icon = data.weather[0].icon;
    iconLink = "http://openweathermap.org/img/w/" + icon + ".png";
    tempC = (tempK - 273.15).toFixed(1);
    tempF = (tempK * 9 / 5 - 457.87).toFixed(1);

    // fill HTML with data
    $('#data').html("<div id='location'>" + location + "</div>" + "<div id='temp'>" + tempC + "&deg;</div>" + "<div id='unit'>C</div>" + "<img src=" + iconLink + " id='icon'>");

    // change background depending on icon
    switch (icon) {
      case '01d':
      case '01n':
        $('head').append("<style>.whole-site::before { background-image: url('http://rbk-japod.org/weather/IMG_0611.JPG')}</style>");
        break;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        $('head').append("<style>.whole-site::before { background-image: url('http://rbk-japod.org/weather/sky-414199_1920.jpg')}</style>");
        break;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        $('head').append("<style>.whole-site::before { background-image: url('http://rbk-japod.org/weather/lights-1283073_1920.jpg')}</style>");
        break;
      case '11d':
      case '11n':
        $('head').append("<style>.whole-site::before { background-image: url('http://rbk-japod.org/weather/thunderstorm-549663_1280.jpg')}</style>");
        break;
      case '13d':
      case '13n':
        $('head').append("<style>.whole-site::before { background-image: url('http://rbk-japod.org/weather/backcountry-skiiing-1363750_1920.jpg')}</style>");
        break;
    };
  };

  // change units and values on clicking unit text
  $('.api-data').on("click", "#unit", switchTemp);

  function switchTemp() {
    if ($(this).text() == 'C') {
      $('#temp').html(tempF + "&deg;");
      $(this).html('F');
    } else {
      $('#temp').html(tempC + "&deg;");
      $(this).html('C');
    };
  };

});
