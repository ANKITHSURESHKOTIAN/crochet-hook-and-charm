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

  // ===== CATALOG PRODUCTS DATABASE =====
  const products = [
    { id: 1, name: "Crochet Sunflower Bouquet", category: "bouquets", price: 300, originalPrice: 499, image: "assets/prod1.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 48, tag: "Bestseller" },
    { id: 2, name: "Cute Crochet Peach Amigurumi Keychain", category: "keychains", price: 250, originalPrice: 399, image: "assets/prod2.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 36, tag: "Trending" },
    { id: 3, name: "Crochet Sunflower Phone Case", category: "cases", price: 500, originalPrice: 799, image: "assets/prod3.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 29, tag: "Hot" },
    { id: 4, name: "Crochet Floral Garden Phone Case", category: "cases", price: 500, originalPrice: 799, image: "assets/prod4.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 41, tag: "Best Seller" },
    { id: 5, name: "Crochet Puff Flower Phone Case", category: "cases", price: 500, originalPrice: 799, image: "assets/prod5.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 18, tag: "New" },
    { id: 6, name: "Crochet Checkered Floral Phone Case", category: "cases", price: 500, originalPrice: 799, image: "assets/prod6.jpg", shipping: "Free Shipping", rating: 4.7, reviews: 22, tag: "Popular" },
    { id: 7, name: "Crochet Mixed Flower Bouquet with Bee", category: "bouquets", price: 800, originalPrice: 1199, image: "assets/prod7.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 54, tag: "Must Have" },
    { id: 8, name: "Crochet Floral Braid Accessory", category: "accessories", price: 400, originalPrice: 599, image: "assets/prod8.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 31, tag: "Trending" },
    { id: 9, name: "Crochet Swiss Roll Cake Keychain", category: "keychains", price: 180, originalPrice: 299, image: "assets/prod9.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 15, tag: "Cute" },
    { id: 10, name: "Handmade Crochet Tote Bag", category: "accessories", price: 1300, originalPrice: 1999, image: "assets/prod10.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 62, tag: "Premium" },
    { id: 11, name: "Crochet Burgundy Bow Phone Case", category: "cases", price: 499, originalPrice: 799, image: "assets/prod11.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 27, tag: "Trending" },
    { id: 12, name: "Crochet Black Bow Phone Case", category: "cases", price: 499, originalPrice: 799, image: "assets/prod12.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 33, tag: "Popular" },
    { id: 13, name: "Crochet Sunflower Drawstring Pouch", category: "accessories", price: 300, originalPrice: 499, image: "assets/prod13.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 45, tag: "Useful" },
    { id: 14, name: "Crochet White Bow Phone Case", category: "cases", price: 499, originalPrice: 799, image: "assets/prod14.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 19, tag: "New" },
    { id: 15, name: "Crochet Green & Pink Flower Hair Clip", category: "accessories", price: 90, originalPrice: 150, image: "assets/prod15.jpg", shipping: "Free Shipping", rating: 4.7, reviews: 38, tag: "Pocket Friendly" },
    { id: 16, name: "Crochet Pink Lily Bouquet", category: "bouquets", price: 550, originalPrice: 899, image: "assets/prod16.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 40, tag: "Best Seller" },
    { id: 17, name: "Crochet Pink Rose Keychain", category: "keychains", price: 180, originalPrice: 299, image: "assets/prod17.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 23, tag: "Lovely" },
    { id: 18, name: "Crochet Red Rose Bouquet", category: "bouquets", price: 600, originalPrice: 999, image: "assets/prod18.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 57, tag: "Classic" },
    { id: 19, name: "Crochet Evil Eye Keychain", category: "keychains", price: 200, originalPrice: 349, image: "assets/prod19.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 50, tag: "Lucky Charm" },
    { id: 20, name: "Crochet Sunflower Face Keychain", category: "keychains", price: 250, originalPrice: 399, image: "assets/prod20.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 21, tag: "Best Gift" },
    { id: 21, name: "Crochet Colorful Flower Hair Clips", category: "accessories", price: 90, originalPrice: 150, image: "assets/prod21.jpg", shipping: "Free Shipping", rating: 4.8, reviews: 44, tag: "Sweet" },
    { id: 22, name: "Crochet White & Yellow Daisy Hair Clip", category: "accessories", price: 100, originalPrice: 180, image: "assets/prod22.jpg", shipping: "+ Shipping Charge", rating: 4.7, reviews: 12, tag: "Daisy Choice" },
    { id: 23, name: "Pink Crochet Tulip Bouquet", category: "bouquets", price: 450, originalPrice: 699, image: "assets/prod23.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 31, tag: "Top Rated" },
    { id: 24, name: "Crochet Sunflower & Daisy Mixed Bouquet", category: "bouquets", price: 600, originalPrice: 999, image: "assets/prod24.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 39, tag: "Stunning" },
    { id: 25, name: "Crochet Mikasa Scarf", category: "accessories", price: 1500, originalPrice: 2499, image: "assets/prod25.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 26, tag: "Cozy Choice" },
    { id: 26, name: "Crochet Rose Border Shawl", category: "accessories", price: 2800, originalPrice: 4200, image: "assets/prod26.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 18, tag: "Masterpiece" },
    { id: 27, name: "Crochet Red Rose Bouquet with Baby's Breath", category: "bouquets", price: 1100, originalPrice: 1799, image: "assets/prod27.jpg", shipping: "Free Shipping", rating: 5.0, reviews: 45, tag: "Premium" },
    { id: 28, name: "Crochet Spider-Man Amigurumi Keychain", category: "keychains", price: 180, originalPrice: 299, image: "assets/prod28.jpg", shipping: "Free Shipping", rating: 4.9, reviews: 52, tag: "Hero Favorite" }
  ];

  // ===== RENDER CATALOG =====
  const catalogGrid = document.getElementById('catalogGrid');
  const catalogSearch = document.getElementById('catalogSearch');
  const filterTabs = document.querySelectorAll('.filter-tab');

  function renderProducts(filteredProducts) {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';

    if (filteredProducts.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--mid);">
          <p style="font-size: 1.2rem; font-weight: 600; margin-bottom: 8px;">No products found</p>
          <p style="font-size: 0.9rem; opacity: 0.8;">Try searching for a different keyword or category!</p>
        </div>
      `;
      return;
    }

    filteredProducts.forEach(product => {
      // Create rating stars
      let starsHTML = '';
      const fullStars = Math.floor(product.rating);
      for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
          starsHTML += '★';
        } else {
          starsHTML += '☆';
        }
      }

      const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

      // WhatsApp prefilled link
      const encodedMsg = encodeURIComponent(`Hello Crochet Hook & Charm! I want to order the "${product.name}" for ₹${product.price}. Please let me know how to proceed!`);
      const waUrl = `https://wa.me/919833234026?text=${encodedMsg}`;

      const card = document.createElement('div');
      card.className = 'collection-card fade-in visible';
      card.innerHTML = `
        <div class="card-image-wrap">
          <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" />
          <span class="card-tag">${product.tag}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">${product.name}</h3>
          <div class="card-rating">
            <span class="rating-number">${product.rating}</span>
            <span style="color: #ffa41c;">${starsHTML}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="card-price-row">
            <span class="selling-price">₹${product.price}</span>
            <span class="original-price">₹${product.originalPrice}</span>
            <span class="discount-percentage">${discount}% off</span>
          </div>
          <div class="card-delivery">
            <span>🚚</span> ${product.shipping}
          </div>
          <a href="${waUrl}" target="_blank" class="card-cta-btn">
            <span>💬</span> Order on WhatsApp
          </a>
        </div>
      `;

      // Tilt effect
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

      catalogGrid.appendChild(card);
    });
  }

  // ===== FILTER & SEARCH LOGIC =====
  let currentCategory = 'all';
  let searchTimeout = null;

  function filterAndSearch() {
    const query = catalogSearch ? catalogSearch.value.toLowerCase().trim() : '';
    const filtered = products.filter(product => {
      const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
      const matchesSearch = product.name.toLowerCase().includes(query) || product.tag.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
    renderProducts(filtered);
  }

  // Search input event
  if (catalogSearch) {
    catalogSearch.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterAndSearch, 200);
    });
  }

  // Filter tab click event
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.category;
      filterAndSearch();
    });
  });

  // Initial render
  renderProducts(products);

});
