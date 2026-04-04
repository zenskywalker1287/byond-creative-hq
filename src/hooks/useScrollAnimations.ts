import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimations() {
  useEffect(() => {
    const ctx = gsap.context(() => {

      // ─── PAGE LOAD — Nav + Announcement Bar slide in ─────────────────────────
      gsap.from('nav', {
        y: -64,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        delay: 0.1,
      })

      // ─── HERO — Parallax bg ───────────────────────────────────────────────────
      gsap.to('.hair-hero-bg', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hair-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Hero bottom bar — slide up from below on load
      gsap.from('.hair-hero .hero-bottom-bar', {
        y: 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.4,
      })

      // Hero brand watermark text — fade in slowly on load
      gsap.from('.hair-hero .hero-brand-watermark', {
        opacity: 0,
        scale: 0.95,
        duration: 1.4,
        ease: 'power2.out',
        delay: 0.2,
      })

      // ─── BESTSELLERS — Cards stagger slide up ────────────────────────────────
      gsap.from('.bestseller-card', {
        y: 70,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bestsellers-section',
          start: 'top 80%',
        },
      })

      // BestSellers heading — clip-path wipe from left
      gsap.from('.bestsellers-section h2', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.bestsellers-section',
          start: 'top 85%',
        },
      })

      // ─── BRAND STORY — Image from left, text from right ──────────────────────
      gsap.from('.brand-story-image', {
        x: -100,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.brand-story-section',
          start: 'top 75%',
        },
      })
      gsap.from('.brand-story-text', {
        x: 100,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.brand-story-section',
          start: 'top 75%',
        },
      })

      // Brand story heading — clip-path reveal left→right
      gsap.from('.brand-story-section h2', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.brand-story-section',
          start: 'top 70%',
        },
      })

      // Brand story paragraphs — stagger fade up
      gsap.from('.brand-story-text p', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.brand-story-section',
          start: 'top 65%',
        },
      })

      // Brand story button — fade in last
      gsap.from('.brand-story-text button', {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.brand-story-section',
          start: 'top 55%',
        },
      })

      // ─── ALL PRODUCTS — Sidebar slide in, then cards stagger ─────────────────
      gsap.from('.all-products-section h2', {
        clipPath: 'inset(0 100% 0 0)',
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.all-products-section',
          start: 'top 80%',
        },
      })

      gsap.from('.product-card', {
        y: 60,
        opacity: 0,
        duration: 0.65,
        stagger: 0.13,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.all-products-section',
          start: 'top 75%',
        },
      })

      // ─── BUNDLE SECTION — Section scale, heading letter-spacing expand ────────
      gsap.from('.bundle-section', {
        scale: 0.97,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bundle-section',
          start: 'top 80%',
        },
      })

      // Bundle heading — letter spacing expand
      gsap.from('.bundle-section h2', {
        letterSpacing: '-0.12em',
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.bundle-section',
          start: 'top 75%',
        },
      })

      // Bundle image — slide up into frame
      gsap.from('.bundle-img', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bundle-section',
          start: 'top 70%',
        },
      })

      // Bundle image — parallax on scroll
      gsap.to('.bundle-img img', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.bundle-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ─── IG GRID — Staggered pop in with back ease ───────────────────────────
      gsap.from('.ig-grid-item', {
        scale: 0.85,
        opacity: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: 'back.out(1.6)',
        scrollTrigger: {
          trigger: '.ig-grid-section',
          start: 'top 80%',
        },
      })

      // IG Grid — subtle parallax on the tall first cell
      gsap.to('.ig-grid-item:first-child img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.ig-grid-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ─── EMAIL SIGNUP — Heading scale, arcs stagger, form slide up ────────────
      gsap.from('.email-heading', {
        scale: 1.15,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.email-signup-section',
          start: 'top 80%',
        },
      })

      gsap.from('.email-arc', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(2)',
        transformOrigin: 'bottom center',
        scrollTrigger: {
          trigger: '.email-signup-section',
          start: 'top 75%',
        },
      })

      gsap.from('.email-form', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.email-signup-section',
          start: 'top 70%',
        },
      })

      // ─── FOOTER — Columns stagger up, logo scale in ───────────────────────────
      gsap.from('.footer-col', {
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 90%',
        },
      })

      gsap.from('.footer-logo', {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 70%',
        },
      })

      // Footer logo — scrub letter-spacing reveal as you reach bottom
      gsap.from('.footer-logo', {
        letterSpacing: '-0.06em',
        ease: 'none',
        scrollTrigger: {
          trigger: 'footer',
          start: 'top 60%',
          end: 'bottom bottom',
          scrub: 1,
        },
      })

    })

    return () => ctx.revert()
  }, [])
}
