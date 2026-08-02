import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const indexablePages = [
  'index.html',
  'kontejnernyie-perevozki.html',
  'perevozka-negabaritnyix-gruzov.html',
  'texnika-v-arendu.html',
  'zhd-perevozki.html',
  'nashi-proektyi.html',
];
const noindexPages = [
  'nashi-klientyi.html',
  'politika-konfidencialnosti.html',
  'o-kompanii.html',
  'kontaktyi.html',
  '404.html',
];
const expectedUrls = new Set([
  'https://mbm-trans.ru/',
  'https://mbm-trans.ru/kontejnernyie-perevozki.html',
  'https://mbm-trans.ru/perevozka-negabaritnyix-gruzov.html',
  'https://mbm-trans.ru/texnika-v-arendu.html',
  'https://mbm-trans.ru/zhd-perevozki.html',
  'https://mbm-trans.ru/nashi-proektyi.html',
]);

const failures = [];
const report = (condition, file, message) => {
  if (!condition) failures.push(`${file}: ${message}`);
};
const matches = (source, pattern) => [...source.matchAll(pattern)];
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const textContent = (source, tag) => {
  const match = source.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match?.[1].replace(/<[^>]+>/g, '').trim() ?? '';
};
const metaContent = (source, name) => {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`<meta\\s+[^>]*(?:name|property)=["']${escaped}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i'));
  return match?.[1].trim() ?? '';
};

for (const file of indexablePages) {
  const source = read(file);
  const titles = matches(source, /<title\b[^>]*>[\s\S]*?<\/title>/gi);
  const descriptions = matches(source, /<meta\s+[^>]*name=["']description["'][^>]*>/gi);
  const canonicals = matches(source, /<link\s+[^>]*rel=["']canonical["'][^>]*>/gi);
  const h1s = matches(source, /<h1\b[^>]*>[\s\S]*?<\/h1>/gi);
  const title = textContent(source, 'title');
  const description = metaContent(source, 'description');

  report(/<html\s+[^>]*lang=["']ru["']/i.test(source), file, 'нет lang="ru"');
  report(/<meta\s+[^>]*name=["']viewport["']/i.test(source), file, 'нет viewport');
  report(titles.length === 1, file, `ожидался один title, найдено ${titles.length}`);
  report(title.length >= 25 && title.length <= 65, file, `длина title ${title.length}, ожидается 25–65`);
  report(descriptions.length === 1, file, `ожидался один description, найдено ${descriptions.length}`);
  report(description.length >= 80 && description.length <= 180, file, `длина description ${description.length}, ожидается 80–180`);
  report(canonicals.length === 1, file, `ожидался один canonical, найдено ${canonicals.length}`);
  report(h1s.length === 1, file, `ожидался один h1, найдено ${h1s.length}`);
  report(/name=["']robots["'][^>]*content=["'][^"']*index,follow/i.test(source), file, 'страница должна быть index,follow');
  report(/property=["']og:title["']/i.test(source), file, 'нет og:title');
  report(/property=["']og:description["']/i.test(source), file, 'нет og:description');
  report(/property=["']og:image["']/i.test(source), file, 'нет og:image');
  report(/property=["']og:url["']/i.test(source), file, 'нет og:url');
  report(/name=["']twitter:card["']/i.test(source), file, 'нет twitter:card');
  report(/rel=["']manifest["']/i.test(source), file, 'нет manifest');

  for (const image of matches(source, /<img\b[^>]*>/gi)) {
    report(/\salt=["'][^"']*["']/i.test(image[0]), file, `у img нет alt: ${image[0].slice(0, 100)}`);
  }

  for (const script of matches(source, /<script\s+[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(script[1]);
    } catch (error) {
      report(false, file, `ошибка JSON-LD: ${error.message}`);
    }
  }

  for (const reference of matches(source, /\s(?:src|href)=["']([^"']+)["']/gi)) {
    const value = reference[1];
    if (/^(?:https?:|mailto:|tel:|data:|#|javascript:)/i.test(value)) continue;
    const clean = value.split(/[?#]/)[0];
    if (!clean || clean === '/') continue;
    const localPath = path.join(root, clean.replace(/^\//, ''));
    report(fs.existsSync(localPath), file, `локальный ресурс не найден: ${value}`);
  }

  report(!/(?:fonts\.googleapis\.com|cdnjs\.cloudflare\.com|unpkg\.com)/i.test(source), file, 'найден внешний CDN активов');
}

for (const file of noindexPages) {
  const source = read(file);
  report(/name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(source), file, 'служебная страница должна быть noindex');
}

const sitemap = read('sitemap.xml');
const sitemapUrls = new Set(matches(sitemap, /<loc>([^<]+)<\/loc>/g).map((match) => match[1]));
report(sitemapUrls.size === expectedUrls.size, 'sitemap.xml', `ожидалось ${expectedUrls.size} URL, найдено ${sitemapUrls.size}`);
for (const url of expectedUrls) report(sitemapUrls.has(url), 'sitemap.xml', `нет ${url}`);
for (const url of sitemapUrls) report(expectedUrls.has(url), 'sitemap.xml', `лишний URL ${url}`);

const robots = read('robots.txt');
report(robots.includes('Sitemap: https://mbm-trans.ru/sitemap.xml'), 'robots.txt', 'не указан sitemap');
report(robots.includes('Disallow: /api/'), 'robots.txt', 'API не закрыт от обхода');

JSON.parse(read('site.webmanifest'));

if (failures.length) {
  console.error(`Release verification failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Release verification passed: ${indexablePages.length} indexable pages, ${noindexPages.length} noindex pages, ${sitemapUrls.size} sitemap URLs.`);
}
