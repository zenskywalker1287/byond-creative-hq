import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BlurReveal, ClipReveal } from './ZTextFX'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Research',
    copy: 'Before I touch a pixel I go deep. Your competitors. Your market. Your customer\'s psychology. What\'s working in your space and what\'s been done to death.',
    icon: '🔍',
  },
  {
    num: '02',
    title: 'The Brief',
    copy: "I don't hand you a form. I ask the right questions and extract the vision even when you can't articulate it yet. By the end of our conversation I know your brand.",
    icon: '💬',
  },
  {
    num: '03',
    title: 'Strategy & Direction',
    copy: 'Now I know where you are, where you need to go, and exactly how your website gets you there. No guessing. No generic templates. A custom game plan.',
    icon: '🗺️',
  },
  {
    num: '04',
    title: 'Design',
    copy: 'Every layout decision is intentional. Every font choice has a reason. Every color is speaking to your customer before they read a word.',
    icon: '🎨',
  },
  {
    num: '05',
    title: 'Development',
    copy: "I build it. Clean code. Fast load. Mobile perfect. No developers to brief. No back and forth. It just gets built.",
    icon: '⚡',
  },
  {
    num: '06',
    title: 'Launch',
    copy: '48 hours after we start — you\'re live. Indexed. Fast. Ready to convert.',
    icon: '🚀',
  },
]

const CIRCUIT_NODES = ['Strategy', 'Research', 'Design', 'Development', 'Launch & SEO']

