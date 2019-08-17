var outputJSON = {};
var scoreboardJSON;
var objectiveList;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {
	console.log(status);
	scoreboardJSON = status;

  var objectives = status.ObjectiveList;
	var players = status.PlayerList;

	objectives.splice(objectives.indexOf('helath'), 1);
	objectives.splice(objectives.indexOf('death'), 1);

	for(var i=0; i<players.length; i++){
		var a = players[i];

		outputJSON[a] = {};
		var d = outputJSON[a];

		for(var n=0; n<objectives.length; n++){
			var objectiveName = objectives[n];

			if(typeof status[objectiveName][a] != 'undefined'){

				d[objectiveName] = status[objectiveName][a];
			}

		}

	}

	outputJSON['objectiveList'] = objectives;
//	document.getElementById('tabelka').appendChild(makeUL(outputJSON))
});

console.warn(outputJSON)


function makeUL(array) {
	console.log(array);
		var table = document.createElement("table");
		var tbody = document.createElement('tbody');

		let trow = document.createElement('tr');
		// trow.appendChild(document.createTextNode('Gracz'));

		for(var i=0; i<array.objectiveList.length; i++){
			let th = document.createElement('th');
			th.innerHTML = array.objectiveList[i];
			trow.appendChild(th);
		}

		tbody.appendChild(trow);

		table.style.width = '100%';
		table.setAttribute('border', '1');

		var players = Object.keys(array)

		for (var i = 0; i < players.length; i++) {
			var a = players[i]

			var ks = array[a];
			console.warn(ks)

				var tr = document.createElement('tr');

				var scores = Object.values(ks)

				for(var n=0; n<scores.length; n++){
					var td = document.createElement('td');

					console.log(typeof scores[n])

					if(typeof scores[n] == 'undefined'){
						td.appendChild(document.createTextNode('0'))
					} else{
						td.appendChild(document.createTextNode(scores[n]))
					}

					tr.appendChild(td);
				}

				tbody.appendChild(tr);
		}

		// Finally, return the constructed list:
		table.appendChild(tbody);

		console.warn(table);
		return table;
}
