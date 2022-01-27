// Get the modal
var aboutModal = document.getElementById("aboutModal");
var techModal = document.getElementById("techModal");
var artModal = document.getElementById("artModal");

// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutButton");
var techBtn = document.getElementById("techButton");
var artBtn = document.getElementById("artButton");

// Get the <span> element that closes the modal
var aboutSpan = document.getElementById("aboutClose");
var techSpan = document.getElementById("techClose");
var artSpan = document.getElementById("artClose");

// When the user clicks the button, open the modal 
aboutBtn.onclick = function() {
	aboutModal.style.display = "block";
}
techBtn.onclick = function() {
	techModal.style.display = "block";
}
artBtn.onclick = function() {
	artModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
aboutSpan.onclick = function() {
	aboutModal.style.display = "none";
}
techSpan.onclick = function() {
	techModal.style.display = "none";
}
artSpan.onclick = function() {
	artModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == aboutModal) {
	aboutModal.style.display = "none";
  } else if (event.target == techModal) {
	techModal.style.display = "none";
  } else if (event.target == artModal) {
	artModal.style.display = "none";
  }
}



'use strict';

/**
 * Makes an element draggable.
 *
 * @param {HTMLElement} element - The element.
 */
function draggable(element) {
    var isMouseDown = false;

    // initial mouse X and Y for `mousedown`
    var mouseX;
    var mouseY;

    // element X and Y before and after move
    var elementX = 0;
    var elementY = 0;

    // mouse button down over the element
    element.addEventListener('mousedown', onMouseDown);

    /**
     * Listens to `mousedown` event.
     *
     * @param {Object} event - The event.
     */
    function onMouseDown(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseDown = true;
    }

    // mouse button released
    document.addEventListener('mouseup', onMouseUp);

    /**
     * Listens to `mouseup` event.
     *
     * @param {Object} event - The event.
     */
    function onMouseUp(event) {
        isMouseDown = false;
        elementX = parseInt(element.style.left) || 0;
        elementY = parseInt(element.style.top) || 0;
    }

    // need to attach to the entire document
    // in order to take full width and height
    // this ensures the element keeps up with the mouse
    document.addEventListener('mousemove', onMouseMove);

    /**
     * Listens to `mousemove` event.
     *
     * @param {Object} event - The event.
     */
    function onMouseMove(event) {
        if (!isMouseDown) return;
        var deltaX = event.clientX - mouseX;
        var deltaY = event.clientY - mouseY;
        element.style.left = elementX + deltaX + 'px';
        element.style.top = elementY + deltaY + 'px';
    }
}


var div;

div = document.createElement("div");
div.style.position = "absolute";
div.style.left = "0px";
div.style.top = "0px";
div.style.width = "1000px";
div.style.height = "1000px";
div.style.background = "red";
div.style.color = "blue";

div.style.zIndex = "95";
console.log(div);
// draggable(div);