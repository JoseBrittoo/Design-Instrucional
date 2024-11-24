document.addEventListener("DOMContentLoaded", () => {
  const letters = document.querySelectorAll(".letter");
  const soundButtons = document.querySelectorAll(".sound-button");
  const feedback = document.getElementById("feedback");
  const nextButton = document.getElementById('next-button');

  let selectedLetter = null; // Para armazenar a letra selecionada
  let selectedSound = null; // Para armazenar o som selecionado

  // Redirecionar ao clicar no botão "Próximo"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      window.location.href = "/alfabeto/atv02/atv02.html";
    });
  } else {
    console.error('Botão "Próximo" não encontrado!');
  }

  // Reproduzir o som ao clicar no botão
  soundButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const audioPath = button.getAttribute("data-audio");
      const audio = new Audio(audioPath);
      audio.play();

      selectedSound = button.getAttribute("data-pair"); // Capturar o som selecionado
      checkPair(); // Verificar se formou o par correto
    });
  });

  // Marcar a letra selecionada
  letters.forEach((letter) => {
    letter.addEventListener("click", () => {
      selectedLetter = letter.getAttribute("data-pair"); // Capturar a letra selecionada
      checkPair(); // Verificar se formou o par correto
    });
  });

  // Verificar se a letra e o som correspondem
  function checkPair() {
    if (selectedLetter && selectedSound) {
      // Aqui verifica se o som e a letra combinam corretamente
      const correctAudioForLetter = document.querySelector(
        `.sound-button[data-pair="${selectedLetter}"]`
      );

      if (
        correctAudioForLetter &&
        correctAudioForLetter.getAttribute("data-pair") === selectedSound
      ) {
        feedback.textContent = "Par correto! 🎉";
        feedback.style.color = "green";

        // Desativar os itens que já foram encontrados
        const correctLetter = document.querySelector(
          `.letter[data-pair="${selectedLetter}"]`
        );
        correctLetter.style.pointerEvents = "none";
        correctLetter.style.backgroundColor = "lightgreen";

        const correctButton = document.querySelector(
          `.sound-button[data-pair="${selectedSound}"]`
        );
        correctButton.style.pointerEvents = "none";
        correctButton.style.backgroundColor = "lightgreen";

        // Resetar seleção
        selectedLetter = null;
        selectedSound = null;
      } else {
        feedback.textContent = "Tente novamente! ❌";
        feedback.style.color = "red";

        setTimeout(() => {
          feedback.textContent = "";
        }, 2000); // Feedback desaparece após 2 segundos

        // Resetar seleção
        selectedLetter = null;
        selectedSound = null;
      }
    }
  }
});
