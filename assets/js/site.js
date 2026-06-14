/* МБМ-Транс — общий скрипт сайта (главная + внутренние страницы) */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isMobile = function () { return matchMedia('(max-width:920px)').matches; };

  /* ---- header shadow on scroll ---- */
  var header = document.getElementById('header');
  if (header) addEventListener('scroll', function () {
    header.classList.toggle('scrolled', scrollY > 20);
  }, { passive: true });

  /* ---- hero slider (homepage only) ---- */
  var slides = [].slice.call(document.querySelectorAll('.hero .slide'));
  var dotsBox = document.getElementById('dots');
  if (slides.length && dotsBox) {
    var cur = 0, timer;
    slides.forEach(function (_, i) {
      var b = document.createElement('button');
      b.setAttribute('aria-label', 'Слайд ' + (i + 1));
      if (i === 0) b.classList.add('active');
      b.onclick = function () { go(i); restart(); };
      dotsBox.appendChild(b);
    });
    var dots = [].slice.call(dotsBox.children);
    var go = function (i) {
      slides[cur].classList.remove('active'); dots[cur].classList.remove('active');
      cur = i;
      slides[cur].classList.add('active'); dots[cur].classList.add('active');
    };
    var restart = function () { clearInterval(timer); timer = setInterval(function () { go((cur + 1) % slides.length); }, 6000); };
    restart();
  }

  /* ---- mobile menu (accordion + X + scroll lock) ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var ov = document.getElementById('overlay');
  var ICON_MENU = '<svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  var ICON_CLOSE = '<svg class="icon" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>';

  function setMenu(open) {
    if (!nav) return;
    nav.classList.toggle('open', open);
    if (ov) ov.classList.toggle('show', open);
    if (burger) {
      burger.innerHTML = open ? ICON_CLOSE : ICON_MENU;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }
    document.body.classList.toggle('no-scroll', open);
    if (!open) {
      [].forEach.call(nav.querySelectorAll('.has-sub.sub-open'), function (e) { e.classList.remove('sub-open'); });
    }
  }

  if (burger && nav) {
    burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    if (ov) ov.addEventListener('click', function () { setMenu(false); });
    [].forEach.call(nav.querySelectorAll('a'), function (a) {
      a.addEventListener('click', function (e) {
        // parent "Услуги" → toggle submenu on mobile instead of navigating
        if (a.parentElement.classList.contains('has-sub') && isMobile()) {
          e.preventDefault();
          a.parentElement.classList.toggle('sub-open');
          return;
        }
        if (nav.classList.contains('open')) setMenu(false);
      });
    });
    addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false); });
    addEventListener('resize', function () { if (!isMobile() && nav.classList.contains('open')) setMenu(false); });
  }

  /* ---- reveal on scroll + count-up ---- */
  function countUp(el) {
    var target = +el.dataset.count, dur = 1400, t0 = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * e);
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          [].forEach.call(e.target.querySelectorAll('[data-count]'), function (c) {
            if (!c.dataset.done) { c.dataset.done = 1; reduce ? (c.textContent = c.dataset.count) : countUp(c); }
          });
          io.unobserve(e.target);
        }
      });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- client logo marquee ---- */
  var track = document.getElementById('track');
  if (track && !track.querySelector('.logo-set')) {
    var logos = track.innerHTML;
    track.innerHTML = '<div class="logo-set">' + logos + '</div><div class="logo-set" aria-hidden="true">' + logos + '</div>';
    if (reduce) track.style.animation = 'none';
  }

  /* ---- certificate lightbox ---- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = document.getElementById('lbImg'), lbClose = document.getElementById('lbClose');
    var openLb = function (src) { lbImg.src = src; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); document.body.classList.add('no-scroll'); };
    var closeLb = function () { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lbImg.src = ''; document.body.classList.remove('no-scroll'); };
    [].forEach.call(document.querySelectorAll('.lb'), function (b) { b.addEventListener('click', function () { openLb(b.dataset.img); }); });
    if (lbClose) lbClose.addEventListener('click', closeLb);
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
  }
})();
