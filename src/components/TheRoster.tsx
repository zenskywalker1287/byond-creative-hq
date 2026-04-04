import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Fighter {
  brand: string
  image: string
  record: string
  or: string
  roas: string
  revenue: string
}

interface Matchup {
  round: string
  left: Fighter
  right: Fighter
}

const matchups: Matchup[] = [
  {
    round: '01',
    left:  { brand: 'GYMSHARK',    image: '/slice3.png',           record: '18-0', or: '51', roas: '9.1', revenue: '$3.2M'    },
    right: { brand: 'INNERDOSE',   image: '/innerdose-01.png',     record: '12-0', or: '47', roas: '8.2', revenue: '$1.8M'    },
  },
  {
    round: '02',
    left:  { brand: 'LUMI',        image: '/slice10.png',          record: '9-0',  or: '44', roas: '7.6', revenue: '$980K'    },
    right: { brand: 'HERO LOUPES', image: '/heroloupes-01.png',    record: '6-0',  or: '39', roas: '6.8', revenue: '$620K'    },
  },
  {
    round: '03',
    left:  { brand: 'REFRESH GUM', image: '/slice15.png',          record: '7-0',  or: '42', roas: '7.1', revenue: '$740K'    },
    right: { brand: 'HEALTHMATE',  image: '/slice20.png',          record: '4-0',  or: '36', roas: '6.1', revenue: '$480K'    },
  },
  {
    round: '04',
    left:  { brand: 'FLATPACK',    image: '/flatpack-01.png',      record: '8-0',  or: '45', roas: '7.8', revenue: '$100K/mo' },
    right: { brand: 'MADCOW',      image: '/brand-madcow.png',     record: '11-0', or: '48', roas: '8.0', revenue: '$2M'      },
  },
  {
    round: '05',
    left:  { brand: 'XYKO',        image: '/brand-xyko.png',       record: '6-0',  or: '60', roas: '7.2', revenue: '$620K'    },
    right: { brand: 'ADSUMO',      image: '/slice30.png',          record: '5-0',  or: '38', roas: '6.5', revenue: '$500K'    },
  },
  {
    round: '06',
    left:  { brand: 'GRÜNS',       image: '/greengoo-01.png',      record: '7-0',  or: '43', roas: '7.4', revenue: '$710K'    },
    right: { brand: 'BUCKED UP',   image: '/bestbody-03.png',      record: '9-0',  or: '46', roas: '7.9', revenue: '$920K'    },
  },
  {
    round: '07',
    left:  { brand: 'EVIL EYE',    image: '/whiskeyballs-01.png',  record: '5-0',  or: '41', roas: '6.9', revenue: '$590K'    },
    right: { brand: 'DAILY CRUNCH',image: '/upairy-01.png',        record: '6-0',  or: '40', roas: '7.0', revenue: '$640K'    },
  },
  {
    round: '08',
    left:  { brand: 'ELYSIUM',     image: '/loveluggage-01.png',   record: '10-0', or: '49', roas: '8.4', revenue: '$1.1M'    },
    right: { brand: 'GRENFELL',    image: '/primetrain-01.png',    record: '8-0',  or: '44', roas: '7.5', revenue: '$850K'    },
  },
]

const DUOTONE = 'grayscale(100%) contrast(180%) sepia(100%) hue-rotate(320deg) saturate(400%)'
const DIMMED  = 'grayscale(100%) brightness(35%)'

