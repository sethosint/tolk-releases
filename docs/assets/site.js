// Tolk — сайт: тема (система / вручную), язык, окно Tolk «в разборе» (настоящие снимки слоями: субтитры, окно, конспект) —
// при прокрутке собирается в одно окно, пунктирные выноски считаются по углам слоёв; живые цены из магазина, «Купить» → бот,
// настоящие фразы Google / Tolk AI по очереди, настоящие субтитры Tolk, которые можно тянуть по «экрану», вопросы.
// Без библиотек: прокрутка обычная, появление — IntersectionObserver. Без скрипта всё видно и работает.
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
  const ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13m0 0-5-5m5 5-5 5"/></svg>';

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
    setTimeout(() => root.classList.remove("theming"), 700);
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
    $$(".js-shot").forEach((im) => { im.src = im.dataset.src.replace("{lang}", lang); });
    $$(".js-buy").forEach((a) => { a.href = `https://t.me/${BOT}`; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-trial").forEach((a) => { a.href = `https://t.me/${BOT}?startapp=trial`; a.target = "_blank"; a.rel = "noopener"; });
  }
  $$(".langs button").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.setItem("tolk-lang", b.dataset.lang); } catch (e) { /* без хранилища */ }
    const u = new URL(location.href);
    u.searchParams.set("lang", b.dataset.lang);
    location.href = u.toString();                  // заново — тексты, снимки и цены на новом языке
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

  // --- скачать: установщик для системы посетителя, остальные — строкой ниже ------------------------------
  const REL = "https://github.com/sethosint/tolk-releases/releases/latest/download/";
  const DL = {
    win: { file: "Tolk-Setup.exe", name: "Windows" },
    mac: { file: "Tolk-macOS-arm64.dmg", name: "macOS", k: "mac_arm" },
    macx: { file: "Tolk-macOS-x86_64.dmg", name: "macOS", k: "mac_intel" },
    linux: { file: "Tolk-Setup-Linux.run", name: "Linux" },
  };
  function pickOS() {
    const ua = navigator.userAgent || "";
    const p = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
    if (/iPhone|iPad|iPod|Android/i.test(ua)) return "win";             // с телефона — обычно ищут для ноутбука
    if (/mac/i.test(p) || /Macintosh/.test(ua)) return "mac";
    if (/linux|X11/i.test(p) || /Linux|X11/.test(ua)) return /CrOS/.test(ua) ? "win" : "linux";
    return "win";
  }
  function renderDownloads(os) {
    const d = DL[os];
    $$(".js-dl").forEach((a) => { a.href = REL + d.file; });
    $$('.js-dl [data-t="cta_dl"]').forEach((el) => { el.textContent = fill(tx("cta_dl"), { os: d.name }); });
    const hint = os === "win" ? "" : tx(os === "linux" ? "hint_linux" : "hint_mac");
    $$(".js-os-hint").forEach((el) => { el.textContent = hint; el.hidden = !hint; });
    const links = Object.keys(DL).filter((o) => o !== os)
      .map((o) => `<a class="link" href="${REL + DL[o].file}">${DL[o].k ? tx(DL[o].k) : DL[o].name}</a>`);
    $$(".js-os-alt").forEach((el) => { el.innerHTML = `${tx("dl_other")} ${links.join(" · ")}`; });
  }
  // с телефона (а приходят из роликов — с телефона) установщик не поставить: главная кнопка — пробный в боте,
  // а «Скачать» — тихой ссылкой рядом
  function phoneCtas() {
    if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent || "")) return;
    const proto = $(".hero .js-trial");
    $$(".ctas, .final-cta").forEach((box) => {
      const dl = box.querySelector(".js-dl");
      if (!dl || !proto) return;
      const trial = box.querySelector(".js-trial") || proto.cloneNode(true);
      trial.className = "btn js-trial";
      trial.querySelector("svg").remove();
      trial.insertAdjacentHTML("afterbegin", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" '
        + 'stroke-linecap="round" stroke-linejoin="round"><path d="M21 4 3 11l6 2.5M21 4l-3.5 16-8.5-6.5M21 4 9 13.5v5l3-3"/></svg>');
      dl.className = "ghost js-dl";
      box.insertBefore(trial, dl);
    });
  }
  function initDownloads() {
    const os = pickOS();
    renderDownloads(os);
    phoneCtas();
    if (os === "mac" && navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      navigator.userAgentData.getHighEntropyValues(["architecture"])    // Chrome на Mac с Intel
        .then((v) => { if (v.architecture === "x86") renderDownloads("macx"); }).catch(() => {});
    }
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

  // --- 03 «Субтитры»: настоящие кадры Tolk на «экране»; тянутся мышью или пальцем, стили сменяются сами, пока не выбрали --------
  const STYLES = ["graphite", "glass", "minimal", "classic", "light", "contrast"];
  const screen = $(".js-screen"), sub = $(".js-sub"), subImg = $(".js-sub img");
  let styleIdx = 0, styleTouched = false, screenSeen = false;
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
    setInterval(() => { if (screenSeen && !styleTouched && !drag.on && !document.hidden) setStyle((styleIdx + 1) % STYLES.length); }, 2800);
  }
  const drag = { on: false, dx: 0, dy: 0 };
  sub.addEventListener("pointerdown", (e) => {
    const r = sub.getBoundingClientRect();
    drag.on = true; drag.dx = e.clientX - (r.left + r.width / 2); drag.dy = e.clientY - (r.top + r.height / 2);
    sub.setPointerCapture(e.pointerId);
    sub.classList.add("dragging");
    e.preventDefault();
  });
  sub.addEventListener("pointermove", (e) => {
    if (!drag.on) return;
    const box = screen.getBoundingClientRect(), r = sub.getBoundingClientRect();
    const hw = r.width / 2, hh = r.height / 2;
    const cx = Math.max(box.left + hw + 6, Math.min(box.right - hw - 6, e.clientX - drag.dx));
    const cy = Math.max(box.top + hh + 6, Math.min(box.bottom - hh - 6, e.clientY - drag.dy));
    sub.style.left = ((cx - box.left) / box.width * 100) + "%";
    sub.style.top = ((cy - box.top) / box.height * 100) + "%";
    sub.classList.add("moved");
  });
  const endDrag = () => { drag.on = false; sub.classList.remove("dragging"); };
  sub.addEventListener("pointerup", endDrag);
  sub.addEventListener("pointercancel", endDrag);

  // --- первый экран: окно Tolk «в разборе» --------------------------------------------------------------------------
  // Слои стоят в 3D (CSS), JS только двигает их: p = 0 — разобрано (наискосок, слои разведены), p = 1 — собрано в одно
  // ровное окно. Пунктир — от углов верхнего слоя к его «следу» на нижнем и от выносок к слоям; точки берутся из
  // getBoundingClientRect угловых меток, поэтому линии всегда идут ровно туда, где слой сейчас нарисован.
  const fig = $(".js-xray"), stack = fig && $(".stack", fig), wires = fig && $(".wires", fig);
  const L = fig ? { notes: $(".l-notes", fig), win: $(".l-win", fig), sub: $(".l-sub", fig) } : {};
  const narrow = matchMedia("(max-width: 760px)");
  let xp = -1;
  const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const pt = (el, box) => { const r = el.getBoundingClientRect(); return [r.left - box.left, r.top - box.top]; };
  const corners = (el) => ["tl", "tr", "br", "bl"].map((k) => $(":scope > .c." + k, el));
  function xray(p, force) {
    if (!fig || (!force && Math.abs(p - xp) < 0.002)) return;
    xp = p;
    const st = $(".stage", fig), W = st.clientWidth, H = st.clientHeight, small = narrow.matches;
    const e = 1 - ease(p);
    const sE = Math.min(W / (small ? 860 : 1000), H / 720), sF = Math.min(W * 0.94 / 640, H * 0.9 / 406);
    const s = sF + (sE - sF) * e, gap = 210 * e;
    const dx = small ? 0 : -W * 0.19 * e;
    stack.style.transform = `translate(${dx}px, ${H * 0.08 * e}px) scale(${s}) rotateX(${50 * e}deg) rotateZ(${-26 * e}deg)`;
    L.notes.style.transform = `translateZ(${-gap - 2}px)`;
    L.win.style.transform = "translateZ(0)";
    // субтитры: в разобранном виде висят над верхом окна, в собранном — внизу, где их обычно держат
    const sy = 298 * (1 - e);
    L.sub.style.transform = `translate3d(0, ${sy}px, ${gap + 2}px)`;
    $(".fp-sub", fig).style.top = 20 + sy + "px";
    fig.style.setProperty("--fp", e.toFixed(3));
    fig.style.setProperty("--co", small ? "1" : Math.max(0, 1 - p * 2.4).toFixed(3));
    const box = fig.getBoundingClientRect();
    let d = "";
    if (e > 0.02) {
      [[L.win, $(".fp-win", fig)], [L.sub, $(".fp-sub", fig)]].forEach(([up, fp]) => {
        const a = corners(up), b = corners(fp);
        a.forEach((c, k) => { const [x1, y1] = pt(c, box), [x2, y2] = pt(b[k], box); d += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; });
      });
      if (!small) {
        $$(".callouts li", fig).forEach((li) => {
          const r = li.getBoundingClientRect(), x1 = r.left - box.left - 4, y1 = r.top - box.top + 16;
          const [x2, y2] = pt($(":scope > .c.mr", L[li.dataset.for]), box);
          d += `<path class="lead" d="M${x1.toFixed(1)} ${y1.toFixed(1)}h-14L${x2.toFixed(1)} ${y2.toFixed(1)}"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3"/>`;
        });
      }
    }
    wires.innerHTML = d;
    wires.style.opacity = e.toFixed(3);
  }
  function heroProgress() {
    if (!fig || gentle) return 0;
    const r = $("#hero").getBoundingClientRect();
    return Math.max(0, Math.min(1, -r.top / (r.height * 0.55)));
  }

  // --- вопросы -------------------------------------------------------------------------------------------
  function renderFaq() {
    const box = $(".js-faq");
    const items = tx("faq").map(([q, a]) => `<details><summary>${q}</summary><div class="a"><p>${a}</p></div></details>`);
    const half = Math.ceil(items.length / 2);
    box.innerHTML = `<div class="col">${items.slice(0, half).join("")}</div><div class="col">${items.slice(half).join("")}</div>`;
    $$(".js-buy", box).forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
  }

  // --- цены (живой курс из магазина; без ответа — запасные) ----------------------------------------------
  const FALLBACK = {
    plans: [
      { id: "week", price: "1.49", stars: 100, days: 7, period_h: 7.5, per_month: null, save: 0 },
      { id: "month", price: "6.49", stars: 500, days: 31, period_h: 30, per_month: 6.49, save: 0 },
      { id: "quarter", price: "17.99", stars: 1450, days: 92, period_h: 90, per_month: 6, save: 8 },
      { id: "half", price: "33.99", stars: 2700, days: 183, period_h: 180, per_month: 5.67, save: 13 },
      { id: "year", price: "65.99", stars: 5300, days: 366, period_h: 360, per_month: 5.5, save: 15, best: true },
      { id: "pro_week", price: "2.49", stars: 200, days: 7, period_h: 7.5, per_month: null, save: 0, pro: true },
      { id: "pro_month", price: "9.99", stars: 800, days: 31, period_h: 30, per_month: 9.99, save: 0, pro: true },
      { id: "pro_quarter", price: "28.49", stars: 2300, days: 92, period_h: 90, per_month: 9.5, save: 5, pro: true },
      { id: "pro_half", price: "56.49", stars: 4500, days: 183, period_h: 180, per_month: 9.42, save: 6, pro: true },
      { id: "pro_year", price: "112.49", stars: 9000, days: 366, period_h: 360, per_month: 9.37, save: 6, pro: true },
    ],
    topups: [{ id: "h8", hours: 7.5, price: "1.49" }, { id: "h30", hours: 30, price: "5.49" }, { id: "h75", hours: 75, price: "13.99" }],
    bulk: [{ min: 3, pct: 10 }, { min: 5, pct: 15 }],
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
    const a = [get("card")].filter(Boolean);
    const b = [get("usdt"), get("ton")].filter(Boolean);
    return (a.length ? `<span>≈ ${a.join(" · ")}</span>` : "") + (b.length ? `<span>${b.join(" · ")}</span>` : "");
  }
  // акция из магазина: полоса над тарифами — что, до когда и сколько осталось; кончилась — цены перечитываются
  let saleTick = 0;
  function renderSale(sv) {
    const band = $(".js-sale");
    clearInterval(saleTick);
    if (!sv || Date.parse(sv.until) <= Date.now()) { band.hidden = true; return; }
    const disc = sv.same ? `−${sv.pct}${lang === "en" ? "" : " "}%` : fill(tx("sale_upto"), { p: sv.pct });
    const until = new Date(sv.until).toLocaleDateString({ ru: "ru-RU", uk: "uk-UA", sk: "sk-SK", en: "en-GB" }[lang] || "ru-RU",
                                                        { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    const esc = (v) => String(v).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
    band.innerHTML = `<span class="ey">${tx("sale_ey")}</span><b>${esc(sv.title || fill(tx("sale_t"), { d: disc }))}</b>` +
      `<span>${fill(tx("sale_until"), { d: until })}</span><span class="left">${tx("sale_left")} <b class="cd"></b></span>`;
    band.hidden = false;
    const cd = $(".cd", band), two = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const s2 = Math.floor((Date.parse(sv.until) - Date.now()) / 1000);
      if (s2 <= 0) { clearInterval(saleTick); loadPrices(); return; }
      const d = Math.floor(s2 / 86400);
      cd.textContent = (d ? d + (lang === "en" ? "d " : " д ".replace("д", lang === "sk" ? "d" : "д")) : "") +
        `${two(Math.floor(s2 / 3600) % 24)}:${two(Math.floor(s2 / 60) % 60)}:${two(s2 % 60)}`;
    };
    tick();
    saleTick = setInterval(tick, 1000);
  }
  let proView = false;
  function renderPrices() {
    const c = catalog || FALLBACK;
    const box = $(".js-plans");
    const monthH = c.month_h || 30;
    const tabs = $(".js-plan-tabs");
    const hasPro = c.plans.some((p) => p.pro);
    tabs.hidden = !hasPro;
    $$("button", tabs).forEach((b) => { b.textContent = tx(b.dataset.v === "pro" ? "tab_pro" : "tab_std"); b.setAttribute("aria-pressed", String((b.dataset.v === "pro") === proView)); });
    const lede = $(".js-pro-lede");
    lede.hidden = !(hasPro && proView);
    lede.textContent = tx("pro_lede");
    box.innerHTML = c.plans.filter((p) => Boolean(p.pro) === (hasPro && proView)).map((p) => {
      const title = (tx("plan") || {})[p.id] || p.title || p.id;
      const hours = p.days < 28 ? fill(tx("h_week"), { h: hrs(p.period_h) })
        : p.days < 40 ? fill(tx("h_month"), { h: hrs(p.period_h) })
        : fill(tx("h_long"), { h: hrs(p.period_h), m: hrs(monthH) });
      const pm = p.days < 28 ? tx("per_week") : p.days < 40 ? "" : fill(tx("per_month"), { p: eur(p.per_month) });
      const off = p.was && Number(p.was) > Number(p.price);
      const save = off ? `<span class="save hot">−${p.sale_pct}%</span>` : p.save ? `<span class="save">${fill(tx("save"), { n: p.save })}</span>` : "";
      return `<article class="plan${p.best ? " best" : ""}${off ? " off" : ""}">
        <div class="nm"><span>${title}</span>${save}</div>
        <p class="price">${off ? `<s>${eur(p.was)}</s>` : ""}${eur(p.price)}</p>
        <p class="pm">${pm}</p>
        <p class="hours">${hours}</p>
        <p class="alt">${altPrices(p.id, p.stars)}</p>
        <a class="buy" href="https://t.me/${BOT}?start=p_${p.id}" target="_blank" rel="noopener">${tx("buy")}${ARR}</a>
      </article>`;
    }).join("");
    $(".js-topups").innerHTML = (c.topups || []).map((t) => `<b>${fill(tx("topup"), { h: hrs(t.hours),
      p: (t.was ? `<s>${eur(t.was)}</s> ` : "") + eur(t.price) })}</b>`).join(" · ");
    renderSale(c.sale);
    const bulk = c.bulk || [];                          // скидка за несколько ключей — из настроек магазина
    $(".js-bulk-line").hidden = !bulk.length;
    $(".js-bulk").innerHTML = bulk.map((b) => `<b>${fill(tx("bulk_tier"), { n: b.min, p: b.pct })}</b>`).join(" · ") + " " + tx("bulk_tail") +
      (bulk.some((b) => b.min === 3) ? ` <a class="link" href="https://t.me/${BOT}?start=group" target="_blank" rel="noopener">${tx("bulk_go")}</a>` : "");
  }

  $$(".js-plan-tabs button").forEach((b) => b.addEventListener("click", () => { proView = b.dataset.v === "pro"; renderPrices(); }));


  // --- прокрутка: линия прогресса, шапка, сборка окна, «экран» в поле зрения ------------------------------------------
  const nav = $("#nav"), bar = $(".progress i");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("scrolled", y > 20);
    xray(heroProgress());
    const c = $(".js-cmp").getBoundingClientRect();
    cmpActive = c.top < innerHeight * 0.85 && c.bottom > innerHeight * 0.15;
  }
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };

  // появление: блоки с data-rise — по одному, когда доходят до экрана; первый экран — сразу, лесенкой
  function rise() {
    const els = $$("[data-rise], .plan, .faq details, .colophon > div");
    els.forEach((el) => el.setAttribute("data-rise", ""));
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); return; }
    const io = new IntersectionObserver((list) => list.forEach((en) => {
      if (!en.isIntersecting) return;
      const sib = en.target.parentElement ? [...en.target.parentElement.children].filter((x) => x.hasAttribute("data-rise")) : [];
      en.target.style.transitionDelay = Math.min(4, Math.max(0, sib.indexOf(en.target))) * 70 + "ms";
      en.target.classList.add("in");
      io.unobserve(en.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const sc = new IntersectionObserver((list) => list.forEach((en) => { screenSeen = en.isIntersecting; }), { threshold: .4 });
    sc.observe(screen);
  }
  function intro() {
    $$(".hero [data-in], .nav > *").forEach((el, i) => {
      if (gentle) return;
      el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }],
        { duration: 1100, delay: 60 + i * 70, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
    });
  }

  // --- старт ---------------------------------------------------------------------------------------------
  applyTexts();
  initDownloads();
  renderCompare();
  renderStyles();
  renderFaq();
  renderPrices();
  $$(".display, .lede, .body, .faq, .fine, .os-hint, .pay-notes, .spec dd, .callouts").forEach(typograph);
  rise();
  intro();
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", () => xray(heroProgress(), true));
  narrow.addEventListener("change", () => xray(heroProgress(), true));
  $$(".js-xray img").forEach((im) => im.addEventListener("load", () => xray(heroProgress(), true)));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => xray(heroProgress(), true));
  onScroll();
  xray(heroProgress(), true);
  loadPrices();
  requestAnimationFrame(tickCompare);

  // проверка снимками: ?shot=<px> — прокрутить туда сразу после загрузки
  const shot = Number(new URLSearchParams(location.search).get("shot"));
  if (shot) setTimeout(() => { scrollTo(0, shot); onScroll(); }, 600);
})();
