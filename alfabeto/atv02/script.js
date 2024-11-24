document.addEventListener("DOMContentLoaded", () => {
  const audioButton = document.querySelector(".audio-icon"); // Botão de áudio
  const options = document.querySelectorAll(".letter"); 
  const feedback = document.getElementById("feedback"); 
  const nextButton = document.getElementById('next-button');

  let nextLetter = "j"; 
  let audioPlayed = false; // Para garantir que o áudio foi tocado antes da seleção

  // Redirecionar ao clicar no botão "Próximo"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      window.location.href = "/alfabeto/atv03/atv03.html";
    });
  } else {
    console.error('Botão "Próximo" não encontrado!');
  }

  // Reproduzir o som ao clicar no botão de áudio
  audioButton.addEventListener("click", () => {
    const audioPath = audioButton.getAttribute("data-audio");
    const audio = new Audio(audioPath);
    audio.play();

    audioPlayed = true; 
  });

  // Verificar a seleção do usuário
  options.forEach((option) => {
    option.addEventListener("click", () => {
      if (audioPlayed) {
        const selectedLetter = option.getAttribute("data-pair"); // Captura a letra selecionada

        // Verificar se a letra selecionada é a correta
        if (selectedLetter === nextLetter) {
          feedback.textContent = "Correto! 🎉";
          feedback.style.color = "green"; 
          
          // Desabilitar o botão de opção correta
          option.style.pointerEvents = "none"; // Desabilitar a interação com a letra correta
          option.style.backgroundColor = "lightgreen"; 

          // Avançar para a próxima letra após o acerto
          nextLetter = getNextLetter(nextLetter); 
        } else {
          feedback.textContent = "Tente novamente! ❌";
          feedback.style.color = "red";

          setTimeout(() => {
            feedback.textContent = "";
          }, 3000);
        }
      }
    });
  });

  // Função que determina a próxima letra da sequência
  function getNextLetter(currentLetter) {
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const currentIndex = alphabet.indexOf(currentLetter);
    return alphabet[currentIndex + 1] || null;
  }
});
