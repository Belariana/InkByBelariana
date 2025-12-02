// Ждем, пока вся HTML-страница будет готова к работе
document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM готов. Запускаю скрипты...');

  // 1. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ HTML-БЛОКОВ
  // ===================================================================

  function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      console.warn(`Плейсхолдер с ID "${placeholderId}" не найден.`);
      return;
    }

    fetch(filePath)
      .then(response => {
        // ИСПРАВЛЕНО: Строка обернута в обратные кавычки
        if (!response.ok) throw new Error(`Не удалось загрузить файл: ${filePath}`);
        return response.text();
      })
      .then(data => {
        placeholder.innerHTML = data;

        // Инициализируем мобильное меню только после загрузки хедера
        if (placeholderId === 'header-placeholder') {
          initializeMobileMenu();
        }
      })
      .catch(error => {
        // ИСПРАВЛЕНО: Строка обернута в обратные кавычки
        console.error(`Ошибка при загрузке компонента (${placeholderId}):`, error);
        // ИСПРАВЛЕНО: HTML обернут в одинарные кавычки
        placeholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить блок.</p>';
      });
  }

  // Функция для инициализации мобильного меню (вызывается после загрузки хедера)
  function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    if (hamburger && mainNav) {
      hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('is-open');
        });
      });
      console.log('Мобильное меню успешно инициализировано.');
    } else {
      console.warn('Элементы для мобильного меню не найдены. Проверьте HTML в _header.html.');
    }
  }

  // ===================================================================
  // 2. ЗАГРУЗКА ВСЕХ НЕОБХОДИМЫХ БЛОКОВ
  // ===================================================================

  // УЛУЧШЕНО: Используем единую функцию для всех блоков
  loadComponent('header-placeholder', '/header.html');
  loadComponent('footer-placeholder', '/footer.html');
  loadComponent('cta-placeholder', '/cta.html');
  loadComponent('price-placeholder', '/price.html');

  // ===================================================================
  // 3. АНИМАЦИЯ БЛОКОВ ПРИ ПРОКРУТКЕ
  // ===================================================================

  const animatedBlocks = document.querySelectorAll('.animated-block');

  if (animatedBlocks.length > 0) {
    // ИСПРАВЛЕНО: Строка обернута в обратные кавычки
    console.log(`Найдено анимированных блоков: ${animatedBlocks.length}. Запускаю IntersectionObserver.`);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      // ИСПРАВЛЕНО: Убран лишний символ "/"
      threshold: 0.1
    });

    animatedBlocks.forEach(block => {
      observer.observe(block);
    });
  }
});
