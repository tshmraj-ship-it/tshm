# তা'লিমুস সুন্নাহ্ হাফিজিয়া মাদ্রাসা — ওয়েবসাইট

**Ta'limus Sunnah Hafizia Madrasa** — একটি আধুনিক, দ্বিভাষিক (বাংলা/ইংরেজি), PWA-সক্ষম ইসলামী শিক্ষা প্রতিষ্ঠানের ওয়েবসাইট।

---

## 📋 বিষয়বস্তু

1. [ফাইল কাঠামো](#ফাইল-কাঠামো)
2. [দ্রুত শুরু](#দ্রুত-শুরু)
3. [GitHub Pages-এ ডিপ্লয়](#github-pages-এ-ডিপ্লয়)
4. [Cloudflare Pages-এ ডিপ্লয়](#cloudflare-pages-এ-ডিপ্লয়)
5. [Netlify-তে ডিপ্লয়](#netlify-তে-ডিপ্লয়)
6. [Vercel-এ ডিপ্লয়](#vercel-এ-ডিপ্লয়)
7. [Placeholder মান পরিবর্তন](#placeholder-মান-পরিবর্তন)
8. [Google Sheets সেটআপ](#google-sheets-সেটআপ)
9. [Google Apps Script সেটআপ](#google-apps-script-সেটআপ)
10. [অনুবাদ সিস্টেম](#অনুবাদ-সিস্টেম)
11. [যোগাযোগের তথ্য আপডেট](#যোগাযোগের-তথ্য-আপডেট)
12. [দানের তথ্য আপডেট](#দানের-তথ্য-আপডেট)
13. [QR কোড যোগ করুন](#qr-কোড-যোগ-করুন)
14. [গ্যালারিতে ছবি যোগ করুন](#গ্যালারিতে-ছবি-যোগ-করুন)
15. [ফলাফল প্রকাশ করুন](#ফলাফল-প্রকাশ-করুন)
16. [নোটিশ প্রকাশ করুন](#নোটিশ-প্রকাশ-করুন)
17. [PWA আইকন তৈরি](#pwa-আইকন-তৈরি)

---

## ফাইল কাঠামো

```
madrasa/
├── index.html           # হোম পেজ
├── about.html           # পরিচিতি পেজ
├── teachers.html        # শিক্ষকমণ্ডলী পেজ
├── admission.html       # ভর্তি তথ্য পেজ
├── notice.html          # নোটিশ বোর্ড পেজ
├── results.html         # পরীক্ষার ফলাফল পেজ
├── gallery.html         # গ্যালারি পেজ
├── donate.html          # দান পেজ
├── contact.html         # যোগাযোগ পেজ
├── 404.html             # ত্রুটি পেজ
├── manifest.json        # PWA ম্যানিফেস্ট
├── sw.js                # Service Worker
├── robots.txt           # সার্চ ইঞ্জিন নির্দেশনা
├── sitemap.xml          # সাইটম্যাপ
├── README.md            # এই ফাইল
└── assets/
    ├── css/
    │   └── style.css    # মূল CSS
    ├── js/
    │   ├── translations.js  # অনুবাদ ডিকশনারি
    │   ├── app.js           # মূল অ্যাপ লজিক
    │   ├── prayer-times.js  # নামাযের সময়
    │   └── gallery.js       # গ্যালারি লজিক
    └── images/          # ছবি রাখুন এখানে
```

---

## দ্রুত শুরু

কোনো বিল্ড স্টেপ নেই। ফাইলগুলো সরাসরি ব্রাউজারে খুলুন:

```bash
# যেকোনো local server দিয়ে চালান
npx serve .
# অথবা
python3 -m http.server 3000
# অথবা VS Code Live Server extension
```

---

## GitHub Pages-এ ডিপ্লয়

### ধাপ ১ — Repository তৈরি করুন

```bash
git init
git add .
git commit -m "Initial commit: madrasa website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/madrasa.git
git push -u origin main
```

### ধাপ ২ — GitHub Pages চালু করুন

1. GitHub-এ repository খুলুন
2. **Settings** → **Pages** যান
3. **Source**: `Deploy from a branch` বেছে নিন
4. **Branch**: `main`, **Folder**: `/ (root)` সেট করুন
5. **Save** করুন
6. কয়েক মিনিট পর `https://YOUR_USERNAME.github.io/madrasa/` সাইট লাইভ হবে

### ধাপ ৩ — Custom Domain (ঐচ্ছিক)

1. **Settings** → **Pages** → **Custom domain** এ আপনার ডোমেইন লিখুন
2. DNS provider-এ CNAME record যোগ করুন:
   ```
   www → YOUR_USERNAME.github.io
   ```

---

## Cloudflare Pages-এ ডিপ্লয়

1. [pages.cloudflare.com](https://pages.cloudflare.com) এ যান
2. **Create a project** → **Connect to Git**
3. আপনার GitHub repository বেছে নিন
4. Build settings:
   - **Framework preset**: None
   - **Build command**: (খালি রাখুন)
   - **Build output directory**: `/`
5. **Save and Deploy** করুন

---

## Netlify-তে ডিপ্লয়

### Git দিয়ে (প্রস্তাবিত)

1. [app.netlify.com](https://app.netlify.com) এ যান
2. **New site from Git** বেছে নিন
3. GitHub repository connect করুন
4. Build settings:
   - **Build command**: (খালি রাখুন)
   - **Publish directory**: `.`
5. **Deploy site** করুন

### Drag & Drop দিয়ে

1. [app.netlify.com/drop](https://app.netlify.com/drop) এ যান
2. পুরো `madrasa` ফোল্ডারটি drag করুন
3. সাইট তাৎক্ষণিক লাইভ হবে

---

## Vercel-এ ডিপ্লয়

```bash
# Vercel CLI ইনস্টল করুন
npm i -g vercel

# প্রজেক্ট ফোল্ডারে যান
cd madrasa

# ডিপ্লয় করুন
vercel

# Settings:
# Framework: Other
# Build Command: (none)
# Output Directory: .
```

অথবা [vercel.com](https://vercel.com) → **New Project** → GitHub repository import করুন।

---

## Placeholder মান পরিবর্তন

সমস্ত `{{PLACEHOLDER}}` মানগুলো নিচের নির্দেশ অনুযায়ী পরিবর্তন করুন।

**Find & Replace** (VS Code: `Ctrl+Shift+H`) ব্যবহার করুন:

| Placeholder | বিবরণ | উদাহরণ |
|-------------|-------|--------|
| `YOUR_SITE_URL` | সাইটের URL | `tshmraj-ship-it.github.io/madrasa` |
| `YOUR_USERNAME` | GitHub username | `tshmraj-ship-it` |
| `{{WHATSAPP_NUMBER}}` | WhatsApp নম্বর (দেশ কোড ছাড়া) | `1761342286` |
| `{{FACEBOOK_URL}}` | Facebook পেজ URL | `https://facebook.com/yourpage` |
| `{{YOUTUBE_URL}}` | YouTube চ্যানেল URL | `https://youtube.com/@yourchannel` |
| `{{WHATSAPP_URL}}` | WhatsApp লিংক | `https://wa.me/8801761342286` |
| `{{GOOGLE_MAP_URL}}` | Google Maps লিংক | `https://maps.google.com/?q=...` |
| `{{GOOGLE_MAP_EMBED_URL}}` | Maps embed URL | `https://www.google.com/maps/embed?pb=...` |
| `{{BKASH_NUMBER}}` | বিকাশ নম্বর | `01761-342286` |
| `{{NAGAD_NUMBER}}` | নগদ নম্বর | `01761-342286` |
| `{{ROCKET_NUMBER}}` | রকেট নম্বর | `01761-342286` |
| `{{BANK_NAME}}` | ব্যাংকের নাম | `Islami Bank Bangladesh` |
| `{{BANK_BRANCH}}` | শাখার নাম | `Rajshahi Branch` |
| `{{BANK_ACCOUNT}}` | একাউন্ট নম্বর | `20501234567890` |
| `{{BANK_ACCOUNT_NAME}}` | হিসাবধারীর নাম | `Ta'limus Sunnah Hafizia Madrasa` |
| `{{EXTERNAL_RESULT_PORTAL_URL}}` | বাহ্যিক ফলাফল পোর্টাল | `https://noorani-result.com/...` |

---

## Google Sheets সেটআপ

### নোটিশ Sheet তৈরি করুন

1. [sheets.google.com](https://sheets.google.com) এ নতুন Sheet তৈরি করুন
2. নাম দিন: `Madrasa Notices`
3. **প্রথম সারিতে** এই headers লিখুন (ঠিক এই ক্রমে):

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| date | title_bn | title_en | desc_bn | desc_en | cat | pdf_url |

4. **cat** কলামে এই মানগুলো ব্যবহার করুন: `general`, `exam`, `admission`, `event`

### ফলাফল Sheet তৈরি করুন

নতুন Sheet তৈরি করুন নাম: `Madrasa Results`

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| date | title_bn | title_en | class | exam | year | top_student_bn | top_student_en | marks_bn | marks_en | pdf_url |

- **class**: `noorani`, `nazera`, `hifz`, `kitab`, `class1`–`class5`
- **exam**: `monthly`, `half-yearly`, `annual`, `special`

---

## Google Apps Script সেটআপ

### নোটিশ Script

1. নোটিশ Google Sheet খুলুন
2. **Extensions** → **Apps Script** এ যান
3. নিচের কোড paste করুন:

```javascript
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Sheet1');
  const data  = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows    = data.slice(1);

  const limit = parseInt(e.parameter.limit) || 50;

  const notices = rows
    .filter(r => r[0]) // date must exist
    .slice(0, limit)
    .map(r => {
      const obj = {};
      headers.forEach((h, i) => { obj[h] = r[i] || ''; });
      // Normalise date
      if (obj.date instanceof Date) {
        obj.date = Utilities.formatDate(obj.date, 'Asia/Dhaka', 'yyyy-MM-dd');
      }
      return obj;
    });

  return ContentService
    .createTextOutput(JSON.stringify({ notices, total: notices.length }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. **Deploy** → **New deployment** → Type: **Web app**
5. **Execute as**: Me | **Who has access**: Anyone
6. **Deploy** করুন এবং URL কপি করুন
7. `assets/js/app.js` ফাইলে `GAS_NOTICE_URL` আপডেট করুন

### ফলাফল Script

একই পদ্ধতিতে, কিন্তু `notices` এর বদলে `results` key ব্যবহার করুন।

### যোগাযোগ ফর্ম Script

```javascript
function doPost(e) {
  try {
    const data  = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName('Contacts');

    sheet.appendRow([
      new Date(),
      data.name    || '',
      data.phone   || '',
      data.email   || '',
      data.subject || '',
      data.message || '',
      data.lang    || 'bn',
    ]);

    // Optional: Email notification
    // MailApp.sendEmail('YOUR_EMAIL@gmail.com',
    //   'নতুন বার্তা: ' + data.subject,
    //   `নাম: ${data.name}\nফোন: ${data.phone}\nবার্তা: ${data.message}`
    // );

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## অনুবাদ সিস্টেম

সব অনুবাদ `assets/js/translations.js` ফাইলে রয়েছে।

### নতুন টেক্সট যোগ করতে

```javascript
// translations.js-এ যোগ করুন:
bn: {
  my_new_key: "আমার নতুন লেখা",
  // ...
},
en: {
  my_new_key: "My new text",
  // ...
}
```

```html
<!-- HTML-এ ব্যবহার করুন: -->
<p data-i18n="my_new_key">আমার নতুন লেখা</p>
```

### ভাষা পরিবর্তন

- ডিফল্ট: বাংলা
- Floating controller-এর `EN`/`বাংলা` বাটনে ক্লিক করুন
- পছন্দ localStorage-এ সংরক্ষিত থাকে

---

## যোগাযোগের তথ্য আপডেট

`assets/js/translations.js` ফাইলে `bn` এবং `en` উভয় অবজেক্টে এই মানগুলো আপডেট করুন:

```javascript
address_full: "বাসন্তাপুর, সরকারি গোরস্থানের দক্ষিণে, বাগধানী, পবা, রাজশাহী",
phone1:       "০১৭৬১-৩৪২২৮৬",
phone2:       "০১৫৪০-৫০৫১০২",
affiliation:  "নূরানী তা'লিমুল কুরআন বোর্ড, চট্টগ্রাম",
muhtamim:     "হাফেজ মাওলানা হাবিবুল্লাহ মাহমুদী",
```

এছাড়া `assets/js/app.js`-এর `CONFIG` অবজেক্টে:

```javascript
const CONFIG = {
  WHATSAPP_NUMBER: "8801761342286",  // আপনার WhatsApp নম্বর
  FACEBOOK_URL:    "https://facebook.com/yourpage",
  YOUTUBE_URL:     "https://youtube.com/@yourchannel",
  GOOGLE_MAP_URL:  "https://maps.google.com/?q=...",
};
```

---

## দানের তথ্য আপডেট

`donate.html` ফাইলে Find & Replace করুন:

```
{{BKASH_NUMBER}}   → 01761-342286  (বিকাশ নম্বর)
{{NAGAD_NUMBER}}   → 01761-342286  (নগদ নম্বর)
{{ROCKET_NUMBER}}  → 01761-342286  (রকেট নম্বর)
{{BANK_ACCOUNT}}   → 20501234567890
{{BANK_NAME}}      → Islami Bank Bangladesh Limited
{{BANK_BRANCH}}    → Rajshahi Branch
{{BANK_ACCOUNT_NAME}} → Ta'limus Sunnah Hafizia Madrasa
```

---

## QR কোড যোগ করুন

1. বিকাশ/নগদ/রকেট অ্যাপ থেকে QR কোড ছবি সংগ্রহ করুন
2. `assets/images/` ফোল্ডারে রাখুন:
   - `qr-bkash.png`
   - `qr-nagad.png`
   - `qr-rocket.png`
3. `donate.html`-এ `qr-placeholder` div-গুলো `<img>` ট্যাগ দিয়ে প্রতিস্থাপন করুন:

```html
<img src="assets/images/qr-bkash.png"
     alt="বিকাশ QR কোড"
     width="120" height="120"
     style="border-radius:var(--r-md);">
```

---

## গ্যালারিতে ছবি যোগ করুন

`assets/js/gallery.js` ফাইলে `items` অ্যারে সম্পাদনা করুন:

```javascript
const items = [
  {
    src:        'assets/images/campus-01.jpg',  // ছবির পথ
    cat:        'campus',                        // বিভাগ: campus/classroom/students/events/residential
    caption_bn: 'মাদ্রাসার প্রধান ভবন',
    caption_en: 'Main building of the madrasa',
  },
  // আরও ছবি যোগ করুন...
];
```

**ছবি অপটিমাইজেশন টিপস:**
- সর্বোচ্চ প্রস্থ: 1200px
- ফরম্যাট: JPEG (quality 75-85%) বা WebP
- ফাইল সাইজ: প্রতি ছবি ≤ 200KB

---

## ফলাফল প্রকাশ করুন

**Google Sheets পদ্ধতি (প্রস্তাবিত):**

`Madrasa Results` Sheet-এ নতুন সারি যোগ করুন:

| date | title_bn | title_en | class | exam | year | top_student_bn | marks_bn | pdf_url |
|------|---------|---------|-------|------|------|----------------|----------|---------|
| 2025-06-30 | বার্ষিক পরীক্ষা ২০২৫ | Annual Exam 2025 | hifz | annual | 2025 | মো. আবদুল্লাহ | ৯৫% | (PDF লিংক) |

PDF আপলোড করতে Google Drive ব্যবহার করুন এবং "Share" লিংক ব্যবহার করুন।

---

## নোটিশ প্রকাশ করুন

**Google Sheets পদ্ধতি:**

`Madrasa Notices` Sheet-এ নতুন সারি যোগ করুন:

| date | title_bn | title_en | desc_bn | desc_en | cat | pdf_url |
|------|---------|---------|---------|---------|-----|---------|
| 2025-01-20 | পরীক্ষার তারিখ ঘোষণা | Exam Date Announced | বার্ষিক পরীক্ষা... | Annual exam... | exam | |

**cat** মান: `general`, `exam`, `admission`, `event`

---

## PWA আইকন তৈরি

1. [realfavicongenerator.net](https://realfavicongenerator.net) এ যান
2. মাদ্রাসার লোগো আপলোড করুন
3. Generated ফাইলগুলো `assets/images/` ফোল্ডারে রাখুন:
   - `icon-72.png`
   - `icon-96.png`
   - `icon-128.png`
   - `icon-192.png`
   - `icon-512.png`

---

## সমস্যা সমাধান

### নামাযের সময় দেখাচ্ছে না
- ইন্টারনেট সংযোগ পরীক্ষা করুন
- Aladhan API সাময়িকভাবে বন্ধ থাকলে fallback সময় দেখাবে

### নোটিশ/ফলাফল দেখাচ্ছে না
- `app.js`-এ `GAS_NOTICE_URL` ও `GAS_RESULT_URL` সঠিকভাবে সেট করা হয়েছে কিনা পরীক্ষা করুন
- Apps Script deployment-এ "Anyone" access দেওয়া হয়েছে কিনা দেখুন

### ডার্ক মোড কাজ করছে না
- Browser localStorage সক্রিয় আছে কিনা পরীক্ষা করুন

### Service Worker আপডেট হচ্ছে না
- `sw.js`-এ `CACHE_NAME` এর version বাড়িয়ে দিন (যেমন `v1.0.1`)

---

## লাইসেন্স

এই ওয়েবসাইটটি তা'লিমুস সুন্নাহ্ হাফিজিয়া মাদ্রাসার জন্য তৈরি করা হয়েছে।
সমস্ত অধিকার সংরক্ষিত © ২০২৫।

---

*بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ*
