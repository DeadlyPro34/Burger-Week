// --- Smart Navigation ---

// 1. Scroll Active Link Tracking
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']')?.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// 2. Header Shadow on Scroll
function scrollHeader() {
    const nav = document.getElementById('header');
    if (this.scrollY >= 50) nav.classList.add('shadow-header'); else nav.classList.remove('shadow-header');
}
window.addEventListener('scroll', scrollHeader);

// 3. Reveal Animation (Original)
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// 4. Mouse Parallax for Hero Burger
const hero = document.getElementById('section-1');
const mainBurger = document.getElementById('zoom-in-out');

if (hero && mainBurger) {
    hero.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;
        mainBurger.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// 5. Scroll Progress Bar
function scrollProgress() {
    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scroll / height) * 100;
    const progBar = document.getElementById('progress-bar');
    if (progBar) progBar.style.width = scrolled + "%";
}
window.addEventListener('scroll', scrollProgress);

// 6. Cart Bounce Effect (Original Helper)
function bounceCart() {
    const cartIcon = document.querySelector('.iconCart');
    if (cartIcon) {
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 300);
    }
}