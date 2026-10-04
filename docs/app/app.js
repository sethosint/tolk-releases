// Tolk — мини-приложение в Telegram-боте @TolkShopBot: подписка, оплата с квитанцией, ключи, часы Tolk AI, подарки,
// приглашения, отзывы, помощь и панель продавца. Сервер — /mini/* (вход по подписанным Telegram данным initData).
(() => {
  "use strict";
  const API = "https://tolk-shop.seth-gamingmain.workers.dev";
  const tg = window.Telegram && window.Telegram.WebApp;
  const $app = document.getElementById("app");
  const TMARK = (document.getElementById("tmark") || {}).innerHTML || "";
  let S = null;                 // состояние с сервера (/mini/state)
  let L = "ru";
  let stack = [];               // экраны: [{ v, p }]
  let poll = 0, mainFn = null, gen = 0;

  // ------------------------------------------------------------------------------------------- тексты
  const T = {
    ru: {
      out_t: "Откройте Tolk в Telegram", out_p: "Это приложение работает внутри бота @TolkShopBot.", out_b: "Открыть бота",
      err_net: "Нет связи с сервером — попробуйте ещё раз.", err_auth: "Сессия устарела — закройте и откройте приложение заново.",
      err_many: "Слишком много заказов за сегодня — попробуйте завтра или напишите в поддержку.",
      err_rate: "Курс этой валюты сейчас недоступен — выберите другой способ.", err_stale: "Данные устарели — откройте экран заново.",
      err_any: "Что-то пошло не так — попробуйте ещё раз.", err_big: "Файл больше 10 МБ.", err_type: "Нужен скриншот, фото или PDF.",
      err_nokey: "Сначала оформите подписку — часы добавляются к ней.", retry: "Повторить",
      your_sub: "Ваша подписка", until: "до {d}", ended: "закончилась {d}", forever: "навсегда", left_days: "осталось {n} дн.",
      ai_left: "Tolk AI · осталось {l} из {t} ч", ai_reset: "обновятся {d}", unl: "Tolk AI без лимита",
      new_1: "Понимайте пары", new_2: "с\u00a0первого дня.",
      new_sub: "Субтитры с переводом поверх любого окна. 30 минут бесплатно, дальше — от {p} в неделю.",
      cta_buy: "Выбрать подписку", cta_renew: "Продлить подписку",
      t_hours: "Часы Tolk AI", t_hours_s: "докупить к ключу", t_keys: "Мои ключи", t_keys_s: "сроки и коды",
      t_gift: "Подарить Tolk", t_gift_s: "открытка с кодом", t_invite: "Пригласить друга", t_invite_s: "+{h} ч вам, +{f} ч другу",
      t_help: "Как начать", t_help_s: "3 шага и ответы", t_review: "Отзыв", t_review_s: "оценить Tolk", t_review_done: "ваша оценка: {n} из 5",
      sale_eyebrow: "Ограниченное предложение", sale_t: "{d} на Tolk", sale_upto: "до −{p} %", sale_left: "осталось {t}", sale_until: "до {d}", sale_ends: "Цены вернутся {d}", t_promo: "Промокод", t_promo_s: "скидка или часы", pc_have: "Есть промокод?", pc_ph: "Промокод", pc_apply: "Применить", pc_code_t: "−{p} % по промокоду {c}", pc_code_s: "на подписку · до {d}", pr_bad: "Такого промокода нет — проверьте написание", pr_expired: "Срок промокода закончился", pr_full: "Этот промокод уже разобрали", pr_used: "Вы уже вводили этот промокод", pr_nokey: "Часы по промокоду добавляются к действующей подписке — сначала купите её", promo_t: "−{p} % на первую подписку", promo_s: "скидка после пробного · до {d}", l_download: "Скачать Tolk", l_download_s: "Windows, macOS и Linux", l_channel: "Канал Tolk", l_channel_s: "новости и обновления",
      l_support: "Поддержка", l_support_s: "ответим лично", l_lang: "Язык",
      o_wait: "Заказ ждёт оплаты", o_check: "Проверяем оплату",
      plans: "Подписка", gift_a: "Tolk", gift_b: "в подарок", renew: "Продление", std: "Обычная", pro: "Pro · конспекты",
      pro_lede: "Всё, что в обычной, плюс конспекты лекций: Tolk запишет пару, снимет слайды и соберёт конспект за минуту. До 45 конспектов в месяц.",
      std_lede: "Весь Tolk и нейросеть Tolk AI. Часы обновляются каждые 30 дней; кончились раньше — Tolk переводит через Google, а часы можно докупить.",
      gift_lede: "После оплаты в чат придёт открытка с кодом — перешлите её другу. Код включается на любом компьютере, срок пойдёт с момента активации.",
      m_renew: "Продлить", m_new: "Новый ключ", m_new_s: "Код для другого компьютера — вставляется в Tolk вручную.",
      renew_from: "Новый срок начнётся {d} — ни один день не пропадёт.",
      per_month: "{p} в месяц", hours_all: "{h} ч Tolk AI", best: "выгоднее всего",
      pay_with: "Способ оплаты", m_manual: "проверка вручную, до 15 мин", m_stars: "сразу, без проверки", m_card: "сразу · подписка продлевается сама", m_card1: "сразу, без проверки", m_card_min: "картой — от {a}", err_card_min: "Картой можно оплатить покупку от 5 € — выберите другой способ или тариф подлиннее.", card_t: "Оплата картой", card_p: "Откроется защищённая страница Stripe. Ключ придёт сюда и в чат сразу после оплаты.", card_auto: "Подписка будет продлеваться сама той же картой. Отключить — в любой момент в «Мои ключи».", card_open: "Оплатить картой", ap_t: "Автопродление", ap_next: "следующее списание {d}", ap_off_until: "отключено · ключ работает до {d}", ap_off: "Отключить", ap_live: "включено", ap_dead: "отключено", ap_on: "Включить снова", ap_card: "Сменить карту", ap_off_q: "Отключить автопродление? Ключ проработает до конца оплаченного срока.", na: "курс недоступен",
      pay_btn: "Оплатить · {a}", wait: "Минутку…",
      hours_t: "Часы", hours_lede: "Добавятся к ключу сразу после оплаты и не сгорят до конца подписки.",
      hours_key: "К ключу: {t} · {u}", hours_nokey: "Часы добавляются к действующей подписке — сначала оформите её.", pack: "+{h} ч Tolk AI",
      s_new: "Ждёт оплаты", s_claimed: "Проверяем оплату", s_paid: "Оплачено", s_rejected: "Оплата не найдена", s_cancelled: "Заказ отменён",
      st1_card: "Переведите ровно {a}", st1_crypto: "Отправьте ровно {a}", st_code: "В комментарии к переводу укажите код",
      st_rec: "Пришлите квитанцию", st_rec_s: "Скриншот или файл из банка.", st_rec_c: "Скриншот из кошелька или хэш транзакции в поле ниже.",
      tap_copy: "нажмите, чтобы скопировать", copied: "Скопировано", addr: "Адрес", sum: "Сумма", code: "Код",
      pick: "Прикрепить квитанцию", pick_s: "скриншот, фото или PDF", repick: "выбрать другой файл",
      note_ph: "Хэш транзакции или комментарий (необязательно)", send_rec: "Отправить квитанцию",
      sent: "Квитанция у продавца. Проверка обычно занимает до 15 минут (ночью дольше). Ключ придёт в чат и появится здесь.",
      more_rec: "Добавить ещё квитанцию", cancel: "Отменить заказ", cancel_q: "Отменить этот заказ?", other: "Другой способ оплаты",
      paid_t: "Оплата прошла — спасибо!", your_key: "Ваш ключ",
      paid_auto: "Tolk на вашем компьютере активируется сам — через минуту всё готово.",
      paid_manual: "Откройте Tolk и вставьте ключ: в окне активации или «Профиль → Ввести ключ».",
      paid_hours: "+{h} ч Tolk AI уже на вашем ключе.",
      paid_gift: "Открытка с кодом — в чате с ботом. Перешлите её другу или поделитесь кодом отсюда.",
      share: "Поделиться", gift_share: "🎁 Дарю тебе Tolk — субтитры с переводом поверх любого окна. Код: {c}",
      rej_p: "Если вы уже перевели деньги — напишите в поддержку и приложите квитанцию, разберёмся.",
      home: "На главную", download: "Скачать Tolk",
      keys_t: "Мои ключи", keys_empty: "Здесь появятся ключи, купленные в Tolk.",
      k_active: "действует", k_ended: "закончилась", k_revoked: "отключена", k_trial: "пробный", k_unused: "ещё не введён в Tolk",
      k_gift_new: "подарок · ещё не активирован", k_gift_used: "подарок · активирован", k_renew: "Продлить", k_hours: "Часы", k_code: "Код ключа",
      inv_a: "Пригласить", inv_b: "друга",
      inv_lede: "Друг покупает подписку от месяца по вашей ссылке — вы получаете +{h} ч Tolk AI, а он +{f} ч.",
      inv_link: "Ваша ссылка", inv_send: "Отправить приглашение", inv_n: "пригласили", inv_got: "получено", h_short: "ч",
      inv_rules: "Награда — один раз за каждого друга, не больше 10 в месяц.",
      rv_t: "Как вам Tolk?", rv_lede: "Одна оценка и пара слов — нам правда важно. Плохие оценки продавец читает лично и помогает.",
      rv_ph: "Что понравилось или что мешает?", rv_pub: "Можно показать в канале Tolk (только имя)", rv_send: "Отправить отзыв",
      rv_thanks: "Спасибо! Отзыв записан 💛", rv_need: "Поставьте оценку от 1 до 5",
      help_t: "Как начать", h1: "Скачайте Tolk для своей системы (Windows, macOS или Linux) и установите.",
      h2: "Откройте Tolk и вставьте ключ — в окне активации или «Профиль → Ввести ключ». Если покупали из программы, ключ встанет сам.",
      h3: "Выберите, что слушать — вкладку с парой, Zoom, Teams или Webex — и нажмите «Начать перевод».",
      h_trial: "Первые 30 минут — бесплатно: кнопка «30 минут бесплатно» на главной.", t_trial: "30 минут бесплатно", t_trial_s: "Tolk AI без оплаты — один раз", tr_t: "30 минут *бесплатно*", tr_p: "Всё как в полной версии: нейросеть Tolk AI, вкладки браузера, все языки. Один раз на аккаунт и на компьютер.", tr_btn: "Получить 30 минут", tr_applied: "Готово! Tolk на вашем компьютере уже активирован — вернитесь в программу и включите перевод.", tr_code: "Код пробного периода", tr_how: "Откройте Tolk и вставьте код — в окне активации или в «Профиль → Ввести ключ». Ещё нет Tolk — скачайте его.", tr_used: "Пробный период на этом аккаунте уже был — выберите тариф.", tr_used_pc: "На этом компьютере пробный период уже был — выберите тариф.", tr_busy: "Сегодня пробных запусков уже много — попробуйте завтра.", faq_t: "Вопросы",
      f1q: "Что такое часы Tolk AI?",
      f1a: "Время работы нейросети Tolk AI: она дослушивает каждую фразу и переводит точно. В подписке — {m} ч в месяц, часы обновляются каждые 30 дней. Кончились раньше — Tolk переводит через Google, а часы можно докупить.",
      f2q: "Продление не съест оставшиеся дни?", f2a: "Нет. Новый срок начинается после текущего — ни один день не пропадает. Tolk на компьютере подхватит новый ключ сам.",
      f3q: "Где работает Tolk?", f3a: "Поверх любого окна в Windows 10 и 11, macOS 13+ и Linux (macOS и Linux — бета): Zoom, Teams, Webex, Google Meet, лекции в браузере, YouTube и фильмы.",
      f4q: "Как проходит оплата?", f4a: "Переводом на украинскую карту, USDT (TRC20) или TON. Пришлите квитанцию прямо здесь — продавец проверит, обычно до 15 минут, и ключ придёт в чат.",
      f5q: "Можно на другой компьютер?", f5a: "Ключ работает на одном компьютере. Для второго выберите «Новый ключ» при покупке — придёт код, который вставляется в Tolk.",
      f6q: "Что-то не работает", f6a: "Напишите в поддержку — ответим лично и поможем.",
      lang_t: "Язык",
      ready_t: "Ключ готов — вставьте его в Tolk", ready_s: "окно активации или «Профиль → Ввести ключ»",
      qty_t: "Сколько ключей",
      qty_tier: "от {n} — −{p} %",
      qty_own: "Первый ключ — ваш, остальные придут в чат открытками для друзей.",
      qty_gift: "Каждый подарок придёт отдельной открыткой.",
      qty_sum: "{n} × {p}",
      qty_save: "скидка {p} %",
      per_key: "{p} за ключ",
      bulk_ok: "Ключи готовы: первый — ваш, остальные — для друзей. Открытки с ними уже в чате.",
      gifts_ok: "Подарки готовы — открытки с кодами уже в чате. Перешлите каждому другу свою.",
      key_friend: "Ключ для друга",
      key_share: "🔑 Держи ключ Tolk — субтитры с переводом поверх любого окна. Ключ: {c}",
      k_bulk_new: "для друга · ещё не активирован",
      k_bulk_used: "для друга · активирован",
      inv_code: "Ваш код приглашения",
      inv_code_s: "Друг откроет ссылку — или введёт этот код в приложении Tolk.",
      inv_change: "Придумать свой код",
      inv_code_ph: "Например, OLEH",
      inv_save: "Сохранить",
      inv_saved: "Код сохранён — старая ссылка тоже работает",
      inv_left: "Смен осталось: {n}.",
      fc_t: "Есть код друга?",
      fc_ph: "Код или ссылка приглашения",
      fc_apply: "Применить",
      fc_ok: "Приглашение принято: купите подписку от месяца — получите +{f} ч Tolk AI.",
      rb_t: "Приглашение от {name}",
      rb_t0: "Приглашение от друга",
      rb_s: "Купите подписку от месяца — получите +{f} ч Tolk AI в подарок.",
      ref_taken: "Этот код уже занят — придумайте другой.",
      ref_code: "Код не найден — проверьте буквы и цифры.",
      ref_self: "Это ваш собственный код 🙂",
      ref_already: "Вы уже пришли по приглашению.",
      ref_old: "Код друга — только для новых покупателей.",
      ref_many: "Код можно поменять не больше 5 раз.",
      ref_fmt: "3–16 латинских букв или цифр, без пробелов.",
    },
    uk: {
      out_t: "Відкрийте Tolk у Telegram", out_p: "Цей застосунок працює всередині бота @TolkShopBot.", out_b: "Відкрити бота",
      err_net: "Немає зв'язку із сервером — спробуйте ще раз.", err_auth: "Сесія застаріла — закрийте й відкрийте застосунок знову.",
      err_many: "Забагато замовлень за сьогодні — спробуйте завтра або напишіть у підтримку.",
      err_rate: "Курс цієї валюти зараз недоступний — оберіть інший спосіб.", err_stale: "Дані застаріли — відкрийте екран знову.",
      err_any: "Щось пішло не так — спробуйте ще раз.", err_big: "Файл більший за 10 МБ.", err_type: "Потрібен скриншот, фото або PDF.",
      err_nokey: "Спершу оформіть підписку — години додаються до неї.", retry: "Повторити",
      your_sub: "Ваша підписка", until: "до {d}", ended: "закінчилася {d}", forever: "назавжди", left_days: "залишилось {n} дн.",
      ai_left: "Tolk AI · залишилось {l} з {t} год", ai_reset: "оновляться {d}", unl: "Tolk AI без ліміту",
      new_1: "Розумійте пари", new_2: "з\u00a0першого дня.",
      new_sub: "Субтитри з перекладом поверх будь-якого вікна. 30 хвилин безкоштовно, далі — від {p} на тиждень.",
      cta_buy: "Обрати підписку", cta_renew: "Продовжити підписку",
      t_hours: "Години Tolk AI", t_hours_s: "докупити до ключа", t_keys: "Мої ключі", t_keys_s: "строки й коди",
      t_gift: "Подарувати Tolk", t_gift_s: "листівка з кодом", t_invite: "Запросити друга", t_invite_s: "+{h} год вам, +{f} год другові",
      t_help: "Як почати", t_help_s: "3 кроки й відповіді", t_review: "Відгук", t_review_s: "оцінити Tolk", t_review_done: "ваша оцінка: {n} з 5",
      sale_eyebrow: "Обмежена пропозиція", sale_t: "{d} на Tolk", sale_upto: "до −{p} %", sale_left: "залишилось {t}", sale_until: "до {d}", sale_ends: "Ціни повернуться {d}", t_promo: "Промокод", t_promo_s: "знижка або години", pc_have: "Є промокод?", pc_ph: "Промокод", pc_apply: "Застосувати", pc_code_t: "−{p} % за промокодом {c}", pc_code_s: "на підписку · до {d}", pr_bad: "Такого промокоду немає — перевірте написання", pr_expired: "Термін промокоду закінчився", pr_full: "Цей промокод уже розібрали", pr_used: "Ви вже вводили цей промокод", pr_nokey: "Години за промокодом додаються до чинної підписки — спершу купіть її", promo_t: "−{p} % на першу підписку", promo_s: "знижка після пробного · до {d}", l_download: "Завантажити Tolk", l_download_s: "Windows, macOS і Linux", l_channel: "Канал Tolk", l_channel_s: "новини й оновлення",
      l_support: "Підтримка", l_support_s: "відповімо особисто", l_lang: "Мова",
      o_wait: "Замовлення чекає на оплату", o_check: "Перевіряємо оплату",
      plans: "Підписка", gift_a: "Tolk", gift_b: "у подарунок", renew: "Продовження", std: "Звичайна", pro: "Pro · конспекти",
      pro_lede: "Усе, що у звичайній, плюс конспекти лекцій: Tolk запише пару, зніме слайди й складе конспект за хвилину. До 45 конспектів на місяць.",
      std_lede: "Увесь Tolk і нейромережа Tolk AI. Години оновлюються кожні 30 днів; скінчилися раніше — Tolk перекладає через Google, а години можна докупити.",
      gift_lede: "Після оплати в чат прийде листівка з кодом — перешліть її другові. Код вмикається на будь-якому комп'ютері, строк піде з моменту активації.",
      m_renew: "Продовжити", m_new: "Новий ключ", m_new_s: "Код для іншого комп'ютера — вставляється в Tolk вручну.",
      renew_from: "Новий строк почнеться {d} — жоден день не пропаде.",
      per_month: "{p} на місяць", hours_all: "{h} год Tolk AI", best: "найвигідніше",
      pay_with: "Спосіб оплати", m_manual: "перевірка вручну, до 15 хв", m_stars: "одразу, без перевірки", m_card: "одразу · підписка подовжується сама", m_card1: "одразу, без перевірки", m_card_min: "карткою — від {a}", err_card_min: "Карткою можна оплатити покупку від 5 € — оберіть інший спосіб або довший тариф.", card_t: "Оплата карткою", card_p: "Відкриється захищена сторінка Stripe. Ключ прийде сюди й у чат одразу після оплати.", card_auto: "Підписка подовжуватиметься сама тією ж карткою. Вимкнути — будь-коли в «Мої ключі».", card_open: "Оплатити карткою", ap_t: "Автоподовження", ap_next: "наступне списання {d}", ap_off_until: "вимкнено · ключ працює до {d}", ap_off: "Вимкнути", ap_live: "увімкнено", ap_dead: "вимкнено", ap_on: "Увімкнути знову", ap_card: "Змінити картку", ap_off_q: "Вимкнути автоподовження? Ключ працюватиме до кінця оплаченого строку.", na: "курс недоступний",
      pay_btn: "Оплатити · {a}", wait: "Хвилинку…",
      hours_t: "Години", hours_lede: "Додадуться до ключа одразу після оплати й не згорять до кінця підписки.",
      hours_key: "До ключа: {t} · {u}", hours_nokey: "Години додаються до чинної підписки — спершу оформіть її.", pack: "+{h} год Tolk AI",
      s_new: "Чекає на оплату", s_claimed: "Перевіряємо оплату", s_paid: "Оплачено", s_rejected: "Оплату не знайдено", s_cancelled: "Замовлення скасовано",
      st1_card: "Переказуйте рівно {a}", st1_crypto: "Надішліть рівно {a}", st_code: "У коментарі до переказу вкажіть код",
      st_rec: "Надішліть квитанцію", st_rec_s: "Скриншот або файл із банку.", st_rec_c: "Скриншот із гаманця або хеш транзакції в полі нижче.",
      tap_copy: "натисніть, щоб скопіювати", copied: "Скопійовано", addr: "Адреса", sum: "Сума", code: "Код",
      pick: "Прикріпити квитанцію", pick_s: "скриншот, фото або PDF", repick: "обрати інший файл",
      note_ph: "Хеш транзакції або коментар (необов'язково)", send_rec: "Надіслати квитанцію",
      sent: "Квитанція в продавця. Перевірка зазвичай триває до 15 хвилин (уночі довше). Ключ прийде в чат і з'явиться тут.",
      more_rec: "Додати ще квитанцію", cancel: "Скасувати замовлення", cancel_q: "Скасувати це замовлення?", other: "Інший спосіб оплати",
      paid_t: "Оплата пройшла — дякуємо!", your_key: "Ваш ключ",
      paid_auto: "Tolk на вашому комп'ютері активується сам — за хвилину все готово.",
      paid_manual: "Відкрийте Tolk і вставте ключ: у вікні активації або «Профіль → Ввести ключ».",
      paid_hours: "+{h} год Tolk AI вже на вашому ключі.",
      paid_gift: "Листівка з кодом — у чаті з ботом. Перешліть її другові або поділіться кодом звідси.",
      share: "Поділитися", gift_share: "🎁 Дарую тобі Tolk — субтитри з перекладом поверх будь-якого вікна. Код: {c}",
      rej_p: "Якщо ви вже переказали гроші — напишіть у підтримку й додайте квитанцію, розберемося.",
      home: "На головну", download: "Завантажити Tolk",
      keys_t: "Мої ключі", keys_empty: "Тут з'являться ключі, куплені в Tolk.",
      k_active: "діє", k_ended: "закінчилася", k_revoked: "вимкнена", k_trial: "пробний", k_unused: "ще не введено в Tolk",
      k_gift_new: "подарунок · ще не активовано", k_gift_used: "подарунок · активовано", k_renew: "Продовжити", k_hours: "Години", k_code: "Код ключа",
      inv_a: "Запросити", inv_b: "друга",
      inv_lede: "Друг купує підписку від місяця за вашим посиланням — ви отримуєте +{h} год Tolk AI, а він +{f} год.",
      inv_link: "Ваше посилання", inv_send: "Надіслати запрошення", inv_n: "запросили", inv_got: "отримано", h_short: "год",
      inv_rules: "Нагорода — один раз за кожного друга, не більше 10 на місяць.",
      rv_t: "Як вам Tolk?", rv_lede: "Одна оцінка й кілька слів — нам справді важливо. Погані оцінки продавець читає особисто й допомагає.",
      rv_ph: "Що сподобалося або що заважає?", rv_pub: "Можна показати в каналі Tolk (лише ім'я)", rv_send: "Надіслати відгук",
      rv_thanks: "Дякуємо! Відгук записано 💛", rv_need: "Поставте оцінку від 1 до 5",
      help_t: "Як почати", h1: "Завантажте Tolk для своєї системи (Windows, macOS чи Linux) і встановіть.",
      h2: "Відкрийте Tolk і вставте ключ — у вікні активації або «Профіль → Ввести ключ». Якщо купували з програми, ключ стане сам.",
      h3: "Оберіть, що слухати — вкладку з парою, Zoom, Teams або Webex — і натисніть «Почати переклад».",
      h_trial: "Перші 30 хвилин — безкоштовно: кнопка «30 хвилин безкоштовно» на головній.", t_trial: "30 хвилин безкоштовно", t_trial_s: "Tolk AI без оплати — один раз", tr_t: "30 хвилин *безкоштовно*", tr_p: "Усе як у повній версії: нейромережа Tolk AI, вкладки браузера, усі мови. Один раз на акаунт і на комп'ютер.", tr_btn: "Отримати 30 хвилин", tr_applied: "Готово! Tolk на вашому комп'ютері вже активовано — поверніться в програму й увімкніть переклад.", tr_code: "Код пробного періоду", tr_how: "Відкрийте Tolk і вставте код — у вікні активації або в «Профіль → Ввести ключ». Ще немає Tolk — завантажте його.", tr_used: "Пробний період на цьому акаунті вже був — оберіть тариф.", tr_used_pc: "На цьому комп'ютері пробний період уже був — оберіть тариф.", tr_busy: "Сьогодні пробних запусків уже багато — спробуйте завтра.", faq_t: "Питання",
      f1q: "Що таке години Tolk AI?",
      f1a: "Час роботи нейромережі Tolk AI: вона дослуховує кожну фразу й перекладає точно. У підписці — {m} год на місяць, години оновлюються кожні 30 днів. Скінчилися раніше — Tolk перекладає через Google, а години можна докупити.",
      f2q: "Продовження не з'їсть решту днів?", f2a: "Ні. Новий строк починається після поточного — жоден день не пропадає. Tolk на комп'ютері підхопить новий ключ сам.",
      f3q: "Де працює Tolk?", f3a: "Поверх будь-якого вікна у Windows 10 і 11, macOS 13+ і Linux (macOS і Linux — бета): Zoom, Teams, Webex, Google Meet, лекції в браузері, YouTube і фільми.",
      f4q: "Як проходить оплата?", f4a: "Переказом на українську картку, USDT (TRC20) або TON. Надішліть квитанцію просто тут — продавець перевірить, зазвичай до 15 хвилин, і ключ прийде в чат.",
      f5q: "Можна на інший комп'ютер?", f5a: "Ключ працює на одному комп'ютері. Для другого оберіть «Новий ключ» під час купівлі — прийде код, який вставляється в Tolk.",
      f6q: "Щось не працює", f6a: "Напишіть у підтримку — відповімо особисто й допоможемо.",
      lang_t: "Мова",
      ready_t: "Ключ готовий — вставте його в Tolk", ready_s: "вікно активації або «Профіль → Ввести ключ»",
      qty_t: "Скільки ключів",
      qty_tier: "від {n} — −{p} %",
      qty_own: "Перший ключ — ваш, решта прийдуть у чат листівками для друзів.",
      qty_gift: "Кожен подарунок прийде окремою листівкою.",
      qty_sum: "{n} × {p}",
      qty_save: "знижка {p} %",
      per_key: "{p} за ключ",
      bulk_ok: "Ключі готові: перший — ваш, решта — для друзів. Листівки з ними вже в чаті.",
      gifts_ok: "Подарунки готові — листівки з кодами вже в чаті. Перешліть кожному другові свою.",
      key_friend: "Ключ для друга",
      key_share: "🔑 Тримай ключ Tolk — субтитри з перекладом поверх будь-якого вікна. Ключ: {c}",
      k_bulk_new: "для друга · ще не активовано",
      k_bulk_used: "для друга · активовано",
      inv_code: "Ваш код запрошення",
      inv_code_s: "Друг відкриє посилання — або введе цей код у застосунку Tolk.",
      inv_change: "Придумати свій код",
      inv_code_ph: "Наприклад, OLEH",
      inv_save: "Зберегти",
      inv_saved: "Код збережено — старе посилання теж працює",
      inv_left: "Змін залишилось: {n}.",
      fc_t: "Маєте код друга?",
      fc_ph: "Код або посилання запрошення",
      fc_apply: "Застосувати",
      fc_ok: "Запрошення прийнято: купіть підписку від місяця — отримаєте +{f} год Tolk AI.",
      rb_t: "Запрошення від {name}",
      rb_t0: "Запрошення від друга",
      rb_s: "Купіть підписку від місяця — отримаєте +{f} год Tolk AI у подарунок.",
      ref_taken: "Цей код уже зайнятий — придумайте інший.",
      ref_code: "Код не знайдено — перевірте літери й цифри.",
      ref_self: "Це ваш власний код 🙂",
      ref_already: "Ви вже прийшли за запрошенням.",
      ref_old: "Код друга — лише для нових покупців.",
      ref_many: "Код можна змінити не більше 5 разів.",
      ref_fmt: "3–16 латинських літер або цифр, без пробілів.",
    },
    sk: {
      out_t: "Otvorte Tolk v Telegrame", out_p: "Táto aplikácia funguje vnútri bota @TolkShopBot.", out_b: "Otvoriť bota",
      err_net: "Server neodpovedá — skúste to znova.", err_auth: "Relácia vypršala — zatvorte a znova otvorte aplikáciu.",
      err_many: "Dnes je objednávok priveľa — skúste zajtra alebo napíšte podpore.",
      err_rate: "Kurz tejto meny je teraz nedostupný — vyberte iný spôsob.", err_stale: "Údaje sú neaktuálne — otvorte obrazovku znova.",
      err_any: "Niečo sa pokazilo — skúste to znova.", err_big: "Súbor má viac ako 10 MB.", err_type: "Treba snímku obrazovky, fotku alebo PDF.",
      err_nokey: "Najprv si kúpte predplatné — hodiny sa pripisujú k nemu.", retry: "Skúsiť znova",
      your_sub: "Vaše predplatné", until: "do {d}", ended: "skončilo {d}", forever: "navždy", left_days: "zostáva {n} dní",
      ai_left: "Tolk AI · zostáva {l} z {t} h", ai_reset: "obnovia sa {d}", unl: "Tolk AI bez limitu",
      new_1: "Rozumejte prednáškam", new_2: "od prvého dňa.",
      new_sub: "Titulky s prekladom nad akýmkoľvek oknom. 30 minút zadarmo, potom od {p} týždenne.",
      cta_buy: "Vybrať predplatné", cta_renew: "Predĺžiť predplatné",
      t_hours: "Hodiny Tolk AI", t_hours_s: "dokúpiť ku kľúču", t_keys: "Moje kľúče", t_keys_s: "platnosť a kódy",
      t_gift: "Darovať Tolk", t_gift_s: "pohľadnica s kódom", t_invite: "Pozvať kamaráta", t_invite_s: "+{h} h vám, +{f} h kamarátovi",
      t_help: "Ako začať", t_help_s: "3 kroky a odpovede", t_review: "Recenzia", t_review_s: "ohodnotiť Tolk", t_review_done: "vaše hodnotenie: {n} z 5",
      sale_eyebrow: "Limitovaná ponuka", sale_t: "{d} na Tolk", sale_upto: "až −{p} %", sale_left: "zostáva {t}", sale_until: "do {d}", sale_ends: "Ceny sa vrátia {d}", t_promo: "Promo kód", t_promo_s: "zľava alebo hodiny", pc_have: "Máte promo kód?", pc_ph: "Promo kód", pc_apply: "Použiť", pc_code_t: "−{p} % s promo kódom {c}", pc_code_s: "na predplatné · do {d}", pr_bad: "Taký promo kód neexistuje — skontrolujte ho", pr_expired: "Platnosť promo kódu skončila", pr_full: "Tento promo kód je už vyčerpaný", pr_used: "Tento promo kód ste už zadali", pr_nokey: "Hodiny z promo kódu sa pridávajú k platnému predplatnému — najprv si ho kúpte", promo_t: "−{p} % na prvé predplatné", promo_s: "zľava po skúšobnej dobe · do {d}", l_download: "Stiahnuť Tolk", l_download_s: "Windows, macOS a Linux", l_channel: "Kanál Tolk", l_channel_s: "novinky a aktualizácie",
      l_support: "Podpora", l_support_s: "odpovieme osobne", l_lang: "Jazyk",
      o_wait: "Objednávka čaká na platbu", o_check: "Kontrolujeme platbu",
      plans: "Predplatné", gift_a: "Tolk", gift_b: "ako darček", renew: "Predĺženie", std: "Bežné", pro: "Pro · poznámky",
      pro_lede: "Všetko z bežného a navyše poznámky z prednášok: Tolk nahrá prednášku, zachytí slajdy a za minútu zostaví poznámky. Do 45 poznámok mesačne.",
      std_lede: "Celý Tolk aj neurónová sieť Tolk AI. Hodiny sa obnovujú každých 30 dní; ak sa minú skôr, Tolk prekladá cez Google a hodiny si môžete dokúpiť.",
      gift_lede: "Po zaplatení príde do chatu pohľadnica s kódom — prepošlite ju kamarátovi. Kód funguje na akomkoľvek počítači, predplatné začne plynúť od aktivácie.",
      m_renew: "Predĺžiť", m_new: "Nový kľúč", m_new_s: "Kód pre iný počítač — vkladá sa do Tolku ručne.",
      renew_from: "Nové obdobie začne {d} — neprepadne ani jeden deň.",
      per_month: "{p} mesačne", hours_all: "{h} h Tolk AI", best: "najvýhodnejšie",
      pay_with: "Spôsob platby", m_manual: "ručná kontrola, do 15 min", m_stars: "hneď, bez kontroly", m_card: "hneď · predplatné sa predĺži samo", m_card1: "hneď, bez kontroly", m_card_min: "kartou — od {a}", err_card_min: "Kartou sa dá zaplatiť nákup od 5 € — vyberte iný spôsob alebo dlhšie predplatné.", card_t: "Platba kartou", card_p: "Otvorí sa zabezpečená stránka Stripe. Kľúč príde sem aj do chatu hneď po platbe.", card_auto: "Predplatné sa bude predlžovať samo tou istou kartou. Vypnúť ho môžete kedykoľvek v „Moje kľúče“.", card_open: "Zaplatiť kartou", ap_t: "Automatické predĺženie", ap_next: "ďalšia platba {d}", ap_off_until: "vypnuté · kľúč funguje do {d}", ap_off: "Vypnúť", ap_live: "zapnuté", ap_dead: "vypnuté", ap_on: "Zapnúť znova", ap_card: "Zmeniť kartu", ap_off_q: "Vypnúť automatické predĺženie? Kľúč bude fungovať do konca zaplateného obdobia.", na: "kurz nedostupný",
      pay_btn: "Zaplatiť · {a}", wait: "Moment…",
      hours_t: "Hodiny", hours_lede: "Pripíšu sa ku kľúču hneď po zaplatení a neprepadnú do konca predplatného.",
      hours_key: "Ku kľúču: {t} · {u}", hours_nokey: "Hodiny sa pripisujú k platnému predplatnému — najprv si ho kúpte.", pack: "+{h} h Tolk AI",
      s_new: "Čaká na platbu", s_claimed: "Kontrolujeme platbu", s_paid: "Zaplatené", s_rejected: "Platba sa nenašla", s_cancelled: "Objednávka zrušená",
      st1_card: "Pošlite presne {a}", st1_crypto: "Pošlite presne {a}", st_code: "Do poznámky k platbe napíšte kód",
      st_rec: "Pošlite potvrdenie", st_rec_s: "Snímka obrazovky alebo súbor z banky.", st_rec_c: "Snímka z peňaženky alebo hash transakcie do poľa nižšie.",
      tap_copy: "ťuknite a skopíruje sa", copied: "Skopírované", addr: "Adresa", sum: "Suma", code: "Kód",
      pick: "Priložiť potvrdenie", pick_s: "snímka, fotka alebo PDF", repick: "vybrať iný súbor",
      note_ph: "Hash transakcie alebo poznámka (nepovinné)", send_rec: "Odoslať potvrdenie",
      sent: "Potvrdenie má predajca. Kontrola zvyčajne trvá do 15 minút (v noci dlhšie). Kľúč príde do chatu a zobrazí sa aj tu.",
      more_rec: "Pridať ďalšie potvrdenie", cancel: "Zrušiť objednávku", cancel_q: "Zrušiť túto objednávku?", other: "Iný spôsob platby",
      paid_t: "Platba prebehla — ďakujeme!", your_key: "Váš kľúč",
      paid_auto: "Tolk na vašom počítači sa aktivuje sám — o minútu je všetko pripravené.",
      paid_manual: "Otvorte Tolk a vložte kľúč: v okne aktivácie alebo v „Profil → Zadať kľúč“.",
      paid_hours: "+{h} h Tolk AI už máte na kľúči.",
      paid_gift: "Pohľadnica s kódom je v chate s botom. Prepošlite ju kamarátovi alebo zdieľajte kód odtiaľto.",
      share: "Zdieľať", gift_share: "🎁 Darujem ti Tolk — titulky s prekladom nad akýmkoľvek oknom. Kód: {c}",
      rej_p: "Ak ste už peniaze poslali, napíšte podpore a priložte potvrdenie — vyriešime to.",
      home: "Na úvod", download: "Stiahnuť Tolk",
      keys_t: "Moje kľúče", keys_empty: "Tu sa zobrazia kľúče kúpené v Tolku.",
      k_active: "platí", k_ended: "skončilo", k_revoked: "vypnuté", k_trial: "skúšobné", k_unused: "ešte nie je zadaný v Tolku",
      k_gift_new: "darček · ešte neaktivovaný", k_gift_used: "darček · aktivovaný", k_renew: "Predĺžiť", k_hours: "Hodiny", k_code: "Kód kľúča",
      inv_a: "Pozvať", inv_b: "kamaráta",
      inv_lede: "Keď si kamarát cez váš odkaz kúpi predplatné aspoň na mesiac, dostanete +{h} h Tolk AI a on +{f} h.",
      inv_link: "Váš odkaz", inv_send: "Poslať pozvánku", inv_n: "pozvaní", inv_got: "získané", h_short: "h",
      inv_rules: "Odmena — raz za každého kamaráta, najviac 10 mesačne.",
      rv_t: "Ako sa vám páči Tolk?", rv_lede: "Jedno hodnotenie a pár slov — naozaj nám na tom záleží. Zlé hodnotenia číta predajca osobne a pomáha.",
      rv_ph: "Čo sa vám páčilo alebo čo prekáža?", rv_pub: "Môžete ukázať v kanáli Tolk (len meno)", rv_send: "Odoslať recenziu",
      rv_thanks: "Ďakujeme! Recenzia je uložená 💛", rv_need: "Dajte hodnotenie od 1 do 5",
      help_t: "Ako začať", h1: "Stiahnite si Tolk pre svoj systém (Windows, macOS alebo Linux) a nainštalujte ho.",
      h2: "Otvorte Tolk a vložte kľúč — v okne aktivácie alebo v „Profil → Zadať kľúč“. Ak ste kupovali z programu, kľúč sa nastaví sám.",
      h3: "Vyberte, čo počúvať — kartu s prednáškou, Zoom, Teams alebo Webex — a stlačte „Spustiť preklad“.",
      h_trial: "Prvých 30 minút je zadarmo: tlačidlo „30 minút zadarmo“ na úvode.", t_trial: "30 minút zadarmo", t_trial_s: "Tolk AI bez platby — raz", tr_t: "30 minút *zadarmo*", tr_p: "Všetko ako v plnej verzii: neurónová sieť Tolk AI, karty prehliadača, všetky jazyky. Raz na účet a na počítač.", tr_btn: "Získať 30 minút", tr_applied: "Hotovo! Tolk na vašom počítači je už aktivovaný — vráťte sa do programu a zapnite preklad.", tr_code: "Kód skúšobnej doby", tr_how: "Otvorte Tolk a vložte kód — v okne aktivácie alebo v „Profil → Zadať kľúč“. Ešte nemáte Tolk? Stiahnite si ho.", tr_used: "Skúšobná doba na tomto účte už bola — vyberte si tarif.", tr_used_pc: "Na tomto počítači skúšobná doba už bola — vyberte si tarif.", tr_busy: "Dnes je skúšobných spustení už veľa — skúste to zajtra.", faq_t: "Otázky",
      f1q: "Čo sú hodiny Tolk AI?",
      f1a: "Čas práce neurónovej siete Tolk AI: dopočúva každú vetu a prekladá presne. V predplatnom je {m} h mesačne, hodiny sa obnovujú každých 30 dní. Ak sa minú skôr, Tolk prekladá cez Google a hodiny si môžete dokúpiť.",
      f2q: "Neprepadne predĺžením zvyšok dní?", f2a: "Nie. Nové obdobie začne po aktuálnom — neprepadne ani jeden deň. Tolk v počítači si nový kľúč vezme sám.",
      f3q: "Kde Tolk funguje?", f3a: "Nad akýmkoľvek oknom vo Windows 10 a 11, macOS 13+ a Linuxe (macOS a Linux — beta): Zoom, Teams, Webex, Google Meet, prednášky v prehliadači, YouTube aj filmy.",
      f4q: "Ako prebieha platba?", f4a: "Prevodom na ukrajinskú kartu, USDT (TRC20) alebo TON. Potvrdenie pošlite priamo tu — predajca ho skontroluje, zvyčajne do 15 minút, a kľúč príde do chatu.",
      f5q: "Dá sa na iný počítač?", f5a: "Kľúč funguje na jednom počítači. Pre druhý vyberte pri kúpe „Nový kľúč“ — príde kód, ktorý sa vloží do Tolku.",
      f6q: "Niečo nefunguje", f6a: "Napíšte podpore — odpovieme osobne a pomôžeme.",
      lang_t: "Jazyk",
      ready_t: "Kľúč je pripravený — vložte ho do Tolku", ready_s: "okno aktivácie alebo „Profil → Zadať kľúč“",
      qty_t: "Koľko kľúčov",
      qty_tier: "od {n} — −{p} %",
      qty_own: "Prvý kľúč je váš, ostatné prídu do chatu ako pohľadnice pre kamarátov.",
      qty_gift: "Každý darček príde ako samostatná pohľadnica.",
      qty_sum: "{n} × {p}",
      qty_save: "zľava {p} %",
      per_key: "{p} za kľúč",
      bulk_ok: "Kľúče sú pripravené: prvý je váš, ostatné pre kamarátov. Pohľadnice sú už v chate.",
      gifts_ok: "Darčeky sú pripravené — pohľadnice s kódmi sú už v chate. Každému kamarátovi pošlite jeho.",
      key_friend: "Kľúč pre kamaráta",
      key_share: "🔑 Tu máš kľúč Tolk — titulky s prekladom nad akýmkoľvek oknom. Kľúč: {c}",
      k_bulk_new: "pre kamaráta · ešte neaktivovaný",
      k_bulk_used: "pre kamaráta · aktivovaný",
      inv_code: "Váš kód pozvánky",
      inv_code_s: "Kamarát otvorí odkaz — alebo zadá tento kód v aplikácii Tolk.",
      inv_change: "Vymyslieť vlastný kód",
      inv_code_ph: "Napríklad OLEH",
      inv_save: "Uložiť",
      inv_saved: "Kód je uložený — starý odkaz tiež funguje",
      inv_left: "Zostáva zmien: {n}.",
      fc_t: "Máte kód od kamaráta?",
      fc_ph: "Kód alebo odkaz pozvánky",
      fc_apply: "Použiť",
      fc_ok: "Pozvánka prijatá: kúpte si predplatné aspoň na mesiac — dostanete +{f} h Tolk AI.",
      rb_t: "Pozvánka od {name}",
      rb_t0: "Pozvánka od kamaráta",
      rb_s: "Kúpte si predplatné aspoň na mesiac — dostanete +{f} h Tolk AI navyše.",
      ref_taken: "Tento kód je už obsadený — vymyslite iný.",
      ref_code: "Kód sa nenašiel — skontrolujte písmená a číslice.",
      ref_self: "To je váš vlastný kód 🙂",
      ref_already: "Už ste prišli cez pozvánku.",
      ref_old: "Kód kamaráta je len pre nových zákazníkov.",
      ref_many: "Kód sa dá zmeniť najviac 5-krát.",
      ref_fmt: "3–16 latinských písmen alebo číslic, bez medzier.",
    },
    en: {
      out_t: "Open Tolk in Telegram", out_p: "This app works inside the @TolkShopBot bot.", out_b: "Open the bot",
      err_net: "Can't reach the server — please try again.", err_auth: "The session has expired — close and reopen the app.",
      err_many: "Too many orders today — try tomorrow or message support.",
      err_rate: "This currency's rate is unavailable right now — pick another method.", err_stale: "This data is out of date — reopen the screen.",
      err_any: "Something went wrong — please try again.", err_big: "The file is larger than 10 MB.", err_type: "Please use a screenshot, photo or PDF.",
      err_nokey: "Get a subscription first — hours are added to it.", retry: "Try again",
      your_sub: "Your subscription", until: "until {d}", ended: "ended {d}", forever: "forever", left_days: "{n} days left",
      ai_left: "Tolk AI · {l} of {t} h left", ai_reset: "refills {d}", unl: "Unlimited Tolk AI",
      new_1: "Understand lectures", new_2: "from day one.",
      new_sub: "Translated subtitles on top of any window. 30 minutes free, then from {p} a week.",
      cta_buy: "Choose a subscription", cta_renew: "Renew subscription",
      t_hours: "Tolk AI hours", t_hours_s: "top up your key", t_keys: "My keys", t_keys_s: "dates and codes",
      t_gift: "Give Tolk", t_gift_s: "a gift card with a code", t_invite: "Invite a friend", t_invite_s: "+{h} h for you, +{f} h for them",
      t_help: "Getting started", t_help_s: "3 steps and answers", t_review: "Review", t_review_s: "rate Tolk", t_review_done: "your rating: {n} of 5",
      sale_eyebrow: "Limited offer", sale_t: "{d} off Tolk", sale_upto: "up to −{p}%", sale_left: "{t} left", sale_until: "until {d}", sale_ends: "Prices go back up {d}", t_promo: "Promo code", t_promo_s: "discount or hours", pc_have: "Have a promo code?", pc_ph: "Promo code", pc_apply: "Apply", pc_code_t: "−{p}% with code {c}", pc_code_s: "on a subscription · until {d}", pr_bad: "No such promo code — check the spelling", pr_expired: "This promo code has expired", pr_full: "This promo code has been used up", pr_used: "You have already used this promo code", pr_nokey: "Promo hours go onto an active subscription — buy one first", promo_t: "−{p}% off your first subscription", promo_s: "after-trial discount · until {d}", l_download: "Download Tolk", l_download_s: "Windows, macOS and Linux", l_channel: "Tolk channel", l_channel_s: "news and updates",
      l_support: "Support", l_support_s: "we reply personally", l_lang: "Language",
      o_wait: "Order awaiting payment", o_check: "Checking your payment",
      plans: "Subscription", gift_a: "Tolk", gift_b: "as a gift", renew: "Renewal", std: "Standard", pro: "Pro · lecture notes",
      pro_lede: "Everything in Standard plus lecture notes: Tolk records the lecture, captures the slides and writes notes in a minute. Up to 45 notes a month.",
      std_lede: "All of Tolk and the Tolk AI translator. Hours refill every 30 days; if they run out early, Tolk translates via Google and you can top up.",
      gift_lede: "After payment you'll get a gift card with a code in the chat — forward it to your friend. The code works on any computer; the subscription starts when it's activated.",
      m_renew: "Renew", m_new: "New key", m_new_s: "A code for another computer — paste it into Tolk.",
      renew_from: "The new period starts {d} — you don't lose a single day.",
      per_month: "{p} a month", hours_all: "{h} h of Tolk AI", best: "best value",
      pay_with: "Payment method", m_manual: "checked by hand, up to 15 min", m_stars: "instant, no checks", m_card: "instant · renews automatically", m_card1: "instant, no checks", m_card_min: "card — from {a}", err_card_min: "Card payments start at €5 — pick another method or a longer plan.", card_t: "Pay by card", card_p: "A secure Stripe page will open. Your key arrives here and in the chat right after payment.", card_auto: "The subscription renews automatically with the same card. Turn it off any time in “My keys”.", card_open: "Pay by card", ap_t: "Auto-renewal", ap_next: "next charge {d}", ap_off_until: "off · key works until {d}", ap_off: "Turn off", ap_live: "on", ap_dead: "off", ap_on: "Turn on again", ap_card: "Change card", ap_off_q: "Turn off auto-renewal? Your key keeps working until the end of the paid period.", na: "rate unavailable",
      pay_btn: "Pay · {a}", wait: "One moment…",
      hours_t: "Hours", hours_lede: "Added to your key right after payment and kept until the subscription ends.",
      hours_key: "For key: {t} · {u}", hours_nokey: "Hours are added to an active subscription — get one first.", pack: "+{h} h of Tolk AI",
      s_new: "Awaiting payment", s_claimed: "Checking payment", s_paid: "Paid", s_rejected: "Payment not found", s_cancelled: "Order cancelled",
      st1_card: "Transfer exactly {a}", st1_crypto: "Send exactly {a}", st_code: "Add this code to the transfer comment",
      st_rec: "Send the receipt", st_rec_s: "A screenshot or a file from your bank.", st_rec_c: "A wallet screenshot, or paste the transaction hash below.",
      tap_copy: "tap to copy", copied: "Copied", addr: "Address", sum: "Amount", code: "Code",
      pick: "Attach the receipt", pick_s: "screenshot, photo or PDF", repick: "choose another file",
      note_ph: "Transaction hash or a comment (optional)", send_rec: "Send the receipt",
      sent: "The seller has your receipt. Checks usually take up to 15 minutes (longer at night). The key arrives in the chat and shows up here.",
      more_rec: "Add another receipt", cancel: "Cancel order", cancel_q: "Cancel this order?", other: "Another payment method",
      paid_t: "Payment received — thank you!", your_key: "Your key",
      paid_auto: "Tolk on your computer activates itself — you're all set in a minute.",
      paid_manual: "Open Tolk and paste the key: in the activation window or in Profile → Enter key.",
      paid_hours: "+{h} h of Tolk AI are already on your key.",
      paid_gift: "The gift card with the code is in the chat with the bot. Forward it to your friend or share the code from here.",
      share: "Share", gift_share: "🎁 A gift for you: Tolk — translated subtitles on top of any window. Code: {c}",
      rej_p: "If you've already sent the money, message support with your receipt and we'll sort it out.",
      home: "Home", download: "Download Tolk",
      keys_t: "My keys", keys_empty: "Keys you buy in Tolk will appear here.",
      k_active: "active", k_ended: "ended", k_revoked: "disabled", k_trial: "trial", k_unused: "not entered in Tolk yet",
      k_gift_new: "gift · not activated yet", k_gift_used: "gift · activated", k_renew: "Renew", k_hours: "Hours", k_code: "Key code",
      inv_a: "Invite", inv_b: "a friend",
      inv_lede: "When a friend buys a subscription of a month or longer via your link, you get +{h} h of Tolk AI and they get +{f} h.",
      inv_link: "Your link", inv_send: "Send an invite", inv_n: "invited", inv_got: "earned", h_short: "h",
      inv_rules: "One reward per friend, up to 10 a month.",
      rv_t: "How do you like Tolk?", rv_lede: "One rating and a few words — it really matters. The seller reads low ratings personally and helps.",
      rv_ph: "What do you like, or what's getting in the way?", rv_pub: "You may show it in the Tolk channel (first name only)", rv_send: "Send review",
      rv_thanks: "Thank you! Your review is saved 💛", rv_need: "Pick a rating from 1 to 5",
      help_t: "Getting started", h1: "Download Tolk for your system (Windows, macOS or Linux) and install it.",
      h2: "Open Tolk and paste your key — in the activation window or in Profile → Enter key. If you bought from the app, the key is set automatically.",
      h3: "Pick what to listen to — the lecture tab, Zoom, Teams or Webex — and press Start translation.",
      h_trial: "The first 30 minutes are free: tap “30 minutes free” on the home screen.", t_trial: "30 minutes free", t_trial_s: "Tolk AI with no payment — once", tr_t: "30 minutes *free*", tr_p: "Everything as in the full version: Tolk AI, browser tabs, every language. Once per account and per computer.", tr_btn: "Get 30 minutes", tr_applied: "Done! Tolk on your computer is already activated — go back to the app and turn translation on.", tr_code: "Trial code", tr_how: "Open Tolk and paste the code — in the activation window or in Profile → Enter key. No Tolk yet? Download it.", tr_used: "This account has already had a trial — pick a plan.", tr_used_pc: "This computer has already had a trial — pick a plan.", tr_busy: "Too many trials today — please try tomorrow.", faq_t: "Questions",
      f1q: "What are Tolk AI hours?",
      f1a: "Time the Tolk AI translator works: it re-listens to every phrase and translates precisely. A subscription has {m} h a month, refilled every 30 days. If they run out early, Tolk translates via Google and you can top up.",
      f2q: "Does renewing waste the days I have left?", f2a: "No. The new period starts after the current one — you don't lose a single day. Tolk on your computer picks up the new key itself.",
      f3q: "Where does Tolk work?", f3a: "On top of any window in Windows 10 and 11, macOS 13+ and Linux (macOS and Linux in beta): Zoom, Teams, Webex, Google Meet, lectures in the browser, YouTube and films.",
      f4q: "How does payment work?", f4a: "By transfer to a Ukrainian card, USDT (TRC20) or TON. Send the receipt right here — the seller checks it, usually within 15 minutes, and the key arrives in the chat.",
      f5q: "Can I use it on another computer?", f5a: "A key works on one computer. For a second one, choose New key when buying — you'll get a code to paste into Tolk.",
      f6q: "Something doesn't work", f6a: "Message support — we reply personally and will help.",
      lang_t: "Language",
      ready_t: "Your key is ready — paste it into Tolk", ready_s: "the activation window or Profile → Enter key",
      qty_t: "How many keys",
      qty_tier: "{n}+ — −{p}%",
      qty_own: "The first key is yours; the rest arrive in the chat as cards for your friends.",
      qty_gift: "Each gift arrives as its own card.",
      qty_sum: "{n} × {p}",
      qty_save: "{p}% off",
      per_key: "{p} per key",
      bulk_ok: "Your keys are ready: the first is yours, the rest are for friends. The cards are already in the chat.",
      gifts_ok: "Your gifts are ready — the cards with codes are in the chat. Forward each friend their card.",
      key_friend: "Key for a friend",
      key_share: "🔑 Here's a Tolk key — translated subtitles on top of any window. Key: {c}",
      k_bulk_new: "for a friend · not activated yet",
      k_bulk_used: "for a friend · activated",
      inv_code: "Your invitation code",
      inv_code_s: "Your friend opens the link — or enters this code in the Tolk app.",
      inv_change: "Make your own code",
      inv_code_ph: "e.g. OLEH",
      inv_save: "Save",
      inv_saved: "Code saved — the old link still works",
      inv_left: "Changes left: {n}.",
      fc_t: "Have a friend's code?",
      fc_ph: "Invitation code or link",
      fc_apply: "Apply",
      fc_ok: "Invitation accepted: buy a subscription of a month or longer and get +{f} h of Tolk AI.",
      rb_t: "Invitation from {name}",
      rb_t0: "Invitation from a friend",
      rb_s: "Buy a subscription of a month or longer and get +{f} h of Tolk AI as a gift.",
      ref_taken: "That code is taken — try another.",
      ref_code: "Code not found — check the letters and digits.",
      ref_self: "That's your own code 🙂",
      ref_already: "You've already joined by invitation.",
      ref_old: "A friend's code is for new customers only.",
      ref_many: "The code can be changed up to 5 times.",
      ref_fmt: "3–16 Latin letters or digits, no spaces.",
    },
  };
  const LANGS = [["ru", "Русский"], ["uk", "Українська"], ["sk", "Slovenčina"], ["en", "English"]];
  const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const t = (k, v = {}) => String((T[L] && T[L][k]) ?? T.en[k] ?? T.ru[k] ?? k).replace(/\{(\w+)\}/g, (m, n) => (v[n] == null ? "" : String(v[n])));

  // ------------------------------------------------------------------------------------------- мелочи
  // h("tag.cls", props, ...kids): текст покупателя и сервера — только через textContent, HTML — лишь свои иконки
  function h(tag, props, ...kids) {
    const [name, ...cls] = String(tag).split(".");
    const el = document.createElement(name || "div");
    if (cls.length) el.className = cls.join(" ");
    for (const [k, v] of Object.entries(props || {})) {
      if (v == null || v === false) continue;
      if (k === "on") for (const [ev, fn] of Object.entries(v)) el.addEventListener(ev, fn);
      else if (k === "html") el.innerHTML = v;
      else if (k === "text") el.textContent = v;
      else el.setAttribute(k, v === true ? "" : String(v));
    }
    for (const k of kids.flat(Infinity)) if (k != null && k !== false) el.append(k.nodeType ? k : document.createTextNode(String(k)));
    return el;
  }
  const P = {
    key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
    clock: '<circle cx="12" cy="12" r="9.5"/><path d="M12 6.5V12l3.5 2"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    help: '<circle cx="12" cy="12" r="9.5"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>',
    tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.5 1.5 0 0 1 0 2.1l-6.2 6.2a1.5 1.5 0 0 1-2.1 0z"/><circle cx="8" cy="8" r="1.4"/>',
    star: '<path d="M12 2.8l2.8 5.8 6.3.9-4.6 4.5 1.1 6.3L12 17.3l-5.6 3 1.1-6.3-4.6-4.5 6.3-.9z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    horn: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    globe: '<circle cx="12" cy="12" r="9.5"/><path d="M2.5 12h19"/><path d="M12 2.5a14.5 14.5 0 0 1 0 19 14.5 14.5 0 0 1 0-19z"/>',
    chev: '<path d="m9 18 6-6-6-6"/>',
    copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    renew: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  };
  const icon = (n, fill = false) => `<svg viewBox="0 0 24 24" fill="${fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.7" ` +
    `stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ""}</svg>`;
  const ic = (n) => h("span.ic", { html: icon(n) });

  const num = (n, d = 1) => { const s = String(Math.round(Number(n) * 10 ** d) / 10 ** d); return L === "en" ? s : s.replace(".", ","); };
  const eur = (p) => { const s = Number(p).toFixed(2); return L === "en" ? "€" + s : s.replace(".", ",") + " €"; };
  const dec = (v) => (L === "en" ? String(v) : String(v).replace(".", ","));
  const money = (price, cur) => (cur === "UAH" ? `${price} ₴` : cur === "EUR" ? eur(price) : cur === "⭐" || cur === "XTR" ? `${price} ⭐` : `${dec(price)} ${cur}`);
  const whenShort = (iso) => {
    const d = new Date(iso);
    return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  };
  const date = (iso) => {
    if (!iso) return "";
    const [y, m, d] = String(iso).slice(0, 10).split("-");
    return L === "en" ? `${Number(d)} ${MON[Number(m) - 1]} ${y}` : `${d}.${m}.${y}`;
  };
  const haptic = (k = "light") => {
    try {
      if (["success", "error", "warning"].includes(k)) tg.HapticFeedback.notificationOccurred(k);
      else tg.HapticFeedback.impactOccurred(k);
    } catch (e) { /* без вибро */ }
  };

  let toastT = 0;
  function toast(text) {
    let el = document.querySelector(".toast");
    if (!el) { el = h("div.toast", { role: "status" }); document.body.append(el); }
    el.textContent = text;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("show"), 2600);
  }
  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      const ta = h("textarea", { style: "position:fixed;opacity:0;top:0", readonly: true });
      ta.value = text;
      document.body.append(ta);
      ta.select();
      try { document.execCommand("copy"); } catch (e2) { /* ничего */ }
      ta.remove();
    }
    haptic("light");
    toast(t("copied"));
  }
  const copyRow = (label, value, shown) => h("button.copy", { type: "button", on: { click: () => copy(String(value)) } },
    h("span.tx", null, h("small", { text: `${label} · ${t("tap_copy")}` }), h("code", { text: shown || String(value) })), h("span", { html: icon("copy") }));
  const openLink = (url) => { try { tg.openLink(url); } catch (e) { window.open(url, "_blank", "noopener"); } };
  const openTg = (url) => { try { tg.openTelegramLink(url); } catch (e) { openLink(url); } };
  const share = (url, text) => openTg(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text || "")}`);
  const confirmBox = (text) => new Promise((res) => {
    try { tg.showConfirm(text, (ok) => res(Boolean(ok))); } catch (e) { res(window.confirm(text)); }
  });

  // ------------------------------------------------------------------------------------------- сервер
  async function call(path, init, as = "json") {
    try {
      const r = await fetch(`${API}/mini/${path}`, { method: "POST", ...init, headers: { "x-init-data": tg.initData, ...(init.headers || {}) } });
      if (as === "blob") return r.ok ? await r.blob() : null;
      const d = await r.json().catch(() => ({}));
      return r.ok ? d : { error: d.error || "http", message: d.message || "", status: r.status };
    } catch (e) {
      return as === "blob" ? null : { error: "net" };
    }
  }
  const api = (path, body = {}) => call(path, { headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const apiForm = (path, fd) => call(path, { body: fd });
  const errText = (r) => t({ net: "err_net", auth: "err_auth", too_many: "err_many", rate: "err_rate", stale: "err_stale", plan: "err_stale",
                             method: "err_stale", order: "err_stale", nokey: "err_nokey", too_big: "err_big", type: "err_type",
                             ref_taken: "ref_taken", ref_code: "ref_code", ref_self: "ref_self", ref_already: "ref_already", ref_old: "ref_old",
                             ref_many: "ref_many", card_min: "err_card_min", stripe: "err_any", bad: "pr_bad", expired: "pr_expired", full: "pr_full", used: "pr_used" }[r.error] ||
                             (r.error === "nokey" && r.promo ? "pr_nokey" : "err_any"));
  async function refresh() {
    const r = await api("state");
    if (!r.error) { S = r; L = r.lang || L; }
    return !r.error;
  }

  // ------------------------------------------------------------------------------------------- навигация и кнопки Telegram
  function setMain(o) {
    const mb = tg.MainButton;
    mainFn = o ? o.fn : null;
    if (!o) { mb.hide(); return; }
    const css = getComputedStyle(document.documentElement);
    mb.setParams({ text: o.text, color: css.getPropertyValue("--accent").trim() || "#e3bd76",
                   text_color: css.getPropertyValue("--on-accent").trim() || "#0b0906", is_active: !o.disabled, is_visible: true });
    if (o.busy) mb.showProgress(false); else mb.hideProgress();
  }
  const top = () => stack[stack.length - 1];
  function go(v, p = {}) { stack.push({ v, p }); render(); }
  function back() { if (stack.length > 1) { stack.pop(); render(); } }
  function home() { stack = [{ v: "home", p: {} }]; render(); }
  function replace(v, p = {}) { stack[stack.length - 1] = { v, p }; render(); }

  // экран = async-функция (параметры) → { node, main }; main — большая кнопка Telegram внизу
  async function render(keep = false) {
    clearTimeout(poll);
    const my = ++gen;
    const cur = top();
    if (stack.length > 1) tg.BackButton.show(); else tg.BackButton.hide();
    if (!keep) setMain(null);
    const out = await (VIEWS[cur.v] || VIEWS.home)(cur.p);
    if (my !== gen || !out) return;                                   // пока ждали сервер, ушли на другой экран
    const y = window.scrollY;
    $app.replaceChildren(h("div.view", null, out.node));
    window.scrollTo(0, keep ? y : 0);
    setMain(out.main || null);
  }
  const rerender = () => render(true);
  const loading = () => $app.replaceChildren(h("div.view", null, h("div.skel.big"), h("div.skel"), h("div.skel")));

  function hero(img, ...content) {
    return h("section.hero", null, h("img.hero-bg", { src: `img/${img}.jpg`, alt: "", decoding: "async" }),
             h("div.hero-in", null, h("div.brand", { html: `${TMARK}<span>Tolk</span>` }), ...content));
  }
  const meter = (u, light) => {
    const left = Math.max(0, u.total_h - u.used_h);
    return h("div.meter" + (light ? ".light" : ""), null,
      h("div.bar", null, h("i", { style: `width:${Math.max(3, 100 - u.pct)}%` })),
      h("div.row", null, h("span", { text: t("ai_left", { l: num(left), t: num(u.total_h) }) }),
        u.resets ? h("span", { text: t("ai_reset", { d: date(u.resets) }) }) : null));
  };
  const keyStatus = (k) => (k.unl ? t("forever") : k.status === "active" ? (k.expires ? t("until", { d: date(k.expires) }) : t("forever"))
    : k.status === "ended" ? t("ended", { d: date(k.expires) }) : k.status === "revoked" ? t("k_revoked") : t("k_trial"));
  const tap = (fn) => ({ click: () => { haptic(); fn(); } });
  const li = (icn, title, sub, fn) => h("button.li", { type: "button", on: tap(fn) }, ic(icn),
    h("span.tx", null, title, sub ? h("small", { text: sub }) : null), h("span.chev", { html: icon("chev") }));
  const tile = (icn, title, sub, fn, wide) => h("button.tile" + (wide ? ".wide" : ""), { type: "button", on: tap(fn) }, ic(icn),
    wide ? h("div", null, h("b", { text: title }), h("span", { text: sub })) : [h("b", { text: title }), h("span", { text: sub })]);
  const title2 = (a, b) => h("h1", null, a + " ", h("em", { text: b }));
  const minPrice = () => {
    const w = S.shop.plans.find((p) => p.id === "week") || S.shop.plans[0];
    return w ? eur(w.price) : "";
  };
  // способ оплаты по умолчанию — первый, у которого есть цена на этот товар
  function pickMethod(p, prices = null) {                        // prices — цены за несколько ключей (quote)
    const disc = !prices && !p.gift && promoOn(p.item) && S.promo.prices;         // скидка — цены от сервера, как в заказе
    const priceOf = (m) => (prices ? prices[m.id] : disc && disc[m.id] ? disc[m.id][p.item] : m.prices && m.prices[p.item]) || null;
    const ok = (m) => priceOf(m) && !priceOf(m).unavailable;
    if (!p.method && S.last_method && S.shop.methods.some((m) => m.id === S.last_method && ok(m))) p.method = S.last_method;   // как в прошлый раз
    if (!S.shop.methods.some((m) => m.id === p.method && ok(m))) p.method = (S.shop.methods.find(ok) || {}).id || null;
    const m = S.shop.methods.find((mm) => mm.id === p.method);
    return { priceOf, pr: m ? priceOf(m) : null };
  }
  function methodList(p, priceOf) {
    return S.shop.methods.map((m) => {
      const pr = priceOf(m);
      const off = !pr || pr.unavailable;
      return h("button.opt", { type: "button", role: "radio", "aria-checked": String(m.id === p.method), "aria-disabled": off ? "true" : null,
        on: { click: () => { if (off) return; p.method = m.id; haptic(); rerender(); } } },
        h("span.radio"),
        h("span.tx", null, h("b", { text: m.title + (m.network ? ` · ${m.network}` : "") }), h("small", { text: m.kind === "stars" ? t("m_stars") : m.kind === "stripe" ? t(recurringPick(p) ? "m_card" : "m_card1") : t("m_manual") })),
        h("span.pr", null, off ? h("small", { text: pr && pr.why === "min" ? t("m_card_min", { a: eur(pr.min) }) : t("na") })
          : [h("b", { text: money(pr.price, pr.currency) }), pr.currency !== "EUR" && pr.eur ? h("small", { text: "≈ " + eur(pr.eur) }) : null]));
    });
  }
  // подписка картой продлевается сама (как на сервере: тариф со сроком, один ключ, не подарок)
  const recurringPick = (p) => { const pl = (S.shop.plans || []).find((x) => x.id === p.item); return Boolean(pl && pl.days && !p.gift && !(p.qty > 1)); };
  const payMain = (pr, body) => (pr ? { text: t("pay_btn", { a: money(pr.price, pr.currency) }), fn: () => startOrder(body) } : null);

  // сколько ключей: от 3 и от 5 — скидка (BULK на сервере); первый ключ — покупателю, остальные — открытками друзьям
  function qtyStepper(p) {
    const max = S.shop.max_qty || 10;
    const set = (v) => { p.qty = Math.min(max, Math.max(1, v)); haptic(); rerender(); };
    const hint = (S.shop.bulk || []).map((x) => t("qty_tier", { n: x.min, p: x.pct })).join(" · ");
    return h("div.qty", null, h("span.tx", null, h("b", { text: t("qty_t") }), hint ? h("small", { text: hint }) : null),
      h("span.stepper", null,
        h("button", { type: "button", "aria-label": "−1", disabled: p.qty <= 1 || null, on: { click: () => set(p.qty - 1) } }, "−"),
        h("output", { text: String(p.qty), "aria-live": "polite" }),
        h("button", { type: "button", "aria-label": "+1", disabled: p.qty >= max || null, on: { click: () => set(p.qty + 1) } }, "+")));
  }

  // приглашение: баннер «от кого» и поле «код друга» (для тех, кто пришёл без ссылки)
  const refBanner = () => h("div.notice", null, ic("gift"), h("span.tx", null,
    S.ref_by.name ? t("rb_t", { name: S.ref_by.name }) : t("rb_t0"), h("small", { text: t("rb_s", { f: num(S.ref.friend) }) })));
  function friendCode() {
    const input = h("input", { type: "text", placeholder: t("fc_ph"), autocomplete: "off", spellcheck: "false", enterkeyhint: "done", maxlength: 80 });
    const apply = async () => {
      const v = input.value.trim();
      if (!v) { input.focus(); return; }
      const r = await api("ref/apply", { code: v });
      if (r.error) { haptic("error"); toast(errText(r)); return; }
      haptic("success");
      toast(t("fc_ok", { f: num(r.friend) }));
      await refresh();
      rerender();
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") apply(); });
    return h("details.sec", null, h("summary", { text: t("fc_t") }), h("div.fc-row", null, input, h("button.btn", { type: "button", on: tap(apply) }, t("fc_apply"))));
  }
  // пересылка приглашения карточкой (картинка + кнопка) — Telegram 8.0+; иначе — обычная ссылка
  async function shareInvite(r) {
    if (tg.shareMessage && tg.isVersionAtLeast && tg.isVersionAtLeast("8.0")) {
      const s = await api("ref/share");
      if (s.id) {
        try { tg.shareMessage(s.id, (sent) => { if (sent) haptic("success"); }); return; } catch (e) { /* ниже — обычная ссылка */ }
      }
    }
    share(r.link, r.share_text);
  }

  // ------------------------------------------------------------------------------------------- экраны покупателя
  const VIEWS = {};

  VIEWS.home = async () => {
    const k = S.key, o = S.order;
    const head = [];
    if (k) {
      const days = k.status === "active" && k.days_left != null && !k.unl ? " · " + t("left_days", { n: k.days_left }) : "";
      head.push(h("p.eyebrow", { text: t("your_sub") }), h("h1", { text: k.title }), h("p.sub", { text: keyStatus(k) + days }));
      if (k.usage) head.push(meter(k.usage));
      else if (k.unl) head.push(h("p.sub", { text: t("unl") }));
    } else {
      head.push(title2(t("new_1"), t("new_2")), h("p.sub", { text: t("new_sub", { p: minPrice() }) }));
    }
    const bits = [hero("menu", ...head)];
    const sb = saleBanner(() => go("plans"));
    if (sb) bits.push(sb);
    const ready = !k && (S.keys || []).find((c) => !c.serial && !c.used && !c.gift && c.kind === "plan");
    if (ready) {
      bits.push(h("div.card", null, h("b", { text: t("ready_t") }), h("p.muted", { text: `${ready.title} · ${t("ready_s")}` }),
        copyRow(t("k_code"), ready.code)));
    }
    if (S.ref_by && !k) bits.push(refBanner());
    if (S.promo && !o) {                         // скидка после пробного — на первую подписку
      bits.push(h("button.notice", { type: "button", on: tap(() => go("plans")) }, h("span.dot"),
        h("span.tx", null, S.promo.code ? t("pc_code_t", { p: S.promo.pct, c: S.promo.code }) : t("promo_t", { p: S.promo.pct }),
          h("small", { text: t(S.promo.code ? "pc_code_s" : "promo_s", { d: whenShort(S.promo.until) }) })),
        h("span.chev", { html: icon("chev") })));
    }
    if (o) {
      bits.push(h("button.notice", { type: "button", on: tap(() => go("pay", { id: o.id, order: o })) }, h("span.dot"),
        h("span.tx", null, o.state === "claimed" ? t("o_check") : t("o_wait"), h("small", { text: `${o.title}${o.qty > 1 ? " × " + o.qty : ""} · ${money(o.price, o.currency)}` })),
        h("span.chev", { html: icon("chev") })));
    }
    const tiles = [];
    if (k && k.usage) tiles.push(tile("clock", t("t_hours"), t("t_hours_s"), () => go("hours", { serial: k.serial })));
    if (S.trial && S.trial.can) tiles.push(tile("clock", t("t_trial"), t("t_trial_s"), () => go("trial"), true));
    tiles.push(tile("key", t("t_keys"), t("t_keys_s"), () => go("keys")));
    tiles.push(tile("gift", t("t_gift"), t("t_gift_s"), () => go("plans", { gift: true })));
    if (S.ref && S.ref.on) tiles.push(tile("users", t("t_invite"), t("t_invite_s", { h: num(S.ref.hours), f: num(S.ref.friend) }), () => go("invite")));
    tiles.push(tile("help", t("t_help"), t("t_help_s"), () => go("help")));
    tiles.push(tile("star", t("t_review"), S.review ? t("t_review_done", { n: S.review.n }) : t("t_review_s"), () => go("review")));
    tiles.push(tile("tag", t("t_promo"), t("t_promo_s"), () => { promoOpen = true; go("plans", k && k.renewable ? { serial: k.serial } : {}); }));
    if (tiles.filter((x) => !x.classList.contains("wide")).length % 2) tiles[tiles.length - 1].classList.add("wide");
    bits.push(h("div.tiles", null, tiles));
    const links = [li("download", t("l_download"), t("l_download_s"), () => openLink(S.links.site))];
    if (S.links.channel) links.push(li("horn", t("l_channel"), t("l_channel_s"), () => openTg(S.links.channel)));
    links.push(li("send", t("l_support"), t("l_support_s"), () => openTg(S.links.support)));
    links.push(li("globe", t("l_lang"), (LANGS.find(([c]) => c === L) || [])[1], () => go("lang")));
    bits.push(h("div.sec", null, h("div.list", null, links)), h("p.foot", { text: "Tolk · @TolkShopBot" }));
    const main = o ? null : k && k.renewable ? { text: t("cta_renew"), fn: () => go("plans", { serial: k.serial }) }
      : ready ? { text: t("download"), fn: () => openLink(S.links.site) } : !k ? { text: t("cta_buy"), fn: () => go("plans") } : null;
    return { node: bits, main };
  };

  // акция: плашка «ограниченное предложение» с обратным отсчётом; цены в каталоге уже со скидкой, старые — в was
  let saleTimer = 0;
  const two = (n) => String(n).padStart(2, "0");
  function countdown(ms) {
    const s2 = Math.max(0, Math.floor(ms / 1000)), d = Math.floor(s2 / 86400);
    return (d ? d + (L === "en" ? "d " : " " + ({ ru: "д", uk: "д", sk: "d" }[L] || "d") + " ") : "") +
      `${two(Math.floor(s2 / 3600) % 24)}:${two(Math.floor(s2 / 60) % 60)}:${two(s2 % 60)}`;
  }
  function saleBanner(go2) {
    const sv = S.shop && S.shop.sale;
    if (!sv || Date.parse(sv.until) <= Date.now()) return null;
    const disc = sv.same ? `−${sv.pct}${L === "en" ? "" : " "}%` : t("sale_upto", { p: sv.pct });
    const left = h("b.cd");
    const tick = () => {
      const ms = Date.parse(sv.until) - Date.now();
      if (ms <= 0) { clearInterval(saleTimer); refresh().then(rerender); return; }
      left.textContent = countdown(ms);
    };
    clearInterval(saleTimer);
    tick();
    saleTimer = setInterval(() => { if (!left.isConnected) { clearInterval(saleTimer); return; } tick(); }, 1000);
    const until = new Date(sv.until).toLocaleDateString({ ru: "ru-RU", uk: "uk-UA", sk: "sk-SK", en: "en-GB" }[L] || "ru-RU", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
    return h(go2 ? "button.sale" : "div.sale", go2 ? { type: "button", on: tap(go2) } : null,
      h("span.sale-ey", { text: t("sale_eyebrow") }),
      h("span.sale-t", { text: sv.title || t("sale_t", { d: disc }) }),
      h("span.sale-row", null, h("span", { text: t("sale_until", { d: until }) }), h("span.sale-left", null, t("sale_left", { t: "" }).trim(), " ", left)));
  }
  // цена тарифа с акцией и промокодом (берётся бо́льшая скидка, как в заказе)
  let promoOff = false;                                  // подарок и несколько ключей — промокод не действует (как в заказе)
  function shownPrice(x) {
    const base = Number(x.was || x.price), sale = Number(x.sale_pct || 0);
    const promo = promoOn(x.id) && !promoOff ? Number(S.promo.pct) : 0;
    const now = promo > sale ? Math.round(base * (1 - promo / 100) * 100) / 100 : Number(x.price);
    return { base, now, off: now < base, pct: Math.round((1 - now / base) * 100) };
  }
  const priceCell = (x) => {
    const sp = shownPrice(x);
    return sp.off ? h("span.pr", null, h("s", { text: eur(sp.base) }), h("b.hot", { text: eur(sp.now) })) : h("span.pr", null, h("b", { text: eur(x.price) }));
  };

  // промокод: скидка (видна сразу в ценах) или часы Tolk AI (сразу на ключ)
  const promoOn = (id) => Boolean(S.promo && (S.promo.items || []).includes(id));
  let promoOpen = false;
  function promoBox() {
    if (!promoOpen) return h("button.linkbtn", { type: "button", text: t("pc_have"), on: tap(() => { promoOpen = true; rerender(); }) });
    const inp = h("input.field", { type: "text", placeholder: t("pc_ph"), autocapitalize: "characters", spellcheck: "false", autocomplete: "off" });
    const apply = async () => {
      const code = inp.value.trim();
      if (!code) { inp.focus(); return; }
      btnA.disabled = true;
      const r = await api("promo", { code });
      btnA.disabled = false;
      if (r.error) { haptic("error"); toast(errText({ ...r, promo: true })); return; }
      haptic("success");
      toast(r.text);
      promoOpen = false;
      await refresh();
      rerender();
    };
    const btnA = h("button.btn.sm", { type: "button", text: t("pc_apply"), on: tap(apply) });
    inp.addEventListener("keydown", (e) => { if (e.key === "Enter") apply(); });
    setTimeout(() => inp.focus(), 50);
    return h("div.promo-in", null, inp, btnA);
  }

  // тарифы: покупка, продление ключа (serial), новый ключ (mode "new"), подарок (gift), Pro
  VIEWS.plans = async (p) => {
    const shop = S.shop;
    const renewable = (S.keys || []).filter((k) => k.serial && k.renewable);
    if (!p.gift && p.serial === undefined) p.serial = S.key && S.key.renewable ? S.key.serial : null;
    const target = p.serial ? renewable.find((k) => k.serial === p.serial) : null;
    const hasPro = shop.plans.some((x) => x.pro);
    if (p.pro === undefined) p.pro = Boolean(target && target.pro);
    const list = shop.plans.filter((x) => x.pro === Boolean(p.pro && hasPro));
    if (!p.item && target && list.some((x) => x.id === target.plan)) p.item = target.plan;      // продление — тот же тариф
    if (!list.some((x) => x.id === p.item)) p.item = (list.find((x) => /month/.test(x.id)) || list[0] || {}).id;
    p.qty = target ? 1 : p.qty || 1;
    if (p.qty > 1 && (!p.qc || p.qc.k !== p.item + ":" + p.qty)) {  // цены за несколько ключей считает сервер (тот же курс)
      const q = await api("quote", { item: p.item, qty: p.qty });
      p.qc = q.error ? null : { ...q, k: p.item + ":" + p.qty };
      if (q.error) toast(errText(q));
    }
    promoOff = Boolean(p.gift || p.qty > 1);
    const { priceOf, pr } = pickMethod(p, p.qty > 1 ? (p.qc ? p.qc.prices : {}) : null);
    const head = p.gift ? title2(t("gift_a"), t("gift_b")) : h("h1", null, h("em", { text: target ? t("renew") : t("plans") }));
    const bits = [hero(p.gift ? "gift" : "plans", target ? h("p.eyebrow", { text: target.title }) : null, head)];
    if (hasPro) {
      const seg = (pro, label) => h("button", { type: "button", "aria-pressed": String(Boolean(p.pro) === pro),
        on: { click: () => { p.pro = pro; p.item = null; haptic(); rerender(); } } }, label);
      bits.push(h("div.seg", null, seg(false, t("std")), seg(true, t("pro"))));
    }
    const sb = saleBanner();
    if (sb) bits.push(sb);
    bits.push(h("p.lede", { text: p.gift ? t("gift_lede") : p.pro ? t("pro_lede") : t("std_lede") }));
    if (!p.gift && S.ref_by) bits.push(refBanner());
    else if (!p.gift && S.ref && S.ref.can) bits.push(friendCode());
    if (!p.gift && renewable.length) {
      const chip = (on, label, fn) => h("button.chip", { type: "button", "aria-pressed": String(on), on: { click: () => { fn(); haptic(); rerender(); } } }, label);
      bits.push(h("div.chips", null, renewable.map((k) => chip(p.serial === k.serial, `${t("m_renew")}: ${k.title}`, () => { p.serial = k.serial; })),
        chip(!p.serial, t("m_new"), () => { p.serial = null; })));
      if (!p.serial) bits.push(h("p.note", { text: t("m_new_s") }));
    }
    bits.push(h("div.sec", { role: "radiogroup" }, list.map((x) => h("button.opt", { type: "button", role: "radio", "aria-checked": String(x.id === p.item),
      on: { click: () => { p.item = x.id; haptic(); rerender(); } } },
      h("span.radio"),
      h("span.tx", null, h("b", null, x.title, shownPrice(x).off ? h("span.badge.hot", { text: `−${shownPrice(x).pct}%` })
        : x.best ? h("span.badge", { text: t("best") }) : x.save ? h("span.badge", { text: `−${x.save}%` }) : null),
        h("small", { text: [x.period_h ? t("hours_all", { h: num(x.period_h) }) : "", x.days > 40 && x.per_month ? t("per_month", { p: eur(x.per_month) }) : ""]
          .filter(Boolean).join(" · ") })),
      priceCell(x)))));
    if (!p.gift && p.qty === 1) bits.push(promoBox());
    if (target && target.status === "active" && target.expires) {
      const d = new Date(target.expires + "T00:00:00Z");
      d.setUTCDate(d.getUTCDate() + 1);
      bits.push(h("p.note", { text: t("renew_from", { d: date(d.toISOString()) }) }));
    }
    if (!target) {
      bits.push(qtyStepper(p));
      if (p.qty > 1) {
        bits.push(h("p.note", { text: t(p.gift ? "qty_gift" : "qty_own") }));
        const unit = Number((list.find((x) => x.id === p.item) || {}).price || 0);
        if (p.qc) {
          bits.push(h("div.card.sum", null,
            h("div.row", null, h("span", { text: t("qty_sum", { n: p.qty, p: eur(unit) }) }), p.qc.pct ? h("s", { text: eur(unit * p.qty) }) : null,
              h("b", { text: eur(p.qc.eur) })),
            h("small.muted", { text: [p.qc.pct ? t("qty_save", { p: p.qc.pct }) : "", t("per_key", { p: eur(p.qc.eur / p.qty) })].filter(Boolean).join(" · ") })));
        }
      }
    }
    bits.push(h("div.sec", { role: "radiogroup" }, h("p.sec-t", { text: t("pay_with") }), methodList(p, priceOf)));
    return { node: bits, main: payMain(pr, { item: p.item, method: p.method, serial: p.serial || undefined, gift: p.gift || undefined,
                                             qty: p.qty > 1 ? p.qty : undefined }) };
  };

  // часы Tolk AI к ключу
  VIEWS.hours = async (p) => {
    const keys = (S.keys || []).filter((k) => k.serial && k.usage);
    const target = (p.serial && keys.find((k) => k.serial === p.serial)) || (S.key && S.key.usage ? S.key : keys[0]);
    const bits = [hero("hours", h("p.eyebrow", { text: "Tolk AI" }), h("h1", null, h("em", { text: t("hours_t") })))];
    if (!target) {
      bits.push(h("p.lede", { text: t("hours_nokey") }));
      return { node: bits, main: { text: t("cta_buy"), fn: () => replace("plans") } };
    }
    p.serial = target.serial;
    const tops = S.shop.topups || [];
    if (!tops.some((x) => x.id === p.item)) p.item = (tops.find((x) => x.hours === 30) || tops[0] || {}).id;
    const { priceOf, pr } = pickMethod(p);
    bits.push(h("p.lede", { text: t("hours_lede") }),
      h("div.card", null, h("b", { text: t("hours_key", { t: target.title, u: keyStatus(target) }) }), meter(target.usage, true)),
      h("div.sec", { role: "radiogroup" }, tops.map((x) => h("button.opt", { type: "button", role: "radio", "aria-checked": String(x.id === p.item),
        on: { click: () => { p.item = x.id; haptic(); rerender(); } } }, h("span.radio"), h("span.tx", null, h("b", { text: t("pack", { h: num(x.hours) }) })),
        priceCell(x)))),
      h("div.sec", { role: "radiogroup" }, h("p.sec-t", { text: t("pay_with") }), methodList(p, priceOf)));
    const sb = saleBanner();
    if (sb) bits.splice(1, 0, sb);
    return { node: bits, main: payMain(pr, { item: p.item, method: p.method, serial: p.serial }) };
  };

  async function startOrder(body) {
    setMain({ text: t("wait"), busy: true, disabled: true });
    const r = await api("order", body);
    if (r.error) { haptic("error"); toast(errText(r)); rerender(); return; }
    haptic("success");
    if (r.order.method.kind !== "stars") S.order = r.order;
    go("pay", { id: r.order.id, order: r.order });
    if (r.checkout) openLink(r.checkout);
    if (r.invoice) {
      try {
        tg.openInvoice(r.invoice, (status) => { if (status === "paid") refreshOrder(r.order.id, true); });
      } catch (e) { toast(t("err_any")); }
    }
  }

  // оплата: реквизиты → квитанция → ожидание → ключ
  VIEWS.pay = async (p) => {
    if (!p.order) {
      const r = await api("order/view", { id: p.id });
      if (r.error) return { node: h("p.empty", { text: errText(r) }), main: { text: t("home"), fn: home } };
      p.order = r.order;
    }
    const o = p.order, m = o.method || {};
    if (o.state === "paid") return payDone(o);
    if (o.state === "rejected" || o.state === "cancelled") {
      if (S.order && S.order.id === o.id) S.order = null;
      const bits = [h("div.done", null, h("div.ok.bad", { html: icon("x") }), h("h2", { text: t("s_" + o.state) }),
        o.state === "rejected" ? h("p", { text: t("rej_p") }) : null)];
      if (o.state === "rejected") bits.push(h("div.sec", null, h("button.btn", { type: "button", on: tap(() => openTg(S.links.support)) }, t("l_support"))));
      return { node: bits, main: { text: t("home"), fn: home } };
    }
    const bits = [h("div.center", null, h("span.status.wait", { text: t("s_" + o.state) })),
      h("div.amount", null, h("button.big", { type: "button", on: { click: () => copy(o.price) } }, money(o.price, o.currency)),
        h("small", { text: o.title + (o.qty > 1 ? ` × ${o.qty}` : "") + (o.gift ? " · 🎁" : "") + (o.currency !== "EUR" && o.eur ? ` · ≈ ${eur(o.eur)}` : "") }))];
    schedule(o.id);
    if (o.state === "new" && m.kind === "stripe") {
      bits.push(h("div.card", null, h("h3", { text: t("card_t") }), h("p", { text: t("card_p") }), o.autopay ? h("p.muted", { text: t("card_auto") }) : null,
        h("div.wait-row", null, h("span.spin"), t("s_new"))),
        h("div.sec.row2", null, h("button.btn.quiet", { type: "button", on: tap(() => (stack.length > 1 ? back() : go("plans"))) }, t("other")),
          h("button.btn.bad", { type: "button", on: tap(() => cancelOrder(o)) }, t("cancel"))));
      return { node: bits, main: o.checkout ? { text: t("card_open"), fn: () => openLink(o.checkout) } : { text: t("home"), fn: home } };
    }
    if (o.state === "new" && m.kind !== "stars") {
      const s1 = h("div.step", null, h("b", { text: t(m.qr ? "st1_crypto" : "st1_card", { a: money(o.price, o.currency) }) }));
      if (m.qr) {
        s1.append(h("img.qr", { src: m.qr, alt: "QR", width: 196, height: 196 }), copyRow(t("addr") + (m.network ? ` · ${m.network}` : ""), m.addr),
                  copyRow(t("sum"), o.price, money(o.price, o.currency)));
        if (m.warn) s1.append(h("p.warn", { text: m.warn }));
      } else {
        for (const [k, v] of m.lines || []) s1.append(copyRow(k, v));
        s1.append(copyRow(t("sum"), o.price, money(o.price, o.currency)));
        if (m.hint) s1.append(h("p.note", { text: m.hint }));
      }
      const up = uploader(o, p);
      bits.push(h("div.steps", null, s1,
        m.qr ? null : h("div.step", null, h("b", { text: t("st_code") }), copyRow(t("code"), o.code)),
        h("div.step", null, h("b", { text: t("st_rec") }), h("p.muted", { text: t(m.qr ? "st_rec_c" : "st_rec_s") }), up.node)),
        h("div.sec.row2", null, h("button.btn.quiet", { type: "button", on: tap(() => (stack.length > 1 ? back() : go("plans"))) }, t("other")),
          h("button.btn.bad", { type: "button", on: tap(() => cancelOrder(o)) }, t("cancel"))));
      return { node: bits, main: up.main };
    }
    // квитанция у продавца (или открыт счёт в звёздах) — ждём, экран сам обновится
    bits.push(h("div.card", null, h("p", { text: o.state === "claimed" ? t("sent") : t("wait") }),
      h("div.wait-row", null, h("span.spin"), t("s_" + o.state))));
    if (o.state === "claimed" && o.receipts < 5 && m.kind !== "stars") {
      const up = uploader(o, p);
      bits.push(h("details.sec", null, h("summary", { text: t("more_rec") }), up.node, h("button.btn", { type: "button", on: tap(up.main.fn) }, t("send_rec"))));
    }
    return { node: bits, main: { text: t("home"), fn: home } };
  };

  function schedule(id) {
    clearTimeout(poll);
    poll = setTimeout(() => refreshOrder(id), document.hidden ? 15000 : 5000);
  }
  async function refreshOrder(id, force) {
    const cur = top();
    if (!cur || cur.v !== "pay" || cur.p.id !== id) return;
    const r = await api("order/view", { id });
    if (top() !== cur) return;
    if (r.error) { schedule(id); return; }
    const was = cur.p.order || {};
    if (force || r.order.state !== was.state || r.order.receipts !== was.receipts) {
      cur.p.order = r.order;
      if (r.order.state === "paid") { haptic("success"); await refresh(); }
      rerender();
    } else schedule(id);
  }
  async function cancelOrder(o) {
    if (!(await confirmBox(t("cancel_q")))) return;
    const r = await api("order/cancel", { id: o.id });
    if (r.error) { toast(errText(r)); return; }
    S.order = null;
    await refresh();
    home();
  }

  function payDone(o) {
    const res = o.result || {};
    const codes = o.kind === "topup" ? [] : res.codes || (res.code ? [res.code] : []);
    const many = codes.length > 1;
    const text = o.kind === "topup" ? t("paid_hours", { h: num(o.hours) }) : many ? t(o.gift ? "gifts_ok" : "bulk_ok")
      : o.gift ? t("paid_gift") : o.machine ? t("paid_auto") : t("paid_manual");
    const bits = [h("div.done", null, h("div.ok", { html: icon("check") }), h("h2", { text: t("paid_t") }), h("p", { text }))];
    codes.forEach((c, i) => {
      const own = !o.gift && i === 0;
      const label = own ? t("your_key") : o.gift ? `🎁 ${t("k_code")}${many ? ` ${i + 1}` : ""}` : `${t("key_friend")} ${i}`;
      bits.push(h("div.sec", null, copyRow(label, c), own ? null : h("button.btn.after-copy", { type: "button",
        on: tap(() => share(S.links.site, t(o.gift ? "gift_share" : "key_share", { c }))) }, h("span", { html: icon("send") }), t("share"))));
    });
    if (!o.machine && o.kind !== "topup" && !o.gift) {
      bits.push(h("div.sec", null, h("button.btn", { type: "button", on: tap(() => openLink(S.links.site)) }, h("span", { html: icon("download") }), t("download"))));
    }
    if (S.order && S.order.id === o.id) S.order = null;
    return { node: bits, main: { text: t("home"), fn: async () => { await refresh(); home(); } } };
  }

  // квитанция: файл (большие фото ужимаем) и/или текст; отправляет большая кнопка Telegram
  function uploader(o, p) {
    const st = { file: null };
    const input = h("input", { type: "file", accept: "image/*,application/pdf", hidden: true });
    const drop = h("button.drop", { type: "button", on: { click: () => input.click() } });
    const note = h("textarea", { rows: 2, maxlength: 300, placeholder: t("note_ph") });
    const paint = () => {
      drop.replaceChildren();
      drop.classList.toggle("has", Boolean(st.file));
      if (st.file && /^image\/(jpeg|png|webp)$/.test(st.file.type)) drop.append(h("img", { src: URL.createObjectURL(st.file), alt: "" }));
      drop.append(h("span", { html: icon(st.file ? "check" : "upload") }), h("b", { text: st.file ? st.file.name : t("pick") }),
                  h("small.muted", { text: st.file ? t("repick") : t("pick_s") }));
    };
    input.addEventListener("change", async () => {
      const f = input.files && input.files[0];
      if (!f) return;
      const file = withType(f);
      if (!file) { haptic("error"); toast(t("err_type")); return; }
      st.file = await shrink(file);
      if (st.file.size > 10 * 1024 * 1024) { st.file = null; haptic("error"); toast(t("err_big")); }
      haptic();
      paint();
    });
    const main = { text: t("send_rec"), fn: send };
    async function send() {
      const text = note.value.trim();
      if (!st.file && !text) { haptic("warning"); input.click(); return; }
      setMain({ text: t("wait"), busy: true, disabled: true });
      const fd = new FormData();
      fd.append("id", o.id);
      if (text) fd.append("note", text);
      if (st.file) fd.append("file", st.file, st.file.name || "receipt.jpg");
      const r = await apiForm("receipt", fd);
      if (r.error) { haptic("error"); toast(errText(r)); setMain(main); return; }
      haptic("success");
      p.order = r.order;
      S.order = r.order;
      rerender();
    }
    paint();
    return { node: h("div", null, drop, input, note), main };
  }
  // некоторые телефоны отдают файл без типа — угадываем по расширению, иначе сервер его не примет
  function withType(f) {
    if (/^image\/|^application\/pdf$/.test(f.type)) return f;
    const ext = (/\.(\w+)$/.exec(f.name || "") || [])[1];
    const type = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", heic: "image/heic", pdf: "application/pdf" }[String(ext).toLowerCase()];
    return type ? new File([f], f.name, { type }) : null;
  }
  async function shrink(file) {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type) || file.size < 1500000 || !window.createImageBitmap) return file;
    try {
      const img = await createImageBitmap(file);
      const k = Math.min(1, 2200 / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * k);
      c.height = Math.round(img.height * k);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      const blob = await new Promise((res) => c.toBlob(res, "image/jpeg", 0.86));
      return blob && blob.size < file.size ? new File([blob], "receipt.jpg", { type: "image/jpeg" }) : file;
    } catch (e) {
      return file;
    }
  }

  // мои ключи и коды
  VIEWS.keys = async () => {
    await refresh();
    const bits = [hero("keys", h("h1", null, h("em", { text: t("keys_t") })))];
    const keys = S.keys || [];
    const subs = (S.subs || []).length ? h("div.sec", null, h("p.sec-t", { text: t("ap_t") }), S.subs.map(subCard)) : null;
    if (!keys.length) {
      bits.push(subs || h("p.empty", { text: t("keys_empty") }));
      return { node: bits, main: { text: t("cta_buy"), fn: () => replace("plans") } };
    }
    const list = h("div.sec");
    for (const k of keys) {
      if (k.serial) {
        const status = { active: t("k_active"), ended: t("k_ended"), revoked: t("k_revoked"), trial: t("k_trial") }[k.status];
        const card = h("div.key", null, h("div.top", null, h("div", null, h("h3", { text: k.title }), h("p.meta", { text: keyStatus(k) })),
          h("span.status." + (k.status === "active" ? "ok" : "bad"), { text: status })));
        if (k.usage) card.append(meter(k.usage, true));
        else if (k.unl) card.append(h("p.meta", { text: t("unl") }));
        if (k.code) card.append(copyRow(t("k_code"), k.code));
        const acts = [];
        if (k.renewable) acts.push(h("button.btn", { type: "button", on: tap(() => go("plans", { serial: k.serial })) }, h("span", { html: icon("renew") }), t("k_renew")));
        if (k.usage) acts.push(h("button.btn", { type: "button", on: tap(() => go("hours", { serial: k.serial })) }, h("span", { html: icon("clock") }), t("k_hours")));
        if (acts.length) card.append(h("div.row2", null, acts));
        list.append(card);
      } else {
        const sub = k.bulk ? t(k.used ? "k_bulk_used" : "k_bulk_new") : k.gift ? (k.used ? t("k_gift_used") : t("k_gift_new"))
          : k.used ? t("k_active") : t("k_unused");
        const card = h("div.key", null, h("div.top", null, h("div", null, h("h3", { text: (k.bulk ? "🔑 " : k.gift ? "🎁 " : "") + k.title }),
          h("p.meta", { text: sub }))));
        if (!k.used) card.append(copyRow(t("k_code"), k.code));
        if (k.gift && !k.used) {
          card.append(h("div.row2", null, h("button.btn", { type: "button", on: tap(() => share(S.links.site, t(k.bulk ? "key_share" : "gift_share", { c: k.code }))) },
            h("span", { html: icon("send") }), t("share"))));
        }
        list.append(card);
      }
    }
    bits.push(list);
    if (subs) bits.push(subs);
    const waiting = keys.some((c) => !c.serial && !c.used && !c.gift);
    return { node: bits, main: waiting ? { text: t("download"), fn: () => openLink(S.links.site) } : null };
  };

  // подписка картой: следующее списание, отключить / включить, сменить карту (кабинет Stripe)
  function subCard(s) {
    const meta = s.cancel ? t("ap_off_until", { d: s.next ? date(s.next) : "—" }) : s.every + (s.next ? " · " + t("ap_next", { d: date(s.next) }) : "");
    const act = async (path) => {
      if (path === "subs/cancel" && !(await confirmBox(t("ap_off_q")))) return;
      const r = await api(path, { id: s.id });
      if (r.error) { toast(errText(r)); return; }
      if (r.url) { openLink(r.url); return; }
      haptic("success");
      await refresh();
      rerender();
    };
    return h("div.key", null, h("div.top", null, h("div", null, h("h3", { text: "💳 " + s.title + (s.serial ? " · №" + s.serial : "") }), h("p.meta", { text: meta })),
      h("span.status." + (s.cancel ? "bad" : "ok"), { text: s.cancel ? t("ap_dead") : t("ap_live") })),
      h("div.row2", null, h("button.btn", { type: "button", on: tap(() => act(s.cancel ? "subs/resume" : "subs/cancel")) }, s.cancel ? t("ap_on") : t("ap_off")),
        h("button.btn", { type: "button", on: tap(() => act("subs/portal")) }, t("ap_card"))));
  }

  // пригласить друга
  VIEWS.invite = async (p) => {
    if (!p.r || p.r.error) p.r = await api("ref");
    const r = p.r;
    const bits = [hero("invite", title2(t("inv_a"), t("inv_b")))];
    if (r.error || !r.on) return { node: [...bits, h("p.empty", { text: r.error ? errText(r) : "—" })] };
    const input = h("input", { type: "text", maxlength: 16, placeholder: t("inv_code_ph"), autocomplete: "off", spellcheck: "false",
                               autocapitalize: "characters", enterkeyhint: "done" });
    const save = async () => {
      const v = input.value.trim().replace(/^@/, "");
      if (!/^[0-9A-Za-z]{3,16}$/.test(v)) { haptic("warning"); toast(t("ref_fmt")); return; }
      const res = await api("ref/code", { code: v });
      if (res.error) { haptic("error"); toast(errText(res)); return; }
      haptic("success");
      toast(t("inv_saved"));
      p.r = res;
      rerender();
    };
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") save(); });
    bits.push(h("p.lede", { text: t("inv_lede", { h: num(r.hours), f: num(r.friend) }) }),
      h("div.card.code-card", null, h("small.muted", { text: t("inv_code") }),
        h("button.big-code", { type: "button", on: { click: () => copy(r.code) } }, r.code), h("p.muted", { text: t("inv_code_s") })),
      h("div.sec", null, copyRow(t("inv_link"), r.link, r.link.replace("https://", ""))),
      r.changes_left > 0 ? h("details.sec", null, h("summary", { text: t("inv_change") }),
        h("div.fc-row", null, input, h("button.btn", { type: "button", on: tap(save) }, t("inv_save"))),
        h("p.note", { text: `${t("ref_fmt")} ${t("inv_left", { n: r.changes_left })}` })) : null,
      h("div.stats", null, h("div.stat", null, h("b", { text: String(r.n) }), h("span", { text: t("inv_n") })),
        h("div.stat", null, h("b", { text: `${num(r.got)} ${t("h_short")}` }), h("span", { text: t("inv_got") }))),
      h("p.note", { text: t("inv_rules") }));
    if (S.ref && S.ref.can) bits.push(friendCode());
    return { node: bits, main: { text: t("inv_send"), fn: () => shareInvite(r) } };
  };

  // отзыв: звёзды, пара слов, разрешение показать в канале (для 4–5 звёзд)
  VIEWS.review = async (p) => {
    if (p.done) return { node: h("div.done", null, h("div.ok", { html: icon("check") }), h("h2", { text: t("rv_thanks") })), main: { text: t("home"), fn: home } };
    if (p.n === undefined) p.n = S.review ? S.review.n : 0;
    const text = h("textarea", { rows: 4, maxlength: 700, placeholder: t("rv_ph"), on: { input: () => { p.text = text.value; } } });
    text.value = p.text || "";
    const stars = h("div.stars", { role: "radiogroup" }, [1, 2, 3, 4, 5].map((n) => h("button" + (n <= p.n ? ".on" : ""), { type: "button",
      role: "radio", "aria-checked": String(n === p.n), "aria-label": `${n}/5`, html: icon("star", true),
      on: { click: () => { p.n = n; haptic(n >= 4 ? "medium" : "light"); rerender(); } } })));
    const bits = [hero("help", h("p.eyebrow", { text: t("t_review") }), h("h1", null, h("em", { text: t("rv_t") }))),
      h("p.lede", { text: t("rv_lede") }), stars, text];
    let pub = null;
    if (p.n >= 4 && S.links.channel) {
      pub = h("input", { type: "checkbox", on: { change: () => { p.pub = pub.checked; } } });
      pub.checked = p.pub !== false;
      bits.push(h("label.toggle", null, pub, h("span", { text: t("rv_pub") })));
    }
    return { node: bits, main: { text: t("rv_send"), fn: async () => {
      if (!p.n) { haptic("warning"); toast(t("rv_need")); return; }
      setMain({ text: t("wait"), busy: true, disabled: true });
      const r = await api("review", { n: p.n, text: text.value.trim(), pub: Boolean(pub && pub.checked) });
      if (r.error) { toast(errText(r)); rerender(); return; }
      haptic("success");
      S.review = { n: p.n };
      p.done = true;
      rerender();
    } } };
  };

  // как начать и вопросы
  // пробный период: кнопка → ключ сам приходит в Tolk (пришли из программы) или код для ввода в Tolk
  VIEWS.trial = async (p) => {
    const tr = S.trial || {};
    const res = p.res || (tr.used ? (tr.code ? { code: tr.code } : { error: "trial_used" }) : null);
    const [t1, t2] = t("tr_t").split("*");
    const head = hero("menu", title2(t1.trim(), t2));
    if (!res) {
      return { node: [head, h("p.lede", { text: t("tr_p") })],
        main: { text: t("tr_btn"), fn: async () => {
          const r = await api("trial");
          if (r && (r.ok || r.error)) {
            S.trial = { ...tr, used: true, can: false, code: r.code || tr.code || null };
            p.res = r;
            rerender();
          }
        } } };
    }
    if (res.applied) return { node: [head, h("p.note", { text: t("tr_applied") })], main: { text: t("home"), fn: home } };
    if (res.code) {
      return { node: [head, h("div.sec", null, copyRow(t("tr_code"), res.code)), h("p.note", { text: t("tr_how") })],
        main: { text: t("download"), fn: () => openLink(S.links.site) } };
    }
    const msg = { trial_used: "tr_used", trial_used_pc: "tr_used_pc", trial_busy: "tr_busy" }[res.error] || "tr_busy";
    return { node: [head, h("p.note", { text: t(msg) })], main: { text: t("cta_buy"), fn: () => go("plans") } };
  };

  VIEWS.help = async () => ({
    node: [hero("help", h("h1", null, h("em", { text: t("help_t") }))),
      h("ol.how", null, h("li", { text: t("h1") }), h("li", { text: t("h2") }), h("li", { text: t("h3") })),
      h("p.note", { text: t("h_trial") }),
      h("div.sec", null, h("p.sec-t", { text: t("faq_t") }),
        [1, 2, 3, 4, 5, 6].map((i) => h("details", null, h("summary", { text: t(`f${i}q`) }), h("p", { text: t(`f${i}a`, { m: num(S.shop.month_h || 30) }) })))),
      h("div.sec", null, h("div.list", null, li("send", t("l_support"), t("l_support_s"), () => openTg(S.links.support))))],
    main: { text: t("download"), fn: () => openLink(S.links.site) },
  });

  VIEWS.lang = async () => ({
    node: [h("h2.h2", { text: t("lang_t") }), h("div.sec", { role: "radiogroup" }, LANGS.map(([code, name]) => h("button.opt", { type: "button", role: "radio",
      "aria-checked": String(code === L), on: { click: async () => {
        haptic();
        L = code;
        document.documentElement.lang = code;
        rerender();
        await api("lang", { lang: code });
        await refresh();
        back();
      } } }, h("span.radio"), h("span.tx", null, h("b", { text: name })))))],
  });

  // ------------------------------------------------------------------------------------------- запуск
  function theme() {
    const dark = tg.colorScheme !== "light";
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    const bg = dark ? "#060708" : "#f2eee6";
    try {
      tg.setHeaderColor(bg);
      tg.setBackgroundColor(bg);
      if (tg.setBottomBarColor) tg.setBottomBarColor(bg);
    } catch (e) { /* старый Telegram */ }
  }
  function langOf(code) {
    const c = String(code || "").toLowerCase();
    return /^uk/.test(c) ? "uk" : /^(sk|cs)/.test(c) ? "sk" : /^(ru|be|kk)/.test(c) ? "ru" : c ? "en" : "ru";
  }
  function outside() {
    L = langOf(navigator.language);
    document.documentElement.dataset.theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    $app.replaceChildren(h("div.outside", null, h("div", null, h("div", { html: TMARK }), h("h1", { text: t("out_t") }), h("p", { text: t("out_p") }),
      h("a.btn.primary", { href: "https://t.me/TolkShopBot" }, t("out_b")))));
  }
  // ?go= из кнопки в чате (или намерение из программы) → сразу нужный экран, «назад» ведёт на главную
  function route(g) {
    stack = [{ v: "home", p: {} }];
    const [a, b] = String(g || "").split(":");
    const n = Number(b) || undefined;
    const add = (v, p = {}) => stack.push({ v, p });
    if (a === "plans") add("plans");
    else if (a === "pro") add("plans", { pro: true });
    else if (a === "renew") add("plans", n ? { serial: n } : {});
    else if (a === "hours") add("hours", { serial: n });
    else if (a === "gift") add("plans", { gift: true });
    else if (a === "item" && b) add(S.shop.topups.some((x) => x.id === b) ? "hours" : "plans", { item: b, pro: /^pro_/.test(b) || undefined });
    else if (["keys", "invite", "review", "help", "lang", "trial"].includes(a)) add(a);
    else if (a === "order" && S.order) add("pay", { id: S.order.id, order: S.order });
    render();
  }
  async function boot() {
    if (!tg || !tg.initData) { outside(); return; }
    try {
      tg.ready();
      tg.expand();
      if (tg.isVersionAtLeast && tg.isVersionAtLeast("7.7")) tg.disableVerticalSwipes();
    } catch (e) { /* старый Telegram */ }
    theme();
    tg.onEvent("themeChanged", () => { theme(); rerender(); });
    tg.MainButton.onClick(() => { if (mainFn) { haptic(); mainFn(); } });
    tg.BackButton.onClick(() => { haptic(); back(); });
    L = langOf(tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.language_code);
    loading();
    const r = await api("state", { start: (tg.initDataUnsafe && tg.initDataUnsafe.start_param) || "" });
    if (r.error) {
      $app.replaceChildren(h("div.outside", null, h("div", null, h("div", { html: TMARK }), h("p", { text: errText(r) }),
        h("button.btn.primary", { type: "button", on: { click: () => location.reload() } }, t("retry")))));
      return;
    }
    S = r;
    L = r.lang || L;
    document.documentElement.lang = L;
    route(new URLSearchParams(location.search).get("go") || r.intent || (r.invited ? "plans" : ""));
  }
  document.addEventListener("visibilitychange", () => {
    const cur = top();
    if (!document.hidden && cur && cur.v === "pay" && cur.p.id) refreshOrder(cur.p.id);
  });
  boot();
})();
