let modalBox = document.getElementById("modalBox");
let modal = document.getElementById("modal");

//Open full view, set values for what's about to display
function openModal(pic){
    modalBox.style.display = "flex";  //Sets to appear
    modal.src = pic;  //Sets the desired image
  }

//Close full view with Escape Key
document.addEventListener("keyup", function(event) {
  if (event.key === 'Escape') {
    modalBox.style.display = "none";
  }
});

//Close full view by clicking outside of img
window.onclick = function(event) {
    if (event.target == modalBox) {
      modalBox.style.display = "none";
    }
  }

//IDEAS: Make a "next" and "before" button upon fullscreen view
//