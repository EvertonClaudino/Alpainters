/* ══════════════════════════════════════
   SLIDESHOW
══════════════════════════════════════ */
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let autoTimer;

function goTo(idx) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = idx;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}

function nextSlide() {
  goTo((current + 1) % slides.length);
}

function startAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 5000);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goTo(Number(dot.dataset.idx));
    startAutoPlay(); // reset timer on manual nav
  });
});

startAutoPlay();


/* ══════════════════════════════════════
   NAVBAR — SCROLL EFFECT
══════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ══════════════════════════════════════
   NAVBAR — MOBILE HAMBURGER
══════════════════════════════════════ */
const hamburgerBtn = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const ham1 = document.getElementById('ham1');
const ham2 = document.getElementById('ham2');
const ham3 = document.getElementById('ham3');
let menuOpen = false;

hamburgerBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  hamburgerBtn.classList.toggle('is-active', menuOpen);

  // Bloquear scroll do body quando o menu está aberto
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn.classList.remove('is-active');
  });
});


/* ══════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════ */
function revealOnScroll(selector, delayStep = 0) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * (delayStep || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

// Feature cards staggered
revealOnScroll('.feature-card', 100);

// Sobre cols
document.querySelectorAll('#sobre .col-reveal').forEach(el => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  observer.observe(el);
});

// Serviço rows staggered
revealOnScroll('.servico-row', 150);

// Outros serviços cards staggered
revealOnScroll('.outro-card', 80);


/* ══════════════════════════════════════
   GALLERY — SCROLL REVEAL
══════════════════════════════════════ */
revealOnScroll('.gallery-item', 90);

const projectAlbums = [
  {
    title: 'Reabilitação de Edifícios',
    images: [
      './image/Galeria01/01.jpg',
      './image/Galeria01/02.jpg',
      './image/Galeria01/03.jpg',
      './image/Galeria01/04.jpg',
      './image/Galeria01/05.jpg',
      './image/Galeria01/06.jpg',
    ]
  },
  {
    title: 'Fachada Residencial',
    images: [
      './image/Galeria02/01.jpg',
      './image/Galeria02/02.jpg',
      './image/Galeria02/03.jpg',
      './image/Galeria02/04.jpg',
    ]
  },
  {
    title: 'Isolamento Térmico',
    images: [
      './image/Galeria03/01.jpg',
      './image/Galeria03/02.jpg',
      './image/Galeria03/03.jpg',
      './image/Galeria03/04.jpg',
      './image/Galeria03/05.jpg',
      './image/Galeria03/06.jpg',

    ]
  },
  {
    title: 'Alpinismo Industrial',
    images: [
      './image/Galeria04/01.jpg',
      './image/Galeria04/02.jpg',
      './image/Galeria04/03.jpg',
      './image/Galeria04/04.jpg',
      './image/Galeria04/05.jpg',
      './image/Galeria04/06.jpg',
    ]
  },
  {
    title: 'Trabalho em Altura',
    images: [
      './image/Galeria05/01.jpg',
      './image/Galeria05/02.jpg',
      './image/Galeria05/03.jpg',
      './image/Galeria05/04.jpg',
      './image/Galeria05/05.jpg',
      './image/Galeria05/06.jpg',
    ]
  },
  {
    title: 'Manutenção de Fachadas',
    images: [
      './image/Galeria06/01.jpg',
      './image/Galeria06/02.jpg',
      './image/Galeria06/03.jpg',
      './image/Galeria06/04.jpg',
      './image/Galeria06/05.jpg',
      './image/Galeria06/06.jpg',
    ]
  },
];

document.body.insertAdjacentHTML('beforeend', `
  <div id="lightbox" role="dialog" aria-modal="true">
    <button id="lightbox-close" aria-label="Fechar">✕</button>
    <button id="lightbox-prev" aria-label="Anterior">&#8249;</button>
    <div id="lightbox-content">
      <img id="lightbox-img" src="" alt="" />
      <div id="lightbox-meta">
        <span id="lightbox-title"></span>
        <span id="lightbox-counter"></span>
      </div>
    </div>
    <button id="lightbox-next" aria-label="Próximo">&#8250;</button>
  </div>
`);

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCtr = document.getElementById('lightbox-counter');
const lbClose = document.getElementById('lightbox-close');
const lbPrev = document.getElementById('lightbox-prev');
const lbNext = document.getElementById('lightbox-next');

let activeAlbum = [];
let activeTitle = '';
let currentImgIdx = 0;

function renderDots() {
  let dotsEl = document.getElementById('lightbox-dots');
  if (!dotsEl) {
    dotsEl = document.createElement('div');
    dotsEl.id = 'lightbox-dots';
    document.getElementById('lightbox-meta').after(dotsEl);
  }
  dotsEl.innerHTML = activeAlbum
    .map((_, i) => `<span class="lb-dot${i === currentImgIdx ? ' active' : ''}"></span>`)
    .join('');
  // click on dots
  dotsEl.querySelectorAll('.lb-dot').forEach((dot, i) => {
    dot.addEventListener('click', () => { currentImgIdx = i; updateLightbox(); });
  });
}

function updateLightbox() {
  // Fade out → swap → fade in
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = activeAlbum[currentImgIdx];
    lightboxTitle.textContent = activeTitle;
    lightboxCtr.textContent = `${currentImgIdx + 1} / ${activeAlbum.length}`;
    lightboxImg.onload = () => { lightboxImg.style.opacity = '1'; };
    if (lightboxImg.complete) lightboxImg.style.opacity = '1';
    renderDots();
  }, 180);

  // Show/hide arrows if only 1 image
  lbPrev.style.display = activeAlbum.length > 1 ? '' : 'none';
  lbNext.style.display = activeAlbum.length > 1 ? '' : 'none';
}

function openLightbox(projectIdx) {
  const album = projectAlbums[projectIdx];
  if (!album) return;
  activeAlbum = album.images;
  activeTitle = album.title;
  currentImgIdx = 0;
  updateLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

function prevImg() {
  currentImgIdx = (currentImgIdx - 1 + activeAlbum.length) % activeAlbum.length;
  updateLightbox();
}

function nextImg() {
  currentImgIdx = (currentImgIdx + 1) % activeAlbum.length;
  updateLightbox();
}

// Attach click on gallery items
document.querySelectorAll('.gallery-item').forEach((item, i) => {
  item.addEventListener('click', () => openLightbox(i));
});

lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', prevImg);
lbNext.addEventListener('click', nextImg);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImg();
  if (e.key === 'ArrowRight') nextImg();
});

// Contactos reveal
revealOnScroll('.contact-reveal', 120);


/* ══════════════════════════════════════
   ACTIVE NAV LINK — IntersectionObserver
   Destaca o link correspondente à secção
   visível no viewport.
══════════════════════════════════════ */
const navLinks = document.querySelectorAll('.nav-link[data-section]');
const sections = document.querySelectorAll('section[id]');

function setActiveLink(id) {
  navLinks.forEach(link => {
    if (link.dataset.section === id) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActiveLink(entry.target.id);
    }
  });
}, {
  rootMargin: '-40% 0px -55% 0px', // activa quando o meio da secção cruza o centro do viewport
  threshold: 0
});

sections.forEach(sec => sectionObserver.observe(sec));


/* ══════════════════════════════════════
   FECHAR MENU MOBILE ao clicar num link
══════════════════════════════════════ */
document.querySelectorAll('#mobile-menu a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    hamburgerBtn.classList.remove('is-active');
  });
});




