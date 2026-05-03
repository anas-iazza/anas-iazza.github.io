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
      contactMessage.textContent = 'Veuillez remplir tous les champs avant l’envoi.';
      contactMessage.style.color = '#ff4d1c';
      return;
    }

    const destination = 'iazzaanas22@gmail.com';
    const body = `Nom complet : ${name}\nAdresse email : ${email}\n\nMessage :\n${message}`;

    const gmailUrl =
      'https://mail.google.com/mail/?view=cm&fs=1' +
      `&to=${encodeURIComponent(destination)}` +
      `&su=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    const gmailWindow = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    if (!gmailWindow) {
      window.location.href = gmailUrl;
    }

    contactMessage.textContent = 'Gmail va s’ouvrir dans un nouvel onglet avec le message déjà rempli.';
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
