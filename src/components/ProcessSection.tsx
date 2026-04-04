import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlowingEffect } from './ui/GlowingEffect'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    act: '01',
    title: 'STRATEGY',
    description: 'We tear apart your current email infrastructure, flows, and creative. Every metric gets examined. Every weakness gets flagged.',
  },
  {
    act: '02',
    title: 'CREATIVE',
    description: 'Custom retention blueprint built around your brand DNA. Flow architecture, segment strategy, creative direction — all mapped.',
  },
  {
    act: '03',
    title: 'DEPLOY',
    description: 'High-converting flows, campaigns, and creatives go live. Every email is designed to move product and build loyalty.',
  },
  {
    act: '04',
    title: 'OPTIMIZE',
    description: 'Continuous A/B testing, performance analysis, and creative iteration. We don\'t set and forget — we compound results.',
  },
]

export default function ProcessSection() {
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const visibleRef = useRef<boolean[]>(steps.map(() => false))

  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(
        el,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            onEnter: () => {
              visibleRef.current[i] = true
              // dim previous steps
              stepRefs.current.forEach((prev, j) => {
                if (prev && j < i) {
                  gsap.to(prev, { opacity: 0.25, duration: 0.4 })
                }
              })
            },
          },
          delay: i * 0.2,
        }
      )
    })
  }, [])

  return (
    <section id="process" style={{ padding: '100px 32px' }}>
      <div
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '13px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        THE ENGINE
      </div>
      <h2
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(40px, 6vw, 72px)',
          color: '#FFFFFF',
          textAlign: 'center',
          marginBottom: '80px',
        }}
      >
        FOUR ACTS. <span style={{ color: '#FF0000' }}>ONE OUTCOME.</span>
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}
      >
        {steps.map((step, i) => (
          <GlowingEffect key={i} color="rgba(255,0,0,0.5)" spread={100}>
            <div
              ref={el => { stepRefs.current[i] = el }}
              style={{
                padding: '32px 24px',
                borderTop: '2px solid rgba(255,0,0,0.2)',
                transition: 'border-color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF0000')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)')}
            >
              {/* Stroke number */}
              <div
                style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '120px',
                  color: 'transparent',
                  WebkitTextStroke: '2px #FF0000',
                  lineHeight: 1,
                  marginBottom: '16px',
                }}
              >
                {step.act}
              </div>
              <div
                style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '36px',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '0.05em',
                }}
              >
                ACT {step.act} {step.title}
              </div>
              <p
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '15px',
                  color: '#FFFFFF',
                  opacity: 0.6,
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          </GlowingEffect>
        ))}
      </div>
    </section>
  )
}
