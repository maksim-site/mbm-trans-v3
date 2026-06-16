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

  /* ---- lead forms ---- */
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var phoneDigits = function (value) {
    var digits = String(value || '').replace(/\D/g, '');
    if (digits.charAt(0) === '8') digits = '7' + digits.slice(1);
    if (digits && digits.charAt(0) !== '7') digits = '7' + digits;
    return digits.slice(0, 11);
  };
  var formatPhone = function (value) {
    var digits = phoneDigits(value);
    if (!digits) return '';
    var local = digits.charAt(0) === '7' ? digits.slice(1) : digits;
    var formatted = '+7';
    if (local.length > 0) formatted += ' (' + local.slice(0, 3);
    if (local.length >= 3) formatted += ')';
    if (local.length > 3) formatted += ' ' + local.slice(3, 6);
    if (local.length > 6) formatted += '-' + local.slice(6, 8);
    if (local.length > 8) formatted += '-' + local.slice(8, 10);
    return formatted;
  };
  var resetFieldError = function (field) {
    if (!field) return;
    field.classList.remove('is-invalid');
    field.setCustomValidity('');
  };
  var setFieldError = function (field, message) {
    if (!field) return;
    field.classList.add('is-invalid');
    field.setCustomValidity(message);
  };

  [].forEach.call(document.querySelectorAll('[data-lead-form]'), function (form) {
    var status = form.querySelector('.form-status');
    var phoneField = form.querySelector('[name="phone"]');
    var emailField = form.querySelector('[name="email"]');
    var startedAtField = form.querySelector('[name="lead_started_at"]');

    if (startedAtField) startedAtField.value = String(Date.now());

    if (phoneField) {
      phoneField.addEventListener('input', function (e) {
        var deleting = e && e.inputType && e.inputType.indexOf('delete') === 0;
        var digits = phoneDigits(phoneField.value);
        // при удалении: если после форматирования строка кончается на разделитель
        // (скобка/пробел/дефис) — убираем ещё и цифру перед ним, чтобы они стирались вместе
        if (deleting && /\D$/.test(formatPhone(digits))) {
          digits = digits.slice(0, -1);
        }
        var phone = formatPhone(digits);
        if (phoneField.value !== phone) phoneField.value = phone;
        resetFieldError(phoneField);
      });
      phoneField.addEventListener('focus', function () {
        if (!phoneField.value) phoneField.value = '+7 ';
      });
      phoneField.addEventListener('blur', function () {
        if (phoneDigits(phoneField.value).length <= 1) phoneField.value = '';
      });
    }

    if (emailField) {
      emailField.addEventListener('input', function () {
        resetFieldError(emailField);
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('[type="submit"]');

      if (phoneField) {
        phoneField.value = formatPhone(phoneField.value);
        resetFieldError(phoneField);
        if (phoneDigits(phoneField.value).length !== 11) {
          setFieldError(phoneField, 'Введите телефон в формате +7 (999) 123-45-67.');
        }
      }

      if (emailField) {
        emailField.value = emailField.value.trim();
        resetFieldError(emailField);
        if (emailField.value && !emailPattern.test(emailField.value)) {
          setFieldError(emailField, 'Введите корректный e-mail.');
        }
      }

      if (!form.checkValidity()) {
        if (status) {
          status.className = 'form-status error';
          status.textContent = 'Проверьте выделенные поля.';
        }
        form.reportValidity();
        return;
      }

      if (status) status.className = 'form-status';
      if (status) status.textContent = 'Отправляем...';
      if (btn) btn.disabled = true;
      fetch(form.getAttribute('action'), {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (!res.ok) throw new Error('send failed');
        return res.json();
      }).then(function (data) {
        if (!data.ok) throw new Error(data.error || 'send failed');
        form.reset();
        if (startedAtField) startedAtField.value = String(Date.now());
        if (status) {
          status.className = 'form-status success';
          status.textContent = 'Заявка отправлена. Мы свяжемся с вами.';
        }
      }).catch(function () {
        if (status) {
          status.className = 'form-status error';
          status.textContent = 'Не удалось отправить форму. Позвоните нам: +7 (812) 401-65-64.';
        }
      }).finally(function () {
        if (btn) btn.disabled = false;
      });
    });
  });

  /* ---- trailer picker (oversized cargo page) ---- */
  var picker = document.getElementById('trailerPicker');
  var trailerCatalog = document.getElementById('trailerCatalog');
  var trailerResult = document.getElementById('trailerResult');
  if (picker && trailerCatalog) {
    var trailerCards = [].slice.call(trailerCatalog.querySelectorAll('.trailer-card'));
    var toNumber = function (value) {
      value = String(value || '').replace(',', '.').trim();
      return value ? parseFloat(value) : 0;
    };
    var setAll = function () {
      trailerCards.forEach(function (card) {
        card.classList.remove('is-hidden', 'is-match');
      });
      if (trailerResult) trailerResult.textContent = 'Показаны все варианты из каталога. Укажите параметры, чтобы сузить список.';
    };
    picker.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(picker);
      var weight = toNumber(data.get('weight'));
      var length = toNumber(data.get('length'));
      var width = toNumber(data.get('width'));
      var height = toNumber(data.get('height'));
      var active = weight || length || width || height;
      var shown = 0;
      if (!active) {
        setAll();
        return;
      }
      trailerCards.forEach(function (card) {
        var cap = parseFloat(card.dataset.cap || '0');
        var maxLength = parseFloat(card.dataset.length || '0');
        var maxWidth = parseFloat(card.dataset.width || '0');
        var match = (!weight || cap >= weight) && (!length || maxLength >= length) && (!width || maxWidth >= width);
        card.classList.toggle('is-hidden', !match);
        card.classList.toggle('is-match', match);
        if (match) shown += 1;
      });
      if (trailerResult) {
        trailerResult.textContent = shown
          ? 'Найдено вариантов: ' + shown + '. Высота груза учитывается при проверке маршрута и разрешений.'
          : 'По введённым параметрам нет точного совпадения в каталоге. Оставьте заявку — проверим модульную схему и маршрут вручную.';
      }
    });
    var reset = picker.querySelector('[data-reset-picker]');
    if (reset) reset.addEventListener('click', function () {
      picker.reset();
      setAll();
    });
  }
})();
