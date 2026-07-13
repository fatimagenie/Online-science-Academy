function osaOpenModal(title, bodyHtml, onSave) {
  var existing = document.getElementById('osaModal');
  if (existing) existing.remove();
  var modal = document.createElement('div');
  modal.id = 'osaModal';
  modal.className = 'osa-modal-overlay';
  modal.innerHTML = '<div class="osa-modal-card">' +
    '<div class="osa-modal-header"><h3>' + title + '</h3><button class="osa-modal-close" onclick="osaCloseModal()">&times;</button></div>' +
    '<div class="osa-modal-body">' + bodyHtml + '</div>' +
    '<div class="osa-modal-footer"><button class="btn btn-secondary btn-sm" onclick="osaCloseModal()">Cancel</button><button class="btn btn-primary btn-sm osa-modal-save">Save</button></div>' +
    '</div>';
  document.body.appendChild(modal);
  modal.querySelector('.osa-modal-save').addEventListener('click', function() {
    if (onSave) onSave(modal);
    osaCloseModal();
  });
  modal.addEventListener('click', function(e) { if (e.target === modal) osaCloseModal(); });
}

function osaCloseModal() {
  var m = document.getElementById('osaModal');
  if (m) m.remove();
}

function osaConfirm(msg, cb) {
  osaOpenModal('Confirm', '<p style="text-align:center;font-size:1rem;">' + msg + '</p>', function() { cb(); });
}

