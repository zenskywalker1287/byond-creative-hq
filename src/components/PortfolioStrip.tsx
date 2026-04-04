import { useEffect, useRef, useState } from 'react'

const ITEMS = [
  { title: 'WELCOME FLOW',     client: 'INNERDOSE',   img: '/slice2.png'  },
  { title: 'BFCM CAMPAIGN',    client: 'GYMSHARK',    img: '/slice5.png'  },
  { title: 'WINBACK SERIES',   client: 'LUMI',        img: '/slice8.png'  },
  { title: 'POST-PURCHASE',    client: 'REFRESH GUM', img: '/slice11.png' },
  { title: 'VIP LAUNCH',       client: 'HERO LOUPES', img: '/slice14.png' },
  { title: 'ABANDON CART',     client: 'HEALTHMATE',  img: '/slice17.png' },
  { title: 'RESTOCK FLOW',     client: 'MADCOW',      img: '/slice20.png' },
  { title: 'LOYALTY PROGRAM',  client: 'FLATPACK',    img: '/slice23.png' },
  { title: 'FLASH SALE',       client: 'XYKO',        img: '/slice26.png' },
  { title: 'SUMMER CAMPAIGN',  client: 'ADSUMO',      img: '/slice29.png' },
  { title: 'RETENTION SERIES', client: 'INNERDOSE',   img: '/slice32.png' },
  { title: 'LAUNCH SEQUENCE',  client: 'GYMSHARK',    img: '/slice35.png' },
]

const CARD_W    = 280
const CARD_H    = 420
const GAP       = 20
const CARD_STEP = CARD_W + GAP

// Skew constants
const DRAG_SKEW_SCALE = 0.06   // px velocity → degrees
const MAX_DRAG_SKEW   = 15
const SKEW_LERP       = 0.12

// Magnetic hover tilt
const MAX_TILT        = 6      // deg
const MAX_MAG_PX      = 10     // px
const MAG_LERP        = 0.10

// Auto-scroll
const AUTO_SPEED = -0.6        // px/frame (negative = scroll left)
// Friction
const FRICTION   = 0.92

export default function PortfolioStrip() {
  const outerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const cardRefs    = useRef<(HTMLDivElement | null)[]>(Array(ITEMS.length).fill(null))

  // Physics state (all refs for RAF)
  const scrollXRef  = useRef(0)
  const velRef      = useRef(AUTO_SPEED)
  const skewRef     = useRef(0)
  const isDragRef   = useRef(false)
  const dragStartX  = useRef(0)
  const dragScrollX = useRef(0)
  const lastMouseX  = useRef(0)
  const rafRef      = useRef(0)
  const maxScrollRef = useRef(0)

  // Magnetic hover per card
  const hoveredCard = useRef<number | null>(null)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const magRef      = useRef(ITEMS.map(() => ({ cx: 0, cy: 0, rx: 0, ry: 0 })))

  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return

    const TRACK_W = ITEMS.length * CARD_STEP - GAP
    maxScrollRef.current = -(TRACK_W - outer.offsetWidth)

    const tick = () => {
      // Auto-scroll when not dragging and velocity near auto
      if (!isDragRef.current) {
        velRef.current = velRef.current * FRICTION + AUTO_SPEED * (1 - FRICTION)
      }

      scrollXRef.current = Math.max(maxScrollRef.current, Math.min(0, scrollXRef.current + velRef.current))

      // Clamp bounce at edges
      if (scrollXRef.current <= maxScrollRef.current || scrollXRef.current >= 0) {
        velRef.current *= -0.3
      }

      // Skew from velocity
      const targetSkew = Math.max(-MAX_DRAG_SKEW, Math.min(MAX_DRAG_SKEW, velRef.current * DRAG_SKEW_SCALE))
      skewRef.current += (targetSkew - skewRef.current) * SKEW_LERP

      // Apply track transform
      if (track) track.style.transform = `translateX(${scrollXRef.current}px) skewX(${skewRef.current}deg)`

      // Magnetic hover per card
      const hov = hoveredCard.current
      for (let i = 0; i < ITEMS.length; i++) {
        const m  = magRef.current[i]
        const el = cardRefs.current[i]
        if (!el) continue

        if (i === hov) {
          const r  = el.getBoundingClientRect()
          const cx = r.left + r.width  / 2
          const cy = r.top  + r.height / 2
          const dx = mouseRef.current.x - cx
          const dy = mouseRef.current.y - cy
          const tCX = Math.max(-MAX_MAG_PX, Math.min(MAX_MAG_PX, dx * 0.15))
          const tCY = Math.max(-MAX_MAG_PX, Math.min(MAX_MAG_PX, dy * 0.15))
          const tRX = -(dy / (r.height / 2)) * MAX_TILT
          const tRY =  (dx / (r.width  / 2)) * MAX_TILT
          m.cx += (tCX - m.cx) * MAG_LERP
          m.cy += (tCY - m.cy) * MAG_LERP
          m.rx += (tRX - m.rx) * MAG_LERP
          m.ry += (tRY - m.ry) * MAG_LERP
        } else {
          m.cx += (0 - m.cx) * 0.15
          m.cy += (0 - m.cy) * 0.15
          m.rx += (0 - m.rx) * 0.15
          m.ry += (0 - m.ry) * 0.15
        }

        el.style.transform = `translateX(${m.cx}px) translateY(${m.cy}px) rotateX(${m.rx}deg) rotateY(${m.ry}deg)`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Global mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      if (isDragRef.current) {
        const newX = Math.max(maxScrollRef.current, Math.min(0, dragScrollX.current + (e.clientX - dragStartX.current)))
        velRef.current      = newX - scrollXRef.current
        scrollXRef.current  = newX
        lastMouseX.current  = e.clientX
      }
    }
    const onUp = () => {
      isDragRef.current = false
      setIsDragging(false)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    isDragRef.current  = true
    dragStartX.current = e.clientX
    dragScrollX.current = scrollXRef.current
    lastMouseX.current = e.clientX
    velRef.current     = 0
    setIsDragging(true)
  }

  return (
    <section style={{ padding: '80px 0', background: '#0A0A0A', overflow: 'hidden' }}>
      {/* Label */}
      <div style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: '13px', color: '#FF0000', letterSpacing: '0.3em', marginBottom: '40px', textAlign: 'center' }}>
        PORTFOLIO
      </div>

      <div
        ref={outerRef}
        onMouseDown={onMouseDown}
        style={{
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          maskImage: 'linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right,transparent 0%,black 4%,black 96%,transparent 100%)',
        }}
      >
        <div
          ref={trackRef}
          style={{ display: 'flex', gap: `${GAP}px`, padding: '20px 40px', willChange: 'transform' }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              ref={el => { cardRefs.current[i] = el }}
              onMouseEnter={() => { hoveredCard.current = i }}
              onMouseLeave={() => { hoveredCard.current = null }}
              style={{
                flexShrink: 0,
                width:  `${CARD_W}px`,
                height: `${CARD_H}px`,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid rgba(255,0,0,0.1)',
                willChange: 'transform',
                transformStyle: 'preserve-3d',
              }}
            >
              <img src={item.img} alt={item.title} draggable={false}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', pointerEvents: 'none' }}
              />
              {/* Card info bar */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '20px 16px 16px',
                background: 'linear-gradient(to top,rgba(10,10,10,0.92) 0%,transparent 100%)',
              }}>
                <div style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: '20px', color: '#FFFFFF', letterSpacing: '0.05em' }}>{item.title}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#FF0000', letterSpacing: '0.2em', opacity: 0.7, marginTop: '2px' }}>{item.client}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
