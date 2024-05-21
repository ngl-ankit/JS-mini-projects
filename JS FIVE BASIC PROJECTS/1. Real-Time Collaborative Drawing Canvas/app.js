const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const clearButton = document.getElementById('clear');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');

let drawing = false;
let currentColor = '#000000';
let currentBrushSize = 5;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', draw);

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

brushSize.addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
});

function draw(event) {
    if (!drawing) return;

    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = 'round';

    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}
