// Beer scripts.js

var map;
var map2;
var infowindow;

var myLimit = 10;
// var myRating = "y";
 // google maps API key =   AIzaSyAHB_29w-sW3VDI_i41S9D7EbeXrKbpT4Q

function makeGifs(buttonText) {
        var imgDiv;

        var myQueryURL = "http://api.giphy.com/v1/gifs/search?q=" + buttonText + "&limit=" + myLimit + "&api_key=dc6zaTOxFJmzC";
        // console.log(buttonText);
        $.ajax({
            url: myQueryURL,
            method: "GET"
        }).done(function(response) {
            imgDiv = $("<div></div>");
            $("#myObject").append(imgDiv);            

            for (count = 0; count < myLimit; count++) {
                var imgFrame = $("<figure></figure>");
                var myImageStillURL = response.data[count].images.original_still.url;
                var myImageAniURL = response.data[count].images.original.url;
                var myImageRating = response.data[count].rating;
                var myImage = $("<img>");

                // console.log(response.data[count].id);
                // console.log(response.data[count].rating);

                myImage.attr("src", myImageStillURL);
                myImage.attr("still", myImageStillURL);
                myImage.attr("moving", myImageAniURL);
                myImage.attr("status", "stop");
                myImage.attr("picSize", "normal");

                myImage.addClass("imageStyle");

                myImage.on("click", function() {
                    var typeTest = this.src;
                    if ($(this).attr("status") === "stop") {
                        $(this).attr("src", $(this).attr("moving"));
                        $(this).attr("status", "go");
                    } else {
                        $(this).attr("src", $(this).attr("still"));
                        $(this).attr("status", "stop");
                    };
                });

                imgFrame.addClass("picFrame");
                imgFrame.append(myImage);
                imgFrame.append("<figcaption>" + "Rating: " + myImageRating + "</figcaption>");

                
                var actionInnerFrame = $("<div></div>");
                actionInnerFrame.addClass("aos-item__inner");
                actionInnerFrame.append(imgFrame);

                
                var actionFrame = $("<div></div>");
                actionFrame.addClass("aos-item");

                
                actionFrame.attr("data-aos", "slide-right");
                actionFrame.append(actionInnerFrame);
                imgDiv.append(actionFrame);
            };
        });
        $("#myObject").append(imgDiv);
    };

// function sizeBtnAction() {
//     var theSizeBtn = $("#resizeBtn");
//     theSizeBtn.on("click", function() {

//         if ($("img").attr("picSize") == "normal") {
//                         $("img").removeClass("imageStyle");
//                         $("figure").removeClass("picFrame");
//                         $("theObject").removeClass("picFrame");

//                         $("img").addClass("smImageStyle");
//                         $("figure").addClass("smPicFrame");
//                         $("theObject").addClass("smFrame");

//                         $("img").attr("picSize", "small");


//                     } else {
//                         $("img").removeClass("smImageStyle");
//                         $("figure").removeClass("smPicFrame");
//                         $("theObject").removeClass("smPicFrame");

//                         $("img").addClass("imageStyle");
//                         $("figure").addClass("picFrame");
//                         $("theObject").addClass("smPicFrame");

//                         $("img").attr("picSize", "normal");
//                     };
//     });
// }

function goBtnAction() {

	var theGoBtn = $("#goBtn");
	theGoBtn.on("click", function() {
			
			var searchText = ($("#searchItem").val().trim());
                // console.log(searchText);

			if(searchText != "") {

				$("#message").html("TIM BYNUM");

                makeGifs(searchText);
			}
			else {
				$("#message").html("NULL !!!!!!!");
				console.log(searchText);
			}
	});
}

goBtnAction();
// sizeBtnAction();