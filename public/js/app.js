document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');

    if (!loginForm || !registerForm) {
        console.error('Formulários não encontrados');
        return;
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#loginUsername').value;
        const password = document.querySelector('#loginPassword').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ usuario: username, senha: password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login bem-sucedido!');
                localStorage.setItem('token', data.token); 
                window.location.href = '/selecao.html';
            } else {
                alert(data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Ocorreu um erro ao fazer login. Tente novamente.');
        }
    });

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.querySelector('#registerName').value;
        const email = document.querySelector('#registerEmail').value;
        const username = document.querySelector('#registerUsername').value;
        const password = document.querySelector('#registerPassword').value;

        try {
            const response = await fetch('/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: name, usuario: username, email: email, senha: password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Cadastro bem-sucedido! Você pode agora fazer login.');
                toggleForms(); 
            } else {
                alert(data.mensagem);
            }
        } catch (error) {
            console.error('Erro ao registrar:', error);
            alert('Ocorreu um erro ao registrar. Tente novamente.');
        }
    });

    switchToRegister.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForms();
    });

    switchToLogin.addEventListener('click', (event) => {
        event.preventDefault();
        toggleForms();
    });

    function toggleForms() {
        const loginContainer = document.querySelector('.login-container');
        const registerContainer = document.querySelector('.register-container');

        loginContainer.classList.toggle('show');
        registerContainer.classList.toggle('show');
    }
});
