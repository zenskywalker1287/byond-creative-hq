import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PERSONAS = [
  {
    id: 'real-estate',
    label: '01',
    type: 'Real Estate Agent',
    headline: 'The agent who should already be the name in their market.',
    pains: [
      "Stuck on the broker's template site",
      "Losing listings to agents who look more legit online",
      "Spending money on Zillow leads instead of owning their brand",
      "Ready to be the name in their market — not just a name",
    ],
    close: 'The best agents in SoCal don\'t wait for referrals. Their website works while they sleep.',
    color: '#111111',
    accent: '#4a9eff',
  },
  {
    id: 'med-spa',
    label: '02',
    type: 'Med Spa Owner',
    headline: 'Beautiful spa. Website doesn\'t match the experience.',
    pains: [
      "Beautiful spa. Website doesn't match the experience",
      "Losing bookings to bigger chains with worse results",
      "Clients arrive expecting luxury — site looks like 2014",
      "Ready for a digital presence as premium as their treatments",
    ],
    close: 'Your clients trust you with their face. Your website should earn that trust before they walk in.',
    color: '#111111',
    accent: '#c084fc',
  },
  {
    id: 'contractor',
    label: '03',
    type: 'Auto Contractor',
    headline: 'Best work in the area. Google doesn\'t know it.',
    pains: [
      "Best work in the area. Google doesn't know it",
      "Competitors with worse shops ranking above them",
      "Relying on word of mouth that's already maxed out",
      "No time to deal with websites — needs it handled",
    ],
    close: 'You build the best. Your website should be the proof.',
    color: '#1a0f00',
    accent: '#fb923c',
  },
  {
    id: 'local',
    label: '04',
    type: 'Local Business Owner',
    headline: 'Your community would support you. If they knew you existed.',
    pains: [
      "Competing against chains with budgets they'll never match",
      "Great reviews — no one can find them",
      "Website is either nonexistent or embarrassing",
      "Their community would support them — if they knew they existed",
    ],
    close: "The best local brands in SoCal aren't just businesses. They're landmarks. Let's make you one.",
    color: '#0a1a0a',
    accent: '#4ade80',
  },
]

