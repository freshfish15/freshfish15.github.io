document.addEventListener("DOMContentLoaded", function() {
    // Get the modal elements
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    var closeButton = document.getElementsByClassName("close-button")[0];

    // Get all images with the 'popup-image' class
    var images = document.getElementsByClassName("popup-image");

    // Add click event listeners to all popup images
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.style.transform = "scale(1)"; // Reset zoom on new image
        });
    }

    // When the user clicks on the close button, close the modal
    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // When the user clicks anywhere outside of the modal content, close it
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // Zoom functionality for the modal image
    let currentScale = 1;
    const scaleStep = 0.1;
    const maxScale = 3;
    const minScale = 0.5;

    modalImg.addEventListener("click", function() {
        if (currentScale < maxScale) {
            currentScale += scaleStep;
        } else {
            currentScale = 1; // Reset to original size if max zoom reached
        }
        modalImg.style.transform = `scale(${currentScale})`;
    });

    modalImg.addEventListener("wheel", function(event) {
        event.preventDefault(); // Prevent page scrolling

        if (event.deltaY < 0) {
            // Zoom in
            currentScale = Math.min(maxScale, currentScale + scaleStep);
        } else {
            // Zoom out
            currentScale = Math.max(minScale, currentScale - scaleStep);
        }
        modalImg.style.transform = `scale(${currentScale})`;
    });
});