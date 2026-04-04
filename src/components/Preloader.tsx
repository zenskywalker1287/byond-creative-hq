import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null)
  const needleRef = useRef<SVGLineElement>(null)
  const [count, setCount] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Animate needle
    if (needleRef.current) {
      gsap.fromTo(
        needleRef.current,
        { rotation: -135, transformOrigin: '50% 100%' },
        { rotation: 135, duration: 1.8, ease: 'power4.inOut' }
      )
    }

    // Count up
    const obj = { val: 0 }
    gsap.to(obj, {
      val: 100,
      duration: 1.8,
      ease: 'power4.inOut',
      onUpdate: () => setCount(Math.floor(obj.val)),
      onComplete: () => {
        // Exit preloader
        if (preloaderRef.current) {
          gsap.to(preloaderRef.current, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 0.6,
            ease: 'power3.inOut',
            onComplete: () => setVisible(false),
          })
        }
      },
    })
  }, [])

  if (!visible) return null

  const digits = String(count).padStart(3, '0')

  return (
    <div
      ref={preloaderRef}
      className="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        clipPath: 'inset(0 0 0% 0)',
      }}
    >
      {/* Tachometer gauge */}
      <svg width="120" height="70" viewBox="0 0 120 70" style={{ marginBottom: '24px' }}>
        {/* Arc background */}
        <path
          d="M 10 65 A 50 50 0 0 1 110 65"
          fill="none"
          stroke="#111111"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Arc progress */}
        <path
          d="M 10 65 A 50 50 0 0 1 110 65"
          fill="none"
          stroke="#FF0000"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
        />
        {/* Needle */}
        <line
          ref={needleRef}
          x1="60"
          y1="65"
          x2="60"
          y2="20"
          stroke="#FF0000"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Center dot */}
        <circle cx="60" cy="65" r="4" fill="#FF0000" />
      </svg>

      {/* Text label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '20px',
        }}
      >
        INITIALIZING ENGINE COMMAND
      </div>

      {/* Counter */}
      <div
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '48px',
          color: '#FFFFFF',
          letterSpacing: '0.1em',
          display: 'flex',
          gap: '4px',
        }}
      >
        {digits.split('').map((d, i) => (
          <span key={i} style={{ display: 'inline-block', width: '28px', textAlign: 'center' }}>
            {d}
          </span>
        ))}
      </div>
    </div>
  )
}
