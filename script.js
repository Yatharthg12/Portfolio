// Respect reduced-motion preference
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
	const isMobile = window.innerWidth < 768;
	particlesJS('particles-js', {
		particles: {
			number: { value: isMobile ? 30 : 80 },
			color: { value: ['#00ffff', '#ff00ff', '#ffffff'] },
			shape: { type: 'circle' },
			opacity: { value: 0.6, random: true },
			size: { value: 3, random: true },
			line_linked: { enable: true, distance: 150, color: '#00ffff', opacity: 0.35, width: 1 },
			move: { enable: true, speed: isMobile ? 1.8 : 3 }
		},
		interactivity: {
			detect_on: 'canvas',
			events: { onhover: { enable: true, mode: 'repulse' }, resize: true }
		},
		retina_detect: true
	});
	AOS.init({ duration: 1000, once: true });
} else {
	console.log('Reduced motion enabled — animations and particles disabled');
}

// Mobile nav toggle + close on link click
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle && navLinks) {
	navToggle.addEventListener('click', () => {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!expanded));
		navLinks.classList.toggle('show');
	});
	navLinks.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', () => {
			navLinks.classList.remove('show');
			navToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

// Smooth scrolling (unchanged behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.focus({preventScroll:true});
        }
    });
});