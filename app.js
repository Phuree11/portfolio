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
        <ul${g.items.length > 6 ? ' class="two"' : ''}>${g.items.map((it) => `<li>${esc(t(it))}</li>`).join('')}</ul>
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
          <li>${c.url
            ? `<a href="${esc(safeUrl(c.url))}"${/^(mailto|tel):/i.test(c.url) ? '' : ' target="_blank" rel="noopener"'}>
                <span class="k">${esc(c.label)}</span><span class="v">${esc(c.value || '')}</span><span class="ar" aria-hidden="true">↗</span></a>`
            : `<div class="row"><span class="k">${esc(c.label)}</span><span class="v">${esc(c.value || '')}</span><span class="ar"></span></div>`}
          </li>`).join('')}
        </ul>
      </div>`).join('');
  }

  /* ---------- space background ----------
     Positions come from the Figma slides (1920 x 1080).
     ORBITS: c = orbit centre, r = radius, pages = which pages show it (shared orbits stay on screen between those pages)
       planet: a = start angle (degrees, 0 = right, 90 = down), s = size (0 = no body),
               ring = halo diameter, moons = [{ a, s }] small moons circling on the halo
     STARS: x, y = centre, s = size; they twinkle (fade in and out) slowly */
  const ORBITS = [
    // opening
    { c: [954.5, 539.5], r: 322.5, pages: 'home', planets: [{ a: -46.8, s: 33 }] },
    { c: [954, 533],     r: 541,   pages: 'home', planets: [{ a: 117.5, s: 56, ring: 124, moons: [{ a: -89.5, s: 19 }] }, { a: -1.2, s: 22 }] },
    { c: [960, 555],     r: 873,   pages: 'home', planets: [{ a: 197.4, s: 71 }] },
    // about + work (+ project page)
    { c: [17.5, 1028.5], r: 322.5, pages: 'about work detail', planets: [{ a: -28.5, s: 33 }] },
    { c: [1620.5, 176.5], r: 378.5, pages: 'about work detail', planets: [{ a: 114, s: 22 }] },
    // about
    { c: [1856.5, 762.5], r: 378.5, pages: 'about', planets: [{ a: 180, s: 28 }] },
    { c: [665, 1015],    r: 199,   pages: 'about', planets: [{ a: -72.6, s: 20 }] },
    { c: [754.5, 103.5], r: 322.5, pages: 'about', planets: [{ a: 19, s: 19 }] },
    // work
    { c: [373, 191],     r: 421,   pages: 'work', planets: [{ a: -10.5, s: 22 }] },
    { c: [1557.5, 972.5], r: 378.5, pages: 'work detail', planets: [{ a: 180, s: 28 }] },
    { c: [1073.5, 916.5], r: 322.5, pages: 'work', planets: [{ a: -28.1, s: 20, ring: 66, moons: [{ a: -19.5, s: 10 }] }] },
    // contact
    { c: [417, 211],     r: 392,   pages: 'contact', planets: [{ a: 3.8, s: 20 }] },
    { c: [362, 1080],    r: 362,   pages: 'contact', planets: [{ a: -38.6, s: 37, ring: 119, moons: [{ a: -45.7, s: 16 }] }] },
    { c: [1551, 125],    r: 457,   pages: 'contact', planets: [{ a: 113.4, s: 0, ring: 63, moons: [{ a: 129, s: 17 }, { a: -54, s: 13 }] }] },
    { c: [2075.5, 846.5], r: 378.5, pages: 'contact', planets: [{ a: 180, s: 28 }] },
    { c: [1518.5, 1079.5], r: 378.5, pages: 'contact', planets: [{ a: 180, s: 28 }] }
  ];

  const STARS = {
    home:    [[413, 801, 48], [1244.5, 169.5, 31], [794.5, 398.5, 31], [1303, 646, 56], [1649, 1034, 44], [391, 132, 44], [128, 540, 44], [1851.5, 204.5, 37]],
    about:   [[174, 527, 56], [949, 822, 44], [993, 505, 44], [1500, 127, 44], [1734, 612, 44], [1427.5, 1000.5, 57], [741, 163, 28]],
    'work detail': [[220.5, 711.5, 57], [628, 596, 42], [249, 93, 42], [1074, 144, 66], [1226, 565, 66], [819.5, 1027.5, 51], [1640.5, 800.5, 51]],
    contact: [[387.5, 838.5, 51], [128.5, 556.5, 65], [653.5, 268.5, 47], [1788.5, 439.5, 47], [1352.5, 124.5, 47], [1352.5, 896.5, 47], [1219.5, 557.5, 73], [960, 730, 58]]
  };

  // a 4-point sparkle, 1 x 1, centred on 0,0
  const SPARK = 'M0 -.5Q.06 -.06 .5 0Q.06 .06 0 .5Q-.06 .06 -.5 0Q-.06 -.06 0 -.5Z';

  function buildSpace() {
    const spin = (ox, oy, period, start, dir) => {
      const s = dir === 'normal' ? start : -start;
      const delay = -(((s % 360) + 360) % 360) / 360 * period;
      return `style="transform-origin:${ox}px ${oy}px;animation-duration:${period}s;animation-delay:${delay.toFixed(2)}s;animation-direction:${dir}"`;
    };
    const orbits = ORBITS.map((o, i) => {
      const [cx, cy] = o.c;
      const period = +(70 * Math.pow(o.r / 400, 1.5)).toFixed(1);   // bigger orbit = slower, like real planets
      const dir = i % 2 ? 'reverse' : 'normal';
      const planets = o.planets.map((p) => {
        const px = cx + o.r, py = cy;
        const moons = (p.moons || []).map((m, k) =>
          `<g class="pl" ${spin(px, py, 14 + k * 5, m.a - p.a, k % 2 ? 'reverse' : 'normal')}><circle class="dot" cx="${px + p.ring / 2}" cy="${py}" r="${m.s / 2}"/></g>`).join('');
        return `<g class="pl" ${spin(cx, cy, period, p.a, dir)}>
          ${p.ring ? `<circle class="halo" cx="${px}" cy="${py}" r="${p.ring / 2}"/>` : ''}
          ${p.s ? `<circle class="dot" cx="${px}" cy="${py}" r="${p.s / 2}"/>` : ''}
          ${moons}
        </g>`;
      }).join('');
      return `<g class="orbit" data-pages="${o.pages}"><circle class="ring" cx="${cx}" cy="${cy}" r="${o.r}"/>${planets}</g>`;
    }).join('');
    const stars = Object.entries(STARS).map(([pages, list]) => `<g class="orbit" data-pages="${pages}">${
      list.map(([x, y, s], i) => `<path class="star" d="${SPARK}" transform="translate(${x} ${y}) scale(${s})" style="animation-duration:${(4 + (i * 1.7) % 4).toFixed(1)}s;animation-delay:-${((i * 2.3) % 5).toFixed(1)}s"/>`).join('')
    }</g>`).join('');
    $('#space').innerHTML = `<svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" focusable="false">${orbits}${stars}</svg>`;
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
    }).join('') + Array.from({ length: list.length > 1 ? 0 : Math.max(0, 5 - others.length) },
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
  /* กดรีเฟรช = กลับไปหน้าเปิดเสมอ (ลิงก์ตรงอย่าง #p-bar-410 ที่เปิดครั้งแรกยังใช้ได้) */
  try {
    const nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type === 'reload' && location.hash) history.replaceState(null, '', location.pathname + location.search);
  } catch (_) { /* ignore */ }

  buildSpace();
  renderChrome();
  renderPages();
  route();
  window.addEventListener('hashchange', route);
})();
