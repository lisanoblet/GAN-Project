var gui = new dat.GUI();
var params = {
    Ellipse_Size: 30,
    Vitesse: 0,
    Download_Image: function () { return save(); },
    Nombre: 0,
};
gui.add(params, "Download_Image");
gui.add(params, "Vitesse", 1, 15, 1);
gui.add(params, "Nombre", 0, 30, 1);
var img;
function draw() {
    if (img)
        image(img, 0, 0, width, height);
}
function setup() {
    p6_CreateCanvas();
    var model = new rw.HostedModel({
        url: "https://stylegan-9d4f8d9c.hosted-models.runwayml.cloud/v1/",
        token: "8qc1au2OaebjTFSjwL6QLg==",
    });
    for (var i = 0; i < 50; ++i) {
        var z = [];
        for (var i_1 = 0; i_1 < 512; i_1++) {
            z[i_1] = random(-0.5, 0.5);
        }
        var inputs = {
            "z": z,
            "truncation": 0.8,
        };
        model.query(inputs).then(function (outputs) {
            var image = outputs.image;
            img = createImg(image);
        });
    }
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map