export default function S06Process() {
  const sectionRef  = useRef<HTMLElement>(null)
  const nodeRef     = useRef<HTMLDivElement>(null)
  const hScrollRef  = useRef<HTMLDivElement>(null)
  const trackRef    = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Circuit lines draw in
      gsap.from('.circuit-line', {
        scaleX: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        transformOrigin: 'left center',
        scrollTrigger: { trigger: nodeRef.current, start: 'top 70%' },
      })
      gsap.from('.circuit-node-label', {
        opacity: 0, y: 12, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.4,
        scrollTrigger: { trigger: nodeRef.current, start: 'top 70%' },
      })
      gsap.from('.circuit-center-pulse', {
        scale: 0, duration: 0.6, ease: 'back.out(2)',
        scrollTrigger: { trigger: nodeRef.current, start: 'top 70%' },
      })
      gsap.from('.process-contrast', {
        opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', delay: 0.6,
        scrollTrigger: { trigger: '.process-contrast', start: 'top 80%' },
      })

      // Horizontal step scroll
      const stepW = 480
      const total = STEPS.length * (stepW + 32)

      const hTween = gsap.to(trackRef.current, {
        x: () => -(total - window.innerWidth + 80),
        ease: 'none',
        scrollTrigger: {
          trigger: hScrollRef.current,
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

      gsap.utils.toArray<HTMLElement>('.process-step').forEach((step) => {
        gsap.from(step, {
          y: 40, opacity: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            containerAnimation: hTween,
            start: 'left 90%',
          },
        })
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" style={{ background: '#000000' }}>

      {/* Section heading */}
      <div style={{ padding: '120px 40px 0', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <ClipReveal
          text="The Process."
          as="h2"
          style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 'clamp(40px, 6vw, 80px)',
            fontWeight: '700',
            letterSpacing: '-0.04em',
            color: '#f5f5f5',
            lineHeight: 1.05,
            margin: '0 0 0 0',
          }}
        />
      </div>

      {/* Intro quote */}
      <div style={{
        padding: '48px 40px 80px',
        maxWidth: '900px', margin: '0 auto', textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(24px, 3.5vw, 44px)',
          fontWeight: '300', letterSpacing: '-0.03em',
          color: 'rgba(245,245,245,0.7)', lineHeight: 1.4, fontStyle: 'italic',
        }}>
          "You don't need to have it figured out.
          <br />
          <span style={{ color: '#f5f5f5', fontWeight: '600', fontStyle: 'normal' }}>
            That's my job.
          </span>"
        </p>
      </div>

      {/* Circuit diagram */}
      <div
        ref={nodeRef}
        style={{ padding: '40px 40px 80px', maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Center pulse */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '60px', position: 'relative' }}>
          <div className="circuit-center-pulse" style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(0,113,227,0.1)',
            border: '2px solid rgba(0,113,227,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 40px rgba(0,113,227,0.2)',
            position: 'relative', zIndex: 2,
          }}>
            <span style={{
              fontFamily: '"Inter", sans-serif', fontSize: '20px', fontWeight: '800',
              color: '#0071e3', letterSpacing: '-0.04em',
            }}>Z</span>
          </div>
        </div>

        {/* Circuit nodes in a row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexWrap: 'wrap', gap: '0',
        }}>
          {CIRCUIT_NODES.map((node, i) => (
            <div key={node} style={{ display: 'flex', alignItems: 'center' }}>
              {i > 0 && (
                <div className="circuit-line" style={{
                  width: '48px', height: '1px',
                  background: 'rgba(0,113,227,0.4)',
                }} />
              )}
              <div className="circuit-node-label" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '0 8px',
              }}>
                <div style={{
                  width: '10px', height: '10px', borderRadius: '50%',
                  background: '#0071e3', opacity: 0.7,
                  boxShadow: '0 0 12px rgba(0,113,227,0.4)',
                }} />
                <span style={{
                  fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: '500',
                  color: 'rgba(245,245,245,0.5)', letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                }}>{node}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contrast copy */}
        <div className="process-contrast" style={{
          marginTop: '72px',
          background: 'rgba(245,245,245,0.02)',
          border: '1px solid rgba(245,245,245,0.06)',
          borderRadius: '16px',
          padding: '40px 40px',
        }}>
          <p style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '15px', fontWeight: '400',
            color: 'rgba(245,245,245,0.5)', lineHeight: 1.7, letterSpacing: '-0.01em',
          }}>
            <span style={{ color: 'rgba(245,245,245,0.25)' }}>Every other agency has a chain. </span>
            <span style={{ color: 'rgba(245,245,245,0.4)' }}>Brief → Account manager → Designer → Developer → Back to you. </span>
            <span style={{ color: 'rgba(245,245,245,0.25)' }}>Broken telephone. Missed deadlines. Watered down vision. </span>
            <span style={{ color: '#f5f5f5', fontWeight: '600' }}>Here there's no chain. Just results.</span>
          </p>
        </div>
      </div>

      {/* 6-step horizontal scroll */}
      <div ref={hScrollRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        {/* Progress */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: 'rgba(245,245,245,0.06)', zIndex: 10,
        }}>
          <div ref={progressRef} style={{
            height: '100%', background: '#0071e3', width: '0%',
            transition: 'width 0.05s linear',
          }} />
        </div>

        <div ref={trackRef} style={{
          display: 'flex', gap: '32px', padding: '0 80px',
          height: '100%', alignItems: 'center', width: 'max-content',
        }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="process-step"
              style={{
                flexShrink: 0, width: '480px',
                background: 'rgba(245,245,245,0.02)',
                border: '1px solid rgba(245,245,245,0.07)',
                borderRadius: '24px', padding: '56px 48px',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Step number watermark */}
              <div style={{
                position: 'absolute', bottom: '-20px', right: '20px',
                fontFamily: '"Inter", sans-serif', fontSize: '160px', fontWeight: '900',
                color: 'rgba(245,245,245,0.025)', lineHeight: 1,
                letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none',
              }}>{step.num}</div>

              <div style={{ fontSize: '36px', marginBottom: '24px' }}>{step.icon}</div>

              <div style={{
                fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
                color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
                marginBottom: '16px',
              }}>Step {step.num}</div>

              <h3 style={{
                fontFamily: '"Inter", -apple-system, sans-serif',
                fontSize: 'clamp(24px, 2.5vw, 32px)',
                fontWeight: '700', letterSpacing: '-0.04em',
                color: '#f5f5f5', lineHeight: 1.15, marginBottom: '24px',
              }}>{step.title}</h3>

              <BlurReveal delay={i * 0.05}>
                <p style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: '16px', fontWeight: '400',
                  color: 'rgba(245,245,245,0.55)', lineHeight: 1.7, letterSpacing: '-0.01em',
                }}>{step.copy}</p>
              </BlurReveal>

              {/* Horizontal line below */}
              <div style={{
                position: 'absolute', bottom: 0, left: '48px',
                width: `${((i + 1) / STEPS.length) * 60}%`,
                height: '2px', background: 'rgba(0,113,227,0.3)',
                borderRadius: '2px 0 0 0',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Closing line */}
      <div style={{
        padding: '80px 40px', textAlign: 'center',
        maxWidth: '900px', margin: '0 auto',
        borderTop: '1px solid rgba(245,245,245,0.06)',
      }}>
        <p style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: 'clamp(20px, 2.5vw, 28px)',
          fontWeight: '400', letterSpacing: '-0.03em',
          color: 'rgba(245,245,245,0.6)', lineHeight: 1.5, fontStyle: 'italic',
        }}>
          "Six steps. Zero handoffs.{' '}
          <span style={{ color: '#f5f5f5', fontStyle: 'normal', fontWeight: '600' }}>
            One person who gives a damn about your brand as much as you do.
          </span>"
        </p>
      </div>
    </section>
  )
}
