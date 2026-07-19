/* ============================================
   CROCHET HOOK AND CHARM — JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close nav when link is clicked
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== SCROLL ANIMATIONS =====
  const animateEls = document.querySelectorAll(
    '.collection-card, .process-step, .testimonial-card, .feature-item, .about-img-main, .about-img-accent, .about-badge-wrap, .insta-cell, .contact-item, .contact-promise, .contact-form'
  );

  animateEls.forEach(el => el.classList.add('fade-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 80 * (Array.from(animateEls).indexOf(entry.target) % 4));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animateEls.forEach(el => observer.observe(el));

  // ===== CONTACT FORM =====
  window.handleFormSubmit = function(e) {
    e.preventDefault();
    const btn = document.getElementById('formSubmitBtn');
    const successEl = document.getElementById('formSuccess');
    const form = document.getElementById('contactForm');

    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Simulate form send
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Send Message 💌';
      btn.disabled = false;
      successEl.classList.add('visible');
      setTimeout(() => successEl.classList.remove('visible'), 6000);
    }, 1200);
  };

  // ===== HERO IMAGE PARALLAX =====
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroImg = document.getElementById('heroImg');
    if (heroImg && scrollY < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  });

  // ===== COLLECTION CARD TILT =====
  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / rect.height) * 6;
      const tiltY = -(x / rect.width) * 6;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== FLOATING BADGES INTERACTION =====
  document.querySelectorAll('.hero-badge-floating').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
      badge.style.transform = 'scale(1.06)';
    });
    badge.addEventListener('mouseleave', () => {
      badge.style.transform = '';
    });
  });

  // ===== MARQUEE PAUSE ON HOVER =====
  const marqueeTrack = document.querySelector('.marquee-track');
  if (marqueeTrack) {
    marqueeTrack.parentElement.addEventListener('mouseenter', () => {
      marqueeTrack.style.animationPlayState = 'paused';
    });
    marqueeTrack.parentElement.addEventListener('mouseleave', () => {
      marqueeTrack.style.animationPlayState = 'running';
    });
  }

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        if (target.includes('+')) {
          animateCounter(el, 0, parseInt(target), target.replace(/[0-9]/g, ''), 1500);
        }
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el, start, end, suffix, duration) {
    const range = end - start;
    const step = range / (duration / 16);
    let current = start;
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        el.textContent = end + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }

});
