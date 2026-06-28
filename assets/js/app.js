/* app.js — Core application logic
   Ta'limus Sunnah Hafizia Madrasa
*/

/* ============================================================
   CONFIG — Update these values after deploying Google Apps Script
   ============================================================ */
const CONFIG = {
  GAS_NOTICE_URL:  "YOUR_GAS_NOTICE_SCRIPT_URL_HERE",
  GAS_RESULT_URL:  "YOUR_GAS_RESULT_SCRIPT_URL_HERE",
  GAS_CONTACT_URL: "YOUR_GAS_CONTACT_SCRIPT_URL_HERE",
  WHATSAPP_NUMBER: "880{{WHATSAPP_NUMBER}}",   // e.g. 8801761342286
  FACEBOOK_URL:    "{{FACEBOOK_URL}}",
  YOUTUBE_URL:     "{{YOUTUBE_URL}}",
  GOOGLE_MAP_URL:  "{{GOOGLE_MAP_URL}}",
  GOOGLE_MAP_EMBED: "{{GOOGLE_MAP_EMBED_URL}}",
  SITE_URL:        "https://YOUR_GITHUB_USERNAME.github.io/madrasa",
};

/* ============================================================
   THEME
   ============================================================ */
const ThemeManager = {
  init() {
    const saved = localStorage.getItem('madrasa_theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
    this.updateIcons(isDark);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem('madrasa_theme')) {
        this.set(e.matches ? 'dark' : 'light');
      }
    });
  },

  toggle() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('madrasa_theme', isDark ? 'dark' : 'light');
    this.updateIcons(isDark);
  },

  set(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('madrasa_theme', theme);
    this.updateIcons(isDark);
  },

  updateIcons(isDark) {
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.textContent = isDark ? '☀️' : '🌙';
    });
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    });
  }
};

/* ============================================================
   NAVIGATION
   ============================================================ */
const NavManager = {
  init() {
    const toggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const header = document.getElementById('site-header');

    if (toggle && mobileNav) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('open');
        mobileNav.classList.toggle('open', isOpen);
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      // Close mobile nav on link click
      mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          toggle.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
          toggle.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on backdrop click
      document.addEventListener('click', e => {
        if (!header.contains(e.target) && !mobileNav.contains(e.target)) {
          toggle.classList.remove('open');
          mobileNav.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    // Active link highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });

    // Header scroll shadow
    if (header) {
      window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 10
          ? '0 2px 20px rgba(0,0,0,.08)'
          : '';
      }, { passive: true });
    }
  }
};

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
const ScrollReveal = {
  init() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
};

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
const CounterAnimation = {
  init() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  },

  animate(el) {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1800;
    const startTime = performance.now();

    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }
};

/* ============================================================
   FLOATING CONTROLLER
   ============================================================ */
const FloatController = {
  init() {
    // Language toggle
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        toggleLanguage();
      });
    });

    // Theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        ThemeManager.toggle();
      });
    });

    // Scroll to top
    const scrollBtn = document.getElementById('scroll-top-btn');
    if (scrollBtn) {
      window.addEventListener('scroll', () => {
        scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
      }, { passive: true });
      scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }
};

/* ============================================================
   COPY TO CLIPBOARD
   ============================================================ */
function copyToClipboard(text, btn) {
  navigator.clipboard.writeText(text).then(() => {
    const original = btn.textContent;
    btn.textContent = t('donate_copied');
    btn.style.background = 'var(--clr-emerald)';
    btn.style.color = '#fff';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  });
}

/* ============================================================
   TOAST NOTIFICATION
   ============================================================ */
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '5rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'success' ? 'var(--clr-emerald)' : '#dc2626',
    color: '#fff',
    padding: '.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '.875rem',
    fontWeight: '500',
    zIndex: '9999',
    boxShadow: '0 4px 16px rgba(0,0,0,.2)',
    opacity: '0',
    transition: 'opacity .3s ease',
    maxWidth: '90vw',
    textAlign: 'center',
  });
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.style.opacity = '1'; });
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ============================================================
   DATE UTILITIES
   ============================================================ */
