// 1. DỮ LIỆU TÀI KHOẢN MẪU
const DEFAULT_USERS = [
  {
    fullName: "Sinh viên MindX",
    email: "demo@studyhub.vn",
    password: "123"
  }
];

// 2. DỮ LIỆU MẪU BAN ĐẦU
const DEFAULT_SCHEDULES = [
  {
    id: "sch-1",
    subject: "Phương pháp lập trình hướng đối tượng",
    day: "2",
    time: "7:00 - 11:30",
    room: "1.A401-Phòng học CLC",
    topic: "Đầu giờ: Giảng viên hỗ trợ sinh viên trong quá trình làm projectJava. Sau 8 giờ: Dạy bài cuối của chương trình là Exeption Handing(Xữ lý ngoại lệ). Cuối giờ: Viết báo cáo buổi học"
  },
  {
    id: "sch-2",
    subject: "Lập trình Web 1",
    day: "6",
    time: "13:00 - 17:30",
    room: "C.E401",
    topic: "Làm đồ án cuối khóa. Chuẩn bị demo giao diện và tính năng CRUD."
  },
  {
    id: "sch-3",
    subject: "Lý thuyết đồ thị",
    day: "5",
    time: "13:00 - 18:20",
    room: "1.A401-Phòng học CLC",
    topic: "Chương 3: Lý thuyết đồ thị. Lưu ý: Điểm danh đầu giờ, mang theo slide in sẵn."
  },
  {
    id: "sch-4",
    subject: "Mạng máy tính",
    day: "4",
    time: "07:00 - 11:30",
    room: "1.A401-Phòng học CLC",
    topic: "Làm và chấm bài Lab 4"
  },
  {
    id: "sch-5",
    subject: "Tiếng anh",
    day: "7",
    time: "18:00 - 21:00",
    room: "R.201",
    topic: "Làm writing part2 Dynamic Chart"
  }
];

const DEFAULT_TODOS = [
  {
    id: "todo-1",
    title: "Hoàn thiện giao diện đồ án SPCK",
    subject: "C4EJS",
    priority: "high",
    deadline: new Date(Date.now() + 86400000 * 1).toISOString().slice(0, 16),
    note: "Kiểm tra kỹ tông màu xanh da trời - trắng, responsive mobile và lưu dữ liệu localStorage.",
    completed: false
  },
  {
    id: "todo-2",
    title: "Làm đồ án môn học tuần 10",
    subject: "Hệ điều hành mã nguồn mở",
    priority: "medium",
    deadline: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 16),
    note: "Làm một shop bán đĩa CD trên linux",
    completed: false
  },
  {
    id: "todo-3",
    title: "Làm giao diện chính và giao diện admin cho shop bán sách",
    subject: "Web 1",
    priority: "low",
    deadline: new Date(Date.now() - 86400000).toISOString().slice(0, 16),
    note: "Đã cài xong Live Server và Prettier mở rộng.",
    completed: true
  }
];

const DEFAULT_KNOWLEDGE = [
  {
    id: "kn-1",
    subject: "JavaScript",
    week: "Tuần 3",
    title: "Phương thức xử lý mảng (Array Methods): map, filter, find",
    priority: "high",
    content: "• map(): Biến đổi từng phần tử và trả về mảng mới có cùng độ dài.\n• filter(): Lọc các phần tử thỏa mãn điều kiện boolean (true).\n• find(): Trả về phần tử ĐẦU TIÊN thỏa điều kiện, không thấy trả về undefined."
  },
  {
    id: "kn-2",
    subject: "JavaScript",
    week: "Tuần 4",
    title: "LocalStorage trong Trình Duyệt Web",
    priority: "high",
    content: "• Lưu dữ liệu: localStorage.setItem('key', JSON.stringify(data))\n• Lấy dữ liệu: JSON.parse(localStorage.getItem('key')) || []\n• Xóa: localStorage.removeItem('key') hoặc localStorage.clear()\n• Lưu ý: LocalStorage chỉ lưu được dữ liệu dạng chuỗi (String)."
  },
  {
    id: "kn-3",
    subject: "CSS",
    week: "Tuần 2",
    title: "Bố cục Flexbox cơ bản",
    priority: "medium",
    content: "display: flex;\n• justify-content: căn chỉnh theo trục chính (center, space-between, flex-start)\n• align-items: căn chỉnh theo trục vuông góc (center, stretch)\n• flex-direction: row (mặc định) hoặc column"
  },
  {
    id: "kn-4",
    subject: "Lập trình Web 1",
    week: "Tuần 5",
    title: "Mô hình Client - Server và HTTP Request",
    priority: "high",
    content: "• Client gửi Request (GET, POST, PUT, DELETE).\n• Server tiếp nhận, xử lý và trả về Response (Status code 200 OK, 404 Not Found, 500 Server Error).\n• Dữ liệu trao đổi phổ biến là JSON."
  }
];

