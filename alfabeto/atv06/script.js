// script.js
const clickableLetters = document.querySelectorAll('.clickable');
const micButton = document.querySelector('.mic-button');

// Event listener for clickable letters
clickableLetters.forEach(letter => {
    letter.addEventListener('click', () => {
        alert(`Letra: ${letter.dataset.letter}`);
    });
});

// Event listener for microphone button
micButton.addEventListener('click', () => {
    alert('Gravação iniciada... Pronuncie as letras na ordem!');
});
