let rotation = 0;
let isRotating = false;
let rotationSpeed = 1; // Default rotation speed

const imageInput = document.getElementById('imageInput');
const image = document.getElementById('image');
const startStopButton = document.getElementById('startStopButton');
const speedSlider = document.getElementById('speedSlider');

imageInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = 'block';
    }
});

startStopButton.addEventListener('click', function() {
    isRotating = !isRotating;
    startStopButton.textContent = isRotating ? 'Stop' : 'Start';
    rotateImage();
});

speedSlider.addEventListener('input', function() {
    rotationSpeed = parseInt(this.value, 10);
});

function rotateImage() {
    if (isRotating) {
        rotation = (rotation + rotationSpeed) % 360;
        image.style.transform = `rotate(${rotation}deg)`;
        requestAnimationFrame(rotateImage);
    }
}

// Initialize the rotation speed from the slider
rotationSpeed = parseInt(speedSlider.value, 10);