import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RGE_IMGS = [
  '/email-01.png', '/email-02.png', '/email-03.png',
  '/email-04.png', '/email-05.png', '/email-06.png',
]

export default function FeaturedAlongside() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(2)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const advance = useCallback(() => {
    setActiveIdx(i => (i + 1) % RGE_IMGS.length)
  }, [])

  useEffect(() => {
    autoRef.current = setInterval(advance, 3500)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [advance])

  const goTo = (i: number) => {
    if (autoRef.current) clearInterval(autoRef.current)
    setActiveIdx(i)
  }

  useEffect(() => {
    if (!headlineRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(headlineRef.current,
        { yPercent: 60, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: headlineRef.current, start: 'top 85%' } }
      )
    })
    return () => ctx.revert()
  }, [])

  const getCardStyle = (i: number): React.CSSProperties => {
    let offset = i - activeIdx
    const total = RGE_IMGS.length
    if (offset > total / 2) offset -= total
    if (offset < -total / 2) offset += total
    const absOff = Math.abs(offset)
    const sign   = offset >= 0 ? 1 : -1

    if (absOff === 0) return {
      transform: 'translateX(0) scale(1) rotateY(0deg)',
      filter: 'brightness(1)',
      zIndex: 10,
      border: '1px solid rgba(255,0,0,0.4)',
      boxShadow: '0 0 30px rgba(255,0,0,0.6), 0 0 60px rgba(255,0,0,0.2)',
    }
    if (absOff === 1) return {
      transform: `translateX(${sign * 180}px) scale(0.85) rotateY(${sign * -45}deg)`,
      filter: 'brightness(0.5)',
      zIndex: 8,
      border: '1px solid rgba(255,0,0,0.08)',
      boxShadow: 'none',
    }
    return {
      transform: `translateX(${sign * 300}px) scale(0.70) rotateY(${sign * -65}deg)`,
      filter: 'brightness(0.25)',
      zIndex: 6,
      border: 'none',
      boxShadow: 'none',
    }
  }

  return (
    <section
      ref={sectionRef}
      data-fade-rise
      style={{ padding: '100px 32px', background: '#0A0A0A', position: 'relative', overflow: 'hidden', borderTop: '1px solid rgba(255,0,0,0.08)' }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>

        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', letterSpacing: '0.28em', marginBottom: '16px', opacity: 0.85 }}>
          AS SEEN ALONGSIDE
        </div>

        <div ref={headlineRef} style={{ overflow: 'hidden' }}>
          <h2 style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(48px,8vw,120px)', color: '#FFFFFF', lineHeight: 0.88, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
            FEATURED ON
          </h2>
          <h2 style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(48px,8vw,120px)', color: '#FF0000', lineHeight: 0.88, margin: '0 0 20px', letterSpacing: '-0.02em', textShadow: '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)' }}>
            REALLY GOOD EMAILS.
          </h2>
        </div>

        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.5)', marginBottom: '16px' }}>
          ALONGSIDE NIKE · CHIPOTLE · GYMSHARK
        </div>

        <p style={{ fontFamily: "'Poppins',sans-serif", fontStyle: 'italic', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto 8px', lineHeight: 1.65 }}>
          It's the industry's most respected email curation platform. Your work only gets on there if it's actually good.
        </p>

        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: '48px' }}>
          REALLYGOODEMAILS.COM · CURATED · NOT PAID
        </div>

        {/* Coverflow */}
        <div style={{ position: 'relative', height: '420px', perspective: '1200px', marginBottom: '32px' }}>
          {RGE_IMGS.map((src, i) => {
            const style = getCardStyle(i)
            return (
              <div
                key={i}
                onClick={() => goTo(i)}
                style={{
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-160px',
                  width: '320px',
                  height: '400px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  ...style,
                }}
              >
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', pointerEvents: 'none' }} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
