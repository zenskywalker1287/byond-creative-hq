import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BalloonCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    const dot  = dotRef.current
    if (!ring || !dot) return

    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let ringX  = mouseX
    let ringY  = mouseY
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Dot follows instantly
      gsap.set(dot, { x: mouseX - 2.5, y: mouseY - 2.5 })
    }

    // Ring lerps behind — physics feel
    const loop = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX - 19, y: ringY - 19 })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // Hover state — snap ring to clickable elements
    const SELECTORS = 'a, button, [role="button"], .bb-service-row, .bb-gallery__item, .bb-faq__item, .bb-testimonial-card'

    const onEnter = () => ring.classList.add('is-hovering')
    const onLeave = () => ring.classList.remove('is-hovering')
    const onDown  = () => ring.classList.add('is-clicking')
    const onUp    = () => ring.classList.remove('is-clicking')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)

    const attachHover = () => {
      document.querySelectorAll(SELECTORS).forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attachHover()

    // Re-attach when DOM changes (React re-renders)
    const observer = new MutationObserver(attachHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="bb-cursor" aria-hidden="true" />
      <div ref={dotRef}  className="bb-cursor-dot" aria-hidden="true" />
    </>
  )
}
