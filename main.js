(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    // Typewriter Cycling Effect
    const cycleText = document.getElementById('cycle-text');

    if (cycleText) {
      const phrases = [
        '...server logs',
        '...that Jira ticket',
        '...backup jobs',
        '...SSL certificates',
        '...the on-call handoff'
      ];

      let currentIndex = 0;
      const cycleDelay = 3000; // ms between phrase changes
      const fadeDuration = 300; // ms for fade transition

      // Set initial phrase
      cycleText.innerText = phrases[0];

      setInterval(function() {
        // Fade out
        cycleText.style.opacity = '0';

        setTimeout(function() {
          // Update to next phrase
          currentIndex = (currentIndex + 1) % phrases.length;
          cycleText.innerText = phrases[currentIndex];

          // Fade in
          cycleText.style.opacity = '1';
        }, fadeDuration);
      }, cycleDelay);
    }

    // Smooth Scroll for Navbar CTA
    const downloadButton = document.querySelector('.btn-cta[href="#download"]');

    if (downloadButton) {
      downloadButton.addEventListener('click', function(e) {
        e.preventDefault();
        const downloadSection = document.getElementById('download');

        if (downloadSection) {
          downloadSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });
})();
