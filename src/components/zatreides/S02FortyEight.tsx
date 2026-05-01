import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { WordScrub, BlurReveal } from './ZTextFX'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const TIMELINE_CARDS = [
  { hour: '00', emoji: '🟣', copy: 'You brief us. We listen hard.' },
  { hour: '06', emoji: '🔵', copy: 'Wireframes. The skeleton is alive.' },
  { hour: '16', emoji: '🟠', copy: 'Design. Every pixel intentional.' },
  { hour: '28', emoji: '⚪', copy: 'Build. Code meets craft.' },
  { hour: '48', emoji: '🟢', copy: "You're live. SoCal just got a landmark." },
]

// Mechanical clock digit
function ClockDigit({ value }: { value: string }) {
  return (
    <div style={{
      fontFamily: '"Inter", -apple-system, monospace',
      fontSize: 'clamp(18px, 3vw, 32px)',
      fontWeight: '700',
      color: '#f5f5f5',
      letterSpacing: '-0.02em',
      background: 'rgba(245,245,245,0.05)',
      border: '1px solid rgba(245,245,245,0.08)',
      borderRadius: '6px',
      padding: '4px 10px',
      minWidth: '2.2ch',
      textAlign: 'center',
      fontVariantNumeric: 'tabular-nums',
    }}>{value}</div>
  )
}

function LiveClock() {
  const hRef  = useRef<HTMLSpanElement>(null)
  const mRef  = useRef<HTMLSpanElement>(null)
  const sRef  = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let remaining = 47 * 3600 + 58 * 60 + 32

    const tick = () => {
      if (remaining <= 0) return
      remaining--
      const h = Math.floor(remaining / 3600)
      const m = Math.floor((remaining % 3600) / 60)
      const s = remaining % 60
      if (hRef.current) hRef.current.textContent = String(h).padStart(2, '0')
      if (mRef.current) mRef.current.textContent = String(m).padStart(2, '0')
      if (sRef.current) sRef.current.textContent = String(s).padStart(2, '0')
    }

    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
      <ClockDigit value="47" /><span ref={hRef} style={{ display: 'none' }} />
      <span style={{ color: 'rgba(245,245,245,0.4)', fontSize: '24px', fontWeight: '300' }}>:</span>
      <ClockDigit value="58" /><span ref={mRef} style={{ display: 'none' }} />
      <span style={{ color: 'rgba(245,245,245,0.4)', fontSize: '24px', fontWeight: '300' }}>:</span>
      <ClockDigit value="32" /><span ref={sRef} style={{ display: 'none' }} />
    </div>
  )
}

