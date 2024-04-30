window.onload = function() {
    var canvas = document.getElementById("gameCanvas");
    var ctx = canvas.getContext("2d");

    // Define o tamanho do canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Imagens
    var personagemImg = new Image();
    personagemImg.src = '.Personagem Mapa.jpg'; // Você precisa de uma imagem para o personagem 
    var mushroomImg = new Image();
    mushroomImg.src = 'mushroom.png'; // Imagem para o cogumelo
    var treeImg = new Image();
    treeImg.src = 'tree.png'; // Imagem para a árvore
    var signImg = new Image();
    signImg.src = 'sign.png'; // Imagem para a placa

    // Função para desenhar o mapa
    function drawMap() {
        // Desenha o caminho
        ctx.fillStyle = "#8B4513"; // Brown color
        ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

        // Desenha os cogumelos
        ctx.drawImage(mushroomImg, 100, canvas.height - 160, 50, 50);
        ctx.drawImage(mushroomImg, 300, canvas.height - 210, 50, 50);
        ctx.drawImage(mushroomImg, 500, canvas.height - 260, 50, 50);

        // Desenha as árvores
        ctx.drawImage(treeImg, 200, canvas.height - 300, 100, 200);
        ctx.drawImage(treeImg, 400, canvas.height - 300, 100, 200);

        // Desenha os pontos de parada com as plaquinhas de informações
        ctx.drawImage(signImg, 600, canvas.height - 180, 50, 100);
        ctx.fillText("Info 1", 600, canvas.height - 200);
        ctx.drawImage(signImg, 800, canvas.height - 180, 50, 100);
        ctx.fillText("Info 2", 800, canvas.height - 200);
        ctx.drawImage(signImg, 1000, canvas.height - 180, 50, 100);
        ctx.fillText("Info 3", 1000, canvas.height - 200);
        ctx.drawImage(signImg, 1200, canvas.height - 180, 50, 100);
        ctx.fillText("Info 4", 1200, canvas.height - 200);
        ctx.drawImage(signImg, 1400, canvas.height - 180, 50, 100);
        ctx.fillText("Info 5", 1400, canvas.height - 200);

        // Desenha o Mario
        ctx.drawImage(marioImg, 50, canvas.height - 150, 50, 50);
    }

    // Redesenha o mapa em caso de redimensionamento da janela
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawMap();
    });

    // Desenha o mapa quando a página carregar
    drawMap();
}