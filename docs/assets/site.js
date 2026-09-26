// Tolk — сайт: тема (система / вручную), язык, живой фон из частиц (field.js), который по мере прокрутки проходит
// звук → перевод → субтитры → цены, живые цены из магазина, «Купить» → бот, настоящие фразы Google / Tolk AI по очереди,
// настоящие субтитры Tolk, которые можно тянуть мышью, вопросы.
// Движение — GSAP ScrollTrigger + SplitText + Lenis. Без WebGL или GSAP всё видно и работает, просто спокойнее.
(function () {
  "use strict";
  const T = window.TOLK_TEXTS, CMP = window.TOLK_COMPARE || {};
  const LANGS = ["ru", "uk", "sk", "en"];
  const BOT = "TolkShopBot";
  const SHOP = /^(127\.0\.0\.1|localhost)$/.test(location.hostname) && location.port === "8787"
    ? location.origin : "https://tolk-shop.seth-gamingmain.workers.dev";
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  // «Меньше движения» в системе (в Windows — «Эффекты анимации» выключены): анимация остаётся, без инерционной прокрутки
  const gentle = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const motion = Boolean(window.gsap && window.ScrollTrigger);
  const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13m0 0-5-5m5 5-5 5"/></svg>';
  let field = null;

  // --- тема ---------------------------------------------------------------------------------------
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => (root.dataset.theme ? root.dataset.theme === "dark" : sysDark.matches);
  function paintMeta() {
    if (!root.dataset.theme) return;
    const c = root.dataset.theme === "dark" ? "#060708" : "#f2eee6";
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", c));
  }
  $("#theme").addEventListener("click", () => {
    const next = isDark() ? "light" : "dark";
    root.classList.add("theming");
    root.dataset.theme = next;
    try { localStorage.setItem("tolk-theme", next); } catch (e) { /* без хранилища */ }
    paintMeta();
    if (field) field.setTheme(next === "dark");
    setTimeout(() => root.classList.remove("theming"), 700);
  });
  sysDark.addEventListener("change", () => { if (!root.dataset.theme && field) field.setTheme(sysDark.matches); });
  paintMeta();

  // --- язык ---------------------------------------------------------------------------------------
  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("tolk-lang"); if (LANGS.includes(s)) return s; } catch (e) { /* без хранилища */ }
    const n = (navigator.language || "ru").slice(0, 2).toLowerCase();
    return n === "uk" ? "uk" : n === "sk" || n === "cs" ? "sk" : ["ru", "be", "kk"].includes(n) ? "ru" : "en";
  }
  const lang = pickLang();
  const tx = (k) => (T[lang] && T[lang][k] != null ? T[lang][k] : T.ru[k]);
  const fill = (s, v) => String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] == null ? "" : v[k]));
  const num = (n, d = 2) => {
    const s = (Math.round(Number(n) * 100) / 100).toFixed(d).replace(/\.00$/, "").replace(/(\.\d)0$/, "$1");
    return lang === "en" ? s : s.replace(".", ",");
  };
  const eur = (p) => (lang === "en" ? "€" + Number(p).toFixed(2) : Number(p).toFixed(2).replace(".", ",") + " €");
  const hrs = (h) => num(h, 1).replace(/[.,]0$/, "");
  const amount = (x, cur) => (cur === "UAH" ? x + " ₴" : cur === "⭐" ? x + " ⭐" : x + " " + cur);

  function applyTexts() {
    root.lang = lang;
    document.title = tx("title");
    if (lang !== "ru") {
      $$("[data-t]").forEach((el) => {
        const v = T[lang] && T[lang][el.dataset.t];
        if (v != null) el.innerHTML = v;
      });
    }
    $$(".langs button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $$(".js-buy").forEach((a) => { a.href = `https://t.me/${BOT}`; a.target = "_blank"; a.rel = "noopener"; });
  }
  $$(".langs button").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.setItem("tolk-lang", b.dataset.lang); } catch (e) { /* без хранилища */ }
    const u = new URL(location.href);
    u.searchParams.set("lang", b.dataset.lang);
    location.href = u.toString();                  // заново — фон и анимация перестраиваются под новый текст
  }));

  // типографика: тире не начинает строку, короткие предлоги и союзы не висят в конце строки
  const SHORT = /(^|[\s(«„“])(в|к|с|у|о|и|а|я|й|з|на|не|по|за|из|от|до|но|ни|та|же|для|без|при|под|над|про|что|как|v|k|s|z|o|a|i|u|na|do|po|za|od|so|ku|pre|pri|zo|the|a|an|to|in|on|of|at|by|and|or|is)\s+/gi;
  function typograph(scope) {
    const w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach((n) => {
      const t = n.nodeValue.replace(/\s+([—–])(?=\s)/g, " $1").replace(SHORT, "$1$2 ").replace(SHORT, "$1$2 ");
      if (t !== n.nodeValue) n.nodeValue = t;
    });
  }

  // --- глава «Перевод»: настоящие фразы по очереди (оригинал → Google → Tolk AI) ------------------------------
  const ROWS = CMP[lang] || CMP.ru;
  const CMP_MS = 5600;
  let cmpIdx = 0, cmpActive = false, cmpAt = 0;
  const pad = (n) => String(n).padStart(2, "0");
  function renderCompare() {
    const box = $(".cmp-rows");
    box.innerHTML = `<div class="src"><dt>${tx("src_lbl")}</dt><dd></dd></div>`
      + `<div class="g"><dt>${tx("who_g")}</dt><dd></dd></div>`
      + `<div class="t"><dt>${tx("who_t")}</dt><dd></dd></div>`;
    showRow(0, false);
    $(".js-cmp-prev").addEventListener("click", () => { showRow(cmpIdx - 1); });
    $(".js-cmp-next").addEventListener("click", () => { showRow(cmpIdx + 1); });
  }
  function showRow(i, animate = true) {
    cmpIdx = (i + ROWS.length) % ROWS.length;
    cmpAt = performance.now();
    const row = ROWS[cmpIdx];
    $(".js-cmp-n").textContent = `${pad(cmpIdx + 1)} / ${pad(ROWS.length)}`;
    $$(".cmp-rows dd").forEach((dd, k) => {
      const put = () => { dd.textContent = row[k]; typograph(dd); };
      if (!animate) return put();
      setTimeout(() => {
        dd.classList.add("swap");
        setTimeout(() => { put(); dd.classList.remove("swap"); }, 380);
      }, k * 110);
    });
  }
  function tickCompare(now) {
    const barI = $(".cmp-bar i");
    const p = cmpActive ? Math.min(1, (now - cmpAt) / CMP_MS) : 0;
    barI.style.transform = `scaleX(${p})`;
    if (!cmpActive) cmpAt = now;
    else if (p >= 1) showRow(cmpIdx + 1);
    requestAnimationFrame(tickCompare);
  }

  // --- глава «Субтитры»: настоящие кадры Tolk; их можно тянуть мышью, частицы светятся под ними -------------
  const STYLES = ["graphite", "glass", "classic", "cinema", "yellow", "light"];
  const subLive = $(".sub-live"), subImg = $(".sub-live img");
  let styleIdx = 0, styleTouched = false;
  function setStyle(i) {
    styleIdx = i;
    $$(".js-styles button").forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    subImg.src = `img/app/${lang}/style-${STYLES[i]}.png`;
  }
  function renderStyles() {
    const bar = $(".js-styles");
    const names = tx("styles");
    bar.innerHTML = STYLES.map((s, i) => `<button type="button" aria-pressed="${i === 0}">${names[i]}</button>`).join("");
    $$("button", bar).forEach((b, i) => b.addEventListener("click", () => { styleTouched = true; setStyle(i); }));
    STYLES.forEach((s) => { const im = new Image(); im.src = `img/app/${lang}/style-${s}.png`; });
    setStyle(0);
  }

  // --- вопросы -------------------------------------------------------------------------------------------
  function renderFaq() {
    const box = $(".js-faq");
    const items = tx("faq").map(([q, a]) => `<details><summary>${q}</summary><div class="a"><p>${a}</p></div></details>`);
    const half = Math.ceil(items.length / 2);
    box.innerHTML = `<div class="col">${items.slice(0, half).join("")}</div><div class="col">${items.slice(half).join("")}</div>`;
    $$(".js-buy", box).forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    $$("details", box).forEach((d) => {
      const s = $("summary", d), a = $(".a", d);
      s.addEventListener("click", (e) => {
        if (!window.gsap) return;
        e.preventDefault();
        if (d.open) gsap.to(a, { height: 0, duration: .5, ease: "power3.inOut", onComplete: () => { d.open = false; a.style.height = ""; refreshSoon(); } });
        else { d.open = true; gsap.fromTo(a, { height: 0 }, { height: a.scrollHeight, duration: .7, ease: "expo.out", onComplete: () => { a.style.height = ""; refreshSoon(); } }); }
      });
    });
  }

  // --- цены (живой курс из магазина; без ответа — запасные) ----------------------------------------------
  const FALLBACK = {
    plans: [
      { id: "week", price: "1.99", stars: 155, days: 7, period_h: 7.5, per_month: null, save: 0 },
      { id: "month", price: "6.99", stars: 555, days: 31, period_h: 30, per_month: 6.99, save: 0 },
      { id: "quarter", price: "17.49", stars: 1395, days: 92, period_h: 90, per_month: 5.83, save: 17 },
      { id: "half", price: "29.99", stars: 2395, days: 183, period_h: 180, per_month: 5, save: 28 },
      { id: "year", price: "49.99", stars: 3995, days: 366, period_h: 360, per_month: 4.17, save: 40, best: true },
    ],
    topups: [{ id: "h8", hours: 7.5, price: "1.49" }, { id: "h30", hours: 30, price: "3.99" }, { id: "h75", hours: 75, price: "7.99" }],
    methods: [], month_h: 30,
  };
  let catalog = null;
  async function loadPrices() {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 6000);
      const r = await fetch(`${SHOP}/api/plans?v=2&lang=${lang}`, { signal: ctl.signal });
      clearTimeout(timer);
      if (r.ok) catalog = await r.json();
    } catch (e) { /* магазин не ответил — запасные цены */ }
    renderPrices();
  }
  function altPrices(id, stars) {
    const get = (want) => {
      const m = catalog && catalog.methods && catalog.methods.find((x) => x.id === want || (want === "card" && x.currency === "UAH"));
      const p = m && m.prices && m.prices[id];
      return p && p.price && !p.unavailable ? amount(want === "stars" ? p.price : num(p.price, 2), p.currency) : "";
    };
    const a = [get("card"), get("stars") || (stars ? stars + " ⭐" : "")].filter(Boolean);
    const b = [get("usdt"), get("ton")].filter(Boolean);
    return (a.length ? `<span>≈ ${a.join(" · ")}</span>` : "") + (b.length ? `<span>${b.join(" · ")}</span>` : "");
  }
  function renderPrices() {
    const c = catalog || FALLBACK;
    const box = $(".js-plans");
    const monthH = c.month_h || 30;
    box.innerHTML = c.plans.map((p) => {
      const title = (tx("plan") || {})[p.id] || p.title || p.id;
      const hours = p.days < 28 ? fill(tx("h_week"), { h: hrs(p.period_h) })
        : p.days < 40 ? fill(tx("h_month"), { h: hrs(p.period_h) })
        : fill(tx("h_long"), { h: hrs(p.period_h), m: hrs(monthH) });
      const pm = p.days < 28 ? tx("per_week") : p.days < 40 ? "" : fill(tx("per_month"), { p: eur(p.per_month) });
      const save = p.save ? `<span class="save">${fill(tx("save"), { n: p.save })}</span>` : "";
      return `<article class="plan${p.best ? " best" : ""}">
        <div class="nm"><span>${title}</span>${save}</div>
        <p class="price">${eur(p.price)}</p>
        <p class="pm">${pm}</p>
        <p class="hours">${hours}</p>
        <p class="alt">${altPrices(p.id, p.stars)}</p>
        <a class="buy" href="https://t.me/${BOT}?start=p_${p.id}" target="_blank" rel="noopener">${tx("buy")}${ARR}</a>
      </article>`;
    }).join("");
    $(".js-topups").innerHTML = (c.topups || []).map((t) => `<b>${fill(tx("topup"), { h: hrs(t.hours), p: eur(t.price) })}</b>`).join(" · ");
  }

  // --- прокрутка → состояние фона и линия прогресса ------------------------------------------------------
  let marks = [];
  function measure() {
    marks = $$("[data-state]").map((el) => ({ s: Number(el.dataset.state), top: el.getBoundingClientRect().top + scrollY }));
  }
  function stateAt(y) {
    const vh = innerHeight;
    let s = marks.length ? marks[0].s : 0;
    for (let j = 1; j < marks.length; j++) {
      const a = marks[j].top - vh * 0.85, b = marks[j].top - vh * 0.2;
      if (y <= a) break;
      s = marks[j - 1].s + Math.min(1, (y - a) / (b - a)) * (marks[j].s - marks[j - 1].s);
    }
    return s;
  }
  const nav = $("#nav"), bar = $(".progress i");
  function onScroll() {
    const y = scrollY, s = stateAt(y);
    if (field) field.setTarget(s);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("scrolled", y > 20);
    cmpActive = Math.abs(s - 2) < 0.45;
  }
  let refreshTimer = 0;
  function refreshSoon() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => { measure(); if (window.ScrollTrigger) ScrollTrigger.refresh(); onScroll(); }, 120);
  }

  // субтитры: видны, пока фон — в состоянии «Субтитры»; тянутся мышью или пальцем, свечение из частиц идёт следом
  const drag = { cx: 0, cy: 0, w: 0, on: false, dx: 0, dy: 0, moved: false };
  let subShown = -1, autoAt = 0;
  const subH = () => drag.w * ((subImg.naturalHeight / subImg.naturalWidth) || 0.0962);
  function placeSub(cur) {
    const o = Math.max(0, Math.min(1, 1 - Math.abs(cur - 3) * 3.2));
    if (o <= 0.001 && subShown === 0 && !drag.on) return o;
    subShown = o > 0.001 ? 1 : 0;
    const h = subH();
    subLive.style.width = drag.w + "px";
    subLive.style.transform = `translate3d(${drag.cx - drag.w / 2}px, ${drag.cy - h / 2 + (cur - 3) * -46}px, 0) scale(${0.96 + 0.04 * o})`;
    subLive.style.opacity = o.toFixed(3);
    subLive.style.filter = o < 1 ? `blur(${((1 - o) * 10).toFixed(2)}px)` : "none";
    subLive.classList.toggle("grab", o > 0.6);
    return o;
  }
  function onField(cur, rebuilt) {
    if (rebuilt || !drag.w) {
      const d = field.subDefault();
      Object.assign(drag, { cx: d.cx, cy: d.cy, w: d.w });
      field.setSub(drag.cx, drag.cy, drag.w);
    }
    const o = placeSub(cur);
    // пока посетитель смотрит на главу и ничего не выбрал — стили сменяются сами
    const now = performance.now();
    if (o > 0.95 && !styleTouched && !drag.on && now - autoAt > 2800) { autoAt = now; setStyle((styleIdx + 1) % STYLES.length); }
    if (o < 0.5) autoAt = now;
  }
  subLive.addEventListener("pointerdown", (e) => {
    if (!subLive.classList.contains("grab")) return;
    drag.on = true; drag.dx = e.clientX - drag.cx; drag.dy = e.clientY - drag.cy;
    subLive.setPointerCapture(e.pointerId);
    subLive.classList.add("dragging");
    e.preventDefault();
  });
  subLive.addEventListener("pointermove", (e) => {
    if (!drag.on) return;
    const hw = drag.w / 2, hh = subH() / 2;
    drag.cx = Math.max(hw + 8, Math.min(innerWidth - hw - 8, e.clientX - drag.dx));
    drag.cy = Math.max(hh + 70, Math.min(innerHeight - hh - 8, e.clientY - drag.dy));
    if (field) { field.setSub(drag.cx, drag.cy, drag.w); placeSub(field.state); }
    if (!drag.moved) { drag.moved = true; subLive.classList.add("moved"); }
  });
  const endDrag = () => { drag.on = false; subLive.classList.remove("dragging"); };
  subLive.addEventListener("pointerup", endDrag);
  subLive.addEventListener("pointercancel", endDrag);

  // --- фон -----------------------------------------------------------------------------------------------
  async function startField() {
    const canvas = $("#field");
    if (!window.TolkField) { root.classList.add("no-gl"); return; }
    const fonts = document.fonts ? Promise.all([
      document.fonts.load('400 80px "EB Garamond"'), document.fonts.load('italic 400 80px "EB Garamond"'),
    ]) : Promise.resolve();
    await Promise.race([fonts, new Promise((r) => setTimeout(r, 1800))]);
    const small = innerWidth < 760, cores = navigator.hardwareConcurrency || 4;
    try {
      field = TolkField.create(canvas, { count: small ? 42000 : cores <= 4 ? 70000 : 100000, dark: isDark() });
    } catch (e) { console.warn(e); field = null; }
    if (!field) { root.classList.add("no-gl"); return; }
    field.jump(stateAt(scrollY));
    field.onFrame(onField);
    root.classList.add("live-on");
    subImg.addEventListener("load", () => placeSub(field.state));
  }

  // --- движение --------------------------------------------------------------------------------------------
  function magnetic(els) {
    if (!matchMedia("(pointer: fine)").matches) return;
    els.forEach((b) => {
      const xTo = gsap.quickTo(b, "x", { duration: .7, ease: "power3" }), yTo = gsap.quickTo(b, "y", { duration: .7, ease: "power3" });
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * .2); yTo((e.clientY - r.top - r.height / 2) * .3);
      });
      b.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
    });
  }
  const lines = (el, vars) => {
    if (!window.SplitText) return gsap.from(el, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out", ...vars });
    return SplitText.create(el, { type: "lines", mask: "lines", linesClass: "sl", autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, { yPercent: 115, duration: 1.4, ease: "expo.out", stagger: .1, ...vars }) });
  };

  let lenis = null;
  function runMotion() {
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
    if (window.Lenis && !gentle) {
      lenis = new Lenis({ lerp: .085, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      const t = id === "#top" ? 0 : $(id);
      if (t == null || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(t, { duration: 1.8 });
    }));

    // главы: строки заголовка из-под маски, остальное — следом; при уходе глава тает и размывается
    $$(".chapter").forEach((ch) => {
      const card = $(".card", ch);
      const st = { trigger: ch, start: "top 42%", toggleActions: "play none none reverse" };
      lines($(".display", card), { scrollTrigger: st });
      gsap.from($$(".eyebrow, .body, .spec > div, .cmp-nav, .note, .chips", card), { y: 26, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .06, scrollTrigger: st });
      gsap.to(card, { opacity: 0, y: -60, filter: "blur(8px)", ease: "none",
        scrollTrigger: { trigger: ch, start: "bottom 99%", end: "bottom 64%", scrub: true } });
    });
    // первый экран уходит вверх, растворяясь
    gsap.to(".hero .inner", { y: -80, opacity: 0, filter: "blur(6px)", ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 30%", scrub: true } });

    // цены и вопросы
    $$(".pricing .display, .outro .final .display").forEach((h) => lines(h, { scrollTrigger: { trigger: h, start: "top 85%", once: true } }));
    gsap.from($$(".pricing .eyebrow, .pricing .head .body, .outro .eyebrow"), { y: 24, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .08,
      scrollTrigger: { trigger: ".pricing", start: "top 70%", once: true } });
    ScrollTrigger.batch(".plan, .faq details, .colophon > div, .pay-notes p, .final-cta", { start: "top 92%", once: true,
      onEnter: (els) => gsap.from(els, { y: 34, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .06 }) });

    magnetic($$(".hero .btn, .final .btn"));
    addEventListener("load", refreshSoon);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshSoon);
  }

  function intro() {
    const boot = $("#boot");
    boot.classList.add("done");
    if (field) field.start();
    if (!motion) return;
    const tl = gsap.timeline({ defaults: { ease: "expo.out" }, delay: .15 });
    tl.from(".nav > *", { y: -14, opacity: 0, duration: 1.2, stagger: .05 }, 0)
      .add(() => { lines($(".js-h1"), { delay: 0 }); }, .1)
      .from(".hero [data-in]", { y: 28, opacity: 0, duration: 1.4, stagger: .1 }, .45)
      .from(".progress", { opacity: 0, duration: 1.4, clearProps: "opacity" }, .8);
  }

  // --- старт ---------------------------------------------------------------------------------------------
  applyTexts();
  renderCompare();
  renderStyles();
  renderFaq();
  renderPrices();
  $$(".display, .lede, .body, .faq, .fine, .pay-notes, .spec dd").forEach(typograph);
  measure();
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", refreshSoon);
  onScroll();
  if (motion) runMotion();
  const booted = startField();
  Promise.race([booted, new Promise((r) => setTimeout(r, 3000))]).then(() => { measure(); onScroll(); intro(); });
  loadPrices().then(refreshSoon);
  requestAnimationFrame(tickCompare);

  // проверка скриншотами: ?shot=<px> — прокрутить туда сразу после загрузки
  const shot = Number(new URLSearchParams(location.search).get("shot"));
  if (shot) setTimeout(() => { scrollTo(0, shot); if (field) field.jump(stateAt(shot)); onScroll(); }, 3400);
})();