export default function S02FortyEight() {
  const outerRef    = useRef<HTMLDivElement>(null)
  const slamRef     = useRef<HTMLDivElement>(null)
  const bigNumRef   = useRef<HTMLDivElement>(null)
  const clockRef    = useRef<HTMLDivElement>(null)
  const wordsRef    = useRef<HTMLDivElement>(null)
  const hScrollRef  = useRef<HTMLDivElement>(null)
  const cardsRef    = useRef<HTMLDivElement>(null)
  const closeCopyRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ACT 1: Slam (pinned) ──────────────────────────────────────
      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: slamRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1,
        }
      })

      tl1
        .fromTo(bigNumRef.current,
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 1, ease: 'back.out(1.4)', duration: 0.6 }
        )
        .from(bigNumRef.current, {
          y: '-120vh', scale: 1.6,
          ease: 'power4.in', duration: 0.15,
        })
        .to(bigNumRef.current, {
          scale: 1, y: 0, duration: 0.05, ease: 'power1.out',
        })
        // shockwave
        .fromTo('.fortyeight-ring',
          { scale: 0.8, opacity: 0.8 },
          { scale: 3, opacity: 0, duration: 0.2, ease: 'power2.out' },
          '<0.05'
        )
        .from(clockRef.current, { opacity: 0, y: 24, duration: 0.15, ease: 'power3.out' }, '+=0.1')
        .from('.fortyeight-word', {
          y: '100%', rotationX: -70, stagger: 0.08, duration: 0.12, ease: 'power3.out',
        }, '+=0.05')
        .from('.fortyeight-cta', { opacity: 0, y: 20, duration: 0.1, ease: 'power3.out' }, '+=0.05')
        // Act 2: Blast off
        .to(bigNumRef.current, {
          y: '-150vh', scale: 0.6, opacity: 0,
          ease: 'power4.in', duration: 0.25,
        }, '+=0.3')
        .to(slamRef.current, {
          background: 'linear-gradient(135deg, #111111 0%, #0a0a0a 50%, #000000 100%)',
          duration: 0.15,
        }, '<')

      // ── ACT 3: Horizontal scroll timeline ─────────────────────────
      const cards = gsap.utils.toArray<HTMLElement>('.ftimecard')
      const totalWidth = cards.length * (360 + 24)

      const hScroll = gsap.timeline({
        scrollTrigger: {
          trigger: hScrollRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        }
      })

      hScroll.to(cardsRef.current, {
        x: () => -(totalWidth - window.innerWidth + 80),
        ease: 'none',
      })

      cards.forEach((card) => {
        gsap.from(card, {
          y: 60, opacity: 0, duration: 0.5,
          scrollTrigger: {
            trigger: card,
            containerAnimation: hScroll,
            start: 'left 90%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // ── Close copy word rhythm ─────────────────────────────────────
      gsap.from('.fortyeight-close-word', {
        y: 60, opacity: 0, stagger: 0.18, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: closeCopyRef.current, start: 'top 75%' },
      })

    }, outerRef)

    return () => ctx.revert()
  }, [])

  const closeCopy = [
    'Day one.', 'We talk.', 'Day two.', "You're live.", "That's the deal."
  ]

  return (
    <div ref={outerRef} id="process-48" style={{ background: '#000000' }}>

      {/* ── ACT 1 + 2: The Slam ───────────────────────────────────── */}
      <div
        ref={slamRef}
        style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Shockwave ring */}
        <div className="fortyeight-ring" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px', height: '300px',
          border: '2px solid rgba(0,113,227,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Big "48" */}
        <div ref={bigNumRef} style={{ textAlign: 'center', lineHeight: 0.85, position: 'relative', zIndex: 2 }}>
          <div style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 'clamp(220px, 35vw, 420px)',
            fontWeight: '900',
            letterSpacing: '-0.06em',
            color: '#f5f5f5',
            lineHeight: 0.85,
          }}>48</div>
          <div style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 'clamp(32px, 6vw, 80px)',
            fontWeight: '300',
            letterSpacing: '0.3em',
            color: 'rgba(245,245,245,0.5)',
          }}>HOURS</div>
        </div>

        {/* Live clock */}
        <div ref={clockRef} style={{ marginTop: '48px', position: 'relative', zIndex: 2 }}>
          <LiveClock />
        </div>

        {/* Word by word copy */}
        <div ref={wordsRef} style={{
          marginTop: '56px', display: 'flex', gap: '16px',
          flexWrap: 'wrap', justifyContent: 'center',
          position: 'relative', zIndex: 2,
        }}>
          {(['From brief.', 'To live.', '48 hours.'] as const).map((w, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <div
                className="fortyeight-word"
                style={{ display: 'block', perspective: '400px' }}
              >
                <WordScrub
                  text={w}
                  style={{
                    fontFamily: '"Inter", -apple-system, sans-serif',
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: i === 2 ? '700' : '300',
                    color: i === 2 ? '#0071e3' : 'rgba(245,245,245,0.6)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="fortyeight-cta"
          data-cursor
          style={{
            marginTop: '48px', zIndex: 2, position: 'relative',
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '15px', fontWeight: '500',
            color: '#000000', background: '#0071e3',
            padding: '14px 32px', borderRadius: '980px',
            textDecoration: 'none',
          }}
        >
          START NOW →
        </a>
      </div>

      {/* ── ACT 3: Horizontal scroll timeline ────────────────────── */}
      <div ref={hScrollRef} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
        {/* Progress bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px', background: 'rgba(255,255,255,0.08)', zIndex: 10,
        }}>
          <div ref={progressRef} style={{
            height: '100%', background: '#0071e3',
            width: '0%', transition: 'width 0.05s linear',
          }} />
        </div>

        <div ref={cardsRef} style={{
          display: 'flex', gap: '24px',
          padding: '0 80px',
          alignItems: 'center',
          height: '100%',
          width: 'max-content',
        }}>
          {TIMELINE_CARDS.map((card, i) => (
            <div
              key={card.hour}
              className="ftimecard"
              style={{
                flexShrink: 0,
                width: '360px', height: '420px',
                background: 'rgba(245,245,245,0.03)',
                border: '1px solid rgba(245,245,245,0.08)',
                borderRadius: '20px',
                backdropFilter: 'blur(12px)',
                padding: '48px 40px',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                position: 'relative', overflow: 'hidden',
              }}
            >
              {/* Background hour watermark */}
              <div style={{
                position: 'absolute', bottom: '-20px', right: '-10px',
                fontFamily: '"Inter", sans-serif',
                fontSize: '160px', fontWeight: '900',
                color: 'rgba(245,245,245,0.03)',
                letterSpacing: '-0.05em', lineHeight: 1,
                pointerEvents: 'none', userSelect: 'none',
              }}>{card.hour}</div>

              {/* Emoji + hour */}
              <div>
                <div style={{ fontSize: '32px', marginBottom: '16px' }}>{card.emoji}</div>
                <BlurReveal delay={0.2}>
                  <div style={{
                    fontFamily: '"Inter", -apple-system, sans-serif',
                    fontSize: '13px', fontWeight: '600',
                    color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
                    marginBottom: '20px',
                  }}>Hour {card.hour}</div>
                </BlurReveal>
              </div>

              <div>
                <div style={{
                  fontFamily: '"Inter", -apple-system, sans-serif',
                  fontSize: 'clamp(22px, 2vw, 28px)', fontWeight: '600',
                  color: '#f5f5f5', letterSpacing: '-0.03em', lineHeight: 1.25,
                }}>{card.copy}</div>
              </div>

              {/* Progress bar within card */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0,
                height: '3px',
                width: `${((i + 1) / TIMELINE_CARDS.length) * 100}%`,
                background: `rgba(0,113,227,${0.3 + i * 0.15})`,
                borderRadius: '0 3px 0 20px',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── ACT 5: Close copy rhythm ──────────────────────────────── */}
      <div
        ref={closeCopyRef}
        style={{
          minHeight: '80vh',
          background: '#000000',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '80px 40px', textAlign: 'center',
        }}
      >
        {closeCopy.map((line, i) => (
          <div
            key={i}
            className="fortyeight-close-word"
            style={{
              fontFamily: '"Inter", -apple-system, sans-serif',
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: i % 2 === 0 ? '300' : '700',
              letterSpacing: '-0.04em',
              color: i === closeCopy.length - 1 ? '#0071e3' : `rgba(245,245,245,${1 - i * 0.1})`,
              lineHeight: 1.15,
              marginBottom: i === closeCopy.length - 1 ? 0 : '12px',
            }}
          >{line}</div>
        ))}

        {/* White dot */}
        <div style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#f5f5f5', marginTop: '48px', opacity: 0.4,
        }} />
      </div>
    </div>
  )
}
