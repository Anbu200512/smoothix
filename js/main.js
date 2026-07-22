/**
 * SMOOTHIX - Main Controller
 * Scroll reveal, testimonial slider, newsletter, back-to-top, smooth scroll
 * Version: 3.0.0
 */
(function () {
  'use strict';

  /* ── Scroll Reveal ──────────────────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ── Smooth Scroll ──────────────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        const top = t.getBoundingClientRect().top + window.pageYOffset - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Testimonial Slider ─────────────────────────────────────────────── */
  const track = document.querySelector('.testimonial-track');
  const dotsWrap = document.querySelector('.testimonial-dots');
  if (track && dotsWrap) {
    const slides = track.children;
    const total = slides.length;
    let idx = 0;
    let autoTimer;

    /* build dots */
    for (let i = 0; i < total; i++) {
      const d = document.createElement('button');
      d.className = 'w-2.5 h-2.5 rounded-full transition-all duration-300';
      d.style.background = i === 0 ? '#FF7A18' : 'var(--border)';
      d.setAttribute('aria-label', `Testimonial ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
    const dots = dotsWrap.children;

    function goTo(i) {
      idx = ((i % total) + total) % total;
      track.style.transform = `translateX(-${idx * 100}%)`;
      Array.from(dots).forEach((d, j) => {
        d.style.background = j === idx ? '#FF7A18' : 'var(--border)';
        d.style.width = j === idx ? '2rem' : '.625rem';
      });
      resetAuto();
    }

    function next() { goTo(idx + 1); }
    function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(next, 4500); }

    goTo(0);
    resetAuto();

    /* touch swipe */
    let sx = 0;
    track.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) goTo(idx + (dx < 0 ? 1 : -1));
    }, { passive: true });
  }

  /* ── Newsletter Form ────────────────────────────────────────────────── */
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]');
      const btn = this.querySelector('button');
      if (!email || !email.value.trim()) return;

      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Subscribing...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = '<i class="fa-solid fa-check mr-2"></i>Subscribed!';
        btn.style.background = '#FF7A18';
        email.value = '';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
        }, 2500);
      }, 1200);
    });
  }

  /* ── Counter Animation ──────────────────────────────────────────────── */
  const counters = document.querySelectorAll('.counter');
  if (counters.length) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            const timer = setInterval(() => {
              current += step;
              if (current >= target) {
                el.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
              } else {
                el.textContent = Math.floor(current).toLocaleString() + suffix;
              }
            }, 16);
            cio.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((c) => cio.observe(c));
  }

  /* ── Back to Top ────────────────────────────────────────────────────── */
  const btt = document.getElementById('backToTop');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('opacity-0', window.pageYOffset < 400);
      btt.classList.toggle('invisible', window.pageYOffset < 400);
    }, { passive: true });
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── FAQ Accordion ──────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-toggle').forEach((btn) => {
    btn.addEventListener('click', function () {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('.fa-chevron-down');
      const isOpen = answer.style.maxHeight;

      /* close all others */
      document.querySelectorAll('.faq-answer').forEach((a) => { a.style.maxHeight = null; });
      document.querySelectorAll('.faq-toggle .fa-chevron-down').forEach((i) => { i.style.transform = ''; });

      if (!isOpen) {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

  /* ── Menu Tab Filter ────────────────────────────────────────────────── */
  const tabBtns = document.querySelectorAll('.menu-tab');
  const menuCards = document.querySelectorAll('.menu-card');
  if (tabBtns.length && menuCards.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', function () {
        const cat = this.dataset.category;

        tabBtns.forEach((b) => {
          b.classList.remove('active-tab');
          b.style.background = 'var(--card-bg)';
          b.style.color = 'var(--nav-text)';
          b.style.borderColor = 'var(--border)';
        });
        this.classList.add('active-tab');
        this.style.background = '#FF7A18';
        this.style.color = '#fff';
        this.style.borderColor = 'transparent';

        menuCards.forEach((card) => {
          if (cat === 'all' || card.dataset.category === cat) {
            card.style.display = '';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
              card.style.transition = 'opacity .4s ease, transform .4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            });
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  /* ── Catering / Contact Form ────────────────────────────────────────── */
  const forms = document.querySelectorAll('.sm-form');
  forms.forEach((form) => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin mr-2"></i>Sending...';
      btn.disabled = true;

      setTimeout(() => {
        /* success notification */
        const n = document.createElement('div');
        n.className = 'fixed bottom-6 right-6 z-[200] max-w-sm rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 translate-y-20 opacity-0';
        n.style.background = 'var(--card-bg)';
        n.style.border = '1px solid var(--border)';
        n.innerHTML = `
          <div class="h-1" style="background:#FF7A18"></div>
          <div class="p-4 flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#FF7A18">
              <i class="fa-solid fa-check text-white text-sm"></i>
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold" style="color:var(--nav-text)">Success!</p>
              <p class="text-xs mt-0.5" style="color:var(--nav-muted)">Thank you! We'll get back to you within 24 hours.</p>
            </div>
            <button onclick="this.closest('.fixed').remove()" class="transition-colors" style="color:var(--nav-muted)" aria-label="Close">
              <i class="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>`;
        document.body.appendChild(n);
        requestAnimationFrame(() => { n.style.transform = 'translateY(0)'; n.style.opacity = '1'; });
        setTimeout(() => { n.style.transform = 'translateY(20px)'; n.style.opacity = '0'; setTimeout(() => n.remove(), 300); }, 5000);

        this.reset();
        btn.innerHTML = original;
        btn.disabled = false;
      }, 1500);
    });
  });
})();
