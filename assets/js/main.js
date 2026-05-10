/*=============== LANGUAGE STATE ===============*/
let currentLanguage = localStorage.getItem('portfolio-language') || 'fr';

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');
  navMenu.classList.remove('show-menu');
};

navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById('header');
  if (window.scrollY >= 50) {
    header.classList.add('shadow-header');
  } else {
    header.classList.remove('shadow-header');
  }
};
window.addEventListener('scroll', shadowHeader);

/*=============== CONTACT FORM - GMAIL WEB ===============*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !subject || !message) {
      contactMessage.textContent = currentLanguage === 'en' ? 'Please fill in all fields before sending.' : 'Veuillez remplir tous les champs avant l’envoi.';
      contactMessage.style.color = '#ff4d1c';
      return;
    }

    const destination = 'iazzaanas22@gmail.com';
    const body = currentLanguage === 'en'
      ? `Full name: ${name}\nEmail address: ${email}\n\nMessage:\n${message}`
      : `Nom complet : ${name}\nAdresse email : ${email}\n\nMessage :\n${message}`;

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(destination)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    const gmailWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    if (!gmailWindow) {
      window.location.href = gmailUrl;
    }

    contactMessage.textContent = currentLanguage === 'en' ? 'Gmail will open in a new tab with the message already filled in.' : 'Gmail va s’ouvrir dans un nouvel onglet avec le message déjà rempli.';
    contactMessage.style.color = '#fff';

    setTimeout(() => {
      contactMessage.textContent = '';
    }, 6000);
  });
}

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById('scroll-up');
  if (window.scrollY >= 350) {
    scrollUp.classList.add('show-scroll');
  } else {
    scrollUp.classList.remove('show-scroll');
  }
};
window.addEventListener('scroll', scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scrollDown = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 58,
          sectionId = current.getAttribute('id'),
          sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if (sectionsClass) {
      if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
        sectionsClass.classList.add('active-link');
      } else {
        sectionsClass.classList.remove('active-link');
      }
    }
  });
};
window.addEventListener('scroll', scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 1800,
    delay: 250,
  });

  sr.reveal('.home__perfil, .about__image, .contact__mail', {origin: 'right'});
  sr.reveal('.home__name, .home__info, .about__container .section__title-1, .about__info, .contact__data', {origin: 'left'});
  sr.reveal('.services__card, .skills__card, .projects__card', {interval: 100});
}

/*=============== PREMIUM PROJECTS SLIDER ===============*/
const projectSlides = document.querySelectorAll('.project-slide');
const projectPrev = document.getElementById('project-prev');
const projectNext = document.getElementById('project-next');
const projectsCounter = document.getElementById('projects-counter');
let currentProject = 0;

function showProject(index) {
  if (!projectSlides.length) return;

  projectSlides[currentProject].classList.remove('is-active');
  currentProject = (index + projectSlides.length) % projectSlides.length;
  projectSlides[currentProject].classList.add('is-active');

  if (projectsCounter) {
    const current = String(currentProject + 1).padStart(2, '0');
    const total = String(projectSlides.length).padStart(2, '0');
    projectsCounter.textContent = `${current} / ${total}`;
  }
}

if (projectNext) {
  projectNext.addEventListener('click', () => showProject(currentProject + 1));
}

if (projectPrev) {
  projectPrev.addEventListener('click', () => showProject(currentProject - 1));
}

window.addEventListener('keydown', (event) => {
  const projectsSection = document.getElementById('projects');
  if (!projectsSection) return;

  const rect = projectsSection.getBoundingClientRect();
  const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

  if (isVisible && event.key === 'ArrowRight') showProject(currentProject + 1);
  if (isVisible && event.key === 'ArrowLeft') showProject(currentProject - 1);
});

/*=============== LANGUAGE SWITCHER FR / EN ===============*/
const languageButtons = document.querySelectorAll('[data-lang]');

