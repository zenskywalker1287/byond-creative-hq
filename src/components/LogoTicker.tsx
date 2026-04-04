import { useState } from 'react'

const brands = [
  'GYMSHARK', 'LUMI', 'REFRESH GUM', 'INNERDOSE', 'HEALTHMATE SAUNA',
  'HERO LOUPES', 'MADCOW COLLARS', 'FLATPACK', 'XYKO', 'ADSUMO',
  'ELYSIUM', 'GRENFELL', 'BONELL', 'SAUNABOX', 'MIMI KATANA',
  'FABRIC OF THE UNIVERSE', 'EXA', 'EVIL EYE', 'DAILY CRUNCH', 'GRÜNS', 'BUCKED UP',
]

export default function LogoTicker() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [pauseRow1, setPauseRow1] = useState(false)
  const [pauseRow2, setPauseRow2] = useState(false)

  const renderItems = (rowOffset: number, pause: boolean, direction: 'right' | 'left', duration: string) => {
    const items = [...brands, ...brands]
    return (
      <div
        className="ticker-wrapper"
        style={{
          overflow: 'hidden',
          position: 'relative',
          padding: '14px 0',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
        onMouseEnter={() => direction === 'right' ? setPauseRow1(true) : setPauseRow2(true)}
        onMouseLeave={() => direction === 'right' ? setPauseRow1(false) : setPauseRow2(false)}
      >
        <div
          style={{
            display: 'flex',
            animation: `ticker-${direction} ${duration} linear infinite`,
            animationPlayState: pause ? 'paused' : 'running',
            width: 'fit-content',
          }}
        >
          {items.map((brand, i) => {
            const globalIdx = rowOffset * brands.length + (i % brands.length)
            const isHovered = hoveredIdx === globalIdx
            const anyHovered = hoveredIdx !== null
            return (
              <span
                key={i}
                onMouseEnter={() => setHoveredIdx(globalIdx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '20px',
                  letterSpacing: '0.25em',
                  whiteSpace: 'nowrap',
                  color: isHovered ? '#FF0000' : '#FFFFFF',
                  opacity: anyHovered ? (isHovered ? 1 : 0.1) : 0.35,
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transition: 'all 0.3s ease',
                  cursor: 'none',
                  padding: '0 16px',
                }}
              >
                {brand}
                <span style={{ color: '#FF0000', opacity: 0.5, margin: '0 8px' }}>·</span>
              </span>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <section style={{ padding: '48px 0', borderTop: '1px solid rgba(255,0,0,0.08)' }}>
      {/* Label */}
      <div style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '10px',
        color: '#FF0000',
        letterSpacing: '0.3em',
        textAlign: 'center',
        marginBottom: '28px',
        opacity: 0.55,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        BRANDS WE'VE MOVED<span className="typewriter-cursor" />
      </div>
      {renderItems(0, pauseRow1, 'right', '35s')}
      {renderItems(1, pauseRow2, 'left', '45s')}
    </section>
  )
}
