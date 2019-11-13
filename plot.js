let params = document.location.search || window.location.hash;
params = "#fvhpZMqU8K";
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
        });
      }
}

function dataReady(data){
  console.log(data.username)
  var tableMembers = document.createElement('table');
  var tableTrusted = document.createElement('table');

  tableMembers.style["background"] = "#333333";
  tableMembers.style["border-radius"] = "10px";
  tableMembers.style["width"] = "100%";
  tableMembers.style["padding"] = "10px 10px"

  tableTrusted.style["background"] = "#333333";
  tableTrusted.style["border-radius"] = "10px";
  tableTrusted.style["width"] = "100%";
  tableTrusted.style["padding"] = "10px 10px"

  for(var i=0; i<data.members.length; i++){
    let a = data.members[i];
    console.log(a);

    tableMembers.appendChild(createRow(a))
  }

  for(var i=0; i<data.trusted.length; i++){
    let a = data.trusted[i];
    console.log(a);

    tableTrusted.appendChild(createRow(a))
  }

  $("#members").append(tableMembers)
  $("#trusted").append(tableTrusted)
}

function createRow(input){
  var tr = document.createElement('tr');
  var td = document.createElement('td');

  td.appendChild(document.createTextNode(input))
  tr.appendChild(td);

  var tdButtons = document.createElement('td');

  // var buttDelete = document.createElement("a");

  var button = document.createElement('img');
  button.style["width"] = "25px";
  button.style["height"] = "25px";
  button.style["vertical-align"] = "middle";
  button.style["text-align"] = "center";
  button.src = "./images/icons/delete.png"
  tdButtons.appendChild(button)

  tr.style["display"] = "table-row";
  tr.style["width"] = "100%";
  tr.style["background"] = "#444444";
  td.style["padding"] = "5px 10px"
  td.style["border-radius"] = "10px 0 0 10px"

  tdButtons.style["border-radius"] = "0 10px 10px 0"
  tdButtons.className = "center";
  tr.appendChild(tdButtons);

  return tr;

}

function handleFieldAdd(){}
