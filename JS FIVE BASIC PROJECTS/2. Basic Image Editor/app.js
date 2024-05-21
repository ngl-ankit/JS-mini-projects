const upload = document.getElementById('upload');
const canvas = document.getElementById('imageCanvas');
const ctx = canvas.getContext('2d');
const cropButton = document.getElementById('crop');
const resizeButton = document.getElementById('resize');
const filterButton = document.getElementById('filter');

let image = new Image();
let startX, startY, endX, endY;
let cropping = false;

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

image.onload = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
};

canvas.addEventListener('mousedown', (e) => {
    startX = e.offsetX;
    startY = e.offsetY;
    cropping = true;
});

canvas.addEventListener('mousemove', (e) => {
    if (cropping) {
        endX = e.offsetX;
        endY = e.offsetY;
        drawRect();
    }
});

canvas.addEventListener('mouseup', () => {
    cropping = false;
});

function drawRect() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, endX - startX, endY - startY);
}

cropButton.addEventListener('click', () => {
    const width = endX - startX;
    const height = endY - startY;
    const imageData = ctx.getImageData(startX, startY, width, height);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(imageData, 0, 0);
});

resizeButton.addEventListener('click', () => {
    const width = prompt('Enter new width:', canvas.width);
    const height = prompt('Enter new height:', canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = width;
    canvas.height = height;
    ctx.putImageData(imageData, 0, 0);
});

filterButton.addEventListener('click', () => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg;     // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }

    ctx.putImageData(imageData, 0, 0);
});
