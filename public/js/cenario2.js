document.addEventListener('DOMContentLoaded', () => {
    const iniciarRAButton = document.getElementById('iniciarRA');
    const conteudoInicial = document.getElementById('conteudoInicial');
    const conteudoAR = document.getElementById('conteudoAR');
    const background = document.getElementById('background');
    const sairARButton = document.getElementById('sairAR');
  
    iniciarRAButton.addEventListener('click', () => {
      conteudoAR.style.display = 'block';
      conteudoInicial.style.display = 'none';
      background.style.display = 'none';
    });
  
    sairARButton.addEventListener('click', () => {
      conteudoAR.style.display = 'none';
      conteudoInicial.style.display = 'flex';
      background.style.display = 'block';
    });
  });

  