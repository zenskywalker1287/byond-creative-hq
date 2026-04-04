import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ROWS = [
  { feature: 'Delivery time',         zatreides: '48 hours',       agency: '4–8 weeks',       freelancer: '2–3 weeks' },
  { feature: 'Starting price',        zatreides: '$1,500',         agency: '$10,000+',        freelancer: '$2,500+' },
  { feature: 'Custom code',           zatreides: true,             agency: true,              freelancer: 'Sometimes' },
  { feature: 'No templates',          zatreides: true,             agency: 'Rarely',          freelancer: 'Sometimes' },
  { feature: 'GSAP animations',       zatreides: true,             agency: 'Extra cost',      freelancer: false },
  { feature: 'Revision window',       zatreides: '7 days',         agency: '1–2 rounds',      freelancer: '2 rounds' },
  { feature: 'Dedicated channel',     zatreides: true,             agency: 'Account manager', freelancer: false },
  { feature: 'Live demo first',       zatreides: true,             agency: false,             freelancer: false },
]

function Cell({ value, highlight }: { value: string | boolean; highlight?: boolean }) {
  if (value === true) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: highlight ? 'rgba(0,113,227,0.15)' : 'rgba(52,199,89,0.12)',
          border: `1px solid ${highlight ? 'rgba(0,113,227,0.4)' : 'rgba(52,199,89,0.3)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: highlight ? '#0071e3' : '#34c759',
          }} />
        </div>
      </div>
    )
  }
  if (value === false) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          width: '18px', height: '2px', borderRadius: '1px',
          background: 'rgba(255,255,255,0.12)',
        }} />
      </div>
    )
  }
  return (
    <span style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      fontSize: '13px', letterSpacing: '-0.01em',
      color: highlight ? '#fff' : 'rgba(255,255,255,0.45)',
      fontWeight: highlight ? '500' : '400',
    }}>
      {value as string}
    </span>
  )
}

export default function ZComparison() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-compare-heading', {
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-compare-heading', start: 'top 85%' },
      })
      gsap.from('.z-compare-table', {
        y: 60, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-compare-table', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const COL_W = ['40%', '20%', '20%', '20%']

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
        <div className="z-compare-heading" style={{ marginBottom: '72px', textAlign: 'center' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px', fontWeight: '600', color: '#0071e3',
            letterSpacing: '0.01em', marginBottom: '16px',
          }}>
            Why Zatreides
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '700',
            letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, margin: 0,
          }}>
            There's no comparison.
          </h2>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '17px', color: 'rgba(255,255,255,0.45)', marginTop: '20px',
            maxWidth: '440px', margin: '20px auto 0', lineHeight: 1.6, letterSpacing: '-0.01em',
          }}>
            48 hours. Custom code. $1,500 starting price. No agency comes close.
          </p>
        </div>

        {/* Table */}
        <div
          className="z-compare-table"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: COL_W.join(' '),
            background: '#080808',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ padding: '20px 32px' }} />
            {[
              { label: 'Zatreides', highlight: true },
              { label: 'Agency',    highlight: false },
              { label: 'Freelancer', highlight: false },
            ].map(col => (
              <div
                key={col.label}
                style={{
                  padding: '20px 16px',
                  textAlign: 'center',
                  background: col.highlight ? 'rgba(0,113,227,0.06)' : 'transparent',
                  borderLeft: col.highlight ? '1px solid rgba(0,113,227,0.15)' : '1px solid rgba(255,255,255,0.06)',
                  position: 'relative',
                }}
              >
                {col.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '2px',
                    background: '#0071e3',
                  }} />
                )}
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: '13px',
                  fontWeight: col.highlight ? '600' : '400',
                  color: col.highlight ? '#fff' : 'rgba(255,255,255,0.4)',
                  letterSpacing: '-0.01em',
                }}>
                  {col.label}
                </span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid',
                gridTemplateColumns: COL_W.join(' '),
                borderBottom: i < ROWS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {/* Feature name */}
              <div style={{ padding: '18px 32px', display: 'flex', alignItems: 'center' }}>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '14px', color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '-0.01em',
                }}>
                  {row.feature}
                </span>
              </div>
              {/* Zatreides */}
              <div style={{
                padding: '18px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(0,113,227,0.04)',
                borderLeft: '1px solid rgba(0,113,227,0.12)',
              }}>
                <Cell value={row.zatreides} highlight />
              </div>
              {/* Agency */}
              <div style={{
                padding: '18px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderLeft: '1px solid rgba(255,255,255,0.05)',
              }}>
                <Cell value={row.agency} />
              </div>
              {/* Freelancer */}
              <div style={{
                padding: '18px 16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderLeft: '1px solid rgba(255,255,255,0.05)',
              }}>
                <Cell value={row.freelancer} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <a
            href="#contact"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '17px', fontWeight: '400', letterSpacing: '-0.01em',
              color: '#fff', background: '#0071e3',
              padding: '18px 44px', borderRadius: '980px',
              textDecoration: 'none', display: 'inline-block',
              transition: 'background 0.2s ease, transform 0.2s ease',
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
            Start with $1,500 →
          </a>
        </div>
      </div>
    </section>
  )
}
