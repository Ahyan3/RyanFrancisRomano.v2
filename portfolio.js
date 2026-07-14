// portfolio.js - Main module with Three.js 3D background
import * as THREE from 'three';

// ============================================
// THREE.JS 3D BACKGROUND
// ============================================

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

// ============================================
// CAROUSEL DATA
// ============================================

const carouselData = {
  // Profile Photos
  profile: {
    images: [
      'images/photo/profile.jpeg',
      'images/photo/profile2.jpeg',
      'images/photo/barong.jpeg',
      'images/photo/toga.jpeg',
      'images/photo/toga2.jpg'
    ]
  },
  // Projects
  mcevent: {
    images: [
      'images/projects/mcevent/login.png',
      'images/projects/mcevent/dashboard.png',
      'images/projects/mcevent/calendar.png',
      'images/projects/mcevent/announcement.png',
      'images/projects/mcevent/events.png',
      'images/projects/mcevent/proposalspending.png',
      'images/projects/mcevent/proposalsapproved.png',
      'images/projects/mcevent/maps.png',
      'images/projects/mcevent/reports.png',
      'images/projects/mcevent/studentdashboard.png',
      'images/projects/mcevent/studentannouncement.png',
      'images/projects/mcevent/viewproposal.png',
      'images/projects/mcevent/viewproposal2.png'
    ]
  },
  upitdc: {
    images: [
      'images/projects/upitdc/welcome.png',
      'images/projects/upitdc/dashboard.png',
      'images/projects/upitdc/inventory.png',
      'images/projects/upitdc/inventory-logs.png',
      'images/projects/upitdc/return-equipment.png',
      'images/projects/upitdc/staff.png',
      'images/projects/upitdc/history.png',
      'images/projects/upitdc/pdf.png',
      'images/projects/upitdc/pdf2.png',
      'images/projects/upitdc/settings.png',
    ]
  },
  dental: {
    images: [
      'images/projects/dental/login.png',
      'images/projects/dental/terms.png',
      'images/projects/dental/signup.png',
      'images/projects/dental/signup2.png',
      'images/projects/dental/signup3.png',
      'images/projects/dental/1.png',
      'images/projects/dental/2.png',
      'images/projects/dental/3.png',
      'images/projects/dental/4.png',
      'images/projects/dental/5.png',
      'images/projects/dental/6.png',
      'images/projects/dental/7.png',
      'images/projects/dental/8.png',
      'images/projects/dental/9.png',
      'images/projects/dental/10.png',
      'images/projects/dental/profile.png',
      'images/projects/dental/profile2.png',
      'images/projects/dental/profile3.png',
      'images/projects/dental/profile4.png',
      'images/projects/dental/appointment.png',
      'images/projects/dental/appointment2.png',
      'images/projects/dental/admin.png',
      'images/projects/dental/admin2.png',
      'images/projects/dental/admin3.png',
      'images/projects/dental/admin4.png',
      'images/projects/dental/admin5.png',
      'images/projects/dental/admin6.png',
      'images/projects/dental/admin7.png',
      'images/projects/dental/admin8.png'
    ]
  },
  student: {
    images: [
      'images/projects/student-mgmt/1.png',
      'images/projects/student-mgmt/2.png',
      'images/projects/student-mgmt/3.png',
      'images/projects/student-mgmt/4.png',
      'images/projects/student-mgmt/5.png'
    ]
  },
  agribit: {
    images: [
      'images/projects/agri-bit/1.png'
    ]
  },
  // Certifications
  'js-essentials': {
    images: [
      'images/awards/js-essentials.png',
      'images/awards/js-essentials-2.png'
    ]
  },
  'prisaa': {
    images: [
      'images/awards/prisaa.jpg',
    ]
  },
  'media-doc': {
    images: [
      'images/awards/media-doc.jpg',
    ]
  },
  'ai-asean': {
    images: [
      'images/awards/ai-asean.png',
      'images/awards/ai-asean-2.png'
    ]
  },
  'typing': {
    images: [
      'images/awards/typing.png',
    ]
  },
  // Awards
  'graphic-designer': {
    images: [
      'images/awards/graphic-designer.jpg',
    ]
  },
  'ux-ui': {
    images: [
      'images/awards/ux-ui.jpg',
    ]
  },
  'cum-laude': {
    images: [
      'images/awards/cum-laude.jpg',
    ]
  },
  'research': {
    images: [
      'images/awards/research.jpg',
    ]
  },
  'thesis': {
    images: [
      'images/awards/thesis.jpg',
      'images/awards/thesis-2.jpg'
    ]
  },
  'system-dev': {
    images: [
      'images/awards/system-dev.png',
    ]
  },
  'computer-servicing': {
    images: [
      'images/awards/computer-servicing.png',
      'images/awards/computer-servicing-2.png',
      'images/awards/computer-servicing-3.png',
      'images/awards/computer-servicing-4.png',
      'images/awards/computer-servicing-5.png',
    ]
  },
  'graphic-design-nc3': {
    images: [
      'images/awards/graphic-design-nc3.png',
      'images/awards/graphic-design-nc3-2.png',
      'images/awards/graphic-design-nc3-3.png',
      'images/awards/graphic-design-nc3-4.png',
      'images/awards/graphic-design-nc3-5.png',
      'images/awards/graphic-design-nc3-6.png',
      'images/awards/graphic-design-nc3-7.png'
    ]
  },
  'hackathon': {
    images: [
      'images/awards/hackathon.jpg',
    ]
  },
  'pl101': {
    images: [
      'images/awards/pl101.jpg',
    ]
  },
  'video-processing': {
    images: [
      'images/awards/video-processing.jpg',
    ]
  },
  'pio-officer': {
    images: [
      'images/awards/pio-officer.jpg',
      'images/awards/pio-officer-2.jpg'
    ]
  },
  'oath-taking': {
    images: [
      'images/awards/oath-taking.jpg',
    ]
  },
  'ojt': {
    images: [
      'images/awards/ojt.jpg',
    ]
  },
  'leadership': {
    images: [
      'images/awards/leadership.jpg',
    ]
  },
  'ai-seminar': {
    images: [
      'images/awards/ai-seminar.png',
    ]
  },
  'electrical': {
    images: [
      'images/awards/electrical.png',
      'images/awards/electrical-2.png',
      'images/awards/electrical-3.png',
      'images/awards/electrical-4.png'
    ]
  },
  'content-creation': {
    images: [
      'images/awards/content-creation.png',
      'images/awards/content-creation-2.png',
      'images/awards/content-creation-3.png',
      'images/awards/content-creation-4.png'
    ]
  }
};

