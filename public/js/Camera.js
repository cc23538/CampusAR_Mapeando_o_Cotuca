export class Camera {
    constructor(canvasWidth, canvasHeight, sceneWidth, sceneHeight) {
        this.x = 0;
        this.y = 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
    }

    update(playerX, playerY) {
        this.x = Math.max(0, Math.min(playerX - this.canvasWidth / 2, this.sceneWidth - this.canvasWidth));
        this.y = Math.max(0, Math.min(playerY - this.canvasHeight / 2, this.sceneHeight - this.canvasHeight));
    }
}