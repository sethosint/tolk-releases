// Страница «Расширение Tolk» (extension.html): язык — как на главной (?lang=, выбранный раньше, язык браузера), снимки —
// настоящие, на этом языке (Firefox: русский для RU/UK, английский для остальных), вкладка браузера — по браузеру
// посетителя или #firefox, кнопки адресов копируют адрес. Русский текст — прямо в странице, здесь — остальные языки.
(() => {
  const LANGS = ["ru", "uk", "en", "pl", "de", "cs", "sk"];
  const T = {
    ru: { copy: "Скопировано" },
    uk: {
      title: "Tolk — розширення для браузера", k: "Розширення для браузера", h1: "Перекладайте <em>одну вкладку.</em>",
      lede: "Натисніть значок Tolk на вкладці з лекцією — і Tolk перекладає лише її звук. Музика й інші вкладки не заважають.",
      safe: "Безкоштовно. Нічого не йде в інтернет: звук іде лише в програму Tolk на цьому комп’ютері.",
      need: "Потрібна програма Tolk — вона має бути запущена. Ще немає? <a class=\"link\" href=\"./\">Завантажити Tolk</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Яндекс", dl_ch: "Завантажити розширення", dl_ff: "Завантажити для Firefox",
      ff_nozip: "tolk-firefox.zip · розпаковувати не треба",
      c1h: "Розпакуйте архів",
      c1p: "Windows: правою кнопкою по архіву → «Видобути все». Mac: подвійне клацання. Вийде папка <b>tolk-chrome</b> — залиште її на місці, наприклад у «Документах»: браузер бере розширення з неї.",
      c2h: "Відкрийте сторінку розширень",
      c2p: "Скопіюйте адресу свого браузера, вставте її в адресний рядок ① і натисніть Enter. Праворуч угорі увімкніть «Режим розробника» ② (в Edge він ліворуч, у меню).",
      yandex: "Яндекс", c3h: "Завантажте папку Tolk",
      c3p: "Натисніть «Завантажити розпаковане розширення» і виберіть папку <b>tolk-chrome</b> — ту, в якій лежить файл manifest.json.",
      c4h: "Готово — розширення встановлено",
      c4p: "З’явиться картка «Tolk — переклад вкладки». Якщо замість неї помилка — дивіться питання нижче.",
      c5h: "Закріпіть значок",
      c5p: "Значок пазла ① → три крапки біля Tolk ② → «Закріпити на панелі інструментів» ③. Тепер значок Tolk завжди під рукою.",
      on_h: "Увімкніть на лекції",
      on_p: "Запустіть Tolk, відкрийте вкладку з лекцією чи дзвінком і натисніть значок Tolk. З’явиться <b>ON</b> — переклад почнеться сам. Натиснете ще раз — вимкнеться.",
      f1h: "Відкрийте сторінку додатків",
      f1p: "Скопіюйте адресу, вставте її в адресний рядок ① і натисніть Enter. Потім натисніть «Завантажити тимчасовий додаток…» ②.",
      f2h: "Виберіть завантажений архів", f2p: "Виберіть <b>tolk-firefox.zip</b> — з’явиться картка «Tolk — переклад вкладки».",
      f3p: "Значок пазла ① → «⋯» біля Tolk ② → «Закріпити на панелі інструментів» ③.",
      ff_temp: "Firefox прибирає такий додаток після перезапуску — тоді повторіть кроки 1–2, це пів хвилини. Незабаром Tolk з’явиться в каталозі додатків Firefox і ставитиметься назавжди.",
      tip: "Найпростіше — з програми: Tolk → «Переклад і звук» → «Одна вкладка браузера» → «Підключити». Tolk сам скопіює адреси й шлях до папки та позначить готові кроки.",
      q_h: "Якщо щось не так", q1: "Помилка про manifest під час завантаження",
      a1: "Вибрано сам архів або не ту папку. Спершу розпакуйте архів, потім виберіть папку <b>tolk-chrome</b> — прямо в ній має лежати файл manifest.json.",
      q2: "На значку «!»", a2: "Tolk не запущено на комп’ютері. Відкрийте програму й натисніть значок ще раз.",
      q3: "Як оновити розширення?",
      a3: "Якщо ставили з програми — Tolk оновлює його сам. Інакше завантажте архів заново, замініть файли в папці tolk-chrome і натисніть ↻ біля Tolk на сторінці розширень. У Firefox — просто завантажте новий архів.",
      q4: "А Safari?", a4: "Розширення для Safari поки немає. Без розширення Tolk теж перекладає: у Tolk → «Що слухати» виберіть браузер або звук комп’ютера.",
      q5: "Це безпечно?",
      a5: "Розширення вмикається лише клацанням на значку й віддає звук цієї вкладки лише програмі Tolk на цьому ж комп’ютері. Воно не збирає історію й дані та нічого не надсилає в інтернет. Докладніше — <a class=\"link\" href=\"privacy.html\">конфіденційність</a>.",
      help: "Допомога · @sethosint", copy: "Скопійовано",
    },
    en: {
      title: "Tolk — browser extension", k: "Browser extension", h1: "Translate <em>just one tab.</em>",
      lede: "Click the Tolk icon on the tab with your lecture — Tolk translates only that tab’s sound. Music and other tabs don’t get in the way.",
      safe: "Free. Nothing goes to the internet: the sound goes only to the Tolk app on this computer.",
      need: "You need the Tolk app running. Don’t have it yet? <a class=\"link\" href=\"./\">Download Tolk</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Yandex", dl_ch: "Download the extension", dl_ff: "Download for Firefox",
      ff_nozip: "tolk-firefox.zip · no need to unzip",
      c1h: "Unzip the archive",
      c1p: "Windows: right-click the archive → “Extract All”. Mac: double-click it. You’ll get a <b>tolk-chrome</b> folder — keep it where it is, e.g. in Documents: the browser loads the extension from it.",
      c2h: "Open the extensions page",
      c2p: "Copy your browser’s address, paste it into the address bar ① and press Enter. Turn on “Developer mode” in the top right ② (in Edge it’s on the left, in the menu).",
      yandex: "Yandex", c3h: "Load the Tolk folder",
      c3p: "Click “Load unpacked” and pick the <b>tolk-chrome</b> folder — the one with the manifest.json file inside.",
      c4h: "Done — the extension is installed",
      c4p: "You’ll see the “Tolk — live tab translation” card. Got an error instead? See the questions below.",
      c5h: "Pin the icon",
      c5p: "Puzzle icon ① → three dots next to Tolk ② → “Pin to toolbar” ③. Now the Tolk icon is always at hand.",
      on_h: "Turn it on for a lecture",
      on_p: "Start Tolk, open the tab with your lecture or call and click the Tolk icon. You’ll see <b>ON</b> — translation starts by itself. Click again to turn it off.",
      f1h: "Open the add-ons page",
      f1p: "Copy the address, paste it into the address bar ① and press Enter. Then click “Load Temporary Add-on…” ②.",
      f2h: "Pick the downloaded archive", f2p: "Choose <b>tolk-firefox.zip</b> — the “Tolk — live tab translation” card appears.",
      f3p: "Puzzle icon ① → “⋯” next to Tolk ② → “Pin to Toolbar” ③.",
      ff_temp: "Firefox removes this kind of add-on when it restarts — then repeat steps 1–2, it takes half a minute. Soon Tolk will be in the Firefox add-ons catalog and install for good.",
      tip: "Easiest is from the app: Tolk → “Translation &amp; sound” → “One browser tab” → “Connect”. Tolk copies the addresses and the folder path for you and ticks off the steps.",
      q_h: "If something’s wrong", q1: "Error “Manifest file is missing or unreadable”",
      a1: "You picked the archive itself or the wrong folder. Unzip the archive first, then pick the <b>tolk-chrome</b> folder — manifest.json must be right inside it.",
      q2: "There’s a “!” on the icon", a2: "Tolk isn’t running on this computer. Open the app and click the icon again.",
      q3: "How do I update the extension?",
      a3: "If you installed it from the app, Tolk updates it by itself. Otherwise download the archive again, replace the files in the tolk-chrome folder and click ↻ next to Tolk on the extensions page. In Firefox, just load the new archive.",
      q4: "What about Safari?", a4: "There’s no Safari extension yet. Tolk translates without it too: in Tolk → “What to listen to”, pick the browser or the computer’s sound.",
      q5: "Is it safe?",
      a5: "The extension turns on only when you click its icon and passes that tab’s sound only to the Tolk app on the same computer. It collects no history or data and sends nothing to the internet. More in <a class=\"link\" href=\"privacy.html\">privacy</a>.",
      help: "Help · @sethosint", copy: "Copied",
    },
    pl: {
      title: "Tolk — rozszerzenie do przeglądarki", k: "Rozszerzenie do przeglądarki", h1: "Tłumacz <em>jedną kartę.</em>",
      lede: "Kliknij ikonę Tolk na karcie z wykładem — Tolk tłumaczy tylko jej dźwięk. Muzyka i inne karty nie przeszkadzają.",
      safe: "Za darmo. Nic nie trafia do internetu: dźwięk idzie tylko do programu Tolk na tym komputerze.",
      need: "Potrzebny jest uruchomiony program Tolk. Jeszcze go nie masz? <a class=\"link\" href=\"./\">Pobierz Tolk</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Yandex", dl_ch: "Pobierz rozszerzenie", dl_ff: "Pobierz dla Firefoksa",
      ff_nozip: "tolk-firefox.zip · nie trzeba rozpakowywać",
      c1h: "Rozpakuj archiwum",
      c1p: "Windows: prawy przycisk na archiwum → „Wyodrębnij wszystkie”. Mac: dwuklik. Powstanie folder <b>tolk-chrome</b> — zostaw go na miejscu, np. w „Dokumentach”: przeglądarka wczytuje z niego rozszerzenie.",
      c2h: "Otwórz stronę rozszerzeń",
      c2p: "Skopiuj adres swojej przeglądarki, wklej go w pasek adresu ① i naciśnij Enter. W prawym górnym rogu włącz „Tryb dewelopera” ② (w Edge jest po lewej, w menu).",
      yandex: "Yandex", c3h: "Wczytaj folder Tolk",
      c3p: "Kliknij „Załaduj rozpakowane” i wybierz folder <b>tolk-chrome</b> — ten, w którym leży plik manifest.json.",
      c4h: "Gotowe — rozszerzenie zainstalowane",
      c4p: "Pojawi się karta „Tolk — tłumaczenie karty na żywo”. Zamiast niej błąd? Zobacz pytania niżej.",
      c5h: "Przypnij ikonę",
      c5p: "Ikona puzzla ① → trzy kropki przy Tolk ② → „Przypnij do paska narzędzi” ③. Teraz ikona Tolk jest zawsze pod ręką.",
      on_h: "Włącz na wykładzie",
      on_p: "Uruchom Tolk, otwórz kartę z wykładem lub rozmową i kliknij ikonę Tolk. Pojawi się <b>ON</b> — tłumaczenie ruszy samo. Kliknij jeszcze raz, żeby wyłączyć.",
      f1h: "Otwórz stronę dodatków",
      f1p: "Skopiuj adres, wklej go w pasek adresu ① i naciśnij Enter. Potem kliknij „Tymczasowo wczytaj dodatek…” ②.",
      f2h: "Wybierz pobrane archiwum", f2p: "Wybierz <b>tolk-firefox.zip</b> — pojawi się karta „Tolk — tłumaczenie karty na żywo”.",
      f3p: "Ikona puzzla ① → „⋯” przy Tolk ② → „Przypnij do paska narzędzi” ③.",
      ff_temp: "Firefox usuwa taki dodatek po ponownym uruchomieniu — wtedy powtórz kroki 1–2, to pół minuty. Wkrótce Tolk pojawi się w katalogu dodatków Firefoksa i będzie instalowany na stałe.",
      tip: "Najprościej z programu: Tolk → „Tłumaczenie i dźwięk” → „Jedna karta przeglądarki” → „Podłącz”. Tolk sam skopiuje adresy i ścieżkę do folderu i odhaczy gotowe kroki.",
      q_h: "Jeśli coś nie działa", q1: "Błąd pliku manifestu przy wczytywaniu",
      a1: "Wybrano samo archiwum albo zły folder. Najpierw rozpakuj archiwum, potem wybierz folder <b>tolk-chrome</b> — bezpośrednio w nim musi leżeć plik manifest.json.",
      q2: "Na ikonie jest „!”", a2: "Tolk nie jest uruchomiony na komputerze. Otwórz program i kliknij ikonę jeszcze raz.",
      q3: "Jak zaktualizować rozszerzenie?",
      a3: "Jeśli rozszerzenie zainstalował program, Tolk aktualizuje je sam. W innym razie pobierz archiwum ponownie, podmień pliki w folderze tolk-chrome i kliknij ↻ przy Tolk na stronie rozszerzeń. W Firefoksie po prostu wczytaj nowe archiwum.",
      q4: "A Safari?", a4: "Rozszerzenia do Safari jeszcze nie ma. Bez rozszerzenia Tolk też tłumaczy: w Tolk → „Czego słuchać” wybierz przeglądarkę albo dźwięk komputera.",
      q5: "Czy to bezpieczne?",
      a5: "Rozszerzenie włącza się tylko po kliknięciu ikony i przekazuje dźwięk tej karty wyłącznie do programu Tolk na tym samym komputerze. Nie zbiera historii ani danych i niczego nie wysyła do internetu. Więcej — <a class=\"link\" href=\"privacy.html\">prywatność</a>.",
      help: "Pomoc · @sethosint", copy: "Skopiowano",
    },
    de: {
      title: "Tolk — Browser-Erweiterung", k: "Browser-Erweiterung", h1: "Übersetze <em>nur einen Tab.</em>",
      lede: "Klick auf das Tolk-Symbol im Tab mit deiner Vorlesung — Tolk übersetzt nur den Ton dieses Tabs. Musik und andere Tabs stören nicht.",
      safe: "Kostenlos. Nichts geht ins Internet: Der Ton geht nur an die Tolk-App auf diesem Computer.",
      need: "Die Tolk-App muss laufen. Noch nicht installiert? <a class=\"link\" href=\"./\">Tolk herunterladen</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Yandex", dl_ch: "Erweiterung herunterladen", dl_ff: "Für Firefox herunterladen",
      ff_nozip: "tolk-firefox.zip · nicht entpacken",
      c1h: "Archiv entpacken",
      c1p: "Windows: Rechtsklick auf das Archiv → „Alle extrahieren“. Mac: Doppelklick. Es entsteht der Ordner <b>tolk-chrome</b> — lass ihn liegen, z. B. in „Dokumente“: Der Browser lädt die Erweiterung von dort.",
      c2h: "Erweiterungsseite öffnen",
      c2p: "Kopiere die Adresse deines Browsers, füge sie in die Adressleiste ein ① und drück Enter. Schalte oben rechts den „Entwicklermodus“ ein ② (in Edge links, im Menü).",
      yandex: "Yandex", c3h: "Tolk-Ordner laden",
      c3p: "Klick auf „Entpackte Erweiterung laden“ und wähl den Ordner <b>tolk-chrome</b> — den, in dem die Datei manifest.json liegt.",
      c4h: "Fertig — die Erweiterung ist installiert",
      c4p: "Es erscheint die Karte „Tolk — Tab live übersetzen“. Stattdessen ein Fehler? Schau unten bei den Fragen.",
      c5h: "Symbol anheften",
      c5p: "Puzzle-Symbol ① → drei Punkte bei Tolk ② → „An Symbolleiste anpinnen“ ③. Jetzt ist das Tolk-Symbol immer griffbereit.",
      on_h: "In der Vorlesung einschalten",
      on_p: "Starte Tolk, öffne den Tab mit der Vorlesung oder dem Call und klick auf das Tolk-Symbol. Es erscheint <b>ON</b> — die Übersetzung startet von selbst. Noch ein Klick schaltet sie aus.",
      f1h: "Add-on-Seite öffnen",
      f1p: "Kopiere die Adresse, füge sie in die Adressleiste ein ① und drück Enter. Klick dann auf „Temporäres Add-on laden…“ ②.",
      f2h: "Heruntergeladenes Archiv wählen", f2p: "Wähl <b>tolk-firefox.zip</b> — die Karte „Tolk — Tab live übersetzen“ erscheint.",
      f3p: "Puzzle-Symbol ① → „⋯“ bei Tolk ② → „An Symbolleiste anheften“ ③.",
      ff_temp: "Firefox entfernt so ein Add-on beim Neustart — dann wiederhol die Schritte 1–2, das dauert eine halbe Minute. Bald gibt es Tolk im Add-on-Katalog von Firefox, dann bleibt es dauerhaft installiert.",
      tip: "Am einfachsten aus der App: Tolk → „Übersetzung &amp; Ton“ → „Ein Browser-Tab“ → „Verbinden“. Tolk kopiert die Adressen und den Ordnerpfad für dich und hakt erledigte Schritte ab.",
      q_h: "Wenn etwas nicht klappt", q1: "Fehler zur Manifest-Datei beim Laden",
      a1: "Du hast das Archiv selbst oder den falschen Ordner gewählt. Entpack zuerst das Archiv und wähl dann den Ordner <b>tolk-chrome</b> — direkt darin muss die Datei manifest.json liegen.",
      q2: "Auf dem Symbol steht „!“", a2: "Tolk läuft nicht auf dem Computer. Öffne die App und klick noch einmal auf das Symbol.",
      q3: "Wie aktualisiere ich die Erweiterung?",
      a3: "Hast du sie aus der App installiert, aktualisiert Tolk sie selbst. Sonst lade das Archiv neu herunter, ersetze die Dateien im Ordner tolk-chrome und klick auf der Erweiterungsseite bei Tolk auf ↻. In Firefox lädst du einfach das neue Archiv.",
      q4: "Und Safari?", a4: "Eine Safari-Erweiterung gibt es noch nicht. Tolk übersetzt auch ohne: Wähl in Tolk → „Was gehört wird“ den Browser oder den Ton des Computers.",
      q5: "Ist das sicher?",
      a5: "Die Erweiterung schaltet sich nur per Klick aufs Symbol ein und gibt den Ton dieses Tabs nur an die Tolk-App auf demselben Computer. Sie sammelt keinen Verlauf und keine Daten und sendet nichts ins Internet. Mehr dazu: <a class=\"link\" href=\"privacy.html\">Datenschutz</a>.",
      help: "Hilfe · @sethosint", copy: "Kopiert",
    },
    cs: {
      title: "Tolk — rozšíření pro prohlížeč", k: "Rozšíření pro prohlížeč", h1: "Překládejte <em>jednu kartu.</em>",
      lede: "Klikněte na ikonu Tolk na kartě s přednáškou — Tolk překládá jen její zvuk. Hudba a jiné karty neruší.",
      safe: "Zdarma. Nic neodchází do internetu: zvuk jde jen do programu Tolk v tomto počítači.",
      need: "Potřebujete spuštěný program Tolk. Ještě ho nemáte? <a class=\"link\" href=\"./\">Stáhnout Tolk</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Yandex", dl_ch: "Stáhnout rozšíření", dl_ff: "Stáhnout pro Firefox",
      ff_nozip: "tolk-firefox.zip · není třeba rozbalovat",
      c1h: "Rozbalte archiv",
      c1p: "Windows: pravým tlačítkem na archiv → „Extrahovat vše“. Mac: dvojklik. Vznikne složka <b>tolk-chrome</b> — nechte ji na místě, třeba v „Dokumentech“: prohlížeč z ní rozšíření načítá.",
      c2h: "Otevřete stránku rozšíření",
      c2p: "Zkopírujte adresu svého prohlížeče, vložte ji do adresního řádku ① a stiskněte Enter. Vpravo nahoře zapněte „Režim pro vývojáře“ ② (v Edge je vlevo, v nabídce).",
      yandex: "Yandex", c3h: "Načtěte složku Tolk",
      c3p: "Klikněte na „Načíst rozbalené“ a vyberte složku <b>tolk-chrome</b> — tu, ve které je soubor manifest.json.",
      c4h: "Hotovo — rozšíření je nainstalované",
      c4p: "Objeví se karta „Tolk — živý překlad karty“. Místo ní chyba? Podívejte se na otázky níže.",
      c5h: "Připněte ikonu",
      c5p: "Ikona puzzle ① → tři tečky u Tolk ② → „Připnout na lištu“ ③. Ikona Tolk je teď vždy po ruce.",
      on_h: "Zapněte na přednášce",
      on_p: "Spusťte Tolk, otevřete kartu s přednáškou nebo hovorem a klikněte na ikonu Tolk. Objeví se <b>ON</b> — překlad se spustí sám. Dalším kliknutím ho vypnete.",
      f1h: "Otevřete stránku doplňků",
      f1p: "Zkopírujte adresu, vložte ji do adresního řádku ① a stiskněte Enter. Pak klikněte na „Načíst dočasný doplněk…“ ②.",
      f2h: "Vyberte stažený archiv", f2p: "Vyberte <b>tolk-firefox.zip</b> — objeví se karta „Tolk — živý překlad karty“.",
      f3p: "Ikona puzzle ① → „⋯“ u Tolk ② → „Připnout na lištu“ ③.",
      ff_temp: "Firefox takový doplněk po restartu odebere — pak zopakujte kroky 1–2, je to půl minuty. Brzy bude Tolk v katalogu doplňků Firefoxu a nainstaluje se natrvalo.",
      tip: "Nejjednodušší je to z programu: Tolk → „Překlad a zvuk“ → „Jedna karta prohlížeče“ → „Připojit“. Tolk sám zkopíruje adresy i cestu ke složce a odškrtne hotové kroky.",
      q_h: "Když něco nejde", q1: "Chyba souboru manifestu při načítání",
      a1: "Vybrali jste samotný archiv nebo špatnou složku. Nejdřív archiv rozbalte, pak vyberte složku <b>tolk-chrome</b> — přímo v ní musí být soubor manifest.json.",
      q2: "Na ikoně je „!“", a2: "Tolk na počítači neběží. Otevřete program a klikněte na ikonu znovu.",
      q3: "Jak rozšíření aktualizovat?",
      a3: "Pokud ho nainstaloval program, Tolk ho aktualizuje sám. Jinak archiv stáhněte znovu, nahraďte soubory ve složce tolk-chrome a na stránce rozšíření klikněte u Tolk na ↻. Ve Firefoxu prostě načtěte nový archiv.",
      q4: "A Safari?", a4: "Rozšíření pro Safari zatím není. Tolk překládá i bez něj: v Tolk → „Co poslouchat“ vyberte prohlížeč nebo zvuk počítače.",
      q5: "Je to bezpečné?",
      a5: "Rozšíření se zapne jen kliknutím na ikonu a zvuk této karty předává jen programu Tolk v tomtéž počítači. Nesbírá historii ani data a nic neposílá do internetu. Více — <a class=\"link\" href=\"privacy.html\">ochrana soukromí</a>.",
      help: "Pomoc · @sethosint", copy: "Zkopírováno",
    },
    sk: {
      title: "Tolk — rozšírenie pre prehliadač", k: "Rozšírenie pre prehliadač", h1: "Prekladajte <em>jednu kartu.</em>",
      lede: "Kliknite na ikonu Tolk na karte s prednáškou — Tolk prekladá len jej zvuk. Hudba a iné karty nerušia.",
      safe: "Zadarmo. Nič neodchádza na internet: zvuk ide len do programu Tolk v tomto počítači.",
      need: "Potrebujete spustený program Tolk. Ešte ho nemáte? <a class=\"link\" href=\"./\">Stiahnuť Tolk</a>",
      tab_ch: "Chrome, Edge, Opera, Brave, Yandex", dl_ch: "Stiahnuť rozšírenie", dl_ff: "Stiahnuť pre Firefox",
      ff_nozip: "tolk-firefox.zip · netreba rozbaľovať",
      c1h: "Rozbaľte archív",
      c1p: "Windows: pravým tlačidlom na archív → „Extrahovať všetko“. Mac: dvojklik. Vznikne priečinok <b>tolk-chrome</b> — nechajte ho na mieste, napríklad v „Dokumentoch“: prehliadač z neho rozšírenie načítava.",
      c2h: "Otvorte stránku rozšírení",
      c2p: "Skopírujte adresu svojho prehliadača, vložte ju do panela s adresou ① a stlačte Enter. Vpravo hore zapnite „Režim pre vývojárov“ ② (v Edge je vľavo, v ponuke).",
      yandex: "Yandex", c3h: "Načítajte priečinok Tolk",
      c3p: "Kliknite na „Načítať rozbalené“ a vyberte priečinok <b>tolk-chrome</b> — ten, v ktorom je súbor manifest.json.",
      c4h: "Hotovo — rozšírenie je nainštalované",
      c4p: "Zobrazí sa karta „Tolk — preklad karty“. Namiesto nej chyba? Pozrite si otázky nižšie.",
      c5h: "Pripnite ikonu",
      c5p: "Ikona puzzle ① → tri bodky pri Tolk ② → „Pripnúť na panel s nástrojmi“ ③. Ikona Tolk je teraz vždy po ruke.",
      on_h: "Zapnite na prednáške",
      on_p: "Spustite Tolk, otvorte kartu s prednáškou alebo hovorom a kliknite na ikonu Tolk. Zobrazí sa <b>ON</b> — preklad sa spustí sám. Ďalším kliknutím ho vypnete.",
      f1h: "Otvorte stránku doplnkov",
      f1p: "Skopírujte adresu, vložte ju do panela s adresou ① a stlačte Enter. Potom kliknite na „Načítať dočasný doplnok…“ ②.",
      f2h: "Vyberte stiahnutý archív", f2p: "Vyberte <b>tolk-firefox.zip</b> — zobrazí sa karta „Tolk — preklad karty“.",
      f3p: "Ikona puzzle ① → „⋯“ pri Tolk ② → „Pripnúť na panel nástrojov“ ③.",
      ff_temp: "Firefox taký doplnok po reštarte odstráni — potom zopakujte kroky 1–2, je to pol minúty. Čoskoro bude Tolk v katalógu doplnkov Firefoxu a nainštaluje sa natrvalo.",
      tip: "Najjednoduchšie je to z programu: Tolk → „Preklad a zvuk“ → „Jedna karta prehliadača“ → „Pripojiť“. Tolk sám skopíruje adresy aj cestu k priečinku a odškrtne hotové kroky.",
      q_h: "Keď niečo nejde", q1: "Chyba súboru manifestu pri načítaní",
      a1: "Vybrali ste samotný archív alebo nesprávny priečinok. Najprv archív rozbaľte, potom vyberte priečinok <b>tolk-chrome</b> — priamo v ňom musí byť súbor manifest.json.",
      q2: "Na ikone je „!“", a2: "Tolk v počítači nebeží. Otvorte program a kliknite na ikonu znova.",
      q3: "Ako rozšírenie aktualizovať?",
      a3: "Ak ho nainštaloval program, Tolk ho aktualizuje sám. Inak archív stiahnite znova, nahraďte súbory v priečinku tolk-chrome a na stránke rozšírení kliknite pri Tolk na ↻. Vo Firefoxe jednoducho načítajte nový archív.",
      q4: "A Safari?", a4: "Rozšírenie pre Safari zatiaľ nie je. Tolk prekladá aj bez neho: v Tolk → „Čo počúvať“ vyberte prehliadač alebo zvuk počítača.",
      q5: "Je to bezpečné?",
      a5: "Rozšírenie sa zapne len kliknutím na ikonu a zvuk tejto karty odovzdáva len programu Tolk v tom istom počítači. Nezbiera históriu ani údaje a nič neposiela na internet. Viac — <a class=\"link\" href=\"privacy.html\">ochrana súkromia</a>.",
      help: "Pomoc · @sethosint", copy: "Skopírované",
    },
  };
  window.TOLK_EXT = T;                                       // для проверки текстов (tests/test_site.py)

  function pickLang() {                                      // так же, как на главной (site.js)
    const q = new URLSearchParams(location.search).get("lang");
    if (LANGS.includes(q)) return q;
    try { const s = localStorage.getItem("tolk-lang"); if (LANGS.includes(s)) return s; } catch (e) { /* без хранилища */ }
    const MAP = { ru: "ru", be: "ru", kk: "ru", uk: "uk", pl: "pl", de: "de", cs: "cs", sk: "sk" };
    const list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]);
    for (const [i, x] of list.entries()) {
      const c = MAP[String(x || "").slice(0, 2).toLowerCase()];
      if (c && (i <= 1 || c === "ru" || c === "uk")) return c;
    }
    return "en";
  }
  const lang = pickLang();
  const $$ = (s) => [...document.querySelectorAll(s)];
  document.documentElement.lang = lang;
  if (lang !== "ru") {
    document.title = T[lang].title;
    $$("[data-t]").forEach((el) => { const v = T[lang][el.dataset.t]; if (v != null) el.innerHTML = v; });
  }
  $$(".ext-langs button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
    b.addEventListener("click", () => {
      try { localStorage.setItem("tolk-lang", b.dataset.lang); } catch (e) { /* без хранилища */ }
      const u = new URL(location.href);
      u.searchParams.set("lang", b.dataset.lang);
      location.href = u.toString();
    });
  });

  // снимки на языке страницы; ошибка манифеста снята только в русском Chrome — в остальных без снимка
  const ff = lang === "ru" || lang === "uk" ? "ru" : "en";
  $$("img[data-img], img[data-ff]").forEach((im) => {
    if (im.dataset.img === "cerr" && lang !== "ru") { im.closest(".ext-shot").remove(); return; }
    const src = im.dataset.img ? `img/ext/${lang}/${im.dataset.img}.webp` : `img/ext/ff-${ff}/${im.dataset.ff}.webp`;
    im.src = src;
    const a = im.closest("a");
    if (a) a.href = src;
    const h = im.closest("li") && im.closest("li").querySelector("h2");
    im.alt = h ? h.textContent : "";
  });

  // Chrome и другие / Firefox
  const tabs = $$(".ext-tabs button");
  function show(b) {
    tabs.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.b === b)));
    $$("[data-pane]").forEach((p) => { p.hidden = p.dataset.pane !== b; });
  }
  tabs.forEach((x) => x.addEventListener("click", () => {
    show(x.dataset.b);
    history.replaceState(null, "", x.dataset.b === "ff" ? "#firefox" : location.pathname + location.search);
  }));
  show(location.hash === "#firefox" || /Firefox\//.test(navigator.userAgent) ? "ff" : "ch");

  // адреса страниц расширений: chrome://… по ссылке не открыть — копируем
  $$("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    const lab = b.querySelector("b"), was = lab.innerHTML;
    const done = () => { b.classList.add("done"); lab.textContent = T[lang].copy; setTimeout(() => { b.classList.remove("done"); lab.innerHTML = was; }, 1600); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(b.dataset.copy).then(done, () => {});
  }));
})();