const languageContent = {
  fr: {
    pageTitle: 'Anas Iazza | Portfolio Conception, Simulation & IA',
    navTitle: 'Menu',
    nav: ['Accueil', 'À propos', 'Expertise', 'Skills', 'Projets', 'Certificats', 'Contact'],
    homeEyebrow: '<span class="home__eyebrow-dot"></span>INGÉNIEUR EN DEVENIR',
    homeDescription: '<b>Élève ingénieur en Génie Aéronautique et Technologies de l’Espace à l’ENSA Safi</b>, spécialisé en conception mécanique, simulation CFD, analyse de données et systèmes embarqués. Je recherche un stage PFA d’un mois en juillet 2026.',
    cvButton: '<i class="ri-file-text-line"></i> Voir mon CV',
    discover: 'Découvrir',
    aboutTitle: 'À propos<span>.</span>',
    aboutLead: 'Étudiant en 1re année du cycle d’ingénieur en <b>Génie Aéronautique et Technologies de l’Espace</b>, je construis un profil technique solide et polyvalent.',
    aboutHighlights: [
      'Passionné par la <b>CAO</b>, l’<b>aérodynamique</b> et la <b>simulation CFD</b>',
      'Attiré par l’<b>analyse de données</b> et la <b>modélisation numérique</b>',
      'Intéressé par les <b>systèmes embarqués</b> et les technologies innovantes'
    ],
    aboutClosing: 'Rigoureux, curieux et orienté projets, je recherche un <b>stage PFA d’un mois en juillet 2026</b> pour contribuer à des projets concrets et relever de nouveaux défis.',
    aboutContact: '<i class="ri-send-plane-line"></i><span>Me contacter</span><i class="ri-arrow-right-line"></i>',
    download: 'Télécharger',
    linkedinProfile: 'Voir le profil',
    servicesEyebrow: 'MON',
    servicesTitle: 'EXPERTISE<span>.</span>',
    servicesSummary: 'Des compétences complémentaires au service de projets techniques, de la conception et la simulation à l’automatisation intelligente.',
    serviceCards: [
      ['Conception &amp; Simulation', 'Création de modèles, simulateurs, interfaces techniques et outils de suivi inspirés des besoins de conception et d’analyse modernes.'],
      ['Développement Python', 'Création d’applications avec Python, PyQt5 et CustomTkinter pour visualiser, contrôler et analyser des données techniques.'],
      ['IA &amp; Automatisation', 'Intégration d’outils IA, computer vision, dashboards intelligents et workflows Node-RED pour des systèmes plus dynamiques.']
    ],
    skillsTitle: 'Skills.',
    skillsIntro: 'Les outils que j’utilise pour concevoir, simuler, développer, automatiser et visualiser des solutions techniques.',
    projectsTitle: 'Projets.',
    projectsIntro: 'Sélection de projets techniques présentés sous forme de slider professionnel : conception, data, IA, interfaces aéronautiques et systèmes intelligents.',
    projectNavPrev: 'Projet précédent',
    projectNavNext: 'Projet suivant',
    techLabel: 'Technologies utilisées',
    projects: [
      ['Aviation Data', 'AeroAnalytics Aviation Dashboard', 'Dashboard aviation orienté analyse de données, visualisation de KPI techniques et présentation claire des informations pour le suivi aéronautique.'],
      ['IA &amp; Maintenance', 'Aircraft Engine Predictive Maintenance', 'Projet de maintenance prédictive appliqué aux moteurs d’avion, utilisant l’analyse de données et le machine learning pour anticiper les défaillances.'],
      ['Business Intelligence', 'Power BI HSE Dashboard', 'Tableau de bord HSE réalisé avec Power BI pour suivre les indicateurs de sécurité, analyser les tendances et faciliter la lecture des performances.'],
      ['CAO 3D', 'Cessna Aircraft SolidWorks Model', 'Modélisation 3D d’un avion Cessna sous SolidWorks, avec une approche orientée conception mécanique, assemblage et présentation technique.'],
      ['IoT &amp; Automatisation', 'AeroSync Node-RED IoT Aircraft Monitoring', 'Workflow de monitoring aéronautique avec Node-RED, logique automatisée, traitement de signaux et visualisation dynamique des données techniques.'],
      ['Simulation &amp; Interface', 'Aero Manager PyQt5', 'Interface aéronautique développée en Python/PyQt5 pour gérer des paramètres de vol, visualiser des données et offrir une expérience cockpit professionnelle.'],
      ['Computer Vision &amp; Safety', 'AEROFOD Vision Pro', 'Plateforme intelligente de détection FOD sur piste aéroportuaire, conçue pour automatiser l’inspection visuelle et assister la décision opérationnelle.'],
      ['Assistant IA &amp; Analyse Documentaire', 'AeroAssist Nova', 'Assistant aéronautique professionnel conçu pour le chat, l’analyse documentaire, les résumés techniques et l’assistance guidée dans une interface moderne.']
    ],
    certificatesTitle: 'Certificats.',
    certificatesIntro: 'Une sélection de certificats qui illustrent mon intérêt pour la <b>data visualisation</b>, la <b>business intelligence</b> et la conception d’outils analytiques professionnels.',
    pdfBadge: '<i class="ri-verified-badge-line"></i> PDF officiel',
    certificateSchool: 'YaneCode Academy',
    certificateName: 'Data Visualisation &amp; Business Intelligence',
    certificateDescription: 'Certificat de formation centré sur la visualisation de données, Python, l’analyse de données, l’automatisation, Power BI et la création de tableaux de bord interactifs pour l’aide à la décision.',
    certificateList: [
      '<i class="ri-check-line"></i> Support PDF intégré au portfolio',
      '<i class="ri-check-line"></i> Aperçu visuel du certificat',
      '<i class="ri-check-line"></i> Lien officiel + PDF intégré'
    ],
    certificateOfficial: '<i class="ri-external-link-line"></i> Voir le certificat',
    certificatePdf: '<i class="ri-download-line"></i> Ouvrir le PDF',
    contactTitle: 'Contact.',
    contactDescription1: 'Pour une opportunité de stage, une collaboration technique ou un projet en conception, simulation, data ou IA, vous pouvez me contacter directement.',
    contactDescription2: 'Email : <b>iazzaanas22@gmail.com</b><br>LinkedIn : <b>anas-iazza</b> • GitHub : <b>anas-iazza</b>',
    contactFormTitle: 'Envoyer un message',
    form: {
      name: 'Nom complet',
      email: 'Adresse email',
      subject: 'Objet',
      message: 'Message',
      send: '<i class="ri-send-plane-line"></i> Envoyer'
    },
    contactSocial1: 'Le formulaire est en mode démo.',
    contactSocial2: 'Contactez-moi directement via mes liens professionnels.',
    footer: ['À propos', 'Expertise', 'Skills', 'Projets'],
    footerCopy: '&#169; 2026 Anas Iazza. Portfolio adapté sur un style Bedimcode.'
  },
  en: {
    pageTitle: 'Anas Iazza | Design, Simulation & AI Portfolio',
    navTitle: 'Menu',
    nav: ['Home', 'About', 'Expertise', 'Skills', 'Projects', 'Certificates', 'Contact'],
    homeEyebrow: '<span class="home__eyebrow-dot"></span>ENGINEER IN PROGRESS',
    homeDescription: '<b>Engineering student in Aeronautical Engineering and Space Technologies at ENSA Safi</b>, specialized in mechanical design, CFD simulation, data analysis and embedded systems. I am looking for a one-month PFA internship in July 2026.',
    cvButton: '<i class="ri-file-text-line"></i> View my CV',
    discover: 'Discover',
    aboutTitle: 'About<span>.</span>',
    aboutLead: 'First-year engineering student in <b>Aeronautical Engineering and Space Technologies</b>, building a solid and versatile technical profile.',
    aboutHighlights: [
      'Passionate about <b>CAD</b>, <b>aerodynamics</b> and <b>CFD simulation</b>',
      'Interested in <b>data analysis</b> and <b>numerical modeling</b>',
      'Focused on <b>embedded systems</b> and innovative technologies'
    ],
    aboutClosing: 'Rigorous, curious and project-oriented, I am looking for a <b>one-month PFA internship in July 2026</b> to contribute to concrete projects and take on new challenges.',
    aboutContact: '<i class="ri-send-plane-line"></i><span>Contact me</span><i class="ri-arrow-right-line"></i>',
    download: 'Download',
    linkedinProfile: 'View profile',
    servicesEyebrow: 'MY',
    servicesTitle: 'EXPERTISE<span>.</span>',
    servicesSummary: 'Complementary skills dedicated to technical projects, from design and simulation to intelligent automation.',
    serviceCards: [
      ['Design &amp; Simulation', 'Creation of models, simulators, technical interfaces and monitoring tools inspired by modern design and analysis needs.'],
      ['Python Development', 'Development of Python, PyQt5 and CustomTkinter applications to visualize, control and analyze technical data.'],
      ['AI &amp; Automation', 'Integration of AI tools, computer vision, intelligent dashboards and Node-RED workflows for more dynamic systems.']
    ],
    skillsTitle: 'Skills.',
    skillsIntro: 'Tools I use to design, simulate, develop, automate and visualize technical solutions.',
    projectsTitle: 'Projects.',
    projectsIntro: 'A selection of technical projects presented as a professional slider: design, data, AI, aeronautical interfaces and intelligent systems.',
    projectNavPrev: 'Previous project',
    projectNavNext: 'Next project',
    techLabel: 'Technologies used',
    projects: [
      ['Aviation Data', 'AeroAnalytics Aviation Dashboard', 'Aviation dashboard focused on data analysis, technical KPI visualization and clear presentation of information for aeronautical monitoring.'],
      ['AI &amp; Maintenance', 'Aircraft Engine Predictive Maintenance', 'Predictive maintenance project applied to aircraft engines, using data analysis and machine learning to anticipate failures.'],
      ['Business Intelligence', 'Power BI HSE Dashboard', 'HSE dashboard built with Power BI to monitor safety indicators, analyze trends and support performance reading.'],
      ['3D CAD', 'Cessna Aircraft SolidWorks Model', '3D modeling of a Cessna aircraft in SolidWorks, with a mechanical design, assembly and technical presentation approach.'],
      ['IoT &amp; Automation', 'AeroSync Node-RED IoT Aircraft Monitoring', 'Aeronautical monitoring workflow with Node-RED, automated logic, signal processing and dynamic visualization of technical data.'],
      ['Simulation &amp; Interface', 'Aero Manager PyQt5', 'Aeronautical interface developed in Python/PyQt5 to manage flight parameters, visualize data and provide a professional cockpit experience.'],
      ['Computer Vision &amp; Safety', 'AEROFOD Vision Pro', 'Intelligent FOD detection platform for airport runways, designed to automate visual inspection and support operational decisions.'],
      ['AI Assistant &amp; Document Analysis', 'AeroAssist Nova', 'Professional aeronautical assistant designed for chat, document analysis, technical summaries and guided assistance through a modern interface.']
    ],
    certificatesTitle: 'Certificates.',
    certificatesIntro: 'A selection of certificates showing my interest in <b>data visualization</b>, <b>business intelligence</b> and the design of professional analytical tools.',
    pdfBadge: '<i class="ri-verified-badge-line"></i> Official PDF',
    certificateSchool: 'YaneCode Academy',
    certificateName: 'Data Visualisation &amp; Business Intelligence',
    certificateDescription: 'Training certificate focused on data visualization, Python, data analysis, automation, Power BI and the creation of interactive dashboards for decision support.',
    certificateList: [
      '<i class="ri-check-line"></i> PDF support integrated into the portfolio',
      '<i class="ri-check-line"></i> Visual certificate preview',
      '<i class="ri-check-line"></i> Official link + integrated PDF'
    ],
    certificateOfficial: '<i class="ri-external-link-line"></i> View certificate',
    certificatePdf: '<i class="ri-download-line"></i> Open PDF',
    contactTitle: 'Contact.',
    contactDescription1: 'For an internship opportunity, a technical collaboration or a project in design, simulation, data or AI, you can contact me directly.',
    contactDescription2: 'Email: <b>iazzaanas22@gmail.com</b><br>LinkedIn: <b>anas-iazza</b> • GitHub: <b>anas-iazza</b>',
    contactFormTitle: 'Send a message',
    form: {
      name: 'Full name',
      email: 'Email address',
      subject: 'Subject',
      message: 'Message',
      send: '<i class="ri-send-plane-line"></i> Send'
    },
    contactSocial1: 'The form is in demo mode.',
    contactSocial2: 'Contact me directly through my professional links.',
    footer: ['About', 'Expertise', 'Skills', 'Projects'],
    footerCopy: '&#169; 2026 Anas Iazza. Portfolio adapted from a Bedimcode style.'
  }
};