// STATE MANAGEMENT
let users = JSON.parse(localStorage.getItem('studyhub_users')) || DEFAULT_USERS;
let currentUser = JSON.parse(localStorage.getItem('studyhub_currentUser')) || null;
let schedules = JSON.parse(localStorage.getItem('studyhub_schedules')) || DEFAULT_SCHEDULES;
let todos = JSON.parse(localStorage.getItem('studyhub_todos')) || DEFAULT_TODOS;
let knowledgeList = JSON.parse(localStorage.getItem('studyhub_knowledge')) || DEFAULT_KNOWLEDGE;

let scheduleFilterDay = 'all';
let todoFilterStatus = 'all';
let todoSearchQuery = '';
let knowledgeFilterSubject = 'all';
let knowledgeFilterPriority = 'all';
let knowledgeSearchQuery = '';

// Lưu vào LocalStorage
function saveData() {
  localStorage.setItem('studyhub_schedules', JSON.stringify(schedules));
  localStorage.setItem('studyhub_todos', JSON.stringify(todos));
  localStorage.setItem('studyhub_knowledge', JSON.stringify(knowledgeList));
  localStorage.setItem('studyhub_users', JSON.stringify(users));
  updateBadgesAndStats();
}

// ==========================================
// QUẢN LÝ XÁC THỰC (AUTHENTICATION)
// ==========================================

function getCurrentUser() {
  return JSON.parse(localStorage.getItem('studyhub_currentUser'));
}

function checkAuth(requireAuth = true) {
  const user = getCurrentUser();
  if (requireAuth && !user) {
    window.location.href = 'auth.html';
    return null;
  }
  if (user) {
    const nameEl = document.getElementById('user-display-name');
    const emailEl = document.getElementById('user-display-email');
    if (nameEl) nameEl.textContent = user.fullName || 'Học viên';
    if (emailEl) emailEl.textContent = user.email || '';
  }
  return user;
}

window.logout = function () {
  if (confirm('Bạn có chắc chắn muốn đăng xuất không?')) {
    localStorage.removeItem('studyhub_currentUser');
    window.location.href = 'auth.html';
  }
};

window.loginAsGuest = function () {
  const guestUser = {
    fullName: "Sinh viên MindX",
    email: "demo@studyhub.vn"
  };
  localStorage.setItem('studyhub_currentUser', JSON.stringify(guestUser));
  window.location.href = 'index.html';
};

// ==========================================
// KHỞI ĐỘNG TRANG (PAGE INITIALIZATION)
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Kiểm tra nếu đang ở trang Đăng nhập / Đăng ký (auth.html)
  if (document.getElementById('form-login') || document.getElementById('form-register')) {
    setupAuthPage();
    return;
  }

  // 2. Nếu ở các trang nội dung
  checkAuth(true);
  setupDateTimeHeader();
  updateBadgesAndStats();

  // Khởi chạy logic tương ứng với từng trang
  if (document.getElementById('dash-today-schedule') || document.getElementById('dash-subject-stats')) {
    initDashboardPage();
  }
  if (document.getElementById('schedule-list')) {
    initSchedulePage();
  }
  if (document.getElementById('todo-list')) {
    initTodoPage();
  }
  if (document.getElementById('knowledge-list')) {
    initKnowledgePage();
  }

  // Đóng modal khi bấm ra ngoài overlay
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.classList.remove('active');
    }
  });
});

// ==========================================
// TRANG AUTH (ĐĂNG NHẬP / ĐĂNG KÝ)
// ==========================================
function setupAuthPage() {
  if (getCurrentUser()) {
    window.location.href = 'index.html';
    return;
  }

  const tabLogin = document.getElementById('tab-btn-login');
  const tabRegister = document.getElementById('tab-btn-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.classList.add('active');
      formRegister.classList.remove('active');
    });

    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      formRegister.classList.add('active');
      formLogin.classList.remove('active');
    });
  }

  // ĐĂNG NHẬP: Hỗ trợ cả Email HOẶC Tên người dùng / Họ tên
  if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
      e.preventDefault();
      const identifier = document.getElementById('login-identifier').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;

      const user = users.find(u =>
        (u.email.toLowerCase() === identifier || u.fullName.toLowerCase() === identifier) &&
        u.password === password
      );

      if (user) {
        localStorage.setItem('studyhub_currentUser', JSON.stringify(user));
        showToast('Đăng nhập thành công! Đang chuyển hướng...');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 700);
      } else {
        alert('Tên đăng nhập / Email hoặc mật khẩu không chính xác!\n(Gợi ý: Dùng "Sinh viên MindX" hoặc "demo@studyhub.vn" / mật khẩu "123")');
      }
    });
  }

  // ĐĂNG KÝ
  if (formRegister) {
    formRegister.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('reg-fullname').value.trim();
      const email = document.getElementById('reg-email').value.trim().toLowerCase();
      const password = document.getElementById('reg-password').value;
      const rePassword = document.getElementById('reg-repassword').value;

      if (password !== rePassword) {
        alert('Mật khẩu nhập lại không khớp!');
        return;
      }

      if (users.some(u => u.email.toLowerCase() === email || u.fullName.toLowerCase() === fullName.toLowerCase())) {
        alert('Tên hoặc Email này đã tồn tại! Vui lòng chọn tên khác hoặc chuyển sang Đăng nhập.');
        return;
      }

      const newUser = { fullName, email, password };
      users.push(newUser);
      localStorage.setItem('studyhub_users', JSON.stringify(users));
      localStorage.setItem('studyhub_currentUser', JSON.stringify(newUser));

      showToast('Đăng ký thành công! Đang chuyển đến bảng điều khiển...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    });
  }
}

