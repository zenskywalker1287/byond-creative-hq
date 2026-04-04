import { useEffect, useRef } from 'react'

// 12 evenly-spaced slice images
const SOURCE = [
  '/slice1.png',  '/slice4.png',  '/slice8.png',  '/slice12.png',
  '/slice16.png', '/slice20.png', '/slice24.png', '/slice28.png',
  '/slice32.png', '/slice36.png', '/slice40.png', '/slice42.png',
]

// Triple for seamless infinite loop — work from the middle set
const CARDS = [...SOURCE, ...SOURCE, ...SOURCE]
const N = SOURCE.length          // 12
const START = N                  // start index = middle set

// Card dimensions
const W = 280
const H = 420
const GAP = 40
const STEP = W + GAP             // 320px per slot

// Tuning constants
const AUTO_SPD   = 0.35          // cards per second
const SKEW_SCALE = 1400          // velocity (cards/frame) → degrees
const MAX_SKEW   = 15            // deg
const SKEW_LERP  = 0.10
const MAG_LERP   = 0.08
const SPRING     = 0.15
const MAG_RADIUS = 80            // px
const MAX_TX     = 12            // px
const MAX_TILT   = 8             // deg

export default function ShowcaseCarousel() {
  // All animation values as refs — no React state needed in the RAF loop
  const posRef      = useRef(START)     // float center index
  const prevPosRef  = useRef(START)
  const velRef      = useRef(0)
  const skewRef     = useRef(0)
  const pausedRef   = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const hoveredRef  = useRef<number | null>(null)
  const mouseRef    = useRef({ x: 0, y: 0 })
  const lastTRef    = useRef(0)

  // Per-card magnetic offsets: cx/cy = translate, rx/ry = tilt
  const magRef = useRef(CARDS.map(() => ({ cx: 0, cy: 0, rx: 0, ry: 0 })))

  // Direct DOM refs for zero-overhead style writes
  const outerRef = useRef<(HTMLDivElement | null)[]>(Array(CARDS.length).fill(null))
  const innerRef = useRef<(HTMLDivElement | null)[]>(Array(CARDS.length).fill(null))

  // ─── Main RAF loop ────────────────────────────────────────────────────────
  useEffect(() => {
    let raf: number

    const tick = (now: number) => {
      const dt = lastTRef.current
        ? Math.min((now - lastTRef.current) / 1000, 0.05)
        : 0.016
      lastTRef.current = now

      // ── Auto-advance ──────────────────────────────────────────────────────
      if (!pausedRef.current) posRef.current += AUTO_SPD * dt

      // ── Velocity tracking ─────────────────────────────────────────────────
      const rawV = posRef.current - prevPosRef.current
      velRef.current = velRef.current * 0.75 + rawV * 0.25
      prevPosRef.current = posRef.current

      // ── Skew: spring toward velocity-driven target ────────────────────────
      const tSkew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, velRef.current * SKEW_SCALE))
      skewRef.current += (tSkew - skewRef.current) * SKEW_LERP

      // ── Infinite wrap ─────────────────────────────────────────────────────
      if (posRef.current >= START + N) { posRef.current -= N; prevPosRef.current -= N }
      if (posRef.current <  START - N) { posRef.current += N; prevPosRef.current += N }

      const center = posRef.current
      const hov    = hoveredRef.current

      // ── Magnetic lerp per card ────────────────────────────────────────────
      for (let i = 0; i < CARDS.length; i++) {
        const m = magRef.current[i]

        if (i === hov) {
          const el = outerRef.current[i]
          if (el) {
            const r  = el.getBoundingClientRect()
            const cx = r.left + r.width  / 2
            const cy = r.top  + r.height / 2
            const dx = mouseRef.current.x - cx
            const dy = mouseRef.current.y - cy
            const d  = Math.hypot(dx, dy)

            if (d < MAG_RADIUS) {
              const str = 1 - d / MAG_RADIUS
              const tCX =  dx * str * (MAX_TX   / (MAG_RADIUS * 0.5))
              const tCY =  dy * str * (MAX_TX   / (MAG_RADIUS * 0.5))
              const tRX = -(dy / (r.height / 2)) * MAX_TILT
              const tRY =  (dx / (r.width  / 2)) * MAX_TILT
              m.cx += (Math.max(-MAX_TX,  Math.min(MAX_TX,  tCX)) - m.cx) * MAG_LERP
              m.cy += (Math.max(-MAX_TX,  Math.min(MAX_TX,  tCY)) - m.cy) * MAG_LERP
              m.rx += (Math.max(-MAX_TILT,Math.min(MAX_TILT,tRX)) - m.rx) * MAG_LERP
              m.ry += (Math.max(-MAX_TILT,Math.min(MAX_TILT,tRY)) - m.ry) * MAG_LERP
            }
          }
        } else {
          // Spring back with slight overshoot feel (underdamped)
          m.cx += (0 - m.cx) * SPRING
          m.cy += (0 - m.cy) * SPRING
          m.rx += (0 - m.rx) * SPRING
          m.ry += (0 - m.ry) * SPRING
        }
      }

      // ── Apply transforms ──────────────────────────────────────────────────
      for (let i = 0; i < CARDS.length; i++) {
        const outer = outerRef.current[i]
        const inner = innerRef.current[i]
        if (!outer || !inner) continue

        const dist = i - center
        const absD = Math.abs(dist)

        // Cull cards far off-screen
        if (absD > 5.5) {
          outer.style.opacity       = '0'
          outer.style.pointerEvents = 'none'
          continue
        }

        outer.style.opacity       = '1'
        outer.style.pointerEvents = absD > 3 ? 'none' : 'auto'

        const m        = magRef.current[i]
        const isHov    = i === hov
        const isCenter = absD < 0.5

        // ── Effect 2: coverflow values ────────────────────────────────────
        let rotY: number, scale: number, bright: number
        if (absD < 0.5) {
          rotY = 0; scale = 1.0; bright = 1.0
        } else if (absD < 1.5) {
          const t = absD - 0.5
          rotY  = (dist > 0 ? -1 : 1) * 45 * t
          scale = 1.0 - 0.15 * t
          bright = 1.0 - 0.4 * t
        } else {
          rotY  = (dist > 0 ? -1 : 1) * 65
          scale = Math.max(0.7, 1.0 - 0.3 * absD)
          bright = Math.max(0.3, 1.0 - 0.15 * absD)
        }

        const baseX = dist * STEP

        // ── Priority: magnetic > coverflow > skew ─────────────────────────
        let tf: string
        if (isHov) {
          // Effect 3 wins: magnetic translate + tilt, no skew
          const hScale = Math.max(scale, 0.92) // slight boost when hovered
          tf = `translateX(${baseX + m.cx}px) translateY(${m.cy}px) scale(${hScale}) rotateX(${m.rx}deg) rotateY(${m.ry}deg)`
        } else {
          // Effect 2 + Effect 1
          tf = `translateX(${baseX}px) scale(${scale}) rotateY(${rotY}deg) skewX(${skewRef.current}deg)`
        }

        outer.style.transform = tf
        outer.style.filter    = `brightness(${bright})`
        outer.style.zIndex    = String(Math.round(100 - absD * 10))

        // Border / glow (written every frame — no CSS transition conflict)
        if (isCenter || isHov) {
          inner.style.borderColor = 'rgba(255,0,0,0.6)'
          inner.style.boxShadow   = '0 0 40px rgba(255,0,0,0.15)'
        } else {
          inner.style.borderColor = 'rgba(255,0,0,0.15)'
          inner.style.boxShadow   = 'none'
        }
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ─── Global mouse tracking ────────────────────────────────────────────────
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  // ─── Card event handlers ──────────────────────────────────────────────────
  const onEnter = (i: number) => {
    hoveredRef.current = i
    pausedRef.current  = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  const onLeave = () => {
    hoveredRef.current = null
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    // Effect 2: resume autopilot after 1.5s delay
    resumeTimer.current = setTimeout(() => { pausedRef.current = false }, 1500)
  }

  // Effect 2: clicking a side card snaps it to center
  const onCardClick = (i: number) => {
    posRef.current     = i
    prevPosRef.current = i
    velRef.current     = 0
  }

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <section
      style={{
        background: '#0A0A0A',
        padding: '80px 0',
        overflow: 'hidden',
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '13px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          textAlign: 'center',
          marginBottom: '48px',
        }}
      >
        THE WORK
      </div>

      {/* Carousel stage — perspective enables 3D coverflow */}
      <div
        style={{
          position: 'relative',
          height: `${H}px`,
          perspective: '1200px',
          perspectiveOrigin: '50% 50%',
          // Gradient mask fades cards at edges
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        {CARDS.map((src, i) => (
          <div
            key={i}
            ref={el => { outerRef.current[i] = el }}
            onMouseEnter={() => onEnter(i)}
            onMouseLeave={onLeave}
            onClick={() => onCardClick(i)}
            style={{
              position: 'absolute',
              left: `calc(50% - ${W / 2}px)`,
              top: 0,
              width: W,
              height: H,
              cursor: 'pointer',
              willChange: 'transform, filter, opacity',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Inner wrapper holds the visual border + overflow clip */}
            <div
              ref={el => { innerRef.current[i] = el }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(255,0,0,0.15)',
              }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  display: 'block',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
