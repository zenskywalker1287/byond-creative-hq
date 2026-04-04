import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Custom Website Design',
    tag: 'THE BUILD',
    desc: 'No Squarespace. No templates. We build pixel-perfect React sites from scratch — every component coded for your brand and your client.',
    deliverable: 'Production-ready site with custom components, mobile-optimized, and ready to close deals.',
    details: ['React + Vite stack', 'Custom UI components', 'GSAP scroll animations', 'Mobile-first design'],
  },
  {
    num: '02',
    title: '48-Hour Delivery',
    tag: 'THE SPEED',
    desc: 'Full custom site from brief to live URL in 48 hours. You pitch on Monday, your client\'s site is live by Wednesday.',
    deliverable: 'Live, hosted URL delivered within 48 hours of kickoff. Guaranteed.',
    details: ['Brief to live in 48hrs', 'Live URL included', 'Revisions within 24hrs', 'No waiting, no delays'],
  },
  {
    num: '03',
    title: 'Ongoing Creative Retainer',
    tag: 'THE RELATIONSHIP',
    desc: 'Monthly retainer for landing pages, redesigns, new sections, and creative updates. One flat rate, unlimited scope.',
    deliverable: 'Ongoing partner for all web creative — pages, sections, and new builds month over month.',
    details: ['Monthly flat rate', 'Unlimited requests', 'Priority turnaround', 'Dedicated Slack channel'],
  },
]

export default function ZServices() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.z-services-heading', {
        y: 48, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.z-services-heading',
          start: 'top 85%',
        },
      })

      gsap.from('.z-service-card', {
        y: 64, opacity: 0, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.z-service-card',
          start: 'top 85%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        background: '#000',
        padding: '120px 40px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Heading */}
        <div className="z-services-heading" style={{ marginBottom: '80px' }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            fontWeight: '600',
            color: '#0071e3',
            letterSpacing: '0.01em',
            marginBottom: '16px',
          }}>
            What we build
          </p>
          <h2 style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            color: '#fff',
            lineHeight: 1.0,
            margin: 0,
            maxWidth: '600px',
          }}>
            Three ways we
            <br />close your deals.
          </h2>
        </div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px',
          overflow: 'hidden',
        }}>
          {SERVICES.map((svc) => (
            <div
              key={svc.num}
              className="z-service-card"
              style={{
                background: '#000',
                padding: '48px 40px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
              }}
            >
              {/* Tag + Num */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.05em',
                }}>
                  {svc.tag}
                </span>
                <span style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
                  fontSize: '13px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.2)',
                  letterSpacing: '-0.02em',
                }}>
                  {svc.num}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
                fontSize: 'clamp(22px, 2.5vw, 28px)',
                fontWeight: '600',
                letterSpacing: '-0.025em',
                color: '#fff',
                margin: 0,
                lineHeight: 1.2,
              }}>
                {svc.title}
              </h3>

              {/* Desc */}
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '15px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.65,
                letterSpacing: '-0.01em',
                margin: 0,
                flex: 1,
              }}>
                {svc.desc}
              </p>

              {/* Details */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                {svc.details.map(d => (
                  <span
                    key={d}
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                      fontSize: '12px',
                      color: 'rgba(255,255,255,0.4)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '4px 10px',
                      borderRadius: '980px',
                    }}
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pricing callout */}
        <div style={{
          marginTop: '48px',
          padding: '28px 40px',
          background: 'rgba(0,113,227,0.08)',
          border: '1px solid rgba(0,113,227,0.2)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              fontSize: '24px',
              fontWeight: '600',
              letterSpacing: '-0.025em',
              color: '#fff',
              margin: '0 0 4px',
            }}>
              Starting at $1,500.
            </p>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
              letterSpacing: '-0.01em',
            }}>
              Live site delivered within 48 hours of kickoff.
            </p>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              fontSize: '15px',
              fontWeight: '400',
              color: '#fff',
              background: '#0071e3',
              padding: '12px 24px',
              borderRadius: '980px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0077ed' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0071e3' }}
          >
            Get your demo
          </a>
        </div>
      </div>
    </section>
  )
}
