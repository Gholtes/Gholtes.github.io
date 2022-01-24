// Get the modal
var aboutModal = document.getElementById("aboutModal");
var techModal = document.getElementById("techModal");

// Get the button that opens the modal
var aboutBtn = document.getElementById("aboutButton");
var techBtn = document.getElementById("techButton");

// Get the <span> element that closes the modal
var aboutSpan = document.getElementById("aboutClose");
var techSpan = document.getElementById("techClose");

// When the user clicks the button, open the modal 
aboutBtn.onclick = function() {
	aboutModal.style.display = "block";
}
techBtn.onclick = function() {
	techModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
aboutSpan.onclick = function() {
	aboutModal.style.display = "none";
}
techSpan.onclick = function() {
	techModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == aboutModal) {
	aboutModal.style.display = "none";
  } else if (event.target == techModal) {
	techModal.style.display = "none";
  }
}