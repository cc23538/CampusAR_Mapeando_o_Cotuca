// Seleciona o elemento canvas
const canvas = document.getElementById('mapa');
// Define o contexto como 2D
const ctx = canvas.getContext('2d');

// Função para escrever uma frase no canvas
function writeText(text, x, y, fontSize = 24, color = 'black', font = 'Arial') {
    ctx.font = `${fontSize}px ${font}`; // Define o tamanho e a fonte do texto
    ctx.fillStyle = color; // Define a cor do texto
    ctx.fillText(text, x, y); // Escreve o texto no canvas
}

// Função para adicionar uma imagem ao canvas
function addImage(imgSrc, x, y, width, height) {
    const img = new Image(); // Cria um novo objeto de imagem
    img.src = imgSrc; // Define a origem da imagem

    // Evento de carregamento da imagem
    img.onload = function() {
        // Desenha a imagem no canvas
        ctx.drawImage(img, x, y, width, height);
    };
}

// Função para definir o tamanho do canvas
function resizeCanvas() {
    // Define o tamanho do canvas como o tamanho total da janela do navegador
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Limpa o canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Escreve a frase no centro do canvas
    writeText('Olá, mundo!', canvas.width / 2, canvas.height / 2);

    // Adiciona uma imagem ao canvas
    addImage('/SRC/IMG/RA-teste.png', 100,100, 500, 500);
}

// Chama a função de redimensionamento inicialmente
resizeCanvas();

// Chama a função de redimensionamento sempre que a janela for redimensionada
window.addEventListener('resize', resizeCanvas);