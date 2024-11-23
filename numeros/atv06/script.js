// script.js
const playButton = document.getElementById('play-audio');

// Path to the audio file
const audio = new Audio('audio/question-audio.mp3');

// Play audio when button is clicked
playButton.addEventListener('click', () => {
    audio.play();
});