export default function S07WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      PERSONAS.forEach((persona) => {
        const trigger = `.persona-${persona.id}`

        gsap.from(`${trigger} .persona-headline`, {
          y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top 70%',
          },
        })

        gsap.from(`${trigger} .persona-close`, {
          opacity: 0, y: 20, duration: 0.8, delay: 0.4, ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top 70%',
          },
        })

        // MacBook entrance animation
        gsap.fromTo(
          `.persona-mac-${persona.id}`,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: trigger,
              start: 'top 70%',
            },
          }
        )

        // Pain points entrance
        gsap.from(`${trigger} .persona-pain`, {
          x: -20, opacity: 0,
          stagger: 0.08, duration: 0.6, ease: 'power3.out',
          scrollTrigger: {
            trigger: trigger,
            start: 'top 70%',
          },
        })

        // MacBook idle float
        gsap.to(`.persona-mac-${persona.id}`, {
          y: -12,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    }, sectionRef)

    // 3D tilt handlers — registered outside gsap.context so we can use refs
    const cleanups: (() => void)[] = []

    PERSONAS.forEach((persona) => {
      const container = document.querySelector<HTMLDivElement>(`.persona-mac-container-${persona.id}`)
      const img = document.querySelector<HTMLImageElement>(`.persona-mac-${persona.id}`)
      if (!container || !img) return

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / (rect.width / 2)
        const dy = (e.clientY - cy) / (rect.height / 2)
        gsap.to(img, {
          rotateY: dx * 16,
          rotateX: -dy * 10,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        })
      }

      const onMouseLeave = () => {
        gsap.to(img, {
          rotateY: 0,
          rotateX: 0,
          duration: 1.2,
          ease: 'elastic.out(1, 0.4)',
          transformPerspective: 1000,
        })
      }

      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseleave', onMouseLeave)

      cleanups.push(() => {
        container.removeEventListener('mousemove', onMouseMove)
        container.removeEventListener('mouseleave', onMouseLeave)
      })
    })

    return () => {
      ctx.revert()
      cleanups.forEach((fn) => fn())
    }
  }, [])

  return (
    <section
      id="for-you"
      ref={sectionRef}
      style={{ background: '#000000' }}
    >
      {/* Section intro */}
      <div style={{
        padding: '120px 40px 80px',
        maxWidth: '1100px', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '12px', fontWeight: '600',
          color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
          marginBottom: '20px',
        }}>Who it's for</p>
        <h2 style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(44px, 7vw, 88px)',
          fontWeight: '800', letterSpacing: '-0.05em',
          color: '#f5f5f5', lineHeight: 1,
        }}>Built for SoCal's best.</h2>
      </div>

      {/* Personas */}
      {PERSONAS.map((persona) => (
        <div
          key={persona.id}
          className={`persona-${persona.id}`}
          style={{
            borderTop: '1px solid rgba(245,245,245,0.06)',
            padding: '80px 40px',
            maxWidth: '1100px', margin: '0 auto',
          }}
        >
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}>
            {/* Left: label + headline + close */}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px',
              }}>
                <span style={{
                  fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
                  color: 'rgba(245,245,245,0.3)', letterSpacing: '0.04em',
                }}>{persona.label}</span>
                <span style={{
                  fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
                  color: persona.accent, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>{persona.type}</span>
              </div>

              <h3
                className="persona-headline"
                style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 'clamp(28px, 3vw, 40px)',
                  fontWeight: '700', letterSpacing: '-0.04em',
                  color: '#f5f5f5', lineHeight: 1.2,
                  marginBottom: '40px',
                }}
              >{persona.headline}</h3>

              <p
                className="persona-close"
                style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '16px', fontWeight: '400',
                  color: 'rgba(245,245,245,0.55)', lineHeight: 1.65,
                  letterSpacing: '-0.01em', marginBottom: '32px',
                  fontStyle: 'italic',
                }}
              >"{persona.close}"</p>

              <a href="#contact" data-cursor
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: '500',
                  color: '#000000', background: persona.accent,
                  padding: '10px 20px', borderRadius: '980px', textDecoration: 'none',
                  letterSpacing: '-0.01em',
                }}
              >This is me →</a>
            </div>

            {/* Right: floating MacBook + pain points below */}
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
            }}>
              {/* MacBook container with perspective for 3D tilt */}
              <div
                className={`persona-mac-container-${persona.id}`}
                style={{
                  width: '100%',
                  perspective: '1000px',
                  cursor: 'default',
                }}
              >
                <img
                  src="/images/macbook-open.png"
                  alt="MacBook"
                  className={`persona-mac-${persona.id}`}
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'drop-shadow(0 32px 80px rgba(0,0,0,0.8))',
                    willChange: 'transform',
                  }}
                />
              </div>

              {/* Pain points as a tight list below MacBook */}
              <div style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                {persona.pains.map((pain, j) => (
                  <div
                    key={j}
                    className="persona-pain"
                    style={{
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: persona.accent,
                      marginTop: '6px',
                      flexShrink: 0,
                    }} />
                    <span style={{
                      fontFamily: '"Inter", -apple-system, sans-serif',
                      fontSize: '14px',
                      color: 'rgba(245,245,245,0.65)',
                      lineHeight: 1.5,
                    }}>{pain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Section exit */}
      <div style={{
        borderTop: '1px solid rgba(245,245,245,0.06)',
        padding: '80px 40px',
        maxWidth: '1100px', margin: '0 auto',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)', fontWeight: '300',
          color: 'rgba(245,245,245,0.5)', letterSpacing: '-0.02em',
          marginBottom: '24px',
        }}>
          Don't see yourself here? You probably still need this.
        </p>
        <a href="#contact" data-cursor
          style={{
            fontFamily: '"Inter", sans-serif', fontSize: '15px', fontWeight: '500',
            color: '#000000', background: '#0071e3',
            padding: '14px 32px', borderRadius: '980px', textDecoration: 'none',
          }}
        >Let's talk anyway →</a>
      </div>
    </section>
  )
}
