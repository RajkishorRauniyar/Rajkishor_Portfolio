// ============================================
// Rajkishor Rauniyar Portfolio - Interactive JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initDarkMode();
    initNavbar();
    initTypingAnimation();
    initSmoothScroll();
    initSkillBars();
    initProjectFilters();
    initTestimonialSlider();
    initChatbot();
    initContactForm();
    initNotificationSystem();
    initCVDownload();
});

// ============================================
// CV Download Functionality
// ============================================
function initCVDownload() {
    const cvButtons = document.querySelectorAll('.btn-cv');
    const downloadCVHero = document.getElementById('downloadCV');
    
    function handleCVDownload(type) {
        // Show notification that CV is being prepared
        showNotification('Preparing CV Download', `Generating ${type} resume...`, 'info');
        
        // Simulate download delay
        setTimeout(() => {
            showNotification('CV Ready', 'Your CV has been downloaded!', 'success');
            showNotification('New Download', `Someone downloaded the ${type} CV`, 'info');
        }, 1500);
        
        // In a real scenario, you would link to actual PDF files:
        // window.open('path/to/your-cv.pdf', '_blank');
    }
    
    cvButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cvType = btn.getAttribute('data-cv');
            const typeName = cvType === 'professional' ? 'Professional' : 'Technical';
            handleCVDownload(typeName);
        });
    });
    
    if (downloadCVHero) {
        downloadCVHero.addEventListener('click', (e) => {
            e.preventDefault();
            handleCVDownload('Professional');
        });
    }
}

// ============================================
// Dark Mode Toggle
// ============================================
function initDarkMode() {
    const toggle = document.getElementById('darkModeToggle');
    const icon = toggle.querySelector('i');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        showNotification('Theme Changed', `Switched to ${newTheme} mode`, 'success');
    });
}

// ============================================
// Navbar
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const bars = navToggle.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ============================================
// Typing Animation
// ============================================
function initTypingAnimation() {
    const phrases = [
        'Software Engineer',
        'AI Builder',
        'Entrepreneur',
        'Full Stack Developer',
        'E-commerce Specialist'
    ];
    
    const typingText = document.querySelector('.typing-text');
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// ============================================
// Smooth Scroll
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// Skill Bars Animation
// ============================================
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// Project Filters
// ============================================
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                }
            });
            
            showNotification('Projects Filtered', `Showing ${filter} projects`, 'info');
        });
    });
}

// ============================================
// Testimonial Slider
// ============================================
function initTestimonialSlider() {
    const track = document.querySelector('.testimonial-track');
    const dots = document.querySelectorAll('.dot');
    const cards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    let autoplayInterval;
    
    function updateSlider(index) {
        const cardWidth = cards[0].offsetWidth + 30; // Including gap
        track.style.transform = `translateX(-${index * cardWidth}px)`;
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    function nextSlide() {
        const nextIndex = (currentIndex + 1) % (cards.length - 2);
        updateSlider(nextIndex);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoplayInterval);
            updateSlider(index);
            startAutoplay();
        });
    });
    
    // Autoplay
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }
    
    startAutoplay();
    
    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    track.addEventListener('mouseleave', startAutoplay);
}

// ============================================
// AI Chatbot
// ============================================
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const quickReplies = document.querySelectorAll('.quick-reply');
    
    // Bot responses
    const botResponses = {
        'services': "I offer web development (HTML, CSS, JavaScript, React, Next.js), AI/ML solutions, e-commerce development, backend APIs (Node.js, Python, PHP), and automation services. What would you like to know more about?",
        'projects': "I've worked on AI Disease Detection, Online Banking System, Blood Bank Management, Portfolio websites, and e-commerce platforms like Taste Of Terai and Trending Bazar Nepal. Want to see any specific project details?",
        'contact': "You can reach me at:\n📧 rajkishorrauniyar3@gmail.com\n📱 +977 9741889439\n📍 Lalitpur, Nepal\nOr use the contact form on this page!",
        'about': "I'm Rajkishor Rauniyar, a Software Engineer from Nepal with expertise in Full Stack Development, AI, and E-commerce Automation. I'm also co-founder of Taste Of Terai and Trending Bazar Nepal, and create content on my YouTube channel 'Rajkishor Myth Decoder'."
    };
    
    // Toggle chatbot
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
    });
    
    chatbotClose.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });
    
    // Quick reply messages
    quickReplies.forEach(reply => {
        reply.addEventListener('click', () => {
            const message = reply.getAttribute('data-message').toLowerCase();
            addUserMessage(reply.textContent);
            
            setTimeout(() => {
                let response = '';
                if (message.includes('services')) response = botResponses.services;
                else if (message.includes('projects')) response = botResponses.projects;
                else if (message.includes('contact')) response = botResponses.contact;
                else if (message.includes('about')) response = botResponses.about;
                else response = "Thanks for your message! How can I help you further?";
                
                addBotMessage(response);
            }, 500);
        });
    });
    
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.innerHTML = `<p>${text.replace(/\n/g, '<br>')}</p>`;
        chatbotMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
}

// ============================================
// Contact Form with EmailJS
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.btn-submit');
    
    // EmailJS Configuration
    const EMAILJS_SERVICE_ID = 'service_wtrlck7';
    const EMAILJS_TEMPLATE_ID = 'template_f77pyln';
    const EMAILJS_PUBLIC_KEY = 'zkCgAOLEtB1U8cNJn';
    
    // Initialize EmailJS
    (function() {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    })();
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'rajkishorrauniyar3@gmail.com'
            });
            
            // Success
            showNotification('Message Sent!', 'Thank you for reaching out. I\'ll get back to you soon.', 'success');
            showNotification('New Inquiry', `You received a message from ${name}`, 'info');
            form.reset();
            
        } catch (error) {
            // Error
            showNotification('Send Failed', 'Something went wrong. Please try again or contact directly.', 'error');
            console.error('Email send error:', error);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// Notification System
// ============================================
function initNotificationSystem() {
    // Show welcome notification on first visit
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            showNotification('Welcome!', 'Thanks for visiting my portfolio. Feel free to explore!', 'info');
            localStorage.setItem('visited', 'true');
        }, 1500);
    }
}

function showNotification(title, message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = '';
    switch (type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'info':
            icon = '<i class="fas fa-info-circle"></i>';
            break;
        default:
            icon = '<i class="fas fa-bell"></i>';
    }
    
    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
        <div class="notification-close"><i class="fas fa-times"></i></div>
    `;
    
    container.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add slideOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Additional Animations
// ============================================

// Scroll reveal animation
const revealElements = document.querySelectorAll('.skill-category, .timeline-item, .project-card, .business-card, .testimonial-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrollY = window.pageYOffset;
    if (hero) {
        hero.style.backgroundPositionY = scrollY * 0.5 + 'px';
    }
});

// Cursor trail effect (subtle)
const cursorTrail = [];
document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    if (cursorTrail.length > 10) cursorTrail.shift();
});

// Intersection Observer for animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateOnScroll.observe(el);
});

// Console log for demo
console.log('%c Rajkishor Rauniyar Portfolio ', 'background: #6366f1; color: white; padding: 10px; border-radius: 5px;');
console.log('%c Welcome to my portfolio! ', 'background: #ec4899; color: white; padding: 5px; border-radius: 5px;');
console.log('Feel free to explore the code and customize it as needed.');