prediction="";

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}
console.log("ml5 version"+ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/ybknGSsRJ/model.json',modelLoaded);

function modelLoaded(){
    console.log("modelLoaded")
}


function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }

    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
       
         toSpeak="";
        if(results[0].label=="amazing"){
            toSpeak="This Is Amazing";
             document.getElementById("update_gesture").innerHTML="&#128076;";
        }
         else if(results[0].label=="best"){
            toSpeak="This Is THe Best";
            document.getElementById("update_gesture").innerHTML="&#128077;";
        } 
          else if(results[0].label=="victory"){
            toSpeak="This Is Victory";
            document.getElementById("update_gesture").innerHTML="&#9996;";
        }

      speak();
    }

}
function speak(){
    var synth=window.speechSynthesis;
    speak_data=toSpeak;
       var utterThis=new speakSynthesisUtterence(speak_data);
    synth.speak(utterThis);

}


