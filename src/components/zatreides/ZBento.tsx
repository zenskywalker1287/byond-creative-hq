import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ZBento() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-bento-heading', {
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-bento-heading', start: 'top 85%' },
      })

      gsap.from('.z-bento-card', {
        y: 60, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-bento-card', start: 'top 80%' },
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
        <div className="z-bento-heading" style={{ marginBottom: '56px', textAlign: 'center' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px', fontWeight: '600', color: '#0071e3',
            letterSpacing: '0.01em', marginBottom: '16px',
          }}>
            What you get
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '700',
            letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, margin: 0,
          }}>
            Everything.<br />Nothing missing.
          </h2>
        </div>

        {/* Bento grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: '80px',
          gap: '12px',
        }}>

          {/* Card 1 — BIG: Hero image + 48hr delivery */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 7',
              gridRow: 'span 5',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <img
              src="/images/hero-macbook.jpg"
              alt="48-Hour Delivery"
              style={{
                position: 'absolute',
                inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                opacity: 0.25,
                transition: 'opacity 0.4s ease, transform 0.6s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.opacity = '0.35'
                e.currentTarget.style.transform = 'scale(1.03)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.opacity = '0.25'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, rgba(0,113,227,0.08) 0%, transparent 60%)',
            }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '32px',
            }}>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: '700',
                letterSpacing: '-0.04em', color: '#fff', lineHeight: 0.95,
                margin: '0 0 12px',
              }}>
                48hrs.
              </p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px', color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.5, margin: 0, maxWidth: '320px',
              }}>
                Brief to live URL. Guaranteed. No waiting weeks for an agency.
              </p>
            </div>
          </div>

          {/* Card 2 — Custom code */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 5',
              gridRow: 'span 2',
              borderRadius: '20px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '28px 28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              overflow: 'hidden', position: 'relative',
              cursor: 'default',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <div style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: '36px', fontWeight: '700',
              letterSpacing: '-0.04em', color: '#fff', lineHeight: 1,
            }}>
              100%
            </div>
            <div>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: '17px', fontWeight: '600', color: '#fff',
                letterSpacing: '-0.02em', margin: '0 0 4px',
              }}>Custom code</p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.5, margin: 0,
              }}>No Squarespace. No Wix. Pure React + Vite, coded from scratch.</p>
            </div>
          </div>

          {/* Card 3 — GSAP */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 5',
              gridRow: 'span 3',
              borderRadius: '20px',
              background: 'rgba(0,113,227,0.06)',
              border: '1px solid rgba(0,113,227,0.18)',
              padding: '28px 28px',
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              overflow: 'hidden', position: 'relative',
              cursor: 'default',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(0,113,227,0.35)'
              e.currentTarget.style.background = 'rgba(0,113,227,0.1)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(0,113,227,0.18)'
              e.currentTarget.style.background = 'rgba(0,113,227,0.06)'
            }}
          >
            {/* Animated orb */}
            <div style={{
              position: 'absolute',
              top: '20px', right: '20px',
              width: '80px', height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,113,227,0.4) 0%, transparent 70%)',
              animation: 'float-slow 4s ease-in-out infinite',
            }} />
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: '19px', fontWeight: '700', color: '#fff',
              letterSpacing: '-0.025em', margin: '0 0 6px',
            }}>
              GSAP Animations
            </p>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '13px', color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.55, margin: 0,
            }}>
              Character splits, scroll parallax, magnetic buttons. Every site animates like Apple.com.
            </p>
          </div>

          {/* Card 4 — $1,500 */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 3',
              gridRow: 'span 2',
              borderRadius: '20px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'default',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: '26px', fontWeight: '700', color: '#fff',
              letterSpacing: '-0.03em', lineHeight: 1, margin: 0,
            }}>
              $1,500
            </p>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '12px', color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.5, margin: 0,
            }}>
              Starting price. No hidden fees.
            </p>
          </div>

          {/* Card 5 — Mobile-first */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 4',
              gridRow: 'span 2',
              borderRadius: '20px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '24px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              cursor: 'default',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {/* Mini phone/desktop icons using CSS */}
              {['28px', '20px'].map((w, i) => (
                <div key={i} style={{
                  width: w, height: i === 0 ? '18px' : '24px',
                  borderRadius: '3px',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  background: 'transparent',
                }} />
              ))}
            </div>
            <div>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: '15px', fontWeight: '600', color: '#fff',
                letterSpacing: '-0.02em', margin: '0 0 3px',
              }}>
                Mobile-first
              </p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                margin: 0,
              }}>
                Every breakpoint tested.
              </p>
            </div>
          </div>

          {/* Card 6 — 7-day revisions */}
          <div
            className="z-bento-card"
            style={{
              gridColumn: 'span 5',
              gridRow: 'span 2',
              borderRadius: '20px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: '24px 28px',
              display: 'flex', alignItems: 'center', gap: '20px',
              cursor: 'default',
              transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          >
            <div style={{
              width: '44px', height: '44px', flexShrink: 0,
              borderRadius: '12px',
              background: 'rgba(52,199,89,0.1)',
              border: '1px solid rgba(52,199,89,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34c759' }} />
            </div>
            <div>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                fontSize: '15px', fontWeight: '600', color: '#fff',
                letterSpacing: '-0.02em', margin: '0 0 3px',
              }}>
                7-day revision window
              </p>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '12px', color: 'rgba(255,255,255,0.35)',
                margin: 0,
              }}>
                Unlimited edits. One flat rate. No surprises.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
