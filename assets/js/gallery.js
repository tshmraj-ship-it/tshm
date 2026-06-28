/* gallery.js — Gallery filtering, lightbox, lazy loading
   Ta'limus Sunnah Hafizia Madrasa
*/

const Gallery = {
  currentFilter: 'all',
  lightboxOpen: false,

  items: [
    { src: 'https://placehold.co/600x400/1a2744/ffffff?text=Campus+Front', cat: 'campus',   caption_bn: 'মাদ্রাসার সামনের দৃশ্য',        caption_en: 'Front view of the madrasa' },
    { src: 'https://placehold.co/600x800/0d7c6e/ffffff?text=Main+Gate',   cat: 'campus',   caption_bn: 'মাদ্রাসার প্রধান ফটক',          caption_en: 'Main entrance gate' },
    { src: 'https://placehold.co/600x400/1a3a6b/ffffff?text=Classroom',   cat: 'classroom', caption_bn: 'শ্রেণিকক্ষের দৃশ্য',            caption_en: 'Classroom view' },
    { src: 'https://placehold.co/600x500/0d7c6e/ffffff?text=Quran+Class', cat: 'classroom', caption_bn: 'কুরআন শিক্ষার ক্লাস',           caption_en: 'Quran recitation class' },
    { src: 'https://placehold.co/600x400/1a2744/ffffff?text=Students+1',  cat: 'students',  caption_bn: 'হিফজ বিভাগের শিক্ষার্থীরা',    caption_en: 'Hifz department students' },
    { src: 'https://placehold.co/600x600/14a08f/ffffff?text=Students+2',  cat: 'students',  caption_bn: 'নূরানী বিভাগের শিক্ষার্থীরা',  caption_en: 'Noorani department students' },
    { src: 'https://placehold.co/600x400/1a3a6b/ffffff?text=Annual+Event',cat: 'events',    caption_bn: 'বার্ষিক অনুষ্ঠান',              caption_en: 'Annual programme' },
    { src: 'https://placehold.co/600x450/0d7c6e/ffffff?text=Graduation',  cat: 'events',    caption_bn: 'সনদ বিতরণ অনুষ্ঠান',           caption_en: 'Graduation ceremony' },
    { src: 'https://placehold.co/600x800/1a2744/ffffff?text=Residential', cat: 'residential',caption_bn:'আবাসিক ছাত্রাবাস',             caption_en: 'Residential dormitory' },
    { src: 'https://placehold.co/600x400/14a08f/ffffff?text=Dining+Hall', cat: 'residential',caption_bn:'ডাইনিং হল',                    caption_en: 'Dining hall' },
    { src: 'https://placehold.co/600x400/1a3a6b/ffffff?text=Library',     cat: 'campus',    caption_bn: 'পাঠাগার',                       caption_en: 'Library' },
    { src: 'https://placehold.co/600x500/0d7c6e/ffffff?text=Prayer+Hall', cat: 'campus',    caption_bn: 'নামাযের হল',                    caption_en: 'Prayer hall' },
  ],

  init() {
    const container = document.getElementById('gallery-container');
    if (!container) return;

    this.renderItems(container, this.items);
    this.initFilters();
    this.initLightbox();
    this.initLazyLoad();
  },

  renderItems(container, items) {
    container.innerHTML = items.map((item, i) => `
      <div class="gallery-item reveal" data-cat="${item.cat}" data-index="${i}" role="button"
           tabindex="0" aria-label="${currentLang === 'bn' ? item.caption_bn : item.caption_en}">
        <img
          data-src="${item.src}"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E"
          alt="${currentLang === 'bn' ? item.caption_bn : item.caption_en}"
          width="600" height="400"
          loading="lazy"
          class="gallery-lazy"
        >
        <div class="gallery-overlay">
          <span>${currentLang === 'bn' ? item.caption_bn : item.caption_en}</span>
        </div>
      </div>
    `).join('');

    // Click handlers
    container.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => this.openLightbox(parseInt(item.dataset.index)));
      item.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.openLightbox(parseInt(item.dataset.index));
        }
      });
    });

    // Trigger scroll reveal
    requestAnimationFrame(() => {
      if (window.ScrollReveal) ScrollReveal.init();
      else {
        document.querySelectorAll('.reveal').forEach(el => {
          setTimeout(() => el.classList.add('visible'), 100);
        });
      }
    });
  },

  initFilters() {
    const filterBtns = document.querySelectorAll('.gallery-filter');
    const container  = document.getElementById('gallery-container');
    if (!filterBtns.length || !container) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.dataset.cat;
        this.currentFilter = cat;

        container.querySelectorAll('.gallery-item').forEach(item => {
          const show = cat === 'all' || item.dataset.cat === cat;
          item.style.display = show ? '' : 'none';
          if (show) item.style.animation = 'fadeIn .3s ease';
        });
      });
    });
  },

  initLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;

    const closeBtn = document.getElementById('lightbox-close');
    const img      = document.getElementById('lightbox-img');
    const cap      = document.getElementById('lightbox-cap');
    const prev     = document.getElementById('lightbox-prev');
    const next     = document.getElementById('lightbox-next');

    if (closeBtn) closeBtn.addEventListener('click', () => this.closeLightbox());
    lb.addEventListener('click', e => { if (e.target === lb) this.closeLightbox(); });
    if (prev) prev.addEventListener('click', () => this.navigateLightbox(-1));
    if (next) next.addEventListener('click', () => this.navigateLightbox(1));

    document.addEventListener('keydown', e => {
      if (!this.lightboxOpen) return;
      if (e.key === 'Escape')      this.closeLightbox();
      if (e.key === 'ArrowLeft')   this.navigateLightbox(-1);
      if (e.key === 'ArrowRight')  this.navigateLightbox(1);
    });
  },

  currentIndex: 0,
  openLightbox(index) {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    this.currentIndex = index;
    this.lightboxOpen = true;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.updateLightboxContent();
    document.getElementById('lightbox-close')?.focus();
  },

  closeLightbox() {
    const lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  },

  navigateLightbox(dir) {
    const visible = this.items.filter((_, i) =>
      this.currentFilter === 'all' || this.items[i].cat === this.currentFilter
    );
    const visIndices = this.items.map((item, i) =>
      (this.currentFilter === 'all' || item.cat === this.currentFilter) ? i : -1
    ).filter(i => i !== -1);

    const pos = visIndices.indexOf(this.currentIndex);
    const newPos = (pos + dir + visIndices.length) % visIndices.length;
    this.currentIndex = visIndices[newPos];
    this.updateLightboxContent();
  },

  updateLightboxContent() {
    const img = document.getElementById('lightbox-img');
    const cap = document.getElementById('lightbox-cap');
    const item = this.items[this.currentIndex];
    if (!item) return;
    if (img) { img.src = item.src; img.alt = currentLang === 'bn' ? item.caption_bn : item.caption_en; }
    if (cap) cap.textContent = currentLang === 'bn' ? item.caption_bn : item.caption_en;
  },

  initLazyLoad() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('.gallery-lazy').forEach(img => {
        img.src = img.dataset.src;
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('gallery-lazy');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    document.querySelectorAll('.gallery-lazy').forEach(img => observer.observe(img));
  }
};

document.addEventListener('DOMContentLoaded', () => Gallery.init());
document.addEventListener('langchange', () => {
  const container = document.getElementById('gallery-container');
  if (container) {
    Gallery.renderItems(container, Gallery.items);
    Gallery.initFilters();
    Gallery.initLazyLoad();
  }
});
