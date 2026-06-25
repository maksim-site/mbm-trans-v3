# -*- coding: utf-8 -*-
"""Generate redesigned inner pages with shared header/footer/nav."""

ICON = {
 'arrow':'<svg class="icon" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>',
 'truck':'<svg class="icon" viewBox="0 0 24 24"><path d="M10 17h4V5H2v12h3"/><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"/><circle cx="7.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>',
 'shield':'<svg class="icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/></svg>',
 'clock':'<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
 'pin':'<svg class="icon" viewBox="0 0 24 24"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
 'phone':'<svg class="icon" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>',
 'mail':'<svg class="icon" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
 'chev':'<svg class="icon" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
 'doc':'<svg class="icon" viewBox="0 0 24 24"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h4"/></svg>',
 'box':'<svg class="icon" viewBox="0 0 24 24"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>',
 'rent':'<svg class="icon" viewBox="0 0 24 24"><circle cx="7.5" cy="14.5" r="3.5"/><path d="M10 12 20 2"/><path d="m15 7 2 2"/><path d="m13 9 2 2"/><path d="M4.9 17.1 3 19l2 2 1.9-1.9"/></svg>',
 'train':'<svg class="icon" viewBox="0 0 24 24"><rect x="4" y="3" width="16" height="14" rx="2"/><path d="M4 11h16"/><path d="m8 19-2 3"/><path d="m18 22-2-3"/><circle cx="8.5" cy="14" r="1"/><circle cx="15.5" cy="14" r="1"/></svg>',
}

NAV = [
 ('О компании','o-kompanii.html',None),
 ('Услуги','kontejnernyie-perevozki.html',[
    ('Контейнерные перевозки','kontejnernyie-perevozki.html','box'),
    ('Перевозка негабаритных грузов','perevozka-negabaritnyix-gruzov.html','truck'),
    ('Техника в аренду','texnika-v-arendu.html','rent'),
    ('Ж/Д перевозки','zhd-perevozki.html','train'),
 ]),
 ('Наши проекты','nashi-proektyi.html',None),
 ('Клиенты','nashi-klientyi.html',None),
 ('Контакты','kontaktyi.html',None),
]
SERVICE_PAGES = {'kontejnernyie-perevozki.html','perevozka-negabaritnyix-gruzov.html','texnika-v-arendu.html','zhd-perevozki.html'}

def nav_html(active):
    out=['<nav class="main" id="nav">']
    for label,href,sub in NAV:
        is_active = (href==active) or (sub and active in SERVICE_PAGES and label=='Услуги')
        cls=' class="active"' if (is_active and not sub) else ''
        if sub:
            sub_active=' active' if active in SERVICE_PAGES else ''
            out.append('<div class="has-sub">')
            out.append(f'<a href="{href}" class="{("active" if sub_active else "").strip()}">{label} {ICON["chev"]}</a>')
            out.append('<div class="sub">')
            for sl,sh,si in sub:
                out.append(f'<a href="{sh}">{ICON[si]}{sl}</a>')
            out.append('</div></div>')
        else:
            out.append(f'<a href="{href}"{cls}>{label}</a>')
    out.append('</nav>')
    return '\n      '.join(out)

def head(title, desc, active):
    return f'''<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="shortcut icon" href="assets/favicon.ico?v=20260615w1" type="image/x-icon">
<link rel="icon" href="assets/favicon.ico?v=20260615w1" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32.png?v=20260615w1">
<link rel="apple-touch-icon" href="assets/apple-touch-icon.png?v=20260615w1">
<meta property="og:type" content="website">
<meta property="og:site_name" content="МБМ-Транс">
<meta property="og:locale" content="ru_RU">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="https://mbm-trans.ru/assets/og-cover.jpg">
<meta property="og:url" content="https://mbm-trans.ru/{active}">
<meta name="twitter:card" content="summary_large_image">
<link rel="stylesheet" href="assets/css/redesign.release1.css">
</head>
<body>
<div class="topbar">
  <div class="wrap">
    <span class="l">{ICON['pin']} Транспортно-экспедиторская компания · Санкт-Петербург</span>
    <div class="r"><a href="mailto:info@mbm-trans.ru">info@mbm-trans.ru</a></div>
  </div>
</div>
<header class="header" id="header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="МБМ-Транс — на главную">
      <img class="logo-img" src="assets/css/imgs/logo_h.jpg" srcset="assets/css/imgs/logo_h.jpg 1x, assets/css/imgs/logo_h@2x.jpg 2x" width="233" height="88" alt="МБМ-Транс">
    </a>
    {nav_html(active)}
    <div class="h-right">
      <div class="h-phone"><a href="tel:+78124016564">{ICON['phone']}+7 (812) 401-65-64</a><span>Звоните, мы на связи</span></div>
      <a href="kontaktyi.html" class="btn btn-orange">Заказать звонок</a>
      <button class="burger" id="burger" aria-label="Открыть меню"><svg class="icon" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    </div>
  </div>
</header>
<div class="overlay" id="overlay"></div>
'''

