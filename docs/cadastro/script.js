// script.js
document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const day = document.getElementById('day').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const password = document.getElementById('password').value;

    if (fullName && username && email && day && month && year && password) {
        alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${fullName}!`);
        // Lógica de envio de dados ao backend pode ser adicionada aqui
    } else {
        alert('Por favor, preencha todos os campos corretamente.');
    }
});
