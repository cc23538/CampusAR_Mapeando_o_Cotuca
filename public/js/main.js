import { TileMap } from './TileMap.js';
import { Sprite } from './Sprite.js';
import { Camera } from './Camera.js';
import { Player } from './Player.js';
import  NPC  from './Npc.js';

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

        this.characterSprites = {};
        this.selectedCharacter = localStorage.getItem('selectedCharacter') || 'defaultCharacter';

        this.npcs = [];

        this.setup();
        this.initEvents();
    }

    setup() {
        this.loadScenarioSettings();
        this.loadPlayerSprites(); // Garanta que os sprites sejam carregados
        this.player = new Player(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.characterSprites
        );
        
        this.loadNPCs();

        this.loadPlayerPosition();
        this.backgroundImage.onload = () => {
            this.lastTime = performance.now();
            requestAnimationFrame(() => this.gameLoop());
        };
    }

    async loadNPCs() {
        // Limpe o array de NPCs se necessário
        this.npcs = [];
    
        // Crie NPCs com base nas posições fixas
        this.npcPositions.forEach(pos => {
            this.npcs.push(new NPC(pos.x, pos.y, 50, 50, `./img/npc_${pos.id}.png`, pos.id));
        });
    
        // Carregue os diálogos para todos os NPCs
        await Promise.all(this.npcs.map(npc => npc.loadDialogues()));
    }

    
    loadPlayerSprites() {
        const characterSprites = {
            'character1': {
                down: new Sprite('./img/baixo_VerdeEsc.png', 64, 64, 4, 10),
                up: new Sprite('./img/cima_VerdeEsc.png', 64, 64, 4, 10),
                left: new Sprite('./img/esquerda_VerdeEsc.png', 64, 64, 4, 10),
                right: new Sprite('./img/direita_VerdeEsc.png', 64, 64, 4, 10)
            },
            'character2': {
                down: new Sprite('./img/baixoM.png', 64, 64, 4, 10),
                up: new Sprite('./img/cimaM.png', 64, 64, 4, 10),
                left: new Sprite('./img/esquerdaM.png', 64, 64, 4, 10),
                right: new Sprite('./img/direitaM.png', 64, 64, 4, 10)
            },
            'character3': {
                down: new Sprite('./img/baixo_Azul.png', 64, 64, 4, 10),
                up: new Sprite('./img/cima_Azul.png', 64, 64, 4, 10),
                left: new Sprite('./img/esquerda_Azul.png', 64, 64, 4, 10),
                right: new Sprite('./img/direita_Azul.png', 64, 64, 4, 10)
            },
            'character4': {
                down: new Sprite('./img/baixo_Cinza.png', 64, 64, 4, 10),
                up: new Sprite('./img/cima_Cinza.png', 64, 64, 4, 10),
                left: new Sprite('./img/esquerda_Cinza.png', 64, 64, 4, 10),
                right: new Sprite('./img/direita_Cinza.png', 64, 64, 4, 10)
            },
            'character5': {
                down: new Sprite('./img/baixoF.png', 64, 64, 4, 10),
                up: new Sprite('./img/cimaF.png', 64, 64, 4, 10),
                left: new Sprite('./img/esquerdaF.png', 64, 64, 4, 10),
                right: new Sprite('./img/direitaF.png', 64, 64, 4, 10)
            }
            // Adicione mais personagens conforme necessário
        };

        this.characterSprites = characterSprites[this.selectedCharacter] || characterSprites['character1'];
    }
   
    loadScenarioSettings() {
        const urlParams = new URLSearchParams(window.location.search);
        const scenarioNumber = urlParams.get('scenario') || '2';
        console.log(`Carregando cenário ${scenarioNumber}`);
    
        switch (scenarioNumber) {
            case '2': // cenário1
                console.log('Configurando cenário 1');
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
                this.npcPositions = [
                    { id: 1, x: 500, y: 300 },
                    { id: 2, x: 1500, y: 700 }
                ];
                break;
            case '3': // cenário2
                console.log('Configurando cenário 2');
                this.sceneWidth = 3000;
                this.sceneHeight = 1500;
                this.tileMap = TileMap.loadScenario('2');
                this.backgroundImage.src = './img/lapa.jpg';
                this.buttonPositions = [];

                
                break;
            default:
                console.log('Configurando cenário padrão');
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
        
        document.getElementById('menuButton').addEventListener('click', () => this.navigateToMenu());
       
        // Eventos para seleção de personagem
        document.querySelectorAll('.character-card').forEach(card => {
            card.addEventListener('click', () => {
                const character = card.getAttribute('data-character');
                this.changeCharacter(character);
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('.scenario-button button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    const scenarioId = index + 2;
                    navigateToScenario(scenarioId);
                });
            });
        });
        
        function navigateToScenario(scenarioId) {
            //console.log('Navegando para o cenário:', scenarioId);
            window.location.href = `cenario${scenarioId}.html`;
        }
        
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

        if (newY > 940) newY = 940;
    
        if (newX < 0 || newX > this.sceneWidth || newY < 0 || newY > this.sceneHeight)
            return; // Evita movimentação fora dos limites do cenário

        if (!this.tileMap.isColliding(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.updateCamera();
            this.drawScene();
            this.updateButtonPositions();
            this.savePlayerPosition();

           
        }


        setTimeout(() => {
            this.isMoving = false;
        }, 100); 
    }

    handleKeyUp() {
        this.currentDirection = 'null'; //direção quando não se move
        this.drawScene();
    }

    updateCamera() {
        this.camera.update(this.player.x, this.player.y);
    }

    updateButtonPositions() {
        this.buttonPositions.forEach(position => {
            const button = document.getElementById(position.id);
            if (button) {
                button.style.left = `${position.x - this.camera.x}px`;
                button.style.top = `${position.y - this.camera.y}px`;
            }
        });
    }

    drawScene() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(this.backgroundImage, -this.camera.x, -this.camera.y, this.sceneWidth, this.sceneHeight);
    
        const deltaTime = performance.now() - this.lastTime;
        this.lastTime = performance.now();
    
        const sprite = this.characterSprites[this.currentDirection];
    
        if (sprite && this.currentDirection !== 'null') {
            sprite.isAnimating = true;
            sprite.update(deltaTime);
            sprite.draw(this.context, this.player.x - this.camera.x, this.player.y - this.camera.y);
        } else {
            // Exibe o sprite parado se não houver movimento
            const idleSprite = this.characterSprites['down'];
            if (idleSprite) {
                idleSprite.draw(this.context, this.player.x - this.camera.x, this.player.y - this.camera.y);
            }
        }
        this.updateButtonPositions();

        // Desenhe todos os NPCs
        this.npcs.forEach(npc => npc.draw(this.context, this.canvas.width, this.canvas.height));
    }
    
    savePlayerPosition() {
        localStorage.setItem('playerX', this.player.x);
        localStorage.setItem('playerY', this.player.y);
    }

    loadPlayerPosition() {
        this.player.x = parseInt(localStorage.getItem('playerX')) || this.canvas.width / 2;
        this.player.y = parseInt(localStorage.getItem('playerY')) || this.canvas.height / 2;
    }
    
    changeCharacter(character) {
        this.selectedCharacter = character;
        localStorage.setItem('selectedCharacter', character);
        this.loadPlayerSprites();
        this.player = new Player(
            this.canvas.width / 2,
            this.canvas.height / 2,
            this.characterSprites
        );
    }

    gameLoop() {
        this.drawScene();
        requestAnimationFrame(() => this.gameLoop());
    }



    navigateToMenu() {
        this.savePlayerPosition();
        //console.log('Navegando para o menu...');
        window.location.href = 'selecao.html'; 
    }
}

const game = new Game();
