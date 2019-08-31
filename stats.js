var outputJSON = {};
var scoreboardJSON;
var objectiveList;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {

	dataReady(status);
	lookFor('Diamenty');
});

function dataReady(json){
	scoreboardJSON = json;
	totalDistances();
}

function lookFor(objective){
	let arr = scoreboardJSON[objective];

	document.getElementById('type').innerHTML = objective;

	document.getElementById('tabelka').innerHTML = ''
	document.getElementById('tabelka').appendChild(makeUL(arr, objective));
}

function makeUL(array, objective) {
		var table = document.createElement("table");
		var tbody = document.createElement('tbody');

		table.setAttribute('align', 'center')

		function getKeyByValue(object, value) {
		return Object.keys(object).find(key => object[key] === value);
		}

		 var players = Object.values(array)
		 players.sort(function(a, b){return b - a});

		for (var i = 0; i < players.length; i++) {
			var a = players[i]

			let player = getKeyByValue(array, a);
			let score = a;

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

		// Finally, return the constructed list:
		table.appendChild(tbody);
		return table;
}

function totalDistances(){
	players = Object.keys(scoreboardJSON['distanceWalk']);
  distanceObjectives = ['distanceSwim', 'distanceFly', 'distanceWalk', 'distanceCrouch', 'distanceSprint']

  for(var i=0; i<players.length; i++){
    let a = players[i];

    let b = {};
    let c = b['distanceTotal'] = '';

    for(var o=0; o<distanceObjectives.length; o++){
      let objName = distanceObjectives[o];

      b[objName] = scoreboardJSON[objName][a];
      b['distanceTotal'] = +b['distanceTotal'] + +scoreboardJSON[objName][a];
    }

		outputJSON[a] = b;
		scoreboardJSON['distanceTotal'][a] = b['distanceTotal'];

  }

	return outputJSON;
}
