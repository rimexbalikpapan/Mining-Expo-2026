// Dynamic Header Scrolling Effect
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.padding = "10px 8%";
    header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
  } else {
    header.style.padding = "15px 8%";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.05)";
  }
});

// Smooth scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));

    if (targetElement) {
      // Calculate layout offset contextually
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Gallery Slider Logic
const slides = document.querySelectorAll(".slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let current = 0;
let slideInterval;

function showSlide(index) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
    slide.style.opacity = "0";
  });

  slides[index].classList.add("active");
  // Small timeout to allow browser layout parsing for transition effects
  setTimeout(() => {
    slides[index].style.opacity = "1";
  }, 20);
}

function handleNext() {
  current++;
  if (current >= slides.length) {
    current = 0;
  }
  showSlide(current);
}

function handlePrev() {
  current--;
  if (current < 0) {
    current = slides.length - 1;
  }
  showSlide(current);
}

// Event Listeners
next.addEventListener("click", () => {
  handleNext();
  resetTimer();
});

prev.addEventListener("click", () => {
  handlePrev();
  resetTimer();
});

// Automated interval configurations
function startTimer() {
  slideInterval = setInterval(handleNext, 5000);
}

function resetTimer() {
  clearInterval(slideInterval);
  startTimer();
}

// Init Setup
startTimer();
