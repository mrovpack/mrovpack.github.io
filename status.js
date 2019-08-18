//Get the status
$.getJSON('https://api.mcsrvstat.us/2/185.38.248.226:29098', function(status) {
	//Show the version
	console.log(status);
  console.log(status.online)

  var online = status.online;
  var ip = status.ip;
  var port = status.port;
  var players = status.players;
  var version = status.version;

  if(typeof status.mods === 'undefined'){
    var mods = ''
  }else {
    var mods = status.mods.names;
  }

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

	document.getElementById("info").innerHTML = 'Server is offline'
	document.getElementById("list").className="hide";
  if(online){
		document.getElementById("ip").innerHTML = 'IP: ' + ip + ':' + port;
		document.getElementById("info").innerHTML = 'Server is online '
    document.getElementById("version").innerHTML = 'Running on version ' + version;

		if(players.online != 0){
			document.getElementById("list").className="show";

			if(players.online == 1){
				document.getElementById("players").innerHTML = players.online + ' player online!';
			} else{
				document.getElementById("players").innerHTML = players.online + ' players online!';
			}

			var list = players.list;
			document.getElementById('playerlist').appendChild(makeUL(list));

			document.getElementById("info").className = "on";
		}else{
			document.getElementById("list").className="hide";
			document.getElementById("info").className = "off";
			document.getElementById("players").innerHTML = players.online + ' players online';
		}

    document.getElementById('mods').appendChild(makeUL(mods));
  }



});
