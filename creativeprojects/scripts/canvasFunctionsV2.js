//Test with raw canvas API, no webGL
//WebGL may be better: https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html

function setPixelColour(imageData, x, y, width, R, G, B, A) {
    let redIndex = y * (width * 4) + x * 4;
    imageData.data[redIndex] = R;
    imageData.data[redIndex + 1] = G;
    imageData.data[redIndex + 2] = B;
    imageData.data[redIndex + 3] = A;
    return imageData;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function init() {
    window.requestAnimationFrame(draw);
}

function hex2RGB(hex) {
    let R = parseInt((hex[1] + hex[2]).toUpperCase(), 16);
    let G = parseInt((hex[3] + hex[4]).toUpperCase(), 16);
    let B = parseInt((hex[5] + hex[6]).toUpperCase(), 16);
    return [R, G, B];
}

function toggleSeries() {
    var x = document.getElementById("toggleSeries");
    if (x.innerHTML === "Peter de Jong") {
        x.innerHTML = "Polynomial";
    } else {
        x.innerHTML = "Peter de Jong";
    }
}


//Render preview
function draw() {
    //Get inputs
    let a = parseFloat(document.getElementById("inputA").value);
    let b = parseFloat(document.getElementById("inputB").value);
    let c = parseFloat(document.getElementById("inputC").value);
    let d = parseFloat(document.getElementById("inputD").value);
    //Get colours
    let backgroundColour = document.getElementById("colorpickerBackground").value;
    let col1 = hex2RGB(document.getElementById("colorpickerForeground1").value);
    var functionType = document.getElementById("toggleSeries");


    ctx.fillStyle = backgroundColour;
    ctx.fillRect(0, 0, width, height);


    // var imageData = ctx.createImageData(width, height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var x0 = getRandomInt(10);
    var y0 = getRandomInt(10);

    if (functionType == "Peter de Jong") {
        //Warm up
        for (j = 0; j < 10; j++) {
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
        }
        //Render
        for (i = 0; i < 50000; i++) {
            //based on http://paulbourke.net/fractals/peterdejong/
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
            if (i % 5000 == 0) {
                //Avoid solutions that only visit a small number of points
                x0 = getRandomInt(100) / 100.0;
                y0 = getRandomInt(100) / 100.0;
                //Warm up
                for (j = 0; j < 10; j++) {
                    x1 = Math.sin(a * x0) - Math.cos(b * y0);
                    y1 = Math.sin(c * x0) - Math.cos(d * y0);
                    x0 = x1;
                    y0 = y1;
                }
            }
            X = parseInt((x1 + 2.1) * (width / 4.2));
            Y = parseInt((y1 + 2.1) * (height / 4.2));
            imageData = setPixelColour(imageData, X, Y, width, col1[0], col1[1], col1[2], 255);

        }
    } else {
        //Warm up
        for (j = 0; j < 10; j++) {
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
        }
        //Render
        for (i = 0; i < 50000; i++) {
            //based on http://paulbourke.net/fractals/peterdejong/
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
            if (i % 5000 == 0) {
                //Avoid solutions that only visit a small number of points
                x0 = getRandomInt(100) / 100.0;
                y0 = getRandomInt(100) / 100.0;
                //Warm up
                for (j = 0; j < 10; j++) {
                    x1 = Math.sin(a * x0) - Math.cos(b * y0);
                    y1 = Math.sin(c * x0) - Math.cos(d * y0);
                    x0 = x1;
                    y0 = y1;
                }
            }
            X = parseInt((x1 + 2.1) * (width / 4.2));
            Y = parseInt((y1 + 2.1) * (height / 4.2));
            imageData = setPixelColour(imageData, X, Y, width, col1[0], col1[1], col1[2], 255);

        }
    }

    ctx.putImageData(imageData, 0, 0);

    window.requestAnimationFrame(draw);

    var milliseconds = new Date().getTime();
    let fps = parseInt(1000 / (milliseconds - prevTime));
    prevTime = milliseconds;
    const fpsDisp = document.getElementById('fps');
    fpsDisp.innerHTML = fps;
}

const canvas = document.getElementById('previewCanvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var width = canvas.width;
var height = canvas.height;
var prevTime = 0;
init(); //Start animiation loop


//Draw once
function drawhighRes(points = 5000000) {
    const canvas = document.getElementById("canvasLarge");
    const context = canvas.getContext('2d');

    //Get inputs
    let a = parseFloat(document.getElementById("inputA").value);
    let b = parseFloat(document.getElementById("inputB").value);
    let c = parseFloat(document.getElementById("inputC").value);
    let d = parseFloat(document.getElementById("inputD").value);

    let pow = parseFloat(document.getElementById("power").value);
    let backgroundColour = document.getElementById("colorpickerBackground").value;
    let col1 = hex2RGB(document.getElementById("colorpickerForeground1").value);
    let col2 = hex2RGB(backgroundColour);

    context.fillStyle = backgroundColour;
    context.fillRect(0, 0, canvas.width, canvas.width);

    // var imageData = ctx.createImageData(width, height);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    var samples = {};
    var key;

    var x0 = getRandomInt(10);
    var y0 = getRandomInt(10);

    points = parseInt(points / 1000);
    //100 rounds of drawing
    for (j = 0; j < 1000; j++) {
        //Warm up
        for (i = 0; i < 10; i++) {
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
        }
        //render
        for (i = 0; i < points; i++) {
            //based on http://paulbourke.net/fractals/peterdejong/
            x1 = Math.sin(a * x0) - Math.cos(b * y0);
            y1 = Math.sin(c * x0) - Math.cos(d * y0);
            x0 = x1;
            y0 = y1;
            X = parseInt((x1 + 2.1) * (canvas.width / 4.2));
            Y = parseInt((y1 + 2.1) * (canvas.height / 4.2));
            key = X * canvas.width + Y;
            if ((key) in samples) {
                samples[key] = samples[key] + 1;
            } else {
                samples[key] = 1;
            }
        }
    }
    //Render
    let maxVal = 0;
    let intensity = 0;
    for (const [key, value] of Object.entries(samples)) {
        maxVal = Math.max(maxVal, value)
    }
    for (const [key, value] of Object.entries(samples)) {
        X = Math.floor(key / canvas.width);
        Y = key % canvas.width;
        intensity = value / maxVal //[0,1]
        intensity = Math.pow(intensity, pow);
        // intensity = intensity)));
        R = parseInt(col1[0] * intensity + col2[0] * (1.0 - intensity));
        G = parseInt(col1[1] * intensity + col2[1] * (1.0 - intensity));
        B = parseInt(col1[2] * intensity + col2[2] * (1.0 - intensity));
        imageData = setPixelColour(imageData, X, Y, canvas.width, R, G, B, 255);
    }
    context.putImageData(imageData, 0, 0);
}

function drawButtonPressed() {
    drawhighRes();
}