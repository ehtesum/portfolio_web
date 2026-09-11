// Smooth scrolling & active link tracking for minimal navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href').slice(1);
        return document.getElementById(id);
    }).filter(Boolean);

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 120;
        let currentId = '';

        sections.forEach(sec => {
            if (sec.offsetTop <= scrollPos) {
                currentId = sec.id;
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${currentId}`) {
                link.style.color = 'var(--white)';
            } else {
                link.style.color = '';
            }
        });
    }, { passive: true });
});