def page_hero(title, subtitle, crumb):
    cr=['<a href="index.html">Главная</a>']
    for label,href in crumb[:-1]:
        cr.append(f'<span class="sep">/</span><a href="{href}">{label}</a>')
    cr.append(f'<span class="sep">/</span><span aria-current="page">{crumb[-1][0]}</span>')
    return f'''<section class="page-hero">
  <div class="wrap">
    <nav class="breadcrumb" aria-label="Хлебные крошки">{''.join(cr)}</nav>
    <h1>{title}</h1>
    <p>{subtitle}</p>
  </div>
</section>'''

CTA = '''<hr class="hazard">
<div class="cta">
  <div class="wrap">
    <div><h2>Нужно перевезти негабаритный груз?</h2><p>Оставьте данные — рассчитаем стоимость и сроки в течение рабочего дня.</p></div>
    <a href="kontaktyi.html" class="btn btn-orange">Рассчитать перевозку %s</a>
  </div>
</div>''' % ICON['arrow']

def footer():
    return f'''<hr class="hazard">
<footer>
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <img class="foot-logo-img" src="assets/css/imgs/logo_f.png" srcset="assets/css/imgs/logo_f.png 1x, assets/css/imgs/logo_f@2x.png 2x" width="219" height="84" alt="МБМ-Транс">
      <p>Транспортно-экспедиторская компания. Перевозка негабаритных и тяжеловесных грузов по России, Казахстану, Беларуси, Узбекистану и из Китая.</p>
    </div>
    <div class="foot-col"><h4>Услуги</h4>
      <a href="kontejnernyie-perevozki.html">Контейнерные перевозки</a>
      <a href="perevozka-negabaritnyix-gruzov.html">Негабаритные грузы</a>
      <a href="texnika-v-arendu.html">Техника в аренду</a>
      <a href="zhd-perevozki.html">Ж/Д перевозки</a>
    </div>
    <div class="foot-col"><h4>Компания</h4>
      <a href="o-kompanii.html">О компании</a>
      <a href="nashi-proektyi.html">Наши проекты</a>
      <a href="nashi-klientyi.html">Клиенты</a>
      <a href="kontaktyi.html">Контакты</a>
    </div>
    <div class="foot-col"><h4>Контакты</h4>
      <a href="tel:+78124016564">+7 (812) 401-65-64</a>
      <a href="mailto:info@mbm-trans.ru">info@mbm-trans.ru</a>
      <p>198035, Санкт-Петербург,<br>Межевой канал, д. 3, к. 2</p>
    </div>
  </div>
  <div class="wrap foot-bottom">
    <span>© 2008–2026 ООО «МБМ-Транс». Все права защищены.</span>
    <span><a href="politika-konfidencialnosti.html">Политика конфиденциальности</a> · Перевозка негабаритных грузов · Санкт-Петербург</span>
  </div>
</footer>
<script src="assets/js/site.js" defer></script>
</body>
</html>'''

def write(fn, title, desc, active, hero, body):
    html = head(title,desc,active) + hero + '\n' + body + '\n' + CTA + '\n' + footer()
    open(fn,'w',encoding='utf-8').write(html)
    print('wrote',fn)

