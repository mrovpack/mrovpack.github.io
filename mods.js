var modsJSON;

$.getJSON('./mods.json', function(data) {

	dataReady(data);
});

function dataReady(json){
	modsJSON = json;
  createList(json);
}


function createList(json){
  var list = $("#list");
  var li = document.createElement("ul");

  for(entry in json){
    var a = entry;
    var b = json[entry]


    var link = document.createElement('a');
    link.innerHTML = a;
    link.href = b;

    var listItem = document.createElement('li');
    listItem.appendChild(link);
    li.appendChild(listItem);
  }

  list.append(li);
}
