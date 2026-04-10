/* ============================================================
   YATHARTH GARG — Portfolio Script
   ============================================================ */

// ---- Reduced Motion Check ----
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Particles.js ----
if (!prefersReduced && typeof particlesJS !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    particlesJS('particles-js', {
        particles: {
            number: { value: isMobile ? 25 : 55 },
            color: { value: ['#7c6fff', '#38bdf8', '#a78bfa'] },
            shape: { type: 'circle' },
            opacity: { value: 0.35, random: true },
            size: { value: 2.5, random: true },
            line_linked: {
                enable: true,
                distance: 160,
                color: '#7c6fff',
                opacity: 0.12,
                width: 1
            },
            move: { enable: true, speed: isMobile ? 1.2 : 2.2 }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: !isMobile, mode: 'grab' },
                resize: true
            },
            modes: {
                grab: { distance: 180, line_linked: { opacity: 0.3 } }
            }
        },
        retina_detect: true
    });
}

// ---- AOS Init ----
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 750,
        easing: 'ease-out-cubic',
        once: true,
        offset: 60,
        disable: prefersReduced
    });
}

// ---- Header Scroll State ----
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    }, { passive: true });
}

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('show');
    });

    // Close on link click
    navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target)) {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Shift focus for accessibility
            target.setAttribute('tabindex', '-1');
            target.focus({ preventScroll: true });
        }
    });
});

// ---- Active Nav Link Highlighting ----
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.glass-nav ul a[href^="#"]');

const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navAnchors.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') === `#${entry.target.id}`) {
                    a.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ---- Animated Number Counter ----
function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const isYear = target > 999;

    const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = isYear ? current : current + (target === 1 ? '' : '+');
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = isYear ? target : target + (target === 1 ? '' : '+');
    };

    requestAnimationFrame(tick);
}

const statNums = document.querySelectorAll('.stat-num[data-count]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            animateCounter(el, target);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));

// ---- Skill Tag Hover Ripple ----
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transition = 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
    });
});

// ---- Console Easter Egg ----
console.log(
    '%c👋 Hey recruiter! Thanks for peeking at the source code 😄\n%cBuilt with vanilla HTML, CSS & JS by Yatharth Garg\nhttps://github.com/Yatharthg12',
    'color: #7c6fff; font-size: 16px; font-weight: bold;',
    'color: #a78bfa; font-size: 13px;'
);