const video = document.getElementById('webcam');
const liveView = document.getElementById('liveView');
const demosSection = document.getElementById('demos');
const enableWebcamButton = document.getElementById('webcamButton');
var input_width = 0;
var input_height = 0;

// Check if webcam access is supported.
function getUserMediaSupported() {
    return !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia);
}

// If webcam supported, add event listener to button for when user
// wants to activate it to call enableCam function which we will 
// define in the next step.
if (getUserMediaSupported()) {
    enableWebcamButton.addEventListener('click', enableCam);
} else {
    console.warn('getUserMedia() is not supported by your browser');
}

// Enable the live webcam view and start classification.
function enableCam(event) {
    // Only continue if the COCO-SSD has finished loading.
    if (!model) {
        return;
    }

    // Hide the button once clicked.
    event.target.classList.add('removed');

    // getUsermedia parameters to force video but not audio.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        video.srcObject = stream;
        media_stream = stream.getVideoTracks()[0].getSettings()
        input_width = media_stream.width;
        input_height = media_stream.height;
        video.addEventListener('loadeddata', predictWebcam);
    });
}

// Store the resulting model in the global scope of our app.
var model = undefined;

// Before we can use COCO-SSD class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment 
// to get everything needed to run.
// Note: cocoSsd is an external object loaded from our index.html
// script tag import so ignore any warning in Glitch.
cocoSsd.load().then(function(loadedModel) {
    model = loadedModel;
    // Show demo section now model is ready to use.
    demosSection.classList.remove('invisible');
    loadingMessage = document.getElementById("model_loading_message");
    loadingMessage.style.display = "none";
});

var children = [];

function predictWebcam() {
    // Now let's start classifying a frame in the stream.
    model.detect(video).then(function(predictions) {
        // Remove any highlighting we did previous frame.
        for (let i = 0; i < children.length; i++) {
            liveView.removeChild(children[i]);
        }
        children.splice(0);
        // Get display resolution to mirror and scale
        let display_width = video.clientWidth;
        let display_height = video.clientHeight;
        let x_scale_factor = display_width / input_width;
        let y_scale_factor = display_height / input_height;

        // Now lets loop through predictions and draw them to the live view if
        // they have a high confidence score.
        for (let n = 0; n < predictions.length; n++) {
            if (predictions[n].score > 0.6) {
                // Display bbox
                // Mirror x axis in input_width
                predictions[n].bbox[0] = input_width - predictions[n].bbox[0] - predictions[n].bbox[2];
                const p = document.createElement('p');
                p.setAttribute('class', 'boundingboxlabel');
                p.innerText = predictions[n].class + ' - with ' +
                    Math.round(parseFloat(predictions[n].score) * 100) +
                    '% confidence.';
                p.style = 'margin-left: ' + predictions[n].bbox[0] * x_scale_factor + 'px; margin-top: ' +
                    (predictions[n].bbox[1] * y_scale_factor - 10) + 'px; width: ' +
                    (predictions[n].bbox[2] * x_scale_factor - 10) + 'px; top: 0; left: 0;';

                const boundingbox = document.createElement('div');
                boundingbox.setAttribute('class', 'boundingbox');
                boundingbox.style = 'left: ' + predictions[n].bbox[0] * x_scale_factor + 'px; top: ' +
                    predictions[n].bbox[1] * y_scale_factor + 'px; width: ' +
                    predictions[n].bbox[2] * x_scale_factor + 'px; height: ' +
                    predictions[n].bbox[3] * y_scale_factor + 'px;';

                liveView.appendChild(boundingbox);
                liveView.appendChild(p);
                children.push(boundingbox);
                children.push(p);
            }
        }
        // Call this function again to keep predicting when the browser is ready.
        window.requestAnimationFrame(predictWebcam);
    });
}