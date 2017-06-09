// JavaScript Document

var infowindowContent;
var searchArea;

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyC7DimJBet8oIGYtumdS0ABdtUgE5QgFuU",
    authDomain: "beercrawler-d3099.firebaseapp.com",
    databaseURL: "https://beercrawler-d3099.firebaseio.com",
    projectId: "beercrawler-d3099",
    storageBucket: "beercrawler-d3099.appspot.com",
    messagingSenderId: "763287984219"
  };
  firebase.initializeApp(config);
var database = firebase.database();


function initMap() {
    var  mapstyle = new google.maps.StyledMapType (	
	[
  {
    "featureType": "road",
    "stylers": [{"color": "#96e6ed"}]
  },
  {
    "featureType": "water",
    "stylers": [{"color": "#ffa300"}]    
  }
  ],
  {name: 'Beer Map'}
);
	
	
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 37, lng: -98 },
        zoom: 3,
		mapTypeControlOptions: {
            mapTypeIds: ['brewStyle']
		}
    }); // set the inital map.  See css for styling
	
	map.mapTypes.set('brewStyle', mapstyle);
        map.setMapTypeId('brewStyle');

    input = document.getElementById('searchItem');


    var autocomplete = new google.maps.places.Autocomplete( input, { placeIdOnly: true } );
		autocomplete.bindTo('bounds', map);
   
    var infowindow = new google.maps.InfoWindow();
    	infowindow.setContent(infowindowContent);
	
    var geocoder = new google.maps.Geocoder();
	
    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        var place = autocomplete.getPlace();
        searchArea = place.name;

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


			var pubs = new google.maps.InfoWindow();
			var service = new google.maps.places.PlacesService(map);


			obj='https://maps.googleapis.com/maps/api/place/textsearch/json?query=pub&location=37.7930,-122.4161&radius=500&key=AIzaSyCpzcx4xPG0GtyMrFs83Mxa0Vm0V4TCyKo';

			// console.log(obj);

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


function addFavoriteClick(event) {
    var childName = $(this).find("div.nameClass").text();
    var childArea = $(this).find("div.areaClass").text();
    var childRating = $(this).find("div.ratingClass").text();

    database.ref().push({
            pubName: childName,
            pubArea: childArea,
            pubRating: childRating
        });
}


function createCard(result) {
    var cardDiv = $("<div></div>");
    var infoDiv = $("<div class='cardStyle'></div>");   

    // add results info 
    var nameDiv = $("<div class='nameClass'>" + result.name + "</div>");
    var vicinityDiv = $("<div class='areaClass'>" + result.vicinity + "</div>");    

    infoDiv.append(nameDiv);
    infoDiv.append(vicinityDiv);

    if(result.rating){
    	var ratingDiv = $("<div class='ratingClass'>" + result.rating + "</div>");
    	infoDiv.append(ratingDiv);
    }    

    if (result.photos) {
        var photoUrl = result.photos[0].getUrl({ maxWidth: 150, maxHeight: 120 });
    } else {
    	var photoUrl = "assets/images/lilBeer.png";
    }

    var photosDiv = $("<div><img src=" + photoUrl + " style='max-width:150px;max-height:120px;'></div>");
    infoDiv.append(photosDiv);

    var actionInner = $("<div></div>");
    actionInner.addClass("aos-item__inner");
    actionInner.append(infoDiv);

    var actionFrame = $("<div></div>");
    actionFrame.addClass("aos-item");

    actionFrame.attr("data-aos", "zoom-in-down");
    actionFrame.append(actionInner);

    cardDiv.append(actionFrame);
    cardDiv.click(addFavoriteClick);
    $("#cardObject").append(cardDiv);
};


function callback(results, status) {
	$("#cardObject").empty();
	grabWeather(searchArea);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        	var currentResult = results[i];

            	createMarker(results[i]);
            	createCard(currentResult);
            	$("#searchItem").val('');
        }
    }
}
	
function createMarker(place) {
   var id = place.id;
   var marker = place.location;
  marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
		 icon: {
            size: new google.maps.Size(20, 20),
            scaledSize: new google.maps.Size(20, 20),
            url: "../wallaby-crawler/assets/images/lilBeer.png"
          }, 
		animation: google.maps.Animation.DROP,  
        title: place.name        
    });

    google.maps.event.addListener(marker, 'click', function() {
    	console.log(marker);

    	if(!pubs) {console.log(pubs)};
    	var pubs = new google.maps.InfoWindow();
        // pubs.setContent(place.name);
        pubs.setContent(this.title);
        pubs.open(map, this);
        console.log(this);
        if(!pubs) {console.log(pubs)};
        console.log(pubs);
    });
	
	document.getElementById('#photo');
}