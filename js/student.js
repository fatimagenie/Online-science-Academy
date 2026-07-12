function osEsc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function getStudentSession() {
  try {
    var s = sessionStorage.getItem('studentSession');
    if (s) return JSON.parse(s);
  } catch(e) {}
  return null;
}

function setStudentSession(data) {
  sessionStorage.setItem('studentSession', JSON.stringify(data));
}

function clearStudentSession() {
  sessionStorage.removeItem('studentSession');
}

function studentLogin(email) {
  var student = osaStudentLogin(email);
  if (student) {
    setStudentSession({ email: student.email, name: student.name, id: student.id, loggedIn: true });
    return student;
  }
  return null;
}

function studentLogout() {
  clearStudentSession();
  window.location.reload();
}

function getStudentData() {
  var session = getStudentSession();
  if (!session) return null;
  var enrollments = osaGetEnrollments();
  for (var i = 0; i < enrollments.length; i++) {
    if (enrollments[i].email === session.email) return enrollments[i];
  }
  return null;
}

function getStudentCourse() {
  var student = getStudentData();
  if (!student || !student.courseId) return null;
  return osaGetCourseById(student.courseId);
}

function showStudentTab(tabName) {
  var tabs = document.querySelectorAll('.tab-content');
  tabs.forEach(function(t) { t.classList.remove('active'); });
  var target = document.querySelector('.tab-' + tabName);
  if (target) target.classList.add('active');

  var links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(function(l) { l.classList.remove('active'); });
  var activeLink = document.querySelector('.sidebar-nav a[data-tab="' + tabName + '"]');
  if (activeLink) activeLink.classList.add('active');

  if (tabName === 'dashboard') renderStudentDashboard();
  if (tabName === 'courses') renderStudentCourses();
  if (tabName === 'schedule') renderStudentSchedule();
  if (tabName === 'grades') renderStudentGrades();
  if (tabName === 'profile') renderStudentProfile();
}

function renderStudentDashboard() {
  var student = getStudentData();
  var course = getStudentCourse();
  if (!student) return;

  var welcomeName = document.getElementById('studentWelcomeName');
  if (welcomeName) welcomeName.textContent = student.name.split(' ')[0];

  var courseCount = document.getElementById('statCourses');
  if (courseCount) courseCount.textContent = '1';

  var courseTitle = document.getElementById('dashboardCourseTitle');
  if (courseTitle && course) courseTitle.textContent = course.name;

  var courseTeacher = document.getElementById('dashboardCourseTeacher');
  if (courseTeacher && course) courseTeacher.textContent = course.teacher;

  var courseGrade = document.getElementById('dashboardCourseGrade');
  if (courseGrade && course) courseGrade.textContent = course.grade;

  var coursePrice = document.getElementById('dashboardCoursePrice');
  if (coursePrice && course) coursePrice.textContent = course.price;

  var courseLessons = document.getElementById('dashboardCourseLessons');
  if (courseLessons && course) courseLessons.textContent = course.lessons + ' Lessons';
}

function renderStudentCourses() {
  var student = getStudentData();
  var course = getStudentCourse();
  var container = document.getElementById('studentCoursesList');
  if (!container || !student) return;

  if (!course) {
    container.innerHTML = '<div class="card"><div class="card-body" style="text-align:center; padding:48px;"><p style="color:var(--text-light);">No course enrolled yet.</p><a href="../enroll/" class="btn btn-primary btn-sm" style="margin-top:16px;">Enroll Now</a></div></div>';
    return;
  }

  var progress = Math.floor(Math.random() * 40) + 30;
  container.innerHTML =
    '<div class="student-course-card">' +
      '<div class="student-course-icon" style="background: linear-gradient(135deg, ' + (course.colors ? course.colors[0] : '#003366') + ', ' + (course.colors ? course.colors[1] : '#3a5f94') + ');">' + (course.emoji || '&#128218;') + '</div>' +
      '<div class="student-course-info">' +
        '<div class="student-course-title">' + osEsc(course.name) + '</div>' +
        '<div class="student-course-teacher">' + osEsc(course.teacher) + '</div>' +
        '<div class="progress-bar" style="margin:12px 0;"><div class="fill" style="width:' + progress + '%;"></div></div>' +
        '<div class="student-course-meta">' +
          '<span>' + progress + '% Complete</span>' +
          '<span>' + course.lessons + ' Lessons</span>' +
          '<span>' + osEsc(course.price) + '</span>' +
        '</div>' +
      '</div>' +
      '<a href="https://wa.me/923406222068?text=Hi! I want to continue ' + encodeURIComponent(course.name) + ' course" target="_blank" class="btn btn-primary btn-sm">Continue</a>' +
    '</div>';
}

