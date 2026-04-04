import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const REEL_CARDS = [
  {
    client: 'RICH HAIR CITY',
    type: 'E-Commerce',
    stat: '4.2x',
    statLabel: 'more conversions. 3 weeks post-launch.',
    gradient: 'linear-gradient(135deg, rgba(20,10,0,0.85) 0%, rgba(5,5,5,0.92) 100%)',
    image: '/images/hero-macbook.jpg',
    tags: ['React', 'Vite', '48hrs', 'E-Commerce'],
  },
  {
    client: 'PRESTIGE AUTO',
    type: 'Automotive',
    stat: '2.8x',
    statLabel: 'more lead form submits. First month.',
    gradient: 'linear-gradient(135deg, rgba(0,8,20,0.88) 0%, rgba(0,4,12,0.94) 100%)',
    image: '/images/multi-device.jpg',
    tags: ['React', 'GSAP', '48hrs', 'Automotive'],
  },
  {
    client: 'BLUE WAVE SPA',
    type: 'Med Spa',
    stat: '+40%',
    statLabel: 'online bookings. 6 weeks after launch.',
    gradient: 'linear-gradient(135deg, rgba(0,10,20,0.85) 0%, rgba(0,5,12,0.92) 100%)',
    image: '/images/glass-panels.jpg',
    tags: ['React', 'Framer', '48hrs', 'Med Spa'],
  },
  {
    client: 'ATLAS REALTY',
    type: 'Real Estate',
    stat: '3x',
    statLabel: 'more listing inquiries. Same traffic.',
    gradient: 'linear-gradient(135deg, rgba(4,10,4,0.88) 0%, rgba(2,6,2,0.94) 100%)',
    image: '/images/workspace-aerial.jpg',
    tags: ['React', 'GSAP', '48hrs', 'Real Estate'],
  },
]

