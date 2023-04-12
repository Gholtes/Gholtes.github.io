// Select background based on user time
let backup_background = "linear-gradient(0deg, rgba(104,180,252,1) 0%,  rgba(137,201,250,1) 100%)"

images = ["../assets/creativeprojects/attractors/attarctor3G.png","../assets/creativeprojects/digital_cube_space/esher5.png"];
text_colours = ["#00AA00", "#222222"];
text_hl_colour = ["#009900", "#111111"];
text_bg_colour = ["#cfffcf", "#CCCCCC"];
text_bg_hl_colour = ["#c0f0c0", "#BFBFBF"];


index = Math.floor(Math.random() * images.length);
background_image_path = images[index]
// background_style = "url("+background_image_path+"), "+backup_background;
background_style = "url("+background_image_path+")";
console.log("Loading background:", background_style);
const collection = document.getElementsByClassName("backgroundimage");
var r = document.querySelector(':root');
r.style.setProperty('--text-colour', text_colours[index]);
r.style.setProperty('--text-bg-colour', text_bg_colour[index]);
r.style.setProperty('--text-hl-colour', text_hl_colour[index]);
r.style.setProperty('--text-bg-hl-colour', text_bg_hl_colour[index]);
collection[0].style.backgroundImage = background_style;