# ---------------- О КОМПАНИИ ----------------
about_body = f'''<section class="block">
  <div class="wrap content-grid">
    <article class="article prose reveal">
      <p><strong>ООО «МБМ-Транс»</strong> уже 20 лет является одной из ведущих компаний Северо-Западного региона в области перевозок негабаритных и тяжеловесных грузов. Залогом успеха компании являются высокий профессионализм сотрудников и индивидуальный подход к каждому партнёру.</p>
      <p>Команда высококлассных и ответственных специалистов ежедневно обеспечивает качественное и своевременное предоставление услуг — ведь перевозка специализированных грузов это большая ответственность.</p>
      <h2>Полный цикл услуг</h2>
      <p>Компания специализируется на перевозке негабаритных и тяжеловесных грузов по России, Казахстану, Беларуси и Узбекистану, а также осуществляет доставку грузов из Китая, оперируя собственным автопарком новейших автомобилей:</p>
      <ul>
        <li>40 автопоездов для перевозки негабаритных грузов</li>
        <li>Тягачи марок <strong>VOLVO, SCANIA, MERCEDES-BENZ</strong></li>
        <li>Полуприцепы <strong>NOOTEBOOM, GOLDHOFER, FAYMONVILLE</strong></li>
        <li>Более 30 собственных контейнерных площадок</li>
      </ul>
      <h2>Наша миссия</h2>
      <p>Стать лидером рынка перевозок негабаритных и тяжеловесных грузов, предоставляя клиентам безупречный сервис, надёжность и индивидуальный подход на всех этапах сотрудничества.</p>
      <p>Основные партнёры компании — крупнейшие российские предприятия: производители чёрных металлов, судостроительные, судоремонтные и машиностроительные предприятия, такие как ОАО «Северсталь», ФГУП «ПО «Севмаш», ООО «ОМЗ-Спецсталь» и другие.</p>
    </article>
    <aside class="sidebar">
      <div class="side-card accent reveal">
        <h4>Рассчитать перевозку</h4>
        <p>Опишите груз и маршрут — менеджер свяжется с вами в течение рабочего дня.</p>
        <a href="kontaktyi.html" class="btn btn-orange">Получить расчёт {ICON['arrow']}</a>
      </div>
    </aside>
  </div>
</section>
<hr class="hazard">
<div class="stats"><div class="wrap">
  <div class="stat reveal"><div class="ic">{ICON['truck']}</div><div class="num">40</div><div class="lbl">автопоездов в автопарке</div></div>
  <div class="stat reveal"><div class="ic">{ICON['box']}</div><div class="num">365<span class="u">т</span></div><div class="lbl">максимальный вес груза</div></div>
  <div class="stat reveal"><div class="ic">{ICON['doc']}</div><div class="num">30<span class="u">+</span></div><div class="lbl">контейнерных площадок</div></div>
  <div class="stat reveal"><div class="ic">{ICON['shield']}</div><div class="num">20</div><div class="lbl">лет на рынке</div></div>
</div></div>'''
write('o-kompanii.html','О компании — МБМ-Транс',
      'ООО «МБМ-Транс» — 20 лет на рынке перевозок негабаритных и тяжеловесных грузов до 365 т. Россия, Казахстан, Беларусь, Узбекистан, Китай.',
      'o-kompanii.html',
      page_hero('О компании','20 лет надёжных перевозок негабаритных и тяжеловесных грузов собственным автопарком.',
                [('О компании','o-kompanii.html')]),
      about_body)

# ---------------- SERVICE PAGE BUILDER ----------------
TRAILER_CATALOG = [
  {'name':'Трал низкорамный Nooteboom','cap':'145 т','work':'13 м','extend':'—','width':'2,84 м','height':'1,15 м','cap_n':145,'len_n':13,'width_n':2.84},
  {'name':'Трал низкорамный Nooteboom','cap':'120 т','work':'8 м','extend':'4,25 м','width':'2,84 м','height':'0,5 м','cap_n':120,'len_n':12.25,'width_n':2.84},
  {'name':'Трал низкорамный Nooteboom','cap':'90 т','work':'8 м','extend':'4,25 м','width':'2,84 м','height':'0,5 м','cap_n':90,'len_n':12.25,'width_n':2.84},
  {'name':'Трал низкорамный Nooteboom','cap':'85 т','work':'11 м','extend':'8 м','width':'2,55–3 м','height':'0,9 м','cap_n':85,'len_n':19,'width_n':3},
  {'name':'Трал низкорамный Nooteboom','cap':'80 т','work':'8,5 м','extend':'5,75 м','width':'3 м','height':'—','cap_n':80,'len_n':14.25,'width_n':3},
  {'name':'Трал низкорамный Nooteboom','cap':'65 т','work':'9 м','extend':'6,25 м','width':'2,75 м','height':'0,49 м','cap_n':65,'len_n':15.25,'width_n':2.75},
  {'name':'Трал низкорамный Росспецприцеп','cap':'65 т','work':'10 м','extend':'3 м','width':'2,55–3,14 м','height':'0,9 м','cap_n':65,'len_n':13,'width_n':3.14},
  {'name':'Трал низкорамный TCP 5.SOU-2N','cap':'63 т','work':'8,81 м','extend':'6,3 м','width':'2,55–3 м','height':'0,9 м','cap_n':63,'len_n':15.11,'width_n':3},
  {'name':'Трал низкорамный Nooteboom','cap':'55 т','work':'9 м','extend':'6,25 м','width':'2,75 м','height':'0,48 м','cap_n':55,'len_n':15.25,'width_n':2.75},
  {'name':'Трал низкорамный Faymonville','cap':'52 т','work':'9,2 + 6,6 м','extend':'—','width':'2,74–3,2 м','height':'0,86 м','cap_n':52,'len_n':15.8,'width_n':3.2},
  {'name':'Трал низкорамный Stokota','cap':'52 т','work':'9,2 + 6,6 м','extend':'—','width':'2,74–3,2 м','height':'0,86 м','cap_n':52,'len_n':15.8,'width_n':3.2},
  {'name':'Трал низкорамный Trailermaster','cap':'50 т','work':'7,5 м','extend':'—','width':'2,5–3 м','height':'0,6 м','cap_n':50,'len_n':7.5,'width_n':3},
  {'name':'Трал низкорамный Broshuis','cap':'46,5 т','work':'13,5 м','extend':'22,5 м','width':'2,54 м','height':'1,44 м','cap_n':46.5,'len_n':36,'width_n':2.54},
  {'name':'Трал низкорамный King','cap':'45 т','work':'7,3 м','extend':'—','width':'2,5–3 м','height':'0,5 м','cap_n':45,'len_n':7.3,'width_n':3},
  {'name':'Трал Роспецприцеп','cap':'45 т','work':'6,88 м','extend':'—','width':'2,54 м','height':'0,65 м','cap_n':45,'len_n':6.88,'width_n':2.54},
  {'name':'Трал низкорамный Goldhofer','cap':'40 т','work':'8,6 м','extend':'5 м','width':'2,7 м','height':'0,5 м','cap_n':40,'len_n':13.6,'width_n':2.7},
  {'name':'Трал низкорамный Andover','cap':'40 т','work':'6 м','extend':'—','width':'2,5–2,9 м','height':'0,65 м','cap_n':40,'len_n':6,'width_n':2.9},
  {'name':'Трал низкорамный TCP 3.SOU','cap':'38 т','work':'8,81 м','extend':'6,3 м','width':'2,55–3 м','height':'0,9 м','cap_n':38,'len_n':15.11,'width_n':3},
  {'name':'Трал низкорамный Jumbo','cap':'25 т','work':'9,5 м','extend':'—','width':'2,5 м','height':'0,95 м','cap_n':25,'len_n':9.5,'width_n':2.5},
  {'name':'Специальная площадка Kogel','cap':'25 т','work':'13,6 м','extend':'—','width':'по запросу','height':'1,3 м','cap_n':25,'len_n':13.6,'width_n':99},
]

