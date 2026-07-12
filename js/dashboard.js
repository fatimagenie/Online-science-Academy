document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('collapsed');
    });
  }

  document.querySelectorAll('.progress-bar').forEach(bar => {
    const fill = bar.querySelector('.fill');
    if (fill) {
      const width = fill.getAttribute('data-width') || fill.style.width;
      fill.style.width = '0';
      setTimeout(() => { fill.style.width = width; }, 300);
    }
  });

  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, 30);
  });
});
