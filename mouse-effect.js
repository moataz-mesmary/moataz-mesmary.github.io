// Colorful Mouse Parallax Effect
function initParallaxEffect() {
  // Create a container for our particles
  const particleContainer = document.createElement('div');
  particleContainer.id = 'particle-container';
  particleContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
  `;
  document.body.appendChild(particleContainer);

  // Create background layers for parallax effect
  const bgLayers = [];
  const colors = ['rgba(255,105,180,0.5)', 'rgba(170, 243, 236, 0.5)', 'rgba(225, 219, 204, 0.5)'];
  
  for (let i = 0; i < 3; i++) {
    const layer = document.createElement('div');
    layer.className = 'parallax-layer';
    layer.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(circle at 50% 50%, ${colors[i]}, transparent 70%);
      opacity: 0.6;
      transform: translate(0, 0);
      transition: transform 0.2s ease-out;
    `;
    particleContainer.appendChild(layer);
    bgLayers.push(layer);
  }

  // Create an array to store our particles
  const particles = [];
  const maxParticles = 50;

  // Create a Particle class
  class Particle {
    constructor(x, y) {
      this.element = document.createElement('div');
      this.element.className = 'mouse-particle';
      
      // Random size between 5 and 20px
      const size = Math.random() * 15 + 5;
      
      // Random color
      const hue = Math.floor(Math.random() * 360);
      const saturation = Math.floor(Math.random() * 30) + 70; // High saturation
      const lightness = Math.floor(Math.random() * 30) + 60; // Bright
      
      this.element.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: hsla(${hue}, ${saturation}%, ${lightness}%, 0.8);
        transform: translate(-50%, -50%);
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        box-shadow: 0 0 10px hsla(${hue}, ${saturation}%, ${lightness}%, 0.5);
        filter: blur(1px);
      `;
      
      particleContainer.appendChild(this.element);
      
      // Set properties
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.life = 100;
      this.parallaxFactor = 1 + Math.random() * 2; // Different parallax sensitivity
      this.hue = hue;
    }
    
    update() {
      // Update position
      this.x += this.vx;
      this.y += this.vy;
      
      // Apply gravity
      this.vy += 0.05;
      
      // Update life
      this.life -= 1;
      
      // Update element
      if (this.life > 0) {
        this.element.style.opacity = this.life / 100;
        this.element.style.transform = `translate(-50%, -50%) scale(${this.life / 100})`;
        this.element.style.top = `${this.y}px`;
        this.element.style.left = `${this.x}px`;
        return true;
      } else {
        particleContainer.removeChild(this.element);
        return false;
      }
    }
  }

  // Track mouse position
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Apply parallax effect to background layers
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Calculate distance from center (as percentage)
    const dx = (mouseX - centerX) / centerX;
    const dy = (mouseY - centerY) / centerY;
    
    // Move each layer with different intensity
    bgLayers.forEach((layer, index) => {
      const factor = (index + 1) * 3;
      layer.style.transform = `translate(${dx * factor}%, ${dy * factor}%)`;
    });
    
    // Add new particles occasionally
    if (Math.random() > 0.7) {
      createParticle(mouseX, mouseY);
    }
  });
  
  // Add window resize handling
  window.addEventListener('resize', () => {
    // Update parallax backgrounds
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Reset layer positions on resize
    bgLayers.forEach(layer => {
      layer.style.transform = 'translate(0, 0)';
    });
  });

  // Create a particle at the given position
  function createParticle(x, y) {
    if (particles.length >= maxParticles) {
      // Remove the oldest particle
      const oldParticle = particles.shift();
      particleContainer.removeChild(oldParticle.element);
    }
    
    // Create and add new particle
    const particle = new Particle(x, y);
    particles.push(particle);
  }
  
  // Animation loop
  function animate() {
    // Update all particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const alive = particles[i].update();
      if (!alive) {
        particles.splice(i, 1);
      }
    }
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  animate();
}

function initFormHandler() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Log the submission
            console.log('Form submitted at ' + new Date().toLocaleTimeString());
            
            // Update button state
            document.getElementById('submitButton').innerHTML = 'Sending...';
            document.getElementById('submitButton').disabled = true;
        });
    }
}

// Use both DOMContentLoaded and window.onload to ensure scripts run properly
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize immediately
    initParallaxEffect();
    initFormHandler();
});

// Backup initialization with window.onload
window.onload = function() {
    // If the particle container doesn't exist yet, initialize
    if (!document.getElementById('particle-container')) {
        initParallaxEffect();
    }
    
    // Initialize form handler if not already done
    const form = document.getElementById('contactForm');
    if (form && !form.hasAttribute('data-initialized')) {
        initFormHandler();
        form.setAttribute('data-initialized', 'true');
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', function(event) {
        // Log the submission
        console.log('Form submitted at ' + new Date().toLocaleTimeString());
        
        // Update button state
        document.getElementById('submitButton').innerHTML = 'Sending...';
        document.getElementById('submitButton').disabled = true;
    });
});