// Exemplo básico de interação
const letters = document.querySelectorAll('.letter');
const soundButtons = document.querySelectorAll('.sound-button');

// Adiciona interação ao clicar nas letras
letters.forEach((letter, index) => {
  letter.addEventListener('click', () => {
    alert(`Você clicou na letra: ${letter.textContent}`);
  });
});

// Adiciona interação ao clicar nos botões de som
soundButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    alert(`Você clicou no botão de som ${index + 1}`);
  });
});
