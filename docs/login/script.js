document.getElementById('next-button').addEventListener('click', function (e) {
    e.preventDefault();

    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Valida se os campos estão preenchidos
    if (username && password) {
        alert(`Bem-vindo, ${username}!`);
        window.location.href = '/docs/menu/index.html'; 
    } else {
        alert('Por favor, preencha todos os campos.');
    }
});
