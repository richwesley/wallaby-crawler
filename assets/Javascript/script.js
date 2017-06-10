// Beer scripts.js

// // ----------weather API call------------------------------------------------
// // This is our API key. Add your own API key between the ""
var APIKey = "26839131696992a3553a44f643a4f407";

function grabWeather(area) {
    $("#weather").empty();
    $("#crawlLocation").empty();

    var weatherLocation;

    var queryURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?q=" + area + "&appid=26839131696992a3553a44f643a4f407";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        var beerLocation = $("<span>Location: " + area + "</span>");
        $("#crawlLocation").append(beerLocation);

        var tempDescription = $("<span>Weather: " + response.weather[0].description + "</span>");
        $("#crawlLocation").append(tempDescription);

        var temperature = ((response.main.temp * (9 / 5)) - 459.67).toFixed(1);
        var temperatureDiv = $("<span>Temperature: " + temperature + '&#8457' + "</span>");
        $("#weather").append(temperatureDiv);

        var maxTemp = ((response.main.temp_max * (9 / 5)) - 459.67).toFixed(1);
        var minTemp = (response.main.temp_min * (9 / 5) - 459.67).toFixed(1);
        var minMaxDiv = $("<span>Min/Max: " + minTemp + '&#8457' + "/" + maxTemp + '&#8457' + "</span>");
        $("#weather").append(minMaxDiv);

        var humidity = response.main.humidity;
        var humidityDiv = $("<span>Humidity: " + humidity + "%</span>");
        $("#weather").append(humidityDiv);

        // var sunriseTime = moment.unix(response.sys.sunrise).format('h:mm a');
        // var sunRiseDiv = $("<div>Sunrise: " + sunriseTime + "</div>");
        // $("#weather").append(sunRiseDiv);

        // var sunSetTime = moment.unix(response.sys.sunset).format('h:mm a');
        // var sunSetDiv = $("<div>Sunset: " + sunSetTime + "</div>");
        // $("#weather").append(sunSetDiv);
    });

};


