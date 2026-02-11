// ============================================
// PORTFOLIO ALI ECHLOUCHI - JAVASCRIPT
// Modern, Intelligent, Deployable
// ============================================

// GLOBAL ERROR HANDLER
window.onerror = function (msg, url, line) {
    console.error('Script Error:', msg, line);
    return false;
};

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features safely
    const inits = [
        { name: 'Particles', fn: initParticles },
        { name: 'Preloader', fn: initPreloader },
        { name: 'ThemeToggle', fn: initThemeToggle },
        { name: 'MobileMenu', fn: initMobileMenu },
        { name: 'ScrollEffects', fn: initScrollEffects },
        { name: 'TypingEffect', fn: initTypingEffect },
        { name: 'ContactForm', fn: initContactForm },
        { name: 'ScrollToTop', fn: initScrollToTop },
        { name: 'IntersectionObserver', fn: initIntersectionObserver },
        { name: 'AnimatedCounters', fn: initAnimatedCounters },
        { name: 'RadarChart', fn: initRadarChart },
        { name: 'AISkillBars', fn: initAISkillBars }
    ];

    inits.forEach(item => {
        try {
            item.fn();
        } catch (e) {
            console.error(`Error initializing ${item.name}:`, e);
        }
    });
});

// 1. PRELOADER
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;
    setTimeout(() => {
        preloader.classList.add('hidden');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }, 500);
}

// 2. PARTICLES
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6366f1" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#6366f1", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } }
            }
        });
    }
}

// 3. THEME TOGGLE
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    if (!themeToggle) return;

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
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 4. MOBILE MENU
function initMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (!mobileMenu || !navLinks) return;

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

    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenu.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// 5. SCROLL EFFECTS
function initScrollEffects() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) header?.classList.add('scrolled');
        else header?.classList.remove('scrolled');
    });

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });
}

// 6. TYPING EFFECT
function initTypingEffect() {
    const typingText = document.querySelector('.typing');
    if (!typingText) return;
    const words = ['IS2IA', 'Intelligence Artificielle', 'Data Science', 'Développement Full-Stack'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }
        setTimeout(type, typeSpeed);
    }
    setTimeout(type, 1000);
}

// 7. OBSERVER
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                if (entry.target.classList.contains('skill-category')) {
                    entry.target.querySelectorAll('.skill-level').forEach((bar, i) => {
                        setTimeout(() => bar.style.width = bar.getAttribute('data-width'), i * 100);
                    });
                }
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .skill-category').forEach(el => observer.observe(el));

    // AI Skill Bars
    const aiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.ai-bar-fill').forEach((fill, i) => {
                    setTimeout(() => fill.classList.add('animated'), i * 150);
                });
                aiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    const aiContainer = document.querySelector('.ai-skill-bars');
    if (aiContainer) aiObserver.observe(aiContainer);
}

