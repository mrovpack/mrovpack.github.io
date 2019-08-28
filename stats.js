var outputJSON = {};
var scoreboardJSON;
var objectiveList;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {
	console.log(status);

	dataReady(status);
	lookFor('Diamenty');
});

function dataReady(json){
	scoreboardJSON = json;
}

function lookFor(objective){
	let arr = scoreboardJSON[objective];

	document.getElementById('type').innerHTML = objective;

	document.getElementById('tabelka').innerHTML = ''
	document.getElementById('tabelka').appendChild(makeUL(arr, objective));
}

function makeUL(array, objective) {
	console.log(array);
		var table = document.createElement("table");
		var tbody = document.createElement('tbody');

		// let trow = document.createElement('tr');
		//
		// let thP = document.createElement('th');
		// thP.innerHTML = 'Player'
		// trow.appendChild(thP);
		//
		// let thS = document.createElement('th');
		// thS.innerHTML = "Score"
		// trow.appendChild(thS);
		//
		// tbody.appendChild(trow);

	//	table.style.width = '100%';
		table.setAttribute('align', 'center')
		// table.setAttribute('border', '1');

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
					score = readDistances(player)
					console.log(score)
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

		console.warn(table);
		return table;
}

function readDistances(player){
	var dist = getDistancesJSON();

	console.log(dist)
	return dist;
}
readDistances('Gaworek');
