// Tolk — сайт: тема (система / вручную), язык, живые цены, «Купить» → бот, видео (Gemini) поверх кадра программы,
// сравнение переводчиков, стили субтитров и движение: Lenis (плавная прокрутка) + GSAP ScrollTrigger.
// Без GSAP (не загрузился, «меньше движения» в системе) всё видно и работает, просто без анимаций.
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
  // «Меньше движения» в системе (в Windows — «Эффекты анимации» выключены) — анимация остаётся, но спокойнее:
  // без инерционной прокрутки. Сайт без движения выглядел бы как слайд-шоу.
  const gentle = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reduce = false;
  const motion = Boolean(window.gsap && window.ScrollTrigger);

  // --- тема ---------------------------------------------------------------------------------------
  const sysDark = matchMedia("(prefers-color-scheme: dark)");
  const theme = () => root.dataset.theme || (sysDark.matches ? "dark" : "light");
  function paintMeta() {
    if (!root.dataset.theme) return;
    const c = root.dataset.theme === "dark" ? "#0c0c0e" : "#f3f0e9";
    $$('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", c));
  }
  $("#theme").addEventListener("click", () => {
    const next = theme() === "dark" ? "light" : "dark";
    root.classList.add("theming");
    root.dataset.theme = next;
    try { localStorage.setItem("tolk-theme", next); } catch (e) { /* без хранилища */ }
    paintMeta();
    setTimeout(() => root.classList.remove("theming"), 650);
  });
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
  const ARR = '<svg class="arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13m0 0-5-5m5 5-5 5"/></svg>';
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
    $$(".js-img, .subs img[data-src]").forEach((img) => { img.src = `img/app/${lang}/${img.dataset.src}`; });
    $$(".js-buy").forEach((a) => { a.href = `https://t.me/${BOT}`; a.target = "_blank"; a.rel = "noopener"; });
  }
  $$(".langs button").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.setItem("tolk-lang", b.dataset.lang); } catch (e) { /* без хранилища */ }
    const u = new URL(location.href);
    u.searchParams.set("lang", b.dataset.lang);
    location.href = u.toString();                  // заново — чтобы вся анимация перестроилась под новый текст
  }));

  // типографика: тире не начинает строку, короткие предлоги и союзы не висят в конце строки
  const SHORT = /(^|[\s(«„“])(в|к|с|у|о|и|а|я|й|з|на|не|по|за|из|от|до|но|ни|та|же|для|без|при|под|над|про|что|как|v|k|s|z|o|a|i|u|na|do|po|za|od|so|ku|pre|pri|zo|the|a|an|to|in|on|of|at|by|and|or|is)\s+/gi;
  function typograph(scope) {
    const w = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach((n) => {
      if (n.parentElement.closest("script, style, .mq")) return;
      const t = n.nodeValue.replace(/\s+([—–])(?=\s)/g, " $1").replace(SHORT, "$1$2 ").replace(SHORT, "$1$2 ");
      if (t !== n.nodeValue) n.nodeValue = t;
    });
  }

  // строки заголовка и слова крупной фразы — для анимации
  function splitLines(el) {
    el.innerHTML = el.innerHTML.split(/<br\s*\/?>/i).map((s) => `<span class="line"><span>${s.trim()}</span></span>`).join("");
  }
  function splitWords(el) {
    el.innerHTML = el.textContent.trim().split(/[ \t\n]+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  }

  // --- сравнение: Google и Tolk AI ------------------------------------------------------------------
  let mode = "t";
  function renderCompare() {
    const box = $(".js-cmp");
    if (!box) return;
    const rows = CMP[lang] || CMP.ru || [];
    box.innerHTML = rows.map((r, i) =>
      `<div class="cmp-row" data-i="${i}"><p class="src">${r[0]}</p><p class="out"><span class="who"></span><span class="txt"></span></p></div>`).join("");
    setMode(mode, false);
  }
  function setMode(m, animate = true) {
    mode = m;
    const seg = $(".js-seg");
    if (seg) {
      const btns = $$("button", seg);
      btns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.mode === m)));
      const on = btns.find((b) => b.dataset.mode === m);
      const pill = $(".pill", seg);
      if (on && pill) { pill.style.left = on.offsetLeft + "px"; pill.style.width = on.offsetWidth + "px"; }
    }
    const rows = CMP[lang] || CMP.ru || [];
    $$(".cmp-row").forEach((row, i) => {
      const out = $(".out", row);
      const put = () => {
        $(".who", row).textContent = m === "t" ? tx("who_t") : tx("who_g");
        $(".txt", row).textContent = rows[i][m === "t" ? 2 : 1];
        row.classList.toggle("ai", m === "t");
      };
      if (!animate) return put();
      setTimeout(() => {
        out.classList.add("swap");
        setTimeout(() => { put(); out.classList.remove("swap"); }, 320);
      }, i * 90);
    });
  }
  $$(".js-seg button").forEach((b) => b.addEventListener("click", () => { cmpTouched = true; setMode(b.dataset.mode); }));
  let cmpTouched = false;

  // --- стили субтитров ---------------------------------------------------------------------------------
  const STYLES = ["graphite", "glass", "classic", "cinema", "yellow", "light"];
  let styleTimer = null, styleIdx = 0;
  function renderStyles() {
    const bar = $(".js-styles"), box = $(".js-style-subs");
    if (!bar || !box) return;
    const names = tx("styles");
    bar.innerHTML = STYLES.map((s, i) => `<button type="button" data-i="${i}" aria-pressed="${i === 0}">${names[i]}</button>`).join("");
    box.innerHTML = STYLES.map((s, i) => `<img src="img/app/${lang}/style-${s}.png" alt="" class="${i === 0 ? "on" : ""}" loading="lazy">`).join("");
    $$("button", bar).forEach((b) => b.addEventListener("click", () => { clearInterval(styleTimer); styleTimer = null; setStyle(Number(b.dataset.i)); }));
  }
  function setStyle(i) {
    styleIdx = i;
    $$(".js-styles button").forEach((b, k) => b.setAttribute("aria-pressed", String(k === i)));
    $$(".js-style-subs img").forEach((im, k) => im.classList.toggle("on", k === i));
  }

  // --- вопросы ---------------------------------------------------------------------------------------
  function renderFaq() {
    const box = $(".js-faq");
    if (!box) return;
    box.innerHTML = tx("faq").map(([q, a]) => `<details><summary>${q}</summary><div class="a"><p>${a}</p></div></details>`).join("");
    $$(".js-faq details").forEach((d) => {
      const s = $("summary", d), a = $(".a", d);
      s.addEventListener("click", (e) => {
        if (!window.gsap || reduce) return;
        e.preventDefault();
        if (d.open) gsap.to(a, { height: 0, duration: .45, ease: "power3.inOut", onComplete: () => { d.open = false; a.style.height = ""; } });
        else { d.open = true; gsap.fromTo(a, { height: 0 }, { height: a.scrollHeight, duration: .6, ease: "expo.out", onComplete: () => { a.style.height = ""; } }); }
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
  const ICONS = {
    mono: '<svg viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="22" fill="#26272b"/><text x="48" y="58" text-anchor="middle" fill="#fff" font-family="Inter, Arial, sans-serif" font-weight="800" font-size="27" letter-spacing="-1">mono</text></svg>',
    usdt: '<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="46" fill="#53ae94"/><path fill="#fff" d="M25 24h46v12H54v7.2c10.8.6 18.8 3 18.8 5.8s-8 5.2-18.8 5.8V74H42V54.8C31.2 54.2 23.2 51.8 23.2 49s8-5.2 18.8-5.8V36H25z"/><ellipse cx="48" cy="49" rx="21" ry="3.6" fill="#53ae94"/><path fill="#fff" d="M42 45.9v4.5c1.9.1 3.9.2 6 .2s4.1-.1 6-.2v-4.5c-1.9-.1-3.9-.2-6-.2s-4.1.1-6 .2z"/></svg>',
    ton: '<svg viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="26" fill="#2398ee"/><path fill="#fff" stroke="#fff" stroke-width="5" stroke-linejoin="round" d="M29 33h38l9 12-28 30-28-30z"/><path fill="#1f91ec" d="M58 36l3.2 8.8 8.8 3.2-8.8 3.2L58 60l-3.2-8.8L46 48l8.8-3.2z"/></svg>',
    stars: '<svg viewBox="0 0 96 96" aria-hidden="true"><rect width="96" height="96" rx="22" fill="#fff4d0"/><path fill="#f3b50f" d="M48 14c2 0 3.5 1.2 4.4 3.2l6.6 13.8 15 2c4 .5 5.5 5.3 2.6 8L65.7 51.5l2.7 15c.7 3.9-3.3 6.8-6.8 5L48 64.2l-13.6 7.3c-3.5 1.8-7.5-1.1-6.8-5l2.7-15-10.9-10.5c-2.9-2.7-1.4-7.5 2.6-8l15-2 6.6-13.8C44.5 15.2 46 14 48 14z"/></svg>',
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
    if (!box) return;
    const monthH = c.month_h || 30;
    box.innerHTML = c.plans.map((p) => {
      const title = (tx("plan") || {})[p.id] || p.title || p.id;
      const hours = p.days < 28 ? fill(tx("h_week"), { h: hrs(p.period_h) })
        : p.days < 40 ? fill(tx("h_month"), { h: hrs(p.period_h) })
        : fill(tx("h_long"), { h: hrs(p.period_h), m: hrs(monthH) });
      const pm = p.days < 28 ? tx("per_week") : p.days < 40 ? "" : fill(tx("per_month"), { p: eur(p.per_month) });
      const save = p.save ? `<span class="save">${fill(tx("save"), { n: p.save })}</span>` : "";
      return `<div class="plan${p.best ? " best" : ""}">
        <div class="name mono"><span>${title}</span>${save}</div>
        <div class="price">${eur(p.price)}</div>
        <div class="pm">${pm}</div>
        <div class="hours">${hours}</div>
        <div class="alt">${altPrices(p.id, p.stars)}</div>
        <a class="btn ${p.best ? "" : "btn-line"}" href="https://t.me/${BOT}?start=p_${p.id}" target="_blank" rel="noopener">${tx("buy")}${ARR}</a>
      </div>`;
    }).join("");
    const tops = $(".js-topups");
    if (tops) {
      tops.innerHTML = (c.topups || []).map((t) => `<b>${fill(tx("topup"), { h: hrs(t.hours), p: eur(t.price) })}</b>`).join(" · ") +
        ` <span class="muted">— ${tx("topup_tail")}</span>`;
    }
    const ms = $(".js-methods");
    if (ms) {
      ms.innerHTML = [["stars", "m_stars", "m_stars_s"], ["mono", "m_mono", "m_mono_s"], ["usdt", "m_usdt", "m_usdt_s"], ["ton", "m_ton", "m_ton_s"]]
        .map(([ic, a, b]) => `<span class="method">${ICONS[ic]}<span>${tx(a)} <span class="muted">· ${tx(b)}</span></span></span>`).join("");
    }
  }

  // --- видео: video/videos.json — какие ролики есть; без них — кадр из программы --------------------------------
  async function setupVideos() {
    let have = {};
    try {
      const r = await fetch("video/videos.json", { cache: "no-cache" });
      if (r.ok) have = await r.json();
    } catch (e) { /* роликов пока нет */ }
    if (reduce) return;
    const frames = $$("[data-video]").filter((f) => have[f.dataset.video]);
    if (have.hero) { const c = $(".js-caption"); if (c) c.textContent = tx("caption_video"); }
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target._video;
      if (!v) return;
      if (e.isIntersecting) {
        if (!v.src) { v.src = `video/${e.target.dataset.video}.mp4?v=${have[e.target.dataset.video]}`; v.load(); }
        v.play().catch(() => {});
      } else v.pause();
    }), { rootMargin: "200px 0px" });
    frames.forEach((f) => {
      const media = $(".media", f);
      const v = document.createElement("video");
      v.muted = true; v.loop = true; v.playsInline = true; v.preload = "none";
      v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("aria-hidden", "true");
      v.addEventListener("playing", () => media.classList.add("has-video"), { once: true });
      const start = Number(f.dataset.start) || 0;
      if (start) v.addEventListener("loadedmetadata", () => { if (v.duration) v.currentTime = start % v.duration; }, { once: true });
      media.appendChild(v);
      f._video = v;
      io.observe(f);
    });
  }

  // --- кадры субтитров на первом экране: меняются, текст «проявляется» слева направо ---------------------
  function rotateSubs() {
    const imgs = $$(".js-rotate img");
    if (imgs.length < 2 || reduce) return;
    let i = 0;
    setInterval(() => {
      const cur = imgs[i];
      i = (i + 1) % imgs.length;
      const nxt = imgs[i];
      if (window.gsap) {
        gsap.to(cur, { opacity: 0, duration: .45, ease: "power2.out", onComplete: () => cur.classList.remove("on") });
        gsap.fromTo(nxt, { opacity: 1, clipPath: "inset(0 100% 0 0)" },
                    { clipPath: "inset(0 0% 0 0)", duration: 1.3, delay: .25, ease: "power2.inOut", onStart: () => nxt.classList.add("on") });
      } else { cur.classList.remove("on"); nxt.classList.add("on"); }
    }, 4200);
  }

  // --- бегущая строка -------------------------------------------------------------------------------------
  function marquee() {
    const mq = $(".js-mq");
    if (!mq) return null;
    mq.innerHTML += mq.innerHTML;
    if (!window.gsap) return null;
    const loop = gsap.to(mq, { xPercent: -50, duration: 46, ease: "none", repeat: -1 });
    loop.totalTime(loop.duration() * 50);          // запас, чтобы крутить и назад
    return loop;
  }

  // --- цифры считаются, когда видны -----------------------------------------------------------------------
  function counters() {
    if (motion) $$("[data-count]").forEach((el) => { if (Number(el.dataset.count)) el.textContent = "0"; });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const to = Number(e.target.dataset.count);
      if (!window.gsap || reduce || !to) return;
      const o = { v: 0 };
      gsap.to(o, { v: to, duration: 1.6, ease: "power3.out", onUpdate: () => { e.target.textContent = Math.round(o.v); } });
    }), { threshold: .6 });
    $$("[data-count]").forEach((el) => io.observe(el));
  }

  // --- шаги «как это работает» ----------------------------------------------------------------------------
  let stepNow = 0;
  function setStep(i) {
    if (i === stepNow) return;
    const panes = $$(".how-screen .pane"), steps = $$(".step");
    steps.forEach((s, k) => s.classList.toggle("on", k === i));
    const prev = panes[stepNow], next = panes[i];
    stepNow = i;
    if (window.gsap && !reduce) {
      gsap.to(prev, { opacity: 0, y: -24, scale: .98, duration: .5, ease: "power2.in", onComplete: () => prev.classList.remove("on") });
      next.classList.add("on");
      gsap.fromTo(next, { opacity: 0, y: 36, scale: .96 }, { opacity: 1, y: 0, scale: 1, duration: .9, ease: "expo.out", delay: .1 });
    } else { panes.forEach((p, k) => p.classList.toggle("on", k === i)); }
  }

  // --- движение --------------------------------------------------------------------------------------------
  function runMotion() {
    gsap.registerPlugin(ScrollTrigger);
    let lenis = null;
    if (window.Lenis && !gentle) {
      lenis = new Lenis({ lerp: .09, smoothWheel: true });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
      const t = a.getAttribute("href") === "#top" ? 0 : $(a.getAttribute("href"));
      if (t == null || !lenis) return;
      e.preventDefault();
      lenis.scrollTo(t, { offset: -64, duration: 1.5 });
    }));

    // вход: строки заголовка поднимаются, кадр выезжает
    const h1 = $(".js-lines");
    splitLines(h1);
    root.classList.remove("js-wait");
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    tl.from(".nav", { y: -24, opacity: 0, duration: 1.1 })
      .from(".js-lines .line > span", { yPercent: 112, duration: 1.5, stagger: .12 }, .05)
      .from(".hero [data-in]", { y: 26, opacity: 0, duration: 1.3, stagger: .12 }, .45)
      .from(".stage", { clipPath: "inset(100% 0% 0% 0%)", duration: 1.8, ease: "expo.inOut", clearProps: "clipPath" }, .2)
      .from(".js-hero-frame .media", { yPercent: 12, duration: 2.2 }, .2)
      .from(".js-hero-frame .tag", { opacity: 0, y: -10, duration: 1 }, 1.3)
      .from(".js-hero-frame .subs", { opacity: 0, duration: 1.2 }, 1.45);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      // кадр первого экрана раскрывается на всю ширину, изображение внутри «отъезжает»
      const f = $(".js-hero-frame");
      gsap.set(".stage", { paddingLeft: 0, paddingRight: 0 });
      gsap.set(f, { borderRadius: 0 });
      gsap.fromTo(f, { clipPath: "inset(0% 5.5% 0% 5.5% round 24px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
        scrollTrigger: { trigger: f, start: "top 85%", end: "top 8%", scrub: true } });
      gsap.fromTo($(".media", f), { scale: 1.14 }, { scale: 1, ease: "none",
        scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".hero > .wrap", { yPercent: -18, opacity: .25, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom 40%", scrub: true } });

      // сценарии: лента едет вбок, пока страница прокручивается вниз
      const track = $(".js-track");
      const dist = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
      const slide = gsap.to(track, { x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: ".cases", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
      $$(".case").forEach((c) => {
        gsap.fromTo($(".media", c), { xPercent: -6, scale: 1.16 }, { xPercent: 6, scale: 1.16, ease: "none",
          scrollTrigger: { trigger: c, containerAnimation: slide, start: "left right", end: "right left", scrub: true } });
      });

      // тёмные полосы въезжают, раскрываясь до краёв
      $$(".js-band, .trial").forEach((b) => {
        gsap.fromTo(b, { clipPath: "inset(0% 3% 0% 3% round 36px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none",
          scrollTrigger: { trigger: b, start: "top bottom", end: "top 25%", scrub: true } });
      });
      gsap.fromTo(".styles-stage", { clipPath: "inset(6% 8% 6% 8% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 22px)", ease: "none",
        scrollTrigger: { trigger: ".styles-stage", start: "top bottom", end: "center 60%", scrub: true } });
      gsap.fromTo(".trial .media", { yPercent: -8, scale: 1.12 }, { yPercent: 8, scale: 1.12, ease: "none",
        scrollTrigger: { trigger: ".trial", start: "top bottom", end: "bottom top", scrub: true } });
    });

    // крупная фраза: слова загораются по мере прокрутки
    const st = $(".js-words");
    splitWords(st);
    gsap.fromTo($$(".w", st), { opacity: .13 }, { opacity: 1, ease: "none", stagger: .06,
      scrollTrigger: { trigger: st, start: "top 82%", end: "bottom 42%", scrub: true } });

    // шаги
    $$(".step").forEach((s, i) => ScrollTrigger.create({ trigger: s, start: "top 55%", end: "bottom 55%",
      onToggle: (self) => self.isActive && setStep(i) }));

    // сравнение: сначала Google, при появлении — само переключается на Tolk AI
    setMode("g", false);
    ScrollTrigger.create({ trigger: ".js-cmp", start: "top 70%", once: true,
      onEnter: () => setTimeout(() => { if (!cmpTouched) setMode("t"); }, 900) });

    // стили — сами перебираются, пока посетитель не выбрал
    ScrollTrigger.create({ trigger: ".styles-stage", start: "top 75%", once: true, onEnter: () => {
      styleTimer = setInterval(() => setStyle((styleIdx + 1) % STYLES.length), 2600);
    } });

    // заголовки разделов — по строкам из-под маски; строки пересчитываются при смене ширины
    if (window.SplitText) {
      gsap.registerPlugin(SplitText);
      $$("h2[data-reveal]").forEach((h) => {
        h.removeAttribute("data-reveal");
        SplitText.create(h, { type: "lines", mask: "lines", linesClass: "sl", autoSplit: true,
          onSplit: (self) => gsap.from(self.lines, { yPercent: 118, duration: 1.4, ease: "expo.out", stagger: .09,
            scrollTrigger: { trigger: h, start: "top 88%", once: true } }) });
      });
    }
    $$(".no").forEach((n) => gsap.fromTo(n, { "--draw": 0 }, { "--draw": 1, duration: 1.6, ease: "expo.inOut",
      scrollTrigger: { trigger: n, start: "top 90%", once: true } }));

    // бегущая строка: быстрее при прокрутке, в сторону прокрутки
    const loop = marquee();
    if (loop) {
      ScrollTrigger.create({ trigger: ".marquee", start: "top bottom", end: "bottom top", onUpdate: (self) => {
        const boost = Math.min(5, Math.abs(self.getVelocity()) / 500);
        gsap.to(loop, { timeScale: self.direction * (1 + boost), duration: .2, overwrite: true,
          onComplete: () => gsap.to(loop, { timeScale: self.direction, duration: 1.2, ease: "power2.out" }) });
      } });
    }

    // шапка: подчёркнут раздел, который сейчас на экране
    $$(".nav nav a").forEach((a) => {
      const sec = $(a.getAttribute("href"));
      if (sec) ScrollTrigger.create({ trigger: sec, start: "top 45%", end: "bottom 45%", onToggle: (st) => a.classList.toggle("on", st.isActive) });
    });

    // главные кнопки слегка тянутся за курсором
    if (matchMedia("(pointer: fine)").matches) {
      $$(".hero .btn, .trial .btn").forEach((b) => {
        const xTo = gsap.quickTo(b, "x", { duration: .7, ease: "power3" }), yTo = gsap.quickTo(b, "y", { duration: .7, ease: "power3" });
        b.addEventListener("pointermove", (e) => {
          const r = b.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * .22); yTo((e.clientY - r.top - r.height / 2) * .32);
        });
        b.addEventListener("pointerleave", () => { xTo(0); yTo(0); });
      });
    }

    // появление блоков
    $$("[data-reveal]").forEach((el) => gsap.from(el, { y: 56, opacity: 0, duration: 1.3, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true } }));
    ScrollTrigger.batch(".plan, .fact, .cmp-row, .faq details, .list li", { start: "top 92%", once: true,
      onEnter: (els) => gsap.from(els, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", stagger: .07 }) });

    // подвал: буквы поднимаются
    gsap.from(".js-word span", { yPercent: 100, opacity: 0, duration: 1.4, ease: "expo.out", stagger: .08,
      scrollTrigger: { trigger: ".foot", start: "top 80%", once: true } });

    // шапка: плотная после начала, прячется при прокрутке вниз
    const nav = $("#nav");
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => {
      const y = self.scroll();
      nav.classList.toggle("solid", y > 12);
      nav.classList.toggle("away", self.direction === 1 && y > 700);
    } });

    // проверка скриншотами: ?shot=<px> — прокрутить туда сразу после загрузки
    const shot = Number(new URLSearchParams(location.search).get("shot"));
    if (shot) setTimeout(() => { if (lenis) lenis.scrollTo(shot, { immediate: true }); else scrollTo(0, shot); ScrollTrigger.update(); }, 1200);

    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    addEventListener("load", refresh);
  }

  function runStatic() {
    root.classList.remove("js-wait");
    marquee();
    const nav = $("#nav");
    const onScroll = () => nav.classList.toggle("solid", scrollY > 12);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) setStep($$(".step").indexOf(e.target));
    }), { rootMargin: "-45% 0px -45% 0px" });
    $$(".step").forEach((s) => io.observe(s));
    setMode("t", false);
  }

  applyTexts();
  renderCompare();
  addEventListener("resize", () => setMode(mode, false));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => setMode(mode, false));
  renderStyles();
  renderFaq();
  renderPrices();
  $$("h1, h2, h3, .lede, .statement .js-words, .step p, .case-meta p, .faq, .fine, .caption").forEach(typograph);
  if (motion) runMotion(); else runStatic();
  rotateSubs();
  counters();
  setupVideos();
  loadPrices();
})();
