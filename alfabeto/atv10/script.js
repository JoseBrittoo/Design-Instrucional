document.addEventListener("DOMContentLoaded", () => {
    const draggables = document.querySelectorAll(".draggable-letter"); // Letras arrastáveis
    const letterBoxes = document.querySelectorAll(".letter-box"); // Campos de lacunas
    const finishButton = document.querySelector(".finish-button"); // Botão de finalizar
    const feedback = document.createElement("div"); // Elemento de feedback dinâmico
    const nextButton = document.getElementById('next-button');
    feedback.id = "feedback";
    document.body.appendChild(feedback);

    // Redirecionar ao clicar no botão "Próximo"
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      window.location.href = "/bases/menu/index.html";
    });
  } else {
    console.error('Botão "Próximo" não encontrado!');
  }
  
    // Adicionar eventos de arrastar às letras
    draggables.forEach((draggable) => {
      draggable.setAttribute("draggable", "true");
  
      // Início do drag
      draggable.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", draggable.textContent); // Armazena o texto da letra
        draggable.classList.add("dragging");
      });
  
      // Fim do drag
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });
  
    // Adicionar eventos de soltar nas lacunas
    letterBoxes.forEach((box) => {
      // Permitir que as letras sejam arrastadas sobre as lacunas
      box.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!box.textContent.trim() || box.textContent.trim() === "_") {
          box.classList.add("hover");
        }
      });
  
      // Remover o estado de hover quando a letra sai
      box.addEventListener("dragleave", () => {
        box.classList.remove("hover");
      });
  
      // Soltar a letra na lacuna
      box.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedLetter = e.dataTransfer.getData("text/plain"); // Letra arrastada
        const expectedLetter = box.dataset.letter; // Letra correta esperada para a lacuna
  
        if (!box.textContent.trim() || box.textContent.trim() === "_") {
          if (draggedLetter === expectedLetter) {
            // Preenche a lacuna com a letra correta
            box.textContent = draggedLetter;
            box.classList.remove("hover");
            box.style.backgroundColor = "#a8e6cf"; // Destaca o acerto
  
            // Remove a letra arrastada das opções
            const draggedElement = document.querySelector(".dragging");
            if (draggedElement) draggedElement.remove();
  
            // Feedback positivo
            feedback.textContent = "Correto! 🎉";
            feedback.style.color = "green";
          } else {
            // Feedback negativo
            feedback.textContent = "Letra errada. Tente novamente! ❌";
            feedback.style.color = "red";
  
            setTimeout(() => {
              feedback.textContent = ""; // Limpa o feedback após 2 segundos
            }, 2000);
          }
        }
      });
    });
  
    // Verificar as respostas ao clicar no botão Finalizar
    finishButton.addEventListener("click", () => {
      let isCorrect = true;
  
      letterBoxes.forEach((box) => {
        const expectedLetter = box.dataset.letter; // Letra correta (do atributo data-letter)
        const enteredLetter = box.textContent.trim(); // Letra preenchida na lacuna
  
        if (enteredLetter !== expectedLetter) {
          box.style.backgroundColor = "#ffcccb"; // Destaca o erro
          isCorrect = false;
        } else {
          box.style.backgroundColor = "#a8e6cf"; // Destaca o acerto
        }
      });
  
      // Exibe o feedback com base no resultado
      if (isCorrect) {
        feedback.textContent = "Parabéns! Você completou todas as lacunas corretamente! 🎉";
        feedback.style.color = "green";
      } else {
        feedback.textContent = "Algumas lacunas estão incorretas. Tente novamente! ❌";
        feedback.style.color = "red";
      }
  
      setTimeout(() => {
        feedback.textContent = ""; // Limpa o feedback após 3 segundos
      }, 3000);
    });
  });
  