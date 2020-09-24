$.getJSON('https://api.mcsrvstat.us/2/' + IpServer, function(response) {
	dataReady(response);
});

function dataReady(data){
	let Json = {};

	Json.online = data.online;
	Json.ip = data.ip;
	Json.port = data.port;
	Json.hostname = data.hostname;
	Json.players = data.players;
	Json.version = data.version;

	if(Json.online){
		displayData(Json);
	}else{
		displayOffline();
	}

}

function displayData(data){

	let status = document.createElement("div");
	$(status).append("Graczy online: " + data.players.online).append("<br>");
	// $(status).append("Wersja gry: " + data.version).append("<br>");
	$(status).append("Dolacz!").append("<br>")
	$(status).append('<span style="color: lime">' + data.hostname + '</span>').append(" lub ").append('<span style="color: lime">' + data.ip + ":" + data.port + '</span>').append("<br>");

	$("#status").html("").append(status);

	// if(data.players.online == 0){
	// 	$("#items").html("Nikt nie jest online!")
	// }

	if(data.players.list){
		for(item of data.players.list){
			displayPlayer(item);
		}
	}

	setStatusIcon(data.online);
}

function displayPlayer(player){

	let HeadLink = UrlHeads + "" + player + ".png";

	let headDiv = document.createElement('div');
	$(headDiv).css("background-image", "url("+ HeadLink + "), url(" + HeadDefault + ")");
	$(headDiv).addClass("objectiveButton");
	$(headDiv).attr('onerror', "imgError()")

	let name = document.createElement("div");
	$(name).html(player);
	$(name).addClass("scoreCount");

	$(headDiv).append(name);

	$("#items").append(headDiv);
}

function setStatusIcon(status){

	if(status){
		document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/status/on.png";
	}else{
		document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/status/off.png";
	}
}

function displayOffline(){
	let status = document.createElement("div");
	$(status).append('<span style="color: red">' + "Serwer nieaktywny" + '</span>').append("<br>");
	$("#status").html("").append(status);
	$("#list").css('visibility', "hidden")
}
