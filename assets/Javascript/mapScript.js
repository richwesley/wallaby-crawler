// JavaScript Document

var infowindowContent;


function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37, lng: -98 },
        zoom: 4,
    });

    input = document.getElementById('searchItem');


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
				console.log(results[i]);
        }
    }
}
	
function createMarker(place) {
   var id = place.id;
	console.log(id);
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
	
	document.getElementById('#photo');
}