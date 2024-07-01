
accent_colours = ["#005CDE", "#189200", "#00937b"]

index = Math.floor(Math.random() * accent_colours.length);
var r = document.querySelector(':root');
r.style.setProperty('--accent-colour', accent_colours[index]);
r.style.setProperty('--text-accent-colour', accent_colours[index]);

function getCurrentTimeInHours() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    return hours + minutes / 60 + seconds / 3600;
}

function updateBackgroundGradient() {
    const hours = getCurrentTimeInHours();
    const angle = (hours / 24) * 36000000;
    const color1 = "#005CDE"; // Starting color
    const color2 = "#189200"; // Ending color
    colour = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
    r.style.setProperty('--accent-colour', colour);
    // r.style.setProperty('--text-accent-colour', colour);
    // document.body.style.background = 
}

// Initial update
updateBackgroundGradient();

// Update every second
setInterval(updateBackgroundGradient, 50);
