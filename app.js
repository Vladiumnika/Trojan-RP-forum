const translations = {
  ru: {
    title: "Prestige RolePlay",
    subtitle: "Форум",
    language: "Язык",
    themeToggle: "Тема",
    categories: "Категории",
    subforums: "Подфорумы",
    subforumsCount: "подфорумов",
    addCategory: "Добавить категорию",
    addSubcategory: "Добавить подфорум",
    newCategory: "Новая категория",
    newSubcategory: "Новый подфорум",
    cancel: "Отмена",
    create: "Создать",
    threads: "Темы",
    back: "Назад",
    addThread: "Создать тему",
    newThread: "Новая тема",
    threadTitlePh: "Заголовок",
    threadContentPh: "Содержание",
    authorPh: "Автор",
    publish: "Опубликовать",
    posts: "Публикации",
    newPost: "Новая публикация",
    reply: "Ответить",
    captchaSolve: "Решите капчу",
    captchaRefresh: "Обновить",
    footer: "Prestige RolePlay • GTA RolePlay",
    empty: "Нет записей",
    threadsCount: "тем",
    postsCount: "постов",
    login: "Вход",
    register: "Регистрация",
    logout: "Выход",
    admin: "Админ",
    emailPh: "Email",
    usernamePh: "Имя пользователя",
    passwordPh: "Пароль",
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    registerNote: "Проверьте почту для подтверждения регистрации",
    adminPanel: "Админ панель",
    adminCategories: "Категории",
    add: "Добавить",
    close: "Закрыть",
    categoryNamePh: "Название категории",
    apiError: "Ошибка API",
    adminOnly: "Только админ может добавлять категории"
    ,
    resetPassword: "Восстановление пароля",
    send: "Отправить",
    changePassword: "Смена пароля",
    tokenPh: "Токен",
    newPasswordPh: "Новый пароль",
    searchPh: "Поиск",
    search: "Поиск",
    prev: "Назад",
    next: "Вперед",
    edit: "Редактировать",
    delete: "Удалить",
    save: "Сохранить",
    editThread: "Редактирование темы",
    editPost: "Редактирование публикации",
    users: "Пользователи",
    ban: "Бан",
    unban: "Снять бан",
    setModerator: "Модератор",
    setUser: "Пользователь",
    setAdmin: "Назначить админа",
    lock: "Заблокировать",
    unlock: "Разблокировать",
    pin: "Закрепить",
    unpin: "Открепить",
    pinned: "Закреплено",
    locked: "Заблокировано",
    likes: "Лайки",
    bannedLabel: "Забанен",
    profile: "Профиль",
    profileTitle: "Профиль",
    notifications: "Уведомления по email",
    tagsPh: "Теги (через запятую)",
    tagsEditPh: "Теги (через запятую)",
    copyright: "© {year} {brand}. Все права защищены.",
    adminDiagSMTP: "Диагностика SMTP",
    adminDiagDB: "Диагностика БД",
    exportDB: "Экспорт базы",
    importDB: "Импорт базы",
    chooseFile: "Избери файл",
    dbLabel: "База данных",
    dbMySQL: "MySQL",
    dbJSON: "JSON",
    dbJSONFallback: "JSON (временный режим)"
    ,
    dbJSONWorkingNote: "Для ясности: база данных — JSON. Пишет, что отключена, но работает."
    ,
    resendConfirm: "Отправить повторно подтверждение",
    resendConfirmSent: "Письмо с подтверждением отправлено, если аккаунт не подтвержден",
    smtpDisabledNote: "SMTP не настроен: регистрация пройдет, но письмо не придет. После настройки используйте кнопку 'Отправить повторно подтверждение'."
    ,
    confirmEmail: "Подтвердить email",
    emailUnconfirmed: "email не подтвержден",
    twofa: "Двухфакторная защита",
    enable2fa: "Включить 2FA (Google Authenticator)",
    disable2fa: "Выключить 2FA",
    twofaSetupTitle: "Настройка 2FA",
    twofaScanNote: "Сканируйте QR в Google Authenticator или введите секрет вручную.",
    twofaCodePh: "TOTP код",
    twofaEnabledNote: "2FA включен",
    twofaRequired: "Требуется 2FA код",
    loginWarning: "Администрация никогда не пришлет ссылку на авторизацию и не запросит ваши данные для входа.",
    newPostInThread: "Новый пост в теме: {title}",
    latestPosts: "Последние публикации",
    by: "от",
    in: "в",
    quote: "Цитировать",
    report: "Пожаловаться",
    views: "Просмотры",
    support: "Поддержка",
    group: "Группа",
    logoutAll: "Выход со всех устройств",
    discord: "Discord",
    themeSettings: "Настройки темы",
    themePrimary: "Основной цвет",
    themeAccent: "Акцент",
    themeBg: "Фон",
    themeText: "Текст",
    themeBorder: "Рамка",
    save: "Сохранить",
    themePresets: "Пресеты",
    presetDark: "Темная",
    presetLight: "Светла",
    presetOcean: "Океан",
    presetSolar: "Солнечная",
    pinned: "Закреплено",
    statusOpen: "Открыта",
    statusInProgress: "В процессе",
    statusApproved: "Одобрена",
    statusRejected: "Отклонена",
    statusClosed: "Закрыта",
    statusReview: "На рассмотрении",
    templateNone: "Без шаблона",
    templateReport: "Жалба / Репорт (Report)",
    templateApplication: "Заявление (Application)",
    templateBanAppeal: "Апел на бан (Unban)",
    templateWarnAppeal: "Апел на предупреждение",
    templateSuggestion: "Предложение",
    templateBug: "Bug Report / Ошибка",
    templateWhitelist: "Whitelist заявка",
    templateComplaint: "Жалба на Администрацию",
    templateFactionApp: "Заявка за фракцию",
    threadStatusLabel: "Статус темы",
    threadTemplateLabel: "Шаблон",
    editThreadStatusLabel: "Статус",
    reputation: "Репутация",
    reputationPoints: "Репутационные очки",
    warnings: "Предупреждения",
    warnCount: "Предупреждений",
    warnPoints: "Очков",
    warnReason: "Причина",
    warnBy: "Выдано",
    warnDate: "Дата",
    warnExpired: "Истекло",
    warnActive: "Активно",
    addWarn: "Выдать варн",
    addReputation: "+ Репутация",
    removeReputation: "- Репутация",
    adminInstallRp: "Установить CRMP Standard",
    adminRpInstalled: "CRMP Standard категории установлены",
    adminRpInstallNote: "Устанавливает стандартные разделы CRMP/RP форума",
    roleChange: "Сменить роль",
    warnDialogTitle: "Выдать предупреждение",
    warnDialogReason: "Причина предупреждения",
    warnDialogPoints: "Очки (1-3)",
    repDialogTitle: "Изменить репутацию",
    repDialogReason: "Причина",
    repDialogPoints: "Очки (отрицательное для снятия)",
    reputationPositive: "Положительная репутация",
    reputationNegative: "Отрицательная репутация",
    warnLevelHigh: "Критично - опасность бана!",
    warnLevelMid: "Средний уровень",
    warnLevelLow: "Хорошо",
    maxWarnReached: "Достигнут лимит предупреждений (3/3)",
    postReputation: "Репутация за пост",
    approveApplication: "Одобрить",
    rejectApplication: "Отклонить",
    viewCount: "Просмотров"
  },
  kk: {
    title: "Prestige RolePlay",
    subtitle: "Форум",
    language: "Тіл",
    themeToggle: "Тема",
    categories: "Санаттар",
    subforums: "Ішкі санаттар",
    subforumsCount: "ішкі санат",
    addCategory: "Санат қосу",
    addSubcategory: "Ішкі санат қосу",
    newCategory: "Жаңа санат",
    newSubcategory: "Жаңа ішкі санат",
    cancel: "Болдырмау",
    create: "Құру",
    threads: "Тақырыптар",
    back: "Артқа",
    addThread: "Тақырып құру",
    newThread: "Жаңа тақырып",
    threadTitlePh: "Тақырып",
    threadContentPh: "Мазмұн",
    authorPh: "Автор",
    publish: "Жариялау",
    posts: "Посттар",
    newPost: "Жаңа пост",
    reply: "Жауап беру",
    captchaSolve: "Капчаны шешіңіз",
    captchaRefresh: "Жаңарту",
    footer: "Prestige RolePlay • GTA RolePlay",
    empty: "Жазбалар жоқ",
    threadsCount: "тақырып",
    postsCount: "пост",
    login: "Кіру",
    register: "Тіркелу",
    logout: "Шығу",
    admin: "Әкімші",
    emailPh: "Email",
    usernamePh: "Пайдаланушы",
    passwordPh: "Құпиясөз",
    loginTitle: "Кіру",
    registerTitle: "Тіркелу",
    registerNote: "Растау үшін поштаны тексеріңіз",
    adminPanel: "Әкімші панелі",
    adminCategories: "Санаттар",
    add: "Қосу",
    close: "Жабу",
    categoryNamePh: "Санат атауы",
    apiError: "API қателігі",
    adminOnly: "Санатты тек әкімші қоса алады"
    ,
    resetPassword: "Құпиясөзді қалпына келтіру",
    send: "Жіберу",
    changePassword: "Құпиясөзді өзгерту",
    tokenPh: "Token",
    newPasswordPh: "Жаңа құпиясөз",
    searchPh: "Іздеу",
    search: "Іздеу",
    prev: "Артқа",
    next: "Алға",
    edit: "Өңдеу",
    delete: "Жою",
    save: "Сақтау",
    editThread: "Тақырыпты өңдеу",
    editPost: "Постты өңдеу",
    users: "Пайдаланушылар",
    ban: "Бан",
    unban: "Баннан алу",
    setModerator: "Модератор",
    setUser: "Пайдаланушы",
    setAdmin: "Админ ету",
    lock: "Блоктау",
    unlock: "Блоктан шығару",
    pin: "Бекіту",
    unpin: "Бекітуді алу",
    locked: "Блокталған",
    likes: "Лайк",
    bannedLabel: "Бан",
    profile: "Профиль",
    profileTitle: "Профиль",
    notifications: "Email хабарламалар",
    tagsPh: "Тегтер (үтірмен бөлінген)",
    tagsEditPh: "Тегтер (үтірмен бөлінген)",
    copyright: "© {year} {brand}. Барлық құқықтар қорғалған.",
    adminDiagSMTP: "SMTP диагностикасы",
    adminDiagDB: "DB диагностикасы",
    exportDB: "Базаны экспорттау",
    importDB: "Базаны импорттау",
    chooseFile: "Файл таңдау",
    dbLabel: "Дерекқор",
    dbMySQL: "MySQL",
    dbJSON: "JSON",
    dbJSONFallback: "JSON (уақытша режим)"
    ,
    dbJSONWorkingNote: "Түсінікті болу үшін: дерекқор JSON. Өшірілген деп жазылғанымен, жұмыс істейді."
    ,
    resendConfirm: "Қайта растауды жіберу",
    resendConfirmSent: "Растау хаты жіберілді (егер аккаунт расталмаған болса)",
    smtpDisabledNote: "SMTP бапталмаған: тіркелу орындалады, бірақ хат келмейді. Баптаудан кейін 'Қайта растауды жіберу' түймесін қолданыңыз."
    ,
    confirmEmail: "Email-ді растау",
    emailUnconfirmed: "email расталмаған",
    twofa: "Екі факторлы қорғау",
    enable2fa: "2FA қосу (Google Authenticator)",
    disable2fa: "2FA болдырмау",
    twofaSetupTitle: "2FA баптау",
    twofaScanNote: "Google Authenticator-де QR скандеңіз немесе құпияны қолмен енгізіңіз.",
    twofaCodePh: "TOTP код",
    twofaEnabledNote: "2FA қосылған",
    twofaRequired: "2FA коды қажет",
    loginWarning: "Әкімшілік ешқашан авторизация сілтемесін жібермейді және кіру деректеріңізді сұрамайды.",
    newPostInThread: "Жаңа пост: {title}",
    latestPosts: "Соңғы посттар",
    by: "автор",
    in: "тақырыпта",
    quote: "Дәйексөз",
    report: "Шағымдану",
    views: "Қаралымдар",
    support: "Қолдау",
    group: "Топ",
    logoutAll: "Барлық құрылғылардан шығу",
    discord: "Discord",
    themeSettings: "Тақырып баптауы",
    themePrimary: "Негізгі түс",
    themeAccent: "Акцент",
    themeBg: "Фон",
    themeText: "Мәтін",
    themeBorder: "Шекара",
    save: "Сақтау"
    ,
    pinned: "Бекітілген",
    statusOpen: "Ашық",
    statusInProgress: "Өңделуде",
    statusApproved: "Қабылданған",
    statusRejected: "Кекстерілген",
    statusClosed: "Жабылған",
    statusReview: "Қаралуда",
    templateNone: "Үлгі жоқ",
    templateReport: "Шағым / Репорт (Report)",
    templateApplication: "Өтініш (Application)",
    templateBanAppeal: "Баннан апел (Unban)",
    templateWarnAppeal: "Ескерту апелі",
    templateSuggestion: "Ұсыныс",
    templateBug: "Bug Report / Қате",
    templateWhitelist: "Whitelist өтініш",
    templateComplaint: "Әкімшілікке шағым",
    templateFactionApp: "Фракцияға өтініш",
    threadStatusLabel: "Тақырып статусы",
    threadTemplateLabel: "Үлгі",
    editThreadStatusLabel: "Статус",
    reputation: "Репутация",
    reputationPoints: "Репутация ұпайлары",
    warnings: "Ескертулер",
    warnCount: "Ескерту",
    warnPoints: "Ұпай",
    warnReason: "Себеп",
    warnBy: "Берген",
    warnDate: "Күні",
    warnExpired: "Аяқталған",
    warnActive: "Белсенді",
    addWarn: "Варн беру",
    addReputation: "+ Репутация",
    removeReputation: "- Репутация",
    adminInstallRp: "CRMP Standard орнату",
    adminRpInstalled: "CRMP Standard категориялар орнатылды",
    adminRpInstallNote: "CRMP/RP стандартты бөлімдерді орнатады",
    roleChange: "Рөлді өзгерту",
    warnDialogTitle: "Ескерту беру",
    warnDialogReason: "Ескерту себебі",
    warnDialogPoints: "Ұпай (1-3)",
    repDialogTitle: "Репутацияны өзгерту",
    repDialogReason: "Себеп",
    repDialogPoints: "Ұпай (алыну үшін теріс)",
    reputationPositive: "Оң репутация",
    reputationNegative: "Теріс репутация",
    warnLevelHigh: "Қауіпті - бан қаупі!",
    warnLevelMid: "Орта деңгей",
    warnLevelLow: "Жақсы",
    maxWarnReached: "Ескерту шектері жетті (3/3)",
    postReputation: "Пост үшін репутация",
    approveApplication: "Қабылдау",
    rejectApplication: "Кестеру",
    viewCount: "Көрілім"
  },
  uk: {
    title: "Prestige RolePlay",
    subtitle: "Форум",
    language: "Мова",
    themeToggle: "Тема",
    categories: "Категорії",
    subforums: "Підфоруми",
    subforumsCount: "підфорумів",
    addCategory: "Додати категорію",
    addSubcategory: "Додати підфорум",
    newCategory: "Нова категорія",
    newSubcategory: "Новий підфорум",
    cancel: "Скасувати",
    create: "Створити",
    threads: "Теми",
    back: "Назад",
    addThread: "Створити тему",
    newThread: "Нова тема",
    threadTitlePh: "Назва",
    threadContentPh: "Вміст",
    authorPh: "Автор",
    publish: "Опублікувати",
    posts: "Публікації",
    newPost: "Нова публікація",
    reply: "Відповісти",
    captchaSolve: "Розв'яжіть капчу",
    captchaRefresh: "Оновити",
    footer: "Prestige RolePlay • GTA RolePlay",
    empty: "Немає записів",
    threadsCount: "тем",
    postsCount: "постів",
    login: "Вхід",
    register: "Реєстрація",
    logout: "Вихід",
    admin: "Адмін",
    emailPh: "Email",
    usernamePh: "Користувач",
    passwordPh: "Пароль",
    loginTitle: "Вхід",
    registerTitle: "Реєстрація",
    registerNote: "Перевірте пошту для підтвердження",
    adminPanel: "Адмін панель",
    adminCategories: "Категорії",
    add: "Додати",
    close: "Закрити",
    categoryNamePh: "Назва категорії",
    apiError: "Помилка API",
    adminOnly: "Лише адмін може додавати категорії"
    ,
    resetPassword: "Відновлення пароля",
    send: "Надіслати",
    changePassword: "Зміна пароля",
    tokenPh: "Token",
    newPasswordPh: "Новий пароль",
    searchPh: "Пошук",
    search: "Пошук",
    prev: "Назад",
    next: "Вперед",
    edit: "Редагувати",
    delete: "Видалити",
    save: "Зберегти",
    editThread: "Редагування теми",
    editPost: "Редагування публікації",
    users: "Користувачі",
    ban: "Бан",
    unban: "Зняти бан",
    setModerator: "Модератор",
    setUser: "Користувач",
    lock: "Заблокувати",
    unlock: "Розблокувати",
    pin: "Закріпити",
    unpin: "Відкріпити",
    locked: "Заблоковано",
    likes: "Лайки",
    profile: "Профіль",
    profileTitle: "Профіль",
    notifications: "Email сповіщення",
    tagsPh: "Теги (через кому)",
    tagsEditPh: "Теги (через кому)",
    copyright: "© {year} {brand}. Усі права захищені.",
    adminDiagSMTP: "Діагностика SMTP",
    adminDiagDB: "Діагностика БД",
    exportDB: "Експорт бази",
    importDB: "Імпорт бази",
    chooseFile: "Вибрати файл",
    dbLabel: "База даних",
    dbMySQL: "MySQL",
    dbJSON: "JSON",
    dbJSONFallback: "JSON (тимчасовий режим)"
    ,
    dbJSONWorkingNote: "Для ясності: база даних — JSON. Пише, що вимкнена, але працює."
    ,
    resendConfirm: "Надіслати повторне підтвердження",
    resendConfirmSent: "Лист підтвердження надіслано, якщо акаунт не підтверджений",
    smtpDisabledNote: "SMTP не налаштовано: реєстрація пройде, але лист не прийде. Після налаштування використовуйте 'Надіслати повторне підтвердження'."
    ,
    confirmEmail: "Підтвердити email",
    emailUnconfirmed: "email не підтверджено",
    twofa: "Двофакторний захист",
    enable2fa: "Увімкнути 2FA (Google Authenticator)",
    disable2fa: "Вимкнути 2FA",
    twofaSetupTitle: "Налаштування 2FA",
    twofaScanNote: "Скануйте QR у Google Authenticator або введіть секрет вручну.",
    twofaCodePh: "TOTP код",
    twofaEnabledNote: "2FA увімкнено",
    twofaRequired: "Потрібен 2FA код",
    loginWarning: "Адміністрація ніколи не надішле вам посилання на авторизацію та не попросить ваші дані для входу.",
    newPostInThread: "Новий пост у темі: {title}",
    latestPosts: "Останні публікації",
    by: "від",
    in: "в",
    quote: "Цитувати",
    report: "Поскаржитися",
    views: "Перегляди",
    support: "Підтримка",
    group: "Група",
    logoutAll: "Вийти з усіх пристроїв",
    discord: "Discord",
    themeSettings: "Налаштування теми",
    themePrimary: "Основний колір",
    themeAccent: "Акцент",
    themeBg: "Фон",
    themeText: "Текст",
    themeBorder: "Рамка",
    save: "Зберегти",
    themePresets: "Пресети",
    presetDark: "Темна",
    presetLight: "Світла",
    presetOcean: "Океан",
    presetSolar: "Сонячна",
    pinned: "Закріплено",
    statusOpen: "Відкрита",
    statusInProgress: "В процесі",
    statusApproved: "Затверджена",
    statusRejected: "Відхилена",
    statusClosed: "Закрита",
    statusReview: "На розгляді",
    templateNone: "Без шаблону",
    templateReport: "Скарга / Репорт (Report)",
    templateApplication: "Заява (Application)",
    templateBanAppeal: "Апеляція на бан (Unban)",
    templateWarnAppeal: "Апеляція на попередження",
    templateSuggestion: "Пропозиція",
    templateBug: "Bug Report / Помилка",
    templateWhitelist: "Whitelist заявка",
    templateComplaint: "Скарга на Адміністрацію",
    templateFactionApp: "Заявка у фракцію",
    threadStatusLabel: "Статус теми",
    threadTemplateLabel: "Шаблон",
    editThreadStatusLabel: "Статус",
    reputation: "Репутація",
    reputationPoints: "Репутаційні бали",
    warnings: "Попередження",
    warnCount: "Попереджень",
    warnPoints: "Балів",
    warnReason: "Причина",
    warnBy: "Видано",
    warnDate: "Дата",
    warnExpired: "Термін закінчено",
    warnActive: "Активне",
    addWarn: "Видати варн",
    addReputation: "+ Репутація",
    removeReputation: "- Репутація",
    adminInstallRp: "Встановити CRMP Standard",
    adminRpInstalled: "Категорії CRMP Standard встановлено",
    adminRpInstallNote: "Встановлює стандартні розділи CRMP/RP форуму",
    roleChange: "Змінити роль",
    warnDialogTitle: "Видати попередження",
    warnDialogReason: "Причина попередження",
    warnDialogPoints: "Бали (1-3)",
    repDialogTitle: "Змінити репутацію",
    repDialogReason: "Причина",
    repDialogPoints: "Бали (від'ємне для зняття)",
    reputationPositive: "Позитивна репутація",
    reputationNegative: "Негативна репутація",
    warnLevelHigh: "Критично - небезпека бану!",
    warnLevelMid: "Середній рівень",
    warnLevelLow: "Добре",
    maxWarnReached: "Ліміт попереджень досягнуто (3/3)",
    postReputation: "Репутація за пост",
    approveApplication: "Затвердити",
    rejectApplication: "Відхилити",
    viewCount: "Переглядів"
  },
  bg: {
    title: "Prestige RolePlay",
    subtitle: "Форум",
    language: "Език",
    themeToggle: "Тема",
    categories: "Категории",
    subforums: "Подфоруми",
    subforumsCount: "подфорума",
    addCategory: "Добави категория",
    addSubcategory: "Добави подфорум",
    newCategory: "Нова категория",
    newSubcategory: "Нов подфорум",
    cancel: "Отказ",
    create: "Създай",
    threads: "Теми",
    back: "Назад",
    addThread: "Създай тема",
    newThread: "Нова тема",
    threadTitlePh: "Заглавие",
    threadContentPh: "Съдържание",
    authorPh: "Автор",
    publish: "Публикувай",
    posts: "Публикации",
    newPost: "Нова публикация",
    reply: "Отговори",
    captchaSolve: "Решете CAPTCHA",
    captchaRefresh: "Обнови",
    footer: "Prestige RolePlay • GTA RolePlay",
    empty: "Няма записи",
    threadsCount: "теми",
    postsCount: "постове",
    login: "Вход",
    register: "Регистрация",
    logout: "Изход",
    admin: "Админ",
    emailPh: "Email",
    usernamePh: "Потребител",
    passwordPh: "Парола",
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    registerNote: "Провери имейла за потвърждение",
    adminPanel: "Админ панел",
    adminCategories: "Категории",
    add: "Добави",
    close: "Затвори",
    categoryNamePh: "Име на категория",
    apiError: "API грешка",
    adminOnly: "Само админ може да добавя категории"
    ,
    resetPassword: "Възстановяване на парола",
    send: "Изпрати",
    changePassword: "Смяна на парола",
    tokenPh: "Token",
    newPasswordPh: "Нова парола",
    searchPh: "Търсене",
    search: "Търси",
    prev: "Назад",
    next: "Напред",
    edit: "Редакция",
    delete: "Изтриване",
    save: "Запази",
    editThread: "Редакция на тема",
    editPost: "Редакция на публикация",
    users: "Потребители",
    ban: "Бан",
    unban: "Премахни бан",
    setModerator: "Назначи модератор",
    setUser: "Назначи потребител",
    setAdmin: "Назначи администратор",
    lock: "Заключи",
    unlock: "Отключи",
    pin: "Закачи",
    unpin: "Откачи",
    pinned: "Закачено",
    locked: "Заключено",
    likes: "Харесвания",
    bannedLabel: "Блокиран",
    profile: "Профил",
    profileTitle: "Профил",
    notifications: "Уведомления по имейл",
    tagsPh: "Тагове (разделени със запетая)",
    tagsEditPh: "Тагове (разделени със запетая)",
    copyright: "© {year} {brand}. Всички права запазени.",
    adminDiagSMTP: "Диагностика на SMTP",
    adminDiagDB: "Диагностика на база данни",
    exportDB: "Експорт база",
    importDB: "Импорт база",
    chooseFile: "Избери файл",
    dbLabel: "База данни",
    dbMySQL: "MySQL",
    dbJSON: "JSON",
    dbJSONFallback: "JSON (временен режим)"
    ,
    dbJSONWorkingNote: "За яснота: Базата данни е JSON. Пише, че е изключена, но работи."
    ,
    resendConfirm: "Изпрати наново потвърждение",
    resendConfirmSent: "Изпратихме потвърждение, ако акаунтът не е потвърден",
    smtpDisabledNote: "SMTP не е конфигуриран: Регистрацията ще мине, но няма да получиш имейл. След конфигуриране използвай 'Изпрати наново потвърждение'."
    ,
    confirmEmail: "Потвърди имейл",
    emailUnconfirmed: "имейл не е потвърден",
    twofa: "Двуфакторна защита",
    enable2fa: "Включи 2FA (Google Authenticator)",
    disable2fa: "Изключи 2FA",
    twofaSetupTitle: "Настройка на 2FA",
    twofaScanNote: "Сканирай QR в Google Authenticator или въведи секретния ключ ръчно.",
    twofaCodePh: "TOTP код",
    twofaEnabledNote: "2FA е включен",
    twofaRequired: "Изисква се 2FA код"
    ,
    logoutAll: "Изход от всички устройства"
    ,
    newPostInThread: "Нов пост в тема: {title}"
    ,
    loginRequired: "Моля, влез, за да продължиш",
    afterLoginRedirect: "След вход ще те пренасочим",
    latestPosts: "Последни публикации",
    by: "от",
    in: "в",
    loginWarning: "Администрация никога няма да Ви изпрати линк за авторизация, нито да иска данните Ви.",
    quote: "Цитирай",
    report: "Докладвай",
    views: "Преглеждания",
    support: "Поддръжка",
    group: "Група",
    discord: "Discord",
    themeSettings: "Настройки на тема",
    themePrimary: "Основен цвят",
    themeAccent: "Акцент",
    themeBg: "Фон",
    themeText: "Текст",
    themeBorder: "Рамка",
    themePresets: "Пресети",
    presetDark: "Тъмна",
    presetLight: "Светла",
    presetOcean: "Океан",
    presetSolar: "Слънчева",
    pinned: "Закачено",
    statusOpen: "Отворена",
    statusInProgress: "В процес",
    statusApproved: "Одобрена",
    statusRejected: "Отхвърлена",
    statusClosed: "Затворена",
    statusReview: "В преглед",
    templateNone: "Без шаблон",
    templateReport: "Жалба / Репорт (Report)",
    templateApplication: "Заявление (Application)",
    templateBanAppeal: "Апел за бан (Unban)",
    templateWarnAppeal: "Апел за предупреждение",
    templateSuggestion: "Предложение",
    templateBug: "Bug Report / Грешка",
    templateWhitelist: "Whitelist заявка",
    templateComplaint: "Жалба до Администрация",
    templateFactionApp: "Заявка за фракция",
    threadStatusLabel: "Статус на темата",
    threadTemplateLabel: "Шаблон",
    editThreadStatusLabel: "Статус",
    reputation: "Репутация",
    reputationPoints: "Репутационни точки",
    warnings: "Предупреждения",
    warnCount: "Предупреждения",
    warnPoints: "Точки",
    warnReason: "Причина",
    warnBy: "Издадено от",
    warnDate: "Дата",
    warnExpired: "Изтекло",
    warnActive: "Активно",
    addWarn: "Дай предупреждение",
    addReputation: "+ Репутация",
    removeReputation: "- Репутация",
    adminInstallRp: "Инсталирай CRMP Standard",
    adminRpInstalled: "CRMP Standard категории са инсталирани",
    adminRpInstallNote: "Инсталира стандартните раздели на CRMP/RP форум",
    roleChange: "Смени роля",
    warnDialogTitle: "Дай предупреждение",
    warnDialogReason: "Причина за предупреждението",
    warnDialogPoints: "Точки (1-3)",
    repDialogTitle: "Промени репутацията",
    repDialogReason: "Причина",
    repDialogPoints: "Точки (отрицателно за вадене)",
    reputationPositive: "Положителна репутация",
    reputationNegative: "Отрицателна репутация",
    warnLevelHigh: "Критично - опасност от бан!",
    warnLevelMid: "Средно ниво",
    warnLevelLow: "Добре",
    maxWarnReached: "Лимитът на предупрежденията е достигнат (3/3)",
    postReputation: "Репутация за пост",
    approveApplication: "Одобри",
    rejectApplication: "Отхвърли",
    viewCount: "Преглеждания"
  },
  en: {
    title: "Prestige RolePlay",
    subtitle: "Forum",
    language: "Language",
    themeToggle: "Theme",
    categories: "Categories",
    subforums: "Subforums",
    subforumsCount: "subforums",
    addCategory: "Add Category",
    addSubcategory: "Add Subforum",
    newCategory: "New Category",
    newSubcategory: "New Subforum",
    cancel: "Cancel",
    create: "Create",
    threads: "Threads",
    back: "Back",
    addThread: "Create Thread",
    newThread: "New Thread",
    threadTitlePh: "Title",
    threadContentPh: "Content",
    authorPh: "Author",
    publish: "Publish",
    posts: "Posts",
    newPost: "New Post",
    reply: "Reply",
    captchaSolve: "Solve CAPTCHA",
    captchaRefresh: "Refresh",
    footer: "Prestige RolePlay • GTA RolePlay",
    empty: "No records",
    threadsCount: "threads",
    postsCount: "posts",
    login: "Login",
    register: "Register",
    logout: "Logout",
    admin: "Admin",
    emailPh: "Email",
    usernamePh: "Username",
    passwordPh: "Password",
    loginTitle: "Login",
    registerTitle: "Register",
    registerNote: "Check email to confirm registration",
    adminPanel: "Admin Panel",
    adminCategories: "Categories",
    add: "Add",
    close: "Close",
    categoryNamePh: "Category name",
    apiError: "API error",
    adminOnly: "Only admin can add categories"
    ,
    resetPassword: "Password reset",
    send: "Send",
    changePassword: "Change password",
    tokenPh: "Token",
    newPasswordPh: "New password",
    searchPh: "Search",
    search: "Search",
    prev: "Prev",
    next: "Next",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    editThread: "Edit thread",
    editPost: "Edit post",
    users: "Users",
    ban: "Ban",
    unban: "Unban",
    setModerator: "Moderator",
    setUser: "User",
    setAdmin: "Make Admin",
    lock: "Lock",
    unlock: "Unlock",
    pin: "Pin",
    unpin: "Unpin",
    locked: "Locked",
    likes: "Likes",
    bannedLabel: "BANNED",
    profile: "Profile",
    profileTitle: "Profile",
    notifications: "Email notifications",
    tagsPh: "Tags (comma-separated)",
    tagsEditPh: "Tags (comma-separated)",
    copyright: "© {year} {brand}. All rights reserved.",
    adminDiagSMTP: "SMTP Diagnostics",
    adminDiagDB: "DB Diagnostics",
    exportDB: "Export DB",
    importDB: "Import DB",
    chooseFile: "Choose file",
    dbLabel: "Database",
    dbMySQL: "MySQL",
    dbJSON: "JSON",
    dbJSONFallback: "JSON (fallback)"
    ,
    dbJSONWorkingNote: "For clarity: the database is JSON. It says it's disabled, but it works."
    ,
    resendConfirm: "Resend confirmation",
    resendConfirmSent: "Confirmation email sent if the account is unconfirmed",
    smtpDisabledNote: "SMTP is not configured: registration works, but no email will arrive. After configuring, use 'Resend confirmation'."
    ,
    confirmEmail: "Confirm email",
    emailUnconfirmed: "email unconfirmed",
    twofa: "Two-factor auth",
    enable2fa: "Enable 2FA (Google Authenticator)",
    disable2fa: "Disable 2FA",
    twofaSetupTitle: "2FA Setup",
    twofaScanNote: "Scan QR in Google Authenticator or enter the secret manually.",
    twofaCodePh: "TOTP code",
    twofaEnabledNote: "2FA is enabled",
    twofaRequired: "2FA code required"
    ,
    logoutAll: "Logout all devices"
    ,
    newPostInThread: "New post in thread: {title}"
    ,
    loginRequired: "Please log in to continue"
    ,
    afterLoginRedirect: "You will be redirected after login"
    ,
    latestPosts: "Latest posts"
    ,
    by: "by"
    ,
    in: "in"
    ,
    loginWarning: "Administration will never send you an authorization link or ask for your login details.",
    quote: "Quote",
    report: "Report",
    views: "Views",
    support: "Support",
    group: "Group",
    discord: "Discord",
    themeSettings: "Theme Settings",
    themePrimary: "Primary",
    themeAccent: "Accent",
    themeBg: "Background",
    themeText: "Text",
    themeBorder: "Border",
    save: "Save",
    themePresets: "Presets",
    presetDark: "Dark",
    presetLight: "Light",
    presetOcean: "Ocean",
    presetSolar: "Solar",
    pinned: "Pinned",
    statusOpen: "Open",
    statusInProgress: "In Progress",
    statusApproved: "Approved",
    statusRejected: "Rejected",
    statusClosed: "Closed",
    statusReview: "Under Review",
    templateNone: "No template",
    templateReport: "Player Report",
    templateApplication: "Application",
    templateBanAppeal: "Ban Appeal (Unban)",
    templateWarnAppeal: "Warn Appeal",
    templateSuggestion: "Suggestion",
    templateBug: "Bug Report",
    templateWhitelist: "Whitelist Application",
    templateComplaint: "Staff Complaint",
    templateFactionApp: "Faction Application",
    threadStatusLabel: "Thread Status",
    threadTemplateLabel: "Template",
    editThreadStatusLabel: "Status",
    reputation: "Reputation",
    reputationPoints: "Reputation Points",
    warnings: "Warnings",
    warnCount: "Warnings",
    warnPoints: "Points",
    warnReason: "Reason",
    warnBy: "Issued by",
    warnDate: "Date",
    warnExpired: "Expired",
    warnActive: "Active",
    addWarn: "Issue Warn",
    addReputation: "+ Reputation",
    removeReputation: "- Reputation",
    adminInstallRp: "Install CRMP Standard",
    adminRpInstalled: "CRMP Standard categories installed",
    adminRpInstallNote: "Installs standard CRMP/RP forum sections",
    roleChange: "Change Role",
    warnDialogTitle: "Issue Warning",
    warnDialogReason: "Reason for warning",
    warnDialogPoints: "Points (1-3)",
    repDialogTitle: "Modify Reputation",
    repDialogReason: "Reason",
    repDialogPoints: "Points (negative to deduct)",
    reputationPositive: "Positive Reputation",
    reputationNegative: "Negative Reputation",
    warnLevelHigh: "Critical - Ban risk!",
    warnLevelMid: "Moderate Level",
    warnLevelLow: "Good",
    maxWarnReached: "Warning limit reached (3/3)",
    postReputation: "Post Reputation",
    approveApplication: "Approve",
    rejectApplication: "Reject",
    viewCount: "Views"
  }
};

