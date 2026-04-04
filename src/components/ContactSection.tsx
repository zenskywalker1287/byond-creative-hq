import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Tachometer arc (SVG path for a semi-circle gauge)
function Tachometer({ progress }: { progress: number }) {
  const R   = 90
  const CX  = 110
  const CY  = 110
  const len = Math.PI * R  // half-circle circumference
  const dash = len * Math.min(1, Math.max(0, progress))

  return (
    <svg viewBox="0 0 220 120" width="320" height="175" style={{ position: 'absolute', bottom: '60px', left: '50%', transform: 'translateX(-50%)', opacity: 0.08, pointerEvents: 'none' }}>
      {/* Track */}
      <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
        fill="none" stroke="rgba(255,0,0,0.4)" strokeWidth="2" />
      {/* Active arc */}
      <path d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
        fill="none" stroke="#FF0000" strokeWidth="2.5"
        strokeDasharray={`${dash} ${len}`} />
      {/* Tick marks */}
      {Array.from({ length: 9 }, (_, k) => {
        const angle = (Math.PI * k) / 8
        const x1 = CX + (R - 6)  * Math.cos(Math.PI - angle)
        const y1 = CY - (R - 6)  * Math.sin(angle)
        const x2 = CX + (R + 2)  * Math.cos(Math.PI - angle)
        const y2 = CY - (R + 2)  * Math.sin(angle)
        return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FF0000" strokeWidth="1" opacity="0.5" />
      })}
    </svg>
  )
}

const WORDS = ['START', 'YOUR', 'ENGINE']

interface Spark { id: number; x: number; y: number; vx: number; vy: number; life: number }

