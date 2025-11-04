// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeModal();
  initializeParticles();
  initializeScrollAnimations();
  initializeInteractiveElements();
});

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 1500);
});

window.addEventListener("scroll", () => {
    const bg = document.querySelector(".parallax-bg");
    bg.style.backgroundPositionY = `${window.scrollY * 0.4}px`;
  });
  


// Initialize scroll-based animations
function initializeScrollAnimations() {
  const detailItems = document.querySelectorAll(".detail-item");
  const features = document.querySelectorAll(".feature");

  // Observe elements for animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
      }
    });
  }, observerOptions);

  detailItems.forEach((item) => observer.observe(item));
  features.forEach((feature) => observer.observe(feature));
}

// Initialize modal functionality
function initializeModal() {
  const modal = document.getElementById("rsvpModal");
  const rsvpButton = document.getElementById("rsvpButton");
  const closeButton = document.getElementById("closeModal");
  const rsvpForm = document.getElementById("rsvpForm");
  const successMessage = document.getElementById("successMessage");

  // Open modal
  rsvpButton.addEventListener("click", function () {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    // Add entrance animation
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.animation = "modalSlideIn 0.4s ease";

    // Play spooky sound effect (optional - commented out)
    // playSound('spooky');
  });

  // Close modal
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Handle form submission
  rsvpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      guests: document.getElementById("guests").value,
      costume: document.getElementById("costume").value,
    };

    // Simulate form submission
    console.log("RSVP Data:", formData);

    // Hide form and show success message
    rsvpForm.style.display = "none";
    successMessage.style.display = "block";

    // Create confetti effect
    createConfetti();

    // Close modal after delay
    setTimeout(() => {
      closeModal();
      rsvpForm.style.display = "block";
      successMessage.style.display = "none";
      rsvpForm.reset();
    }, 3000);
  });

  function closeModal() {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.style.animation = "modalSlideOut 0.3s ease";

    setTimeout(() => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }
}

// Initialize floating particles
function initializeParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }

  // Create new particles periodically
  setInterval(() => {
    if (particlesContainer.children.length < particleCount) {
      createParticle(particlesContainer);
    }
  }, 2000);
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  // Random position
  particle.style.left = Math.random() * 100 + "%";

  // Random animation duration
  const duration = 3 + Math.random() * 5;
  particle.style.animationDuration = duration + "s";

  // Random delay
  particle.style.animationDelay = Math.random() * 2 + "s";

  // Random size
  const size = 2 + Math.random() * 4;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  // Random color from Halloween palette
  const colors = ["#ff6b35", "#6a0dad", "#39ff14", "#ffa500"];
  particle.style.background = colors[Math.floor(Math.random() * colors.length)];

  container.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, duration * 1000 + 2000);
}

// Initialize interactive animations
function initializeAnimations() {
  // Add hover effect to ghosts
  const ghosts = document.querySelectorAll(".ghost");
  ghosts.forEach((ghost) => {
    ghost.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.3) rotate(15deg)";
      this.style.transition = "transform 0.3s ease";
    });

    ghost.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });

  // Add click effect to pumpkins
  const pumpkins = document.querySelectorAll(".pumpkin");
  pumpkins.forEach((pumpkin) => {
    pumpkin.addEventListener("click", function () {
      this.style.animation = "none";
      setTimeout(() => {
        this.style.animation = "";
      }, 10);

      // Create sparkle effect
      createSparkle(this);
    });
  });

  // Animate bats on hover
  const bats = document.querySelectorAll(".bat");
  bats.forEach((bat) => {
    bat.addEventListener("mouseenter", function () {
      this.style.animationPlayState = "paused";
      this.style.transform = "scale(1.5) rotate(20deg)";
    });

    bat.addEventListener("mouseleave", function () {
      this.style.animationPlayState = "running";
      this.style.transform = "";
    });
  });
}