// ==========================================
// CẬP NHẬT HEADER & BADGE CHUNG
// ==========================================
function setupDateTimeHeader() {
  const now = new Date();
  const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const dayName = days[now.getDay()];
  const dateFormatted = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`;

  const dayEl = document.getElementById('current-day-text');
  const dateEl = document.getElementById('current-date-text');
  if (dayEl) dayEl.textContent = dayName;
  if (dateEl) dateEl.textContent = dateFormatted;
}

function getTodayDayCode() {
  const dayIndex = new Date().getDay();
  if (dayIndex === 0) return 'CN';
  return String(dayIndex + 1);
}

function getTomorrowDayCode() {
  const todayIndex = new Date().getDay();
  const tomorrowIndex = (todayIndex + 1) % 7;
  if (tomorrowIndex === 0) return 'CN';
  return String(tomorrowIndex + 1);
}

function getDayLabel(code) {
  return code === 'CN' ? 'Chủ nhật' : `Thứ ${code}`;
}

function updateBadgesAndStats() {
  const pendingTodos = todos.filter(t => !t.completed).length;
  const completedTodos = todos.filter(t => t.completed).length;
  const todayCode = getTodayDayCode();
  const todaySchedules = schedules.filter(s => s.day === todayCode).length;

  // Sidebar badge
  const pendingBadge = document.getElementById('pending-count');
  if (pendingBadge) pendingBadge.textContent = pendingTodos;

  // Các trang con
  const totalSchEl = document.getElementById('total-schedules');
  const todaySchEl = document.getElementById('today-schedules');
  if (totalSchEl) totalSchEl.textContent = schedules.length;
  if (todaySchEl) todaySchEl.textContent = todaySchedules;

  const todoPendingEl = document.getElementById('todo-pending');
  const todoCompletedEl = document.getElementById('todo-completed');
  if (todoPendingEl) todoPendingEl.textContent = pendingTodos;
  if (todoCompletedEl) todoCompletedEl.textContent = completedTodos;

  updateKnowledgeSubjectFilter();
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: #38bdf8;"></i> ${message}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

window.closeModal = function (modalId) {
  const el = document.getElementById(modalId);
  if (el) el.classList.remove('active');
};

function formatDateTime(date) {
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  return `${hh}:${mm} - ${d}/${m}/${y}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ===================================================
// TRANG CHỦ TỔNG QUAN (index.html - DASHBOARD)
// ===================================================
function initDashboardPage() {
  const user = getCurrentUser();
  const greetingEl = document.getElementById('dash-user-greeting');
  if (greetingEl && user) {
    greetingEl.textContent = `Xin chào, ${user.fullName || 'Học viên'}! 👋`;
  }

  // 1. Thống kê tổng số
  const totalScheduleCount = schedules.length;
  const pendingTodoCount = todos.filter(t => !t.completed).length;
  const totalKnowledgeCount = knowledgeList.length;

  const countSchEl = document.getElementById('dash-total-schedules');
  const countTodoEl = document.getElementById('dash-pending-todos');
  const countKnowEl = document.getElementById('dash-total-knowledge');

  if (countSchEl) countSchEl.textContent = `${totalScheduleCount} buổi học/tuần`;
  if (countTodoEl) countTodoEl.textContent = `${pendingTodoCount} bài tập chưa xong`;
  if (countKnowEl) countKnowEl.textContent = `${totalKnowledgeCount} ghi chú kiến thức`;

  // 2. Tình hình Lịch học: Hiện lịch của Hôm nay và Ngày mai
  renderDashboardSchedule();

  // 3. Tình hình Todo/Deadline: Hiện các deadline gần hết hạn nhất
  renderDashboardUrgentTodos();

  // 4. Tình hình Kho kiến thức: Hiện số lượng chia theo Subject (Môn học)
  renderDashboardSubjectStats();
}

function renderDashboardSchedule() {
  const todayContainer = document.getElementById('dash-today-schedule');
  const tomorrowContainer = document.getElementById('dash-tomorrow-schedule');
  if (!todayContainer || !tomorrowContainer) return;

  const todayCode = getTodayDayCode();
  const tomorrowCode = getTomorrowDayCode();

  const todayList = schedules.filter(s => s.day === todayCode);
  const tomorrowList = schedules.filter(s => s.day === tomorrowCode);

  // Hôm nay
  if (todayList.length === 0) {
    todayContainer.innerHTML = `
      <div style="padding: 16px 8px; text-align: center; color: var(--text-muted); font-size: 13.5px;">
        <i class="fa-regular fa-calendar-check" style="color: var(--primary); font-size: 20px; margin-bottom: 6px; display: block;"></i>
        Hôm nay bạn không có lịch học. Thảnh thơi ôn bài nhé!
      </div>
    `;
  } else {
    todayContainer.innerHTML = todayList.map(item => `
      <div class="schedule-card is-today" style="margin-bottom: 10px; padding: 14px;">
        <div class="schedule-header" style="margin-bottom: 8px;">
          <div class="day-badge"><i class="fa-solid fa-star"></i> Hôm nay</div>
          <div class="schedule-title" style="font-size: 15px;">${escapeHtml(item.subject)}</div>
        </div>
        <div class="schedule-meta" style="margin-bottom: 8px; font-size: 12.5px;">
          <div class="meta-item"><i class="fa-regular fa-clock"></i> <span>${escapeHtml(item.time)}</span></div>
          ${item.room ? `<div class="meta-item"><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(item.room)}</span></div>` : ''}
        </div>
        ${item.topic ? `
          <div class="schedule-note-box" style="font-size: 12px; padding: 8px 10px;">
            <strong>Lưu ý:</strong> ${escapeHtml(item.topic)}
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Ngày mai
  if (tomorrowList.length === 0) {
    tomorrowContainer.innerHTML = `
      <div style="padding: 16px 8px; text-align: center; color: var(--text-muted); font-size: 13.5px;">
        <i class="fa-regular fa-face-smile" style="color: var(--primary); font-size: 20px; margin-bottom: 6px; display: block;"></i>
        Ngày mai (${getDayLabel(tomorrowCode)}) không có buổi học nào.
      </div>
    `;
  } else {
    tomorrowContainer.innerHTML = tomorrowList.map(item => `
      <div class="schedule-card" style="margin-bottom: 10px; padding: 14px;">
        <div class="schedule-header" style="margin-bottom: 8px;">
          <div class="day-badge" style="background: #e0f2fe; color: #0369a1;">Ngày mai (${getDayLabel(tomorrowCode)})</div>
          <div class="schedule-title" style="font-size: 15px;">${escapeHtml(item.subject)}</div>
        </div>
        <div class="schedule-meta" style="margin-bottom: 8px; font-size: 12.5px;">
          <div class="meta-item"><i class="fa-regular fa-clock"></i> <span>${escapeHtml(item.time)}</span></div>
          ${item.room ? `<div class="meta-item"><i class="fa-solid fa-location-dot"></i> <span>${escapeHtml(item.room)}</span></div>` : ''}
        </div>
        ${item.topic ? `
          <div class="schedule-note-box" style="font-size: 12px; padding: 8px 10px;">
            <strong>Lưu ý:</strong> ${escapeHtml(item.topic)}
          </div>
        ` : ''}
      </div>
    `).join('');
  }
}

function renderDashboardUrgentTodos() {
  const container = document.getElementById('dash-urgent-todos');
  if (!container) return;

  // Lọc bài tập chưa xong và sắp xếp hạn chót gần nhất
  const pendingTodos = todos.filter(t => !t.completed);
  pendingTodos.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

  const urgentList = pendingTodos.slice(0, 4);

  if (urgentList.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 28px 16px;">
        <i class="fa-solid fa-circle-check" style="color: var(--success); font-size: 32px;"></i>
        <h4>Tuyệt vời! Không có bài tập tồn đọng</h4>
        <p>Tất cả deadline đã được hoàn thành đầy đủ.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = urgentList.map(item => {
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    const isOverdue = deadlineDate < now;
    const diffHours = (deadlineDate - now) / (1000 * 60 * 60);
    const isNear = diffHours > 0 && diffHours <= 24;
    const formattedDeadline = formatDateTime(deadlineDate);

    let priorityBadge = '';
    if (item.priority === 'high') {
      priorityBadge = `<span class="priority-badge priority-high"><i class="fa-solid fa-fire"></i> Gấp</span>`;
    } else if (item.priority === 'medium') {
      priorityBadge = `<span class="priority-badge priority-medium">🟡 Bình thường</span>`;
    } else {
      priorityBadge = `<span class="priority-badge priority-low">🟢 Thong thả</span>`;
    }

    return `
      <div class="todo-item" style="padding: 14px 16px;">
        <div class="todo-checkbox-wrapper">
          <div class="custom-checkbox" onclick="toggleTodoAndRefreshDash('${item.id}')" title="Tick hoàn thành"></div>
        </div>
        <div class="todo-content">
          <div class="todo-header-line">
            ${item.subject ? `<span class="todo-subject-badge">${escapeHtml(item.subject)}</span>` : ''}
            ${priorityBadge}
            <span class="deadline-badge ${isOverdue ? 'overdue' : (isNear ? 'near' : '')}">
              <i class="fa-regular fa-clock"></i> ${formattedDeadline}
              ${isOverdue ? '(Quá hạn!)' : (isNear ? '(Sắp đến hạn!)' : '')}
            </span>
          </div>
          <div class="todo-title" style="font-size: 15px;">${escapeHtml(item.title)}</div>
          ${item.note ? `<div class="todo-note-text"><i class="fa-regular fa-comment-dots"></i> ${escapeHtml(item.note)}</div>` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.toggleTodoAndRefreshDash = function (id) {
  const item = todos.find(t => t.id === id);
  if (item) {
    item.completed = true;
    saveData();
    initDashboardPage();
    showToast('Đã đánh dấu hoàn thành bài tập! 🎉');
  }
};

function renderDashboardSubjectStats() {
  const container = document.getElementById('dash-subject-stats');
  if (!container) return;

  // Tính số lượng bài viết / ghi chú chia theo từng Subject (Môn học)
  const subjectMap = {};
  knowledgeList.forEach(k => {
    const sub = k.subject ? k.subject.trim() : 'Môn khác';
    subjectMap[sub] = (subjectMap[sub] || 0) + 1;
  });

  const subjects = Object.keys(subjectMap);

  if (subjects.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 24px;">
        <i class="fa-solid fa-book-open"></i>
        <h4>Chưa có ghi chú kiến thức</h4>
        <p>Hãy vào mục Kho Kiến thức để lưu các bài học quan trọng.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = subjects.map(subName => {
    const count = subjectMap[subName];
    return `
      <div class="subject-stat-card">
        <div class="subject-stat-icon"><i class="fa-solid fa-book-bookmark"></i></div>
        <div class="subject-stat-info">
          <div class="subject-stat-name">${escapeHtml(subName)}</div>
          <div class="subject-stat-count"><strong style="color: var(--primary); font-size: 14px;">${count}</strong> ghi chú / bài học</div>
        </div>
      </div>
    `;
  }).join('');
}

// ===================================================
// TRANG LỊCH HỌC & LƯU Ý (schedule.html)
// ===================================================
function initSchedulePage() {
  const btnAdd = document.getElementById('btn-add-schedule');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openScheduleModal());
  }

  const scheduleDayBtns = document.querySelectorAll('#schedule-day-filter .pill');
  scheduleDayBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      scheduleDayBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      scheduleFilterDay = btn.getAttribute('data-day');
      renderSchedule();
    });
  });

  const formSchedule = document.getElementById('form-schedule');
  if (formSchedule) {
    formSchedule.addEventListener('submit', saveSchedule);
  }

  renderSchedule();
}

function renderSchedule() {
  const container = document.getElementById('schedule-list');
  if (!container) return;

  const todayCode = getTodayDayCode();
  let filtered = schedules;
  if (scheduleFilterDay !== 'all') {
    filtered = schedules.filter(s => s.day === scheduleFilterDay);
  }

  const dayOrder = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, 'CN': 8 };
  filtered.sort((a, b) => (dayOrder[a.day] || 9) - (dayOrder[b.day] || 9));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-calendar-xmark"></i>
        <h4>Chưa có lịch học nào</h4>
        <p>Bấm nút "Thêm lịch học" để tạo lịch mới cho tuần của bạn.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const isToday = item.day === todayCode;
    const dayLabel = getDayLabel(item.day);

    return `
      <div class="schedule-card ${isToday ? 'is-today' : ''}">
        ${isToday ? '<span class="today-ribbon"><i class="fa-solid fa-star"></i> Hôm nay</span>' : ''}
        <div class="schedule-header">
          <div class="day-badge">${dayLabel}</div>
          <div class="schedule-title">${escapeHtml(item.subject)}</div>
        </div>
        <div class="schedule-meta">
          <div class="meta-item">
            <i class="fa-regular fa-clock"></i>
            <span>${escapeHtml(item.time)}</span>
          </div>
          ${item.room ? `
            <div class="meta-item">
              <i class="fa-solid fa-location-dot"></i>
              <span>${escapeHtml(item.room)}</span>
            </div>
          ` : ''}
        </div>
        ${item.topic ? `
          <div class="schedule-note-box">
            <strong><i class="fa-regular fa-bookmark"></i> Lưu ý / Nội dung:</strong>
            ${escapeHtml(item.topic)}
          </div>
        ` : ''}
        <div class="card-actions">
          <button class="btn-edit-sm" onclick="editSchedule('${item.id}')" title="Sửa lịch học">
            <i class="fa-regular fa-pen-to-square"></i> Sửa
          </button>
          <button class="btn-danger-sm" onclick="deleteSchedule('${item.id}')" title="Xóa lịch học">
            <i class="fa-regular fa-trash-can"></i> Xóa
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openScheduleModal(schedule = null) {
  const modal = document.getElementById('modal-schedule');
  const title = document.getElementById('schedule-modal-title');
  const form = document.getElementById('form-schedule');

  if (schedule) {
    title.textContent = 'Chỉnh Sửa Lịch Học';
    document.getElementById('schedule-id').value = schedule.id;
    document.getElementById('schedule-subject').value = schedule.subject;
    document.getElementById('schedule-day').value = schedule.day;
    document.getElementById('schedule-time').value = schedule.time;
    document.getElementById('schedule-room').value = schedule.room || '';
    document.getElementById('schedule-topic').value = schedule.topic || '';
  } else {
    title.textContent = 'Thêm Lịch Học Mới';
    form.reset();
    document.getElementById('schedule-id').value = '';
  }

  modal.classList.add('active');
}

function saveSchedule(e) {
  e.preventDefault();
  const id = document.getElementById('schedule-id').value;
  const subject = document.getElementById('schedule-subject').value.trim();
  const day = document.getElementById('schedule-day').value;
  const time = document.getElementById('schedule-time').value.trim();
  const room = document.getElementById('schedule-room').value.trim();
  const topic = document.getElementById('schedule-topic').value.trim();

  if (!subject || !time) return;

  if (id) {
    const index = schedules.findIndex(s => s.id === id);
    if (index !== -1) {
      schedules[index] = { id, subject, day, time, room, topic };
      showToast('Đã cập nhật lịch học thành công!');
    }
  } else {
    const newSchedule = {
      id: 'sch-' + Date.now(),
      subject,
      day,
      time,
      room,
      topic
    };
    schedules.push(newSchedule);
    showToast('Đã thêm lịch học mới thành công!');
  }

  saveData();
  renderSchedule();
  closeModal('modal-schedule');
}

window.editSchedule = function (id) {
  const item = schedules.find(s => s.id === id);
  if (item) openScheduleModal(item);
};

window.deleteSchedule = function (id) {
  if (confirm('Bạn có chắc chắn muốn xóa buổi học này không?')) {
    schedules = schedules.filter(s => s.id !== id);
    saveData();
    renderSchedule();
    showToast('Đã xóa buổi học!');
  }
};

// ===================================================
// TRANG TODO & DEADLINE (todo.html)
// ===================================================
function initTodoPage() {
  const btnAdd = document.getElementById('btn-add-todo');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openTodoModal());
  }

  const todoStatusBtns = document.querySelectorAll('#todo-status-filter .pill');
  todoStatusBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      todoStatusBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      todoFilterStatus = btn.getAttribute('data-status');
      renderTodos();
    });
  });

  const todoSearch = document.getElementById('todo-search');
  if (todoSearch) {
    todoSearch.addEventListener('input', (e) => {
      todoSearchQuery = e.target.value.trim();
      renderTodos();
    });
  }

  const formTodo = document.getElementById('form-todo');
  if (formTodo) {
    formTodo.addEventListener('submit', saveTodo);
  }

  renderTodos();
}

