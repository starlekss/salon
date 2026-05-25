document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');

    // Изменение прозрачности хедера при скролле
    function handleHeaderScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Подсветка активного пункта меню
    function highlightActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', () => {
        handleHeaderScroll();
        highlightActiveLink();
    });
    handleHeaderScroll();

    // Плавная прокрутка
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });

    // Мобильное меню
    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            const spans = mobileBtn.querySelectorAll('span');
            if (navList.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Обработка формы записи
    const form = document.getElementById('appointmentForm');
    const messageDiv = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name')?.value.trim();
            const phone = document.getElementById('phone')?.value.trim();

            if (!name || !phone) {
                showMessage('Пожалуйста, заполните имя и телефон', 'error');
                return;
            }

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Отправляем...';

            setTimeout(() => {
                showMessage(`Спасибо, ${name}! Ваша заявка принята. Мы свяжемся с вами в ближайшее время.`, 'success');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 800);
        });
    }

    function showMessage(msg, type) {
        if (messageDiv) {
            messageDiv.textContent = msg;
            messageDiv.style.color = type === 'error' ? '#d9534f' : '#28a745';
            messageDiv.style.padding = '10px';
            messageDiv.style.fontSize = '0.85rem';
            setTimeout(() => {
                messageDiv.textContent = '';
            }, 5000);
        } else {
            alert(msg);
        }
    }

    // Установка минимальной даты
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    // Анимация появления карточек
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .gallery-item, .about-image, .contact-form-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});