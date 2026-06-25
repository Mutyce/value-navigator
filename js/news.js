// Рендер блока «Новости проекта» из Google-таблицы.
// Заказчик ведёт одну таблицу (дата / заголовок / текст), новости
// появляются и на index.html, и на about.html. Если таблица не подключена
// или Google недоступен — остаётся статический fallback из HTML.
//
// Тот же приём, что и для видео-галереи (js/videos.js, коммит fba7fc4).
(() => {
  // ─── TODO: вставить ID Google-таблицы новостей ───────────────────────
  // Заказчик пришлёт ссылку на таблицу. ID — кусок её URL между /d/ и /edit.
  // Пока стоит PASTE_SHEET_ID — рендер выключен, показывается fallback.
  const SHEET_ID = '1Dms1rCjWxngHeY7AVnlp3D2mJdwuTjg4tz0S3LFIEZ0';

  document.addEventListener('DOMContentLoaded', () => {
    if (SHEET_ID === 'PASTE_SHEET_ID') return;       // таблица ещё не подключена
    const grid = document.getElementById('news-cards');
    if (!grid) return;                                // на странице нет блока новостей

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=0`;
    fetch(url)
      .then(r => { if (!r.ok) throw new Error('sheet ' + r.status); return r.text(); })
      .then(csv => {
        const news = rowsToNews(parseCSV(csv));
        if (news.length) grid.innerHTML = news.map(renderCard).join('\n');
        // если строк нет — оставляем fallback
      })
      .catch(err => console.warn('Новости из таблицы не загрузились, показан fallback:', err));
  });

  // Заголовки таблицы (первая строка): Дата | Заголовок | Текст
  function rowsToNews(rows) {
    if (!rows.length) return [];
    const head = rows[0].map(h => h.trim().toLowerCase());
    const iDate  = head.indexOf('дата');
    const iTitle = head.indexOf('заголовок');
    const iText  = head.indexOf('текст');
    if (iDate < 0 || iTitle < 0 || iText < 0) {
      console.warn('В таблице нет колонок Дата / Заголовок / Текст');
      return [];
    }
    return rows.slice(1)
      .map(r => ({
        date:  (r[iDate]  || '').trim(),
        title: (r[iTitle] || '').trim(),
        text:  (r[iText]  || '').trim(),
      }))
      .filter(n => n.title); // пустые строки пропускаем
  }

  function renderCard(n) {
    return `          <article class="news-card card">
            <time class="news-card__date">${esc(n.date)}</time>
            <h3 class="news-card__title">${esc(n.title)}</h3>
            <p class="news-card__text">${esc(n.text)}</p>
          </article>`;
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => (
      { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]
    ));
  }

  // CSV-парсер: учитывает кавычки, запятые и переносы внутри ячеек.
  function parseCSV(text) {
    const rows = [];
    let row = [], field = '', inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
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
})();
