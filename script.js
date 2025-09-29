document.addEventListener('DOMContentLoaded', function () {
    initTypewriter();
    initThemeToggle();
    initMobileMenu();
    initScrollAnimations();
    initSkillBars();
    initContactForm();
    initNavigation();
    initEditAbout();
});

function initTypewriter() {
    const nameElement = document.getElementById('typewriter-name');
    const nameText = "Wena Rose N. Contiga";
    let i = 0;

    nameElement.innerHTML = '';

    function typeWriter() {
        if (i < nameText.length) {
            nameElement.innerHTML += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            const cursor = document.createElement('span');
            cursor.className = 'typewriter-cursor';
            nameElement.appendChild(cursor);
        }
    }

    setTimeout(typeWriter, 500);
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-theme';
    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', function () {
        const currentTheme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';

        document.body.className = newTheme;
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-theme') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }
}

function initMobileMenu() {
    const mobileMenuIcon = document.getElementById('mobileMenu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('mobile-active');

        const icon = mobileMenuIcon.querySelector('i');
        if (navLinks.classList.contains('mobile-active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function () {
            navLinks.classList.remove('mobile-active');
            mobileMenuIcon.querySelector('i').className = 'fas fa-bars';
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section, .project-card, .service-card, .cert-item, .education-item, .experience-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.getAttribute('data-level');
                skillBar.style.width = level;
                observer.unobserve(skillBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);

            contactForm.reset();
        });
    }
}

function initNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function () {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

function initEditAbout() {
    const editBtn = document.getElementById('editAboutBtn');
    const aboutContent = document.getElementById('aboutContent');

    if (editBtn && aboutContent) {
        editBtn.addEventListener('click', function () {
            const currentText = aboutContent.textContent;
            const newText = prompt('Edit your about section:', currentText);

            if (newText !== null && newText.trim() !== '') {
                aboutContent.textContent = newText;
                localStorage.setItem('portfolio-about', newText);
            }
        });

        const savedAbout = localStorage.getItem('portfolio-about');
        if (savedAbout) {
            aboutContent.textContent = savedAbout;
        }
    }
}

document.head.insertAdjacentHTML('beforeend', `
    <style>
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 80px;
                left: 0;
                width: 100%;
                background-color: var(--nav-bg);
                flex-direction: column;
                padding: 20px;
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                transition: transform 0.3s ease, opacity 0.3s ease;
                z-index: 999;
            }
            
            .nav-links.mobile-active {
                transform: translateY(0);
                opacity: 1;
            }
            
            .nav-link {
                padding: 15px 0;
                width: 100%;
                text-align: center;
                border-bottom: 1px solid rgba(var(--text-color-rgb), 0.1);
            }
            
            .nav-link:last-child {
                border-bottom: none;
            }
        }
    </style>
`);