// script.js

// Check for browser support for Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recordButton = document.getElementById('start-recording');
const output = document.getElementById('output');

if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US'; // Define o idioma como inglês
    recognition.interimResults = false; // Retorna apenas resultados finais
    recognition.maxAlternatives = 1; // Retorna a melhor correspondência

    // Evento para iniciar o reconhecimento de fala
    recordButton.addEventListener('click', () => {
        output.textContent = 'Listening...';
        recognition.start();
    });

    // Evento para capturar o resultado do reconhecimento
    recognition.addEventListener('result', (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = `You said: "${transcript}"`;
    });

    // Evento para lidar com erros
    recognition.addEventListener('error', (event) => {
        output.textContent = `Error: ${event.error}`;
    });
} else {
    output.textContent = 'Speech recognition is not supported in this browser.';
}
