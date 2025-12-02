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

  loadComponent('header-placeholder', '/_header.html');
  loadComponent('footer-placeholder', '/_footer.html');
  // Добавьте сюда другие блоки, если они появятся, например:
  // loadComponent('reviews-placeholder', './_reviews.html');


      // --- 3. ЗАГРУЗКА И ВСТАВКА РАЗДЕЛА ЗАКАЗАТЬ НАБОР (новый код) ---
  const ctaPlaceholder = document.getElementById('cta-placeholder');

  // Если на странице есть заглушка для подвала
  if (ctaPlaceholder) {
    fetch('/_cta.html') // Загружаем содержимое файла _cta.html
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

// Вставьте этот код внутрь вашего DOMContentLoaded

const galleries = document.querySelectorAll('.image-gallery');
const ACTIVE_CLASS = 'is-active';
const CHANGE_INTERVAL = 2000; // 2 секунды

galleries.forEach(gallery => {
    const images = gallery.querySelectorAll('.gallery-image');
    let currentIndex = 0;
    let intervalId = null;

    if (images.length <= 1) return; // Не запускать анимацию, если картинок мало

    // Функция для обновления активного изображения
    function updateActiveImage() {
        // Убираем класс is-active со всех картинок в текущей галерее
        images.forEach(img => img.classList.remove(ACTIVE_CLASS));
        // Добавляем класс is-active текущей картинке
        images[currentIndex].classList.add(ACTIVE_CLASS);

        // Переходим к следующей картинке, зацикливая карусель
        currentIndex = (currentIndex + 1) % images.length;
    }

    // Функция для запуска анимации в зависимости от ширины экрана
    function manageAnimation() {
        // Останавливаем предыдущий интервал, чтобы избежать дублирования
        if (intervalId) {
            clearInterval(intervalId);
        }

        // Возвращаем все в исходное состояние перед проверкой
        images.forEach(img => img.classList.remove(ACTIVE_CLASS));

        // Проверяем ширину окна
        if (window.innerWidth > 767.98) {
            // ДЕСКТОПНАЯ ВЕРСИЯ: "бегающий" огонек
            updateActiveImage(); // Показываем первую картинку сразу
            intervalId = setInterval(updateActiveImage, CHANGE_INTERVAL);
        } else {
            // МОБИЛЬНАЯ ВЕРСИЯ: слайдер с плавным затуханием
            // Класс is-active здесь не используется, CSS сам управляет через :not(:first-child)
            // и JS просто меняет opacity
            currentIndex = 0; // Сбрасываем индекс
            images.forEach((img, index) => {
                img.style.opacity = index === 0 ? '1' : '0';
            });

            intervalId = setInterval(() => {
                const nextIndex = (currentIndex + 1) % images.length;
                images[currentIndex].style.opacity = '0';
                images[nextIndex].style.opacity = '1';
                currentIndex = nextIndex;
            }, CHANGE_INTERVAL);
        }
    }

    // Запускаем анимацию при загрузке страницы
    manageAnimation();

    // Перезапускаем анимацию при изменении размера окна,
    // чтобы переключиться между десктопной и мобильной логикой
    window.addEventListener('resize', manageAnimation);
});


}); // <-- Конец обработчика DOMContentLoaded

