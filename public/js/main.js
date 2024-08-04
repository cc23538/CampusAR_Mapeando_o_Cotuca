const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');
const sendButton = document.getElementById('sendButton');


let players = {};
let camera = { x: 0, y: 0 };

// Inicializa o socket
const socket = io();

// Funções
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawScene();
}

function drawPlayer(player, color) {
    ctx.fillStyle = color;
    ctx.fillRect(player.x - camera.x, player.y - camera.y, 50, 50);
}

function drawScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateCamera();
    console.log('Drawing scene with players:', players);
    for (let id in players) {
        drawPlayer(players[id], id === socket.id ? 'blue' : 'green');
    }
}

function updateCamera() {
    const player = players[socket.id];
    if (!player) return;

    camera.x = player.x - canvas.width / 2 + 25;
    camera.y = player.y - canvas.height / 2 + 25;
}

// Eventos de socket
socket.on('currentPlayers', (currentPlayers) => {
    players = currentPlayers;
    console.log('Current players:', players);
    drawScene();
});

socket.on('newPlayer', (newPlayer) => {
    players[newPlayer.id] = { x: newPlayer.x, y: newPlayer.y };
    console.log('New player connected:', newPlayer);
    drawScene();
});

socket.on('playerDisconnected', (playerId) => {
    delete players[playerId];
    console.log('Player disconnected:', playerId);
    drawScene();
});

socket.on('playerMoved', (playerData) => {
    players[playerData.id].x = playerData.x;
    players[playerData.id].y = playerData.y;
    console.log('Player moved:', playerData);
    drawScene();
});

// Evento de teclado para mover o jogador
document.addEventListener('keydown', (event) => {
    let player = players[socket.id];
    if (!player) return;

    const moveSpeed = 5;

    // Cria variáveis para novas posições
    let newX = player.x;
    let newY = player.y;

    switch (event.key) {
        case 'ArrowUp':
            newY += moveSpeed; // Move para cima
            break;
        case 'ArrowDown':
            newY -= moveSpeed; // Move para baixo
            break;
        case 'ArrowLeft':
            newX += moveSpeed; // Move para a esquerda
            break;
        case 'ArrowRight':
            newX -= moveSpeed; // Move para a direita
            break;
    }

    // Verifica limites para evitar que o jogador saia da tela
    if (newX >= 0 && newX + 50 <= canvas.width) {
        player.x = newX; // Atualiza a posição horizontal
    }
    if (newY >= 0 && newY + 48 <= canvas.height) {
        player.y = newY; // Atualiza a posição vertical
    }

    console.log('Player movement:', player);
    socket.emit('playerMovement', player);
    drawScene();
});

// Eventos de chat
sendButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        socket.emit('chatMessage', message);
        chatInput.value = '';
    }
});

socket.on('chatMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Inicializa o canvas
window.addEventListener('resize', resizeCanvas);
resizeCanvas();