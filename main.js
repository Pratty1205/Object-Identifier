img = "";
detection_status = "";
objects = [];

function setup() {
    canvas = createCanvas(700, 450);
    canvas.center();
    coco_model = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "DETECTING..."
}

function model_loaded() {
    console.log("Model is not loaded");
    detection_status = true;
    coco_model.detect(img, getresult());
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(img, 0, 0, 700, 450);
    if (detection_status != "") {
        for (counter = 0; counter < objects.length; counter++) {
            document.getElementById("status").innerHTML = "Detected";
            fill("red");
            percentage = floor(objects[counter].confidence * 100);
            text(objects[counter].label + "   " + percentage + "%", objects[counter].x, objects[counter].y);
            nofill();
            stroke("red");
            rect(objects[counter].x, objects[counter].y, objects[counter].width, objects[counter].height);
        }
    }
}

function getresult(result, error) {
    if (result) {
        console.log(result);
        objects = result;
    } else {
        console.log(error);
    }
}