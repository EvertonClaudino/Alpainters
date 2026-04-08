/* ══════════════════════════════════════
   SLIDESHOW
══════════════════════════════════════ */
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
let current = 0;
let autoTimer;

function goTo(idx) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");
  current = idx;
  slides[current].classList.add("active");
  dots[current].classList.add("active");
}

function nextSlide() {
  goTo((current + 1) % slides.length);
}

function startAutoPlay() {
  clearInterval(autoTimer);
  autoTimer = setInterval(nextSlide, 5000);
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goTo(Number(dot.dataset.idx));
    startAutoPlay(); // reset timer on manual nav
  });
});

startAutoPlay();

/* ══════════════════════════════════════
   NAVBAR — SCROLL EFFECT
══════════════════════════════════════ */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

/* ══════════════════════════════════════
   NAVBAR — MOBILE HAMBURGER
══════════════════════════════════════ */
const hamburgerBtn = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const ham1 = document.getElementById("ham1");
const ham2 = document.getElementById("ham2");
const ham3 = document.getElementById("ham3");
let menuOpen = false;

hamburgerBtn.addEventListener("click", () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle("open", menuOpen);
  hamburgerBtn.classList.toggle("is-active", menuOpen);

  // Bloquear scroll do body quando o menu está aberto
  document.body.style.overflow = menuOpen ? "hidden" : "";
});

// Close mobile menu when a link is clicked
mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
    hamburgerBtn.classList.remove("is-active");
  });
});

/* ══════════════════════════════════════
   SCROLL REVEAL (IntersectionObserver)
══════════════════════════════════════ */
function revealOnScroll(selector, delayStep = 0) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(
            () => {
              entry.target.classList.add("visible");
            },
            i * (delayStep || 0),
          );
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  elements.forEach((el) => observer.observe(el));
}

// Feature cards staggered
revealOnScroll(".feature-card", 100);

// Sobre cols
document.querySelectorAll("#sobre .col-reveal").forEach((el) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );
  observer.observe(el);
});

// Serviço rows staggered
revealOnScroll(".servico-row", 150);

// Outros serviços cards staggered
revealOnScroll(".outro-card", 80);

// Preços cards staggered
revealOnScroll(".price-card", 120);

// Valores cards staggered
revealOnScroll(".value-card", 100);

/* ══════════════════════════════════════
   GALLERY — SCROLL REVEAL
══════════════════════════════════════ */
revealOnScroll(".gallery-item", 90);

const projectAlbums = [
  {
    title: "Reabilitação de Edifícios",
    images: [
      "./image/Galeria01/01.jpg",
      "./image/Galeria01/02.jpg",
      "./image/Galeria01/03.jpg",
      "./image/Galeria01/04.jpg",
      "./image/Galeria01/05.jpg",
      "./image/Galeria01/06.jpg",
    ],
  },
  {
    title: "Fachada Residencial",
    images: [
      "./image/Galeria02/01.jpg",
      "./image/Galeria02/02.jpg",
      "./image/Galeria02/03.jpg",
      "./image/Galeria02/04.jpg",
    ],
  },
  {
    title: "Isolamento Térmico",
    images: [
      "./image/Galeria03/01.jpg",
      "./image/Galeria03/02.jpg",
      "./image/Galeria03/03.jpg",
      "./image/Galeria03/04.jpg",
      "./image/Galeria03/05.jpg",
      "./image/Galeria03/06.jpg",
    ],
  },
  {
    title: "Alpinismo Industrial",
    images: [
      "./image/Galeria04/01.jpg",
      "./image/Galeria04/02.jpg",
      "./image/Galeria04/03.jpg",
      "./image/Galeria04/04.jpg",
      "./image/Galeria04/05.jpg",
      "./image/Galeria04/06.jpg",
    ],
  },
  {
    title: "Trabalho em Altura",
    images: [
      "./image/Galeria05/01.jpg",
      "./image/Galeria05/02.jpg",
      "./image/Galeria05/03.jpg",
      "./image/Galeria05/04.jpg",
      "./image/Galeria05/05.jpg",
      "./image/Galeria05/06.jpg",
    ],
  },
  {
    title: "Manutenção de Fachadas",
    images: [
      "./image/Galeria06/01.jpg",
      "./image/Galeria06/02.jpg",
      "./image/Galeria06/03.jpg",
      "./image/Galeria06/04.jpg",
      "./image/Galeria06/05.jpg",
      "./image/Galeria06/06.jpg",
    ],
  },
];

