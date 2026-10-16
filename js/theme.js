// ==========================================
// CONTROLE DO TEMA CLARO / ESCURO
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  // Função para atualizar o ícone do botão
  const updateIcon = (isDark) => {
    if (themeIcon) {
      if (isDark) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    }
  };

  // 1. Aplica o tema salvo no computador/celular assim que carrega
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateIcon(true);
  } else {
    document.body.classList.remove('dark-theme');
    updateIcon(false);
  }

  // 2. Clique do botão
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      
      updateIcon(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }
});