function renderStudentSchedule() {
  var course = getStudentCourse();
  var student = getStudentData();
  var container = document.getElementById('studentScheduleTable');
  if (!container || !course || !student) return;

  var d = osaLoad();
  var s = d.schedule;
  var courseCat = course.category;
  var subjectMap = { math: 'Math', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', english: 'English', cs: 'CS' };
  var courseSubject = subjectMap[courseCat] || '';

  var html = '<thead><tr><th>Time</th>';
  s.days.forEach(function(day) { html += '<th>' + day + '</th>'; });
  html += '</tr></thead><tbody>';

  s.timeSlots.forEach(function(slot, ti) {
    html += '<tr><td><span class="schedule-time">' + osEsc(slot) + '</span></td>';
    s.days.forEach(function(day, di) {
      var cell = s.grid[ti] ? s.grid[ti][di] : { subject: '', teacher: '' };
      if (cell.subject === courseSubject) {
        html += '<td style="background:rgba(255,215,0,0.1); border:2px solid var(--accent); border-radius:8px;"><span class="schedule-subject" style="font-weight:700;">' + osEsc(cell.subject) + '</span><br><span class="schedule-time">' + osEsc(cell.teacher) + '</span></td>';
      } else {
        html += '<td style="opacity:0.4;"><span class="schedule-subject">' + osEsc(cell.subject) + '</span><br><span class="schedule-time">' + osEsc(cell.teacher) + '</span></td>';
      }
    });
    html += '</tr>';
  });
  html += '</tbody>';
  container.innerHTML = html;
}

function renderStudentGrades() {
  var course = getStudentCourse();
  var student = getStudentData();
  var container = document.getElementById('studentGradesBody');
  if (!container || !course || !student) return;

  var d = osaLoad();
  var courseCat = course.category;
  var subjectMap = { math: 'Mathematics', physics: 'Physics', chemistry: 'Chemistry', biology: 'Biology', english: 'English', cs: 'Computer Science' };
  var courseSubject = subjectMap[courseCat] || '';

  var matchingGrades = d.grades.filter(function(g) { return g.subject === courseSubject; });

  if (matchingGrades.length === 0) {
    container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding:32px; color:var(--text-light);">No grades available yet.</td></tr>';
    return;
  }

  var html = '';
  matchingGrades.forEach(function(g) {
    var gradeClass = 'grade-a';
    if (g.grade === 'B') gradeClass = 'grade-b';
    else if (g.grade === 'C') gradeClass = 'grade-c';
    else if (g.grade === 'F') gradeClass = 'grade-f';

    var statusStyle = g.status === 'Passed' ? 'background:#e8f5e9; color:#2e7d32;' : 'background:#fff3e0; color:#e65100;';

    html += '<tr>' +
      '<td style="font-weight:600;">' + osEsc(g.subject) + '</td>' +
      '<td>' + osEsc(g.teacher) + '</td>' +
      '<td>' + g.marks + '/' + g.total + '</td>' +
      '<td><span class="' + gradeClass + '">' + osEsc(g.grade) + '</span></td>' +
      '<td><span class="badge" style="' + statusStyle + '">' + osEsc(g.status) + '</span></td>' +
    '</tr>';
  });
  container.innerHTML = html;
}

function renderStudentProfile() {
  var student = getStudentData();
  var course = getStudentCourse();
  if (!student) return;

  var nameEl = document.getElementById('profileName');
  var emailEl = document.getElementById('profileEmail');
  var phoneEl = document.getElementById('profilePhone');
  var courseEl = document.getElementById('profileCourse');
  var dateEl = document.getElementById('profileDate');
  var avatarEl = document.getElementById('profileAvatar');
  var roleEl = document.getElementById('profileRole');

  if (nameEl) nameEl.textContent = student.name;
  if (emailEl) emailEl.textContent = student.email;
  if (phoneEl) phoneEl.textContent = student.phone;
  if (courseEl) courseEl.textContent = course ? course.name : 'Not enrolled';
  if (dateEl) {
    var d = new Date(student.enrolledAt);
    dateEl.textContent = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  if (avatarEl) avatarEl.textContent = student.name.charAt(0).toUpperCase();
  if (roleEl) roleEl.textContent = 'Student';
}
