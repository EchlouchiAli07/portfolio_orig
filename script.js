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
        { name: 'AISkillBars', fn: initAISkillBars },
        { name: 'AIChatbot', fn: initAIChatbot },
        { name: 'LanguageSwitcher', fn: initLanguageSwitcher },
        { name: 'CustomCursor', fn: initCustomCursor }
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
window.toggleTheme = function () {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    console.log("Theme toggled to:", newTheme);
};

function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;

    // Set initial theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    // Event listener is now handled by inline onclick for robustness
    /*
    if (themeToggle) {
        themeToggle.addEventListener('click', window.toggleTheme);
    }
    */
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// 4. MOBILE MENU
window.toggleMobileMenu = function () {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuIcon = document.querySelector('.mobile-menu i');

    if (!navLinks) return;

    navLinks.classList.toggle('active');
    const isActive = navLinks.classList.contains('active');

    if (mobileMenuIcon) {
        mobileMenuIcon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    }
    console.log("Mobile menu toggled. Active:", isActive);
};

function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                window.toggleMobileMenu(); // Close it
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
// 6. TYPING EFFECT
function initTypingEffect() {
    const typingText = document.querySelector('.typing');
    if (!typingText) return;

    // Get words from translations or fallback
    const getWords = () => {
        const lang = localStorage.getItem('language') || 'fr';
        const t = window.translations || (typeof translations !== 'undefined' ? translations : null);
        if (t && t[lang] && t[lang].typing_items) {
            return t[lang].typing_items;
        }
        return ['IS2IA', 'Intelligence Artificielle', 'Data Science', 'Développement Full-Stack'];
    };

    let words = getWords();
    let wordIndex = 0, charIndex = 0, isDeleting = false;

    // Listener for language change to update words dynamically? 
    // For now, simpler to just reload page, but let's try to be reactive if possible.
    // Actually, updateLanguage function could re-trigger this, but for now let's just use current lang on load.

    function type() {
        // Refresh words list on every new word start, in case language changed without reload
        if (charIndex === 0 && !isDeleting) {
            const newWords = getWords();
            if (newWords[0] !== words[0]) { // Simple check if lang changed
                words = newWords;
                wordIndex = 0; // Reset index to avoid out of bounds
            }
        }

        const currentWord = words[wordIndex % words.length];

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
        const lang = localStorage.getItem('language') || 'fr';
        const t = (window.translations && window.translations[lang]) || (window.translations ? window.translations['fr'] : null);

        // Fallback checks
        const txt_sending = t ? t.form_btn_sending : "Envoi...";
        const txt_success_both = t ? t.form_toast_success_both : "Message envoyé avec succès au serveur et à Formspree ! 🚀";
        const txt_success_local = t ? t.form_toast_success_local : "Message envoyé au serveur local ! (Formspree en attente)";
        const txt_success_fs = t ? t.form_toast_success_formspree : "Message envoyé avec succès ! ✨";
        const txt_error = t ? t.form_toast_error : "Échec de l'envoi. Veuillez vérifier votre connexion.";

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${txt_sending}`;
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
            showToast(txt_success_both, 'success');
            form.reset();
        } else if (backendSuccess) {
            showToast(txt_success_local, 'warning');
            form.reset();
        } else if (formspreeSuccess) {
            showToast(txt_success_fs, 'success');
            form.reset();
        } else {
            showToast(txt_error, 'error');
        }

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// ============================================
// 10. CHAT WIDGET (ROBUST & DEBUG VERSION)
// ============================================
// ============================================
// 10. CHAT WIDGET (AI CHATBOT v4.0)
// ============================================
function initAIChatbot() {
    const els = {
        toggle: document.getElementById('ai_toggle'),
        window: document.getElementById('ai_window'),
        close: document.getElementById('ai_close'),
        clear: document.getElementById('ai_clear'),
        input: document.getElementById('ai_input'),
        send: document.getElementById('ai_send'),
        messages: document.getElementById('ai_messages'),
        typing: document.getElementById('ai_typing')
    };

    if (!els.toggle || !els.window) return;

    window.handleAiSuggestion = (text) => {
        addMsg(text, 'user');
        askAI(text);
    };

    els.toggle.onclick = () => {
        const isVisible = els.window.classList.contains('active');
        // Toggle active class (handles visibility/opacity/scale transition)
        els.window.classList.toggle('active', !isVisible);

        // Ensure display is managed if needed, but for smooth transition we keep it in DOM
        // If logic previously relied on display:none, we remove that dependency
        if (!isVisible) setTimeout(() => els.input.focus(), 100);
    };

    els.close.onclick = () => {
        els.window.classList.remove('active');
    };

    els.clear.onclick = () => {
        const messages = els.messages.querySelectorAll('.message');
        messages.forEach((m, i) => { if (i > 0) m.remove(); });
        // Reset scroll
        els.messages.scrollTop = 0;
    };

    els.send.onclick = () => {
        const val = els.input.value.trim();
        if (val) {
            addMsg(val, 'user');
            els.input.value = '';
            askAI(val);
        }
    };

    els.input.onkeypress = (e) => { if (e.key === 'Enter') els.send.onclick(); };

    function addMsg(text, sender) {
        const div = document.createElement('div');
        div.className = `message ${sender}-message`;
        div.innerHTML = `<div class="message-content">${text}</div>`;
        if (els.typing) {
            els.messages.insertBefore(div, els.typing);
        } else {
            els.messages.appendChild(div);
        }
        els.messages.scrollTo({ top: els.messages.scrollHeight, behavior: 'smooth' });
    }

    async function askAI(input) {
        if (els.typing) els.typing.style.display = 'flex';
        els.messages.scrollTop = els.messages.scrollHeight;

        // Simulate network delay for realism
        await new Promise(r => setTimeout(r, 600));
        if (els.typing) els.typing.style.display = 'none';

        const lang = localStorage.getItem('language') || 'fr';
        // Ensure translations are loaded
        if (typeof translations === 'undefined') {
            console.error("Translations not loaded");
            addMsg("Error: Translations not loaded.", 'ai');
            return;
        }

        const t = translations[lang] || translations['fr'];

        let reply = t.chat_fallback; // Default
        const low = input.toLowerCase();

        // Keywords for each topic per language
        const keywords = {
            fr: {
                greeting: ['bonjour', 'salut', 'coucou', 'hello', 'hi', 'ça va', 'bonsoir', 'hey'],
                identity: ['qui es-tu', 'ton nom', 't\'appelles', 'tu es qui', 'présente-toi', 'c\'est qui', 'es-tu', 'ali', 'bot', 'assistant'],
                skills: ['compétence', 'sait faire', 'techno', 'maitrise', 'skill', 'langage', 'stack', 'java', 'python', 'react', 'node', 'sql', 'niveau', 'programmation', 'code', 'data', 'ia', 'intelligence artificielle', 'big data', 'bi'],
                education: ['formation', 'étude', 'master', 'licence', 'diplôme', 'parcours', 'école', 'université', 'faculté', 'bac', 'cursus'],
                projects: ['projet', 'réalisé', 'portfolio', 'création', 'work', 'application', 'site', 'web', 'github', 'energyai', 'iot', 'smart city', '3d', 'mall', 'bancaire', 'transport'],
                experience: ['expérience', 'travail', 'clinique', 'entreprise', 'stage', 'job', 'mission', 'poste', 'carrière'],
                certifications: ['certification', 'certif', 'brevet', 'certifié'],
                cv: ['cv', 'curriculum', 'resume'],
                contact: ['contact', 'email', 'mail', 'joindre', 'téléphone', 'numéro', 'appeler'],
                languages: ['langue', 'parle', 'comprend', 'français', 'anglais', 'arabe'],
                hobbies: ['hobby', 'hobbies', 'passion', 'loisir', 'sport', 'dessin', 'lecture', 'volleyball']
            },
            en: {
                greeting: ['hello', 'hi', 'hey', 'greetings', 'morning', 'evening', 'sup', 'howdy'],
                identity: ['who are you', 'your name', 'introduce', 'what represent', 'who is ali', 'ali', 'bot', 'assistant'],
                skills: ['skill', 'competence', 'tech', 'stack', 'master', 'language', 'know', 'java', 'python', 'react', 'node', 'sql', 'coding', 'program', 'data', 'ai', 'artificial intelligence', 'big data', 'bi'],
                education: ['education', 'study', 'degree', 'master', 'bachelor', 'school', 'university', 'college', 'studied', 'academic'],
                projects: ['project', 'portfolio', 'work', 'built', 'creation', 'app', 'website', 'github', 'energyai', 'iot', 'smart city', '3d', 'mall', 'banking', 'transport'],
                experience: ['experience', 'job', 'internship', 'clinique', 'clinic', 'background', 'career', 'work'],
                certifications: ['certification', 'certificate', 'credential', 'certified'],
                cv: ['cv', 'resume', 'curriculum', 'pdf'],
                contact: ['contact', 'email', 'reach', 'phone', 'call', 'mail', 'number'],
                languages: ['language', 'speak', 'understand', 'english', 'french', 'arabic'],
                hobbies: ['hobby', 'hobbies', 'passion', 'leisure', 'sport', 'drawing', 'reading', 'volleyball']
            },
            es: {
                greeting: ['hola', 'buenos días', 'buenas', 'qué tal', 'hey'],
                identity: ['quién eres', 'tu nombre', 'llamas', 'presentate', 'quien es ali', 'ali', 'bot', 'asistente'],
                skills: ['habilidad', 'competencia', 'tecnología', 'dominar', 'saber', 'stack', 'java', 'python', 'react', 'node', 'sql', 'programacion', 'codigo', 'datos', 'ia', 'inteligencia artificial', 'big data', 'bi'],
                education: ['educación', 'estudio', 'máster', 'licenciatura', 'título', 'universidad', 'escuela', 'grado', 'carrera'],
                projects: ['proyecto', 'realizado', 'portafolio', 'creación', 'app', 'sitio', 'web', 'energyai', 'iot', 'smart city', '3d', 'mall', 'bancario', 'transporte'],
                experience: ['experiencia', 'trabajo', 'clínica', 'empresa', 'pasantía', 'profesional', 'puesto'],
                certifications: ['certificación', 'certificado'],
                cv: ['cv', 'curriculum', 'hoja de vida', 'resume'],
                contact: ['contacto', 'email', 'correo', 'llamar', 'teléfono', 'numero'],
                languages: ['idioma', 'lengua', 'habla', 'entiende', 'español', 'ingles', 'frances', 'arabe'],
                hobbies: ['hobby', 'hobbies', 'pasión', 'ocio', 'deporte', 'dibujo', 'lectura', 'voleibol']
            },
            ar: {
                greeting: ['مرحبا', 'هلا', 'سلام', 'اهلا', 'صباح الخير', 'مساء الخير', 'هااي', 'السلام عليكم', 'تحياتي'],
                identity: ['من انت', 'اسمك', 'عرف بنفسك', 'شكون', 'مين', 'شنو سميتك', 'انت مين', 'شكون نتا', 'عرفني', 'علي', 'بوت', 'مساعد'],
                skills: ['مهار', 'تقني', 'يتقن', 'خبر', 'لغات', 'ستاك', 'برمج', 'يعرف', 'شاطر', 'تكنولوجي', 'java', 'python', 'react', 'كود', 'بيانات', 'ذكاء', 'اصطناعي', 'بيغ داتا', 'big data', 'bi'],
                education: ['تعل', 'دراس', 'ماستر', 'إجاز', 'دبلوم', 'شهادة', 'جامع', 'قراي', 'مدرسة', 'تكوين', 'جامعة'],
                projects: ['مشروع', 'مشاريع', 'أعمال', 'انجاز', 'خدمة', 'تطبيق', 'موقع', 'بروجي', 'energyai', 'iot', 'انترنت الاشياء', '3d', 'بصري', 'بنك', 'نقل'],
                experience: ['خبر', 'عمل', 'تجرب', 'عيادة', 'تدريب', 'عاشت', 'خدم', 'شركة', 'stage'],
                certifications: ['شهاد', 'دورة', 'سيرتف'],
                cv: ['سيرة', 'ذاتية', 'cv'],
                contact: ['اتصل', 'تواصل', 'ايميل', 'بريد', 'هاتف', 'رقم', 'فين', 'عنوان'],
                languages: ['لغة', 'لغات', 'تكلم', 'يتحدث', 'عربي', 'فرنسي', 'انجليزي'],
                hobbies: ['هواية', 'هوايات', 'شغف', 'رياضة', 'رسم', 'قراءة', 'فولي']
            }
        };

        const keys = keywords[lang] || keywords['fr'];
        const has = (wordList) => wordList.some(k => low.includes(k));

        // PRIORITY CHECK: Specific topics first, then generic identity
        if (has(keys.greeting)) {
            reply = t.chat_greeting;
        } else if (has(keys.skills)) {
            reply = t.chat_skills;
        } else if (has(keys.education)) {
            reply = t.chat_education;
        } else if (has(keys.projects)) {
            reply = t.chat_projects;
        } else if (has(keys.experience)) {
            reply = t.chat_experience;
        } else if (has(keys.certifications)) {
            reply = t.chat_certifications;
        } else if (has(keys.cv)) {
            reply = t.chat_cv;
        } else if (has(keys.contact)) {
            reply = t.chat_contact_response;
        } else if (has(keys.languages)) {
            reply = t.chat_languages;
        } else if (has(keys.hobbies)) {
            reply = t.chat_hobbies;
        } else if (has(keys.identity)) {
            // "Ali" matches here as a fallback if no specific topic was found
            reply = t.chat_identity;
        }

        addMsg(reply, 'ai');
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

    // Dynamic Labels
    const getLabels = () => {
        const lang = localStorage.getItem('language') || 'fr';
        const t = (window.translations && window.translations[lang]) ? window.translations[lang] : null;
        if (t && t.radar_data_science) {
            return [
                t.radar_data_science,
                t.radar_web_dev,
                t.radar_databases,
                t.radar_bi,
                t.radar_big_data,
                t.radar_programming
            ];
        }
        return ['Data Science', 'Web Dev', 'Databases', 'BI', 'Big Data', 'Programming'];
    };

    let labels = getLabels();
    const values = [90, 88, 85, 78, 72, 83];
    const numAxes = labels.length;
    const angleStep = (2 * Math.PI) / numAxes;

    let animProgress = 0;
    let hasStarted = false;

    // Expose update function for language switcher
    window.updateRadarChart = () => {
        labels = getLabels();
        // Redraw with full progress if already animated, or just update labels
        if (hasStarted) drawChart(animProgress > 0 ? animProgress : 1);
    };

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

// 14. CUSTOM CURSOR
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    if (!cursor || !follower) return;

    // Only enable on desktop
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = 'none';
        follower.style.display = 'none';
        return;
    }

    document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        follower.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    document.addEventListener('mousedown', () => {
        cursor.classList.add('expand');
        follower.classList.add('expand');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('expand');
        follower.classList.remove('expand');
    });

    // Hover effects
    document.querySelectorAll('a, button, .chat-toggle, .certification-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            follower.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            follower.classList.remove('hovered');
        });
    });
}

// 15. MODERN TOAST SYSTEM
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

// ============================================
// 16. LANGUAGE SWITCHER (i18n)
// ============================================
function initLanguageSwitcher() {
    const langBtn = document.querySelector('.lang-btn');
    const langDropdown = document.querySelector('.lang-dropdown');
    const langLinks = document.querySelectorAll('[data-lang]');

    if (!langBtn || !langDropdown) {
        console.error("Language switcher elements not found:", { langBtn, langDropdown });
        return;
    }

    // 1. Toggle Dropdown is handled by inline HTML onclick for robustness
    /*
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            console.log("Language button clicked");
            e.stopPropagation();
            langDropdown.classList.toggle('active');
            console.log("Dropdown active:", langDropdown.classList.contains('active'));
        });
    }
    */

    // 2. Close when clicking outside
    document.addEventListener('click', () => {
        if (langDropdown && langDropdown.classList.contains('active')) {
            langDropdown.classList.remove('active');
        }
    });

    // 3. Handle Language Selection
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log("Language link clicked:", link.getAttribute('data-lang'));
            e.preventDefault();
            const lang = link.getAttribute('data-lang');
            updateLanguage(lang);
            if (langDropdown) langDropdown.classList.remove('active');
        });
    });

    // 4. Load saved language or default to browser/FR
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const defaultLang = savedLang || (['fr', 'en', 'es', 'ar'].includes(browserLang) ? browserLang : 'fr');

    updateLanguage(defaultLang);
}

function updateLanguage(lang) {
    console.log("Updating language to:", lang);
    // 1. Update State
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // 2. Update Toggle Button Text
    const currentLangSpan = document.querySelector('.current-lang');
    if (currentLangSpan) currentLangSpan.textContent = lang.toUpperCase();

    // 3. Update Text Content using translations.js
    const t = window.translations || (typeof translations !== 'undefined' ? translations : null);

    if (!t) {
        console.error("Translations object not found!");
        return;
    }

    const langData = t[lang];
    if (!langData) {
        console.error(`Translations for language '${lang}' not found.`);
        return;
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (langData[key]) {
            el.innerHTML = langData[key];
        }
    });

    // 3b. Update Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (langData[key]) {
            el.placeholder = langData[key];
        }
    });

    // 4. Update Chatbot Helper if needed
    // (Optional: trigger chatbot greeting update)

    // 5. Update Radar Chart
    if (window.updateRadarChart) {
        window.updateRadarChart();
    }
}

