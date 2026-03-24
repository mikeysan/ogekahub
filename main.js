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

    // Platform Detection for Download Buttons
    (function() {
      function detectPlatform() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;

        // Windows detection
        if (platform.indexOf('Win') !== -1 || userAgent.indexOf('Windows') !== -1) {
          // Check for ARM64
          if (userAgent.indexOf('ARM') !== -1 || userAgent.indexOf('aarch64') !== -1) {
            return 'windows-arm';
          }
          return 'windows';
        }

        // macOS detection
        if (platform.indexOf('Mac') !== -1 || userAgent.indexOf('Mac OS X') !== -1) {
          return 'macos';
        }

        // Linux detection
        if (platform.indexOf('Linux') !== -1 || userAgent.indexOf('Linux') !== -1) {
          return 'linux';
        }

        // Fallback: no detection
        return null;
      }

      function highlightPlatformButton() {
        const detected = detectPlatform();
        if (!detected) return; // No detection, show all buttons equally

        const buttons = document.querySelectorAll('.btn-platform[data-recommended]');

        buttons.forEach(function(button) {
          const buttonPlatform = button.getAttribute('data-platform');

          if (buttonPlatform === detected) {
            button.setAttribute('data-highlighted', '');

            // Move highlighted button to first position
            const container = button.parentNode;
            container.insertBefore(button, container.firstChild);
          }
        });

        // Ensure secondary button stays last
        const secondaryButton = document.querySelector('.btn-platform--secondary');
        if (secondaryButton) {
          const container = secondaryButton.parentNode;
          container.appendChild(secondaryButton);
        }
      }

      highlightPlatformButton();
    })();
  });
})();
