function showTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.sidebar-nav a').forEach(function(a) { a.classList.remove('active'); });
  var tab = document.querySelector('.tab-' + tabName);
  if (tab) tab.classList.add('active');
  var links = document.querySelectorAll('.sidebar-nav a');
  links.forEach(function(link) {
    if (link.getAttribute('onclick') && link.getAttribute('onclick').indexOf("'" + tabName + "'") !== -1) {
      link.classList.add('active');
    }
  });
  if (tabName === 'enrollments' && typeof osaRenderEnrollments === 'function') {
    osaRenderEnrollments();
  }
  if (tabName === 'fees' && typeof osaRenderFees === 'function') {
    osaRenderFees();
  }
  if (tabName === 'analytics' && typeof osaRenderAnalytics === 'function') {
    osaRenderAnalytics();
  }
  window.scrollTo(0, 0);
}

document.addEventListener('DOMContentLoaded', function() {
  var sidebarToggle = document.querySelector('.sidebar-toggle');
  var sidebar = document.querySelector('.sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
    });
  }

  document.querySelectorAll('.progress-bar').forEach(function(bar) {
    var fill = bar.querySelector('.fill');
    if (fill) {
      var width = fill.getAttribute('data-width') || fill.style.width;
      fill.style.width = '0';
      setTimeout(function() { fill.style.width = width; }, 300);
    }
  });

  document.querySelectorAll('.stat-number').forEach(function(el) {
    var target = parseInt(el.getAttribute('data-target'));
    var current = 0;
    var increment = target / 50;
    var timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 30);
  });

  if (typeof Chart !== 'undefined') {
    Chart.defaults.font.family = 'Inter, sans-serif';
    Chart.defaults.color = '#43474f';

    // Marks Bar Chart
    var marksCtx = document.getElementById('marksChart');
    if (marksCtx) {
      new Chart(marksCtx, {
        type: 'bar',
        data: {
          labels: ['Math', 'Physics', 'Science', 'English', 'CS', 'Biology'],
          datasets: [{
            label: 'Marks',
            data: [85, 70, 91, 58, 88, 74],
            backgroundColor: ['#003366', '#1a4a7a', '#2d5a3d', '#6b3a6b', '#2a2a5a', '#2d5a2d'],
            borderRadius: 6,
            barThickness: 32
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 100, grid: { color: '#e7eeff' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Study Hours Line Chart
    var hoursCtx = document.getElementById('hoursChart');
    if (hoursCtx) {
      new Chart(hoursCtx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            label: 'Hours',
            data: [3.5, 4.2, 2.8, 5.1, 3.9, 6.0],
            borderColor: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#FFD700',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, grid: { color: '#e7eeff' } },
            x: { grid: { display: false } }
          }
        }
      });
    }

    // Subject Distribution Pie Chart
    var pieCtx = document.getElementById('pieChart');
    if (pieCtx) {
      new Chart(pieCtx, {
        type: 'doughnut',
        data: {
          labels: ['Math', 'Physics', 'Science', 'English', 'CS', 'Biology'],
          datasets: [{
            data: [25, 20, 18, 12, 15, 10],
            backgroundColor: ['#003366', '#1a4a7a', '#2d5a3d', '#6b3a6b', '#2a2a5a', '#2d5a2d'],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true } }
          }
        }
      });
    }

    // Monthly Progress Area Chart
    var progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
      new Chart(progressCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Avg Score %',
            data: [62, 68, 72, 78, 82, 88, 92],
            borderColor: '#003366',
            backgroundColor: 'rgba(0, 51, 102, 0.1)',
            tension: 0.4,
            fill: true,
            pointBackgroundColor: '#003366',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: false, min: 50, max: 100, grid: { color: '#e7eeff' } },
            x: { grid: { display: false } }
          }
        }
      });
    }
  }
});
