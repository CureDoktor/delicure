// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements with data-speed attribute
    const parallaxElements = document.querySelectorAll('[data-speed]');
    
    // Smooth scroll function
    function smoothScroll() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.getAttribute('data-speed');
            if (speed === 'auto') {
                // For auto speed, calculate based on element position
                const rect = element.getBoundingClientRect();
                const elementTop = rect.top + scrolled;
                const elementCenter = elementTop + (rect.height / 2);
                const distanceFromCenter = (window.innerHeight / 2) - elementCenter;
                const moveY = distanceFromCenter * 0.1;
                element.style.transform = `translateY(${moveY}px)`;
            } else {
                // For fixed speed values
                const moveY = scrolled * (1 - parseFloat(speed));
                element.style.transform = `translateY(${moveY}px)`;
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', smoothScroll);
    
    // Initial call to set positions
    smoothScroll();

    // Handle text stagger effect
    const splitText = document.querySelector('#split-stagger');
    if (splitText) {
        const text = splitText.textContent;
        const chars = text.split('');
        splitText.textContent = '';
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.display = 'inline-block';
            span.style.transition = 'transform 0.3s ease';
            span.style.transitionDelay = `${i * 0.1}s`;
            splitText.appendChild(span);
        });
    }
});
