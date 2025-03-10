//https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
const dropArea = document.getElementById("drop-area");
const track = document.getElementById("track");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const playAndPauseBtn = document.getElementById("play-and-pause-button");
const titleSong = document.getElementById("song-title");
const progressBar = document.getElementById("progress-bar");
const volumeInput = document.getElementById("volume");
const timer = document.getElementById("timer");

const resetButtonsStyles = ()=>{
    playIcon.classList.remove("hide-icon");
    pauseIcon.classList.add("hide-icon");
}

const handlerDrop = (ev) => {
  ev.preventDefault();
  const trackFile = ev.dataTransfer.files[0];
  const urlFile = URL.createObjectURL(trackFile);
  titleSong.innerHTML = trackFile.name;
  track.setAttribute("src", urlFile);

  resetButtonsStyles();
};
dropArea.addEventListener("dragover", (ev) => {
  ev.preventDefault();
});

dropArea.addEventListener("drop", handlerDrop);

track.addEventListener("canplaythrough",(e)=>{
  progressBar.max = track.duration;
})

track.addEventListener("timeupdate", (e) => {
  progressBar.value = track.currentTime;
  let minutes = String(Math.trunc(track.currentTime / 60)).padStart(2,0);
  let seconds = String(Math.trunc(track.currentTime) - (60*minutes)).padStart(2,0);
  console.log(track.currentTime);
  
  timer.innerText = `${minutes}:${seconds}`;
});

track.addEventListener("ended",(e)=>{
  resetButtonsStyles();
  track.load();
})

playAndPauseBtn.addEventListener("click", () => {
  // Play
  if (track.readyState === 4 && track.paused === true) {
    track.play();
    //hide the play icon
    playIcon.classList.toggle("hide-icon");
    //show the pause icon
    pauseIcon.classList.toggle("hide-icon");
  }
  //Pause
  else if (track.readyState === 4 && track.paused === false) {
    track.pause();
    //show the play icon
    playIcon.classList.toggle("hide-icon");
    //hide the pause icon
    pauseIcon.classList.toggle("hide-icon");
  } 
});

volumeInput.addEventListener("change",(e)=>{
  track.volume = e.target.value
})

