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

function warmup(x0, y0) {

    return { "x0": x0, "y0": y0 }
}

var a = 1.4;
var b = -2.3;
var c = 2.4;
var d = -2.85;
var a_inc = 0.001;
var b_inc = 0.002;
var c_inc = 0.0001;
var d_inc = 0.005;
const maxVal = 3.5;
var cnt = 0;

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, width, height);

    // var imageData = ctx.createImageData(width, height);
    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    var x0 = getRandomInt(10);
    var y0 = getRandomInt(10);
    //a = 1.4, b = -2.3, c = 2.4, d = -2.9
    //Incriment parameters
    a = a + a_inc;
    b = b + b_inc;
    c = c + c_inc;
    d = d + d_inc;
    cnt = cnt + 1;
    if (cnt == 20) {
        cnt = 0;
        if (a > maxVal || a < -maxVal) { a_inc = a_inc * -1; }
        if (b > maxVal || b < -maxVal) { b_inc = b_inc * -1; }
        if (c > maxVal || c < -maxVal) { c_inc = c_inc * -1; }
        if (d > maxVal || d < -maxVal) { d_inc = d_inc * -1; }
    }
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
        // console.log(x0, y0);
        X = parseInt((x1 + 2.1) * (width / 4.2));
        Y = parseInt((y1 + 2.1) * (height / 4.2));
        imageData = setPixelColour(imageData, X, Y, width, 255, 255, 255, 255);

    }
    ctx.putImageData(imageData, 0, 0);

    window.requestAnimationFrame(draw);

    var milliseconds = new Date().getTime();
    let fps = parseInt(1000 / (milliseconds - prevTime));
    prevTime = milliseconds;
    const fpsDisp = document.getElementById('fps');
    fpsDisp.innerHTML = fps;
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.fillStyle = "rgba(0,0,0,1)";
ctx.fillRect(0, 0, canvas.width, canvas.height);
var width = canvas.width;
var height = canvas.height;
var prevTime = 0;

init();


//Draw once

function drawhighRes(elementID, a, b, c, d, R, G, B, points = 1000000) {
    const canvas = document.getElementById(elementID);
    const context = canvas.getContext('2d');
    context.fillStyle = "rgba(0,0,0,1)";
    context.fillRect(0, 0, canvas.width, canvas.width);

    // var imageData = ctx.createImageData(width, height);
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

    var x0 = getRandomInt(10);
    var y0 = getRandomInt(10);
    //Warm up
    for (j = 0; j < 10; j++) {
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
        // console.log(x0, y0);
        X = parseInt((x1 + 2.1) * (canvas.width / 4.2));
        Y = parseInt((y1 + 2.1) * (canvas.height / 4.2));
        prop = (i * 1.0) / points;
        imageData = setPixelColour(imageData, X, Y, canvas.width, R, G, B, 255);

    }
    context.putImageData(imageData, 0, 0);
}

function drawButtonPressed() {
    console.log("Draw button pressed");
    let a = parseFloat(document.getElementById("inputA").value);
    let b = parseFloat(document.getElementById("inputB").value);
    let c = parseFloat(document.getElementById("inputC").value);
    let d = parseFloat(document.getElementById("inputD").value);
    let R = parseFloat(document.getElementById("R").value);
    let G = parseFloat(document.getElementById("G").value);
    let B = parseFloat(document.getElementById("B").value);
    console.log(a, b, c, d);
    drawhighRes("canvasLarge", a, b, c, d, R, G, B, points = 5000000)
}