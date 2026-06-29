// Рендер блока «Новости проекта» из Google-таблицы.
// Заказчик ведёт одну таблицу, новости появляются и на index.html, и на
// about.html. Если таблица не подключена или Google недоступен — остаётся
// статический fallback из HTML.
//
// Колонки таблицы (первая строка-заголовок), порядок любой:
//   Дата | Заголовок | Текст | Картинка | Видео
//   • Картинка — прямая ссылка на изображение (необязательно)
//   • Видео   — ссылка VK или YouTube (необязательно)
// Картинка и Видео могут отсутствовать как колонки целиком — тогда новость
// рисуется как раньше (только текст). Если в одной строке заполнены и
// картинка, и видео — показываем видео (оно информативнее).
//
// Тот же приём, что и для видео-галереи (js/videos.js, коммит fba7fc4).
(() => {
  // ─── ID Google-таблицы новостей ──────────────────────────────────────
  // ID — кусок URL таблицы между /d/ и /edit. PASTE_SHEET_ID = рендер
  // выключен, показывается статический fallback из HTML.
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

  // Заголовки таблицы (первая строка): Дата | Заголовок | Текст | Картинка | Видео
  function rowsToNews(rows) {
    if (!rows.length) return [];
    const head = rows[0].map(h => h.trim().toLowerCase());
    const iDate  = head.indexOf('дата');
    const iTitle = head.indexOf('заголовок');
    const iText  = head.indexOf('текст');
    const iImg   = head.indexOf('картинка'); // может быть -1 (колонки нет)
    const iVideo = head.indexOf('видео');    // может быть -1 (колонки нет)
    if (iDate < 0 || iTitle < 0 || iText < 0) {
      console.warn('В таблице нет колонок Дата / Заголовок / Текст');
      return [];
    }
    return rows.slice(1)
      .map(r => ({
        date:  (r[iDate]  || '').trim(),
        title: (r[iTitle] || '').trim(),
        text:  (r[iText]  || '').trim(),
        img:   iImg   >= 0 ? (r[iImg]   || '').trim() : '',
        video: iVideo >= 0 ? videoEmbedSrc(r[iVideo] || '') : '',
      }))
      .filter(n => n.title); // пустые строки пропускаем
  }

  function renderCard(n) {
    let media = '';
    if (n.video) {
      media = `            <div class="news-card__media news-card__media--video">
              <iframe src="${n.video}"
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                      allowfullscreen></iframe>
            </div>\n`;
    } else if (n.img) {
      media = `            <div class="news-card__media">
              <img class="news-card__img" src="${esc(n.img)}" alt="${esc(n.title)}" loading="lazy">
            </div>\n`;
    }
    return `          <article class="news-card card">
${media}            <time class="news-card__date">${esc(n.date)}</time>
            <h3 class="news-card__title">${esc(n.title)}</h3>
            <p class="news-card__text">${esc(n.text)}</p>
          </article>`;
  }

  // Ссылка VK или YouTube → src для iframe. Не распознали → '' (медиа не рисуем).
  function videoEmbedSrc(raw) {
    const s = raw.trim();
    if (!s) return '';

    // YouTube: watch?v=ID, youtu.be/ID, embed/ID
    const yt = s.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}`;

    // VK: готовый embed (video_ext.php) или ссылка вида video-226613844_456239020
    const ext = s.match(/https?:\/\/[^\s"']*video_ext\.php\?[^\s"']*/);
    if (ext) return ext[0];
    const vk = s.match(/video(-?\d+)_(\d+)/);
    if (vk) {
      const oid = vk[1].startsWith('-') ? vk[1] : '-' + vk[1];
      return `https://vkvideo.ru/video_ext.php?oid=${oid}&id=${vk[2]}`;
    }
    return ''; // не распознали — карточка без видео
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
