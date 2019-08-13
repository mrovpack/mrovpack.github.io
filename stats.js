var outputJSON = {};
var scoreboardJSON;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {
	console.log(status);
	scoreboardJSON = status;

  var objectives = status.ObjectiveList;
	var players = status.PlayerList;

	for(var i=0; i<players.length; i++){
		var a = players[i];

		var d = outputJSON[a];

		for(var n=0; n<objectives.length; n++){
			var objectiveName = objectives[n];

			if(status[objectiveName][a] !== 'undefined'){

				var score = status[objectiveName][a];
				d[objectiveName] = score;
			}
		}


	}
});

console.warn(outputJSON)