export default function S04FilmReel() {
  const outerRef    = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const statsRefs   = useRef<(HTMLDivElement | null)[]>([])
  const macRefs     = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const CARD_W = Math.min(window.innerWidth * 0.78, 900)
      const GAP    = 32
      const total  = REEL_CARDS.length * (CARD_W + GAP)

      // Horizontal scroll
      const hTween = gsap.to(trackRef.current, {
        x: () => -(total - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: outerRef.current,
          start: 'top top',
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        },
      })

      // MacBook idle float for each card
      macRefs.current.forEach((macImg) => {
        if (!macImg) return
        gsap.to(macImg, {
          y: -10,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

      // Stat count-up
      statsRefs.current.forEach((el, i) => {
        if (!el) return
        const raw    = REEL_CARDS[i].stat
        const num    = parseFloat(raw.replace(/[^0-9.]/g, ''))
        const prefix = raw.match(/^[^0-9]*/)![0]
        const suffix = raw.match(/[^0-9.]+$/)![0]

        ScrollTrigger.create({
          trigger: el,
          containerAnimation: hTween,
          start: 'left 80%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: num, duration: 1.5, ease: 'power2.out',
              onUpdate: function () {
                if (el) el.textContent = `${prefix}${this.targets()[0].val.toFixed(1).replace('.0', '')}${suffix}`
              },
            })
          },
        })
      })

    }, outerRef)

    return () => ctx.revert()
  }, [])

  function handleMouseMove(
    e: React.MouseEvent<HTMLDivElement>,
    macImg: HTMLImageElement | null,
  ) {
    if (!macImg) return
    const rect   = e.currentTarget.getBoundingClientRect()
    const cx     = rect.left + rect.width  / 2
    const cy     = rect.top  + rect.height / 2
    const dx     = (e.clientX - cx) / (rect.width  / 2)  // -1 … 1
    const dy     = (e.clientY - cy) / (rect.height / 2)  // -1 … 1
    gsap.to(macImg, {
      rotateY: dx * 12,
      rotateX: -dy * 8,
      transformPerspective: 1200,
      duration: 0.4,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  function handleMouseLeave(macImg: HTMLImageElement | null) {
    if (!macImg) return
    gsap.to(macImg, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })
  }

  return (
    <div
      ref={outerRef}
      id="reel"
      style={{ height: '100vh', overflow: 'hidden', background: '#000000', position: 'relative' }}
    >
      {/* Top progress + label */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '24px 40px 0',
        display: 'flex', alignItems: 'center', gap: '24px',
      }}>
        <span style={{
          fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
          color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>Client Results</span>
        <div style={{
          flex: 1, height: '1px', background: 'rgba(245,245,245,0.06)',
          position: 'relative', overflow: 'hidden', borderRadius: '1px',
        }}>
          <div ref={progressRef} style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            background: '#0071e3', width: '0%',
            transition: 'width 0.05s linear',
          }} />
        </div>
      </div>

      {/* Scrolling track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '32px',
          padding: '0 40px',
          height: '100%',
          alignItems: 'center',
          width: 'max-content',
        }}
      >
        {REEL_CARDS.map((card, i) => (
          <div
            key={i}
            onMouseMove={(e) => handleMouseMove(e, macRefs.current[i])}
            onMouseLeave={() => handleMouseLeave(macRefs.current[i])}
            style={{
              flexShrink: 0,
              width: 'min(78vw, 900px)',
              height: '78vh',
              background: '#080808',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(245,245,245,0.06)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Client name watermark */}
            <div style={{
              position: 'absolute',
              bottom: '-30px', left: '-10px',
              fontFamily: '"Inter", sans-serif',
              fontSize: 'clamp(80px, 10vw, 140px)',
              fontWeight: '900',
              letterSpacing: '-0.05em',
              color: 'rgba(245,245,245,0.04)',
              lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none',
              whiteSpace: 'nowrap',
              zIndex: 0,
            }}>{card.client}</div>

            {/* Top 55% — MacBook visual */}
            <div style={{
              height: '55%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
              flexShrink: 0,
            }}>
              <img
                ref={(el) => { macRefs.current[i] = el }}
                src="/images/macbook-open.png"
                alt={`${card.client} site on MacBook`}
                style={{
                  width: '72%',
                  margin: '0 auto',
                  display: 'block',
                  filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.8))',
                  willChange: 'transform',
                  transformStyle: 'preserve-3d',
                }}
              />
            </div>

            {/* Bottom 45% — client info */}
            <div style={{
              height: '45%',
              flexShrink: 0,
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: '0 48px 0 48px',
            }}>
              {/* Type label */}
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '12px',
                fontWeight: '600',
                color: '#0071e3',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>{card.type}</div>

              {/* Client name + tags row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px',
              }}>
                <div style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: '800',
                  letterSpacing: '-0.04em',
                  color: '#f5f5f5',
                  lineHeight: 1,
                }}>{card.client}</div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: '200px' }}>
                  {card.tags.map(tag => (
                    <span key={tag} style={{
                      fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: '500',
                      color: 'rgba(245,245,245,0.5)',
                      background: 'rgba(245,245,245,0.06)',
                      border: '1px solid rgba(245,245,245,0.08)',
                      padding: '4px 10px', borderRadius: '980px',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Blue divider */}
              <div style={{
                width: '40px', height: '2px', background: '#0071e3',
                marginBottom: '12px',
                flexShrink: 0,
              }} />

              {/* Stat number */}
              <div
                ref={(el) => { statsRefs.current[i] = el }}
                style={{
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 'clamp(56px, 8vw, 100px)',
                  fontWeight: '900',
                  letterSpacing: '-0.05em',
                  color: '#f5f5f5',
                  lineHeight: 1,
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: '8px',
                }}
              >{card.stat}</div>

              {/* Stat label */}
              <div style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '15px',
                fontWeight: '400',
                color: 'rgba(245,245,245,0.55)',
                letterSpacing: '-0.01em',
                lineHeight: 1.5,
                maxWidth: '340px',
              }}>{card.statLabel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
