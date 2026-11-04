(() => {
  gsap.registerPlugin(ScrollTrigger);
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const mobile = () => matchMedia('(max-width: 820px)').matches;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Tillar ---------- */
  const T = {
    uz: {
      nav_cat: 'Katalog', nav_shop: "Do'kon", nav_rev: 'Fikrlar', nav_loc: 'Manzil',
      h_eye: 'Toshkent · Yakkasaroy', h_title: "Erkaklar va ayollar krossovka do'koni",
      h_cta: "Modellarni ko'rish", h_tg: 'Telegramda yozish', h_drag: 'Aylantirib ko‘ring',
      f1_t: "350–480 ming so'm", f1_d: 'Har bir modelning narxi katalogda ochiq yozilgan — so‘rab o‘tirmaysiz.',
      f2_t: '36 dan 46 gacha', f2_d: "Ayollar va erkaklar o'lchamlari. O'lchamingizni tanlang — faqat sizga mos modellar qoladi.",
      f3_t: "Do'kon yoki kuryer", f3_d: "Shota Rustaveli 57 da 10:00–22:00 kiyib ko'ring yoki o'z kuryerimiz olib borsin.",
      c_eye: 'Yangi kelganlar', c_title: "O'lchamingizdan boshlang", c_size: "O'lcham", c_color: 'Rang', c_price: 'Narx',
      c_reset: 'Tozalash', c_more: "Yana ko'rsatish", c_ask: "Admindan so'rash",
      c_empty: "Bunday model hozir katalogda yo'q. Admin do'kondagi boshqa variantlarni aytib beradi.",
      c_note: "Rasm va narxlar do'konning Telegram kanalidan. Mavjudligini buyurtmada admin tasdiqlaydi.",
      count: n => `${n} ta model`, upto: n => `${n} minggacha`, all: 'Hammasi', som: "so'm",
      s_eye: "Do'kon ichida", s_title: "Rasmdagi devor — haqiqiy", s_lead: "Devorlar to'la modellar, polda yangi partiyalar. Kelib, qo'lingizga olib, oyog'ingizda sinab ko'ring.",
      r_eye: 'Reels', r_title: 'Modellar yaqindan', r_ig: 'Instagram: 92,9K obunachi', r_tg: 'Telegram: 14,4K obunachi',
      v_eye: 'Mijozlar yozgan', v_title: "Kanaldagi haqiqiy fikrlar",
      l_eye: 'Manzil', l_addr: "Yakkasaroy tumani, Askiya bozori ro'parasida", l_time: 'Ish vaqti: 10:00 dan 22:00 gacha', l_deliv: "O'z kuryer xizmatimiz bor", l_route: "Yo'l ko'rsatish",
      foot: 'Meecross — krossovka do‘koni, Toshkent',
      pd_size: "O'lchamni tanlang", pd_call: "Qo'ng'iroq qilish", pd_post: "Kanaldagi postni ko'rish", pd_note: "Narx va mavjudlikni admin tasdiqlaydi.",
      pd_order: s => s ? `${s} o'lchamga buyurtma` : 'Telegramda buyurtma', model: 'Model',
      msg: (id, s, p) => `Assalomu alaykum! Saytdan yozyapman. Model №${id}${s ? `, ${s} o'lcham` : ''}, narxi ${p} so'm. Bormi?\nhttps://t.me/Mekross_uz/${id}`,
      aria_lang: 'Til', aria_call: "Qo'ng'iroq qilish", aria_prev: 'Oldingi', aria_next: 'Keyingi', aria_close: 'Yopish', aria_colors: '3D krossovka rangi', alt_wall: "Do'kondagi krossovka devori",
      c: { qora: 'Qora', oq: 'Oq', kok: "Ko'k", yashil: 'Yashil', qizil: 'Qizil / pushti', bej: 'Bej' },
    },
    ru: {
      nav_cat: 'Каталог', nav_shop: 'Магазин', nav_rev: 'Отзывы', nav_loc: 'Адрес',
      h_eye: 'Ташкент · Яккасарай', h_title: 'Магазин мужских и женских кроссовок',
      h_cta: 'Смотреть модели', h_tg: 'Написать в Telegram', h_drag: 'Покрутите модель',
      f1_t: '350–480 тыс. сум', f1_d: 'Цена каждой модели открыто указана в каталоге — спрашивать не нужно.',
      f2_t: 'От 36 до 46', f2_d: 'Женские и мужские размеры. Выберите свой — останутся только подходящие модели.',
      f3_t: 'Магазин или курьер', f3_d: 'Примерьте на Шота Руставели 57 с 10:00 до 22:00 или закажите нашего курьера.',
      c_eye: 'Новые поступления', c_title: 'Начните со своего размера', c_size: 'Размер', c_color: 'Цвет', c_price: 'Цена',
      c_reset: 'Сбросить', c_more: 'Показать ещё', c_ask: 'Спросить админа',
      c_empty: 'Такой модели сейчас нет в каталоге. Админ подскажет другие варианты из магазина.',
      c_note: 'Фото и цены — из Telegram-канала магазина. Наличие подтвердит админ при заказе.',
      count: n => `Моделей: ${n}`, upto: n => `до ${n} тыс.`, all: 'Все', som: 'сум',
      s_eye: 'Внутри магазина', s_title: 'Стена с фото — настоящая', s_lead: 'Стены заполнены моделями, на полу — новые партии. Приходите, возьмите в руки и примерьте.',
      r_eye: 'Reels', r_title: 'Модели крупным планом', r_ig: 'Instagram: 92,9K подписчиков', r_tg: 'Telegram: 14,4K подписчиков',
      v_eye: 'Пишут клиенты', v_title: 'Настоящие отзывы из канала',
      l_eye: 'Адрес', l_addr: 'Яккасарайский район, напротив базара Аския', l_time: 'Часы работы: с 10:00 до 22:00', l_deliv: 'Есть своя курьерская служба', l_route: 'Построить маршрут',
      foot: 'Meecross — магазин кроссовок, Ташкент',
      pd_size: 'Выберите размер', pd_call: 'Позвонить', pd_post: 'Открыть пост в канале', pd_note: 'Цену и наличие подтвердит админ.',
      pd_order: s => s ? `Заказать ${s} размер` : 'Заказать в Telegram', model: 'Модель',
      msg: (id, s, p) => `Здравствуйте! Пишу с сайта. Модель №${id}${s ? `, размер ${s}` : ''}, цена ${p} сум. Есть в наличии?\nhttps://t.me/Mekross_uz/${id}`,
      aria_lang: 'Язык', aria_call: 'Позвонить', aria_prev: 'Назад', aria_next: 'Вперёд', aria_close: 'Закрыть', aria_colors: 'Цвет 3D-кроссовка', alt_wall: 'Стена кроссовок в магазине',
      c: { qora: 'Чёрный', oq: 'Белый', kok: 'Синий', yashil: 'Зелёный', qizil: 'Красный / розовый', bej: 'Бежевый' },
    },
  };
  // Kanaldagi mijoz xabarlari: uz — asl (lotinda), ru — tarjima
  const REV = [
    ['Rahmat, krossovkalar juda zo‘r. Uchinchi yildirki sizlardan olaman, hammasi sifatli bo‘lgan.', 'Спасибо, кроссовки просто шикарные. Уже третий год у вас покупаю, и все были качественные.'],
    ['Oka, bitta gap bilan: bomba. 2 marta zakaz qildim, ikkalasi ham bomba.', 'Одним словом — бомба. Заказывал дважды, и оба раза отлично.'],
    ['Maqtashganicha bor ekan. Yumshoq, oyoqqa moslashib oladi va yengil.', 'Не зря хвалили. Мягкие, садятся по ноге и лёгкие.'],
    ['Razmeri 1 ga 1 tushdi. Yana zakaz bermoqchiman, ishlaringizga omad.', 'Размер подошёл один в один. Хочу заказать ещё, удачи вам.'],
    ['Rasmdagidan ham chiroyli ekan.', 'Оказались красивее, чем на фото.'],
    ['Zo‘r narxda oldim, rahmat. Assortiment ham ko‘p ekan.', 'Купил по отличной цене, спасибо. И ассортимент большой.'],
    ['Oldim, kattakon rahmat. 1 kunda keldi, bez problem.', 'Получил, большое спасибо. Пришло за 1 день, без проблем.'],
    ['Krossovkani oldim, sifati zo‘r ekan. Yurishga qulay.', 'Забрал кроссовки, качество отличное. Удобно ходить.'],
    ['41 bergan edingiz, zo‘r bo‘libdi, rosa mos ekan.', 'Вы дали 41-й — отлично, очень подошёл.'],
    ['Buyurtmamni oldim, o‘zim xohlagandek keldi.', 'Получил заказ, пришёл именно такой, как я хотел.'],
    ['Rahmat aka, ishlaringizga rivoj. Sizga mijoz bo‘ldim.', 'Спасибо, развития вашему делу. Теперь я ваш клиент.'],
    ['Rahmat, sifatiga gap yo‘q, xohlaganimdek.', 'Спасибо, к качеству вопросов нет, как и хотел.'],
  ];

  let swReady = false;
  let lang = localStorage.getItem('mc_lang') === 'ru' ? 'ru' : 'uz';
  const L = () => T[lang];
  const fmt = n => n.toLocaleString('ru-RU').replace(/ |,/g, ' ');

  function applyLang() {
    document.documentElement.lang = lang;
    $$('[data-i]').forEach(e => { e.textContent = L()[e.dataset.i]; });
    $$('[data-a]').forEach(e => e.setAttribute('aria-label', L()[e.dataset.a]));
    $$('[data-alt]').forEach(e => { e.alt = L()[e.dataset.alt]; });
    $$('[data-lang]').forEach(b => { b.classList.toggle('is-on', b.dataset.lang === lang); b.setAttribute('aria-pressed', b.dataset.lang === lang); });
    document.title = lang === 'ru' ? 'MEECROSS — магазин мужских и женских кроссовок, Ташкент' : "MEECROSS — erkaklar va ayollar krossovka do'koni, Toshkent";
    buildFilters(); render(); buildRev();
    if (typeof swLabel === 'function' && swReady) swLabel();
    if (cur) openModal(cur, sel, true);
  }

  /* ---------- Katalog ---------- */
  const D = window.CATALOG;
  const SW = { qora: '#16171a', oq: '#f2f2ee', kok: '#2d4f93', yashil: '#667a3e', qizil: '#c43e5e', bej: '#d3bf9d' };
  const F = { size: null, color: null, price: null };
  const PAGE = () => mobile() ? 10 : 16;
  let shown = PAGE();
  const match = x => (!F.size || (x.a <= F.size && F.size <= x.b)) && (!F.color || x.c === F.color) && (!F.price || x.p <= F.price);

  function chip(label, on, fn, cls = '', aria) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'chip ' + cls + (on ? ' is-on' : '');
    b.textContent = label; b.setAttribute('aria-pressed', on);
    if (aria) b.setAttribute('aria-label', aria);
    b.onclick = fn; return b;
  }
  function buildFilters() {
    const set = (k, v) => { F[k] = F[k] === v ? null : v; shown = PAGE(); buildFilters(); render(); };
    const s = $('#fSize'); s.replaceChildren();
    for (let n = 36; n <= 46; n++) s.append(chip(n, F.size === n, () => set('size', n)));
    const c = $('#fColor'); c.replaceChildren();
    Object.keys(SW).forEach(k => {
      const b = chip('', F.color === k, () => set('color', k), 'chip--c', L().c[k]);
      b.style.setProperty('--c', SW[k]); b.title = L().c[k]; c.append(b);
    });
    const p = $('#fPrice'); p.replaceChildren();
    [400, 450].forEach(n => p.append(chip(L().upto(n), F.price === n * 1000, () => set('price', n * 1000))));
    $('#fReset').hidden = !(F.size || F.color || F.price);
  }
  $('#fReset').onclick = () => { F.size = F.color = F.price = null; shown = PAGE(); buildFilters(); render(); };

  function render() {
    const list = D.filter(match);
    const g = $('#grid'); g.replaceChildren();
    list.slice(0, shown).forEach(x => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'card';
      const hov = x.i[1] ? `<img loading="lazy" src="assets/c/${x.i[1]}" alt="">` : '';
      b.innerHTML = `<div class="card__box"><span class="card__tag">${x.a}–${x.b}</span><img loading="lazy" src="assets/c/${x.i[0]}" alt="${L().model} ${x.id}, ${L().c[x.c]}">${hov}</div>
        <div class="card__meta"><span class="card__price">${fmt(x.p)} ${L().som}</span><span class="card__sizes">№${x.id} · ${L().c[x.c]}</span></div>`;
      b.onclick = () => openModal(x);
      if (!mobile() && !still) {
        const box = b.firstElementChild;
        b.onpointermove = e => {
          const r = b.getBoundingClientRect();
          const dx = (e.clientX - r.left) / r.width - .5, dy = (e.clientY - r.top) / r.width - .6;
          box.style.transform = `rotateY(${dx * 13}deg) rotateX(${-dy * 11}deg) translateZ(12px)`;
        };
        b.onpointerleave = () => { box.style.transform = ''; };
      }
      g.append(b);
    });
    $('#count').textContent = L().count(list.length);
    $('#empty').hidden = list.length > 0;
    $('.more').hidden = list.length <= shown;
    $('.note', $('#katalog').lastElementChild).hidden = list.length === 0;
    ScrollTrigger.refresh();
  }
  $('#more').onclick = () => { shown += PAGE(); render(); };

  /* ---------- Model oynasi ---------- */
  const pd = $('#pd');
  let cur = null, sel = null, img = 0;
  function openModal(x, keepSize = null, keep = false) {
    cur = x; sel = keepSize ?? (F.size && x.a <= F.size && F.size <= x.b ? F.size : null);
    if (!keep) img = 0;
    const paint = () => {
      $('#pdImg').src = 'assets/c/' + x.i[img];
      $('#pdImg').alt = `${L().model} ${x.id}`;
      $$('#pdTh button').forEach((b, i) => b.classList.toggle('is-on', i === img));
    };
    const th = $('#pdTh'); th.replaceChildren();
    if (x.i.length > 1) x.i.forEach((f, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-label', `${i + 1}`);
      b.innerHTML = `<img src="assets/c/${f}" alt="">`;
      b.onclick = () => { img = i; paint(); };
      th.append(b);
    });
    paint();
    $('#pdNo').textContent = `${L().model} №${x.id} · ${L().c[x.c]}`;
    $('#pdPrice').textContent = `${fmt(x.p)} ${L().som}`;
    const sz = () => {
      const w = $('#pdSizes'); w.replaceChildren();
      for (let n = x.a; n <= x.b; n++) w.append(chip(n, sel === n, () => { sel = sel === n ? null : n; sz(); }));
      $('#pdOrderT').textContent = L().pd_order(sel);
      $('#pdOrder').href = 'https://t.me/shaxboz_adm?text=' + encodeURIComponent(L().msg(x.id, sel, fmt(x.p)));
    };
    sz();
    $('#pdPost').href = `https://t.me/Mekross_uz/${x.id}`;
    if (!pd.open) pd.showModal();
  }
  $('#pdX').onclick = () => pd.close();
  pd.addEventListener('click', e => { if (e.target === pd) pd.close(); });
  pd.addEventListener('close', () => { cur = null; sel = null; });

  /* ---------- Fikrlar ---------- */
  function buildRev() {
    const card = q => `<blockquote class="q"><svg aria-hidden="true"><use href="#i-quote"/></svg>${q[lang === 'ru' ? 1 : 0]}</blockquote>`;
    const a = REV.filter((_, i) => i % 2 === 0), b = REV.filter((_, i) => i % 2);
    $('#m1').innerHTML = [...a, ...a].map(card).join('');
    $('#m2').innerHTML = [...b, ...b].map(card).join('');
    [$('#m1'), $('#m2')].forEach(m => [...m.children].slice(m.children.length / 2).forEach(c => c.setAttribute('aria-hidden', 'true')));
  }

  /* ---------- Reels 3D halqa ---------- */
  const REELS = [['r1', 'DfC1F-boCQh'], ['r2', 'De1CHkrRy0A'], ['r3', 'DeilykjoKBJ'], ['r4', 'Delmm40RSrg'], ['r5', 'DehJjvpqHQF'], ['r6', 'Deoi8E6xX6g'], ['r7', 'DehDJTuIjXZ']];
  const ring = $('#ring'), rin = $('#ringIn');
  const step = 360 / REELS.length;
  let angle = 0, active = -1, ringSeen = false;
  const cards = REELS.map(([f, id]) => {
    const c = document.createElement('div'); c.className = 'rc';
    c.innerHTML = `<img loading="lazy" src="assets/p/${f}.jpg" alt=""><a href="https://www.instagram.com/reel/${id}/" target="_blank" rel="noopener" aria-label="Instagram"><svg><use href="#i-ig"/></svg></a>`;
    c.dataset.f = f; rin.append(c); return c;
  });
  function ringLayout() {
    const h = ring.clientHeight * .94;
    const w = Math.min(h * 9 / 16, innerWidth * .68);
    const hh = w * 16 / 9;
    const rad = Math.round((w + 22) / (2 * Math.tan(Math.PI / REELS.length)));
    rin.style.setProperty('--w', w + 'px');
    rin.style.setProperty('--h', hh + 'px');
    cards.forEach((c, i) => { c.style.transform = `rotateY(${i * step}deg) translateZ(${rad}px)`; });
    ring.dataset.r = rad;
    ringApply();
  }
  function ringApply() {
    rin.style.transform = `translateZ(${-ring.dataset.r}px) rotateY(${angle}deg)`;
    const n = REELS.length, idx = ((Math.round(-angle / step) % n) + n) % n;
    if (idx !== active) setActive(idx);
  }
  function setActive(i) {
    active = i;
    cards.forEach((c, k) => {
      c.classList.toggle('is-on', k === i);
      const v = $('video', c);
      if (k === i) return;
      if (v) v.remove();
    });
    if (!ringSeen) return;
    const c = cards[i];
    if ($('video', c)) return;
    const v = document.createElement('video');
    v.muted = true; v.loop = true; v.playsInline = true; v.setAttribute('playsinline', ''); v.preload = 'auto';
    v.poster = `assets/p/${c.dataset.f}.jpg`; v.src = `assets/v/${c.dataset.f}.mp4`;
    c.insertBefore(v, c.querySelector('a'));
    v.play().catch(() => {});
  }
  const snap = d => { const t = Math.round(angle / step + d) * step; gsap.to({ a: angle }, { a: t, duration: still ? 0 : .7, ease: 'power3.out', onUpdate() { angle = this.targets()[0].a; ringApply(); } }); };
  $('#rPrev').onclick = () => snap(1);
  $('#rNext').onclick = () => snap(-1);
  let rd = false, rx = 0, ra = 0, moved = 0;
  ring.addEventListener('pointerdown', e => { if (e.target.closest('a')) return; rd = true; rx = e.clientX; ra = angle; moved = 0; gsap.killTweensOf({}); ring.setPointerCapture(e.pointerId); });
  ring.addEventListener('pointermove', e => { if (!rd) return; moved = e.clientX - rx; angle = ra + moved * .2; ringApply(); });
  const rEnd = () => { if (!rd) return; rd = false; snap(moved < -24 ? -.3 : moved > 24 ? .3 : 0); };
  ring.addEventListener('pointerup', rEnd);
  ring.addEventListener('pointercancel', rEnd);
  addEventListener('resize', ringLayout);
  new IntersectionObserver(es => {
    const on = es[0].isIntersecting;
    if (on && !ringSeen) { ringSeen = true; const i = active; active = -1; setActive(i < 0 ? 0 : i); }
    const v = $('.rc.is-on video'); if (v) on ? v.play().catch(() => {}) : v.pause();
  }, { threshold: .25 }).observe(ring);

  /* ---------- Faqat ko'rinayotgan videolar o'ynaydi ---------- */
  const vo = new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) {
      if (!v.src && v.dataset.src) v.src = v.dataset.src;
      v.play().catch(() => {});
    } else v.pause();
  }), { rootMargin: '120px' });
  $$('video[data-src]').forEach(v => vo.observe(v));

  /* ---------- Hero scroll ---------- */
  const facts = $$('.fact');
  const intro = $('.hero__intro'), bar = $('.hero__bar i'), tools = $('.hero__tools');
  const show = (el, on) => { gsap.to(el, { autoAlpha: on ? 1 : 0, y: on ? 0 : 18, duration: .4, overwrite: 'auto' }); };
  let stage = -1;
  ScrollTrigger.create({
    trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: true,
    onUpdate(s) {
      const p = s.progress;
      if (window.Shoe) window.Shoe.progress = p;
      bar.style.transform = `scaleX(${p})`;
      const st = p < .12 ? 0 : p < .42 ? 1 : p < .72 ? 2 : 3;
      if (st !== stage) {
        stage = st;
        show(intro, st === 0);
        facts.forEach((f, i) => show(f, st === i + 1));
        if (mobile()) show(tools, st === 0);
      }
    },
  });
  gsap.from('.hero__word', { yPercent: 16, autoAlpha: 0, duration: 1.2, ease: 'power3.out' });
  gsap.from('.hero__intro > *', { y: 22, autoAlpha: 0, duration: .8, stagger: .08, delay: .25, ease: 'power3.out' });

  /* Rang: krossovka ranglari tugmasi */
  const swT = { kok: "Ko'k", qizil: 'Pushti', qora: 'Qora' };
  function swLabel() {
    const f = $('.sw.is-on').dataset.f;
    $('#swLinkT').textContent = lang === 'ru'
      ? { kok: 'Синие модели', qizil: 'Розовые и красные', qora: 'Чёрные модели' }[f]
      : `${swT[f]} modellar`;
    $$('.sw').forEach(b => b.setAttribute('aria-label', lang === 'ru'
      ? { kok: 'Синий', qizil: 'Розовый', qora: 'Чёрный' }[b.dataset.f] : swT[b.dataset.f]));
  }
  $$('.sw').forEach(b => {
    b.onclick = () => {
      $$('.sw').forEach(x => x.classList.toggle('is-on', x === b));
      window.__variant = b.dataset.v;
      if (window.Shoe) window.Shoe.variant(b.dataset.v);
      swLabel();
    };
  });
  $('#swLink').addEventListener('click', () => {
    F.color = $('.sw.is-on').dataset.f; shown = PAGE(); buildFilters(); render();
  });

  /* ---------- Do'kon parallaks + header ---------- */
  if (!still && !mobile()) {
    $$('.pc').forEach(p => gsap.to(p, { y: +p.dataset.speed, ease: 'none', scrollTrigger: { trigger: '.shop__cols', start: 'top bottom', end: 'bottom top', scrub: true } }));
  }
  const top = $('.top');
  const solid = () => top.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', solid, { passive: true }); solid();

  /* Sticky filtr header ostida yopilmasin, ichki havolalar silliq */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const t = $(a.getAttribute('href')); if (!t) return;
    e.preventDefault();
    t.scrollIntoView({ behavior: still ? 'auto' : 'smooth' });
  }));

  $$('[data-lang]').forEach(b => b.onclick = () => { lang = b.dataset.lang; localStorage.setItem('mc_lang', lang); applyLang(); });

  swReady = true;
  applyLang();
  ringLayout();
  addEventListener('load', () => ScrollTrigger.refresh());
})();
