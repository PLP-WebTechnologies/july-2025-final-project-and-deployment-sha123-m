/* ========= Shared Utilities ========= */
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

/* ========= Year ========= */
(function setYear(){
  const y = new Date().getFullYear();
  $$('#year').forEach(n => n.textContent = y);
})();

/* ========= Theme Toggle (with persistence) ========= */
(function theme(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  if ((saved === 'dark') || (!saved && prefersDark)) document.body.classList.add('dark');
  const toggle = $('#themeToggle') || $('#theme-toggle');
  if (toggle){
    toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    });
  }
})();

/* ========= Mobile Nav ========= */
(function mobileNav(){
  const btn = $('#navToggle');
  const menu = $('#navMenu');
  if(!btn || !menu) return;
  btn.addEventListener('click', () => {
    const open = menu.style.display === 'block';
    menu.style.display = open ? 'none' : 'block';
    btn.setAttribute('aria-expanded', String(!open));
  });
  // Close on link click
  $$('.nav__link').forEach(link => link.addEventListener('click', () => {
    if (window.innerWidth <= 900) { menu.style.display = 'none'; btn.setAttribute('aria-expanded','false'); }
  }));
})();

/* ========= Back to Top ========= */
(function backToTop(){
  const btn = $('#backToTop');
  if(!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  });
  btn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
})();

/* ========= Reveal on Scroll ========= */
(function reveal(){
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
  }, { threshold: 0.15 });
  $$('.reveal').forEach(el => obs.observe(el));
})();

/* ========= Clock ========= */
(function clock(){
  const t = $('#clockTime'); const d = $('#clockDate');
  if(!t || !d) return;
  const tick = () => { const now = new Date(); t.textContent = now.toLocaleTimeString(); d.textContent = now.toLocaleDateString(); };
  tick(); setInterval(tick, 1000);
})();

/* ========= Weather (OpenWeatherMap) ========= */
(async function weather(){
  const loc = $('#weatherLoc'); const temp = $('#weatherTemp'); const cond = $('#weatherCond');
  if(!loc || !temp || !cond) return;
  const API_KEY = 'REPLACE_WITH_YOUR_OPENWEATHER_KEY'; // get free key at openweathermap.org
  const CITY = 'Nairobi';
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    if (data.cod !== 200) throw new Error(data.message);
    loc.textContent = data.name;
    temp.textContent = `${Math.round(data.main.temp)} °C`;
    cond.textContent = data.weather[0].description;
  }catch(err){
    loc.textContent = 'Weather unavailable';
    temp.textContent = '';
    cond.textContent = '';
  }
})();

/* ========= Featured Projects (Home) ========= */
(function featured(){
  const mount = $('#projectCards');
  if(!mount) return;
  const data = [
    { title:'Responsive Portfolio', desc:'Clean, accessible portfolio site.', img:'images/project-1.jpg', link:'#' },
    { title:'Check‑In System', desc:'Simple PHP/MySQL customer check‑in.', img:'images/project-2.jpg', link:'#' },
    { title:'ElimuTab Marketing', desc:'Data‑driven campaign case study.', img:'images/project-1.jpg', link:'#' },
  ];
  mount.innerHTML = data.map(p => `
    <article class="card">
      <img src="${p.img}" alt="${p.title}" loading="lazy" />
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p><a class="btn" href="${p.link}">View</a></p>
    </article>
  `).join('');
})();

/* ========= Projects Page with Filters ========= */
(function projectsPage(){
  const grid = $('#projectsGrid');
  if(!grid) return;
  const projects = [
    { title:'Portfolio Website', cat:'web', img:'images/project-1.jpg', link:'#', desc:'Static site with semantic HTML and SEO.' },
    { title:'Network Audit Toolkit', cat:'it', img:'images/project-2.jpg', link:'#', desc:'Scripts and docs for small office networks.' },
    { title:'ElimuTab Campaign', cat:'marketing', img:'images/project-1.jpg', link:'#', desc:'Lead-gen and email nurturing.' },
    { title:'Accessibility Audit', cat:'web', img:'images/project-2.jpg', link:'#', desc:'WCAG checks & fixes.' },
  ];
  const render = (filter='all') => {
    const list = filter==='all' ? projects : projects.filter(p => p.cat===filter);
    grid.innerHTML = list.map(p => `
      <article class="card" data-cat="${p.cat}">
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
        <h3>${p.title}</h3>
        <p class="muted">${p.cat.toUpperCase()}</p>
        <p>${p.desc}</p>
        <p><a class="btn" href="${p.link}">Open</a></p>
      </article>
    `).join('');
  };
  render();
  $$('.chip').forEach(btn => btn.addEventListener('click', () => {
    $$('.chip').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    render(btn.dataset.filter);
  }));
})();

/* ========= Contact Form Validation ========= */
(function formValidation(){
  const form = $('#contactForm');
  if(!form) return;
  const name = $('#name'); const email = $('#email'); const message = $('#message');
  const nameErr = $('#nameError'); const emailErr = $('#emailError'); const msgErr = $('#messageError');
  const status = $('#formStatus');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;
    nameErr.textContent = emailErr.textContent = msgErr.textContent = status.textContent = '';

    if (!name.value.trim() || name.value.trim().length < 3){
      nameErr.textContent = 'Please enter at least 3 characters.'; valid = false;
    }
    if (!emailRegex.test(email.value.trim())){
      emailErr.textContent = 'Enter a valid email address.'; valid = false;
    }
    if (!message.value.trim() || message.value.trim().length < 10){
      msgErr.textContent = 'Message should be at least 10 characters.'; valid = false;
    }

    if (valid){
      status.textContent = '✅ Thanks! Your message was validated locally.';
      form.reset();
    } else {
      status.textContent = '⚠️ Please fix the errors above.';
    }
  });
})();