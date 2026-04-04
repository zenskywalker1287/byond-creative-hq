import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ZCursor() {
  const dotRef   = useRef<HTMLDivElement>(null)
  const ringRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current!
    const ring = ringRef.current!

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2

    // Instant dot
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.05, ease: 'none' })
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.2, ease: 'power2.out' })
    }

    // Hover state on interactive elements
    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.4, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,  { scale: 0,   duration: 0.2, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1,   duration: 0.4, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    // Click ripple
    const onClick = () => {
      gsap.fromTo(ring,
        { scale: 1 },
        { scale: 2.5, opacity: 0, duration: 0.4, ease: 'power2.out',
          onComplete: () => gsap.set(ring, { scale: 1, opacity: 1 }) }
      )
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)

    const interactables = document.querySelectorAll('a, button, [data-cursor]')
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      {/* Dot — instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '6px', height: '6px',
          background: '#f5f5f5',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring — lagging */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: '32px', height: '32px',
          border: '1px solid rgba(0,113,227, 0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          willChange: 'transform',
        }}
      />
    </>
  )
}
