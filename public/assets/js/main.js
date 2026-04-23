function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

  const pg = document.getElementById('page-' + name);
  if (pg) {
    pg.classList.add('active');
    window.scrollTo({ top: 0 });
  }

  const nl = document.getElementById('nav-' + name);
  if (nl) nl.classList.add('active');
}

// Default page for the static prototype navigation.
showPage('home');
