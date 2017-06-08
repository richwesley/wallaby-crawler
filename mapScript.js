// JavaScript Document

// Declaring global variables
var breweries = 'brewery';
var	map, infowindow, infowindowContent, placePic, $map;

var photos = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37, lng: -98 },
        zoom: 4,
    });

    input = document.getElementById('chooseCrawlSpace');


    var autocomplete = new google.maps.places.Autocomplete( input, { placeIdOnly: true } );
    autocomplete.bindTo('bounds', map);

    //map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(input);

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
            map.setZoom(15);
            map.setCenter(results[0].geometry.location);
			
			

			bars = new google.maps.InfoWindow();
				var service = new google.maps.places.PlacesService(map);
				service.nearbySearch({
				  location: results[0].geometry.location,
				  radius: 500,
				  type: ['bars']
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
    
//	var image = {
//	url: 'images/beer.png',
//	size: new google.maps.Size(20,32),
//	origin: new google.mapsPoint(0,0),
//	anchor: new google.maps.Point(0,32)
//	};
//
// 	var shape = {
//          coords: [1, 1, 1, 20, 18, 20, 18, 1],
//          type: 'poly'
//	};
	
   var image = 'images/beer.png'; 
   marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
		icon: image,
		animation: google.maps.Animation.DROP,  
        title: place.name
         
    });
 }	
	

    google.maps.event.addListener(marker, 'click', function() {
        bars.setContent(place.name);
        bars.open(map, this);
    });

function addPhotos(url){
	document.getElementById('pano');
  
}





