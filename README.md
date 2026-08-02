# Hopeful Seasons Wellness – Clinical Psychology Practice

Live: **https://hopeful-seasons-wellness.netlify.app/**

Professional therapy website for **Thembelihle Hope Magubane**, Clinical Psychologist @ Hopeful Seasons Wellness, Johannesburg, South Africa.  
**HPCSA Registered: PS 014 5734 | BHF Practice Number: 0977969**

> “Without rain, nothing grows. Learn to embrace the storms of your life.”  
> “Healing unfolds in the presence of another who can gently reflect what was once unseen.”

---

## Project Overview
Pixel-perfect, production-ready clone of the live Netlify deployment.  
Features:

- Sticky blur header with logo, dropdown Services, Book Now CTA, mobile drawer (86% width)
- Hero with centered circular avatar portrait above title, translucent card overlay `rgba(255,255,255,0.6)` blur 5px, quote styling, dual CTAs
- Services grid `auto-fit minmax(280px,1fr)` with image hover scale 1.1, shadow transitions
- Affiliations ribbon light-gray #C9D3D7 with HPCSA / BHF tags
- About teaser 2-column (0.9fr/1.1fr) image left, text & quote right
- Testimonials Swiper slider with pagination dots, bg-cream #EFE4E2 cards
- Resources teaser 2-col, FAQ accordion with + icon rotate 45deg, single-open
- CTA sage gradient primary→dark with cyan button, 4-column footer (Quick Links, Services, Contact with phone/email/address, legal disclaimers)
- Floating Action Buttons (WhatsApp/Call) bottom 30 left 30, back-to-top, booking modal, form validation, lazy loading, IntersectionObserver animations

---

## Directory Structure
```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── variables.css  # Dirty-pastels palette, typography, spacing, radii, shadows
│   │   ├── style.css      # Live base (hero, services, testimonials, FAQ, CTA, FAB, modal) + header/footer enhancements
│   │   └── responsive.css # Live min-width 320/576/768/1024/1200/1536 + drawer max-width 1023
│   ├── js/
│   │   ├── navigation.js  # Mobile toggle, dropdown, active link, scroll scrolled, keyboard Escape
│   │   ├── main.js        # Smooth scroll, year, lazy load, form validation, back-to-top, Swiper init spaceBetween 30 delay 5000, FAQ single-open
│   │   ├── booking.js     # Modal logic
│   │   └── supabase-config.js
│   └── images/
│       ├── logo.png (3.4KB original small logo)
│       ├── favicon.ico
│       ├── hero-bg.png (placeholder, original unrecoverable due to TLS)
│       ├── therapist-portrait-1/3.jpg, therapist-seated.jpg
│       ├── office-1/2.jpg, office-space-1/2.jpg
│       ├── service-individual/couples/family/assessments.jpg (placeholders)
│       └── patterns/watercolor-bg.png
├── includes/
│   ├── header.html        # Sticky header, absolute paths /assets/... /pages/...
│   ├── footer.html        # 4-column footer + FAB
│   └── services-preview.html # 4 service cards (images only, matches live)
├── pages/
│   ├── about.html + about/index.html (extensionless support)
│   ├── contact.html + contact/index.html
│   ├── resources.html + resources/index.html
│   ├── services/index.html + individual/couples/family/assessments.html
│   ├── services.html (redirect), privacy.html, terms.html, disclaimer.html
├── ajax/libs/font-awesome/6.4.0/css/
├── npm/swiper@11/
├── css2 (Google Fonts Open Sans + Playfair Display, locally cached)
├── robots.txt, sitemap.xml, site.webmanifest
└── sync-ai.bat (utility, not part of site)
```

---

## Installation
No build step required – pure static HTML/CSS/JS.

```bash
git clone https://github.com/Zw3liy/hopeful-seasons-wellness.netlify.app.git
cd hopeful-seasons-wellness.netlify.app
```

---

## Running Locally
Serve from repository root (required for absolute paths `/assets/... /includes/...` to resolve):

```bash
# Python
python -m http.server 8000
# or
python3 -m http.server 8000

# Then open
http://localhost:8000/
http://localhost:8000/pages/services/index.html
```

**Important**: Start server from root, not from `pages/`, otherwise `/includes/header.html` fetch will 404. Python http.server serves `index.html` automatically for directories (`/pages/services/` → `/pages/services/index.html`).

VS Code Live Server also works if workspace root is repository root.

---

