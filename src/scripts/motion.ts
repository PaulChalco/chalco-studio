import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;
let tickerCallback: ((time: number) => void) | null = null;

function initReveals() {
  const elements = document.querySelectorAll("[data-reveal]");
  elements.forEach((el) => {
    const delayAttr = el.getAttribute("data-delay");
    const yAttr = el.getAttribute("data-y");

    const delay = delayAttr ? parseFloat(delayAttr) : 0;
    const yVal = yAttr ? parseFloat(yAttr) : 46;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: yVal,
      },
      {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 1,
        y: 0,
        duration: 1.0,
        delay: delay,
        ease: "power3.out",
      }
    );
  });
}

export function initMotion() {
  // Teardown previous instances to avoid duplicate listeners on page navigation/transitions
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(t => t.kill());
  }

  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  // Respect prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('js-reveal');
    }
    gsap.registerPlugin(ScrollTrigger);
    return;
  }

  // Add js-reveal class to indicate active JavaScript animations
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('js-reveal');
  }

  // Register GSAP ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // Initialize Lenis
  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
  });

  // Synchronize ScrollTrigger with Lenis scroll events
  lenisInstance.on('scroll', ScrollTrigger.update);

  // Bind Lenis RAF to the GSAP Ticker loop
  tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000); // GSAP ticker time is in seconds, Lenis expects milliseconds
  };

  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(0);

  // Run reveal animations
  initReveals();

  // Centralized Hero Parallax ScrollTrigger setup
  const heroBg = document.querySelector("[data-hero-bg]");
  if (heroBg) {
    gsap.to(heroBg, {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      yPercent: 20,
      ease: "none",
    });
  }
}

export function getLenis() {
  return lenisInstance;
}

