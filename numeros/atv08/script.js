// script.js

// Elements
const recordButton = document.getElementById('start-recording');
const nameBlank = document.getElementById('name-blank');
const ageBlank = document.getElementById('age-blank');
const output = document.getElementById('output');

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

    // Handle the recognition results
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        const parts = transcript.split(',');

        if (parts.length >= 2) {
            // Assume first part is the name and second part includes the age
            nameBlank.textContent = parts[0].trim();
            const ageMatch = parts[1].match(/\d+/); // Extract number for age
            ageBlank.textContent = ageMatch ? ageMatch[0] : 'unknown';
        } else {
            output.textContent = 'Could not understand. Try again!';
        }
    });

    // Handle recognition errors
    recognition.addEventListener('error', (event) => {
        output.textContent = `Error: ${event.error}`;
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
