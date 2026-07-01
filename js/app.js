/* =============================================================
   jrsnorth.co.uk — app logic
   Don't need to edit this unless you're changing how things work.
   Content lives in js/content.js.
   ============================================================= */


/* -------------------------------------------------------------
   Window management
   ------------------------------------------------------------- */

let zCounter = 10;
let dragState   = null;
let resizeState = null;
let activeWindowId = null;

const windowLabels = {
  music:    '🎵 Music',
  projects: '💾 Projects',
  bio:      '👤 About',
  links:    '🔗 Links',
  blog:     '📝 Blog',
  contact:  '📧 Contact',
  snake:    '🐍 Snake',
};

function openWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.style.display = 'flex';
  addTaskbarButton(id);
  bringToFront(id);
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.style.display = 'none';
  removeTaskbarButton(id);
  if (id === 'snake') stopSnake();
}

function minimizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.style.display = 'none';
  const btn = document.getElementById('tb-' + id);
  if (btn) btn.classList.remove('active');
}

function maximizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win.dataset.maximized) {
    win.style.left   = win.dataset.ox;
    win.style.top    = win.dataset.oy;
    win.style.width  = win.dataset.ow;
    win.style.height = win.dataset.oh;
    delete win.dataset.maximized;
  } else {
    win.dataset.ox = win.style.left;
    win.dataset.oy = win.style.top;
    win.dataset.ow = win.style.width;
    win.dataset.oh = win.style.height;
    win.style.left   = '0';
    win.style.top    = '0';
    win.style.width  = '100vw';
    win.style.height = 'calc(100vh - 34px)';
    win.dataset.maximized = '1';
  }
}

function bringToFront(id) {
  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.taskbar-btn').forEach(b => b.classList.remove('active'));
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.style.zIndex = ++zCounter;
  win.classList.add('active');
  const tb = document.getElementById('tb-' + id);
  if (tb) tb.classList.add('active');
  activeWindowId = id;
}

function addTaskbarButton(id) {
  if (document.getElementById('tb-' + id)) { bringToFront(id); return; }
  const btn = document.createElement('button');
  btn.className = 'taskbar-btn';
  btn.id = 'tb-' + id;
  btn.textContent = windowLabels[id] || id;
  btn.onclick = () => {
    const win = document.getElementById('win-' + id);
    if (win.style.display === 'none') {
      win.style.display = 'flex';
      bringToFront(id);
    } else if (activeWindowId === id) {
      minimizeWindow(id);
    } else {
      bringToFront(id);
    }
  };
  document.getElementById('taskbar-buttons').appendChild(btn);
}

function removeTaskbarButton(id) {
  const btn = document.getElementById('tb-' + id);
  if (btn) btn.remove();
}

function toggleStartMenu() {
  document.getElementById('start-menu').classList.toggle('open');
}

document.getElementById('desktop').addEventListener('mousedown', (e) => {
  if (!e.target.closest('#start-menu') && !e.target.closest('#start-btn')) {
    document.getElementById('start-menu').classList.remove('open');
  }
  const win = e.target.closest('.window');
  if (win) bringToFront(win.id.replace('win-', ''));
});


/* -------------------------------------------------------------
   Drag & resize
   ------------------------------------------------------------- */

function startDrag(e, id) {
  e.preventDefault();
  const win  = document.getElementById('win-' + id);
  const rect = win.getBoundingClientRect();
  dragState = {
    id,
    startX: e.clientX, startY: e.clientY,
    winX: rect.left,   winY: rect.top,
  };
  bringToFront(id);
}

function startResize(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const win = document.getElementById('win-' + id);
  resizeState = {
    id,
    startX: e.clientX,       startY: e.clientY,
    startW: win.offsetWidth, startH: win.offsetHeight,
  };
}

document.addEventListener('mousemove', (e) => {
  if (dragState) {
    const win = document.getElementById('win-' + dragState.id);
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    let nx = Math.max(0, Math.min(dragState.winX + dx, window.innerWidth  - 100));
    let ny = Math.max(0, Math.min(dragState.winY + dy, window.innerHeight - 34 - 20));
    win.style.left = nx + 'px';
    win.style.top  = ny + 'px';
  }
  if (resizeState) {
    const win = document.getElementById('win-' + resizeState.id);
    win.style.width  = Math.max(200, resizeState.startW + e.clientX - resizeState.startX) + 'px';
    win.style.height = Math.max(120, resizeState.startH + e.clientY - resizeState.startY) + 'px';
  }
});

document.addEventListener('mouseup', () => { dragState = null; resizeState = null; });


/* -------------------------------------------------------------
   Clock
   ------------------------------------------------------------- */

function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent =
    now.getHours().toString().padStart(2, '0') + ':' +
    now.getMinutes().toString().padStart(2, '0');
}
updateClock();
setInterval(updateClock, 10000);