function renderTodos() {
  const container = document.getElementById('todo-list');
  if (!container) return;

  let filtered = todos;

  if (todoFilterStatus === 'pending') {
    filtered = filtered.filter(t => !t.completed);
  } else if (todoFilterStatus === 'done') {
    filtered = filtered.filter(t => t.completed);
  }

  if (todoSearchQuery) {
    const q = todoSearchQuery.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.subject && t.subject.toLowerCase().includes(q)) ||
      (t.note && t.note.toLowerCase().includes(q))
    );
  }

  filtered.sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return new Date(a.deadline) - new Date(b.deadline);
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-regular fa-clipboard"></i>
        <h4>Không có deadline nào phù hợp</h4>
        <p>Bấm nút "Thêm deadline" để tạo bài tập cần hoàn thành.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const deadlineDate = new Date(item.deadline);
    const now = new Date();
    const isOverdue = !item.completed && deadlineDate < now;
    const diffHours = (deadlineDate - now) / (1000 * 60 * 60);
    const isNear = !item.completed && diffHours > 0 && diffHours <= 24;

    const formattedDeadline = formatDateTime(deadlineDate);

    let priorityBadge = '';
    if (item.priority === 'high') {
      priorityBadge = `<span class="priority-badge priority-high"><i class="fa-solid fa-fire"></i> Gấp</span>`;
    } else if (item.priority === 'medium') {
      priorityBadge = `<span class="priority-badge priority-medium">🟡 Bình thường</span>`;
    } else {
      priorityBadge = `<span class="priority-badge priority-low">🟢 Thong thả</span>`;
    }

    return `
      <div class="todo-item ${item.completed ? 'completed' : ''}">
        <div class="todo-checkbox-wrapper">
          <div class="custom-checkbox" onclick="toggleTodo('${item.id}')" title="${item.completed ? 'Đánh dấu chưa xong' : 'Đánh dấu hoàn thành'}">
            ${item.completed ? '<i class="fa-solid fa-check"></i>' : ''}
          </div>
        </div>
        <div class="todo-content">
          <div class="todo-header-line">
            ${item.subject ? `<span class="todo-subject-badge">${escapeHtml(item.subject)}</span>` : ''}
            ${priorityBadge}
            <span class="deadline-badge ${isOverdue ? 'overdue' : (isNear ? 'near' : '')}">
              <i class="fa-regular fa-clock"></i> ${formattedDeadline}
              ${isOverdue ? '(Quá hạn!)' : (isNear ? '(Sắp đến hạn!)' : '')}
            </span>
          </div>
          <div class="todo-title">${escapeHtml(item.title)}</div>
          ${item.note ? `<div class="todo-note-text"><i class="fa-regular fa-comment-dots"></i> ${escapeHtml(item.note)}</div>` : ''}
        </div>
        <div class="card-actions" style="margin-top: 0; padding-top: 0; border: none;">
          <button class="btn-edit-sm" onclick="editTodo('${item.id}')" title="Sửa bài tập">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
          <button class="btn-danger-sm" onclick="deleteTodo('${item.id}')" title="Xóa bài tập">
            <i class="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openTodoModal(todo = null) {
  const modal = document.getElementById('modal-todo');
  const title = document.getElementById('todo-modal-title');
  const form = document.getElementById('form-todo');

  if (todo) {
    title.textContent = 'Chỉnh Sửa Deadline';
    document.getElementById('todo-id').value = todo.id;
    document.getElementById('todo-title').value = todo.title;
    document.getElementById('todo-subject').value = todo.subject || '';
    document.getElementById('todo-priority').value = todo.priority || 'medium';
    document.getElementById('todo-deadline').value = todo.deadline;
    document.getElementById('todo-note').value = todo.note || '';
  } else {
    title.textContent = 'Thêm Bài Tập / Deadline';
    form.reset();
    document.getElementById('todo-id').value = '';
    const tomorrow = new Date(Date.now() + 86400000);
    tomorrow.setHours(23, 59, 0, 0);
    document.getElementById('todo-deadline').value = tomorrow.toISOString().slice(0, 16);
  }

  modal.classList.add('active');
}

function saveTodo(e) {
  e.preventDefault();
  const id = document.getElementById('todo-id').value;
  const title = document.getElementById('todo-title').value.trim();
  const subject = document.getElementById('todo-subject').value.trim();
  const priority = document.getElementById('todo-priority').value;
  const deadline = document.getElementById('todo-deadline').value;
  const note = document.getElementById('todo-note').value.trim();

  if (!title || !deadline) return;

  if (id) {
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], title, subject, priority, deadline, note };
      showToast('Đã cập nhật bài tập thành công!');
    }
  } else {
    const newTodo = {
      id: 'todo-' + Date.now(),
      title,
      subject,
      priority,
      deadline,
      note,
      completed: false
    };
    todos.push(newTodo);
    showToast('Đã thêm bài tập mới thành công!');
  }

  saveData();
  renderTodos();
  closeModal('modal-todo');
}

window.toggleTodo = function (id) {
  const item = todos.find(t => t.id === id);
  if (item) {
    item.completed = !item.completed;
    saveData();
    renderTodos();
    showToast(item.completed ? 'Đã hoàn thành bài tập! 🎉' : 'Đã chuyển về chưa xong.');
  }
};

window.editTodo = function (id) {
  const item = todos.find(t => t.id === id);
  if (item) openTodoModal(item);
};

window.deleteTodo = function (id) {
  if (confirm('Bạn có chắc muốn xóa bài tập này?')) {
    todos = todos.filter(t => t.id !== id);
    saveData();
    renderTodos();
    showToast('Đã xóa bài tập!');
  }
};

// ===================================================
// TRANG KHO KIẾN THỨC (knowledge.html)
// ===================================================
function initKnowledgePage() {
  const btnAdd = document.getElementById('btn-add-knowledge');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openKnowledgeModal());
  }

  const knowledgeSubject = document.getElementById('knowledge-subject-filter');
  if (knowledgeSubject) {
    knowledgeSubject.addEventListener('change', (e) => {
      knowledgeFilterSubject = e.target.value;
      renderKnowledge();
    });
  }

  const knowledgePriority = document.getElementById('knowledge-priority-filter');
  if (knowledgePriority) {
    knowledgePriority.addEventListener('change', (e) => {
      knowledgeFilterPriority = e.target.value;
      renderKnowledge();
    });
  }

  const knowledgeSearch = document.getElementById('knowledge-search');
  if (knowledgeSearch) {
    knowledgeSearch.addEventListener('input', (e) => {
      knowledgeSearchQuery = e.target.value.trim();
      renderKnowledge();
    });
  }

  const formKnowledge = document.getElementById('form-knowledge');
  if (formKnowledge) {
    formKnowledge.addEventListener('submit', saveKnowledge);
  }

  renderKnowledge();
}

function updateKnowledgeSubjectFilter() {
  const select = document.getElementById('knowledge-subject-filter');
  if (!select) return;

  const subjects = [...new Set(knowledgeList.map(k => k.subject).filter(Boolean))];
  const currentVal = select.value;

  select.innerHTML = '<option value="all">Tất cả môn học</option>' +
    subjects.map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join('');

  if (subjects.includes(currentVal)) {
    select.value = currentVal;
  }
}

function renderKnowledge() {
  const container = document.getElementById('knowledge-list');
  if (!container) return;

  let filtered = knowledgeList;

  if (knowledgeFilterSubject !== 'all') {
    filtered = filtered.filter(k => k.subject === knowledgeFilterSubject);
  }

  if (knowledgeFilterPriority !== 'all') {
    filtered = filtered.filter(k => k.priority === knowledgeFilterPriority);
  }

  if (knowledgeSearchQuery) {
    const q = knowledgeSearchQuery.toLowerCase();
    filtered = filtered.filter(k =>
      k.title.toLowerCase().includes(q) ||
      k.week.toLowerCase().includes(q) ||
      k.subject.toLowerCase().includes(q) ||
      (k.content && k.content.toLowerCase().includes(q))
    );
  }

  const priorityOrder = { high: 1, medium: 2, low: 3 };
  filtered.sort((a, b) => (priorityOrder[a.priority] || 9) - (priorityOrder[b.priority] || 9));

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-book-open"></i>
        <h4>Kho kiến thức chưa có ghi chú nào</h4>
        <p>Bấm "Thêm ghi chú" để tóm tắt lý thuyết, công thức hoặc lưu ý thi quan trọng.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    let starLabel = '';
    let starClass = '';
    if (item.priority === 'high') {
      starLabel = '⭐⭐⭐ Trọng tâm thi';
      starClass = 'high';
    } else if (item.priority === 'medium') {
      starLabel = '⭐⭐ Quan trọng';
      starClass = 'medium';
    } else {
      starLabel = '⭐ Đọc thêm';
      starClass = 'low';
    }

    return `
      <div class="knowledge-card">
        <div class="knowledge-top">
          <div class="subject-week-tag">
            <i class="fa-solid fa-graduation-cap"></i> ${escapeHtml(item.subject)} • ${escapeHtml(item.week)}
          </div>
          <div class="star-rating ${starClass}">${starLabel}</div>
        </div>
        <div class="knowledge-title">${escapeHtml(item.title)}</div>
        <div class="knowledge-body">${escapeHtml(item.content || 'Chưa có nội dung ghi chú.')}</div>
        <div class="card-actions">
          <button class="btn-edit-sm" onclick="editKnowledge('${item.id}')" title="Sửa kiến thức">
            <i class="fa-regular fa-pen-to-square"></i> Sửa
          </button>
          <button class="btn-danger-sm" onclick="deleteKnowledge('${item.id}')" title="Xóa kiến thức">
            <i class="fa-regular fa-trash-can"></i> Xóa
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openKnowledgeModal(item = null) {
  const modal = document.getElementById('modal-knowledge');
  const title = document.getElementById('knowledge-modal-title');
  const form = document.getElementById('form-knowledge');

  if (item) {
    title.textContent = 'Chỉnh Sửa Ghi Chú Kiến Thức';
    document.getElementById('knowledge-id').value = item.id;
    document.getElementById('knowledge-subject').value = item.subject;
    document.getElementById('knowledge-week').value = item.week;
    document.getElementById('knowledge-title').value = item.title;
    document.getElementById('knowledge-priority').value = item.priority || 'medium';
    document.getElementById('knowledge-content').value = item.content || '';
  } else {
    title.textContent = 'Thêm Ghi Chú Kiến Thức';
    form.reset();
    document.getElementById('knowledge-id').value = '';
  }

  modal.classList.add('active');
}

