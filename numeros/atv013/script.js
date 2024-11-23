// script.js
let selectedNumber = null;
let selectedWord = null;
const feedback = document.getElementById('feedback');

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        selectedNumber = button;
        button.style.backgroundColor = '#ffcc00';
        resetOtherButtons('.number', button);
    });
});

document.querySelectorAll('.word').forEach(button => {
    button.addEventListener('click', () => {
        selectedWord = button;
        button.style.backgroundColor = '#ffcc00';
        resetOtherButtons('.word', button);
    });
});

function resetOtherButtons(selector, currentButton) {
    document.querySelectorAll(selector).forEach(button => {
        if (button !== currentButton) {
            button.style.backgroundColor = '#fff';
        }
    });
}

document.getElementById('submit-button').addEventListener('click', () => {
    if (!selectedNumber || !selectedWord) {
        feedback.textContent = 'Selecione um número e uma palavra!';
        feedback.style.color = 'red';
        return;
    }

    if (selectedNumber.dataset.pair === selectedWord.dataset.pair) {
        feedback.textContent = 'Parabéns! Você acertou!';
        feedback.style.color = 'green';
        selectedNumber.disabled = true;
        selectedWord.disabled = true;
        selectedNumber.style.backgroundColor = '#90ee90';
        selectedWord.style.backgroundColor = '#90ee90';
    } else {
        feedback.textContent = 'Resposta incorreta! Tente novamente.';
        feedback.style.color = 'red';
    }

    selectedNumber = null;
    selectedWord = null;
    resetOtherButtons('.number');
    resetOtherButtons('.word');
});
