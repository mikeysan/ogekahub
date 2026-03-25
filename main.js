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

    // Release Auto-Updater Module
    (function() {
      'use strict';

      const CONFIG = {
        repoOwner: 'mikeysan',
        repoName: 'ogeka',
        cacheKey: 'ogeka_release_cache',
        cacheDuration: 3600000, // 1 hour in milliseconds
        apiEndpoint: 'https://api.github.com/repos/mikeysan/ogekahub/releases/latest',
        fallbackUrl: 'https://github.com/mikeysan/ogekahub/releases/latest'
      };

      const ASSET_PATTERNS = {
        'macos': /Ogeka_.*_aarch64\.dmg$/,
        'linux': /Ogeka_.*_amd64\.AppImage$/,
        'windows': /Ogeka_.*_x64-setup\.exe$/,
        'windows-arm': /Ogeka_.*_arm64-setup\.exe$/
      };

      async function fetchLatestRelease() {
        try {
          const response = await fetch(CONFIG.apiEndpoint, {
            headers: {
              'Accept': 'application/vnd.github+json'
            }
          });

          if (!response.ok) {
            console.warn('GitHub API request failed:', response.status);
            return null;
          }

          return await response.json();
        } catch (error) {
          console.error('Error fetching release:', error);
          return null;
        }
      }

      function extractDownloadUrls(releaseData) {
        if (!releaseData || !releaseData.assets) return null;

        const urls = {};
        releaseData.assets.forEach(asset => {
          Object.entries(ASSET_PATTERNS).forEach(([platform, pattern]) => {
            if (pattern.test(asset.name)) {
              urls[platform] = asset.browser_download_url;
            }
          });
        });

        return Object.keys(ASSET_PATTERNS).every(platform => urls[platform]) ? urls : null;
      }

      function updateDownloadButtons(urls) {
        if (!urls) return false;

        Object.entries(urls).forEach(([platform, url]) => {
          const button = document.querySelector(`.btn-platform[data-platform="${platform}"]`);
          if (button) {
            button.setAttribute('href', url);
            const versionMatch = url.match(/Ogeka_([^_]+)_/);
            if (versionMatch) {
              console.log(`Updated ${platform} button to version ${versionMatch[1]}`);
            }
          }
        });

        return true;
      }

      function applyFallback() {
        console.warn('Falling back to GitHub releases page for all download buttons.');
        document.querySelectorAll('.btn-platform').forEach(btn => {
          btn.setAttribute('href', CONFIG.fallbackUrl);
        });
      }

      function getCachedRelease() {
        try {
          const cached = localStorage.getItem(CONFIG.cacheKey);
          if (!cached) return null;

          const data = JSON.parse(cached);
          return Date.now() - data.timestamp < CONFIG.cacheDuration ? data.urls : null;
        } catch (error) {
          return null;
        }
      }

      function cacheReleaseUrls(urls) {
        try {
          localStorage.setItem(CONFIG.cacheKey, JSON.stringify({
            urls: urls,
            timestamp: Date.now()
          }));
        } catch (error) {
          console.error('Error writing cache:', error);
        }
      }

      async function initialize() {
        const cachedUrls = getCachedRelease();
        if (cachedUrls) {
          updateDownloadButtons(cachedUrls);
          console.log('Using cached release URLs');
          return;
        }

        const releaseData = await fetchLatestRelease();
        const urls = releaseData ? extractDownloadUrls(releaseData) : null;

        if (urls) {
          updateDownloadButtons(urls);
          cacheReleaseUrls(urls);
          console.log('Successfully updated download URLs from GitHub API');
        } else {
          applyFallback();
        }
      }

      initialize();
    })();

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
