// Ждем, пока вся HTML-страница будет готова к работе
document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM готов. Запускаю скрипты...');

  // ===================================================================
  // 1. УНИВЕРСАЛЬНАЯ ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ HTML-БЛОКОВ
  // ===================================================================

  // Эта функция загружает HTML из файла и вставляет его в указанный placeholder
  function loadComponent(placeholderId, filePath) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) {
      // Если на странице нет такого блока, просто выходим
      return; 
    }

    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error(`Не удалось загрузить файл: ${filePath}`);
        return response.text();
      })
      .then(data => {
        placeholder.innerHTML = data;

        // ВАЖНО: Если мы только что загрузили хедер, нужно сразу же инициализировать меню
        if (placeholderId === 'header-placeholder') {
          initializeMobileMenu();
        }
      })
      .catch(error => {
        console.error(`Ошибка при загрузке компонента (${placeholderId}):`, error);
        placeholder.innerHTML = `<p style="color: red; text-align: center;">Не удалось загрузить блок.</p>`;
      });
  }

  // Функция для инициализации логики мобильного меню
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

  loadComponent('header-placeholder', './_header.html');
  loadComponent('footer-placeholder', './_footer.html');
  // Добавьте сюда другие блоки, если они появятся, например:
  // loadComponent('reviews-placeholder', './_reviews.html');

  // ===================================================================
  // 3. АНИМАЦИЯ БЛОКОВ ПРИ ПРОКРУТКЕ
  // ===================================================================

  const animatedBlocks = document.querySelectorAll('.animated-block');

  // Запускаем код анимации, только если на странице есть такие блоки
  if (animatedBlocks.length > 0) {
    console.log(`Найдено анимированных блоков: ${animatedBlocks.length}. Запускаю IntersectionObserver.`);

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Отключаем наблюдение после анимации
        }
      });
    }, {
      threshold: 0.1 // Срабатывание при появлении на 10%
    });

    animatedBlocks.forEach(block => {
      observer.observe(block);
    });
  }

      // --- 3. ЗАГРУЗКА И ВСТАВКА РАЗДЕЛА ЗАКАЗАТЬ НАБОР (новый код) ---
  const ctaPlaceholder = document.getElementById('cta-placeholder');

  // Если на странице есть заглушка для подвала
  if (ctaPlaceholder) {
    fetch('./_cta.html') // Загружаем содержимое файла _cta.html
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); // Преобразуем ответ в текст
      })
      .then(data => {
        ctaPlaceholder.innerHTML = data; // Вставляем HTML подвала в заглушку
      })
      .catch(error => {
        console.error('Ошибка при загрузке подвала:', error);
        ctaPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить подвал.</p>';
      });
  }




}); // <-- Конец обработчика DOMContentLoaded

