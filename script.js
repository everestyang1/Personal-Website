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