import { useEffect, useRef, useState } from 'react'

const NAV_LINKS = [
  { label: 'WORK',    id: 'work'    },
  { label: 'PROCESS', id: 'process' },
  { label: 'STATS',   id: 'stats'   },
  { label: 'CONTACT', id: 'contact' },
]

export default function Nav() {
  const [scrolled,   setScrolled]   = useState(false)
  const [activeId,   setActiveId]   = useState<string | null>(null)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([])
  const barRef       = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  useEffect(() => {
    const bar       = barRef.current
    const container = containerRef.current
    if (!bar || !container) return
    const targetIdx = hoveredIdx !== null
      ? hoveredIdx
      : NAV_LINKS.findIndex(l => l.id === activeId)
    if (targetIdx < 0) { bar.style.opacity = '0'; return }
    const el = linkRefs.current[targetIdx]
    if (!el) return
    const cRect = container.getBoundingClientRect()
    const lRect = el.getBoundingClientRect()
    bar.style.opacity   = '1'
    bar.style.width     = `${lRect.width}px`
    bar.style.transform = `translateX(${lRect.left - cRect.left}px)`
  }, [hoveredIdx, activeId])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 9990,
        padding: '0 32px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.4s var(--ease), backdrop-filter 0.4s var(--ease), border-color 0.4s var(--ease)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,0,0,0.15)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <span
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '22px',
          color: '#FF0000',
          textShadow: '0 0 20px rgba(255,0,0,0.8), 0 0 40px rgba(255,0,0,0.4)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        CMD.CTRL
      </span>

      {/* Links with sliding bar */}
      <div
        ref={containerRef}
        style={{ display: 'flex', gap: '32px', alignItems: 'center', position: 'relative' }}
        onMouseLeave={() => setHoveredIdx(null)}
      >
        <div
          ref={barRef}
          style={{
            position: 'absolute',
            bottom: '-4px',
            left: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #FF0000, transparent)',
            opacity: 0,
            pointerEvents: 'none',
            transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), width 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease',
          }}
        />
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.id}
            ref={el => { linkRefs.current[i] = el }}
            href={`#${link.id}`}
            onMouseEnter={() => setHoveredIdx(i)}
            style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: '15px',
              letterSpacing: '0.15em',
              color: activeId === link.id ? '#FF0000' : '#FFFFFF',
              transition: 'color 0.25s ease',
              textTransform: 'uppercase',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Right side: available + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '6px', height: '6px', borderRadius: '50%', background: '#FF0000',
            animation: 'pulse 2s ease infinite',
          }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: '#FF0000', letterSpacing: '0.2em' }}>
            AVAILABLE
          </span>
        </div>
        <a
          href="#contact"
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '13px',
            letterSpacing: '0.12em',
            color: '#FF0000',
            border: '1px solid #FF0000',
            padding: '8px 18px',
            textTransform: 'uppercase',
            transition: 'background 0.25s ease, color 0.25s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#FF0000'; (e.currentTarget as HTMLAnchorElement).style.color = '#000000' }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#FF0000' }}
        >
          BOOK A CALL
        </a>
      </div>
    </nav>
  )
}
