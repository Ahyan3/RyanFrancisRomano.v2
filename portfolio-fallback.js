// portfolio-fallback.js - Fallback for non-module browsers (no Three.js)
document.addEventListener('DOMContentLoaded', function() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Mobile menu
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
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
  mobileLinks.forEach(function(link) {
    link.addEventListener('click', function() {
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
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
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

  // ============================================
  // FIXED: Check for success redirect from Formspree
  // ============================================
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('success') === 'true') {
    const feedbackEl = document.getElementById('formFeedback');
    if (feedbackEl) {
      feedbackEl.className = 'text-xs text-center font-["JetBrains_Mono"] mt-2 text-emerald-400';
      feedbackEl.textContent = '✅ CONNECTION_ESTABLISHED: Your message has been sent. I\'ll reply soon.';
      feedbackEl.classList.remove('hidden');
      
      // Clean URL without reloading page
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      
      setTimeout(function() {
        feedbackEl.classList.add('hidden');
      }, 8000);
    }
  }

  if (typeof lucide !== 'undefined') {
    setTimeout(function() { lucide.createIcons(); }, 100);
  }
});