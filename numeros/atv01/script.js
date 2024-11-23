// script.js
const numbersAudio = {
    0: "audio/zero.mp3",
    1: "audio/one.mp3",
    2: "audio/two.mp3",
    // Add paths for numbers 3 to 20
};

const audioButtons = document.querySelectorAll('.audio-button');

// Add event listeners to play audio
audioButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        const audio = new Audio(numbersAudio[number]);
        audio.play();
    });
});
