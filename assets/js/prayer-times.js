/* prayer-times.js — Aladhan API integration with offline fallback
   City: Rajshahi, Bangladesh
   Method: 1 (University of Islamic Sciences, Karachi) — widely used in BD
*/

const PrayerTimes = {
  CACHE_KEY: 'madrasa_prayer_cache',
  API_URL: 'https://api.aladhan.com/v1/timingsByCity',

  async init() {
    const containers = document.querySelectorAll('.prayer-times-widget');
    if (!containers.length) return;

    // Check session cache first
    const cached = this.getCache();
    if (cached) {
      this.render(cached);
      return;
    }

    try {
      const data = await this.fetchFromAPI();
      this.setCache(data);
      this.render(data);
    } catch (err) {
      console.warn('Prayer API failed, using fallback', err);
      const fallback = this.getFallback();
      this.render(fallback);
    }
  },

  async fetchFromAPI() {
    const today = new Date();
    const params = new URLSearchParams({
      city:    'Rajshahi',
      country: 'Bangladesh',
      method:  1,
      day:     today.getDate(),
      month:   today.getMonth() + 1,
      year:    today.getFullYear(),
    });

    const res = await fetch(`${this.API_URL}?${params}`, {
      signal: AbortSignal.timeout(6000) // 6s timeout
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.code !== 200) throw new Error('API error');
    return json.data.timings;
  },

  getCache() {
    try {
      const raw = sessionStorage.getItem(this.CACHE_KEY);
      if (!raw) return null;
      const { date, data } = JSON.parse(raw);
      // Valid only for today
      if (date === new Date().toDateString()) return data;
    } catch (e) {}
    return null;
  },

  setCache(data) {
    try {
      sessionStorage.setItem(this.CACHE_KEY, JSON.stringify({
        date: new Date().toDateString(),
        data
      }));
    } catch (e) {}
  },

  /* Approximate fixed times for Rajshahi (fallback) */
  getFallback() {
    return {
      Fajr:    '04:35',
      Dhuhr:   '12:08',
      Asr:     '15:45',
      Maghrib: '18:10',
      Isha:    '19:30',
    };
  },

  /* Determine which prayer is current / next */
  getActivePrayer(timings) {
    const now = new Date();
    const nowMins = now.getHours() * 60 + now.getMinutes();

    const prayers = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
    let active = 'Isha'; // default: after Isha, next is Fajr

    for (const name of prayers) {
      const [h, m] = (timings[name] || '00:00').split(':').map(Number);
      const pMins = h * 60 + m;
      if (nowMins >= pMins) active = name;
    }
    return active;
  },

  formatTime(timeStr, use12h = true) {
    if (!timeStr) return '--:--';
    try {
      const [h, m] = timeStr.split(':').map(Number);
      if (!use12h) return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12  = h % 12 || 12;
      return `${h12}:${String(m).padStart(2,'0')} ${ampm}`;
    } catch (e) { return timeStr; }
  },

  render(timings) {
    const active = this.getActivePrayer(timings);
    const prayers = [
      { key: 'Fajr',    labelKey: 'prayer_fajr'    },
      { key: 'Dhuhr',   labelKey: 'prayer_dhuhr'   },
      { key: 'Asr',     labelKey: 'prayer_asr'     },
      { key: 'Maghrib', labelKey: 'prayer_maghrib' },
      { key: 'Isha',    labelKey: 'prayer_isha'    },
    ];

    document.querySelectorAll('.prayer-times-widget').forEach(container => {
      const grid = container.querySelector('.prayer-grid');
      if (!grid) return;

      grid.innerHTML = prayers.map(p => `
        <div class="prayer-item${p.key === active ? ' active' : ''}">
          <span class="prayer-name" data-i18n="${p.labelKey}">${t(p.labelKey)}</span>
          <span class="prayer-time">${this.formatTime(timings[p.key])}</span>
        </div>
      `).join('');

      // Update loading state
      const loading = container.querySelector('.prayer-loading');
      if (loading) loading.remove();
    });
  }
};

// Auto-init when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  PrayerTimes.init();
});

// Re-render prayer labels on language change
document.addEventListener('langchange', () => {
  const cache = PrayerTimes.getCache() || PrayerTimes.getFallback();
  PrayerTimes.render(cache);
});
