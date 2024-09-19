const socket = io();


socket.on('user list', (users) => {
    console.log('Usuários online:', users);
    updateOnlineUsersList(users);
});


function updateOnlineUsersList(users) {
    const userList = document.getElementById('user-list');
    if (!userList) {
        console.error('Elemento com ID user-list não encontrado');
        return;
    }
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username; 
        userList.appendChild(li);
    });
}


function selectCharacter(character) {
    socket.emit('set character', character);
}


socket.on('update character', ({ userId, character }) => {
    // Atualizar a interface com o personagem do usuário com userId
    console.log(`Personagem atualizado para o usuário ${userId}: ${character}`);
});


function getCharacterForUser(userId) {
    // Buscar personagem no banco de dados
    return db.getUserCharacter(userId);
}


// Quando o usuário se conecta
socket.on('connect', () => {
    console.log('Conectado ao servidor Socket.io');
    socket.emit('get users');
});


socket.on('user character', (character) => {
    // Atualizar a interface com o personagem
    console.log('Personagem do usuário recebido:', character);
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    const switchToRegister = document.querySelector('#switchToRegister');
    const switchToLogin = document.querySelector('#switchToLogin');

    if (!loginForm || !registerForm || !switchToRegister || !switchToLogin) {
        console.error('Elementos necessários não encontrados');
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

            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (response.ok) {
                    alert('Login bem-sucedido!');
                    localStorage.setItem('token', data.token);
                    window.location.href = '/selecao.html';
                } else {
                    alert(data.mensagem || 'Erro desconhecido');
                }
            } else {
                const errorText = await response.text();
                console.error('Resposta não é JSON:', errorText);
                alert('Ocorreu um erro inesperado.');
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
                alert(data.mensagem || 'Erro desconhecido');
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

        if (loginContainer && registerContainer) {
            loginContainer.classList.toggle('show');
            registerContainer.classList.toggle('show');
        } else {
            console.error('Elementos de formulário não encontrados');
        }
    }
});

