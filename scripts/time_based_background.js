// Select background based on user time
console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
var now = new Date();
var hour = now.getHours();
console.log(now, hour);
let time_category = "day"; //default
let backup_background = "linear-gradient(0deg, rgba(104,180,252,1) 0%,  rgba(137,201,250,1) 100%)"

day_images = ["../assets/sky_images/day/day1.jpg","../assets/sky_images/day/day2.jpg","../assets/sky_images/day/day3.jpg","../assets/sky_images/day/day4.jpg"];
sunset_images = ["../assets/sky_images/sunset/sunset1.jpg","../assets/sky_images/sunset/sunset2.jpg","../assets/sky_images/sunset/sunset3.jpg","../assets/sky_images/sunset/sunset4.jpg"];
night_images = ["../assets/sky_images/night/night1.jpg", "../assets/sky_images/night/night2.jpg"];
sunrise_images = ["../assets/sky_images/sunrise/sunrise1.jpg","../assets/sky_images/sunrise/sunrise2.jpg"];

if (hour >= 8 && hour <= 17) {
	time_category = "day";
	images = day_images;
	backup_background = "linear-gradient(90deg, rgba(104,180,252,1) 0%,  rgba(137,201,250,1) 100%)";
} else if (hour >= 18 && hour <= 20) {
	time_category = "sunset";
	images = sunset_images;
	backup_background = "background: linear-gradient(83deg, rgba(255,150,50,1) 0%, rgba(180,150,120,1) 33%, rgba(0,70,90,1) 100%)";
} else if (hour >= 21 || hour <= 5) {
	time_category = "night";
	images = night_images;
	backup_background = "linear-gradient(0deg, rgba(15,47,52,1) 0%, rgba(0,105,126,1) 100%)";
} else if (hour >= 6 || hour <= 7) {
	time_category = "sunrise";
	images = sunrise_images;
	backup_background = "background: linear-gradient(83deg, rgba(209,158,110,1) 0%, rgba(52,134,157,1) 100%)";
}


index = Math.floor(Math.random() * images.length);
background_image_path = images[index]
console.log(hour, time_category, background_image_path);
background_style = "url("+background_image_path+"), "+backup_background;
// background_style = backup_background;
console.log(background_style);
console.log(document.body)
document.body.style.backgroundImage = background_style;