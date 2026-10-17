// Tolk — Толик на сайте: фенек справа внизу. 3D (assets/tolik.js, тот же, что в программе и мини-приложении) грузится
// только после загрузки страницы и паузы — первый экран не тормозит. Щелчок — разговор: Толик отвечает гостю про Tolk на его
// языке (/api/tolik/ask, 12 вопросов в сутки с адреса). Без WebGL — картинка; при «Экономии трафика» — не грузится вовсе.
(function () {
  "use strict";
  const LANGS = ["ru", "uk", "en", "pl", "de", "cs", "sk"];
  const BOT = "TolkShopBot";
  const SHOP = /(^|\.)tolk-shop\.app$|\.workers\.dev$/.test(location.hostname) ? location.origin : "https://tolk-shop.seth-gamingmain.workers.dev";
  const T = {
    ru: { hi: "Привет! Я Толик — фенек Tolk. Спроси меня, как он работает.", name: "Толик", sub: "фенек Tolk · отвечает за пару секунд",
          ph: "Спроси Толика…", c1: "Сколько стоит?", c2: "Как попробовать бесплатно?", c3: "Работает в Zoom и Teams?", trial: "30 минут бесплатно",
          err: "Что-то связь шалит — попробуй ещё раз.", tired: "Я на сегодня наговорился 🦊 Напиши в бота — там ответят.", close: "Закрыть", send: "Отправить",
          pet: "Фыр! Приятно 🦊" },
    uk: { hi: "Привіт! Я Толік — фенек Tolk. Запитай, як він працює.", name: "Толік", sub: "фенек Tolk · відповідає за пару секунд",
          ph: "Запитай Толіка…", c1: "Скільки коштує?", c2: "Як спробувати безкоштовно?", c3: "Працює в Zoom і Teams?", trial: "30 хвилин безкоштовно",
          err: "Щось зі зв'язком — спробуй ще раз.", tired: "Я на сьогодні наговорився 🦊 Напиши в бота — там відповідять.", close: "Закрити", send: "Надіслати",
          pet: "Фир! Приємно 🦊" },
    en: { hi: "Hi! I'm Tolik, Tolk's fennec. Ask me how it works.", name: "Tolik", sub: "Tolk's fennec · answers in seconds",
          ph: "Ask Tolik…", c1: "How much is it?", c2: "How can I try it for free?", c3: "Does it work in Zoom and Teams?", trial: "30 minutes free",
          err: "The connection hiccuped — try again.", tired: "I've talked enough for today 🦊 Message the bot — they'll answer there.", close: "Close", send: "Send",
          pet: "Yip! That's nice 🦊" },
    pl: { hi: "Cześć! Jestem Tolik — fenek Tolka. Zapytaj, jak działa.", name: "Tolik", sub: "fenek Tolka · odpowiada w kilka sekund",
          ph: "Zapytaj Tolika…", c1: "Ile to kosztuje?", c2: "Jak wypróbować za darmo?", c3: "Działa w Zoom i Teams?", trial: "30 minut za darmo",
          err: "Coś z połączeniem — spróbuj jeszcze raz.", tired: "Na dziś się nagadałem 🦊 Napisz do bota — tam odpowiedzą.", close: "Zamknij", send: "Wyślij",
          pet: "Fyr! Miło 🦊" },
    de: { hi: "Hi! Ich bin Tolik, der Fennek von Tolk. Frag mich, wie es funktioniert.", name: "Tolik", sub: "Tolks Fennek · antwortet in Sekunden",
          ph: "Frag Tolik…", c1: "Was kostet es?", c2: "Wie kann ich es gratis testen?", c3: "Geht es in Zoom und Teams?", trial: "30 Minuten gratis",
          err: "Die Verbindung hakt — versuch's nochmal.", tired: "Für heute hab ich genug geredet 🦊 Schreib dem Bot — dort antwortet man dir.", close: "Schließen", send: "Senden",
          pet: "Fiep! Schön 🦊" },
    cs: { hi: "Ahoj! Jsem Tolik — fenek Tolku. Zeptej se, jak funguje.", name: "Tolik", sub: "fenek Tolku · odpoví za pár vteřin",
          ph: "Zeptej se Tolika…", c1: "Kolik to stojí?", c2: "Jak to vyzkoušet zdarma?", c3: "Funguje v Zoomu a Teams?", trial: "30 minut zdarma",
          err: "Něco se spojením — zkus to znovu.", tired: "Pro dnešek jsem se namluvil 🦊 Napiš botovi — tam ti odpoví.", close: "Zavřít", send: "Odeslat",
          pet: "Frr! Příjemné 🦊" },
    sk: { hi: "Ahoj! Som Tolik — fenek Tolku. Opýtaj sa, ako funguje.", name: "Tolik", sub: "fenek Tolku · odpovie za pár sekúnd",
          ph: "Opýtaj sa Tolika…", c1: "Koľko to stojí?", c2: "Ako to vyskúšať zadarmo?", c3: "Funguje v Zoome a Teams?", trial: "30 minút zadarmo",
          err: "Niečo so spojením — skús to znova.", tired: "Na dnes som sa nahovoril 🦊 Napíš botovi — tam ti odpovedia.", close: "Zavrieť", send: "Odoslať",
          pet: "Fŕŕ! Príjemné 🦊" },
  };
  const lang = LANGS.includes(document.documentElement.lang) ? document.documentElement.lang : "en";   // site.js уже выбрал язык
  const tx = (k) => (T[lang] || T.en)[k];
  const conn = navigator.connection || {};
  if (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || "")) return;   // экономия трафика — без 3D-друга

  const h = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text != null) el.textContent = text; return el; };
  let m = null, box = null, chat = [], busy = false;

  function start() {
    const dock = h("div", "tk-dock");
    const stage = h("div", "tk-stage");
    dock.append(stage);
    dock.setAttribute("role", "button");
    dock.setAttribute("aria-label", tx("name"));
    document.body.append(dock);
    const sc = document.createElement("script");
    sc.src = "assets/tolik.js?v=1";
    sc.onload = () => {
      m = window.Tolik.mount(stage, { yaw: -0.3, fps: 36, still: "img/tolik/tolik.png",
        onPoke: () => toggle(true), onPet: () => m.say(tx("pet"), 2200) });
      dock.classList.add("on");
      let seen = false;
      try { seen = sessionStorage.getItem("tolik-hi") === "1"; sessionStorage.setItem("tolik-hi", "1"); } catch (e) { /* без хранилища */ }
      if (!seen) setTimeout(() => { if (!box) { m.emote("wave"); m.say(tx("hi"), 6000); } }, 1200);
    };
    document.head.append(sc);
    dock.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") toggle(); });
    dock.tabIndex = 0;
  }

  function toggle(open) {
    if (box && open !== true) { box.remove(); box = null; return; }
    if (box) return;
    box = h("div", "tk-panel");
    const head = h("div", "tk-head");
    const title = h("div", "tk-title");
    title.append(h("b", null, tx("name")), h("span", null, tx("sub")));
    const x = h("button", "tk-x", "×");
    x.type = "button";
    x.setAttribute("aria-label", tx("close"));
    x.onclick = () => toggle();
    head.append(title, x);
    const log = h("div", "tk-log");
    const add = (who, text) => { log.append(h("div", "tk-msg " + who, text)); log.scrollTop = log.scrollHeight; };
    add("him", tx("hi"));
    chat.forEach(([q, a]) => { add("me", q); add("him", a); });
    const chips = h("div", "tk-chips");
    ["c1", "c2", "c3"].forEach((c) => { const b = h("button", null, tx(c)); b.type = "button"; b.onclick = () => send(tx(c)); chips.append(b); });
    const form = h("form", "tk-in");
    const input = h("input");
    input.type = "text";
    input.maxLength = 600;
    input.placeholder = tx("ph");
    input.autocomplete = "off";
    const go = h("button", "tk-go", "→");
    go.type = "submit";
    go.setAttribute("aria-label", tx("send"));
    form.append(input, go);
    form.onsubmit = (e) => { e.preventDefault(); send(input.value); };
    const trial = h("a", "tk-trial", tx("trial") + " →");
    trial.href = `https://t.me/${BOT}?startapp=trial`;
    trial.target = "_blank";
    trial.rel = "noopener";
    box.append(head, log, chips, form, trial);
    document.body.append(box);
    if (matchMedia("(hover: hover)").matches) input.focus();
    if (m) { m.emote("happy"); m.say("", 0); }

    async function send(text) {
      text = String(text || "").trim();
      if (!text || busy) return;
      busy = true;
      input.value = "";
      add("me", text);
      if (m) m.emote("think", 30);
      const wait = h("div", "tk-msg him wait", "…");
      log.append(wait);
      let r = null, status = 0;
      try {
        const res = await fetch(SHOP + "/api/tolik/ask", { method: "POST", headers: { "content-type": "application/json" },
          body: JSON.stringify({ text, prev: chat.slice(-6), lang }) });
        status = res.status;
        r = await res.json().catch(() => null);
      } catch (e) { r = null; }
      wait.remove();
      busy = false;
      if (!r || !r.say) {
        add("him", status === 429 ? tx("tired") : tx("err"));
        if (m) m.emote(status === 429 ? "sleepy" : "sad");
        return;
      }
      add("him", r.say);
      chat = [...chat, [text, r.say]].slice(-8);
      if (m) m.emote(r.emote || "happy");
    }
  }

  const later = () => setTimeout(start, 2500);
  if (document.readyState === "complete") later();
  else addEventListener("load", later, { once: true });
})();
