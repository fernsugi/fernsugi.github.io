#!/usr/bin/env node
// Renders the static site from src/content.mjs.
//
//   node build.mjs
//
// Writes index.html (English), ja/index.html (Japanese), 404.html, favicon.svg,
// sitemap.xml and robots.txt. No dependencies; needs Node 18 or newer.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as C from './src/content.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));

const LANGS = {
  en: { dir: '', htmlLang: 'en', ogLocale: 'en_US', label: 'EN' },
  ja: { dir: 'ja/', htmlLang: 'ja', ogLocale: 'ja_JP', label: '日本語' },
};

// ───────────────────────────────────────────────────────────── helpers

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** A two-operator FM waveform as an SVG path: y = sin(θ + index·sin(ratio·θ)). */
function fmPath({ ratio, index, cycles = 3, w = 320, h = 56, pad = 3, steps = 240 }) {
  const mid = h / 2;
  const amp = h / 2 - pad;
  let d = '';
  for (let i = 0; i <= steps; i++) {
    const x = i / steps;
    const th = 2 * Math.PI * cycles * x;
    const y = mid - amp * Math.sin(th + index * Math.sin(ratio * th));
    d += `${i ? 'L' : 'M'}${(x * w).toFixed(1)} ${y.toFixed(1)}`;
  }
  return d;
}

const ICON = {
  arrow: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h9.5M8.5 4l4 4-4 4"/></svg>',
  out: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 11.5l7-7M6 4.5h5.5V10"/></svg>',
  up: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3.5M4 7.5l4-4 4 4"/></svg>',
  sun: '<svg class="ico ico-sun" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="2.75"/><path d="M8 1.5v1.75M8 12.75v1.75M1.5 8h1.75M12.75 8h1.75M3.4 3.4l1.25 1.25M11.35 11.35l1.25 1.25M3.4 12.6l1.25-1.25M11.35 4.65l1.25-1.25"/></svg>',
  moon: '<svg class="ico ico-moon" viewBox="0 0 16 16" aria-hidden="true"><path d="M13.25 9.6A5.6 5.6 0 0 1 6.4 2.75a5.6 5.6 0 1 0 6.85 6.85Z"/></svg>',
  menu: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path class="menu-a" d="M2.5 5.5h11"/><path class="menu-b" d="M2.5 10.5h11"/></svg>',
};

const MARK_PATH = fmPath({ ratio: 2, index: 1.15, cycles: 1.5, w: 20, h: 14, pad: 1, steps: 48 });

