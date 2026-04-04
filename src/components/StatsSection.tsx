import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { num: '$2M+',   label: 'REVENUE GENERATED',    sub: 'Across all client accounts, flows, and campaigns combined.'       },
  { num: '1,200+', label: 'CREATIVES SHIPPED',    sub: 'Emails, SMS flows, ad creatives — all performance-tested.'        },
  { num: '47%',    label: 'AVG OPEN RATE',        sub: 'Industry sits at 21%. We don\'t play in the average lane.'        },
  { num: '8.2x',   label: 'AVG ROAS',             sub: 'For every $1 spent on email, clients see $8.20 back.'             },
]

export default function StatsSection() {
  const sectionRef    = useRef<HTMLElement>(null)
  const chaptersRef   = useRef<HTMLDivElement>(null)
  const spliceRef     = useRef<HTMLDivElement>(null)
  const [chapter, setChapter]     = useState(0)
  const [numKey,  setNumKey]      = useState(0)
  const [splicing, setSplicing]   = useState(false)
  const [noisy, setNoisy]         = useState(false)
  const chapterRef    = useRef(0)

  const triggerSplice = (next: number) => {
    if (next === chapterRef.current) return
    chapterRef.current = next

    // Film splice: red bar sweeps across
    setSplicing(true)
    setTimeout(() => {
      setChapter(next)
      setNumKey(k => k + 1)
      setNoisy(true)
      setSplicing(false)
      // Noise resolves
      setTimeout(() => setNoisy(false), 400)
    }, 150)
  }

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        pin:     true,
        start:   'top top',
        end:     '+=300%',
        onUpdate: self => {
          const next = Math.min(3, Math.floor(self.progress * 4 + 0.01))
          triggerSplice(next)
        },
      })
    }, section)

    return () => ctx.revert()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const c = CHAPTERS[chapter]

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{ height: '100vh', background: '#0A0A0A', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Film splice bar */}
      <div
        ref={spliceRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
          background: '#FF0000',
          transform: splicing ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: splicing ? 'transform 0.15s ease' : 'transform 0.15s ease 0.15s',
        }}
      />

      {/* Noise overlay — resolves after splice */}
      {noisy && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 9, pointerEvents: 'none',
          opacity: noisy ? 1 : 0,
          transition: 'opacity 0.4s ease',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
          mixBlendMode: 'overlay',
        }} />
      )}

      {/* Chapter counter */}
      <div style={{
        position: 'absolute', top: '40px', left: '40px', zIndex: 5,
        fontFamily: "'JetBrains Mono',monospace", fontSize: '11px',
        color: '#FF0000', letterSpacing: '0.2em', opacity: 0.7,
        display: 'flex', alignItems: 'center',
      }}>
        CHAPTER {String(chapter + 1).padStart(2, '0')} / 04<span className="typewriter-cursor" />
      </div>

      {/* Chapter dots */}
      <div style={{ position: 'absolute', top: '40px', right: '40px', zIndex: 5, display: 'flex', gap: '8px' }}>
        {CHAPTERS.map((_, i) => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i === chapter ? '#FF0000' : 'rgba(255,0,0,0.2)', transition: 'background 0.3s ease' }} />
        ))}
      </div>

      {/* Content */}
      <div ref={chaptersRef} style={{ textAlign: 'center', padding: '0 32px', position: 'relative', zIndex: 5 }}>

        {/* Big number with scanline effect */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '16px' }}>
          <div
            key={numKey}
            style={{
              fontFamily: "'Black Han Sans',sans-serif",
              fontSize: 'clamp(100px,18vw,200px)',
              color: '#FFFFFF',
              lineHeight: 0.9,
              letterSpacing: '-0.02em',
              filter: noisy ? 'blur(1px)' : 'none',
              transition: 'filter 0.4s ease',
              animation: 'slotDown 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {c.num}
          </div>
          {/* Scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(10,10,10,0.15) 2px, rgba(10,10,10,0.15) 4px)',
            animation: 'scanlines 3s linear infinite',
          }} />
        </div>

        <div style={{
          fontFamily: "'Black Han Sans',sans-serif",
          fontSize: 'clamp(18px,2.5vw,28px)',
          color: '#FF0000',
          letterSpacing: '0.2em',
          marginBottom: '20px',
          opacity: noisy ? 0.3 : 1,
          transition: 'opacity 0.4s ease',
        }}>
          {c.label}
        </div>

        <p style={{
          fontFamily: "'Poppins',sans-serif",
          fontSize: '16px',
          color: '#FFFFFF',
          opacity: noisy ? 0.1 : 0.45,
          maxWidth: '420px',
          margin: '0 auto',
          lineHeight: 1.6,
          transition: 'opacity 0.4s ease',
        }}>
          {c.sub}
        </p>
      </div>

      {/* Bottom scroll hint */}
      <div style={{
        position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 5,
        fontFamily: "'JetBrains Mono',monospace", fontSize: '9px', color: '#FF0000',
        letterSpacing: '0.25em', opacity: 0.35,
      }}>
        {chapter < 3 ? 'SCROLL FOR NEXT CHAPTER' : 'END OF SEQUENCE'}
      </div>
    </section>
  )
}
