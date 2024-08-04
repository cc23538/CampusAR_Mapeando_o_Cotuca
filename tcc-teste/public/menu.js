// Seleciona os elementos
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const statusPanel = document.getElementById('statusPanel');
const pauseMenu = document.getElementById('pauseMenu');
const settingsMenu = document.getElementById('settingsMenu');

// Ajusta o tamanho do canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funções para mostrar e ocultar os menus
function showPauseMenu() {
    pauseMenu.classList.remove('hidden');
    settingsMenu.classList.add('hidden');
    statusPanel.classList.add('hidden');
}

function showSettingsMenu() {
    pauseMenu.classList.add('hidden');
    settingsMenu.classList.remove('hidden');
}

function hideMenus() {
    pauseMenu.classList.add('hidden');
    settingsMenu.classList.add('hidden');
    statusPanel.classList.remove('hidden');
}

// Eventos dos botões
document.getElementById('resumeBtn').addEventListener('click', () => {
    hideMenus();
    // Lógica para retomar o jogo
});

document.getElementById('restartBtn').addEventListener('click', () => {
    hideMenus();
    // Lógica para reiniciar o jogo
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    showSettingsMenu();
});

document.getElementById('exitBtn').addEventListener('click', () => {
    // Lógica para sair do jogo ou voltar ao menu principal
    alert('Saindo do jogo...');
});

document.getElementById('backToPause').addEventListener('click', () => {
    showPauseMenu();
});

// Evento de tecla para abrir o menu de pausa
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        showPauseMenu();
    }
});

// Evento para abrir o menu de pausa com o botão
document.getElementById('openPauseMenu').addEventListener('click', () => {
    showPauseMenu();
});

// Função para atualizar o painel de status
function updateStatus(health, score) {
    document.getElementById('health').textContent = health;
    document.getElementById('score').textContent = score;
}

// Função para desenhar o personagem (exemplo básico)
function drawCharacter(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 50);
}

// Função para atualizar o jogo
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter(100, 100); // Exemplo de posição do personagem
    requestAnimationFrame(update); // Chama a função de atualização novamente
}

update(); // Inicia o loop de atualização