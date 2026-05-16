/* ============================================================
   NAVBAR — scroll state & active link highlighting
============================================================ */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
    // Solid navbar after scrolling past 60 px
    navbar.classList.toggle('scrolled', window.scrollY > 60);

    // Highlight the nav link for the current section
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link =>
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`)
    );

    // Show / hide scroll-to-top button
    document.getElementById('scrollTop')
        .classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', onScroll, { passive: true });

/* ============================================================
   HAMBURGER / MOBILE MENU
============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link =>
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    })
);

/* ============================================================
   TYPEWRITER
============================================================ */
const roles = [
    'DevOps Engineer',
    'Backend Developer',
    'Cloud Architect',
    'Python Developer',
    'System Designer',
];

let rIdx = 0, cIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
    const word = roles[rIdx];

    typedEl.textContent = deleting
        ? word.slice(0, cIdx - 1)
        : word.slice(0, cIdx + 1);

    deleting ? cIdx-- : cIdx++;

    if (!deleting && cIdx === word.length) {
        // Pause at end before deleting
        deleting = true;
        setTimeout(typeWriter, 2200);
        return;
    }
    if (deleting && cIdx === 0) {
        deleting = false;
        rIdx = (rIdx + 1) % roles.length;
    }

    setTimeout(typeWriter, deleting ? 42 : 90);
}

typeWriter();

/* ============================================================
   SCROLL REVEAL  (IntersectionObserver)
============================================================ */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ============================================================
   SCROLL-TO-TOP BUTTON
============================================================ */
document.getElementById('scrollTop').addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
);

/* ============================================================
   SMOOTH ANCHOR SCROLL  (for older browsers that ignore CSS)
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});
