import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    hours: '0–2 hrs',
    title: 'Brief',
    desc: 'You tell us about your business, your clients, and your goals. 15-minute call or a Loom. That\'s it.',
    deliverable: 'Design brief + component spec locked in.',
    items: ['Brand colors & fonts', 'Key copy points', 'Target audience', 'Pages needed'],
  },
  {
    num: '02',
    hours: '2–24 hrs',
    title: 'Design',
    desc: 'We design every component from scratch — hero, nav, sections, footer. No templates touched.',
    deliverable: 'Full site design ready for your review.',
    items: ['Custom component library', 'GSAP animations planned', 'Mobile breakpoints mapped', 'Copy finalized'],
  },
  {
    num: '03',
    hours: '24–48 hrs',
    title: 'Build',
    desc: 'Custom React + Vite build. Every animation coded by hand. Optimized to load fast and close clients.',
    deliverable: 'Production-ready codebase with live URL.',
    items: ['React + Vite + TypeScript', 'GSAP scroll animations', 'Mobile-responsive', 'SEO metadata'],
  },
  {
    num: '04',
    hours: '48 hrs',
    title: 'Deliver',
    desc: 'Live URL sent to your inbox. 7-day revision window included. Full source code ownership.',
    deliverable: 'Live site + full source code + revision window.',
    items: ['Live hosted URL', '7-day revisions', 'Full code ownership', 'Deployment guide'],
  },
]

export default function ZProcess() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-process-heading', {
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-process-heading', start: 'top 85%' },
      })

      gsap.from('.z-step-card', {
        y: 64, opacity: 0, stagger: 0.12, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-step-card', start: 'top 80%' },
      })

      // Progress bar draw
      gsap.from('.z-progress-line', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.6, ease: 'power3.inOut',
        scrollTrigger: { trigger: '.z-progress-line', start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        background: '#000',
        padding: '120px 40px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <div className="z-process-heading" style={{ marginBottom: '80px' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px', fontWeight: '600', color: '#0071e3',
            letterSpacing: '0.01em', marginBottom: '16px',
          }}>
            How it works
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <h2 style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '700',
              letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, margin: 0,
            }}>
              Brief to live<br />in 48 hours.
            </h2>
            <div style={{
              padding: '20px 28px',
              border: '1px solid rgba(0,113,227,0.2)',
              borderRadius: '14px',
              background: 'rgba(0,113,227,0.05)',
            }}>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '12px', fontWeight: '600', color: 'rgba(0,113,227,0.7)',
                letterSpacing: '0.01em', marginBottom: '8px', textTransform: 'uppercase',
              }}>
                Guaranteed
              </p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: '48px', fontWeight: '700', letterSpacing: '-0.04em',
                color: '#fff', lineHeight: 1, margin: '0 0 4px',
              }}>
                48
              </p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px', color: 'rgba(255,255,255,0.35)',
                letterSpacing: '-0.01em', margin: 0,
              }}>
                hours to live URL
              </p>
            </div>
          </div>
        </div>

        {/* Progress line */}
        <div style={{ position: 'relative', marginBottom: '48px' }}>
          <div style={{
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            position: 'relative',
          }}>
            <div
              className="z-progress-line"
              style={{
                position: 'absolute',
                top: 0, left: 0,
                height: '1px',
                width: '100%',
                background: 'linear-gradient(90deg, #0071e3 0%, rgba(0,113,227,0.3) 100%)',
              }}
            />
          </div>
        </div>

        {/* Step cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="z-step-card"
              style={{
                background: '#000',
                padding: '40px 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#040404' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#000' }}
            >
              {/* Step num + hours */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: '32px', fontWeight: '700', letterSpacing: '-0.04em',
                  color: 'rgba(255,255,255,0.12)', lineHeight: 1,
                }}>
                  {step.num}
                </span>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px', color: '#0071e3', fontWeight: '500',
                  letterSpacing: '0.01em',
                }}>
                  {step.hours}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

              {/* Title */}
              <h3 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: '22px', fontWeight: '700', letterSpacing: '-0.025em',
                color: '#fff', margin: 0, lineHeight: 1.1,
              }}>
                {step.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '14px', fontWeight: '400', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.65, letterSpacing: '-0.01em', margin: 0, flex: 1,
              }}>
                {step.desc}
              </p>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {step.items.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(0,113,227,0.6)', flexShrink: 0 }} />
                    <span style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                    }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Deliverable */}
              <div style={{
                padding: '10px 14px',
                background: 'rgba(0,113,227,0.06)',
                border: '1px solid rgba(0,113,227,0.15)',
                borderRadius: '8px',
              }}>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '12px', color: 'rgba(0,113,227,0.8)',
                  lineHeight: 1.5, margin: 0, letterSpacing: '-0.01em',
                }}>
                  {step.deliverable}
                </p>
              </div>

              {/* Step connector dot */}
              {i < STEPS.length - 1 && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  right: '-1px',
                  transform: 'translateY(-50%)',
                  width: '4px', height: '4px',
                  borderRadius: '50%',
                  background: 'rgba(0,113,227,0.4)',
                  zIndex: 2,
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div style={{
          marginTop: '48px',
          padding: '32px 40px',
          background: 'rgba(0,113,227,0.04)',
          border: '1px solid rgba(0,113,227,0.15)',
          borderRadius: '14px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '16px', fontStyle: 'italic',
            color: 'rgba(255,255,255,0.6)', lineHeight: 1.65,
            maxWidth: '580px', margin: '0 auto', letterSpacing: '-0.01em',
          }}>
            "If we don't deliver your live site in 48 hours, you pay nothing. That's the guarantee."
          </p>
        </div>
      </div>
    </section>
  )
}