const api = {
  base: (typeof window !== "undefined" && (window.API_BASE || new URLSearchParams(window.location.search).get("apiBase") || (document.querySelector('meta[name="api-base"]') && document.querySelector('meta[name="api-base"]').content))) || "",
  token: localStorage.getItem("auth_token") || "",
  refreshToken: localStorage.getItem("refresh_token") || "",
  setToken(t) { this.token = t; if (t) localStorage.setItem("auth_token", t); else localStorage.removeItem("auth_token"); },
  setRefreshToken(t) { this.refreshToken = t || ""; if (t) localStorage.setItem("refresh_token", t); else localStorage.removeItem("refresh_token"); },
  async refresh() {
    if (!this.refreshToken) { this.setToken(""); return false; }
    try {
      const url = this.base ? `${this.base}/api/auth/refresh` : "/api/auth/refresh";
      const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: this.refreshToken }) });
      if (!r.ok) return false;
      const data = await r.json();
      if (data && data.token) this.setToken(data.token);
      if (data && data.refresh_token) this.setRefreshToken(data.refresh_token);
      return !!(data && data.token);
    } catch { return false; }
  },
  async get(path) {
    const url = this.base ? `${this.base}${path}` : path;
    let r = await fetch(url, { headers: this.token ? { Authorization: `Bearer ${this.token}` } : {} });
    if (r.status === 401) {
      const ok = await this.refresh();
      if (ok) r = await fetch(url, { headers: this.token ? { Authorization: `Bearer ${this.token}` } : {} });
    }
    if (!r.ok) {
      let txt = await r.text();
      try { const j = JSON.parse(txt); if (j.error) txt = j.error; } catch {}
      throw new Error(txt);
    }
    return r.json();
  },
  async post(path, body) {
    const url = this.base ? `${this.base}${path}` : path;
    let r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) },
      body: JSON.stringify(body)
    });
    if (r.status === 401) {
      const ok = await this.refresh();
      if (ok) {
        r = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}) },
          body: JSON.stringify(body)
        });
      }
    }
    if (!r.ok) {
      let txt = await r.text();
      try { const j = JSON.parse(txt); if (j.error) txt = j.error; } catch {}
      throw new Error(txt);
    }
    return r.json();
  }
};
// Normalize base if a stale localhost leaked into client while page runs on non-localhost
if (typeof window !== "undefined") {
  try {
    const host = window.location && window.location.hostname;
    if (typeof api.base === "string" && api.base.includes("__RUNTIME_API_BASE__")) {
      api.base = "";
    }
    if (/localhost|127\.0\.0\.1/.test(api.base) && host && !/localhost|127\.0\.0\.1/.test(host)) {
      api.base = "";
    }
  } catch {}
}

const store = {
  pendingAttachments: [],
  async categories() {
    return api.get("/api/categories");
  },
  async addCategory(name, parent_id) {
    return api.post("/api/categories", { name, parent_id });
  },
  async threadsByCategory(categoryId) {
    return api.get(`/api/categories/${categoryId}/threads`);
  },
  async addThread(categoryId, title, content) {
    return api.post("/api/threads", { categoryId, title, content });
  },
  async postsByThread(threadId) {
    return api.get(`/api/threads/${threadId}/posts`);
  },
  async addPost(threadId, content) {
    const res = await api.post("/api/posts", { threadId, content, attachments: this.pendingAttachments || [] });
    this.pendingAttachments = [];
    return res;
  }
};

function buildCategoryTree(categories) {
  const map = {};
  const tree = [];
  categories.forEach(c => {
    c.children = [];
    map[c.id] = c;
  });
  categories.forEach(c => {
    if (c.parent_id && map[c.parent_id]) {
      map[c.parent_id].children.push(c);
    } else {
      tree.push(c);
    }
  });
  return tree;
}

