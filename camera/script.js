// fetching the video tag
let videoPlayer = document.querySelector("video");
let recordBtn = document.querySelector("#record");
let captureBtn = document.querySelector("#capture");
let body = document.querySelector("body");
let mediaRecorder;
let chunks = [];
let isRecording = false
let filter = "";
let currZoom = 1 // min = 1 and max = 3

let zoomIn = document.querySelector(".in");
let zoomOut = document.querySelector(".out");
let galleryBtn = document.querySelector("#gallery");

galleryBtn.addEventListener("click", function() {
    location.assign("gallery.html");
});

zoomIn.addEventListener("click", function() {
    currZoom = currZoom + 0.1;
    if (currZoom > 3) currZoom = 3;
    console.log(currZoom);
    videoPlayer.style.transform = `scale(${currZoom})`;
});

zoomOut.addEventListener("click", function() {
    currZoom = currZoom - 0.1;
    if (currZoom < 1) currZoom = 1;
    console.log(currZoom);
    videoPlayer.style.transform = `scale(${currZoom})`
});

let allFilters = document.querySelectorAll(".filter");

for (let i = 0; i < allFilters.length; i++) {
    allFilters[i].addEventListener("click", function(e) {
        let previousFilter = document.querySelector(".filter-div");

        if (previousFilter) previousFilter.remove();

        let color = e.currentTarget.style.backgroundColor;
        console.log(color);
        filter = color;
        let div = document.createElement("div");
        div.classList.add("filter-div");
        div.style.backgroundColor = color;
        body.append(div);
    });
}


captureBtn.addEventListener("click", function() {
    let innerSpan = captureBtn.querySelector("span");

    innerSpan.classList.add("capture-animation");
    setTimeout(function() {
        innerSpan.classList.remove("capture-animation");
    }, 1000)


    let canvas = document.createElement("canvas");
    canvas.width = videoPlayer.videoWidth; // yaha jitni videoPlayer width and height le rha hai vo de dega
    canvas.height = videoPlayer.videoHeight;


    let tool = canvas.getContext("2d");
    // top left to center
    tool.translate(canvas.width / 2, canvas.height / 2);
    // zoom basically stretch kra canvas ko
    tool.scale(currZoom, currZoom);
    // wapis top left pr leaye origin
    tool.translate(-canvas.width / 2, -canvas.height / 2);


    tool.drawImage(videoPlayer, 0, 0);

    if (filter != "") {
        tool.fillStyle = filter;
        tool.fillRect(0, 0, canvas.width, canvas.height);
    }


    let url = canvas.toDataURL();
    canvas.remove();


    saveMedia(url);
    // let a = document.createElement("a");
    // a.href = url;
    // a.download = "image.png";
    // a.click();
    // a.remove();
});


recordBtn.addEventListener("click", function() {

    let innerSpan = recordBtn.querySelector("span");

    let previousFilter = document.querySelector(".filter-div");

    if (previousFilter) previousFilter.remove();

    filter = "";

    if (isRecording) {
        // agar isRecording true ha to humme recording ko stop krna hai
        mediaRecorder.stop();
        isRecording = false;
        innerSpan.classList.remove("record-animation")
    } else {
        // agar isRecording false hai to humme usse start krna hai
        mediaRecorder.start();

        currZoom = 1;
        videoPlayer.style.transform = `scale(${currZoom})`;
        isRecording = true;
        innerSpan.classList.add("record-animation");
    }
});

// getUserMedia function return a promsie which contains the user preference of reslove and reject

// mediaDevices and getUserMedia inbult funcion hai browser k
let promiseToUseCamera = navigator.mediaDevices.getUserMedia({
    video: true, // default ye dono false hote hai
    audio: true
});

// agar promise true hai to ye chlega or agar false hai to catch me gir jayega
promiseToUseCamera.then(function(mediaStream) {

    // hamare pas video tag me koi source nahi hai to srcObject keyword ki help se mediaStreamn ko uske anadr dal rhe hai 
    // mediaStream -> ye browser humme deta hai ki jo bhi audio and video aa rhi h vo mediaStream object mai ayege 
    videoPlayer.srcObject = mediaStream;


    // mediarecoder ka object bana rhe hai and mediaStream uske andar dal rhe hai
    mediaRecorder = new MediaRecorder(mediaStream);


    // isme sara data aa rha hai jab recoring start ho jayege
    mediaRecorder.addEventListener("dataavailable", function(e) {
        chunks.push(e.data);
    });


    // jab stopm hogi to chnks bnaye humne or unko combined kr lia using browser function
    // BLOB= LARGE BINARY FILE  
    mediaRecorder.addEventListener("stop", function(e) {
        let blob = new Blob(chunks, {
            type: "video/mp4"
        });

        chunks = [];

        // let link = URL.createObjectURL(blob); // create object URL se is video ka url nikal lage
        saveMedia(blob);

        // creating a anchor tag and giving reference of video to it and download property and clicking on the record button by the javaScript
        // let a = document.createElement("a");
        // a.href = link;
        // a.download = "video.mp4";
        // a.click();
        // a.remove();
    });

}).catch(function() {
    console.log("User has denied the access of camera and audio");
});