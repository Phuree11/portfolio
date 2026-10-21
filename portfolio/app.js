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

  const visibleProjects = () => S.projects.filter((p) => !p.hidden);

  /* ---------- render ---------- */
  function renderStatic() {
    document.documentElement.lang = lang;
    document.title = `${S.profile.name} — ${t(S.profile.role)}`;

    $$('[data-i18n]').forEach((el) => { el.textContent = ui(el.dataset.i18n); });
    $$('.top [data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));

    $('#brand').textContent = S.profile.name.toUpperCase();
    $('#hero-eyebrow').textContent = `${t(S.profile.role)} · ${S.profile.org}`;
    $('#hero-name').textContent = S.profile.name;
    $('#hero-tagline').textContent = t(S.profile.tagline);
    $('#foot-text').textContent = `© ${new Date().getFullYear()} ${S.profile.name} — ${S.profile.org}`;
  }

  function renderProjects() {
    const list = visibleProjects();
    const grid = $('#project-grid');
    if (!list.length) { grid.innerHTML = `<p class="empty">${esc(ui('projects.empty'))}</p>`; return; }

    grid.innerHTML = list.map((p, i) => `
      <button type="button" class="card a-${esc(p.accent || 'y')}" data-id="${esc(p.id)}">
        <span class="cover" data-empty="${esc(ui('modal.noImage'))}">
          ${p.cover ? `<img src="${esc(p.cover)}" alt="" loading="lazy">` : ''}
        </span>
        <span class="c-body">
          <span class="c-meta"><span class="c-no">${String(i + 1).padStart(2, '0')}</span><span class="c-tag">${esc(t(p.tag))}</span></span>
          <span class="c-title">${esc(t(p.title))}</span>
          <span class="c-sum">${esc(t(p.summary))}</span>
          <span class="c-open">${esc(ui('projects.open'))} →</span>
        </span>
      </button>`).join('');
  }

  function renderAbout() {
    $('#about-bio').innerHTML = S.about.bio.map((b) => `<p>${esc(t(b))}</p>`).join('');
    $('#about-skills').innerHTML = S.about.skills.map((g) => `
      <div class="sk-group">
        <h3>${esc(t(g.title))}</h3>
        <ul>${g.items.map((it) => `<li>${esc(t(it))}</li>`).join('')}</ul>
      </div>`).join('');
  }

  function renderContact() {
    $('#contact-lead').textContent = t(S.contact.lead);
    $('#contact-list').innerHTML = S.contact.items.map((c) => `
      <li><a href="${esc(safeUrl(c.url))}" target="_blank" rel="noopener">
        <span class="k">${esc(c.label)}</span><span class="v">${esc(c.value)}</span><span class="ar">↗</span>
      </a></li>`).join('');
  }

  function mediaHtml(m) {
    if (m.type === 'youtube') {
      return `<figure class="media vid"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.id)}" title="video" loading="lazy" allowfullscreen></iframe></figure>`;
    }
    if (m.type === 'video') {
      return `<figure class="media vid"><video src="${esc(m.src)}" controls muted playsinline preload="metadata"></video></figure>`;
    }
    return `<figure class="media" data-empty="${esc(ui('modal.noImage'))}"><img src="${esc(m.src)}" alt="${esc(t(m.caption))}" loading="lazy">${m.caption ? `<figcaption>${esc(t(m.caption))}</figcaption>` : ''}</figure>`;
  }

  function renderModal(p) {
    const meta = [
      ['modal.role', t(p.role)], ['modal.year', p.year], ['modal.status', t(p.status)]
    ].filter(([, v]) => v).map(([k, v]) => `<div><dt>${esc(ui(k))}</dt><dd>${esc(v)}</dd></div>`).join('');

    const media = (p.media && p.media.length)
      ? p.media.map(mediaHtml).join('')
      : (p.cover ? mediaHtml({ type: 'image', src: p.cover }) : '');

    const links = (p.links && p.links.length)
      ? `<div class="m-links"><h3>${esc(ui('modal.links'))}</h3>${p.links.map((l) => `<a class="btn g" href="${esc(safeUrl(l.url))}" target="_blank" rel="noopener">${esc(t(l.label))} ↗</a>`).join('')}</div>`
      : '';

    $('#m-inner').className = `m-inner a-${p.accent || 'y'}`;
    $('#m-inner').innerHTML = `
      <div class="m-bar">
        <div class="lang" role="group" aria-label="Language">
          <button type="button" data-lang="th" aria-pressed="${lang === 'th'}">TH</button><span aria-hidden="true">/</span><button type="button" data-lang="en" aria-pressed="${lang === 'en'}">EN</button>
        </div>
        <button type="button" class="m-close" aria-label="${esc(ui('modal.close'))}">${esc(ui('modal.close'))} ✕</button>
      </div>
      <p class="m-tag">${esc(t(p.tag))}</p>
      <h2 id="m-title">${esc(t(p.title))}</h2>
      <p class="m-sum">${esc(t(p.summary))}</p>
      <dl class="m-meta">${meta}</dl>
      <div class="m-media">${media}</div>
      <div class="m-secs">${(p.sections || []).map((s) => `<section><h3>${esc(t(s.h))}</h3><p>${esc(t(s.p))}</p></section>`).join('')}</div>
      ${links}`;
  }

  /* ---------- modal ---------- */
  const dlg = $('#modal');
  let openId = null;

  function openProject(id) {
    const p = S.projects.find((x) => x.id === id);
    if (!p) return;
    openId = id;
    renderModal(p);
    if (!dlg.open) dlg.showModal();
    dlg.scrollTop = 0;
    history.replaceState(null, '', `#p-${id}`);
  }

  function closeProject() { if (dlg.open) dlg.close(); }

  dlg.addEventListener('close', () => {
    openId = null;
    history.replaceState(null, '', location.pathname + location.search);
  });
  dlg.addEventListener('click', (e) => {
    const lb = e.target.closest('[data-lang]');
    if (lb) { setLang(lb.dataset.lang); return; }
    if (e.target === dlg || e.target.closest('.m-close')) closeProject();
  });

  /* รูปที่โหลดไม่ได้ -> เอารูปออก ให้เห็นกรอบว่างแทน */
  document.addEventListener('error', (e) => {
    const el = e.target;
    if (el && el.tagName === 'IMG') el.remove();
  }, true);

  /* ---------- events ---------- */
  $('#project-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (card) openProject(card.dataset.id);
  });

  function setLang(l) {
    lang = l;
    safeSet('lang', lang);
    renderAll();
  }
  $$('.top [data-lang]').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));

  function renderAll() {
    renderStatic();
    renderProjects();
    renderAbout();
    renderContact();
    if (openId) { const p = S.projects.find((x) => x.id === openId); if (p) renderModal(p); }
  }

  renderAll();
  if (location.hash.startsWith('#p-')) openProject(location.hash.slice(3));
})();
