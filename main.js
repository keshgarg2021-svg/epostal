// ePostal Coaching App - Main JS

// ============================================================ NAV STATE
let pageHistory = [];
let currentPage = 'home';

// ============================================================ COURSES DATA
const coursesData = [
  { id:1, emoji:'📬', title:'GDS to MTS', cat:'full', price:'₹1,299', old:'₹1,599', rating:'4.8', students:'3.2k' },
  { id:2, emoji:'✉️', title:'Postman & Mail Guard', cat:'full', price:'₹1,399', old:'₹1,799', rating:'4.9', students:'4.1k' },
  { id:3, emoji:'🏛️', title:'PA & SA Complete', cat:'full', price:'₹1,799', old:'₹2,299', rating:'4.7', students:'5k' },
  { id:4, emoji:'📄', title:'PA/SA PDF Notes', cat:'notes', price:'₹699', old:'₹799', rating:'4.6', students:'2.1k' },
  { id:5, emoji:'📄', title:'MTS PDF Notes', cat:'notes', price:'₹499', old:'₹599', rating:'4.5', students:'1.8k' },
  { id:6, emoji:'📄', title:'Postman/MG Notes', cat:'notes', price:'₹599', old:'₹699', rating:'4.6', students:'1.5k' },
  { id:7, emoji:'📝', title:'Postman 30 PYQs', cat:'pyq', price:'₹499', old:'₹599', rating:'4.7', students:'2.4k' },
  { id:8, emoji:'📝', title:'MTS 30 PYQs', cat:'pyq', price:'₹399', old:'₹500', rating:'4.5', students:'1.9k' },
  { id:9, emoji:'📝', title:'PA 30 PYQs', cat:'pyq', price:'₹499', old:'₹599', rating:'4.8', students:'2.7k' },
  { id:10, emoji:'📋', title:'MTS + Postman Mock Tests', cat:'mock', price:'₹499', old:'₹799', rating:'4.9', students:'3.5k' },
  { id:11, emoji:'🏅', title:'Inspector (Post)', cat:'full', price:'₹5,999', old:'₹9,999', rating:'4.9', students:'1.2k' },
  { id:12, emoji:'🔢', title:'DOP Maths', cat:'full', price:'₹499', old:'₹799', rating:'4.6', students:'3k' },
  { id:13, emoji:'🎁', title:'PA/SA + MTS COMBO', cat:'combo', price:'₹2,299', old:'₹3,199', rating:'4.8', students:'2.8k' },
  { id:14, emoji:'💻', title:'IT Modernization', cat:'full', price:'₹899', old:'₹1,299', rating:'4.7', students:'2.2k' },
];

let activeFilter = 'all';

// ============================================================ INIT
window.addEventListener('DOMContentLoaded', () => {
  // Splash animation
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      showPage('home');
    }, 500);
  }, 2200);

  // Drawer button
  document.getElementById('menuBtn').addEventListener('click', openDrawer);
  document.getElementById('closeDrawer').addEventListener('click', closeDrawerFn);

  // Render initial courses
  renderCourses('all');

  // Start quiz timer
  startTimers();
});

// ============================================================ NAVIGATION
function showPage(pageName) {
  const prev = document.getElementById(`page-${currentPage}`);
  const next = document.getElementById(`page-${pageName}`);
  if (!next) return;
  if (prev) prev.classList.remove('active');
  next.classList.add('active');
  if (currentPage !== pageName) pageHistory.push(currentPage);
  currentPage = pageName;
  // Update bottom nav active state
  updateBottomNav(pageName);
}

function goBack() {
  if (pageHistory.length > 0) {
    const prev = pageHistory.pop();
    const curPage = document.getElementById(`page-${currentPage}`);
    const prevPage = document.getElementById(`page-${prev}`);
    if (curPage) curPage.classList.remove('active');
    if (prevPage) prevPage.classList.add('active');
    currentPage = prev;
    updateBottomNav(prev);
  }
}

