song="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist =0;
song1_status ="";
song2_status ="";
function preload() {
    song= loadSound("music.mp3");
    song2= loadSound("music2.mp3");
    }
function setup() {
    canvas=createCanvas(800,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log('poseNet Is Initialized');
}
function draw() {
    image(video,0,0,800,600);
    song1_status=song.isPlaying();
    song2_status=song2.isPlaying();

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        song.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing song 2 ";
        }
    }

    
}
function gotPoses(results)
 {
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("leftWristX ="+leftWristX+"leftWristY = "+ leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX ="+rightWristX+"rightWristY = "+ rightWristY);
    }
 }