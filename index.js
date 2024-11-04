const dropArea = document.getElementById("drop-area");
const track = document.getElementById("track");
const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button")

dropArea.addEventListener("dragover",(ev)=>{
    ev.preventDefault();
});

const handlerDrop = (ev) =>{
    ev.preventDefault();
    const trackFile = ev.dataTransfer.files[0];
    const urlFile = URL.createObjectURL(trackFile);
    track.setAttribute("src",urlFile);
}

dropArea.addEventListener("drop",handlerDrop);

//Todo: Progress bar
track.addEventListener("timeupdate",(e)=>{
    //console.log(song.currentTime);
});

playButton.addEventListener("click",()=>{
    if(track.readyState == 4){
        track.play();
    }
});

pauseButton.addEventListener("click",()=>{
    if(track.readyState == 4){
        track.pause();
    }
});