export default function ContactSection() {
  const sectionRef   = useRef<HTMLElement>(null)
  const beamRefs     = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const wordRefs     = useRef<(HTMLSpanElement | null)[]>(Array(3).fill(null))
  const btnRef       = useRef<HTMLButtonElement>(null)
  const flashRef     = useRef<HTMLDivElement>(null)
  const tacho        = useRef<HTMLDivElement>(null)
  const [tachoVal, setTachoVal] = useState(0)
  const [sparks,   setSparks]   = useState<Spark[]>([])
  const [_shaking,  setShaking]  = useState(false)
  const sparkId    = useRef(0)

  // Scroll-triggered entrance
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Initial state
    beamRefs.current.forEach(b => { if (b) gsap.set(b, { opacity: 0, scale: 0.3 }) })
    wordRefs.current.forEach(w => { if (w) gsap.set(w, { scale: 1.4, opacity: 0, y: 20 }) })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top 70%', once: true },
      })

      // Spotlight beams sweep in from corners
      tl.to(beamRefs.current[0], { opacity: 0.6, scale: 1, x: '30vw',  y: '20vh',  duration: 1.5, ease: 'power2.out' }, 0)
      tl.to(beamRefs.current[1], { opacity: 0.6, scale: 1, x: '-30vw', y: '20vh',  duration: 1.5, ease: 'power2.out' }, 0.1)
      tl.to(beamRefs.current[2], { opacity: 0.5, scale: 1, x: '25vw',  y: '-15vh', duration: 1.5, ease: 'power2.out' }, 0.2)
      tl.to(beamRefs.current[3], { opacity: 0.5, scale: 1, x: '-25vw', y: '-15vh', duration: 1.5, ease: 'power2.out' }, 0.3)

      // After entrance, start slow breathing oscillation
      tl.add(() => {
        const breathe = (el: HTMLDivElement | null, xOff: number, yOff: number, dur: number) => {
          if (!el) return
          gsap.to(el, {
            x: `+=${xOff}`, y: `+=${yOff}`,
            duration: dur, ease: 'sine.inOut',
            yoyo: true, repeat: -1,
          })
          gsap.to(el, {
            opacity: '+=0.15',
            duration: dur * 0.7, ease: 'sine.inOut',
            yoyo: true, repeat: -1,
          })
        }
        breathe(beamRefs.current[0], 20, -15, 3.5)
        breathe(beamRefs.current[1], -20, -15, 4.2)
        breathe(beamRefs.current[2], 15, 20, 3.8)
        breathe(beamRefs.current[3], -15, 20, 4.5)
      }, '+=0')

      // Words slam in one by one
      WORDS.forEach((_, i) => {
        tl.to(wordRefs.current[i], { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power4.out' }, 0.5 + i * 0.12)
      })

      // Tachometer sweeps
      tl.to({}, {
        duration: 1.8, ease: 'power2.inOut',
        onUpdate: function() { setTachoVal(this.progress()) },
      }, 0.4)
    }, section)

    return () => ctx.revert()
  }, [])

  // CTA hover: shake + sparks
  const onBtnEnter = () => {
    setShaking(true)
    // Spawn 8 sparks
    const btn = btnRef.current
    if (btn) {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width  / 2
      const cy = rect.top  + rect.height / 2
      const newSparks: Spark[] = Array.from({ length: 8 }, () => ({
        id: sparkId.current++,
        x: cx + (Math.random() - 0.5) * rect.width  * 0.8,
        y: cy,
        vx: (Math.random() - 0.5) * 3,
        vy: -(1 + Math.random() * 3),
        life: 1,
      }))
      setSparks(prev => [...prev, ...newSparks])
      // Animate spark life
      const animate = () => {
        setSparks(prev =>
          prev
            .map(s => ({ ...s, x: s.x + s.vx, y: s.y + s.vy, vy: s.vy + 0.1, life: s.life - 0.035 }))
            .filter(s => s.life > 0)
        )
        if (sparks.length > 0) requestAnimationFrame(animate)
      }
      requestAnimationFrame(animate)
    }
  }

  const onBtnLeave = () => setShaking(false)

  const onBtnClick = () => {
    if (!flashRef.current) return
    gsap.fromTo(flashRef.current, { opacity: 0.25 }, { opacity: 0, duration: 0.6, ease: 'power2.out' })
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{ position: 'relative', minHeight: '100vh', background: '#0A0A0A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', borderTop: '1px solid rgba(255,0,0,0.08)', padding: '100px 32px' }}
    >
      {/* Click flash overlay */}
      <div ref={flashRef} style={{ position: 'absolute', inset: 0, background: 'rgba(255,0,0,1)', opacity: 0, pointerEvents: 'none', zIndex: 20 }} />

      {/* Spotlight beams from corners */}
      {[
        { top: '-10%', right: '-5%'  },
        { top: '-10%', left:  '-5%'  },
        { bottom: '-10%', right: '-5%' },
        { bottom: '-10%', left:  '-5%' },
      ].map((pos, i) => (
        <div
          key={i}
          ref={el => { beamRefs.current[i] = el }}
          style={{
            position: 'absolute',
            width: '400px', height: '600px',
            ...pos,
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(255,0,0,0.06) 12deg, transparent 24deg)',
            transformOrigin: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            opacity: 0,
          }}
        />
      ))}

      {/* Tachometer */}
      <div ref={tacho} style={{ position: 'relative', zIndex: 2 }}>
        <Tachometer progress={tachoVal} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 5, textAlign: 'center' }}>

        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', opacity: 0.7, letterSpacing: '0.28em', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          START HERE<span className="typewriter-cursor" />
        </div>

        {/* Word-by-word headline */}
        <h2 style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(64px,10vw,120px)', lineHeight: 0.88, marginBottom: '32px', display: 'flex', gap: '0.2em', justifyContent: 'center', flexWrap: 'wrap', textShadow: '0 0 60px rgba(255,0,0,0.3)' }}>
          {WORDS.map((w, i) => (
            <span
              key={i}
              ref={el => { wordRefs.current[i] = el }}
              style={{
                display: 'inline-block',
                color: i === 2 ? '#FF0000' : '#FFFFFF',
                opacity: 0,
                textShadow: i === 2 ? '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)' : undefined,
              }}
            >
              {w}
            </span>
          ))}
        </h2>

        <p style={{ fontFamily: "'Poppins',sans-serif", fontSize: '18px', color: '#FFFFFF', opacity: 0.5, maxWidth: '500px', margin: '0 auto 48px', lineHeight: 1.6 }}>
          Book a free strategy call and let&apos;s map out the exact playbook to scale your email revenue.
        </p>

        {/* CTA button */}
        <button
          ref={btnRef}
          onMouseEnter={onBtnEnter}
          onMouseLeave={onBtnLeave}
          onClick={onBtnClick}
          style={{
            fontFamily: "'Black Han Sans',sans-serif",
            fontSize: '24px', letterSpacing: '0.1em',
            padding: '20px 60px',
            background: '#FF0000', color: '#000000',
            border: 'none', cursor: 'pointer',
            position: 'relative',
            boxShadow: '0 0 30px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.2)',
            animation: 'ctaPulse 2.5s ease infinite',
          }}
        >
          BOOK A CALL
        </button>

        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', color: '#FFFFFF', opacity: 0.2, marginTop: '24px', letterSpacing: '0.15em' }}>
          LIMITED SPOTS — 3 BRANDS / MONTH
        </div>
      </div>

      {/* Spark particles (fixed position, above everything) */}
      {sparks.map(s => (
        <div
          key={s.id}
          style={{
            position: 'fixed',
            left: s.x,
            top:  s.y,
            width:  '4px',
            height: '4px',
            borderRadius: '50%',
            background: '#FF0000',
            opacity: s.life,
            pointerEvents: 'none',
            zIndex: 9999,
            boxShadow: '0 0 6px #FF0000',
            transform: 'translate(-50%,-50%)',
          }}
        />
      ))}
    </section>
  )
}