function updateBottomNav(pageName) {
  const navMap = { home: 0, courses: 1, tests: 2, schedule: 3, profile: 4 };
  const btns = document.querySelectorAll('.bn-item');
  btns.forEach((b, i) => b.classList.remove('active'));
  if (navMap[pageName] !== undefined) btns[navMap[pageName]].classList.add('active');
}

function setActive(btn) {
  document.querySelectorAll('.bn-item').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ============================================================ DRAWER
function openDrawer() {
  document.getElementById('drawer').classList.remove('hidden');
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawerOverlay').classList.remove('hidden');
}
function closeDrawerFn() {
  document.getElementById('drawer').classList.remove('open');
  setTimeout(() => {
    document.getElementById('drawer').classList.add('hidden');
    document.getElementById('drawerOverlay').classList.add('hidden');
  }, 300);
}

// ============================================================ SPLASH (logout)
function showSplash() {
  document.getElementById('app').classList.add('hidden');
  const splash = document.getElementById('splash');
  splash.style.opacity = '1';
  splash.classList.remove('hidden');
  const bar = splash.querySelector('.loader-bar');
  bar.style.animation = 'none';
  bar.offsetWidth; // reflow
  bar.style.animation = 'loadBar 1.8s 0.3s ease forwards';
  setTimeout(() => {
    splash.style.opacity = '0';
    setTimeout(() => {
      splash.classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      pageHistory = [];
      showPage('home');
    }, 500);
  }, 2200);
}

// ============================================================ COURSES
function renderCourses(filter) {
  activeFilter = filter;
  const grid = document.getElementById('coursesGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? coursesData : coursesData.filter(c => c.cat === filter);
  grid.innerHTML = filtered.map(c => `
    <div class="course-card-v" onclick="showPage('courseDetail')">
      <div class="course-thumb-v">${c.emoji}</div>
      <div class="course-info-v">
        <div class="course-tag">${catLabel(c.cat)}</div>
        <div class="course-name-v">${c.title}</div>
        <div class="course-price-v">
          <span class="price-new">${c.price}</span>
          <span class="price-old">${c.old}</span>
        </div>
        <div class="course-rating">⭐ ${c.rating} · ${c.students}</div>
      </div>
    </div>
  `).join('');
}

function catLabel(cat) {
  const m = { full:'Full Course', mock:'Mock Test', notes:'Notes', pyq:'PYQ', combo:'COMBO' };
  return m[cat] || cat;
}

function filterTab(btn, filter) {
  document.querySelectorAll('#filterTabs .filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCourses(filter);
}

function filterCourses(cat) {
  const map = { 'Full Courses':'full', 'Mock Tests':'mock', 'Notes':'notes', 'PYQ':'pyq' };
  activeFilter = map[cat] || 'all';
}

function toggleSearch() {
  const bar = document.getElementById('searchBar');
  bar.classList.toggle('hidden');
  if (!bar.classList.contains('hidden')) document.getElementById('searchInput').focus();
}

function searchCourses(val) {
  const grid = document.getElementById('coursesGrid');
  const filtered = coursesData.filter(c => c.title.toLowerCase().includes(val.toLowerCase()));
  grid.innerHTML = filtered.map(c => `
    <div class="course-card-v" onclick="showPage('courseDetail')">
      <div class="course-thumb-v">${c.emoji}</div>
      <div class="course-info-v">
        <div class="course-tag">${catLabel(c.cat)}</div>
        <div class="course-name-v">${c.title}</div>
        <div class="course-price-v">
          <span class="price-new">${c.price}</span>
          <span class="price-old">${c.old}</span>
        </div>
        <div class="course-rating">⭐ ${c.rating} · ${c.students}</div>
      </div>
    </div>
  `).join('');
}

// ============================================================ COURSE DETAIL TABS
function switchCdTab(btn, tab) {
  document.querySelectorAll('.cd-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.cd-tab-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`cd-${tab}`)?.classList.add('active');
}

// ============================================================ LESSON TABS
function switchLessonTab(btn, tab) {
  document.querySelectorAll('.lesson-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.lt-content').forEach(c => c.classList.remove('active'));
  document.getElementById(`lt-${tab}`)?.classList.add('active');
}

// ============================================================ QUIZ LOGIC
let currentQ = 0;
const totalQ = 10;
let answered = false;

function selectOption(btn, isCorrect) {
  if (answered) return;
  answered = true;
  const parent = btn.closest('.options-list');
  if (!parent) return;
  const all = parent.querySelectorAll('.option-btn');
  all.forEach(b => {
    b.disabled = true;
    if (b === btn) b.classList.add(isCorrect ? 'correct' : 'wrong');
    else if (b.getAttribute('onclick')?.includes('true')) b.classList.add('correct');
  });
  if (!isCorrect) btn.classList.add('wrong');
}

function nextQ() {
  if (currentQ < totalQ - 1) {
    currentQ++;
    answered = false;
    updateQuizUI();
  } else {
    // Show completion
    showQuizResult();
  }
}

function prevQ() {
  if (currentQ > 0) {
    currentQ--;
    answered = false;
    updateQuizUI();
  }
}

function updateQuizUI() {
  const pct = ((currentQ + 1) / totalQ) * 100;
  const numEl = document.getElementById('qNum');
  const fillEl = document.getElementById('qpFill');
  if (numEl) numEl.textContent = currentQ + 1;
  if (fillEl) fillEl.style.width = pct + '%';
  // Reset options
  document.querySelectorAll('.option-btn').forEach(b => {
    b.classList.remove('correct', 'wrong', 'selected');
    b.disabled = false;
  });
}

function showQuizResult() {
  const qc = document.querySelector('#page-quiz .question-card');
  if (qc) {
    qc.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:56px;margin-bottom:12px">🎉</div>
        <h2 style="font-family:var(--font-head);font-size:24px;margin-bottom:8px">Test Complete!</h2>
        <div style="font-size:36px;font-weight:800;color:var(--primary);font-family:var(--font-head);margin-bottom:8px">80%</div>
        <div style="color:var(--text-muted);font-size:13px;margin-bottom:20px">8 out of 10 correct</div>
        <button class="btn-primary" onclick="goBack()">Back to Tests</button>
      </div>
    `;
  }
}

// ============================================================ TIMERS
function startTimers() {
  // Quiz timer
  let quizSec = 45 * 60;
  setInterval(() => {
    quizSec = Math.max(0, quizSec - 1);
    const el = document.getElementById('quizTimer');
    if (el) el.textContent = formatTime(quizSec);
  }, 1000);

  // Daily timer
  let dailySec = 5 * 60;
  setInterval(() => {
    dailySec = Math.max(0, dailySec - 1);
    const el = document.getElementById('dailyTimer');
    if (el) el.textContent = formatTime(dailySec);
  }, 1000);
}

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// ============================================================ LB TABS
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lb-tab')) {
    document.querySelectorAll('.lb-tab').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
  if (e.target.classList.contains('df-tab')) {
    document.querySelectorAll('.df-tab').forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
  }
});

// ============================================================ ASK DOUBT
function showAskDoubt() {
  const section = document.querySelector('#page-doubts .scroll-content');
  if (!section) return;
  const existing = section.querySelector('.ask-doubt-form');
  if (existing) { existing.remove(); return; }
  const form = document.createElement('div');
  form.className = 'ask-doubt-form doubt-post';
  form.style.borderLeft = '3px solid var(--primary)';
  form.innerHTML = `
    <div style="font-weight:700;font-size:14px;margin-bottom:10px">Ask a Doubt ✏️</div>
    <select style="width:100%;padding:8px;border:2px solid var(--border);border-radius:8px;margin-bottom:8px;font-family:var(--font-body)">
      <option>PA/SA</option><option>MTS</option><option>Postman</option><option>General</option>
    </select>
    <textarea placeholder="Type your doubt here..." class="doubt-input"></textarea>
    <div style="display:flex;gap:8px;margin-top:8px">
      <button class="btn-primary small" style="flex:1" onclick="this.closest('.ask-doubt-form').remove()">Post Doubt</button>
      <button class="btn-outline small" onclick="this.closest('.ask-doubt-form').remove()">Cancel</button>
    </div>
  `;
  section.insertBefore(form, section.firstChild);
}
