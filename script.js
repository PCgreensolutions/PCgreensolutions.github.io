// ==========================
// JS / script.js
// ==========================
document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ---- loader ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => { if (loader) loader.classList.add('hide'); });
  setTimeout(() => { if (loader) loader.classList.add('hide'); }, 2000);

  // ---- mobile nav ----
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ---- active menu highlight (client-side) ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---- progress bar ----
  const progress = document.querySelector('.progress-bar');
  if (progress) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = percent + '%';
    });
  }

  // ---- ripple effect ----
  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ---- counter animation ----
  const counters = document.querySelectorAll('.counter');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        let current = 0;
        const duration = 1800;
        const interval = 30;
        const stepCount = Math.max(Math.ceil(duration / interval), 1);
        const increment = Math.max(Math.ceil(target / stepCount), 1);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, interval);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));

  // ---- fade-in / slide-up (intersection) ----
  const fadeElements = document.querySelectorAll('.fade-in, .slide-up');
  const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        if (entry.target.classList.contains('slide-up')) {
          entry.target.style.transform = 'translateY(0)';
        }
        observer2.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => {
    el.style.opacity = '0';
    if (el.classList.contains('slide-up')) el.style.transform = 'translateY(40px)';
    observer2.observe(el);
  });

  // ---- form validation (newsletter only) ----
  const newsletter = document.getElementById('newsletter');
  if (newsletter) {
    newsletter.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]');
      if (email && email.value.trim()) {
        alert('Subscribed! (demo)');
        email.value = '';
      }
    });
  }

  // ---- parallax (subtle) ----
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.scrollY;
      const bg = hero.querySelector('.hero-graphic');
      if (bg) bg.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
  });

  // ---- sticky navbar shadow (enhance) ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 10 ? '0 8px 24px rgba(0,0,0,0.15)' : 'var(--shadow)';
    }
  });

  console.log('PC Green Solutions — enterprise ready');
});