/** The brand mark: a vermilion seal with one FM wave across it. */
const mark = (cls = 'mark') =>
  `<svg class="${cls}" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="7" fill="var(--accent, #f0441e)"/><path d="${MARK_PATH}" transform="translate(6 9)" fill="none" stroke="var(--seal-ink, #fff6ee)" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// ───────────────────────────────────────────────────────────── page

function renderPage(lang, { version }) {
  const L = LANGS[lang];
  const other = lang === 'en' ? 'ja' : 'en';
  const root = L.dir ? '../' : '';
  const t = (v) => (v && typeof v === 'object' && 'en' in v ? v[lang] : v);
  const e = (v) => esc(t(v));
  const urlOf = (l) => `${C.site.origin}/${LANGS[l].dir}`;

  /** Escapes copy, then expands {term} placeholders into tagged, linked text. */
  const rich = (v) => esc(t(v)).replace(/\{(\w+)\}/g, (m, key) => {
    const term = C.terms[key];
    if (!term) return m;
    const name = term.lang === lang ? esc(term.text) : `<span lang="${term.lang}">${esc(term.text)}</span>`;
    const link = `<a href="${esc(term.href)}" rel="noopener">${name}</a>`;
    return lang === 'en' && term.en ? `${link} (${esc(term.en)})` : link;
  });

  const ext = (href, label, cls = 'link-ext', rel = 'noopener') =>
    `<a class="${cls}" href="${esc(href)}" rel="${rel}">${esc(label)}${ICON.out}</a>`;

  const tags = (items, label) =>
    `<ul class="tags" aria-label="${esc(label)}">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;

  const points = (items) =>
    `<ul class="points">\n${items.map((x) => `            <li>${rich(x)}</li>`).join('\n')}\n          </ul>`;

  const stackLabel = lang === 'en' ? 'Stack' : '使用技術';
  const keys = Object.keys(C.sections);

  const secHead = (key) => {
    const s = C.sections[key];
    const title = lang === 'en'
      ? esc(s.word)
      : `<span class="sec-word" lang="en" aria-hidden="true">${esc(s.word)}</span><span class="sec-ja">${e(s.title)}</span>`;
    return `<header class="sec-head">
        <p class="sec-no label" aria-hidden="true"><span>${s.no}</span><span>/ ${String(keys.length).padStart(2, '0')}</span></p>
        <h2 class="sec-title" id="${key}-title">${title}</h2>
        <p class="sec-lead">${e(s.lead)}</p>
      </header>`;
  };

  // ── head

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: C.site.name,
    alternateName: C.site.fullName,
    jobTitle: t(C.site.jobTitle),
    description: t(C.site.description),
    url: urlOf(lang),
    address: { '@type': 'PostalAddress', addressLocality: 'Tokyo', addressCountry: 'JP' },
    knowsLanguage: C.about.languages.map((x) => x.lang),
    sameAs: [C.site.github, C.site.linkedin],
  }).replace(/</g, '\\u003c');

  const head = `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(C.site.title)}</title>
<meta name="description" content="${e(C.site.description)}">
<meta name="author" content="${esc(C.site.name)}">
<link rel="canonical" href="${urlOf(lang)}">
<link rel="alternate" hreflang="en" href="${urlOf('en')}">
<link rel="alternate" hreflang="ja" href="${urlOf('ja')}">
<link rel="alternate" hreflang="x-default" href="${urlOf('en')}">
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#f2f0ea" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#11100d" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="${esc(C.site.name)}">
<meta property="og:title" content="${e(C.site.title)}">
<meta property="og:description" content="${e(C.site.description)}">
<meta property="og:url" content="${urlOf(lang)}">
<meta property="og:locale" content="${L.ogLocale}">
<meta property="og:locale:alternate" content="${LANGS[other].ogLocale}">
<meta property="og:image" content="${C.site.origin}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(C.site.name)} — ${e(C.site.jobTitle)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${root}favicon.ico" sizes="32x32">
<link rel="icon" href="${root}favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="${root}apple-touch-icon.png">
<link rel="preload" href="${root}assets/fonts/bricolage-display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="${root}assets/fonts/bricolage-text.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${root}assets/site.css?v=${version}">
<script>(function(d){var e=d.documentElement;e.className='js';try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')e.setAttribute('data-theme',t)}catch(_){}})(document)</script>
<script src="${root}assets/site.js?v=${version}" defer></script>
<script type="application/ld+json">${jsonLd}</script>`;

  // ── header

  const nav = keys.map((k) =>
    `<li><a href="#${k}">${e(C.sections[k].nav)}</a></li>`).join('');

  const langSwitch = Object.keys(LANGS).map((l) => {
    const cur = l === lang;
    const href = cur ? '#top' : (lang === 'en' ? LANGS[l].dir : '../');
    return `<a href="${href}" lang="${LANGS[l].htmlLang}"${cur ? ' aria-current="true"' : ` hreflang="${LANGS[l].htmlLang}" data-lang-link`}>${LANGS[l].label}</a>`;
  }).join('');

  const header = `<header class="site-head" data-head>
  <div class="wrap head-in">
    <a class="brand" href="#top">${mark()}<span>${esc(C.site.name)}</span></a>
    <nav class="nav" id="nav" aria-label="${e(C.ui.primaryNav)}"><ul>${nav}</ul></nav>
    <div class="tools">
      <div class="lang" role="group" aria-label="${e(C.ui.language)}">${langSwitch}</div>
      <button type="button" class="icon-btn" data-theme-toggle aria-label="${e(C.ui.themeToDark)}" data-to-dark="${e(C.ui.themeToDark)}" data-to-light="${e(C.ui.themeToLight)}">${ICON.sun}${ICON.moon}</button>
      <button type="button" class="icon-btn menu-btn" data-menu aria-expanded="false" aria-controls="nav" aria-label="${e(C.ui.menu)}">${ICON.menu}</button>
    </div>
  </div>
</header>`;

  // ── hero

  const sc = C.hero.scope;
  const [first, ...rest] = C.site.name.split(' ');
  const hero = `<section class="hero" id="top" data-hero aria-labelledby="hero-name">
    <div class="wrap">
      <p class="hero-meta"><span class="label">${e(C.hero.role)}</span><span class="label">${e(C.hero.place)}</span></p>
      <h1 class="hero-name" id="hero-name"><span>${esc(first)}</span> <span>${esc(rest.join(' '))}</span></h1>
      <div class="hero-grid">
        <p class="hero-lede">${e(C.hero.lede)}</p>
        <div class="hero-side">
          <p class="hero-sub">${e(C.hero.sub)}</p>
          <p class="hero-cta">
            <a class="btn" href="#contact">${e(C.hero.cta)}${ICON.arrow}</a>
            ${ext(C.site.github, 'GitHub', 'link-ext', 'me noopener')}
            ${ext(C.site.linkedin, 'LinkedIn', 'link-ext', 'me noopener')}
          </p>
        </div>
      </div>
    </div>
    <div class="scope" data-scope>
      <svg class="scope-fallback" viewBox="0 0 1440 200" preserveAspectRatio="xMinYMid slice" aria-hidden="true"><path d="${fmPath({ ratio: 2, index: 1.8, cycles: 4.8, w: 1440, h: 200, pad: 26, steps: 720 })}" vector-effect="non-scaling-stroke"/></svg>
      <canvas class="scope-canvas" aria-hidden="true"></canvas>
      <div class="wrap scope-bar">
        <p class="scope-read label" aria-hidden="true"><span class="scope-name">${e(sc.name)}</span><span>${e(sc.ratio)} <b data-ratio>2.00</b></span><span>${e(sc.index)} <b data-index>1.8</b></span><span data-note-wrap hidden>${e(sc.note)} <b data-note>A3</b></span></p>
        <p class="scope-hint label">${e(sc.hint)}</p>
        <button type="button" class="sound label" data-sound><i aria-hidden="true"></i><span><span class="vh">${e(sc.soundPrefix)} </span>${e(sc.sound)} <b data-sound-state data-on="${e(sc.on)}" data-off="${e(sc.off)}">${e(sc.off)}</b></span></button>
      </div>
    </div>
    <div class="wrap">
      <ul class="figures">
${C.figures.map((f) => `        <li class="figure"><p class="figure-num">${esc(f.value)}<span>${e(f.unit)}</span></p><p class="figure-label">${e(f.label)}</p></li>`).join('\n')}
      </ul>
    </div>
  </section>`;

  // ── work

  const project = (p, i) => `        <li class="proj reveal" id="${p.id}">
          <p class="proj-no label" aria-hidden="true">${String(i + 1).padStart(2, '0')}</p>
          <div class="proj-head">
            <h3 class="proj-title">${esc(p.title)}</h3>
            <p class="proj-kind">${e(p.kind)}</p>
            <p class="proj-status"><span class="chip chip--${p.status.tone}">${e(p.status.label)}</span></p>
            <p class="proj-where label">${e(p.where)}</p>
            <svg class="sig" viewBox="0 0 480 64" aria-hidden="true"><path pathLength="1" d="${fmPath({ ...p.wave, w: 480, h: 64, steps: 320 })}"/></svg>
          </div>
          <div class="proj-body">
            <p class="proj-sum">${rich(p.sum)}</p>
          ${points(p.points)}
            ${tags(p.tags, stackLabel)}${p.links.length ? `
            <p class="proj-links">${p.links.map((l) => ext(l.href, t(l.label))).join(' ')}</p>` : ''}
          </div>
        </li>`;

  const moreItem = (m) => {
    const inner = `<span class="more-name">${esc(m.title)}</span><span class="more-kind label">${e(m.kind)}</span><span class="more-desc">${e(m.desc)}</span>`;
    return m.href
      ? `          <li><a class="more-row" href="${esc(m.href)}" rel="noopener">${inner}${ICON.out}</a></li>`
      : `          <li><div class="more-row">${inner}</div></li>`;
  };

  const work = `<section class="sec" id="work" aria-labelledby="work-title">
    <div class="wrap">
      ${secHead('work')}
      <ol class="work">
${C.projects.map(project).join('\n')}
      </ol>
      <div class="more reveal">
        <h3 class="more-title label">${e(C.moreTitle)}</h3>
        <ul class="more-list">
${C.more.map(moreItem).join('\n')}
        </ul>
      </div>
    </div>
  </section>`;

  // ── results

  const meter = (m) => {
    const value = m.stat
      ? `<p class="meter-value"><span class="meter-to">${e(m.stat)}</span></p>`
      : `<p class="meter-value"><span class="meter-from">${e(m.from)}</span><span class="meter-arrow" aria-hidden="true">→</span><span class="vh"> ${e(C.ui.to)} </span><span class="meter-to">${e(m.to)}</span></p>
          <div class="meter-bar" aria-hidden="true"><i style="--to:${m.after}%"></i></div>`;
    return `        <li class="meter reveal${m.stat ? ' meter--stat' : ''}">
          <h3 class="meter-label label">${e(m.label)}</h3>
          ${value}
          <p class="meter-note"><strong>${e(m.delta)}</strong> ${e(m.how)}</p>
          <p class="meter-src label">${esc(m.src)}</p>
        </li>`;
  };

  const cl = C.caseLog;
  const logRow = (r, i) => `            <tr>
              <td class="log-no" aria-hidden="true">${String(i + 1).padStart(2, '0')}</td>
              <th scope="row" class="log-problem">${e(r.problem)}</th>
              <td class="log-action" data-label="${e(cl.cols.action)}">${e(r.action)}</td>
              <td class="log-result" data-label="${e(cl.cols.result)}">${e(r.result)}</td>
            </tr>`;

  const results = `<section class="sec" id="results" aria-labelledby="results-title">
    <div class="wrap">
      ${secHead('results')}
      <ul class="meters">
${C.meters.map(meter).join('\n')}
      </ul>
      <div class="log-wrap reveal" id="case-log">
        <table class="log">
          <caption><span class="log-title">${e(cl.title)}</span><span class="label">${e(cl.note)}</span></caption>
          <thead>
            <tr><th scope="col" class="log-no" aria-hidden="true">#</th><th scope="col">${e(cl.cols.problem)}</th><th scope="col">${e(cl.cols.action)}</th><th scope="col">${e(cl.cols.result)}</th></tr>
          </thead>
          <tbody>
${cl.rows.map(logRow).join('\n')}
          </tbody>
        </table>
      </div>
    </div>
  </section>`;

  // ── experience

  const job = (j) => `        <li class="job reveal">
          <div class="job-when">
            <p class="job-period label">${e(j.period)}</p>
            <ul class="job-meta">${j.meta.map((m) => `<li>${e(m)}</li>`).join('')}</ul>
          </div>
          <div class="job-main">
            <h3 class="job-org">${e(j.org)}</h3>
            <p class="job-role">${e(j.role)}</p>
            <p class="job-sum">${rich(j.sum)}</p>
          ${points(j.points)}
            ${tags(j.tags, stackLabel)}${j.more ? `
            <p class="job-more"><a class="link-in" href="${esc(j.more.href)}">${e(j.more.label)}${ICON.up}</a></p>` : ''}
          </div>
        </li>`;

  const experience = `<section class="sec" id="experience" aria-labelledby="experience-title">
    <div class="wrap">
      ${secHead('experience')}
      <ol class="jobs">
${C.jobs.map(job).join('\n')}
      </ol>
    </div>
  </section>`;

  // ── skills

  const maxYears = Math.max(...C.years.map((y) => y.n));
  const bar = (y, i) => `            <li style="--i:${i}"><span class="bar-name">${esc(y.name)}${y.note ? ` <small>${e(y.note)}</small>` : ''}</span><span class="bar-track" aria-hidden="true"><i style="--v:${((y.n / maxYears) * 100).toFixed(1)}%"></i></span><span class="bar-val">${e(y.text)}</span></li>`;

  const skills = `<section class="sec" id="skills" aria-labelledby="skills-title">
    <div class="wrap">
      ${secHead('skills')}
      <div class="skills">
        <figure class="years reveal">
          <figcaption class="label">${e(C.yearsTitle)}</figcaption>
          <ol class="bars">
${C.years.map(bar).join('\n')}
          </ol>
        </figure>
        <dl class="stack reveal">
${C.stack.map((g) => `          <div class="stack-row"><dt class="label">${e(g.name)}</dt><dd>${tags(g.items, t(g.name))}</dd></div>`).join('\n')}
        </dl>
      </div>
    </div>
  </section>`;

  // ── about

  const A = C.about;
  const langRow = (x) => {
    const name = t(x.name);
    return `            <li${x.strong ? ' class="is-strong"' : ''}><span class="lang-native" lang="${x.lang}">${esc(x.native)}</span><span class="lang-name">${name === x.native ? '' : esc(name)}</span><span class="lang-level label">${e(x.level)}</span></li>`;
  };

  const about = `<section class="sec" id="about" aria-labelledby="about-title">
    <div class="wrap">
      ${secHead('about')}
      <div class="about">
        <div class="about-bio reveal">
${A.bio.map((p) => `          <p>${rich(p)}</p>`).join('\n')}
        </div>
        <div class="about-langs reveal">
          <h3 class="label">${e(A.languagesTitle)}</h3>
          <ul class="langs">
${A.languages.map(langRow).join('\n')}
          </ul>
        </div>
      </div>
      <div class="flow-wrap reveal">
        <h3 class="label">${e(A.flowTitle)}</h3>
        <ol class="flow">${A.flow.map((s) => `<li>${e(s)}</li>`).join('')}</ol>
      </div>
      <div class="route-wrap reveal">
        <h3 class="label">${e(A.routeTitle)}</h3>
        <ol class="route">
${A.route.map((r) => `          <li><p class="route-when label"><span>${esc(r.when)}</span><span>${e(r.place)}</span></p><h4 class="route-title">${e(r.title)}</h4><p class="route-desc">${e(r.desc)}</p></li>`).join('\n')}
        </ol>
      </div>
    </div>
  </section>`;

  // ── contact

  const K = C.contact;
  const speaks = t(K.speaks).map(([text, l]) => (l === lang ? esc(text) : `<span lang="${l}">${esc(text)}</span>`)).join(lang === 'en' ? ' · ' : '・');

  const contact = `<section class="sec sec--contact" id="contact" aria-labelledby="contact-title">
    <div class="wrap">
      ${secHead('contact')}
      <div class="contact reveal">
        <p class="contact-mail"><a href="mailto:${esc(C.site.email)}">${esc(C.site.email)}</a><button type="button" class="copy label" data-copy="${esc(C.site.email)}" data-copied="${e(K.copied)}">${e(K.copy)}</button></p>
        <dl class="contact-list">
          <div><dt class="label">${e(K.elsewhere)}</dt><dd>${ext(C.site.github, 'GitHub', 'link-ext', 'me noopener')} ${ext(C.site.linkedin, 'LinkedIn', 'link-ext', 'me noopener')}</dd></div>
          <div><dt class="label">${e(K.basedLabel)}</dt><dd>${e(K.based)}</dd></div>
          <div><dt class="label">${e(K.timeLabel)}</dt><dd><span data-clock>${esc(K.timeFallback)}</span></dd></div>
          <div><dt class="label">${e(K.speaksLabel)}</dt><dd>${speaks}</dd></div>
        </dl>
      </div>
    </div>
  </section>`;

  // ── footer

  const footer = `<footer class="site-foot">
  <div class="wrap foot-in">
    <p class="foot-copy">${mark('mark mark--sm')}<span>© ${C.site.year} ${esc(C.site.name)}</span></p>
    <p class="foot-note">${e(C.footer.note)} ${e(C.footer.type)}</p>
    <p class="foot-links">${ext(C.site.source, t(C.footer.source))}<a class="link-in" href="#top">${e(C.ui.top)}${ICON.up}</a></p>
  </div>
</footer>`;

  return `<!DOCTYPE html>
<!-- Generated by build.mjs from src/content.mjs. Edit the content there, then run: node build.mjs -->
<html lang="${L.htmlLang}">
<head>
${head}
</head>
<body>
<a class="skip" href="#main">${e(C.ui.skip)}</a>
${header}
<main id="main">
  ${hero}

  ${work}

  ${results}

  ${experience}

  ${skills}

  ${about}

  ${contact}
</main>
${footer}
</body>
</html>
`;
}

