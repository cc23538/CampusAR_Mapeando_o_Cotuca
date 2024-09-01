export class Player {
    constructor(initialX, initialY, sprites) {
        this.x = initialX;
        this.y = initialY;
        this.size = 50;
        this.sprites = sprites;
        this.currentDirection = 'null';//down
        this.lastTime = 0;
    }

    updatePosition(direction, step) {
        switch (direction) {
            case 'up':
                this.y -= step;
                break;
            case 'down':
                this.y += step;
                break;
            case 'left':
                this.x -= step;
                break;
            case 'right':
                this.x += step;
                break;
        }
        this.currentDirection = direction;
    }
 
    draw(context, camera) {
        const deltaTime = performance.now() - this.lastTime;
        this.lastTime = performance.now();

        const sprite = this.sprites[this.currentDirection];
        
        if (sprite) {
            sprite.isAnimating = true;
            sprite.update(deltaTime);
            sprite.draw(context, this.x - camera.x, this.y - camera.y);
        } else {
            // Caso de fallback para quando o sprite atual não estiver definido
            console.warn(`Sprite para direção '${this.currentDirection}' não encontrado.`);
            const fallbackSprite = this.sprites['down']; // Ou qualquer outro sprite padrão
            if (fallbackSprite) {
                fallbackSprite.draw(context, this.x - camera.x, this.y - camera.y);
            }
        }
    }

    savePosition() {
        localStorage.setItem('playerX', this.x);
        localStorage.setItem('playerY', this.y);
    }

    loadPosition(sceneWidth, sceneHeight) {
        this.x = parseInt(localStorage.getItem('playerX')) || sceneWidth / 2;
        this.y = parseInt(localStorage.getItem('playerY')) || sceneHeight / 2;
    }

    
}