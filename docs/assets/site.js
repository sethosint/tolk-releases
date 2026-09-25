// Tolk — сайт: тема (система / вручную), язык, живой фон из частиц (field.js), который по мере прокрутки проходит
// звук → речь → перевод → субтитры → цены, живые цены из магазина, «Купить» → бот, стили субтитров, вопросы.
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
    $(".js-pair").textContent = tx("pair");
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

  // --- глава III: одна фраза у Google и у Tolk AI ------------------------------------------------------
  const phrase = (CMP[lang] || CMP.ru)[0];
  function renderCompare() {
    const box = $(".js-cmp");
    if (box) box.innerHTML = `<div class="src"><dt>${tx("src_lbl")}</dt><dd>${phrase[0]}</dd></div>`
      + `<div class="g"><dt>${tx("who_g")}</dt><dd>${phrase[1]}</dd></div>`
      + `<div class="t"><dt>${tx("who_t")}</dt><dd>${phrase[2]}</dd></div>`;
  }

  // --- глава IV: стили субтитров (настоящие кадры программы) ---------------------------------------------
  const STYLES = ["graphite", "glass", "classic", "cinema", "yellow", "light"];
  const subImg = $(".sub-live img");
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

  // --- прокрутка → состояние фона, линия прогресса, главы, метка внизу -------------------------------------
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
  const nav = $("#nav"), bar = $(".progress i"), hs = $(".js-hs"), rails = $$(".rail li");
  let lastIdx = -1;
  function onScroll() {
    const y = scrollY, s = stateAt(y);
    if (field) field.setTarget(s);
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("scrolled", y > 20);
    const idx = Math.round(s);
    if (idx !== lastIdx) {
      lastIdx = idx;
      rails.forEach((li) => li.classList.toggle("on", Number(li.dataset.rail) === idx));
      hs.textContent = tx("hs")[idx] || "";
    }
    root.classList.toggle("chrome-off", s > 4.6);         // внизу цены и подвал — метки не мешают тексту
  }
  let refreshTimer = 0;
  function refreshSoon() {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(() => { measure(); if (window.ScrollTrigger) ScrollTrigger.refresh(); onScroll(); }, 120);
  }

  // субтитры программы встают на плашку из частиц, пока фон — в состоянии IV
  const subLive = $(".sub-live");
  let subShown = -1, autoAt = 0;
  function onField(cur) {
    const r = field.subRect();
    if (!r) return;
    const o = Math.max(0, Math.min(1, 1 - Math.abs(cur - 4) * 3.4));
    if (o > 0.001 || subShown !== 0) {
      subShown = o > 0.001 ? 1 : 0;
      const w = r.win, b = r.bar;
      subLive.style.width = w.w + "px";
      subLive.style.height = w.h + "px";
      subLive.style.transform = `translate3d(${w.x}px, ${w.y + (cur - 4) * -50}px, 0)`;
      subLive.style.opacity = o.toFixed(3);
      subImg.style.left = (b.x - w.x) + "px";
      subImg.style.top = (b.y - w.y) + "px";
      subImg.style.width = b.w + "px";
      subImg.style.filter = o < 1 ? `blur(${((1 - o) * 8).toFixed(2)}px)` : "none";
    }
    // пока посетитель смотрит на главу IV и ничего не выбрал — стили сменяются сами
    const now = performance.now();
    if (o > 0.95 && !styleTouched && now - autoAt > 2600) { autoAt = now; if (subShown) setStyle((styleIdx + 1) % STYLES.length); }
    if (o < 0.5) autoAt = now;
  }

  // --- фон -----------------------------------------------------------------------------------------------
  async function startField() {
    const canvas = $("#field");
    if (!window.TolkField) { root.classList.add("no-gl"); return; }
    const fonts = document.fonts ? Promise.all([
      document.fonts.load('500 80px "EB Garamond"'), document.fonts.load('italic 500 80px "EB Garamond"'),
    ]) : Promise.resolve();
    await Promise.race([fonts, new Promise((r) => setTimeout(r, 2500))]);
    const small = innerWidth < 760, cores = navigator.hardwareConcurrency || 4;
    try {
      field = TolkField.create(canvas, { count: small ? 42000 : cores <= 4 ? 70000 : 100000, src: phrase[0], dst: phrase[2], dark: isDark() });
    } catch (e) { console.warn(e); field = null; }
    if (!field) { root.classList.add("no-gl"); return; }
    field.jump(stateAt(scrollY));
    field.onFrame(onField);
    root.classList.add("live-on");
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
      gsap.from($$(".eyebrow, .body, .spec > div, .note, .chips", card), { y: 26, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .06, scrollTrigger: st });
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
      .from(".hud, .rail, .progress", { opacity: 0, duration: 1.4, clearProps: "opacity" }, .8);
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

  // проверка скриншотами: ?shot=<px> — прокрутить туда сразу после загрузки
  const shot = Number(new URLSearchParams(location.search).get("shot"));
  if (shot) setTimeout(() => { scrollTo(0, shot); if (field) field.jump(stateAt(shot)); onScroll(); }, 3400);
})();
