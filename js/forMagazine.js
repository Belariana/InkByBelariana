document.addEventListener('DOMContentLoaded', () => {

  console.log('DOM готов. Запускаю скрипты...');

const headerPlaceholder = document.getElementById('header-placeholder');

  if (headerPlaceholder) {
    fetch('/header.html')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text();
      })
      .then(data => {
        headerPlaceholder.innerHTML = data;
        initializeMobileMenu();
      })
      .catch(error => {
        console.error('Ошибка при загрузке хедера:', error);
        headerPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить меню.</p>';
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
    }
  }

  const footerPlaceholder = document.getElementById('footer-placeholder');


  if (footerPlaceholder) {
    fetch('/footer.html') 
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); 
      })
      .then(data => {
        footerPlaceholder.innerHTML = data; 
      })
      .catch(error => {
        console.error('Ошибка при загрузке подвала:', error);
        footerPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить подвал.</p>';
      });
  }


  const ctaPlaceholder = document.getElementById('cta-placeholder');


  if (ctaPlaceholder) {
    fetch('/cta.html') 
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); 
      })
      .then(data => {
        ctaPlaceholder.innerHTML = data; 
      })
      .catch(error => {
        console.error('Ошибка при загрузке блока:', error);
        ctaPlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить форму обратной связи.</p>';
      });
  }

  const pricePlaceholder = document.getElementById('price-placeholder');

  if (pricePlaceholder) {
    fetch('/price.html') 
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.text(); 
      })
      .then(data => {
        pricePlaceholder.innerHTML = data; 
      })
      .catch(error => {
        console.error('Ошибка при загрузке блока:', error);
        pricePlaceholder.innerHTML = '<p style="color: red; text-align: center;">Не удалось загрузить форму обратной связи.</p>';
      });
  }








})
