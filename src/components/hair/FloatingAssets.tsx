import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FloatItem {
  src: string
  alt: string
  style: React.CSSProperties
  animClass: string
}

interface Props {
  items: FloatItem[]
  triggerEl?: string
}

export default function FloatingAssets({ items, triggerEl }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const floaters = ref.current.querySelectorAll<HTMLElement>('.floater')

    floaters.forEach((el) => {
      const speed = parseFloat(el.dataset.speed || '0.15')
      gsap.to(el, {
        yPercent: -30 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerEl ?? ref.current!,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Fade in on load
      gsap.from(el, {
        opacity: 0,
        scale: 0.88,
        duration: 1.2,
        ease: 'power3.out',
        delay: parseFloat(el.dataset.delay || '0'),
        scrollTrigger: {
          trigger: triggerEl ?? ref.current!,
          start: 'top 90%',
        },
      })
    })
  }, [triggerEl])

  return (
    <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 2 }}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`floater ${item.animClass}`}
          data-speed={(0.1 + i * 0.07).toFixed(2)}
          data-delay={(i * 0.15).toFixed(2)}
          style={{
            position: 'absolute',
            overflow: 'hidden',
            willChange: 'transform',
            ...item.style,
          }}
        >
          <img
            src={item.src}
            alt={item.alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>
      ))}
    </div>
  )
}
