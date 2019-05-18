const canvas = document.querySelector('canvas');
const download = document.querySelector('.download');
const context = canvas.getContext('2d');

//Styles
context.strokeStyle = 'white';
context.fillStyle = 'black';
context.lineWidth = 10;

let currentText = '', currentImage, currentPosition = 'top';

//Image
document.querySelectorAll('.select-image img').forEach(img => {
    img.addEventListener('click', ev => {
        currentImage = img;
        draw();
    })
});

//Text
document.querySelector('.select-text').addEventListener('input', e => {
    currentText = e.target.value;
    draw();
});

//Position
document.querySelector('.select-position input').addEventListener('change', e => {
    currentPosition = e.target.checked ? 'bottom' : 'top';
    draw();
});


function draw() {
    if (currentImage) {
        context.drawImage(currentImage, 0, 0, 500, 500);
    } else {
        context.clearRect(0, 0, 500, 500);
    }

    context.font = '48px impact';
    const lines = currentText.split('\n');
    let offset = (currentPosition === 'bottom') ? 480 - (lines.length * 50) : 10;

    lines.forEach((line, index) => {
        const posY = (50 * ++index) + offset;
        context.strokeText(line, 20, posY, 460);
        context.fillText(line, 20, posY, 460);
    });

    if (currentImage && currentText) {
        download.hidden = false;
        download.href = canvas.toDataURL();
    } else {
        download.hidden = true;
    }
}