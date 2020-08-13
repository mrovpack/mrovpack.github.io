var scoreboardJSON = {};
var players = [];
var distancesJSON = {};
let buttons = {};

$.getJSON(UrlScoreboard, function(status) {

	dataReady(status);

	$.getJSON('https://mrovtest.github.io/sd/statbuttons.json', function(status) {

		createIcons(status);

	});
});

function dataReady(json){
	scoreboardJSON = json.objectives;

	for(item of json.objectives){

		if(item.name.includes("distance")){
			distancesJSON[item.name] = item.scores;
		}
	}

	for(item of Object.keys(json.players)){
		players.push(item);
	}

	getTotalDistances();
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
    $(count).html(createTable(objective));
    $(count).addClass("scoreCount");


    $(div).append(count);

    $("#items").append(div);
  }
}

function createTable(name){
	let array = getObjectFromArray(scoreboardJSON, "name", name).scores

	var table = document.createElement("table");
	var tbody = document.createElement('tbody');

	let entries = Object.entries(array);
	let scores = entries.sort((a, b) => b[1] - a[1]);

	for (item of scores) {

		let player = item[0];
		let score = item[1];

			var tr = document.createElement('tr');
			var tdP = document.createElement('td');
			var tdS = document.createElement('td');

			tdS.style.color = '#ff5555';

			tdP.appendChild(document.createTextNode(player))
			tdS.appendChild(document.createTextNode(score))

			tr.appendChild(tdP)
			tr.appendChild(tdS)

			tbody.appendChild(tr);
	}

	table.appendChild(tbody);
	return table;
}

function getTotalDistances(){
  distanceObjectives = ['distanceSwim', 'distanceFly', 'distanceWalk', 'distanceCrouch', 'distanceSprint']

  for(var i=0; i<players.length; i++){
    let player = players[i];
    let playerData = {};

    for(item of distanceObjectives){
      let objName = item;

			playerData['distanceTotal'] = 0;
      playerData[objName] = distancesJSON[objName][player];
			if(distancesJSON[objName][player] == undefined){distancesJSON[objName][player] = 0;}
      playerData['distanceTotal'] = +playerData['distanceTotal'] + +distancesJSON[objName][player];
    }

		distancesJSON['distanceTotal'][player] = playerData['distanceTotal'];
  }

}

function getObjectFromArray(array, key, value){
	let output = {};

	for(item of array){
		if(item[key] == value){
			output = item;
		}
	}

	return output;
}