def oversized_extra():
    cards = []
    for item in TRAILER_CATALOG:
        rows = ''.join(
          f'<span>{label}</span><b>{value}</b>'
          for label, value in [
            ('Грузоподъёмность', item['cap']),
            ('Рабочая площадка', item['work']),
            ('Раздвижение', item['extend']),
            ('Ширина', item['width']),
            ('Высота площадки', item['height']),
          ]
        )
        cards.append(f'''<article class="trailer-card" data-cap="{item['cap_n']}" data-length="{item['len_n']}" data-width="{item['width_n']}">
          <h4>{item['name']}</h4>
          <div class="trailer-specs">{rows}</div>
        </article>''')
    return f'''
      <section class="oversize-box">
        <div class="eyebrow">Параметры негабарита</div>
        <h2>Когда груз считается негабаритным</h2>
        <p>Ориентируемся на базовые пороги: если превышен хотя бы один параметр, перевозка требует отдельной подготовки маршрута, разрешений и сопровождения.</p>
        <div class="limit-grid">
          <div class="limit-card"><b>2,5 м</b><span>ширина более</span></div>
          <div class="limit-card"><b>13,5 м</b><span>длина более</span></div>
          <div class="limit-card"><b>4 м</b><span>высота более</span></div>
          <div class="limit-card"><b>25 т</b><span>масса более</span></div>
        </div>
      </section>
      <section class="oversize-box">
        <div class="eyebrow">Подбор трала</div>
        <h2>Предварительный расчёт по параметрам груза</h2>
        <p>Введите массу и габариты — каталог ниже покажет подходящие варианты по грузоподъёмности, длине и ширине площадки. Финальную схему крепления и маршрут всё равно проверяет менеджер.</p>
        <form class="trailer-picker" id="trailerPicker">
          <label><span>Масса, т</span><input type="number" min="0" step="0.1" name="weight" placeholder="например, 52"></label>
          <label><span>Длина, м</span><input type="number" min="0" step="0.1" name="length" placeholder="например, 12"></label>
          <label><span>Ширина, м</span><input type="number" min="0" step="0.1" name="width" placeholder="например, 3"></label>
          <label><span>Высота, м</span><input type="number" min="0" step="0.1" name="height" placeholder="например, 4.2"></label>
          <div class="picker-actions">
            <button class="btn btn-orange" type="submit">Подобрать {ICON['arrow']}</button>
            <button class="btn btn-ghost" type="button" data-reset-picker>Сбросить</button>
          </div>
        </form>
        <div class="fit-note" id="trailerResult">Показаны все варианты из каталога. Укажите параметры, чтобы сузить список.</div>
        <div class="quote-checklist">
          <h3>Что нужно для точного расчёта стоимости</h3>
          <ul>
            <li>полная масса и габариты груза;</li>
            <li>маршрут следования и точка доставки;</li>
            <li>дата готовности груза к перевозке;</li>
            <li>условия погрузки и разгрузки;</li>
            <li>требования к сопровождению и разрешениям.</li>
          </ul>
        </div>
        <h3>Каталог тралов</h3>
        <div class="trailer-grid" id="trailerCatalog">{''.join(cards)}</div>
      </section>'''

