function typeWriter(text, elementId, speed = 50) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = ""; // clear old text
  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  typing();
}

// Trigger typing when user clicks
function showText(type) {
  if (type === "site") {
    typeWriter("MindNet is a calm space to write, reflect, and connect with an AI assistant that listens.", "siteText");
  } else if (type === "creator") {
    typeWriter("Hi, I'm Harshu, the creator of MindNet. I built this to help people process thoughts and emotions safely.", "creatorText");
  }
}

// Fade/appear on scroll
document.addEventListener("scroll", () => {
  const scrollText = document.getElementById("scrollText");
  const triggerPoint = window.innerHeight / 1.3;
  const sectionTop = scrollText.getBoundingClientRect().top;
  if (sectionTop < triggerPoint) {
    typeWriter("Here's where you’ll learn more as you scroll...", "scrollText");
  }
});
// Fade in page content on load
window.addEventListener('DOMContentLoaded', () => {
  const content = document.querySelector('.page-content');
  if (content) content.classList.add('show');
});

// Fade out content before navigating to another page
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const href = link.getAttribute('href');
    const content = document.querySelector('.page-content');
    if (content) content.style.opacity = 0; // fade out
    setTimeout(() => {
      window.location = href;
    }, 400); // match the CSS transition duration
  });
});
