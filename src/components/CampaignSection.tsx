import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const campaigns = [
  {
    title: 'BLACK FRIDAY DOMINATION',
    brand: 'GYMSHARK',
    type: 'CAMPAIGN SERIES',
    result: '$180K IN 72 HOURS',
    emails: 12,
  },
  {
    title: 'WELCOME FLOW 2.0',
    brand: 'INNERDOSE',
    type: 'AUTOMATED FLOW',
    result: '+340% FLOW REVENUE',
    emails: 8,
  },
  {
    title: 'SUMMER REACTIVATION',
    brand: 'LUMI SKINCARE',
    type: 'WINBACK CAMPAIGN',
    result: '12.4% REACTIVATION',
    emails: 6,
  },
]

export default function CampaignSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([])
  const labelRef   = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: labelRef.current, start: 'top 85%' } }
        )
      }
      if (headRef.current) {
        gsap.fromTo(headRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: headRef.current, start: 'top 85%' } }
        )
      }
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: 'power3.out', delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 88%' } }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{ padding: '100px 32px', background: '#0A0A0A' }}>

      <div
        ref={labelRef}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '16px',
          textAlign: 'center',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        CAMPAIGN SHOWCASE<span className="typewriter-cursor" />
      </div>

      <h2
        ref={headRef}
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(40px, 6vw, 80px)',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '80px',
          lineHeight: 0.88,
          letterSpacing: '-0.01em',
        }}
      >
        BUILT TO <span style={{ color: '#FF0000' }}>CONVERT</span>
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', maxWidth: '1000px', margin: '0 auto' }}>
        {campaigns.map((c, i) => (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el }}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '72px 1fr auto',
              gap: '0',
              alignItems: 'stretch',
              borderBottom: '1px solid rgba(255,0,0,0.1)',
              borderTop: i === 0 ? '1px solid rgba(255,0,0,0.1)' : 'none',
              cursor: 'pointer',
              transition: 'background 0.3s ease',
              overflow: 'hidden',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,0,0,0.03)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            {/* Index column */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRight: '1px solid rgba(255,0,0,0.1)',
              padding: '32px 0',
            }}>
              {/* Large decorative number background */}
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '120px',
                color: 'rgba(255,0,0,0.06)',
                lineHeight: 1,
                position: 'absolute',
                left: '-10px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'rgba(255,0,0,0.5)',
                letterSpacing: '0.15em',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>

            {/* Main content */}
            <div style={{ padding: '32px 40px' }}>
              {/* Brand + type */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: '#FF0000',
                  letterSpacing: '0.2em',
                }}>
                  {c.brand}
                </div>
                <div style={{
                  width: '1px',
                  height: '10px',
                  background: 'rgba(240,237,232,0.15)',
                }}/>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  color: 'rgba(240,237,232,0.3)',
                  letterSpacing: '0.15em',
                }}>
                  {c.type}
                </div>
              </div>

              {/* Title */}
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#FFFFFF',
                lineHeight: 0.9,
                letterSpacing: '0.01em',
                marginBottom: '12px',
              }}>
                {c.title}
              </div>

              {/* Email count */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: 'rgba(240,237,232,0.25)',
                letterSpacing: '0.18em',
              }}>
                [{c.emails} EMAILS IN SEQUENCE]
              </div>
            </div>

            {/* Result column */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '32px 40px 32px 24px',
              borderLeft: '1px solid rgba(255,0,0,0.1)',
            }}>
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(22px, 3vw, 40px)',
                color: '#FF0000',
                lineHeight: 0.9,
                textAlign: 'right',
                letterSpacing: '0.01em',
              }}>
                {c.result}
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  )
}
