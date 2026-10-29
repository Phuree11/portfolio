/* app.js — อ่านข้อมูลจาก content.js แล้วสร้างหน้าเว็บ (ปกติไม่ต้องแก้ไฟล์นี้) */
(() => {
  'use strict';

  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ---------- language ---------- */
  const safeGet = (k) => { try { return localStorage.getItem(k); } catch (_) { return null; } };
  const safeSet = (k, v) => { try { localStorage.setItem(k, v); } catch (_) { /* ignore */ } };

  const fromUrl = new URLSearchParams(location.search).get('lang');
  const browserTh = (navigator.language || '').toLowerCase().startsWith('th');
  let lang = fromUrl || safeGet('lang') || (browserTh ? 'th' : 'en');
  if (lang !== 'th' && lang !== 'en') lang = 'en';

  const t = (v) => (v == null ? '' : typeof v === 'string' ? v : (v[lang] ?? v.en ?? v.th ?? ''));
  const ui = (path) => t(path.split('.').reduce((o, k) => (o ? o[k] : undefined), S.ui));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const safeUrl = (u) => (/^(https?:|mailto:|tel:|\.?\/|#)/i.test(u) ? u : '#');

  const projects = () => S.projects.filter((p) => !p.hidden);
  const mediaOf = (p) => (p.media && p.media.length ? p.media : (p.cover ? [{ type: 'image', src: p.cover }] : []));
  const isVideo = (m) => m.type === 'youtube' || m.type === 'video';

  /* ---------- chrome: nav labels + language switch ---------- */
  function renderChrome() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = ui(el.dataset.i18n); });

    const sw = $('#langsw');
    sw.setAttribute('aria-checked', String(lang === 'th'));
    $$('.lt', sw).forEach((el) => el.classList.toggle('on', el.dataset.l === lang));

    const cv = S.profile.cv, cvLink = $('#nav-cv');
    if (cv && cv.url) { cvLink.hidden = false; cvLink.href = safeUrl(cv.url); cvLink.textContent = t(cv.label) || 'CV'; }
    else cvLink.hidden = true;
  }

  /* ---------- Opening / About / Work / Contact pages ---------- */
  function renderPages() {
    $('#home-name').textContent = S.profile.fullName || S.profile.name;
    $('#home-role').textContent = t(S.profile.role);

    $('#about-name').textContent = S.profile.name;
    $('#about-role').textContent = t(S.profile.role);
    $('#about-bio').innerHTML = S.about.bio.map((b) => `<p>${esc(t(b))}</p>`).join('');
    $('#about-skills').innerHTML = S.about.skills.map((g) => `
      <div class="a-group">
        <h3>${esc(t(g.title))}</h3>
        <ul>${g.items.map((it) => `<li>${esc(t(it))}</li>`).join('')}</ul>
      </div>`).join('');

    const list = projects();
    $('#project-grid').innerHTML = list.length ? list.map((p) => `
      <a class="card" href="#p-${esc(p.id)}">
        <span class="c-box">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy">` : ''}</span>
        <span class="c-title">${esc(t(p.title))}</span>
        <span class="c-role">${esc(t(p.role))}</span>
      </a>`).join('') : `<p class="empty">${esc(ui('work.empty'))}</p>`;

    const groups = (S.contact.groups || [{ title: S.ui.contact.title, items: S.contact.items || [] }])
      .filter((g) => g.items && g.items.length);
    $('#contact-groups').innerHTML = groups.map((g) => `
      <div class="ct-group">
        <h3 class="ct-title">${esc(t(g.title))}</h3>
        <ul class="ct-list">${g.items.map((c) => `
          <li><a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">
            <span class="k">${esc(c.label)}</span><span class="v">${esc(c.value || '')}</span><span class="ar" aria-hidden="true">↗</span>
          </a></li>`).join('')}
        </ul>
      </div>`).join('');
  }

  /* ---------- space background ----------
     Positions come from the Figma slides (1920 x 1080).
     c = orbit centre, r = radius, a = where the planet starts (degrees, 0 = right, 90 = down),
     s = planet diameter, ring = halo diameter, pages = which pages show this orbit.
     Orbits shared by two pages stay on screen while switching between them. */
  const ORBITS = [
    { c: [954.5, 539.5], r: 322.5, pages: 'home',  planets: [{ a: -46.8, s: 33 }] },
    { c: [954, 533],     r: 541,   pages: 'home',  planets: [{ a: 117.5, s: 56, ring: 102 }, { a: -1.2, s: 22 }] },
    { c: [960, 555],     r: 873,   pages: 'home',  planets: [{ a: 197.4, s: 71 }] },
    { c: [17.5, 1028.5], r: 322.5, pages: 'about work detail', planets: [{ a: -28.5, s: 33 }] },
    { c: [1620.5, 176.5], r: 378.5, pages: 'about work detail', planets: [{ a: 114, s: 22 }] },
    { c: [1856.5, 762.5], r: 378.5, pages: 'about', planets: [{ a: 180, s: 28 }] },
    { c: [373, 191],     r: 421,   pages: 'work',  planets: [{ a: -10.5, s: 22 }] },
    { c: [1557.5, 972.5], r: 378.5, pages: 'work detail', planets: [{ a: 180, s: 28 }] },
    { c: [532.5, 120.5], r: 326.5, pages: 'contact', planets: [{ a: 4.4, s: 17 }] },
    { c: [362, 1080],    r: 362,   pages: 'contact', planets: [{ a: -28.5, s: 37 }] },
    { c: [1551, 125],    r: 457,   pages: 'contact', planets: [{ a: 114, s: 27 }] },
    { c: [2075.5, 846.5], r: 378.5, pages: 'contact', planets: [{ a: 180, s: 28 }] }
  ];

  function buildSpace() {
    const svg = ORBITS.map((o, i) => {
      const [cx, cy] = o.c;
      const period = (70 * Math.pow(o.r / 400, 1.5)).toFixed(1);   // bigger orbit = slower, like real planets
      const dir = i % 2 ? 'reverse' : 'normal';
      const planets = o.planets.map((p) => {
        // start position = Figma position: a negative delay jumps the animation forward
        const start = dir === 'normal' ? p.a : -p.a;
        const delay = -(((start % 360) + 360) % 360) / 360 * period;
        return `<g class="pl" style="transform-origin:${cx}px ${cy}px;animation-duration:${period}s;animation-delay:${delay.toFixed(2)}s;animation-direction:${dir}">
          ${p.ring ? `<circle class="halo" cx="${cx + o.r}" cy="${cy}" r="${p.ring / 2}"/>` : ''}
          <circle class="dot" cx="${cx + o.r}" cy="${cy}" r="${p.s / 2}"/>
        </g>`;
      }).join('');
      return `<g class="orbit" data-pages="${o.pages}"><circle class="ring" cx="${cx}" cy="${cy}" r="${o.r}"/>${planets}</g>`;
    }).join('');
    $('#space').innerHTML = `<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" focusable="false">${svg}</svg>`;
  }

  function setSpace(page) {
    $$('#space .orbit').forEach((g) => g.classList.toggle('on', g.dataset.pages.split(' ').includes(page)));
  }

  /* ---------- project page ---------- */
  let current = null;   // id of the project being shown
  let mediaIdx = 0;     // which media item is in the big slot

  function bigMedia(m) {
    if (!m) return '';
    if (m.type === 'youtube') return `<iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}" title="${esc(t(m.caption) || 'video')}" loading="lazy" allowfullscreen></iframe>`;
    if (m.type === 'video') return `<video src="${esc(m.src)}" controls muted playsinline preload="metadata"></video>`;
    return `<img src="${esc(m.src)}" alt="${esc(t(m.caption))}">`;
  }

  function renderDetail(p) {
    const list = mediaOf(p);
    if (mediaIdx >= list.length) mediaIdx = 0;
    const main = list[mediaIdx];
    const others = list.map((m, i) => [m, i]).filter(([, i]) => i !== mediaIdx);

    const thumbs = others.map(([m, i]) => {
      const label = isVideo(m) ? `▶ ${ui('detail.video')}` : ui('detail.phSmall');
      return `<button type="button" class="tile sm" data-i="${i}" data-ph="${esc(label)}" aria-label="${esc(t(m.caption) || label)}">${isVideo(m) ? '' : `<img src="${esc(m.src)}" alt="" loading="lazy">`}</button>`;
    }).join('') + Array.from({ length: Math.max(0, 5 - others.length) },
      () => `<span class="tile empty" data-ph="${esc(ui('detail.phSmall'))}"></span>`).join('');

    const meta = [t(p.status), t(p.period)].filter(Boolean).map((v) => `<span>${esc(v)}</span>`).join('');
    const paras = [].concat(p.description || []).map((d) => `<p>${esc(t(d))}</p>`).join('');
    const did = (p.did || []).map((d) => `<li>${esc(t(d))}</li>`).join('');

    const gl = p.gameLink;
    const gameLabel = esc((gl && t(gl.label)) || ui('detail.linkGame'));
    const game = !gl ? '' : (gl.url
      ? `<a class="gl" href="${esc(safeUrl(gl.url))}" target="_blank" rel="noopener">${gameLabel}</a>`
      : `<span class="gl off" aria-disabled="true">${gameLabel}</span>`);

    const links = (p.links || []).filter((l) => l.url)
      .map((l) => `<a class="lk" href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(t(l.label))}</a>`).join('');

    $('#v-detail').innerHTML = `
      <article class="proj">
        <div class="d-media">
          <div class="tile big" data-ph="${esc(ui('detail.phBig'))}">${bigMedia(main)}</div>
          ${thumbs}
        </div>
        <h2 class="d-title">${esc(t(p.title))}</h2>
        <div class="d-cols">
          <div class="d-left">
            <p class="d-meta">${meta}</p>
            <div class="d-desc"><p class="lab">${esc(ui('detail.description'))}</p>${paras}</div>
            ${game}
          </div>
          <div class="d-right">
            <p class="d-role">${esc(t(p.role))}</p>
            ${did ? `<ul class="d-did">${did}</ul>` : ''}
            ${links ? `<div class="d-links">${links}</div>` : ''}
          </div>
        </div>
      </article>`;
  }

  $('#v-detail').addEventListener('click', (e) => {
    const th = e.target.closest('.tile.sm[data-i]');
    if (!th || !current) return;
    mediaIdx = Number(th.dataset.i);
    const p = S.projects.find((x) => x.id === current);
    if (p) renderDetail(p);
  });

  /* ---------- routing: one screen at a time ----------
     (empty) = opening page | #about | #work | #contact | #p-<id> (project page) */
  const PAGES = ['about', 'work', 'contact'];
  const VIEWS = ['home', 'about', 'work', 'contact', 'detail'];

  function show(view) {
    VIEWS.forEach((v) => { $(`#v-${v}`).hidden = v !== view; });
    document.body.dataset.view = view;
    $('#nav-back').hidden = view !== 'detail';
    $('#nav-back').classList.toggle('cur', view === 'detail');
    $$('.nav a[data-v]').forEach((a) => a.classList.toggle('cur', a.dataset.v === view));
    setSpace(view);
    $('#top').scrollTop = 0;
    window.scrollTo(0, 0);
  }

  function updateTitle() {
    const full = S.profile.fullName || S.profile.name;
    if (current) {
      const p = S.projects.find((x) => x.id === current);
      if (p) { document.title = `${t(p.title)} — ${full}`; return; }
    }
    const page = PAGES.find((v) => !$(`#v-${v}`).hidden);
    document.title = page ? `${ui('nav.' + page)} — ${full}` : `${full} — ${t(S.profile.role)}`;
  }

  function route() {
    let h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (_) { /* ignore */ }
    if (h.startsWith('p-')) {
      const p = projects().find((x) => x.id === h.slice(2));
      if (p) {
        if (current !== p.id) mediaIdx = 0;
        current = p.id;
        renderDetail(p);
        show('detail');
        updateTitle();
        return;
      }
    }
    current = null;
    show(PAGES.includes(h) ? h : 'home');
    updateTitle();
  }

  /* ---------- language switch ---------- */
  function setLang(l) {
    lang = l;
    safeSet('lang', lang);
    renderChrome();
    renderPages();
    if (current) { const p = S.projects.find((x) => x.id === current); if (p) renderDetail(p); }
    updateTitle();
  }
  $('#langsw').addEventListener('click', () => setLang(lang === 'th' ? 'en' : 'th'));

  /* รูปที่โหลดไม่ได้ -> เอารูปออก ให้เห็นกรอบว่างแทน */
  document.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.target.remove();
  }, true);

  /* ---------- start ---------- */
  buildSpace();
  renderChrome();
  renderPages();
  route();
  window.addEventListener('hashchange', route);
})();
