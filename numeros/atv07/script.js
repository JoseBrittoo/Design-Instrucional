// script.js
const playButton = document.getElementById('play-audio');
const submitButton = document.getElementById('submit-answer');
const userInput = document.getElementById('user-input');

// Path to the audio file
const audio = new Audio('audio/number-audio.mp3');

// Play audio on button click
playButton.addEventListener('click', () => {
    audio.play();
});

// Submit answer and validate
submitButton.addEventListener('click', () => {
    const userAnswer = userInput.value.trim();
    const correctAnswer = '5'; // Replace with the correct number for the audio

    if (userAnswer === correctAnswer) {
        alert('Parabéns! Você acertou!');
    } else {
        alert('Ops! Tente novamente.');
    }
});