function saveKnowledge(e) {
  e.preventDefault();
  const id = document.getElementById('knowledge-id').value;
  const subject = document.getElementById('knowledge-subject').value.trim();
  const week = document.getElementById('knowledge-week').value.trim();
  const title = document.getElementById('knowledge-title').value.trim();
  const priority = document.getElementById('knowledge-priority').value;
  const content = document.getElementById('knowledge-content').value.trim();

  if (!subject || !week || !title) return;

  if (id) {
    const index = knowledgeList.findIndex(k => k.id === id);
    if (index !== -1) {
      knowledgeList[index] = { id, subject, week, title, priority, content };
      showToast('Đã cập nhật ghi chú kiến thức!');
    }
  } else {
    const newKnowledge = {
      id: 'kn-' + Date.now(),
      subject,
      week,
      title,
      priority,
      content
    };
    knowledgeList.push(newKnowledge);
    showToast('Đã lưu ghi chú kiến thức mới!');
  }

  saveData();
  renderKnowledge();
  closeModal('modal-knowledge');
}

window.editKnowledge = function (id) {
  const item = knowledgeList.find(k => k.id === id);
  if (item) openKnowledgeModal(item);
};

window.deleteKnowledge = function (id) {
  if (confirm('Bạn có chắc muốn xóa ghi chú này?')) {
    knowledgeList = knowledgeList.filter(k => k.id !== id);
    saveData();
    renderKnowledge();
    showToast('Đã xóa ghi chú kiến thức!');
  }
};
