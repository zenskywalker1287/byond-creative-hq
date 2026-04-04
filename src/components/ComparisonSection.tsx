import { useState, useRef, useEffect } from 'react'

const ADS_STATS = [
  { label: 'Revenue From Ads', value: '15–25%' },
  { label: 'Customer Retention', value: 'Near Zero' },
  { label: 'Cost Per Acquisition', value: 'Rising Monthly' },
  { label: 'Turn Off Spend?', value: 'Revenue Dies' },
]

const BACKEND_STATS = [
  { label: 'Revenue From Email', value: '40%+' },
  { label: 'Client Retention Rate', value: '95%' },
  { label: 'Cost To Send Email', value: '$0 Extra' },
  { label: 'Turn Off Spend?', value: 'Still Prints' },
]

export default function ComparisonSection() {
  const [isFullBackend, setIsFullBackend] = useState(false)
  const [hasToggled, setHasToggled] = useState(false)
  const [inView, setInView] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  // Animate funnel fill when switching to full backend
  useEffect(() => {
    if (!fillRef.current) return
    fillRef.current.style.transition = 'height 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
    fillRef.current.style.height = isFullBackend ? '100%' : '0%'
  }, [isFullBackend])

  const handleToggle = () => {
    setIsFullBackend(v => !v)
    if (!hasToggled) setHasToggled(true)
  }

  const stats = isFullBackend ? BACKEND_STATS : ADS_STATS

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
          THE SWITCH
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(3rem, 7vw, 6.5rem)',
          lineHeight: 0.9,
          color: '#FFFFFF',
          margin: '0 0 16px',
          opacity: inView ? 1 : 0,
          transform: inView ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.6s 0.1s ease, transform 0.6s 0.1s ease',
        }}>
          FLIP THE{' '}
          <span style={{ color: '#FF0000' }}>SWITCH.</span>
        </h2>

        <p style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '16px',
          color: '#FFFFFF',
          opacity: inView ? 0.5 : 0,
          maxWidth: '520px',
          lineHeight: 1.6,
          marginBottom: '64px',
          transition: 'opacity 0.6s 0.2s ease',
        }}>
          Most brands run ads and pray. The ones printing money have a backend that works while the ads sleep.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* Left: Funnel visual */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(-30px)',
            transition: 'opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease',
          }}>
            {/* Mode label */}
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.08em',
              color: isFullBackend ? '#FFFFFF' : '#FF0000',
              marginBottom: '24px',
              transition: 'color 0.5s ease',
            }}>
              {isFullBackend ? 'FULL BACKEND' : 'ADS ONLY'}
            </div>

            {/* Funnel SVG */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
              <svg viewBox="0 0 240 280" width="100%" style={{ display: 'block' }}>
                {/* Funnel outline */}
                <path
                  d="M20,20 L220,20 L160,130 L160,240 L80,240 L80,130 Z"
                  fill="none"
                  stroke={isFullBackend ? 'rgba(255,0,0,0.4)' : 'rgba(240,237,232,0.15)'}
                  strokeWidth="2"
                  style={{ transition: 'stroke 0.5s ease' }}
                />
                {/* Fill level */}
                <clipPath id="funnelClip">
                  <path d="M20,20 L220,20 L160,130 L160,240 L80,240 L80,130 Z" />
                </clipPath>
                <rect
                  ref={fillRef as unknown as React.RefObject<SVGRectElement>}
                  x="0" y="0" width="240"
                  height={isFullBackend ? '280' : '0'}
                  fill="rgba(255,0,0,0.18)"
                  clipPath="url(#funnelClip)"
                  style={{ transition: 'height 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
                />
                {/* Cracks for ADS ONLY */}
                {!isFullBackend && (
                  <>
                    <line x1="80" y1="160" x2="95" y2="175" stroke="rgba(255,0,0,0.6)" strokeWidth="1.5" />
                    <line x1="160" y1="180" x2="145" y2="200" stroke="rgba(255,0,0,0.6)" strokeWidth="1.5" />
                    <line x1="100" y1="220" x2="85" y2="240" stroke="rgba(255,0,0,0.6)" strokeWidth="1.5" />
                  </>
                )}
                {/* Drip animation for ADS ONLY */}
                {!isFullBackend && (
                  <circle cx="120" cy="260" r="4" fill="rgba(255,0,0,0.4)">
                    <animate attributeName="cy" values="245;280;280" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Top label */}
                <text x="120" y="14" textAnchor="middle" fill="rgba(240,237,232,0.4)"
                  fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="2">
                  TRAFFIC IN
                </text>
                {/* Bottom label */}
                <text x="120" y="270" textAnchor="middle"
                  fill={isFullBackend ? '#FF0000' : 'rgba(240,237,232,0.3)'}
                  fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="2"
                  style={{ transition: 'fill 0.5s ease' }}>
                  {isFullBackend ? 'REVENUE OUT' : 'LEAKING OUT'}
                </text>
              </svg>
            </div>
          </div>

          {/* Center: Toggle */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingTop: '80px',
            gap: '16px',
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.7s 0.4s ease',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              color: 'rgba(240,237,232,0.3)',
              letterSpacing: '0.2em',
              textAlign: 'center',
            }}>
              {isFullBackend ? 'BACKEND ON' : 'ADS ONLY'}
            </div>

            {/* Toggle switch */}
            <button
              onClick={handleToggle}
              style={{
                width: '56px',
                height: '100px',
                background: isFullBackend ? 'rgba(255,0,0,0.15)' : 'rgba(240,237,232,0.06)',
                border: `2px solid ${isFullBackend ? '#FF0000' : 'rgba(240,237,232,0.2)'}`,
                borderRadius: '28px',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.4s ease, border-color 0.4s ease',
                padding: 0,
              }}
              aria-label="Toggle backend mode"
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isFullBackend ? '#FF0000' : '#FFFFFF',
                position: 'absolute',
                left: '50%',
                transform: `translateX(-50%) translateY(${isFullBackend ? '-14px' : '14px'})`,
                top: '50%',
                marginTop: '-18px',
                transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease',
                boxShadow: isFullBackend ? '0 0 20px rgba(255,0,0,0.5)' : 'none',
              }} />
            </button>

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '9px',
              color: isFullBackend ? '#FF0000' : 'rgba(240,237,232,0.3)',
              letterSpacing: '0.2em',
              textAlign: 'center',
              transition: 'color 0.4s ease',
            }}>
              FLIP IT
            </div>
          </div>

          {/* Right: Stats */}
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'none' : 'translateX(30px)',
            transition: 'opacity 0.7s 0.3s ease, transform 0.7s 0.3s ease',
          }}>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: '22px',
              letterSpacing: '0.08em',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}>
              THE NUMBERS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    padding: '20px 24px',
                    border: '1px solid',
                    borderColor: isFullBackend ? 'rgba(255,0,0,0.25)' : 'rgba(240,237,232,0.08)',
                    background: isFullBackend ? 'rgba(255,0,0,0.04)' : 'rgba(240,237,232,0.02)',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(10px)',
                    transition: `opacity 0.5s ${0.4 + i * 0.1}s ease, transform 0.5s ${0.4 + i * 0.1}s ease, border-color 0.4s ease, background 0.4s ease`,
                  }}
                >
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px',
                    color: 'rgba(240,237,232,0.4)',
                    letterSpacing: '0.15em',
                    marginBottom: '6px',
                  }}>
                    {stat.label}
                  </div>
                  <div style={{
                    fontFamily: "'Black Han Sans', sans-serif",
                    fontSize: '32px',
                    color: isFullBackend ? '#FF0000' : '#FFFFFF',
                    letterSpacing: '0.05em',
                    lineHeight: 1,
                    transition: 'color 0.4s ease',
                  }}>
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote — appears after toggle */}
        <div style={{
          marginTop: '64px',
          borderTop: '1px solid rgba(255,0,0,0.1)',
          paddingTop: '40px',
          opacity: hasToggled ? 1 : 0,
          transform: hasToggled ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#FFFFFF',
            fontStyle: 'italic',
            opacity: 0.6,
            maxWidth: '700px',
            lineHeight: 1.5,
          }}>
            "Most brands never flip this switch. That's the opportunity."
          </p>
        </div>

      </div>
    </section>
  )
}
