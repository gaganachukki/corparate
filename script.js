
// PRELOADER
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    if (preloader) {
      preloader.classList.add("hidden");
    }
  }, 3000);
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});


window.addEventListener("scroll", () => {
  const nav = document.querySelector(".navbar");
  nav.style.background =
    window.scrollY > 50 ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.6)";
});

// COUNT ANIMATION
const stats = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats");

const countUp = (el) => {
  const target = +el.getAttribute("data-target");
  const count = +el.innerText;
  const speed = 200; // Lower is faster
  const inc = target / speed;

  if (count < target) {
    el.innerText = Math.ceil(count + inc);
    setTimeout(() => countUp(el), 1);
  } else {
    el.innerText = target;
  }
};

let animated = false;
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !animated) {
    stats.forEach(countUp);
    animated = true;
  }
}, { threshold: 0.5 });

if (statsSection) {
  observer.observe(statsSection);
}

// CTA VALIDATION
const ctaSubmit = document.getElementById("cta-submit");
const ctaEmail = document.getElementById("cta-email");

if (ctaSubmit && ctaEmail) {
  ctaSubmit.addEventListener("click", () => {
    if (ctaEmail.value.trim() === "") {
      ctaEmail.placeholder = "Please enter your email id!";
      ctaEmail.classList.add("error");
      
      // Reset error state after 3 seconds
      setTimeout(() => {
        ctaEmail.placeholder = "Enter your email address";
        ctaEmail.classList.remove("error");
      }, 3000);
    } else {
      // Redirect to 404.html when email is entered
      window.location.href = "404.html";
    }
  });
}

// MOBILE SIDEBAR
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    // Toggle between bars and times icon
    const icon = hamburger.querySelector("i");
    if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });

  // Close sidebar when a link is clicked
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active");
      const icon = hamburger.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    });
  });
}