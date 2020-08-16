let Name = localStorage.getItem('name')

if(Name){
  $("#name-input").val(Name)
}

if($("#name-input").val() == ""){
  $("#name-input").css('border', "1px solid red").css('border-radius', '15px')
}

$(function(){
 $("#name").keypress(function (e) {
    if (e.keyCode == 13) {
        localStorage.setItem('name', $("#name-input").val())
        $("#name-input").css('border', "0")
        location.reload();
    }
 });
});


let links = {
  "Statystyki": "./stats/",
  "Twoje statystyki": "./stats/player/?%%",
  "'Wiki'": "./wiki/",
  "Status serwera": "./status/",
  "Mapa serwera": "./map/"
}

for(item of Object.keys(links)){
  let name = item;
  let link = links[item];

  link = link.replace("%%", Name)

  let A = document.createElement('a');
  $(A).attr('href', link);
  $(A).html(name);

  $("#links").append(A).append('<br>');
}
