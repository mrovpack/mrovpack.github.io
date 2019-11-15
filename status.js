const serverIP = "mrovpack.maxcraft.pl:26424";

//Get server status
$.getJSON('https://api.mcsrvstat.us/2/' + serverIP, function(status) {
	dataReady(status);
});

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
		name.className = 'name';
		name.style["align-self"] = "center";
		name.style["padding"] = "10px";

		if(typeof a != 'undefined'){
			l.className = 'lamp on';
		}

		row.appendChild(l);
		row.appendChild(name)

		grid.appendChild(row);
	}

	$("#lamps").append(grid);
}


function dataReady(data){
	console.log(data);
	console.log(data.online)

	var online = data.online;
	var ip = data.ip;
	var port = data.port;
	var players = data.players;
	var version = data.version;


	$("#info").html("Server is offline");
	$("#list").attr('class', 'hide');
	$("#playerpill").css('visibility', "collapse");
	document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/data/off.png";
	if(online){
		$("#ip").html('IP: ' + ip + ':' + port);
		$("#info").html('Server is online ');
		$("#version").html('Running on version ' + version)
		$("#playerpill").css('visibility', 'visible');
		document.querySelector("link[rel*='icon']").href = "https://mrovpack.github.io/assets/data/on.png";

		if(players.online != 0){
			$("#list").attr('class', 'show');

			if(players.online == 1){
				$("#players").html(players.online + ' player online!')
			} else{
				$("#players").html(players.online + ' players online!')
			}

			var list = players.list;

			turnLamps(players)

//			document.getElementById("info").className = "on";
		}else{
			$("#list").attr('class', 'hide');
			$("#info").attr('class', 'off');
			$("#players").html(players.online + ' players online!')
		}

	}
}
