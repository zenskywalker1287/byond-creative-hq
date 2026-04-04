import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { WordScrub } from './ZTextFX'

gsap.registerPlugin(ScrollTrigger)

const WORDS = [
  { text: 'Ready to be', color: 'rgba(245,245,245,0.4)' },
  { text: 'unforgettable?', color: '#f5f5f5' },
]

export default function S09CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef     = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Word rhythm reveal
      const wordEls = gsap.utils.toArray<HTMLElement>('.cta-word-wrap')
      wordEls.forEach((el, i) => {
        gsap.from(el.querySelector('.cta-word-inner'), {
          y: '100%', rotationX: -70, duration: 0.8,
          ease: 'power4.out',
          delay: i * 0.22,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        })
        if (i === 1) {
          gsap.fromTo(el.querySelector('.cta-word-inner'), { scale: 1.12 }, { scale: 1, duration: 0.5, ease: 'back.out(1.7)', delay: 0.44 + i * 0.22, scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' } })
        }
      })

      gsap.from('.cta-btn-wrap', {
        y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })

      gsap.from('.cta-sub', {
        opacity: 0, y: 20, duration: 0.8, delay: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = btnRef.current!.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top  - rect.height / 2
    gsap.to(btnRef.current, { x: x * 0.45, y: y * 0.45, duration: 0.3, ease: 'power2.out' })
  }
  const onMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: '#000000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,113,227,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Words */}
      <div style={{ marginBottom: '64px' }}>
        {WORDS.map((word, i) => (
          <div key={i} className="cta-word-wrap"
            style={{ overflow: 'hidden', marginBottom: i === 0 ? '8px' : '0' }}>
            <div className="cta-word-inner"
              style={{
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(64px, 10vw, 128px)',
                fontWeight: '800',
                letterSpacing: '-0.05em',
                lineHeight: 1,
                color: word.color,
                display: 'block',
                perspective: '600px',
                willChange: 'transform',
              }}
            >{word.text}</div>
          </div>
        ))}
      </div>

      {/* Magnetic button */}
      <div className="cta-btn-wrap" style={{ willChange: 'transform' }}>
        <a
          ref={btnRef}
          href="mailto:hello@zatreidessolutions.com"
          data-cursor
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '12px',
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '17px', fontWeight: '500',
            letterSpacing: '-0.02em',
            color: '#000000', background: '#0071e3',
            padding: '22px 56px', borderRadius: '980px',
            textDecoration: 'none',
            boxShadow: '0 0 60px rgba(0,113,227,0.3), 0 0 120px rgba(0,113,227,0.12)',
            willChange: 'transform',
          }}
        >
          Start Your Project →
        </a>
      </div>

      {/* Sub copy */}
      <div className="cta-sub" style={{ marginTop: '40px' }}>
        <WordScrub
          text="Starting at $1,500 · Live in 48 hours · No templates"
          style={{ fontFamily: '"Inter", -apple-system, sans-serif', fontSize: '14px', color: 'rgba(245,245,245,0.3)', letterSpacing: '-0.01em', lineHeight: 1.6 }}
          startOpacity={0.08}
          scrubStart="top 90%"
          scrubEnd="top 60%"
        />
      </div>

      {/* Logo */}
      <div style={{ marginTop: '80px', opacity: 0.15 }}>
        <span style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '14px', fontWeight: '700', letterSpacing: '-0.04em',
          color: '#f5f5f5',
        }}>Zatreides</span>
        <span style={{ fontSize: '14px', fontWeight: '700', color: '#0071e3' }}>.</span>
      </div>
    </section>
  )
}
