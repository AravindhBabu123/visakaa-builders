// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: { green: '#00B100', dark: '#006400', light: '#e6f7e6' }
            },
            fontFamily: { sans: ['Poppins', 'sans-serif'], heading: ['Montserrat', 'sans-serif'] }
        }
    }
}

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({ duration: 1000, once: false });
});

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scroll-progress");
    if(progressBar) progressBar.style.width = scrolled + "%";
});

// Dual Cursor Logic
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

// Parallax/Gardening Background Fade
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const gardening = document.getElementById('gardening');
    const bg = document.getElementById('flowerBg');
    
    if(gardening && bg) {
        const trigger = gardening.offsetTop - window.innerHeight;
        const end = gardening.offsetTop + gardening.offsetHeight;
        
        if(scrollY > trigger && scrollY < end) {
            const progress = (scrollY - trigger) / window.innerHeight;
            bg.style.opacity = Math.max(0, Math.min(0.95, progress));
        } else if (scrollY < trigger) {
            bg.style.opacity = 0;
        }
    }
});

// ScrollSpy Nav Link Active State
const sections = document.querySelectorAll('header, section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 150) {
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