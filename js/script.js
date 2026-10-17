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
    
    // Mudado para innerHTML para aceitar tags HTML no texto
    if (textoElem) textoElem.innerHTML = atual.texto || '';

    // Lógica da Foto
    if (fotoElem) {
      if (atual.foto) {
        fotoElem.src = atual.foto;
        fotoElem.alt = `Foto de ${atual.autor}`;
        fotoElem.style.display = 'block';
      } else {
        fotoElem.style.display = 'none';
      }
    } // <-- AQUI FALTAVA FECHAR A CHAVE DA FOTO

    // Lógica do Áudio
    const player = document.getElementById('reflexao-player');
    if (player && atual.audio) {
      player.src = atual.audio;
      player.load();
    }
  // 5. RENDEREIZAR HISTÓRICO COMPLETO DE REFLEXÕES (Página historico-reflexoes.html)
document.addEventListener('DOMContentLoaded', () => {
  const containerHistorico = document.getElementById('lista-historico-reflexoes');
  const dados = window.historicoReflexoes;

  if (containerHistorico && dados && dados.length > 0) {
    containerHistorico.innerHTML = ''; // Limpa o container

    dados.forEach((reflexao, index) => {
      const card = document.createElement('article');
      card.className = 'card-reflexao';
      card.style.marginBottom = '1.5rem';

      card.innerHTML = `
        <div class="reflexao-header">
          <div class="autor-info">
            <div class="autor-foto-container">
              <img src="${reflexao.foto || 'imagem/logo-cinza.png'}" alt="Foto de ${reflexao.autor}" class="autor-foto">
            </div>
            <div>
              <h3 class="autor-nome">${reflexao.autor || 'Comunidade Batista'}</h3>
              <span class="reflexao-data">${reflexao.data || ''}</span>
            </div>
          </div>

          ${reflexao.audio ? `
            <div class="reflexao-audio-container" style="margin: 1.2rem 0; padding: 0.8rem; background-color: rgba(50, 188, 173, 0.08); border-radius: 8px;">
              <p style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; color: var(--color-primary);">
                <i class="fas fa-volume-up"></i> Ouvir a mensagem narrada:
              </p>
              <audio controls style="width: 100%; height: 40px; border-radius: 6px;">
                <source src="${reflexao.audio}" type="audio/mpeg">
                Seu navegador não suporta o reprodutor de áudio.
              </audio>
            </div>
          ` : ''}
        </div>

        <h3>${reflexao.titulo || ''}</h3>
        <blockquote>${reflexao.verso || ''}</blockquote>
        <div>${reflexao.texto || ''}</div>
      `;

      containerHistorico.appendChild(card);
    });
  }
});
