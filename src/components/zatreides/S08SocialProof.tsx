import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRANDS = [
  'Rich Hair City', 'The Agency', 'SoCal Smiles', 'Casa Blanca Eats',
  'Prestige Motors', 'Blue Wave Med Spa', 'Atlas Real Estate', 'Soleil Studio',
  'Pacific Thread', 'Harbor House', 'Malibu Brows', 'Coastal Kitchen',
]

const TESTIMONIALS = [
  {
    quote: 'I pitched the site to my client before it was even finished. They signed the same day. That\'s what happens when the design actually closes deals.',
    name: 'Marcus T.',
    role: 'Real Estate Agent, Calabasas',
  },
  {
    quote: 'Every agency quoted me 6 weeks and $8,000. These guys built something better in 48 hours. My booking rate went up 40% in the first month.',
    name: 'Dr. Elena V.',
    role: 'Med Spa Owner, Beverly Hills',
  },
  {
    quote: 'I stopped losing jobs to guys with worse portfolios and better websites. Now I am the guy with the better website.',
    name: 'Danny R.',
    role: 'Contractor, Long Beach',
  },
]

const STATS = [
  { value: 48,  suffix: ' hrs', label: 'average delivery' },
  { value: 1500, prefix: '$', label: 'starting price' },
  { value: 100, suffix: '%',  label: 'custom built' },
  { value: 40,  suffix: '%+', label: 'avg conversion lift' },
]

export default function S08SocialProof() {
  const sectionRef  = useRef<HTMLElement>(null)
  const marqueeRef  = useRef<HTMLDivElement>(null)
  const statsRefs   = useRef<(HTMLSpanElement | null)[]>([])
  const macbookRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Infinite marquee
      if (marqueeRef.current) {
        const items = marqueeRef.current
        gsap.to(items, {
          x: '-50%',
          duration: 28,
          ease: 'none',
          repeat: -1,
        })
      }

      // Count-up stats
      STATS.forEach((stat, i) => {
        const el = statsRefs.current[i]
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to({ val: 0 }, {
              val: stat.value,
              duration: 1.8,
              ease: 'power2.out',
              onUpdate: function() {
                if (el) el.textContent = `${stat.prefix || ''}${Math.round(this.targets()[0].val)}${stat.suffix || ''}`
              }
            })
          }
        })
      })

      // Testimonials
      gsap.from('.proof-testimonial', {
        y: 60, opacity: 0, stagger: 0.2, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.proof-testimonials', start: 'top 75%' },
      })

      // Stats row
      gsap.from('.proof-stat', {
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.proof-stats', start: 'top 80%' },
      })

      // Idle float on each MacBook img
      macbookRefs.current.forEach((img) => {
        if (!img) return
        gsap.to(img, {
          y: -6,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCardMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    imgEl: HTMLImageElement | null
  ) => {
    if (!imgEl) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    gsap.to(imgEl, {
      rotateY: dx * 10,
      rotateX: -dy * 6,
      transformPerspective: 900,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleCardMouseLeave = (imgEl: HTMLImageElement | null) => {
    if (!imgEl) return
    gsap.to(imgEl, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      overwrite: 'auto',
    })
  }

  return (
    <section ref={sectionRef} id="proof" style={{ background: '#000000', padding: '0 0 120px' }}>

      {/* Marquee */}
      <div style={{
        overflow: 'hidden', borderTop: '1px solid rgba(245,245,245,0.06)',
        borderBottom: '1px solid rgba(245,245,245,0.06)',
        padding: '20px 0', marginBottom: '120px',
      }}>
        <div ref={marqueeRef} style={{ display: 'flex', gap: '0', width: 'max-content' }}>
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div key={i} style={{
              padding: '0 48px',
              fontFamily: '"Inter", -apple-system, sans-serif',
              fontSize: '14px', fontWeight: '500',
              color: 'rgba(245,245,245,0.3)',
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: '48px',
            }}>
              {brand}
              <span style={{ display: 'inline-block', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,113,227,0.4)' }} />
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 40px' }}>

        {/* Section label */}
        <p style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '12px', fontWeight: '600',
          color: '#0071e3', letterSpacing: '0.06em',
          textTransform: 'uppercase', marginBottom: '64px', textAlign: 'center',
        }}>Client results</p>

        {/* Stats */}
        <div
          className="proof-stats"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(245,245,245,0.06)',
            border: '1px solid rgba(245,245,245,0.06)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '100px',
          }}
        >
          {STATS.map((stat, i) => (
            <div key={i} className="proof-stat"
              style={{
                background: '#000000',
                padding: '48px 32px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 'clamp(44px, 5vw, 64px)',
                fontWeight: '800',
                letterSpacing: '-0.04em',
                color: '#f5f5f5',
                lineHeight: 1,
                marginBottom: '12px',
              }}>
                <span
                  ref={el => { statsRefs.current[i] = el }}
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                </span>
              </div>
              <div style={{
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: '13px', fontWeight: '400',
                color: 'rgba(245,245,245,0.4)', letterSpacing: '-0.01em',
              }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div
          className="proof-testimonials"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="proof-testimonial"
              onMouseMove={(e) => handleCardMouseMove(e, macbookRefs.current[i])}
              onMouseLeave={() => handleCardMouseLeave(macbookRefs.current[i])}
              style={{
                background: 'rgba(245,245,245,0.02)',
                border: '1px solid rgba(245,245,245,0.07)',
                borderRadius: '20px',
                padding: 0,
                overflow: 'hidden',
              }}
            >
              {/* MacBook image strip */}
              <div style={{
                height: '180px',
                overflow: 'hidden',
                position: 'relative',
                background: '#080808',
              }}>
                <img
                  ref={el => { macbookRefs.current[i] = el }}
                  src="/images/macbook-open.png"
                  alt=""
                  style={{
                    width: '65%',
                    display: 'block',
                    margin: '0 auto',
                    marginTop: '-10px',
                    filter: 'drop-shadow(0 16px 40px rgba(0,0,0,0.9))',
                  }}
                />
              </div>

              {/* Testimonial content */}
              <div style={{ padding: '28px 28px 32px' }}>
                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '15px',
                  fontWeight: '400',
                  color: 'rgba(245,245,245,0.7)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  marginBottom: '24px',
                }}>
                  "{t.quote}"
                </div>
                <div style={{
                  width: '28px',
                  height: '1px',
                  background: '#0071e3',
                  marginBottom: '14px',
                }} />
                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#f5f5f5',
                  marginBottom: '4px',
                }}>{t.name}</div>
                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(245,245,245,0.4)',
                }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
