import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function WordPulse() {
  const slotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const WORDS = [
      { text: 'Beautiful.', color: '#ffffff' },
      { text: 'Fast.',      color: '#ffffff' },
      { text: 'Yours.',     color: '#0071e3' },
    ]

    const showWord = (i: number) => {
      if (!slotRef.current) return
      const el = slotRef.current
      el.textContent = WORDS[i].text
      el.style.color  = WORDS[i].color
      gsap.fromTo(el,
        { y: 72, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.55, ease: 'power3.out',
          onComplete: () => {
            if (i < WORDS.length - 1) {
              gsap.to(el, { y: -72, opacity: 0, duration: 0.4, ease: 'power3.in', delay: 0.85,
                onComplete: () => showWord(i + 1) })
            } else {
              gsap.from(['.hero-sub', '.hero-cta'], {
                y: 28, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.2,
              })
            }
          }
        }
      )
    }
    gsap.delayedCall(3.2, () => showWord(0))
  }, [])

  return (
    <div style={{ height: 'clamp(60px, 9vw, 110px)', overflow: 'hidden', marginBottom: '24px' }}>
      <div ref={slotRef} style={{
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        fontSize: 'clamp(60px, 9vw, 110px)', fontWeight: '800',
        letterSpacing: '-0.05em', lineHeight: 1, color: '#ffffff',
        willChange: 'transform, opacity', display: 'block',
      }}>Beautiful.</div>
    </div>
  )
}

function MagneticCTA() {
  const btnRef = useRef<HTMLAnchorElement>(null)
  const onMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect()
    gsap.to(btnRef.current, {
      x: (e.clientX - rect.left - rect.width / 2) * 0.4,
      y: (e.clientY - rect.top - rect.height / 2) * 0.4,
      duration: 0.3, ease: 'power2.out',
    })
  }
  const onMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }
  return (
    <a ref={btnRef} href="#contact" className="hero-cta" data-cursor
      onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        fontFamily: '"Inter", -apple-system, sans-serif',
        fontSize: '16px', fontWeight: '500', letterSpacing: '-0.02em',
        color: '#fff', background: '#0071e3',
        padding: '18px 40px', borderRadius: '980px', textDecoration: 'none',
        boxShadow: '0 0 40px rgba(0,113,227,0.3)', willChange: 'transform',
      }}
    >Start Your Project <span>→</span></a>
  )
}