const ui = {
  state: { lang: "ru", theme: "dark", current: { categoryId: null, threadId: null }, user: null, loginReferrer: null, loginReason: null },
  t(k) {
    const cur = translations[this.state.lang] || translations.ru;
    return (cur && cur[k] !== undefined) ? cur[k] : (translations.ru[k] !== undefined ? translations.ru[k] : k);
  },
  el: {},
  init() {
    this.cache();
    this.loadThemeFromStorage();
    this.bind();
    this.applyLang();
    this.refreshMeta();
    this.restoreAuth();
    this.connectWs();
    this.renderCategories();
    try {
      const params = new URLSearchParams(window.location.search);
      const reason = params.get("reason");
      const refb64 = params.get("referrer");
      let ref = null;
      if (refb64) {
        try { ref = atob(refb64); } catch {}
      }
      if (ref) {
        try {
          const u = new URL(ref, window.location.origin);
          if (u.origin === window.location.origin) this.state.loginReferrer = u.href;
        } catch {}
      }
      if (reason) {
        this.state.loginReason = reason;
        captcha.mount(this.el.loginCaptcha, () => {});
        if (this.el.loginNote) this.el.loginNote.textContent = this.t("loginRequired") + (this.state.loginReferrer ? ` • ${this.t("afterLoginRedirect")}` : "");
        this.el.loginDialog.showModal();
      }
    } catch {}
  },
  cache() {
    this.el.title = document.getElementById("title");
    this.el.subtitle = document.getElementById("subtitle");
    this.el.langLabel = document.getElementById("langLabel");
    this.el.lang = document.getElementById("lang");
    this.el.supportBtn = document.getElementById("supportBtn");
    this.el.groupBtn = document.getElementById("groupBtn");
    this.el.discordBtn = document.getElementById("discordBtn");
    this.el.themeToggle = document.getElementById("themeToggle");
    this.el.themeEditor = document.getElementById("themeEditor");
    this.el.controls = document.getElementById("controls");
    this.el.burgerBtn = document.getElementById("burgerBtn");
    this.el.loginBtn = document.getElementById("loginBtn");
    this.el.registerBtn = document.getElementById("registerBtn");
    this.el.userBadge = document.getElementById("userBadge");
    this.el.headerAvatar = document.getElementById("headerAvatar");
    this.el.logoutBtn = document.getElementById("logoutBtn");
    this.el.adminBtn = document.getElementById("adminBtn");
    this.el.profileBtn = document.getElementById("profileBtn");
    this.el.profileDialog = document.getElementById("profileDialog");
    this.el.profileForm = document.getElementById("profileForm");
    this.el.profileTitle = document.getElementById("profileTitle");
    this.el.profileUsername = document.getElementById("profileUsername");
    this.el.profileNotifications = document.getElementById("profileNotifications");
    this.el.profileNotificationsLabel = document.getElementById("profileNotificationsLabel");
    this.el.avatarUpload = document.getElementById("avatarUpload");
    this.el.profileStatsThreads = document.getElementById("profileStatsThreads");
    this.el.profileStatsPosts = document.getElementById("profileStatsPosts");
    this.el.enable2faBtn = document.getElementById("enable2faBtn");
    this.el.disable2faBtn = document.getElementById("disable2faBtn");
    this.el.logoutAllBtn = document.getElementById("logoutAllBtn");
    this.el.twofaDialog = document.getElementById("twofaDialog");
    this.el.twofaForm = document.getElementById("twofaForm");
    this.el.twofaTitle = document.getElementById("twofaTitle");
    this.el.twofaNote = document.getElementById("twofaNote");
    this.el.twofaSecret = document.getElementById("twofaSecret");
    this.el.twofaUri = document.getElementById("twofaUri");
    this.el.twofaCode = document.getElementById("twofaCode");
    this.el.twofaCancel = document.getElementById("twofaCancel");
    this.el.twofaActivate = document.getElementById("twofaActivate");
    this.el.profileCancel = document.getElementById("profileCancel");
    this.el.saveProfile = document.getElementById("saveProfile");
    this.el.loginDialog = document.getElementById("loginDialog");
    this.el.loginForm = document.getElementById("loginForm");
    this.el.loginCaptcha = document.getElementById("loginCaptcha");
    this.el.loginNote = document.getElementById("loginNote");
    this.el.loginTitle = document.getElementById("loginTitle");
    this.el.loginEmail = document.getElementById("loginEmail");
    this.el.loginPassword = document.getElementById("loginPassword");
    this.el.loginTotp = document.getElementById("loginTotp");
    this.el.loginCancel = document.getElementById("loginCancel");
    this.el.loginResendBtn = document.getElementById("loginResendBtn");
    this.el.loginSubmit = document.getElementById("loginSubmit");
    this.el.registerDialog = document.getElementById("registerDialog");
    this.el.registerForm = document.getElementById("registerForm");
    this.el.registerCaptcha = document.getElementById("registerCaptcha");
    this.el.registerTitle = document.getElementById("registerTitle");
    this.el.registerEmail = document.getElementById("registerEmail");
    this.el.registerUsername = document.getElementById("registerUsername");
    this.el.registerPassword = document.getElementById("registerPassword");
    this.el.registerCancel = document.getElementById("registerCancel");
    this.el.registerSubmit = document.getElementById("registerSubmit");
    this.el.registerNote = document.getElementById("registerNote");
    this.el.resetDialog = document.getElementById("resetDialog");
    this.el.resetForm = document.getElementById("resetForm");
    this.el.resetTitle = document.getElementById("resetTitle");
    this.el.resetEmail = document.getElementById("resetEmail");
    this.el.resetCancel = document.getElementById("resetCancel");
    this.el.resetSubmit = document.getElementById("resetSubmit");
    this.el.resetNote = document.getElementById("resetNote");
    this.el.performResetDialog = document.getElementById("performResetDialog");
    this.el.performResetForm = document.getElementById("performResetForm");
    this.el.performResetTitle = document.getElementById("performResetTitle");
    this.el.performResetToken = document.getElementById("performResetToken");
    this.el.performResetPassword = document.getElementById("performResetPassword");
    this.el.performResetCancel = document.getElementById("performResetCancel");
    this.el.performResetSubmit = document.getElementById("performResetSubmit");
    this.el.categoriesTitle = document.getElementById("categoriesTitle");
    this.el.addCategoryBtn = document.getElementById("addCategoryBtn");
    this.el.addSubcategoryBtn = document.getElementById("addSubcategoryBtn");
    this.el.categoryList = document.getElementById("categoryList");
    this.el.latestPostsSection = document.getElementById("latestPostsSection");
    this.el.latestPostsTitle = document.getElementById("latestPostsTitle");
    this.el.latestPostsList = document.getElementById("latestPostsList");
    this.el.categoryDialog = document.getElementById("categoryDialog");
    this.el.categoryForm = document.getElementById("categoryForm");
    this.el.categoryNameInput = document.getElementById("categoryNameInput");
    this.el.categoryDialogTitle = document.getElementById("categoryDialogTitle");
    this.el.cancelLabel = document.getElementById("cancelLabel");
    this.el.createLabel = document.getElementById("createLabel");
    this.el.cancelLabel2 = document.getElementById("cancelLabel2");
    this.el.publishLabel = document.getElementById("publishLabel");
    this.el.viewCategories = document.getElementById("view-categories");
    this.el.viewThreads = document.getElementById("view-threads");
    this.el.viewPosts = document.getElementById("view-posts");
    this.el.threadsTitle = document.getElementById("threadsTitle");
    this.el.backToCategories = document.getElementById("backToCategories");
    this.el.addThreadBtn = document.getElementById("addThreadBtn");
    this.el.searchInput = document.getElementById("searchInput");
    this.el.searchBtn = document.getElementById("searchBtn");
    this.el.searchMeta = document.getElementById("searchMeta");
    this.el.threadBreadcrumbs = document.getElementById("threadBreadcrumbs");
    this.el.subCategoryList = document.getElementById("subCategoryList");
    this.el.subCategorySidebar = document.getElementById("subCategorySidebar");
    this.el.threadList = document.getElementById("threadList");
    this.el.threadDialog = document.getElementById("threadDialog");
    this.el.threadForm = document.getElementById("threadForm");
    this.el.threadDialogTitle = document.getElementById("threadDialogTitle");
    this.el.threadTitleInput = document.getElementById("threadTitleInput");
    this.el.threadContentInput = document.getElementById("threadContentInput");
    this.el.threadTagsInput = document.getElementById("threadTagsInput");
    this.el.threadAuthorInput = document.getElementById("threadAuthorInput");
    this.el.threadCaptcha = null;
    this.el.editThreadDialog = document.getElementById("editThreadDialog");
    this.el.editThreadForm = document.getElementById("editThreadForm");
    this.el.editThreadTitle = document.getElementById("editThreadTitle");
    this.el.editThreadTitleInput = document.getElementById("editThreadTitleInput");
    this.el.editThreadTagsInput = document.getElementById("editThreadTagsInput");
    this.el.editThreadCancel = document.getElementById("editThreadCancel");
    this.el.editThreadSubmit = document.getElementById("editThreadSubmit");
    this.el.threadsPrev = document.getElementById("threadsPrev");
    this.el.threadsNext = document.getElementById("threadsNext");
    this.el.postsTitle = document.getElementById("postsTitle");
    this.el.backToThreads = document.getElementById("backToThreads");
    this.el.addPostBtn = document.getElementById("addPostBtn");
    this.el.postList = document.getElementById("postList");
    this.el.postDialog = document.getElementById("postDialog");
    this.el.postForm = document.getElementById("postForm");
    this.el.postDialogTitle = document.getElementById("postDialogTitle");
    this.el.postContentInput = document.getElementById("postContentInput");
    this.el.postCaptcha = null;
    this.el.cancelLabel3 = document.getElementById("cancelLabel3");
    this.el.replyLabel = document.getElementById("replyLabel");
    this.el.postsPrev = document.getElementById("postsPrev");
    this.el.postsNext = document.getElementById("postsNext");
    this.el.editPostDialog = document.getElementById("editPostDialog");
    this.el.editPostForm = document.getElementById("editPostForm");
    this.el.editPostTitle = document.getElementById("editPostTitle");
    this.el.editPostContentInput = document.getElementById("editPostContentInput");
    this.el.editPostCancel = document.getElementById("editPostCancel");
    this.el.editPostSubmit = document.getElementById("editPostSubmit");
    this.el.threadMeta = document.getElementById("threadMeta");
    this.el.footerText = document.getElementById("footerText");
    this.el.copyrightText = document.getElementById("copyrightText");
    this.el.viewAdmin = document.getElementById("view-admin");
    this.el.adminTitle = document.getElementById("adminTitle");
    this.el.backAdminClose = document.getElementById("backAdminClose");
    this.el.adminMeta = document.getElementById("adminMeta");
    this.el.adminCategoriesTitle = document.getElementById("adminCategoriesTitle");
    this.el.adminCategoryName = document.getElementById("adminCategoryName");
    this.el.adminCategoryParent = document.getElementById("adminCategoryParent");
    this.el.adminAddCategory = document.getElementById("adminAddCategory");
    this.el.adminCategoryList = document.getElementById("adminCategoryList");
    this.el.adminUsersTitle = document.getElementById("adminUsersTitle");
    this.el.adminUserList = document.getElementById("adminUserList");
    this.el.editCategoryDialog = document.getElementById("editCategoryDialog");
    this.el.editCategoryForm = document.getElementById("editCategoryForm");
    this.el.editCategoryNameInput = document.getElementById("editCategoryNameInput");
    this.el.editCategoryParentInput = document.getElementById("editCategoryParentInput");
    this.el.editCategoryCancel = document.getElementById("editCategoryCancel");
    this.el.editCategorySubmit = document.getElementById("editCategorySubmit");
    this.el.dbBadge = document.getElementById("dbBadge");
    this.el.adminDiagSMTPBtn = document.getElementById("adminDiagSMTPBtn");
    this.el.adminDiagDBBtn = document.getElementById("adminDiagDBBtn");
    this.el.adminExportDBBtn = document.getElementById("adminExportDBBtn");
    this.el.adminImportDBBtn = document.getElementById("adminImportDBBtn");
    this.el.adminImportFile = document.getElementById("adminImportFile");
    this.el.adminDialog = document.getElementById("adminDialog");
    this.el.themeDialog = document.getElementById("themeDialog");
    this.el.themeForm = document.getElementById("themeForm");
    this.el.themeDialogTitle = document.getElementById("themeDialogTitle");
    this.el.themePrimaryLabel = document.getElementById("themePrimaryLabel");
    this.el.themeAccentLabel = document.getElementById("themeAccentLabel");
    this.el.themeBgLabel = document.getElementById("themeBgLabel");
    this.el.themeTextLabel = document.getElementById("themeTextLabel");
    this.el.themeBorderLabel = document.getElementById("themeBorderLabel");
    this.el.themePrimary = document.getElementById("themePrimary");
    this.el.themeAccent = document.getElementById("themeAccent");
    this.el.themeBg = document.getElementById("themeBg");
    this.el.themeText = document.getElementById("themeText");
    this.el.themeBorder = document.getElementById("themeBorder");
    this.el.themeCancel = document.getElementById("themeCancel");
    this.el.themeSave = document.getElementById("themeSave");
    this.el.themePresetsLabel = document.getElementById("themePresetsLabel");
    this.el.presetDark = document.getElementById("presetDark");
    this.el.presetLight = document.getElementById("presetLight");
    this.el.presetOcean = document.getElementById("presetOcean");
    this.el.presetSolar = document.getElementById("presetSolar");
    this.el.cropDialog = document.getElementById("cropDialog");
    this.el.cropImage = document.getElementById("cropImage");
    this.el.cropSave = document.getElementById("cropSave");
    this.el.cropCancel = document.getElementById("cropCancel");
    this.el.notificationsBtn = document.getElementById("notificationsBtn");
    this.el.notificationsDialog = document.getElementById("notificationsDialog");
    this.el.notificationsForm = document.getElementById("notificationsForm");
    this.el.notificationsList = document.getElementById("notificationsList");
    this.el.notificationsTitle = document.getElementById("notificationsTitle");
    this.el.notificationsCancel = document.getElementById("notificationsCancel");
    this.el.messagesBtn = document.getElementById("messagesBtn");
    this.el.messagesDialog = document.getElementById("messagesDialog");
    this.el.messagesForm = document.getElementById("messagesForm");
    this.el.messagesList = document.getElementById("messagesList");
    this.el.messagesTitle = document.getElementById("messagesTitle");
    this.el.messagesCancel = document.getElementById("messagesCancel");
    this.el.profileBio = document.getElementById("profileBio");
    this.el.addPollCheckbox = document.getElementById("addPollCheckbox");
    this.el.pollOptionsContainer = document.getElementById("pollOptionsContainer");
    this.el.pollQuestionInput = document.getElementById("pollQuestionInput");
    this.el.pollOptionsList = document.getElementById("pollOptionsList");
    this.el.addPollOptionBtn = document.getElementById("addPollOptionBtn");
  },
  bind() {
    this.el.lang.addEventListener("change", () => {
      this.state.lang = this.el.lang.value;
      document.documentElement.lang = this.state.lang;
      this.applyLang();
      this.render();
    });
    this.el.themeToggle.addEventListener("click", () => {
      this.state.theme = this.state.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = this.state.theme;
      this.el.themeToggle.textContent = this.state.theme === "dark" ? "☾" : "☼";
    });
    if (this.el.burgerBtn) {
      this.el.burgerBtn.addEventListener("click", () => {
        this.el.controls.classList.toggle("open");
      });
    }
    if (this.el.supportBtn) {
      this.el.supportBtn.addEventListener("click", () => {
        window.open("https://t.me/Tex_Prestige_RP_bot", "_blank");
      });
    }
    if (this.el.groupBtn) {
      this.el.groupBtn.addEventListener("click", () => {
        window.open("https://t.me/Prestige_RP", "_blank");
      });
    }
    if (this.el.discordBtn) {
      this.el.discordBtn.addEventListener("click", () => {
        window.open("https://discord.gg/7wW7k5N2E", "_blank");
      });
    }
    if (this.el.headerAvatar) {
      this.el.headerAvatar.addEventListener("click", () => {
        if (!this.state.user) { this.el.loginDialog.showModal(); return }
        this.el.profileDialog.showModal();
      });
    }
    if (this.el.themeEditor && this.el.themeDialog) {
      this.el.themeEditor.addEventListener("click", () => {
        this.loadThemeFromStorage();
        this.el.themeDialog.showModal();
      });
    }
    if (this.el.themePrimary) {
      this.el.themePrimary.addEventListener("input", () => {
        this.applyThemeVars({ primary: this.el.themePrimary.value });
      });
    }
    if (this.el.themeAccent) {
      this.el.themeAccent.addEventListener("input", () => {
        this.applyThemeVars({ accent: this.el.themeAccent.value });
      });
    }
    if (this.el.themeBg) {
      this.el.themeBg.addEventListener("input", () => {
        this.applyThemeVars({ bg: this.el.themeBg.value });
      });
    }
    if (this.el.themeText) {
      this.el.themeText.addEventListener("input", () => {
        this.applyThemeVars({ text: this.el.themeText.value });
      });
    }
    if (this.el.themeBorder) {
      this.el.themeBorder.addEventListener("input", () => {
        this.applyThemeVars({ border: this.el.themeBorder.value });
      });
    }
    if (this.el.themeCancel && this.el.themeDialog) {
      this.el.themeCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.themeDialog.close(); });
    }
    if (this.el.themeForm && this.el.themeDialog) {
      this.el.themeForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveThemeToStorage();
        this.el.themeDialog.close();
      });
    }
    const applyPreset = (vars) => {
      this.applyThemeVars(vars);
      if (this.el.themePrimary) this.el.themePrimary.value = vars.primary;
      if (this.el.themeAccent) this.el.themeAccent.value = vars.accent;
      if (this.el.themeBg) this.el.themeBg.value = vars.bg;
      if (this.el.themeText) this.el.themeText.value = vars.text;
      if (this.el.themeBorder) this.el.themeBorder.value = vars.border;
    };
    if (this.el.presetDark) {
      this.el.presetDark.addEventListener("click", () => {
        applyPreset({ primary: "#7c3aed", accent: "#a855f7", bg: "#0b0b10", text: "#f2f2f7", border: "#26263a" });
      });
    }
    if (this.el.presetLight) {
      this.el.presetLight.addEventListener("click", () => {
        applyPreset({ primary: "#2563eb", accent: "#38bdf8", bg: "#f5f5f5", text: "#111827", border: "#d1d5db" });
      });
    }
    if (this.el.presetOcean) {
      this.el.presetOcean.addEventListener("click", () => {
        applyPreset({ primary: "#0ea5e9", accent: "#22d3ee", bg: "#0b1220", text: "#e5f6ff", border: "#17324d" });
      });
    }
    if (this.el.presetSolar) {
      this.el.presetSolar.addEventListener("click", () => {
        applyPreset({ primary: "#f59e0b", accent: "#fde047", bg: "#0f0e0c", text: "#fff7ed", border: "#3b2f1a" });
      });
    }
    this.el.burgerBtn.addEventListener("click", () => {
      this.el.controls.classList.toggle("open");
    });
    this.el.loginBtn.addEventListener("click", () => { this.el.loginDialog.showModal(); captcha.mount(this.el.loginCaptcha, () => {}); if (this.el.loginNote) this.el.loginNote.textContent = this.t("loginWarning"); });
    this.el.registerBtn.addEventListener("click", () => { this.el.registerDialog.showModal(); captcha.mount(this.el.registerCaptcha, () => {}); });
    this.el.notificationsBtn.addEventListener("click", async () => { 
      try {
        const notifications = await api.get("/api/notifications");
        this.el.notificationsList.innerHTML = "";
        if (!notifications.length) {
          this.el.notificationsList.innerHTML = `<div style="padding: 16px; text-align: center;">${this.t("empty") || "Няма уведомления"}</div>`;
        } else {
          notifications.forEach(n => {
            const li = document.createElement("li");
            li.className = "post";
            li.style.padding = "12px";
            li.style.marginBottom = "8px";
            li.style.borderBottom = "1px solid var(--border)";
            li.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <div style="font-weight: bold; ${n.read_at ? 'opacity: 0.7;' : ''}">${escapeHtml(n.title || "Уведомление")}</div>
                  <div style="font-size: 0.9em; margin-top: 4px; ${n.read_at ? 'opacity: 0.7;' : ''}">${escapeHtml(n.content || "")}</div>
                  <div style="font-size: 0.8em; color: var(--text); opacity: 0.6; margin-top: 8px;">${new Date(n.created_at).toLocaleString()}</div>
                </div>
              </div>
            `;
            if (!n.read_at) {
              li.addEventListener("click", async () => {
                await api.post(`/api/notifications/${n.id}/read`, {});
                this.renderNotifications();
              });
            }
            this.el.notificationsList.appendChild(li);
          });
        }
      } catch (err) {
        this.el.notificationsList.innerHTML = `<div style="padding: 16px; color: var(--error);">${this.t("apiError")}: ${err.message}</div>`;
      }
      this.el.notificationsDialog.showModal(); 
    });
    this.el.messagesBtn.addEventListener("click", async () => { 
      try {
        this.renderMessagesList();
      } catch (err) {
        this.el.messagesList.innerHTML = `<div style="padding: 16px; color: var(--error);">${this.t("apiError")}: ${err.message}</div>`;
      }
      this.el.messagesDialog.showModal(); 
    });
    this.el.notificationsCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.notificationsDialog.close(); });
    this.el.messagesCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.messagesDialog.close(); });
    if (this.el.addPollCheckbox) {
      this.el.addPollCheckbox.addEventListener("change", () => {
        this.el.pollOptionsContainer.style.display = this.el.addPollCheckbox.checked ? "block" : "none";
      });
    }
    if (this.el.addPollOptionBtn) {
      this.el.addPollOptionBtn.addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Опция";
        input.className = "poll-option-input";
        this.el.pollOptionsList.appendChild(input);
      });
    }
    this.el.profileBtn.addEventListener("click", () => {
      if (!this.state.user) return;
      this.el.profileUsername.value = this.state.user.username || "";
      this.el.profileBio.value = this.state.user.bio || "";
      this.el.profileNotifications.checked = !!this.state.user.notifications;
      // Ensure stats elements exist even if HTML is older
      if (!this.el.profileStatsThreads || !this.el.profileStatsPosts) {
        const meta = document.createElement("div");
        meta.className = "meta";
        this.el.profileStatsThreads = document.createElement("span");
        this.el.profileStatsThreads.id = "profileStatsThreads";
        this.el.profileStatsPosts = document.createElement("span");
        this.el.profileStatsPosts.id = "profileStatsPosts";
        this.el.profileStatsPosts.style.marginLeft = "12px";
        meta.appendChild(this.el.profileStatsThreads);
        meta.appendChild(this.el.profileStatsPosts);
        const form = this.el.profileForm || document.getElementById("profileForm");
        if (form) form.insertBefore(meta, form.querySelector(".actions"));
      }
      this.el.profileDialog.showModal();
      const id = this.state.user?.id;
      if (id) {
        api.get(`/api/users/${id}/stats`).then(s => {
          if (this.el.profileStatsThreads) this.el.profileStatsThreads.textContent = `${this.t("threadsCount")}: ${s.threads}`;
          if (this.el.profileStatsPosts) this.el.profileStatsPosts.textContent = `${this.t("postsCount")}: ${s.posts}`;
        }).catch(()=>{});
      }
    });
    this.el.loginCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.loginDialog.close(); });
    this.el.registerCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.registerDialog.close(); });
    this.el.profileCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.profileDialog.close(); });
    this.el.profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        const id = this.state.user?.id;
        if (!id) return;
        const file = this.el.avatarUpload.files?.[0];
        if (file) {
          const fd = new FormData();
          fd.append("avatar", file);
          const r = await fetch(`${api.base}/api/users/${id}/avatar`, { method: "POST", headers: { Authorization: `Bearer ${api.token}` }, body: fd });
          if (!r.ok) throw new Error(await r.text());
          const j = await r.json();
          if (j.avatar_url) this.state.user.avatar_url = j.avatar_url;
        }
        const updatedUser = await api.post(`/api/users/${id}/profile`, { username: this.el.profileUsername.value.trim(), bio: this.el.profileBio.value.trim(), notifications: !!this.el.profileNotifications.checked });
        this.state.user = { ...this.state.user, ...updatedUser };
        this.el.profileDialog.close();
        this.updateHeaderAuth();
      } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
    });
    if (this.el.enable2faBtn) {
      this.el.enable2faBtn.addEventListener("click", async () => {
        try {
          if (!this.state.user) return;
          const r = await api.post("/api/auth/2fa/setup", {});
          this.el.twofaTitle.textContent = this.t("twofaSetupTitle");
          this.el.twofaNote.textContent = this.t("twofaScanNote");
          this.el.twofaSecret.textContent = `Secret: ${r.secret}`;
          this.el.twofaUri.textContent = `URI: ${r.uri}`;
          this.el.twofaCode.value = "";
          this.el.twofaDialog.showModal();
          this.el.twofaForm.onsubmit = async (e2) => {
            e2.preventDefault();
            try {
              await api.post("/api/auth/2fa/activate", { code: this.el.twofaCode.value.trim() });
              this.el.twofaDialog.close();
              alert(this.t("twofaEnabledNote"));
            } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
          };
          this.el.twofaCancel.onclick = () => this.el.twofaDialog.close();
        } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
      });
    }
    if (this.el.disable2faBtn) {
      this.el.disable2faBtn.addEventListener("click", async () => {
        try {
          this.el.twofaTitle.textContent = this.t("disable2fa");
          this.el.twofaNote.textContent = this.t("twofaRequired");
          this.el.twofaSecret.textContent = "";
          this.el.twofaUri.textContent = "";
          this.el.twofaCode.value = "";
          this.el.twofaDialog.showModal();
          this.el.twofaForm.onsubmit = async (e2) => {
            e2.preventDefault();
            try {
              await api.post("/api/auth/2fa/disable", { code: this.el.twofaCode.value.trim() });
              this.el.twofaDialog.close();
              alert("OK");
            } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
          };
          this.el.twofaCancel.onclick = () => this.el.twofaDialog.close();
        } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
      });
    }
    if (this.el.logoutAllBtn) {
      this.el.logoutAllBtn.addEventListener("click", async () => {
        try {
          await api.post("/api/auth/logout_all", {});
        } catch {}
        api.setToken("");
        api.setRefreshToken("");
        this.state.user = null;
        this.updateHeaderAuth();
        this.render();
        this.el.profileDialog.close();
      });
    }
    this.el.cancelLabel.addEventListener("click", (e) => { e.preventDefault(); this.el.categoryDialog.close(); });
    this.el.cancelLabel2.addEventListener("click", (e) => { e.preventDefault(); this.el.threadDialog.close(); });
    this.el.cancelLabel3.addEventListener("click", (e) => { e.preventDefault(); this.el.postDialog.close(); });
    const forgotLink = document.createElement("button");
    forgotLink.className = "ghost";
    forgotLink.textContent = this.t("resetPassword");
    forgotLink.addEventListener("click", () => this.el.resetDialog.showModal());
    this.el.loginForm.appendChild(forgotLink);
    this.el.resetCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.resetDialog.close(); });
    this.el.performResetCancel.addEventListener("click", (e) => { e.preventDefault(); this.el.performResetDialog.close(); });
    this.el.logoutBtn.addEventListener("click", () => {
      api.setToken("");
      api.setRefreshToken("");
      this.state.user = null;
      this.updateHeaderAuth();
      this.render();
    });
    this.el.loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        if (!captcha.verify(this.el.loginCaptcha)) return;
        const r = await api.post("/api/auth/login", { email: this.el.loginEmail.value.trim(), password: this.el.loginPassword.value, totp: (this.el.loginTotp?.value || "").trim() || undefined });
        api.setToken(r.token);
        if (r.refresh_token) api.setRefreshToken(r.refresh_token);
        this.state.user = r.user;
        this.el.loginDialog.close();
        this.updateHeaderAuth();
        this.render();
        if (this.state.loginReferrer) {
          const u = this.state.loginReferrer;
          this.state.loginReferrer = null;
          window.location.href = u;
          return;
        }
        if (r.require_twofa_prompt) {
          try {
            const setup = await api.post("/api/auth/2fa/setup", {});
            this.el.twofaTitle.textContent = this.t("twofaSetupTitle");
            this.el.twofaNote.textContent = this.t("twofaScanNote");
            this.el.twofaSecret.textContent = `Secret: ${setup.secret}`;
            this.el.twofaUri.textContent = `URI: ${setup.uri}`;
            this.el.twofaCode.value = "";
            this.el.twofaDialog.showModal();
            const onCancel = async () => {
              try { await api.post("/api/auth/2fa/skip", {}); } catch {}
              this.el.twofaDialog.close();
            };
            this.el.twofaCancel.onclick = onCancel;
            this.el.twofaForm.onsubmit = async (e2) => {
              e2.preventDefault();
              try {
                await api.post("/api/auth/2fa/activate", { code: this.el.twofaCode.value.trim() });
                this.el.twofaDialog.close();
                alert(this.t("twofaEnabledNote"));
              } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
            };
          } catch {}
        }
      } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
    });
    this.el.registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        if (!captcha.verify(this.el.registerCaptcha)) return;
        const r = await api.post("/api/auth/register", {
          email: this.el.registerEmail.value.trim(),
          username: this.el.registerUsername.value.trim(),
          password: this.el.registerPassword.value,
          locale: this.state.lang
        });
        this.el.registerNote.textContent = (r && r.smtp_ready) ? this.t("registerNote") : this.t("smtpDisabledNote");
      } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
    });
    this.el.resetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await api.post("/api/auth/reset/request", { email: this.el.resetEmail.value.trim() });
        this.el.resetNote.textContent = this.t("registerNote");
      } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
    });
    this.el.performResetForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      try {
        await api.post("/api/auth/reset/perform", { token: this.el.performResetToken.value.trim(), password: this.el.performResetPassword.value });
        this.el.performResetDialog.close();
        alert("OK");
      } catch (err) { alert(ui.t("apiError") + ": " + err.message) }
    });
    this.el.addCategoryBtn.addEventListener("click", () => {
      this.el.categoryDialogTitle.textContent = this.t("newCategory");
      this.el.categoryDialog.dataset.parentId = "";
      this.el.categoryDialog.showModal();
    });
    this.el.addSubcategoryBtn.addEventListener("click", () => {
      if (!this.state.user || this.state.user.role !== "admin") { 
        alert(ui.t("adminOnly")); 
        return;
      }
      this.el.categoryDialogTitle.textContent = this.t("newSubcategory");
      this.el.categoryDialog.dataset.parentId = this.state.current.categoryId;
      this.el.categoryDialog.showModal();
    });
    this.el.categoryForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = this.el.categoryNameInput.value.trim();
      if (!name) return;
      if (!this.state.user || this.state.user.role !== "admin") { alert(ui.t("adminOnly")); return }
      const parentId = this.el.categoryDialog.dataset.parentId || null;
      store.addCategory(name, parentId).then(() => {
        this.el.categoryNameInput.value = "";
        this.el.categoryDialog.dataset.parentId = "";
        this.el.categoryDialog.close();
        if (this.state.current.categoryId) {
          this.renderThreads(this.state.current.categoryId);
        } else {
          this.renderCategories();
        }
      }).catch(err => alert(ui.t("apiError") + ": " + err.message));
    });
    this.el.backToCategories.addEventListener("click", () => {
      this.state.current.categoryId = null;
      this.show("categories");
      this.renderCategories();
    });
    this.el.addThreadBtn.addEventListener("click", () => {
      if (!this.state.user) { this.el.loginDialog.showModal(); return }
      this.el.threadDialog.showModal();
    });
    this.el.threadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = this.el.threadTitleInput.value.trim();
      const content = this.el.threadContentInput.value.trim();
      if (!title || !content) return;
      const thread = await store.addThread(this.state.current.categoryId, title, content);
      
      // Create poll if checkbox is checked
      if (this.el.addPollCheckbox && this.el.addPollCheckbox.checked) {
        const question = this.el.pollQuestionInput?.value?.trim();
        const optionInputs = this.el.pollOptionsList?.querySelectorAll("input") || [];
        const options = Array.from(optionInputs).map(i => i.value.trim()).filter(Boolean);
        if (question && options.length >= 2) {
          try {
            await api.post(`/api/threads/${thread.id}/polls`, { question, options });
          } catch (err) {
            console.error("Failed to create poll:", err);
          }
        }
      }
      
      // Handle tags
      const tagsRaw = (this.el.threadTagsInput?.value || "").trim();
      if (tagsRaw) {
        const tags = tagsRaw.split(",").map(s => s.trim()).filter(Boolean);
        api.post(`/api/threads/${thread.id}/edit`, { tags }).catch(()=>{});
      }
      
      this.el.threadTitleInput.value = "";
      this.el.threadContentInput.value = "";
      if (this.el.threadTagsInput) this.el.threadTagsInput.value = "";
      if (this.el.pollQuestionInput) this.el.pollQuestionInput.value = "";
      if (this.el.pollOptionsList) this.el.pollOptionsList.innerHTML = "";
      if (this.el.addPollCheckbox) this.el.addPollCheckbox.checked = false;
      if (this.el.pollOptionsContainer) this.el.pollOptionsContainer.style.display = "none";
      this.el.threadDialog.close();
      this.renderThreads(this.state.current.categoryId);
      this.openThread(thread.id);
    });
    this.el.searchBtn.addEventListener("click", () => {
      this.state.searchPage = 1;
      this.renderThreads(this.state.current.categoryId);
    });
    this.el.threadsPrev.addEventListener("click", () => {
      this.state.searchPage = Math.max(1, (this.state.searchPage || 1) - 1);
      this.renderThreads(this.state.current.categoryId);
    });
    this.el.threadsNext.addEventListener("click", () => {
      this.state.searchPage = (this.state.searchPage || 1) + 1;
      this.renderThreads(this.state.current.categoryId);
    });
    this.el.backToThreads.addEventListener("click", () => {
      this.state.current.threadId = null;
      this.show("threads");
      this.renderThreads(this.state.current.categoryId);
    });
    this.el.addPostBtn.addEventListener("click", () => {
      if (!this.state.user) { this.el.loginDialog.showModal(); return }
      this.el.postDialog.showModal();
    });
    const filesInput = document.getElementById("postFiles");
    if (filesInput) {
      filesInput.addEventListener("change", async () => {
        const f = filesInput.files;
        if (!f || !f.length) { store.pendingAttachments = []; return }
        const fd = new FormData();
        for (let i = 0; i < Math.min(4, f.length); i++) fd.append("files", f[i]);
        const r = await fetch(`${api.base}/api/upload`, { method: "POST", headers: { Authorization: `Bearer ${api.token}` }, body: fd });
        if (!r.ok) { alert(ui.t("apiError")); return }
        const j = await r.json();
        store.pendingAttachments = j.files;
      });
    }
    this.el.postForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const content = this.el.postContentInput.value.trim();
      if (!content) return;
      store.addPost(this.state.current.threadId, content)
        .then(() => {
          this.el.postContentInput.value = "";
          this.el.postDialog.close();
          this.renderPosts(this.state.current.threadId);
        })
        .catch(err => alert(ui.t("apiError") + ": " + err.message));
    });
    this.el.postsPrev.addEventListener("click", () => {
      this.state.postsPage = Math.max(1, (this.state.postsPage || 1) - 1);
      this.renderPosts(this.state.current.threadId);
    });
    this.el.postsNext.addEventListener("click", () => {
      this.state.postsPage = (this.state.postsPage || 1) + 1;
      this.renderPosts(this.state.current.threadId);
    });
    this.el.adminBtn.addEventListener("click", () => {
      if (this.state.user?.role !== "admin") return;
      if (this.el.adminDialog && this.el.viewAdmin) {
        this.el.viewAdmin.classList.remove("hidden");
        this.el.adminDialog.appendChild(this.el.viewAdmin);
        this.el.adminDialog.showModal();
      } else {
        this.show("admin");
      }
      this.refreshMeta();
      this.renderAdmin();
    });
    this.el.backAdminClose.addEventListener("click", () => {
      if (this.el.adminDialog && this.el.viewAdmin) {
        try { this.el.adminDialog.close(); } catch {}
        const main = document.querySelector("main.container") || document.querySelector("main");
        if (main) main.appendChild(this.el.viewAdmin);
      }
      this.show("categories");
    });
    if (this.el.adminDiagSMTPBtn) {
      this.el.adminDiagSMTPBtn.addEventListener("click", async () => {
        try {
          const r = await api.post("/api/diag/smtp", {});
          this.el.adminMeta.textContent = `SMTP: OK • изпратено до ${r.sent_to}`;
        } catch (err) {
          this.el.adminMeta.textContent = `SMTP грешка: ${err.message}`;
        }
      });
    }
    if (this.el.loginResendBtn) {
      this.el.loginResendBtn.addEventListener("click", async () => {
        const email = this.el.loginEmail.value.trim();
        if (!email) { alert(this.t("emailPh")); return }
        this.el.loginResendBtn.disabled = true;
        try {
          await api.post("/api/auth/resend-confirm", { email });
          if (this.el.loginNote) this.el.loginNote.textContent = this.t("resendConfirmSent");
        } catch (err) {
          if (this.el.loginNote) this.el.loginNote.textContent = `${this.t("apiError")}: ${err.message}`;
        } finally {
          this.el.loginResendBtn.disabled = false;
        }
      });
    }
    if (this.el.adminDiagDBBtn) {
      this.el.adminDiagDBBtn.addEventListener("click", async () => {
        try {
          const r = await api.post("/api/diag/mysql", {});
          if (r.ok && r.ready) {
            this.el.adminMeta.textContent = `DB: OK • MySQL ${r.host}:${r.port}/${r.db}`;
          } else if (r.error === "MySQL not ready") {
             // If MySQL is not ready, we are likely running on JSON
            this.el.adminMeta.textContent = `DB: JSON (Active) • MySQL Inactive`;
          } else {
            this.el.adminMeta.textContent = `DB: неактивна • ${r.error || "unknown"}`;
          }
        } catch (err) {
          this.el.adminMeta.textContent = `DB грешка: ${err.message}`;
        }
      });
    }
    if (this.el.adminExportDBBtn) {
      this.el.adminExportDBBtn.addEventListener("click", async () => {
        try {
          const url = api.base ? `${api.base}/api/db/export` : "/api/db/export";
          const r = await fetch(url, { headers: api.token ? { Authorization: `Bearer ${api.token}` } : {} });
          if (!r.ok) throw new Error(await r.text());
          const db = await r.json();
          const blob = new Blob([JSON.stringify(db, null, 2)], { type: "application/json" });
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = `prestige_forum_${new Date().toISOString().slice(0,19).replace(/[:T]/g,"-")}.json`;
          a.click();
          setTimeout(()=>URL.revokeObjectURL(a.href), 5000);
          this.el.adminMeta.textContent = "Export OK";
        } catch (err) {
          this.el.adminMeta.textContent = `${this.t("apiError")}: ${err.message || err}`;
        }
      });
    }
    if (this.el.adminImportDBBtn && this.el.adminImportFile) {
      this.el.adminImportDBBtn.addEventListener("click", () => {
        this.el.adminImportFile.value = "";
        this.el.adminImportFile.click();
      });
      this.el.adminImportFile.addEventListener("change", async () => {
        const f = this.el.adminImportFile.files?.[0];
        if (!f) return;
        try {
          const txt = await f.text();
          const db = JSON.parse(txt);
          await api.post("/api/db/import", { db });
          this.el.adminMeta.textContent = "Import OK";
          this.renderAdmin();
        } catch (err) {
          this.el.adminMeta.textContent = `${this.t("apiError")}: ${err.message || err}`;
        }
      });
    }
  },
  applyThemeVars(vars) {
    const root = document.documentElement;
    if (vars.primary) root.style.setProperty("--primary", vars.primary);
    if (vars.accent) root.style.setProperty("--accent", vars.accent);
    if (vars.bg) root.style.setProperty("--bg", vars.bg);
    if (vars.text) root.style.setProperty("--text", vars.text);
    if (vars.border) root.style.setProperty("--border", vars.border);
  },
  saveThemeToStorage() {
    const vars = {
      primary: this.el.themePrimary ? this.el.themePrimary.value : "",
      accent: this.el.themeAccent ? this.el.themeAccent.value : "",
      bg: this.el.themeBg ? this.el.themeBg.value : "",
      text: this.el.themeText ? this.el.themeText.value : "",
      border: this.el.themeBorder ? this.el.themeBorder.value : ""
    };
    try { localStorage.setItem("theme_vars", JSON.stringify(vars)); } catch {}
  },
  loadThemeFromStorage() {
    let vars = {};
    try { vars = JSON.parse(localStorage.getItem("theme_vars") || "{}") || {}; } catch {}
    const cs = getComputedStyle(document.documentElement);
    const defaults = {
      primary: cs.getPropertyValue("--primary").trim(),
      accent: cs.getPropertyValue("--accent").trim(),
      bg: cs.getPropertyValue("--bg").trim(),
      text: cs.getPropertyValue("--text").trim(),
      border: cs.getPropertyValue("--border").trim()
    };
    const merged = { ...defaults, ...vars };
    this.applyThemeVars(merged);
    if (this.el.themePrimary) this.el.themePrimary.value = merged.primary;
    if (this.el.themeAccent) this.el.themeAccent.value = merged.accent;
    if (this.el.themeBg) this.el.themeBg.value = merged.bg;
    if (this.el.themeText) this.el.themeText.value = merged.text;
    if (this.el.themeBorder) this.el.themeBorder.value = merged.border;
  },
  applyLang() {
    this.el.title.textContent = this.t("title");
    this.el.subtitle.textContent = this.t("subtitle");
    this.el.langLabel.textContent = this.t("language");
    this.el.themeToggle.textContent = this.state.theme === "dark" ? "☾" : "☼";
    if (this.el.burgerBtn) this.el.burgerBtn.textContent = "☰";
    this.el.loginBtn.textContent = this.t("login");
    this.el.registerBtn.textContent = this.t("register");
    this.el.logoutBtn.textContent = this.t("logout");
    this.el.adminBtn.textContent = this.t("admin");
    this.el.profileBtn.textContent = this.t("profile");
    this.el.categoriesTitle.textContent = this.t("categories");
    this.el.addCategoryBtn.textContent = this.t("addCategory");
    this.el.addSubcategoryBtn.textContent = this.t("addSubcategory");
    this.el.categoryDialogTitle.textContent = this.t("newCategory");
    this.el.cancelLabel.textContent = this.t("cancel");
    this.el.createLabel.textContent = this.t("create");
    this.el.threadsTitle.textContent = this.t("threads");
    this.el.backToCategories.textContent = this.t("back");
    this.el.addThreadBtn.textContent = this.t("addThread");
    this.el.threadDialogTitle.textContent = this.t("newThread");
    this.el.threadTitleInput.placeholder = this.t("threadTitlePh");
    this.el.threadContentInput.placeholder = this.t("threadContentPh");
    if (this.el.threadTagsInput) this.el.threadTagsInput.placeholder = this.t("tagsPh");
    this.el.threadAuthorInput.placeholder = this.t("authorPh");
    this.el.cancelLabel2.textContent = this.t("cancel");
    this.el.publishLabel.textContent = this.t("publish");
    this.el.postsTitle.textContent = this.t("posts");
    this.el.backToThreads.textContent = this.t("back");
    this.el.addPostBtn.textContent = this.t("newPost");
    this.el.postDialogTitle.textContent = this.t("newPost");
    this.el.postContentInput.placeholder = this.t("threadContentPh");
    this.el.cancelLabel3.textContent = this.t("cancel");
    this.el.replyLabel.textContent = this.t("reply");
    this.el.footerText.textContent = this.t("footer");
    const year = new Date().getFullYear();
    const brand = this.t("title");
    this.el.copyrightText.textContent = this.t("copyright").replace("{year}", year).replace("{brand}", brand);
    this.el.loginTitle.textContent = this.t("loginTitle");
    this.el.loginEmail.placeholder = this.t("emailPh");
    this.el.loginPassword.placeholder = this.t("passwordPh");
    if (this.el.loginTotp) this.el.loginTotp.placeholder = this.t("twofaCodePh");
    this.el.loginCancel.textContent = this.t("cancel");
    this.el.loginSubmit.textContent = this.t("login");
    this.el.loginTitle.textContent = this.t("loginTitle");
    if (this.el.loginResendBtn) this.el.loginResendBtn.textContent = this.t("resendConfirm");
    this.el.registerTitle.textContent = this.t("registerTitle");
    this.el.registerEmail.placeholder = this.t("emailPh");
    this.el.registerUsername.placeholder = this.t("usernamePh");
    this.el.registerPassword.placeholder = this.t("passwordPh");
    this.el.registerCancel.textContent = this.t("cancel");
    this.el.registerSubmit.textContent = this.t("register");
    this.el.adminTitle.textContent = this.t("adminPanel");
    this.el.adminCategoriesTitle.textContent = this.t("adminCategories");
    this.el.adminAddCategory.textContent = this.t("add");
    this.el.backAdminClose.textContent = this.t("close");
    this.el.adminCategoryName.placeholder = this.t("categoryNamePh");
    if (this.el.adminDiagSMTPBtn) this.el.adminDiagSMTPBtn.textContent = this.t("adminDiagSMTP");
    if (this.el.adminDiagDBBtn) this.el.adminDiagDBBtn.textContent = this.t("adminDiagDB");
    if (this.el.adminExportDBBtn) this.el.adminExportDBBtn.textContent = this.t("exportDB");
    if (this.el.adminImportDBBtn) this.el.adminImportDBBtn.textContent = this.t("importDB");
    this.el.resetTitle.textContent = this.t("resetPassword");
    this.el.resetEmail.placeholder = this.t("emailPh");
    this.el.resetCancel.textContent = this.t("cancel");
    this.el.resetSubmit.textContent = this.t("send");
    this.el.performResetTitle.textContent = this.t("changePassword");
    this.el.performResetToken.placeholder = this.t("tokenPh");
    this.el.performResetPassword.placeholder = this.t("newPasswordPh");
    this.el.performResetCancel.textContent = this.t("cancel");
    this.el.performResetSubmit.textContent = this.t("save");
    this.el.searchInput.placeholder = this.t("searchPh");
    this.el.searchBtn.textContent = this.t("search");
    this.el.threadsPrev.textContent = this.t("prev");
    this.el.threadsNext.textContent = this.t("next");
    this.el.postsPrev.textContent = this.t("prev");
    this.el.postsNext.textContent = this.t("next");
    this.el.editThreadTitle.textContent = this.t("editThread");
    if (this.el.editThreadTagsInput) this.el.editThreadTagsInput.placeholder = this.t("tagsEditPh");
    this.el.editThreadCancel.textContent = this.t("cancel");
    this.el.editThreadSubmit.textContent = this.t("save");
    this.el.editPostTitle.textContent = this.t("editPost");
    this.el.editPostCancel.textContent = this.t("cancel");
    this.el.editPostSubmit.textContent = this.t("save");
    this.el.adminUsersTitle.textContent = this.t("users");
    this.el.profileTitle.textContent = this.t("profileTitle");
    this.el.profileUsername.placeholder = this.t("usernamePh");
    this.el.profileNotificationsLabel.textContent = this.t("notifications");
    if (this.el.enable2faBtn) this.el.enable2faBtn.textContent = this.t("enable2fa");
    if (this.el.disable2faBtn) this.el.disable2faBtn.textContent = this.t("disable2fa");
    if (this.el.twofaTitle) this.el.twofaTitle.textContent = this.t("twofaSetupTitle");
    if (this.el.twofaNote) this.el.twofaNote.textContent = this.t("twofaScanNote");
    if (this.el.twofaCode) this.el.twofaCode.placeholder = this.t("twofaCodePh");
    this.el.profileCancel.textContent = this.t("cancel");
    this.el.saveProfile.textContent = this.t("save");
    if (this.el.logoutAllBtn) this.el.logoutAllBtn.textContent = this.t("logoutAll");
    if (this.el.latestPostsTitle) this.el.latestPostsTitle.textContent = this.t("latestPosts");
    if (this.el.groupBtn) this.el.groupBtn.textContent = this.t("group");
    if (this.el.supportBtn) this.el.supportBtn.textContent = this.t("support");
    if (this.el.discordBtn) this.el.discordBtn.textContent = this.t("discord");
    if (this.el.themeEditor) this.el.themeEditor.textContent = this.t("themeSettings");
    if (this.el.themeDialogTitle) this.el.themeDialogTitle.textContent = this.t("themeSettings");
    if (this.el.themePrimaryLabel) this.el.themePrimaryLabel.textContent = this.t("themePrimary");
    if (this.el.themeAccentLabel) this.el.themeAccentLabel.textContent = this.t("themeAccent");
    if (this.el.themeBgLabel) this.el.themeBgLabel.textContent = this.t("themeBg");
    if (this.el.themeTextLabel) this.el.themeTextLabel.textContent = this.t("themeText");
    if (this.el.themeBorderLabel) this.el.themeBorderLabel.textContent = this.t("themeBorder");
    if (this.el.themeCancel) this.el.themeCancel.textContent = this.t("cancel");
    if (this.el.themeSave) this.el.themeSave.textContent = this.t("save");
    if (this.el.themePresetsLabel) this.el.themePresetsLabel.textContent = this.t("themePresets");
    if (this.el.presetDark) this.el.presetDark.textContent = this.t("presetDark");
    if (this.el.presetLight) this.el.presetLight.textContent = this.t("presetLight");
    if (this.el.presetOcean) this.el.presetOcean.textContent = this.t("presetOcean");
    if (this.el.presetSolar) this.el.presetSolar.textContent = this.t("presetSolar");
    const opts = this.el.lang.querySelectorAll("option");
    opts.forEach(o => {
      if (o.value === "ru") o.textContent = "Русский";
      if (o.value === "kk") o.textContent = "Қазақша";
      if (o.value === "uk") o.textContent = "Українська";
      if (o.value === "bg") o.textContent = "Български";
      if (o.value === "en") o.textContent = "English";
    });
    this.updateDbBadge();
  },
  async restoreAuth() {
    if (!api.token) { this.updateHeaderAuth(); return }
    try {
      const me = await api.get("/api/me");
      this.state.user = me;
    } catch {
      api.setToken("");
      api.setRefreshToken("");
      this.state.user = null;
    }
    this.updateHeaderAuth();
  },
  updateHeaderAuth() {
    const logged = !!this.state.user;
    this.el.loginBtn.style.display = logged ? "none" : "";
    this.el.registerBtn.style.display = logged ? "none" : "";
    this.el.logoutBtn.style.display = logged ? "" : "none";
    this.el.userBadge.style.display = logged ? "" : "none";
    if (this.el.headerAvatar) {
      this.el.headerAvatar.style.display = logged ? "" : "none";
      if (logged) {
        const src = this.avatarUrlOrFallback(this.state.user);
        if (src) this.el.headerAvatar.src = src;
        this.el.headerAvatar.alt = this.state.user.username || "profile";
        this.el.headerAvatar.title = this.state.user.username || "";
        this.el.headerAvatar.style.width = "40px";
        this.el.headerAvatar.style.height = "40px";
        this.el.headerAvatar.style.borderRadius = "50%";
        this.el.headerAvatar.style.objectFit = "cover";
        this.el.headerAvatar.style.display = "";
      }
    }
    this.el.adminBtn.style.display = logged && this.state.user.role === "admin" ? "" : "none";
    this.el.profileBtn.style.display = logged ? "" : "none";
    this.el.userBadge.textContent = logged ? `${this.state.user.username} • ${this.state.user.role}` : "";
  },
  avatarUrlOrFallback(user) {
    if (user && user.avatar_url) return user.avatar_url;
    const name = (user && user.username) ? String(user.username).trim() : "";
    const ch = (name && name[0]) ? name[0].toUpperCase() : "?";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#7c3aed"}'/><stop offset='1' stop-color='${getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#a855f7"}'/></linearGradient></defs><rect width='100%' height='100%' rx='32' fill='url(#g)'/><text x='50%' y='55%' text-anchor='middle' font-size='32' font-family='Inter, system-ui, sans-serif' fill='white'>${ch}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  },
  async refreshMeta() {
    try {
      const m = await api.get("/api/meta");
      this.state.meta = m;
      this.updateDbBadge();
      if (this.el.registerNote) {
        this.el.registerNote.textContent = m.smtp_ready ? this.t("registerNote") : this.t("smtpDisabledNote");
      }
      if (this.el.viewAdmin && !this.el.viewAdmin.classList.contains("hidden")) {
        const label = this.t("dbLabel");
        const mysql = this.t("dbMySQL");
        const json = this.t("dbJSON");
        const jsonFb = this.t("dbJSONFallback");
        const txt = m.mysql_ready ? `${label}: ${mysql} • ${m.mysql.host}:${m.mysql.port}/${m.mysql.db}` : (m.mode === "json_fallback" ? `${label}: ${jsonFb}` : `${label}: ${json}`);
        this.el.adminMeta.textContent = txt;
      }
    } catch {}
  },
  updateDbBadge() {
    const m = this.state.meta;
    if (!this.el.dbBadge) return;
    if (m && m.mysql_ready && m.mode === "mysql") {
      this.el.dbBadge.textContent = `${this.t("dbLabel")}: ${this.t("dbMySQL")}`;
      this.el.dbBadge.className = "badge badge-success";
      this.el.dbBadge.style.display = "";
      this.el.dbBadge.title = m.version || "";
    } else if (m) {
      this.el.dbBadge.textContent = `${this.t("dbLabel")}: ${this.t("dbJSON")}`;
      this.el.dbBadge.className = "badge badge-warning";
      this.el.dbBadge.style.display = "";
      this.el.dbBadge.title = m.version || "";
    } else {
      this.el.dbBadge.textContent = "";
      this.el.dbBadge.style.display = "none";
    }
  },
  connectWs() {
    try {
      const base = api.base || `${window.location.protocol}//${window.location.host}`;
      const wsUrl = base.replace(/^http:/, "ws:").replace(/^https:/, "wss:");
      const url = `${wsUrl.replace(/\/$/, "")}`;
      this.ws?.close?.();
      this.ws = new WebSocket(url);
      this.ws.onmessage = (ev) => {
        try {
          const msg = JSON.parse(ev.data);
          if (msg && msg.type === "new_post" && msg.thread) {
            const title = msg.thread.title || "";
            const txt = (this.t("newPostInThread") || "New post").replace("{title}", title);
            if (this.el.searchMeta) {
              this.el.searchMeta.textContent = txt;
              setTimeout(() => { if (this.el.searchMeta.textContent === txt) this.el.searchMeta.textContent = ""; }, 5000);
            }
            if (this.state.current?.threadId && msg.thread.id === this.state.current.threadId) {
              // Refresh posts if currently viewing the thread
              this.renderPosts(this.state.current.threadId);
            }
          }
        } catch {}
      };
      this.ws.onclose = () => {
        setTimeout(() => this.connectWs(), 3000);
      };
    } catch {}
  },
  show(view) {
    this.el.viewCategories.classList.toggle("hidden", view !== "categories");
    this.el.viewThreads.classList.toggle("hidden", view !== "threads");
    this.el.viewPosts.classList.toggle("hidden", view !== "posts");
    this.el.viewAdmin.classList.toggle("hidden", view !== "admin");
  },
  render() {
    if (!this.el.viewCategories.classList.contains("hidden")) this.renderCategories();
    else if (!this.el.viewThreads.classList.contains("hidden")) this.renderThreads(this.state.current.categoryId);
    else if (!this.el.viewPosts.classList.contains("hidden")) this.renderPosts(this.state.current.threadId);
    else if (!this.el.viewAdmin.classList.contains("hidden")) this.renderAdmin();
  },
  renderCategories() {
    const ul = this.el.categoryList;
    ul.innerHTML = "";
    store.categories().then(categories => {
      if (!categories.length) {
        const li = document.createElement("li");
        li.textContent = this.t("empty");
        ul.appendChild(li);
        return;
      }
      const tree = buildCategoryTree(categories);
      const renderNode = (nodes, container) => {
        nodes.forEach(c => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="category-icon">💬</div>
            <div class="category-content">
              <div class="category-title">${escapeHtml(c.name)}</div>
              <div class="category-desc">${c.children?.length || 0} ${this.t("subforumsCount") || "подфорума"} • ${c.threads_count || 0} ${this.t("threadsCount") || "тем"}</div>
            </div>
            <div class="category-stats">
              <span class="category-stat-number">${c.posts_count || 0}</span>
              <span class="category-stat-label">${this.t("postsCount") || "постов"}</span>
            </div>
          `;
          li.addEventListener("click", () => {
            this.state.current.categoryId = c.id;
            this.show("threads");
            this.renderThreads(c.id);
          });
          container.appendChild(li);
        });
      };
      renderNode(tree, ul);
      this.renderLatestPosts();
    }).catch(err => {
      const li = document.createElement("li");
      li.textContent = this.t("apiError");
      ul.appendChild(li);
    });
  },
  renderLatestPosts() {
    const ul = this.el.latestPostsList;
    if (!ul) return;
    ul.innerHTML = "";
    api.get("/api/latest_posts?size=10").then(items => {
      if (!items.length) {
        const li = document.createElement("li");
        li.textContent = this.t("empty");
        ul.appendChild(li);
        return;
      }
      items.forEach(p => {
        const li = document.createElement("li");
        const author = escapeHtml(p.author_username || "unknown");
        const title = escapeHtml(p.thread_title || "");
        li.innerHTML = `<div class="item-title">${title}</div><div class="item-sub">${this.t("by")} ${author}</div>`;
        li.onclick = () => {
          if (p.thread_id) {
            this.state.current.categoryId = p.category_id || null;
            this.show("posts");
            this.openThread?.(p.thread_id);
          }
        };
        ul.appendChild(li);
      });
    }).catch(()=>{});
  },
  async renderBreadcrumbs(categoryId) {
    if (!this.el.threadBreadcrumbs) return;
    this.el.threadBreadcrumbs.innerHTML = "";
    if (!categoryId) return;

    try {
      const categories = await store.categories();
      const trail = [];
      let current = categories.find(c => c.id === categoryId);
      while (current) {
        trail.unshift(current);
        if (!current.parent_id) break;
        current = categories.find(c => c.id === current.parent_id);
      }

      const home = document.createElement("span");
      home.className = "breadcrumb-item";
      home.textContent = this.t("categories");
      home.style.cursor = "pointer";
      home.style.textDecoration = "underline";
      home.onclick = () => {
        this.show("categories");
        this.renderCategories();
      };
      this.el.threadBreadcrumbs.appendChild(home);

      const sep = document.createElement("span");
      sep.textContent = " / ";
      sep.style.margin = "0 8px";
      this.el.threadBreadcrumbs.appendChild(sep);

      trail.forEach((c, index) => {
        const span = document.createElement("span");
        span.className = "breadcrumb-item";
        span.textContent = c.name;
        if (index < trail.length - 1) {
          span.style.cursor = "pointer";
          span.style.textDecoration = "underline";
          span.onclick = () => {
            this.renderThreads(c.id);
          };
        } else {
          span.style.fontWeight = "bold";
        }
        this.el.threadBreadcrumbs.appendChild(span);

        if (index < trail.length - 1) {
          const s = document.createElement("span");
          s.textContent = " / ";
          s.style.margin = "0 8px";
          this.el.threadBreadcrumbs.appendChild(s);
        }
      });
    } catch (e) { console.error(e); }
  },
  async renderSubcategories(categoryId) {
    if (!this.el.subCategoryList) return;
    this.el.subCategoryList.innerHTML = "";
    if (this.el.subCategorySidebar) this.el.subCategorySidebar.style.display = "none";
    if (!categoryId) return;

    try {
      const forumMain = this.el.threadList.parentElement;
      const categories = await store.categories();
      const children = categories.filter(c => c.parent_id === categoryId);
      const inlineUlId = "inlineSubCategoryList";
      const existingInline = forumMain ? forumMain.querySelector(`#${inlineUlId}`) : null;
      
      // Add header for subcategories if present
      let sectionHeader = forumMain.querySelector("#subcategoriesHeader");
      
      if (children.length === 0) {
        if (existingInline) existingInline.remove();
        if (sectionHeader) sectionHeader.remove();
        return;
      }

      // Ensure inline subcategory list above threads
      if (forumMain) {
        // Add subcategories header
        if (!sectionHeader) {
          sectionHeader = document.createElement("div");
          sectionHeader.id = "subcategoriesHeader";
          sectionHeader.className = "panel-header";
          sectionHeader.style.paddingBottom = "10px";
          sectionHeader.style.marginBottom = "10px";
          sectionHeader.style.borderBottom = "1px solid var(--border-soft)";
          const h3 = document.createElement("h3");
          h3.textContent = this.t("subforums");
          sectionHeader.appendChild(h3);
          forumMain.insertBefore(sectionHeader, this.el.threadList);
        }
        
        const inline = existingInline || document.createElement("ul");
        inline.id = inlineUlId;
        inline.className = "list";
        if (!existingInline) {
          forumMain.insertBefore(inline, this.el.threadList);
        }
        inline.innerHTML = "";
        children.forEach(c => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="category-icon">📂</div>
            <div class="category-content">
              <div class="category-title">${escapeHtml(c.name)}</div>
              <div class="category-desc">${c.children?.length || 0} ${this.t("subforumsCount") || "подфорума"} • ${c.threads_count || 0} ${this.t("threadsCount") || "тем"}</div>
            </div>
            <div class="category-stats">
              <span class="category-stat-number">${c.posts_count || 0}</span>
              <span class="category-stat-label">${this.t("postsCount") || "постов"}</span>
            </div>
          `;
          li.addEventListener("click", () => this.renderThreads(c.id));
          inline.appendChild(li);
        });
      }
    } catch (e) { console.error(e); }
  },
  renderThreads(categoryId) {
    this.renderBreadcrumbs(categoryId);
    this.renderSubcategories(categoryId);
    const ul = this.el.threadList;
    ul.innerHTML = "";
    const q = this.el.searchInput.value.trim();
    const page = this.state.searchPage || 1;
    const catParam = categoryId ? encodeURIComponent(categoryId) : "";
    api.get(`/api/search/threads?q=${encodeURIComponent(q)}&categoryId=${catParam}&page=${page}&size=10`)
      .then(res => {
        const list = res.items;
        this.el.searchMeta.textContent = `${res.page}/${res.pages} • ${res.total}`;
        if (!list.length) {
          const li = document.createElement("li");
          li.textContent = this.t("empty");
          ul.appendChild(li);
          return;
        }
        list.forEach(t => {
          const li = document.createElement("li");
          li.classList.add("thread-card");
          const tags = (t.tags || []).map(x => `<span class="thread-tag">${escapeHtml(x)}</span>`).join(" ");
          const avatarSrc = this.avatarUrlOrFallback({ username: t.author_username, avatar_url: t.author_avatar });
          const role = t.author_role || "user";
          
          li.innerHTML = `
            <div class="thread-icon ${t.pinned ? 'pinned' : ''}">${t.pinned ? '📌' : t.locked ? '🔒' : '💭'}</div>
            <div class="category-content">
              <div class="thread-title">${t.pinned ? `<span class="badge badge-primary">${this.t("pinned")}</span> ` : ''}${escapeHtml(t.title)}</div>
              <div class="thread-meta">
                <span>${this.t("by")} ${escapeHtml(t.author_username || "unknown")}</span>
                <span class="thread-meta-separator"></span>
                <span>${new Date(t.created_at).toLocaleDateString()}</span>
                <span class="thread-meta-separator"></span>
                <span>${this.t("views")}: ${t.views || 0}</span>
              </div>
              ${tags ? `<div class="thread-tags">${tags}</div>` : ''}
            </div>
            <div class="category-stats">
              <span class="category-stat-number">${t.posts_count || 0}</span>
              <span class="category-stat-label">${this.t("postsCount")}</span>
            </div>
          `;
          
          li.addEventListener("click", () => this.openThread(t.id));
          
          // Add admin actions
          if (this.state.user && (this.state.user.role === "admin" || this.state.user.role === "moderator")) {
            const actions = document.createElement("div");
            actions.className = "inline-actions";
            actions.style.marginTop = "12px";
            
            const lockBtn = document.createElement("button");
            lockBtn.className = "ghost";
            lockBtn.textContent = t.locked ? this.t("unlock") : this.t("lock");
            lockBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              api.post(`/api/threads/${t.id}/lock`, { locked: !t.locked }).then(()=>this.renderThreads(categoryId));
            });
            
            const pinBtn = document.createElement("button");
            pinBtn.className = "ghost";
            pinBtn.textContent = t.pinned ? this.t("unpin") : this.t("pin");
            pinBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              api.post(`/api/threads/${t.id}/pin`, { pinned: !t.pinned }).then(()=>this.renderThreads(categoryId));
            });
            
            const editBtn = document.createElement("button");
            editBtn.className = "ghost";
            editBtn.textContent = this.t("edit");
            editBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              this.el.editThreadTitleInput.value = t.title;
              this.el.editThreadDialog.showModal();
              this.el.editThreadTagsInput.value = (t.tags || []).join(", ");
              this.el.editThreadForm.onsubmit = (e) => {
                e.preventDefault();
                const tags = this.el.editThreadTagsInput.value.split(",").map(s => s.trim()).filter(Boolean);
                api.post(`/api/threads/${t.id}/edit`, { title: this.el.editThreadTitleInput.value.trim(), tags })
                  .then(() => { this.el.editThreadDialog.close(); this.renderThreads(categoryId); })
                  .catch(err => alert(ui.t("apiError") + ": " + err.message));
              };
              this.el.editThreadCancel.onclick = () => this.el.editThreadDialog.close();
            });
            
            const delBtn = document.createElement("button");
            delBtn.className = "ghost";
            delBtn.textContent = this.t("delete");
            delBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              api.post(`/api/threads/${t.id}/delete`, {}).then(() => this.renderThreads(categoryId))
                .catch(err => alert(ui.t("apiError") + ": " + err.message));
            });
            
            actions.appendChild(lockBtn);
            actions.appendChild(pinBtn);
            actions.appendChild(editBtn);
            actions.appendChild(delBtn);
            li.appendChild(actions);
          }
          
          ul.appendChild(li);
        });
      });
  },
  openThread(threadId) {
    this.state.current.threadId = threadId;
    this.show("posts");
    this.renderPosts(threadId);
  },
  async renderPosts(threadId) {
    const ul = this.el.postList;
    ul.innerHTML = "";
    api.get(`/api/threads/${threadId}/meta`).then(meta => {
      if (this.el.threadMeta) this.el.threadMeta.textContent = `${escapeHtml(meta.category_name || "")} > ${escapeHtml(meta.title || "")} • ${this.t("views")}: ${meta.views || 0}`;
    }).catch(()=>{});
    
    // Render polls
    try {
      const polls = await api.get(`/api/threads/${threadId}/polls`);
      if (polls.length > 0) {
        polls.forEach(poll => {
          const pollDiv = document.createElement("div");
          pollDiv.className = "post";
          pollDiv.style.padding = "16px";
          pollDiv.style.marginBottom = "16px";
          
          const totalVotes = poll.options.reduce((sum, o) => sum + (o.votes || 0), 0);
          
          pollDiv.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 12px; font-size: 1.1em;">📊 ${escapeHtml(poll.question)}</div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              ${poll.options.map(option => {
                const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0;
                return `
                  <div style="position: relative;">
                    <div style="
                      height: 32px;
                      background: var(--border);
                      border-radius: 8px;
                      overflow: hidden;
                    ">
                      <div style="
                        height: 100%;
                        width: ${percentage}%;
                        background: var(--primary);
                        transition: width 0.3s ease;
                      "></div>
                    </div>
                    <div style="
                      position: absolute;
                      top: 50%;
                      left: 12px;
                      transform: translateY(-50%);
                      display: flex;
                      justify-content: space-between;
                      width: calc(100% - 24px);
                    ">
                      <span style="font-weight: 500;">${escapeHtml(option.text)}</span>
                      <span style="opacity: 0.8;">${option.votes || 0} (${percentage}%)</span>
                    </div>
                    <button class="ghost" data-option-id="${option.id}" data-poll-id="${poll.id}" style="
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      opacity: 0;
                      cursor: pointer;
                    "></button>
                  </div>
                `;
              }).join("")}
            </div>
            <div style="margin-top: 8px; font-size: 0.9em; opacity: 0.7;">${totalVotes} ${this.t("likes") || "гласа"}</div>
          `;
          
          // Add click handlers for voting
          pollDiv.querySelectorAll("button[data-option-id]").forEach(btn => {
            btn.addEventListener("click", async (e) => {
              const optionId = btn.dataset.optionId;
              const pollId = btn.dataset.pollId;
              try {
                const updatedPoll = await api.post(`/api/polls/${pollId}/vote`, { option_id: optionId });
                this.renderPosts(threadId); // Re-render to update poll
              } catch (err) {
                alert(ui.t("apiError") + ": " + err.message);
              }
            });
          });
          
          ul.appendChild(pollDiv);
        });
      }
    } catch (err) {
      console.error("Failed to load polls:", err);
    }
    
    const page = this.state.postsPage || 1;
    api.get(`/api/threads/${threadId}/posts_paginated?page=${page}&size=10`).then(res => {
      const list = res.items;
      if (!list.length) {
        const li = document.createElement("li");
        li.textContent = this.t("empty");
        ul.appendChild(li);
        return;
      }
      list.forEach(p => {
        const li = document.createElement("li");
        li.className = "post";
        
        const date = new Date(p.created_at).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" });
        const avatarSrc = this.avatarUrlOrFallback({ username: p.author_username, avatar_url: p.author_avatar });
        const role = p.author_role || "user";
        const roleBadge = role === "admin" ? `<span class="badge badge-error">ADMIN</span>` : (role === "moderator" ? `<span class="badge badge-warning">MOD</span>` : "");
        const likeCount = (p.reactions || []).filter(r => r.type === "like").length;
        
        // Get reaction counts
        const reactions = p.reactions || [];
        const reactionCounts = {};
        reactions.forEach(r => {
          reactionCounts[r.type] = (reactionCounts[r.type] || 0) + 1;
        });
        const reactionTypes = ["👍", "❤️", "😮", "😢", "😡"];
        
        li.innerHTML = `
          <div class="post-sidebar">
            <img src="${avatarSrc}" class="post-avatar" alt="${escapeHtml(p.author_username || "User")}">
            <div class="post-username">${escapeHtml(p.author_username || "unknown")} ${roleBadge}</div>
            <div class="post-role">${role}</div>
          </div>
          <div class="post-content-area">
            <div class="post-header">
              <div class="post-time">${date}</div>
              <div class="post-actions">
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px;">
                  ${reactionTypes.map(type => `
                    <button class="reaction-btn" data-post-id="${p.id}" data-reaction="${type}">
                      ${type} ${reactionCounts[type] || ''}
                    </button>
                  `).join('')}
                </div>
                <button class="ghost like-btn" data-post-id="${p.id}">${this.t("likes")}: ${likeCount}</button>
                <button class="ghost" data-action="quote" data-post-id="${p.id}">${this.t("quote")}</button>
                <button class="ghost" data-action="report" data-post-id="${p.id}">${this.t("report")}</button>
                ${this.state.user && (this.state.user.role === "admin" || this.state.user.role === "moderator" || this.state.user.username === p.author_username) ? `
                  <button class="ghost" data-action="edit" data-post-id="${p.id}">${this.t("edit")}</button>
                  <button class="ghost" data-action="delete" data-post-id="${p.id}">${this.t("delete")}</button>
                ` : ''}
              </div>
            </div>
            <div class="post-body">${renderMarkdownSafe(p.content)}</div>
            ${(p.attachments || []).length ? `
              <div class="attachments" style="margin-top:12px;">
                ${(p.attachments || []).map(a => `<img src="${a.url}" alt="${escapeHtml(a.name || "image")}" style="max-width:200px; border-radius:8px; border:1px solid var(--border);">`).join('')}
              </div>
            ` : ''}
          </div>
        `;
        
        // Add event listeners for buttons
        li.querySelector('[data-action="quote"]')?.addEventListener("click", () => {
          if (!this.state.user) { this.el.loginDialog.showModal(); return }
          this.el.postDialog.showModal();
          const author = p.author_username || "unknown";
          this.el.postContentInput.value = `> ${author}\n\n${p.content}\n\n`;
        });
        
        li.querySelector('[data-action="report"]')?.addEventListener("click", () => {
          if (!this.state.user) { this.el.loginDialog.showModal(); return }
          const reason = prompt(this.t("report"));
          if (reason === null) return;
          api.post(`/api/posts/${p.id}/report`, { reason }).then(() => {}).catch(err => alert(ui.t("apiError") + ": " + err.message));
        });
        
        li.querySelector('[data-action="edit"]')?.addEventListener("click", () => {
          this.el.editPostContentInput.value = p.content;
          this.el.editPostDialog.showModal();
          this.el.editPostForm.onsubmit = (e) => {
            e.preventDefault();
            api.post(`/api/posts/${p.id}/edit`, { content: this.el.editPostContentInput.value })
              .then(() => { this.el.editPostDialog.close(); this.renderPosts(threadId) })
              .catch(err => alert(ui.t("apiError") + ": " + err.message));
          };
          this.el.editPostCancel.onclick = () => this.el.editPostDialog.close();
        });
        
        li.querySelector('[data-action="delete"]')?.addEventListener("click", () => {
          api.post(`/api/posts/${p.id}/delete`, {}).then(() => this.renderPosts(threadId))
            .catch(err => alert(ui.t("apiError") + ": " + err.message));
        });
        
        li.querySelector('.like-btn')?.addEventListener("click", (e) => {
          e.stopPropagation();
          const btn = e.target;
          api.post(`/api/posts/${p.id}/react`, { type: "like" }).then(r => {
            btn.textContent = `${this.t("likes")}: ${r.count}`;
          });
        });
        
        // Add reaction button listeners
        li.querySelectorAll('.reaction-btn').forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const reaction = btn.dataset.reaction;
            api.post(`/api/posts/${p.id}/react`, { type: reaction }).then(r => {
              this.renderPosts(threadId);
            });
          });
        });
        
        ul.appendChild(li);
      });
    });
  },
  async renderMessagesList(withUserId = null) {
    this.el.messagesList.innerHTML = "";
    if (withUserId) {
      // Render conversation with a specific user
      const messages = await api.get(`/api/messages?with=${encodeURIComponent(withUserId)}`);
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.gap = "8px";
      container.style.maxHeight = "400px";
      container.style.overflowY = "auto";
      container.style.paddingBottom = "8px";
      
      // Back button
      const backBtn = document.createElement("button");
      backBtn.className = "ghost";
      backBtn.textContent = this.t("back") || "Назад";
      backBtn.style.marginBottom = "8px";
      backBtn.addEventListener("click", () => this.renderMessagesList());
      container.appendChild(backBtn);
      
      // Messages
      messages.forEach(m => {
        const msgDiv = document.createElement("div");
        const isOwn = m.sender_id === this.state.user.id;
        msgDiv.style.display = "flex";
        msgDiv.style.flexDirection = "column";
        msgDiv.style.alignItems = isOwn ? "flex-end" : "flex-start";
        msgDiv.innerHTML = `
          <div style="
            background: ${isOwn ? 'var(--primary)' : 'var(--border)'}; 
            color: ${isOwn ? 'white' : 'var(--text)'}; 
            padding: 8px 12px; 
            border-radius: 12px; 
            max-width: 70%;
            word-wrap: break-word;
          ">
            ${escapeHtml(m.content)}
          </div>
          <div style="font-size: 0.75em; opacity: 0.6; margin-top: 4px;">${new Date(m.created_at).toLocaleString()}</div>
        `;
        container.appendChild(msgDiv);
      });
      
      // Send new message form
      const formDiv = document.createElement("div");
      formDiv.style.display = "flex";
      formDiv.style.gap = "8px";
      formDiv.style.marginTop = "8px";
      formDiv.innerHTML = `
        <input type="text" placeholder="${this.t("reply")}" style="flex: 1; padding: 8px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); color: var(--text);">
        <button class="primary">${this.t("send") || "Изпрати"}</button>
      `;
      const input = formDiv.querySelector("input");
      const sendBtn = formDiv.querySelector("button");
      sendBtn.addEventListener("click", async () => {
        const content = input.value.trim();
        if (!content) return;
        await api.post("/api/messages", { receiver_id: withUserId, content });
        input.value = "";
        this.renderMessagesList(withUserId);
      });
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendBtn.click();
      });
      container.appendChild(formDiv);
      this.el.messagesList.appendChild(container);
    } else {
      // Render conversations list
      const conversations = await api.get("/api/messages");
      if (!conversations.length) {
        this.el.messagesList.innerHTML = `<div style="padding: 16px; text-align: center;">${this.t("empty")}</div>`;
      } else {
        conversations.forEach(c => {
          const li = document.createElement("li");
          li.style.cursor = "pointer";
          li.style.padding = "12px";
          li.style.display = "flex";
          li.style.alignItems = "center";
          li.style.gap = "12px";
          li.style.borderBottom = "1px solid var(--border)";
          const avatarSrc = this.avatarUrlOrFallback({ username: c.other_username, avatar_url: c.other_avatar_url });
          li.innerHTML = `
            <img src="${avatarSrc}" style="width: 40px; height: 40px; border-radius: 50%;">
            <div style="flex: 1;">
              <div style="font-weight: bold;">${escapeHtml(c.other_username)}</div>
              <div style="font-size: 0.85em; opacity: 0.7;">${new Date(c.last_message_at).toLocaleString()}</div>
            </div>
          `;
          li.addEventListener("click", () => this.renderMessagesList(c.other_user_id));
          this.el.messagesList.appendChild(li);
        });
      }
      // Add new message button
      const newMsgBtn = document.createElement("button");
      newMsgBtn.className = "primary";
      newMsgBtn.textContent = this.t("newPost") || "Ново съобщение";
      newMsgBtn.style.marginTop = "12px";
      newMsgBtn.addEventListener("click", async () => {
        const users = await api.get("/api/users");
        const userSelect = document.createElement("select");
        userSelect.style.padding = "8px";
        userSelect.style.borderRadius = "8px";
        userSelect.style.border = "1px solid var(--border)";
        userSelect.style.background = "var(--bg)";
        userSelect.style.color = "var(--text)";
        userSelect.style.flex = "1";
        users.filter(u => u.id !== this.state.user.id).forEach(u => {
          const opt = document.createElement("option");
          opt.value = u.id;
          opt.textContent = u.username;
          userSelect.appendChild(opt);
        });
        const contentInput = document.createElement("input");
        contentInput.type = "text";
        contentInput.placeholder = this.t("reply");
        contentInput.style.padding = "8px";
        contentInput.style.borderRadius = "8px";
        contentInput.style.border = "1px solid var(--border)";
        contentInput.style.background = "var(--bg)";
        contentInput.style.color = "var(--text)";
        contentInput.style.flex = "2";
        
        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.gap = "8px";
        container.style.marginTop = "12px";
        container.appendChild(userSelect);
        container.appendChild(contentInput);
        
        const sendBtn = document.createElement("button");
        sendBtn.className = "primary";
        sendBtn.textContent = this.t("send") || "Изпрати";
        sendBtn.style.marginTop = "8px";
        sendBtn.addEventListener("click", async () => {
          const receiverId = userSelect.value;
          const content = contentInput.value.trim();
          if (!receiverId || !content) return;
          await api.post("/api/messages", { receiver_id: receiverId, content });
          this.renderMessagesList();
        });
        container.appendChild(sendBtn);
        
        this.el.messagesList.appendChild(container);
      });
      this.el.messagesList.appendChild(newMsgBtn);
    }
  },
  async renderNotifications() {
    try {
        const notifications = await api.get("/api/notifications");
        this.el.notificationsList.innerHTML = "";
        if (!notifications.length) {
          this.el.notificationsList.innerHTML = `<div style="padding: 16px; text-align: center;">${this.t("empty") || "Няма уведомления"}</div>`;
        } else {
          notifications.forEach(n => {
            const li = document.createElement("li");
            li.className = "post";
            li.style.padding = "12px";
            li.style.marginBottom = "8px";
            li.style.borderBottom = "1px solid var(--border)";
            li.innerHTML = `
              <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                  <div style="font-weight: bold; ${n.read_at ? 'opacity: 0.7;' : ''}">${escapeHtml(n.title || "Уведомление")}</div>
                  <div style="font-size: 0.9em; margin-top: 4px; ${n.read_at ? 'opacity: 0.7;' : ''}">${escapeHtml(n.content || "")}</div>
                  <div style="font-size: 0.8em; color: var(--text); opacity: 0.6; margin-top: 8px;">${new Date(n.created_at).toLocaleString()}</div>
                </div>
              </div>
            `;
            if (!n.read_at) {
              li.addEventListener("click", async () => {
                await api.post(`/api/notifications/${n.id}/read`, {});
                this.renderNotifications();
              });
            }
            this.el.notificationsList.appendChild(li);
          });
        }
      } catch (err) {
        this.el.notificationsList.innerHTML = `<div style="padding: 16px; color: var(--error);">${this.t("apiError")}: ${err.message}</div>`;
      }
  },
  renderAdmin() {
    this.el.adminCategoryList.innerHTML = "";
    this.refreshMeta();
    store.categories().then(categories => {
      const tree = buildCategoryTree(categories);
      
      // Populate parent selects
      const noParentText = "-- " + (this.t("noParent") || "Без родител") + " --";
      this.el.adminCategoryParent.innerHTML = "";
      this.el.editCategoryParentInput.innerHTML = "";
      
      const defaultOpt1 = document.createElement("option");
      defaultOpt1.value = "";
      defaultOpt1.textContent = noParentText;
      this.el.adminCategoryParent.appendChild(defaultOpt1);
      
      const defaultOpt2 = document.createElement("option");
      defaultOpt2.value = "";
      defaultOpt2.textContent = noParentText;
      this.el.editCategoryParentInput.appendChild(defaultOpt2);

      const addTreeOptions = (nodes, prefix = "") => {
        nodes.forEach(c => {
          const opt = document.createElement("option");
          opt.value = c.id;
          opt.textContent = prefix + c.name;
          this.el.adminCategoryParent.appendChild(opt.cloneNode(true));
          this.el.editCategoryParentInput.appendChild(opt);
          if (c.children && c.children.length > 0) addTreeOptions(c.children, prefix + "-- ");
        });
      };
      addTreeOptions(tree);

      const renderNode = (nodes, container) => {
        nodes.forEach(c => {
          const li = document.createElement("li");
          li.innerHTML = `
            <div class="category-icon">📁</div>
            <div class="category-content">
              <div class="category-title">${escapeHtml(c.name)}${c.locked ? `<span class="badge badge-error">${this.t("locked")}</span>` : ""}</div>
              <div class="category-desc">${c.children?.length || 0} ${this.t("subforumsCount")} • ${c.threads_count || 0} ${this.t("threadsCount")}</div>
            </div>
            <div class="category-stats">
              <button class="ghost" data-action="edit" data-category-id="${c.id}">${this.t("edit")}</button>
              <button class="ghost" data-action="lock" data-category-id="${c.id}" data-locked="${c.locked}">${c.locked ? this.t("unlock") : this.t("lock")}</button>
              <button class="ghost" data-action="delete" data-category-id="${c.id}">${this.t("delete")}</button>
            </div>
          `;
          
          // Add event listeners
          li.querySelector('[data-action="edit"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.el.editCategoryNameInput.value = c.name;
            this.el.editCategoryParentInput.value = c.parent_id || "";
            Array.from(this.el.editCategoryParentInput.options).forEach(o => {
              o.disabled = (o.value === c.id);
            });
            this.el.editCategoryDialog.showModal();
            this.el.editCategoryForm.onsubmit = (e) => {
              e.preventDefault();
              const name = this.el.editCategoryNameInput.value.trim();
              const parent_id = this.el.editCategoryParentInput.value || null;
              if (!name) return;
              api.post(`/api/categories/${c.id}/edit`, { name, parent_id }).then(() => {
                this.el.editCategoryDialog.close();
                this.renderAdmin();
              });
            };
            this.el.editCategoryCancel.onclick = () => this.el.editCategoryDialog.close();
          });
          
          li.querySelector('[data-action="delete"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(this.t("delete") + "?")) {
              api.post(`/api/categories/${c.id}/delete`, {}).then(()=>this.renderAdmin());
            }
          });
          
          li.querySelector('[data-action="lock"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            api.post(`/api/categories/${c.id}/lock`, { locked: !c.locked }).then(()=>this.renderAdmin());
          });

          if (c.children && c.children.length > 0) {
            const subUl = document.createElement("ul");
            subUl.className = "list";
            subUl.style.marginTop = "8px";
            subUl.style.marginLeft = "20px";
            subUl.style.borderLeft = "2px solid var(--border)";
            subUl.style.paddingLeft = "12px";
            renderNode(c.children, subUl);
            li.appendChild(subUl);
          }
          container.appendChild(li);
        });
      };
      renderNode(tree, this.el.adminCategoryList);
    });
    this.el.adminAddCategory.onclick = () => {
      const name = this.el.adminCategoryName.value.trim();
      const parent_id = this.el.adminCategoryParent.value || null;
      if (!name) return;
      store.addCategory(name, parent_id)
        .then(() => { 
          this.el.adminCategoryName.value = ""; 
          this.el.adminCategoryParent.value = "";
          this.renderAdmin(); 
        })
        .catch(err => alert(this.t("apiError") + ": " + err.message));
    };
    api.get("/api/users").then(users => {
      this.el.adminUserList.innerHTML = "";
      users.forEach(u => {
        const li = document.createElement("li");
        const avatarSrc = this.avatarUrlOrFallback({ username: u.username, avatar_url: u.avatar_url });
        
        li.innerHTML = `
          <img src="${avatarSrc}" style="width:48px; height:48px; border-radius:50%; object-fit:cover; border:2px solid var(--primary);">
          <div class="category-content">
            <div class="category-title">
              ${escapeHtml(u.username)}
              ${u.banned ? `<span class="badge badge-error">${this.t("bannedLabel")}</span>` : ''}
              ${!u.is_confirmed ? `<span class="badge badge-warning">${this.t("emailUnconfirmed")}</span>` : ''}
            </div>
            <div class="category-desc">${escapeHtml(u.email)} • ${u.role}</div>
          </div>
          <div class="category-stats" style="flex-direction: row; gap: 8px; flex-wrap: wrap;">
            ${!u.is_confirmed ? `<button class="ghost" data-action="confirm" data-user-id="${u.id}">${this.t("confirmEmail")}</button>` : ''}
            <button class="ghost" data-action="role" data-user-id="${u.id}" data-role="moderator">${this.t("setModerator")}</button>
            <button class="ghost" data-action="role" data-user-id="${u.id}" data-role="user">${this.t("setUser")}</button>
            <button class="ghost" data-action="role" data-user-id="${u.id}" data-role="admin">${this.t("setAdmin")}</button>
            <button class="ghost" data-action="ban" data-user-id="${u.id}" data-banned="${u.banned}">${u.banned ? this.t("unban") : this.t("ban")}</button>
          </div>
        `;
        
        // Event listeners
        li.querySelector('[data-action="confirm"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          api.post(`/api/users/${u.id}/confirm`, {}).then(()=>this.renderAdmin());
        });
        
        li.querySelectorAll('[data-action="role"]').forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            api.post(`/api/users/${u.id}/role`, { role: btn.dataset.role }).then(()=>this.renderAdmin());
          });
        });
        
        li.querySelector('[data-action="ban"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          api.post(`/api/users/${u.id}/ban`, { banned: !u.banned }).then(()=>this.renderAdmin());
        });
        
        this.el.adminUserList.appendChild(li);
      });
    }).catch(err => {
      this.el.adminMeta.textContent = `${this.t("apiError")}: ${err.message || err}`;
    });
  }
};
const captcha = {
  widgets: new Map(),
  mount(container, onSolved) {
    container.innerHTML = "";
    const canvas = document.createElement("canvas");
    const input = document.createElement("input");
    const actions = document.createElement("div");
    const refresh = document.createElement("button");
    const label = document.createElement("div");
    canvas.width = 240; canvas.height = 80;
    input.type = "text";
    actions.className = "inline-actions";
    refresh.className = "ghost";
    label.className = "item-sub";
    label.textContent = ui.t("captchaSolve");
    refresh.textContent = ui.t("captchaRefresh");
    actions.appendChild(refresh);
    container.appendChild(label);
    container.appendChild(canvas);
    container.appendChild(input);
    container.appendChild(actions);
    const draw = () => {
      const code = this.generate();
      this.widgets.set(container, { code, input });
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "#0e0e17";
      ctx.fillRect(0,0,canvas.width,canvas.height);
      for (let i=0;i<10;i++) {
        ctx.strokeStyle = `rgba(124,58,237,${Math.random()*0.7+0.1})`;
        ctx.beginPath();
        ctx.moveTo(Math.random()*240, Math.random()*80);
        ctx.bezierCurveTo(Math.random()*240, Math.random()*80, Math.random()*240, Math.random()*80, Math.random()*240, Math.random()*80);
        ctx.stroke();
      }
      ctx.font = "bold 36px Inter, Arial";
      for (let i=0;i<code.length;i++) {
        const ch = code[i];
        const x = 20 + i*40 + Math.random()*6;
        const y = 50 + Math.random()*10;
        const angle = (Math.random()*0.5 - 0.25);
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(angle);
        ctx.fillStyle = ["#a855f7","#7c3aed","#6d28d9","#f2f2f7"][i%4];
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      }
      for (let i=0;i<60;i++) {
        ctx.fillStyle = `rgba(168,85,247,${Math.random()*0.8})`;
        ctx.fillRect(Math.random()*240, Math.random()*80, 2, 2);
      }
    };
    refresh.addEventListener("click", draw);
    draw();
  },
  generate() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let s = "";
    for (let i=0;i<5;i++) s += chars[Math.floor(Math.random()*chars.length)];
    return s;
  },
  verify(container) {
    const w = this.widgets.get(container);
    if (!w) return false;
    const ok = w.input.value.trim().toUpperCase() === w.code;
    return ok;
  }
};

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "\"":"&quot;", "'":"&#39;" }[c]));
}

