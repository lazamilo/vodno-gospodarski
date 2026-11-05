/* VGB Maribor: shared shell (nav, mega menu, footer, smooth scroll, reveals) */
(function () {
  const S = window.VGB_SERVICES || [];
  // cleaner wording for the flood studies list (source splits one sentence into two bullets)
  const pop = S.find(s => s.id === 'poplavne-studije');
  if (pop) pop.items = [
    'Hidrološko hidravlične presoje vodnega režima za večja poplavno ogrožena območja (DPN, OPN)',
    'Presoje za manjša poplavno ogrožena območja in pridobitev vodnega soglasja za individualne gradnje',
    'Hidravlično modeliranje 1D in 2D',
    'Karte poplavne nevarnosti in razredov poplavne nevarnosti (Ur.l.RS 60/2007)',
    'Zasnova in načrtovanje omilitvenih ukrepov (Ur.l.RS 89/2008)'
  ];
  const blurbs = {
    'urejanje-voda-in-upravljanje-z-vodami': 'Načrti upravljanja voda, varstvo voda in ureditve vodotokov, ki zdržijo naslednjo visoko vodo.',
    'poplavne-studije': 'Hidravlični modeli in karte poplavne nevarnosti za občine, državo in posamezne gradnje.',
    'hidrotehnicni-objekti': 'Zadrževalniki, pregrade, črpališča, prepusti in hidroenergetski objekti.',
    'ekologija': 'Presoje vplivov na okolje, nadomestni habitati in okoljski monitoring.',
    'komunala': 'Kanalizacija, čiščenje odpadnih voda, vodooskrba in prometna infrastruktura.',
    'kmetijstvo-in-razvoj-podezelja': 'Namakalni sistemi, odvodnja, komasacije in ribogojstvo.',
    'gis-in-vizualizacije': 'Prostorske baze, kartografija in prikaz rezultatov hidravličnih modelov.',
    'krajinska-arhitektura': 'Urejanje obvodnega in obcestnega prostora, rekultivacije in habitati.',
    'ostalo': 'Svetovalni inženiring, revizije projektov in nadzor nad gradnjo.'
  };
  S.forEach(s => s.blurb = blurbs[s.id] || '');
  window.VGB_SERVICES = S;

  const here = document.body.dataset.page || 'home';
  const home = here === 'home' ? '' : 'index.html';
  const arrow = '<svg viewBox="0 0 18 18" fill="none"><path d="M2 9h13M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.6"/></svg>';
  window.VGB_ARROW = arrow;

  /* nav + mega menu */
  const nav = document.createElement('header');
  nav.className = 'nav';
  nav.innerHTML = `
    <a class="logo" href="index.html" aria-label="VGB Maribor, domov"><img src="assets/img/vgb-logo.gif" alt="Vodnogospodarski biro Maribor"></a>
    <ul>
      <li><button class="mega-t" aria-expanded="false">Dejavnosti<svg class="chev" viewBox="0 0 10 10"><path d="M1 3l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button></li>
      <li><a href="${home}#projekti">Projekti</a></li>
      <li><a href="${home}#mvd">Mišičev vodarski dan</a></li>
      <li><a href="o-nas.html">O nas</a></li>
      <li><a class="cta" href="kontakt.html">Kontakt</a></li>
    </ul>
    <button class="burger" aria-label="Meni"><span></span><span></span></button>
    <nav class="mob">
      <a href="index.html">Domov</a>
      <a href="dejavnost.html">Dejavnosti</a>
      ${S.map(s => `<a class="s" href="dejavnost.html?s=${s.id}">${s.name}</a>`).join('')}
      <a href="${home}#projekti">Projekti</a>
      <a href="${home}#mvd">Mišičev vodarski dan</a>
      <a href="o-nas.html">O nas</a>
      <a href="kontakt.html">Kontakt</a>
    </nav>`;
  document.body.prepend(nav);

  const mega = document.createElement('div');
  mega.className = 'mega';
  mega.innerHTML = `
    <ol>${S.map((s, i) => `<li><a href="dejavnost.html?s=${s.id}" data-i="${i}">${s.name}<small>${s.refs.length} referenc</small></a></li>`).join('')}</ol>
    <div class="preview">${S.map((s, i) => `<img src="assets/img/${s.img}" alt="" class="${i ? '' : 'on'}" data-i="${i}">`).join('')}<p>${S[0] ? S[0].blurb : ''}</p></div>`;
  const scrim = document.createElement('div');
  scrim.className = 'scrim';
  document.body.append(mega, scrim);

  const megaBtn = nav.querySelector('.mega-t');
  const setMega = on => {
    mega.classList.toggle('open', on);
    nav.classList.toggle('open', on);
    scrim.classList.toggle('on', on);
    megaBtn.setAttribute('aria-expanded', on);
  };
  megaBtn.addEventListener('click', () => setMega(!mega.classList.contains('open')));
  scrim.addEventListener('click', () => setMega(false));
  document.addEventListener('keydown', e => e.key === 'Escape' && setMega(false));
  const pv = mega.querySelector('.preview p');
  mega.querySelectorAll('li a').forEach(a => a.addEventListener('mouseenter', () => {
    const i = a.dataset.i;
    mega.querySelectorAll('.preview img').forEach(im => im.classList.toggle('on', im.dataset.i === i));
    pv.textContent = S[i].blurb;
  }));
  nav.querySelector('.burger').addEventListener('click', () => nav.classList.toggle('mob-open'));
  nav.querySelectorAll('.mob a').forEach(a => a.addEventListener('click', () => nav.classList.remove('mob-open')));

  /* footer */
  const foot = document.createElement('footer');
  foot.className = 'foot';
  foot.innerHTML = `
    <div class="wrap">
      <div class="ask">
        <div>
          <h2 class="d2">Imate projekt ob vodi?<br><span class="muted" style="color:#7f98a3">Pogovorimo se.</span></h2>
          <a class="mail" href="mailto:tajnistvo@vgb.si">tajnistvo@vgb.si</a>
        </div>
        <div style="display:flex;flex-direction:column;gap:18px;align-items:flex-start">
          <p class="lead" style="max-width:20ch">02 23 46 502<br><span style="color:#7f98a3">Glavni trg 19c, Maribor</span></p>
          <a class="btn light" href="kontakt.html">Pošljite povpraševanje ${arrow}</a>
        </div>
      </div>
      <div class="cols">
        <div><img src="assets/img/vgb-logo.gif" alt="VGB Maribor"></div>
        <div><h4>Dejavnosti</h4>${S.slice(0, 5).map(s => `<a href="dejavnost.html?s=${s.id}">${s.name.replace(' in upravljanje z vodami', '')}</a>`).join('')}</div>
        <div><h4>&nbsp;</h4>${S.slice(5).map(s => `<a href="dejavnost.html?s=${s.id}">${s.name}</a>`).join('')}</div>
        <div><h4>Biro</h4><a href="o-nas.html">O podjetju</a><a href="o-nas.html#ekipa">Zaposleni</a><a href="${home}#mvd">Mišičev vodarski dan</a><a href="kontakt.html">Kontakt</a></div>
      </div>
      <div class="legal"><span>© ${new Date().getFullYear()} VGB Maribor d.o.o. · ID za DDV SI97173720</span><span>Fax 02 23 46 520 · Politika zasebnosti in piškotki</span></div>
    </div>`;
  document.body.append(foot);

  /* motion */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) document.documentElement.classList.add('reduced');
  let lenis = null;
  if (window.Lenis && !reduced) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    window.VGB_LENIS = lenis;
    if (window.gsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href').split('#')[1];
      const el = id && document.getElementById(id);
      if (el) { e.preventDefault(); setMega(false); lenis.scrollTo(el, { offset: 0, duration: 1.4 }); }
    }));
  }

  /* nav state: solid after hero, hide on scroll down */
  let last = 0;
  const onScroll = () => {
    const y = window.scrollY;
    const heroH = (document.querySelector('.hero, .page-hero') || { offsetHeight: 200 }).offsetHeight - 90;
    nav.classList.toggle('solid', y > heroH);
    const hide = y > last && y > 400 && !mega.classList.contains('open') && !nav.classList.contains('mob-open');
    nav.classList.toggle('hide', hide);
    last = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  window.VGB_INIT_REVEALS = function () {
    if (!window.gsap || reduced) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.rv').forEach(el => {
      gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.utils.toArray('[data-split]').forEach(el => {
      const lines = el.querySelectorAll('.line-mask > span');
      gsap.from(lines, { yPercent: 105, duration: 1.2, ease: 'expo.out', stagger: .08, scrollTrigger: { trigger: el, start: 'top 85%' } });
    });
    gsap.utils.toArray('[data-par]').forEach(el => {
      gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  };
})();