// 8. SCROLL TO TOP
function initScrollToTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) btn.classList.add('visible');
        else btn.classList.remove('visible');
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// 9. CONTACT FORM
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
        submitBtn.disabled = true;

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let backendSuccess = false;
        let formspreeSuccess = false;

        // 1. TENTATIVE BACKEND (Local ou Production)
        try {
            const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? 'http://localhost:3001'
                : 'https://portfolio-ali-backend.onrender.com'; // À mettre à jour après déploiement backend

            const response = await fetch(`${API_URL}/api/contact`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) backendSuccess = true;
        } catch (error) {
            console.warn('Backend indisponible:', error);
        }

        // 2. TENTATIVE FORMSPREE
        try {
            const fsResponse = await fetch("https://formspree.io/f/xpqjqqgg", {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (fsResponse.ok) formspreeSuccess = true;
        } catch (fsError) {
            console.error('Erreur Formspree:', fsError);
        }

        // --- RÉSULTATS ---
        if (backendSuccess && formspreeSuccess) {
            showToast("Message envoyé avec succès au serveur et à Formspree ! 🚀", 'success');
            form.reset();
        } else if (backendSuccess) {
            showToast("Message envoyé au serveur local ! (Formspree en attente)", 'warning');
            form.reset();
        } else if (formspreeSuccess) {
            showToast("Message envoyé avec succès ! ✨", 'success');
            form.reset();
        } else {
            showToast("Échec de l'envoi. Veuillez vérifier votre connexion.", 'error');
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================
// 10. CHAT WIDGET (ROBUST & DEBUG VERSION)
// ============================================
function initChatWidget() {
    console.log('Initializing Secure Chat Logic...');

    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');
    const closeChat = document.querySelector('.close-chat');
    const chatWindow = document.querySelector('.chat-window');

    if (!chatInput || !sendMessageBtn || !chatMessages) {
        console.error('Chat elements missing!');
        return;
    }

    // --- GLOBAL FUNCTION FOR BUTTONS ---
    window.sendSuggestion = function (message) {
        console.log('Suggestion Clicked:', message);
        addMessage(message, 'user');
        processUserInput(message);
    };

    // --- CLOSE BUTTON ---
    if (closeChat && chatWindow) {
        closeChat.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            chatWindow.style.display = 'none';
            // Also remove active class from toggle if possible, 
            // but we don't have reference to toggle here easily unless queried again.
            document.querySelector('.chat-toggle')?.classList.remove('active');
            document.querySelector('.chat-window')?.classList.remove('active');
        });
    }

    // --- SEND MESSAGE ---
    async function handleSendMessage() {
        console.log('Send Message Clicked');
        const message = chatInput.value.trim();
        if (!message) return;

        addMessage(message, 'user');
        chatInput.value = '';
        await processUserInput(message);
    }

    // Direct event assignment for robustness
    sendMessageBtn.onclick = handleSendMessage;

    chatInput.onkeypress = (e) => {
        if (e.key === 'Enter') handleSendMessage();
    };

    // --- HELPER: ADD MESSAGE ---
    function addMessage(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        div.innerHTML = `<div class="message-content">${text}</div><div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>`;

        if (typingIndicator) {
            chatMessages.insertBefore(div, typingIndicator);
        } else {
            chatMessages.appendChild(div);
        }
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- CORE: PROCESS INPUT ---
    async function processUserInput(input) {
        console.log('Processing:', input);
        if (typingIndicator) typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        let responseText = '';

        try {
            console.log('Fetching Backend...');
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            // Try to reach backend
            const res = await fetch('http://localhost:3001/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (res.ok) {
                const data = await res.json();
                responseText = data.answer;
                console.log('Backend Success:', responseText);
            } else {
                throw new Error('API Error');
            }
        } catch (error) {
            console.warn('Backend Fail/Timeout:', error);
            // FALLBACK RESPONSES
            const lower = input.toLowerCase();
            if (lower.includes('bonjour') || lower.includes('salut')) responseText = "Bonjour ! (Mode Hors-Ligne) Comment puis-je vous aider ?";
            else if (lower.includes('projet')) responseText = "Vous pouvez voir mes projets dans la section dédiée sur ce site !";
            else if (lower.includes('contact')) responseText = "Contactez-moi via le formulaire ou sur LinkedIn.";
            else if (lower.includes('cv')) responseText = "Le CV est téléchargeable juste au dessus.";
            else responseText = "Je n'ai pas accès à mon cerveau IA (Backend éteint). Essayez de me contacter par email !";
        }

        if (typingIndicator) typingIndicator.style.display = 'none';
        addMessage(responseText, 'ai');
    }
}

// 11. COUNTERS ANIMATION
function initAnimatedCounters() {
    // Select both old and new counter classes
    const counters = document.querySelectorAll('.stat-number, .status-count');
    if (counters.length === 0) return;

    let hasAnimated = false;

    const animateCounters = () => {
        if (hasAnimated) return;

        counters.forEach(counter => {
            const targetAttr = counter.getAttribute('data-target');
            if (!targetAttr) return;
            const target = parseInt(targetAttr);
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

// 12. RADAR CHART
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

        // Draw data points
        for (let i = 0; i < numAxes; i++) {
            const angle = (angleStep * i) - Math.PI / 2;
            const r = (values[i] / 100) * maxRadius * progress;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);

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

// 13. AI SKILL BARS ANIMATION
function initAISkillBars() {
    const barsContainer = document.querySelector('.ai-skill-bars');
    if (!barsContainer) return;

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

    observer.observe(barsContainer);
}

// 14. MODERN TOAST SYSTEM
function showToast(message, type = 'success', duration = 5000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let icon = 'fa-check-circle';
    if (type === 'error') icon = 'fa-exclamation-circle';
    if (type === 'warning') icon = 'fa-exclamation-triangle';

    toast.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    // Auto remove
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
