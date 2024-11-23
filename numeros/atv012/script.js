// script.js

// Função para verificar a resposta
const submitButton = document.getElementById('submit-button');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');

submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    if (userAnswer === 'two') {
        feedback.textContent = 'Parabéns! Resposta correta.';
        feedback.style.color = 'green';
    } else {
        feedback.textContent = 'Resposta incorreta. Tente novamente!';
        feedback.style.color = 'red';
    }
});
