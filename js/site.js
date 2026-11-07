(() => {
  window.__site = true;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Hero: the name stays pinned; scroll position picks which shipped screen sits under it */
  const hero = document.querySelector('.hero');
  const shots = hero ? [...hero.querySelectorAll('.shot')] : [];
  const cap = hero && hero.querySelector('.hero-cap');
  let current = 0;
  const show = (i) => {
    if (i === current || !shots[i]) return;
    shots[current].classList.remove('is-on');
    shots[i].classList.add('is-on');
    current = i;
    hero.style.setProperty('--ground', shots[i].dataset.ground);
    if (cap) cap.textContent = shots[i].dataset.cap;
  };
  if (hero) hero.style.setProperty('--ground', shots[0].dataset.ground);

  /* Work plates: slow drift of each picture while its plate is on screen */
  const plates = [...document.querySelectorAll('.plate')];
  const bar = document.querySelector('.bar');

  let pending = [];
  let ticking = false;
  const frame = () => {
    ticking = false;
    const vh = innerHeight;
    /* Safety net for the entrances: anything already above the fold's bottom shows, even after a jump */
    if (pending.length) pending = pending.filter((el) => { if (el.getBoundingClientRect().top < vh) { el.classList.add('is-in'); return false; } return true; });
    if (hero) {
      const r = hero.getBoundingClientRect();
      if (bar) bar.classList.toggle('is-clear', r.bottom > vh + 1);
      const run = r.height - vh;
      const p = Math.min(1, Math.max(0, -r.top / run));
      show(Math.min(shots.length - 1, Math.floor(p * shots.length * 0.999)));
    }
    if (!reduce) {
      for (const pl of plates) {
        const r = pl.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const p = (vh - r.top) / (vh + r.height); // 0..1 across the plate's pass
        const m = pl.querySelector('.plate-pic img, .plate-pic video'); if (m) m.style.setProperty('--drift', `${(0.5 - p) * 30}px`);
      }
    }
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);

  /* Entrances: parts of each section rise in, staggered */
  const rises = [...document.querySelectorAll('.rise')];
  if ('IntersectionObserver' in window && !reduce) {
    const groups = new Map();
    rises.forEach((el) => {
      const sec = el.closest('section, footer') || document.body;
      const n = groups.get(sec) || 0;
      el.style.setProperty('--d', `${Math.min(n, 6) * 75}ms`);
      groups.set(sec, n + 1);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0 });
    rises.forEach((el) => io.observe(el));
    pending = rises.slice();
  } else {
    rises.forEach((el) => el.classList.add('is-in'));
  }

  /* Respect reduced motion for the looping clip */
  if (reduce) document.querySelectorAll('video.loop').forEach((v) => { v.removeAttribute('autoplay'); v.pause(); v.controls = true; });

  /* The live thing: filter the full project list by kind */
  const rows = [...document.querySelectorAll('.lineup li')];
  const chips = [...document.querySelectorAll('.chip')];
  const count = (k) => rows.filter((r) => k === 'all' || r.dataset.kind === k).length;
  document.querySelectorAll('[data-count]').forEach((s) => { s.textContent = count(s.dataset.count); });
  chips.forEach((chip) => chip.addEventListener('click', () => {
    const k = chip.dataset.filter;
    chips.forEach((c) => { const on = c === chip; c.classList.toggle('is-on', on); c.setAttribute('aria-pressed', String(on)); });
    rows.forEach((r, i) => {
      const keep = k === 'all' || r.dataset.kind === k;
      r.classList.toggle('is-out', !keep);
      r.classList.remove('is-in');
      if (keep && !reduce) { r.style.animationDelay = `${(i % 8) * 35}ms`; void r.offsetWidth; r.classList.add('is-in'); }
    });
  }));
  frame();
})();
