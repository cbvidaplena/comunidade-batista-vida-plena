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

// 4. SEÇÃO REFLEXÃO MENSAL (Página index.html)
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
    
    if (textoElem) textoElem.innerHTML = atual.texto || '';

    if (fotoElem) {
      if (atual.foto) {
        fotoElem.src = atual.foto;
        fotoElem.alt = `Foto de ${atual.autor}`;
        fotoElem.style.display = 'block';
      } else {
        fotoElem.style.display = 'none';
      }
    }

    const player = document.getElementById('reflexao-player');
    if (player && atual.audio) {
      player.src = atual.audio;
      player.load();
    }
  }
}); // <-- AQUI ESTAVA A FALTAR FECHAR A SEÇÃO 4

// 5. RENDERIZAR HISTÓRICO COMPLETO DE REFLEXÕES (Página historico-reflexoes.html)
document.addEventListener('DOMContentLoaded', () => {
  const containerHistorico = document.getElementById('lista-historico-reflexoes');
  const dados = window.historicoReflexoes;

  if (containerHistorico && dados && dados.length > 0) {
    containerHistorico.innerHTML = ''; // Limpa o container

    dados.forEach((reflexao) => {
      const card = document.createElement('div');
      card.className = 'card-reflexao';
      card.style.marginBottom = '2rem';

      const fotoHtml = reflexao.foto 
        ? `<img src="${reflexao.foto}" alt="Foto de ${reflexao.autor || ''}" class="autor-foto">`
        : `<img src="imagem/logo-cinza.png" alt="Logo" class="autor-foto">`;

      const audioHtml = reflexao.audio ? `
        <div class="reflexao-audio-container" style="margin: 1.2rem 0; padding: 0.8rem; background-color: rgba(50, 188, 173, 0.08); border-radius: 8px;">
          <p style="font-size: 0.85rem; font-weight: 600; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.5rem; color: var(--color-primary);">
            <i class="fas fa-volume-up"></i> Ouvir a mensagem narrada:
          </p>
          <audio controls style="width: 100%; height: 40px; border-radius: 6px;">
            <source src="${reflexao.audio}" type="audio/mpeg">
            Seu navegador não suporta o reprodutor de áudio.
          </audio>
        </div>
      ` : '';

      card.innerHTML = `
        <div class="reflexao-header">
          <div class="autor-info">
            <div class="autor-foto-container">
              ${fotoHtml}
            </div>
            <div>
              <h3 class="autor-nome">${reflexao.autor || 'Comunidade Batista'}</h3>
              <span style="font-size: 0.85rem; color: #666;">${reflexao.data || ''}</span>
            </div>
          </div>
          ${audioHtml}
        </div>

        <h3 style="margin-top: 1rem;">${reflexao.titulo || ''}</h3>
        ${reflexao.verso ? `<blockquote>${reflexao.verso}</blockquote>` : ''}
        <div style="margin-top: 1rem;">${reflexao.texto || ''}</div>
      `;

      containerHistorico.appendChild(card);
    });
  }
});

// 1. Quando a página carrega, verifica se o visitante já preencheu o cartão
document.addEventListener("DOMContentLoaded", function () {
  const jaPreencheu = localStorage.getItem("cartaoConexaoPreenchido");
  if (jaPreencheu === "true") {
    const btn = document.getElementById("btn-conexao-flutuante");
    if (btn) {
      btn.style.display = "none"; // Mantém o botão escondido
    }
  }
});

// Função para abrir a janela do Cartão de Conexão
function abrirCartaoConexao() {
  document.getElementById('modal-cartao-conexao').style.display = 'flex';
}

// Função para fechar a janela
function fecharCartaoConexao() {
  document.getElementById('modal-cartao-conexao').style.display = 'none';
}

// Fechar modal ao clicar fora da caixa branca
window.onclick = function(event) {
  const modal = document.getElementById('modal-cartao-conexao');
  if (event.target === modal) {
    fecharCartaoConexao();
  }
};

// Função para montar, enviar os dados e esconder o botão
function enviarCartaoConexao(event) {
  event.preventDefault(); // Impede o recarregamento da página

  // Coloque o número do WhatsApp da igreja com DDD (Ex: 5561999999999)
  const numeroWhatsappIgreja = "5561984716131";

  const nome = document.getElementById('nome-visitante').value;
  const telefone = document.getElementById('tel-visitante').value;
  const oracao = document.getElementById('pedido-oracao').value;

  // Montagem do texto formatado
  let mensagem = `*Cartão de Conexão - Visitante do Site*%0A%0A`;
  mensagem += `*Nome:* ${encodeURIComponent(nome)}%0A`;
  mensagem += `*WhatsApp:* ${encodeURIComponent(telefone)}%0A`;

  if (oracao.trim() !== '') {
    mensagem += `*Pedido de Oração:* ${encodeURIComponent(oracao)}%0A`;
  }

  // 2. Guarda na memória do navegador que o visitante já preencheu
  localStorage.setItem("cartaoConexaoPreenchido", "true");

  // 3. Esconde o botão imediatamente na tela
  const btn = document.getElementById("btn-conexao-flutuante");
  if (btn) {
    btn.style.display = "none";
  }

  // Abre o WhatsApp com a mensagem
  const urlWhatsapp = `https://wa.me/${numeroWhatsappIgreja}?text=${mensagem}`;
  window.open(urlWhatsapp, '_blank');

  // Limpa o formulário e fecha o modal
  document.getElementById('form-conexao').reset();
  fecharCartaoConexao();
}
