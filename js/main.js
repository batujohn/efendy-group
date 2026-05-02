/* ============================================================
   Efendy Group — Main JavaScript
   Handles: fade-in, nav scroll, gallery, filters, accordion, forms
   ============================================================ */

(function () {
  'use strict';

  /* ---------- FadeIn via IntersectionObserver ---------- */
  function initFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Nav Scroll Behavior + Hamburger ---------- */
  function initNav() {
    var nav = document.getElementById('site-nav') || document.getElementById('sub-nav');
    if (!nav) return;
    function onScroll() {
      nav.classList.toggle('scrolled', window.scrollY > 80);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var hamburger = document.getElementById('nav-hamburger');
    if (hamburger) {
      hamburger.addEventListener('click', function () {
        var isOpen = nav.classList.toggle('menu-open');
        hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      });
      // Close menu when a nav link is clicked
      nav.querySelectorAll('.nav-link').forEach(function (link) {
        link.addEventListener('click', function () {
          nav.classList.remove('menu-open');
          hamburger.setAttribute('aria-label', 'Open menu');
        });
      });
      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!nav.contains(e.target)) {
          nav.classList.remove('menu-open');
          hamburger.setAttribute('aria-label', 'Open menu');
        }
      });
    }
  }

  /* ---------- Gallery Slider ---------- */
  function initGalleries() {
    document.querySelectorAll('.gallery-slider').forEach(function (slider) {
      var slides = slider.querySelectorAll('.gallery-slide');
      var dots   = slider.querySelectorAll('.gallery-dot');
      var caption = slider.querySelector('.gallery-caption');
      var counter = slider.querySelector('.gallery-counter');
      var captions = Array.from(slides).map(function (s) { return s.dataset.caption || ''; });
      var total = slides.length;
      var idx = 0;
      var paused = false;
      var timer;

      function go(n) {
        slides[idx].classList.remove('is-active');
        if (dots[idx]) dots[idx].classList.remove('is-active');
        idx = ((n % total) + total) % total;
        slides[idx].classList.add('is-active');
        if (dots[idx]) dots[idx].classList.add('is-active');
        if (caption) caption.textContent = captions[idx];
        if (counter) counter.textContent = String(idx + 1).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
      }

      function startAuto() {
        clearInterval(timer);
        timer = setInterval(function () {
          if (!paused) go(idx + 1);
        }, 6000);
      }

      // Init
      if (slides[0]) slides[0].classList.add('is-active');
      if (dots[0])   dots[0].classList.add('is-active');
      if (caption)   caption.textContent = captions[0];
      if (counter)   counter.textContent = '01 / ' + String(total).padStart(2, '0');
      startAuto();

      // Click to advance
      slider.addEventListener('click', function (e) {
        if (e.target.closest('.gallery-prev') || e.target.closest('.gallery-next')) return;
        go(idx + 1);
      });

      // Prev / Next buttons
      var prevBtn = slider.querySelector('.gallery-prev');
      var nextBtn = slider.querySelector('.gallery-next');
      if (prevBtn) prevBtn.addEventListener('click', function (e) { e.stopPropagation(); go(idx - 1); });
      if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); go(idx + 1); });

      // Pause on hover
      slider.addEventListener('mouseenter', function () { paused = true; });
      slider.addEventListener('mouseleave', function () { paused = false; });

      // Touch swipe
      var touchStartX = 0;
      slider.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        paused = true;
      }, { passive: true });
      slider.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 40) go(diff > 0 ? idx + 1 : idx - 1);
        paused = false;
      }, { passive: true });
    });
  }

  /* ---------- Filter System ---------- */
  function initFilters() {
    document.querySelectorAll('[data-filter-group]').forEach(function (group) {
      var groupId = group.dataset.filterGroup;
      var buttons = group.querySelectorAll('.filter-btn');
      var grid    = document.querySelector('[data-filter-target="' + groupId + '"]');
      if (!grid) return;

      buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
          buttons.forEach(function (b) { b.classList.remove('is-active'); });
          btn.classList.add('is-active');
          var filter = btn.dataset.filter;
          var cards  = grid.querySelectorAll('[data-filter-tag]');
          cards.forEach(function (card) {
            var match = filter === 'All' || card.dataset.filterTag === filter;
            card.style.display = match ? '' : 'none';
          });
        });
      });
    });
  }

  /* ---------- Careers Accordion ---------- */
  function initAccordion() {
    document.querySelectorAll('.role-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.closest('.role-item');
        var isOpen = item.classList.contains('is-open');
        // Close all
        document.querySelectorAll('.role-item').forEach(function (i) {
          i.classList.remove('is-open');
        });
        // Toggle this one
        if (!isOpen) item.classList.add('is-open');
      });
    });
  }

  /* ---------- Newsletter Form ---------- */
  function initNewsletterForms() {
    document.querySelectorAll('.newsletter-form').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[type="email"]');
        if (input && input.value.trim()) {
          var wrap = form.closest('.newsletter-inner') || form.parentNode;
          var success = document.createElement('div');
          success.className = 'newsletter-success';
          success.textContent = 'Thank you. Welcome to the table.';
          form.replaceWith(success);
        }
      });
    });
  }

  /* ---------- Contact Form ---------- */
  function initContactForm() {
    var form = document.querySelector('.contact-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = form.querySelector('[name="name"]');
      var email = form.querySelector('[name="email"]');
      if (name && email && name.value.trim() && email.value.trim()) {
        var success = document.createElement('div');
        success.className = 'contact-success';
        success.textContent = 'Thank you. We’ll be in touch shortly.';
        form.replaceWith(success);
      }
    });
  }

  /* ---------- Image Hover Scale ---------- */
  function initImageHovers() {
    document.querySelectorAll('.hover-scale').forEach(function (el) {
      var img = el.querySelector('img');
      if (!img) return;
      el.addEventListener('mouseenter', function () { img.style.transform = 'scale(1.03)'; });
      el.addEventListener('mouseleave', function () { img.style.transform = 'scale(1)'; });
    });
  }

  /* ---------- Init All ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initFadeIn();
    initNav();
    initGalleries();
    initFilters();
    initAccordion();
    initNewsletterForms();
    initContactForm();
    initImageHovers();
  });
})();