// Initialize interactive elements
function initializeInteractiveElements() {
  // Add parallax effect to card on mouse move
  const card = document.querySelector(".invitation-card");
  const container = document.querySelector(".container");

  container.addEventListener("mousemove", function (e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  container.addEventListener("mouseleave", function () {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });

  // Add click effects to detail items
  const detailItems = document.querySelectorAll(".detail-item");
  detailItems.forEach((item) => {
    item.addEventListener("click", function () {
      this.style.animation = "pulse 0.5s ease";
      setTimeout(() => {
        this.style.animation = "";
      }, 500);
    });
  });

  // Add ripple effect to button
  const rsvpButton = document.getElementById("rsvpButton");
  rsvpButton.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.position = "absolute";
    ripple.style.borderRadius = "50%";
    ripple.style.background = "rgba(255, 255, 255, 0.6)";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s ease-out";
    ripple.style.pointerEvents = "none";

    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Create sparkle effect
function createSparkle(element) {
  const rect = element.getBoundingClientRect();
  const sparkleCount = 5;

  for (let i = 0; i < sparkleCount; i++) {
    const sparkle = document.createElement("div");
    sparkle.style.position = "fixed";
    sparkle.style.left = rect.left + rect.width / 2 + "px";
    sparkle.style.top = rect.top + rect.height / 2 + "px";
    sparkle.style.width = "10px";
    sparkle.style.height = "10px";
    sparkle.style.background = "#ffd700";
    sparkle.style.borderRadius = "50%";
    sparkle.style.pointerEvents = "none";
    sparkle.style.zIndex = "9999";
    sparkle.style.boxShadow = "0 0 10px #ffd700";

    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / sparkleCount;
    const distance = 50;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    sparkle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 },
      ],
      {
        duration: 800,
        easing: "ease-out",
      }
    ).onfinish = () => sparkle.remove();
  }
}

// Create confetti effect
function createConfetti() {
  const confettiCount = 50;
  const colors = ["#ff6b35", "#6a0dad", "#39ff14", "#ffa500", "#ff1493"];

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "fixed";
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.top = "-10px";
    confetti.style.width = 5 + Math.random() * 10 + "px";
    confetti.style.height = 5 + Math.random() * 10 + "px";
    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.opacity = "0.8";
    confetti.style.zIndex = "10000";
    confetti.style.pointerEvents = "none";
    confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";

    document.body.appendChild(confetti);

    const duration = 2000 + Math.random() * 2000;
    const rotation = Math.random() * 360;
    const sway = (Math.random() - 0.5) * 200;

    confetti.animate(
      [
        {
          transform: "translateY(0) rotate(0deg) translateX(0)",
          opacity: 0.8,
        },
        {
          transform: `translateY(100vh) rotate(${rotation}deg) translateX(${sway}px)`,
          opacity: 0,
        },
      ],
      {
        duration: duration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => confetti.remove();
  }
}

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes modalSlideOut {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add keyboard shortcuts
document.addEventListener("keydown", function (e) {
  // Press 'Escape' to close modal
  if (e.key === "Escape") {
    const modal = document.getElementById("rsvpModal");
    if (modal.style.display === "block") {
      const closeButton = document.getElementById("closeModal");
      closeButton.click();
    }
  }

  // Press 'R' to open RSVP modal
  if (e.key === "r" || e.key === "R") {
    if (document.getElementById("rsvpModal").style.display !== "block") {
      document.getElementById("rsvpButton").click();
    }
  }
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Performance optimization: Reduce animations on low-end devices
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animation = "none";
    el.style.transition = "none";
  });
}

function animateTimeline() {
  const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("show");
      });
    },
    { threshold: 0.2 }
  );
  items.forEach((i) => observer.observe(i));
}
document.addEventListener("DOMContentLoaded", animateTimeline);

// Log initialization
console.log("🎃 Halloween Party Invitation Loaded! 🎃");
console.log('Tip: Press "R" to RSVP, "Escape" to close modal');
