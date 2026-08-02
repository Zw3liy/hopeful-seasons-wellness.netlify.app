/**
 * Hopeful Seasons Wellness – Main.js
 * Component fetch logic, FAQ toggle, back-to-top, animations, Swiper init
 * Practitioner: Thembelihle Hope Magubane (Clinical Psychologist @ Hopeful Seasons Wellness)
 * Quotes:
 *  – "Without rain, nothing grows. Learn to embrace the storms of your life."
 *  – "Healing unfolds in the presence of another who can gently reflect what was once unseen."
 * Contact: Phone/WhatsApp 067 389 0946 | 60 6th Street Parkhurst, Randburg Johannesburg | Hours: In-person Saturdays 9am-2pm, Online Weekdays 4pm-6pm
 * Memberships: HPCSA (Health Professions Council of SA) & BHF (Board of Healthcare Funders)
 */

document.addEventListener('DOMContentLoaded', function() {
  // Load dynamic components
  loadComponents();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = document.getElementById('site-header') ? document.getElementById('site-header').offsetHeight : 78;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerH - 20;
        window.scrollTo({top: top, behavior: 'smooth'});
        // Close mobile nav
        const mainNav = document.getElementById('main-nav');
        const toggle = document.getElementById('mobile-menu-toggle');
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          if (toggle) { toggle.classList.remove('active'); toggle.setAttribute('aria-expanded','false'); }
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Current year
  document.querySelectorAll('#current-year').forEach(el => el.textContent = new Date().getFullYear());

  // Lazy load images with data-src
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
          if (img.dataset.srcset) { img.srcset = img.dataset.srcset; img.removeAttribute('data-srcset'); }
          img.classList.add('loaded');
          obs.unobserve(img);
        }
      });
    }, {rootMargin: '80px 0px', threshold: 0.01});
    document.querySelectorAll('img[data-src]').forEach(i => imgObserver.observe(i));
  }

  // Form validation
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
      if (!this.checkValidity()) {
        e.preventDefault(); e.stopPropagation();
        this.querySelectorAll('input, textarea, select').forEach(inp => { if (!inp.checkValidity()) inp.classList.add('invalid'); });
        const firstInvalid = this.querySelector('.invalid');
        if (firstInvalid) { firstInvalid.scrollIntoView({behavior:'smooth', block:'center'}); firstInvalid.focus(); }
      }
      this.classList.add('was-validated');
    });
    form.querySelectorAll('input, textarea, select').forEach(inp => {
      inp.addEventListener('input', function(){ if (this.classList.contains('invalid')) this.classList.remove('invalid'); });
      inp.addEventListener('change', function(){ if (this.classList.contains('invalid') && this.checkValidity()) this.classList.remove('invalid'); });
    });
  });

  // Back-to-top button creation & behavior
  let backBtn = document.querySelector('.back-to-top');
  if (!backBtn) {
    backBtn = document.createElement('button');
    backBtn.className = 'back-to-top';
    backBtn.setAttribute('aria-label','Back to top');
    backBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backBtn);
  }
  const toggleBack = () => {
    if (window.pageYOffset > 400) backBtn.classList.add('visible');
    else backBtn.classList.remove('visible');
  };
  window.addEventListener('scroll', throttle(toggleBack, 100), {passive:true});
  toggleBack();
  backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  // Init animations, swiper, FAQ
  initAnimations();
  initTestimonialsSwiper();
  initFAQAccordion();
});

