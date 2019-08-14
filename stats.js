var outputJSON = {};
var scoreboardJSON;
var objectiveList;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {
	console.log(status);
	scoreboardJSON = status;

  var objectives = status.ObjectiveList;
	var players = status.PlayerList;

	objectives.splice(objectives.indexOf('xp'), 1);
	objectives.splice(objectives.indexOf('HP'), 1);
	objectives.splice(objectives.indexOf('Smierci'), 1);
	objectives.splice(objectives.indexOf('food'), 1);

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
	document.getElementById('tabelka').appendChild(makeUL(outputJSON))
});

console.warn(outputJSON)


function makeUL(array) {
	console.log(array);
		var table = document.createElement("table");
		var tbody = document.createElement('tbody');

		let trow = document.createElement('tr');
		// trow.appendChild(document.createTextNode('Gracz'));

		console.log(objectiveList)
		for(var i=0; i<array.objectiveList.length; i++){
			let th = document.createElement('th');
			th.innerHTML = array.objectiveList[i];
			trow.appendChild(th);
		}

		tbody.appendChild(trow);

		table.style.width = '100%';
		table.setAttribute('border', '1');

		// for (var i = 0; i < Object.keys(array).length; i++) {
		// 	var a = array[i]
		// 	console.log(a)
		//
		// 		var tr = document.createElement('tr');
		//
		// 		for(var n=0; n<Object.keys(a).length; n++){
		//
		// 			if(typeof a[n] == 'undefined'){
		// 				tr.appendChild(0)
		// 			} else{
		// 				tr.appendChild(a[n])
		// 			}
		// 		}
		//
		// 		tbody.appendChild(tr);
		// }

		function logMapElements(value, key, map) {
  	console.log(`m[${key}] = ${value}`);
		}

		// new Map(array).forEach(logMapElements);

		// Finally, return the constructed list:
		table.appendChild(tbody);

		console.warn(table);
		return table;
}
