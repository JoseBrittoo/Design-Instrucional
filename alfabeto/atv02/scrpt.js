// script.js
const nextButton = document.getElementById('next-button');

document.querySelector('.audio-button').addEventListener('click', function () {
    alert('Audio playing!');
});

// Redirecionar ao clicar no botão "Próximo"
if (nextButton) {
    nextButton.addEventListener('click', () => {
      window.location.href = '/alfabeto/atv03/atv03.html';
    });
  } else {
    console.error('Botão "Próximo" não encontrado!');
  }