## Deployment
- **Netlify**: Connect GitHub repo, publish directory `/`, no build command. Netlify handles extensionless URLs (`/pages/contact` → `/pages/contact/index.html`) and root-relative `/assets/`.
- **GitHub Pages**: Not tested with absolute `/` paths – would need base path adjustment or use relative paths.
- **HTTP Server Compatibility**: Verified via `http.server` – 31 URLs all 200 OK, zero 404.

---

## Browser Support
- Chrome ≥90, Edge ≥90, Firefox ≥88, Safari ≥14
- Features: flex, grid auto-fit, CSS variables, backdrop-filter blur (with -webkit prefix), IntersectionObserver, scroll-behavior smooth
- Fallbacks: rgba backgrounds if backdrop-filter unsupported, standard fonts if Google Fonts blocked
- Tested via responsive.css breakpoints: 320, 576, 768, 1024, 1200, 1536 + max-width 479, 1023, print, reduced-motion, max-height 700px

---

## Technologies Used
- HTML5 semantic (header, main, section[aria-label], nav, footer, blockquote, button)
- CSS3 custom properties (dirty-pastels #8C927D sage, #B98D8D rose, #D7ACAA blush, #EFE4E2 cream, #C9D3D7 slate, #3D4236 footer)
- Vanilla JS (no framework): navigation drawer, dropdown, FAQ accordion single-open, Swiper init, lazy-load, form validation, back-to-top throttle
- Swiper 11 (testimonials slider)
- Font Awesome 6.4.0
- Google Fonts Open Sans + Playfair Display (locally cached as `css2`)

---

## Repository Structure & Maintenance Notes
- **Header/Footer/Services** are modular via `fetch()` from `includes/*.html`. Uses absolute paths `/includes/...` with relative fallback `includes/...` for file:// and extensionless support.
- **Variables**: `variables.css` contains live exact palette + compatibility mappings `--primary-cyan=accent-teal`, `--primary-navy=primary-footer`, plus font families/sizes missing in live but required for rendering.
- **Style**: `style.css` is live base (hero 50vh 800px rgba 0.6 blur 5px portrait 180px, services auto-fit 280px image 220px scale 1.1, affiliations light-gray, testimonials bg-cream, CTA sage gradient + cyan button, radius-md) + production enhancements (sticky header, footer-grid 1.6fr/0.9fr/1fr/1.3fr, FAB, back-to-top, focus-visible, will-change).
- **Responsive**: Merged live min-width + drawer max-width 1023, print, reduced-motion.
- **SEO**: `robots.txt`, `sitemap.xml` (13 URLs), `site.webmanifest`, canonical, OG (title, description, url, site_name, locale, image 1200x630), Twitter Card summary_large_image, JSON-LD MedicalBusiness structured data in index.html.
- **Performance**: Logo optimized 192KB → 3.4KB png, preload hints for hero image + CSS + JS, lazy loading `loading="lazy"`, explicit width/height on logo, throttled scroll, no duplicate CSS after badge removal.
- **Accessibility**: 15 aria- attributes, focus-visible outlines 2px primary-color, keyboard Enter/Space on FAQ, Escape closes drawer, alt attributes 33, semantic landmarks, contrast AA.
- **Placeholders**: `hero-bg.png`, `service-*.jpg`, `patterns/watercolor-bg.png`, `favicon.ico` are placeholders copied from office images due to TLS recovery failure (curl 35 SSL_ERROR_SYSCALL, wget GnuTLS non-properly terminated, Python EOF, fetch_page 500 for images). Documented in Phase 7 report.
- **Git**: Main branch is production. Checkpoint tags `phase6-pre-certification`, `phase7-before`, `phase8-pre-lockdown`, `phase9-pre-hardening`, `phase10-pre-release` exist for rollback.

---

## Maintenance
- Update therapist details in `index.html`, `pages/about.html`, `includes/footer.html`
- Add new services in `includes/services-preview.html` and `pages/services/`
- Update `sitemap.xml` lastmod when adding pages
- Keep `robots.txt` and `site.webmanifest` in sync with new routes
- Test locally with `python -m http.server 8000` and verify no console errors, no 404s

---

## License
MIT – See LICENSE file (if missing, treat as proprietary for Hopeful Seasons Wellness practice)

© 2026 Hopeful Seasons Wellness – Thembelihle Hope Magubane – HPCSA PS 014 5734 – BHF 0977969 – POPIA Compliant
