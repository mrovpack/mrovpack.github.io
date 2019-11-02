const serverIP = "mrovpack.maxcraft.pl:26424";

//Get the status
$.getJSON('https://api.mcsrvstat.us/2/' + serverIP, function(status) {
	//Show the version
	console.log(status);
  console.log(status.online)

  var online = status.online;
  var ip = status.ip;
  var port = status.port;
  var players = status.players;
  var version = status.version;

  function makeUL(array) {
      // Create the list element:
      var list = document.createElement('ul');
      for (var i = 0; i < array.length; i++) {
          // Create the list item:
          var item = document.createElement('li');
          // Set its contents:
          item.appendChild(document.createTextNode(array[i]));
          // Add it to the list:
          list.appendChild(item);
      }
      // Finally, return the constructed list:
      return list;
  }

	function turnLamps(players){
		var grid = document.createElement('div');

		for(player of players.list){
			let a = player;

			var row = document.createElement('div');
			row.className = "row";
			row.style["display"] = "flex";
			row.style["background"] = "#303030";
			row.style["margin"] = "5px";
			row.style["border-radius"] = "15px";

			let l = document.createElement('div');
			l.className = 'lamp';
			l.style["height"] = "35px";
			l.style["width"] = "35px";

			let name = document.createElement("div");
			name.innerHTML = a;
			name.style["align-self"] = "center";
			name.style["padding"] = "10px";

			if(typeof a != 'undefined'){
				l.className = 'lamp on';
			}

			row.appendChild(l);
			row.appendChild(name)

			grid.appendChild(row);
		}


		// let count = 0;
		// for(var i=0; i<players.max; i++){
		// 	let l = document.createElement('div');
		// 	l.className = 'lamp';
//
		// 	if(typeof players.list[i] != 'undefined'){
		// 		l.className = 'lamp on';
		// 	}
//
		// 	row.appendChild(l);
		// }

		$("#lamps").append(grid);
	}

	document.getElementById("info").innerHTML = 'Server is offline'
	document.getElementById("list").className="hide";
	document.getElementById("playerpill").style.visibility = 'collapse';
	document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/status/off.png";
  if(online){
		document.getElementById("ip").innerHTML = 'IP: ' + ip + ':' + port;
		document.getElementById("info").innerHTML = 'Server is online '
    document.getElementById("version").innerHTML = 'Running on version ' + version;
		document.getElementById("playerpill").style.visibility = 'visible';
		document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/status/on.png";

		if(players.online != 0){
			document.getElementById("list").className="show";

			if(players.online == 1){
				document.getElementById("players").innerHTML = players.online + ' player online!';
			} else{
				document.getElementById("players").innerHTML = players.online + ' players online!';
			}

			var list = players.list;
			// document.getElementById('playerlist').appendChild(makeUL(list));

			turnLamps(players)

//			document.getElementById("info").className = "on";
		}else{
			document.getElementById("list").className="hide";
			document.getElementById("info").className = "off";
			document.getElementById("players").innerHTML = players.online + ' players online';
		}

//    document.getElementById('mods').appendChild(makeUL(status.mods.names));
  }



});