document.body.insertAdjacentHTML(
  "beforeend",
  `
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
`,
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCtr = document.getElementById("lightbox-counter");
const lbClose = document.getElementById("lightbox-close");
const lbPrev = document.getElementById("lightbox-prev");
const lbNext = document.getElementById("lightbox-next");

let activeAlbum = [];
let activeTitle = "";
let currentImgIdx = 0;

function renderDots() {
  let dotsEl = document.getElementById("lightbox-dots");
  if (!dotsEl) {
    dotsEl = document.createElement("div");
    dotsEl.id = "lightbox-dots";
    document.getElementById("lightbox-meta").after(dotsEl);
  }
  dotsEl.innerHTML = activeAlbum
    .map(
      (_, i) =>
        `<span class="lb-dot${i === currentImgIdx ? " active" : ""}"></span>`,
    )
    .join("");
  // click on dots
  dotsEl.querySelectorAll(".lb-dot").forEach((dot, i) => {
    dot.addEventListener("click", () => {
      currentImgIdx = i;
      updateLightbox();
    });
  });
}

function updateLightbox() {
  // Fade out → swap → fade in
  lightboxImg.style.opacity = "0";
  setTimeout(() => {
    lightboxImg.src = activeAlbum[currentImgIdx];
    lightboxTitle.textContent = activeTitle;
    lightboxCtr.textContent = `${currentImgIdx + 1} / ${activeAlbum.length}`;
    lightboxImg.onload = () => {
      lightboxImg.style.opacity = "1";
    };
    if (lightboxImg.complete) lightboxImg.style.opacity = "1";
    renderDots();
  }, 180);

  // Show/hide arrows if only 1 image
  lbPrev.style.display = activeAlbum.length > 1 ? "" : "none";
  lbNext.style.display = activeAlbum.length > 1 ? "" : "none";
}

function openLightbox(projectIdx) {
  const album = projectAlbums[projectIdx];
  if (!album) return;
  activeAlbum = album.images;
  activeTitle = album.title;
  currentImgIdx = 0;
  updateLightbox();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
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
document.querySelectorAll(".gallery-item").forEach((item, i) => {
  item.addEventListener("click", () => openLightbox(i));
});

lbClose.addEventListener("click", closeLightbox);
lbPrev.addEventListener("click", prevImg);
lbNext.addEventListener("click", nextImg);

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") prevImg();
  if (e.key === "ArrowRight") nextImg();
});

// Contactos reveal
revealOnScroll(".contact-reveal", 120);

/* ══════════════════════════════════════
   ACTIVE NAV LINK — IntersectionObserver
   Destaca o link correspondente à secção
   visível no viewport.
══════════════════════════════════════ */
const navLinks = document.querySelectorAll(".nav-link[data-section]");
const sections = document.querySelectorAll("section[id]");

