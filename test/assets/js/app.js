// ทำงานทุกหน้าหลัง DOM พร้อม
document.addEventListener('DOMContentLoaded', () => {
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // ป้องกันปุ่มซ้ำที่อยู่นอก .container.nav (ถ้ามี เผลอวางไว้ผิดที่)
  document.querySelectorAll('#nav-toggle').forEach(btn => {
    if (!btn.closest('.container.nav')) btn.style.display = 'none';
  });

  // ผูกเหตุการณ์แบบ delegation ให้ทนทาน (กดได้แม้มี re-render)
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('#nav-toggle');
    if (!toggleBtn) return;

    const menu = document.getElementById('nav-menu');
    if (!menu) return;

    const open = menu.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // ปิดเมนูเมื่อกดลิงก์
  const menu = document.getElementById('nav-menu');
  if (menu) {
    menu.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a' && menu.classList.contains('open')) {
        menu.classList.remove('open');
        const btn = document.getElementById('nav-toggle');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ไฮไลต์เมนูตามไฟล์ที่เปิดอยู่
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('#nav-menu a').forEach(a => {
    a.classList.toggle('is-active', a.getAttribute('href') === path);
  });
});
