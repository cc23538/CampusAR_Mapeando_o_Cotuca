
class CommentManager {
    constructor() {
        this.commentHashTable = {};
        this.initPreSavedComments();
    }

    // Inicializa os comentários pré-salvos
    initPreSavedComments() {
        const preSavedComments = [
            { text: "A experiência de explorar o Cotuca virtualmente foi incrível! Me senti realmente dentro da escola.", author: "João Silva" },
            { text: "Ótima iniciativa para conhecermos melhor os laboratórios. Parabéns pelo projeto!", author: "Maria Santos" },
            { text: "Estou impressionado com a qualidade da interação em realidade aumentada oferecida pelo Cotuca. Excelente trabalho!", author: "Carlos Oliveira" },
            { text: "A plataforma de realidade aumentada do Cotuca é incrível! Recomendo a todos que queiram conhecer a escola de uma forma inovadora.", author: "Ana Souza" },
            { text: "Os laboratórios do Cotuca são muito bem equipados e a experiência de realidade aumentada me ajudou a visualizá-los melhor.", author: "Pedro Fernandes" },
            { text: "Fantástico poder explorar a escola virtualmente. Uma excelente maneira de conhecer todos os cantos do Cotuca.", author: "Camila Oliveira" },
            { text: "Parabéns pelo projeto! Consegui ter uma visão completa da escola através da realidade aumentada.", author: "Luisa Mendes" },
            { text: "Impressionante como a tecnologia foi integrada à experiência educacional. Muito bem feito!", author: "Fernando Almeida" }
        ];

        preSavedComments.forEach((comment, index) => {
            this.commentHashTable[index + 1] = { text: comment.text, author: comment.author };
        });
    }

    // Adiciona um comentário à tabela de hash
    addComment(text, author) {
        const commentKey = Object.keys(this.commentHashTable).length + 1;
        this.commentHashTable[commentKey] = { text: text, author: author };
        this.renderComments();
    }

    // Renderiza os comentários no carousel
    renderComments() {
        const carouselInner = document.getElementById("carousel-inner");
        carouselInner.innerHTML = '';

        let commentCount = 0;
        let activeClass = 'active';
        let carouselItem;

        Object.keys(this.commentHashTable).forEach(key => {
            const comment = this.commentHashTable[key];

            if (commentCount % 3 === 0) {
                carouselItem = document.createElement("div");
                carouselItem.className = "carousel-item " + activeClass;
                activeClass = '';

                const row = document.createElement("div");
                row.className = "row";
                carouselItem.appendChild(row);
            }

            const col = document.createElement("div");
            col.className = "col-lg-4 mb-4";

            const card = document.createElement("div");
            card.className = "card shadow-sm";

            const cardBody = document.createElement("div");
            cardBody.className = "card-body";

            const cardText = document.createElement("p");
            cardText.className = "card-text";
            cardText.textContent = `"${comment.text}"`;

            const cardAuthor = document.createElement("p");
            cardAuthor.className = "card-text";
            cardAuthor.innerHTML = `<strong>${comment.author}</strong>`;

            cardBody.appendChild(cardText);
            cardBody.appendChild(cardAuthor);
            card.appendChild(cardBody);
            col.appendChild(card);
            carouselItem.querySelector('.row').appendChild(col);

            if ((commentCount + 1) % 3 === 0 || commentCount === Object.keys(this.commentHashTable).length - 1) {
                carouselInner.appendChild(carouselItem);
            }

            commentCount++;
        });

        const firstCarouselItem = carouselInner.querySelector('.carousel-item');
        if (firstCarouselItem) {
            firstCarouselItem.classList.add('active');
        }
    }
}

export default CommentManager;