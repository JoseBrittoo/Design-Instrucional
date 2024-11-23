// script.js

// Elements
const playButton = document.getElementById('play-audio');
const recordButton = document.getElementById('start-recording');
const output = document.getElementById('output');

// Path to the audio file
const audio = new Audio('audio/question-audio.mp3');

// Play the audio when the button is clicked
playButton.addEventListener('click', () => {
    audio.play();
});

// Check for browser support for Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Language for recognition
    recognition.interimResults = false; // Only final results
    recognition.maxAlternatives = 1; // Top match only

    // Start recognition on button click
    recordButton.addEventListener('click', () => {
        output.textContent = 'Listening...';
        recognition.start();
    });

    // Handle recognition results
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = `You said: "${transcript}"`;
    });

    // Handle recognition errors
    recognition.addEventListener('error', (event) => {
        output.textContent = `Error: ${event.error}`;
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
