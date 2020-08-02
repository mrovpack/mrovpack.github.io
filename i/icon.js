//Get server status
$.getJSON('https://api.mcsrvstat.us/2/' + serverIP, function(status) {
	dataReady(status);
});

function dataReady(data){
	// console.log(data);

  var img = document.createElement("img");
  img.style["height"] = "100%";
  img.style["width"] = "auto";

	var tooltip = document.createElement("span");
	tooltip.className = "tooltiptext";

	var text = "Players online: " + data.players.online + "<br/>" + "Game version: " + data.version + "<br/>" + '<span style="color: lime">' + data.hostname + '</span>';
	tooltip.innerHTML = text;

	var online = data.online;

	if(online){
		img.src = "https://mrovpack.github.io/assets/status/on.png";
  }else{
    img.src = "https://mrovpack.github.io/assets/status/off.png";
  }

	$("#status-icon").append(tooltip);
  $("#status-icon").append(img);
}
