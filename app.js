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

  /* ---------- shared chrome (nav labels, hero, footer, switch) ---------- */
  function renderChrome() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach((el) => { el.textContent = ui(el.dataset.i18n); });

    const sw = $('#langsw');
    sw.setAttribute('aria-checked', String(lang === 'th'));
    $$('.lt', sw).forEach((el) => el.classList.toggle('on', el.dataset.l === lang));

    const cv = S.profile.cv, cvLink = $('#nav-cv');
    if (cv && cv.url) { cvLink.hidden = false; cvLink.href = safeUrl(cv.url); cvLink.textContent = t(cv.label) || 'CV'; }
    else cvLink.hidden = true;

    $('#hero-eyebrow').textContent = `${t(S.profile.role)} · ${S.profile.org}`;
    $('#hero-name').textContent = S.profile.name;
    $('#hero-tagline').textContent = t(S.profile.tagline);
    $('#foot-text').textContent = `© ${new Date().getFullYear()} ${S.profile.name} — ${S.profile.org}`;
  }

  /* ---------- home ---------- */
  function renderHome() {
    const list = projects();
    const grid = $('#project-grid');
    grid.innerHTML = list.length ? list.map((p) => {
      const meta = [t(p.status), t(p.period)].filter(Boolean).map((v) => `<span>${esc(v)}</span>`).join('');
      return `
      <a class="card" href="#p-${esc(p.id)}">
        <span class="tile thumb" data-ph="${esc(ui('detail.phSmall'))}">${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy">` : ''}</span>
        <span class="c-body">
          <span class="c-title">${esc(t(p.title))}</span>
          <span class="c-meta">${meta}</span>
          <span class="c-tag">${esc(t(p.tag))}</span>
          <span class="c-sum">${esc(t(p.summary))}</span>
        </span>
      </a>`;
    }).join('') : `<p class="empty">${esc(ui('work.empty'))}</p>`;

    $('#about-bio').innerHTML = S.about.bio.map((b) => `<p>${esc(t(b))}</p>`).join('');
    $('#about-skills').innerHTML = S.about.skills.map((g) => `
      <div class="sk-group">
        <h3>${esc(t(g.title))}</h3>
        <ul>${g.items.map((it) => `<li>${esc(t(it))}</li>`).join('')}</ul>
      </div>`).join('');

    $('#contact-lead').textContent = t(S.contact.lead);
    $('#contact-list').innerHTML = S.contact.items.map((c) => `
      <li><a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">
        <span class="k">${esc(c.label)}</span><span class="v">${esc(c.value)}</span><span class="ar">↗</span>
      </a></li>`).join('');
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
    }).join('');

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

    $('#detail').innerHTML = `
      <article class="proj">
        <div class="d-media ${others.length ? 'multi' : 'solo'}">
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

  $('#detail').addEventListener('click', (e) => {
    const th = e.target.closest('.tile.sm[data-i]');
    if (!th || !current) return;
    mediaIdx = Number(th.dataset.i);
    const p = S.projects.find((x) => x.id === current);
    if (p) renderDetail(p);
  });

  /* ---------- routing: "#p-id" = project page, anything else = home ---------- */
  let lastView = 'init';

  function showDetail(p) {
    if (current !== p.id) mediaIdx = 0;
    current = p.id;
    $('#home').hidden = true;
    $('#detail').hidden = false;
    $('#nav-back').hidden = false;
    renderDetail(p);
    document.title = `${t(p.title)} — ${S.profile.name}`;
    window.scrollTo(0, 0);
    lastView = 'detail';
  }

  function showHome(section) {
    current = null;
    $('#detail').hidden = true;
    $('#home').hidden = false;
    $('#nav-back').hidden = true;
    document.title = `${S.profile.name} — ${t(S.profile.role)}`;
    const el = section && document.getElementById(section);
    if (lastView !== 'home') {
      requestAnimationFrame(() => (el ? el.scrollIntoView({ behavior: 'auto' }) : window.scrollTo(0, 0)));
    }
    lastView = 'home';
  }

  function route() {
    let h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (_) { /* ignore */ }
    if (h.startsWith('p-')) {
      const p = projects().find((x) => x.id === h.slice(2));
      if (p) { showDetail(p); return; }
    }
    showHome(h);
  }

  /* ---------- language switch ---------- */
  function setLang(l) {
    lang = l;
    safeSet('lang', lang);
    renderChrome();
    renderHome();
    if (current) { const p = S.projects.find((x) => x.id === current); if (p) { renderDetail(p); document.title = `${t(p.title)} — ${S.profile.name}`; } }
    else document.title = `${S.profile.name} — ${t(S.profile.role)}`;
  }
  $('#langsw').addEventListener('click', () => setLang(lang === 'th' ? 'en' : 'th'));

  /* รูปที่โหลดไม่ได้ -> เอารูปออก ให้เห็นกรอบว่างแทน */
  document.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') e.target.remove();
  }, true);

  /* ---------- start ---------- */
  renderChrome();
  renderHome();
  route();
  window.addEventListener('hashchange', route);
})();
