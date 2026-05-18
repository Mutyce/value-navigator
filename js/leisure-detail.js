const leisureData = {
  1: {
    color:    '#E8784A',
    emoji:    '🗃️',
    title:    'Шкатулка историй',
    subtitle: 'Вечерний ритуал, который сближает семью через истории',
    values:   ['Близость', 'Доверие', 'Единство'],
    tags:     ['Все возрасты', '30–60 мин', 'Просто'],
    needs: [
      'Красивая шкатулка или декоративная коробка',
      'Карточки с вопросами (распечатать из раздела Материалы)',
      'Уютное место: диван, свечи или уютный свет',
      '30–60 минут свободного времени'
    ],
    steps: [
      { title: 'Выберите вечер',           desc: 'Раз в неделю, без гаджетов — сделайте это семейной традицией' },
      { title: 'Приготовьте шкатулку',     desc: 'Положите внутрь карточки с вопросами, накройте крышкой' },
      { title: 'Каждый тянет карточку',    desc: 'И рассказывает историю — из детства, из прошедшей недели или фантазию' },
      { title: 'Остальные слушают',        desc: 'Без перебиваний. После рассказа можно задать один уточняющий вопрос' },
      { title: 'Завершите добрым словом',  desc: 'Каждый говорит что-то хорошее о рассказчике — это укрепляет доверие' }
    ],
    tip: 'Начните с простых вопросов: «Расскажи смешной случай из детства». Не торопитесь — тишина тоже ценна'
  },
  2: {
    color:    '#7BA05B',
    emoji:    '📖',
    title:    'Семейная кулинарная книга',
    subtitle: 'Готовите вместе и создаёте живую историю семьи через рецепты',
    values:   ['Единство', 'Традиции', 'Память'],
    tags:     ['От 5 лет', '1–2 часа', 'Средне'],
    needs: [
      'Красивая тетрадь или блокнот для рецептов',
      'Ручки, цветные карандаши для оформления',
      'Продукты для выбранного блюда',
      'Фотоаппарат или телефон — сфотографировать результат'
    ],
    steps: [
      { title: 'Выберите блюдо',            desc: 'Пусть каждый предложит своё любимое, потом голосуйте' },
      { title: 'Вспомните историю рецепта', desc: 'От кого узнали, с чем связан, в каких случаях готовили' },
      { title: 'Готовьте вместе',           desc: 'Раздайте роли: кто режет, кто мешает, кто следит за временем' },
      { title: 'Запишите рецепт в книгу',   desc: 'Своими словами, с историей и именем автора' },
      { title: 'Сфотографируйте и вклейте', desc: 'Сфотографируйте блюдо и всю семью вместе — вклейте в книгу' }
    ],
    tip: 'Не стремитесь к идеальному результату. Главное — процесс и разговоры во время готовки. Дети запоминают не вкус блюда, а ощущение совместного творчества'
  },
  3: {
    color:    '#5B7BA0',
    emoji:    '🎬',
    title:    'Дворовый кинозал',
    subtitle: 'Семейный просмотр фильма с обсуждением — развивает общие интересы',
    values:   ['Единство', 'Радость', 'Близость'],
    tags:     ['От 6 лет', '2–3 часа', 'Просто'],
    needs: [
      'Телевизор, ноутбук или проектор',
      'Плед и подушки для уюта',
      'Попкорн или любимые снеки',
      'Заранее выбранный фильм (выбирайте вместе!)'
    ],
    steps: [
      { title: 'Выбор фильма',              desc: 'Каждый предлагает один вариант, голосуете вместе' },
      { title: 'Подготовьте «кинозал»',     desc: 'Диван, пледы, выключите лишний свет' },
      { title: 'Приготовьте снеки вместе',  desc: 'Попкорн, бутерброды, чай — это часть ритуала' },
      { title: 'Смотрите без телефонов',    desc: 'Договоритесь заранее — телефоны откладываем на время фильма' },
      { title: 'Обсудите после просмотра',  desc: 'Что понравилось, кто любимый герой, что бы вы сделали иначе' }
    ],
    tip: 'Выбирайте фильм вместе с детьми — это уже часть практики. Вопросы после просмотра важнее самого фильма: они открывают ценности каждого члена семьи'
  },
  4: {
    color:    '#A07B5B',
    emoji:    '🎲',
    title:    'Игротека выходного дня',
    subtitle: 'Настольные игры без гаджетов — смех, азарт и настоящее общение',
    values:   ['Радость', 'Единство', 'Благодарность'],
    tags:     ['От 4 лет', '1–2 часа', 'Просто'],
    needs: [
      'Любые настольные игры (монополия, уно, активити, мафия)',
      'Можно сыграть в карты или игры без покупок: крокодил, города, правда-ложь',
      'Перекус на столе — чай, фрукты, печенье',
      'Хорошее настроение :)'
    ],
    steps: [
      { title: 'Выберите игру голосованием', desc: 'Или по очереди — сегодня выбирает самый младший' },
      { title: 'Объясните правила всем',     desc: 'Даже если играли раньше, повторите правила вместе' },
      { title: 'Играйте без телефонов',      desc: 'Положите их в другую комнату — договоритесь честно' },
      { title: 'Введите шуточное правило',   desc: 'Проигравший получает задание: спеть, показать животное' },
      { title: 'Завершите благодарностью',   desc: 'Поблагодарите друг друга, отметьте кто был самым весёлым' }
    ],
    tip: 'Игра — это безопасное пространство, где можно проигрывать и не бояться. Именно здесь дети учатся справляться с поражением и радоваться чужому успеху'
  },
  5: {
    color:    '#5BA08A',
    emoji:    '🗺️',
    title:    'Квест-прогулка по городу',
    subtitle: 'Исследуете город по заданиям-загадкам — приключение прямо за порогом',
    values:   ['Взаимопомощь', 'Познание', 'Единство'],
    tags:     ['От 7 лет', '2–3 часа', 'Средне'],
    needs: [
      'Распечатанные карточки с заданиями (или записать в телефон)',
      'Карта района или включённый навигатор',
      'Удобная обувь и одежда по погоде',
      'Небольшой перекус в рюкзаке',
      'Фотоаппарат — фиксировать выполненные задания'
    ],
    steps: [
      { title: 'Подготовьте задания',       desc: '5–7 точек в вашем районе: памятник, парк, необычный дом' },
      { title: 'Придумайте загадки',        desc: 'Каждая точка — загадка: «Найдите место, где растёт самое старое дерево»' },
      { title: 'Разделите роли',            desc: 'Навигатор, фотограф, читатель заданий — меняйтесь по ходу' },
      { title: 'Задание на каждой точке',   desc: 'Сфотографироваться, найти деталь, ответить на вопрос' },
      { title: 'Финиш с чаепитием',         desc: 'Кафе или домашнее чаепитие с обсуждением самого интересного момента' }
    ],
    tip: 'Квест — это про доверие и командную работу. Когда ребёнок ведёт взрослого по карте, он чувствует свою значимость и ответственность. Это бесценно'
  }
};