// ============================================
// CAROUSEL STATE
// ============================================

let currentGallery = [];
let currentIndex = 0;

// ============================================
// CAROUSEL FUNCTIONS
// ============================================

function openCarousel(galleryName) {
  const data = carouselData[galleryName];
  if (!data) {
    console.warn('Gallery not found:', galleryName);
    return;
  }
  
  currentGallery = data.images || [];
  currentIndex = 0;
  
  if (currentGallery.length === 0) {
    console.warn('No images found for gallery:', galleryName);
    return;
  }
  
  const modal = document.getElementById('carouselModal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  updateSlide();
  updateThumbnails();
}

function closeCarousel() {
  const modal = document.getElementById('carouselModal');
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

function changeSlide(direction) {
  if (currentGallery.length === 0) return;
  currentIndex = (currentIndex + direction + currentGallery.length) % currentGallery.length;
  updateSlide();
  updateThumbnails();
}

function updateSlide() {
  const img = document.getElementById('carouselImage');
  const counter = document.getElementById('carouselCounter');
  
  if (currentGallery.length > 0 && img) {
    img.src = currentGallery[currentIndex];
    img.alt = `Gallery image ${currentIndex + 1}`;
    counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
  }
}

function updateThumbnails() {
  const container = document.getElementById('carouselThumbnails');
  container.innerHTML = '';
  
  currentGallery.forEach((src, index) => {
    const thumb = document.createElement('div');
    thumb.className = `carousel-thumbnail ${index === currentIndex ? 'active' : ''}`;
    thumb.innerHTML = `<img src="${src}" alt="Thumbnail ${index + 1}">`;
    thumb.onclick = (e) => {
      e.stopPropagation();
      currentIndex = index;
      updateSlide();
      updateThumbnails();
    };
    container.appendChild(thumb);
  });
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('carouselModal');
  if (modal.classList.contains('hidden')) return;
  
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
  if (e.key === 'Escape') closeCarousel();
});

// ============================================
// CONTACT FORM
// ============================================

document.getElementById('contactForm').addEventListener('submit', function (event) {
  const feedback = document.getElementById('formFeedback');
  feedback.className = 'text-xs text-center font-["JetBrains_Mono"] mt-2 text-cyan-400';
  feedback.textContent = '⏳ SENDING... Please wait.';
  feedback.classList.remove('hidden');
});

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  const feedback = document.getElementById('formFeedback');
  feedback.className = 'text-xs text-center font-["JetBrains_Mono"] mt-2 text-emerald-400';
  feedback.textContent = '✅ CONNECTION_ESTABLISHED: Your message has been sent. I\'ll reply soon.';
  feedback.classList.remove('hidden');
  window.history.replaceState({}, document.title, window.location.pathname);
  setTimeout(() => feedback.classList.add('hidden'), 8000);
}

// ============================================
// POPUP FUNCTIONS
// ============================================

function showPopup(name) {
  const popup = document.getElementById('cyberPopup');
  const popupName = document.getElementById('popupName');
  
  if (popupName) {
    popupName.textContent = name;
  }
  
  if (popup) {
    popup.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    setTimeout(function() {
      closePopup();
    }, 6000);
  }
}

function closePopup() {
  const popup = document.getElementById('cyberPopup');
  if (popup) {
    popup.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

// ============================================
// AUTO-AGE CALCULATION
// ============================================

function calculateAge() {
  const birthDate = new Date(2004, 3, 8); // April 8, 2004
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// ============================================
// DOM CONTENT LOADED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Update Age
  const ageDisplay = document.getElementById('ageDisplay');
  if (ageDisplay) {
    ageDisplay.textContent = calculateAge();
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

// Export functions for use in HTML onclick attributes
window.openCarousel = openCarousel;
window.closeCarousel = closeCarousel;
window.changeSlide = changeSlide;
window.closePopup = closePopup;
window.showPopup = showPopup;