export default function TheRoster() {
  const sectionRef    = useRef<HTMLElement>(null)
  const leftCardRef   = useRef<HTMLDivElement>(null)
  const rightCardRef  = useRef<HTMLDivElement>(null)
  const centerLineRef = useRef<HTMLDivElement>(null)
  const vsTextRef     = useRef<HTMLDivElement>(null)
  const roundTextRef  = useRef<HTMLDivElement>(null)
  const arenaRef      = useRef<HTMLDivElement>(null)

  const currentRoundRef    = useRef(0)
  const isTransitioningRef = useRef(false)
  const touchStartX        = useRef<number | null>(null)

  const [currentRound,   setCurrentRound]   = useState(0)
  const [hoveredSide,    setHoveredSide]     = useState<'left' | 'right' | null>(null)
  const [leftRevealed,   setLeftRevealed]    = useState(false)
  const [rightRevealed,  setRightRevealed]   = useState(false)
  const [isMobile,       setIsMobile]        = useState(false)
  const [statsVisible,   setStatsVisible]    = useState(false)

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  // Stats bar sync with hover
  useEffect(() => {
    setStatsVisible(hoveredSide !== null)
  }, [hoveredSide])

  // Auto-reveal duotone cycle — resets on each new round
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    setLeftRevealed(false)
    setRightRevealed(false)

    const timers: ReturnType<typeof setTimeout>[] = []

    const cycle = (setRevealed: (v: boolean) => void, startDelay: number) => {
      const loop = () => {
        const t1 = setTimeout(() => {
          setRevealed(true)
          const t2 = setTimeout(() => {
            setRevealed(false)
            const t3 = setTimeout(loop, 2000)
            timers.push(t3)
          }, 2000)
          timers.push(t2)
        }, startDelay)
        timers.push(t1)
      }
      loop()
    }

    cycle(setLeftRevealed, 3000)
    cycle(setRightRevealed, 4500)

    return () => timers.forEach(clearTimeout)
  }, [currentRound])

  // Round counter scramble
  const scrambleRound = useCallback((round: number) => {
    const chars    = '0123456789'
    const finalNum = String(round + 1).padStart(2, '0')
    let iteration  = 0

    const interval = setInterval(() => {
      if (roundTextRef.current) {
        const scrambled = finalNum.split('').map((c, i) =>
          i < Math.floor(iteration) ? c : chars[Math.floor(Math.random() * chars.length)]
        ).join('')
        roundTextRef.current.textContent = `ROUND ${scrambled} / 08`
      }
      if (iteration >= finalNum.length) {
        clearInterval(interval)
        if (roundTextRef.current) roundTextRef.current.textContent = `ROUND ${finalNum} / 08`
      }
      iteration += 0.4
    }, 40)
  }, [])

  // Round transition
  const triggerRoundTransition = useCallback((newRound: number) => {
    if (isTransitioningRef.current) return
    if (newRound === currentRoundRef.current) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      currentRoundRef.current = newRound
      setCurrentRound(newRound)
      scrambleRound(newRound)
      return
    }

    isTransitioningRef.current = true

    const leftEl  = leftCardRef.current
    const rightEl = rightCardRef.current
    const lineEl  = centerLineRef.current
    const arenaEl = arenaRef.current

    const tl = gsap.timeline({
      onComplete: () => { isTransitioningRef.current = false },
    })

    // Exit
    tl.to([leftEl, rightEl], { scale: 0.96, duration: 0.08, ease: 'power2.in' })
    tl.to(leftEl,  { x: '-110%', filter: 'blur(4px)', duration: 0.28, ease: 'power2.in' }, '-=0')
    tl.to(rightEl, { x:  '110%', filter: 'blur(4px)', duration: 0.28, ease: 'power2.in' }, '<')

    // Flash center line
    if (lineEl) {
      tl.to(lineEl, { backgroundColor: '#FFFFFF', duration: 0.04 }, '-=0.1')
      tl.to(lineEl, { backgroundColor: '#FF0000', duration: 0.12 }, '+=0.05')
    }

    // Update state mid-transition (cards are off-screen)
    tl.add(() => {
      currentRoundRef.current = newRound
      setCurrentRound(newRound)
      scrambleRound(newRound)
    })

    // Enter
    tl.set(leftEl,  { x: '-110%', scale: 1 })
    tl.set(rightEl, { x:  '110%', scale: 1 })
    tl.to(leftEl,  { x: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, '+=0.04')
    tl.to(rightEl, { x: 0, filter: 'blur(0px)', duration: 0.35, ease: 'power3.out' }, '<')

    // VS pulse
    if (vsTextRef.current) {
      tl.fromTo(vsTextRef.current, { scale: 1.5 }, { scale: 1, duration: 0.25, ease: 'power4.out' }, '<0.1')
    }

    // Collision shake
    if (arenaEl) {
      tl.to(arenaEl, {
        keyframes: { x: [-5, 5, -3, 3, -1, 1, 0] },
        duration: 0.22,
        ease: 'none',
      }, '-=0.05')
    }
  }, [scrambleRound])

  // Keep a stable ref to the callback for ScrollTrigger
  const triggerRef = useRef(triggerRoundTransition)
  useEffect(() => { triggerRef.current = triggerRoundTransition }, [triggerRoundTransition])

  // GSAP ScrollTrigger pinning — created once
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end:   `+=${window.innerHeight * 8}`,
        pin:   true,
        snap: {
          snapTo:   1 / 7,
          duration: { min: 0.3, max: 0.6 },
          delay:    0,
          ease:     'power2.inOut',
        },
        onUpdate: (self) => {
          const newRound = Math.round(self.progress * 7)
          if (newRound !== currentRoundRef.current) {
            triggerRef.current(newRound)
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  // Touch swipe (mobile)
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta   = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 60) {
      const next = delta < 0
        ? Math.min(currentRound + 1, matchups.length - 1)
        : Math.max(currentRound - 1, 0)
      if (next !== currentRound) triggerRef.current(next)
    }
    touchStartX.current = null
  }

  // Filter helpers
  const getImgFilter = (side: 'left' | 'right') => {
    if (hoveredSide === side) return 'none'
    if (hoveredSide !== null) return DIMMED
    if (side === 'left' ? leftRevealed : rightRevealed) return 'none'
    return DUOTONE
  }
  const getOverlayOp = (side: 'left' | 'right') => {
    if (hoveredSide === side || (side === 'left' ? leftRevealed : rightRevealed)) return 0
    if (hoveredSide !== null) return 0.55
    return 0.35
  }
  const getImgTranslate = (side: 'left' | 'right') => {
    if (hoveredSide !== null && hoveredSide !== side)
      return side === 'left' ? 'translateX(-20px)' : 'translateX(20px)'
    return 'none'
  }
  const getCenterLineTransform = () => {
    if (hoveredSide === 'left')  return 'translateX(8px)'
    if (hoveredSide === 'right') return 'translateX(-8px)'
    return 'translateX(0)'
  }

  // Stat ratios
  const ratio = (a: string, b: string) => {
    const la = parseFloat(a), lb = parseFloat(b), t = la + lb
    return { left: (la / t) * 100, right: (lb / t) * 100 }
  }

  const matchup   = matchups[currentRound]
  const orRatio   = ratio(matchup.left.or,   matchup.right.or)
  const roasRatio = ratio(matchup.left.roas, matchup.right.roas)

  const FONT_BRAND = 'clamp(36px, 6vw, 80px)'

  return (
    <section
      ref={sectionRef}
      id="roster"
      style={{
        height: '100vh',
        background: '#0A0A0A',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(255,0,0,0.08)',
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Z:20 Section label ─────────────────── */}
      <div style={{
        position: 'absolute', top: '20px', left: '28px', zIndex: 20,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px', color: '#FF0000', letterSpacing: '0.28em', opacity: 0.85,
      }}>
        THE ROSTER
      </div>

      {/* ── Z:20 Bleeding title ─────────────────── */}
      <div style={{
        position: 'absolute', top: '48px', left: 0, right: 0, zIndex: 20,
        display: 'flex', justifyContent: 'space-between', overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        <span style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(48px, 8vw, 100px)', color: '#FF0000',
          lineHeight: 0.88, letterSpacing: '-0.02em',
          textShadow: '0 0 20px rgba(255,0,0,0.6)',
          marginLeft: '-4px',
        }}>
          CAMPAIGNS
        </span>
        <span style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(48px, 8vw, 100px)', color: '#FF0000',
          lineHeight: 0.88, letterSpacing: '-0.02em',
          textShadow: '0 0 20px rgba(255,0,0,0.6)',
          marginRight: '-4px',
        }}>
          THAT HIT
        </span>
      </div>

      {/* ── Z:15 Round counter ───────────────────── */}
      <div
        ref={roundTextRef}
        style={{
          position: 'absolute', top: '20px', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px', color: '#FFFFFF', letterSpacing: '0.2em',
          zIndex: 15, whiteSpace: 'nowrap',
        }}
      >
        ROUND 01 / 08
      </div>

      {/* ── Arena ────────────────────────────────── */}
      <div
        ref={arenaRef}
        style={{
          position: 'absolute',
          top: isMobile ? '130px' : '150px',
          bottom: '80px',
          left: 0, right: 0,
          display: 'flex',
        }}
      >
        {/* ── LEFT FIGHTER ── */}
        <div
          ref={leftCardRef}
          style={{
            flex: 1, position: 'relative', overflow: 'visible',
            cursor: 'none',
          }}
          onMouseEnter={() => setHoveredSide('left')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          {/* z:2 — Image */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2 }}>
            <img
              src={matchup.left.image}
              alt={matchup.left.brand}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                filter: getImgFilter('left'),
                transform: getImgTranslate('left'),
                transition: 'filter 0.6s ease, transform 0.4s ease, opacity 0.3s ease',
                opacity: hoveredSide === 'right' ? 0.5 : 1,
                animation: 'idlePulse 3s ease-in-out infinite',
              }}
            />
            {/* z:3 — Red overlay */}
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              background: 'rgba(255,0,0,0.35)',
              opacity: getOverlayOp('left'),
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
            }} />
          </div>

          {/* z:4 — Brand name bleeding off top */}
          <div style={{
            position: 'absolute', top: '-10px', left: 0, right: 0,
            zIndex: 4, paddingLeft: '20px',
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: FONT_BRAND, color: '#FFFFFF',
            lineHeight: 0.88, letterSpacing: '-0.02em',
            textShadow: '0 4px 24px rgba(0,0,0,0.9)',
          }}>
            {matchup.left.brand}
          </div>

          {/* z:5 — Fight record */}
          <div style={{
            position: 'absolute',
            top: `calc(${FONT_BRAND} + 12px)`,
            left: '20px', zIndex: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px', color: '#FF0000',
            letterSpacing: '0.12em', opacity: 0.9,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            RECORD: {matchup.left.record} · {matchup.left.or}% OR · {matchup.left.roas}X ROAS
          </div>
        </div>

        {/* ── CENTER LINE + VS ── */}
        {!isMobile && (
          <div style={{ position: 'relative', width: '2px', flexShrink: 0, zIndex: 8 }}>
            <div
              ref={centerLineRef}
              style={{
                width: '2px', height: '100%',
                background: '#FF0000',
                boxShadow: '0 0 12px rgba(255,0,0,0.8), 0 0 24px rgba(255,0,0,0.4)',
                transform: getCenterLineTransform(),
                transition: 'transform 0.3s ease',
              }}
            />
            {/* z:10 — VS */}
            <div
              ref={vsTextRef}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(40px, 6vw, 80px)',
                color: '#FF0000',
                textShadow: '0 0 30px rgba(255,0,0,1), 0 0 60px rgba(255,0,0,0.6)',
                letterSpacing: '-0.02em',
                zIndex: 10, pointerEvents: 'none',
                animation: 'vsPulse 2s ease-in-out infinite',
                whiteSpace: 'nowrap',
              }}
            >
              VS
            </div>
          </div>
        )}

        {/* ── RIGHT FIGHTER ── */}
        <div
          ref={rightCardRef}
          style={{
            flex: 1, position: 'relative', overflow: 'visible',
            cursor: 'none',
          }}
          onMouseEnter={() => setHoveredSide('right')}
          onMouseLeave={() => setHoveredSide(null)}
        >
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 2 }}>
            <img
              src={matchup.right.image}
              alt={matchup.right.brand}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'top',
                filter: getImgFilter('right'),
                transform: getImgTranslate('right'),
                transition: 'filter 0.6s ease, transform 0.4s ease, opacity 0.3s ease',
                opacity: hoveredSide === 'left' ? 0.5 : 1,
                animation: 'idlePulse 3s ease-in-out infinite 1.5s',
              }}
            />
            <div style={{
              position: 'absolute', inset: 0, zIndex: 3,
              background: 'rgba(255,0,0,0.35)',
              opacity: getOverlayOp('right'),
              transition: 'opacity 0.6s ease',
              pointerEvents: 'none',
            }} />
          </div>

          <div style={{
            position: 'absolute', top: '-10px', left: 0, right: 0,
            zIndex: 4, paddingLeft: '20px',
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: FONT_BRAND, color: '#FFFFFF',
            lineHeight: 0.88, letterSpacing: '-0.02em',
            textShadow: '0 4px 24px rgba(0,0,0,0.9)',
          }}>
            {matchup.right.brand}
          </div>

          <div style={{
            position: 'absolute',
            top: `calc(${FONT_BRAND} + 12px)`,
            left: '20px', zIndex: 5,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px', color: '#FF0000',
            letterSpacing: '0.12em', opacity: 0.9,
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}>
            RECORD: {matchup.right.record} · {matchup.right.or}% OR · {matchup.right.roas}X ROAS
          </div>
        </div>
      </div>

      {/* ── Z:12 Stats comparison bar ───────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '80px',
        background: 'rgba(10,10,10,0.96)',
        borderTop: '1px solid rgba(255,0,0,0.3)',
        display: 'flex', alignItems: 'center',
        zIndex: 12,
        padding: '0 48px',
        gap: '40px',
        transform: statsVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Open Rate */}
        <StatBar
          label="OPEN RATE"
          leftVal={`${matchup.left.or}%`}
          rightVal={`${matchup.right.or}%`}
          leftPct={orRatio.left}
          rightPct={orRatio.right}
          visible={statsVisible}
          delay={0}
        />
        {/* ROAS */}
        <StatBar
          label="ROAS"
          leftVal={`${matchup.left.roas}X`}
          rightVal={`${matchup.right.roas}X`}
          leftPct={roasRatio.left}
          rightPct={roasRatio.right}
          visible={statsVisible}
          delay={0.1}
        />
        {/* Revenue */}
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', marginBottom: '4px' }}>
            REVENUE
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: '18px', color: '#FF0000', textShadow: '0 0 10px rgba(255,0,0,0.6)' }}>
              {matchup.left.revenue}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>VS</span>
            <span style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: '18px', color: 'rgba(255,255,255,0.45)' }}>
              {matchup.right.revenue}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll hint (desktop, first round only) */}
      {currentRound === 0 && (
        <div style={{
          position: 'absolute', bottom: '88px', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: '9px', color: 'rgba(255,0,0,0.5)',
          letterSpacing: '0.2em', zIndex: 20,
          animation: 'pulse 2s ease infinite',
          pointerEvents: 'none',
        }}>
          SCROLL TO ADVANCE
        </div>
      )}

      {/* prefers-reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .fighter-card { animation: none !important; transition: none !important; filter: none !important; }
        }
      `}</style>
    </section>
  )
}

// ── StatBar sub-component ──────────────────────────────────────────────────
interface StatBarProps {
  label: string
  leftVal: string
  rightVal: string
  leftPct: number
  rightPct: number
  visible: boolean
  delay: number
}

function StatBar({ label, leftVal, rightVal, leftPct, rightPct, visible, delay }: StatBarProps) {
  return (
    <div style={{ flex: 1 }}>
      <div style={{
        fontFamily: "'JetBrains Mono',monospace",
        fontSize: '9px', color: 'rgba(255,255,255,0.5)',
        letterSpacing: '0.2em', marginBottom: '6px', textAlign: 'center',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Left value */}
        <span style={{
          fontFamily: "'Black Han Sans',sans-serif",
          fontSize: '15px', color: '#FF0000',
          width: '52px', textAlign: 'right', flexShrink: 0,
        }}>
          {leftVal}
        </span>

        {/* Bar track */}
        <div style={{ flex: 1, height: '6px', position: 'relative', background: 'rgba(255,255,255,0.05)' }}>
          {/* Left bar — fills from center outward */}
          <div style={{
            position: 'absolute',
            right: '50%', top: 0, bottom: 0,
            background: '#FF0000',
            width: `${leftPct / 2}%`,
            transform: visible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
            boxShadow: '0 0 6px rgba(255,0,0,0.5)',
          }} />
          {/* Right bar */}
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            background: 'rgba(255,255,255,0.25)',
            width: `${rightPct / 2}%`,
            transform: visible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay + 0.05}s`,
          }} />
          {/* Center tick */}
          <div style={{
            position: 'absolute', left: '50%', top: '-2px', bottom: '-2px',
            width: '1px', background: 'rgba(255,0,0,0.4)',
          }} />
        </div>

        {/* Right value */}
        <span style={{
          fontFamily: "'Black Han Sans',sans-serif",
          fontSize: '15px', color: 'rgba(255,255,255,0.4)',
          width: '52px', flexShrink: 0,
        }}>
          {rightVal}
        </span>
      </div>
    </div>
  )
}
