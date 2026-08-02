/**
 * Hopeful Seasons Wellness – Navigation
 * Mobile drawer toggle, dropdown behavior, scroll effects
 */

function initializeNavigation() {
  console.log('Initializing navigation – Hopeful Seasons Wellness');

  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const dropdownParent = document.getElementById('services-dropdown');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  // Mobile drawer toggle
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = mainNav.classList.contains('active');
      mainNav.classList.toggle('active');
      this.classList.toggle('active');
      this.setAttribute('aria-expanded', String(!isOpen));
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    // Click outside to close
    document.addEventListener('click', function(ev) {
      const insideNav = ev.target.closest('#main-nav');
      const onToggle = ev.target.closest('#mobile-menu-toggle');
      if (!insideNav && !onToggle && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
        dropdowns.forEach(d=>d.classList.remove('open'));
      }
    });

    // Nav link clicks – handle dropdown on mobile
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const parentDropdown = this.closest('.nav-dropdown');
        // On mobile, first click on Services opens submenu
        if (parentDropdown && window.innerWidth <= 1024) {
          const isParentLink = this === parentDropdown.querySelector(':scope > .nav-link');
          if (isParentLink && !parentDropdown.classList.contains('open')) {
            e.preventDefault();
            parentDropdown.classList.add('open');
            return;
          }
        }
        // Close drawer on any navigation
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded','false');
          document.body.style.overflow = '';
          dropdowns.forEach(d=>d.classList.remove('open'));
        }
      });
    });

    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024) {
        mainNav.classList.remove('active');
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded','false');
        }
        document.body.style.overflow = '';
        dropdowns.forEach(d=>d.classList.remove('open'));
      }
    });
  }

  // Active link highlighting
  const currentPath = window.location.pathname.toLowerCase();
  navLinks.forEach(link => {
    const href = (link.getAttribute('href')||'').toLowerCase();
    link.classList.remove('active');
    if ((currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '') && (href === 'index.html' || href === './' || href === '/' || (href.endsWith('index.html') && !href.includes('pages/')))) {
      if (!link.closest('.dropdown-menu')) link.classList.add('active');
    } else if (href && href !== 'index.html' && currentPath.includes(href.replace('../','').replace('./',''))) {
      if (href !== 'index.html' && href !== './') link.classList.add('active');
    }
  });
  if (currentPath.includes('/services')) {
    const svc = document.querySelector('.nav-dropdown > .nav-link');
    if (svc) svc.classList.add('active');
  }

  // Scroll effect – add shadow
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  // Keyboard accessibility for dropdowns
  dropdowns.forEach(dd => {
    const trigger = dd.querySelector('.nav-link');
    if (!trigger) return;
    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      }
      if (e.key === 'Escape') {
        dd.classList.remove('open');
        trigger.focus();
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded','false');
      }
      document.body.style.overflow = '';
      dropdowns.forEach(d=>d.classList.remove('open'));
    }
  });

  console.log('Navigation ready – practitioner: Thembelihle Hope Magubane | 067 389 0946 | 60 6th Street Parkhurst');
}

// Auto-init if header statically present
document.addEventListener('DOMContentLoaded', function(){
  if (document.getElementById('main-nav') && document.getElementById('mobile-menu-toggle')) {
    const placeholder = document.getElementById('header-placeholder');
    if (!placeholder || placeholder.innerHTML.trim() === '') {
      try { initializeNavigation(); } catch(e){ console.warn('Nav deferred – waiting for fetch'); }
    }
  }
});
