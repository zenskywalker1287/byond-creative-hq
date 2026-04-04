import { useEffect, useRef, useState } from 'react'

const tiles = [
  { client: 'INNERDOSE',   title: 'WELCOME FLOW REDESIGN', metric: '+340% Revenue',      img: '/slice1.png',  featured: true  },
  { client: 'GYMSHARK',    title: 'BLACK FRIDAY BLITZ',    metric: '$180K In 72hrs',     img: '/slice8.png',  featured: false },
  { client: 'LUMI',        title: 'WINBACK SEQUENCE',      metric: '12.4% Reactivation', img: '/slice15.png', featured: false },
  { client: 'REFRESH GUM', title: 'POST-PURCHASE FLOW',    metric: '+67% LTV',           img: '/slice22.png', featured: false },
  { client: 'HEALTHMATE',  title: 'ABANDONMENT SERIES',    metric: '8.7% Recovery',      img: '/slice30.png', featured: false },
  { client: 'HERO LOUPES', title: 'VIP TIER LAUNCH',       metric: '+$52K MRR',          img: '/slice38.png', featured: false },
]

export default function ProofOfWork() {
  const sectionRef  = useRef<HTMLElement>(null)
  const tileRefs    = useRef<(HTMLDivElement | null)[]>(Array(6).fill(null))
  const [litTiles,  setLitTiles]  = useState<Set<number>>(new Set())
  const [hovered,   setHovered]   = useState<number | null>(null)
  const [powered,   setPowered]   = useState(false)
  const [circuitOn, setCircuitOn] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || powered) return
      setPowered(true)
      setCircuitOn(true)

      const order = [0, 1, 2, 3, 4, 5]
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[order[i], order[j]] = [order[j], order[i]]
      }

      order.forEach((tileIdx, seq) => {
        const delay = 80 + seq * (1400 / order.length) + Math.random() * 60
        setTimeout(() => {
          setLitTiles(prev => new Set([...prev, tileIdx]))
          const el = tileRefs.current[tileIdx]
          if (!el) return
          el.style.boxShadow = '0 0 20px rgba(255,0,0,0.8)'
          setTimeout(() => { if (el) el.style.boxShadow = '0 0 4px rgba(255,0,0,0.15)' }, 200)
        }, delay)
      })
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [powered])

  const renderTile = (tile: typeof tiles[0], i: number, heightPx: number) => {
    const isLit     = litTiles.has(i)
    const isHovered = hovered === i
    const isDimmed  = hovered !== null && !isHovered

    return (
      <div
        key={i}
        ref={el => { tileRefs.current[i] = el }}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: 'relative',
          height: `${heightPx}px`,
          overflow: 'hidden',
          opacity: !isLit ? 0 : isDimmed ? 0.35 : 1,
          transition: 'opacity 0.35s ease, box-shadow 0.2s ease',
          cursor: 'pointer',
          background: '#0A0A0A',
        }}
      >
        {/* Image — grayscale by default, color on hover */}
        <img
          src={tile.img}
          alt={tile.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
            transition: 'transform 3s ease, filter 0.6s ease',
          }}
        />

        {/* Base gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)', pointerEvents: 'none' }} />

        {/* Dim overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.45)', opacity: isHovered ? 0 : 0.6, transition: 'opacity 0.35s ease', pointerEvents: 'none' }} />

        {/* Bottom-left info — always show client + title when lit */}
        {isLit && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: tile.featured ? '32px 28px' : '20px',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: tile.featured ? '10px' : '9px',
              color: '#FF0000',
              letterSpacing: '0.22em',
              marginBottom: '4px',
            }}>
              {tile.client}
            </div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: tile.featured ? '42px' : '22px',
              color: '#FFFFFF',
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              marginBottom: isHovered ? '10px' : '0',
              transition: 'margin 0.3s ease',
            }}>
              {tile.title}
            </div>
            {isHovered && (
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: tile.featured ? '15px' : '13px',
                color: '#FF0000',
                letterSpacing: '0.15em',
                marginTop: '8px',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}>
                VIEW CAMPAIGN →
              </div>
            )}
          </div>
        )}

        {/* Metric chip — top right */}
        {isLit && (
          <div style={{
            position: 'absolute',
            top: tile.featured ? '20px' : '14px',
            right: tile.featured ? '20px' : '14px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: tile.featured ? '12px' : '10px',
            color: '#FF0000',
            background: 'rgba(10,10,10,0.88)',
            padding: tile.featured ? '6px 12px' : '4px 8px',
            border: '1px solid rgba(255,0,0,0.35)',
          }}>
            {tile.metric}
          </div>
        )}
      </div>
    )
  }

  return (
    <section ref={sectionRef} id="work" style={{ padding: '100px 32px', background: '#0A0A0A' }}>

      {/* Label + circuit line */}
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', letterSpacing: '0.3em', marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          THE WORK<span className="typewriter-cursor" />
        </div>
        <svg width="240" height="14" viewBox="0 0 240 14" style={{ display: 'block', margin: '0 auto', overflow: 'visible' }}>
          <line x1="0" y1="7" x2="240" y2="7" stroke="rgba(255,0,0,0.35)" strokeWidth="1"
            strokeDasharray="240" strokeDashoffset={circuitOn ? '0' : '240'}
            style={{ transition: 'stroke-dashoffset 0.9s ease 0.1s' }}
          />
          {[24, 60, 100, 140, 180, 216].map((cx, k) => (
            <circle key={k} cx={cx} cy="7" r="2.5" fill="#FF0000"
              opacity={circuitOn ? 0.7 : 0}
              style={{ transition: `opacity 0.3s ease ${0.3 + k * 0.08}s` }}
            />
          ))}
          <rect x="0"   y="4" width="6" height="6" fill="#FF0000" opacity={circuitOn ? 0.6 : 0} style={{ transition: 'opacity 0.3s ease 0.1s' }} />
          <rect x="234" y="4" width="6" height="6" fill="#FF0000" opacity={circuitOn ? 0.6 : 0} style={{ transition: 'opacity 0.3s ease 0.9s' }} />
        </svg>
      </div>

      {/* Editorial asymmetric grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>

        {/* Row 1: Large featured (2/3) + tall side (1/3) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2px' }}>
          {renderTile(tiles[0], 0, 480)}
          {renderTile(tiles[1], 1, 480)}
        </div>

        {/* Row 2: Three equal cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
          {renderTile(tiles[2], 2, 300)}
          {renderTile(tiles[3], 3, 300)}
          {renderTile(tiles[4], 4, 300)}
        </div>

        {/* Row 3: Wide single card */}
        {renderTile(tiles[5], 5, 260)}

      </div>
    </section>
  )
}
