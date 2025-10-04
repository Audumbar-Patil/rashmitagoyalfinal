(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('#site-nav');
  const yearEl = document.querySelector('#year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      siteNav.classList.toggle('open');
    });

    // Close menu on navigation click (mobile)
    siteNav.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.tagName === 'A') {
        navToggle.setAttribute('aria-expanded', 'false');
        siteNav.classList.remove('open');
      }
    });
  }

  // Smooth scroll for in-page anchors
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
      const id = target.getAttribute('href');
      const el = id && document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', id);
      }
    }
  });

  // Pause the results video when the user moves away (out of viewport or tab hidden)
  const resultsVideo = document.querySelector('.results video');
  if (resultsVideo) {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.5) {
              resultsVideo.pause();
            } else if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
              const playPromise = resultsVideo.play();
              if (playPromise && typeof playPromise.catch === 'function') {
                playPromise.catch(() => {/* ignore autoplay block */});
              }
            }
          });
        },
        { threshold: [0, 0.5] }
      );
      observer.observe(resultsVideo);
    } else {
      const onScroll = () => {
        const rect = resultsVideo.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (!inView) {
          resultsVideo.pause();
        } else {
          const playPromise = resultsVideo.play();
          if (playPromise && typeof playPromise.catch === 'function') {
            playPromise.catch(() => {/* ignore autoplay block */});
          }
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) resultsVideo.pause();
    });
  }

  // Hero image carousel (autoplay with fade)
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('img'));
    if (slides.length > 0) {
      let currentIndex = 0;
      let intervalId = null;

      const show = (i) => {
        slides.forEach((img, idx) => img.classList.toggle('active', idx === i));
      };

      const start = () => {
        if (intervalId) return;
        intervalId = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          show(currentIndex);
        }, 1500);
      };

      const stop = () => {
        if (!intervalId) return;
        clearInterval(intervalId);
        intervalId = null;
      };

      // Initialize
      show(currentIndex);
      start();

      // Pause/resume when off-screen
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start(); else stop();
          });
        }, { threshold: [0, 0.5] });
        observer.observe(carousel);
      }

      // Pause on tab hidden
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else start();
      });

      // Pause on hover (desktop behavior only; skip on touch devices)
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isTouchDevice) {
        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
      }
    }
  }
})();


