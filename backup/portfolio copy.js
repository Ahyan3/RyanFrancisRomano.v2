// portfolio.js - Main module with Three.js 3D background
import * as THREE from 'three';

// Initialize Three.js Background
const canvas = document.getElementById('bgCanvas');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05050a);
scene.fog = new THREE.FogExp2(0x05050a, 0.008);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 15);

const renderer = new THREE.WebGLRenderer({ canvas, alpha: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create glowing torus knot
const geometry = new THREE.TorusKnotGeometry(3, 0.8, 200, 32, 3, 4);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  emissive: 0x006666,
  emissiveIntensity: 0.5,
  metalness: 0.9,
  roughness: 0.3,
  wireframe: false
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Add floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
for (let i = 0; i < particlesCount * 3; i += 3) {
  posArray[i] = (Math.random() - 0.5) * 100;
  posArray[i+1] = (Math.random() - 0.5) * 60;
  posArray[i+2] = (Math.random() - 0.5) * 50 - 20;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
  color: 0x00aaff,
  size: 0.08,
  transparent: true,
  opacity: 0.6,
  blending: THREE.AdditiveBlending
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Add grid helper with neon color
const gridHelper = new THREE.GridHelper(40, 40, 0x00ffff, 0x336666);
gridHelper.position.y = -5;
gridHelper.material.transparent = true;
gridHelper.material.opacity = 0.25;
scene.add(gridHelper);

// Add ambient light and point lights
const ambientLight = new THREE.AmbientLight(0x111122);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 0.8);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);
const pointLight2 = new THREE.PointLight(0xff44ff, 0.5);
pointLight2.position.set(-5, 3, 5);
scene.add(pointLight2);

// Animation
let time = 0;
function animate() {
  requestAnimationFrame(animate);
  time += 0.008;
  
  torusKnot.rotation.x = time;
  torusKnot.rotation.y = time * 0.7;
  torusKnot.rotation.z = time * 0.3;
  
  particlesMesh.rotation.y = time * 0.05;
  particlesMesh.rotation.x = time * 0.03;
  
  camera.position.z = 14 + Math.sin(time * 0.5) * 0.5;
  camera.lookAt(0, 0, 0);
  
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// DOM Interactions
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      if (mobileMenu.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('open');
      if (menuBtn) {
        const icon = menuBtn.querySelector('i');
        if (icon) icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenu.classList.remove('open');
        }
      }
    });
  });

  // Active nav highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link-cyber, #mobileMenu a');
  
  function updateActiveNav() {
    let current = '';
    const scrollPos = window.scrollY + 150;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.clientHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('text-cyan-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-cyan-400');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNav);
  window.addEventListener('load', updateActiveNav);

 // ============================================
// CYBER POPUP FUNCTIONS
// ============================================

function showPopup(name) {
  const popup = document.getElementById('cyberPopup');
  const popupName = document.getElementById('popupName');
  
  if (popupName) {
    popupName.textContent = name;
  }
  
  if (popup) {
    popup.classList.remove('hidden');
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Auto-close after 6 seconds
    setTimeout(function() {
      closePopup();
    }, 6000);
  }
}

function closePopup() {
  const popup = document.getElementById('cyberPopup');
  if (popup) {
    popup.classList.add('hidden');
    // Re-enable body scroll
    document.body.style.overflow = '';
  }
}

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// Close popup by clicking outside
document.addEventListener('click', function(e) {
  const popup = document.getElementById('cyberPopup');
  if (popup && !popup.classList.contains('hidden')) {
    const container = popup.querySelector('.cyber-popup-container');
    if (container && !container.contains(e.target)) {
      closePopup();
    }
  }
});

  // Reinitialize icons
  if (typeof lucide !== 'undefined') {
    setTimeout(() => lucide.createIcons(), 200);
  }
});

// portfolio-fallback.js - Fallback for non-module browsers (no Three.js)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      mobileMenu.classList.toggle('hidden');
      const icon = menuBtn.querySelector('i');
      if (mobileMenu.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  }

  // Close mobile menu
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('open');
      if (menuBtn) {
        const icon = menuBtn.querySelector('i');
        if (icon) icon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') lucide.createIcons();
    });
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // // Form handler
  // const form = document.getElementById('contactForm');
  // const feedback = document.getElementById('formFeedback');
  // if (form) {
  //   form.addEventListener('submit', (e) => {
  //     e.preventDefault();
  //     const name = document.getElementById('name').value.trim();
  //     const email = document.getElementById('email').value.trim();
  //     const msg = document.getElementById('message').value.trim();
  //     if (name && email && msg) {
  //       feedback.textContent = `✅ Thank you ${name}! I'll reply soon.`;
  //       feedback.classList.remove('hidden');
  //       form.reset();
  //       setTimeout(() => feedback.classList.add('hidden'), 5000);
  //     } else {
  //       feedback.textContent = "⚠️ Please fill all fields.";
  //       feedback.classList.remove('hidden');
  //       setTimeout(() => feedback.classList.add('hidden'), 3000);
  //     }
  //   });
  // }

  // if (typeof lucide !== 'undefined') {
  //   setTimeout(() => lucide.createIcons(), 100);
  // }

  // Form handler
const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');
if (form) {
  form.addEventListener('submit', (e) => {
    // ... form code ...
  });
}

});