// TaskMaster: Smooth Navigation & Dynamic UI

// Highlight active nav link
document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("nav a");
    const currentPage = location.pathname.split("/").pop();
  
    links.forEach(link => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  });
  
  // Fade in animation on scroll
  const faders = document.querySelectorAll('.fade-in');
  
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -20px 0px"
  };
  
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
  