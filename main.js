prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version: ', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yQ9pfZXT0/model.json', modelLoaded)

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var Jay = window.speechSynthesis;
    Lloyd = "The prediction is " + prediction;
    var Cole = new SpeechSynthesisUtterance(Lloyd);
    Jay.speak(Cole);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        prediction = results[0].label;
        if (results[0].label == "Whats up") {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
    
        else if (results[0].label == "Thumbs UP") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
    
        else if (results[0].label == "Thumbs DOWN") {
            document.getElementById("update_emoji").innerHTML = "&#128078;";
        }
        speak();
    }
    
}