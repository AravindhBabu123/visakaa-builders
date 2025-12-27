// 1. Initialize Animations
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: false,
        mirror: true,
        offset: 50
    });
    
    // Refresh AOS specifically for the dynamic sections
    window.addEventListener('scroll', AOS.refresh);
});

// 2. Dual Cursor Engine
const dot = document.getElementById('cursor-dot');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if(dot) {
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    }
});

function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    if(follower) {
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
    }
    requestAnimationFrame(animateCursor);
}
animateCursor();

// 3. Parallax Transition for Gardening Section
window.addEventListener('scroll', () => {
    const gardening = document.getElementById('gardening');
    const bg = document.getElementById('flowerBg');
    const progress = document.getElementById("scroll-progress");

    // Scroll Progress Calculation
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if(progress) progress.style.width = (winScroll / height) * 100 + "%";

    // Parallax logic
    if(gardening && bg) {
        const trigger = gardening.offsetTop - window.innerHeight;
        const end = gardening.offsetTop + gardening.offsetHeight;
        
        if(window.scrollY > trigger && window.scrollY < end) {
            const opacityProgress = (window.scrollY - trigger) / window.innerHeight;
            bg.style.opacity = Math.min(0.95, opacityProgress);
        } else if (window.scrollY < trigger) {
            bg.style.opacity = 0;
        }
    }
});

// 4. ScrollSpy for Navigation
const sections = document.querySelectorAll('header, section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("data-section") === current) {
            link.classList.add("active");
        }
    });
});