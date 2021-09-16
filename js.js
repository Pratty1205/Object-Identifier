objectDetector = "";

img = "";
objects = [];
detection_status = "";

function preload() {
    img = loadImage('dog_cat.jpg');
}


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    video = createCapture(VIDEO);
    video.hide();

}

function modelLoaded() {
    console.log("Model Loaded!")
    detection_status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (detection_status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("no_of_objects").innerHTML = objects.length + " Objects Detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}