/* ================= COMPONENT FETCH LOGIC ================= */
function loadComponents() {
  const isSubPage = window.location.pathname.includes('/pages/');
  const basePrefix = isSubPage ? '../' : '';

  function fixPaths(html) {
    if (!isSubPage) {
      return html.replace(/\.\.\/assets/g, 'assets').replace(/href="\.\.\/index\.html"/g, 'href="index.html"');
    } else {
      return html
        .replace(/href="index\.html"/g, 'href="../index.html"')
        .replace(/href="assets\//g, 'href="../assets/')
        .replace(/src="assets\//g, 'src="../assets/')
        .replace(/href="pages\//g, 'href="')
        .replace(/src="pages\//g, 'src="');
    }
  }

  // Header
  const headerPh = document.getElementById('header-placeholder');
  if (headerPh) {
    fetch(basePrefix + 'includes/header.html')
      .then(r => { if (!r.ok) throw new Error('Header fetch failed'); return r.text(); })
      .then(html => {
        headerPh.innerHTML = fixPaths(html);
        if (typeof initializeNavigation === 'function') initializeNavigation();
      })
      .catch(err => {
        console.error('Header load error:', err);
        headerPh.innerHTML = '<header class="site-header"><div class="container navbar-container"><a href="'+basePrefix+'index.html" class="logo-link"><img src="'+basePrefix+'assets/images/logo.jpg" class="site-logo" alt="Logo"/><div class="brand-text"><span class="brand-title">Hopeful Seasons Wellness</span><span class="brand-subtitle">Clinical Psychology Practice</span></div></a><button class="mobile-menu-toggle" id="mobile-menu-toggle"><span></span><span></span><span></span></button><nav class="main-nav" id="main-nav"><ul class="nav-list"><li class="nav-item"><a href="'+basePrefix+'index.html" class="nav-link active">Home</a></li><li class="nav-item"><a href="'+basePrefix+'pages/about.html" class="nav-link">About</a></li><li class="nav-item"><a href="'+basePrefix+'pages/services/index.html" class="nav-link">Services</a></li><li class="nav-item"><a href="'+basePrefix+'pages/contact.html" class="nav-link">Contact</a></li></ul><div class="nav-cta"><a href="'+basePrefix+'pages/contact.html" class="btn btn-primary btn-book">Book Now</a></div></nav></div></header>';
        if (typeof initializeNavigation === 'function') initializeNavigation();
      });
  }

  // Footer
  const footerPh = document.getElementById('footer-placeholder');
  if (footerPh) {
    fetch(basePrefix + 'includes/footer.html')
      .then(r => { if (!r.ok) throw new Error('Footer fetch failed'); return r.text(); })
      .then(html => {
        footerPh.innerHTML = fixPaths(html);
        const y = document.getElementById('current-year');
        if (y) y.textContent = new Date().getFullYear();
      })
      .catch(err => {
        console.error('Footer load error:', err);
        footerPh.innerHTML = '<footer class="site-footer"><div class="container"><div class="footer-bottom"><div class="footer-copy">© '+new Date().getFullYear()+' Hopeful Seasons Wellness – Thembelihle Hope Magubane | HPCSA & BHF | 067 389 0946 | 60 6th Street Parkhurst, Randburg Johannesburg</div></div></div></footer>';
      });
  }

  // Services preview
  const servicesGrid = document.querySelector('.services-grid');
  if (servicesGrid) {
    fetch(basePrefix + 'includes/services-preview.html')
      .then(r => { if (!r.ok) throw new Error('Services fetch failed'); return r.text(); })
      .then(html => {
        servicesGrid.innerHTML = fixPaths(html);
        if (typeof initAnimations === 'function') initAnimations();
      })
      .catch(err => console.error('Services load error:', err));
  }
}

/* ================= TESTIMONIALS SWIPER ================= */
function initTestimonialsSwiper() {
  const attempt = () => {
    const el = document.querySelector('.testimonials-slider');
    if (!el) return false;
    if (typeof Swiper === 'undefined') return false;
    if (el.swiper) return true;
    new Swiper('.testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      grabCursor: true,
      autoplay: { delay: 5500, disableOnInteraction: false, pauseOnMouseEnter: true },
      pagination: { el: '.swiper-pagination', clickable: true },
      keyboard: { enabled: true },
      speed: 650
    });
    return true;
  };
  if (!attempt()) {
    let tries = 0;
    const iv = setInterval(() => { if (attempt() || tries++ > 12) clearInterval(iv); }, 400);
  }
  const obs = new MutationObserver(() => { attempt(); });
  obs.observe(document.body, {childList:true, subtree:true});
}

/* ================= FAQ TOGGLE HANDLERS ================= */
function initFAQAccordion() {
  const items = document.querySelectorAll('.faq-item');
  items.forEach(item => {
    const q = item.querySelector('.faq-question');
    const a = item.querySelector('.faq-answer');
    if (!q) return;
    if (a && !a.id) a.id = 'faq-answer-' + Math.random().toString(36).slice(2,9);
    q.setAttribute('role','button');
    q.setAttribute('tabindex','0');
    q.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');
    if (a) q.setAttribute('aria-controls', a.id);

    const toggle = () => {
      const wasActive = item.classList.contains('active');
      // Close others – single open FAQ as per live site behavior
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const oq = other.querySelector('.faq-question');
          if (oq) oq.setAttribute('aria-expanded','false');
        }
      });
      if (!wasActive) {
        item.classList.add('active');
        q.setAttribute('aria-expanded','true');
      } else {
        item.classList.remove('active');
        q.setAttribute('aria-expanded','false');
      }
    };

    q.addEventListener('click', toggle);
    q.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  });
}

/* ================= ANIMATION LISTENERS ================= */
function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -60px 0px'});

  document.querySelectorAll('.animate-on-scroll, .service-card, .about-teaser-image, .testimonial-card, .resource-card, .faq-item, .about-teaser-content').forEach(el => {
    observer.observe(el);
  });
}

/* Utils */
function debounce(fn, wait){ let t; return function(...args){ clearTimeout(t); t=setTimeout(()=>fn.apply(this,args),wait); }; }
function throttle(fn, limit){
  let inThrottle, lastArgs;
  return function(...args){
    if (!inThrottle){ fn.apply(this,args); inThrottle=true; setTimeout(()=>{ inThrottle=false; if (lastArgs){ fn.apply(this,lastArgs); lastArgs=null; } },limit); }
    else lastArgs=args;
  };
}
