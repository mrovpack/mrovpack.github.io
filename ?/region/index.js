function defer() {
    if (window.jQuery) {
        checkParameters();
    } else {
        setTimeout(function() { defer() }, 50);
    }
}
defer();

let commands = [];

function checkParameters(){
  let params = document.location.search || window.location.hash;
  console.warn(params);

  if (params) {
    console.log("Found params to load from");
    // var URL = "https://bytebin.lucko.me/";

    if (params.startsWith("?")){

      let input = params.substring(1);
      let parameters = input.split("?");

      dataReady(parameters);

      console.log(parameters);
    }

  } else {
    console.warn('pusto');
  }

}

function dataReady(data){
  let Json = {};
  Json.player = data[3].substr(1);
  Json.x = data[0].substr(1);
  Json.z = data[1].substr(1);
  Json.dim = data[2].substr(1);

  console.log(Json);
  createCommands(Json);
}

function createCommands(input){
  // let commands = [];

  let x1 = +input.x - 50;
  let x2 = +input.x + 50;

  let z1 = +input.z - 50;
  let z2 = +input.z + 50;

  commands.push("foxguard create handler " + input.player + " basic plugandplay");
  commands.push("foxguard modify handler " + input.player + " users owners add " + input.player);
  commands.push("foxguard modify handler " + input.player + " groups add trusted");
  commands.push("foxguard modify handler " + input.player + " flags trusted add block change =allow");
  commands.push("foxguard modify handler " + input.player + " flags trusted add block break =deny");
  commands.push("foxguard modify handler " + input.player + " flags trusted add block place =deny");
  commands.push("foxguard modify handler " + input.player + " flags default add block =deny");
  commands.push("foxguard modify handler " + input.player + " flags passive add explosion =deny");
  commands.push("foxguard modify handler " + input.player + " flags members add block =allow");

  commands.push("foxguard create worldregion --w:" + input.dim + " " + input.player + " rectangular " + x1 + " " + z1 + " " + x2 + " " + z2)
  commands.push("foxguard link --w:" + input.dim + " " + input.player + " " + input.player);

  commands.push("foxguard save");

  console.log(commands)
  createOutput(commands, input);
}

function checkIfTooClose(){

}

function createOutput(commands, json){
  let Json = {};
  Json.commands = commands;
  Json.user = json.player;

  postOutput(Json);
}

function postOutput(data){
  $.ajax("https://bytebin.lucko.me/" + "post", {
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(data, null, 2),
      method: "POST",
      success: displayOutput
  });
}

function displayOutput(data){
  const id = data["key"];
  console.log("Save id: " + id);

  for(item of commands){
    $("#commands").append("/" + item).append("<br>")
  }

  $("#discord").append(".apply " + id).append("<br>")
}
