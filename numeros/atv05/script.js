// script.js
const playButton = document.getElementById('play-audio');
const repeatButton = document.querySelector('.repeat-button');
const nextButton = document.querySelector('.next-button');

// Audio file path
const audio = new Audio('audio/numbers-11-20.mp3');

// Play audio on button click
playButton.addEventListener('click', () => {
    audio.play();
});

// Repeat functionality
repeatButton.addEventListener('click', () => {
    audio.currentTime = 0;
    audio.play();
});

// Next button functionality
nextButton.addEventListener('click', () => {
    alert('Indo para a próxima pergunta...');
    // Add logic to navigate to the next question
});
