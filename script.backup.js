// ============================================
// PORTFOLIO ALI ECHLOUCHI - JAVASCRIPT
// Modern, Intelligent, Deployable
// ============================================

// ============================================
// 1. PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 500);
});

// ============================================
// 2. PARTICLES.JS INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6366f1" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6366f1",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }

    // Initialize all features with safety checks
    const inits = [
        { name: 'SmoothScroll', fn: initSmoothScroll },
        { name: 'ThemeToggle', fn: initThemeToggle },
        { name: 'MobileMenu', fn: initMobileMenu },
        { name: 'ScrollEffects', fn: initScrollEffects },
        { name: 'TypingEffect', fn: initTypingEffect },
        { name: 'ContactForm', fn: initContactForm },
        { name: 'ScrollToTop', fn: initScrollToTop },
        { name: 'IntersectionObserver', fn: initIntersectionObserver },
        { name: 'ChatWidget', fn: initChatWidget }
    ];

    inits.forEach(item => {
        try {
            item.fn();
        } catch (e) {
            console.error(`Error initializing ${item.name}:`, e);
        }
    });
});

// ============================================
// 3. THEME TOGGLE (DARK/LIGHT MODE)
// ============================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// ============================================
// 4. MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    mobileMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                mobileMenu.querySelector('i').classList.remove('fa-times');
                mobileMenu.querySelector('i').classList.add('fa-bars');
            }

            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ============================================
// 5. SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Update active nav on scroll
        updateActiveNav();
    });
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// 6. TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingText = document.querySelector('.typing');
    if (!typingText) return;

    const words = ['IS2IA', 'Intelligence Artificielle', 'Data Science', 'Développement Full-Stack'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeEffect, 1000);
}

// ============================================
// 7. INTERSECTION OBSERVER (ANIMATIONS)
// ============================================
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Animate skill bars
                if (entry.target.classList.contains('skill-category')) {
                    animateSkillBars(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observe skill categories
    document.querySelectorAll('.skill-category').forEach(el => {
        observer.observe(el);
    });
}

function animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-level');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        }, index * 100);
    });
}

