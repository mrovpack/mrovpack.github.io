const serverIP = "nearvanilla.com";

$.getJSON('https://api.mcsrvstat.us/2/' + serverIP, function(response) {
	dataReady(response);
});

function dataReady(data){
	let Json = {};

	Json.online = data.online;
	Json.ip = data.ip;
	Json.port = data.port;
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
	$(status).append("Wersja gry: " + data.version).append("<br>");
	$(status).append('<span style="color: lime">' + data.ip + ":" + data.port + '</span>').append("<br>");

	$("#status").html("").append(status);

	if(data.players.online == 0){
		$("#list").html("Nikt nie jest online!")
	}

	for(item of data.players.list){
		$("#list").append('<span class="playerName">' + item + '</span>');
	}

	setStatusIcon(data.online);
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
