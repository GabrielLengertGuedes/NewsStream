function alternarForm(mostrarCadastro) {
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');
    const messageDiv = document.querySelector('.message');

    if (mostrarCadastro) {
        cadastroForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    } else {
        loginForm.classList.remove('hidden');
        cadastroForm.classList.add('hidden');
    }

    if (messageDiv) {
        messageDiv.classList.add('hidden');
    }
}