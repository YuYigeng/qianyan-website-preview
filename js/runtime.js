/* eslint-disable */
/*
 * runtime.js — index page interactivity
 *
 * Responsibilities:
 *   - Render the catalogue index from window.QY_PRODUCTS
 *   - Filter by group + free-text search
 *   - Wire the product modal (open / close / focus / Esc / focus return)
 *   - Drive locale switching (default 中文; EN <-> zh swap)
 *   - Drive the contact form (mailto fallback; validation status)
 *   - Track which section is active in the top nav
 *
 * No external dependencies, no framework. No internal codes in UI.
 */

(function () {
  'use strict';

  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ---------- helpers ----------
  const pick = (obj) => {
    const locale = document.body.getAttribute('data-locale') || 'zh';
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
      return obj[locale] != null ? obj[locale] : obj.en;
    }
    return obj;
  };

  const escapeHtml = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const fmtSpec = (row) => `${pick(row.k)}: ${pick(row.v)}`;

  // ---------- catalogue index ----------
  const products = window.QY_PRODUCTS || [];
  const listEl = $('#indexList');
  const emptyEl = $('#indexEmpty');
  const filterBtns = $$('.index__filter [data-filter]');
  const searchInput = $('#searchInput');
  let activeFilter = 'all';
  let activeSearch = '';

  // group short labels for the row code column (no internal codes)
  const GROUP_CODE = {
    metals: 'M',
    minerals: 'N',
    'energy-chemicals': 'E',
    fertilizers: 'F',
    agriculture: 'A',
  };

  function renderRows() {
    if (!listEl) return;

    const filtered = products
      .filter((p) => activeFilter === 'all' || p.group === activeFilter)
      .filter((p) => {
        if (!activeSearch) return true;
        const blob = [
          p.name.en, p.name.zh,
          p.subtitle && p.subtitle.en, p.subtitle && p.subtitle.zh,
          (p.specs || []).map(fmtSpec).join(' / '),
          p.origin ? pick(p.origin) : '',
        ].filter(Boolean).join(' ').toLowerCase();
        return blob.includes(activeSearch.toLowerCase());
      });

    listEl.innerHTML = filtered.map((p) => {
      // Ordinal row number only — no internal category code prefixes.
      const code = String(p.order).padStart(2, '0');
      const headSpec = p.specs && p.specs[0] ? fmtSpec(p.specs[0]) : '';
      const origin = p.origin ? pick(p.origin) : '';
      return `
      <a class="index__row" data-id="${escapeHtml(p.id)}" data-group="${escapeHtml(p.group)}" role="listitem" tabindex="0">
        <span class="index__row__code">${escapeHtml(code)}</span>
        <span class="index__row__name">
          <b><span class="en">${escapeHtml(p.name.en || '')}</span><span class="zh">${escapeHtml(p.name.zh || '')}</span></b>
          <span><span class="en">${escapeHtml((p.subtitle && p.subtitle.en) || '')}</span><span class="zh">${escapeHtml((p.subtitle && p.subtitle.zh) || '')}</span></span>
        </span>
        <span class="index__row__spec">${escapeHtml(headSpec)}</span>
        <span class="index__row__origin">${escapeHtml(origin)}</span>
        <span class="index__row__arrow" aria-hidden="true">→</span>
      </a>`;
    }).join('');

    if (emptyEl) emptyEl.hidden = filtered.length > 0;

    $$('.index__row', listEl).forEach((row) => {
      row.addEventListener('click', (e) => {
        e.preventDefault();
        openProductModal(row.getAttribute('data-id'));
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProductModal(row.getAttribute('data-id'));
        }
      });
    });
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const f = btn.getAttribute('data-filter');
      activeFilter = f;
      filterBtns.forEach((b) => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
      renderRows();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      activeSearch = searchInput.value.trim();
      renderRows();
    });
  }

  // ---------- modal ----------
  const modal = $('#productModal');
  const modalImg = $('#modalImg');
  const modalCode = $('#modalCode');
  const modalTitle = $('#modalTitle');
  const modalSubtitle = $('#modalSubtitle');
  const modalSpecs = $('#modalSpecs');
  const modalBlurb = $('#modalBlurb');
  const modalInquire = $('#modalInquire');
  let lastFocus = null;

  function openProductModal(id) {
    const p = products.find((x) => x.id === id);
    if (!p || !modal) return;
    lastFocus = document.activeElement;

    modalImg.src = p.image;
    modalImg.alt = pick(p.name);
    const family = window.QY_GROUPS.find((g) => g.id === p.group);
    modalCode.textContent = `${String(p.order).padStart(2, '0')} · ${family ? pick(family.label) : ''}`;
    modalTitle.innerHTML = `<span class="en">${escapeHtml(pick(p.name))}</span><span class="zh">${escapeHtml(pick(p.name))}</span>`;
    modalSubtitle.innerHTML = `<span class="en">${escapeHtml((p.subtitle && p.subtitle.en) || '')}</span><span class="zh">${escapeHtml((p.subtitle && p.subtitle.zh) || '')}</span>`;
    modalSpecs.innerHTML = (p.specs || []).map((s) => `
      <div>
        <dt>${escapeHtml(pick(s.k))}</dt>
        <dd>${escapeHtml(pick(s.v))}</dd>
      </div>
    `).join('');
    if (p.origin) {
      modalSpecs.innerHTML += `
      <div>
        <dt>${escapeHtml(document.body.getAttribute('data-locale') === 'zh' ? '来源地' : 'Origin')}</dt>
        <dd>${escapeHtml(pick(p.origin))}</dd>
      </div>`;
    }
    modalBlurb.textContent = p.blurb || '';

    // Compose mailto: product name + grade hint, addressed to gang@
    const productName = pick(p.name);
    const subject = `${document.body.getAttribute('data-locale') === 'zh' ? '询盘' : 'Inquiry'} · ${productName}`;
    const greet = document.body.getAttribute('data-locale') === 'zh' ? '您好：' : 'Hello,';
    const body = [
      `${greet}`,
      ``,
      `${document.body.getAttribute('data-locale') === 'zh' ? '我们对' : "I'm interested in "}${productName}${document.body.getAttribute('data-locale') === 'zh' ? '感兴趣，希望取得进一步资料。' : ' — could you share grade, price indications and origin options?'}`,
      ``,
      `${document.body.getAttribute('data-locale') === 'zh' ? '目标等级 / 规格：' : 'Target grade / spec:'}`,
      `${document.body.getAttribute('data-locale') === 'zh' ? '目标数量：' : 'Target quantity:'}`,
      `${document.body.getAttribute('data-locale') === 'zh' ? '目的港口：' : 'Target port:'}`,
      ``,
      `${document.body.getAttribute('data-locale') === 'zh' ? '谢谢。' : 'Thanks,'}`,
    ].join('\n');
    modalInquire.href = `mailto:gang@qianyanholding.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    modal.setAttribute('data-open', 'true');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }, 0);
  }

  function closeProductModal() {
    if (!modal) return;
    modal.setAttribute('data-open', 'false');
    document.body.style.overflow = '';
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProductModal();
    });
    const closeBtn = modal.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', closeProductModal);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.getAttribute('data-open') === 'true') closeProductModal();
    });
  }

  // ---------- locale switching ----------
  const langBtns = $$('[data-set-locale]');
  const SEARCH_PH = { zh: '按名称 / 规格 / 来源搜索', en: 'Search name, spec, origin' };
  function setLocale(loc) {
    if (loc !== 'en' && loc !== 'zh') return;
    document.body.setAttribute('data-locale', loc);
    document.documentElement.setAttribute('lang', loc === 'zh' ? 'zh-Hans' : 'en');
    langBtns.forEach((b) => b.setAttribute('aria-pressed', b.getAttribute('data-set-locale') === loc ? 'true' : 'false'));
    if (searchInput) searchInput.placeholder = SEARCH_PH[loc] || '';
    renderRows();
  }
  langBtns.forEach((b) => b.addEventListener('click', () => setLocale(b.getAttribute('data-set-locale'))));

  // initialize placeholder from current locale
  if (searchInput) searchInput.placeholder = SEARCH_PH[document.body.getAttribute('data-locale') || 'zh'] || '';

  // ---------- contact form ----------
  const form = $('#contactForm');
  const formStatus = $('#contactFormStatus');
  const lineSelect = form ? form.querySelector('select[name="line"]') : null;

  const options = products.map((p) => {
    const code = String(p.order).padStart(2, '0');
    return { value: p.id, code, name: pick(p.name) };
  });

  function rebuildLineSelect() {
    if (!lineSelect) return;
    const loc = document.body.getAttribute('data-locale') || 'zh';
    const placeholder = loc === 'zh' ? '— 综合咨询 —' : '— General inquiry —';
    lineSelect.innerHTML = `<option value="">${escapeHtml(placeholder)}</option>` +
      options.map((opt) => `<option value="${escapeHtml(opt.value)}">${escapeHtml(opt.code)} · ${escapeHtml(opt.name)}</option>`).join('');
    lineSelect.setAttribute('data-default-placeholder', placeholder);
  }

  if (lineSelect) lineSelect.dataset.value = '';

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      if (!name || !email) {
        formStatus.textContent = document.body.getAttribute('data-locale') === 'zh'
          ? '请填写姓名与邮箱。' : 'Name and email are required.';
        return;
      }
      const productId = (data.get('line') || '').toString();
      const product = products.find((p) => p.id === productId);
      const productLabel = product ? pick(product.name) : (document.body.getAttribute('data-locale') === 'zh' ? '综合' : 'General');
      const loc = document.body.getAttribute('data-locale') || 'zh';
      const subject = loc === 'zh' ? `询盘 · ${productLabel} · ${name}` : `Inquiry · ${productLabel} · ${name}`;
      const body = [
        loc === 'zh' ? `姓名：${name}` : `Name: ${name}`,
        loc === 'zh' ? `公司：${data.get('company') || ''}` : `Company: ${data.get('company') || ''}`,
        loc === 'zh' ? `邮箱：${email}` : `Email: ${email}`,
        loc === 'zh' ? `电话：${data.get('phone') || ''}` : `Phone: ${data.get('phone') || ''}`,
        loc === 'zh' ? `产品：${productLabel}` : `Product: ${productLabel}`,
        '',
        loc === 'zh' ? '备注：' : 'Note:',
        data.get('note') || '',
      ].join('\n');
      const href = `mailto:gang@qianyanholding.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
      formStatus.textContent = loc === 'zh' ? '正在打开邮件客户端…' : 'Opening your mail client…';
    });
  }

  // ---------- nav filter links ----------
  $$('[data-filter-link]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const f = a.getAttribute('data-filter-link');
      if (!f) return;
      const btn = $$('.index__filter [data-filter]').find((b) => b.getAttribute('data-filter') === f);
      if (btn) btn.click();
    });
  });

  // ---------- scrollspy ----------
  const navLinks = $$('.nav a[href^="#"]');
  const sections = $$('main section[id], footer[id]');
  function setActiveNav(id) {
    navLinks.forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === '#' + id ? 'true' : 'false'));
  }
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveNav(visible[0].target.id);
    }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 });
    sections.forEach((s) => io.observe(s));
  }

  // ---------- mobile menu (light) ----------
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const nav = $('.nav');
      const isOpen = nav.classList.toggle('nav--open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // ---------- init ----------
  renderRows();
  rebuildLineSelect();

  // re-rebuild when locale changes
  const observer = new MutationObserver(() => {
    rebuildLineSelect();
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ['data-locale'] });

  // close-pop on click outside the menu-btn for the open nav
  document.addEventListener('click', (e) => {
    const nav = $('.nav');
    const btn = $('.menu-btn');
    if (!nav || !btn) return;
    if (nav.classList.contains('nav--open') && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('nav--open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();
