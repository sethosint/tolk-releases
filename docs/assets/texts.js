// Тексты сайта на 7 языках. Русский — прямо в index.html (здесь — то, что собирает скрипт). Ключи — атрибуты data-t.
// Сравнение — настоящие ответы Google и Tolk AI (25.09.2026): [оригинал, Google, Tolk AI].
window.TOLK_COMPARE = {
 "ru": [
  [
   "Celú noc som na intráku makal na zadaní.",
   "Я провел всю ночь в интранете, работая над заданием.",
   "Всю ночь в общаге вкалывал над заданием."
  ],
  [
   "Ty kokos, tá písomka bola fakt na figu.",
   "Ты, кокос, эта нота была действительно крутой.",
   "Ничего себе, эта письменная была реально ни к чёрту."
  ],
  [
   "Kto nemá zápočet, nemôže ísť na skúšku.",
   "Те, у кого нет кредита, не могут сдать экзамен.",
   "Кто не имеет зачёта, не может идти на экзамен."
  ],
  [
   "Cvičenie dnes odpadá, prednáška bude normálne.",
   "Практика сегодня отменяется, лекция будет в обычном режиме.",
   "Семинар сегодня отменяется, лекция будет как обычно."
  ]
 ],
 "uk": [
  [
   "Ty kokos, tá písomka bola fakt na figu.",
   "Ти кокос, ця нота була справді крута.",
   "Ого, та писемна була реально марна."
  ],
  [
   "Kto nemá zápočet, nemôže ísť na skúšku.",
   "Ті, хто не має кредиту, не можуть складати іспит.",
   "Хто не має заліку, не може йти на іспит."
  ],
  [
   "Cvičenie dnes odpadá, prednáška bude normálne.",
   "Практика сьогодні скасовується, лекція буде нормальною.",
   "Семінар сьогодні відпадає, лекція буде нормально."
  ],
  [
   "Vieš to vypočítať bez kalkulačky?",
   "Чи можна порахувати без калькулятора?",
   "Чи можеш це порахувати без калькулятора?"
  ]
 ],
 "en": [
  [
   "Celú noc som na intráku makal na zadaní.",
   "I spent the whole night on the intranet working on the assignment.",
   "All night I worked hard on the assignment at the dormitory."
  ],
  [
   "Ty kokos, tá písomka bola fakt na figu.",
   "You coconut, that note was really cool.",
   "Wow, that written test was really useless."
  ],
  [
   "Kto nemá zápočet, nemôže ísť na skúšku.",
   "Those who do not have credit cannot take the exam.",
   "Anyone who doesn't have the pass/fail credit can't go to the exam."
  ],
  [
   "Cvičenie dnes odpadá, prednáška bude normálne.",
   "Practice is canceled today, the lecture will be normal.",
   "The seminar is cancelled today, the lecture will go on as usual."
  ]
 ],
 "sk": [
  [
   "No cap, that lecture was fire.",
   "Bez čiapky, tá prednáška bola oheň.",
   "Naozaj, tá prednáška bola super."
  ],
  [
   "That exam was mid, ngl.",
   "Tá skúška bola v polovici, ngl.",
   "Tá skúška bola priemerná, úprimne."
  ],
  [
   "Bet, I'll send you the notes tonight.",
   "Stavte sa, že vám dnes večer pošlem poznámky.",
   "Dobre, pošlem ti tie poznámky dnes večer."
  ],
  [
   "Office hours are moved to Thursday, so don't be late.",
   "Úradné hodiny sa presúvajú na štvrtok, tak nemeškajte.",
   "Konzultačné hodiny sú presunuté na štvrtok, takže nepríď neskoro."
  ]
 ]
};
window.TOLK_TEXTS = {
 "ru": {
  "cta_dl": "Скачать для {os}",
  "dl_other": "Другие системы:",
  "mac_arm": "Mac (Apple M)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, бета. Если Mac не даёт открыть: Настройки → Конфиденциальность и безопасность → «Всё равно открыть».",
  "hint_linux": "Бета. Установка без root: sh Tolk-Setup-Linux.run — Tolk появится в меню приложений.",
  "f1v": "Windows 10 и 11 · macOS 13+ и Linux — бета",
  "title": "Tolk — перевод пар, конспекты и подготовка к экзаменам",
  "pair": "SK → RU",
  "src_lbl": "Оригинал",
  "who_g": "Google",
  "who_t": "Tolk AI",
  "styles": [
   "Графит",
   "Стекло",
   "Без подложки",
   "Классика",
   "Светлые",
   "Контраст"
  ],
  "plan": {
   "week": "Неделя",
   "month": "Месяц",
   "quarter": "3 месяца",
   "half": "Полгода",
   "year": "Год",
   "pro_week": "Pro · Неделя",
   "pro_month": "Pro · Месяц",
   "pro_quarter": "Pro · 3 месяца",
   "pro_half": "Pro · Полгода",
   "pro_year": "Pro · Год"
  },
  "per_month": "{p} в месяц",
  "per_week": "7 дней",
  "save": "−{n}%",
  "h_week": "<b>{h} ч</b> Tolk AI на неделю",
  "h_month": "<b>{h} ч</b> Tolk AI",
  "h_long": "<b>{h} ч</b> Tolk AI — по {m} в месяц",
  "buy": "Купить",
  "topup": "+{h} ч — {p}",
  "bulk_k": "Несколько ключей?",
  "bulk_tier": "от {n} — −{p} %",
  "bulk_tail": "в одном заказе — для группы или в подарок.",
  "bulk_go": "Купить на троих →",
  "faq": [
   [
    "Что нужно, чтобы Tolk работал?",
    "Windows 10 или 11, macOS 13+ или Linux (последние две — бета) и интернет для Tolk AI. Видеокарта не обязательна: Tolk сам подберёт модель распознавания под ваш компьютер."
   ],
   [
    "Есть бесплатная версия?",
    "Да — Tolk Free, бесплатно и без срока: 1,5 часа перевода каждый день — целая пара. Переводит Google, речь распознаётся на компьютере. Нейросеть Tolk AI, запись лекций и подготовка к экзамену — в Plus и Pro. А чтобы попробовать Plus целиком, в боте есть 30 бесплатных минут — один раз."
   ],
   [
    "Как Tolk помогает готовиться к экзаменам?",
    "После каждой пары — конспект на языке лекции с переводом. Из конспектов Tolk Pro делает карточки (можно в Anki), задачи с решением тем методом, что был на паре, пробный экзамен по словам преподавателя и шпаргалку формул. Повторение по графику и слова дня в Telegram — в Plus и Pro."
   ],
   [
    "Какие языки он понимает?",
    "Распознаёт 35 языков речи: словацкий, чешский, английский, немецкий, польский, украинский и другие. Переводит на 32 языка — включая русский, украинский, английский и словацкий."
   ],
   [
    "Работает в Zoom, Teams, Webex?",
    "Да — в любой программе и на любом сайте со звуком: Zoom, Teams, Webex, Meet, Discord, YouTube, запись лекции в браузере. Tolk слушает звук, а не саму программу."
   ],
   [
    "Что такое Tolk Pro и конспекты?",
    "Tolk Pro — всё, что в Plus, и конспекты лекций. Нажмите «Записать лекцию»: Tolk сохранит расшифровку и слайды с экрана, найдёт презентацию на сайте кафедры (например, kmti.fei.tuke.sk) или возьмёт ваш файл и через минуту соберёт конспект: темы, определения, формулы, сроки зачётов. К сессии — карточки, задачи с решением методом преподавателя, пробный экзамен в его формате, шпаргалка формул и задача по фото. Не хватило конспектов — пакет +20 на 30 дней за 1,99 €."
   ],
   [
    "Работает в любом браузере?",
    "Да: Chrome, Edge, Opera, Brave, Vivaldi, Firefox и другие. На Windows 11 расширение не нужно — выберите в Tolk браузер, и он услышит его звук. Расширение Tolk пригодится, если в браузере звучит несколько вкладок, а переводить нужно одну, — и на Windows 10. <a class=\"link\" href=\"extension.html\">Как поставить расширение →</a>"
   ],
   [
    "Tolk слушает микрофон? Куда уходит звук?",
    "Tolk слушает только тот звук, который вы выбрали. С Tolk AI Live он по защищённому соединению идёт на распознавание и перевод — только пока говорят, и нигде не хранится. Без Tolk AI речь распознаётся прямо на компьютере. Подробнее — в <a class=\"link\" href=\"privacy.html\">политике конфиденциальности</a>."
   ],
   [
    "Что будет, когда кончатся часы Tolk AI?",
    "Перевод не остановится — Tolk переключится на Google. Часы обновляются каждые 30 дней, а если нужно больше, в боте можно докупить 7,5, 30 или 75 часов."
   ],
   [
    "Как оплатить и когда придёт ключ?",
    "В Telegram-боте <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Украинской картой, USDT или TON — ключ придёт после проверки оплаты, обычно до 15 минут. Ключ придёт в чат, а Tolk, из которого вы открыли бота, активируется сам."
   ],
   [
    "Подписка продлевается сама?",
    "Нет, никаких автосписаний. За три дня до конца бот напомнит, а продлить можно одной кнопкой — новый срок начнётся после текущего."
   ],
   [
    "Ключ работает на другом компьютере?",
    "Ключ привязан к одному компьютеру. Сменили ноутбук — напишите в <a class=\"link\" href=\"https://t.me/sethosint\">поддержку</a>, перенесём."
   ]
  ],
  "c2_note": "Настоящие ответы обоих переводчиков, сентябрь 2026.",
  "drag": "Перетащите",
  "tab_std": "Plus",
  "tab_pro": "Pro — с конспектами",
  "sale_ey": "Ограниченное предложение",
  "sale_t": "{d} на Tolk",
  "sale_upto": "до −{p} %",
  "sale_until": "до {d}",
  "sale_left": "осталось",
  "pro_lede": "Всё, что в Plus, и учёба: Tolk запишет пару, сохранит слайды с экрана, найдёт презентацию на сайте кафедры и соберёт конспект — темы, определения, формулы, сроки зачётов. А к сессии — карточки, задачи с решением методом с пар и пробный экзамен. До 45 конспектов в месяц.",
  "x_hint_t": "Покрутите пальцем",
  "x_open": "Разобрать окно",
  "x_close": "Собрать окно",
  "sb_auto": "по ширине",
  "sb_n": "до {n}",
  "ex": {
   "task": "Задача {n} из {m}",
   "lv": {
    "easy": "лёгкая",
    "medium": "средняя",
    "hard": "сложная"
   },
   "from": "с пары «{c}»",
   "hint": "Подсказка",
   "check": "Проверить",
   "sol": "Подробное решение",
   "next": "Дальше",
   "prev": "Назад",
   "finish": "Итог",
   "ph": "Ответ, например 1,5 A",
   "ok": "✓ Верно",
   "part": "≈ Почти",
   "bad": "✗ Пока не так",
   "unit": "число верное — допишите единицу (A)",
   "branch": "это ток одной ветки — сложите обе",
   "wrong": "загляните в подсказку или решение",
   "ans": "Ответ:",
   "sol_h": "Решение · методом с пары",
   "end": "Итог: {r} из {m}",
   "end_all": "Сдали бы.",
   "end_some": "Ошибки видно сразу — так и учатся.",
   "end_p": "В Tolk Pro такие задачи — по вашим конспектам: лёгкие, средние и сложные, с решением тем методом, что был на паре, и пробный экзамен.",
   "go": "Смотреть Tolk Pro",
   "again": "Ещё раз",
   "note": "Пример: задачи к конспекту-примеру выше. В Tolk ответ проверяет ещё и Tolk AI."
  },
  "ex_tr": {
   "meth": "Метод: закон Ома — как на паре",
   "items": [
    {
     "q": "На резистор сопротивлением 20 Ом подаём напряжение 5 В. Какой ток через него течёт?",
     "h": "Закон Ома: I = U / R."
    },
    {
     "q": "Резисторы 30 Ом и 60 Ом соединены последовательно и подключены к 9 В. Какой ток течёт в цепи?",
     "h": "При последовательном соединении сопротивления складываются."
    },
    {
     "q": "Те же резисторы 30 Ом и 60 Ом соединяем параллельно и подключаем к 12 В. Какой общий ток потребляет цепь?",
     "h": "При параллельном соединении напряжение на обоих резисторах одинаковое."
    }
   ]
  }
 },
 "uk": {
  "dl_other": "Інші системи:",
  "mac_arm": "Mac (Apple M)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, бета. Якщо Mac не дає відкрити: Параметри → Приватність і безпека → «Усе одно відкрити».",
  "hint_linux": "Бета. Встановлення без root: sh Tolk-Setup-Linux.run — Tolk з’явиться в меню застосунків.",
  "title": "Tolk — переклад пар, конспекти й підготовка до іспитів",
  "pair": "SK → UK",
  "nav_dl": "Завантажити",
  "h1": "Розумійте пари<br><em>з першого дня.</em>",
  "lede": "Tolk перекладає викладача, поки він говорить, — субтитрами поверх Teams, Zoom чи браузера. А після пари пише конспект і готує до іспиту: картки, задачі, пробний іспит.",
  "cta_dl": "Завантажити для {os}",
  "cta_buy": "Купити в Telegram",
  "cta_trial": "30 хвилин безкоштовно в Telegram",
  "fine": "30 хвилин Plus безкоштовно, далі — Free назавжди: 1,5 години на день",
  "c1_h": "Оберіть, <em>що перекладати.</em>",
  "c1_p": "Вкладку з парою, Teams, Zoom або весь звук комп'ютера. Музики й сповіщень з інших програм Tolk не чує.",
  "c1_a": "Джерело",
  "c1_av": "вкладка, програма або весь звук",
  "c1_b": "Де працює",
  "c1_c": "Приватність",
  "c1_cv": "звук іде лише на розпізнавання й ніде не зберігається",
  "c2_k": "Переклад",
  "c2_h": "Розуміє, <em>як говорять студенти.</em>",
  "c2_p": "Звичайний перекладач плутається в сленгу й скороченнях. Tolk AI знає, що таке «intrák» і «zápočet», і пам'ятає, про що говорили хвилину тому.",
  "c3_h": "Там, де <em>вам зручно.</em>",
  "c3_p": "Субтитри висять поверх усіх вікон. Налаштуйте їх просто тут — як у Tolk: стиль, розмір, скільки слів у рядку. Тягніть за середину — місце, за краї — ширина.",
  "p_k": "Ціни",
  "p_h": "Тарифи Tolk. <em>Усе включено.</em>",
  "p_lede": "Plus — переклад нейромережею Tolk AI без денного ліміту й 30 годин Tolk AI на кожні 30 днів. Pro — ще конспекти й підготовка до іспиту. Що довший строк — то дешевший місяць.",
  "extra": "Забракло годин?",
  "pay_line": "Купівля — у боті <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>: українська картка, USDT або TON. Без автосписань.",
  "rates": "Ціни в гривнях і крипті — за поточним курсом, округлені. Точна сума — у боті.",
  "q_k": "Питання",
  "t_h": "Спробуйте <em>на своїй лекції.</em>",
  "t_fine": "30 хвилин Tolk Plus безкоштовно, далі — Free назавжди або підписка. Без картки.",
  "f1k": "Платформа",
  "f1v": "Windows 10 і 11 · macOS 13+ і Linux — бета",
  "f2k": "Купівля й ключі",
  "f5k": "Новини",
  "f3k": "Підтримка",
  "f4k": "Дані",
  "privacy": "Конфіденційність",
  "f6k": "Студентам",
  "f6v": "Сторінки вишів",
  "f6s": "Терміни предметів",
  "f6e": "Розширення для браузера",
  "h_k": "Переклад пар, конспекти й підготовка до іспитів",
  "nl1": "Як це працює",
  "nl2": "Ціни",
  "nl3": "Питання",
  "x1": "Субтитри",
  "x1v": "поверх Teams, Zoom і браузера — перетягуються мишею",
  "x2": "Переклад",
  "x2v": "Tolk AI Live — поки викладач говорить",
  "x3": "Конспект",
  "x3v": "мовою пари, під кожним рядком переклад",
  "xs_k": "Вікно Tolk по шарах",
  "x4": "Іспит",
  "xs1": "Переклад висить поверх Teams, Zoom чи браузера. Розмір, стиль і ширину рядка змінюєте мишею.",
  "xs2": "Tolk AI Live перекладає, поки викладач говорить, — за 1–2 секунди, зі сленгом і термінами предмета.",
  "xs3": "Після пари — конспект мовою пари: теми, означення, формули, а під кожним рядком — переклад.",
  "xs4": "До сесії — картки, задачі з розв’язанням і пробний іспит за вашими парами.",
  "xs4_go": "Спробувати міні-іспит ↓",
  "x_note": "Знімки вікна Tolk. Конспект — приклад.",
  "s1a": "Пара",
  "s1av": "в аудиторії або онлайн",
  "s1bv": "чує звук ноутбука",
  "s1c": "Субтитри",
  "s1cv": "переклад за 1–2 секунди",
  "scr": "ваш екран",
  "c4_k": "Навчання",
  "c4_h": "Конспект — <em>мовою пари.</em>",
  "c4_p": "Після пари Tolk сам пише конспект мовою лекції, а під кожним рядком — переклад. Так зрозуміло одразу, і мова вчиться сама. З конспектів — картки, задачі з розв'язанням методом викладача й пробний іспит.",
  "c4_a": "Конспект",
  "c4_av": "сам після пари · Tolk Pro",
  "c4_b": "До іспиту",
  "c4_bv": "картки, задачі, пробний іспит · Tolk Pro",
  "c4_c": "Повторення",
  "c4_cv": "за графіком, слова дня в Telegram · усі тарифи",
  "s4a": "Лекція",
  "s4av": "звук і слайди",
  "s4b": "Конспект",
  "s4bv": "оригінал + переклад",
  "s4c": "Іспит",
  "s4cv": "картки · задачі · пробний",
  "styles": [
   "Графіт",
   "Скло",
   "Без підкладки",
   "Класика",
   "Світлі",
   "Контраст"
  ],
  "plan": {
   "week": "Тиждень",
   "month": "Місяць",
   "quarter": "3 місяці",
   "half": "Пів року",
   "year": "Рік",
   "pro_week": "Pro · Тиждень",
   "pro_month": "Pro · Місяць",
   "pro_quarter": "Pro · 3 місяці",
   "pro_half": "Pro · Пів року",
   "pro_year": "Pro · Рік"
  },
  "per_month": "{p} на місяць",
  "per_week": "7 днів",
  "save": "−{n}%",
  "h_week": "<b>{h} год</b> Tolk AI на тиждень",
  "h_month": "<b>{h} год</b> Tolk AI",
  "h_long": "<b>{h} год</b> Tolk AI — по {m} на місяць",
  "buy": "Купити",
  "topup": "+{h} год — {p}",
  "bulk_k": "Кілька ключів?",
  "bulk_tier": "від {n} — −{p} %",
  "bulk_tail": "в одному замовленні — для групи чи в подарунок.",
  "bulk_go": "Купити на трьох →",
  "src_lbl": "Оригінал",
  "faq": [
   [
    "Що потрібно, щоб Tolk працював?",
    "Windows 10 або 11, macOS 13+ чи Linux (дві останні — бета) та інтернет для Tolk AI. Відеокарта не обов'язкова: Tolk сам добере модель розпізнавання під ваш комп'ютер."
   ],
   [
    "Є безкоштовна версія?",
    "Так — Tolk Free, безкоштовно й без терміну: 1,5 години перекладу щодня — ціла пара. Перекладає Google, мова розпізнається на комп'ютері. Нейромережа Tolk AI, запис лекцій і підготовка до іспиту — у Plus і Pro. А щоб спробувати Plus повністю, у боті є 30 безкоштовних хвилин — один раз."
   ],
   [
    "Як Tolk допомагає готуватися до іспитів?",
    "Після кожної пари — конспект мовою лекції з перекладом. З конспектів Tolk Pro робить картки (можна в Anki), задачі з розв'язком тим методом, що був на парі, пробний іспит за словами викладача і шпаргалку формул. Повторення за графіком і слова дня в Telegram — у Plus і Pro."
   ],
   [
    "Які мови він розуміє?",
    "Розпізнає 35 мов мовлення: словацьку, чеську, англійську, німецьку, польську, українську та інші. Перекладає на 32 мови — зокрема українську, російську, англійську й словацьку."
   ],
   [
    "Працює в Zoom, Teams, Webex?",
    "Так — у будь-якій програмі й на будь-якому сайті зі звуком: Zoom, Teams, Webex, Meet, Discord, YouTube, запис лекції в браузері. Tolk слухає звук, а не саму програму."
   ],
   [
    "Що таке Tolk Pro і конспекти?",
    "Tolk Pro — усе, що в Plus, і конспекти лекцій. Натисніть «Записати лекцію»: Tolk збереже розшифровку і слайди з екрана, знайде презентацію на сайті кафедри (наприклад, kmti.fei.tuke.sk) або візьме ваш файл і за хвилину складе конспект: теми, означення, формули, терміни заліків. До сесії — картки, задачі з розв'язанням методом викладача, пробний іспит у його форматі, шпаргалка формул і задача за фото. Не вистачило конспектів — пакет +20 на 30 днів за 1,99 €."
   ],
   [
    "Працює в будь-якому браузері?",
    "Так: Chrome, Edge, Opera, Brave, Vivaldi, Firefox та інші. На Windows 11 розширення не потрібне — оберіть у Tolk браузер, і він почує його звук. Розширення Tolk знадобиться, якщо в браузері звучить кілька вкладок, а перекладати треба одну, — і на Windows 10. <a class=\"link\" href=\"extension.html\">Як поставити розширення →</a>"
   ],
   [
    "Tolk слухає мікрофон? Куди йде звук?",
    "Tolk слухає лише той звук, який ви обрали. З Tolk AI Live він захищеним з'єднанням іде на розпізнавання й переклад — лише поки говорять, і ніде не зберігається. Без Tolk AI мовлення розпізнається просто на комп'ютері. Докладніше — в <a class=\"link\" href=\"privacy.html\">політиці конфіденційності</a>."
   ],
   [
    "Що буде, коли закінчаться години Tolk AI?",
    "Переклад не зупиниться — Tolk перемкнеться на Google. Години оновлюються кожні 30 днів, а якщо треба більше, у боті можна докупити 7,5, 30 або 75 годин."
   ],
   [
    "Як оплатити й коли прийде ключ?",
    "У Telegram-боті <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Українською карткою, USDT або TON — ключ прийде після перевірки оплати, зазвичай до 15 хвилин. Ключ прийде в чат, а Tolk, з якого ви відкрили бота, активується сам."
   ],
   [
    "Підписка продовжується сама?",
    "Ні, жодних автосписань. За три дні до кінця бот нагадає, а продовжити можна однією кнопкою — новий строк почнеться після поточного."
   ],
   [
    "Ключ працює на іншому комп'ютері?",
    "Ключ прив'язаний до одного комп'ютера. Змінили ноутбук — напишіть у <a class=\"link\" href=\"https://t.me/sethosint\">підтримку</a>, перенесемо."
   ]
  ],
  "c1_k": "Звук",
  "c2_note": "Справжні відповіді обох перекладачів, вересень 2026.",
  "c3_k": "Субтитри",
  "drag": "Перетягніть",
  "tab_std": "Plus",
  "tab_pro": "Pro — з конспектами",
  "sale_ey": "Обмежена пропозиція",
  "sale_t": "{d} на Tolk",
  "sale_upto": "до −{p} %",
  "sale_until": "до {d}",
  "sale_left": "залишилось",
  "pro_lede": "Усе, що в Plus, і навчання: Tolk запише пару, збереже слайди з екрана, знайде презентацію на сайті кафедри та складе конспект — теми, означення, формули, терміни заліків. А до сесії — картки, задачі з розв'язанням методом із пар і пробний іспит. До 45 конспектів на місяць.",
  "fb_ey": "Free · 0 € · назавжди",
  "fb_t": "1,5 години перекладу щодня — безкоштовно. Ціла пара.",
  "fb_s": "Лише переклад: Google і розпізнавання на комп'ютері. Нейромережа Tolk AI, запис лекцій і підготовка до іспиту — у Plus і Pro.",
  "fb_go": "Взяти Free у боті",
  "nl4": "Міні-іспит",
  "x_hint": "Покрутіть мишею",
  "x_hint_t": "Покрутіть пальцем",
  "x_open": "Розібрати вікно",
  "x_close": "Зібрати вікно",
  "sb_style": "Стиль",
  "sb_size": "Розмір",
  "sb_words": "Слів у рядку",
  "sb_auto": "за шириною",
  "sb_n": "до {n}",
  "sb_engine": "Перекладач",
  "sb_orig": "Оригінал",
  "sb_note": "Фрази — справжні відповіді Google і Tolk AI. Вигляд — як у налаштуваннях Tolk.",
  "c5_k": "Іспит",
  "c5_h": "Перевірте себе <em>за хвилину.</em>",
  "c5_p": "Так Tolk Pro готує до сесії: задачі за вашими конспектами, відповідь перевіряється одразу, а розв'язок — тим методом, що був на парі. Спробуйте три задачі до конспекту-прикладу.",
  "c5_a": "Задачі",
  "c5_av": "легкі, середні, складні · своя тема",
  "c5_b": "Перевірка",
  "c5_bv": "одразу, з підказкою і повним розв'язком",
  "c5_c": "Пробний іспит",
  "c5_cv": "формат і бали — як казав викладач",
  "ex": {
   "task": "Задача {n} з {m}",
   "lv": {
    "easy": "легка",
    "medium": "середня",
    "hard": "складна"
   },
   "from": "з пари «{c}»",
   "hint": "Підказка",
   "check": "Перевірити",
   "sol": "Докладний розв'язок",
   "next": "Далі",
   "prev": "Назад",
   "finish": "Підсумок",
   "ph": "Відповідь, напр. 1,5 A",
   "ok": "✓ Правильно",
   "part": "≈ Майже",
   "bad": "✗ Поки не так",
   "unit": "число правильне — допишіть одиницю (A)",
   "branch": "це струм однієї гілки — додайте обидві",
   "wrong": "загляньте в підказку або розв'язок",
   "ans": "Відповідь:",
   "sol_h": "Розв'язок · методом з пари",
   "end": "Підсумок: {r} з {m}",
   "end_all": "Склали б.",
   "end_some": "Помилки видно одразу — так і вчаться.",
   "end_p": "У Tolk Pro такі задачі — за вашими конспектами: легкі, середні й складні, з розв'язком тим методом, що був на парі, і пробний іспит.",
   "go": "Дивитися Tolk Pro",
   "again": "Ще раз",
   "note": "Приклад: задачі до конспекту-прикладу вище. У Tolk відповідь перевіряє ще й Tolk AI."
  },
  "ex_tr": {
   "meth": "Метод: закон Ома — як на парі",
   "items": [
    {
     "q": "На резистор опором 20 Ом подаємо напругу 5 В. Який струм через нього тече?",
     "h": "Закон Ома: I = U / R."
    },
    {
     "q": "Резистори 30 Ом і 60 Ом з'єднані послідовно й підключені до 9 В. Який струм тече в колі?",
     "h": "При послідовному з'єднанні опори додаються."
    },
    {
     "q": "Ті самі резистори 30 Ом і 60 Ом з'єднуємо паралельно й підключаємо до 12 В. Який загальний струм споживає коло?",
     "h": "При паралельному з'єднанні напруга на обох резисторах однакова."
    }
   ]
  },
  "ex_bot": "Своя задача — сфотографуйте її в боті"
 },
 "sk": {
  "dl_other": "Iné systémy:",
  "mac_arm": "Mac (Apple M)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, beta. Ak ho Mac nechce otvoriť: Nastavenia → Súkromie a bezpečnosť → „Aj tak otvoriť“.",
  "hint_linux": "Beta. Inštalácia bez root: sh Tolk-Setup-Linux.run — Tolk sa objaví v ponuke aplikácií.",
  "title": "Tolk — preklad prednášok, poznámky a príprava na skúšky",
  "pair": "EN → SK",
  "nav_dl": "Stiahnuť",
  "h1": "Rozumejte prednáškam<br><em>od prvého dňa.</em>",
  "lede": "Tolk prekladá prednášajúceho, kým hovorí — titulkami nad Teams, Zoomom alebo prehliadačom. A po prednáške napíše poznámky a pripraví vás na skúšku: kartičky, úlohy, skúšobný test.",
  "cta_dl": "Stiahnuť pre {os}",
  "cta_buy": "Kúpiť v Telegrame",
  "cta_trial": "30 minút zadarmo v Telegrame",
  "fine": "30 minút Plus zadarmo, potom Free navždy: 1,5 hodiny denne",
  "c1_h": "Vyberte, <em>čo prekladať.</em>",
  "c1_p": "Kartu s prednáškou, Teams, Zoom alebo celý zvuk počítača. Hudbu a notifikácie z iných programov Tolk nepočuje.",
  "c1_a": "Zdroj",
  "c1_av": "karta, program alebo celý zvuk",
  "c1_b": "Kde funguje",
  "c1_c": "Súkromie",
  "c1_cv": "zvuk ide len na rozpoznanie a nikde sa neukladá",
  "c2_k": "Preklad",
  "c2_h": "Rozumie, <em>ako hovoria študenti.</em>",
  "c2_p": "Bežný prekladač sa stráca v slangu a skratkách. Tolk AI vie, čo znamená „no cap“ a „mid“, a pamätá si, o čom bola reč pred minútou.",
  "c3_h": "Tam, kde <em>vám to vyhovuje.</em>",
  "c3_p": "Titulky sú nad všetkými oknami. Nastavte si ich priamo tu — ako v Tolk: štýl, veľkosť, koľko slov v riadku. Ťahaním za stred ich presuniete, za okraje zmeníte šírku.",
  "p_k": "Ceny",
  "p_h": "Tarify Tolk. <em>Všetko v cene.</em>",
  "p_lede": "Plus — preklad neurónovou sieťou Tolk AI bez denného limitu a 30 hodín Tolk AI na každých 30 dní. Pro — navyše poznámky a príprava na skúšku. Čím dlhšie obdobie, tým lacnejší mesiac.",
  "extra": "Nestačili hodiny?",
  "pay_line": "Nákup v bote <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>: ukrajinská karta, USDT alebo TON. Bez automatických platieb.",
  "rates": "Ceny v hrivnách a krypte — podľa aktuálneho kurzu, zaokrúhlené. Presná suma je v bote.",
  "q_k": "Otázky",
  "t_h": "Vyskúšajte <em>na svojej prednáške.</em>",
  "t_fine": "30 minút Tolk Plus zadarmo, potom Free navždy alebo predplatné. Bez karty.",
  "f1k": "Platforma",
  "f1v": "Windows 10 a 11 · macOS 13+ a Linux — beta",
  "f2k": "Nákup a kľúče",
  "f5k": "Novinky",
  "f3k": "Podpora",
  "f4k": "Údaje",
  "privacy": "Ochrana súkromia",
  "f6k": "Študentom",
  "f6v": "Stránky univerzít",
  "f6s": "Termíny predmetov",
  "f6e": "Rozšírenie pre prehliadač",
  "h_k": "Preklad prednášok, poznámky a príprava na skúšky",
  "nl1": "Ako to funguje",
  "nl2": "Ceny",
  "nl3": "Otázky",
  "x1": "Titulky",
  "x1v": "nad Teams, Zoomom aj prehliadačom — dajú sa ťahať myšou",
  "x2": "Preklad",
  "x2v": "Tolk AI Live — kým vyučujúci hovorí",
  "x3": "Poznámky",
  "x3v": "v jazyku prednášky, pod každým riadkom preklad",
  "xs_k": "Okno Tolk po vrstvách",
  "x4": "Skúška",
  "xs1": "Preklad visí nad Teams, Zoomom alebo prehliadačom. Veľkosť, štýl a šírku riadku meníte myšou.",
  "xs2": "Tolk AI Live prekladá, kým vyučujúci hovorí, — do 1–2 sekúnd, so slangom a termínmi predmetu.",
  "xs3": "Po prednáške — poznámky v jazyku prednášky: témy, definície, vzorce a pod každým riadkom preklad.",
  "xs4": "Na skúškové — kartičky, úlohy s riešením a skúšobný test z vašich prednášok.",
  "xs4_go": "Vyskúšať mini skúšku ↓",
  "x_note": "Snímky okna Tolk. Poznámky sú ukážka.",
  "s1a": "Prednáška",
  "s1av": "v posluchárni alebo online",
  "s1bv": "počúva zvuk notebooku",
  "s1c": "Titulky",
  "s1cv": "preklad o 1–2 sekundy",
  "scr": "vaša obrazovka",
  "c4_k": "Štúdium",
  "c4_h": "Poznámky <em>v jazyku prednášky.</em>",
  "c4_p": "Po prednáške Tolk sám napíše poznámky v jazyku prednášky a pod každým riadkom preklad. Hneď rozumiete a jazyk sa učí sám. Z poznámok vzniknú kartičky, úlohy s riešením metódou vyučujúceho a skúšobná skúška.",
  "c4_a": "Poznámky",
  "c4_av": "samy po prednáške · Tolk Pro",
  "c4_b": "Na skúšku",
  "c4_bv": "kartičky, úlohy, skúšobná skúška · Tolk Pro",
  "c4_c": "Opakovanie",
  "c4_cv": "podľa plánu, slová dňa v Telegrame · všetky tarify",
  "s4a": "Prednáška",
  "s4av": "zvuk a slajdy",
  "s4b": "Poznámky",
  "s4bv": "originál + preklad",
  "s4c": "Skúška",
  "s4cv": "kartičky · úlohy · skúšobná",
  "styles": [
   "Grafit",
   "Sklo",
   "Bez pozadia",
   "Klasika",
   "Svetlé",
   "Kontrast"
  ],
  "plan": {
   "week": "Týždeň",
   "month": "Mesiac",
   "quarter": "3 mesiace",
   "half": "Pol roka",
   "year": "Rok",
   "pro_week": "Pro · Týždeň",
   "pro_month": "Pro · Mesiac",
   "pro_quarter": "Pro · 3 mesiace",
   "pro_half": "Pro · Pol roka",
   "pro_year": "Pro · Rok"
  },
  "per_month": "{p} mesačne",
  "per_week": "7 dní",
  "save": "−{n} %",
  "h_week": "<b>{h} h</b> Tolk AI na týždeň",
  "h_month": "<b>{h} h</b> Tolk AI",
  "h_long": "<b>{h} h</b> Tolk AI — {m} mesačne",
  "buy": "Kúpiť",
  "topup": "+{h} h — {p}",
  "bulk_k": "Viac kľúčov?",
  "bulk_tier": "od {n} — −{p} %",
  "bulk_tail": "v jednej objednávke — pre skupinu alebo ako darček.",
  "bulk_go": "Kúpiť pre troch →",
  "src_lbl": "Originál",
  "faq": [
   [
    "Čo potrebujem, aby Tolk fungoval?",
    "Windows 10 alebo 11, macOS 13+ či Linux (posledné dva v bete) a internet pre Tolk AI. Grafická karta nie je nutná: Tolk si sám vyberie model rozpoznávania podľa vášho počítača."
   ],
   [
    "Existuje bezplatná verzia?",
    "Áno — Tolk Free, zadarmo a bez obmedzenia: 1,5 hodiny prekladu každý deň — celá prednáška. Prekladá Google, reč sa rozpoznáva v počítači. Neurónová sieť Tolk AI, nahrávanie prednášok a príprava na skúšku sú v Plus a Pro. A ak si chcete vyskúšať celý Plus, v bote je 30 minút zadarmo — raz."
   ],
   [
    "Ako Tolk pomáha s prípravou na skúšky?",
    "Po každej prednáške máte poznámky v jazyku prednášky s prekladom. Z nich Tolk Pro urobí kartičky (aj do Anki), úlohy s riešením metódou z prednášky, skúšobný test podľa toho, čo hovoril vyučujúci, a ťahák so vzorcami. Opakovanie podľa plánu a slová dňa v Telegrame sú v Plus aj Pro."
   ],
   [
    "Ktorým jazykom rozumie?",
    "Rozpoznáva 35 jazykov reči: slovenčinu, češtinu, angličtinu, nemčinu, poľštinu, ukrajinčinu a ďalšie. Prekladá do 32 jazykov — aj do slovenčiny, angličtiny, ukrajinčiny a ruštiny."
   ],
   [
    "Funguje v Zoome, Teams, Webexe?",
    "Áno — v akomkoľvek programe a na akejkoľvek stránke so zvukom: Zoom, Teams, Webex, Meet, Discord, YouTube, záznam prednášky v prehliadači. Tolk počúva zvuk, nie samotný program."
   ],
   [
    "Čo je Tolk Pro a poznámky?",
    "Tolk Pro je všetko z Plus a navyše poznámky z prednášok. Stlačte „Nahrať prednášku“: Tolk uloží prepis a slajdy z obrazovky, nájde prezentáciu na stránke katedry (napríklad kmti.fei.tuke.sk) alebo použije váš súbor a za minútu zostaví poznámky: témy, definície, vzorce, termíny zápočtov. Pred skúškami — kartičky, úlohy s riešením metódou vyučujúceho, skúšobná skúška v jeho formáte, ťahák vzorcov a úloha z fotky. Ak poznámky nestačia — balík +20 na 30 dní za 1,99 €."
   ],
   [
    "Funguje v každom prehliadači?",
    "Áno: Chrome, Edge, Opera, Brave, Vivaldi, Firefox a ďalšie. Vo Windows 11 rozšírenie netreba — vyberte v Tolku prehliadač a Tolk bude počuť jeho zvuk. Rozšírenie Tolk sa hodí, keď v prehliadači hrá viac kariet a prekladať treba jednu, — a vo Windows 10. <a class=\"link\" href=\"extension.html\">Ako nainštalovať rozšírenie →</a>"
   ],
   [
    "Počúva Tolk mikrofón? Kam ide zvuk?",
    "Tolk počúva len zvuk, ktorý ste vybrali. S Tolk AI Live ide šifrovaným spojením na rozpoznanie a preklad — len kým sa hovorí, a nikde sa neukladá. Bez Tolk AI sa reč rozpoznáva priamo v počítači. Viac v <a class=\"link\" href=\"privacy.html\">zásadách ochrany súkromia</a>."
   ],
   [
    "Čo sa stane, keď sa minú hodiny Tolk AI?",
    "Preklad sa nezastaví — Tolk prepne na Google. Hodiny sa obnovujú každých 30 dní a ak potrebujete viac, v bote si dokúpite 7,5, 30 alebo 75 hodín."
   ],
   [
    "Ako zaplatiť a kedy príde kľúč?",
    "V Telegram bote <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Ukrajinskou kartou, USDT alebo TON — kľúč príde po kontrole platby, zvyčajne do 15 minút. Kľúč príde do chatu a Tolk, z ktorého ste bota otvorili, sa aktivuje sám."
   ],
   [
    "Predlžuje sa predplatné samo?",
    "Nie, žiadne automatické strhávanie. Tri dni pred koncom vám bot pripomenie a predĺžite jedným tlačidlom — nové obdobie začne po aktuálnom."
   ],
   [
    "Funguje kľúč na inom počítači?",
    "Kľúč je viazaný na jeden počítač. Vymenili ste notebook? Napíšte <a class=\"link\" href=\"https://t.me/sethosint\">podpore</a>, prenesieme ho."
   ]
  ],
  "c1_k": "Zvuk",
  "c2_note": "Skutočné odpovede oboch prekladačov, september 2026.",
  "c3_k": "Titulky",
  "drag": "Potiahnite",
  "tab_std": "Plus",
  "tab_pro": "Pro — s poznámkami",
  "sale_ey": "Limitovaná ponuka",
  "sale_t": "{d} na Tolk",
  "sale_upto": "až −{p} %",
  "sale_until": "do {d}",
  "sale_left": "zostáva",
  "pro_lede": "Všetko z Plus a k tomu štúdium: Tolk nahrá prednášku, uloží slajdy z obrazovky, nájde prezentáciu na stránke katedry a zostaví poznámky — témy, definície, vzorce, termíny zápočtov. A na skúškové — kartičky, úlohy s riešením metódou z prednášok a skúšobná skúška. Až 45 poznámok mesačne.",
  "fb_ey": "Free · 0 € · navždy",
  "fb_t": "1,5 hodiny prekladu každý deň — zadarmo. Celá prednáška.",
  "fb_s": "Len preklad: Google a rozpoznávanie v počítači. Neurónová sieť Tolk AI, nahrávanie prednášok a príprava na skúšku — v Plus a Pro.",
  "fb_go": "Získať Free v bote",
  "nl4": "Mini skúška",
  "x_hint": "Otočte myšou",
  "x_hint_t": "Otočte prstom",
  "x_open": "Rozložiť okno",
  "x_close": "Zložiť okno",
  "sb_style": "Štýl",
  "sb_size": "Veľkosť",
  "sb_words": "Slov v riadku",
  "sb_auto": "podľa šírky",
  "sb_n": "do {n}",
  "sb_engine": "Prekladač",
  "sb_orig": "Originál",
  "sb_note": "Vety sú skutočné odpovede Googlu a Tolk AI. Vzhľad — ako v nastaveniach Tolk.",
  "c5_k": "Skúška",
  "c5_h": "Otestujte sa <em>za minútu.</em>",
  "c5_p": "Takto Tolk Pro pripravuje na skúškové: úlohy z vašich poznámok, odpoveď sa kontroluje hneď a riešenie — metódou z prednášky. Skúste tri úlohy k ukážkovým poznámkam.",
  "c5_a": "Úlohy",
  "c5_av": "ľahké, stredné, ťažké · vlastná téma",
  "c5_b": "Kontrola",
  "c5_bv": "hneď, s nápovedou a celým riešením",
  "c5_c": "Skúšobný test",
  "c5_cv": "formát a body — ako hovoril vyučujúci",
  "ex": {
   "task": "Úloha {n} z {m}",
   "lv": {
    "easy": "ľahká",
    "medium": "stredná",
    "hard": "ťažká"
   },
   "from": "z prednášky „{c}“",
   "hint": "Nápoveda",
   "check": "Skontrolovať",
   "sol": "Podrobné riešenie",
   "next": "Ďalej",
   "prev": "Späť",
   "finish": "Výsledok",
   "ph": "Odpoveď, napr. 1,5 A",
   "ok": "✓ Správne",
   "part": "≈ Takmer",
   "bad": "✗ Zatiaľ nie",
   "unit": "číslo je správne — doplňte jednotku (A)",
   "branch": "to je prúd jednej vetvy — sčítajte obe",
   "wrong": "pozrite sa do nápovedy alebo riešenia",
   "ans": "Odpoveď:",
   "sol_h": "Riešenie · metódou z prednášky",
   "end": "Výsledok: {r} z {m}",
   "end_all": "Prešli by ste.",
   "end_some": "Chyby vidíte hneď — tak sa človek učí.",
   "end_p": "V Tolk Pro máte takéto úlohy z vlastných poznámok: ľahké, stredné aj ťažké, riešené metódou z prednášky, a k tomu skúšobný test.",
   "go": "Pozrieť Tolk Pro",
   "again": "Znova",
   "note": "Príklad: úlohy k ukážkovým poznámkam vyššie. V Tolk odpoveď kontroluje aj Tolk AI."
  },
  "ex_bot": "Vlastná úloha — odfoťte ju v bote"
 },
 "en": {
  "dl_other": "Other systems:",
  "mac_arm": "Mac (Apple silicon)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, beta. If your Mac won’t open it: Settings → Privacy & Security → “Open Anyway”.",
  "hint_linux": "Beta. Installs without root: sh Tolk-Setup-Linux.run — Tolk appears in your app menu.",
  "title": "Tolk — lecture translation, notes and exam prep",
  "pair": "SK → EN",
  "nav_dl": "Download",
  "h1": "Understand lectures<br><em>from day one.</em>",
  "lede": "Tolk translates your lecturer while they speak — subtitles over Teams, Zoom or your browser. After class it writes the notes and gets you ready for the exam: flashcards, problems, a mock exam.",
  "cta_dl": "Download for {os}",
  "cta_buy": "Buy in Telegram",
  "cta_trial": "30 minutes free in Telegram",
  "fine": "30 minutes of Plus free, then Free forever: 1.5 hours a day",
  "c1_h": "Choose <em>what to translate.</em>",
  "c1_p": "A browser tab with your lecture, Teams, Zoom or all of your computer's sound. Tolk doesn't hear music or notifications from other apps.",
  "c1_a": "Source",
  "c1_av": "a tab, an app or all sound",
  "c1_b": "Works with",
  "c1_c": "Privacy",
  "c1_cv": "audio goes only to recognition and is never stored",
  "c2_k": "Translation",
  "c2_h": "Gets <em>student slang.</em>",
  "c2_p": "A regular translator trips over slang and abbreviations. Tolk AI knows what “intrák” and “zápočet” mean, and remembers what was said a minute ago.",
  "c3_h": "Wherever <em>suits you.</em>",
  "c3_p": "Subtitles float above every window. Set them up right here, just like in Tolk: style, size, words per line. Drag the middle to move them, the edges to change the width.",
  "p_k": "Pricing",
  "p_h": "Tolk plans. <em>Everything included.</em>",
  "p_lede": "Plus — translation with Tolk AI and no daily limit, plus 30 hours of Tolk AI every 30 days. Pro adds lecture notes and exam prep. The longer the plan, the cheaper the month.",
  "extra": "Need more hours?",
  "pay_line": "Buy in the <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a> bot: Ukrainian card, USDT or TON. No automatic charges.",
  "rates": "Hryvnia and crypto prices follow the current rate, rounded. The exact amount is shown in the bot.",
  "q_k": "FAQ",
  "t_h": "Try it on <em>your own lecture.</em>",
  "t_fine": "30 minutes of Tolk Plus free, then Free forever or a subscription. No card.",
  "f1k": "Platform",
  "f1v": "Windows 10 and 11 · macOS 13+ and Linux — beta",
  "f2k": "Purchase and keys",
  "f5k": "News",
  "f3k": "Support",
  "f4k": "Data",
  "privacy": "Privacy",
  "f6k": "Students",
  "f6v": "University pages",
  "f6s": "Subject terms",
  "f6e": "Browser extension",
  "h_k": "Lecture translation, notes and exam prep",
  "nl1": "How it works",
  "nl2": "Pricing",
  "nl3": "FAQ",
  "x1": "Subtitles",
  "x1v": "over Teams, Zoom and the browser — drag them anywhere",
  "x2": "Translation",
  "x2v": "Tolk AI Live — while the lecturer speaks",
  "x3": "Notes",
  "x3v": "in the lecture's language, a translation under every line",
  "xs_k": "The Tolk window, layer by layer",
  "x4": "Exam",
  "xs1": "The translation floats over Teams, Zoom or your browser. Change size, style and line width with the mouse.",
  "xs2": "Tolk AI Live translates while the lecturer speaks — within 1–2 seconds, slang and course terms included.",
  "xs3": "After class — notes in the lecture's language: topics, definitions, formulas, with a translation under every line.",
  "xs4": "Before exams — flashcards, worked problems and a practice exam from your own lectures.",
  "xs4_go": "Try the mini exam ↓",
  "x_note": "Screenshots of the Tolk window. The notes are an example.",
  "s1a": "Lecture",
  "s1av": "in the hall or online",
  "s1bv": "hears your laptop's sound",
  "s1c": "Subtitles",
  "s1cv": "translated in 1–2 seconds",
  "scr": "your screen",
  "c4_k": "Study",
  "c4_h": "Notes <em>in the lecture's language.</em>",
  "c4_p": "After class Tolk writes notes in the language of the lecture, with a translation under every line. You understand right away, and the language sinks in. The notes turn into flashcards, problems solved the lecturer's way and a mock exam.",
  "c4_a": "Notes",
  "c4_av": "written after class · Tolk Pro",
  "c4_b": "Exam prep",
  "c4_bv": "flashcards, problems, mock exam · Tolk Pro",
  "c4_c": "Review",
  "c4_cv": "on a schedule, words of the day in Telegram · all plans",
  "s4a": "Lecture",
  "s4av": "audio and slides",
  "s4b": "Notes",
  "s4bv": "original + translation",
  "s4c": "Exam",
  "s4cv": "cards · problems · mock",
  "styles": [
   "Graphite",
   "Glass",
   "No backdrop",
   "Classic",
   "Light",
   "Contrast"
  ],
  "plan": {
   "week": "Week",
   "month": "Month",
   "quarter": "3 months",
   "half": "6 months",
   "year": "Year",
   "pro_week": "Pro · Week",
   "pro_month": "Pro · Month",
   "pro_quarter": "Pro · 3 months",
   "pro_half": "Pro · 6 months",
   "pro_year": "Pro · Year"
  },
  "per_month": "{p} a month",
  "per_week": "7 days",
  "save": "−{n}%",
  "h_week": "<b>{h} h</b> of Tolk AI for the week",
  "h_month": "<b>{h} h</b> of Tolk AI",
  "h_long": "<b>{h} h</b> of Tolk AI — {m} a month",
  "buy": "Buy",
  "topup": "+{h} h — {p}",
  "bulk_k": "Several keys?",
  "bulk_tier": "{n}+ keys — −{p}%",
  "bulk_tail": "in one order — for a group or as gifts.",
  "bulk_go": "Buy for three →",
  "src_lbl": "Original",
  "faq": [
   [
    "What do I need to run Tolk?",
    "Windows 10 or 11, macOS 13+ or Linux (the last two in beta) and an internet connection for Tolk AI. A graphics card isn't required: Tolk picks a speech-recognition model that suits your computer."
   ],
   [
    "Is there a free version?",
    "Yes — Tolk Free, free with no end date: 1.5 hours of translation every day — a whole lecture. Google translates and speech is recognized on your computer. Tolk AI, lecture recording and exam prep are in Plus and Pro. To try all of Plus, the bot also gives 30 free minutes — once."
   ],
   [
    "How does Tolk help with exams?",
    "After every class you get notes in the lecture's language with a translation. From them Tolk Pro makes flashcards (Anki export too), problems solved the way your lecturer did it, a mock exam based on what the lecturer said, and a formula sheet. Spaced repetition and words of the day in Telegram are in Plus and Pro."
   ],
   [
    "Which languages does it understand?",
    "It recognises 35 spoken languages — Slovak, Czech, English, German, Polish, Ukrainian and more — and translates into 32, including English, Slovak, Ukrainian and Russian."
   ],
   [
    "Does it work in Zoom, Teams, Webex?",
    "Yes — in any app or website with sound: Zoom, Teams, Webex, Meet, Discord, YouTube, a lecture recording in the browser. Tolk listens to the sound, not to the app itself."
   ],
   [
    "What is Tolk Pro and the notes?",
    "Tolk Pro is everything in Plus plus lecture notes. Press “Record lecture”: Tolk saves the transcript and the on-screen slides, finds the presentation on the department site (e.g. kmti.fei.tuke.sk) or takes your file, and in a minute writes notes: topics, definitions, formulas, deadlines. Before exams — flashcards, problems solved with the lecturer's method, a mock exam in their format, a formula sheet and problems from a photo. Need more notes — a pack of +20 for 30 days for €1.99."
   ],
   [
    "Does it work in any browser?",
    "Yes: Chrome, Edge, Opera, Brave, Vivaldi, Firefox and others. On Windows 11 you don't need the extension — pick your browser in Tolk and it hears its sound. The Tolk extension helps when several tabs play at once and you need just one — and on Windows 10. <a class=\"link\" href=\"extension.html\">How to install the extension →</a>"
   ],
   [
    "Does Tolk listen to my mic? Where does the audio go?",
    "Tolk only listens to the sound you picked. With Tolk AI Live it goes over an encrypted connection to recognition and translation — only while someone speaks, and it's never stored. Without Tolk AI, speech is recognised right on your computer. More in the <a class=\"link\" href=\"privacy.html\">privacy policy</a>."
   ],
   [
    "What happens when my Tolk AI hours run out?",
    "Translation keeps going — Tolk switches to Google. Hours refresh every 30 days, and if you need more, you can buy 7.5, 30 or 75 hours in the bot."
   ],
   [
    "How do I pay, and when do I get the key?",
    "In the Telegram bot <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Pay with a Ukrainian card, USDT or TON — the key arrives after the payment is checked, usually within 15 minutes. The key arrives in the chat, and the Tolk you opened the bot from activates itself."
   ],
   [
    "Does the subscription renew automatically?",
    "No — there are no automatic charges. The bot reminds you three days before the end, and renewing takes one tap; the new period starts after the current one."
   ],
   [
    "Will my key work on another computer?",
    "A key is tied to one computer. Got a new laptop? Message <a class=\"link\" href=\"https://t.me/sethosint\">support</a> and we'll move it."
   ]
  ],
  "c1_k": "Sound",
  "c2_note": "Real answers from both translators, September 2026.",
  "c3_k": "Subtitles",
  "drag": "Drag me",
  "tab_std": "Plus",
  "tab_pro": "Pro — with notes",
  "sale_ey": "Limited offer",
  "sale_t": "{d} off Tolk",
  "sale_upto": "up to −{p}%",
  "sale_until": "until {d}",
  "sale_left": "left",
  "pro_lede": "Everything in Plus, plus studying: Tolk records the class, saves the on-screen slides, finds the presentation on the department site and writes notes — topics, definitions, formulas, deadlines. And for exams: flashcards, problems solved the way your lecturer does it, and a mock exam. Up to 45 notes a month.",
  "fb_ey": "Free · €0 · forever",
  "fb_t": "1.5 hours of translation every day — free. A whole lecture.",
  "fb_s": "Translation only: Google and on-device speech recognition. Tolk AI, lecture recording and exam prep are in Plus and Pro.",
  "fb_go": "Get Free in the bot",
  "nl4": "Mini exam",
  "x_hint": "Spin it with the mouse",
  "x_hint_t": "Spin it with your finger",
  "x_open": "Take apart",
  "x_close": "Put together",
  "sb_style": "Style",
  "sb_size": "Size",
  "sb_words": "Words per line",
  "sb_auto": "by width",
  "sb_n": "up to {n}",
  "sb_engine": "Translator",
  "sb_orig": "Original",
  "sb_note": "The lines are real answers from Google and Tolk AI. The look matches Tolk's settings.",
  "c5_k": "Exam",
  "c5_h": "Test yourself <em>in a minute.</em>",
  "c5_p": "This is how Tolk Pro gets you ready for exams: problems from your notes, answers checked right away, and solutions worked the way your lecturer did it. Try three problems for the sample notes.",
  "c5_a": "Problems",
  "c5_av": "easy, medium, hard · your own topic",
  "c5_b": "Checking",
  "c5_bv": "instant, with a hint and a full solution",
  "c5_c": "Mock exam",
  "c5_cv": "format and points — as the lecturer described",
  "ex": {
   "task": "Problem {n} of {m}",
   "lv": {
    "easy": "easy",
    "medium": "medium",
    "hard": "hard"
   },
   "from": "from “{c}”",
   "hint": "Hint",
   "check": "Check",
   "sol": "Full solution",
   "next": "Next",
   "prev": "Back",
   "finish": "Results",
   "ph": "Answer, e.g. 1.5 A",
   "ok": "✓ Correct",
   "part": "≈ Almost",
   "bad": "✗ Not quite",
   "unit": "the number is right — add the unit (A)",
   "branch": "that's the current of one branch — add both",
   "wrong": "take a look at the hint or the solution",
   "ans": "Answer:",
   "sol_h": "Solution · the lecturer's method",
   "end": "Result: {r} of {m}",
   "end_all": "You'd pass.",
   "end_some": "You see the mistakes right away — that's how you learn.",
   "end_p": "In Tolk Pro you get problems like these from your own notes: easy, medium and hard, solved the way your lecturer did it, plus a mock exam.",
   "go": "See Tolk Pro",
   "again": "Try again",
   "note": "Example: problems for the sample notes above. In Tolk, Tolk AI checks answers too."
  },
  "ex_tr": {
   "meth": "Method: Ohm's law, as in the lecture",
   "items": [
    {
     "q": "We apply 5 V across a 20 Ω resistor. What current flows through it?",
     "h": "Ohm's law: I = U / R."
    },
    {
     "q": "Resistors of 30 Ω and 60 Ω are connected in series to 9 V. What current flows in the circuit?",
     "h": "In series, resistances add up."
    },
    {
     "q": "The same 30 Ω and 60 Ω resistors are connected in parallel to 12 V. What total current does the circuit draw?",
     "h": "In parallel, both resistors have the same voltage across them."
    }
   ]
  },
  "ex_bot": "Your own problem — snap it in the bot"
 },
 "pl": {
  "dl_other": "Inne systemy:",
  "mac_arm": "Mac (Apple silicon)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, beta. Jeśli Mac nie chce otworzyć: Ustawienia → Prywatność i ochrona → „Otwórz mimo to”.",
  "hint_linux": "Beta. Instalacja bez roota: sh Tolk-Setup-Linux.run — Tolk pojawi się w menu aplikacji.",
  "title": "Tolk — tłumaczenie zajęć, notatki i nauka do egzaminów",
  "pair": "SK → EN",
  "nav_dl": "Pobierz",
  "h1": "Rozumiej wykłady<br><em>od pierwszego dnia.</em>",
  "lede": "Tolk tłumaczy wykładowcę na bieżąco — napisami nad Teams, Zoomem albo przeglądarką. A po zajęciach pisze notatki i przygotowuje do egzaminu: fiszki, zadania, egzamin próbny.",
  "cta_dl": "Pobierz na {os}",
  "cta_buy": "Kup w Telegramie",
  "cta_trial": "30 minut za darmo w Telegramie",
  "fine": "30 minut Plus za darmo, potem Free na zawsze: 1,5 godziny dziennie",
  "c1_h": "Wybierz, <em>co tłumaczyć.</em>",
  "c1_p": "Kartę przeglądarki z wykładem, Teams, Zoom albo cały dźwięk komputera. Tolk nie słyszy muzyki ani powiadomień z innych aplikacji.",
  "c1_a": "Źródło",
  "c1_av": "karta, aplikacja albo cały dźwięk",
  "c1_b": "Działa z",
  "c1_c": "Prywatność",
  "c1_cv": "dźwięk idzie tylko do rozpoznawania i nie jest zapisywany",
  "c2_k": "Tłumaczenie",
  "c2_h": "Rozumie <em>studencki slang.</em>",
  "c2_p": "Zwykły tłumacz potyka się na slangu i skrótach. Tolk AI wie, co znaczy „intrák” i „zápočet”, i pamięta, co padło minutę temu.",
  "c3_h": "Tam, gdzie <em>ci wygodnie.</em>",
  "c3_p": "Napisy wiszą nad każdym oknem. Ustaw je tutaj — tak jak w Tolk: styl, rozmiar, ile słów w wierszu. Przeciągnij za środek, żeby przesunąć, za krawędzie — żeby zmienić szerokość.",
  "p_k": "Ceny",
  "p_h": "Plany Tolk. <em>Wszystko w cenie.</em>",
  "p_lede": "Plus — tłumaczenie siecią neuronową Tolk AI bez dziennego limitu i 30 godzin Tolk AI co 30 dni. Pro — do tego notatki i przygotowanie do egzaminu. Im dłuższy plan, tym tańszy miesiąc.",
  "extra": "Potrzebujesz więcej godzin?",
  "pay_line": "Kupisz w bocie <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>: ukraińska karta, USDT albo TON. Bez automatycznych obciążeń.",
  "rates": "Ceny w hrywnach i krypto liczone po bieżącym kursie i zaokrąglone. Dokładną kwotę pokaże bot.",
  "q_k": "Pytania",
  "t_h": "Sprawdź na <em>swoim wykładzie.</em>",
  "t_fine": "30 minut Tolk Plus za darmo, potem Free na zawsze albo subskrypcja. Bez karty.",
  "f1k": "Platforma",
  "f1v": "Windows 10 i 11 · macOS 13+ i Linux — beta",
  "f2k": "Zakup i klucze",
  "f5k": "Nowości",
  "f3k": "Wsparcie",
  "f4k": "Dane",
  "privacy": "Prywatność",
  "f6k": "Studenci",
  "f6v": "Strony uczelni",
  "f6s": "Terminy przedmiotów",
  "f6e": "Rozszerzenie do przeglądarki",
  "h_k": "Tłumaczenie zajęć, notatki i nauka do egzaminów",
  "nl1": "Jak to działa",
  "nl2": "Ceny",
  "nl3": "Pytania",
  "x1": "Napisy",
  "x1v": "nad Teams, Zoomem i przeglądarką — przeciągasz, gdzie chcesz",
  "x2": "Tłumaczenie",
  "x2v": "Tolk AI Live — kiedy wykładowca mówi",
  "x3": "Notatki",
  "x3v": "w języku wykładu, z tłumaczeniem pod każdą linijką",
  "xs_k": "Okno Tolk warstwa po warstwie",
  "x4": "Egzamin",
  "xs1": "Tłumaczenie wisi nad Teams, Zoomem albo przeglądarką. Rozmiar, styl i szerokość linii zmieniasz myszką.",
  "xs2": "Tolk AI Live tłumaczy, gdy prowadzący mówi — w 1–2 sekundy, ze slangiem i terminami przedmiotu.",
  "xs3": "Po zajęciach — notatki w języku wykładu: tematy, definicje, wzory, a pod każdą linijką tłumaczenie.",
  "xs4": "Przed sesją — fiszki, zadania z rozwiązaniem i egzamin próbny z twoich zajęć.",
  "xs4_go": "Wypróbuj mini-egzamin ↓",
  "x_note": "Zrzuty ekranu okna Tolk. Notatki — przykład.",
  "s1a": "Wykład",
  "s1av": "na sali albo online",
  "s1bv": "słyszy dźwięk laptopa",
  "s1c": "Napisy",
  "s1cv": "tłumaczenie w 1–2 sekundy",
  "scr": "twój ekran",
  "c4_k": "Nauka",
  "c4_h": "Notatki <em>w języku wykładu.</em>",
  "c4_p": "Po zajęciach Tolk pisze notatki w języku wykładu, a pod każdą linijką — tłumaczenie. Od razu rozumiesz, a język sam wchodzi do głowy. Z notatek robią się fiszki, zadania rozwiązane metodą wykładowcy i egzamin próbny.",
  "c4_a": "Notatki",
  "c4_av": "same po zajęciach · Tolk Pro",
  "c4_b": "Przed sesją",
  "c4_bv": "fiszki, zadania, egzamin próbny · Tolk Pro",
  "c4_c": "Powtórki",
  "c4_cv": "według planu, słowa dnia w Telegramie · wszystkie plany",
  "s4a": "Wykład",
  "s4av": "dźwięk i slajdy",
  "s4b": "Notatki",
  "s4bv": "oryginał + tłumaczenie",
  "s4c": "Egzamin",
  "s4cv": "fiszki · zadania · próbny",
  "styles": [
   "Grafit",
   "Szkło",
   "Bez tła",
   "Klasyczny",
   "Jasny",
   "Kontrast"
  ],
  "plan": {
   "week": "Tydzień",
   "month": "Miesiąc",
   "quarter": "3 miesiące",
   "half": "Pół roku",
   "year": "Rok",
   "pro_week": "Pro · Tydzień",
   "pro_month": "Pro · Miesiąc",
   "pro_quarter": "Pro · 3 miesiące",
   "pro_half": "Pro · Pół roku",
   "pro_year": "Pro · Rok"
  },
  "per_month": "{p} miesięcznie",
  "per_week": "7 dni",
  "save": "−{n}%",
  "h_week": "<b>{h} godz.</b> Tolk AI na tydzień",
  "h_month": "<b>{h} godz.</b> Tolk AI",
  "h_long": "<b>{h} godz.</b> Tolk AI — {m} miesięcznie",
  "buy": "Kup",
  "topup": "+{h} godz. — {p}",
  "bulk_k": "Kilka kluczy?",
  "bulk_tier": "od {n} kluczy — −{p}%",
  "bulk_tail": "w jednym zamówieniu — dla grupy albo na prezent.",
  "bulk_go": "Kup na trzy osoby →",
  "src_lbl": "Oryginał",
  "faq": [
   [
    "Czego potrzeba, żeby uruchomić Tolk?",
    "Windows 10 albo 11, macOS 13+ albo Linux (dwa ostatnie — beta) i internetu dla Tolk AI. Karta graficzna nie jest potrzebna: Tolk sam dobierze model rozpoznawania mowy do twojego komputera."
   ],
   [
    "Jest darmowa wersja?",
    "Tak — Tolk Free, za darmo i bez terminu: 1,5 godziny tłumaczenia każdego dnia — całe zajęcia. Tłumaczy Google, a mowa jest rozpoznawana na komputerze. Sieć neuronowa Tolk AI, nagrywanie wykładów i przygotowanie do egzaminu są w Plus i Pro. A żeby wypróbować cały Plus, w bocie jest 30 darmowych minut — jeden raz."
   ],
   [
    "Jak Tolk pomaga w nauce do egzaminów?",
    "Po każdych zajęciach dostajesz notatki w języku wykładu z tłumaczeniem. Z nich Tolk Pro robi fiszki (też do Anki), zadania rozwiązane metodą z zajęć, egzamin próbny według tego, co mówił prowadzący, i ściągę ze wzorami. Powtórki według planu i słowa dnia w Telegramie są w Plus i Pro."
   ],
   [
    "Jakie języki rozumie?",
    "Rozpoznaje 35 języków mówionych — słowacki, czeski, angielski, niemiecki, polski, ukraiński i inne — a tłumaczy na 32, w tym na angielski, polski, ukraiński i rosyjski."
   ],
   [
    "Działa w Zoomie, Teams, Webex?",
    "Tak — w każdej aplikacji i na każdej stronie z dźwiękiem: Zoom, Teams, Webex, Meet, Discord, YouTube, nagranie wykładu w przeglądarce. Tolk słucha dźwięku, a nie samej aplikacji."
   ],
   [
    "Czym jest Tolk Pro i notatki?",
    "Tolk Pro to wszystko, co w Plus, plus notatki z wykładów. Naciśnij „Nagraj wykład”: Tolk zapisze transkrypcję i slajdy z ekranu, znajdzie prezentację na stronie katedry (np. kmti.fei.tuke.sk) albo weźmie twój plik i w minutę napisze notatki: tematy, definicje, wzory, terminy. Przed sesją — fiszki, zadania rozwiązane metodą wykładowcy, egzamin próbny w jego formacie, ściąga wzorów i zadania ze zdjęcia. Za mało notatek — pakiet +20 na 30 dni za 1,99 €."
   ],
   [
    "Działa w każdej przeglądarce?",
    "Tak: Chrome, Edge, Opera, Brave, Vivaldi, Firefox i inne. W Windows 11 rozszerzenie nie jest potrzebne — wybierz przeglądarkę w Tolk, a usłyszy jej dźwięk. Rozszerzenie Tolk pomaga, gdy gra kilka kart naraz, a potrzebna jest jedna — i w Windows 10. <a class=\"link\" href=\"extension.html\">Jak zainstalować rozszerzenie →</a>"
   ],
   [
    "Czy Tolk słucha mojego mikrofonu? Dokąd trafia dźwięk?",
    "Tolk słucha tylko dźwięku, który wybierzesz. Z Tolk AI Live idzie on szyfrowanym połączeniem do rozpoznawania i tłumaczenia — tylko wtedy, gdy ktoś mówi, i nie jest zapisywany. Bez Tolk AI mowa jest rozpoznawana na twoim komputerze. Więcej w <a class=\"link\" href=\"privacy.html\">polityce prywatności</a>."
   ],
   [
    "Co się stanie, gdy skończą się godziny Tolk AI?",
    "Tłumaczenie działa dalej — Tolk przełączy się na Google. Godziny odnawiają się co 30 dni, a jeśli potrzeba więcej, w bocie dokupisz 7,5, 30 albo 75 godzin."
   ],
   [
    "Jak zapłacić i kiedy przyjdzie klucz?",
    "W bocie Telegrama <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Płacisz ukraińską kartą, USDT albo TON — klucz przyjdzie po sprawdzeniu płatności, zwykle w ciągu 15 minut. Klucz trafia na czat, a Tolk, z którego otwarto bota, aktywuje się sam."
   ],
   [
    "Czy subskrypcja przedłuża się sama?",
    "Nie — nie ma automatycznych obciążeń. Bot przypomni trzy dni przed końcem, a przedłużenie to jedno dotknięcie; nowy okres zaczyna się po obecnym."
   ],
   [
    "Czy klucz zadziała na innym komputerze?",
    "Klucz jest przypisany do jednego komputera. Nowy laptop? Napisz do <a class=\"link\" href=\"https://t.me/sethosint\">wsparcia</a>, a przeniesiemy go."
   ]
  ],
  "c1_k": "Dźwięk",
  "c2_note": "Prawdziwe odpowiedzi obu tłumaczy, wrzesień 2026.",
  "c3_k": "Napisy",
  "drag": "Przeciągnij mnie",
  "tab_std": "Plus",
  "tab_pro": "Pro — z notatkami",
  "sale_ey": "Oferta ograniczona",
  "sale_t": "{d} na Tolk",
  "sale_upto": "do −{p}%",
  "sale_until": "do {d}",
  "sale_left": "zostało",
  "pro_lede": "Wszystko, co w Plus, i do tego nauka: Tolk nagrywa zajęcia, zapisuje slajdy z ekranu, znajduje prezentację na stronie katedry i pisze notatki — tematy, definicje, wzory, terminy. A na sesję — fiszki, zadania rozwiązane metodą z zajęć i egzamin próbny. Do 45 notatek miesięcznie.",
  "fb_ey": "Free · 0 € · na zawsze",
  "fb_t": "1,5 godziny tłumaczenia każdego dnia — za darmo. Całe zajęcia.",
  "fb_s": "Tylko tłumaczenie: Google i rozpoznawanie mowy na komputerze. Sieć neuronowa Tolk AI, nagrywanie wykładów i przygotowanie do egzaminu — w Plus i Pro.",
  "fb_go": "Odbierz Free w bocie",
  "nl4": "Mini-egzamin",
  "x_hint": "Obróć myszką",
  "x_hint_t": "Obróć palcem",
  "x_open": "Rozłóż okno",
  "x_close": "Złóż okno",
  "sb_style": "Styl",
  "sb_size": "Rozmiar",
  "sb_words": "Słów w wierszu",
  "sb_auto": "wg szerokości",
  "sb_n": "do {n}",
  "sb_engine": "Tłumacz",
  "sb_orig": "Oryginał",
  "sb_note": "Zdania to prawdziwe odpowiedzi Google i Tolk AI. Wygląd — jak w ustawieniach Tolk.",
  "c5_k": "Egzamin",
  "c5_h": "Sprawdź się <em>w minutę.</em>",
  "c5_p": "Tak Tolk Pro przygotowuje do sesji: zadania z twoich notatek, odpowiedź sprawdzana od razu, a rozwiązanie — metodą z zajęć. Spróbuj trzech zadań do przykładowych notatek.",
  "c5_a": "Zadania",
  "c5_av": "łatwe, średnie, trudne · własny temat",
  "c5_b": "Sprawdzanie",
  "c5_bv": "od razu, z podpowiedzią i pełnym rozwiązaniem",
  "c5_c": "Egzamin próbny",
  "c5_cv": "format i punkty — jak mówił prowadzący",
  "ex": {
   "task": "Zadanie {n} z {m}",
   "lv": {
    "easy": "łatwe",
    "medium": "średnie",
    "hard": "trudne"
   },
   "from": "z zajęć „{c}”",
   "hint": "Podpowiedź",
   "check": "Sprawdź",
   "sol": "Pełne rozwiązanie",
   "next": "Dalej",
   "prev": "Wstecz",
   "finish": "Wynik",
   "ph": "Odpowiedź, np. 1,5 A",
   "ok": "✓ Dobrze",
   "part": "≈ Prawie",
   "bad": "✗ Jeszcze nie",
   "unit": "liczba się zgadza — dopisz jednostkę (A)",
   "branch": "to prąd jednej gałęzi — dodaj obie",
   "wrong": "zajrzyj do podpowiedzi albo rozwiązania",
   "ans": "Odpowiedź:",
   "sol_h": "Rozwiązanie · metodą z zajęć",
   "end": "Wynik: {r} z {m}",
   "end_all": "Zdajesz.",
   "end_some": "Błędy widać od razu — tak uczy się najlepiej.",
   "end_p": "W Tolk Pro takie zadania powstają z twoich notatek: łatwe, średnie i trudne, rozwiązane metodą z zajęć, do tego egzamin próbny.",
   "go": "Zobacz Tolk Pro",
   "again": "Jeszcze raz",
   "note": "Przykład: zadania do przykładowych notatek wyżej. W Tolk odpowiedź sprawdza też Tolk AI."
  },
  "ex_tr": {
   "meth": "Metoda: prawo Ohma, jak na zajęciach",
   "items": [
    {
     "q": "Do rezystora o oporze 20 Ω przykładamy napięcie 5 V. Jaki prąd przez niego płynie?",
     "h": "Prawo Ohma: I = U / R."
    },
    {
     "q": "Rezystory 30 Ω i 60 Ω połączono szeregowo i podłączono do 9 V. Jaki prąd płynie w obwodzie?",
     "h": "Przy połączeniu szeregowym opory się sumują."
    },
    {
     "q": "Te same rezystory 30 Ω i 60 Ω łączymy równolegle i podłączamy do 12 V. Jaki całkowity prąd pobiera obwód?",
     "h": "Przy połączeniu równoległym na obu rezystorach jest to samo napięcie."
    }
   ]
  },
  "ex_bot": "Własne zadanie — zrób mu zdjęcie w bocie"
 },
 "cs": {
  "dl_other": "Jiné systémy:",
  "mac_arm": "Mac (Apple silicon)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, beta. Pokud ho Mac nechce otevřít: Nastavení → Soukromí a zabezpečení → „Přesto otevřít“.",
  "hint_linux": "Beta. Instalace bez rootu: sh Tolk-Setup-Linux.run — Tolk se objeví v nabídce aplikací.",
  "title": "Tolk — překlad přednášek, poznámky a příprava na zkoušky",
  "pair": "SK → EN",
  "nav_dl": "Stáhnout",
  "h1": "Rozumějte přednáškám<br><em>od prvního dne.</em>",
  "lede": "Tolk překládá vyučujícího, zatímco mluví — titulky nad Teams, Zoomem nebo prohlížečem. A po přednášce napíše poznámky a připraví vás na zkoušku: kartičky, úlohy, zkušební test.",
  "cta_dl": "Stáhnout pro {os}",
  "cta_buy": "Koupit v Telegramu",
  "cta_trial": "30 minut zdarma v Telegramu",
  "fine": "30 minut Plus zdarma, potom Free navždy: 1,5 hodiny denně",
  "c1_h": "Vyberte, <em>co překládat.</em>",
  "c1_p": "Kartu prohlížeče s přednáškou, Teams, Zoom nebo celý zvuk počítače. Tolk neslyší hudbu ani oznámení z jiných aplikací.",
  "c1_a": "Zdroj",
  "c1_av": "karta, aplikace nebo celý zvuk",
  "c1_b": "Funguje s",
  "c1_c": "Soukromí",
  "c1_cv": "zvuk jde jen k rozpoznávání a neukládá se",
  "c2_k": "Překlad",
  "c2_h": "Rozumí <em>studentskému slangu.</em>",
  "c2_p": "Běžný překladač zakopává o slang a zkratky. Tolk AI ví, co znamená „intrák“ a „zápočet“, a pamatuje si, co zaznělo před minutou.",
  "c3_h": "Tam, kde <em>se vám to hodí.</em>",
  "c3_p": "Titulky visí nad každým oknem. Nastavte si je přímo tady — jako v Tolk: styl, velikost, kolik slov na řádek. Tažením za střed je přesunete, za okraje změníte šířku.",
  "p_k": "Ceny",
  "p_h": "Tarify Tolk. <em>Vše v ceně.</em>",
  "p_lede": "Plus — překlad neuronovou sítí Tolk AI bez denního limitu a 30 hodin Tolk AI každých 30 dní. Pro — navíc poznámky a příprava na zkoušku. Čím delší tarif, tím levnější měsíc.",
  "extra": "Potřebujete víc hodin?",
  "pay_line": "Koupíte v botovi <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>: ukrajinská karta, USDT nebo TON. Žádné automatické platby.",
  "rates": "Ceny v hřivnách a kryptu se počítají podle aktuálního kurzu a zaokrouhlují. Přesnou částku ukáže bot.",
  "q_k": "Otázky",
  "t_h": "Vyzkoušejte na <em>své přednášce.</em>",
  "t_fine": "30 minut Tolk Plus zdarma, potom Free navždy nebo předplatné. Bez karty.",
  "f1k": "Platforma",
  "f1v": "Windows 10 a 11 · macOS 13+ a Linux — beta",
  "f2k": "Nákup a klíče",
  "f5k": "Novinky",
  "f3k": "Podpora",
  "f4k": "Data",
  "privacy": "Soukromí",
  "f6k": "Studenti",
  "f6v": "Stránky vysokých škol",
  "f6s": "Pojmy předmětů",
  "f6e": "Rozšíření pro prohlížeč",
  "h_k": "Překlad přednášek, poznámky a příprava na zkoušky",
  "nl1": "Jak to funguje",
  "nl2": "Ceny",
  "nl3": "Otázky",
  "x1": "Titulky",
  "x1v": "nad Teams, Zoomem a prohlížečem — přetáhnete je kamkoli",
  "x2": "Překlad",
  "x2v": "Tolk AI Live — zatímco vyučující mluví",
  "x3": "Poznámky",
  "x3v": "v jazyce přednášky, s překladem pod každým řádkem",
  "xs_k": "Okno Tolk po vrstvách",
  "x4": "Zkouška",
  "xs1": "Překlad visí nad Teams, Zoomem nebo prohlížečem. Velikost, styl a šířku řádku měníte myší.",
  "xs2": "Tolk AI Live překládá, zatímco vyučující mluví, — do 1–2 sekund, se slangem a pojmy předmětu.",
  "xs3": "Po přednášce — poznámky v jazyce přednášky: témata, definice, vzorce a pod každým řádkem překlad.",
  "xs4": "Ke zkouškovému — kartičky, úlohy s řešením a zkušební test z vašich přednášek.",
  "xs4_go": "Vyzkoušet mini zkoušku ↓",
  "x_note": "Snímky okna Tolk. Poznámky jsou ukázka.",
  "s1a": "Přednáška",
  "s1av": "v posluchárně nebo online",
  "s1bv": "slyší zvuk notebooku",
  "s1c": "Titulky",
  "s1cv": "překlad za 1–2 sekundy",
  "scr": "vaše obrazovka",
  "c4_k": "Studium",
  "c4_h": "Poznámky <em>v jazyce přednášky.</em>",
  "c4_p": "Po přednášce Tolk napíše poznámky v jazyce přednášky a pod každý řádek přidá překlad. Hned rozumíte a jazyk se učíte mimochodem. Z poznámek vzniknou kartičky, úlohy řešené metodou vyučujícího a zkušební test.",
  "c4_a": "Poznámky",
  "c4_av": "samy po přednášce · Tolk Pro",
  "c4_b": "Před zkouškami",
  "c4_bv": "kartičky, úlohy, zkušební test · Tolk Pro",
  "c4_c": "Opakování",
  "c4_cv": "podle plánu, slova dne v Telegramu · všechny tarify",
  "s4a": "Přednáška",
  "s4av": "zvuk a slajdy",
  "s4b": "Poznámky",
  "s4bv": "originál + překlad",
  "s4c": "Zkouška",
  "s4cv": "kartičky · úlohy · test",
  "styles": [
   "Grafit",
   "Sklo",
   "Bez pozadí",
   "Klasický",
   "Světlý",
   "Kontrast"
  ],
  "plan": {
   "week": "Týden",
   "month": "Měsíc",
   "quarter": "3 měsíce",
   "half": "Půl roku",
   "year": "Rok",
   "pro_week": "Pro · Týden",
   "pro_month": "Pro · Měsíc",
   "pro_quarter": "Pro · 3 měsíce",
   "pro_half": "Pro · Půl roku",
   "pro_year": "Pro · Rok"
  },
  "per_month": "{p} měsíčně",
  "per_week": "7 dní",
  "save": "−{n} %",
  "h_week": "<b>{h} h</b> Tolk AI na týden",
  "h_month": "<b>{h} h</b> Tolk AI",
  "h_long": "<b>{h} h</b> Tolk AI — {m} měsíčně",
  "buy": "Koupit",
  "topup": "+{h} h — {p}",
  "bulk_k": "Víc klíčů?",
  "bulk_tier": "od {n} klíčů — −{p} %",
  "bulk_tail": "v jedné objednávce — pro skupinu nebo jako dárky.",
  "bulk_go": "Koupit pro tři →",
  "src_lbl": "Originál",
  "faq": [
   [
    "Co je potřeba ke spuštění Tolku?",
    "Windows 10 nebo 11, macOS 13+ nebo Linux (poslední dva — beta) a internet pro Tolk AI. Grafická karta není potřeba: Tolk sám vybere model rozpoznávání řeči, který váš počítač zvládne."
   ],
   [
    "Je k dispozici bezplatná verze?",
    "Ano — Tolk Free, zdarma a bez omezení: 1,5 hodiny překladu každý den — celá přednáška. Překládá Google a řeč se rozpoznává v počítači. Neuronová síť Tolk AI, nahrávání přednášek a příprava na zkoušku jsou v Plus a Pro. A pokud si chcete vyzkoušet celý Plus, v botovi je 30 minut zdarma — jednou."
   ],
   [
    "Jak Tolk pomáhá s přípravou na zkoušky?",
    "Po každé přednášce máte poznámky v jazyce přednášky s překladem. Z nich Tolk Pro udělá kartičky (i do Anki), úlohy s řešením metodou z přednášky, zkušební test podle toho, co říkal vyučující, a tahák se vzorci. Opakování podle plánu a slova dne v Telegramu jsou v Plus i Pro."
   ],
   [
    "Jakým jazykům rozumí?",
    "Rozpoznává 35 mluvených jazyků — slovenštinu, češtinu, angličtinu, němčinu, polštinu, ukrajinštinu a další — a překládá do 32, mezi nimi do angličtiny, češtiny, ukrajinštiny a ruštiny."
   ],
   [
    "Funguje v Zoomu, Teams, Webexu?",
    "Ano — v jakékoli aplikaci nebo na webu se zvukem: Zoom, Teams, Webex, Meet, Discord, YouTube, záznam přednášky v prohlížeči. Tolk poslouchá zvuk, ne samotnou aplikaci."
   ],
   [
    "Co je Tolk Pro a poznámky?",
    "Tolk Pro je vše z Plus a navíc poznámky z přednášek. Stiskněte „Nahrát přednášku“: Tolk uloží přepis a slajdy z obrazovky, najde prezentaci na webu katedry (např. kmti.fei.tuke.sk) nebo vezme váš soubor a za minutu napíše poznámky: témata, definice, vzorce, termíny. Před zkouškami — kartičky, úlohy řešené metodou vyučujícího, zkušební test v jeho formátu, tahák vzorců a úlohy z fotky. Málo poznámek — balíček +20 na 30 dní za 1,99 €."
   ],
   [
    "Funguje v každém prohlížeči?",
    "Ano: Chrome, Edge, Opera, Brave, Vivaldi, Firefox a další. Ve Windows 11 rozšíření nepotřebujete — vyberte prohlížeč v Tolku a uslyší jeho zvuk. Rozšíření Tolk pomůže, když hraje víc karet najednou a potřebujete jen jednu — a ve Windows 10. <a class=\"link\" href=\"extension.html\">Jak nainstalovat rozšíření →</a>"
   ],
   [
    "Poslouchá Tolk můj mikrofon? Kam jde zvuk?",
    "Tolk poslouchá jen zvuk, který vyberete. S Tolk AI Live jde šifrovaným spojením k rozpoznávání a překladu — jen když někdo mluví, a neukládá se. Bez Tolk AI se řeč rozpoznává přímo ve vašem počítači. Víc v <a class=\"link\" href=\"privacy.html\">zásadách ochrany soukromí</a>."
   ],
   [
    "Co se stane, když dojdou hodiny Tolk AI?",
    "Překlad pokračuje — Tolk přepne na Google. Hodiny se obnovují každých 30 dní, a když potřebujete víc, v botovi dokoupíte 7,5, 30 nebo 75 hodin."
   ],
   [
    "Jak zaplatit a kdy přijde klíč?",
    "V telegramovém botovi <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Zaplatíte ukrajinskou kartou, USDT nebo TON — klíč přijde po ověření platby, obvykle do 15 minut. Klíč přijde do chatu a Tolk, ze kterého jste bota otevřeli, se aktivuje sám."
   ],
   [
    "Prodlužuje se předplatné samo?",
    "Ne — žádné automatické platby nejsou. Bot vám tři dny před koncem připomene a prodloužení je jedno klepnutí; nové období začne po aktuálním."
   ],
   [
    "Bude klíč fungovat na jiném počítači?",
    "Klíč je vázaný na jeden počítač. Nový notebook? Napište <a class=\"link\" href=\"https://t.me/sethosint\">podpoře</a> a klíč přeneseme."
   ]
  ],
  "c1_k": "Zvuk",
  "c2_note": "Skutečné odpovědi obou překladačů, září 2026.",
  "c3_k": "Titulky",
  "drag": "Přetáhněte mě",
  "tab_std": "Plus",
  "tab_pro": "Pro — s poznámkami",
  "sale_ey": "Omezená nabídka",
  "sale_t": "{d} na Tolk",
  "sale_upto": "až −{p} %",
  "sale_until": "do {d}",
  "sale_left": "zbývá",
  "pro_lede": "Vše z Plus a k tomu studium: Tolk nahraje výuku, uloží slajdy z obrazovky, najde prezentaci na webu katedry a napíše poznámky — témata, definice, vzorce, termíny. A na zkouškové — kartičky, úlohy řešené metodou z přednášek a zkušební zkouška. Až 45 poznámek měsíčně.",
  "fb_ey": "Free · 0 € · navždy",
  "fb_t": "1,5 hodiny překladu každý den — zdarma. Celá přednáška.",
  "fb_s": "Jen překlad: Google a rozpoznávání v počítači. Neuronová síť Tolk AI, nahrávání přednášek a příprava na zkoušku — v Plus a Pro.",
  "fb_go": "Získat Free v botovi",
  "nl4": "Mini zkouška",
  "x_hint": "Otočte myší",
  "x_hint_t": "Otočte prstem",
  "x_open": "Rozložit okno",
  "x_close": "Složit okno",
  "sb_style": "Styl",
  "sb_size": "Velikost",
  "sb_words": "Slov na řádek",
  "sb_auto": "podle šířky",
  "sb_n": "až {n}",
  "sb_engine": "Překladač",
  "sb_orig": "Originál",
  "sb_note": "Věty jsou skutečné odpovědi Googlu a Tolk AI. Vzhled — jako v nastavení Tolk.",
  "c5_k": "Zkouška",
  "c5_h": "Vyzkoušejte se <em>za minutu.</em>",
  "c5_p": "Takhle Tolk Pro připravuje na zkouškové: úlohy z vašich poznámek, odpověď se kontroluje hned a řešení — metodou z přednášky. Zkuste tři úlohy k ukázkovým poznámkám.",
  "c5_a": "Úlohy",
  "c5_av": "lehké, střední, těžké · vlastní téma",
  "c5_b": "Kontrola",
  "c5_bv": "hned, s nápovědou a celým řešením",
  "c5_c": "Zkušební test",
  "c5_cv": "formát a body — jak říkal vyučující",
  "ex": {
   "task": "Úloha {n} z {m}",
   "lv": {
    "easy": "lehká",
    "medium": "střední",
    "hard": "těžká"
   },
   "from": "z přednášky „{c}“",
   "hint": "Nápověda",
   "check": "Zkontrolovat",
   "sol": "Podrobné řešení",
   "next": "Dál",
   "prev": "Zpět",
   "finish": "Výsledek",
   "ph": "Odpověď, např. 1,5 A",
   "ok": "✓ Správně",
   "part": "≈ Skoro",
   "bad": "✗ Zatím ne",
   "unit": "číslo je správně — doplňte jednotku (A)",
   "branch": "to je proud jedné větve — sečtěte obě",
   "wrong": "podívejte se do nápovědy nebo řešení",
   "ans": "Odpověď:",
   "sol_h": "Řešení · metodou z přednášky",
   "end": "Výsledek: {r} z {m}",
   "end_all": "Prošli byste.",
   "end_some": "Chyby vidíte hned — tak se člověk učí.",
   "end_p": "V Tolk Pro máte takové úlohy z vlastních poznámek: lehké, střední i těžké, řešené metodou z přednášky, a k tomu zkušební test.",
   "go": "Zobrazit Tolk Pro",
   "again": "Znovu",
   "note": "Příklad: úlohy k ukázkovým poznámkám výše. V Tolk odpověď kontroluje i Tolk AI."
  },
  "ex_tr": {
   "meth": "Metoda: Ohmův zákon, jako na přednášce",
   "items": [
    {
     "q": "Na rezistor s odporem 20 Ω připojíme napětí 5 V. Jaký proud jím teče?",
     "h": "Ohmův zákon: I = U / R."
    },
    {
     "q": "Rezistory 30 Ω a 60 Ω jsou zapojeny sériově na napětí 9 V. Jaký proud teče obvodem?",
     "h": "Při sériovém zapojení se odpory sčítají."
    },
    {
     "q": "Tytéž rezistory 30 Ω a 60 Ω zapojíme paralelně na napětí 12 V. Jaký celkový proud odebírá obvod?",
     "h": "Při paralelním zapojení je na obou rezistorech stejné napětí."
    }
   ]
  },
  "ex_bot": "Vlastní úloha — vyfoťte ji v botovi"
 },
 "de": {
  "dl_other": "Andere Systeme:",
  "mac_arm": "Mac (Apple Silicon)",
  "mac_intel": "Mac (Intel)",
  "hint_mac": "macOS 13+, Beta. Wenn dein Mac das Öffnen blockiert: Einstellungen → Datenschutz & Sicherheit → „Dennoch öffnen“.",
  "hint_linux": "Beta. Installation ohne Root: sh Tolk-Setup-Linux.run — Tolk erscheint im App-Menü.",
  "title": "Tolk — Vorlesungen übersetzt, Mitschriften und Prüfungsvorbereitung",
  "pair": "SK → EN",
  "nav_dl": "Download",
  "h1": "Versteh Vorlesungen<br><em>vom ersten Tag an.</em>",
  "lede": "Tolk übersetzt die Lehrkraft, während sie spricht — als Untertitel über Teams, Zoom oder dem Browser. Nach der Vorlesung schreibt er die Mitschrift und bereitet dich auf die Prüfung vor: Karteikarten, Aufgaben, Probeklausur.",
  "cta_dl": "Für {os} herunterladen",
  "cta_buy": "In Telegram kaufen",
  "cta_trial": "30 Minuten gratis in Telegram",
  "fine": "30 Minuten Plus gratis, danach Free für immer: 1,5 Stunden am Tag",
  "c1_h": "Wähle, <em>was übersetzt wird.</em>",
  "c1_p": "Einen Browser-Tab mit der Vorlesung, Teams, Zoom oder den ganzen Ton deines Computers. Musik und Benachrichtigungen anderer Apps hört Tolk nicht.",
  "c1_a": "Quelle",
  "c1_av": "ein Tab, eine App oder der ganze Ton",
  "c1_b": "Funktioniert mit",
  "c1_c": "Datenschutz",
  "c1_cv": "der Ton geht nur an die Erkennung und wird nicht gespeichert",
  "c2_k": "Übersetzung",
  "c2_h": "Versteht <em>Studi-Slang.</em>",
  "c2_p": "Ein normaler Übersetzer stolpert über Slang und Abkürzungen. Tolk AI weiß, was „intrák“ und „zápočet“ heißen, und erinnert sich, was vor einer Minute gesagt wurde.",
  "c3_h": "Da, wo es <em>dir passt.</em>",
  "c3_p": "Die Untertitel schweben über jedem Fenster. Stell sie hier ein, genau wie in Tolk: Stil, Größe, Wörter pro Zeile. In der Mitte ziehen verschiebt sie, an den Rändern ändert die Breite.",
  "p_k": "Preise",
  "p_h": "Tolk-Tarife. <em>Alles inklusive.</em>",
  "p_lede": "Plus — Übersetzung mit Tolk AI ohne Tageslimit und 30 Stunden Tolk AI alle 30 Tage. Pro bringt dazu Mitschriften und Prüfungsvorbereitung. Je länger der Tarif, desto günstiger der Monat.",
  "extra": "Brauchst du mehr Stunden?",
  "pay_line": "Kauf im Bot <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>: ukrainische Karte, USDT oder TON. Keine automatischen Abbuchungen.",
  "rates": "Preise in Hrywnja und Krypto folgen dem aktuellen Kurs, gerundet. Den genauen Betrag zeigt der Bot.",
  "q_k": "Fragen",
  "t_h": "Probier es in <em>deiner Vorlesung.</em>",
  "t_fine": "30 Minuten Tolk Plus gratis, danach Free für immer oder ein Abo. Ohne Karte.",
  "f1k": "Plattform",
  "f1v": "Windows 10 und 11 · macOS 13+ und Linux — Beta",
  "f2k": "Kauf und Schlüssel",
  "f5k": "News",
  "f3k": "Support",
  "f4k": "Daten",
  "privacy": "Datenschutz",
  "f6k": "Studium",
  "f6v": "Seiten der Hochschulen",
  "f6s": "Fachbegriffe",
  "f6e": "Browser-Erweiterung",
  "h_k": "Vorlesungen übersetzt, Mitschriften und Prüfungsvorbereitung",
  "nl1": "So funktioniert’s",
  "nl2": "Preise",
  "nl3": "Fragen",
  "x1": "Untertitel",
  "x1v": "über Teams, Zoom und dem Browser — zieh sie, wohin du willst",
  "x2": "Übersetzung",
  "x2v": "Tolk AI Live — während die Lehrkraft spricht",
  "x3": "Mitschrift",
  "x3v": "in der Sprache der Vorlesung, Übersetzung unter jeder Zeile",
  "xs_k": "Das Tolk-Fenster in Schichten",
  "x4": "Prüfung",
  "xs1": "Die Übersetzung schwebt über Teams, Zoom oder dem Browser. Größe, Stil und Zeilenbreite änderst du mit der Maus.",
  "xs2": "Tolk AI Live übersetzt, während die Lehrkraft spricht — in 1–2 Sekunden, mit Slang und Fachbegriffen.",
  "xs3": "Nach der Vorlesung — Mitschrift in der Sprache der Vorlesung: Themen, Definitionen, Formeln, Übersetzung unter jeder Zeile.",
  "xs4": "Vor der Prüfung — Karteikarten, Aufgaben mit Lösung und eine Probeprüfung aus deinen Vorlesungen.",
  "xs4_go": "Mini-Prüfung ausprobieren ↓",
  "x_note": "Screenshots des Tolk-Fensters. Die Mitschrift ist ein Beispiel.",
  "s1a": "Vorlesung",
  "s1av": "im Hörsaal oder online",
  "s1bv": "hört den Ton deines Laptops",
  "s1c": "Untertitel",
  "s1cv": "Übersetzung in 1–2 Sekunden",
  "scr": "dein Bildschirm",
  "c4_k": "Lernen",
  "c4_h": "Mitschriften <em>in der Sprache der Vorlesung.</em>",
  "c4_p": "Nach der Vorlesung schreibt Tolk eine Mitschrift in der Sprache der Vorlesung, mit Übersetzung unter jeder Zeile. Du verstehst sofort, und die Sprache bleibt nebenbei hängen. Aus den Mitschriften werden Karteikarten, Aufgaben im Lösungsweg der Lehrkraft und eine Probeklausur.",
  "c4_a": "Mitschrift",
  "c4_av": "von selbst nach der Vorlesung · Tolk Pro",
  "c4_b": "Prüfungsvorbereitung",
  "c4_bv": "Karteikarten, Aufgaben, Probeklausur · Tolk Pro",
  "c4_c": "Wiederholen",
  "c4_cv": "nach Plan, Wörter des Tages in Telegram · alle Tarife",
  "s4a": "Vorlesung",
  "s4av": "Ton und Folien",
  "s4b": "Mitschrift",
  "s4bv": "Original + Übersetzung",
  "s4c": "Prüfung",
  "s4cv": "Karten · Aufgaben · Probeklausur",
  "styles": [
   "Graphit",
   "Glas",
   "Ohne Hintergrund",
   "Klassisch",
   "Hell",
   "Kontrast"
  ],
  "plan": {
   "week": "Woche",
   "month": "Monat",
   "quarter": "3 Monate",
   "half": "6 Monate",
   "year": "Jahr",
   "pro_week": "Pro · Woche",
   "pro_month": "Pro · Monat",
   "pro_quarter": "Pro · 3 Monate",
   "pro_half": "Pro · 6 Monate",
   "pro_year": "Pro · Jahr"
  },
  "per_month": "{p} im Monat",
  "per_week": "7 Tage",
  "save": "−{n} %",
  "h_week": "<b>{h} Std.</b> Tolk AI für die Woche",
  "h_month": "<b>{h} Std.</b> Tolk AI",
  "h_long": "<b>{h} Std.</b> Tolk AI — {m} im Monat",
  "buy": "Kaufen",
  "topup": "+{h} Std. — {p}",
  "bulk_k": "Mehrere Schlüssel?",
  "bulk_tier": "ab {n} Schlüsseln — −{p} %",
  "bulk_tail": "in einer Bestellung — für eine Gruppe oder als Geschenk.",
  "bulk_go": "Zu dritt kaufen →",
  "src_lbl": "Original",
  "faq": [
   [
    "Was brauche ich für Tolk?",
    "Windows 10 oder 11, macOS 13+ oder Linux (die letzten beiden in der Beta) und Internet für Tolk AI. Eine Grafikkarte ist nicht nötig: Tolk wählt selbst ein Spracherkennungsmodell, das zu deinem Computer passt."
   ],
   [
    "Gibt es eine Gratisversion?",
    "Ja — Tolk Free, gratis und ohne Ablaufdatum: 1,5 Stunden Übersetzung jeden Tag — eine ganze Vorlesung. Google übersetzt, die Sprache wird auf deinem Computer erkannt. Tolk AI, Vorlesungsaufnahme und Prüfungsvorbereitung gibt es in Plus und Pro. Und um Plus komplett auszuprobieren, gibt dir der Bot einmalig 30 Gratis-Minuten."
   ],
   [
    "Wie hilft Tolk bei der Prüfungsvorbereitung?",
    "Nach jeder Vorlesung bekommst du eine Mitschrift in der Sprache der Vorlesung mit Übersetzung. Daraus macht Tolk Pro Karteikarten (auch für Anki), Aufgaben mit Lösung nach der Methode aus der Vorlesung, eine Probeklausur nach dem, was der Dozent gesagt hat, und einen Formelzettel. Wiederholung nach Plan und Wörter des Tages in Telegram gibt es in Plus und Pro."
   ],
   [
    "Welche Sprachen versteht es?",
    "Es erkennt 35 gesprochene Sprachen — Slowakisch, Tschechisch, Englisch, Deutsch, Polnisch, Ukrainisch und mehr — und übersetzt in 32, darunter Englisch, Deutsch, Ukrainisch und Russisch."
   ],
   [
    "Funktioniert es in Zoom, Teams, Webex?",
    "Ja — in jeder App und auf jeder Website mit Ton: Zoom, Teams, Webex, Meet, Discord, YouTube, eine Vorlesungsaufzeichnung im Browser. Tolk hört auf den Ton, nicht auf die App selbst."
   ],
   [
    "Was ist Tolk Pro, und was sind Mitschriften?",
    "Tolk Pro ist alles aus Plus plus Vorlesungsmitschriften. Drück „Vorlesung aufnehmen“: Tolk speichert das Transkript und die Folien vom Bildschirm, findet die Präsentation auf der Seite des Lehrstuhls (z. B. kmti.fei.tuke.sk) oder nimmt deine Datei und schreibt in einer Minute die Mitschrift: Themen, Definitionen, Formeln, Termine. Vor Prüfungen — Karteikarten, Aufgaben im Lösungsweg der Lehrkraft, eine Probeklausur in ihrem Format, ein Formelblatt und Aufgaben vom Foto. Zu wenig Mitschriften — ein Paket +20 für 30 Tage für 1,99 €."
   ],
   [
    "Funktioniert es in jedem Browser?",
    "Ja: Chrome, Edge, Opera, Brave, Vivaldi, Firefox und andere. Unter Windows 11 brauchst du keine Erweiterung — wähle deinen Browser in Tolk, und es hört seinen Ton. Die Tolk-Erweiterung hilft, wenn mehrere Tabs gleichzeitig spielen und du nur einen brauchst — und unter Windows 10. <a class=\"link\" href=\"extension.html\">So installierst du die Erweiterung →</a>"
   ],
   [
    "Hört Tolk mein Mikrofon ab? Wohin geht der Ton?",
    "Tolk hört nur den Ton, den du gewählt hast. Mit Tolk AI Live geht er verschlüsselt an Erkennung und Übersetzung — nur solange jemand spricht, und er wird nicht gespeichert. Ohne Tolk AI wird die Sprache direkt auf deinem Computer erkannt. Mehr in der <a class=\"link\" href=\"privacy.html\">Datenschutzerklärung</a>."
   ],
   [
    "Was passiert, wenn die Tolk-AI-Stunden aufgebraucht sind?",
    "Die Übersetzung läuft weiter — Tolk wechselt zu Google. Die Stunden erneuern sich alle 30 Tage, und wenn du mehr brauchst, kaufst du im Bot 7,5, 30 oder 75 Stunden dazu."
   ],
   [
    "Wie bezahle ich, und wann kommt der Schlüssel?",
    "Im Telegram-Bot <a class=\"link js-buy\" href=\"https://t.me/TolkShopBot\">@TolkShopBot</a>. Bezahl mit ukrainischer Karte, USDT oder TON — der Schlüssel kommt nach der Prüfung der Zahlung, meist innerhalb von 15 Minuten. Er kommt in den Chat, und das Tolk, aus dem du den Bot geöffnet hast, aktiviert sich von selbst."
   ],
   [
    "Verlängert sich das Abo automatisch?",
    "Nein — es gibt keine automatischen Abbuchungen. Der Bot erinnert dich drei Tage vor dem Ende, und Verlängern ist ein Tipp; der neue Zeitraum beginnt nach dem aktuellen."
   ],
   [
    "Funktioniert mein Schlüssel auf einem anderen Computer?",
    "Ein Schlüssel ist an einen Computer gebunden. Neuer Laptop? Schreib dem <a class=\"link\" href=\"https://t.me/sethosint\">Support</a>, wir ziehen ihn um."
   ]
  ],
  "c1_k": "Ton",
  "c2_note": "Echte Antworten beider Übersetzer, September 2026.",
  "c3_k": "Untertitel",
  "drag": "Zieh mich",
  "tab_std": "Plus",
  "tab_pro": "Pro — mit Mitschriften",
  "sale_ey": "Begrenztes Angebot",
  "sale_t": "{d} auf Tolk",
  "sale_upto": "bis zu −{p} %",
  "sale_until": "bis {d}",
  "sale_left": "noch",
  "pro_lede": "Alles aus Plus und dazu Lernen: Tolk nimmt die Vorlesung auf, speichert die Folien vom Bildschirm, findet die Präsentation auf der Seite des Lehrstuhls und schreibt die Mitschrift — Themen, Definitionen, Formeln, Termine. Und für die Prüfungen: Karteikarten, Aufgaben mit dem Lösungsweg aus der Vorlesung und eine Probeprüfung. Bis zu 45 Mitschriften im Monat.",
  "fb_ey": "Free · 0 € · für immer",
  "fb_t": "1,5 Stunden Übersetzung jeden Tag — gratis. Eine ganze Vorlesung.",
  "fb_s": "Nur Übersetzung: Google und Spracherkennung auf dem Computer. Tolk AI, Vorlesungsaufnahme und Prüfungsvorbereitung gibt es in Plus und Pro.",
  "fb_go": "Free im Bot holen",
  "nl4": "Mini-Prüfung",
  "x_hint": "Mit der Maus drehen",
  "x_hint_t": "Mit dem Finger drehen",
  "x_open": "Zerlegen",
  "x_close": "Zusammensetzen",
  "sb_style": "Stil",
  "sb_size": "Größe",
  "sb_words": "Wörter pro Zeile",
  "sb_auto": "nach Breite",
  "sb_n": "bis {n}",
  "sb_engine": "Übersetzer",
  "sb_orig": "Original",
  "sb_note": "Die Sätze sind echte Antworten von Google und Tolk AI. Das Aussehen entspricht den Einstellungen in Tolk.",
  "c5_k": "Prüfung",
  "c5_h": "Teste dich <em>in einer Minute.</em>",
  "c5_p": "So bereitet Tolk Pro auf die Prüfungen vor: Aufgaben aus deinen Mitschriften, die Antwort wird sofort geprüft, die Lösung folgt der Methode aus der Vorlesung. Probier drei Aufgaben zur Beispiel-Mitschrift.",
  "c5_a": "Aufgaben",
  "c5_av": "leicht, mittel, schwer · eigenes Thema",
  "c5_b": "Prüfen",
  "c5_bv": "sofort, mit Tipp und ausführlicher Lösung",
  "c5_c": "Probeklausur",
  "c5_cv": "Format und Punkte — wie vom Dozenten angekündigt",
  "ex": {
   "task": "Aufgabe {n} von {m}",
   "lv": {
    "easy": "leicht",
    "medium": "mittel",
    "hard": "schwer"
   },
   "from": "aus „{c}“",
   "hint": "Tipp",
   "check": "Prüfen",
   "sol": "Ausführliche Lösung",
   "next": "Weiter",
   "prev": "Zurück",
   "finish": "Ergebnis",
   "ph": "Antwort, z. B. 1,5 A",
   "ok": "✓ Richtig",
   "part": "≈ Fast",
   "bad": "✗ Noch nicht",
   "unit": "die Zahl stimmt — ergänze die Einheit (A)",
   "branch": "das ist der Strom eines Zweigs — addiere beide",
   "wrong": "schau dir den Tipp oder die Lösung an",
   "ans": "Antwort:",
   "sol_h": "Lösung · Methode aus der Vorlesung",
   "end": "Ergebnis: {r} von {m}",
   "end_all": "Bestanden.",
   "end_some": "Fehler siehst du sofort — so lernt man.",
   "end_p": "In Tolk Pro bekommst du solche Aufgaben aus deinen Mitschriften: leicht, mittel und schwer, gelöst wie in der Vorlesung, dazu eine Probeklausur.",
   "go": "Tolk Pro ansehen",
   "again": "Nochmal",
   "note": "Beispiel: Aufgaben zur Beispiel-Mitschrift oben. In Tolk prüft auch Tolk AI die Antwort."
  },
  "ex_tr": {
   "meth": "Methode: Ohmsches Gesetz, wie in der Vorlesung",
   "items": [
    {
     "q": "An einen Widerstand von 20 Ω legen wir 5 V an. Welcher Strom fließt hindurch?",
     "h": "Ohmsches Gesetz: I = U / R."
    },
    {
     "q": "Widerstände von 30 Ω und 60 Ω sind in Reihe an 9 V angeschlossen. Welcher Strom fließt im Stromkreis?",
     "h": "In Reihe addieren sich die Widerstände."
    },
    {
     "q": "Dieselben Widerstände 30 Ω und 60 Ω schalten wir parallel an 12 V. Welchen Gesamtstrom nimmt die Schaltung auf?",
     "h": "Parallel liegt an beiden Widerständen dieselbe Spannung."
    }
   ]
  },
  "ex_bot": "Deine eigene Aufgabe — fotografier sie im Bot"
 }
};
