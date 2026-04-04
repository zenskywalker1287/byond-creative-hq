import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CASE_STUDIES = [
  {
    client: 'Rich Hair City',
    category: 'E-Commerce',
    headline: 'Premium Brazilian hair extensions brand. Zero web presence → custom storefront in 48 hours.',
    image: '/images/multi-device.jpg',
    stats: [
      { val: '48', unit: 'hrs', label: 'Delivered' },
      { val: '100%', unit: '', label: 'Custom code' },
      { val: '5', unit: 'pg', label: 'Full site' },
    ],
    tags: ['React + Vite', 'Custom design', 'Mobile-first', 'GSAP animations'],
    live: true,
  },
]

export default function ZWork() {
  const sectionRef  = useRef<HTMLElement>(null)
  const featureRef  = useRef<HTMLDivElement>(null)

  // 3D tilt on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = featureRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5  // -0.5 to 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    el.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 5}deg) scale(1.01)`
  }
  const handleMouseLeave = () => {
    if (featureRef.current) {
      featureRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-work-heading', {
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-work-heading', start: 'top 85%' },
      })

      gsap.from('.z-work-feature', {
        y: 80, opacity: 0, duration: 1.0, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-work-feature', start: 'top 80%' },
      })

      gsap.from('.z-work-grid-card', {
        y: 60, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-work-grid-card', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        background: '#000',
        padding: '120px 40px',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <div className="z-work-heading" style={{ marginBottom: '72px' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px', fontWeight: '600', color: '#0071e3',
            letterSpacing: '0.01em', marginBottom: '16px',
          }}>
            Recent work
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: '700',
            letterSpacing: '-0.03em', color: '#fff', lineHeight: 1.0, margin: 0,
          }}>
            Built this week.
          </h2>
        </div>

        {/* Featured case study */}
        {CASE_STUDIES.map(cs => (
          <div
            key={cs.client}
            className="z-work-feature"
            style={{
              borderRadius: '20px',
              overflow: 'hidden',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: '16px',
              transition: 'transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.2s ease',
              willChange: 'transform',
              cursor: 'default',
            }}
            ref={featureRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => { if (featureRef.current) featureRef.current.style.borderColor = 'rgba(255,255,255,0.18)' }}
          >
            {/* Image */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={cs.image}
                alt={cs.client}
                style={{
                  width: '100%',
                  height: '520px',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
              />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, transparent 40%, rgba(10,10,10,0.9) 100%)',
              }} />
              {/* Live badge */}
              {cs.live && (
                <div style={{
                  position: 'absolute', top: '24px', left: '24px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '6px 14px', borderRadius: '980px',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}>
                  <div style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    background: '#34c759', boxShadow: '0 0 6px rgba(52,199,89,0.8)',
                  }} />
                  <span style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                    fontSize: '11px', color: '#fff', fontWeight: '500',
                  }}>Live site</span>
                </div>
              )}
              {/* Category */}
              <div style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '6px 14px', borderRadius: '980px',
                border: '1px solid rgba(255,255,255,0.10)',
              }}>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: '400',
                  letterSpacing: '0.02em',
                }}>{cs.category}</span>
              </div>
            </div>

            {/* Details row */}
            <div style={{
              padding: '40px 48px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '32px',
            }}>
              <div style={{ flex: 1, minWidth: '280px' }}>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '10px',
                }}>
                  Client project
                </p>
                <h3 style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: '700',
                  letterSpacing: '-0.025em', color: '#fff', margin: '0 0 16px', lineHeight: 1.1,
                }}>
                  {cs.client}
                </h3>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '15px', color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.65, maxWidth: '440px', margin: '0 0 20px',
                  letterSpacing: '-0.01em',
                }}>
                  {cs.headline}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {cs.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px', color: 'rgba(255,255,255,0.4)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 10px', borderRadius: '980px',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
                {cs.stats.map(s => (
                  <div key={s.label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                      fontSize: '32px', fontWeight: '700',
                      letterSpacing: '-0.03em', color: '#fff', lineHeight: 1,
                      display: 'flex', alignItems: 'baseline', gap: '2px',
                    }}>
                      {s.val}
                      <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>{s.unit}</span>
                    </div>
                    <div style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '4px',
                    }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Grid — more work */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {[
            {
              img: '/images/workspace-aerial.jpg',
              client: 'Your business',
              tag: 'Next up',
              desc: 'Your site could be here. We build in 48 hours.',
            },
            {
              img: '/images/glass-panels.jpg',
              client: 'SaaS Dashboard',
              tag: 'In progress',
              desc: 'Custom product portal. Delivered this week.',
            },
          ].map(item => (
            <div
              key={item.client}
              className="z-work-grid-card"
              style={{
                borderRadius: '16px', overflow: 'hidden',
                background: '#0a0a0a', border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative', cursor: 'default',
                transition: 'border-color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={item.img}
                  alt={item.client}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    filter: 'brightness(0.45)',
                    transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
                />
              </div>
              <div style={{ padding: '24px 28px' }}>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px', fontWeight: '500',
                  color: 'rgba(255,255,255,0.4)',
                  background: 'rgba(255,255,255,0.06)', padding: '3px 10px',
                  borderRadius: '980px', letterSpacing: '0.01em',
                  display: 'inline-block', marginBottom: '10px',
                }}>{item.tag}</span>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: '18px', fontWeight: '600', color: '#fff',
                  letterSpacing: '-0.02em', margin: '0 0 8px', lineHeight: 1.2,
                }}>{item.client}</p>
                <p style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '13px', color: 'rgba(255,255,255,0.4)',
                  lineHeight: 1.55, margin: 0,
                }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div style={{
          marginTop: '56px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <a
            href="#contact"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '15px', fontWeight: '400',
              color: '#0071e3', letterSpacing: '-0.01em',
              textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              transition: 'gap 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.gap = '10px' }}
            onMouseLeave={e => { e.currentTarget.style.gap = '6px' }}
          >
            Get your demo site built →
          </a>
        </div>
      </div>
    </section>
  )
}
