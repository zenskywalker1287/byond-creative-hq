import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$✦★'

type Mode = 'stagger' | 'scramble' | 'clipwipe'

interface Props {
  text: string
  style?: React.CSSProperties
  charStyle?: React.CSSProperties
  mode?: Mode
  delay?: number
  duration?: number
  stagger?: number
  trigger?: string        // CSS selector — defaults to the element itself
  start?: string
  as?: keyof React.JSX.IntrinsicElements
}

export default function KineticText({
  text,
  style,
  charStyle,
  mode = 'stagger',
  delay = 0,
  duration = 0.5,
  stagger = 0.04,
  trigger,
  start = 'top 85%',
  as: Tag = 'span',
}: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const chars = el.querySelectorAll<HTMLElement>('.kc')
    const triggerEl = trigger ? document.querySelector(trigger) ?? el : el
    const scrollOpts = { trigger: triggerEl, start }

    if (mode === 'stagger') {
      gsap.from(chars, {
        y: '110%',
        opacity: 0,
        duration,
        stagger,
        ease: 'power3.out',
        delay,
        scrollTrigger: scrollOpts,
      })
    }

    if (mode === 'clipwipe') {
      gsap.set(chars, { clipPath: 'inset(0 110% 0 0)' })
      gsap.to(chars, {
        clipPath: 'inset(0 0% 0 0)',
        duration,
        stagger,
        ease: 'power4.out',
        delay,
        scrollTrigger: scrollOpts,
      })
    }

    if (mode === 'scramble') {
      let triggered = false
      ScrollTrigger.create({
        trigger: triggerEl,
        start,
        onEnter: () => {
          if (triggered) return
          triggered = true
          chars.forEach((char, i) => {
            const original = char.dataset.char || ''
            if (original === ' ') return
            let frame = 0
            const startFrame = Math.floor(i * 1.5)
            const totalFrames = 18
            let raf: number

            const tick = () => {
              if (frame < startFrame) {
                frame++
                raf = requestAnimationFrame(tick)
                return
              }
              const progress = (frame - startFrame) / totalFrames
              if (progress < 1) {
                char.textContent = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
                frame++
                raf = requestAnimationFrame(tick)
              } else {
                char.textContent = original
                cancelAnimationFrame(raf)
              }
            }
            setTimeout(() => requestAnimationFrame(tick), delay * 1000)
          })
        },
      })
    }

    return () => {}
  }, [mode, delay, duration, stagger, trigger, start])

  return (
    // @ts-ignore
    <Tag ref={ref} style={{ display: 'inline', ...style }}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="kc"
          data-char={char}
          style={{
            display: 'inline-block',
            overflow: mode === 'stagger' ? 'hidden' : undefined,
            whiteSpace: char === ' ' ? 'pre' : undefined,
            ...charStyle,
          }}
        >
          <span style={{ display: 'inline-block' }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </Tag>
  )
}
