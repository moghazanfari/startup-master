/**
 * =============================================================================
 * 1. TAILWIND CSS CONFIGURATION
 * Customizing the default theme, adding fonts, and defining brand colors.
 * =============================================================================
 */
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        // Standard body text font (Clean & Modern)
        sans: ["Inter", "sans-serif"],
        // Display/Heading font (Bold & Geometric)
        heading: ["Plus Jakarta Sans", "sans-serif"],
      },
      colors: {
        // The primary dark background color for the immersive theme
        deep: "#02040a",
      },
    },
  },
};

/**
 * =============================================================================
 * 2. UI LIBRARIES INITIALIZATION
 * Initializing visual effects and icon rendering.
 * =============================================================================
 */

// Initialize AOS (Animate On Scroll)
// Documentation: https://michalsnik.github.io/aos/
AOS.init({
  duration: 1000, // Animation duration in milliseconds (1s)
  once: true, // Whether animation should happen only once - while scrolling down
  offset: 0, // Offset (in px) from the original trigger point
});

// Initialize Lucide Icons
// Converts <i data-lucide="name"> tags into SVG icons
lucide.createIcons();

/**
 * =============================================================================
 * 3. SMOOTH SCROLLING ENGINE (LENIS)
 * detailed configuration for the momentum scrolling effect.
 * =============================================================================
 */

// Lenis Configuration
const lenis = new Lenis({
  duration: 1.2, // The duration of the scroll animation (higher = smoother/slipperier)

  // Custom easing function for a natural "Apple-like" stop
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),

  direction: "vertical", // Vertical scrolling
  gestureDirection: "vertical",
  smooth: true, // Enable smooth scroll
  mouseMultiplier: 1, // Sensitivity of the mouse wheel

  // Disable smooth scroll on touch devices for better native performance
  smoothTouch: false,
  touchMultiplier: 2,
});

// The Animation Loop (RAF)
// Essential for updating the scroll position on every frame
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/**
 * -----------------------------------------------------------------------------
 * Anchor Link Integration
 * Intercepts clicks on anchor links (e.g., <a href="#pricing">) to use
 * Lenis smooth scrolling instead of the browser's default jump.
 * -----------------------------------------------------------------------------
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default browser jump

    const targetId = this.getAttribute("href");

    // Scroll to target only if href is valid
    if (targetId && targetId !== "#") {
      lenis.scrollTo(targetId);
    }
  });
});
