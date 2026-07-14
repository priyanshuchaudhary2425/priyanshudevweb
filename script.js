document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Logic
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealElements = document.querySelectorAll('.reveal');

    if (!prefersReducedMotion && revealElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // If reduced motion is preferred, ensure everything is visible immediately
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // 2. Local Time Ticker (Silvassa, India -> IST)
    const timeEl = document.getElementById('local-time');
    if (timeEl) {
        const updateTime = () => {
            const options = { 
                timeZone: 'Asia/Kolkata', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit', 
                hour12: true 
            };
            const timeString = new Date().toLocaleTimeString('en-US', options);
            timeEl.textContent = `${timeString} IST`;
        };
        
        updateTime();
        setInterval(updateTime, 1000);
    }

    // 3. Dynamic Year in Footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 4. Smooth Scroll for Safari / older browsers fallback 
    // (Mostly handled by CSS scroll-behavior, but this ensures offset accuracy)
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: prefersReducedMotion ? 'auto' : 'smooth',
                    block: 'start'
                });
                // Accessibility: Move focus to the section for keyboard users
                targetEl.setAttribute('tabindex', '-1');
                targetEl.focus({ preventScroll: true });
            }
        });
    });

});
