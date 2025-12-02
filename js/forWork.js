// Ждем, пока вся HTML-страница будет готова к работе
document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM готов. Запускаю скрипты...');

  function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      return; 
    }

    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Не удалось загрузить файл: ${filePath}`);
        return response.text();
      })
      .then(data => {
        placeholder.innerHTML = data;

        if (placeholderId === 'header-placeholder') {
          initializeMobileMenu();
        }
      })
      .catch(error => {
        console.error(`Ошибка при загрузке компонента (${placeholderId}):`, error);
        placeholder.innerHTML = `<p style="color: red; text-align: center;">Не удалось загрузить блок.</p>`;
      });
  }


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

  loadComponent('header-placeholder', './header.html');
  loadComponent('footer-placeholder', './footer.html');


  // ===================================================================
  // 3. АНИМАЦИЯ БЛОКОВ ПРИ ПРОКРУТКЕ
  // ===================================================================

  const animatedBlocks = document.querySelectorAll('.animated-block');

  if (animatedBlocks.length > 0) {
    console.log(`Найдено анимированных блоков: ${animatedBlocks.length}. Запускаю IntersectionObserver.`);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); 
        }
      });
    }, {
      threshold: 0.1 /
    });

    animatedBlocks.forEach(block => {
      observer.observe(block);
    });
  }

      // --- 3. ЗАГРУЗКА И ВСТАВКА РАЗДЕЛА ЗАКАЗАТЬ НАБОР (новый код) ---
  const ctaPlaceholder = document.getElementById('cta-placeholder');

 
  if (ctaPlaceholder) {
    fetch('./cta.html') 
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); 
      })
      .then(data => {
        ctaPlaceholder.innerHTML = data; 
      })
      .catch(error => {
        console.error('Ошибка при загрузке подвала:', error);
        ctaPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить подвал.</p>';
      });
  }




}); 