// ─── Helpers ─────────────────────────────────────────────
function getId() {
  const params = new URLSearchParams(window.location.search);
  const raw = parseInt(params.get('id'), 10);
  return leisureData[raw] ? raw : null;
}

function otherIds(currentId) {
  return Object.keys(leisureData)
    .map(Number)
    .filter(id => id !== currentId)
    .slice(0, 3);
}

function shareUrl() {
  return encodeURIComponent(window.location.href);
}

// ─── Render ───────────────────────────────────────────────
function render() {
  const id   = getId();
  const main = document.getElementById('detail-main');

  if (!id) {
    main.innerHTML = renderNotFound();
    return;
  }

  const data = leisureData[id];
  document.title = `${data.title} — Ценностный навигатор для семьи`;

  const isStub = !data.steps;

  main.innerHTML = `
    ${renderHero(data)}
    ${renderNeeds(data)}
    ${isStub ? renderStub() : renderSteps(data)}
    ${isStub ? '' : renderTip(data)}
    ${renderActions(data)}
    ${renderOthers(id)}
  `;
}

function renderHero(data) {
  const valuesHtml = data.values
    .map(v => `<span class="detail-hero__value-tag">${v}</span>`)
    .join('');
  const tagsHtml = data.tags
    .map(t => `<span class="detail-hero__meta-tag">${t}</span>`)
    .join('');

  return `
    <div class="detail-hero" style="background-color:${data.color}">
      <div class="container">
        <nav class="breadcrumb" aria-label="Навигация">
          <a href="index.html" class="breadcrumb__link">Главная</a>
          <span class="breadcrumb__sep">→</span>
          <a href="leisure.html" class="breadcrumb__link">Сценарии досуга</a>
          <span class="breadcrumb__sep">→</span>
          <span class="breadcrumb__current">${data.title}</span>
        </nav>
        <div class="detail-hero__body">
          <span class="detail-hero__emoji">${data.emoji}</span>
          <div class="detail-hero__content">
            <h1 class="detail-hero__title">${data.title}</h1>
            <p class="detail-hero__subtitle">${data.subtitle}</p>
            <div class="detail-hero__values">${valuesHtml}</div>
            <div class="detail-hero__meta">${tagsHtml}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderNeeds(data) {
  if (!data.needs) return '';

  const items = data.needs
    .map(n => `<li class="needs-list__item"><span class="needs-list__check">✓</span>${n}</li>`)
    .join('');

  return `
    <section class="detail-section section">
      <div class="container detail-section__narrow">
        <h2 class="section-title">Что нужно</h2>
        <ul class="needs-list">${items}</ul>
      </div>
    </section>
  `;
}

function renderSteps(data) {
  const stepsHtml = data.steps.map((step, i) => `
    <div class="step-card card">
      <div class="step-card__num">${i + 1}</div>
      <div class="step-card__body">
        <h3 class="step-card__title">${step.title}</h3>
        <p class="step-card__desc">${step.desc}</p>
      </div>
    </div>
  `).join('');

  return `
    <section class="detail-section section">
      <div class="container detail-section__narrow">
        <h2 class="section-title">Пошаговая инструкция</h2>
        <div class="steps-list">${stepsHtml}</div>
      </div>
    </section>
  `;
}

function renderTip(data) {
  if (!data.tip) return '';
  return `
    <section class="detail-section">
      <div class="container detail-section__narrow">
        <blockquote class="psych-tip">
          <span class="psych-tip__icon">💬</span>
          <div class="psych-tip__body">
            <p class="psych-tip__label">Совет психолога</p>
            <p class="psych-tip__text">«${data.tip}»</p>
          </div>
        </blockquote>
      </div>
    </section>
  `;
}

function renderActions(data) {
  const url  = shareUrl();
  const text = encodeURIComponent(`Сценарий семейного досуга: ${data.title}`);
  const vkUrl = `https://vk.com/share.php?url=${url}&title=${text}`;
  const tgUrl = `https://t.me/share/url?url=${url}&text=${text}`;

  return `
    <section class="detail-section section">
      <div class="container detail-section__narrow">
        <div class="detail-actions">
          <a href="#" class="btn-secondary detail-actions__pdf" onclick="return false">
            📄 Скачать PDF-версию
          </a>
          <div class="detail-actions__share">
            <span class="detail-actions__share-label">Поделиться:</span>
            <a href="${vkUrl}" class="share-btn share-btn--vk" target="_blank" rel="noopener">ВКонтакте</a>
            <a href="${tgUrl}" class="share-btn share-btn--tg" target="_blank" rel="noopener">Telegram</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderOthers(currentId) {
  const ids = otherIds(currentId);
  const cardsHtml = ids.map(id => {
    const d = leisureData[id];
    return `
      <a href="leisure-detail.html?id=${id}" class="other-card card">
        <span class="other-card__emoji">${d.emoji}</span>
        <h3 class="other-card__title">${d.title}</h3>
        <p class="other-card__tags">${d.tags.join(' · ')}</p>
      </a>
    `;
  }).join('');

  return `
    <section class="detail-section section" style="background-color:var(--color-warm)">
      <div class="container">
        <h2 class="section-title">Другие сценарии</h2>
        <div class="others-grid">${cardsHtml}</div>
      </div>
    </section>
  `;
}

function renderStub() {
  return `
    <section class="detail-section section">
      <div class="container detail-section__narrow">
        <div class="card stub-card">
          <p class="stub-card__icon">🚧</p>
          <p class="stub-card__text">Подробный сценарий появится здесь совсем скоро</p>
        </div>
      </div>
    </section>
  `;
}

function renderNotFound() {
  return `
    <section class="detail-section section">
      <div class="container detail-section__narrow" style="text-align:center;padding:80px 0">
        <p style="font-size:48px;margin-bottom:16px">🔍</p>
        <h1 class="section-title">Сценарий не найден</h1>
        <p style="margin:12px 0 32px;color:#6b5a50">Проверьте адрес страницы или вернитесь к списку</p>
        <a href="leisure.html" class="btn-primary">Все сценарии</a>
      </div>
    </section>
  `;
}

// ─── Boot ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', render);
