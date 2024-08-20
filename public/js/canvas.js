import { TileMap } from './TileMap.js';
import { Sprite } from './Sprite.js';
import { Camera } from './Camera.js';
import { Player } from './Player.js';

export class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.camera = null;
        this.tileMap = null;
        this.player = null;
        this.backgroundImage = new Image();
        this.buttonPositions = [];
        this.lastTime = 0;
        this.currentDirection = 'null';

        this.setup();
        this.initEvents();
    }

    setup() {
        this.loadScenarioSettings();
        this.player = new Player(
            this.canvas.width / 2, 
            this.canvas.height / 2, 
            this.getPlayerSprites()
        );
        this.loadPlayerPosition();
        this.backgroundImage.onload = () => {
            this.lastTime = performance.now();
            requestAnimationFrame(() => this.gameLoop());
        };
    }

    getPlayerSprites() {
        return {
            down: new Sprite('./img/baixoF.png', 64, 64, 4, 10),
            up: new Sprite('./img/cimaF.png', 64, 64, 4, 10),
            left: new Sprite('./img/esquerdaF.png', 64, 64, 4, 10),
            right: new Sprite('./img/direitaF.png', 64, 64, 4, 10)
        };
    }

    loadScenarioSettings() {
        const urlParams = new URLSearchParams(window.location.search);
        const scenarioNumber = urlParams.get('scenario') || '1';

        switch (scenarioNumber) {
            case '1':
                this.sceneWidth = 2000;
                this.sceneHeight = 1000;
                this.tileMap = TileMap.loadScenario('1');
                this.backgroundImage.src = './img/MAPA.png';
                this.buttonPositions = [
                    { id: 'button1', x: 280, y: 550 },
                    { id: 'button2', x: 1535, y: 165 },
                    { id: 'button3', x: 350, y: 840 },
                    { id: 'button4', x: 1430, y: 690 },
                    { id: 'button5', x: 1550, y: 556 },
                    { id: 'button6', x: 1200, y: 370 },
                    { id: 'button7', x: 570, y: 7000 },
                    { id: 'button8', x: 740, y: 850 },
                    { id: 'button9', x: 700, y: 370 },
                ];
                break;
            case '2':
                this.sceneWidth = 3000;
                this.sceneHeight = 1500;
                this.tileMap = TileMap.loadScenario('2');
                this.backgroundImage.src = './img/lapa.jpg';
                this.buttonPositions = [];
                break;
            default:
                this.sceneWidth = 2000;
                this.sceneHeight = 1000;
                this.tileMap = TileMap.loadScenario();
                this.backgroundImage.src = './img/MAPA1.png';
                this.buttonPositions = [];
                break;
        }

        this.camera = new Camera(this.canvas.width, this.canvas.height, this.sceneWidth, this.sceneHeight);
    }

    initEvents() {
        document.addEventListener('keydown', (event) => this.handleKeyDown(event));
        document.addEventListener('keyup', () => this.handleKeyUp());
    }

    handleKeyDown(event) {
        const step = 11.5;
        let newX = this.player.x;
        let newY = this.player.y;

        switch (event.key) {
            case 'ArrowUp':
                this.currentDirection = 'up';
                newY -= step;
                break;
            case 'ArrowDown':
                this.currentDirection = 'down';
                newY += step;
                break;
            case 'ArrowLeft':
                this.currentDirection = 'left';
                newX -= step;
                break;
            case 'ArrowRight':
                this.currentDirection = 'right';
                newX += step;
                break;
            default:
                return;
        }

        if (!this.tileMap.isColliding(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.updateCamera();
            this.drawScene();
            this.updateButtonPositions();
            this.savePlayerPosition();
        }
    }

    handleKeyUp() {
        this.currentDirection = 'null';
        this.drawScene();
    }

    updateCamera() {
        this.camera.update(this.player.x, this.player.y);
    }

    updateButtonPositions() {
        this.buttonPositions.forEach((button) => {
            const element = document.getElementById(button.id);
            if (element) {
                element.style.left = (button.x - this.camera.x) + 'px';
                element.style.top = (button.y - this.camera.y) + 'px';
            }
        });
    }

    drawScene() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.backgroundImage, -this.camera.x, -this.camera.y, this.sceneWidth, this.sceneHeight);

        const deltaTime = performance.now() - this.lastTime;
        this.lastTime = performance.now();

        if (this.currentDirection !== 'null') {
            this.player.sprites[this.currentDirection].isAnimating = true;
            this.player.sprites[this.currentDirection].update(deltaTime);
            this.player.sprites[this.currentDirection].draw(this.context, this.player.x - this.camera.x, this.player.y - this.camera.y);
        } else {
            Object.values(this.player.sprites).forEach(sprite => sprite.reset());
            this.player.sprites.down.draw(this.context, this.player.x - this.camera.x, this.player.y - this.camera.y);
        }
    }

    savePlayerPosition() {
        localStorage.setItem('playerX', this.player.x);
        localStorage.setItem('playerY', this.player.y);
    }

    loadPlayerPosition() {
        this.player.x = parseInt(localStorage.getItem('playerX')) || this.canvas.width / 2;
        this.player.y = parseInt(localStorage.getItem('playerY')) || this.canvas.height / 2;
    }

    gameLoop() {
        this.drawScene();
        requestAnimationFrame(() => this.gameLoop());
    }

    navigateToScenario(scenarioNumber) {
        this.savePlayerPosition();
        window.location.href = `cenario${scenarioNumber}.html?scenario=${scenarioNumber}`;
    }

    navigateToMenu() {
        this.savePlayerPosition();
        window.location.href = 'menu.html'; 
    }
}

// Inicialize o jogo ao carregar o script
const game = new Game();