function renderMarkdownSafe(md) {
  let s = escapeHtml(md);
  s = s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  s = s.replace(/`(.+?)`/g, "<code>$1</code>");
  s = s.replace(/(?:\r?\n){2,}/g, "<br/><br/>");
  s = s.replace(/\r?\n/g, "<br/>");
  return s;
}

/* =========================================================
   GTA CRMP / RP STANDARD FEATURES ADDON
   - Thread Status, Templates, Warn System, Reputation
   - Default CRMP Categories installation
   ========================================================= */
const CRMP_TEMPLATES = {
  report: `[ЖАЛБА / REPORT]

Играч / Потребител: 
Причина за жалбата: 
Нарушено правило: 
Дата и час на събитието: 
Описание: 

❯ Докажателства (линкове, снимки, видеа):
1. 
2. 

Допълнителни коментари: 

____________________________________
*(Заявлението се разглежда в срок до 48 часа)*`,
  application: `[ЗАЯВЛЕНИЕ / APPLICATION]

◈ Линк към профила: 
◈ Име на персонажа (IG): 
◈ Ниво на персонажа: 
◈ Предишни фракции/организации: 

◈ Защо точно ти трябва тази позиция/фракция: 
◈ Какво ще допринесеш за общността: 

◈ Предишни наказания (банове, предупреждения): 

◈ Кога си играл последно на сървъра: 

◈ Знаеш ли правилата на сървъра? [Да/Не]`,
  ban_appeal: `[АПЕЛ ЗА БАН / UNBAN]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚙ ОСНОВНА ИНФОРМАЦИЯ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Име (Forum Username): 
Име на персонажа (In Game): 
Email (за връзка): 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⛔ ИНФОРМАЦИЯ ЗА НАКАЗАНИЕТО
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Причина за бана (както е указано): 
Администратор, който е наложил наказанието: 
Дата на наказанието: 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📝 АПЕЛ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Защо смяташ, че наказанието е несправедливо? 
Надяваш се ли да бъдеш прощен и защо? 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ДОПЪЛНИТЕЛНО
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Запознал(а) ли си се с правилата? [Да / Не]
2. Ще спазваш ли правилата в бъдеще? [Да / Не]
3. Според каквото ти е известно, нарушаваше ли някое правило друг играч? [Да / Не / Не зная]

⚠ Извинение и обещание: 

*Моля, попълнете полетата внимателно.*`,
  warn_appeal: `[АПЕЛ ЗА ПРЕДУПРЕЖДЕНИЕ]

Име: 
Номер на предупреждението: 
Причина (оригинална): 
Администратор, който го е издал: 

Обяви твоята позиция: 

Докажателства (ако има): 

Бъдещ ангажимент да спазваш правилата:`,
  suggestion: `[ПРЕДЛОЖЕНИЕ / SUGGESTION]

📌 Заглавие: 

❯ Какво предлагаш? 
❯ Как ще подобри сървъра? 
❯ Да се наложат ли промени в правилата? 

➤ Плюсове от предложението:
1. 
2. 

➤ Минуси от предложението (ако има):
1. 

⭐ Важност: [Низка / Средна / Висока / Критична]
📌 Допълнителни коментари:`,
  bug: `[BUG REPORT / ГРЕШКА]

Заглавие на бъга: 

📋 Какво се случва?
...

🔁 Как да се възпроизведе (Reproduction Steps):
1. 
2. 
3. 

✅ Какво очакваше да се случи?

📸 / 🎞 Докажателства (скрийншотове, геймплеи):
(линкове тук)

🖥 Система:
  • OS: 
  • Играта: CRMP / SA:MP
  • Версия на мод пака:

💡 Предложение за отстраняване (по избор):`,
  whitelist: `[WHITELIST ЗАЯВКА]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  WHITELIST APPLICATION FORM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Реално име (по избор): 
2. Възраст: 
3. Discord / Telegram / Email (за връзка): 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  IN-GAME CHARACTER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

4. Име на персонажа (ИГРОВО): 
5. Възраст на персонажа: 
6. Биография на персонажа (минимум 150 думи):
(Опиши детайлно произход, детство, опит, как е достигнал до сега...)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  ROLEPLAY EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

7. Имате ли предварителен RolePlay опит? [Да/Не]
    Ако ДА - обясни къде и колко време: 

8. Какво е RolePlay според теб? 
9. Какво е MetaGaming? 
10. Какво е PowerGaming? 
11. Какво означава FearRP? 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  OOC ЗАЯВЛЕНИЕ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

12. Ще спазваш ли правилата на сървъра? [Да/Не]
13. Срещу се ли с наказание като бан за нарушаване? [Да/Не]

*Декларирам, че информацията горе е вярна и че съм запознат/а с правилата.*`,
  complaint: `[ЖАЛБА ДО АДМИНИСТРАЦИЯТА]

За кого е жалбата: 
- [ ] Администратор / Модератор
- [ ] Играч
- [ ] Друго

Име на обекта: 

Причина за жалбата (детайлно): 
Кое правило е нарушено: 

Дата и час: 

Докажателства:
1. 
2. 

Искаш ли да получаваш отговори за напредъка? [Да/Не]`,
  faction_app: `[ЗАЯВКА ЗА ФРАКЦИЯ / ORG]

🏷 Фракция / Организация: 
🧑 Име на персонажа (IG): 
⭐ Ниво / Опит: 
📅 Кога започна да играеш? 

━━━━━━━━━━━━━━━━━━━
📋 ПОДРОБНОСТИ
━━━━━━━━━━━━━━━━━━━

➤ Защо точно тази фракция? 
➤ Какво знаеш за нея? 
➤ Какво ще направиш за подобрение й? 

🎯 Предишни членства:
1. 
2. 

⚠ Предишни наказания: 

🗣 RP Пример (сцена, която искаме да видиш):

_Заявлението ще бъде преразгледано в до 3 дни._`
};

