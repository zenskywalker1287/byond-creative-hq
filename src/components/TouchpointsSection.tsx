import { useState, useRef, useEffect } from 'react'

const PHASES = [
  {
    range: '1–5',
    label: 'INOCULATION',
    principle: 'Psychological Inoculation Theory',
    desc: 'Protect against cheap alternatives. Build authority before competitors even enter the conversation.',
    detail: 'Pre-emptive defense. The prospect becomes resistant to competing messages because you got there first. Every word builds a wall around your brand.',
    color: '#FF0000',
  },
  {
    range: '6–15',
    label: 'OBJECTION CRUSHER',
    principle: 'Cognitive Dissonance Reduction',
    desc: 'Handle shame, doubt, confusion, price resistance — before they even articulate it.',
    detail: 'Remove every barrier between desire and action. Each touchpoint kills a specific objection. By touch 15, the only thing left is the buy button.',
    color: '#FF0000',
  },
  {
    range: '16–30',
    label: 'IDENTITY BRIDGE',
    principle: 'Social Identity Theory',
    desc: 'Make them part of the tribe. Belonging > buying.',
    detail: 'The product becomes a symbol. Purchasing becomes an act of self-expression, not consumption. They don\'t buy from you — they become you.',
    color: '#FF0000',
  },
]

export default function TouchpointsSection() {
  const [activePhase, setActivePhase] = useState(0)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!progressRef.current) return
    progressRef.current.style.width = `${((activePhase + 1) / PHASES.length) * 100}%`
  }, [activePhase])

  return (
    <section
      ref={sectionRef}
      data-fade-rise
      style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255,0,0,0.08)',
        padding: '120px 32px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.25em',
          marginBottom: '24px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          SCIENCE
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(2.5rem, 6vw, 5.5rem)',
          lineHeight: 0.92,
          color: '#FFFFFF',
          margin: '0 0 12px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease',
        }}>
          WHY 30 TOUCHPOINTS<br />
          IS THE{' '}
          <span style={{ color: '#FF0000' }}>MINIMUM</span>{' '}
          IN 2026.
        </h2>

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px',
          color: '#FFFFFF',
          opacity: inView ? 0.5 : 0,
          fontStyle: 'italic',
          marginBottom: '72px',
          transition: 'opacity 0.6s 0.2s ease',
        }}>
          A psychology textbook designed by a retention strategist.
        </p>

        {/* Progress bar */}
        <div style={{
          position: 'relative',
          height: '1px',
          background: 'rgba(240,237,232,0.08)',
          marginBottom: '48px',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s 0.25s ease',
        }}>
          <div
            ref={progressRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: '#FF0000',
              width: `${((activePhase + 1) / PHASES.length) * 100}%`,
              transition: 'width 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
          {/* Glowing dot at end of progress */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: `${((activePhase + 1) / PHASES.length) * 100}%`,
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#FF0000',
            boxShadow: '0 0 12px rgba(255,0,0,0.8)',
            transition: 'left 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }} />
        </div>

        {/* Phase cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          marginBottom: '40px',
        }}>
          {PHASES.map((phase, i) => (
            <button
              key={i}
              onClick={() => setActivePhase(i)}
              style={{
                textAlign: 'left',
                padding: '28px 24px',
                background: activePhase === i ? 'rgba(255,0,0,0.06)' : 'transparent',
                border: `1px solid ${activePhase === i ? 'rgba(255,0,0,0.35)' : 'rgba(240,237,232,0.08)'}`,
                cursor: 'pointer',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(20px)',
                transition: `opacity 0.5s ${0.3 + i * 0.12}s ease, transform 0.5s ${0.3 + i * 0.12}s ease, background 0.3s ease, border-color 0.3s ease`,
              }}
            >
              {/* Touchpoint range */}
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '40px',
                color: activePhase === i ? '#FF0000' : 'rgba(240,237,232,0.2)',
                letterSpacing: '0.03em',
                lineHeight: 1,
                marginBottom: '8px',
                transition: 'color 0.3s ease',
              }}>
                {phase.range}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '20px',
                color: '#FFFFFF',
                letterSpacing: '0.05em',
                marginBottom: '6px',
              }}>
                {phase.label}
              </div>

              {/* Principle tag */}
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9px',
                color: '#FF0000',
                letterSpacing: '0.12em',
                opacity: 0.7,
                marginBottom: '12px',
              }}>
                {phase.principle}
              </div>

              {/* Desc */}
              <p style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '13px',
                color: '#FFFFFF',
                opacity: 0.5,
                lineHeight: 1.55,
                margin: 0,
              }}>
                {phase.desc}
              </p>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{
          padding: '32px 36px',
          border: '1px solid rgba(255,0,0,0.2)',
          background: 'rgba(255,0,0,0.02)',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: '#FF0000',
            letterSpacing: '0.2em',
            marginBottom: '12px',
          }}>
            TOUCHPOINTS {PHASES[activePhase].range}
          </div>
          <div style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '28px',
            color: '#FFFFFF',
            letterSpacing: '0.06em',
            marginBottom: '12px',
          }}>
            {PHASES[activePhase].label}
          </div>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '15px',
            color: '#FFFFFF',
            opacity: 0.65,
            lineHeight: 1.65,
            margin: 0,
            maxWidth: '680px',
          }}>
            {PHASES[activePhase].detail}
          </p>
        </div>

      </div>
    </section>
  )
}
