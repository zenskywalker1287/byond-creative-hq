import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORK_ITEMS = [
  {
    id: 'rich-hair',
    title: 'Rich Hair City',
    type: 'E-Commerce',
    description: 'Luxury hair brand — full e-commerce site. Collections, product pages, bundles, email signup.',
    url: 'http://localhost:5173',
    image: '/images/hero-macbook.jpg',
    bg: 'linear-gradient(135deg, #2a1000 0%, #0a0500 100%)',
    accent: '#0071e3',
  },
  {
    id: 'blue-wave',
    title: 'Blue Wave Spa',
    type: 'Med Spa',
    description: 'Premium med spa — booking system, treatment pages, before/after gallery, trust-building UX.',
    url: null,
    image: '/images/glass-panels.jpg',
    bg: 'linear-gradient(135deg, #001a2e 0%, #000810 100%)',
    accent: '#4a9eff',
  },
  {
    id: 'atlas',
    title: 'Atlas Realty',
    type: 'Real Estate',
    description: 'Agent personal brand site — listings, about, market stats, lead capture optimized for conversions.',
    url: null,
    image: '/images/multi-device.jpg',
    bg: 'linear-gradient(135deg, #0a200a 0%, #040f04 100%)',
    accent: '#4ade80',
  },
]

export default function S05Takeover() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const macbookRefs = useRef<(HTMLImageElement | null)[]>([])
  const floatTweens = useRef<(gsap.core.Tween | null)[]>([])

  const openCard = (i: number) => {
    if (active !== null) return
    setActive(i)

    cardRefs.current.forEach((card, j) => {
      if (j === i || !card) return
      gsap.to(card, {
        x: j < i ? '-120vw' : '120vw',
        opacity: 0, scale: 0.8,
        duration: 0.5, ease: 'power3.in',
      })
    })

    gsap.to(cardRefs.current[i], {
      width: '100vw', height: '100vh',
      top: 0, left: 0, borderRadius: 0,
      zIndex: 100,
      duration: 0.55, ease: 'power4.out',
    })
  }

  const closeCard = () => {
    if (active === null) return

    gsap.to(cardRefs.current[active], {
      width: '', height: '',
      top: '', left: '',
      borderRadius: '20px',
      zIndex: 1,
      duration: 0.5, ease: 'power3.inOut',
      onComplete: () => {
        setActive(null)

        cardRefs.current.forEach((card) => {
          if (!card) return
          gsap.to(card, { x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' })
        })
      }
    })
  }

  // GSAP idle float on each MacBook
  useEffect(() => {
    macbookRefs.current.forEach((img, i) => {
      if (!img) return
      floatTweens.current[i] = gsap.to(img, {
        y: -8,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    })
    return () => {
      floatTweens.current.forEach((t) => t && t.kill())
    }
  }, [])

  // Entrance scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.takeover-card', {
        y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, i: number) => {
    const img = macbookRefs.current[i]
    if (!img) return
    const card = cardRefs.current[i]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    gsap.to(img, {
      rotateY: dx * 14,
      rotateX: -dy * 10,
      transformPerspective: 1000,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = (i: number) => {
    const img = macbookRefs.current[i]
    if (!img) return
    gsap.to(img, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })
  }

  return (
    <section
      ref={sectionRef}
      id="work-takeover"
      style={{
        background: '#000000',
        padding: '120px 40px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto', marginBottom: '72px',
      }}>
        <p style={{
          fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
          color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
          marginBottom: '16px',
        }}>The work</p>
        <h2 style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(44px, 6vw, 72px)',
          fontWeight: '800', letterSpacing: '-0.05em',
          color: '#f5f5f5', lineHeight: 1,
        }}>
          Hover a card.<br />
          <span style={{ color: 'rgba(245,245,245,0.3)' }}>See it detonate.</span>
        </h2>
      </div>

      {/* Cards row */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px',
        position: 'relative',
      }}>
        {WORK_ITEMS.map((item, i) => (
          <div
            key={item.id}
            ref={el => { cardRefs.current[i] = el }}
            className="takeover-card"
            data-cursor
            onClick={() => active === null ? openCard(i) : undefined}
            onMouseMove={(e) => handleMouseMove(e, i)}
            onMouseLeave={() => handleMouseLeave(i)}
            style={{
              height: '560px',
              background: '#080808',
              borderRadius: '20px',
              overflow: 'hidden',
              position: active === i ? 'fixed' : 'relative',
              cursor: 'none',
              border: '1px solid rgba(245,245,245,0.06)',
              willChange: 'transform',
            }}
          >
            {/* TOP HALF — MacBook visual */}
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: '55%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}>
              <img
                ref={el => { macbookRefs.current[i] = el }}
                src="/images/macbook-open.png"
                alt={`${item.title} preview`}
                style={{
                  width: '70%',
                  display: 'block',
                  transform: 'translateY(10%)',
                  filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.9))',
                  willChange: 'transform',
                }}
              />
            </div>

            {/* BOTTOM HALF — text content */}
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              padding: '28px',
              background: 'linear-gradient(to top, #080808 60%, transparent)',
            }}>
              <span style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '11px',
                fontWeight: '600',
                color: '#0071e3',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '8px',
              }}>{item.type}</span>

              <h3 style={{
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 'clamp(22px, 2.2vw, 28px)',
                fontWeight: '700',
                letterSpacing: '-0.04em',
                color: '#f5f5f5',
                lineHeight: 1.15,
                marginBottom: '10px',
              }}>{item.title}</h3>

              <p style={{
                fontFamily: '"Inter", sans-serif',
                fontSize: '14px',
                color: 'rgba(245,245,245,0.5)',
                lineHeight: 1.6,
                marginBottom: '16px',
              }}>{item.description}</p>

              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  style={{
                    fontFamily: '"Inter", sans-serif',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#000000',
                    background: item.accent,
                    padding: '9px 18px',
                    borderRadius: '980px',
                    textDecoration: 'none',
                    display: 'inline-block',
                  }}
                >View Live →</a>
              )}
            </div>

            {/* Expand hint */}
            {active === null && (
              <div style={{
                position: 'absolute', top: '20px', right: '20px',
                width: '32px', height: '32px',
                background: 'rgba(245,245,245,0.06)',
                border: '1px solid rgba(245,245,245,0.1)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: 'rgba(245,245,245,0.5)',
                zIndex: 10,
              }}>⤢</div>
            )}

            {/* Close button when active */}
            {active === i && (
              <div
                onClick={e => { e.stopPropagation(); closeCard() }}
                data-cursor
                style={{
                  position: 'absolute', top: '24px', right: '24px', zIndex: 200,
                  fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: '500',
                  color: 'rgba(245,245,245,0.7)',
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(245,245,245,0.15)',
                  padding: '8px 16px', borderRadius: '980px',
                  backdropFilter: 'blur(8px)', cursor: 'none',
                }}
              >← Back to Work</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
