// // ----------weather API call------------------------------------------------

// // This is our API key. Add your own API key between the ""
//    var APIKey = "26839131696992a3553a44f643a4f407";

//    // Here we are building the URL we need to query the database
//    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Phoenix,Arizona&appid=26839131696992a3553a44f643a4f407";

//    // We then created an AJAX call
//    $.ajax({
//      url: queryURL,
//      method: "GET"
//    }).done(function(response) {
  
//     var temperature = response.main.temp;
//     var convertedTemp = ((temperature * (9/5)) - 459.67);
//     var tempDescription = response.weather[0].description;
//     var humidity = response.main.humidity;
//     var maxTemp = response.main.temp_max;
//     var convertedMaxTemp = ((maxTemp * (9/5)) - 459.67);
//     var convertedMinTemp = (minTemp * (9/5) - 459.67);
//     var minTemp = response.main.temp_min;
//     var sunriseTime = response.sys.sunrise;
//     var sunsetTime = response.sys.sunset;
    
//     console.log(temperature);
        

//     $("searchButton").click(function(){

//         $("#temp").append(convertedTemp);


    
//     });

//         $("weatherCondition").append(temperature);


//         console.log(response.weather[0].description);
//         console.log(response.main.humidity);
//         console.log(convertedTemp)
//         console.log(response.main.temp);
//         console.log(response.sys.sunrise);
//         console.log(response.sys.sunset);
//         console.log(response);
//         console.log(response.main.temp_max);
//         console.log(response.main.temp_min);

//        });


//-----------------------------------------------------------------------------end of weather API-----------------------------------------------------

$("#searchButton").on("click", function(event){

        event.preventDefault();
        var userInputData = $("#user-input").val();
        console.log(userInputData);
});


// JavaScript Document

//------------------------------------------------------------------------google map----



var infowindowContent;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37, lng: -98 },
        zoom: 4,
    });

    initMap();
    input = document.getElementById('chooseCrawlSpace');


    var autocomplete = new google.maps.places.Autocomplete( input, { placeIdOnly: true } );
		autocomplete.bindTo('bounds', map);
   
    var infowindow = new google.maps.InfoWindow();
    	infowindow.setContent(infowindowContent);
	
    var geocoder = new google.maps.Geocoder();
	
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            return;
        }
 
		geocoder.geocode({ 'placeId': place.place_id }, function(results, status) {

			if (status !== 'OK') {
				window.alert('Geocoder failed due to: ' + status);
				return;
            	}
		
			map.setZoom(14);
			map.setCenter(results[0].geometry.location);


			var pubs = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);


			obj='https://maps.googleapis.com/maps/api/place/textsearch/json?query=pub&location=37.7930,-122.4161&radius=500&key=AIzaSyCpzcx4xPG0GtyMrFs83Mxa0Vm0V4TCyKo';

			console.log(obj);

			function logResults(json){
				console.log(json);
			}

			$.ajax({
				method: "get",
				contentType : "application/json",
				url: obj,
				dataType: "jsonp",
				jsonpCallback: "logResults"
			});
			
			
		bars = new google.maps.InfoWindow();
		service = new google.maps.places.PlacesService(map);
		
		service.nearbySearch({
		  	location: results[0].geometry.location,
		  	radius: 500,
		  	name: 'pub'
		}, callback);
		
	 });
  });
}

function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            	createMarker(results[i]);           		            
        }
    }
}
	
function createMarker(place) {
	
   var marker = place.location;
   var image = 'images/beer.png'; 
   marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
		icon: image,
		animation: google.maps.Animation.DROP,  
        title: place.name        
    });	

    google.maps.event.addListener(marker, 'click', function() {
        pubs.setContent(place.name);
        pubs.open(map, this);
    });
}



