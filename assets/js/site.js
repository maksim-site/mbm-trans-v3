/* MBM Trans v3 — shared progressive enhancement */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 1020px)');
  var localPreview = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
  var focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  function toArray(items) {
    return Array.prototype.slice.call(items || []);
  }

  function injectSkipLink() {
    var target = document.querySelector('.hero, .page-hero, section.block');
    if (!target || document.querySelector('.skip-link')) return;
    if (!target.id) target.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + target.id;
    skip.textContent = 'К основному содержанию';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  function initHeaderState() {
    var header = document.getElementById('header');
    var firstView = document.querySelector('.hero, .page-hero');
    if (!header || !firstView || !('IntersectionObserver' in window)) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        header.classList.toggle('scrolled', !entry.isIntersecting);
      });
    }, { threshold: .08 });
    observer.observe(firstView);
  }

  function initMobileMenu() {
    var burger = document.getElementById('burger');
    var nav = document.getElementById('nav');
    var overlay = document.getElementById('overlay');
    if (!burger || !nav) return;

    var menuIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    var closeIcon = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
    var returnFocus = null;

    burger.type = 'button';
    burger.setAttribute('aria-controls', 'nav');
    burger.setAttribute('aria-expanded', 'false');

    function setMenu(open) {
      nav.classList.toggle('open', open);
      if (overlay) overlay.classList.toggle('show', open);
      burger.innerHTML = open ? closeIcon : menuIcon;
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
      document.body.classList.toggle('no-scroll', open);

      if (open) {
        returnFocus = document.activeElement;
        window.setTimeout(function () {
          var first = nav.querySelector(focusableSelector);
          if (first) first.focus();
        }, 30);
      } else {
        toArray(nav.querySelectorAll('.has-sub.sub-open')).forEach(function (item) {
          setSubmenu(item, false);
        });
        if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
      }
    }

    burger.addEventListener('click', function () {
      setMenu(!nav.classList.contains('open'));
    });

    if (overlay) {
      overlay.addEventListener('click', function () { setMenu(false); });
    }

    function setSubmenu(item, open) {
      var trigger = item.querySelector(':scope > a');
      var submenu = item.querySelector(':scope > .sub');
      item.classList.toggle('sub-open', open);
      if (trigger) trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!submenu) return;
      if (mobileQuery.matches) {
        submenu.setAttribute('aria-hidden', open ? 'false' : 'true');
        toArray(submenu.querySelectorAll('a')).forEach(function (link) {
          link.tabIndex = open ? 0 : -1;
        });
      } else {
        submenu.removeAttribute('aria-hidden');
        toArray(submenu.querySelectorAll('a')).forEach(function (link) {
          link.removeAttribute('tabindex');
        });
      }
    }

    toArray(nav.querySelectorAll('.has-sub')).forEach(function (item) {
      var trigger = item.querySelector(':scope > a');
      if (!trigger) return;
      setSubmenu(item, false);
      trigger.addEventListener('click', function (event) {
        if (!mobileQuery.matches) return;
        event.preventDefault();
        var open = !item.classList.contains('sub-open');
        setSubmenu(item, open);
      });
    });

    toArray(nav.querySelectorAll('a')).forEach(function (link) {
      link.addEventListener('click', function () {
        if (mobileQuery.matches && nav.classList.contains('open') && !link.parentElement.classList.contains('has-sub')) {
          setMenu(false);
        }
      });
    });

    document.addEventListener('keydown', function (event) {
      if (!nav.classList.contains('open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        setMenu(false);
        return;
      }
      if (event.key !== 'Tab') return;
      var focusable = toArray(nav.querySelectorAll(focusableSelector)).concat([burger]);
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (!mobileQuery.matches && nav.classList.contains('open')) setMenu(false);
      toArray(nav.querySelectorAll('.has-sub')).forEach(function (item) {
        setSubmenu(item, mobileQuery.matches && item.classList.contains('sub-open'));
      });
    });
  }

  function countUp(element) {
    var target = Number(element.dataset.count || 0);
    if (reduceMotion) {
      element.textContent = String(target);
      return;
    }
    var duration = 1250;
    var started = performance.now();
    function frame(now) {
      var progress = Math.min((now - started) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }

  function initReveals() {
    var items = toArray(document.querySelectorAll('.reveal'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('in'); });
      toArray(document.querySelectorAll('[data-count]')).forEach(function (counter) {
        counter.textContent = counter.dataset.count;
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        toArray(entry.target.querySelectorAll('[data-count]')).forEach(function (counter) {
          if (counter.dataset.done) return;
          counter.dataset.done = 'true';
          countUp(counter);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: .12, rootMargin: '0px 0px -4% 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }

  function initRoute() {
    var process = document.querySelector('.process');
    if (!process) return;
    var steps = toArray(process.querySelectorAll('.step'));

    function activate() {
      process.classList.add('route-live');
      if (reduceMotion) {
        steps.forEach(function (step) { step.classList.add('is-route-active'); });
        return;
      }
      [180, 680, 1240, 1840].forEach(function (delay, index) {
        window.setTimeout(function () {
          if (steps[index]) steps[index].classList.add('is-route-active');
        }, delay);
      });
    }

    if (!('IntersectionObserver' in window)) {
      activate();
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      activate();
      observer.disconnect();
    }, { threshold: .28 });
    observer.observe(process);
  }

  function initClientRail() {
    var track = document.getElementById('track');
    if (!track) return;
    var section = track.closest('#clients');
    var marquee = track.closest('.clients-marquee');
    if (!section || !marquee || section.querySelector('.client-rail-controls')) return;

    var controls = document.createElement('div');
    controls.className = 'client-rail-controls';
    controls.setAttribute('aria-label', 'Управление списком клиентов');
    controls.innerHTML =
      '<button class="rail-button" type="button" data-direction="-1" aria-label="Предыдущие клиенты"><svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><path d="M19 12H5m7-7-7 7 7 7"/></svg></button>' +
      '<button class="rail-button" type="button" data-direction="1" aria-label="Следующие клиенты"><svg viewBox="0 0 24 24" class="icon" aria-hidden="true"><path d="M5 12h14m-7-7 7 7-7 7"/></svg></button>';
    section.insertBefore(controls, marquee);

    toArray(controls.querySelectorAll('button')).forEach(function (button) {
      button.addEventListener('click', function () {
        var direction = Number(button.dataset.direction || 1);
        track.scrollBy({
          left: direction * Math.max(240, track.clientWidth * .72),
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  function initFaq() {
    var details = toArray(document.querySelectorAll('.faq'));
    details.forEach(function (item) {
      var summary = item.querySelector('summary');
      if (!summary) return;
      summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      item.addEventListener('toggle', function () {
        summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
        if (!item.open) return;
        details.forEach(function (other) {
          if (other !== item && other.open) other.open = false;
        });
      });
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    var image = document.getElementById('lbImg');
    var close = document.getElementById('lbClose');
    var returnFocus = null;

    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Просмотр документа');

    function openLightbox(source, trigger) {
      returnFocus = trigger;
      image.src = source;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      if (close) close.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      image.src = '';
      document.body.classList.remove('no-scroll');
      if (returnFocus && typeof returnFocus.focus === 'function') returnFocus.focus();
    }

    toArray(document.querySelectorAll('.lb')).forEach(function (button) {
      button.addEventListener('click', function () { openLightbox(button.dataset.img, button); });
    });
    if (close) close.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
    });
  }

  function initGlassPointer() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    toArray(document.querySelectorAll('.btn, .burger, .rail-button, .lightbox .close')).forEach(function (control) {
      control.addEventListener('pointermove', function (event) {
        var rect = control.getBoundingClientRect();
        control.style.setProperty('--mx', (((event.clientX - rect.left) / rect.width) * 100).toFixed(1) + '%');
        control.style.setProperty('--my', (((event.clientY - rect.top) / rect.height) * 100).toFixed(1) + '%');
      });
      control.addEventListener('pointerleave', function () {
        control.style.setProperty('--mx', '50%');
        control.style.setProperty('--my', '20%');
      });
    });
  }

  function initForms() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function localPhoneDigits(value) {
      var raw = String(value || '');
      var compact = raw.replace(/\s/g, '');
      var digits = raw.replace(/\D/g, '');
      if (compact.indexOf('+7') === 0) {
        if (digits.length <= 1) return '';
        digits = digits.slice(1);
        while (digits.length > 10 && digits.charAt(0) === '7') digits = digits.slice(1);
        return digits.slice(0, 10);
      }
      if (digits.length > 10 && digits.charAt(0) === '8') digits = digits.slice(1);
      while (digits.length > 10 && (digits.charAt(0) === '7' || digits.charAt(0) === '8')) digits = digits.slice(1);
      return digits.slice(0, 10);
    }

    function formatPhone(value) {
      var local = localPhoneDigits(value);
      if (!local) return '';
      var formatted = '+7';
      if (local.length > 0) formatted += ' (' + local.slice(0, 3);
      if (local.length >= 3) formatted += ')';
      if (local.length > 3) formatted += ' ' + local.slice(3, 6);
      if (local.length > 6) formatted += '-' + local.slice(6, 8);
      if (local.length > 8) formatted += '-' + local.slice(8, 10);
      return formatted;
    }

    function resetField(field) {
      if (!field) return;
      field.classList.remove('is-invalid');
      field.setCustomValidity('');
    }

    function invalidateField(field, message) {
      if (!field) return;
      field.classList.add('is-invalid');
      field.setCustomValidity(message);
    }

    toArray(document.querySelectorAll('[data-lead-form]')).forEach(function (form) {
      var status = form.querySelector('.form-status');
      var phone = form.querySelector('[name="phone"]');
      var email = form.querySelector('[name="email"]');
      var started = form.querySelector('[name="lead_started_at"]');
      if (started) started.value = String(Date.now());

      if (phone) {
        var previousDigits = localPhoneDigits(phone.value);
        phone.addEventListener('input', function (event) {
          var deleting = event.inputType && event.inputType.indexOf('delete') === 0;
          var digits = localPhoneDigits(phone.value);
          if (deleting && digits.length === previousDigits.length && digits.length > 1) digits = digits.slice(0, -1);
          phone.value = formatPhone(digits);
          previousDigits = digits;
          resetField(phone);
        });
        phone.addEventListener('focus', function () {
          if (!phone.value) phone.value = '+7 ';
        });
        phone.addEventListener('blur', function () {
          if (localPhoneDigits(phone.value).length < 1) phone.value = '';
        });
      }

      if (email) email.addEventListener('input', function () { resetField(email); });

      function showSuccess(message) {
        form.reset();
        if (started) started.value = String(Date.now());
        if (status) {
          status.className = 'form-status success';
          status.textContent = message;
        }
      }

      form.addEventListener('submit', function (event) {
        event.preventDefault();
        var button = form.querySelector('[type="submit"]');

        if (phone) {
          phone.value = formatPhone(phone.value);
          resetField(phone);
          if (localPhoneDigits(phone.value).length !== 10) invalidateField(phone, 'Введите телефон в формате +7 (999) 123-45-67.');
        }

        if (email) {
          email.value = email.value.trim();
          resetField(email);
          if (email.value && !emailPattern.test(email.value)) invalidateField(email, 'Введите корректный e-mail.');
        }

        if (!form.checkValidity()) {
          if (status) {
            status.className = 'form-status error';
            status.textContent = 'Проверьте выделенные поля.';
          }
          form.reportValidity();
          return;
        }

        if (status) {
          status.className = 'form-status';
          status.textContent = localPreview ? 'Проверяем локальную форму…' : 'Отправляем…';
        }
        if (button) button.disabled = true;

        if (localPreview) {
          window.setTimeout(function () {
            showSuccess('Локальная проверка пройдена. Данные никуда не отправлялись.');
            if (button) button.disabled = false;
          }, reduceMotion ? 0 : 450);
          return;
        }

        window.fetch(form.getAttribute('action'), {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        }).then(function (response) {
          if (!response.ok) throw new Error('send failed');
          return response.json();
        }).then(function (data) {
          if (!data.ok) throw new Error(data.error || 'send failed');
          showSuccess('Заявка отправлена. Мы свяжемся с вами.');
        }).catch(function () {
          if (status) {
            status.className = 'form-status error';
            status.textContent = 'Не удалось отправить форму. Позвоните нам: +7 (812) 401-65-64.';
          }
        }).finally(function () {
          if (button) button.disabled = false;
        });
      });
    });
  }

  function initTrailerPicker() {
    var picker = document.getElementById('trailerPicker');
    var catalog = document.getElementById('trailerCatalog');
    var result = document.getElementById('trailerResult');
    if (!picker || !catalog) return;
    var cards = toArray(catalog.querySelectorAll('.trailer-card'));

    function toNumber(value) {
      var normalized = String(value || '').replace(',', '.').trim();
      return normalized ? parseFloat(normalized) : 0;
    }

    function showAll() {
      cards.forEach(function (card) { card.classList.remove('is-hidden', 'is-match'); });
      if (result) result.textContent = 'Показаны все варианты из каталога. Укажите параметры, чтобы сузить список.';
    }

    picker.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(picker);
      var weight = toNumber(data.get('weight'));
      var length = toNumber(data.get('length'));
      var width = toNumber(data.get('width'));
      var height = toNumber(data.get('height'));
      if (!weight && !length && !width && !height) {
        showAll();
        return;
      }
      var shown = 0;
      cards.forEach(function (card) {
        var capacity = parseFloat(card.dataset.cap || '0');
        var maxLength = parseFloat(card.dataset.length || '0');
        var maxWidth = parseFloat(card.dataset.width || '0');
        var match = (!weight || capacity >= weight) && (!length || maxLength >= length) && (!width || maxWidth >= width);
        card.classList.toggle('is-hidden', !match);
        card.classList.toggle('is-match', match);
        if (match) shown += 1;
      });
      if (result) {
        result.textContent = shown
          ? 'Найдено вариантов: ' + shown + '. Высота груза учитывается при проверке маршрута и разрешений.'
          : 'Точного совпадения нет. Оставьте заявку — проверим модульную схему и маршрут вручную.';
      }
    });

    var reset = picker.querySelector('[data-reset-picker]');
    if (reset) reset.addEventListener('click', function () { picker.reset(); showAll(); });
  }

  injectSkipLink();
  initHeaderState();
  initMobileMenu();
  initReveals();
  initRoute();
  initClientRail();
  initFaq();
  initLightbox();
  initGlassPointer();
  initForms();
  initTrailerPicker();
})();
