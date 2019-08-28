var outputJSON = {};
var players;

$.getJSON('https://andreymrovol.github.io/mrovpack-scoreboardData/scoreboard.json', function(status) {

  players = Object.keys(status['distanceWalk']);
  distanceObjectives = ['distanceSwim', 'distanceFly', 'distanceWalk', 'distanceCrouch', 'distanceSprint']

  for(var i=0; i<players.length; i++){
    let a = players[i];

    let b = {};
    let c = b['distanceTotal'] = '';

    for(var o=0; o<distanceObjectives.length; o++){
      let objName = distanceObjectives[o];

      b[objName] = status[objName][a];
      b['distanceTotal'] = +b['distanceTotal'] + +status[objName][a];
    }

		outputJSON[a] = b;

  }
});


function getDistancesJSON(){
	return outputJSON;
}
