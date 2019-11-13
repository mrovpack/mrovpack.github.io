let params = document.location.search || window.location.hash;
params = "#BKdr49UbBR";
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
  var table = document.createElement('table');

}

function createRow(input){
  var tr = document.createElement('tr');
  var td = document.createElement('td');


}
