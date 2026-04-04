import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ZCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-cta-char', {
        y: 72, opacity: 0, rotationX: -60,
        stagger: 0.025, duration: 0.75, ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from('.z-cta-sub', {
        y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        delay: 0.3,
      })
      gsap.from(btnRef.current, {
        y: 20, opacity: 0, scale: 0.96, duration: 0.6, ease: 'back.out(1.8)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
        delay: 0.5,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.35
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.35
    btn.style.transform = `translate(${x}px, ${y}px) scale(1.04)`
  }

  const handleMouseLeave = () => {
    if (btnRef.current) btnRef.current.style.transform = 'translate(0,0) scale(1)'
  }

  const LINE1 = 'Get your demo'
  const LINE2 = 'now.'

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Subtle glow */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(0,113,227,0.1) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Eyebrow */}
      <p style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
        fontSize: '12px',
        fontWeight: '600',
        color: '#0071e3',
        letterSpacing: '0.01em',
        marginBottom: '32px',
        position: 'relative',
        zIndex: 1,
      }}>
        Let's build yours
      </p>

      {/* Headline */}
      <h2 style={{ margin: '0 0 28px', perspective: '800px', position: 'relative', zIndex: 1 }}>
        {[LINE1, LINE2].map((line, li) => (
          <div
            key={li}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(52px, 9vw, 120px)',
              fontWeight: '700',
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#fff',
              display: 'block',
              transformStyle: 'preserve-3d',
            }}
          >
            {line.split('').map((ch, i) => (
              <span
                key={i}
                className="z-cta-char"
                style={{ display: 'inline-block', willChange: 'transform' }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
        ))}
      </h2>

      {/* Sub */}
      <p
        className="z-cta-sub"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: 'clamp(15px, 1.8vw, 19px)',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '460px',
          margin: '0 auto 48px',
          lineHeight: 1.6,
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Tell us about your business. We'll build a live demo site
        and send it to you — no payment required.
      </p>

      {/* CTA */}
      <a
        ref={btnRef}
        href="mailto:hello@zatreidessolutions.com"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '17px',
          fontWeight: '400',
          letterSpacing: '-0.01em',
          color: '#fff',
          background: '#0071e3',
          padding: '18px 44px',
          borderRadius: '980px',
          textDecoration: 'none',
          transition: 'transform 0.2s cubic-bezier(0.16,1,0.3,1), background 0.2s ease',
          display: 'inline-block',
          position: 'relative',
          zIndex: 2,
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0077ed' }}
      >
        Get your demo →
      </a>

      {/* Pricing hint */}
      <div style={{
        marginTop: '24px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        gap: '32px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[
          'Starting at $1,500',
          'Live in 48 hours',
          'No templates',
        ].map(item => (
          <span
            key={item}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '-0.01em',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}