const CRMP_DEFAULT_CATEGORIES = [
  { name: "📢 Новини и Обявления", icon: "📢", desc: "Официални съобщения от екипа" },
  { name: "📋 Правила на сървъра", icon: "📋", desc: "Прочети преди да играеш!" },
  { name: "💭 Общо обсъждане", icon: "💭", desc: "Всичко свързано с сървъра" },
  { name: "🔰 Представяне - Новопристигнали", icon: "🔰", desc: "Кажете здравей на общността" },
  { name: "👥 Фракции и Организации", icon: "👥", desc: "Правни и неправни фракции",
    children: [
      { name: "🚔 Полиция (LSPD)", icon: "🚔", desc: "Закона и ред" },
      { name: "🏥 Болница (EMS / LSFD)", icon: "🏥", desc: "Медицински екип и пожарникари" },
      { name: "🏛️ Правителство / Съд", icon: "🏛️", desc: "Гръдска администрация" },
      { name: "⚖️ Министерство на Правосъдието", icon: "⚖️", desc: "Съд и прокуратура" },
      { name: "🔫 Мафии и Криминални групи", icon: "🔫", desc: "Неправни организации" },
      { name: "🏴 Уличен Бандитизъм", icon: "🏴", desc: "Банди и щабове" }
    ]
  },
  { name: "🏪 Бизнеси и Имоти", icon: "🏪", desc: "Фирми, предприятия, търговия" },
  { name: "📝 Заявления", icon: "📝", desc: "Заявки за фракции, Whitelist",
    children: [
      { name: "💯 Whitelist Заявки", icon: "💯", desc: "Достъп до сървъра" },
      { name: "📨 Заявки за фракция", icon: "📨", desc: "Прием в организации" },
      { name: "💼 Заявки за персонал", icon: "💼", desc: "Admin / Moderator / Helper" }
    ]
  },
  { name: "📨 Репорти и Жалби", icon: "📨", desc: "Докладвай нарушители",
    children: [
      { name: "👮 Жалби за Играч", icon: "👮", desc: "Player Reports" },
      { name: "🛡️ Жалби за Администрация", icon: "🛡️", desc: "Staff Reports" },
      { name: "🐛 Bug Reports", icon: "🐛", desc: "Докладвай бъгове" }
    ]
  },
  { name: "⚠️ Апели", icon: "⚠️", desc: "Обжалвания на наказания",
    children: [
      { name: "🔓 Ban Appeal / Unban", icon: "🔓", desc: "Обжалване на бан" },
      { name: "📄 Warn Appeal", icon: "📄", desc: "Обжалване на предупреждение" }
    ]
  },
  { name: "💡 Предложения и идеи", icon: "💡", desc: "Сподели идеята си за бъдещето" },
  { name: "🛒 Marketplace - Търговия", icon: "🛒", desc: "Продавай и купувай предмети" },
  { name: "🎉 Събития и Конкурси", icon: "🎉", desc: "Официални игри и награди" },
  { name: "📺 Media (Снимки и Клипове)", icon: "📺", desc: "Сподели твоите геймплеи" },
  { name: "🎓 Уроци и Ръководства", icon: "🎓", desc: "Надгради знанията си за RolePlay" },
  { name: "📊 Статистика и Онлайн", icon: "📊", desc: "Актуална информация за сървъра" }
];

