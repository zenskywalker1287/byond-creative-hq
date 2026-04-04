/**
 * ZKinetic — Apple-signature word-by-word scroll-driven text reveal.
 * As you scroll, each word fades from dim/blurred → vivid/sharp.
 * Exact technique used on apple.com Vision Pro and iPhone pages.
 */
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HEADLINE =
  'Your website is your best salesperson. Most of them are terrible. Ours aren\'t.'

function WordReveal({ text }: { text: string }) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <span
          key={i}
          className="z-kinetic-word"
          data-index={i}
          style={{
            display: 'inline-block',
            marginRight: '0.28em',
            willChange: 'opacity, filter',
            opacity: 0.12,
            filter: 'blur(6px)',
          }}
        >
          {word}
        </span>
      ))}
    </>
  )
}

export default function ZKinetic() {
  const sectionRef   = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const words = containerRef.current?.querySelectorAll('.z-kinetic-word')
    if (!words) return

    const ctx = gsap.context(() => {
      // Each word reveals sequentially as you scroll through the section
      words.forEach((word, i) => {
        const progress = i / (words.length - 1)

        gsap.to(word, {
          opacity: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `top+=${progress * 60}% center`,
            end: `top+=${progress * 60 + 15}% center`,
            scrub: 0.6,
          },
        })
      })

      // Sub line reveal
      gsap.from('.z-kinetic-sub', {
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.z-kinetic-sub', start: 'top 85%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        background: '#000',
        // Tall section so there's scroll room to animate
        minHeight: '200vh',
        position: 'relative',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {/* Sticky container */}
      <div style={{
        position: 'sticky',
        top: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        overflow: 'hidden',
      }}>

        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px', height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0,113,227,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <p style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '12px', fontWeight: '600', color: '#0071e3',
          letterSpacing: '0.01em', marginBottom: '48px', textAlign: 'center',
          position: 'relative', zIndex: 1,
        }}>
          The truth about web design
        </p>

        {/* Kinetic headline */}
        <div
          ref={containerRef}
          style={{
            maxWidth: '900px',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(32px, 5.5vw, 72px)',
            fontWeight: '700',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: '#ffffff',
            margin: 0,
          }}>
            <WordReveal text={HEADLINE} />
          </p>
        </div>

        {/* Sub line */}
        <p
          className="z-kinetic-sub"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            fontWeight: '400',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '480px',
            margin: '40px auto 0',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          We build sites that work like a closer, not a brochure.
          Apple-level design. 48-hour delivery. $1,500.
        </p>
      </div>
    </section>
  )
}
