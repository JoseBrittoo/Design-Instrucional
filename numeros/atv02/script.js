// script.js
const options = document.querySelectorAll('.option');

options.forEach(option => {
    option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        
        // Simulate audio playback
        const audio = new Audio(`audio/option-${value}.mp3`);
        audio.play();

        // Check if the selected option is correct
        if (value === "2") {
            alert("Parabéns! Resposta correta.");
        } else {
            alert("Ops! Tente novamente.");
        }
    });
});
