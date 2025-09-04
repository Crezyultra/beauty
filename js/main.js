// Инициализация AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

document.addEventListener('DOMContentLoaded', function () {
    feather.replace();

    // Прелоадер
    setTimeout(() => {
        document.getElementById('preloader').style.opacity = '0';
        setTimeout(() => document.getElementById('preloader').style.display = 'none', 300);
    }, 1000);

    // Мобильное меню
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    hamburger?.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
        hamburgerMenu.classList.toggle('active');
    });

    document.querySelectorAll('#mobileMenu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            hamburgerMenu.classList.remove('active');
        });
    });

    // Кнопка "Наверх"
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop?.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Портфолио: модальное окно
    const portfolioButtons = document.querySelectorAll('.view-portfolio-btn');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    let scale = 1;

    portfolioButtons.forEach(button => {
        button.addEventListener('click', () => {
            modalImage.src = button.getAttribute('data-img');
            modalImage.alt = 'Пример работы';
            portfolioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            scale = 1;
            modalImage.style.transform = `scale(${scale})`;
        });
    });

    zoomIn?.addEventListener('click', () => {
        scale += 0.1;
        modalImage.style.transform = `scale(${scale})`;
    });

    zoomOut?.addEventListener('click', () => {
        if (scale > 0.5) {
            scale -= 0.1;
            modalImage.style.transform = `scale(${scale})`;
        }
    });

    closeModal?.addEventListener('click', closeModalHandler);
    portfolioModal?.addEventListener('click', (e) => {
        if (e.target === portfolioModal) closeModalHandler();
    });

    function closeModalHandler() {
        portfolioModal.classList.remove('active');
        document.body.style.overflow = 'auto';
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
    }

    // Модальное окно успеха
    const successModal = document.getElementById('successModal');
    const closeSuccessModal = document.getElementById('closeSuccessModal');
    closeSuccessModal?.addEventListener('click', () => {
        successModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Flatpickr
    flatpickr(".flatpickr", {
        minDate: "today",
        dateFormat: "d.m.Y",
        locale: "ru"
    });

    // Отправка формы
    const bookingForm = document.getElementById('bookingForm');
    bookingForm?.addEventListener('submit', function (e) {
        e.preventDefault();
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        bookingForm.reset();
    });

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});