function setHTML(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.innerHTML = value;
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function setAllText(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.textContent = values[index];
  });
}

function setAllHTML(selector, values) {
  document.querySelectorAll(selector).forEach((element, index) => {
    if (values[index] !== undefined) element.innerHTML = values[index];
  });
}

function applyLanguage(lang) {
  const t = languageContent[lang] || languageContent.fr;
  currentLanguage = lang;
  document.documentElement.lang = lang;
  document.title = t.pageTitle;
  localStorage.setItem('portfolio-language', lang);

  setText('.nav__title', t.navTitle);
  setAllText('.nav__list .nav__link', t.nav);
  setHTML('.home__eyebrow', t.homeEyebrow);
  setHTML('.home__description', t.homeDescription);
  setHTML('.home__buttons .button', t.cvButton);
  setText('.home__scroll-text', t.discover);

  setHTML('.about__title', t.aboutTitle);
  setHTML('.about__lead', t.aboutLead);
  setAllHTML('.about__highlight span', t.aboutHighlights);
  setHTML('.about__closing', t.aboutClosing);
  setHTML('.about__contact-button', t.aboutContact);
  setText('.about__mini-card:nth-of-type(2) small', t.download);
  setText('.about__mini-card:nth-of-type(3) small', t.linkedinProfile);

  setText('.services__eyebrow', t.servicesEyebrow);
  setHTML('.services__main-title', t.servicesTitle);
  setText('.services__summary', t.servicesSummary);
  document.querySelectorAll('.services__card').forEach((card, index) => {
    if (!t.serviceCards[index]) return;
    const title = card.querySelector('.services__title');
    const desc = card.querySelector('.services__description');
    if (title) title.innerHTML = t.serviceCards[index][0];
    if (desc) desc.textContent = t.serviceCards[index][1];
  });

  setText('#skills .section__title-1 span', t.skillsTitle);
  setText('.skills__intro', t.skillsIntro);

  setText('.projects__heading span', t.projectsTitle);
  setText('.projects__intro', t.projectsIntro);
  if (projectPrev) projectPrev.setAttribute('aria-label', t.projectNavPrev);
  if (projectNext) projectNext.setAttribute('aria-label', t.projectNavNext);
  document.querySelectorAll('.project-slide').forEach((slide, index) => {
    if (!t.projects[index]) return;
    const category = slide.querySelector('.project-slide__category');
    const title = slide.querySelector('.project-slide__title');
    const desc = slide.querySelector('.project-slide__description');
    const techs = slide.querySelector('.project-slide__techs');
    if (category) category.innerHTML = t.projects[index][0];
    if (title) title.textContent = t.projects[index][1];
    if (desc) desc.textContent = t.projects[index][2];
    if (techs) techs.setAttribute('aria-label', t.techLabel);
  });

  setText('#certificates .section__title-2 span', t.certificatesTitle);
  setHTML('.certificates__intro', t.certificatesIntro);
  setHTML('.certificates__badge', t.pdfBadge);
  setText('.certificates__content .projects__subtitle', t.certificateSchool);
  setHTML('.certificates__content .projects__title', t.certificateName);
  setText('.certificates__content .projects__description', t.certificateDescription);
  setAllHTML('.certificates__list li', t.certificateList);
  const certificateLinks = document.querySelectorAll('.certificates__content .projects__link');
  if (certificateLinks[0]) certificateLinks[0].innerHTML = t.certificateOfficial;
  if (certificateLinks[1]) certificateLinks[1].innerHTML = t.certificatePdf;

  setText('#contact .section__title-2 span', t.contactTitle);
  setText('.contact__description-1', t.contactDescription1);
  setHTML('.contact__description-2', t.contactDescription2);
  setText('.contact__title', t.contactFormTitle);
  setText('label[for="name"]', t.form.name);
  setText('label[for="email"]', t.form.email);
  setText('label[for="subject"]', t.form.subject);
  setText('label[for="message"]', t.form.message);
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const subjectInput = document.getElementById('subject');
  const messageInput = document.getElementById('message');
  if (nameInput) nameInput.placeholder = t.form.name;
  if (emailInput) emailInput.placeholder = t.form.email;
  if (subjectInput) subjectInput.placeholder = t.form.subject;
  if (messageInput) messageInput.placeholder = t.form.message;
  setHTML('.contact__button', t.form.send);
  setText('.contact__social-description-1', t.contactSocial1);
  setText('.contact__social-description-2', t.contactSocial2);

  setAllText('.footer__link', t.footer);
  setHTML('.footer__copy', t.footerCopy);

  languageButtons.forEach(button => {
    button.classList.toggle('is-active', button.dataset.lang === lang);
  });
}

languageButtons.forEach(button => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

applyLanguage(currentLanguage);
