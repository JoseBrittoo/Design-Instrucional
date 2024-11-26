// Seletores de elementos
const letterSlots = document.querySelectorAll('.letter-input'); 
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");
const micButton = document.getElementById("mic-button");
let recognition;
let isRecognizing = false; // Variável para rastrear o estado do reconhecimento
let currentSlot = null;

// Redirecionar ao clicar no botão "Próximo"
if (nextButton) {
    nextButton.addEventListener("click", () => {
        window.location.href = "/alfabeto/atv09/index09.html";
    });
} else {
    console.error('Botão "Próximo" não encontrado!');
}

// Palavra correta 
const correctLetters = ['c', 'f', 'j', 'n', 'q', 'u', 'x', 'y']; // Letras que o usuário deve pronunciar
let currentLetterIndex = 0; // Índice da letra atual que deve ser pronunciada

// Verifique se a API SpeechRecognition é suportada
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Define o idioma
    recognition.interimResults = false; // Apenas resultados finais

    // Evento quando o microfone é ativado
    recognition.onstart = function () {
        feedbackElement.textContent = "Fale agora...";
        feedbackElement.style.color = "blue";
        isRecognizing - true;
    };

    // Evento quando o reconhecimento retorna um resultado
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.trim().toUpperCase(); 
        if (currentSlot) {
            const correctLetter = currentSlot.dataset.correct.toUpperCase();
            if (transcript === correctLetter) {
                currentSlot.value = transcript;
                feedbackElement.textContent = `Correto: ${transcript}`;
                feedbackElement.style.color = "green";
                currentSlot.classList.add("correct");
                currentSlot.classList.remove("incorrect");

                const nextSlot = [...letterSlots].find(slot => slot.value === "");
                if (nextSlot) {
                    currentSlot = nextSlot;
                    nextSlot.focus();
                    feedbackElement.textContent = "Clique no microfone e pronuncie a próxima letra.";
                } else {
                    feedbackElement.textContent = "Parabéns! Você completou a atividade!";
                }
            } else {
                feedbackElement.textContent = `Incorreto! Você disse "${transcript}". Tente novamente.`;
                feedbackElement.style.color = "red";
                currentSlot.classList.add("incorrect");
                currentSlot.classList.remove("correct");
            }
        }
        isRecognizing = false;
    };

    // Evento de erro 
    recognition.onerror = function (event) {
        if (event.error === 'no-speech') {
            feedbackElement.textContent = "Nenhuma fala detectada. Tente novamente.";
        } else if (event.error === 'audio-capture') {
            feedbackElement.textContent = "Microfone não detectado. Verifique suas configurações.";
        } else {
            feedbackElement.textContent = "Erro no reconhecimento. Tente novamente.";
        }
        feedbackElement.style.color = "red";
        console.error("Erro:", event.error);
        isRecognizing = false; // Reseta o estado
    };
    // Evento quando o reconhecimento é interrompido
    recognition.onend = function () {
        isRecognizing = false; // Reseta o estado
    };

} else {
    micButton.disabled = true;
    feedbackElement.textContent = "Reconhecimento de fala não suportado no seu navegador.";
    feedbackElement.style.color = "red";
}
// Ativar reconhecimento ao clicar no espaço vazio
letterSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
        currentSlot = slot;
        feedbackElement.textContent = "Clique no microfone e pronuncie a letra.";
        feedbackElement.style.color = "blue";
    });
});
// Ativar microfone
micButton.addEventListener("click", () => {
    if (currentSlot) {
        if (!isRecognizing) { // Garante que o reconhecimento não seja iniciado duas vezes
            recognition.start();
        } else {
            feedbackElement.textContent = "O reconhecimento já está em andamento. Aguarde.";
            feedbackElement.style.color = "orange";
        }
    } else {
        feedbackElement.textContent = "Selecione um espaço antes de usar o microfone.";
        feedbackElement.style.color = "orange";
    }
});