function setActiveLink(id) {
  navLinks.forEach((link) => {
    if (link.dataset.section === id) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px", // activa quando o meio da secção cruza o centro do viewport
    threshold: 0,
  },
);

sections.forEach((sec) => sectionObserver.observe(sec));

/* ══════════════════════════════════════
   SISTEMA DE TRADUÇÃO (PT/EN)
══════════════════════════════════════ */
const translations = {
  pt: {
    // Skip link
    "skip.content": "Pular para conteúdo principal",

    // Nav
    "nav.home": "Home",
    "nav.about": "Sobre Nós",
    "nav.services": "Serviços",
    "nav.projects": "Projectos",
    "nav.contact": "Contactos",
    "nav.quote": "Orçamento",

    // Hero
    "hero.slide1.label": "AlPainters — Alpinismo Industrial",
    "hero.slide1.title": "Acesso Por Corda",
    "hero.slide1.sub":
      "Soluções de alpinismo industrial com qualidade e segurança",
    "hero.slide2.label": "AlPainters — Alpinismo Industrial",
    "hero.slide2.title": "Isolamento Térmico",
    "hero.slide2.sub": "Eficiência energética e conforto para o seu edifício",
    "hero.slide3.label": "AlPainters — Alpinismo Industrial",
    "hero.slide3.title": "Reabilitação de Edifícios",
    "hero.slide3.sub":
      "Transformamos fachadas com técnicas avançadas e sustentáveis",
    "hero.buttons.quote": "Pedir Orçamento",
    "hero.buttons.services": "Nossos Serviços",

    // Features
    "features.quote.title": "Orçamento Gratuito",
    "features.quote.desc": "Feito à medida para si, sem compromisso",
    "features.deadline.title": "Prazo Garantido",
    "features.deadline.desc": "Seu projecto entregue no prazo acordado",
    "features.quality.title": "Qualidade Total",
    "features.quality.desc": "Excelência em cada fase da manutenção",
    "features.certified.title": "Certificados",
    "features.certified.desc": "IRATA, APCER, IMPIC, ISQ",
    "features.clients.title": "+27 Clientes",
    "features.clients.desc": "Aprovaram as nossas soluções este ano",

    // About
    "about.label": "Sobre a Alpainters",
    "about.title": "Um pouco sobre nós",
    "about.text1":
      "A Alpainters nasceu da paixão por transformar edifícios e garantir a sua durabilidade através de técnicas avançadas de alpinismo industrial. Fundada por um casal empreendedor dedicado, destaca-se pela sua abordagem inovadora, focada na qualidade, segurança e sustentabilidade.",
    "about.text2":
      "Combinamos o que há de mais moderno em tecnologia, como vistorias técnicas com drones, com uma equipa altamente qualificada e certificada em trabalho em altura. Cada serviço é personalizado para atender às necessidades específicas de reabilitação e manutenção de fachadas.",
    "about.text3":
      "Na Alpainters, cada projeto é um passo em direção a um mundo mais sustentável.",
    "about.button": "Conhecer Mais",

    // Contact form
    "contact.name.label": "Nome Completo",
    "contact.name.placeholder": "Seu nome",
    "contact.phone.label": "Contacto",
    "contact.phone.placeholder": "+351 000 000 000",
    "contact.email.label": "E-mail",
    "contact.email.placeholder": "seu@email.com",
    "contact.service.label": "Serviço Pretendido",
    "contact.service.placeholder": "Selecione um serviço",
    "contact.service.thermal": "Isolamento Térmico",
    "contact.service.rehab": "Reabilitação de Fachadas",
    "contact.service.painting": "Pintura Interior e Exterior",
    "contact.service.drones": "Vistoria Técnica com Drones",
    "contact.service.washing": "Lavagem e Manutenção de Fachadas",
    "contact.service.glass": "Limpeza de Vidros e Fachadas",
    "contact.service.awnings": "Toldos e Estruturas Metálicas",
    "contact.service.custom": "Serviços Personalizados",
    "contact.service.occasional": "Serviços Pontuais",
    "contact.service.other": "Outro",
    "contact.message.label": "Mensagem",
    "contact.message.placeholder": "Descreva o que precisa...",
    "contact.submit": "Enviar Mensagem",
    
    // Services section
    "services.header.label": "O que fazemos",
    "services.header.title": "Nossos Serviços",
    "services.header.desc": "Descubra a excelência da Alpainters na reabilitação e manutenção de edifícios",
    "services.quote": "Solicitar Orçamento",
    "services.thermal.label": "Capoto e Outras Soluções",
    "services.thermal.title": "Isolamento Térmico",
    "services.thermal.text1": "Oferecemos serviços de isolamento térmico, incluindo o sistema de capoto, para garantir eficiência energética e conforto nos edifícios. As nossas soluções maximizam a eficiência térmica, criando ambientes mais sustentáveis e diminuindo os custos de aquecimento e arrefecimento.",
    "services.thermal.text2": "Estamos comprometidos em cumprir rigorosamente as normas europeias de renovação energética, reduzindo o consumo de energia e o impacto ambiental.",
    "services.rehab.label": "Preservação e Renovação",
    "services.rehab.title": "Reabilitação de Fachadas",
    "services.rehab.text1": "A nossa equipa especializada oferece serviços que preservam e melhoram a estética e durabilidade dos edifícios. Seja para reparos, renovação ou manutenção, garantimos acabamentos de alta qualidade que protegem o seu imóvel das intempéries e do desgaste do tempo.",
    "services.rehab.text2": "Contribuímos também para a eficiência energética e sustentabilidade de cada edifício que tocamos.",
    "services.painting.label": "Beleza e Resistência",
    "services.painting.title": "Pintura Interior e Exterior",
    "services.painting.text1": "Oferecemos serviços profissionais de pintura de interiores e exteriores, utilizando materiais de alta qualidade e técnicas inovadoras. Combinamos beleza e resistência, garantindo acabamentos que valorizam o seu imóvel e asseguram a sua proteção a longo prazo.",
    "services.painting.text2": "Empregamos tintas ecológicas e métodos sustentáveis que reduzem o impacto ambiental, criando ambientes mais saudáveis.",
    "services.other.header.label": "Também fazemos",
    "services.other.header.title": "Outros Serviços",
    "services.other.drone.title": "Vistoria Técnica com Drones",
    "services.other.drone.desc": "Inspeções técnicas detalhadas com drones de última geração, oferecendo diagnósticos precisos e sem compromisso.",
    "services.other.washing.title": "Lavagem e Manutenção de Fachadas",
    "services.other.washing.desc": "Lavagem com produtos adequados, removendo sujidade, fungos e poluentes, preservando a integridade do edifício.",
    "services.other.glass.title": "Limpeza de Vidros e Fachadas",
    "services.other.glass.desc": "Limpeza impecável e segura em edifícios de difícil acesso, utilizando técnicas de alpinismo industrial.",
    "services.other.awnings.title": "Toldos e Estruturas Metálicas",
    "services.other.awnings.desc": "Instalação e manutenção de toldos e estruturas metálicas, garantindo estética, funcionalidade e resistência.",
    "services.other.custom.title": "Serviços Personalizados",
    "services.other.custom.desc": "Soluções à medida para cada cliente e edifício, desde a primeira vistoria até ao pós-venda.",
    "services.other.occasional.title": "Serviços Pontuais",
    "services.other.occasional.desc": "Pequenos reparos, substituição de elementos metálicos, impermeabilizantes e manutenção preventiva em locais de difícil acesso.",
    "services.solicitar": "Solicitar",
    
    // Projects section
    "projects.header.label": "Portfólio",
    "projects.header.title": "Projectos Recentes",
    "projects.header.desc": "Veja a nossa galeria de projetos recentes e o resultado do nosso trabalho",
    "projects.building": "Reabilitação de Edifícios",
    "projects.facade": "Fachada Residencial",
    "projects.insulation": "Isolamento Térmico",
    "projects.rope": "Alpinismo Industrial",
    "projects.height": "Trabalho em Altura",
    "projects.maintenance": "Manutenção de Fachadas",
    
    // Contact section header & info
    "contact.header.label": "Fique à Vontade",
    "contact.header.title": "Fale Connosco",
    "contact.header.desc": "Peça já o seu orçamento gratuito e sem compromisso",
    "contact.info.title": "Informações de Contato",
    "contact.phone.label": "Telefone",
    "contact.whatsapp.label": "WhatsApp",
    "contact.email.label": "E-mail",
    "contact.social.title": "Redes Sociais",
    
    // Footer
    "footer.social.connect": "Conecte com as nossas redes sociais",
    "footer.brand.subtitle": "Alpinismo Industrial",
    "footer.brand.desc": "Transformamos edifícios com técnicas avançadas de alpinismo industrial, garantindo qualidade e sustentabilidade.",
    "footer.nav.title": "Menu de Navegação",
    "footer.contact.title": "Contactos",
    "footer.rights": "© 2026 Alpainters. Todos os direitos reservados.",
    "footer.developer": "Desenvolvido por Everton Claudino",
    
    // Values section
    "values.header.label": "O Que Nos Define",
    "values.header.title": "Nossos Valores",
    "values.header.desc": "Os pilares que sustentam cada projeto e guiam a nossa excelência",
    "values.safety.title": "Segurança",
    "values.safety.desc": "Certificações IRATA, APCER, IMPIC e ISQ. Cada trabalho é executado com os mais altos padrões de proteção.",
    "values.quality.title": "Qualidade",
    "values.quality.desc": "Materiais premium e técnicas avançadas que garantem acabamentos impecáveis e duradouros.",
    "values.sustainability.title": "Sustentabilidade",
    "values.sustainability.desc": "Tintas ecológicas, métodos sustentáveis e eficiência energética em cada projeto.",
    "values.commitment.title": "Compromisso",
    "values.commitment.desc": "Prazos garantidos, orçamento gratuito e acompanhamento do início ao pós-venda.",
    
    // Pricing section
    "pricing.header.label": "Tabela de Preços",
    "pricing.header.title": "Nossos Preços",
    "pricing.header.desc": "Valores de referência para os nossos serviços. Solicite um orçamento personalizado para o seu projeto.",
    "pricing.popular": "Mais Pedido",
    "pricing.per": "/m²",
    "pricing.cta": "Pedir Orçamento Grátis",
    "pricing.disclaimer": "* Valores indicativos. O preço final depende da área, acessibilidade e complexidade do projeto. Solicite um orçamento gratuito.",
    "pricing.painting.title": "Pintura de Fachadas",
    "pricing.painting.subtext": "Interior e Exterior",
    "pricing.painting.price": "15",
    "pricing.painting.f1": "Preparação de superfície",
    "pricing.painting.f2": "2 demãos de tinta premium",
    "pricing.painting.f3": "Trabalho em altura incluído",
    "pricing.insulation.title": "Isolamento Térmico",
    "pricing.insulation.subtext": "Sistema Capoto ETICS",
    "pricing.insulation.price": "35",
    "pricing.insulation.f1": "Placa EPS ou XPS 80mm",
    "pricing.insulation.f2": "Reboco e acabamento texturado",
    "pricing.insulation.f3": "Certificação energética",
    "pricing.rehab.title": "Reabilitação",
    "pricing.rehab.subtext": "Fachadas e Edifícios",
    "pricing.rehab.price": "45",
    "pricing.rehab.f1": "Reparação de fissuras",
    "pricing.rehab.f2": "Impermeabilização completa",
    "pricing.rehab.f3": "Acabamento decorativo",
    "pricing.maintenance.title": "Limpeza e Manutenção",
    "pricing.maintenance.subtext": "Fachadas e Vidros",
    "pricing.maintenance.price": "8",
    "pricing.maintenance.f1": "Lavagem com produtos profissionais",
    "pricing.maintenance.f2": "Remoção de musgo e poluentes",
    "pricing.maintenance.f3": "Acesso por corda incluído"
  },
  en: {
    // Skip link
    "skip.content": "Skip to main content",

    // Nav
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.quote": "Quote",

    // Hero
    "hero.slide1.label": "AlPainters — Industrial Rope Access",
    "hero.slide1.title": "Rope Access",
    "hero.slide1.sub":
      "Industrial rope access solutions with quality and safety",
    "hero.slide2.label": "AlPainters — Industrial Rope Access",
    "hero.slide2.title": "Thermal Insulation",
    "hero.slide2.sub": "Energy efficiency and comfort for your building",
    "hero.slide3.label": "AlPainters — Industrial Rope Access",
    "hero.slide3.title": "Building Rehabilitation",
    "hero.slide3.sub":
      "We transform facades with advanced and sustainable techniques",
    "hero.buttons.quote": "Request a Quote",
    "hero.buttons.services": "Our Services",

    // Features
    "features.quote.title": "Free Quote",
    "features.quote.desc": "Tailor-made for you, no obligation",
    "features.deadline.title": "Guaranteed Deadline",
    "features.deadline.desc": "Your project delivered on agreed time",
    "features.quality.title": "Total Quality",
    "features.quality.desc": "Excellence at every maintenance phase",
    "features.certified.title": "Certified",
    "features.certified.desc": "IRATA • APCER • IMPIC • ISQ",
    "features.clients.title": "+27 Clients",
    "features.clients.desc": "Approved our solutions this year",

    // About
    "about.label": "About Alpainters",
    "about.title": "A little about us",
    "about.text1":
      "Alpainters was born from the passion to transform buildings and ensure their durability through advanced industrial rope access techniques. Founded by a dedicated entrepreneurial couple, it stands out for its innovative approach focused on quality, safety and sustainability.",
    "about.text2":
      "We combine the latest in technology, such as technical drone surveys, with a highly qualified team certified in working at height. Each service is tailored to meet the specific needs of facade rehabilitation and maintenance.",
    "about.text3":
      "At Alpainters, every project is a step towards a more sustainable world.",
    "about.button": "Know More",
    
    // Contact form
    "contact.name.label": "Full Name",
    "contact.name.placeholder": "Your name",
    "contact.phone.label": "Phone",
    "contact.phone.placeholder": "+351 000 000 000",
    "contact.email.label": "Email",
    "contact.email.placeholder": "your@email.com",
    "contact.service.label": "Desired Service",
    "contact.service.placeholder": "Select a service",
    "contact.service.thermal": "Thermal Insulation",
    "contact.service.rehab": "Facade Rehabilitation",
    "contact.service.painting": "Interior and Exterior Painting",
    "contact.service.drones": "Technical Drone Survey",
    "contact.service.washing": "Facade Washing and Maintenance",
    "contact.service.glass": "Glass and Facade Cleaning",
    "contact.service.awnings": "Awnings and Metal Structures",
    "contact.service.custom": "Customized Services",
    "contact.service.occasional": "Occasional Services",
    "contact.service.other": "Other",
    "contact.message.label": "Message",
    "contact.message.placeholder": "Describe what you need...",
    "contact.submit": "Send Message",
    
    // Services section
    "services.header.label": "What We Do",
    "services.header.title": "Our Services",
    "services.header.desc": "Discover Alpainters' excellence in rehabilitation and building maintenance",
    "services.quote": "Request a Quote",
    "services.thermal.label": "ETICS and Other Solutions",
    "services.thermal.title": "Thermal Insulation",
    "services.thermal.text1": "We offer thermal insulation services, including ETICS (External Thermal Insulation Composite System), to ensure energy efficiency and comfort in buildings. Our solutions maximize thermal efficiency, creating more sustainable environments and reducing heating and cooling costs.",
    "services.thermal.text2": "We are committed to strictly complying with European energy renovation standards, reducing energy consumption and environmental impact.",
    "services.rehab.label": "Preservation and Renovation",
    "services.rehab.title": "Facade Rehabilitation",
    "services.rehab.text1": "Our specialized team offers services that preserve and enhance the aesthetics and durability of buildings. Whether for repairs, renovation or maintenance, we guarantee high-quality finishes that protect your property from weathering and wear over time.",
    "services.rehab.text2": "We also contribute to the energy efficiency and sustainability of every building we work on.",
    "services.painting.label": "Beauty and Durability",
    "services.painting.title": "Interior and Exterior Painting",
    "services.painting.text1": "We offer professional interior and exterior painting services, using high-quality materials and innovative techniques. We combine beauty and durability, ensuring finishes that enhance your property and ensure long-lasting protection.",
    "services.painting.text2": "We use eco-friendly paints and sustainable methods that reduce environmental impact, creating healthier environments.",
    "services.other.header.label": "We Also Do",
    "services.other.header.title": "Other Services",
    "services.other.drone.title": "Technical Drone Survey",
    "services.other.drone.desc": "Detailed technical inspections with state-of-the-art drones, offering precise diagnostics at no commitment.",
    "services.other.washing.title": "Facade Washing and Maintenance",
    "services.other.washing.desc": "Washing with appropriate products, removing dirt, fungi and pollutants, preserving the building's integrity.",
    "services.other.glass.title": "Glass and Facade Cleaning",
    "services.other.glass.desc": "Impeccable and safe cleaning in hard-to-reach buildings, using industrial rope access techniques.",
    "services.other.awnings.title": "Awnings and Metal Structures",
    "services.other.awnings.desc": "Installation and maintenance of awnings and metal structures, ensuring aesthetics, functionality and durability.",
    "services.other.custom.title": "Customized Services",
    "services.other.custom.desc": "Tailored solutions for each client and building, from the initial survey to after-sales support.",
    "services.other.occasional.title": "Occasional Services",
    "services.other.occasional.desc": "Small repairs, replacement of metal elements, waterproofing and preventive maintenance in hard-to-reach locations.",
    "services.solicitar": "Request",
    
    // Projects section
    "projects.header.label": "Portfolio",
    "projects.header.title": "Recent Projects",
    "projects.header.desc": "See our gallery of recent projects and the results of our work",
    "projects.building": "Building Rehabilitation",
    "projects.facade": "Residential Facade",
    "projects.insulation": "Thermal Insulation",
    "projects.rope": "Industrial Rope Access",
    "projects.height": "Working at Height",
    "projects.maintenance": "Facade Maintenance",
    
    // Contact section header & info
    "contact.header.label": "Feel Free",
    "contact.header.title": "Contact Us",
    "contact.header.desc": "Request your free, no-obligation quote now",
    "contact.info.title": "Contact Information",
    "contact.phone.label": "Phone",
    "contact.whatsapp.label": "WhatsApp",
    "contact.email.label": "Email",
    "contact.social.title": "Social Media",
    
    // Footer
    "footer.social.connect": "Connect with our social media",
    "footer.brand.subtitle": "Industrial Rope Access",
    "footer.brand.desc": "We transform buildings with advanced industrial rope access techniques, ensuring quality and sustainability.",
    "footer.nav.title": "Navigation Menu",
    "footer.contact.title": "Contact",
    "footer.rights": "© 2026 Alpainters. All rights reserved.",
    "footer.developer": "Developed by Everton Claudino",
    
    // Values section
    "values.header.label": "What Defines Us",
    "values.header.title": "Our Values",
    "values.header.desc": "The pillars that support every project and guide our excellence",
    "values.safety.title": "Safety",
    "values.safety.desc": "IRATA, APCER, IMPIC and ISQ certifications. Every job is executed with the highest protection standards.",
    "values.quality.title": "Quality",
    "values.quality.desc": "Premium materials and advanced techniques that guarantee impeccable and lasting finishes.",
    "values.sustainability.title": "Sustainability",
    "values.sustainability.desc": "Eco-friendly paints, sustainable methods and energy efficiency in every project.",
    "values.commitment.title": "Commitment",
    "values.commitment.desc": "Guaranteed deadlines, free quotes and support from start to after-sales.",
    
    // Pricing section
    "pricing.header.label": "Price List",
    "pricing.header.title": "Our Prices",
    "pricing.header.desc": "Reference values for our services. Request a personalized quote for your project.",
    "pricing.popular": "Most Popular",
    "pricing.per": "/m²",
    "pricing.cta": "Get Free Quote",
    "pricing.disclaimer": "* Indicative values. The final price depends on area, accessibility and project complexity. Request a free quote.",
    "pricing.painting.title": "Facade Painting",
    "pricing.painting.subtext": "Interior and Exterior",
    "pricing.painting.price": "15",
    "pricing.painting.f1": "Surface preparation",
    "pricing.painting.f2": "2 coats of premium paint",
    "pricing.painting.f3": "Working at height included",
    "pricing.insulation.title": "Thermal Insulation",
    "pricing.insulation.subtext": "ETICS System",
    "pricing.insulation.price": "35",
    "pricing.insulation.f1": "EPS or XPS board 80mm",
    "pricing.insulation.f2": "Render and textured finish",
    "pricing.insulation.f3": "Energy certification",
    "pricing.rehab.title": "Rehabilitation",
    "pricing.rehab.subtext": "Facades and Buildings",
    "pricing.rehab.price": "45",
    "pricing.rehab.f1": "Crack repair",
    "pricing.rehab.f2": "Complete waterproofing",
    "pricing.rehab.f3": "Decorative finish",
    "pricing.maintenance.title": "Cleaning and Maintenance",
    "pricing.maintenance.subtext": "Facades and Glass",
    "pricing.maintenance.price": "8",
    "pricing.maintenance.f1": "Washing with professional products",
    "pricing.maintenance.f2": "Moss and pollutant removal",
    "pricing.maintenance.f3": "Rope access included"
  },
};

let currentLang = localStorage.getItem("alpainters-lang") || "pt";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("alpainters-lang", lang);

  // Update HTML lang attribute
  document.documentElement.lang = lang === "pt" ? "pt" : "en";

  // Update all elements with data-i18n (textContent)
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
  
  // Update placeholders with data-i18n-placeholder
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang] && translations[lang][key]) {
      el.placeholder = translations[lang][key];
    }
  });

  // Update language switcher buttons
  const langLabel = document.getElementById("lang-label");
  const langLabelMobile = document.getElementById("lang-label-mobile");
  const langSwitcher = document.getElementById("lang-switcher");
  const langSwitcherMobile = document.getElementById("lang-switcher-mobile");

  if (lang === "pt") {
    if (langLabel) langLabel.textContent = "EN";
    if (langLabelMobile) langLabelMobile.textContent = "EN";
    if (langSwitcher)
      langSwitcher.setAttribute("aria-label", "Mudar idioma para Inglês");
    if (langSwitcherMobile)
      langSwitcherMobile.setAttribute("aria-label", "Mudar idioma para Inglês");
  } else {
    if (langLabel) langLabel.textContent = "PT";
    if (langLabelMobile) langLabelMobile.textContent = "PT";
    if (langSwitcher)
      langSwitcher.setAttribute("aria-label", "Switch language to Portuguese");
    if (langSwitcherMobile)
      langSwitcherMobile.setAttribute(
        "aria-label",
        "Switch language to Portuguese",
      );
  }

  // Update skip link
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) {
    skipLink.textContent = translations[lang]["skip.content"];
  }
}

// Initialize language on page load
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);

  // Language switcher event listeners
  const langSwitcher = document.getElementById("lang-switcher");
  const langSwitcherMobile = document.getElementById("lang-switcher-mobile");

  if (langSwitcher) {
    langSwitcher.addEventListener("click", () => {
      const newLang = currentLang === "pt" ? "en" : "pt";
      setLanguage(newLang);
    });
  }

  if (langSwitcherMobile) {
    langSwitcherMobile.addEventListener("click", () => {
      const newLang = currentLang === "pt" ? "en" : "pt";
      setLanguage(newLang);
    });
  }
});

/* ══════════════════════════════════════
   FECHAR MENU MOBILE ao clicar num link
══════════════════════════════════════ */
document.querySelectorAll('#mobile-menu a[href^="#"]').forEach((link) => {
  link.addEventListener("click", () => {
    menuOpen = false;
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
    hamburgerBtn.classList.remove("is-active");
  });
});
