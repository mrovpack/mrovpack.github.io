let params = document.location.search || window.location.hash;
// params = "#iJn0VPQW27";
console.warn(params);

if (params) {
    console.log("Found params to load from");
    var URL = "https://bytebin.lucko.me/";

    if (params.startsWith("?") || params.startsWith("#")) {
        params = params.substring(1);
        params = URL + params;
        console.log(params);

        $.getJSON(params, function(data) {
          console.log(data)
          dataReady(data);
          finishLoading();
        });
      }
} else {
  $("body").html("");

  // Redirect to plot wiki
  // window.location.replace("http://github.com/mrovpack/help/wiki/plot");
}

function dataReady(data){
  console.log(data.username)

  $("#username").html(data.username);

  // var tables = ['members', 'trusted'];
  //
  // for(item of tables){
  //   var table = document.createElement('table');
  //   table.className = "table";
  //   table.id = ""
  // }

  var tableMembers = document.createElement('table');
  var tableTrusted = document.createElement('table');

  tableMembers.className = "table";
  tableMembers.id = "tableMembers";
  tableMembers.style["border-radius"] = "10px 10px 0 0";

  tableTrusted.className = "table";
  tableTrusted.id = "tableTrusted";
  tableTrusted.style["border-radius"] = "10px 10px 0 0";

  for(var i=0; i<data.members.length; i++){
    let a = data.members[i];
    let type = "members";
    console.log(a);

    tableMembers.appendChild(createRow(a, type))
  }

  for(var i=0; i<data.trusted.length; i++){
    let a = data.trusted[i];
    let type = "trusted";
    console.log(a);

    tableTrusted.appendChild(createRow(a, type))
  }

  $("#members").append(tableMembers)
  $("#trusted").append(tableTrusted)

  $("#members").append(createInputRow("members"));
  $("#trusted").append(createInputRow("trusted"));
}

function createRow(input, type){
  var tr = document.createElement('tr');
  var td = document.createElement('td');

  var id = type + "-" + input;
  tr.id = id;
  var onClick = "deleteField(" + '"' + id + '"' + ")";

  td.appendChild(document.createTextNode(input))
  tr.appendChild(td);

  var tdButtons = document.createElement('td');

  var image = document.createElement('img');
  image.className = "button";
  image.src = "./images/icons/delete.png"
  image.setAttribute('onclick', onClick);

  tdButtons.appendChild(image)

  tr.style["display"] = "table-row";
  tr.style["width"] = "100%";
  tr.style["background"] = "#444444";
  td.className = "td";

  tdButtons.style["border-radius"] = "0 10px 10px 0"
  tdButtons.style["text-align"] = "center";
  tdButtons.style["width"] = "40px";
  tr.appendChild(tdButtons);

  return tr;

}

function createInputRow(type){
  var table = document.createElement("table");
  table.className = "table";
  table.style["border-radius"] = "0 0 10px 10px";

  var tr = document.createElement('tr');
  tr.id = "inp";
  var td = document.createElement('td');

  var input = document.createElement("input");
  input.id = type + "-new";
  input.type = "text";

  input.style["border"] = "none";
  input.style["border-bottom"] = "2px solid #f57c00";
  input.style["border-radius"] = "3px";
  input.style["background"] = "transparent";
  input.style["padding-left"] = "5px";
  input.style["color"] = "white";
  input.style["font-family"] = "Minecraft-Regular"
  input.style["width"] = "100%"
  input.setAttribute("placeholder", "Add new...")

  td.appendChild(input);
  tr.appendChild(td);

  tr.style["display"] = "table-row";
  tr.style["width"] = "100%";
  tr.style["background"] = "#444444";
  td.className = "td";

  var tdButtons = document.createElement('td');

  var onClick = "addUser(" + '"' + type + "-new" + '", "' + type + '"' + ")";

  var image = document.createElement('img');
  image.className = "button";
  image.src = "./images/icons/add.png"
  image.id = type + "-add"
  image.setAttribute('onclick', onClick);

  tdButtons.style["border-radius"] = "0 10px 10px 0"
  tdButtons.style["text-align"] = "center";
  tdButtons.className = "center";

  tdButtons.appendChild(image)
  tr.appendChild(tdButtons);
  table.appendChild(tr);

  return table;
}

function addUser(input, type){
  var text = $("#" + input).val();

  if(text == "" || text === " "){ return; }

  var tableID = "#table" + type.charAt(0).toUpperCase() + type.slice(1);

  $(tableID).append(createRow(text, type));
  $("#" + input).val("");
}

function deleteField(id){
  $("#" + id).remove();
}

function saveAll(){
  var outputJSON = {};
  var commands = [];

  let tabMembers = $("#tableMembers").find("tr");
  var membersL = tabMembers.children(":even");

  var setMembers = "foxguard modify handler %% users members set ";
  for(var i=0; i<membersL.length; i++){
    let a = membersL[i];

    setMembers = setMembers + a.innerHTML + " ";
  }
  console.log(setMembers)
  commands.push(setMembers);

  let tabTrusted = $("#tableTrusted").find("tr");
  var trustedL = tabTrusted.children(":even");

  var setTrusted = "foxguard modify handler %% users trusted set ";
  for(var i=0; i<trustedL.length; i++){
    let a = trustedL[i];

    setTrusted = setTrusted + a.innerHTML + " ";
  }
  console.log(setTrusted)
  commands.push(setTrusted)

  outputJSON["commands"] = commands;

  const callback = function(data){
    const id = data["key"];
    console.log("Save id: " + id);

    let content = "";
    content += '<div class="alert">';
    content +=
        '<strong>Success!</strong> Data was saved. Run <code class="apply_command" class="clickable" title="Copy to clipboard">' +
        ".plot apply " + id + '</code> to apply your changes.</div>';

    const popup = $("#popup");
    popup.append(content);
    popup.addClass('active');

    function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

    var command = $('.apply_command')[0].innerHTML;
    document.getElementsByClassName("apply_command")[0].addEventListener("click", copyToClipboard(command));
    console.log(command)
  }

  $.ajax(URL + "post", {
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify(outputJSON, null, 2),
      method: "POST",
      success: callback
  });
}

function finishLoading(){
  $("#members-new").keypress(function(event) {
              if (event.keyCode === 13) {
                  $("#members-add").click();
              }
          });

  $("#trusted-new").keypress(function(event) {
              if (event.keyCode === 13) {
                  $("#trusted-add").click();
              }
          });
}
