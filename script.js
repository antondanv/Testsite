// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollToTop = document.querySelector('.scroll-to-top');
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
const contactForm = document.getElementById('contactForm');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonialCards = document.querySelectorAll('.testimonial-card');

// Init AOS animation
function initAOS() {
    // Check if items with data-aos exist
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length > 0) {
        // Simulate AOS library by adding animation classes
        aosElements.forEach(element => {
            const delay = element.getAttribute('data-aos-delay') || 0;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            element.style.opacity = '1';
                            element.style.transform = 'translateY(0)';
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
            
            // Initial style
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s ease-in-out';
        });
    }
}

// Адаптивная кнопка "Наверх" - меняет цвет в зависимости от секции
function updateScrollButtonStyle() {
    if (!scrollToTop) return;

    const sections = document.querySelectorAll('section');
    let currentSection = null;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section;
        }
    });

    if (currentSection) {
        const sectionId = currentSection.getAttribute('id');

        // Пример: если секция с id "contact", меняем стиль кнопки
        if (sectionId === 'contact') {
            scrollToTop.classList.add('light-mode');
        } else {
            scrollToTop.classList.remove('light-mode');
        }
    }
}

// Обновляем стиль кнопки при прокрутке
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Show/hide scroll to top button
    if (window.scrollY > 500) {
        scrollToTop.classList.add('active');
        updateScrollButtonStyle(); // Обновляем стиль кнопки
    } else {
        scrollToTop.classList.remove('active');
    }
});

// Также обновляем при изменении размера окна
window.addEventListener('resize', updateScrollButtonStyle);

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (!anchor.classList.contains('btn')) { // Не обрабатываем кнопки повторно
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }, 10);
            }
        });
    }
});

// Scroll to top
scrollToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Portfolio filter
if (filterBtns.length > 0 && portfolioItems.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 200);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
}

// Testimonial slider functionality
let currentSlide = 0;

function showSlide(n) {
    if (testimonialCards.length > 0) {
        // Hide all slides
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        
        // Show current slide
        if (testimonialCards[n]) {
            testimonialCards[n].style.display = 'block';
        }
    }
}

// Initialize testimonial slider
if (testimonialCards.length > 0) {
    showSlide(currentSlide);
    
    if (prevBtn && nextBtn) {
        // Next button
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            if (currentSlide >= testimonialCards.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialCards.length - 1;
            }
            showSlide(currentSlide);
        });
    }
}

// Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;
        
        if (name && email && phone && message) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(() => {
                alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        } else {
            alert('Пожалуйста, заполните все поля формы.');
        }
    });
}

// Active nav link based on scroll position
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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

// Animate service cards on hover with 3D effect
const serviceCards = document.querySelectorAll('.service-card');

if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((x - rect.width / 2) / rect.width) * -10;
            
            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseout', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// Initialize functions on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initAOS();
    setActiveNavLink();
    
    // Add transition to portfolio items
    if (portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.style.transition = 'all 0.5s ease-in-out';
        });
    }
    
    // Add animation to numbers in stats
    const statNumbers = document.querySelectorAll('.stat h3');
    
    if (statNumbers.length > 0) {
        const observerOptions = {
            threshold: 0.5
        };
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = parseInt(target.textContent);
                    let currentNumber = 0;
                    
                    const interval = setInterval(() => {
                        currentNumber += Math.ceil(finalNumber / 20);
                        
                        if (currentNumber >= finalNumber) {
                            currentNumber = finalNumber;
                            clearInterval(interval);
                        }
                        
                        target.textContent = currentNumber + (target.textContent.includes('+') ? '+' : '');
                    }, 50);
                    
                    statsObserver.unobserve(target);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            statsObserver.observe(stat);
        });
    }

    // Обработчик кликов для кнопок "Заказать сайт" и "Наши услуги"
    const heroBtns = document.querySelectorAll('.hero-btns .btn');
    
    heroBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Запускаем первичную проверку стиля кнопки
    setTimeout(updateScrollButtonStyle, 500);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
    }
}); 