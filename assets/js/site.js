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

  function initSmoothScroll() {
    if (reduceMotion || typeof window.Lenis !== 'function') return;

    var lenis = new window.Lenis({
      autoRaf: true,
      lerp: .085,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: .92,
      stopInertiaOnNavigate: true,
      prevent: function (node) {
        return Boolean(node && node.closest && node.closest('.main.open, .lightbox.open'));
      }
    });

    window.mbmLenis = lenis;

    function anchorOffset() {
      var header = document.getElementById('header');
      return -((header ? header.offsetHeight : 80) + 12);
    }

    function onAnchorClick(event) {
      var link = event.target.closest && event.target.closest('a[href^="#"]');
      if (!link) return;
      var hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      var target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      if (window.history && typeof window.history.pushState === 'function') {
        window.history.pushState(null, '', hash);
      }
      lenis.scrollTo(target, {
        offset: anchorOffset(),
        duration: .85,
        lock: false
      });
    }

    document.addEventListener('click', onAnchorClick);

    function alignInitialHash() {
      if (!window.location.hash) return;
      var targetId = decodeURIComponent(window.location.hash.slice(1));
      var target = document.getElementById(targetId);
      if (target) lenis.scrollTo(target, { offset: anchorOffset(), immediate: true });
    }

    if (document.readyState === 'complete') {
      window.requestAnimationFrame(alignInitialHash);
    } else {
      window.addEventListener('load', function () {
        window.requestAnimationFrame(alignInitialHash);
      }, { once: true });
    }

    window.addEventListener('pagehide', function () {
      document.removeEventListener('click', onAnchorClick);
      lenis.destroy();
    }, { once: true });
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

  function initHeroSlider() {
    var track = document.getElementById('slides');
    if (!track) return;

    var slides = toArray(track.querySelectorAll('.slide'));
    if (slides.length < 2) return;

    var hero = track.closest('.hero');
    var current = 0;
    var timer = null;

    function showSlide(index) {
      current = (index + slides.length) % slides.length;
      slides.forEach(function (slide, slideIndex) {
        var active = slideIndex === current;
        slide.classList.toggle('active', active);
        slide.setAttribute('aria-hidden', active ? 'false' : 'true');
      });
    }

    function stop() {
      window.clearTimeout(timer);
      timer = null;
    }

    function start(delay) {
      stop();
      if (reduceMotion || document.hidden) return;
      timer = window.setTimeout(function advance() {
        showSlide(current + 1);
        timer = window.setTimeout(advance, 6800);
      }, delay || 6800);
    }

    showSlide(0);
    start();

    if (hero) {
      hero.addEventListener('pointerenter', stop);
      hero.addEventListener('pointerleave', start);
      hero.addEventListener('focusin', stop);
      hero.addEventListener('focusout', function (event) {
        if (!hero.contains(event.relatedTarget)) start();
      });
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
      else start();
    });
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
      var progress = Math.max(0, Math.min((now - started) / duration, 1));
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

  function initClientMarquee() {
    var track = document.getElementById('track');
    if (!track) return;
    if (track.querySelector('.logo-set')) return;

    var clients = toArray(track.children).filter(function (item) {
      return item.classList && item.classList.contains('client');
    });
    if (!clients.length) return;

    var primary = document.createElement('div');
    primary.className = 'logo-set';
    clients.forEach(function (client) { primary.appendChild(client); });

    var duplicate = primary.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    toArray(duplicate.querySelectorAll('img')).forEach(function (image) {
      image.alt = '';
    });

    track.appendChild(primary);
    track.appendChild(duplicate);
    window.requestAnimationFrame(function () {
      track.classList.add('is-ready');
    });
  }

  function initFaq() {
    var details = toArray(document.querySelectorAll('.faq'));
    if (!details.length) return;
    var locked = false;

    function answerFor(item) {
      return item.querySelector('.ans');
    }

    function clearAnswerStyles(answer) {
      if (!answer) return;
      answer.style.height = '';
      answer.style.opacity = '';
      answer.style.paddingBottom = '';
      answer.style.transform = '';
    }

    function setExpanded(item, expanded) {
      var summary = item && item.querySelector('summary');
      if (summary) summary.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    }

    function settle(closing, opening) {
      if (closing) {
        closing.open = false;
        clearAnswerStyles(answerFor(closing));
      }
      if (opening) clearAnswerStyles(answerFor(opening));
      locked = false;
    }

    function switchItems(closing, opening) {
      var closingAnswer = closing ? answerFor(closing) : null;
      var openingAnswer = opening ? answerFor(opening) : null;
      var canAnimate = !reduceMotion && openingAnswer && typeof openingAnswer.animate === 'function';

      if (!canAnimate && closingAnswer && typeof closingAnswer.animate === 'function' && !reduceMotion) canAnimate = true;
      setExpanded(closing, false);
      setExpanded(opening, true);

      if (!canAnimate) {
        if (opening) opening.open = true;
        settle(closing, opening);
        return;
      }

      locked = true;
      var animations = [];

      if (closing && closingAnswer) {
        var closingHeight = closingAnswer.getBoundingClientRect().height || closingAnswer.scrollHeight;
        var closingPadding = window.getComputedStyle(closingAnswer).paddingBottom;
        animations.push(closingAnswer.animate([
          { height: closingHeight + 'px', paddingBottom: closingPadding, opacity: 1, transform: 'translateY(0)' },
          { height: '0px', paddingBottom: '0px', opacity: 0, transform: 'translateY(-4px)' }
        ], {
          duration: 280,
          easing: 'cubic-bezier(.23, 1, .32, 1)',
          fill: 'forwards'
        }));
      }

      if (opening && openingAnswer) {
        opening.open = true;
        var openingHeight = openingAnswer.getBoundingClientRect().height || openingAnswer.scrollHeight;
        var openingPadding = window.getComputedStyle(openingAnswer).paddingBottom;
        openingAnswer.style.height = '0px';
        openingAnswer.style.opacity = '0';
        openingAnswer.style.paddingBottom = '0px';
        openingAnswer.style.transform = 'translateY(-4px)';
        void openingAnswer.offsetHeight;
        animations.push(openingAnswer.animate([
          { height: '0px', paddingBottom: '0px', opacity: 0, transform: 'translateY(-4px)' },
          { height: openingHeight + 'px', paddingBottom: openingPadding, opacity: 1, transform: 'translateY(0)' }
        ], {
          duration: 280,
          easing: 'cubic-bezier(.23, 1, .32, 1)',
          fill: 'forwards'
        }));
      }

      var remaining = animations.length;
      if (!remaining) {
        settle(closing, opening);
        return;
      }

      function finishOne() {
        remaining -= 1;
        if (remaining === 0) settle(closing, opening);
      }

      animations.forEach(function (animation) {
        animation.onfinish = finishOne;
        animation.oncancel = finishOne;
      });
    }

    var initialOpen = null;
    details.forEach(function (item, index) {
      var summary = item.querySelector('summary');
      if (!summary) return;
      item.dataset.faqIndex = String(index + 1).padStart(2, '0');
      if (item.open && initialOpen) item.open = false;
      if (item.open) initialOpen = item;
      summary.setAttribute('aria-expanded', item.open ? 'true' : 'false');
      summary.addEventListener('click', function (event) {
        event.preventDefault();
        if (locked) return;
        if (item.open) {
          switchItems(item, null);
          return;
        }
        var current = details.find(function (other) { return other.open; }) || null;
        switchItems(current, item);
      });
    });
  }

  function initProjectArchive() {
    var gallery = document.getElementById('projectGallery');
    var more = document.getElementById('projectMore');
    if (!gallery || !more) return;

    var cards = toArray(gallery.querySelectorAll('.proj'));
    var filters = toArray(document.querySelectorAll('[data-project-filter]'));
    var result = document.getElementById('projectResult');
    var total = document.querySelector('[data-project-total]');
    var active = 'all';
    var limit = 12;

    function categoryFor(label) {
      var value = String(label || '').toLowerCase();
      if (value.indexOf('энерг') !== -1) return 'energy';
      if (value.indexOf('оборуд') !== -1) return 'equipment';
      if (value.indexOf('спецтех') !== -1 || value.indexOf('спецтран') !== -1) return 'special';
      if (value.indexOf('металлоконструк') !== -1) return 'metal';
      if (value.indexOf('авиа') !== -1) return 'aviation';
      return 'oversize';
    }

    cards.forEach(function (card) {
      var tag = card.querySelector('.tag');
      card.dataset.projectCategory = categoryFor(tag ? tag.textContent : '');
    });
    filters.forEach(function (button) {
      button.setAttribute('aria-controls', 'projectGallery');
    });
    if (total) total.textContent = String(cards.length);

    function render(animateNew) {
      var matches = cards.filter(function (card) {
        return active === 'all' || card.dataset.projectCategory === active;
      });
      var visible = matches.slice(0, limit);

      cards.forEach(function (card) {
        var show = visible.indexOf(card) !== -1;
        var wasHidden = card.hidden;
        card.hidden = !show;
        card.classList.remove('is-featured');
        if (!show) return;
        card.classList.add('in');
        if (animateNew && wasHidden && !reduceMotion && typeof card.animate === 'function') {
          card.animate([
            { opacity: 0, transform: 'translateY(12px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 300, easing: 'cubic-bezier(.2,.75,.25,1)' });
        }
      });

      visible.slice(0, 2).forEach(function (card) {
        card.classList.add('is-featured');
      });
      more.hidden = visible.length >= matches.length;
      if (result) result.textContent = 'Показано ' + visible.length + ' из ' + matches.length;
    }

    filters.forEach(function (button) {
      button.addEventListener('click', function () {
        active = button.dataset.projectFilter || 'all';
        limit = 12;
        filters.forEach(function (other) {
          var selected = other === button;
          other.classList.toggle('is-active', selected);
          other.setAttribute('aria-pressed', selected ? 'true' : 'false');
        });
        render(true);
      });
    });

    more.addEventListener('click', function () {
      limit += 12;
      render(true);
    });

    render(false);
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

  function initCertificateRail() {
    var rail = document.getElementById('certificateRail');
    if (!rail) return;
    var controls = toArray(document.querySelectorAll('[data-cert-scroll]'));
    var cards = toArray(rail.querySelectorAll('.cert'));
    var ticking = false;

    function maxScroll() {
      return Math.max(0, rail.scrollWidth - rail.clientWidth);
    }

    function updateControls() {
      var limit = maxScroll();
      controls.forEach(function (button) {
        var direction = Number(button.dataset.certScroll || 0);
        var disabled = direction < 0 ? rail.scrollLeft <= 2 : rail.scrollLeft >= limit - 2;
        button.disabled = disabled || limit <= 2;
      });
      ticking = false;
    }

    function cardPosition(card) {
      if (!card) return 0;
      var railRect = rail.getBoundingClientRect();
      var cardRect = card.getBoundingClientRect();
      var rawPosition = rail.scrollLeft + cardRect.left - railRect.left;
      return Math.max(0, Math.min(maxScroll(), rawPosition));
    }

    function currentIndex() {
      var closestIndex = 0;
      var closestDistance = Infinity;
      cards.forEach(function (card, index) {
        var distance = Math.abs(cardPosition(card) - rail.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      return closestIndex;
    }

    function scrollToIndex(index, behavior) {
      var target = cards[Math.max(0, Math.min(cards.length - 1, index))];
      if (!target) return;
      var left = cardPosition(target);
      if (typeof rail.scrollTo === 'function') {
        rail.scrollTo({ left: left, behavior: behavior });
      } else {
        rail.scrollLeft = left;
      }
    }

    function move(direction) {
      scrollToIndex(currentIndex() + direction, reduceMotion ? 'auto' : 'smooth');
    }

    controls.forEach(function (button) {
      button.addEventListener('click', function () {
        move(Number(button.dataset.certScroll || 0));
      });
    });

    rail.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateControls);
    }, { passive: true });

    rail.addEventListener('keydown', function (event) {
      if (event.target !== rail || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
      event.preventDefault();
      move(event.key === 'ArrowLeft' ? -1 : 1);
    });

    window.addEventListener('resize', function () {
      scrollToIndex(currentIndex(), 'auto');
      updateControls();
    }, { passive: true });

    window.requestAnimationFrame(function () {
      scrollToIndex(currentIndex(), 'auto');
      updateControls();
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
  initSmoothScroll();
  initHeaderState();
  initHeroSlider();
  initMobileMenu();
  initProjectArchive();
  initReveals();
  initRoute();
  initClientMarquee();
  initFaq();
  initCertificateRail();
  initLightbox();
  initForms();
  initTrailerPicker();
})();
