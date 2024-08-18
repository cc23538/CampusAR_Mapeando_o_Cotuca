const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

// Definindo o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Variáveis da câmera
let cameraX = 0;
let cameraY = 0;

// Posição do personagem
let playerX;
let playerY;

// Tamanho do personagem
const playerSize = 50;

// Imagem de fundo e dimensões do cenário
let sceneWidth;
let sceneHeight;
const backgroundImage = new Image();

// Posições dos botões no cenário
let buttonPositions = [];

// Carregar as configurações específicas do cenário
function loadScenarioSettings() {
    const urlParams = new URLSearchParams(window.location.search);
    const scenarioNumber = urlParams.get('scenario') || '1';

    switch (scenarioNumber) {
        case '1':
            sceneWidth = 2000;
            sceneHeight = 1000;
            backgroundImage.src = './img/MAPA.png'; // Imagem específica para o cenário 1
            buttonPositions = [
                { id: 'button1', x: 280, y: 550 },
                { id: 'button2', x: 1535, y: 165 },
                { id: 'button3', x: 350, y: 840 },
                { id: 'button4', x: 1430, y: 690 },
                { id: 'button5', x: 1550, y: 556 },
                { id: 'button6', x: 1200, y: 370 },
                { id: 'button7', x: 570, y: 7000 },
                { id: 'button8', x: 740, y: 850 },
                { id: 'button9', x: 700, y: 370 },
                // Adicione mais botões conforme necessário
            ];
            break;
        case '2':
            sceneWidth = 3000;
            sceneHeight = 1500;
            backgroundImage.src = './img/lapa.jpg'; // Imagem específica para o cenário 2
            buttonPositions = [
                
                // Adicione mais botões conforme necessário
            ];
            break;
        // Adicione mais cenários conforme necessário
        default:
            sceneWidth = 2000;
            sceneHeight = 1000;
            backgroundImage.src = './img/MAPA1.png';
            buttonPositions = [
                
                // Adicione mais botões conforme necessário
            ];
            break;
    }
}

// Sprites para animação do personagem
class Sprite {
    constructor(imageSrc, frameWidth, frameHeight, numFrames, frameRate) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        this.numFrames = numFrames;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedTime = 0;
        this.isAnimating = true;
        this.image.onload = () => {
            this.numRows = Math.ceil(this.image.height / this.frameHeight);
        };
    }

    update(deltaTime) {
        if (!this.isAnimating) return;

        this.elapsedTime += deltaTime;
        if (this.elapsedTime >= (1000 / this.frameRate)) {
            this.elapsedTime = 0;
            this.currentFrame = (this.currentFrame + 1) % this.numFrames;
        }
    }

    draw(context, x, y) {
        const frameX = this.currentFrame * this.frameWidth;
        const frameY = 0;

        context.drawImage(
            this.image,
            frameX,
            frameY,
            this.frameWidth,
            this.frameHeight,
            x,
            y,
            this.frameWidth,
            this.frameHeight
        );
    }
    reset() {
        this.currentFrame = 0;
        this.isAnimating = false;
    }
}

// Configuração do personagem
const playerSprites = {
    down: new Sprite('./img/baixoF.png', 64, 64, 4, 10),
    up: new Sprite('./img/cimaF.png', 64, 64, 4, 10),
    left: new Sprite('./img/esquerdaF.png', 64, 64, 4, 10),
    right: new Sprite('./img/direitaF.png', 64, 64, 4, 10)
};
let currentDirection = 'null';
let lastTime = 0;


// Salvando a posição do jogador no localStorage
function savePlayerPosition() {
    localStorage.setItem('playerX', playerX);
    localStorage.setItem('playerY', playerY);
}

// Carregando a posição do jogador do localStorage
function loadPlayerPosition() {
    playerX = parseInt(localStorage.getItem('playerX')) || sceneWidth / 2;
    playerY = parseInt(localStorage.getItem('playerY')) || sceneHeight / 2;
}

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
        if (element) {
            element.style.left = (button.x - cameraX) + 'px';
            element.style.top = (button.y - cameraY) + 'px';
        }
    });
}

// Desenhando o cenário
function drawScene() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhando a imagem de fundo
    context.drawImage(backgroundImage, -cameraX, -cameraY, sceneWidth, sceneHeight);

    // Atualizando e desenhando o personagem
    const deltaTime = performance.now() - lastTime;
    lastTime = performance.now();
    
    if (currentDirection) {
        playerSprites[currentDirection].isAnimating = true;
        playerSprites[currentDirection].update(deltaTime);
        playerSprites[currentDirection].draw(context, playerX - cameraX, playerY - cameraY);
    } else {
        
        Object.values(playerSprites).forEach(sprite => sprite.reset());
        if (currentDirection) {
            playerSprites[currentDirection].draw(context, playerX - cameraX, playerY - cameraY);
        } else {
            playerSprites.down.draw(context, playerX - cameraX, playerY - cameraY);
        }
    }
}

// Movimentação do personagem
document.addEventListener('keydown', (event) => {
    const step = 10;
    switch (event.key) {
        case 'ArrowUp':
            currentDirection = 'up';
            if (playerY - step >= 0) playerY -= step;
            break;
        case 'ArrowDown':
            currentDirection = 'down';
            if (playerY + step + playerSize <= sceneHeight) playerY += step;
            break;
        case 'ArrowLeft':
            currentDirection = 'left';
            if (playerX - step >= 0) playerX -= step;
            break;
        case 'ArrowRight':
            currentDirection = 'right';
            if (playerX + step + playerSize <= sceneWidth) playerX += step;
            break;
    }
    updateCamera();
    drawScene();
    updateButtonPositions();
    savePlayerPosition();
});

document.addEventListener('keyup', () => {
    currentDirection = null;
    drawScene(); // Redesenha o cenário para mostrar o primeiro frame e parar a animação
});

// Inicializando o cenário
function init() {
    loadScenarioSettings();
    loadPlayerPosition();
    backgroundImage.onload = () => {
        lastTime = performance.now();
        requestAnimationFrame(gameLoop);
    };
}

function gameLoop() {
    drawScene();
    requestAnimationFrame(gameLoop);
}

init();

// Função para navegar entre os cenário especificado
function navigateToScenario(scenarioNumber) {
    savePlayerPosition(); // Salva a posição atual do jogador antes de mudar de cenário
    window.location.href = `cenario${scenarioNumber}.html?scenario=${scenarioNumber}`;
}

// Função para navegar para a tela de menu 
function navigateToMenu() {
    savePlayerPosition();
    window.location.href = 'menu.html'; 
}
