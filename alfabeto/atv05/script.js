const nextButton = document.getElementById("next-button");
const micButton = document.querySelector('.mic-button');
const feedbackContainer = document.getElementById("feedback-container");
const feedbackElement = document.getElementById("feedback");

// Redirecionar ao clicar no botão "Próximo"
if (nextButton) {
    nextButton.addEventListener("click", () => {
        window.location.href = "/alfabeto/atv06/index06.html";
    });
} else {
    console.error('Botão "Próximo" não encontrado!');
}

// Função para exibir feedback
function showFeedback(message) {
    feedbackElement.textContent = message;
    feedbackContainer.classList.add("visible");
    setTimeout(() => {
        feedbackContainer.classList.remove("visible");
    }, 3000); // Feedback desaparece após 3 segundos
}

// Palavra esperada
const correctWord = 'apple';

// Variável para o reconhecimento de fala
let recognition;

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
        const transcript = event.results[0][0].transcript; // Transcrição da fala
        console.log("Resultado da fala:", transcript);

        // Comparação da fala com a palavra correta
        if (transcript.replace(/\s+/g, '').toLowerCase() === correctWord) {
            showFeedback("Ótima pronúncia! Você acertou!");

            // Redirecionar para a próxima página
            setTimeout(() => {
            window.location.href = "/alfabeto/atv06/index06.html";}, 3000); // Avança após 2 segundos
        } else {
            const feedback = comparePronunciation(transcript, correctWord);
            showFeedback(feedback);
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

    // Adicionar evento ao botão de microfone
    if (micButton) {
        micButton.addEventListener("click", () => {
            console.log("Botão de microfone clicado!");
            showFeedback("Ativando microfone...");
            recognition.start(); // Iniciar reconhecimento
        });
    } else {
        console.error("Botão de microfone não encontrado!");
    }
} else {
    // Caso o navegador não suporte reconhecimento de fala
    showFeedback("Seu navegador não suporta reconhecimento de fala.");
    console.error("SpeechRecognition não é suportado neste navegador.");
}

// Função que compara a pronúncia da palavra
function comparePronunciation(userPronunciation, correctWord) {
    const similarityThreshold = 0.7; // Define o limite de similaridade
    const similarity = getSimilarity(userPronunciation, correctWord);
    if (similarity === 1) {
        return "Ótima pronúncia! Está perfeito!";
    } else if (similarity >= similarityThreshold) {
        return "Boa pronúncia, mas pode melhorar!";
    } else {
        return "Pronúncia incorreta. Tente novamente!";
    }
}

// Função para calcular a similaridade entre as palavras
function getSimilarity(str1, str2) {
    let common = 0;
    for (let i = 0; i < Math.min(str1.length, str2.length); i++) {
        if (str1[i] === str2[i]) {
            common++;
        }
    }
    return common / Math.max(str1.length, str2.length);
}
