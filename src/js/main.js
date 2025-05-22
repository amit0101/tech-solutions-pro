/**
 * TechSolutions Pro - Main JavaScript
 * Handles form submissions, modals, and other interactive elements
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initForms();
  initModals();
  initSmoothScrolling();
});

/**
 * Form handling
 */
function initForms() {
  // Demo request form
  const demoForm = document.getElementById('demoForm');
  if (demoForm) {
    demoForm.addEventListener('submit', handleFormSubmit);
  }

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
  }
}

/**
 * Handle form submissions
 * @param {Event} event - The form submit event
 */
async function handleFormSubmit(event) {
  event.preventDefault();

  // Get form data
  const form = event.target;
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  
  // Log form data to console (for testing purposes)
  console.log('Form submitted:', formObject);
  
  try {
    // Simulate API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, we would send data to an API endpoint
    // Example:
    /*
    await fetch('https://api.revenue-magick.com/webhook/form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': 'YOUR_API_KEY'
      },
      body: JSON.stringify(formObject)
    });
    */
    
    // For HubSpot integration (commented out for now)
    /*
    await fetch('https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/' + encodeURIComponent(formObject.email), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_HUBSPOT_TOKEN'
      },
      body: JSON.stringify({
        properties: [
          { property: 'firstname', value: formObject.firstName || formObject.contactName },
          { property: 'lastname', value: formObject.lastName || '' },
          { property: 'phone', value: formObject.phone || '' },
          { property: 'company', value: formObject.company || '' }
        ]
      })
    });
    */
    
    // Reset the form
    form.reset();
    
    // Show success modal
    showModal('successModal');
    
    // Track form submission event (for analytics)
    trackEvent('form_submission', {
      form_id: form.id,
      form_name: form.id === 'demoForm' ? 'Demo Request' : 'Contact Form'
    });
    
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('There was an error submitting the form. Please try again.');
  }
}

/**
 * Modal handling
 */
function initModals() {
  // Get all modals
  const modals = document.querySelectorAll('.modal');
  
  // Add close functionality to each modal
  modals.forEach(modal => {
    // Close when clicking the X button
    const closeButton = modal.querySelector('.close-modal');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeModal(modal);
      });
    }
    
    // Close when clicking the close button
    const closeBtn = modal.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        closeModal(modal);
      });
    }
    
    // Close when clicking outside the modal content
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
    
    // Close when pressing Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && modal.classList.contains('show')) {
        closeModal(modal);
      }
    });
  });
}

/**
 * Show a modal by ID
 * @param {string} modalId - The ID of the modal to show
 */
function showModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
  }
}

/**
 * Close a modal
 * @param {HTMLElement} modal - The modal element to close
 */
function closeModal(modal) {
  modal.classList.remove('show');
  document.body.style.overflow = ''; // Restore scrolling
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Get header height for offset
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate position
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Track navigation event
        trackEvent('navigation', {
          target: targetId.substring(1)
        });
      }
    });
  });
}

/**
 * Track events for analytics
 * @param {string} eventName - Name of the event
 * @param {object} eventParams - Additional parameters for the event
 */
function trackEvent(eventName, eventParams = {}) {
  // Log event to console (for testing)
  console.log(`Event tracked: ${eventName}`, eventParams);
  
  // Send to Google Analytics (if available)
  if (window.gtag) {
    gtag('event', eventName, eventParams);
  }
  
  // Send to Microsoft Clarity (if available)
  if (window.clarity) {
    clarity('set', eventName, eventParams);
  }
}

/**
 * Track user behavior for testing
 * This function simulates tracking mouse movements, clicks, and scrolls
 */
function initBehaviorTracking() {
  // Track mouse movements (throttled)
  let lastMoveTime = 0;
  document.addEventListener('mousemove', (event) => {
    const now = Date.now();
    if (now - lastMoveTime > 100) { // Throttle to every 100ms
      lastMoveTime = now;
      const x = event.clientX;
      const y = event.clientY;
      
      // In a real implementation, we would batch these and send periodically
      // For now, just log to console occasionally
      if (Math.random() < 0.01) { // Log only 1% of movements to avoid console spam
        console.log('Mouse position:', { x, y });
      }
    }
  });
  
  // Track clicks
  document.addEventListener('click', (event) => {
    const target = event.target;
    const targetInfo = {
      tagName: target.tagName,
      className: target.className,
      id: target.id,
      text: target.textContent?.substring(0, 20),
      href: target.href || null
    };
    
    trackEvent('click', targetInfo);
  });
  
  // Track scrolls (throttled)
  let lastScrollTime = 0;
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollTime > 200) { // Throttle to every 200ms
      lastScrollTime = now;
      const scrollPosition = window.scrollY;
      const scrollPercentage = Math.round((scrollPosition / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      // Track scroll depth at 25% intervals
      if (scrollPercentage >= 25 && scrollPercentage < 50 && !window.tracked25) {
        window.tracked25 = true;
        trackEvent('scroll_depth', { depth: 25 });
      } else if (scrollPercentage >= 50 && scrollPercentage < 75 && !window.tracked50) {
        window.tracked50 = true;
        trackEvent('scroll_depth', { depth: 50 });
      } else if (scrollPercentage >= 75 && scrollPercentage < 90 && !window.tracked75) {
        window.tracked75 = true;
        trackEvent('scroll_depth', { depth: 75 });
      } else if (scrollPercentage >= 90 && !window.tracked90) {
        window.tracked90 = true;
        trackEvent('scroll_depth', { depth: 90 });
      }
    }
  });
  
  // Track form field interactions
  document.querySelectorAll('input, select, textarea').forEach(field => {
    // Track focus
    field.addEventListener('focus', () => {
      trackEvent('field_focus', {
        field_id: field.id,
        field_name: field.name,
        field_type: field.type
      });
    });
    
    // Track blur (leaving field)
    field.addEventListener('blur', () => {
      trackEvent('field_blur', {
        field_id: field.id,
        field_name: field.name,
        field_type: field.type,
        has_value: field.value.length > 0
      });
    });
  });
}

// Initialize behavior tracking
initBehaviorTracking(); 