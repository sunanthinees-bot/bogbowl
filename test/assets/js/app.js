(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  // Toggle mobile nav
  const navToggle = $('#nav-toggle');
  const navMenu = $('#nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    // ปิดเมนูเมื่อคลิกลิงก์
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'a' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Year in footer
  const y = new Date().getFullYear();
  const yEl = document.getElementById('y');
  if (yEl) yEl.textContent = y;

  // Active menu by pathname
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('#nav-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) {
      a.classList.add('is-active');
    } else {
      a.classList.remove('is-active');
    }
  });
})();

<script>
(function () {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const num = (t) => parseFloat(String(t).replace(/[^\d\.\-]/g, '')) || 0;

  function updateRow(row){
    const unit = row.getAttribute('data-unit') || '';
    // หาเลข 2 ตัวใน sum-label (ปัจจุบัน/เป้า)
    const spans = $$('.sum-label span[id]', row);
    if (spans.length < 2) return;
    const now = num(spans[0].textContent);
    const target = num(spans[1].textContent);
    const diff = now - target;

    // อัปเดตข้อความป้าย
    const badge = $('.sum-badge', row);
    if (badge){
      if (Math.abs(diff) < 0.01) badge.textContent = 'พอดีเป๊ะ';
      else if (diff > 0)         badge.textContent = `เกิน ${diff.toFixed(1)} ${unit}`;
      else                       badge.textContent = `ขาด ${Math.abs(diff).toFixed(1)} ${unit}`;
    }

    // ใส่สถานะเพื่อเปลี่ยนสีแถบ/ป้าย
    row.classList.remove('is-ok','is-warn','is-bad');
    if (!target){ row.classList.add('is-ok'); return; }
    const tol = 0.05;                    // ยอมคลาด 5% = พอดี
    const r = now / target;
    if (r < 1 - tol)      row.classList.add('is-bad');   // ขาด
    else if (r > 1 + tol) row.classList.add('is-warn');  // เกิน
    else                  row.classList.add('is-ok');    // พอดี
  }

  function refreshAll(){ $$('.sum-row').forEach(updateRow); }

  // เรียกครั้งแรก
  refreshAll();

  // ถ้ามีการคำนวณเด้งตัวเลขในสรุปผล ให้สังเกตแล้วรีเฟรชให้ออโต้
  const container = $('.summary-card') || $('#summary-box') || document.body;
  const mo = new MutationObserver(() => refreshAll());
  mo.observe(container, { childList:true, subtree:true, characterData:true });

  // เผื่ออยากเรียกเองตอนจบคำนวณ
  window.refreshSummaryBadges = refreshAll;
})();
</script>



