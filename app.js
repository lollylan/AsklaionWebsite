/* ──────────────────────────────────────
   app.js  –  Hauspraxis-Software-Website
   ────────────────────────────────────── */

// NOTE: programs.js is loaded via <script> tag before this file
// so PROGRAMS is available in global scope.

/* ── Hilfsfunktionen ── */
const $ = id => document.getElementById(id);

function getYoutubeThumbnail(videoId) {
  if (!videoId) return null;
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYoutubeEmbedUrl(videoId) {
  if (!videoId) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
}

/* ── Karten rendern ── */
function renderPrograms() {
  const grid = $('programsGrid');
  if (!grid) return;

  // Programm-Zähler im Hero aktualisieren
  const statEl = $('statPrograms');
  if (statEl) statEl.textContent = PROGRAMS.length;

  if (PROGRAMS.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>Noch keine Programme eingetragen</h3>
        <p>Tragen Sie Ihre Programme in der Datei <code>programs.js</code> ein.</p>
      </div>`;
    return;
  }

  grid.innerHTML = PROGRAMS.map((prog, i) => {
    const thumb = getYoutubeThumbnail(prog.youtubeId);
    const delay = i * 0.08;

    const thumbHtml = thumb
      ? `<img src="${thumb}" alt="Vorschau: ${escHtml(prog.title)}" loading="lazy" decoding="async" />`
      : `<div style="width:100%;height:100%;background:linear-gradient(135deg,#1e3a5f,#0f172a);display:flex;align-items:center;justify-content:center;">
           <span style="font-size:3rem;opacity:.4;">🖥</span>
         </div>`;

    let reqHtml = '';
    const reqLevel = prog.req || 'low';
    if (reqLevel === 'high') {
      reqHtml = `<span class="req-badge req-high" title="Sollte eine gute Grafikkarte mit mindestens 16 GB oder mehr haben.">Anforderung: Hoch</span>`;
    } else if (reqLevel === 'medium') {
      reqHtml = `<span class="req-badge req-medium" title="Sollte wenn möglich eine Grafikkarte und mind. 32 GB RAM haben.">Anforderung: Mittel</span>`;
    } else {
      reqHtml = `<span class="req-badge req-low" title="Sollte auf quasi jedem PC laufen.">Anforderung: Gering</span>`;
    }

    return `
      <article
        class="program-card"
        style="animation-delay:${delay}s"
        data-id="${escHtml(prog.id)}"
        role="button"
        tabindex="0"
        aria-label="${escHtml(prog.title)} – Details öffnen"
      >
        <div class="card-thumb">
          ${thumbHtml}
          <div class="card-play-btn">
            <div class="play-circle">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          <span class="card-tag">${escHtml(prog.tag)}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${escHtml(prog.title)}</h3>
          <p class="card-desc">${escHtml(prog.desc)}</p>
          <div class="card-footer" style="justify-content: space-between;">
            ${reqHtml}
            <span style="font-size:.78rem;color:var(--c-primary);">▶ Mehr erfahren</span>
          </div>
        </div>
      </article>`;
  }).join('');

  // Event-Listener auf Karten
  grid.querySelectorAll('.program-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    });
  });
}

/* ── Modal ── */
function openModal(progId) {
  const prog = PROGRAMS.find(p => p.id === progId);
  if (!prog) return;

  const backdrop = $('modalBackdrop');
  $('modalTitle').textContent = prog.title;
  $('modalDescription').textContent = prog.desc;

  const iframe = $('modalIframe');
  const embedUrl = getYoutubeEmbedUrl(prog.youtubeId);
  if (embedUrl) {
    iframe.src = embedUrl;
    iframe.parentElement.style.display = '';
  } else {
    iframe.src = '';
    iframe.parentElement.style.display = 'none';
  }

  const githubBtn = $('modalGithub');
  githubBtn.href = prog.github;

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Fokus setzen
  $('modalClose').focus();
}

function closeModal() {
  const backdrop = $('modalBackdrop');
  backdrop.classList.remove('open');
  document.body.style.overflow = '';

  // Video stoppen
  const iframe = $('modalIframe');
  iframe.src = iframe.src; // reload = stops video
}

/* ── Mobile Navigation ── */
function initNav() {
  const burger = $('navBurger');
  const links = document.querySelector('.nav-links');
  if (!burger || !links) return;

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('mobile-open');
    burger.classList.toggle('active', open);
    burger.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Links schließen das Menü
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('mobile-open');
      burger.classList.remove('active');
      burger.setAttribute('aria-label', 'Menü öffnen');
      document.body.style.overflow = '';
    });
  });
}

/* ── Utility ── */
function escHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderPrograms();
  initNav();

  // Modal schließen
  $('modalClose')?.addEventListener('click', closeModal);
  $('modalBackdrop')?.addEventListener('click', e => {
    if (e.target === $('modalBackdrop')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && $('modalBackdrop')?.classList.contains('open')) {
      closeModal();
    }
  });
});
