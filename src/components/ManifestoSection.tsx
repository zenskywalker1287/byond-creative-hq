import { useEffect, useRef, useState } from 'react'
import { TextRoll } from './ui/TextRoll'

const LINES = [
  { text: 'THE COPY PRINTS.', color: '#FFFFFF' },
  { text: 'THE REVENUE', color: '#FFFFFF' },
  { text: 'FOLLOWS.', color: '#FF0000' },
  { text: 'NO EXCUSES.', color: '#FFFFFF' },
]

export default function ManifestoSection() {
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#0A0A0A',
        padding: '160px 32px 180px',
        borderTop: '1px solid rgba(255,0,0,0.08)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Faint red glow, top-left */}
      <div style={{
        position: 'absolute',
        top: '-120px',
        left: '-80px',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(ellipse at center, rgba(255,0,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Section label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '64px',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>
          MANIFESTO
        </div>

        {/* Massive type lines — TextRoll entrance */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <TextRoll
                text={line.text}
                staggerDelay={0.03}
                duration={0.55}
                style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: 'clamp(4.5rem, 12vw, 14rem)',
                  lineHeight: 0.87,
                  color: line.color,
                  letterSpacing: '-0.01em',
                  display: 'block',
                }}
              />
            </div>
          ))}
        </div>

        {/* Rule + sub-copy */}
        <div style={{
          marginTop: '72px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '40px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.7s 0.6s ease, transform 0.7s 0.6s ease',
        }}>
          <div style={{
            width: '48px',
            height: '1px',
            background: '#FF0000',
            marginTop: '12px',
            flexShrink: 0,
          }} />
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: '#FFFFFF',
            opacity: 0.45,
            lineHeight: 1.6,
            margin: 0,
            maxWidth: '560px',
          }}>
            Email isn't a channel. It's a compounding asset. Every sequence we build is engineered to print while you sleep — flows that retain, recover, and repeat.
          </p>
        </div>

      </div>
    </section>
  )
}
