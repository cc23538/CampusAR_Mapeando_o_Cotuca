export default class NPC {
    constructor(x, y, width, height, imageSrc, id) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
        this.id = id;
        this.dialogos = []; // Array para armazenar diálogos
    }

    draw(ctx) {
        // Desenha o NPC com coordenadas absolutas
        const screenX = this.x;
        const screenY = this.y;

        ctx.drawImage(this.image, screenX - this.width / 2, screenY - this.height / 2, this.width, this.height);
    }

    isClicked(mouseX, mouseY) {
        // Verifica se a posição do mouse está dentro da área do NPC
        return mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 &&
               mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2;
    }

    async loadDialogues() {
        try {
            const response = await fetch(`/api/dialogos/${this.id}`);
            if (response.ok) {
                this.dialogos = await response.json();
            } else {
                console.error('Erro ao carregar diálogos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao carregar diálogos:', error);
        }
    }

    showDialogue(index) {
        if (this.dialogos[index]) {
            alert(this.dialogos[index]); // Exibe o diálogo em um alert
        }
    }
}
