// UrlImages = "https://mrovtest.github.io/img/"

$.getJSON('./index.json', function(data) {

	dataReady(data);
});

$("#search-input").on('input', function() {
		let input = $("#search-input").val();

		searchFor(input)
});

function searchFor(query){
	$(".scoreCount").each(function(index){

		query = query.toLowerCase();

		$(this).parent().css('display', 'flex')

		if(!$(this).html().toLowerCase().includes(query)){
			$(this).parent().css('display', 'none')
		}

		if(!query || query == ""){
			$(this).parent().css('display', 'flex')
		}

	})
}

function dataReady(json){

	for(item of json){
		let name = item.name;
		let Path = item.path;
		let link = item.link;

		let append = item.append;

		let items = item.items;

		for(entry of items){

			let icon = entry.toLowerCase().replace(/ /g, "-");

			let div = document.createElement("a");
	    $(div).css("background-image", "url("+ UrlImages + Path + icon + ".png");
	    $(div).addClass("objectiveButton");

			if(append){
				icon += append;
			}
			$(div).attr('href', link + icon)

			let count = document.createElement("div");
	    $(count).html(entry);
	    $(count).addClass("scoreCount");

			$(div).append(count);

	    $("#items").append(div);
		}

	}
}