export default function S01Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const closedRef  = useRef<HTMLDivElement>(null)
  const centerRef  = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const glowRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3, defaults: { ease: 'power3.out' } })

      // ── Phase 1: Closed/opening MacBook rises in ──────────────────
      tl.fromTo(closedRef.current,
        { y: 80, opacity: 0, scale: 0.88 },
        { y: 0,  opacity: 1, scale: 1, duration: 1.0 },
        0
      )

      // Idle float
      gsap.to(closedRef.current, {
        y: '-=14', duration: 2.0, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.3,
      })

      // ── Phase 2: Blue glow "open" flash ──────────────────────────
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1.4, duration: 0.5 },
        1.5
      )

      // ── Phase 3: Closed fades, center opens ──────────────────────
      tl.to(closedRef.current,
        { opacity: 0, y: 16, duration: 0.4, ease: 'power3.in' },
        2.0
      )
      tl.fromTo(centerRef.current,
        { opacity: 0, scale: 0.85, y: 20 },
        { opacity: 1, scale: 1,   y: 0, duration: 0.8 },
        2.1
      )

      // Glow settles
      tl.to(glowRef.current,
        { opacity: 0.3, scale: 1.0, duration: 0.8 },
        2.5
      )

      // ── Phase 4: Left + Right MacBooks slide in ───────────────────
      tl.fromTo(leftRef.current,
        { opacity: 0, x: -180, scale: 0.8, rotationY: 25 },
        { opacity: 1, x: 0,   scale: 1,   rotationY: 0, duration: 0.9, ease: 'power2.out' },
        2.8
      )
      tl.fromTo(rightRef.current,
        { opacity: 0, x: 180, scale: 0.8, rotationY: -25 },
        { opacity: 1, x: 0,  scale: 1,   rotationY: 0, duration: 0.9, ease: 'power2.out' },
        2.8
      )

      // Scroll fade out
      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current, start: 'center top', end: 'bottom top', scrub: true,
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const macStyle: React.CSSProperties = {
    width: '100%',
    display: 'block',
    filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.9))',
  }

  return (
    <section ref={sectionRef} id="hero" style={{
      position: 'relative', minHeight: '100vh', background: '#000',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
    }}>
      {/* Gradients */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(ellipse 70% 50% at 50% 45%, rgba(0,60,150,0.12) 0%, transparent 70%),
          linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.7) 100%)
        `,
      }} />

      {/* Grid texture */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, opacity: 0.02, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* ── MacBook stage ──────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '92%', maxWidth: '1100px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '40px',
        perspective: '1200px',
      }}>
        {/* Glow */}
        <div ref={glowRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(0,113,227,0.22) 0%, transparent 65%)',
          opacity: 0, pointerEvents: 'none', filter: 'blur(40px)',
        }} />

        {/* Closed/opening MacBook — center, fades out */}
        <div ref={closedRef} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '38%', maxWidth: '360px', opacity: 0,
          zIndex: 3,
        }}>
          <img src="/images/macbook-closed.png" alt="" style={macStyle} />
        </div>

        {/* Left MacBook */}
        <div ref={leftRef} style={{
          width: '36%', opacity: 0, flexShrink: 0,
          transform: 'rotate(-4deg)',
          marginRight: '-2%',
          zIndex: 1,
        }}>
          <img src="/images/macbook-open.png" alt="" style={{
            ...macStyle,
            transform: 'scaleX(-1)',
          }} />
        </div>

        {/* Center MacBook */}
        <div ref={centerRef} style={{
          width: '38%', opacity: 0, flexShrink: 0,
          zIndex: 2, position: 'relative',
        }}>
          <img src="/images/macbook-open.png" alt="" style={macStyle} />
        </div>

        {/* Right MacBook */}
        <div ref={rightRef} style={{
          width: '36%', opacity: 0, flexShrink: 0,
          transform: 'rotate(4deg)',
          marginLeft: '-2%',
          zIndex: 1,
        }}>
          <img src="/images/macbook-open.png" alt="" style={macStyle} />
        </div>
      </div>

      {/* ── Copy ──────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 3, textAlign: 'center', padding: '0 40px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          marginBottom: '20px', justifyContent: 'center',
        }}>
          <span style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.25)', display: 'block' }} />
          <span style={{
            fontFamily: '"Inter", -apple-system, sans-serif', fontSize: '11px', fontWeight: '500',
            color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>SoCal Web Agency</span>
          <span style={{ width: '20px', height: '1px', background: 'rgba(255,255,255,0.25)', display: 'block' }} />
        </div>

        <WordPulse />

        <p className="hero-sub" style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(16px, 1.6vw, 19px)', fontWeight: '400',
          color: 'rgba(255,255,255,0.45)', lineHeight: 1.6,
          letterSpacing: '-0.02em', maxWidth: '420px',
          margin: '0 auto 36px',
        }}>
          Custom sites built in 48 hours.<br />
          Apple-level design. Priced to close.
        </p>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
          <MagneticCTA />
          <a href="#work" data-cursor className="hero-cta"
            style={{
              fontFamily: '"Inter", -apple-system, sans-serif', fontSize: '15px', fontWeight: '400',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
              letterSpacing: '-0.01em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.4)' }}
          >See the work ↓</a>
        </div>

        <p style={{
          marginTop: '28px', fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '12px', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.02em',
        }}>
          From $1,500 · Delivered in 48 hours · SoCal based
        </p>
      </div>

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px', zIndex: 4,
        background: 'linear-gradient(to top, #000 0%, transparent 100%)', pointerEvents: 'none',
      }} />

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%',
        transform: 'translateX(-50%)', zIndex: 5,
      }}>
        <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            width: '100%', height: '40%',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.4), transparent)',
            position: 'absolute', animation: 'scrollPulse 1.8s ease infinite',
          }} />
        </div>
      </div>

      <style>{`@keyframes scrollPulse { 0% { top: -40%; } 100% { top: 140%; } }`}</style>
    </section>
  )
}
