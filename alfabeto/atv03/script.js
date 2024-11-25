// script.js
document.addEventListener("DOMContentLoaded", () => {
  const audioButton = document.querySelector('.audio-button');
  const inputBoxes = document.querySelectorAll(".input-area span");
  const nextButton = document.getElementById('next-button');
  const correctWord = ["A", "B", "A", "C", "A", "X", "I"]; // Palavra correta
  let currentInputIndex = 0; // Índice atual do input
  let userInput = [];

  // Redirecionar ao clicar no botão "Próximo"
  if (nextButton) {
      nextButton.addEventListener("click", () => {
          window.location.href = "/alfabeto/atv04/index04.html";
      });
  } else {
      console.error('Botão "Próximo" não encontrado!');
  }

  // Reprodução do áudio
  if (audioButton) {
      audioButton.addEventListener("click", () => {
          const audioPath = audioButton.getAttribute("data-audio");
          if (audioPath) {
              try {
                  const audio = new Audio(audioPath);
                  audio.play().catch((error) => {
                      console.error('Erro ao tentar reproduzir o áudio:', error);
                  });
              } catch (error) {
                  console.error('Erro ao inicializar o áudio:', error);
              }
          } else {
              console.error('Caminho do áudio não definido!');
          }
      });
  } else {
      console.error('Botão de áudio não encontrado!');
  }

  // Capturar o evento de digitação das letras
  document.addEventListener("keydown", (event) => {
      const typedLetter = event.key.toUpperCase(); // Converter a letra digitada para maiúscula

      // Verificar ainda há espaço para digitar
      if (event.key === "Backspace") {
        if (currentInputIndex > 0) {
            currentInputIndex--; // Retroceder para o campo anterior
            inputBoxes[currentInputIndex].textContent = ''; // Apagar o conteúdo
            inputBoxes[currentInputIndex].classList.remove("correct", "incorrect"); // Resetar estilos
            userInput[currentInputIndex] = ''; // Limpar o valor no array
        }
      } else {
        // Verificar se ainda há espaço para digitar
        if (currentInputIndex < correctWord.length) {
            userInput[currentInputIndex] = typedLetter; // Armazenar a letra digitada
            inputBoxes[currentInputIndex].textContent = typedLetter; // Exibir a letra no campo correspondente
            inputBoxes[currentInputIndex].classList.remove("correct", "incorrect"); // Resetar estilos
            currentInputIndex++;

            // Verificar se o usuário terminou de digitar todas as letras
            if (currentInputIndex === correctWord.length) {
                validateInput(); // Validar a palavra digitada
            }
        }
      }
  });

  // Função para validar a entrada do usuário
  function validateInput() {
    let isCorrect = true; // Flag para verificar se a palavra está correta

    // Comparar cada letra digitada com a palavra correta
    userInput.forEach((letter, index) => {
        if (letter === correctWord[index]) {
            inputBoxes[index].classList.add("correct"); // Destacar letra correta
        } else {
            inputBoxes[index].classList.add("incorrect"); // Destacar letra incorreta
            isCorrect = false; // Palavra não está correta
        }
    });

    // Exibir mensagem de feedback
    setTimeout(() => {
        if (isCorrect) {
            alert("Parabéns! Você completou a palavra corretamente! 🎉");
            nextButton.click(); // Avançar para a próxima tela
        } else {
            alert("Há letras incorretas. Por favor, revise e tente novamente!");
            resetInput(); // Permitir que o usuário tente corrigir
        }
    }, 500);
}

// Função para resetar a entrada do usuário
function resetInput() {
    currentInputIndex = 0;
    userInput = []; // Limpar as letras digitadas
}
});

