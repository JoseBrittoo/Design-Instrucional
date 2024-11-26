document.addEventListener("DOMContentLoaded", () => {
  const correctName = "MARY"; // Nome que deve ser soletrado
  let currentIndex = 0; // Índice atual da letra
  const inputSpans = document.querySelectorAll(".input-area span"); 
  const micButton = document.getElementById("mic-button"); 
  const nextButton = document.getElementById("next-button"); 
  const feedback = document.getElementById("feedback"); 

  // Verifica se a API de reconhecimento de voz está disponível
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    alert("Seu navegador não suporta reconhecimento de voz. Tente usar o Google Chrome.");
    micButton.disabled = true;
    return;
  }

  // Configurações do reconhecimento de voz
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US"; 
  recognition.interimResults = false; 
  recognition.maxAlternatives = 1; 

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
      alert("Você já completou o nome!");
      return;
    }

    feedback.textContent = "Ouvindo... 🎤"; // Feedback de status
    feedback.style.color = "blue";

    recognition.start(); // Inicia o reconhecimento de voz
  });


  recognition.addEventListener("result", (event) => {
    const spokenLetter = event.results[0][0].transcript.toUpperCase().trim(); // Captura a letra falada
    const correctLetter = correctName[currentIndex]; // Letra correta esperada
    const possibleMatches = letterMap[correctLetter];

    if (possibleMatches.includes(spokenLetter)) {
      inputSpans[currentIndex].textContent = correctLetter; // Atualiza o campo visual
      inputSpans[currentIndex].style.backgroundColor = "lightgreen"; // Indica sucesso
      feedback.textContent = "Correto! 🎉";
      feedback.style.color = "green";
      currentIndex++; // Avança para a próxima letra

      if (currentIndex === correctName.length) {
        feedback.textContent = "Parabéns! Você soletrou o nome MARY corretamente!";
        micButton.disabled = true; // Desativa o botão do microfone
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
    window.location.href = "/alfabeto/atv10/index10.html"; 
  });
});