(function installCrmpFeatures() {
  const origCache = ui.cache.bind(ui);
  ui.cache = function() {
    origCache();
    this.el.threadStatusSelect = document.getElementById("threadStatusSelect");
    this.el.threadTemplateSelect = document.getElementById("threadTemplateSelect");
    this.el.threadStatusLabel = document.getElementById("threadStatusLabel");
    this.el.threadTemplateLabel = document.getElementById("threadTemplateLabel");
    this.el.editThreadStatusSelect = document.getElementById("editThreadStatusSelect");
    this.el.editThreadStatusLabel = document.getElementById("editThreadStatusLabel");
    this.el.profileReputation = document.getElementById("profileReputation");
    this.el.profileWarnCount = document.getElementById("profileWarnCount");
    this.el.profileRepValue = document.getElementById("profileRepValue");
    this.el.profileRepLabel = document.getElementById("profileRepLabel");
    this.el.profileWarnsLabel = document.getElementById("profileWarnsLabel");
    this.el.profileWarnsValue = document.getElementById("profileWarnsValue");
    this.el.profileWarnsList = document.getElementById("profileWarnsList");
    this.el.adminInstallRpBtn = document.getElementById("adminInstallRpBtn");
    this.el.adminCategoryIcon = document.getElementById("adminCategoryIcon");
  };

  const origBind = ui.bind.bind(ui);
  ui.bind = function() {
    origBind();

    if (this.el.threadTemplateSelect) {
      this.el.threadTemplateSelect.addEventListener("change", () => {
        const tpl = this.el.threadTemplateSelect.value;
        if (tpl && CRMP_TEMPLATES[tpl]) {
          const cur = this.el.threadContentInput.value.trim();
          if (!cur) this.el.threadContentInput.value = CRMP_TEMPLATES[tpl];
          else if (confirm("Замени съдържанието с шаблона?")) {
            this.el.threadContentInput.value = CRMP_TEMPLATES[tpl];
          }
        }
      });
    }

    if (this.el.adminInstallRpBtn) {
      this.el.adminInstallRpBtn.addEventListener("click", async () => {
        if (!this.state.user || this.state.user.role !== "admin") {
          alert(this.t("adminOnly")); return;
        }
        if (!confirm(this.t("adminRpInstallNote") + "?\n(Ще бъдат добавени само липсващите, без презаписване)")) return;
        try {
          await this.installDefaultCrmpCategories();
          alert(this.t("adminRpInstalled"));
          this.renderAdmin();
          this.renderCategories();
        } catch (e) {
          alert(this.t("apiError") + ": " + e.message);
        }
      });
    }

    const origThreadSubmit = this.el.threadForm.onsubmit;
    const self = this;
    this.el.threadForm.addEventListener("submit", async (e) => {
      const title = this.el.threadTitleInput.value.trim();
      const content = this.el.threadContentInput.value.trim();
      if (!title || !content) return;
      const status = this.el.threadStatusSelect?.value || "open";
      const template = this.el.threadTemplateSelect?.value || "";
      try {
        const t = await store.addThread(this.state.current.categoryId, title, content);
        await api.post(`/api/threads/${t.id}/edit`, { status, template });
      } catch {}
    });
  };

  const origApplyLang = ui.applyLang.bind(ui);
  ui.applyLang = function() {
    origApplyLang();

    if (this.el.threadStatusLabel) this.el.threadStatusLabel.textContent = this.t("threadStatusLabel");
    if (this.el.threadTemplateLabel) this.el.threadTemplateLabel.textContent = this.t("threadTemplateLabel");
    if (this.el.editThreadStatusLabel) this.el.editThreadStatusLabel.textContent = this.t("editThreadStatusLabel");
    if (this.el.profileRepLabel) this.el.profileRepLabel.textContent = this.t("reputation");
    if (this.el.profileWarnsLabel) this.el.profileWarnsLabel.textContent = this.t("warnings");
    if (this.el.adminInstallRpBtn) this.el.adminInstallRpBtn.textContent = "💾 " + this.t("adminInstallRp");

    const mapStatus = (select, dataAttr) => {
      if (!select) return;
      Array.from(select.options).forEach(o => {
        const k = o.getAttribute(dataAttr);
        if (k) o.textContent = this.t(k) || o.textContent;
      });
    };
    mapStatus(this.el.threadStatusSelect, "data-label-status");
    mapStatus(this.el.threadTemplateSelect, "data-label-template");
    mapStatus(this.el.editThreadStatusSelect, "data-edit-status");
  };

  ui.installDefaultCrmpCategories = async function() {
    const cats = await store.categories();
    const existingNames = new Set(cats.map(c => c.name.toLowerCase()));
    const createdIds = {};
    for (const root of CRMP_DEFAULT_CATEGORIES) {
      let rootId = null;
      if (!existingNames.has(root.name.toLowerCase())) {
        const cat = await store.addCategory(root.name, null);
        rootId = cat.id;
      } else {
        const match = cats.find(c => c.name.toLowerCase() === root.name.toLowerCase());
        if (match) rootId = match.id;
      }
      if (root.children && rootId) {
        for (const child of root.children) {
          if (!existingNames.has(child.name.toLowerCase())) {
            await store.addCategory(child.name, rootId);
          }
        }
      }
    }
    return true;
  };

  const origRenderThreads = ui.renderThreads.bind(ui);
  ui.renderThreads = function(categoryId) {
    this.state.current.categoryId = categoryId;
    this.show("threads");
    store.threadsByCategory(categoryId).then(async data => {
      const tree = await store.categories().then(buildCategoryTree);
      this.renderThreadBreadcrumbs(tree, categoryId);
      this.renderSubCategories(tree, categoryId);
      let threads = data.threads || data;
      if (this.el.searchInput.value.trim()) {
        const q = this.el.searchInput.value.trim().toLowerCase();
        threads = threads.filter(t => (t.title || "").toLowerCase().includes(q));
        if (this.el.searchMeta) {
          this.el.searchMeta.textContent = threads.length ? `Намерени: ${threads.length}` : 'Няма намерени теми';
        }
      } else if (this.el.searchMeta) this.el.searchMeta.textContent = '';
      this.el.threadList.innerHTML = "";
      const page = this.state.searchPage || 1;
      const PER = 10;
      threads.sort((a, b) => (Number(b.pinned) - Number(a.pinned)) || ((b.last_reply_at || b.created_at) - (a.last_reply_at || a.created_at)));
      const visible = threads.slice((page - 1) * PER, page * PER);
      const userMap = {};
      try {
        const users = await api.get("/api/users");
        users.forEach(u => userMap[u.id] = u);
      } catch {}
      visible.forEach(t => {
        const li = document.createElement("li");
        let authorName = "—";
        if (userMap[t.author_id]) authorName = userMap[t.author_id].username;
        li.innerHTML = `
          <div class="thread-icon ${t.pinned ? 'pinned' : ''}">${t.pinned ? '📌' : '💬'}</div>
          <div class="category-content">
            <div class="category-title">
              ${t.pinned ? `<span class="badge badge-primary">${this.t("pinned")}</span> ` : ''}
              ${t.status ? `<span class="thread-status-badge thread-status-${t.status}">${this.t("status" + capitalizeStatus(t.status))}</span>` : ''}
              ${t.template ? `<span class="thread-template-badge">[${t.template.toUpperCase().replace(/_/g,'-')}]</span>` : ''}
              ${escapeHtml(t.title)}
            </div>
            <div class="thread-meta">
              <span>${this.t("by")}: <strong>${escapeHtml(authorName)}</strong></span>
              <span class="thread-meta-separator"></span>
              <span>${new Date(t.created_at).toLocaleDateString()} ${new Date(t.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
              ${t.views ? `<span class="thread-meta-separator"></span><span>👁️ ${t.views} ${this.t("viewCount") || ''}</span>` : ''}
            </div>
            ${Array.isArray(t.tags) && t.tags.length ? `<div class="thread-tags">${t.tags.map(tag => `<span class="thread-tag">#${escapeHtml(tag)}</span>`).join("")}</div>` : ''}
          </div>
          <div class="category-stats">
            <span class="category-stat-number">${t.posts_count || 0}</span>
            <span class="category-stat-label">${this.t("postsCount")}</span>
          </div>
        `;
        li.addEventListener("click", () => this.openThread(t.id));
        this.el.threadList.appendChild(li);
      });
      if (!visible.length) {
        const li = document.createElement("li");
        li.innerHTML = `<div style="width:100%; text-align:center; padding: 24px; opacity:0.6;">${this.t("empty")}</div>`;
        this.el.threadList.appendChild(li);
      }
    }).catch(err => alert(this.t("apiError") + ": " + err.message));
  };

  function capitalizeStatus(s) {
    if (!s) return "";
    if (s === "in_progress") return "InProgress";
    if (s === "under_review") return "Review";
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  const origRenderPosts = ui.renderPosts.bind(ui);
  ui.renderPosts = function(threadId) {
    this.state.current.threadId = threadId;
    this.show("posts");
    store.postsByThread(threadId).then(async data => {
      const posts = data.posts || data;
      const thread = data.thread || (await api.get(`/api/threads/${threadId}`));
      if (!thread) throw new Error("Thread missing");
      try { await api.post(`/api/threads/${threadId}/view`, {}); } catch (e) {}
      this.el.postsTitle.textContent = thread.title;
      const userMap = {};
      try {
        const users = await api.get("/api/users");
        users.forEach(u => userMap[u.id] = u);
      } catch {}

      let statusBadgeHtml = "";
      if (thread.status) {
        const label = this.t("status" + capitalizeStatus(thread.status));
        statusBadgeHtml = `<span class="thread-status-badge thread-status-${thread.status}">${label}</span>`;
      }
      let tplBadgeHtml = "";
      if (thread.template) {
        tplBadgeHtml = `<span class="thread-template-badge">[${thread.template.toUpperCase().replace(/_/g,'-')}]</span>`;
      }
      let authorMeta = "";
      if (userMap[thread.author_id]) {
        const u = userMap[thread.author_id];
        authorMeta = `${this.t("by")}: <strong>${escapeHtml(u.username)}</strong>`;
      }
      let viewsHtml = "";
      if (thread.views) viewsHtml = `&nbsp;• 👁️ ${thread.views} ${this.t("viewCount") || ''}`;
      this.el.threadMeta.innerHTML = `${authorMeta}&nbsp;•&nbsp;${new Date(thread.created_at).toLocaleString()}${viewsHtml}&nbsp;${statusBadgeHtml}&nbsp;${tplBadgeHtml}`;
      this.el.postList.innerHTML = "";

      const page = this.state.postsPage || 1;
      const PER = 8;
      const visible = posts.slice((page - 1) * PER, page * PER);
      const me = this.state.user;

      for (const p of visible) {
        const li = document.createElement("li");
        li.className = "post";
        li.dataset.postId = p.id;
        const author = userMap[p.author_id] || {};
        const avatarSrc = this.avatarUrlOrFallback(author);

        const authorName = author.username || "Unknown";
        const authorRole = author.role || "user";
        const rep = author.reputation || 0;
        const warns = (author.warn_count || 0);
        const warnLabelClass = warns >= 3 ? "warn-level-high" : warns >= 2 ? "warn-level-mid" : "warn-level-low";
        const repClass = rep > 0 ? "rep-positive" : (rep < 0 ? "rep-negative" : "rep-neutral");
        const repSign = rep > 0 ? "+" : "";

        const dotsHtml = Array.from({ length: 3 }).map((_, i) =>
          `<span class="warn-dot ${i < warns ? 'active' : ''}"></span>`
        ).join("");

        let warnBarHtml = "";
        if (author.id) {
          warnBarHtml = `<div class="warn-indicator ${warnLabelClass}" style="margin-top:4px;justify-content:center;">${dotsHtml}</div>`;
        }

        let actionsHtml = "";
        if (me) {
          const canEdit = (me.id === p.author_id) || me.role === "moderator" || me.role === "admin";
          const canMod = me.role === "moderator" || me.role === "admin";
          actionsHtml = `<div class="post-actions">
            <button class="like-btn" data-post-id="${p.id}">👍 ${this.t("likes")}: ${p.likes_count || 0}</button>
            ${me.id !== p.author_id ? `<div class="post-rep-buttons">
              <button class="rep-btn rep-btn-up" data-rep-action="up" data-post-id="${p.id}" title="+ Репутация">＋</button>
              <button class="rep-btn rep-btn-down" data-rep-action="down" data-post-id="${p.id}" title="- Репутация">－</button>
            </div>` : ''}
            <button class="reaction-btn" data-post-id="${p.id}">😀</button>
            <button class="reaction-btn" data-post-id="${p.id}">❤️</button>
            <button class="reaction-btn" data-post-id="${p.id}">😂</button>
            <button class="ghost" data-action="quote" data-post-id="${p.id}" style="padding:8px 12px;">${this.t("quote")}</button>
            <button class="ghost" data-action="report" data-post-id="${p.id}" style="padding:8px 12px;">${this.t("report")}</button>
            ${canEdit ? `<button class="ghost" data-action="edit-post" data-post-id="${p.id}" style="padding:8px 12px;">${this.t("edit")}</button>` : ''}
            ${canMod ? `<button class="ghost" data-action="delete-post" data-post-id="${p.id}" style="padding:8px 12px;">${this.t("delete")}</button>` : ''}
          </div>`;
        }

        li.innerHTML = `
          <div class="post-sidebar">
            <img src="${avatarSrc}" class="post-avatar" alt="">
            <div class="post-username">${escapeHtml(authorName)}</div>
            <div class="post-role" style="text-transform:uppercase;">${authorRole}</div>
            <div class="rep-pts ${repClass}" style="margin-top:8px;">${repSign}${rep}</div>
            ${warnBarHtml}
          </div>
          <div class="post-content-area">
            <div class="post-header">
              <span class="post-time">${new Date(p.created_at).toLocaleString()}</span>
            </div>
            <div class="post-body">${renderMarkdownSafe(p.content || "")}</div>
            ${(p.attachments && p.attachments.length) ? `<div class="attachments">${p.attachments.map(a =>
              /\\.(png|jpe?g|gif|webp)$/i.test(a) ? `<img src="${a}" alt="attachment">` : `<a href="${a}" target="_blank" class="badge badge-primary">${this.t("chooseFile") || 'File'}</a>`
            ).join("")}</div>` : ''}
            ${actionsHtml}
          </div>
        `;

        li.querySelector(".like-btn")?.addEventListener("click", (e) => {
          e.stopPropagation();
          const id = p.id;
          api.post(`/api/posts/${id}/like`, {}).then(() => this.renderPosts(threadId)).catch(err => alert(this.t("apiError") + ": " + err.message));
        });

        li.querySelectorAll(".rep-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            if (!this.state.user || this.state.user.id === p.author_id) return;
            const delta = btn.dataset.repAction === "up" ? 1 : -1;
            const reason = prompt(this.t("repDialogReason") + ":");
            if (reason === null) return;
            api.post(`/api/users/${p.author_id}/reputation`, { points: delta, post_id: p.id, reason: reason || "" }).then(() => {
              this.renderPosts(threadId);
            }).catch(err => alert(this.t("apiError") + ": " + err.message));
          });
        });

        li.querySelectorAll(".reaction-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const typeMap = { "😀": "like", "❤️": "love", "😂": "haha" };
            const t = typeMap[btn.textContent.trim()] || "like";
            const id = p.id;
            api.post(`/api/posts/${id}/react`, { type: t }).then(() => this.renderPosts(threadId)).catch(err => alert(this.t("apiError") + ": " + err.message));
          });
        });

        li.querySelector('[data-action="quote"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!this.state.user) { this.el.loginDialog.showModal(); return; }
          const quote = `> **${escapeHtml(authorName)}** каза:\\n${(p.content || "").split("\\n").map(l => "> " + l).join("\\n")}\\n\\n`;
          this.el.postContentInput.value = quote;
          this.el.postDialog.showModal();
        });
        li.querySelector('[data-action="report"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!this.state.user) { this.el.loginDialog.showModal(); return; }
          const r = prompt(this.t("warnDialogReason") + ":");
          if (r === null) return;
          api.post(`/api/posts/${p.id}/report`, { reason: r }).then(() => alert("OK")).catch(err => alert(this.t("apiError") + ": " + err.message));
        });
        li.querySelector('[data-action="edit-post"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          this.el.editPostTitle.textContent = this.t("editPost");
          this.el.editPostContentInput.value = p.content || "";
          this.el.editPostDialog.showModal();
          this.el.editPostCancel.onclick = () => this.el.editPostDialog.close();
          this.el.editPostForm.onsubmit = (ev) => {
            ev.preventDefault();
            api.post(`/api/posts/${p.id}/edit`, { content: this.el.editPostContentInput.value }).then(() => {
              this.el.editPostDialog.close();
              this.renderPosts(threadId);
            }).catch(err => alert(this.t("apiError") + ": " + err.message));
          };
        });
        li.querySelector('[data-action="delete-post"]')?.addEventListener("click", (e) => {
          e.stopPropagation();
          if (confirm(this.t("delete") + "?")) api.post(`/api/posts/${p.id}/delete`, {}).then(() => this.renderPosts(threadId)).catch(err => alert(this.t("apiError") + ": " + err.message));
        });

        if (me && (me.role === "moderator" || me.role === "admin")) {
          const header = li.querySelector(".post-header");
          const editBtn = document.createElement("button");
          editBtn.className = "ghost";
          editBtn.style.padding = "4px 8px";
          editBtn.style.fontSize = "12px";
          editBtn.textContent = "✏️ " + (this.t("editThread") || 'Status');
          editBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.openEditThread(thread);
          });
          header.appendChild(editBtn);
        }
        this.el.postList.appendChild(li);
      }
      if (!visible.length) {
        const li = document.createElement("li");
        li.className = "post";
        li.innerHTML = `<div style="width:100%; text-align:center; padding: 24px; opacity:0.6;">${this.t("empty")}</div>`;
        this.el.postList.appendChild(li);
      }
      const back = this.el.backToThreads;
      this.threadActions(thread);
    }).catch(err => alert(this.t("apiError") + ": " + err.message));
  };

  const origThreadActions = ui.threadActions ? ui.threadActions.bind(ui) : null;
  ui.threadActions = function(thread) {
    if (origThreadActions) origThreadActions(thread);
    const me = this.state.user;
    if (!me) return;
    const actionsEl = document.getElementById("addPostBtn")?.parentElement;
    if (!actionsEl) return;
    const isMod = me.role === "moderator" || me.role === "admin";

    let statusMenu = actionsEl.querySelector("#rpThreadStatusMenu");
    if (isMod && !statusMenu) {
      statusMenu = document.createElement("select");
      statusMenu.id = "rpThreadStatusMenu";
      statusMenu.style.cssText = "padding:10px;border:1px solid var(--border);border-radius:4px;background:var(--bg-soft);color:var(--text);font-family:inherit;";
      const options = [
        ["open", "statusOpen"],
        ["in_progress", "statusInProgress"],
        ["approved", "statusApproved"],
        ["rejected", "statusRejected"],
        ["closed", "statusClosed"],
        ["under_review", "statusReview"]
      ];
      options.forEach(([v, k]) => {
        const o = document.createElement("option");
        o.value = v;
        o.textContent = this.t(k);
        if (thread.status === v) o.selected = true;
        statusMenu.appendChild(o);
      });
      statusMenu.addEventListener("change", () => {
        api.post(`/api/threads/${thread.id}/edit`, { status: statusMenu.value }).then(() => this.renderPosts(thread.id)).catch(err => alert(this.t("apiError") + ": " + err.message));
      });
      actionsEl.insertBefore(statusMenu, actionsEl.firstChild);
    } else if (!isMod && statusMenu) statusMenu.remove();

    if (isMod) {
      const approveBtn = actionsEl.querySelector("#rpApproveBtn");
      if (!approveBtn) {
        const btn = document.createElement("button");
        btn.id = "rpApproveBtn";
        btn.className = "ghost";
        btn.style.cssText = "background:rgba(16,185,129,0.12);color:#10b981;border:1px solid rgba(16,185,129,0.4);";
        btn.textContent = "✅ " + (this.t("approveApplication") || 'Approve');
        btn.addEventListener("click", () => {
          api.post(`/api/threads/${thread.id}/edit`, { status: "approved" }).then(() => this.renderPosts(thread.id)).catch(err => alert(this.t("apiError") + ": " + err.message));
        });
        actionsEl.appendChild(btn);
      }
      const rejectBtn = actionsEl.querySelector("#rpRejectBtn");
      if (!rejectBtn) {
        const btn = document.createElement("button");
        btn.id = "rpRejectBtn";
        btn.className = "ghost";
        btn.style.cssText = "background:rgba(239,68,68,0.12);color:#ef4444;border:1px solid rgba(239,68,68,0.4);";
        btn.textContent = "❌ " + (this.t("rejectApplication") || 'Reject');
        btn.addEventListener("click", () => {
          api.post(`/api/threads/${thread.id}/edit`, { status: "rejected" }).then(() => this.renderPosts(thread.id)).catch(err => alert(this.t("apiError") + ": " + err.message));
        });
        actionsEl.appendChild(btn);
      }
    }
  };

  const origOpenEditThread = ui.openEditThread ? ui.openEditThread.bind(ui) : null;
  ui.openEditThread = function(thread) {
    this.el.editThreadTitle.textContent = this.t("editThread");
    this.el.editThreadTitleInput.value = thread.title || "";
    this.el.editThreadTagsInput.value = (thread.tags || []).join(", ");
    if (this.el.editThreadStatusSelect) {
      Array.from(this.el.editThreadStatusSelect.options).forEach(o => {
        o.selected = (o.value === thread.status);
      });
    }
    this.el.editThreadDialog.showModal();
    const self = this;
    this.el.editThreadCancel.onclick = () => this.el.editThreadDialog.close();
    this.el.editThreadForm.onsubmit = (e) => {
      e.preventDefault();
      const title = this.el.editThreadTitleInput.value.trim();
      const tags = (this.el.editThreadTagsInput?.value || "").split(",").map(s => s.trim()).filter(Boolean);
      const payload = { title, tags };
      if (this.el.editThreadStatusSelect) payload.status = this.el.editThreadStatusSelect.value;
      api.post(`/api/threads/${thread.id}/edit`, payload).then(() => {
        this.el.editThreadDialog.close();
        if (this.state.current.threadId === thread.id) this.renderPosts(thread.id);
        else this.renderThreads(this.state.current.categoryId);
      }).catch(err => alert(this.t("apiError") + ": " + err.message));
    };
  };

  const origProfileBtn = ui.el.profileBtn?.onclick;
  ui.el.profileBtn?.addEventListener("click", async () => {
    if (!this.state.user) return;
    const id = this.state.user.id;
    try {
      const w = await api.get(`/api/users/${id}/warns`).catch(() => []);
      const active = (w || []).filter(ww => ww.active || !ww.expired).length;
      const total = (w || []).length;
      const max = 3;
      if (this.el.profileWarnsValue) {
        this.el.profileWarnsValue.textContent = `${active} / ${max}`;
      }
      if (this.el.profileWarnCount) {
        this.el.profileWarnCount.textContent = `⚠️ ${this.t("warnCount")}: ${active}/${max}`;
      }
      if (this.el.profileWarnsList) {
        this.el.profileWarnsList.innerHTML = "";
        if (!w || !w.length) {
          this.el.profileWarnsList.innerHTML = `<div class="item-sub" style="opacity:0.6;">— Няма предупреждения —</div>`;
        } else {
          w.slice(0, 10).forEach(ww => {
            const el = document.createElement("div");
            el.className = "warn-card " + ((ww.active || !ww.expired) ? "active" : "expired");
            const expired = ww.expired;
            el.innerHTML = `
              <div class="warn-card-header">
                <span class="warn-card-reason">${escapeHtml(ww.reason || "N/A")}</span>
                <span class="warn-card-points">${ww.points || 1} ${this.t("warnPoints")}</span>
              </div>
              <div class="warn-card-by">${this.t("warnBy")}: ${escapeHtml(ww.issued_by || "Admin")} • ${this.t("warnDate")}: ${new Date(ww.created_at || Date.now()).toLocaleString()}</div>
              <div style="margin-top:4px;font-size:11px;letter-spacing:0.8px;text-transform:uppercase;font-weight:700;color:${expired ? '#64748b' : '#ef4444'};">${expired ? this.t("warnExpired") : this.t("warnActive")}</div>
            `;
            this.el.profileWarnsList.appendChild(el);
          });
        }
      }
    } catch {}
    try {
      const stats = await api.get(`/api/users/${id}/stats`).catch(() => ({ reputation: 0 }));
      const rep = stats.reputation || 0;
      const sign = rep > 0 ? "+" : "";
      if (this.el.profileRepValue) {
        this.el.profileRepValue.textContent = sign + rep;
        this.el.profileRepValue.style.color = rep >= 0 ? "#10b981" : "#ef4444";
      }
      if (this.el.profileReputation) {
        this.el.profileReputation.textContent = `⭐ ${this.t("reputation")}: ${sign}${rep}`;
        this.el.profileReputation.style.color = rep >= 0 ? "#10b981" : "#ef4444";
      }
    } catch {}
  });

  const origRenderAdmin = ui.renderAdmin.bind(ui);
  ui.renderAdmin = function() {
    origRenderAdmin();
    const self = this;
    if (!this.el.adminUserList) return;

    setTimeout(async () => {
      if (this.state.user?.role !== "admin") return;
      try {
        const users = await api.get("/api/users");
        const userEls = this.el.adminUserList.querySelectorAll("li");
        let i = 0;
        for (const li of userEls) {
          const u = users[i++];
          if (!u) continue;
          const actions = li.querySelector(".admin-user-actions");
          if (!actions) {
            const wrap = document.createElement("div");
            wrap.className = "admin-user-actions";
            const statsBox = li.querySelector(".category-stats");
            if (statsBox) statsBox.parentElement.insertBefore(wrap, statsBox.nextSibling);
            else li.appendChild(wrap);
          }
          const actWrap = li.querySelector(".admin-user-actions");
          if (!actWrap.querySelector('[data-action="warn"]')) {
            const b1 = document.createElement("button");
            b1.className = "ghost";
            b1.style.cssText = "background:rgba(239,68,68,0.1);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);";
            b1.dataset.action = "warn";
            b1.dataset.userId = u.id;
            b1.textContent = "⚠️ " + this.t("addWarn");
            b1.addEventListener("click", (e) => {
              e.stopPropagation();
              const reason = prompt(this.t("warnDialogReason") + ":");
              if (!reason) return;
              const ptsStr = prompt(this.t("warnDialogPoints") + ":", "1");
              const pts = Math.min(3, Math.max(1, parseInt(ptsStr || "1", 10)));
              api.post(`/api/users/${u.id}/warns`, { reason, points: pts }).then(() => {
                alert("OK");
                this.renderAdmin();
              }).catch(err => alert(this.t("apiError") + ": " + err.message));
            });
            actWrap.appendChild(b1);
          }
          if (!actWrap.querySelector('[data-action="repup"]')) {
            const b2 = document.createElement("button");
            b2.className = "ghost";
            b2.style.cssText = "background:rgba(16,185,129,0.1);color:#6ee7b7;border:1px solid rgba(16,185,129,0.3);";
            b2.dataset.action = "repup";
            b2.dataset.userId = u.id;
            b2.textContent = "➕ " + this.t("addReputation");
            b2.addEventListener("click", (e) => {
              e.stopPropagation();
              const reason = prompt(this.t("repDialogReason") + ":");
              if (reason === null) return;
              const ptsStr = prompt(this.t("repDialogPoints") + ":", "1");
              const pts = parseInt(ptsStr || "1", 10);
              api.post(`/api/users/${u.id}/reputation`, { points: Math.abs(pts), reason: reason || "" }).then(() => {
                alert("OK");
                this.renderAdmin();
              }).catch(err => alert(this.t("apiError") + ": " + err.message));
            });
            actWrap.appendChild(b2);
          }
          if (!actWrap.querySelector('[data-action="repdown"]')) {
            const b3 = document.createElement("button");
            b3.className = "ghost";
            b3.style.cssText = "background:rgba(239,68,68,0.1);color:#fca5a5;border:1px solid rgba(239,68,68,0.3);";
            b3.dataset.action = "repdown";
            b3.dataset.userId = u.id;
            b3.textContent = "➖ " + this.t("removeReputation");
            b3.addEventListener("click", (e) => {
              e.stopPropagation();
              const reason = prompt(this.t("repDialogReason") + ":");
              if (reason === null) return;
              const ptsStr = prompt(this.t("repDialogPoints") + ":", "1");
              const pts = parseInt(ptsStr || "1", 10);
              api.post(`/api/users/${u.id}/reputation`, { points: -Math.abs(pts), reason: reason || "" }).then(() => {
                alert("OK");
                this.renderAdmin();
              }).catch(err => alert(this.t("apiError") + ": " + err.message));
            });
            actWrap.appendChild(b3);
          }
        }
      } catch {}
    }, 200);
  };

  const origAdminAddCategory = ui.el.adminAddCategory?.onclick;
  ui.el.adminAddCategory?.addEventListener("click", (e) => {
    const icon = ui.el.adminCategoryIcon?.value || "📢";
    const name = ui.el.adminCategoryName.value.trim();
    const parent_id = ui.el.adminCategoryParent.value || null;
    if (!name) return;
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    const fullName = icon + " " + name;
    store.addCategory(fullName, parent_id).then(() => {
      ui.el.adminCategoryName.value = "";
      ui.el.adminCategoryParent.value = "";
      ui.renderAdmin();
      ui.renderCategories();
    }).catch(err => alert(ui.t("apiError") + ": " + err.message));
    return false;
  });

  // ===========================================================
  // 🎯 SITE STATS & QUICK NAV LOGIC - GTA RP Forum
  // ===========================================================
  async function refreshSiteStats() {
    try {
      const [users, threads, posts] = await Promise.all([
        api.get("/api/users").catch(() => []),
        store.categories().then(cats => {
          if (!cats.length) return [];
          return store.threadsByCategory(cats[0].id).then(d => d.threads || []).catch(() => []);
        }).catch(() => []),
        Promise.resolve([])
      ]);
      const userCount = Array.isArray(users) ? users.length : 0;
      // Get real counts
      let threadCount = 0;
      let postCount = 0;
      try {
        const db = await (typeof fetch !== "undefined" ? fetch("/api/admin/counts").then(r => r.json()).catch(() => null) : null);
        if (db) {
          threadCount = db.threads || 0;
          postCount = db.posts || 0;
        }
      } catch {}
      if (!threadCount && document.querySelector('#categoryList')) {
        threadCount = document.querySelectorAll('#categoryList .list li').length || 0;
      }
      // Online count: fake number 8-42 depending on user count (since we don't have session tracking)
      const baseOnline = 7 + Math.max(2, Math.min(38, Math.floor(userCount * 1.8) + (Math.floor(Math.random() * 6))));
      const elStat = document.getElementById("statOnline");
      const elUsers = document.getElementById("statUsers");
      const elThreads = document.getElementById("statThreads");
      const elPosts = document.getElementById("statPosts");
      if (elStat) elStat.textContent = baseOnline;
      if (elUsers) elUsers.textContent = userCount.toLocaleString('bg-BG');
      if (elThreads) elThreads.textContent = (threadCount || 0).toLocaleString('bg-BG');
      if (elPosts) elPosts.textContent = (postCount || (threadCount * 3.2) | 0).toLocaleString('bg-BG');
    } catch {}
  }

  // Bind quick nav buttons (scroll to categories or trigger action)
  const quickNavMap = {
    home: { action: () => { if (typeof ui.show === 'function') ui.show('categories'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    rules: { match: /правил|rules|правила/i, hint: "rules" },
    factions: { match: /фракци|faction|организаци/i, hint: "faction" },
    applications: { match: /заяв|applic|заявка|whitelist|персонал/i, hint: "app" },
    reports: { match: /репорт|report|жалб|греш|баг|bug/i, hint: "report" },
    appeals: { match: /апел|appeal|ban|warn/i, hint: "appeal" },
    marketplace: { match: /пазар|market|мaг|торг|imoti|business|бизнес/i, hint: "market" },
    events: { match: /събити|event|конкурс|турнир/i, hint: "event" },
    guides: { match: /урок|guide|guide|ръковод|help|помощ/i, hint: "guide" }
  };

  function bindQuickNavs() {
    document.querySelectorAll('.quick-link[data-nav]').forEach(btn => {
      btn.addEventListener("click", async () => {
        const nav = btn.dataset.nav;
        const cfg = quickNavMap[nav];
        if (!cfg) return;
        if (cfg.action) { cfg.action(); return; }
        // Search for matching category and go to its thread view
        try {
          const cats = await store.categories();
          let found = cats.find(c => (c.name || "").toLowerCase().match(cfg.match));
          // check children
          if (!found) {
            for (const c of cats) {
              if (c.children) {
                const sub = c.children.find(x => (x.name || "").toLowerCase().match(cfg.match));
                if (sub) { found = sub; break; }
              }
            }
          }
          if (found) {
            ui.openCategory ? ui.openCategory(found.id) : (typeof ui.renderThreads === "function" && ui.renderThreads(found.id));
            window.scrollTo({ top: 260, behavior: 'smooth' });
          } else {
            alert("Категорията все още не е инсталирана. Натисни Админ -> Инсталирай CRMP Standard, за да я добавиш.");
          }
        } catch (e) {}
      });
    });

    const themeQuick = document.getElementById("themeEditorQuick");
    if (themeQuick && ui.el.themeEditor) {
      themeQuick.addEventListener("click", () => ui.el.themeEditor.click());
    }
    const searchQuick = document.getElementById("searchBtnQuick");
    if (searchQuick && ui.el.searchInput) {
      searchQuick.addEventListener("click", () => {
        if (typeof ui.show === 'function') ui.show('categories');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => ui.el.searchInput?.focus(), 100);
      });
    }
  }

  // Init after UI
  const origInit = ui.init ? ui.init.bind(ui) : null;
  if (origInit) {
    ui.init = function() {
      origInit();
      try {
        setTimeout(() => { refreshSiteStats(); bindQuickNavs(); }, 500);
        // Update stats every 60 seconds
        setInterval(refreshSiteStats, 60000);
      } catch {}
    };
  }
})();

window.addEventListener("DOMContentLoaded", () => ui.init());
