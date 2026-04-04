import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '40%',   label: 'Total Revenue From Email',   side: 'left'  },
  { value: '$100K', label: 'In A Single Month',           side: 'right' },
  { value: '300+',  label: 'Campaigns Executed',          side: 'left'  },
  { value: '95%',   label: 'Client Retention Rate',       side: 'right' },
]

export default function SecondNumbersWall() {
  const sectionRef  = useRef<HTMLElement>(null)
  const flashRef    = useRef<HTMLDivElement>(null)
  const statRefs    = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const ruleRefs    = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const [landed, setLanded] = useState<Set<number>>(new Set())

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const flash = () => {
      if (!flashRef.current) return
      gsap.fromTo(flashRef.current,
        { opacity: 0.18 },
        { opacity: 0, duration: 0.5, ease: 'power2.out' }
      )
    }

    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el   = statRefs.current[i]
        const rule = ruleRefs.current[i]
        if (!el || !rule) return

        // Set initial state
        gsap.set(el,   { x: stat.side === 'left' ? -180 : 180, opacity: 0 })
        gsap.set(rule, { scaleX: 0, transformOrigin: stat.side === 'left' ? 'left' : 'right' })

        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once:  true,
          onEnter: () => {
            // Slam in
            gsap.to(el, {
              x: 0, opacity: 1, duration: 0.55, ease: 'power4.out',
              onComplete: () => {
                flash()
                setLanded(prev => new Set([...prev, i]))
                // Shoot the rule
                gsap.to(rule, { scaleX: 1, duration: 0.35, ease: 'power3.out', delay: 0.05 })
              },
            })
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ padding: '100px 32px', borderTop: '1px solid rgba(255,0,0,0.08)', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}
    >
      {/* Impact flash overlay */}
      <div
        ref={flashRef}
        style={{ position: 'absolute', inset: 0, background: 'rgba(255,0,0,1)', opacity: 0, pointerEvents: 'none', zIndex: 0 }}
      />

      <div
        style={{
          fontFamily: "'Black Han Sans',sans-serif", fontSize: '13px', color: '#FF0000',
          letterSpacing: '0.3em', marginBottom: '64px', textAlign: 'center', position: 'relative', zIndex: 1,
        }}
      >
        THE NUMBERS DON&apos;T LIE
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '48px', position: 'relative', zIndex: 1 }}>
        {STATS.map((stat, i) => (
          <div
            key={i}
            ref={el => { statRefs.current[i] = el }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: stat.side === 'left' ? 'flex-start' : 'flex-end',
              textAlign:  stat.side === 'left' ? 'left' : 'right',
            }}
          >
            {/* Number */}
            <div style={{
              fontFamily: "'Black Han Sans',sans-serif",
              fontSize: 'clamp(64px,10vw,120px)',
              color: '#FFFFFF',
              lineHeight: 0.9,
              marginBottom: '8px',
            }}>
              {stat.value}
            </div>

            {/* Red rule — shoots out from number */}
            <div
              ref={el => { ruleRefs.current[i] = el }}
              style={{
                height: '2px',
                width: '100%',
                maxWidth: '400px',
                background: '#FF0000',
                marginBottom: '10px',
                transformOrigin: stat.side === 'left' ? 'left' : 'right',
              }}
            />

            {/* Label */}
            <div style={{
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: '12px',
              color: '#FF0000',
              letterSpacing: '0.15em',
              opacity: landed.has(i) ? 0.75 : 0.1,
              transition: 'opacity 0.4s ease',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
