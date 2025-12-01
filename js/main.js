document.addEventListener('DOMContentLoaded', () => {
  // Эта функция будет выполняться, когда вся HTML-страница загрузится

  // --- 1. ЗАГРУЗКА И ВСТАВКА ХЕДЕРА (ваш существующий код) ---
  const headerPlaceholder = document.getElementById('header-placeholder');

  if (headerPlaceholder) {
    fetch('./_header.html')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
        initializeMobileMenu(); // Запускаем логику меню после вставки
      })
      .catch(error => {
        console.error('Ошибка при загрузке хедера:', error);
        headerPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить меню.</p>';
      });
  }

    function initializeMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const mainNav = document.querySelector('.main-nav');

    // Проверяем, существуют ли эти элементы (на случай ошибки)
    if (hamburger && mainNav) {
      hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('is-open');
      });

      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('is-open');
        });
      });
    }
  }

  // --- 2. ЗАГРУЗКА И ВСТАВКА ПОДВАЛА (новый код) ---
  const footerPlaceholder = document.getElementById('footer-placeholder');

  // Если на странице есть заглушка для подвала
  if (footerPlaceholder) {
    fetch('./_footer.html') // Загружаем содержимое файла _footer.html
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); // Преобразуем ответ в текст
      })
      .then(data => {
        footerPlaceholder.innerHTML = data; // Вставляем HTML подвала в заглушку
      })
      .catch(error => {
        console.error('Ошибка при загрузке подвала:', error);
        footerPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить подвал.</p>';
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

    // --- 3. ЗАГРУЗКА И ВСТАВКА РАЗДЕЛА ЗАКАЗАТЬ НАБОР (новый код) ---
  const pricePlaceholder = document.getElementById('price-placeholder');

  // Если на странице есть заглушка для подвала
  if (pricePlaceholder) {
    fetch('./_price.html') // Загружаем содержимое файла _price.html
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); // Преобразуем ответ в текст
      })
      .then(data => {
        pricePlaceholder.innerHTML = data; // Вставляем HTML подвала в заглушку
      })
      .catch(error => {
        console.error('Ошибка при загрузке подвала:', error);
        pricePlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить подвал.</p>';
      });
  }

 const filterButtonsContainer = document.querySelector('.filter-buttons');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const setCards = document.querySelectorAll('.set-card');

    if (!filterButtonsContainer) return; // Защита, если блока с кнопками нет на странице

    filterButtonsContainer.addEventListener('click', (event) => {
        // Срабатываем только если кликнули по кнопке с классом .filter-btn
        if (!event.target.classList.contains('filter-btn')) return;

        const clickedButton = event.target;

        // 1. Управляем активным классом у кнопок
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        clickedButton.classList.add('active');

        // 2. Получаем тег для фильтрации из data-атрибута
        const filterTag = clickedButton.dataset.filter;

        // 3. Проходимся по всем карточкам и показываем/скрываем их
        setCards.forEach(card => {
            // Получаем все теги карточки из ее data-атрибута
            const cardTags = card.dataset.tags;

            // Проверяем условие
            if (filterTag === 'all' || cardTags.includes(filterTag)) {
                card.style.display = 'flex'; // Показываем карточку
            } else {
                card.style.display = 'none'; // Скрываем карточку
            }
        });
    });




});