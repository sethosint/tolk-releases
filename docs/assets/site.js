// Tolk — сайт: язык страницы, живые цены из магазина, кнопки «Купить» → бот @TolkShopBot, кадры субтитров на
// первом экране, появление разделов при прокрутке.
(function () {
  "use strict";
  const T = window.TOLK_TEXTS;
  const LANGS = ["ru", "uk", "sk", "en"];
  const BOT = "TolkShopBot";
  const SHOP = /^(127\.0\.0\.1|localhost)$/.test(location.hostname) && location.port === "8787"
    ? location.origin : "https://tolk-shop.seth-gamingmain.workers.dev";

  // запасная витрина — если магазин не ответил (цены в евро и звёздах те же, что в магазине)
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

  // --- язык ---------------------------------------------------------------------------------------
  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("tolk-lang"); if (LANGS.includes(s)) return s; } catch (e) { /* без хранилища */ }
    const n = (navigator.language || "ru").slice(0, 2).toLowerCase();
    return n === "uk" ? "uk" : n === "sk" || n === "cs" ? "sk" : ["ru", "be", "kk"].includes(n) ? "ru" : "en";
  }
  let lang = pickLang();
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
    document.documentElement.lang = lang;
    document.title = tx("title");
    document.querySelectorAll("[data-t]").forEach((el) => {
      if (el.dataset.ru == null) el.dataset.ru = el.tagName === "text" ? el.textContent : el.innerHTML;
      const k = el.dataset.t;
      const v = lang === "ru" ? el.dataset.ru : T[lang] && T[lang][k] != null ? T[lang][k] : el.dataset.ru;
      if (el.tagName === "text") el.textContent = v;
      else el.innerHTML = v;
    });
    document.querySelectorAll(".langs button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    document.querySelectorAll(".js-img, .js-subs img").forEach((img) => { img.src = `img/app/${lang}/${img.dataset.src}`; });
    renderPairs();
    renderFaq();
    renderPrices();
    wireBuy();
  }

  function renderPairs() {
    const box = document.querySelector(".js-pairs");
    if (!box) return;
    box.innerHTML = tx("pairs").map(([a, b, note]) =>
      `<div class="pair rv in"><p class="from"><span class="mono">${tx("heard")}</span>${a}</p>` +
      `<p class="to"><span class="mono">${tx("sub")}</span>${b}</p><p class="note">${note}</p></div>`).join("");
  }

  function renderFaq() {
    const box = document.querySelector(".js-faq");
    if (!box) return;
    box.innerHTML = tx("faq").map(([q, a], i) =>
      `<details${i === 0 ? " open" : ""}><summary>${q}</summary><div class="a"><p>${a}</p></div></details>`).join("");
  }

  // --- цены -----------------------------------------------------------------------------------------
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

  // «≈ 365 ₴ · 555 ⭐» и «7,95 USDT · 5,75 TON» — по живому курсу магазина
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
    const box = document.querySelector(".js-plans");
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
        <a class="btn ${p.best ? "btn-paper" : "btn-line"}" href="https://t.me/${BOT}?start=p_${p.id}" target="_blank" rel="noopener">${tx("buy")}</a>
      </div>`;
    }).join("");
    const tops = document.querySelector(".js-topups");
    if (tops) {
      tops.innerHTML = (c.topups || []).map((t) => `<b>${fill(tx("topup"), { h: hrs(t.hours), p: eur(t.price) })}</b>`).join(" · ") +
        ` <span class="muted">— ${tx("topup_tail")}</span>`;
    }
    const ms = document.querySelector(".js-methods");
    if (ms) {
      ms.innerHTML = [["stars", "m_stars", "m_stars_s"], ["mono", "m_mono", "m_mono_s"], ["usdt", "m_usdt", "m_usdt_s"], ["ton", "m_ton", "m_ton_s"]]
        .map(([ic, a, b]) => `<span class="method">${ICONS[ic]}<span>${tx(a)} <span class="muted">· ${tx(b)}</span></span></span>`).join("");
    }
  }

  function wireBuy() {
    document.querySelectorAll(".js-buy").forEach((a) => {
      a.href = `https://t.me/${BOT}`;
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  // --- первый экран: кадры субтитров и таймкод лекции --------------------------------------------------
  function hero() {
    const imgs = [...document.querySelectorAll(".js-subs img")];
    const tc = document.querySelector(".js-tc"), bar = document.querySelector(".js-bar");
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0, sec = 41 * 60 + 12;
    const total = 90 * 60;
    const show = () => {
      const s = sec % total;
      const pad = (n) => String(n).padStart(2, "0");
      if (tc) tc.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
      if (bar) bar.style.width = (s / total * 100).toFixed(2) + "%";
    };
    show();
    if (still) return;
    setInterval(() => { sec += 1; show(); }, 1000);
    if (imgs.length > 1) {
      setInterval(() => {
        imgs[i].classList.remove("on");
        i = (i + 1) % imgs.length;
        imgs[i].classList.add("on");
      }, 3600);
    }
  }

  // --- шапка и появление ------------------------------------------------------------------------------
  function chrome() {
    const nav = document.getElementById("nav");
    const onScroll = () => nav && nav.classList.toggle("solid", window.scrollY > 12);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    const io = "IntersectionObserver" in window ? new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }) : null;
    document.querySelectorAll(".rv").forEach((el) => (io ? io.observe(el) : el.classList.add("in")));
    document.querySelectorAll(".langs button").forEach((b) => b.addEventListener("click", () => {
      lang = b.dataset.lang;
      try { localStorage.setItem("tolk-lang", lang); } catch (e) { /* без хранилища */ }
      const u = new URL(location.href);
      u.searchParams.set("lang", lang);
      history.replaceState(null, "", u);
      applyTexts();
      loadPrices();
    }));
  }

  applyTexts();
  chrome();
  hero();
  loadPrices();
})();
