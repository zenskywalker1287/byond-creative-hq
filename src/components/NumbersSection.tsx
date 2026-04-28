import { useEffect, useRef, useState } from 'react'

const SCRAMBLE_CHARS = '0123456789%$+x#@!?'

interface StatItem {
  display: string
  label: string
}

const stats: StatItem[] = [
  { display: '554%',    label: 'EMAIL REVENUE INCREASE — HEALTHMATE SAUNA' },
  { display: '72%',     label: 'OF TOTAL REVENUE FROM EMAIL — MADCOW' },
  { display: 'NZ$126K', label: 'ATTRIBUTED TO EMAIL — SINGLE CAMPAIGN' },
  { display: 'A$112K',  label: 'REVENUE — MADCOW COLLARS' },
  { display: '124%',    label: 'KLAVIYO REVENUE GROWTH — INNERDOSE' },
]

export default function NumbersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [animated, setAnimated] = useState(false)
  const [scrambling, setScrambling] = useState<boolean[]>(stats.map(() => false))
  const [resolved, setResolved] = useState<boolean[]>(stats.map(() => false))

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true)
          stats.forEach((_, i) => {
            const delay = i * 200
            setTimeout(() => {
              setScrambling(prev => { const n = [...prev]; n[i] = true; return n })
              setTimeout(() => {
                setScrambling(prev => { const n = [...prev]; n[i] = false; return n })
                setResolved(prev => { const n = [...prev]; n[i] = true; return n })
              }, 400)
            }, delay)
          })
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [animated])

  const getDisplay = (stat: StatItem, i: number) => {
    if (scrambling[i]) {
      return stat.display.split('').map((c) =>
        /[A-Za-z0-9%$]/.test(c)
          ? SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
          : c
      ).join('')
    }
    return stat.display
  }

  return (
    <section
      ref={sectionRef}
      id="stats"
      data-fade-rise
      style={{
        padding: '100px 0 100px',
        background: '#0A0A0A',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(255,0,0,0.08)',
      }}
    >
      {/* Vertical rotated HEAT-style labels — absolute positioned */}
      <div className="vertical-label" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%) rotate(180deg)' }}>
        KLAVIYO DATA · 2024
      </div>
      <div className="vertical-label" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%) rotate(180deg)' }}>
        REAL RESULTS · DTC
      </div>

      {/* Section label + headline */}
      <div style={{ textAlign: 'center', marginBottom: '60px', padding: '0 32px' }}>
        <div className="section-label" style={{ marginBottom: '16px' }}>
          PROOF OF WORK — REAL KLAVIYO DATA
        </div>
        <h2 style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(40px,6vw,76px)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 0.93, margin: 0 }}>
          THE NUMBERS DON'T{' '}
          <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 700, color: '#FFFFFF', textTransform: 'none' }}>
            lie.
          </span>
        </h2>
      </div>

      {/* Bleeding horizontal stats */}
      <div style={{ width: '100%', overflowX: 'auto', overflowY: 'visible', paddingBottom: '20px' }}>
        <div style={{
          display: 'flex',
          gap: '0',
          alignItems: 'flex-end',
          minWidth: 'max-content',
          paddingLeft: '5vw',
        }}>
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                paddingRight: '48px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,0,0,0.15)' : 'none',
                paddingLeft: i > 0 ? '48px' : '0',
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`,
                position: 'relative',
              }}
            >
              {i > 0 && (
                <span style={{
                  position: 'absolute',
                  left: '-4px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#FF0000',
                  boxShadow: '0 0 10px rgba(255,0,0,0.8)',
                  animation: 'pulse 2s ease infinite',
                  display: 'block',
                }} />
              )}
              <div style={{
                fontFamily: "'Black Han Sans',sans-serif",
                fontSize: 'clamp(80px,15vw,180px)',
                lineHeight: 1,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {getDisplay(stat, i)}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: '11px',
                color: '#FF0000',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginTop: '8px',
                maxWidth: '240px',
                lineHeight: 1.4,
                opacity: resolved[i] ? 1 : 0,
                transition: `opacity 0.4s ease ${i * 0.12 + 0.5}s`,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
