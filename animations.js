// Smooth scrolling and dynamic header
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Header transparency and blur effect
  const header = document.querySelector('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Update header transparency
    if (currentScroll > 50) {
      header.style.backgroundColor = 'rgba(251, 251, 253, 0.8)';
    } else {
      header.style.backgroundColor = 'rgba(251, 251, 253, 1)';
    }

    // Hide/show header
    if (currentScroll <= 0) {
      header.classList.remove('hidden');
    } else if (currentScroll > lastScroll && !header.classList.contains('hidden')) {
      header.classList.add('hidden');
    } else if (currentScroll < lastScroll && header.classList.contains('hidden')) {
      header.classList.remove('hidden');
    }
    
    lastScroll = currentScroll;
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const scroll = window.pageYOffset;
    if (hero) {
      hero.style.transform = `translateY(${scroll * 0.5}px)`;
    }
  });

  // Intersection Observer for fade-in animations
  const fadeInElements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeInElements.forEach(element => observer.observe(element));
});

// Smooth state transitions
const pageTransition = () => {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);

  setTimeout(() => {
    transition.classList.add('active');
  }, 0);

  return new Promise(resolve => {
    setTimeout(() => {
      transition.remove();
      resolve();
    }, 500);
  });
}; 