function osaEditBranding() {
  var d = osaLoad();
  var b = d.branding;
  var html = '<div class="osa-form-group"><label>Website Name</label><input class="osa-input" id="osName" value="' + osaEsc(b.name) + '"></div>' +
    '<div class="osa-form-group"><label>Tagline</label><input class="osa-input" id="osTagline" value="' + osaEsc(b.tagline) + '"></div>' +
    '<div class="osa-form-group"><label>WhatsApp Number (with country code)</label><input class="osa-input" id="osWhatsapp" value="' + osaEsc(b.whatsapp) + '"></div>' +
    '<div class="osa-form-group"><label>Email</label><input class="osa-input" id="osEmail" value="' + osaEsc(b.email) + '"></div>' +
    '<div class="osa-form-group"><label>Phone</label><input class="osa-input" id="osPhone" value="' + osaEsc(b.phone) + '"></div>' +
    '<div class="osa-form-group"><label>Address</label><input class="osa-input" id="osAddress" value="' + osaEsc(b.address) + '"></div>';
  osaOpenModal('Edit Branding', html, function(modal) {
    d.branding.name = modal.querySelector('#osName').value;
    d.branding.tagline = modal.querySelector('#osTagline').value;
    d.branding.whatsapp = modal.querySelector('#osWhatsapp').value;
    d.branding.email = modal.querySelector('#osEmail').value;
    d.branding.phone = modal.querySelector('#osPhone').value;
    d.branding.address = modal.querySelector('#osAddress').value;
    osaSave(d);
    if (typeof db !== 'undefined') {
      db.collection('settings').doc('main').set({ branding: d.branding, profile: d.profile }, { merge: true }).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaEditCourse(id) {
  var d = osaLoad();
  var c = id ? d.courses.find(function(x){return x.id===id;}) : { name:'', category:'math', teacher:'', initials:'', description:'', grade:'Grade 9-10', lessons:0, rating:0, stars:0, price:'Rs. 0', emoji:'\u{1F4DA}', colors:['#003366','#3a5f94'] };
  var isNew = !id;
  var cats = ['math','physics','science','biology','english','cs'];
  var catOpts = cats.map(function(cat){ return '<option value="'+cat+'"'+(cat===c.category?' selected':'')+'>'+cat+'</option>'; }).join('');
  var html = '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Course Name</label><input class="osa-input" id="ocName" value="' + osaEsc(c.name) + '"></div>' +
    '<div class="osa-form-group"><label>Category</label><select class="osa-input" id="ocCat">' + catOpts + '</select></div></div>' +
    '<div class="osa-form-group"><label>Description</label><input class="osa-input" id="ocDesc" value="' + osaEsc(c.description) + '"></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Grade</label><input class="osa-input" id="ocGrade" value="' + osaEsc(c.grade) + '"></div>' +
    '<div class="osa-form-group"><label>Lessons</label><input class="osa-input" id="ocLessons" type="number" value="' + c.lessons + '"></div></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Rating (0-5)</label><input class="osa-input" id="ocRating" type="number" step="0.1" min="0" max="5" value="' + c.rating + '"></div>' +
    '<div class="osa-form-group"><label>Stars (1-5)</label><input class="osa-input" id="ocStars" type="number" min="1" max="5" value="' + c.stars + '"></div></div>' +
    '<div class="osa-form-group"><label>Price</label><input class="osa-input" id="ocPrice" value="' + osaEsc(c.price) + '"></div>';
  osaOpenModal(isNew ? 'Add Course' : 'Edit Course', html, function(modal) {
    var updated = {
      id: c.id || osaNextId(d.courses),
      name: modal.querySelector('#ocName').value,
      category: modal.querySelector('#ocCat').value,
      teacher: '',
      initials: '',
      description: modal.querySelector('#ocDesc').value,
      grade: modal.querySelector('#ocGrade').value,
      lessons: parseInt(modal.querySelector('#ocLessons').value) || 0,
      rating: parseFloat(modal.querySelector('#ocRating').value) || 0,
      stars: parseInt(modal.querySelector('#ocStars').value) || 4,
      price: modal.querySelector('#ocPrice').value,
      emoji: c.emoji || '\u{1F4DA}',
      colors: c.colors || ['#003366','#3a5f94']
    };
    if (isNew) { d.courses.push(updated); }
    else { var idx = d.courses.findIndex(function(x){return x.id===id;}); if(idx>=0) d.courses[idx] = updated; }
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseAddDoc('courses', updated).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaDeleteCourse(id) {
  osaConfirm('Delete this course?', function() {
    var d = osaLoad();
    d.courses = d.courses.filter(function(c){return c.id!==id;});
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseDeleteDoc('courses', id).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaEditGrade(id) {
  var d = osaLoad();
  var g = id ? d.grades.find(function(x){return x.id===id;}) : { subject:'', teacher:'', marks:0, total:100, grade:'A', status:'Passed' };
  var isNew = !id;
  var html = '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Subject</label><input class="osa-input" id="ogSubject" value="' + osaEsc(g.subject) + '"></div></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Marks</label><input class="osa-input" id="ogMarks" type="number" value="' + g.marks + '"></div>' +
    '<div class="osa-form-group"><label>Total</label><input class="osa-input" id="ogTotal" type="number" value="' + g.total + '"></div></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Grade</label><input class="osa-input" id="ogGrade" value="' + osaEsc(g.grade) + '"></div>' +
    '<div class="osa-form-group"><label>Status</label><select class="osa-input" id="ogStatus"><option'+(g.status==='Passed'?' selected':'')+'>Passed</option><option'+(g.status==='Needs Work'?' selected':'')+'>Needs Work</option><option'+(g.status==='Failed'?' selected':'')+'>Failed</option></select></div></div>';
  osaOpenModal(isNew ? 'Add Grade' : 'Edit Grade', html, function(modal) {
    var updated = {
      id: g.id || osaNextId(d.grades),
      subject: modal.querySelector('#ogSubject').value,
      teacher: '',
      marks: parseInt(modal.querySelector('#ogMarks').value) || 0,
      total: parseInt(modal.querySelector('#ogTotal').value) || 100,
      grade: modal.querySelector('#ogGrade').value,
      status: modal.querySelector('#ogStatus').value
    };
    if (isNew) { d.grades.push(updated); }
    else { var idx = d.grades.findIndex(function(x){return x.id===id;}); if(idx>=0) d.grades[idx] = updated; }
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseAddDoc('grades', updated).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaDeleteGrade(id) {
  osaConfirm('Delete this grade?', function() {
    var d = osaLoad();
    d.grades = d.grades.filter(function(g){return g.id!==id;});
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseDeleteDoc('grades', id).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaEditMessage(id) {
  var d = osaLoad();
  var m = id ? d.messages.find(function(x){return x.id===id;}) : { sender:'', initials:'', color:'#003366', text:'', time:'Just now', unread:true };
  var isNew = !id;
  var html = '<div class="osa-form-group"><label>Message</label><textarea class="osa-input osa-textarea" id="omText">' + osaEsc(m.text) + '</textarea></div>';
  osaOpenModal(isNew ? 'Add Message' : 'Edit Message', html, function(modal) {
    var updated = {
      id: m.id || osaNextId(d.messages),
      sender: '',
      initials: '',
      color: m.color || '#003366',
      text: modal.querySelector('#omText').value,
      time: isNew ? 'Just now' : m.time,
      unread: true
    };
    if (isNew) { d.messages.push(updated); }
    else { var idx = d.messages.findIndex(function(x){return x.id===id;}); if(idx>=0) d.messages[idx] = updated; }
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseAddDoc('messages', updated).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaDeleteMessage(id) {
  osaConfirm('Delete this message?', function() {
    var d = osaLoad();
    d.messages = d.messages.filter(function(m){return m.id!==id;});
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseDeleteDoc('messages', id).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaEditSchedule() {
  var d = osaLoad();
  var s = d.schedule;
  var html = '<p style="margin-bottom:12px;color:var(--text-light);font-size:0.9rem;">Edit time slots (comma separated):</p>' +
    '<div class="osa-form-group"><label>Time Slots</label><input class="osa-input" id="osTimeSlots" value="' + osaEsc(s.timeSlots.join(', ')) + '"></div>' +
    '<p style="margin:16px 0 8px;color:var(--text-light);font-size:0.9rem;">For each cell, enter the Subject:</p>';
  s.days.forEach(function(day, di) {
    html += '<div style="margin-bottom:12px;"><strong>' + day + '</strong></div>';
    s.timeSlots.forEach(function(slot, ti) {
      var cell = s.grid[ti] ? s.grid[ti][di] : { subject:'', teacher:'' };
      html += '<div class="osa-form-row" style="margin-bottom:4px;">' +
        '<div class="osa-form-group" style="flex:1;"><input class="osa-input osa-input-sm" data-day="' + di + '" data-slot="' + ti + '-sub" value="' + osaEsc(cell.subject) + '" placeholder="Subject"></div>' +
        '</div>';
    });
  });
  osaOpenModal('Edit Schedule', html, function(modal) {
    var tsRaw = modal.querySelector('#osTimeSlots').value.split(',').map(function(t){return t.trim();}).filter(Boolean);
    s.timeSlots = tsRaw;
    s.days.forEach(function(day, di) {
      tsRaw.forEach(function(slot, ti) {
        if (!s.grid[ti]) s.grid[ti] = [];
        if (!s.grid[ti][di]) s.grid[ti][di] = { subject:'', teacher:'' };
        var subEl = modal.querySelector('[data-day="'+di+'"][data-slot="'+ti+'-sub"]');
        if (subEl) s.grid[ti][di].subject = subEl.value;
        s.grid[ti][di].teacher = '';
      });
    });
    while (s.grid.length > tsRaw.length) s.grid.pop();
    osaSave(d);
    if (typeof db !== 'undefined') {
      db.collection('schedule').doc('main').set(s).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaEditProfile() {
  var d = osaLoad();
  var p = d.profile;
  var html = '<div class="osa-form-group"><label>Full Name</label><input class="osa-input" id="opName" value="' + osaEsc(p.name) + '"></div>' +
    '<div class="osa-form-group"><label>Email</label><input class="osa-input" id="opEmail" value="' + osaEsc(p.email) + '"></div>' +
    '<div class="osa-form-group"><label>Phone</label><input class="osa-input" id="opPhone" value="' + osaEsc(p.phone) + '"></div>';
  osaOpenModal('Edit Profile', html, function(modal) {
    d.profile.name = modal.querySelector('#opName').value;
    d.profile.email = modal.querySelector('#opEmail').value;
    d.profile.phone = modal.querySelector('#opPhone').value;
    osaSave(d);
    if (typeof db !== 'undefined') {
      db.collection('settings').doc('main').set({ branding: d.branding, profile: d.profile }, { merge: true }).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaSaveSettings() {
  var d = osaLoad();
  var sn = document.getElementById('settingsName');
  var st = document.getElementById('settingsTagline');
  var sw = document.getElementById('settingsWhatsapp');
  var se = document.getElementById('settingsEmail');
  var sp = document.getElementById('settingsPhone');
  var sa = document.getElementById('settingsAddress');
  if (!d.branding) d.branding = {};
  if (sn) d.branding.name = sn.value;
  if (st) d.branding.tagline = st.value;
  if (sw) d.branding.whatsapp = sw.value;
  if (se) d.branding.email = se.value;
  if (sp) d.branding.phone = sp.value;
  if (sa) d.branding.address = sa.value;
  osaSave(d);
  if (typeof db !== 'undefined') {
    db.collection('settings').doc('main').set({ branding: d.branding, profile: d.profile }, { merge: true }).catch(function(e) { console.log('Firestore error:', e); });
  }
  alert('Settings saved!');
}

function osaEsc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function osaRefreshAdmin() {
  location.reload();
}

function osaRenderEnrollments() {
  var d = osaLoad();
  var enrollments = d.enrollments || [];
  var tbody = document.getElementById('enrollmentsBody');
  var emptyEl = document.getElementById('enrollmentsEmpty');
  if (!tbody) return;

  if (enrollments.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  var html = '';
  enrollments.forEach(function(e) {
    var date = new Date(e.enrolledAt);
    var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    var statusStyle = e.status === 'active' ? 'background:#e8f5e9; color:#2e7d32;' : 'background:#f3e5f5; color:#7b1fa2;';
    html += '<tr>' +
      '<td style="font-weight:600;">' + osaEsc(e.name) + '</td>' +
      '<td>' + osaEsc(e.email) + '</td>' +
      '<td>' + osaEsc(e.phone) + '</td>' +
      '<td>' + osaEsc(e.courseName || 'N/A') + '</td>' +
      '<td>' + dateStr + '</td>' +
      '<td><span class="badge" style="' + statusStyle + '">' + osaEsc(e.status) + '</span></td>' +
      '<td><div class="osa-row-actions"><button class="osa-edit-btn" onclick="osaEditEnrollment(' + e.id + ')">Edit</button><button class="osa-delete-btn" onclick="osaDeleteEnrollment(' + e.id + ')">&#128465;</button></div></td>' +
    '</tr>';
  });
  tbody.innerHTML = html;
}

function osaEditEnrollment(id) {
  var d = osaLoad();
  var e = id ? (d.enrollments || []).find(function(x){return x.id===id;}) : { name:'', email:'', phone:'', courseId:'', courseName:'', message:'', status:'active' };
  var isNew = !id;
  var courseOpts = '<option value="">-- Select Course --</option>';
  d.courses.forEach(function(c) {
    courseOpts += '<option value="' + c.id + '" data-name="' + osaEsc(c.name) + '"' + (e.courseId === c.id ? ' selected' : '') + '>' + osaEsc(c.name) + '</option>';
  });
  var html = '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Student Name</label><input class="osa-input" id="oeName" value="' + osaEsc(e.name) + '"></div>' +
    '<div class="osa-form-group"><label>Email</label><input class="osa-input" id="oeEmail" type="email" value="' + osaEsc(e.email) + '"></div></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Phone</label><input class="osa-input" id="oePhone" value="' + osaEsc(e.phone) + '"></div>' +
    '<div class="osa-form-group"><label>Course</label><select class="osa-input" id="oeCourse">' + courseOpts + '</select></div></div>' +
    '<div class="osa-form-group"><label>Message</label><textarea class="osa-input osa-textarea" id="oeMessage">' + osaEsc(e.message) + '</textarea></div>' +
    '<div class="osa-form-group"><label>Status</label><select class="osa-input" id="oeStatus"><option value="active"' + (e.status === 'active' ? ' selected' : '') + '>Active</option><option value="inactive"' + (e.status === 'inactive' ? ' selected' : '') + '>Inactive</option></select></div>';
  osaOpenModal(isNew ? 'Add Enrollment' : 'Edit Enrollment', html, function(modal) {
    var courseSelect = modal.querySelector('#oeCourse');
    var selectedOpt = courseSelect.options[courseSelect.selectedIndex];
    var updated = {
      id: e.id || osaNextId(d.enrollments || []),
      name: modal.querySelector('#oeName').value,
      email: modal.querySelector('#oeEmail').value,
      phone: modal.querySelector('#oePhone').value,
      courseId: parseInt(courseSelect.value) || 0,
      courseName: selectedOpt ? selectedOpt.getAttribute('data-name') || '' : '',
      message: modal.querySelector('#oeMessage').value,
      status: modal.querySelector('#oeStatus').value,
      enrolledAt: e.enrolledAt || new Date().toISOString()
    };
    if (!d.enrollments) d.enrollments = [];
    if (isNew) { d.enrollments.push(updated); }
    else { var idx = d.enrollments.findIndex(function(x){return x.id===id;}); if (idx >= 0) d.enrollments[idx] = updated; }
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseAddDoc('enrollments', updated).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaDeleteEnrollment(id) {
  osaConfirm('Delete this enrollment?', function() {
    var d = osaLoad();
    d.enrollments = (d.enrollments || []).filter(function(e){return e.id !== id;});
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseDeleteDoc('enrollments', id).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaRenderFees() {
  var d = osaLoad();
  var fees = d.fees || [];
  var tbody = document.getElementById('feesBody');
  var emptyEl = document.getElementById('feesEmpty');
  if (!tbody) return;

  var totalReceived = 0;
  var totalPending = 0;
  var payingStudents = {};

  if (fees.length === 0) {
    tbody.innerHTML = '';
    if (emptyEl) emptyEl.style.display = 'block';
  } else {
    if (emptyEl) emptyEl.style.display = 'none';
    var html = '';
    fees.forEach(function(f) {
      if (f.status === 'paid') {
        totalReceived += f.amount || 0;
        payingStudents[f.studentName] = true;
      } else {
        totalPending += f.amount || 0;
      }
      var date = new Date(f.date);
      var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      var statusStyle = f.status === 'paid' ? 'background:#e8f5e9; color:#2e7d32;' : 'background:#ffebee; color:#c62828;';
      html += '<tr>' +
        '<td style="font-weight:600;">' + osaEsc(f.studentName) + '</td>' +
        '<td>' + osaEsc(f.courseName) + '</td>' +
        '<td>Rs. ' + (f.amount || 0).toLocaleString() + '</td>' +
        '<td><span class="badge" style="' + statusStyle + '">' + (f.status === 'paid' ? 'Paid' : 'Pending') + '</span></td>' +
        '<td>' + dateStr + '</td>' +
        '<td><div class="osa-row-actions"><button class="osa-edit-btn" onclick="osaEditFee(' + f.id + ')">Edit</button><button class="osa-delete-btn" onclick="osaDeleteFee(' + f.id + ')">&#128465;</button></div></td>' +
      '</tr>';
    });
    tbody.innerHTML = html;
  }

  var receivedEl = document.getElementById('feeTotalReceived');
  if (receivedEl) receivedEl.textContent = 'Rs. ' + totalReceived.toLocaleString();
  var pendingEl = document.getElementById('feeTotalPending');
  if (pendingEl) pendingEl.textContent = 'Rs. ' + totalPending.toLocaleString();
  var studentsEl = document.getElementById('feeTotalStudents');
  if (studentsEl) studentsEl.textContent = Object.keys(payingStudents).length;
}

function osaEditFee(id) {
  var d = osaLoad();
  var f = id ? (d.fees || []).find(function(x){return x.id===id;}) : { studentName:'', courseName:'', amount:0, status:'paid', date:new Date().toISOString() };
  var isNew = !id;
  var enrollments = d.enrollments || [];
  var studentOpts = '<option value="">-- Select Student --</option>';
  enrollments.forEach(function(e) {
    studentOpts += '<option value="' + osaEsc(e.name) + '" data-course="' + osaEsc(e.courseName) + '"' + (f.studentName === e.name ? ' selected' : '') + '>' + osaEsc(e.name) + ' - ' + osaEsc(e.courseName) + '</option>';
  });
  var html = '<div class="osa-form-group"><label>Student</label><select class="osa-input" id="ofStudent">' + studentOpts + '</select></div>' +
    '<div class="osa-form-row">' +
    '<div class="osa-form-group"><label>Amount (Rs.)</label><input class="osa-input" id="ofAmount" type="number" value="' + (f.amount || 0) + '"></div>' +
    '<div class="osa-form-group"><label>Status</label><select class="osa-input" id="ofStatus"><option value="paid"' + (f.status === 'paid' ? ' selected' : '') + '>Paid</option><option value="pending"' + (f.status === 'pending' ? ' selected' : '') + '>Pending</option></select></div></div>' +
    '<div class="osa-form-group"><label>Date</label><input class="osa-input" id="ofDate" type="date" value="' + (f.date ? new Date(f.date).toISOString().split('T')[0] : '') + '"></div>';
  osaOpenModal(isNew ? 'Add Payment' : 'Edit Payment', html, function(modal) {
    var studentSelect = modal.querySelector('#ofStudent');
    var courseName = studentSelect.options[studentSelect.selectedIndex] ? studentSelect.options[studentSelect.selectedIndex].getAttribute('data-course') || '' : '';
    var updated = {
      id: f.id || osaNextId(d.fees || []),
      studentName: studentSelect.value,
      courseName: courseName,
      amount: parseInt(modal.querySelector('#ofAmount').value) || 0,
      status: modal.querySelector('#ofStatus').value,
      date: modal.querySelector('#ofDate').value || new Date().toISOString()
    };
    if (!d.fees) d.fees = [];
    if (isNew) { d.fees.push(updated); }
    else { var idx = d.fees.findIndex(function(x){return x.id===id;}); if (idx >= 0) d.fees[idx] = updated; }
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseAddDoc('fees', updated).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}

function osaDeleteFee(id) {
  osaConfirm('Delete this payment record?', function() {
    var d = osaLoad();
    d.fees = (d.fees || []).filter(function(f){return f.id !== id;});
    osaSave(d);
    if (typeof db !== 'undefined') {
      firebaseDeleteDoc('fees', id).catch(function(e) { console.log('Firestore error:', e); });
    }
    osaRefreshAdmin();
  });
}
