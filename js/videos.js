// Рендер видео-галереи из Google-таблицы.
// Заказчик ведёт таблицу (секция / название / ссылка на VK-видео),
// страница подтягивает её и рисует карточки. Если таблица не подключена
// или Google недоступен — остаётся статический fallback из videos.html.

// ─── Конфиг ────────────────────────────────────────────────────────────
// Сюда вставить ID Google-таблицы (из её URL между /d/ и /edit).
// Пока стоит PASTE_SHEET_ID — рендер выключен, показывается fallback.
const SHEET_ID = '1GflEXblfVIxffTgbbjfZOtxc6h_29hFwLcaQ-ydNHwA';

// ─── Загрузка и рендер ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  if (SHEET_ID === 'PASTE_SHEET_ID') return; // таблица ещё не подключена
  const root = document.getElementById('video-sections');
  if (!root) return;

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
  fetch(url)
    .then(r => { if (!r.ok) throw new Error('sheet ' + r.status); return r.text(); })
    .then(csv => {
      const rows = parseCSV(csv);
      const videos = rowsToVideos(rows);
      if (videos.length) root.innerHTML = renderSections(videos);
      // если строк нет — оставляем fallback как есть
    })
    .catch(err => console.warn('Видео из таблицы не загрузились, показан fallback:', err));
});

// ─── Преобразование строк таблицы → объекты видео ──────────────────────
// Ожидаемые заголовки (первая строка таблицы): Секция | Название | Ссылка
function rowsToVideos(rows) {
  if (!rows.length) return [];
  const head = rows[0].map(h => h.trim().toLowerCase());
  const iSection = head.indexOf('секция');
  const iTitle   = head.indexOf('название');
  const iLink    = head.indexOf('ссылка');
  if (iSection < 0 || iTitle < 0 || iLink < 0) {
    console.warn('В таблице нет колонок Секция / Название / Ссылка');
    return [];
  }
  return rows.slice(1)
    .map(r => ({
      section: (r[iSection] || '').trim(),
      title:   (r[iTitle]   || '').trim(),
      src:     vkEmbedSrc(r[iLink] || ''),
    }))
    .filter(v => v.section && v.title); // пустые строки пропускаем
}

// Из любого формата ссылки VK достаём src для iframe.
// Принимаем: код «Экспортировать» (с video_ext.php), готовый embed-URL,
// или обычную ссылку вида vkvideo.ru/video-226613844_456239020.
function vkEmbedSrc(raw) {
  const s = raw.trim();
  if (!s) return ''; // пусто → карточка «скоро»

  const ext = s.match(/https?:\/\/[^\s"']*video_ext\.php\?[^\s"']*/);
  if (ext) return ext[0];

  const plain = s.match(/video(-?\d+)_(\d+)/);
  if (plain) {
    const oid = plain[1].startsWith('-') ? plain[1] : '-' + plain[1];
    return `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${plain[2]}`;
  }
  return ''; // не распознали → покажем как «скоро», не ломаем страницу
}

// ─── Рендер HTML ───────────────────────────────────────────────────────
function renderSections(videos) {
  const order = [];
  const groups = {};
  for (const v of videos) {
    if (!groups[v.section]) { groups[v.section] = []; order.push(v.section); }
    groups[v.section].push(v);
  }
  return order.map((name, i) => {
    const warm = i % 2 === 1 ? ' vpage-section--warm' : '';
    const anchor = i === 0 ? ' id="video"' : '';
    const cards = groups[name].map(renderCard).join('\n');
    return `
    <section class="vpage-section${warm} section"${anchor}>
      <div class="container">
        <h2 class="vpage-section__title">${esc(name)}</h2>
        <div class="vcards-grid">
${cards}
        </div>
      </div>
    </section>`;
  }).join('\n');
}

function renderCard(v) {
  const thumb = v.src
    ? `<iframe class="vcard__iframe" src="${v.src}"
                  allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                  allowfullscreen></iframe>`
    : `<button class="vcard__play" aria-label="Скоро">▶</button>`;
  const soon = v.src ? '' : ' <small style="color:#9e8075;font-weight:400">— скоро</small>';
  return `          <article class="vcard">
            <div class="vcard__thumb">${thumb}</div>
            <div class="vcard__info">
              <h3 class="vcard__title">${esc(v.title)}${soon}</h3>
            </div>
          </article>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
  ));
}

// ─── Парсер CSV (учитывает кавычки, запятые и переносы внутри ячеек) ────
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } // экранированная кавычка
        else inQuotes = false;
      } else field += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
      else if (c === '\r') { /* пропускаем */ }
      else field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row); }
  return rows;
}
