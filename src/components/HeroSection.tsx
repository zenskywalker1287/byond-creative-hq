import { useEffect, useRef, useState, useCallback } from 'react'
import { TypewriterText } from './ui/TypewriterText'

// All slice images for background wall
const row1 = Array.from({ length: 15 }, (_, i) => `/slice${i + 1}.png`)
const row2 = Array.from({ length: 15 }, (_, i) => `/slice${i + 16}.png`)
const row3 = Array.from({ length: 14 }, (_, i) => `/slice${i + 31}.png`)

// Coverflow carousel images
const COVER_IMGS = [
  '/slice1.png','/slice4.png','/slice7.png','/slice10.png',
  '/slice13.png','/slice16.png','/slice19.png','/slice22.png',
  '/slice25.png','/slice28.png','/slice31.png','/slice34.png',
  '/slice37.png','/slice40.png','/slice43.png',
]

const SERVICE_TAGS = [
  'EMAIL & RETENTION',
  'AD CREATIVE',
  'SHORT FORM & HOOKS',
  'SCRIPTING & BRIEFS',
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [showUnderline, setShowUnderline] = useState(false)
  const [showSub,  setShowSub]  = useState(false)
  const [showCTA,  setShowCTA]  = useState(false)
  const [activeIdx, setActiveIdx] = useState(7)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setShowUnderline(true), 600)
    const t2 = setTimeout(() => setShowSub(true), 1000)
    const t3 = setTimeout(() => setShowCTA(true), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  // Coverflow auto-advance
  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % COVER_IMGS.length)
  }, [])

  useEffect(() => {
    autoRef.current = setInterval(advance, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [advance])

  const pauseAuto = () => { if (autoRef.current) clearInterval(autoRef.current) }

  const goTo = (i: number) => {
    pauseAuto()
    setActiveIdx(i)
  }

  const goLeft  = () => goTo((activeIdx - 1 + COVER_IMGS.length) % COVER_IMGS.length)
  const goRight = () => goTo((activeIdx + 1) % COVER_IMGS.length)

  // Card transform calculation
  const getCardStyle = (i: number): React.CSSProperties => {
    const total = COVER_IMGS.length
    let offset = i - activeIdx
    // Wrap around for shortest path
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total

    const absOff = Math.abs(offset)
    const sign   = offset >= 0 ? 1 : -1

    if (absOff === 0) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        filter: 'brightness(1)',
        zIndex: 10,
        border: '1px solid rgba(255,0,0,0.5)',
        boxShadow: '0 0 40px rgba(255,0,0,0.3), 0 30px 60px rgba(0,0,0,0.8)',
      }
    }
    if (absOff === 1) {
      const tx = sign * 220
      return {
        transform: `translateX(${tx}px) scale(0.82) rotateY(${sign * -48}deg)`,
        filter: 'brightness(0.45)',
        zIndex: 8,
        border: '1px solid rgba(255,0,0,0.1)',
        boxShadow: 'none',
      }
    }
    if (absOff === 2) {
      const tx = sign * 380
      return {
        transform: `translateX(${tx}px) scale(0.65) rotateY(${sign * -68}deg)`,
        filter: 'brightness(0.2)',
        zIndex: 6,
        border: '1px solid rgba(255,0,0,0.05)',
        boxShadow: 'none',
      }
    }
    const tx = sign * 480
    return {
      transform: `translateX(${tx}px) scale(0.5) rotateY(${sign * -75}deg)`,
      filter: 'brightness(0.1)',
      zIndex: 4,
      border: 'none',
      boxShadow: 'none',
    }
  }

  const bgRows = [
    { imgs: row1, anim: 'marquee-right 40s linear infinite' },
    { imgs: row2, anim: 'marquee-left  55s linear infinite' },
    { imgs: row3, anim: 'marquee-right 48s linear infinite' },
  ]

  return (
    <section
      ref={sectionRef}
      className="blood-splatter scan-lines"
      style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Layer 1 — Living wall background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', overflow: 'hidden' }}>
        {bgRows.map((row, ri) => (
          <div key={ri} style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', minWidth: 'max-content', animation: row.anim, willChange: 'transform' }}>
              {[...row.imgs, ...row.imgs].map((src, i) => (
                <img
                  key={i} src={src} alt=""
                  style={{ height: '260px', width: 'auto', objectFit: 'cover', borderRadius: '6px', margin: '0 6px', flexShrink: 0, filter: 'brightness(0.3) saturate(0.6)' }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.75)', zIndex: 1 }} />

      {/* Vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)', zIndex: 2, pointerEvents: 'none' }} />

      {/* Layer 2 — AKIRA beam */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 0, height: 0,
        borderLeft: '400px solid transparent',
        borderRight: '400px solid transparent',
        borderBottom: '100vh solid rgba(255,0,0,0.05)',
        pointerEvents: 'none',
        zIndex: 3,
        animation: 'beamPulse 4s ease-in-out infinite',
      }} />

      {/* Layer 3 — Foreground content */}
      <div style={{ position: 'relative', zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 'clamp(120px,15vh,160px)', paddingBottom: '80px', width: '100%' }}>

        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '1200px', width: '100%' }}>

          {/* Section label */}
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', letterSpacing: '0.25em', marginBottom: '24px', minHeight: '16px', opacity: 0.8 }}>
            <TypewriterText
              words={[
                'EST. 2024 — DTC EMAIL & RETENTION SYSTEMS',
                'FLOWS THAT PRINT WHILE YOU SLEEP',
                '30-TOUCHPOINT BACKEND ARCHITECTURE',
              ]}
              speed={50}
              deleteSpeed={25}
              pauseDuration={2200}
              style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', letterSpacing: '0.25em' }}
              cursorStyle={{ background: '#FF0000' }}
            />
          </div>

          {/* Headline */}
          <h1 style={{ margin: 0, letterSpacing: '-0.02em', lineHeight: 0.88 }}>
            <span style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(64px,10vw,130px)', color: '#FFFFFF', display: 'block', textShadow: '0 0 40px rgba(255,0,0,0.3)' }}>
              CREATIVE STRATEGIST
            </span>
            <span style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(64px,10vw,130px)', color: '#FFFFFF', display: 'block' }}>
              FOR 6, 7 &amp; 8-FIGURE
            </span>
            <span style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(64px,10vw,130px)', color: '#FF0000', display: 'block', textShadow: '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)' }}>
              DTC{' '}
              <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 800, color: '#FF0000', textTransform: 'none' }}>
                brands.
              </span>
            </span>
          </h1>

          {/* Red underline draw */}
          <div style={{
            height: '4px',
            background: '#FF0000',
            margin: '20px auto',
            maxWidth: '600px',
            transform: showUnderline ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: '0 0 10px rgba(255,0,0,0.6)',
          }} />

          {/* Subheadline */}
          <p style={{
            fontFamily: "'Poppins',sans-serif",
            fontSize: '18px',
            color: 'rgba(255,255,255,0.7)',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s var(--ease)',
            marginBottom: '8px',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.65,
          }}>
            $2M+ in revenue generated. 1,200+ creatives shipped. Worked inside 8-figure agencies.
          </p>
          <p style={{
            fontFamily: "'Poppins',sans-serif",
            fontStyle: 'italic',
            fontSize: '16px',
            color: 'rgba(255,255,255,0.5)',
            opacity: showSub ? 1 : 0,
            transform: showSub ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s var(--ease)',
            marginBottom: '32px',
            maxWidth: '560px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            This is how we demystify "the creative" and actually drive conversions.
          </p>

          {/* CTAs */}
          <div style={{
            display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap',
            opacity: showCTA ? 1 : 0,
            transform: showCTA ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s var(--ease)',
            marginBottom: '32px',
          }}>
            <a
              href="#contact"
              style={{
                fontFamily: "'Black Han Sans',sans-serif",
                fontSize: '20px',
                letterSpacing: '0.08em',
                padding: '16px 40px',
                background: '#FF0000',
                color: '#000000',
                textTransform: 'uppercase',
                boxShadow: '0 0 30px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.2)',
                transition: 'box-shadow 0.3s var(--ease), transform 0.2s var(--ease)',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.boxShadow = '0 0 50px rgba(255,0,0,0.9), 0 0 100px rgba(255,0,0,0.4)'
                el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.boxShadow = '0 0 30px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.2)'
                el.style.transform = 'translateY(0)'
              }}
            >
              BOOK A CALL
            </a>
            <a
              href="#work"
              style={{
                fontFamily: "'Black Han Sans',sans-serif",
                fontSize: '20px',
                letterSpacing: '0.08em',
                padding: '14px 38px',
                background: 'transparent',
                color: '#FF0000',
                border: '2px solid #FF0000',
                textTransform: 'uppercase',
                transition: 'background 0.3s var(--ease), color 0.3s',
                display: 'inline-block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = '#FF0000'
                el.style.color = '#000000'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.color = '#FF0000'
              }}
            >
              SEE THE WORK
            </a>
          </div>

          {/* Service tags */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', opacity: showCTA ? 1 : 0, transition: 'opacity 0.8s var(--ease)' }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: 'rgba(255,0,0,0.6)', letterSpacing: '0.2em', marginRight: '6px' }}>
              WHAT WE DO
            </span>
            {SERVICE_TAGS.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: "'Black Han Sans',sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,0,0,0.3)',
                  padding: '4px 12px',
                  textTransform: 'uppercase',
                  transition: 'border-color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.borderColor = '#FF0000'}
                onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.borderColor = 'rgba(255,0,0,0.3)'}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── Coverflow Carousel ─────────────────────────────────── */}
        <div
          id="work"
          style={{ marginTop: '60px', width: '100%', position: 'relative', perspective: '1200px' }}
          onMouseEnter={pauseAuto}
        >
          {/* Cards */}
          <div style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {COVER_IMGS.map((src, i) => {
              const cardStyle = getCardStyle(i)
              return (
                <div
                  key={i}
                  onClick={() => goTo(i)}
                  style={{
                    position: 'absolute',
                    width: '300px',
                    height: '500px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    cursor: 'pointer',
                    transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    ...cardStyle,
                  }}
                >
                  <img
                    src={src} alt=""
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', pointerEvents: 'none' }}
                  />
                </div>
              )
            })}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goLeft}
            style={{ position: 'absolute', left: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Black Han Sans',sans-serif", fontSize: '48px', color: '#FF0000', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, textShadow: '0 0 20px rgba(255,0,0,0.8)' }}
          >
            ←
          </button>
          <button
            onClick={goRight}
            style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', fontFamily: "'Black Han Sans',sans-serif", fontSize: '48px', color: '#FF0000', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, textShadow: '0 0 20px rgba(255,0,0,0.8)' }}
          >
            →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '1px', height: '50px', background: 'rgba(255,0,0,0.3)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#FF0000', position: 'absolute', left: '-1.5px', animation: 'scrollDot 2s ease infinite' }} />
        </div>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#FF0000', letterSpacing: '0.2em', opacity: 0.6 }}>SCROLL</span>
      </div>
    </section>
  )
}
