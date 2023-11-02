var canvas = document.getElementById('img');
var canvas1 = document.getElementById('img1');
var canvas2 = document.getElementById('img2');
var canvasMin = document.getElementById('min')
var canvasMax = document.getElementById('max')

function getImageBrightness(imageSrc, callback) {
    var img = document.createElement('img');
    var img1 = document.createElement('img1');
    var img2 = document.createElement('img2');

    img.src = imageSrc;
    img.style.display = 'none';

    document.body.appendChild(img);

    img.onload = function () {
        canvas.width = 1500;
        canvas.height = 500;

        let ctx = canvas.getContext('2d');
        let ctx1 = canvas1.getContext('2d');
        let ctx2 = canvas2.getContext('2d');
        ctx.drawImage(this, 0, 0, 450, 400);

        let imageData = ctx.getImageData(0, 0, 450, 400);
        let data = imageData.data;
        let p = 0
        let brightnessPixel = [];
        for (let i = 0, len = data.length; i < len; i += 4, p++) {
            let r = data[i];
            let g = data[i + 1];
            let b = data[i + 2];
            brightnessPixel[p] = (2 * r + g + 3 * b) / 6;
        }

        let newImage = ctx1.createImageData(450, 400)
        let secImage = ctx2.createImageData(450, 400)
        let halfSumHalfDiff = []
        let halfSum = []
        let halfDiff = []

        for (let briIndex = 0, t = 0; briIndex < brightnessPixel.length; briIndex += 2, t++) {
            halfSum[t] = halfSumHalfDiff[briIndex] = (brightnessPixel[briIndex] + brightnessPixel[briIndex+1])/2;
            halfDiff[t] = halfSumHalfDiff[briIndex+1] = (brightnessPixel[briIndex] - brightnessPixel[briIndex+1])/2;
        }

        for (let briIndex = 0, newImageIndex = 0;
                briIndex < brightnessPixel.length; briIndex++, newImageIndex += 4) {
            newImage.data[newImageIndex] = halfSumHalfDiff[briIndex];
            newImage.data[newImageIndex+1] = halfSumHalfDiff[briIndex];
            newImage.data[newImageIndex+2] = halfSumHalfDiff[briIndex];
            newImage.data[newImageIndex+3] = 255;
        }

        let mode = false
        for (let halfIndex = 0, modeIndex = 0, newImageIndex = 0;
                halfIndex < secImage.data.length; halfIndex++, newImageIndex += 4) {
            if (mode) {
                secImage.data[newImageIndex] = halfDiff[halfIndex];
                secImage.data[newImageIndex + 1] = halfDiff[halfIndex];
                secImage.data[newImageIndex + 2] = halfDiff[halfIndex];
                secImage.data[newImageIndex + 3] = 255;
            } else {
                secImage.data[newImageIndex] = halfSum[halfIndex];
                secImage.data[newImageIndex + 1] = halfSum[halfIndex];
                secImage.data[newImageIndex + 2] = halfSum[halfIndex];
                secImage.data[newImageIndex + 3] = 255;
            }
            modeIndex++;
            if (modeIndex === secImage.width/2) {
                modeIndex = 0;
                mode = !mode;
            }
        }

        ctx1.putImageData(newImage, 500, 0);
        ctx2.putImageData(secImage, 1000, 0);
    };
}

getImageBrightness('./pic1.jpg', function (brightness) {
    console.log(brightness);
});


document.getElementById('btn-download').addEventListener('click', function(e) {
    let canvasUrl = canvas.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "cat_img";
    createEl.click();
    createEl.remove();
});
document.getElementById('btn-download1').addEventListener('click', function(e) {
    let canvasUrl = canvas1.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "cat_img1";
    createEl.click();
    createEl.remove();
});
document.getElementById('btn-download2').addEventListener('click', function(e) {
    let canvasUrl = canvas2.toDataURL("image/jpeg", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "cat_img2";
    createEl.click();
    createEl.remove();
});