// ───────────────────────────────────────────────────────────── other files

function render404({ version }) {
  const N = C.notFound;
  return `<!DOCTYPE html>
<!-- Generated by build.mjs. -->
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>404 — ${esc(C.site.name)}</title>
<meta name="robots" content="noindex">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/site.css?v=${version}">
<script>(function(d){var e=d.documentElement;e.className='js';try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')e.setAttribute('data-theme',t)}catch(_){}})(document)</script>
</head>
<body class="lost">
<main class="wrap lost-in">
  <p class="label">404</p>
  <h1 class="lost-title">${esc(N.title.en)}</h1>
  <svg class="lost-line" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 30H250l8-18 10 36 9-27 6 9H600" vector-effect="non-scaling-stroke"/></svg>
  <p>${esc(N.body.en)}</p>
  <p lang="ja">${esc(N.body.ja)}</p>
  <p class="lost-links"><a class="btn" href="/">${esc(N.home.en)}${ICON.arrow}</a> <a class="link-in" href="/ja/" lang="ja" hreflang="ja">${esc(N.home.ja)}</a></p>
</main>
</body>
</html>
`;
}

const faviconSvg = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#f0441e"/><path d="${MARK_PATH}" transform="translate(6 9)" fill="none" stroke="#fff6ee" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
`;

const sitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${Object.keys(LANGS).map((l) => `  <url>
    <loc>${C.site.origin}/${LANGS[l].dir}</loc>
${Object.keys(LANGS).map((a) => `    <xhtml:link rel="alternate" hreflang="${a}" href="${C.site.origin}/${LANGS[a].dir}"/>`).join('\n')}
  </url>`).join('\n')}
</urlset>
`;

const robots = () => `User-agent: *
Allow: /

Sitemap: ${C.site.origin}/sitemap.xml
`;

// ───────────────────────────────────────────────────────────── run

const assets = await Promise.all(['assets/site.css', 'assets/site.js'].map((f) => readFile(join(ROOT, f))));
const version = createHash('sha1').update(Buffer.concat(assets)).digest('hex').slice(0, 8);

const out = {
  'index.html': renderPage('en', { version }),
  'ja/index.html': renderPage('ja', { version }),
  '404.html': render404({ version }),
  'favicon.svg': faviconSvg(),
  'sitemap.xml': sitemap(),
  'robots.txt': robots(),
};

for (const [file, body] of Object.entries(out)) {
  const path = join(ROOT, file);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, body);
  console.log(`${file.padEnd(16)} ${(Buffer.byteLength(body) / 1024).toFixed(1)} kB`);
}