// ============================================
// 8. SCROLL TO TOP BUTTON
// ============================================
function initScrollToTop() {
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// 9. SMOOTH SCROLLING FOR ANCHOR LINKS
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Get header height for offset
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;

                // Calculate position
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 20);

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// 10. CONTACT FORM (FORMSPREE)
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();

        // Validation
        if (!name || !email || !subject || !message) {
            showToast('Erreur', 'Veuillez remplir tous les champs obligatoires.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Erreur', 'Veuillez entrer une adresse email valide.', 'error');
            return;
        }

        // Get submit button
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Show loading
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;

        try {
            // IMPORTANT: Replace YOUR_FORM_ID with your actual Formspree form ID
            // Get your form ID from https://formspree.io after creating a free account
            const FORMSPREE_ID = 'xpqjqqgg'; // ✅ ID activé !

            const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                // Success
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                showToast(
                    'Message envoyé !',
                    `Merci ${name} ! Je vous répondrai dans les 24-48 heures.`,
                    'success'
                );

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 2000);

            } else {
                throw new Error('Erreur lors de l\'envoi');
            }

        } catch (error) {
            console.error('Erreur:', error);

            let errorMessage = 'Une erreur est survenue. ';

            if (error.message.includes('YOUR_FORM_ID')) {
                errorMessage += 'Le formulaire n\'est pas encore configuré. Veuillez me contacter directement à chlouchiali3@gmail.com';
            } else {
                errorMessage += 'Veuillez réessayer ou me contacter directement.';
            }

            showToast('Erreur', errorMessage, 'error');

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// 11. TOAST NOTIFICATION SYSTEM
// ============================================
function showToast(title, message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            <h4>${title}</h4>
            <p>${message}</p>
        </div>
    `;

    document.body.appendChild(toast);

    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);

    // Click to dismiss
    toast.addEventListener('click', () => {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// ============================================
// 12. CONSOLE MESSAGE
// ============================================
console.log('%c👋 Bienvenue sur mon portfolio !', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%c🚀 Développé par Ali Echlouchi', 'color: #10b981; font-size: 14px;');
console.log('%c📧 Contact: chlouchiali3@gmail.com', 'color: #06b6d4; font-size: 12px;');
console.log('%c💼 LinkedIn: https://linkedin.com/in/echlouchi-ali/', 'color: #06b6d4; font-size: 12px;');
console.log('%c🐙 GitHub: https://github.com/EchlouchiAli07', 'color: #06b6d4; font-size: 12px;');

// ============================================
// 13. ANIMATED COUNTERS
// ============================================
// ============================================
// 13. ANIMATED COUNTERS
// ============================================
function initAnimatedCounters() {
    // Select both old and new counter classes
    const counters = document.querySelectorAll('.stat-number, .status-count');
    if (counters.length === 0) return;

    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const startTime = performance.now();

            const updateCounter = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(easeOut * target);

                counter.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target; // Ensure exact final value
                }
            };

            requestAnimationFrame(updateCounter);
        });

        hasAnimated = true;
    };

    // Use Intersection Observer to trigger when stats are visible
    // Observe both old and new containers
    const statsContainer = document.querySelector('.stats-grid, .status-bar');

    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsContainer);
    } else {
        // Fallback: animate immediately if no container found
        animateCounters();
    }
}

// ============================================
// 14. CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) return;

    // Check if device supports hover (not touch)
    if (window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .card, .certification-item, .tag, .theme-toggle, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hover'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        follower.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        follower.style.opacity = '0.5';
    });
}

// ============================================
// 15. DYNAMIC FOOTER YEAR
// ============================================
function initDynamicYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// ============================================
// 16. INITIALIZE NEW FEATURES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    try { initAnimatedCounters(); } catch (e) { console.error('Counters:', e); }
    try { initCustomCursor(); } catch (e) { console.error('Cursor:', e); }
    try { initDynamicYear(); } catch (e) { console.error('Year:', e); }
    try { initRadarChart(); } catch (e) { console.error('Radar:', e); }
    try { initAISkillBars(); } catch (e) { console.error('AI Bars:', e); }
});

// ============================================
// 17. RADAR CHART
// ============================================
function initRadarChart() {
    const canvas = document.getElementById('skillsRadar');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 400 * dpr;
    canvas.height = 400 * dpr;
    ctx.scale(dpr, dpr);

    const centerX = 200, centerY = 200, maxRadius = 150;
    const labels = ['Data Science', 'Web Dev', 'Databases', 'BI', 'Big Data', 'Programming'];
    const values = [90, 88, 85, 78, 72, 83];
    const numAxes = labels.length;
    const angleStep = (2 * Math.PI) / numAxes;

    let animProgress = 0;
    let hasStarted = false;

    function drawChart(progress) {
        ctx.clearRect(0, 0, 400, 400);

        // Draw grid rings
        for (let ring = 1; ring <= 5; ring++) {
            const r = (maxRadius / 5) * ring;
            ctx.beginPath();
            for (let i = 0; i <= numAxes; i++) {
                const angle = (angleStep * i) - Math.PI / 2;
                const x = centerX + r * Math.cos(angle);
                const y = centerY + r * Math.sin(angle);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw axes
        for (let i = 0; i < numAxes; i++) {
            const angle = (angleStep * i) - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(centerX + maxRadius * Math.cos(angle), centerY + maxRadius * Math.sin(angle));
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw data polygon
        ctx.beginPath();
        for (let i = 0; i <= numAxes; i++) {
            const idx = i % numAxes;
            const angle = (angleStep * idx) - Math.PI / 2;
            const r = (values[idx] / 100) * maxRadius * progress;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Gradient fill
        const gradient = ctx.createLinearGradient(50, 50, 350, 350);
        gradient.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
        gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0.2)');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Gradient stroke
        const strokeGrad = ctx.createLinearGradient(50, 50, 350, 350);
        strokeGrad.addColorStop(0, '#6366f1');
        strokeGrad.addColorStop(0.5, '#10b981');
        strokeGrad.addColorStop(1, '#06b6d4');
        ctx.strokeStyle = strokeGrad;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw data points with glow
        for (let i = 0; i < numAxes; i++) {
            const angle = (angleStep * i) - Math.PI / 2;
            const r = (values[i] / 100) * maxRadius * progress;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

            // Glow
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
            ctx.fill();

            // Point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = '#6366f1';
            ctx.fill();
        }

        // Draw labels
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.textAlign = 'center';
        for (let i = 0; i < numAxes; i++) {
            const angle = (angleStep * i) - Math.PI / 2;
            const labelR = maxRadius + 25;
            const x = centerX + labelR * Math.cos(angle);
            const y = centerY + labelR * Math.sin(angle);
            ctx.fillText(labels[i], x, y + 4);
        }
    }

    function animate() {
        animProgress += 0.02;
        if (animProgress > 1) animProgress = 1;
        drawChart(animProgress);
        if (animProgress < 1) requestAnimationFrame(animate);
    }

    // Trigger on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasStarted) {
                hasStarted = true;
                animate();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(canvas);
}

// ============================================
// 18. AI SKILL BARS ANIMATION
// ============================================
function initAISkillBars() {
    const bars = document.querySelectorAll('.ai-bar-fill');
    if (bars.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.ai-bar-fill');
                fills.forEach((fill, i) => {
                    setTimeout(() => fill.classList.add('animated'), i * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const container = document.querySelector('.ai-skill-bars');
    if (container) observer.observe(container);
}

// ============================================
// 19. AI CHAT WIDGET LOGIC
// ============================================
function initChatWidget() {
    console.log('Chat Widget Initializing...');
    const chatToggle = document.querySelector('.chat-toggle');
    const chatWindow = document.querySelector('.chat-window');

    if (!chatToggle || !chatWindow) {
        console.error('Chat Widget: DOM elements not found', { chatToggle, chatWindow });
        return;
    }
    console.log('Chat Widget: DOM elements found');

    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    if (!chatToggle || !chatWindow) return;

    // Toggle Chat - GÉRÉ PAR LE SCRIPT INLINE DANS INDEX.HTML POUR LA ROBUSTESSE
    // chatToggle.addEventListener('click', ...);

    // Close Chat
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatToggle.classList.remove('active');
    });

    // Send Message Logic
    function handleSendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatInput.value = '';
            processUserInput(message);
        }
    }

    sendMessageBtn.addEventListener('click', handleSendMessage);

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });

    // Suggestion Buttons
    window.sendSuggestion = function (message) {
        addMessage(message, 'user');
        processUserInput(message);
    };

    // Add Message to UI
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        contentDiv.innerHTML = text; // Allow HTML for links

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('message-time');
        const now = new Date();
        timeDiv.textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeDiv);

        // Insert before typing indicator
        chatMessages.insertBefore(messageDiv, typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process Input & AI Response
    async function processUserInput(input) {
        showTyping();

        let response = '';
        const lowerInput = input.toLowerCase();

        try {
            // Controller pour timeout de 5 secondes
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            // TENTATIVE DE CONNEXION AU BACKEND
            console.log('Envoi au backend...');
            const res = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                response = data.answer;
            } else {
                throw new Error('Backend non disponible');
            }
        } catch (error) {
            console.warn('Backend IA non connecté ou timeout, fallback sur la logique locale.', error);

            // LOGIQUE DE SECOURS (LOCALE)
            if (lowerInput.includes('bonjour') || lowerInput.includes('salut') || lowerInput.includes('hello')) {
                response = "Bonjour ! Comment puis-je vous aider aujourd'hui ? 😊 (Mode hors-ligne)";
            } else if (lowerInput.includes('compétence') || lowerInput.includes('skill') || lowerInput.includes('techno')) {
                response = "Ali maîtrise plusieurs technologies clés : <br><strong>Frontend :</strong> React, Next.js, HTML/CSS<br><strong>Backend :</strong> Node.js, NestJS, Python<br><strong>IA & Data :</strong> Machine Learning, NLP, SQL.";
            } else if (lowerInput.includes('projet') || lowerInput.includes('réalisation')) {
                response = "Ali a travaillé sur plusieurs projets passionnants, notamment une <strong>Plateforme Clinique avec IA</strong> et un <strong>Virtual Mall 3D</strong>. Vous pouvez les voir dans la section <a href='#projects' style='color: var(--primary)'>Projets</a>.";
            } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('téléphone')) {
                response = "Vous pouvez contacter Ali par email à <strong>chlouchiali3@gmail.com</strong> ou via le formulaire dans la section <a href='#contact' style='color: var(--primary)'>Contact</a>.";
            } else if (lowerInput.includes('cv') || lowerInput.includes('curriculum')) {
                response = "Vous pouvez télécharger son CV complet en cliquant sur le bouton ci-dessous : <br><br><a href='cv/CV_Echlouchi_Ali.pdf' class='suggestion-btn' download>📄 Télécharger le CV</a>";
            } else {
                response = "Je ne suis pas sûr de comprendre. Pouvez-vous reformuler ? Je peux parler de mes <strong>compétences</strong>, mes <strong>projets</strong> ou comment me <strong>contacter</strong>.";
            }

            // Délai artificiel pour le mode local uniquement
            await new Promise(r => setTimeout(r, 1000));
        }

        hideTyping();
        addMessage(response, 'ai');
    }

    function showTyping() {
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function hideTyping() {
        typingIndicator.style.display = 'none';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
}