def service(fn, title, subtitle, img, intro, h2, paras, bullets, persons, visual='photo', extra=''):
    crumb=[('Услуги','kontejnernyie-perevozki.html'),(title,fn)]
    plist=''.join(f'<p>{p}</p>' for p in paras)
    blist='<ul>'+''.join(f'<li>{b}</li>' for b in bullets)+'</ul>' if bullets else ''
    visual_html=f'''<figure class="service-visual service-visual--{visual}">
        <img src="{img}" alt="{title}">
      </figure>
      ''' if img else ''
    extra_html=f'\n      {extra.strip()}' if extra else ''
    pcards=''
    for nm,role,mail,initials in persons:
        mlink = '<a href="mailto:%s">%s</a>' % (mail,mail) if mail else ''
        pcards+=f'<div class="person"><span class="av">{initials}</span><span><b>{nm}</b><small>{role}</small>{mlink}</span></div>'
    side_persons=f'<div class="side-card reveal"><h4>Отдел</h4>{pcards}</div>' if persons else ''
    grid_class='content-grid' if side_persons else 'content-grid content-grid--wide'
    aside_html=f'''
    <aside class="sidebar">
      {side_persons}
    </aside>''' if side_persons else ''
    body=f'''<section class="block service-content">
  <div class="wrap {grid_class}">
    <article class="article prose service-main">
      {visual_html}<p>{intro}</p>{extra_html}
      <h2>{h2}</h2>
      {plist}
      {blist}
    </article>{aside_html}
  </div>
</section>'''
    write(fn,f'{title} — МБМ-Транс',subtitle,fn,page_hero(title,subtitle,crumb),body)

service('kontejnernyie-perevozki.html','Контейнерные перевозки',
  'Автоперевозка всех типов морских контейнеров по России. Более 30 собственных контейнерных площадок.',
  '',
  'С 2005 года в список услуг компании «МБМ-Транс» включены контейнерные перевозки. Мы следим за тенденциями рынка и предлагаем клиентам только лучшие условия для сотрудничества.',
  'Особенности контейнерных перевозок',
  ['Контейнерные грузоперевозки позволяют решать ряд задач, связанных со снижением транспортных расходов и повышением рентабельности коммерческой деятельности. Мы используем автомобильный транспорт, что позволяет доставлять большие объёмы грузов в любую точку России — в том числе туда, где нет железнодорожного сообщения.'],
  ['Низкая себестоимость услуги — унифицированные размеры контейнеров упрощают погрузку и крепление','Груз защищён от дождя, ветра и хищений','Доставка непосредственно «до дверей» получателя','Универсальность — большинство грузов может перевозиться в контейнерах'],
  [])

service('perevozka-negabaritnyix-gruzov.html','Перевозка негабаритных грузов',
  'Транспортировка крупногабаритных и тяжеловесных грузов массой до 365 тонн с полным сопровождением.',
  '',
  'Перевозка негабаритных грузов — ключевая специализация компании «МБМ-Транс». Мы располагаем собственным парком тягачей и низкорамных тралов, а также штатом опытных специалистов по проектной логистике.',
  'Что мы берём на себя',
  ['Груз считается негабаритным, если его ширина более 2,5 м, длина более 13,5 м, высота более 4 м, либо масса превышает 25 тонн. Перевозка таких грузов требует особой подготовки, разрешений и сопровождения.'],
  ['Разработка маршрута и схемы размещения груза','Оформление разрешений на перевозку негабарита','Автомобили сопровождения и взаимодействие с ГИБДД','Тягачи VOLVO, SCANIA, MERCEDES-BENZ и тралы до 365 тонн','Страхование груза на всю стоимость перевозки'],
  [],
  'photo',
  oversized_extra())

service('texnika-v-arendu.html','Техника в аренду',
  'Специализированная техника для погрузки, разгрузки и транспортировки тяжёлых грузов.',
  '',
  'Компания «МБМ-Транс» предоставляет в аренду специализированную технику для проведения погрузочно-разгрузочных работ и транспортировки тяжёлых и негабаритных грузов.',
  'Доступная техника',
  ['Мы подберём технику под задачу любой сложности — от разовой погрузки до полного сопровождения проекта. Опытные операторы и техническое обслуживание включены.'],
  ['Автокраны грузоподъёмностью до 100 тонн','Низкорамные тралы и платформы','Тягачи для перевозки спецтехники','Сопровождение и услуги такелажа'],
  [])

