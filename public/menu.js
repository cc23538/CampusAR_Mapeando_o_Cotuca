
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const statusPanel = document.getElementById('statusPanel');
const pauseMenu = document.getElementById('pauseMenu');
const settingsMenu = document.getElementById('settingsMenu');

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


document.getElementById('resumeBtn').addEventListener('click', () => {
    hideMenus();
    
});

document.getElementById('restartBtn').addEventListener('click', () => {
    hideMenus();
    
});

document.getElementById('settingsBtn').addEventListener('click', () => {
    showSettingsMenu();
});

document.getElementById('exitBtn').addEventListener('click', () => {
   
    alert('Saindo do jogo...');
});

document.getElementById('backToPause').addEventListener('click', () => {
    showPauseMenu();
});


document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        showPauseMenu();
    }
});


document.getElementById('openPauseMenu').addEventListener('click', () => {
    showPauseMenu();
});


function updateStatus(health, score) {
    document.getElementById('health').textContent = health;
    document.getElementById('score').textContent = score;
}


function drawCharacter(x, y) {
    ctx.fillStyle = 'red';
    ctx.fillRect(x, y, 50, 50);
}


function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacter(100, 100); 
    requestAnimationFrame(update); 
}

update(); 