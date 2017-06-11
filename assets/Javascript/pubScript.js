// JavaScript Document

var infowindowContent,  service, pubid = [], pub_id, publicid;
var searchArea, photoUrl;

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

// var database = $("#openSideBar").attr("status");

// console.log(database);


function initMap() {
    var mapstyle = new google.maps.StyledMapType(
        [{
            "featureType": "road",
            "stylers": [{ "color": "#96e6ed" }]
        }, {
            "featureType": "water",
            "stylers": [{ "color": "#ffa300" }]
        }], { name: 'Beer Map' }
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


    var autocomplete = new google.maps.places.Autocomplete(input, { placeIdOnly: true });
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


       
            service = new google.maps.places.PlacesService(map);
          
            service.nearbySearch({
                location: results[0].geometry.location,
                radius: 500,
                name: 'pub'
            }, callback);
			console.log(pubid);
        });
    });
}


function addFavoriteClick(event) {
    closeNav();
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
    var cardDiv = $("<div id ='cards'></div>");
    var infoDiv = $("<div class='cardStyle'></div>");

    // add results info 
    var nameDiv = $("<div class='nameClass'>" + result.name + "</div>");
    var vicinityDiv = $("<div class='areaClass'>" + result.vicinity + "</div>");

    infoDiv.append(nameDiv);
    infoDiv.append(vicinityDiv);

    if (result.rating) {
        var ratingDiv = $("<div class='ratingClass'>" + result.rating + "</div>");
        infoDiv.append(ratingDiv);
    }

    if (result.photos) {
        photoUrl = result.photos[0].getUrl({ maxWidth: 150, maxHeight: 120 });
    } else {
        photoUrl = "assets/images/lilBeer.png";
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
}


function callback(results, status) {
    $("#cardObject").empty();
    grabWeather(searchArea);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
            var currentResult = results[i];
			placeid(results[i]);
            createMarker(results[i]);
            createCard(currentResult);
            $("#searchItem").val('');
        }
    }
	console.log(pubid);
}
function placeid (place) {
	pub_id = place.id;
	pubid.push(place.id);
	}

function createMarker(place) {
    var pubs = new google.maps.InfoWindow();
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

    google.maps.event.addListener(marker, 'mouseover', function() {
        	pubs.setContent(place.id);

    });
	
	google.maps.event.addListener(marker, 'click', function() {
      service.getDetails({
        placeId: place.place_id
      }, function (placeDetail) {
        console.log(placeDetail);
		 
      });
	});
}

// getDbSnapshot populates sidebar with db favorites info
function getDbSnapshot() {

    database.ref().on("value", function(snapshot) {

        snapshot.forEach(function(childSnapshot) {
            var sidePub = $("<div class='fav'></div>");
            var sideName = $("<div>" + childSnapshot.val().pubName + "</div>");
            var sideArea = $("<div>" + childSnapshot.val().pubArea + "</div>");
            var sideRating = $("<div>" + childSnapshot.val().pubRating + "</div>");

            sidePub.append(sideName);
            sidePub.append(sideArea);
            sidePub.append(sideRating);

            $("#mySidenav").append(sidePub);
        });
    }, function(errorObject) {
        console.log("We have a situation : " + errorObject.code);
    });



}



/* Set the width of the side navigation to 400px */
function openNav() {
    document.getElementById("mySidenav").style.width = "400px";
    document.getElementById("main").style.marginLeft = "400px";
    getDbSnapshot();
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    $("div").remove(".fav");
    database.ref().off();
}


$("#closeSideBar").on("click", closeNav);
$("#closeSideBar").addClass("closebtn glyphicon glyphicon-remove");


$("#openSideBar").on("click", openNav);
$("#openSideBar").addClass("glyphicon glyphicon-menu-hamburger myStyle");
$("#openSideBar").text(" Menu");


