document.addEventListener("DOMContentLoaded", () => {
    const correctName = "MARY"; // Nome que deve ser soletrado
    let currentIndex = 0; // Índice atual da letra
    const inputSpans = document.querySelectorAll(".input-area span"); // Campos visuais para letras
    const micButton = document.getElementById("mic-button"); // Botão do microfone
    const nextButton = document.getElementById("next-button"); // Botão de próximo
    const feedback = document.getElementById("feedback"); // Elemento de feedback
  
    // Verifica se a API de reconhecimento de voz está disponível
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.");
      micButton.disabled = true;
      return;
    }
  
    // Configurações do reconhecimento de voz
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Idioma
    recognition.interimResults = false; // Apenas resultados finais
    recognition.maxAlternatives = 1; // Apenas uma alternativa
  
    // Inicializa o botão "Próximo" desativado
    nextButton.disabled = true;
  
    // Mapear possíveis interpretações para letras
    const letterMap = {
      M: ["M", "EM", "AM"],
      A: ["A", "EH", "AY"],
      R: ["R", "ARE", "AR"],
      Y: ["Y", "WHY", "WAI"]
    };
  
    // Evento ao clicar no botão do microfone
    micButton.addEventListener("click", () => {
      if (currentIndex >= correctName.length) {
        alert("Você já completou o nome! Pressione o botão de próximo.");
        return;
      }
  
      feedback.textContent = "Ouvindo... 🎤"; // Feedback de status
      feedback.style.color = "blue";
  
      recognition.start(); // Inicia o reconhecimento de voz
    });
  
    // Evento disparado ao reconhecer a fala
    recognition.addEventListener("result", (event) => {
      const spokenLetter = event.results[0][0].transcript.toUpperCase().trim(); // Captura a letra falada
      const correctLetter = correctName[currentIndex]; // Letra correta esperada
      const possibleMatches = letterMap[correctLetter]; // Possíveis interpretações da letra
  
      // Verifica se a letra falada corresponde a uma das interpretações válidas
      if (possibleMatches.includes(spokenLetter)) {
        inputSpans[currentIndex].textContent = correctLetter; // Atualiza o campo visual
        inputSpans[currentIndex].style.backgroundColor = "lightgreen"; // Indica sucesso
        feedback.textContent = "Correto! 🎉";
        feedback.style.color = "green";
        currentIndex++; // Avança para a próxima letra
  
        // Finaliza se o nome estiver completo
        if (currentIndex === correctName.length) {
          feedback.textContent = "Parabéns! Você soletrou o nome MARY corretamente!";
          micButton.disabled = true; // Desativa o botão do microfone
          nextButton.disabled = false; // Habilita o botão de próximo
        }
      } else {
        feedback.textContent = `Tente novamente! ❌ Você disse "${spokenLetter}".`;
        feedback.style.color = "red";
      }
  
      // Limpa o feedback após 3 segundos
      setTimeout(() => {
        feedback.textContent = "";
      }, 3000);
    });
  
    // Evento disparado ao finalizar o reconhecimento
    recognition.addEventListener("end", () => {
      if (currentIndex < correctName.length) {
        recognition.stop(); // Para o reconhecimento
      }
    });
  
    // Evento para o botão "Próximo"
    nextButton.addEventListener("click", () => {
      if (currentIndex < correctName.length) {
        alert("Você ainda não completou o nome!");
      } else {
        alert("Pronto para a próxima atividade!");
        // Adicione lógica aqui para avançar para a próxima atividade
      }
    });
  });
  