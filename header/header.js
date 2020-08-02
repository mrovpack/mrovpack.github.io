let css = '<link rel="stylesheet" href="../header/header.css">'
$('head').append(css);

let headerDiv = document.createElement("div");
$(headerDiv).attr('id', "header");

let icon = document.createElement('img');
$(icon).attr("id", "icon");
$(icon).attr('src', "https://mrovpack.github.io/assets/icon.png");
// $(icon).attr('href', "https://mrovpack.github.io")

$(headerDiv).append(icon);
$('body').prepend(headerDiv);
