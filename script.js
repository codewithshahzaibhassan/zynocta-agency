// open or close mobile navbar
const navbar = document.querySelector(".navbar");
const closeBtn = document.querySelector(".navbar .xmark");
const openBtn = document.querySelector("nav .bar-chart"); // your hamburger button
// Select all links inside nav-item ul li
const navLinks = document.querySelectorAll(".nav-item ul li a");
// Close navbar // sticky navbar function Logic
// Select all navbar links

function Navbar() {
  closeBtn.addEventListener("click", () => {
    navbar.classList.remove("active");
  });

  // Open navbar
  openBtn.addEventListener("click", () => {
    navbar.classList.add("active");
  });
  //    sticky navbar
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      // scroll 50px ke baad
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}
// call Navbar fnc
Navbar();

//   pre loder  function Logic
function Preloader() {
  window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 0.5s ease";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  });
}
Preloader();

function clossNavbarOnLinkClick() {
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navbar.classList.remove("active");
    });
  });
}
clossNavbarOnLinkClick();
// Aos Animation library
AOS.init({
  once: false,
  duration: 900,
  easing: "ease-out-cubic",
  offset: 100,
});

// Animated progress bars + % counter (one-time)
const spans = document.querySelectorAll(".progress span");
let animationDone = false;
function animateProgressBars() {
  window.addEventListener("scroll", () => {
    const section = document.querySelector(".why-us");
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scroll = window.scrollY;
    const windowHeight = window.innerHeight;

    if (
      !animationDone &&
      scroll > sectionTop + sectionHeight - windowHeight - 100
    ) {
      spans.forEach((span) => {
        const target = parseInt(span.dataset.width);
        span.style.width = target + "%";

        let percent = 0;
        const counter = setInterval(() => {
          if (percent < target) {
            percent++;
            span.querySelector("b").innerText = percent + "%";
          } else {
            clearInterval(counter);
          }
        }, 15);
      });
      animationDone = true;
    }
  });
}
animateProgressBars();
// countersection
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function startCounters() {
  window.addEventListener("scroll", () => {
    let section = document.querySelector(".counter-section");
    let sectionTop = section.offsetTop;
    let sectionHeight = section.offsetHeight;
    let scroll = window.scrollY;
    let windowHeight = window.innerHeight;

    if (
      !counterStarted &&
      scroll > sectionTop + sectionHeight - windowHeight - 100
    ) {
      counters.forEach((counter) => {
        let target = +counter.dataset.target;
        let count = 0;
        let update = () => {
          let increment = target / 100; // speed
          if (count < target) {
            count += increment;
            counter.innerText = Math.floor(count);
            setTimeout(update, 20);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
      counterStarted = true;
    }
  });
}
startCounters();

const track = document.getElementById("sliderTrack");
const dotsContainer = document.getElementById("dots");
const cards = Array.from(track.children);

let currentIndex = 0;
let autoPlayTimer;

function getCardsInView() {
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 1;
}

function createDots() {
  dotsContainer.innerHTML = "";
  const cardsInView = getCardsInView();
  const dotCount = Math.ceil(cards.length / cardsInView);

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("button");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSet(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSet(index) {
  const cardsInView = getCardsInView();
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = 24;
  const moveAmount = (cardWidth + gap) * cardsInView * index;

  track.style.transform = `translateX(-${moveAmount}px)`;

  currentIndex = index;
  updateDots();
  resetAutoPlay();
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, idx) =>
    dot.classList.toggle("active", idx === currentIndex),
  );
}

function autoPlay() {
  const cardsInView = getCardsInView();
  const dotCount = Math.ceil(cards.length / cardsInView);

  currentIndex++;
  if (currentIndex >= dotCount) currentIndex = 0;
  goToSet(currentIndex);
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = setInterval(autoPlay, 4000);
}

// Initialize
window.addEventListener("resize", () => {
  createDots();
  goToSet(0);
});

createDots();
resetAutoPlay();

// Pause on hover
track.addEventListener("mouseenter", () => clearInterval(autoPlayTimer));
track.addEventListener("mouseleave", resetAutoPlay);

// Swipe support
let touchStartX = 0;
track.addEventListener(
  "touchstart",
  (e) => (touchStartX = e.touches[0].clientX),
);
track.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchStartX - touchEndX > 50) autoPlay();
  if (touchStartX - touchEndX < -50) {
    currentIndex = currentIndex > 0 ? currentIndex - 2 : -1;
    autoPlay();
  }
});

// start prorfoloio section
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // 1. Update Active Button Class
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // 2. Get Filter Value
      const filterValue = button.getAttribute("data-filter");

      // 3. Filter Portfolio Items
      portfolioItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");

        if (filterValue === "all" || filterValue === itemCategory) {
          // Show Item with Animation
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 10);
        } else {
          // Hide Item
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 400); // Wait for transition duration
        }
      });
    });
  });
});

// Optional: Subtle entry animation on scroll (simple implementation)
const portfolioItems = document.querySelectorAll(".portfolio-item");
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

portfolioItems.forEach((item) => {
  item.style.opacity = "0";
  item.style.transform = "translateY(20px)";
  item.style.transition = "all 0.6s ease-out";
  observer.observe(item);
});

// stat form logic
const form = document.getElementById("zynoctaForm");
const successMsg = document.getElementById("success-msg");

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const toggleError = (fieldId, show) => {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);
  if (show) {
    input.classList.add("input-invalid");
    error.style.display = "block";
  } else {
    input.classList.remove("input-invalid");
    error.style.display = "none";
  }
};
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Formspree page open nahi hoga

  let isFormValid = true;

  // ... aapki saari validation waise hi rahegi ...

  if (isFormValid) {
    const btn = document.getElementById("submitBtn");
    btn.innerText = "Sending...";
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();
        successMsg.style.display = "block";
      }
    } catch (error) {
      console.error(error);
    }

    btn.innerText = "Send Message";
    btn.disabled = false;
  }

  setTimeout(() => {
    successMsg.style.display = "none";
  }, 5000);
});

// Simple FAQ accordion for refund page
function initFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq-q');
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const panel = parent.querySelector('.faq-a');
      const isOpen = panel.style.display === 'block';

      // close all
      document.querySelectorAll('.faq-a').forEach((el) => (el.style.display = 'none'));

      if (!isOpen) panel.style.display = 'block';
    });
  });
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => initFAQAccordion());