import { useState, useEffect, useRef } from 'react'

interface Persona {
  name: string
  trigger: string
  icon: string
  quote: string
  code: string
  desire: string
  fear: string
  objection: string
}

interface Brand {
  label: string
  personas: Persona[]
}

const BRANDS: Brand[] = [
  {
    label: 'MADCOW COLLARS',
    personas: [
      {
        name: 'THE PROUD PET PARENT',
        trigger: 'Status & identity',
        icon: '🐕',
        quote: '"My dog is my family. I only buy the best."',
        code: 'Your dog deserves better than a $5 gas station collar.',
        desire: 'Signal that they\'re a caring, premium pet owner',
        fear: 'Looking like they don\'t invest in their pet\'s wellbeing',
        objection: 'Price — "this is a lot for a collar"',
      },
      {
        name: 'THE TRAINER',
        trigger: 'Performance & function',
        icon: '🏅',
        quote: '"If it can\'t handle my dog, I don\'t want it."',
        code: 'Built for working dogs. Not Instagram dogs.',
        desire: 'Equipment that performs under pressure and earns respect',
        fear: 'Gear that fails during a session and embarrasses them',
        objection: 'Skepticism — "I\'ve seen fancy collars fall apart"',
      },
      {
        name: 'THE NEW OWNER',
        trigger: 'Guidance & trust',
        icon: '🐾',
        quote: '"I want to do this right from the start."',
        code: 'The first collar sets the tone for everything.',
        desire: 'Confidence they\'re making the right choice first time',
        fear: 'Making mistakes that affect their dog\'s health or training',
        objection: 'Overwhelm — "there are so many options"',
      },
    ],
  },
  {
    label: 'FLATPACK',
    personas: [
      {
        name: 'THE NESTER',
        trigger: 'Warmth & belonging',
        icon: '🏠',
        quote: '"I want my space to feel like home, not a showroom."',
        code: 'Furniture that grows with your life, not against it.',
        desire: 'A home that reflects personality without the designer price',
        fear: 'Buying something that looks cheap or won\'t last',
        objection: 'Quality concerns — "flat-pack feels temporary"',
      },
      {
        name: 'THE MOVER',
        trigger: 'Convenience & practicality',
        icon: '📦',
        quote: '"I move every 2 years. I need furniture that keeps up."',
        code: 'Pack it. Move it. Rebuild it. Same quality every time.',
        desire: 'Functional, portable furniture that doesn\'t punish their lifestyle',
        fear: 'Wasting money on pieces that break during the next move',
        objection: 'Durability — "will this survive another move?"',
      },
      {
        name: 'THE UPGRADER',
        trigger: 'Aspiration & progress',
        icon: '✨',
        quote: '"My space should match where I\'m heading, not where I\'ve been."',
        code: 'Level up your space. Don\'t wait until you can afford a designer.',
        desire: 'A space that signals they\'re levelling up without overspending',
        fear: 'Choosing something they\'ll regret when they earn more',
        objection: 'Future-proofing — "will this still look good in 3 years?"',
      },
    ],
  },
  {
    label: 'INNERDOSE',
    personas: [
      {
        name: 'THE OPTIMIZER',
        trigger: 'Performance & edge',
        icon: '⚡',
        quote: '"I track everything. My supplements need to earn their spot."',
        code: 'No fluff. No fillers. Just the dose that does the work.',
        desire: 'Measurable gains they can attribute to a specific supplement',
        fear: 'Wasting money on supplements that do nothing',
        objection: 'Proof — "show me the science"',
      },
      {
        name: 'THE WELLNESS SEEKER',
        trigger: 'Balance & longevity',
        icon: '🌿',
        quote: '"I don\'t want to feel good for a week. I want to feel good forever."',
        code: 'Daily rituals that compound. Not quick fixes that fade.',
        desire: 'A sustainable routine they can stick to long-term',
        fear: 'Another product that works short-term and creates dependency',
        objection: 'Sustainability — "is this something I can take every day?"',
      },
      {
        name: 'THE NEWCOMER',
        trigger: 'Simplicity & safety',
        icon: '🔰',
        quote: '"I just want to start somewhere. Something I can trust."',
        code: 'Your first step into supplements shouldn\'t feel like a risk.',
        desire: 'A trustworthy, simple starting point without overwhelm',
        fear: 'Taking something that reacts badly or isn\'t safe',
        objection: 'Safety — "what if this has side effects?"',
      },
    ],
  },
]

function TypewriterLine({ text, active }: { text: string; active: boolean }) {
  const [displayed, setDisplayed] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!active) {
      setDisplayed('')
      return
    }
    setDisplayed('')
    let i = 0
    timerRef.current = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length && timerRef.current) clearInterval(timerRef.current)
    }, 20)
    cursorRef.current = setInterval(() => setShowCursor(v => !v), 530)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (cursorRef.current) clearInterval(cursorRef.current)
    }
  }, [text, active])

  return (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '13px',
      color: '#FF0000',
      letterSpacing: '0.05em',
    }}>
      {displayed}
      <span style={{ opacity: showCursor && active ? 1 : 0 }}>█</span>
    </span>
  )
}

