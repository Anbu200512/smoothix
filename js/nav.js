/**
 * SMOOTHIX - Navbar Controller
 * Sticky navbar, mobile menu, dark mode, RTL toggle, scroll effects
 * Version: 3.0.0
 */
(function () {
  'use strict';

  const nav = document.getElementById('navbar');
  if (!nav) return;

  const path = window.location.pathname.split('/').pop() || 'index.html';
  const isActive = (p) => path === p;

  /* ── Inject styles once ──────────────────────────────────────────────── */
  if (!document.getElementById('sm-nav-styles')) {
    const s = document.createElement('style');
    s.id = 'sm-nav-styles';
    s.textContent = `
      .sm-mob-panel{position:fixed;top:0;right:0;z-index:9999;height:100%;width:320px;max-width:85vw;
        background:var(--nav-bg);border-left:1px solid var(--border);transform:translateX(100%);
        transition:transform .35s cubic-bezier(.4,0,.2,1);overflow-y:auto;will-change:transform}
      .sm-mob-panel.open{transform:translateX(0)}
      .sm-mob-overlay{position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.45);
        opacity:0;visibility:hidden;transition:opacity .3s,visibility .3s;backdrop-filter:blur(4px)}
      .sm-mob-overlay.open{opacity:1;visibility:visible}
      .sm-mob-dd{max-height:0;overflow:hidden;transition:max-height .35s ease,opacity .3s,padding .3s;opacity:0;padding-top:0;padding-bottom:0}
      .sm-mob-dd.open{max-height:500px;opacity:1;padding-top:.25rem;padding-bottom:.25rem}
      :root{--nav-bg:rgba(255,255,255,.82);--nav-text:#1F2937;--nav-muted:#6B7280;--border:#E5E7EB;
        --card-bg:#FFFFFF;--body-bg:#FAFAFA;--body-text:#1F2937;--secondary-bg:#F3F4F6}
      .dark{--nav-bg:rgba(0,0,0,.92);--nav-text:#F9FAFB;--nav-muted:#9CA3AF;--border:#222;
        --card-bg:#0A0A0A;--body-bg:#000000;--body-text:#F9FAFB;--secondary-bg:#0A0A0A}
      .sm-nav-blur{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}
      .sm-nav-dd{position:relative}
      .sm-nav-dd-menu{position:absolute;top:100%;left:0;min-width:200px;padding:.5rem;border-radius:.75rem;
        background:var(--card-bg);border:1px solid var(--border);box-shadow:0 10px 40px rgba(0,0,0,.12);
        opacity:0;visibility:hidden;transform:translateY(8px);transition:all .2s;z-index:100}
      .sm-nav-dd:hover .sm-nav-dd-menu{opacity:1;visibility:visible;transform:translateY(0)}
      .sm-nav-dd-menu a{display:flex;align-items:center;gap:.5rem;padding:.5rem .75rem;border-radius:.5rem;
        font-size:.875rem;font-weight:600;color:var(--nav-text);transition:all .15s}
      .sm-nav-dd-menu a:hover{background:rgba(255,122,24,.08);color:#FF7A18}
      .sm-nav-dd-menu a i{width:1rem;text-align:center;font-size:.7rem;color:var(--nav-muted)}
      .sm-nav-dd-menu a:hover i{color:#FF7A18}
      @media(max-width:640px){.sm-nav-btn{width:2.25rem;height:2.25rem}}
    `;
    document.head.appendChild(s);
  }

  /* ── Page detection ──────────────────────────────────────────────────── */
  const pageLinks = [
    { label: 'Home', icon: 'house', children: [
      { href: 'index.html', label: 'Home 1' },
      { href: 'home2.html', label: 'Home 2' },
    ]},
    { href: 'about.html', label: 'About', icon: 'info-circle' },
    { href: 'menu.html', label: 'Menu', icon: 'utensils' },
    { href: 'health.html', label: 'Health', icon: 'heart-pulse' },
    { href: 'combos.html', label: 'Combos', icon: 'tags' },
    { href: 'catering.html', label: 'Catering', icon: 'building' },
    { href: 'contact.html', label: 'Contact', icon: 'envelope' },
  ];

  const buildNav = () => `
    <nav id="smMainNav" class="fixed top-0 left-0 right-0 z-50 sm-nav-blur transition-all duration-300"
         style="background:var(--nav-bg);border-bottom:1px solid var(--border)">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14 lg:h-16 xl:h-20">
          <!-- Logo -->
          <a href="index.html" class="flex items-center gap-2.5 group flex-shrink-0" aria-label="Smoothix Home">
            <div class="w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md"
                 style="background:#FF7A18">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9 L9 17 Q12 21 15 17 L18 9"/>
                <line x1="5" y1="9" x2="19" y2="9"/>
                <line x1="14" y1="4" x2="11" y2="15"/>
                <path d="M14 4 Q17 2 16 6"/>
              </svg>
            </div>
            <div class="hidden sm:block">
              <span class="font-extrabold text-lg md:text-xl tracking-tight" style="color:var(--nav-text)">
                SMOOTH<span style="color:#FF7A18">IX</span>
              </span>
              <span class="hidden xl:block text-[10px] uppercase tracking-[0.25em] font-medium" style="color:var(--nav-muted)">Juice & Smoothie Bar</span>
            </div>
          </a>

          <!-- Desktop Links -->
          <div class="hidden lg:flex items-center gap-0.5 xl:gap-1" id="desktopLinks">
            ${pageLinks.map(l => {
              if (l.children) {
                const isActiveParent = l.children.some(c => isActive(c.href));
                return `
                <div class="sm-nav-dd">
                  <a href="#" class="relative px-2.5 xl:px-4 py-2 rounded-xl text-[13px] xl:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap
                    ${isActiveParent ? 'text-[#FF7A18]' : 'hover:text-[#FF7A18]'}"
                    style="color:${isActiveParent ? '' : 'var(--nav-text)'}" onclick="return false">
                    ${l.label}
                    <i class="fa-solid fa-chevron-down text-[9px] opacity-50"></i>
                    <span class="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-transform duration-200 origin-left
                      ${isActiveParent ? 'scale-x-100' : 'scale-x-0'}"
                      style="background:#FF7A18"></span>
                  </a>
                  <div class="sm-nav-dd-menu">
                    ${l.children.map(c => `
                      <a href="${c.href}">
                        <i class="fa-solid fa-${c.href === 'index.html' ? 'house' : 'images'}"></i>
                        ${c.label}
                        ${isActive(c.href) ? '<span class="ml-auto w-1.5 h-1.5 rounded-full" style="background:#FF7A18"></span>' : ''}
                      </a>
                    `).join('')}
                  </div>
                </div>`;
              }
              return `
              <a href="${l.href}" class="relative px-2.5 xl:px-4 py-2 rounded-xl text-[13px] xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap
                ${isActive(l.href)
                  ? 'text-[#FF7A18]'
                  : 'hover:text-[#FF7A18]'}
                " style="color:${isActive(l.href) ? '' : 'var(--nav-text)'}">
                ${l.label}
                <span class="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-transform duration-200 origin-left
                  ${isActive(l.href) ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'}"
                  style="background:#FF7A18"></span>
              </a>`;
            }).join('')}
          </div>

          <!-- Desktop Actions -->
          <div class="hidden lg:flex items-center gap-1.5 xl:gap-2">
            <button id="themeToggleDesktop" class="sm-nav-btn w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                    style="background:var(--secondary-bg);border:1px solid var(--border);color:var(--nav-muted)" title="Toggle Dark Mode" aria-label="Toggle dark mode">
              <i class="fa-solid fa-moon text-sm"></i>
            </button>
            <button id="rtlToggleDesktop" class="sm-nav-btn w-9 h-9 xl:w-10 xl:h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                    style="background:var(--secondary-bg);border:1px solid var(--border);color:var(--nav-muted)" title="Toggle RTL" aria-label="Toggle text direction">
              <i class="fa-solid fa-arrow-right-arrow-left text-sm"></i>
            </button>
            <div class="w-px h-5 xl:h-6 mx-0.5 xl:mx-1" style="background:var(--border)"></div>
            <a href="login.html" class="px-3.5 xl:px-5 py-1.5 xl:py-2 rounded-xl text-[13px] xl:text-sm font-semibold border-2 transition-all duration-200 hover:scale-105 active:scale-95"
               style="border-color:#FF7A18;color:#FF7A18;background:transparent">Login</a>
            <a href="signup.html" class="px-4 xl:px-6 py-1.5 xl:py-2.5 rounded-xl text-[13px] xl:text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
               style="background:#FF7A18">Sign Up</a>
          </div>

          <!-- Mobile Hamburger -->
          <button id="smMobileBtn" class="lg:hidden sm-nav-btn w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                  style="background:var(--secondary-bg);border:1px solid var(--border);color:var(--nav-muted)" aria-label="Open menu">
            <i class="fa-solid fa-bars text-sm"></i>
          </button>
        </div>
      </div>
      <!-- Animated gradient bar -->
      <div class="h-[2px] relative overflow-hidden" style="background:var(--border)">
        <div class="absolute inset-0 animate-nav-line"
             style="background:#FF7A18"></div>
      </div>
    </nav>

    <!-- Mobile Overlay -->
    <div id="smMobOverlay" class="sm-mob-overlay"></div>

    <!-- Mobile Panel -->
    <div id="smMobPanel" class="sm-mob-panel" style="background:var(--nav-bg)">
      <div class="flex items-center justify-between p-5" style="border-bottom:1px solid var(--border)">
        <a href="index.html" class="flex items-center gap-2">
          <div class="w-9 h-9 rounded-xl flex items-center justify-center" style="background:#FF7A18">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9 L9 17 Q12 21 15 17 L18 9"/>
              <line x1="5" y1="9" x2="19" y2="9"/>
              <line x1="14" y1="4" x2="11" y2="15"/>
              <path d="M14 4 Q17 2 16 6"/>
            </svg>
          </div>
          <span class="font-extrabold text-lg" style="color:var(--nav-text)">SMOOTH<span style="color:#FF7A18">IX</span></span>
        </a>
        <button id="smMobClose" class="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style="background:var(--secondary-bg);border:1px solid var(--border);color:var(--nav-muted)" aria-label="Close menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="p-5 space-y-1">
        <p class="text-[10px] font-bold uppercase tracking-widest mb-2" style="color:var(--nav-muted)">Navigation</p>
        ${pageLinks.map(l => {
          if (l.children) {
            const isActiveParent = l.children.some(c => isActive(c.href));
            return `
            <div>
              <button class="sm-mob-dd-btn flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all
                ${isActiveParent ? 'text-[#FF7A18]' : ''}"
                style="color:${isActiveParent ? '' : 'var(--nav-text)'};${isActiveParent ? 'background:rgba(255,122,24,.08)' : ''}">
                <span class="flex items-center gap-3">
                  <i class="fa-solid fa-${l.icon} text-xs w-4 text-center" style="color:${isActiveParent ? '#FF7A18' : 'var(--nav-muted)'}"></i>
                  ${l.label}
                </span>
                <i class="fa-solid fa-chevron-down text-[10px] transition-transform duration-200" style="color:var(--nav-muted)"></i>
              </button>
              <div class="sm-mob-dd pl-7">
                ${l.children.map(c => `
                  <a href="${c.href}" class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm transition-all
                    ${isActive(c.href) ? 'text-[#FF7A18] bg-[rgba(255,122,24,.08)]' : ''}"
                    style="color:${isActive(c.href) ? '' : 'var(--nav-muted)'}">
                    <i class="fa-solid fa-${c.href === 'index.html' ? 'house' : 'images'} text-[10px] w-3 text-center"></i>
                    ${c.label}
                  </a>
                `).join('')}
              </div>
            </div>`;
          }
          return `
          <a href="${l.href}" class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
            ${isActive(l.href) ? 'text-[#FF7A18]' : ''}"
            style="color:${isActive(l.href) ? '' : 'var(--nav-text)'};${isActive(l.href) ? 'background:rgba(255,122,24,.08)' : ''}">
            <i class="fa-solid fa-${l.icon} text-xs w-4 text-center" style="color:${isActive(l.href) ? '#FF7A18' : 'var(--nav-muted)'}"></i>
            ${l.label}
          </a>`;
        }).join('')}
        <div class="pt-4 mt-4 flex gap-2" style="border-top:1px solid var(--border)">
          <button id="themeToggleMobile" class="flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl transition-all"
                  style="border:1px solid var(--border);color:var(--nav-muted)">
            <i class="fa-solid fa-moon text-sm"></i>
          </button>
          <button id="rtlToggleMobile" class="flex-1 flex items-center justify-center px-4 py-2.5 rounded-xl transition-all"
                  style="border:1px solid var(--border);color:var(--nav-muted)">
            <i class="fa-solid fa-arrow-right-arrow-left text-sm"></i>
          </button>
        </div>
        <div class="flex gap-2 pt-2">
          <a href="login.html" class="flex-1 text-center px-4 py-3 rounded-xl text-sm font-semibold transition-all"
             style="border:1px solid var(--border);color:var(--nav-muted)">Login</a>
          <a href="signup.html" class="flex-1 text-center px-4 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-md"
             style="background:#FF7A18">Sign Up</a>
        </div>
      </div>
    </div>
  `;

  nav.innerHTML = buildNav();

  /* ── Refs ────────────────────────────────────────────────────────────── */
  const mainNav = document.getElementById('smMainNav');
  const mobBtn = document.getElementById('smMobileBtn');
  const mobClose = document.getElementById('smMobClose');
  const mobOverlay = document.getElementById('smMobOverlay');
  const mobPanel = document.getElementById('smMobPanel');
  let mobOpen = false;

  const openMob = () => {
    mobOpen = true;
    mobPanel.classList.add('open');
    mobOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMob = () => {
    mobOpen = false;
    mobPanel.classList.remove('open');
    mobOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobBtn?.addEventListener('click', openMob);
  mobClose?.addEventListener('click', closeMob);
  mobOverlay?.addEventListener('click', closeMob);

  /* ── Mobile dropdowns ────────────────────────────────────────────────── */
  document.querySelectorAll('.sm-mob-dd-btn').forEach(b => {
    b.addEventListener('click', () => {
      const dd = b.nextElementSibling;
      const icon = b.querySelector('.fa-chevron-down');
      dd?.classList.toggle('open');
      icon?.classList.toggle('rotate-180');
    });
  });

  /* ── Scroll effects ──────────────────────────────────────────────────── */
  let lastY = 0;
  const onScroll = () => {
    const y = window.pageYOffset;
    if (mainNav) {
      mainNav.style.boxShadow = y > 30 ? '0 4px 30px rgba(0,0,0,.08)' : 'none';
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Dark Mode ───────────────────────────────────────────────────────── */
  const savedTheme = localStorage.getItem('smoothix-theme');
  if (savedTheme === 'dark') document.documentElement.classList.add('dark');

  const syncThemeIcons = () => {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('#themeToggleDesktop i, #themeToggleMobile i').forEach(i => {
      i.className = isDark ? 'fa-solid fa-sun text-sm' : 'fa-solid fa-moon text-sm';
    });
  };
  syncThemeIcons();

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('smoothix-theme', isDark ? 'dark' : 'light');
    syncThemeIcons();
    /* fire custom event for main.js */
    window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: isDark } }));
  };
  document.getElementById('themeToggleDesktop')?.addEventListener('click', toggleTheme);
  document.getElementById('themeToggleMobile')?.addEventListener('click', toggleTheme);

  /* ── RTL Toggle ──────────────────────────────────────────────────────── */
  const savedDir = localStorage.getItem('smoothix-dir');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.classList.add('rtl');
  }

  const syncRtlIcons = () => {};
  syncRtlIcons();

  const toggleRtl = () => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const newDir = isRtl ? 'ltr' : 'rtl';
    document.documentElement.setAttribute('dir', newDir);
    document.documentElement.classList.toggle('rtl', newDir === 'rtl');
    localStorage.setItem('smoothix-dir', newDir);
    syncRtlIcons();
    /* keep mobile panel pinned right */
    if (mobPanel) {
      mobPanel.style.right = '0';
      mobPanel.style.left = 'auto';
    }
  };
  document.getElementById('rtlToggleDesktop')?.addEventListener('click', toggleRtl);
  document.getElementById('rtlToggleMobile')?.addEventListener('click', toggleRtl);

  /* ── Keyboard close ──────────────────────────────────────────────────── */
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && mobOpen) closeMob(); });

  /* ── Resize close ────────────────────────────────────────────────────── */
  let resizeT;
  window.addEventListener('resize', () => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { if (window.innerWidth >= 1024 && mobOpen) closeMob(); }, 200);
  });
})();
