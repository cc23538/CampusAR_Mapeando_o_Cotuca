
import { Sprite } from './Sprite.js';


export class Player {
    constructor(initialX, initialY, playerSprites) {
        this.x = initialX;
        this.y = initialY;
        this.size = 50;
        this.sprites = playerSprites;
        this.currentDirection = 'null';
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

        if (this.currentDirection !== 'null') {
            this.sprites[this.currentDirection].isAnimating = true;
            this.sprites[this.currentDirection].update(deltaTime);
            this.sprites[this.currentDirection].draw(context, this.x - camera.x, this.y - camera.y);
        } else {
            Object.values(this.sprites).forEach(sprite => sprite.reset());
            this.sprites.down.draw(context, this.x - camera.x, this.y - camera.y);
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