/* -------------------------------------------------------------
   Populate content from content.js
   ------------------------------------------------------------- */

// Bio
document.getElementById('bio-text').value = bioText;

// Links
const linksEl = document.getElementById('links-list');
links.forEach(link => {
  const a = document.createElement('a');
  a.href = link.url;
  a.className = 'list-item';
  a.style.cssText = 'text-decoration:none; color:inherit';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = link.icon + ' ' + link.label;
  linksEl.appendChild(a);
});
document.getElementById('links-status').textContent = links.length + ' links';

// Projects
const projectsEl = document.getElementById('projects-list');
projects.forEach(p => {
  const div = document.createElement('div');
  div.className = 'project-item';
  if (p.url) div.onclick = () => window.open(p.url, '_blank');
  div.innerHTML = `
    <div style="font-weight:bold; font-size:12px">${p.icon} ${p.title}</div>
    <div style="font-size:10px; margin-top:3px">${p.description}</div>
    <div class="project-meta" style="font-size:10px; color:#666; margin-top:3px">
      Status: ${p.status} &nbsp;|&nbsp; Tags: ${p.tags}
    </div>`;
  projectsEl.appendChild(div);
});
document.getElementById('projects-status').textContent = projects.length + ' projects';

// Blog list
function renderBlogList() {
  const listEl = document.getElementById('blog-list');
  listEl.innerHTML = '';
  blogPosts.forEach((post, i) => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.style.cssText = 'flex-direction:column; align-items:flex-start; padding:8px; gap:2px';
    div.innerHTML = `
      <div style="font-weight:bold">${post.title}</div>
      <div style="font-size:10px; color:#666">${post.date}</div>`;
    div.onclick = () => openPost(i);
    listEl.appendChild(div);
  });
  document.getElementById('blog-status').textContent = blogPosts.length + ' posts';
}
renderBlogList();


/* -------------------------------------------------------------
   Music player
   ------------------------------------------------------------- */

let currentTrack   = 0;
let isPlaying      = false;
let progressInterval = null;
let progressPct    = 0;

function renderTracklist() {
  document.getElementById('tracklist').innerHTML = tracks.map((t, i) => `
    <div class="list-item" onclick="selectTrack(${i})"
      style="${i === currentTrack ? 'background:#000080;color:white' : ''}">
      <span style="width:14px">${i === currentTrack ? '▶' : ''}</span>
      ${t.title} — ${t.artist}
      <span style="margin-left:auto">${t.duration}</span>
    </div>`).join('');
}

function selectTrack(i) {
  currentTrack = i;
  progressPct  = 0;
  document.getElementById('music-progress').style.width = '0%';
  document.getElementById('music-track').textContent = '♪ ' + tracks[i].title + ' — ' + tracks[i].artist;
  if (isPlaying) startProgressBar();
  renderTracklist();
}

function musicPlay() {
  isPlaying = !isPlaying;
  document.getElementById('play-btn').textContent = isPlaying ? '⏸ Pause' : '▶ Play';
  document.getElementById('music-status').textContent = isPlaying ? 'PLAYING' : 'PAUSED';
  if (isPlaying) {
    document.getElementById('music-track').textContent =
      '♪ ' + tracks[currentTrack].title + ' — ' + tracks[currentTrack].artist;
    startProgressBar();
  } else {
    clearInterval(progressInterval);
  }
}

function startProgressBar() {
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    progressPct += 0.4;
    if (progressPct >= 100) { progressPct = 0; musicNext(); return; }
    document.getElementById('music-progress').style.width = progressPct + '%';
  }, 150);
}

function musicNext() { selectTrack((currentTrack + 1) % tracks.length); }
function musicPrev() { selectTrack((currentTrack - 1 + tracks.length) % tracks.length); }

renderTracklist();


/* -------------------------------------------------------------
   Blog
   ------------------------------------------------------------- */

function openPost(i) {
  const post = blogPosts[i];
  document.getElementById('blog-list').style.display  = 'none';
  document.getElementById('blog-post').style.display  = 'block';
  document.getElementById('blog-status').textContent  = post.date;
  document.getElementById('post-content').innerHTML   = `
    <div style="font-weight:bold; font-size:13px; margin-bottom:4px">${post.title}</div>
    <div style="font-size:10px; color:#555; margin-bottom:10px">${post.date}</div>
    <div style="font-size:11px; line-height:1.8; white-space:pre-line">${post.body}</div>`;
}

function closeBlogPost() {
  document.getElementById('blog-list').style.display = 'block';
  document.getElementById('blog-post').style.display = 'none';
  document.getElementById('blog-status').textContent = blogPosts.length + ' posts';
}


/* -------------------------------------------------------------
   Contact form
   ------------------------------------------------------------- */

