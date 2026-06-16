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

function initAnimations() {
  const elements = document.querySelectorAll("[data-anim]");
  elements.forEach((el) => {
    const animType = el.getAttribute("data-anim");

    if (animType === "dolly") {
      gsap.fromTo(
        el,
        {
          scale: 1.35,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power1.out",
        }
      );
    } else if (animType === "slide-x") {
      const from = el.getAttribute("data-from") || "left";
      const xVal = from === "right" ? 120 : -120;
      gsap.fromTo(
        el,
        {
          x: xVal,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 55%",
            scrub: true,
          },
          x: 0,
          opacity: 1,
          ease: "power1.out",
        }
      );
    } else if (animType === "rotate") {
      const degAttr = el.getAttribute("data-deg");
      const deg = degAttr ? parseFloat(degAttr) : 45;
      gsap.fromTo(
        el,
        {
          rotation: -deg,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          rotation: deg,
          ease: "none",
        }
      );
    } else if (animType === "write") {
      const text = el.textContent || "";
      const words = text.trim().split(/\s+/);
      el.innerHTML = "";

      const spans: HTMLSpanElement[] = [];
      words.forEach((word, idx) => {
        const span = document.createElement("span");
        span.textContent = word;
        span.style.display = "inline-block";
        el.appendChild(span);
        spans.push(span);

        if (idx < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      if (spans.length > 0) {
        gsap.fromTo(
          spans,
          {
            opacity: 0.15,
          },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "bottom 60%",
              scrub: true,
            },
            opacity: 1,
            stagger: 0.1,
            ease: "none",
          }
        );
      }
    }
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

  // Run data-anim scroll animations
  initAnimations();

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

