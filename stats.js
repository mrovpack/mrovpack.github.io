$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {
	console.log(status);


  var objectives = status.ObjectiveList;
	var players = status.PlayerList;

	var outputJSON = {};

	for(var i=0; i<players.length; i++){
		var a = players[i];

		for(var n=0; n<objectives.length; n++){
			var b = objectives[n];
			var c = b[a];
			console.log(a)

		}


	}
});