export default function MadcowSection() {
  const [brandIdx, setBrandIdx] = useState(0)
  const [activePersona, setActivePersona] = useState<number | null>(null)
  const [showPanel, setShowPanel] = useState(false)
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

  const handlePersona = (i: number) => {
    setActivePersona(i)
    setShowPanel(false)
    setTimeout(() => setShowPanel(true), 80)
  }

  const handleBrand = (i: number) => {
    setBrandIdx(i)
    setActivePersona(null)
    setShowPanel(false)
  }

  const brand = BRANDS[brandIdx]
  const persona = activePersona !== null ? brand.personas[activePersona] : null

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
          transition: 'opacity 0.6s ease',
        }}>
          THE INTELLIGENCE
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
          EVERY WORD IS<br />
          <span style={{ color: '#FF0000' }}>ENGINEERED.</span>
        </h2>

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px',
          color: '#FFFFFF',
          opacity: inView ? 0.5 : 0,
          marginBottom: '56px',
          maxWidth: '520px',
          lineHeight: 1.6,
          transition: 'opacity 0.6s 0.2s ease',
        }}>
          Before a single email is written, I build the full psychological profile of who I'm talking to. Select a brand and a buyer below.
        </p>

        {/* Brand selector */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '40px',
          flexWrap: 'wrap',
          opacity: inView ? 1 : 0,
          transition: 'opacity 0.6s 0.25s ease',
        }}>
          {BRANDS.map((b, i) => (
            <button
              key={b.label}
              onClick={() => handleBrand(i)}
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '16px',
                letterSpacing: '0.1em',
                padding: '10px 20px',
                border: `1px solid ${brandIdx === i ? '#FF0000' : 'rgba(240,237,232,0.15)'}`,
                background: brandIdx === i ? 'rgba(255,0,0,0.08)' : 'transparent',
                color: brandIdx === i ? '#FF0000' : 'rgba(240,237,232,0.5)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Persona cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {brand.personas.map((p, i) => (
            <button
              key={p.name}
              onClick={() => handlePersona(i)}
              style={{
                textAlign: 'left',
                padding: '28px 24px',
                border: `1px solid ${activePersona === i ? 'rgba(255,0,0,0.4)' : 'rgba(240,237,232,0.08)'}`,
                background: activePersona === i ? 'rgba(255,0,0,0.06)' : 'rgba(240,237,232,0.02)',
                cursor: 'pointer',
                opacity: inView ? 1 : 0,
                transform: inView ? 'none' : 'translateY(16px)',
                transition: `opacity 0.5s ${0.3 + i * 0.1}s ease, transform 0.5s ${0.3 + i * 0.1}s ease, border-color 0.3s ease, background 0.3s ease`,
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '12px' }}>{p.icon}</div>
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '18px',
                color: '#FFFFFF',
                letterSpacing: '0.06em',
                marginBottom: '6px',
              }}>
                {p.name}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#FF0000',
                letterSpacing: '0.12em',
                opacity: 0.7,
              }}>
                {p.trigger}
              </div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {persona && showPanel && (
          <div style={{
            padding: '40px',
            border: '1px solid rgba(255,0,0,0.2)',
            background: 'rgba(255,0,0,0.02)',
            animation: 'fadeSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}>
            <style>{`@keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }`}</style>

            {/* Quote */}
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: '#FFFFFF',
              fontStyle: 'italic',
              opacity: 0.8,
              marginBottom: '28px',
              paddingLeft: '20px',
              borderLeft: '2px solid rgba(255,0,0,0.5)',
            }}>
              {persona.quote}
            </div>

            {/* Linguistic code */}
            <div style={{ marginBottom: '32px' }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: 'rgba(240,237,232,0.4)',
                letterSpacing: '0.2em',
                marginBottom: '8px',
              }}>
                LINGUISTIC CODE
              </div>
              <TypewriterLine text={persona.code} active={showPanel} />
            </div>

            {/* Psychological levers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[
                { key: 'CORE DESIRE', value: persona.desire },
                { key: 'CORE FEAR', value: persona.fear },
                { key: 'TOP OBJECTION', value: persona.objection },
              ].map(item => (
                <div key={item.key}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '9px',
                    color: '#FF0000',
                    letterSpacing: '0.18em',
                    marginBottom: '8px',
                  }}>
                    {item.key}
                  </div>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '13px',
                    color: '#FFFFFF',
                    opacity: 0.7,
                    lineHeight: 1.5,
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!persona && (
          <div style={{
            padding: '32px',
            border: '1px dashed rgba(240,237,232,0.08)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: 'rgba(240,237,232,0.25)',
              letterSpacing: '0.2em',
            }}>
              SELECT A BUYER ABOVE TO SEE THE INTELLIGENCE
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
