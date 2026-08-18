let playButton = document.getElementById("play-button"); 
let currentTime = document.getElementById("current-time");
let duration = document.getElementById("duration");

let audio = new Audio("audio/Sunset Blvd.mp3");

let songs = ["audio/Sunset Blvd.mp3","audio/Need.mp3"]
let currentSong = 0;

let previousButton = document.getElementById("previous-song");
let nextButton = document.getElementById("next-song");

let progressBar = document.getElementById("progress-bar");

let songName = document.getElementById("song-name");
let artistName = document.getElementById("artist-name");

playButton.addEventListener("click", playSong);
function playSong() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
}

let songNames = ["Sunset Blvd","Need"];
let artistNames = ["Selena Gomez", "Taylor Swift"];
function loadSong () {
    audio.src = songs[currentSong];
    audio.load();
    songName.textContent = songNames[currentSong];
    artistName.textContent = artistNames[currentSong];
}

nextButton.addEventListener("click", nextSong);
function nextSong() {
    currentSong +=1;
    let songIndex = songs.length;
    if (currentSong >= songIndex) {
        currentSong = 0;
    }
    loadSong();
    audio.play();
}
audio.addEventListener("ended", nextSong);


previousButton.addEventListener("click", previousSong);
function previousSong() {
    currentSong -=1;
    let songIndex = songs.length;
    if (currentSong < 0) {
        currentSong = songIndex - 1;
    }
    loadSong();
    audio.play();
}


function setDuration() {
    progressBar.max = audio.duration;
}

function updateProgress() {
    progressBar.value = audio.currentTime;
}

function changeTime() {
    audio.currentTime = progressBar.value;
}

audio.addEventListener("loadedmetadata", setDuration);
audio.addEventListener("timeupdate", updateProgress);
progressBar.addEventListener("input", changeTime);


function updateCurrentTime () {
    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);

    if (seconds < 10) {
    seconds = "0" + seconds;
    }
    currentTime.textContent = minutes + ":" + seconds;
}

audio.addEventListener("timeupdate", updateCurrentTime);


function updateDuration() {
    let minutes = Math.floor(audio.duration / 60);
    let seconds = Math.floor(audio.duration % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    duration.textContent = minutes + ":" + seconds;
}
audio.addEventListener("loadedmetadata", updateDuration);




loadSong();