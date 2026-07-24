/**
 * SMOOTHIX - Footer Component
 * Dynamic footer loaded across all pages
 * Version: 3.0.0
 */
(function () {
  'use strict';

  const el = document.getElementById('footer');
  if (!el) return;

  const y = new Date().getFullYear();

  el.innerHTML = `
    <footer class="relative" style="background:var(--body-bg)">
      <!-- Gradient Top Line -->
      <div class="h-1 w-full" style="background:linear-gradient(90deg,#FF7A18,#6C63FF,#FF7A18)"></div>

      <!-- Main -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <!-- Brand -->
          <div class="lg:col-span-4">
            <a href="index.html" class="flex items-center gap-2.5 mb-5 group" aria-label="Smoothix Home">
              <div class="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-105"
                   style="background:linear-gradient(135deg,#FF7A18,#e86a10)">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 9 L9 17 Q12 21 15 17 L18 9"/>
                  <line x1="5" y1="9" x2="19" y2="9"/>
                  <line x1="14" y1="4" x2="11" y2="15"/>
                  <path d="M14 4 Q17 2 16 6"/>
                </svg>
              </div>
              <div>
                <span class="font-extrabold text-xl" style="color:var(--nav-text)">SMOOTH<span style="color:#FF7A18">IX</span></span>
                <span class="block text-[10px] uppercase tracking-[0.25em] font-medium" style="color:var(--nav-muted)">Juice & Smoothie Bar</span>
              </div>
            </a>
            <p class="text-sm leading-relaxed mb-6 max-w-xs" style="color:var(--nav-muted)">
              Freshly blended juices and smoothies crafted from 100% natural ingredients. No added sugar, no preservatives — just pure goodness in every sip.
            </p>
            <div class="flex items-center gap-3">
              ${[
                { icon: 'fa-instagram', label: 'Instagram', color: '#E4405F' },
                { icon: 'fa-facebook-f', label: 'Facebook', color: '#1877F2' },
                { icon: 'fa-x-twitter', label: 'Twitter', color: '#1DA1F2' },
                { icon: 'fa-tiktok', label: 'TikTok', color: '#000' },
              ].map(s => `
                <a href="#" aria-label="${s.label}" class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg group"
                   style="background:var(--secondary-bg);border:1px solid var(--border)">
                  <i class="fa-brands ${s.icon} text-sm transition-colors" style="color:var(--nav-muted)"></i>
                </a>
              `).join('')}
            </div>
          </div>

          <!-- Quick Links -->
          <div class="lg:col-span-2">
            <h4 class="font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2" style="color:var(--nav-text)">
              <span class="w-5 h-0.5 rounded-full" style="background:#FF7A18"></span> Quick Links
            </h4>
            <ul class="space-y-3">
              ${['Home', 'Menu', 'Health', 'Catering', 'About', 'Contact'].map(l => `
                <li><a href="${l.toLowerCase() + '.html'}"
                  class="text-sm transition-all duration-200 hover:translate-x-1 inline-block hover:text-[#FF7A18]"
                  style="color:var(--nav-muted)">${l}</a></li>
              `).join('')}
            </ul>
          </div>

          <!-- Hours -->
          <div class="lg:col-span-3">
            <h4 class="font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2" style="color:var(--nav-text)">
              <span class="w-5 h-0.5 rounded-full" style="background:#6C63FF"></span> Opening Hours
            </h4>
            <ul class="space-y-3 text-sm" style="color:var(--nav-muted)">
              <li class="flex justify-between items-center py-2 px-3 rounded-lg transition-colors" style="background:var(--secondary-bg)">
                <span>Mon – Fri</span><span class="font-semibold" style="color:#FF7A18">7 AM – 9 PM</span>
              </li>
              <li class="flex justify-between items-center py-2 px-3 rounded-lg transition-colors" style="background:var(--secondary-bg)">
                <span>Saturday</span><span class="font-semibold" style="color:#FF7A18">8 AM – 10 PM</span>
              </li>
              <li class="flex justify-between items-center py-2 px-3 rounded-lg transition-colors" style="background:var(--secondary-bg)">
                <span>Sunday</span><span class="font-semibold" style="color:#FF7A18">8 AM – 10 PM</span>
              </li>
            </ul>
          </div>

          <!-- Contact -->
          <div class="lg:col-span-3">
            <h4 class="font-bold text-xs uppercase tracking-wider mb-5 flex items-center gap-2" style="color:var(--nav-text)">
              <span class="w-5 h-0.5 rounded-full" style="background:#FF7A18"></span> Contact
            </h4>
            <ul class="space-y-4 text-sm" style="color:var(--nav-muted)">
              <li class="flex items-start gap-3 group">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style="background:rgba(255,122,24,.08)">
                  <i class="fa-solid fa-location-dot text-xs" style="color:#FF7A18"></i>
                </div>
                <span class="leading-relaxed pt-1.5">123 Fresh Avenue, Green District,<br>New York, NY 10001</span>
              </li>
              <li class="flex items-center gap-3 group">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style="background:rgba(108,99,255,.08)">
                  <i class="fa-solid fa-phone text-xs" style="color:#6C63FF"></i>
                </div>
                <a href="tel:+12125551234" class="transition-colors hover:text-[#FF7A18]">(212) 555-1234</a>
              </li>
              <li class="flex items-center gap-3 group">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110" style="background:rgba(255,122,24,.08)">
                  <i class="fa-solid fa-envelope text-xs" style="color:#FF7A18"></i>
                </div>
                <a href="mailto:hello@smoothix.com" class="transition-colors hover:text-[#FF7A18]">hello@smoothix.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div style="border-top:1px solid var(--border);border-bottom:1px solid var(--border)">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div class="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            ${[
              { icon: 'fa-leaf', label: '100% Natural' },
              { icon: 'fa-ban', label: 'No Preservatives' },
              { icon: 'fa-truck-fast', label: 'Free Delivery' },
              { icon: 'fa-award', label: 'Award Winning' },
            ].map(b => `
              <div class="flex items-center gap-2">
                <i class="fa-solid ${b.icon} text-sm" style="color:#FF7A18"></i>
                <span class="text-xs font-medium" style="color:var(--nav-muted)">${b.label}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p class="text-xs" style="color:var(--nav-muted)">&copy; ${y} Smoothix. All rights reserved.</p>
          <div class="flex items-center gap-5">
            <a href="#" class="text-xs transition-colors hover:text-[#FF7A18]" style="color:var(--nav-muted)">Privacy Policy</a>
            <span style="color:var(--border)">|</span>
            <a href="#" class="text-xs transition-colors hover:text-[#FF7A18]" style="color:var(--nav-muted)">Terms of Service</a>
            <span style="color:var(--border)">|</span>
            <a href="#" class="text-xs transition-colors hover:text-[#FF7A18]" style="color:var(--nav-muted)">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  `;
})();