function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const fb   = document.getElementById('contact-feedback');
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' },
  }).then(r => {
    if (r.ok) {
      fb.style.color  = '#006600';
      fb.textContent  = '✓ Message sent!';
      form.reset();
    } else {
      fb.style.color  = '#cc0000';
      fb.textContent  = '⚠ Something went wrong. Try again.';
    }
  }).catch(() => {
    fb.style.color = '#cc0000';
    fb.textContent = '⚠ Could not send. Check your connection.';
  });
}


/* -------------------------------------------------------------
   Snake
   ------------------------------------------------------------- */

let snakeLoop       = null;
let snakeHi         = 0;
let snakeKeyHandler = null;

function startSnake() {
  stopSnake();
  const canvas = document.getElementById('snake-canvas');
  const ctx    = canvas.getContext('2d');
  const size   = 18;
  const cols   = Math.floor(canvas.width  / size);
  const rows   = Math.floor(canvas.height / size);

  let snake   = [{ x: Math.floor(cols / 2), y: Math.floor(rows / 2) }];
  let dir     = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let food    = randomFood(snake, cols, rows);
  let score   = 0;
  let running = true;

  document.getElementById('snake-start-btn').style.display = 'none';
  document.getElementById('snake-score').textContent = 0;

  snakeKeyHandler = (e) => {
    if (!running) return;
    if ((e.key === 'ArrowUp'    || e.key === 'w') && dir.y !==  1) nextDir = { x:  0, y: -1 };
    if ((e.key === 'ArrowDown'  || e.key === 's') && dir.y !== -1) nextDir = { x:  0, y:  1 };
    if ((e.key === 'ArrowLeft'  || e.key === 'a') && dir.x !==  1) nextDir = { x: -1, y:  0 };
    if ((e.key === 'ArrowRight' || e.key === 'd') && dir.x !== -1) nextDir = { x:  1, y:  0 };
    if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
  };
  document.addEventListener('keydown', snakeKeyHandler);

  function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff00';
    snake.forEach(s => ctx.fillRect(s.x * size + 1, s.y * size + 1, size - 2, size - 2));
    ctx.fillStyle = '#ff4444';
    ctx.fillRect(food.x * size + 1, food.y * size + 1, size - 2, size - 2);
  }

  function tick() {
    dir = nextDir;
    const head = {
      x: (snake[0].x + dir.x + cols) % cols,
      y: (snake[0].y + dir.y + rows) % rows,
    };
    if (snake.slice(1).some(s => s.x === head.x && s.y === head.y)) {
      running = false;
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 80, canvas.width, 90);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 18px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', canvas.width / 2, 124);
      ctx.font = '13px Arial';
      ctx.fillText('Score: ' + score, canvas.width / 2, 148);
      if (score > snakeHi) {
        snakeHi = score;
        document.getElementById('snake-hi').textContent = snakeHi;
      }
      document.getElementById('snake-start-btn').textContent = '▶ Play Again';
      document.getElementById('snake-start-btn').style.display = 'block';
      document.removeEventListener('keydown', snakeKeyHandler);
      return;
    }
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score++;
      document.getElementById('snake-score').textContent = score;
      food = randomFood(snake, cols, rows);
    } else {
      snake.pop();
    }
    draw();
    snakeLoop = setTimeout(tick, 110);
  }

  draw();
  snakeLoop = setTimeout(tick, 110);
}

function stopSnake() {
  clearTimeout(snakeLoop);
  if (snakeKeyHandler) {
    document.removeEventListener('keydown', snakeKeyHandler);
    snakeKeyHandler = null;
  }
  const btn = document.getElementById('snake-start-btn');
  if (btn) { btn.textContent = '▶ Start Game'; btn.style.display = 'block'; }
}

function randomFood(snake, cols, rows) {
  let f;
  do { f = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; }
  while (snake.some(s => s.x === f.x && s.y === f.y));
  return f;
}


/* -------------------------------------------------------------
   Easter eggs
   ------------------------------------------------------------- */

function triggerBSOD() {
  document.getElementById('bsod').style.display = 'block';
}

document.getElementById('bsod').addEventListener('click', () => {
  document.getElementById('bsod').style.display = 'none';
});

document.getElementById('konami-overlay').addEventListener('click', () => {
  document.getElementById('konami-overlay').style.display = 'none';
});

const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let konamiIndex  = 0;

document.addEventListener('keydown', (e) => {
  if (document.getElementById('bsod').style.display === 'block') {
    document.getElementById('bsod').style.display = 'none';
    return;
  }
  if (document.getElementById('konami-overlay').style.display === 'block') {
    if (e.key === 'Escape') document.getElementById('konami-overlay').style.display = 'none';
    return;
  }
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      document.getElementById('konami-overlay').style.display = 'block';
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});
