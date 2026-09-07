  // Theme toggle (session-based, defaults to dark)
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  root.setAttribute('data-theme', 'dark');
  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    root.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
  });

  // Mobile menu
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('main section[id]');
  const navItems = document.querySelectorAll('.navlink');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.navlink[href="#${entry.target.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(sec => observer.observe(sec));

  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Contact form -> mailto (no backend)
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const body = `From: ${name} (${email})%0D%0A%0D%0A${encodeURIComponent(message)}`;
    const mailto = `mailto:sprabhavthi2006@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    window.location.href = mailto;
    status.textContent = 'Your email app should open now — send it from there.';
    status.classList.add('ok');
  });

  // Scroll-reveal for sec-head, edu-card, project-card, cert-col
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // Tilt effect on project/education cards
  const tiltCards = document.querySelectorAll('.tilt-card');
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (supportsHover && !reducedMotion) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -6;
        const rotateY = ((x / rect.width) - 0.5) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Cursor-following glow in hero
    const heroSection = document.querySelector('.hero');
    const glow = document.getElementById('cursorGlow');
    if (heroSection && glow) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
        glow.style.opacity = '1';
      });
      heroSection.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
      });
    }
  }
