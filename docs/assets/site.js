// Tolk — сайт: тема (система / вручную), язык, 3D-окно Tolk «в разборе» (настоящие снимки слоями: субтитры, окно, конспект;
// светлая тема — снимки светлой программы) — крутится мышью и пальцем, собирается кнопкой, слой подсвечивается по выноске;
// пунктирные выноски считаются по углам слоёв. Песочница субтитров (стили, размер, слов в строке, ширина, Google / Tolk AI —
// настоящие фразы), мини-экзамен (3 задачи к конспекту-примеру, проверка как study.local_check), живые цены из магазина, вопросы.
// Без библиотек; появление — IntersectionObserver. Без скрипта всё видно и работает.
(function () {
  "use strict";
  const T = window.TOLK_TEXTS, CMP = window.TOLK_COMPARE || {};
  const LANGS = ["ru", "uk", "en", "pl", "de", "cs", "sk"];
  const SHOT_LANGS = ["ru", "uk", "sk", "en"];           // субтитры и конспект-пример; для pl/cs/de — английские (окно — на всех, data-all)
  const BOT = "TolkShopBot";
  const SHOP = (/^(127\.0\.0\.1|localhost)$/.test(location.hostname) && location.port === "8787") || /(^|\.)tolk-shop\.app$|\.workers\.dev$/.test(location.hostname)
    ? location.origin : "https://tolk-shop.seth-gamingmain.workers.dev";     // на tolk-shop.app сервер — тот же адрес
  const root = document.documentElement;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  // «Меньше движения» в системе (в Windows — «Эффекты анимации» выключены, так у многих ПК): анимация остаётся — появление,
  // 3D-окно мышью, слова заголовков; выключается только то, что движется само (парение окна, само «разбирается» при загрузке)
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
    paintShots();
    setTimeout(() => root.classList.remove("theming"), 700);
  });
  paintMeta();
  // снимки программы — в теме сайта: светлый сайт → светлая программа и светлые субтитры, тёмный → тёмная и «Графит»
  function shotSrc(im, th) {
    return im.dataset.src.replace("{lang}", im.dataset.all ? lang : shotLang).replace("{theme}", th)
      .replace("{sub}", th === "dark" ? "graphite" : "light");
  }
  function paintShots() {
    const th = isDark() ? "dark" : "light";
    $$(".js-shot").forEach((im) => { const src = shotSrc(im, th); if (im.getAttribute("src") !== src) im.src = src; });
  }
  function preloadOther() {
    const th = isDark() ? "light" : "dark";
    $$(".js-shot").forEach((im) => { const x = new Image(); x.src = shotSrc(im, th); });
  }
  sysDark.addEventListener("change", () => { if (!root.dataset.theme) paintShots(); });

  // --- язык ---------------------------------------------------------------------------------------
  function pickLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("tolk-lang"); if (LANGS.includes(s)) return s; } catch (e) { /* без хранилища */ }
    // язык системы, как в программе: весь список языков браузера; свой (первые два) — сразу, из добавленных дальше — только
    // русский и украинский (у многих Windows и браузер на английском, а русский или украинский добавлен вторым-третьим)
    const MAP = { ru: "ru", be: "ru", kk: "ru", uk: "uk", pl: "pl", de: "de", cs: "cs", sk: "sk" };   // английский — если ничего из этого
    const list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]);
    for (const [i, x] of list.entries()) {
      const c = MAP[String(x || "").slice(0, 2).toLowerCase()];
      if (c && (i <= 1 || c === "ru" || c === "uk")) return c;
    }
    return "en";
  }
  const lang = pickLang();
  const shotLang = SHOT_LANGS.includes(lang) ? lang : "en";
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
    paintShots();
    $$(".js-buy").forEach((a) => { a.href = `https://t.me/${BOT}`; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-trial").forEach((a) => { a.href = `https://t.me/${BOT}?startapp=trial`; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-free").forEach((a) => { a.href = `https://t.me/${BOT}?startapp=free`; a.target = "_blank"; a.rel = "noopener"; });
    $$(".js-mx").forEach((a) => { a.href = `https://t.me/${BOT}?start=exam`; a.target = "_blank"; a.rel = "noopener"; });
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
  const ROWS = CMP[lang] || CMP.en;                // pl/cs/de: настоящих ответов на их языке нет — английские
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

  // --- 03 песочница субтитров: стиль, размер, слов в строке, ширина за края, место — за середину; Google / Tolk AI ------------
  // Вид — как в Tolk (config.STYLE_PRESETS → классы .live[data-style]), фразы — настоящие ответы (TOLK_COMPARE). Слова проявляются
  // кусками, как в живых субтитрах; в «Графите» новые слова сначала шампанского цвета (render.ACCENT).
  const STYLES = ["graphite", "glass", "minimal", "classic", "light", "contrast"];
  const screen = $(".js-screen"), sub = $(".js-sub"), subTr = $(".js-sub-tr"), subOg = $(".js-sub-og");
  const SB = { fs: 30, words: 0, eng: "t", row: 0, w: 70, shown: 0, timer: 0, hold: 0 };
  let screenSeen = false;
  const esc = (v) => String(v).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);
  function lineWords(text, n, upto, hot) {
    // текст → слова в span.w; n > 0 — перенос после каждого n-го слова (как render.nth_word_end); upto — сколько уже проявилось
    const words = String(text || "").split(/\s+/).filter(Boolean);
    return words.map((w, i) => {
      const cls = i < upto ? (i >= upto - hot ? "w hot" : "w") : "w new";
      return `<span class="${cls}">${esc(w)}</span>` + (i < words.length - 1 ? (n > 0 && (i + 1) % n === 0 ? "<br>" : " ") : "");
    }).join("");
  }
  function sbFont() {
    const w = screen.clientWidth;                 // «экран» 1100 px шириной; на телефоне — крупнее, чтобы читалось
    sub.style.setProperty("--fs", Math.max(10, SB.fs * w / (w < 560 ? 680 : 1100)).toFixed(1) + "px");
  }
  function sbPaint(upto, hot = 0) {
    const row = ROWS[SB.row % ROWS.length], tr = row[SB.eng === "g" ? 1 : 2], og = row[0];
    const n = tr.split(/\s+/).filter(Boolean).length;
    const u = upto == null ? n : upto;
    subTr.innerHTML = lineWords(tr, SB.words, u, hot);
    const on = og.split(/\s+/).filter(Boolean).length;
    subOg.innerHTML = lineWords(og, SB.words, Math.round(on * Math.min(1, u / n)), 0);
    requestAnimationFrame(() => $$(".w.hot", sub).forEach((x) => x.classList.remove("hot")));
    return n;
  }
  function sbPlay() {
    clearTimeout(SB.timer);
    const n = sbPaint(0);
    SB.shown = 0;
    const step = () => {
      if (drag.on || document.hidden) { SB.timer = setTimeout(step, 400); return; }
      const k = 2 + (SB.shown % 3 === 0 ? 1 : 0);
      SB.shown = Math.min(n, SB.shown + k);
      sbPaint(SB.shown, k);
      if (SB.shown < n) SB.timer = setTimeout(step, 210);
      else SB.timer = setTimeout(() => { if (screenSeen) { SB.row = (SB.row + 1) % ROWS.length; sbPlay(); } else SB.timer = 0; }, 3600);
    };
    SB.timer = setTimeout(step, 260);
  }
  function sbSet() {
    sbFont();
    sub.style.width = SB.w + "%";
    $(".js-eng").textContent = SB.eng === "g" ? "Google" : "Tolk AI";
    $(".js-words-v").textContent = SB.words ? fill(tx("sb_n"), { n: SB.words }) : tx("sb_auto");
    if (!SB.timer) sbPaint();
    else sbPaint(SB.shown);
  }
  function renderSandbox() {
    const bar = $(".js-styles");
    const names = tx("styles");
    bar.innerHTML = STYLES.map((s, i) => `<button type="button" aria-pressed="${i === 0}" data-v="${s}">${names[i]}</button>`).join("");
    const pick = (box, attr, fn) => $$("button", box).forEach((b) => b.addEventListener("click", () => {
      $$("button", box).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      fn(b.dataset.v); sbSet();
    }));
    pick(bar, "v", (v) => { sub.dataset.style = v; });
    pick($(".js-size"), "v", (v) => { SB.fs = Number(v); });
    pick($(".js-engine"), "v", (v) => { SB.eng = v; });
    const words = $(".js-words");
    words.addEventListener("input", () => { SB.words = Number(words.value); sbSet(); });
    $(".js-orig").addEventListener("change", (e) => { sub.classList.toggle("no-og", !e.target.checked); });
    sbSet();
  }
  // тянуть: за середину — место на «экране», за края — ширина (как width_pct в Tolk: от центра в обе стороны)
  const drag = { on: false, mode: "", dx: 0, dy: 0 };
  sub.addEventListener("pointerdown", (e) => {
    const r = sub.getBoundingClientRect();
    drag.on = true;
    drag.mode = e.target.classList.contains("rz") ? "size" : "move";
    drag.dx = e.clientX - (r.left + r.width / 2); drag.dy = e.clientY - (r.top + r.height / 2);
    sub.setPointerCapture(e.pointerId);
    sub.classList.add(drag.mode === "size" ? "sizing" : "dragging");
    e.preventDefault();
  });
  sub.addEventListener("pointermove", (e) => {
    if (!drag.on) return;
    const box = screen.getBoundingClientRect(), r = sub.getBoundingClientRect();
    if (drag.mode === "size") {
      const cx = r.left + r.width / 2;
      const room = Math.min(cx - box.left, box.right - cx) * 2 / box.width * 100;
      SB.w = Math.round(Math.max(24, Math.min(room - 1, Math.abs(e.clientX - cx) * 2 / box.width * 100)));
      sub.style.width = SB.w + "%";
    } else {
      const hw = r.width / 2, hh = r.height / 2;
      const cx = Math.max(box.left + hw + 6, Math.min(box.right - hw - 6, e.clientX - drag.dx));
      const cy = Math.max(box.top + hh + 6, Math.min(box.bottom - hh - 6, e.clientY - drag.dy));
      sub.style.left = ((cx - box.left) / box.width * 100) + "%";
      sub.style.top = ((cy - box.top) / box.height * 100) + "%";
    }
    sub.classList.add("moved");
  });
  const endDrag = () => { drag.on = false; sub.classList.remove("dragging", "sizing"); };
  sub.addEventListener("pointerup", endDrag);
  sub.addEventListener("pointercancel", endDrag);

  // --- первый экран: 3D-окно Tolk «в разборе» -------------------------------------------------------------------------
  // Слои стоят в 3D (CSS), JS двигает их пружинами: e = 1 — разобрано (наискосок, слои разведены), e = 0 — одно ровное окно.
  // При загрузке окно собрано и само раскладывается на слои; мышью/пальцем крутится (с инерцией, потом мягко возвращается),
  // наведение чуть наклоняет, выноска или щелчок по слою — подсветить слой. Пунктир — от углов верхнего слоя к его «следу» на
  // нижнем и от выносок к слоям; точки берутся из getBoundingClientRect угловых меток — линии всегда идут туда, где слой сейчас.
  const fig = $(".js-xray"), stage = fig && $(".js-stage", fig), stack = fig && $(".stack", fig), wires = fig && $(".wires", fig);
  const L = fig ? { notes: $(".l-notes", fig), win: $(".l-win", fig), sub: $(".l-sub", fig) } : {};
  const narrow = matchMedia("(max-width: 760px)");
  const X = {
    e: gentle ? 1 : 0, ve: 0, eT: 1,              // разборка
    rx: 0, vrx: 0, rz: 0, vrz: 0,                  // поворот мышью (наклон, разворот), град.
    hx: 0, vhx: 0, hy: 0, vhy: 0, hxT: 0, hyT: 0,  // наклон за курсором
    lift: { notes: 0, win: 0, sub: 0 }, vl: { notes: 0, win: 0, sub: 0 }, focus: "",
    drag: null, raf: 0, last: 0, seen: true, t: 0,
    cz: 1, vcz: 0, cx: 0, vcx: 0, cy: 0, vcy: 0, czT: 1, cxT: 0, cyT: 0,   // «камера» закреплённого экрана (ПК)
    pin: false, step: 0,
  };
  const pt = (el, box) => { const r = el.getBoundingClientRect(); return [r.left - box.left, r.top - box.top]; };
  const corners = (el) => ["tl", "tr", "br", "bl"].map((k) => $(":scope > .c." + k, el));
  function spring(v, vel, target, k, d, dt) { const a = k * (target - v) - d * vel; vel += a * dt; return [v + vel * dt, vel]; }
  function xpaint() {
    const W = stage.clientWidth, H = stage.clientHeight, small = narrow.matches;
    const e = X.e, ec = Math.max(0, Math.min(1.06, e));
    const sE = Math.min(W / (small ? 860 : 1000), H / 720), sF = Math.min(W * 0.94 / 640, H * 0.9 / 406);
    const s = sF + (sE - sF) * Math.min(1, ec), gap = 210 * ec;
    const dx = small ? 0 : -W * 0.19 * ec;
    const pitch = 50 * ec + X.rx - X.hy * 7, spin = (-26 + X.rz) * ec + X.hx * 6 * ec;
    const yaw = (X.rz * 0.7 + X.hx * 9) * (1 - Math.min(1, ec));
    stack.style.transform = `translate(${dx.toFixed(1)}px, ${(H * 0.08 * ec).toFixed(1)}px) scale(${s.toFixed(4)}) rotateX(${pitch.toFixed(2)}deg) rotateY(${yaw.toFixed(2)}deg) rotateZ(${spin.toFixed(2)}deg)`;
    const fl = (k) => (gentle || small ? 0 : Math.sin(X.t * 1.1 + k) * 7 * Math.min(1, ec));
    L.notes.style.transform = `translateZ(${(-gap - 2 + fl(0) + 46 * X.lift.notes).toFixed(1)}px)`;
    L.win.style.transform = `translateZ(${(fl(2.1) + 46 * X.lift.win).toFixed(1)}px)`;
    const sy = 298 * (1 - Math.min(1, ec));
    L.sub.style.transform = `translate3d(0, ${sy.toFixed(1)}px, ${(gap + 2 + fl(4.2) + 46 * X.lift.sub).toFixed(1)}px)`;
    $(".fp-sub", fig).style.top = 20 + sy + "px";
    fig.style.setProperty("--fp", Math.min(1, ec).toFixed(3));
    fig.style.setProperty("--co", small ? "1" : Math.max(0, Math.min(1, ec * 1.6 - 0.5)).toFixed(3));
    const box = fig.getBoundingClientRect();
    let d = "";
    if (ec > 0.02) {
      [[L.win, $(".fp-win", fig)], [L.sub, $(".fp-sub", fig)]].forEach(([up, fp]) => {
        const a = corners(up), b = corners(fp);
        a.forEach((c, k) => { const [x1, y1] = pt(c, box), [x2, y2] = pt(b[k], box); d += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}"/>`; });
      });
      if (!small && !(X.pin && X.step)) {
        $$(".callouts li", fig).forEach((li) => {
          const r = li.getBoundingClientRect(), x1 = r.left - box.left - 4, y1 = r.top - box.top + 16;
          const [x2, y2] = pt($(":scope > .c.mr", L[li.dataset.for]), box);
          d += `<path class="lead" d="M${x1.toFixed(1)} ${y1.toFixed(1)}h-14L${x2.toFixed(1)} ${y2.toFixed(1)}"/><circle cx="${x2.toFixed(1)}" cy="${y2.toFixed(1)}" r="3"/>`;
        });
      }
    }
    wires.innerHTML = d;
    wires.style.opacity = Math.min(1, ec).toFixed(3);
    stage.style.transform = X.pin && (Math.abs(X.cz - 1) > 0.001 || Math.abs(X.cx) + Math.abs(X.cy) > 0.3)
      ? `translate(${X.cx.toFixed(1)}px, ${X.cy.toFixed(1)}px) scale(${X.cz.toFixed(4)})` : "";
    camTarget(box);
  }
  // приближение к слою шага: где слой на экране без текущего приближения → сдвиг и масштаб, чтобы он встал в центр окна справа
  function camTarget(f) {
    if (!X.pin || !X.focus) { X.czT = 1; X.cxT = 0; X.cyT = 0; return; }
    const r = L[X.focus].getBoundingClientRect();
    const fx = f.left + f.width / 2, fy = f.top + f.height / 2;
    const lx = fx + (r.left + r.width / 2 - fx - X.cx) / X.cz, ly = fy + (r.top + r.height / 2 - fy - X.cy) / X.cz;
    const w = r.width / X.cz, hh = r.height / X.cz;
    const z = Math.max(1, Math.min(X.focus === "sub" ? 1.9 : 1.55, f.width * 0.86 / w, f.height * 0.74 / hh));
    X.czT = z; X.cxT = -z * (lx - fx); X.cyT = -z * (ly - fy);
  }
  function xstep(now) {
    X.raf = 0;
    const dt = Math.min(0.034, X.last ? (now - X.last) / 1000 : 0.016);
    X.last = now; X.t += dt;
    [X.e, X.ve] = spring(X.e, X.ve, X.eT, 52, 11.5, dt);
    if (!X.drag) {
      [X.rx, X.vrx] = spring(X.rx, X.vrx, 0, 9, 5.2, dt);
      [X.rz, X.vrz] = spring(X.rz, X.vrz, 0, 9, 5.2, dt);
    }
    [X.hx, X.vhx] = spring(X.hx, X.vhx, X.hxT, 40, 12, dt);
    [X.hy, X.vhy] = spring(X.hy, X.vhy, X.hyT, 40, 12, dt);
    Object.keys(X.lift).forEach((k) => { [X.lift[k], X.vl[k]] = spring(X.lift[k], X.vl[k], X.focus === k ? 1 : 0, 60, 13, dt); });
    [X.cz, X.vcz] = spring(X.cz, X.vcz, X.czT, 26, 9.5, dt);
    [X.cx, X.vcx] = spring(X.cx, X.vcx, X.cxT, 26, 9.5, dt);
    [X.cy, X.vcy] = spring(X.cy, X.vcy, X.cyT, 26, 9.5, dt);
    xpaint();
    const moving = Math.abs(X.e - X.eT) + Math.abs(X.ve) + Math.abs(X.rx) + Math.abs(X.rz) + Math.abs(X.vrx) + Math.abs(X.vrz)
      + Math.abs(X.hx - X.hxT) + Math.abs(X.hy - X.hyT) + Object.keys(X.lift).reduce((a, k) => a + Math.abs(X.lift[k] - (X.focus === k ? 1 : 0)), 0)
      + Math.abs(X.cz - X.czT) * 40 + (Math.abs(X.cx - X.cxT) + Math.abs(X.cy - X.cyT)) / 20 + Math.abs(X.vcz) + Math.abs(X.vcx) / 50 > 0.002;
    const floating = !gentle && !narrow.matches && X.e > 0.5;
    if (X.seen && !document.hidden && (moving || floating || X.drag)) X.raf = requestAnimationFrame(xstep);
    else X.last = 0;
  }
  const xkick = () => { if (fig && !X.raf) X.raf = requestAnimationFrame(xstep); };
  function xfocus(k) {
    X.focus = X.focus === k ? "" : k;
    if (X.focus && X.eT < 1) xsetOpen(1);
    if (X.focus) fig.dataset.focus = X.focus; else delete fig.dataset.focus;
    $$(".callouts li", fig).forEach((li) => li.classList.toggle("on", li.dataset.for === X.focus));
    xkick();
  }
  function xsetOpen(v) {
    X.eT = v;
    if (!v && X.focus) xfocus(X.focus);
    $(".js-x-label", fig).textContent = tx(v ? "x_close" : "x_open");
    xkick();
  }
  function initXray() {
    if (!fig) return;
    $(".js-x-label", fig).textContent = tx("x_close");
    if (!fine.matches) $(".x-hint", fig).textContent = tx("x_hint_t");
    $(".js-x-toggle", fig).addEventListener("click", () => { fig.classList.add("touched"); xsetOpen(X.eT ? 0 : 1); });
    $$(".callouts li", fig).forEach((li) => $("button", li).addEventListener("click", () => xfocus(li.dataset.for)));
    stage.addEventListener("pointerdown", (e) => {
      if (e.button) return;
      X.drag = { x: e.clientX, y: e.clientY, rx: X.rx, rz: X.rz, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: 0 };
      stage.setPointerCapture(e.pointerId);
      stage.classList.add("grabbing");
      xkick();
    });
    stage.addEventListener("pointermove", (e) => {
      const r = fig.getBoundingClientRect();
      X.hxT = Math.max(-1, Math.min(1, (e.clientX - r.left) / r.width * 2 - 1));
      X.hyT = Math.max(-1, Math.min(1, (e.clientY - r.top) / r.height * 2 - 1));
      const g = X.drag;
      if (g) {
        const now = performance.now(), dt = Math.max(1, now - g.lt) / 1000;
        X.rz = g.rz + (e.clientX - g.x) * 0.32;
        X.rx = Math.max(-44, Math.min(28, g.rx - (e.clientY - g.y) * 0.22));
        X.vrz = (e.clientX - g.lx) * 0.32 / dt * 0.6;
        X.vrx = -(e.clientY - g.ly) * 0.22 / dt * 0.6;
        g.moved = Math.max(g.moved, Math.abs(e.clientX - g.x) + Math.abs(e.clientY - g.y));
        g.lx = e.clientX; g.ly = e.clientY; g.lt = now;
        if (g.moved > 6) fig.classList.add("touched");
      }
      xkick();
    });
    const end = (e) => {
      const g = X.drag;
      if (!g) return;
      X.drag = null;
      stage.classList.remove("grabbing");
      if (g.moved < 6 && e && e.type === "pointerup") {                       // щелчок по слою — подсветить его
        const hit = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el.classList && el.classList.contains("layer"));
        if (hit) xfocus(hit.dataset.l);
      }
      xkick();
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
    fig.addEventListener("pointerleave", () => { X.hxT = 0; X.hyT = 0; xkick(); });
    new IntersectionObserver((list) => { X.seen = list[0].isIntersecting; xkick(); }).observe(fig);
    document.addEventListener("visibilitychange", xkick);
    xpaint();
    if (!gentle) setTimeout(() => { X.eT = 1; xkick(); }, 650);
    X.eT = gentle ? 1 : 0;
    xkick();
  }

  // --- ПК: первый экран закреплён на ~2 экрана прокрутки. Шаги: 0 — окно в разборе (как было), 1 — субтитры, 2 — окно перевода,
  // 3 — конспект (слой приближается, остальные гаснут), 4 — окно собирается; слева вместо заголовка — шаги 01–04.
  // Телефон, планшет, низкий экран и «меньше движения» — как раньше, без закрепления.
  const heroEl = $("#hero"), stepsEl = $(".js-steps");
  const pinMQ = matchMedia("(min-width: 1101px) and (min-height: 640px)");
  const STEP_AT = [0, 0.08, 0.31, 0.54, 0.77];              // где начинается шаг (доля прокрутки закреплённого экрана)
  function pinSpan() { return Math.max(1, heroEl.offsetHeight - innerHeight); }
  function pinSetup() {
    const on = Boolean(fig && heroEl && stepsEl && pinMQ.matches && !gentle);
    if (on === X.pin) { pinScroll(); return; }
    X.pin = on;
    document.documentElement.classList.toggle("hero-pin", on);
    if (!on) { pinStep(0); stage.style.transform = ""; X.cz = 1; X.cx = X.cy = 0; }
    pinScroll();
  }
  function pinScroll() {
    if (!X.pin) return;
    const p = Math.max(0, Math.min(1, -heroEl.getBoundingClientRect().top / pinSpan()));
    let s = 0;
    STEP_AT.forEach((at, i) => { if (p >= at) s = i; });
    const end = s < 4 ? STEP_AT[s + 1] : 1;
    stepsEl.style.setProperty("--sp", s ? Math.min(1, (p - STEP_AT[s]) / (end - STEP_AT[s])).toFixed(3) : "0");
    if (s !== X.step) pinStep(s);
  }
  function pinStep(s) {
    X.step = s;
    heroEl.dataset.step = String(s);
    $$("li", stepsEl).forEach((li) => li.classList.toggle("on", Number(li.dataset.s) === s));
    const k = ["", "sub", "win", "notes", ""][s];
    X.focus = k;
    if (k) fig.dataset.focus = k; else delete fig.dataset.focus;
    $$(".callouts li", fig).forEach((li) => li.classList.toggle("on", li.dataset.for === k));
    if (s) { X.eT = s === 4 ? 0 : 1; $(".js-x-label", fig).textContent = tx(X.eT ? "x_close" : "x_open"); }
    stepsEl.setAttribute("aria-hidden", s ? "false" : "true");
    $$("button, a", stepsEl).forEach((el) => { el.tabIndex = s ? 0 : -1; });
    xkick();
  }
  function initPin() {
    if (!fig || !heroEl || !stepsEl) return;
    $$("li > button", stepsEl).forEach((b) => b.addEventListener("click", (e) => {      // шаг — прокрутить к нему
      if (e.target.closest("a")) return;
      const i = Number(b.parentElement.dataset.s);
      scrollTo({ top: heroEl.offsetTop + pinSpan() * (STEP_AT[i] + 0.04), behavior: gentle ? "auto" : "smooth" });
    }));
    pinMQ.addEventListener("change", pinSetup);
    pinSetup();
  }

  // --- 05 мини-экзамен: три задачи к конспекту-примеру «Ohmov zákon» (как «Задачи для практики» в Tolk Pro) --------------------
  // Условие — на языке пары (словацкий), под ним перевод на языке сайта; проверка — как study.local_check: одно число ±1 % и
  // единица (A или mA). Почти: число верное без единицы, или ток одной ветки вместо общего.
  const COURSE = "Fyzika 1 · prednáška 3";
  const TASKS = [
    { lv: "easy", num: 0.25, q: "Na rezistor s odporom 20 Ω pripojíme napätie 5 V. Aký prúd ním tečie?",
      h: "Použi Ohmov zákon: I = U / R.", steps: ["I = U / R", "I = 5 V / 20 Ω = 0,25 A"], ans: "0,25 A" },
    { lv: "medium", num: 0.1, q: "Rezistory 30 Ω a 60 Ω sú zapojené sériovo na napätie 9 V. Aký prúd tečie obvodom?",
      h: "Pri sériovom zapojení sa odpory sčítajú.", steps: ["R = R₁ + R₂ = 30 Ω + 60 Ω = 90 Ω", "I = U / R = 9 V / 90 Ω = 0,1 A"], ans: "0,1 A" },
    { lv: "hard", num: 0.6, near: [0.4, 0.2], q: "Tie isté rezistory 30 Ω a 60 Ω zapojíme paralelne na napätie 12 V. Aký celkový prúd odoberá obvod?",
      h: "Pri paralelnom zapojení je na oboch rezistoroch rovnaké napätie.",
      steps: ["I₁ = U / R₁ = 12 V / 30 Ω = 0,4 A", "I₂ = U / R₂ = 12 V / 60 Ω = 0,2 A", "I = I₁ + I₂ = 0,4 A + 0,2 A = 0,6 A"], ans: "0,6 A" },
  ];
  const METHOD = "Metóda: Ohmov zákon, ako na prednáške";
  const EXS = { i: 0, res: TASKS.map(() => ({ mine: "", v: "" })) };
  function exNums(text) {
    let s = String(text || "").replace(/[−–]/g, "-").replace(/[  ]/g, " ");
    s = s.split("=").pop().replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/(\d),(?=\d)/g, "$1.")
      .replace(/\s*[·×x*]\s*10\s*\^?\s*\{?\s*([-+]?\d+)\s*\}?/g, "e$1").replace(/E/g, "e");
    const m = s.match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?(?:\/\d+(?:\.\d+)?)?/g) || [];
    return { vals: m.map((x) => { const [a, b] = x.split("/"); return b ? Number(a) / Number(b) : Number(a); }).filter((v) => isFinite(v)), tail: s };
  }
  function exVerdict(t, text) {
    const { vals, tail } = exNums(text);
    if (vals.length !== 1) return vals.length ? "wrong" : "";
    const u = tail.replace(/А/g, "A").replace(/а/g, "a").replace(/м/g, "m").replace(/М/g, "M");
    const milli = /\d\s*m\s?a\b/i.test(u) || /mili?amp|милл?иампер|міліампер/i.test(text);
    const amp = milli || /\d\s*a\b/i.test(u) || /amp[eé]r|ампер/i.test(text);
    const v = milli ? vals[0] / 1000 : vals[0];
    const near = (x) => Math.abs(v - x) <= Math.abs(x) * 0.01;
    if (near(t.num)) return amp ? "right" : "unit";
    if ((t.near || []).some(near)) return "branch";
    return "wrong";
  }
  function renderExam() {
    const box = $(".js-exam"), E = tx("ex"), TR = lang === "sk" ? null : (tx("ex_tr") || null);
    if (!box || !E) return;
    $(".js-exam-note").textContent = E.note;
    const two = (og, tl) => `<span class="og">${esc(og)}</span>` + (tl ? `<span class="tl">${esc(tl)}</span>` : "");
    const dots = () => `<span class="dots-n" aria-hidden="true">${TASKS.map((t, k) => `<i class="${k === EXS.i ? "cur " : ""}${({ right: "right", unit: "partial", branch: "partial", wrong: "wrong" })[EXS.res[k].v] || ""}"></i>`).join("")}</span>`;
    if (EXS.i >= TASKS.length) {
      const r = EXS.res.filter((x) => x.v === "right").length;
      box.innerHTML = `<div class="end"><div class="pr-top"><span class="pr-n">${esc(fill(E.end, { r, m: TASKS.length }))}</span>${dots()}</div>
        <p class="score">${r}<em>/${TASKS.length}</em></p><p><b>${esc(r === TASKS.length ? E.end_all : E.end_some)}</b> ${esc(E.end_p)}</p>
        <div class="row"><a class="btn js-ex-pro" href="#pricing">${esc(E.go)}${ARR}</a><button type="button" class="lnk js-ex-again">${esc(E.again)}</button></div></div>`;
      $(".js-ex-pro", box).addEventListener("click", () => { proView = true; renderPrices(); });
      $(".js-ex-again", box).addEventListener("click", () => { EXS.i = 0; EXS.res = TASKS.map(() => ({ mine: "", v: "" })); renderExam(); $(".field", box).focus(); });
      typograph(box);
      magnet(box);
      return;
    }
    const t = TASKS[EXS.i], st = EXS.res[EXS.i], tr = TR && TR.items ? TR.items[EXS.i] : null;
    box.innerHTML = `<div class="pr-top"><span class="pr-n">${esc(fill(E.task, { n: EXS.i + 1, m: TASKS.length }))}</span>
        <span class="pr-lvl ${t.lv}">${esc(E.lv[t.lv])}</span><span class="pr-from">${esc(fill(E.from, { c: COURSE }))}</span>${dots()}</div>
      <div class="pr-q">${two(t.q, tr && tr.q)}</div>
      <div class="row"><button type="button" class="lnk js-ex-hint">${esc(E.hint)}</button></div>
      <div class="pr-hint" hidden>${two(t.h, tr && tr.h)}</div>
      <form class="row js-ex-form" autocomplete="off"><input class="field" type="text" inputmode="decimal" spellcheck="false" placeholder="${esc(E.ph)}" value="${esc(st.mine)}" aria-label="${esc(E.ph)}">
        <button type="submit" class="btn">${esc(E.check)}</button></form>
      <p class="pr-v" hidden></p>
      <div class="row"><button type="button" class="lnk js-ex-sol">${esc(E.sol)}</button></div>
      <div class="pr-sol" hidden><p class="cap">${esc(E.sol_h)}</p><p class="meth">${two(METHOD, TR && TR.meth)}</p>
        <ol>${t.steps.map((x) => `<li>${esc(x)}</li>`).join("")}</ol><p class="fin"><b>${esc(E.ans)}</b> ${esc(t.ans)}</p></div>
      <div class="nav-x"><button type="button" class="lnk js-ex-prev"${EXS.i ? "" : " hidden"}>${esc(E.prev)}</button><span></span>
        <button type="button" class="lnk js-ex-next">${esc(EXS.i === TASKS.length - 1 ? E.finish : E.next)} →</button></div>`;
    typograph(box);
    const field = $(".field", box), verdict = $(".pr-v", box);
    const paint = (v) => {
      verdict.hidden = !v;
      if (!v) return;
      const head = { right: E.ok, unit: E.part, branch: E.part, wrong: E.bad }[v];
      const note = { unit: E.unit, branch: E.branch, wrong: E.wrong }[v];
      verdict.className = "pr-v " + ({ right: "ok", unit: "gold", branch: "gold", wrong: "err" })[v];
      verdict.innerHTML = `<b>${esc(head)}</b>${note ? " — " + esc(note) : ""}`;
    };
    paint(st.v);
    $(".js-ex-hint", box).addEventListener("click", (e) => { $(".pr-hint", box).hidden = false; e.currentTarget.hidden = true; });
    $(".js-ex-sol", box).addEventListener("click", (e) => { $(".pr-sol", box).hidden = false; e.currentTarget.hidden = true; });
    $(".js-ex-form", box).addEventListener("submit", (e) => {
      e.preventDefault();
      st.mine = field.value;
      if (!field.value.trim()) { field.focus(); return; }
      st.v = exVerdict(t, field.value) || "wrong";
      paint(st.v);
      box.querySelectorAll(".dots-n i")[EXS.i].className = "cur " + ({ right: "right", unit: "partial", branch: "partial", wrong: "wrong" })[st.v];
    });
    field.addEventListener("input", () => { st.mine = field.value; });
    const go = (n) => { EXS.i = n; renderExam(); const f = $(".field", box); if (f && matchMedia("(hover: hover)").matches) f.focus({ preventScroll: true }); };
    $(".js-ex-prev", box).addEventListener("click", () => go(EXS.i - 1));
    $(".js-ex-next", box).addEventListener("click", () => go(EXS.i + 1));
    magnet(box);
  }

  // --- вопросы -------------------------------------------------------------------------------------------
  function renderFaq() {
    const box = $(".js-faq");
    const items = tx("faq").map(([q, a]) => `<details><summary>${q}</summary><div class="a"><p>${a}</p></div></details>`);
    const half = Math.ceil(items.length / 2);
    box.innerHTML = `<div class="col">${items.slice(0, half).join("")}</div><div class="col">${items.slice(half).join("")}</div>`;
    $$(".js-buy", box).forEach((a) => { a.target = "_blank"; a.rel = "noopener"; });
    // плавно раскрывается и закрывается (высота ответа)
    $$("details", box).forEach((d) => {
      const a = $(".a", d);
      $("summary", d).addEventListener("click", (e) => {
        e.preventDefault();
        if (d.dataset.busy) return;
        d.dataset.busy = "1";
        const opening = !d.open;
        if (opening) d.open = true;
        const h = a.scrollHeight;
        const anim = a.animate([{ height: opening ? "0px" : h + "px", opacity: opening ? 0 : 1 }, { height: opening ? h + "px" : "0px", opacity: opening ? 1 : 0 }],
          { duration: 420, easing: "cubic-bezier(.16,1,.3,1)" });
        anim.onfinish = () => { if (!opening) d.open = false; delete d.dataset.busy; };
      });
    });
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
    const disc = sv.same ? `−${sv.pct}${lang === "en" || lang === "pl" ? "" : " "}%` : fill(tx("sale_upto"), { p: sv.pct });
    const until = new Date(sv.until).toLocaleDateString({ ru: "ru-RU", uk: "uk-UA", sk: "sk-SK", en: "en-GB", pl: "pl-PL", cs: "cs-CZ", de: "de-DE" }[lang] || "ru-RU",
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
      cd.textContent = (d ? d + (lang === "en" ? "d " : " " + ({ ru: "д", uk: "д", de: "T" }[lang] || "d") + " ") : "") +
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


  // --- прокрутка: линия прогресса, шапка, «экран» в поле зрения ------------------------------------------------------------
  const nav = $("#nav"), bar = $(".progress i");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = scrollY;
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
    nav.classList.toggle("scrolled", y > 20);
    pinScroll();
    const c = $(".js-cmp").getBoundingClientRect();
    cmpActive = c.top < innerHeight * 0.85 && c.bottom > innerHeight * 0.15;
  }
  const kick = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };

  // появление: блоки с data-rise — по одному, когда доходят до экрана; заголовки — по словам (выезжают из-под строки)
  function rise() {
    const els = $$("[data-rise], .plan, .faq details, .colophon > div");
    els.forEach((el) => el.setAttribute("data-rise", ""));
    if (!("IntersectionObserver" in window)) { els.forEach((el) => el.classList.add("in")); $$(".split").forEach((x) => x.classList.add("on")); return; }
    const io = new IntersectionObserver((list) => list.forEach((en) => {
      if (!en.isIntersecting) return;
      const sib = en.target.parentElement ? [...en.target.parentElement.children].filter((x) => x.hasAttribute("data-rise")) : [];
      en.target.style.transitionDelay = Math.min(4, Math.max(0, sib.indexOf(en.target))) * 70 + "ms";
      en.target.classList.add("in");
      $$(".split", en.target).forEach((x) => x.classList.add("on"));
      io.unobserve(en.target);
    }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((el) => io.observe(el));
    const sc = new IntersectionObserver((list) => list.forEach((en) => {
      screenSeen = en.isIntersecting;
      if (screenSeen && !SB.timer) sbPlay();
    }), { threshold: .4 });
    sc.observe(screen);
  }
  // слова заголовка → <span class="w"><span>слово</span></span>; неразрывные пробелы (typograph) держат пары слов вместе
  function split(el) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (w.nextNode()) nodes.push(w.currentNode);
    let i = 0;
    nodes.forEach((n) => {
      const parts = n.nodeValue.split(/( +)/);
      const frag = document.createDocumentFragment();
      parts.forEach((p) => {
        if (!p) return;
        if (/^ +$/.test(p)) { frag.append(" "); return; }
        const o = document.createElement("span"), inner = document.createElement("span");
        o.className = "w"; inner.textContent = p; o.style.setProperty("--i", i++); o.append(inner); frag.append(o);
      });
      n.replaceWith(frag);
    });
    el.classList.add("split");
  }
  function intro() {
    $$(".hero [data-in]:not(.split), .nav > *").forEach((el, i) => {
      el.animate([{ opacity: 0, transform: "translateY(18px)" }, { opacity: 1, transform: "none" }],
        { duration: gentle ? 600 : 1100, delay: 60 + i * 70, easing: "cubic-bezier(.16,1,.3,1)", fill: "backwards" });
    });
    requestAnimationFrame(() => setTimeout(() => $(".hero .split") && $(".hero .split").classList.add("on"), 120));
  }

  // --- живость: панели подсвечиваются под курсором, кнопки тянутся к нему, мягкий ореол за курсором ------------------------
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  function magnet(scope) {
    if (!fine.matches) return;
    $$(".btn, .pill", scope).forEach((b) => {
      if (b.dataset.mag) return;
      b.dataset.mag = "1";
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.setProperty("--tx", ((e.clientX - r.left - r.width / 2) * 0.16).toFixed(1) + "px");
        b.style.setProperty("--ty", ((e.clientY - r.top - r.height / 2) * 0.28).toFixed(1) + "px");
      });
      b.addEventListener("pointerleave", () => { b.style.setProperty("--tx", "0px"); b.style.setProperty("--ty", "0px"); });
    });
  }
  function lively() {
    if (!fine.matches) return;
    magnet(document);
    const aura = document.createElement("div");
    aura.className = "aura"; aura.setAttribute("aria-hidden", "true");
    document.body.prepend(aura);
    const A = { x: innerWidth / 2, y: innerHeight / 3, tx: innerWidth / 2, ty: innerHeight / 3, raf: 0 };
    const tick = () => {
      A.raf = 0;
      A.x += (A.tx - A.x) * 0.12; A.y += (A.ty - A.y) * 0.12;
      aura.style.transform = `translate3d(${A.x.toFixed(1)}px, ${A.y.toFixed(1)}px, 0)`;
      if (Math.abs(A.tx - A.x) + Math.abs(A.ty - A.y) > 0.5) A.raf = requestAnimationFrame(tick);
    };
    addEventListener("pointermove", (e) => {
      A.tx = e.clientX; A.ty = e.clientY;
      aura.classList.add("on");
      if (!A.raf) A.raf = requestAnimationFrame(tick);
      const el = e.target.closest && e.target.closest(".spot");
      if (el) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left).toFixed(0) + "px");
        el.style.setProperty("--my", (e.clientY - r.top).toFixed(0) + "px");
      }
    }, { passive: true });
    document.addEventListener("pointerleave", () => aura.classList.remove("on"));
  }

  // --- старт ---------------------------------------------------------------------------------------------
  applyTexts();
  initDownloads();
  renderCompare();
  renderSandbox();
  renderExam();
  renderFaq();
  renderPrices();
  $$(".display, .lede, .body, .faq, .fine, .os-hint, .pay-notes, .spec dd, .callouts, .steps-x, .exam").forEach(typograph);
  $$(".display").forEach(split);
  // крупный заголовок на узком телефоне: пара слов с неразрывным пробелом («od pierwszego») шире экрана — уменьшаем шрифт,
  // пока строка не влезет (иначе страница уезжает вбок)
  function fitDisplay() {
    const vw = document.documentElement.clientWidth;
    $$(".display").forEach((el) => {
      el.style.fontSize = "";
      const room = () => Math.min(el.clientWidth || vw, vw - Math.max(0, el.getBoundingClientRect().left) - 12);
      const widest = () => Math.max(0, ...$$(".w", el).map((w) => w.getBoundingClientRect().width));
      let fs = parseFloat(getComputedStyle(el).fontSize), guard = 0;
      while (widest() > room() + 1 && fs > 22 && guard++ < 50) { fs -= 1.5; el.style.fontSize = fs + "px"; }
    });
  }
  fitDisplay();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitDisplay);
  addEventListener("resize", () => requestAnimationFrame(fitDisplay));
  rise();
  intro();
  initXray();
  initPin();
  lively();
  addEventListener("scroll", kick, { passive: true });
  addEventListener("resize", () => { if (fig) { xpaint(); pinScroll(); } sbFont(); });
  narrow.addEventListener("change", () => { if (fig) xpaint(); });
  $$(".js-xray img").forEach((im) => im.addEventListener("load", () => { if (fig) xpaint(); }));
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { if (fig) xpaint(); });
  onScroll();
  loadPrices();
  requestAnimationFrame(tickCompare);
  addEventListener("load", () => setTimeout(preloadOther, 1500));

  // проверка снимками: ?shot=<px> — прокрутить туда сразу после загрузки
  const shot = Number(new URLSearchParams(location.search).get("shot"));
  if (shot) setTimeout(() => { scrollTo(0, shot); onScroll(); }, 600);
})();
