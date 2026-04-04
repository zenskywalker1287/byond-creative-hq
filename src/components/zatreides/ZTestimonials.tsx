import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'I gave them a brief on Monday. By Wednesday I had a live site that looks like it cost $20,000. My clients are impressed every single time.',
    name: 'Marcus T.',
    role: 'Brand Consultant',
    avatar: 'M',
  },
  {
    quote: 'No other agency delivers this fast without cutting corners. The design is clean, the code is tight, and it converts. That\'s all I care about.',
    name: 'Aisha R.',
    role: 'E-Commerce Owner',
    avatar: 'A',
  },
  {
    quote: 'The MacBook-level polish on a startup budget. I close deals with the demo alone — before they even see pricing.',
    name: 'Jordan K.',
    role: 'Sales Consultant',
    avatar: 'J',
  },
]

export default function ZTestimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-testimonials-heading', {
        y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-testimonials-heading', start: 'top 85%' },
      })

      gsap.from('.z-testimonial-card', {
        y: 64, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-testimonial-card', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        padding: '120px 40px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <div className="z-testimonials-heading" style={{ marginBottom: '72px', textAlign: 'center' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px', fontWeight: '600', color: '#0071e3',
            letterSpacing: '0.01em', marginBottom: '16px',
          }}>
            What clients say
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '700',
            letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, margin: 0,
          }}>
            The results speak.
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '20px',
          overflow: 'hidden',
        }}>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="z-testimonial-card"
              style={{
                background: '#000',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '32px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#050505' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#000' }}
            >
              {/* Quote mark */}
              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", serif',
                fontSize: '48px',
                lineHeight: 1,
                color: 'rgba(0,113,227,0.3)',
                fontWeight: '700',
              }}>
                "
              </div>

              {/* Quote */}
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '17px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.8)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
                margin: 0,
                flex: 1,
              }}>
                {t.quote}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(0,113,227,0.15)',
                  border: '1px solid rgba(0,113,227,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                    fontSize: '14px', fontWeight: '600', color: '#0071e3',
                  }}>{t.avatar}</span>
                </div>
                <div>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '13px', fontWeight: '600', color: '#fff',
                    margin: '0 0 2px', letterSpacing: '-0.01em',
                  }}>{t.name}</p>
                  <p style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                    margin: 0, letterSpacing: '-0.01em',
                  }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}>
          {[
            '48-hour delivery guaranteed',
            'No payment until you approve',
            'Full ownership of all code',
          ].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                border: '1px solid rgba(52,199,89,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34c759' }} />
              </div>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                letterSpacing: '-0.01em',
              }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
