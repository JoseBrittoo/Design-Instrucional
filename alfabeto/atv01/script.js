// Seleciona os elementos
const letters = document.querySelectorAll('.letter');
const soundButtons = document.querySelectorAll('.sound-button');
const nextButton = document.getElementById('next-button');

// Interação ao clicar nas letras
letters.forEach((letter) => {
  letter.addEventListener('click', () => {
    alert(`Você clicou na letra: ${letter.textContent}`);
  });
});

// Interação ao clicar nos botões de som
soundButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    alert(`Você clicou no botão de som ${index + 1}`);
  });
});

// Redirecionar ao clicar no botão "Próximo"
if (nextButton) {
  nextButton.addEventListener('click', () => {
    window.location.href = '/alfabeto/atv02/atv02.html';
  });
} else {
  console.error('Botão "Próximo" não encontrado!');
}
