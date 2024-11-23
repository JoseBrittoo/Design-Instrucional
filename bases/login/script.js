// script.js
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        alert(`Bem-vindo, ${username}!`);
        // Lógica de autenticação pode ser adicionada aqui
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
