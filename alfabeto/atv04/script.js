document.addEventListener("DOMContentLoaded", () => {
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");
  const feedback = document.getElementById("feedback"); // Seleciona o feedback
  const nextButton = document.getElementById("next-button"); // Botão de próximo, se existir

  let nextLetter = "E"; // Letra que falta
  let audioPlayed = false; // Garantir que o áudio foi tocado antes da interação

  // Redirecionar ao clicar no botão "Próximo"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      window.location.href = "/alfabeto/atv05/index05.html";
    });
  } else {
    console.error('Botão "Próximo" não encontrado!');
  }

  // Evento de dragstart para os draggables
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  // Evento para as zonas de drop
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("hover");
    });

    zone.addEventListener("dragleave", () => {
      zone.classList.remove("hover");
    });

    zone.addEventListener("drop", (e) => {
      const dragged = document.querySelector(".dragging");
      const draggedLetter = dragged.dataset.letter;

      // Verifica se a letra arrastada é a correta
      if (draggedLetter === zone.dataset.letter) {
        zone.textContent = dragged.textContent;
        zone.classList.remove("hover");
        dragged.remove();

        // Exibe o feedback positivo
        feedback.textContent = "Correto! 🎉";
        feedback.style.color = "green";

        // Desabilita a interação com a letra correta
        dragged.style.pointerEvents = "none"; // Evita novas interações
        dragged.style.backgroundColor = "lightgreen"; // Opção correta aparece como desativada

        // Avançar para a próxima letra
        nextLetter = getNextLetter(nextLetter);
      } else {
        feedback.textContent = "Tente novamente! ❌";
        feedback.style.color = "red";

        // Restaura a letra após 2 segundos se a escolha estiver errada
        setTimeout(() => {
          feedback.textContent = "";
          dragged.style.display = "inline-block"; // Restaura a visibilidade da letra
        }, 2000);
      }
    });
  });

  // Função para determinar a próxima letra
  function getNextLetter(currentLetter) {
    const alphabet = ["H", "E", "L", "L", "O"]; // Selecione as letras específicas
    const currentIndex = alphabet.indexOf(currentLetter);
    return alphabet[currentIndex + 1] || null;
  }
});
