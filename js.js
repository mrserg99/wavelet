const ctxImg = document.getElementById('image').getContext('2d')
const pixelSpan = document.getElementById('max-pixel-count')
var canvas = document.getElementById('image');
var canvasMin = document.getElementById('min')
var canvasMax = document.getElementById('max')

function getImageBrightness(imageSrc, callback) {
    var img = document.createElement('img'),
        colorSum = 0,
        i = 0,
        len,
        canvas,
        ctx,
        imageData,
        data,
        brightness,
        r,
        g,
        b,
        avg;

    img.src = imageSrc;
    img.style.display = 'none';

    document.body.appendChild(img);

    img.onload = function () {
        canvas = document.getElementById("image");
        canvas.width = 450;
        canvas.height = 400;

        ctx = canvas.getContext('2d');
        ctx.drawImage(this, 0, 0, 450, 400);

        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        imageDataMin = dataMin.getImageData(0,0, 450,400);
        imageDataMax = dataMax.getImageData(0,0, 450,400);

        data = imageData.data;
        dataMin = imageDataMin.dataMin;
        dataMax = imageDataMax.dataMax;

        for (var i = 0; i < data.length; i += 4) {
            let red = data[i], green = data[i + 1], blue = data[i + 2];


            var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg; // red
            data[i + 1] = avg; // green
            data[i + 2] = avg; // blue

          //  data1=data[i];

            data[i+2] = avg + data[i+1] ;
            data[i+1] = avg - data[i+1];
        }
        ctxImg.putImageData(imageData, 0, 0);

        brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
    };
}


getImageBrightness('./pic1.jpg', function (brightness) {
  //  alert(brightness);
   // console.log(brightness);
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