const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Definindo o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Dimensões do cenário maior
const sceneWidth = 2000;
const sceneHeight = 1000;

// Variáveis da câmera
let cameraX = 0;
let cameraY = 0;

// Posição do personagem
let playerX = sceneWidth / 2;
let playerY = sceneHeight / 2;

// Tamanho do personagem
const playerSize = 50;

// Posições dos botões no cenário
const buttonPositions = [
    { id: 'button1', x: 280, y: 550 },
    { id: 'button2', x: 1535, y: 165 },
    { id: 'button3', x: 350, y: 840 },
    { id: 'button4', x: 1430, y: 690 },
    { id: 'button5', x: 1550, y: 556 },
    { id: 'button6', x: 1200, y: 370 },
    { id: 'button7', x: 570, y: 700 },
    { id: 'button8', x: 740, y: 850 },
    { id: 'button9', x: 700, y: 370 },
];

// Imagem de fundo
const backgroundImage = new Image();
backgroundImage.src = './img/MAPA.png';

// Movimentação do personagem
document.addEventListener('keydown', (event) => {
    const step = 10;
    switch (event.key) {
        case 'ArrowUp':
            if (playerY - step >= 0) playerY -= step;
            break;
        case 'ArrowDown':
            if (playerY + step + playerSize <= sceneHeight) playerY += step;
            break;
        case 'ArrowLeft':
            if (playerX - step >= 0) playerX -= step;
            break;
        case 'ArrowRight':
            if (playerX + step + playerSize <= sceneWidth) playerX += step;
            break;
    }
    updateCamera();
    drawScene();
    updateButtonPositions();
});

// Atualizando a posição da câmera
function updateCamera() {
    cameraX = playerX - canvas.width / 2;
    cameraY = playerY - canvas.height / 2;

    // Limitando a câmera às bordas do cenário
    if (cameraX < 0) cameraX = 0;
    if (cameraY < 0) cameraY = 0;
    if (cameraX + canvas.width > sceneWidth) cameraX = sceneWidth - canvas.width;
    if (cameraY + canvas.height > sceneHeight) cameraY = sceneHeight - canvas.height;
}

// Atualizando a posição dos botões
function updateButtonPositions() {
    buttonPositions.forEach((button) => {
        const element = document.getElementById(button.id);
        element.style.left = (button.x - cameraX) + 'px';
        element.style.top = (button.y - cameraY) + 'px';
    });
}

// Desenhando o cenário
function drawScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhando a imagem de fundo
    context.drawImage(backgroundImage, -cameraX, -cameraY, sceneWidth, sceneHeight);

    // Desenhando o personagem
    context.fillStyle = 'red';
    context.fillRect(playerX - cameraX, playerY - cameraY, playerSize, playerSize);
}

// Inicializando o cenário
backgroundImage.onload = () => {
    drawScene();
    updateButtonPositions();
};

function navigateToScenario(scenarioNumber) {
    window.location.href = `cenario${scenarioNumber}.html`;
}