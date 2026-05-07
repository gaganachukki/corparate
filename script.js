
// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const heroContent = document.querySelector(".hero-content");
  
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("hidden");
    }
    // Start hero animation after preloader is hidden
    if (heroContent) {
      heroContent.classList.add("animate");
    }
  }, 3000);
});

// HERO PARALLAX EFFECT
const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");

if (hero && heroContent) {
  hero.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const moveX = (clientX - centerX) / 50;
    const moveY = (clientY - centerY) / 50;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
}

// REVEAL ON SCROLL
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => revealObserver.observe(el));


window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
});

// COUNT ANIMATION
const stats = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats");

const countUp = (el) => {
  const target = +el.getAttribute("data-target");
  const count = +el.innerText;
  const speed = 100; 
  const inc = target / speed;

  if (count < target) {
    el.innerText = Math.ceil(count + inc);
    setTimeout(() => countUp(el), 20);
  } else {
    el.innerText = target;
  }
};

let animated = false;
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !animated) {
    stats.forEach(countUp);
    animated = true;
  }
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

// CTA VALIDATION
const ctaSubmit = document.getElementById("cta-submit");
const ctaEmail = document.getElementById("cta-email");

if (ctaSubmit && ctaEmail) {
  ctaSubmit.addEventListener("click", () => {
    if (ctaEmail.value.trim() === "") {
      ctaEmail.placeholder = "Please enter your email id!";
      ctaEmail.classList.add("error");
      
      setTimeout(() => {
        ctaEmail.placeholder = "Enter your email address";
        ctaEmail.classList.remove("error");
      }, 3000);
    } else {
      window.location.href = "404.html";
    }
  });
}

// MOBILE SIDEBAR
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links li a");
const sidebarClose = document.getElementById("sidebar-close");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "auto";
  });

  if (sidebarClose) {
    sidebarClose.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });
}