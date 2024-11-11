function typeWriter(text, element, speed, callback) {
    element.classList.add('typing');
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.classList.remove('typing');
            }, 3500);
            
            if (callback) callback();
        }
    }
    type();
}
const titles = [
    "Computer Science @ Brown University",
    "Previous SWE Intern @ NASA",
    "Aspiring Software Engineer/Entrepreneur"
];

let currentIndex = 0;
const nameElement = document.querySelector('.hero-title');
const subtitleElement = document.querySelector('.hero-subtitle');

function updateText() {
    currentIndex = (currentIndex + 1) % titles.length;
    subtitleElement.style.animation = 'none';
    subtitleElement.offsetHeight; 
    subtitleElement.style.animation = null;
    subtitleElement.textContent = titles[currentIndex];
}

window.addEventListener('load', () => {
    typeWriter("Everest Yang", nameElement, 50, () => {
        subtitleElement.textContent = titles[0];
        setTimeout(() => {
            updateText();
            setInterval(updateText, 2500);
        }, 4000);
    });
});

const swiper = new Swiper('.project-main', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const overlay = document.querySelector('.overlay');
const navItems = document.querySelectorAll('.nav-links li a');
const body = document.body;

function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    overlay.classList.toggle('active'); 

    if (navLinks.classList.contains('active')) {
        body.style.overflow = 'hidden';
    } 
    
    else {
        body.style.overflow = 'visible';
    }
}

hamburger.addEventListener('click', toggleMenu);

overlay.addEventListener('click', toggleMenu);

navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'visible';
    });
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'visible';
    }
});

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50; 
    
    
    if (navLinks.classList.contains('active') && 
        touchStartX - touchEndX > swipeThreshold) {
        toggleMenu();
    }
    
    
    if (!navLinks.classList.contains('active') && 
        touchEndX - touchStartX > swipeThreshold && 
        touchStartX < 30) {
        toggleMenu();
    }
}

document.addEventListener('click', (e) => {
    const isClickInsideNav = navLinks.contains(e.target);
    const isClickOnHamburger = hamburger.contains(e.target);
    
    if (navLinks.classList.contains('active') && 
        !isClickInsideNav && 
        !isClickOnHamburger) {
        toggleMenu();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        toggleMenu();
    }
});


