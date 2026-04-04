/**
 * ZTextFX — Apple-style rhythmic text effects
 *
 * WordScrub    — scroll-driven word-by-word opacity highlight (apple.com signature)
 * ClipReveal   — heading words clip-reveal upward with stagger
 * BlurReveal   — text fades in while de-blurring (apple feature callouts)
 */
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── WordScrub ─────────────────────────────────────────────────────────────────
// Each word goes from dim (0.12) to full (1.0) as you scroll through it.
// Pass the full sentence as `text`. Inline with surrounding copy.
interface WordScrubProps {
  text: string
  style?: React.CSSProperties
  startOpacity?: number
  scrubStart?: string
  scrubEnd?: string
}

export function WordScrub({
  text,
  style,
  startOpacity = 0.12,
  scrubStart = 'top 88%',
  scrubEnd = 'top 42%',
}: WordScrubProps) {
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const spans = container.querySelectorAll<HTMLSpanElement>('.wsw')

    spans.forEach((span) => {
      gsap.fromTo(
        span,
        { opacity: startOpacity },
        {
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: span,
            start: scrubStart,
            end: scrubEnd,
            scrub: 0.6,
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => {
      // only kill the triggers created here
      if (spans.length && t.vars.trigger && [...spans].includes(t.vars.trigger as HTMLSpanElement)) {
        t.kill()
      }
    })
  }, [startOpacity, scrubStart, scrubEnd])

  const words = text.split(' ')

  return (
    <span ref={containerRef} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="wsw"
          style={{
            display: 'inline-block',
            opacity: startOpacity,
            marginRight: i < words.length - 1 ? '0.28em' : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  )
}

// ── ClipReveal ────────────────────────────────────────────────────────────────
// Words slide up from clip. Each word is wrapped in overflow:hidden.
// Feels like a press release headline unfurling word by word.
interface ClipRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
  style?: React.CSSProperties
  stagger?: number
  delay?: number
  start?: string
}

export function ClipReveal({
  text,
  as: Tag = 'div',
  style,
  stagger = 0.065,
  delay = 0,
  start = 'top 80%',
}: ClipRevealProps) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const inner = containerRef.current?.querySelectorAll<HTMLSpanElement>('.crw')
    if (!inner) return

    gsap.fromTo(
      inner,
      { y: '105%' },
      {
        y: '0%',
        stagger,
        duration: 0.72,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
      }
    )
  }, [stagger, delay, start])

  const words = text.split(' ')

  return (
    // @ts-expect-error polymorphic ref
    <Tag ref={containerRef} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'bottom',
            paddingBottom: '0.06em',
            marginRight: i < words.length - 1 ? '0.28em' : 0,
          }}
        >
          <span className="crw" style={{ display: 'inline-block', transform: 'translateY(105%)' }}>
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

// ── BlurReveal ────────────────────────────────────────────────────────────────
// Children fade in while sharpening from blur. Apple feature callout style.
interface BlurRevealProps {
  children: React.ReactNode
  style?: React.CSSProperties
  delay?: number
  start?: string
  blurAmount?: string
}

export function BlurReveal({
  children,
  style,
  delay = 0,
  start = 'top 78%',
  blurAmount = '8px',
}: BlurRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { opacity: 0, filter: `blur(${blurAmount})`, y: 12 },
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          once: true,
        },
      }
    )
  }, [delay, start, blurAmount])

  return (
    <div ref={ref} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

// ── LetterStagger ─────────────────────────────────────────────────────────────
// Each character drops in individually. Good for logos / short words.
interface LetterStaggerProps {
  text: string
  style?: React.CSSProperties
  charStyle?: React.CSSProperties
  delay?: number
  stagger?: number
  onScroll?: boolean
}

export function LetterStagger({
  text,
  style,
  charStyle,
  delay = 0,
  stagger = 0.04,
  onScroll = false,
}: LetterStaggerProps) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const chars = ref.current?.querySelectorAll<HTMLSpanElement>('.ls-char')
    if (!chars) return

    const animProps = {
      y: 0,
      opacity: 1,
      stagger,
      duration: 0.5,
      ease: 'power3.out',
      delay,
      ...(onScroll
        ? {
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              once: true,
            },
          }
        : {}),
    }

    gsap.fromTo(chars, { y: 20, opacity: 0 }, animProps)
  }, [delay, stagger, onScroll])

  return (
    <span ref={ref} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="ls-char"
          style={{
            display: 'inline-block',
            opacity: 0,
            ...charStyle,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}