function getHijriDate() {
  try {
    const now = new Date();
    // Use Intl if available (modern browsers)
    if (Intl.DateTimeFormat) {
      const hijri = new Intl.DateTimeFormat('en-u-ca-islamic', {
        year: 'numeric', month: 'long', day: 'numeric'
      }).format(now);
      return hijri;
    }
  } catch (e) {}
  return '';
}

function getBanglaHijriDate() {
  try {
    const now = new Date();
    const hijri = new Intl.DateTimeFormat('bn-u-ca-islamic', {
      year: 'numeric', month: 'long', day: 'numeric'
    }).format(now);
    return hijri;
  } catch(e) {
    return getHijriDate();
  }
}

function formatDate(dateStr, lang) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  } catch(e) { return dateStr; }
}

/* ============================================================
   GOOGLE SHEETS DATA FETCHER
   ============================================================ */
async function fetchSheetData(url, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const fullUrl = qs ? `${url}?${qs}` : url;
  const res = await fetch(fullUrl, { mode: 'cors' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
const ContactForm = {
  init() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = t('contact_sending');
      btn.disabled = true;

      const data = {
        name:    form.name.value,
        email:   form.email.value,
        phone:   form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
        time:    new Date().toISOString(),
      };

      try {
        if (CONFIG.GAS_CONTACT_URL.includes('YOUR_GAS')) {
          // Demo mode: simulate success
          await new Promise(r => setTimeout(r, 1000));
          showToast(t('contact_success'), 'success');
          form.reset();
        } else {
          const res = await fetch(CONFIG.GAS_CONTACT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' },
          });
          if (res.ok) {
            showToast(t('contact_success'), 'success');
            form.reset();
          } else {
            throw new Error('Server error');
          }
        }
      } catch (err) {
        showToast(t('contact_error'), 'error');
      } finally {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }
};

/* ============================================================
   SHARED HEADER/FOOTER INJECTION HELPER
   ============================================================ */
function getActivePage() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  return path;
}

function buildNavLinks(lang) {
  const pages = [
    { key: 'nav_home',      href: 'index.html' },
    { key: 'nav_about',     href: 'about.html' },
    { key: 'nav_teachers',  href: 'teachers.html' },
    { key: 'nav_admission', href: 'admission.html' },
    { key: 'nav_notice',    href: 'notice.html' },
    { key: 'nav_results',   href: 'results.html' },
    { key: 'nav_gallery',   href: 'gallery.html' },
    { key: 'nav_donate',    href: 'donate.html' },
    { key: 'nav_contact',   href: 'contact.html' },
  ];
  const currentPage = getActivePage();
  return pages.map(p => {
    const active = currentPage === p.href ? ' active" aria-current="page' : '';
    return `<a href="${p.href}" class="nav-link${active}" data-i18n="${p.key}">${TRANSLATIONS[lang][p.key]}</a>`;
  }).join('');
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  ScrollReveal.init();
  CounterAnimation.init();
  FloatController.init();
  ContactForm.init();

  // Initial translation
  translatePage();

  // Hijri date
  document.querySelectorAll('.hijri-date').forEach(el => {
    el.textContent = currentLang === 'bn' ? getBanglaHijriDate() : getHijriDate();
  });
  document.addEventListener('langchange', () => {
    document.querySelectorAll('.hijri-date').forEach(el => {
      el.textContent = currentLang === 'bn' ? getBanglaHijriDate() : getHijriDate();
    });
  });

  // WhatsApp button
  const waBtn = document.getElementById('wa-btn');
  if (waBtn) {
    waBtn.href = `https://wa.me/${CONFIG.WHATSAPP_NUMBER}`;
  }
});
