// Select the elements
const audio = document.getElementById('myAudio');
const video = document.getElementById('myVideo');
const audioTimer = document.getElementById('audioTimer');
const videoTimer = document.getElementById('videoTimer');

// Function to format seconds into MM:SS
function formatTime(seconds) {
    let mins = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = '0' + secs;
    return mins + ':' + secs;
}

// Update Audio Time
audio.addEventListener('timeupdate', () => {
    audioTimer.innerText = formatTime(audio.currentTime);
});

// Update Video Time
video.addEventListener('timeupdate', () => {
    videoTimer.innerText = formatTime(video.currentTime);
});