service('zhd-perevozki.html','Ж/Д перевозки',
  'Перевозка грузов железнодорожным транспортом на универсальных и специальных платформах.',
  '',
  'Для перевозок грузов железнодорожным транспортом компания «МБМ-Транс» оперирует универсальными платформами и организует мультимодальные схемы доставки.',
  'Преимущества Ж/Д перевозок',
  ['Железнодорожный транспорт оптимален для перевозки крупных партий грузов на дальние расстояния. Мы организуем доставку «от двери до двери», сочетая Ж/Д и автомобильное плечо.'],
  ['Универсальные и специальные платформы','Перевозка на дальние расстояния по выгодным тарифам','Мультимодальные схемы (Ж/Д + авто)','Полное экспедиторское сопровождение'],
  [])

# ---------------- ПРОЕКТЫ (все 28, hi-res webp) ----------------
import json
pmap=json.load(open('../original/projects_map.json',encoding='utf-8'))
def category(t):
    t=t.lower()
    if 'самолет' in t or 'вертолет' in t: return 'Авиатехника'
    if 'аэс' in t or 'гэс' in t or 'реактор' in t or 'турбин' in t or 'кондесатор' in t or 'ёмкости' in t or 'емкости' in t: return 'Энергетика'
    if 'контейнер' in t: return 'Контейнеры'
    if 'трамвай' in t or 'катер' in t or 'корабл' in t or 'трактор' in t or 'комбайн' in t or 'мойк' in t: return 'Спецтранспорт'
    if 'кран' in t or 'колесо' in t or 'свай' in t or 'установк' in t: return 'Спецтехника'
    if 'металлоконструкц' in t or 'конструкц' in t: return 'Металлоконструкции'
    return 'Оборудование'
cards=''
for base,title in pmap:
    tag=category(title)
    cards+=f'''<article class="proj reveal"><img src="assets/images/projects/{base}.webp" loading="lazy" alt="{title}"><div class="cap"><span class="tag">{tag}</span><b>{title}</b></div></article>'''
# новые hi-res фото (обобщённые подписи)
new_photos=[
 ('g01','Спецтехника','Модульный трал в составе автопоезда'),
 ('g02','Негабарит','Перевозка негабаритного груза'),
 ('g03','Энергетика','Транспортировка корпуса промышленного аппарата'),
 ('g04','Оборудование','Перевозка промышленного оборудования'),
 ('g05','Тяжеловес','Тяжеловесная перевозка на низкорамном трале'),
 ('g06','Оборудование','Перевозка ёмкостного оборудования'),
 ('g07','Негабарит','Негабаритная перевозка по трассе'),
 ('g08','Проектная логистика','Проектная перевозка негабарита'),
 ('g09','Энергетика','Перевозка обечайки аппарата'),
 ('g10','Спецтехника','Погрузка тяжеловесного груза'),
 ('g11','Металлоконструкции','Перевозка мостовой конструкции'),
 ('g12','Спецтехника','Модульные оси для тяжеловесных грузов'),
 ('g13','Негабарит','Перевозка негабаритного груза'),
 ('g14','Металлоконструкции','Транспортировка металлоконструкции'),
 ('g15','Оборудование','Перевозка ёмкостей'),
 ('g16','Тяжеловес','Перевозка негабарита, ночной рейс'),
 ('g17','Металлоконструкции','Перевозка крупногабаритной конструкции'),
]
for g,tag,title in new_photos:
    cards+=f'''<article class="proj reveal"><img src="assets/images/work/gallery/{g}.webp" loading="lazy" alt="{title}"><div class="cap"><span class="tag">{tag}</span><b>{title}</b></div></article>'''
proj_body=f'''<section class="block"><div class="wrap"><div class="gallery">{cards}</div></div></section>'''
write('nashi-proektyi.html','Наши проекты — МБМ-Транс',
      'Реализованные проекты МБМ-Транс: перевозка самолётов, трамваев, оборудования для АЭС и другой техники.',
      'nashi-proektyi.html',
      page_hero('Наши проекты','От транспортировки трамваев и самолётов до оборудования для АЭС — реализованные перевозки любой сложности.',
                [('Наши проекты','nashi-proektyi.html')]),
      proj_body)


# ---------------- КЛИЕНТЫ (все 20) ----------------
clients=[
 ('severstal-logo2','Северсталь'),('ижорский трубный завод','Ижорский трубный завод'),
 ('omz-logo','ОМЗ-Спецсталь'),('img2','Севмаш'),('logo_mostotrest','Мостотрест'),
 ('logo_inkotek','Инкотек'),('logo-nek','Группа компаний НЭК'),('logo_natrex','Natrex'),
 ('logo_bedford','Bedford Group'),('logo_instar','Instar Logistics'),
 ('logo_aettrans','AET Trans'),('ahlers_logo','Ahlers'),('logo_transy','Transport Systems Transy'),
 ('logo_premium_engineering','Premium Engineering'),('logo_lonmadi_kwintmadi','ЛОНМАДИ · КВИНТМАДИ'),
 ('logo_universal_spectech','Универсал Спецтехника'),('logo_ferronordic','Ferronordic Machines'),
 ('logo_keystone','Keystone Logistics'),('logo_asstra','AsstrA'),('logo_yusen','Yusen Logistics'),
]
cl=''
for base,alt in clients:
    cl+=f'<div class="client" title="{alt}"><img src="assets/images/clients/{base}.webp" loading="lazy" alt="{alt}"></div>'
