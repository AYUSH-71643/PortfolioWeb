document.addEventListener('DOMContentLoaded', () => {
    // Add a subtle parallax/tilt effect to banners based on mouse movement
    const banners = document.querySelectorAll('.game-banner');
    
    banners.forEach(banner => {
        banner.addEventListener('mousemove', (e) => {
            const rect = banner.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate a slight perspective tilt for a fluid feel
            const xPct = (x / rect.width) - 0.5;
            const yPct = (y / rect.height) - 0.5;
            
            banner.style.transform = `translateY(-10px) perspective(1000px) rotateX(${yPct * -5}deg) rotateY(${xPct * 5}deg)`;
        });
        
        banner.addEventListener('mouseleave', () => {
            banner.style.transform = `translateY(0) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    });
});