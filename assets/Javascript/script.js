// Beer scripts.js


function goBtnAction() {

	var theGoBtn = $("#goBtn");
	theGoBtn.on("click", function() {
			
			var searchText = ($("#searchItem").val().trim());
                // console.log(searchText);

			if(searchText != "") {

				$("#message").html("TIM BYNUM");

                // makeGifs(searchText);
			}
			else {
				$("#message").html("NULL !!!!!!!");
				console.log(searchText);
			}
	});
}

goBtnAction();
// sizeBtnAction();