clients_body=f'''<section class="block"><div class="wrap"><div class="client-page-grid">{cl}</div></div></section>'''
write('nashi-klientyi.html','Клиенты — МБМ-Транс',
      'Крупнейшие промышленные предприятия России — клиенты МБМ-Транс.','nashi-klientyi.html',
      page_hero('Наши клиенты','Крупнейшие промышленные предприятия России доверяют нам перевозку ответственных грузов.',
                [('Клиенты','nashi-klientyi.html')]),
      clients_body)

# ---------------- КОНТАКТЫ ----------------
contacts_body=f'''<section class="block">
  <div class="wrap">
    <div class="contact-grid">
      <div class="contact-info reveal">
        <div class="row"><span class="ic">{ICON['pin']}</span><div><div class="lbl">Адрес</div><div class="val">Россия, 198035, Санкт-Петербург,<br>Межевой канал, д. 3, корпус 2, 8 этаж</div></div></div>
        <div class="row"><span class="ic">{ICON['phone']}</span><div><div class="lbl">Телефон</div><div class="val"><a href="tel:+78124016564">+7 (812) 401-65-64</a></div></div></div>
        <div class="row"><span class="ic">{ICON['mail']}</span><div><div class="lbl">E-mail</div><div class="val"><a href="mailto:info@mbm-trans.ru">info@mbm-trans.ru</a></div></div></div>
        <div class="row"><span class="ic">{ICON['clock']}</span><div><div class="lbl">Режим работы</div><div class="val">Пн–Пт 9:00–18:00 · сопровождение 24/7</div></div></div>
      </div>
      <form class="form reveal" data-lead-form action="https://mbm-trans-leads.5br6b6c4st.workers.dev" method="post">
        <h3>Оставить заявку</h3>
        <div class="fd">Заполните форму — менеджер свяжется с вами и рассчитает стоимость перевозки.</div>
        <div class="grid2">
          <div class="field"><label for="f-name">Контактное лицо</label><input id="f-name" name="name" type="text" placeholder="Ваше имя" required></div>
          <div class="field"><label for="f-phone">Телефон</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" pattern="\\+7 \\([0-9]{{3}}\\) [0-9]{{3}}-[0-9]{{2}}-[0-9]{{2}}" maxlength="18" placeholder="+7 (___) ___-__-__" required></div>
        </div>
        <div class="field"><label for="f-email">E-mail</label><input id="f-email" name="email" type="email" autocomplete="email" placeholder="you@company.ru"></div>
        <div class="field"><label for="f-msg">Сообщение</label><textarea id="f-msg" name="message" placeholder="Опишите ваш груз и маршрут"></textarea></div>
        <div class="lead-trap" aria-hidden="true"><label for="f-website">Сайт</label><input id="f-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>
        <input type="hidden" name="lead_started_at" value="">
        <input type="hidden" name="page" value="Контакты">
        <label class="consent"><input type="checkbox" name="consent" required><span>Я даю согласие на обработку персональных данных и принимаю <a href="politika-konfidencialnosti.html" target="_blank" rel="noopener">Политику конфиденциальности</a>.</span></label>
        <button class="btn btn-orange" type="submit">Отправить заявку {ICON['arrow']}</button>
        <div class="form-status" role="status" aria-live="polite"></div>
      </form>
    </div>
    <div class="maps">
      <div class="map-card">
        <div class="map-pin">{ICON['pin']}</div>
        <div class="map-copy">
          <span class="eyebrow">Офис на карте</span>
          <h3>Санкт-Петербург, Межевой канал, д. 3, корпус 2</h3>
          <p>8 этаж · откроется в удобном картографическом сервисе</p>
        </div>
        <div class="map-actions">
          <a class="btn btn-orange" href="https://yandex.ru/maps/?text=%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3%2C%20%D0%9C%D0%B5%D0%B6%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%2C%203%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%202" target="_blank" rel="noopener">Открыть в Яндекс Картах {ICON['arrow']}</a>
          <div class="map-links" aria-label="Выбор карты">
            <a href="https://maps.apple.com/?q=%D0%9C%D0%B5%D0%B6%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%203%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%202%2C%20%D0%A1%D0%B0%D0%BD%D0%BA%D1%82-%D0%9F%D0%B5%D1%82%D0%B5%D1%80%D0%B1%D1%83%D1%80%D0%B3&ll=59.912326,30.262006" target="_blank" rel="noopener">Apple Maps</a>
            <a href="https://www.google.com/maps/search/?api=1&query=59.912326%2C30.262006" target="_blank" rel="noopener">Google Maps</a>
            <a href="https://2gis.ru/spb/search/%D0%9C%D0%B5%D0%B6%D0%B5%D0%B2%D0%BE%D0%B9%20%D0%BA%D0%B0%D0%BD%D0%B0%D0%BB%203%20%D0%BA%D0%BE%D1%80%D0%BF%D1%83%D1%81%202" target="_blank" rel="noopener">2GIS</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>'''
