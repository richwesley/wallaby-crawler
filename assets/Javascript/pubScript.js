// JavaScript Document

var infowindowContent;


function initMap() {
    var  mapstyle = new google.maps.StyledMapType (	
	[
  {
    "featureType": "road",
    "stylers": [{"color": "#96e6ed"}]
  },
  {
    "featureType": "water",
    "stylers": [{"color": "#febf00"}]    
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

function createCard(result) {
 var cardDiv = $("<div></div>"); 

    var infoDiv = $("<div class='cardStyle'></div>");


    // add results info 
    var nameDiv = $("<div>" + result.name + "</div>");
    var vicinityDiv = $("<div>" + result.vicinity + "</div>");
    var ratingDiv = $("<div>" + result.rating + "</div>");


    console.log(result);
console.log(result.photos[0].getUrl({maxWidth: 100, maxHeight: 100}));

    var photoUrl = result.photos[0].getUrl({maxWidth: 100, maxHeight: 100});



    var photosDiv = $("<div><img src=" + photoUrl + "></div>");



    infoDiv.append(nameDiv);
    infoDiv.append(vicinityDiv);
    infoDiv.append(ratingDiv);
    infoDiv.append(photosDiv);









    var actionInner = $("<div></div>");
                actionInner.addClass("aos-item__inner");
                actionInner.append(infoDiv);

    var actionFrame = $("<div></div>");
                actionFrame.addClass("aos-item");

    actionFrame.attr("data-aos", "zoom-in-down");
                actionFrame.append(actionInner);

                cardDiv.append(actionFrame);
    $("#cardObject").append(cardDiv);

};


function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        	var currentResult = results[i];


        		// console.log(results[0].photos[0].getUrl({maxWidth: 400, maxHeight: 400}));
        		// console.log(results[i]);

            	createMarker(results[i]);
            	createCard(currentResult);
        }
    }
}
	
function createMarker(place) {
   var id = place.id;
	// console.log(id);
   var marker = place.location;
   // var image = '../wallaby-crawler/assets/images/lilBeer.png'; 
  //  marker = new google.maps.Marker({
  //       map: map,
  //       position: place.geometry.location,
		// icon: image,
		// animation: google.maps.Animation.DROP,  
  //       title: place.name        
  //   });
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

