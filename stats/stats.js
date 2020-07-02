var scoreboardJSON = {};
var players = [];
var distancesJSON = {};
let buttons = {};

$.getJSON('https://mrovtest.github.io/sd/statbuttons.json', function(status) {

	createObjectiveButtons(status);

});

$.getJSON('https://mrovtest.github.io/sd/scoreboard.json', function(status) {

	dataReady(status);

	lookFor('ore_diamond');
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

function createObjectiveButtons(array){

	for(item of array){
		let name = item.name;
		let objective = item.objective;
		let icon = item.icon;

		let background = "url(https://mrovtest.github.io/iso/" + icon;
		let onclick = "lookFor('" + objective + "')";

		var button = document.createElement('button');
		button.style["background-image"] = background;
		button.setAttribute('onclick', onclick);
		button.title = name;
		button.className = "objectiveButton";
		$("#select").append(button);

		buttons[objective] = name;
	}

}

function lookFor(objective){
	let arr = getObjectFromArray(scoreboardJSON, "name", objective)

	$("#type").html(buttons[objective])
	$("#tabelka").html("").append(createScoresTable(arr, objective));
}

function createScoresTable(array, objective) {
		var table = document.createElement("table");
		var tbody = document.createElement('tbody');

		table.setAttribute('align', 'center')

		 let entries = Object.entries(array.scores);
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

				if(objective == "timePlayed"){
					var tdT = document.createElement('td');
					var time = Math.round((score / 20 / 60 / 60) * 10 ) / 10;
					tdT.appendChild(document.createTextNode(time + 'h'));
					tdT.style.color = '#ffff55';
					tr.appendChild(tdT);
				}

				if(objective == "distanceTotal"){
					var tdD = document.createElement('td');
					var distance = Math.round((score/ 100 / 1000) * 10 ) / 10;
					tdD.appendChild(document.createTextNode(distance + 'km'));
					tdD.style.color = '#ffff55';
					tr.appendChild(tdD);
				}

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
		console.log(playerData)
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
