import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function SplitChars({ text, className }: { text: string; className: string }) {
  return (
    <>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={className}
          style={{ display: 'inline-block', willChange: 'transform, opacity' }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </>
  )
}

export default function ZHero() {
  const sectionRef  = useRef<HTMLElement>(null)
  const bgLayer1Ref = useRef<HTMLDivElement>(null)
  const bgLayer2Ref = useRef<HTMLDivElement>(null)
  const bgLayer3Ref = useRef<HTMLDivElement>(null)
  const line1Ref    = useRef<HTMLDivElement>(null)
  const line2Ref    = useRef<HTMLDivElement>(null)
  const subRef      = useRef<HTMLParagraphElement>(null)
  const ctaRef      = useRef<HTMLDivElement>(null)
  const eyebrowRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Parallax background layers ─────────────────────────────
      gsap.to(bgLayer1Ref.current, {
        y: -120,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(bgLayer2Ref.current, {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      gsap.to(bgLayer3Ref.current, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // ── Entrance timeline ──────────────────────────────────────
      const tl = gsap.timeline({ delay: 0.2 })

      tl.from(eyebrowRef.current, {
        y: 12, opacity: 0, duration: 0.6, ease: 'power3.out',
      })

      tl.from('.z-hero-line1 .zchar', {
        y: 80, opacity: 0, rotationX: -70,
        stagger: 0.02, duration: 0.7, ease: 'power4.out',
      }, '-=0.3')

      tl.from('.z-hero-line2 .zchar', {
        y: 80, opacity: 0, rotationX: -70,
        stagger: 0.02, duration: 0.7, ease: 'power4.out',
      }, '-=0.55')

      tl.from([subRef.current, ctaRef.current], {
        y: 24, opacity: 0, stagger: 0.1, duration: 0.65, ease: 'power3.out',
      }, '-=0.45')

      // ── Content fade on scroll ─────────────────────────────────
      gsap.to('.z-hero-content', {
        opacity: 0, y: -30, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center top', end: 'bottom top', scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#000',
        padding: '0 24px',
      }}
    >
      {/* ── Background Layer 1 — hero macbook image (deepest) ──── */}
      <div
        ref={bgLayer1Ref}
        style={{
          position: 'absolute',
          inset: '-10% 0',
          backgroundImage: 'url(/images/hero-macbook.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.14,
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      {/* ── Background Layer 2 — blue particles (mid depth) ─────── */}
      <div
        ref={bgLayer2Ref}
        style={{
          position: 'absolute',
          inset: '-5% 0',
          backgroundImage: 'url(/images/blue-particles.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.09,
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      {/* ── Background Layer 3 — glass panels (shallow) ─────────── */}
      <div
        ref={bgLayer3Ref}
        style={{
          position: 'absolute',
          inset: '-3% 0',
          backgroundImage: 'url(/images/glass-panels.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.05,
          zIndex: 0,
          willChange: 'transform',
        }}
      />

      {/* ── Top gradient (nav fade) ───────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '200px',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── Bottom gradient (bleed into next section) ───────────── */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '300px',
        background: 'linear-gradient(to top, #000 0%, transparent 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* ── Blue radial glow ────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(0,113,227,0.07) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Main content ────────────────────────────────────────── */}
      <div
        className="z-hero-content"
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1100px',
          width: '100%',
          paddingTop: '80px',
        }}
      >
        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#34c759',
            boxShadow: '0 0 8px rgba(52,199,89,0.8)',
          }} />
          <span style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.01em',
          }}>
            Accepting new clients
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          margin: '0 0 32px',
          perspective: '800px',
          perspectiveOrigin: 'center',
        }}>
          <div
            ref={line1Ref}
            className="z-hero-line1"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(56px, 9vw, 120px)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontWeight: '700',
              color: '#ffffff',
              display: 'block',
              transformStyle: 'preserve-3d',
            }}
          >
            <SplitChars text="Websites that" className="zchar" />
          </div>
          <div
            ref={line2Ref}
            className="z-hero-line2"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(56px, 9vw, 120px)',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              fontWeight: '700',
              color: '#ffffff',
              display: 'block',
              transformStyle: 'preserve-3d',
            }}
          >
            <SplitChars text="close\u00A0deals." className="zchar" />
          </div>
        </h1>

        {/* Sub copy */}
        <p
          ref={subRef}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(17px, 2vw, 21px)',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.6,
            maxWidth: '480px',
            margin: '0 auto 48px',
            letterSpacing: '-0.01em',
          }}
        >
          Custom sites built in 48 hours. Apple-level design.
          Priced to close clients, not impress investors.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a
            href="#contact"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
              fontSize: '17px',
              fontWeight: '400',
              letterSpacing: '-0.01em',
              padding: '16px 36px',
              background: '#0071e3',
              color: '#fff',
              borderRadius: '980px',
              textDecoration: 'none',
              transition: 'background 0.2s ease, transform 0.2s ease',
              display: 'inline-block',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#0077ed'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#0071e3'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            Get your demo
          </a>
          <a
            href="#work"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
              fontSize: '17px',
              fontWeight: '400',
              letterSpacing: '-0.01em',
              padding: '16px 36px',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '980px',
              textDecoration: 'none',
              backdropFilter: 'blur(10px)',
              transition: 'background 0.2s ease, transform 0.2s ease',
              display: 'inline-block',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.transform = 'scale(1.02)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            See the work ↓
          </a>
        </div>

        {/* Pricing callout */}
        <p style={{
          marginTop: '32px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.3)',
          letterSpacing: '-0.01em',
        }}>
          Starting at $1,500 — delivered in 48 hours.
        </p>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────────── */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}>
        <div style={{
          width: '1px', height: '44px',
          background: 'rgba(255,255,255,0.1)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: '100%', height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.5), transparent)',
            position: 'absolute',
            animation: 'scrollDot 1.8s ease infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
