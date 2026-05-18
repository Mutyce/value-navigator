const questions = [
  'В нашей семье принято делиться новостями за ужином',
  'Мы часто говорим друг другу «спасибо» и хвалим за хорошие поступки',
  'У нас есть совместные ритуалы (воскресный завтрак, прогулка, игра)',
  'Мы помогаем друг другу без напоминаний',
  'В трудной ситуации мы обсуждаем проблему и ищем решение вместе',
  'Мы вместе проводим выходные, а не каждый занят своим делом',
  'Мы празднуем семейные даты и события'
];

const questionValues = {
  0: ['Близость', 'Единство'],
  1: ['Поддержка', 'Благодарность'],
  2: ['Традиции', 'Единство'],
  3: ['Взаимопомощь', 'Забота'],
  4: ['Поддержка', 'Доверие'],
  5: ['Единство', 'Близость'],
  6: ['Традиции', 'Память']
};

const recommendations = {
  'Близость':      { title: 'Шкатулка историй',          emoji: '🗃️', desc: 'Вечерние рассказы укрепят доверие и близость',          link: 'leisure-detail.html?id=1' },
  'Единство':      { title: 'Семейная кулинарная книга', emoji: '📖', desc: 'Готовьте вместе — создавайте общие воспоминания',       link: 'leisure-detail.html?id=2' },
  'Поддержка':     { title: 'Шкатулка историй',          emoji: '🗃️', desc: 'Делитесь историями — стройте поддержку',               link: 'leisure-detail.html?id=1' },
  'Благодарность': { title: 'Игротека выходного дня',    emoji: '🎲', desc: 'Игры учат ценить друг друга',                           link: 'leisure-detail.html?id=4' },
  'Традиции':      { title: 'Семейная кулинарная книга', emoji: '📖', desc: 'Рецепты с историями — живая память семьи',              link: 'leisure-detail.html?id=2' },
  'Взаимопомощь':  { title: 'Квест-прогулка по городу', emoji: '🗺️', desc: 'Задания требуют помощи друг другу',                     link: 'leisure-detail.html?id=5' },
  'Забота':        { title: 'Квест-прогулка по городу', emoji: '🗺️', desc: 'Забота проявляется в совместных испытаниях',            link: 'leisure-detail.html?id=5' },
  'Доверие':       { title: 'Шкатулка историй',          emoji: '🗃️', desc: 'Откровенные истории строят доверие',                   link: 'leisure-detail.html?id=1' },
  'Память':        { title: 'Семейная кулинарная книга', emoji: '📖', desc: 'Сохраняйте семейную историю через рецепты',             link: 'leisure-detail.html?id=2' }
};

// ─── State ──────────────────────────────────────────────
let currentQuestion = 0;
const answers = [];

// ─── DOM refs ────────────────────────────────────────────
const quizScreen     = document.getElementById('quiz-screen');
const resultScreen   = document.getElementById('result-screen');
const questionText   = document.getElementById('question-text');
const progressFill   = document.getElementById('progress-fill');
const progressLabel  = document.getElementById('progress-label');
const scaleBtns      = document.querySelectorAll('.scale-btn');
const topValuesEl    = document.getElementById('top-values');
const recommendEl    = document.getElementById('recommendation');
const emailForm      = document.getElementById('email-form');

// ─── Init ────────────────────────────────────────────────
renderQuestion(0);

scaleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (btn.classList.contains('selected')) return;

    const value = parseInt(btn.dataset.value, 10);

    scaleBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');

    setTimeout(() => {
      recordAnswer(value);
    }, 400);
  });
});

emailForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email-input').value;
  const subject = encodeURIComponent('Результат диагностики семейных ценностей');
  const body    = encodeURIComponent(buildEmailBody());
  window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
});

// ─── Functions ───────────────────────────────────────────
function renderQuestion(index) {
  // Fade out then in
  questionText.style.opacity = '0';
  scaleBtns.forEach(b => {
    b.classList.remove('selected');
    b.disabled = false;
  });

  setTimeout(() => {
    questionText.textContent = questions[index];
    questionText.style.opacity = '1';
  }, 150);

  const progress = ((index) / questions.length) * 100;
  progressFill.style.width = progress + '%';
  progressLabel.textContent = `Вопрос ${index + 1} из ${questions.length}`;
}

function recordAnswer(value) {
  answers.push(value);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    renderQuestion(currentQuestion);
  } else {
    progressFill.style.width = '100%';
    setTimeout(showResults, 300);
  }
}

function calcScores() {
  const scores = {};

  answers.forEach((score, i) => {
    const values = questionValues[i];
    values.forEach(v => {
      scores[v] = (scores[v] || 0) + score;
    });
  });

  return scores;
}

function getTopValues(scores, count = 3) {
  // Max possible score per value: appears in at most 2 questions × 5 = 10
  const maxPossible = 10;

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([name, score]) => ({
      name,
      score,
      percent: Math.round((score / maxPossible) * 100)
    }));
}

function showResults() {
  const scores  = calcScores();
  const top     = getTopValues(scores);
  const topName = top[0].name;

  renderTopValues(top);
  renderRecommendation(topName);

  quizScreen.classList.add('diag-screen--hidden');
  resultScreen.classList.remove('diag-screen--hidden');

  // Animate bars after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelectorAll('.value-card__bar-fill').forEach(bar => {
        bar.style.width = bar.dataset.percent + '%';
      });
    });
  });
}

function renderTopValues(top) {
  const medals = ['🥇', '🥈', '🥉'];

  topValuesEl.innerHTML = top.map((item, i) => `
    <div class="value-card card">
      <div class="value-card__head">
        <span class="value-card__medal">${medals[i]}</span>
        <span class="value-card__name">${item.name}</span>
        <span class="value-card__percent">${item.percent}%</span>
      </div>
      <div class="value-card__bar">
        <div class="value-card__bar-fill" data-percent="${item.percent}" style="width:0%"></div>
      </div>
    </div>
  `).join('');
}

function renderRecommendation(valueName) {
  const rec = recommendations[valueName];
  if (!rec) return;

  recommendEl.innerHTML = `
    <div class="rec-card card">
      <p class="rec-card__label">Рекомендуемый сценарий досуга</p>
      <div class="rec-card__body">
        <span class="rec-card__emoji">${rec.emoji}</span>
        <div class="rec-card__info">
          <h3 class="rec-card__title">${rec.title}</h3>
          <p class="rec-card__desc">${rec.desc}</p>
          <a href="${rec.link}" class="rec-card__link btn-primary">Открыть сценарий →</a>
        </div>
      </div>
    </div>
  `;
}

function buildEmailBody() {
  const scores = calcScores();
  const top    = getTopValues(scores);
  const lines  = top.map((v, i) => `${i + 1}. ${v.name} — ${v.percent}%`).join('\n');
  return `Результат диагностики «Ценностный навигатор для семьи»\n\nГлавные ценности вашей семьи:\n${lines}\n\nПолный результат: https://idialogi.nko31.ru`;
}
