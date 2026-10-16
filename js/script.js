// ==========================================================================
// SCRIPT PRINCIPAL UNIFICADO - COMUNIDADE BATISTA VIDA PLENA
// ==========================================================================

document.addEventListener('DOMContentLoaded', function() {

  // 1. MENU HAMBÚRGUER (Todas as páginas)
  const menuToggle = document.getElementById('menu-toggle') || document.getElementById('hamburger') || document.querySelector('.hamburger');
  const navMenu = document.getElementById('nav-menu') || document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
    });

    // Fecha a gaveta lateral se clicar fora do menu
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }

  // 2. LÓGICA DO CARROSSEL (Apenas na index.html)
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let currentSlide = 0;
    let slideInterval;

    const updateSlides = function() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    };

    const nextSlide = function() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    };

    const prevSlide = function() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    };

    const goToSlide = function(index) {
      currentSlide = index;
      updateSlides();
      resetTimer();
    };

    const resetTimer = function() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    };

    // Criar indicadores (dots) dinamicamente
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', function() {
        goToSlide(index);
      });
      dotsContainer.appendChild(dot);
    });

    nextBtn.addEventListener('click', function() {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', function() {
      prevSlide();
      resetTimer();
    });

    // Iniciar rotação automática
    slideInterval = setInterval(nextSlide, 5000);
  }
});

// 3. FUNÇÃO DE COPIAR A CHAVE PIX (Página contribuicao.html)
function copiarPix() {
  const chaveInput = document.getElementById('chavePix');
  const btnText = document.getElementById('btnText');

  if (!chaveInput) return;

  chaveInput.select();
  chaveInput.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(chaveInput.value).then(function() {
    if (btnText) {
      btnText.innerText = "Chave Copiada!";
      setTimeout(function() {
        btnText.innerText = "Copiar Chave PIX";
      }, 3000);
    }
  }).catch(function(err) {
    console.error("Erro ao copiar chave PIX: ", err);
  });
}
// 4. Seção Reflexões mensal
document.addEventListener('DOMContentLoaded', () => {
  const dados = window.historicoReflexoes;

  if (dados && dados.length > 0) {
    const atual = dados[0];

    const autorElem = document.getElementById('reflexao-autor');
    const dataElem = document.getElementById('reflexao-data');
    const tituloElem = document.getElementById('reflexao-titulo');
    const versoElem = document.getElementById('reflexao-verso');
    const textoElem = document.getElementById('reflexao-texto');
    const fotoElem = document.getElementById('reflexao-foto');

    if (autorElem) autorElem.textContent = atual.autor || '';
    if (dataElem) dataElem.textContent = atual.data || '';
    if (tituloElem) tituloElem.textContent = atual.titulo || '';
    if (versoElem) versoElem.textContent = atual.verso || '';
    
    // ALTERAÇÃO AQUI: Mudado para innerHTML
    if (textoElem) textoElem.innerHTML = atual.texto || '';

    if (fotoElem) {
      if (atual.foto) {
        fotoElem.src = atual.foto;
        fotoElem.alt = `Foto de ${atual.autor}`;
        fotoElem.style.display = 'block';
      } else {
        fotoElem.style.display = 'none'; // Esconde a imagem se não houver foto cadastrada
      }
      // LINHAS PARA O ÁUDIO:
const player = document.getElementById('reflexao-player');

if (player && reflexaoHoje.audio) {
  player.src = reflexaoHoje.audio; // Define o caminho diretamente no elemento <audio>
  player.load();                   // Força o carregamento do ficheiro
}
    }
  }
});
