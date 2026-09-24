// Значки способов оплаты (векторные, по образцам продавца) и общие мелочи обеих страниц сайта.
window.TOLK_ICONS = {
  mono: `<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#4a4d55"/><stop offset=".55" stop-color="#2a2c31"/><stop offset="1" stop-color="#18191c"/></linearGradient></defs>
    <rect width="96" height="96" rx="22" fill="url(#gm)"/><text x="48" y="58" text-anchor="middle" fill="#fff"
    font-family="Manrope, Arial Black, Arial, sans-serif" font-weight="800" font-size="27" letter-spacing="-1">mono</text></svg>`,
  usdt: `<svg viewBox="0 0 96 96" aria-hidden="true"><circle cx="48" cy="48" r="46" fill="#53ae94"/>
    <path fill="#fff" d="M25 24h46v12H54v7.2c10.8.6 18.8 3 18.8 5.8s-8 5.2-18.8 5.8V74H42V54.8C31.2 54.2 23.2 51.8 23.2 49s8-5.2 18.8-5.8V36H25z"/>
    <ellipse cx="48" cy="49" rx="21" ry="3.6" fill="#53ae94"/><path fill="#fff" d="M42 45.9v4.5c1.9.1 3.9.2 6 .2s4.1-.1 6-.2v-4.5c-1.9-.1-3.9-.2-6-.2s-4.1.1-6 .2z"/></svg>`,
  ton: `<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="gt" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2aa4f4"/><stop offset="1" stop-color="#1d8ae8"/></linearGradient></defs>
    <rect width="96" height="96" rx="26" fill="url(#gt)"/>
    <path fill="#fff" stroke="#fff" stroke-width="5" stroke-linejoin="round" d="M29 33h38l9 12-28 30-28-30z"/>
    <path fill="#1f91ec" d="M58 36l3.2 8.8 8.8 3.2-8.8 3.2L58 60l-3.2-8.8L46 48l8.8-3.2z"/></svg>`,
  stars: `<svg viewBox="0 0 96 96" aria-hidden="true"><defs><linearGradient id="gs" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffd84a"/><stop offset=".5" stop-color="#f6b90d"/><stop offset="1" stop-color="#d98c00"/></linearGradient>
    <linearGradient id="gs2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe46b"/><stop offset="1" stop-color="#f7c21a"/></linearGradient></defs>
    <path fill="url(#gs)" d="M48 7c2.6 0 4.6 1.6 5.8 4.2l8.7 18.2 19.8 2.6c5.2.7 7.2 7 3.4 10.6L71.3 56.5l3.6 19.7c.9 5.1-4.4 9-9 6.6L48 73.2 30.1 82.8c-4.6 2.4-9.9-1.5-9-6.6l3.6-19.7L10.3 42.6c-3.8-3.6-1.8-9.9 3.4-10.6l19.8-2.6 8.7-18.2C43.4 8.6 45.4 7 48 7z"/>
    <path fill="url(#gs2)" d="M14 36c18-4 42-5 64-2 2 .3 2.4 3 .6 3.8L40 58c-3 1.6-6.4-1.7-4.9-4.8l3-6.2C30 45 21 44 14 43c-3.9-.6-3.9-6.1 0-7z" opacity=".95"/></svg>`,
};

// значок с собственными id градиентов: одинаковые id в скрытом блоке ломают заливку в видимом
window.tolkIcon = function (name) {
  const n = (window.tolkIcon.k = (window.tolkIcon.k || 0) + 1);
  return (window.TOLK_ICONS[name] || window.TOLK_ICONS.mono).replace(/id="(g\w+)"/g, `id="$1_${n}"`).replace(/url\(#(g\w+)\)/g, `url(#$1_${n})`);
};

// язык страницы: ?lang= → сохранённый → язык браузера
window.tolkLang = function () {
  const ok = ["ru", "uk", "sk", "en"];
  const q = new URLSearchParams(location.search).get("lang");
  if (ok.includes(q)) return q;
  try { const s = localStorage.getItem("tolk-lang"); if (ok.includes(s)) return s; } catch (e) {}
  const n = (navigator.language || "ru").slice(0, 2).toLowerCase();
  return n === "uk" ? "uk" : n === "sk" || n === "cs" ? "sk" : n === "ru" || n === "be" || n === "kk" ? "ru" : "en";
};
window.tolkSaveLang = function (l) { try { localStorage.setItem("tolk-lang", l); } catch (e) {} };

// магазин: на этом компьютере (проверка) — локальный, иначе — настоящий
window.TOLK_SHOP = /^(127\.0\.0\.1|localhost)$/.test(location.hostname) && location.port === "8787"
  ? location.origin : "https://tolk-shop.seth-gamingmain.workers.dev";
window.TOLK_DOWNLOAD = "https://github.com/sethosint/tolk-releases/releases/latest/download/Tolk-Setup.exe";

// переход на другую страницу сайта — через золотую шторку
window.tolkGo = function (href) {
  const c = document.querySelector(".curtain");
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) { location.href = href; return; }
  c.style.transform = "";
  c.classList.add("up");                                   // шторка поднимается снизу и закрывает страницу
  setTimeout(() => { location.href = href; }, 620);
};
window.addEventListener("pageshow", () => {                // новая страница: шторка уезжает вверх и открывает её
  const c = document.querySelector(".curtain");
  if (!c || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  c.classList.remove("up");
  c.style.transition = "none"; c.style.transform = "none"; void c.offsetHeight;
  c.style.transition = ""; c.style.transform = "translateY(-100%)";
  setTimeout(() => { c.style.transition = "none"; c.style.transform = ""; void c.offsetHeight; c.style.transition = ""; }, 900);
});

window.tolkToast = function (t) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.textContent = t; el.classList.add("on");
  clearTimeout(window.tolkToast.h); window.tolkToast.h = setTimeout(() => el.classList.remove("on"), 2300);
};
window.tolkEsc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
