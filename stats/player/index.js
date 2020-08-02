var playerJSON = {};
let playerName;
var totalDist = 0;

let params = document.location.search || window.location.hash;

if (params) {

    if (params.startsWith("?") || params.startsWith("#")) {
        params = params.substring(1);

				playerName = params;
				$("#name").html(params)
      }
} else{
  $("#special").html("Player not specified!")
}

$.getJSON(UrlScoreboard, function(status) {

	dataReady(status);
});

function dataReady(json){

	playerJSON = json.players[playerName];
  console.log(json)
  totalDist = totalDistance();

  $.getJSON('https://mrovtest.github.io/sd/statbuttons.json', function(status) {

    createIcons(status);
    getSpecialStats();

  });
}

function totalDistance(){
  let distance = 0;

  for(item of Object.keys(playerJSON)){

    if(item.includes("distance")){
      distance = +distance + playerJSON[item];
    }

  }

  return distance;
}

function createIcons(array){

  for(item of array){

    let icon = item.icon;
    let name = item.name;
    let objective = item.objective;

    let div = document.createElement("div");
    $(div).css("background-image", "url("+ UrlImages + "" + icon);
    $(div).addClass("objectiveButton");

    let count = document.createElement("div");
    $(count).html(playerJSON[objective]);
    $(count).addClass("scoreCount");


    $(div).append(count);

    $("#items").append(div);
  }
}

function createDiv(text, append){

  let div = '<span class="specialStat">' + text + append + '</span>'

  return div;
}

function getSpecialStats(){

  let timePlayed = createDiv(Math.round((playerJSON["timePlayed"] / 20 / 60 / 60) * 10 ) / 10, "h");
  let distance = createDiv(Math.round((totalDist/ 100 / 1000) * 10 ) / 10, "km");
  let deaths = createDiv(playerJSON["death"], "");

  let text = "W grze: " + timePlayed + " / " + "Przebyty dystans: " + distance + " / " + "Śmierci: " + deaths;
  $("#special").html(text);
}
