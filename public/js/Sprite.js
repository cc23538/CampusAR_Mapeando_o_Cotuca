export class Sprite {
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