write('kontaktyi.html','Контакты — МБМ-Транс',
      'Контакты ООО «МБМ-Транс»: Санкт-Петербург, Межевой канал, д.3. Телефон +7 (812) 401-65-64.',
      'kontaktyi.html',
      page_hero('Контакты','Свяжитесь с нами удобным способом — мы на связи в рабочее время и сопровождаем перевозки 24/7.',
                [('Контакты','kontaktyi.html')]),
      contacts_body)

# ---------------- ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ (152-ФЗ) ----------------
privacy_body = '''<section class="block">
  <div class="wrap" style="max-width:840px">
    <article class="prose reveal">
      <p>Настоящая Политика обработки персональных данных (далее — Политика) разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению их безопасности, предпринимаемые ООО «МБМ-Транс» (далее — Оператор).</p>

      <h2>1. Общие положения</h2>
      <p>Оператор ставит важнейшей целью соблюдение прав и свобод человека при обработке его персональных данных, в том числе защиту прав на неприкосновенность частной жизни. Настоящая Политика применяется ко всей информации, которую Оператор может получить о посетителях сайта mbm-trans.ru.</p>

      <h2>2. Какие данные мы собираем</h2>
      <p>При заполнении формы заявки на сайте Оператор обрабатывает следующие данные, предоставленные пользователем добровольно:</p>
      <ul>
        <li>имя (контактное лицо);</li>
        <li>номер телефона;</li>
        <li>адрес электронной почты (при указании);</li>
        <li>текст сообщения, который пользователь вводит самостоятельно.</li>
      </ul>

      <h2>3. Цели обработки</h2>
      <p>Персональные данные обрабатываются исключительно в целях обработки обращений и заявок пользователей, предоставления консультаций, расчёта стоимости услуг и обратной связи. Данные не используются для рассылки рекламных материалов без отдельного согласия.</p>

      <h2>4. Правовые основания</h2>
      <p>Оператор обрабатывает персональные данные на основании согласия субъекта персональных данных, которое пользователь выражает, проставляя отметку в форме обратной связи и нажимая кнопку отправки.</p>

      <h2>5. Порядок обработки и защита данных</h2>
      <p>Обработка персональных данных ведётся с применением средств автоматизации. Оператор принимает необходимые организационные и технические меры для защиты данных от неправомерного доступа, уничтожения, изменения, блокирования и иных неправомерных действий. Передача данных третьим лицам не осуществляется, за исключением случаев, предусмотренных законодательством РФ.</p>

      <h2>6. Права пользователя</h2>
      <p>Субъект персональных данных вправе получать информацию об обработке своих данных, требовать их уточнения, блокирования или уничтожения, а также <strong>отозвать своё согласие на обработку</strong> в любой момент, направив обращение на электронную почту <a href="mailto:info@mbm-trans.ru">info@mbm-trans.ru</a>.</p>

      <h2>7. Файлы cookie</h2>
      <p>Сайт может использовать файлы cookie для корректной работы и анализа посещаемости. Пользователь может отключить cookie в настройках своего браузера.</p>

      <h2>8. Реквизиты Оператора</h2>
      <ul>
        <li>Наименование: ООО «МБМ-Транс»</li>
        <li>Адрес: Россия, 198035, г. Санкт-Петербург, Межевой канал, д. 3, корпус 2</li>
        <li>E-mail: <a href="mailto:info@mbm-trans.ru">info@mbm-trans.ru</a></li>
        <li>Телефон: <a href="tel:+78124016564">+7 (812) 401-65-64</a></li>
        <li>ИНН / ОГРН: <em>указываются в учредительных документах</em></li>
      </ul>

      <h2>9. Изменения Политики</h2>
      <p>Оператор вправе вносить изменения в настоящую Политику. Актуальная редакция всегда доступна на этой странице. Дата последнего обновления: 16.06.2026.</p>
    </article>
  </div>
</section>'''
write('politika-konfidencialnosti.html','Политика конфиденциальности — МБМ-Транс',
      'Политика обработки персональных данных ООО «МБМ-Транс» в соответствии с 152-ФЗ.',
      'politika-konfidencialnosti.html',
      page_hero('Политика конфиденциальности','Обработка персональных данных в соответствии с Федеральным законом № 152-ФЗ.',
                [('Политика конфиденциальности','politika-konfidencialnosti.html')]),
      privacy_body)

print('\nAll inner pages generated.')
