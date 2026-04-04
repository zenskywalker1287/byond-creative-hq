import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 48,  suffix: 'hrs', prefix: '',  label: 'From brief to live site',  sub: 'Guaranteed delivery window'         },
  { value: 1500, suffix: '+',  prefix: '$', label: 'Starting price',            sub: 'Full custom React build'            },
  { value: 100,  suffix: '%',  prefix: '',  label: 'Custom. No templates.',     sub: 'Every component built from scratch' },
  { value: 7,    suffix: 'day', prefix: '', label: 'Revision window',           sub: 'Unlimited edits, one flat rate'     },
]

export default function ZStats() {
  const sectionRef  = useRef<HTMLElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-stats-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      STATS.forEach((stat, i) => {
        const el = counterRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString()
          },
        })
      })

      gsap.from('.z-stat-item', {
        y: 56, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="results"
      ref={sectionRef}
      style={{
        padding: '120px 40px',
        background: '#000',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <div className="z-stats-heading" style={{ marginBottom: '72px' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            color: '#0071e3',
            letterSpacing: '0.01em',
            marginBottom: '16px',
          }}>
            The numbers
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 5.5vw, 68px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: '#fff',
            lineHeight: 1.0,
            margin: 0,
          }}>
            Built fast.
            <br />Built right.
          </h2>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
        }}>
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="z-stat-item"
              style={{
                padding: '48px 36px',
                borderRight: '1px solid rgba(255,255,255,0.08)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: '700',
                letterSpacing: '-0.04em',
                color: '#fff',
                lineHeight: 1,
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'baseline',
                gap: '2px',
              }}>
                {stat.prefix && (
                  <span style={{ fontSize: '55%', color: 'rgba(255,255,255,0.5)' }}>
                    {stat.prefix}
                  </span>
                )}
                <span ref={el => { counterRefs.current[i] = el }}>0</span>
                <span style={{ fontSize: '40%', color: 'rgba(255,255,255,0.4)', marginLeft: '2px' }}>
                  {stat.suffix}
                </span>
              </div>

              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '15px',
                fontWeight: '500',
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: '-0.01em',
                marginBottom: '6px',
              }}>
                {stat.label}
              </div>

              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '13px',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
              }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
