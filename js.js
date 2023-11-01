function getImageBrightness(imageSrc, callback) {
    var img = document.createElement('img'),
   // var img = document.getElementById("img")
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
        data = imageData.data;

        let brightnessPixel;
        for (i, len = data.length; i < len; i += 4) {
            r = data[i];
            g = data[i + 1];
            b = data[i + 2];
         //   alert()
            brightnessPixel[i] = (2 * r + g + 3 * b) / 6;
            colorSum += avg;
        }


       // brightness = Math.floor(colorSum / (this.width * this.height));
        callback(brightness);
    };
}


getImageBrightness('./pic1.jpg', function (brightness) {
    alert(brightness);
    console.log(brightness);
});

