// Seletores de elementos
const letterSlots = document.querySelectorAll('.letter-slot'); // Espaços vazios para letras
const feedbackContainer = document.getElementById("feedback-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-button");


// Redirecionar ao clicar no botão "Próximo"
if (nextButton) {
    nextButton.addEventListener("click", () => {
        window.location.href = "/alfabeto/atv08/index08.html";
    });
} else {
    console.error('Botão "Próximo" não encontrado!');
}

// Palavra correta (exemplo: "HAT")
const correctLetters = ['c', 'f', 'j', 'n', 'q', 'u', 'x', 'y']; // Letras que o usuário deve pronunciar
let currentLetterIndex = 0; // Índice da letra atual que deve ser pronunciada

// Variável para o reconhecimento de fala
let recognition;

// Função para exibir feedback
function showFeedback(message, success = true) {
    feedbackElement.textContent = message;
    feedbackContainer.style.backgroundColor = success ? "#d4edda" : "#f8d7da"; // Verde para sucesso, vermelho para erro
    feedbackContainer.classList.add("visible");
    setTimeout(() => {
        feedbackContainer.classList.remove("visible");}, 3000); // Feedback desaparece após 3 segundos
}

// Verifique se a API SpeechRecognition é suportada
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Define o idioma
    recognition.interimResults = false; // Apenas resultados finais
    recognition.continuous = false; // Uma única captura de fala

    // Evento quando o reconhecimento de fala é iniciado
    recognition.onstart = function () {
        console.log("Microfone ativado. Fale agora...");
        showFeedback("Microfone ativado. Fale agora...");
    };

    // Evento quando o reconhecimento retorna um resultado
    recognition.onresult = function (event) {
        const transcript = event.results[0][0].transcript.toLowerCase().trim(); // Transcrição da fala
        console.log("Pronúncia do usuário:", transcript);

        // Verifica se a pronúncia está correta para a letra atual
        if (transcript === correctLetters[currentLetterIndex]) {
            showFeedback(`Correto! Letra ${correctLetters[currentLetterIndex].toUpperCase()} foi preenchida.`);
            letterSlots[currentLetterIndex].textContent = correctLetters[currentLetterIndex].toUpperCase(); // Preenche o slot
            currentLetterIndex++; // Avança para a próxima letra

            // Verifica se todas as letras foram pronunciadas corretamente
            if (currentLetterIndex === correctLetters.length) {
                showFeedback("Parabéns! Você completou a palavra!");
                setTimeout(() => {
                    if (nextButton) {
                        nextButton.click(); // Avança para a próxima atividade
                    } else {
                        window.location.href = "/alfabeto/atv09/index09.html"; // Link de exemplo
                    }
                }, 3000); // Avança após 3 segundos
            }
        } else {
            showFeedback(`Pronúncia incorreta! Tente novamente a letra ${correctLetters[currentLetterIndex].toUpperCase()}.`);
        }
    };

    // Evento de erro no reconhecimento de fala
    recognition.onerror = function (event) {
        console.error("Erro no reconhecimento de fala:", event.error);
        if (event.error === "no-speech") {
            showFeedback("Nenhuma fala detectada. Tente novamente.");
        } else if (event.error === "audio-capture") {
            showFeedback("Não foi possível capturar áudio. Verifique seu microfone.");
        } else if (event.error === "not-allowed") {
            showFeedback("Permissão para usar o microfone foi negada.");
        } else {
            showFeedback(`Erro desconhecido: ${event.error}`);
        }
    };

    // Adicionar evento a cada espaço vazio de letra
    letterSlots.forEach((slot, index) => {
        slot.addEventListener("click", () => {
            if (index === currentLetterIndex) {
                console.log(`Slot ${index + 1} clicado. Aguarde a pronúncia da letra.`);
                showFeedback(`Pronuncie a letra ${correctLetters[index].toUpperCase()}.`);
                recognition.start(); // Iniciar reconhecimento
            } else {
                showFeedback(`Complete na ordem! Você está na letra ${correctLetters[currentLetterIndex].toUpperCase()}.`);
            }
        });
    });
} else {
    // Caso o navegador não suporte reconhecimento de fala
    showFeedback("Seu navegador não suporta reconhecimento de fala.");
    console.error("SpeechRecognition não é suportado neste navegador.");
}


