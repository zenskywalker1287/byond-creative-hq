import { useEffect, useRef, useState } from 'react'

const CLIENTS = [
  'GYMSHARK', 'LUMI', 'REFRESH GUM', 'INNERDOSE',
  'HEALTHMATE SAUNA', 'HERO LOUPES', 'MADCOW COLLARS',
  'FLATPACK', 'XYKO', 'ADSUMO',
]

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!%&'

function scramble(len: number) {
  return Array.from({ length: len }, () => CHARS[Math.floor(Math.random() * CHARS.length)]).join('')
}

export default function ClientsSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const [displays, setDisplays] = useState<string[]>(CLIENTS.map(c => scramble(c.length)))
  const [resolved, setResolved] = useState<Set<number>>(new Set())
  const [hovered,  setHovered]  = useState<number | null>(null)
  const [started,  setStarted]  = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return
      setStarted(true)

      CLIENTS.forEach((name, idx) => {
        const startDelay = idx * 600

        setTimeout(() => {
          // Scramble for 600ms, progressively resolving left-to-right
          const startTime = Date.now()
          const duration  = 600

          const interval = setInterval(() => {
            const progress = Math.min((Date.now() - startTime) / duration, 1)

            const text = name.split('').map((char, ci) => {
              if (char === ' ') return ' '
              if (progress > ci / name.length * 0.8 + 0.1) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            }).join('')

            setDisplays(prev => { const n = [...prev]; n[idx] = text; return n })

            if (progress >= 1) {
              clearInterval(interval)
              setDisplays(prev => { const n = [...prev]; n[idx] = name; return n })
              setResolved(prev => new Set([...prev, idx]))
            }
          }, 40)
        }, startDelay)
      })
    }, { threshold: 0.2 })

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [started])

  return (
    <section
      ref={sectionRef}
      style={{ padding: '100px 32px', borderTop: '1px solid rgba(255,0,0,0.08)', background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* Label */}
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: '11px', color: '#FF0000', letterSpacing: '0.3em', marginBottom: '56px', textAlign: 'center' }}>
        BRANDS WE&apos;VE HIT
      </div>

      {/* Client names */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {CLIENTS.map((name, i) => {
          const isDone    = resolved.has(i)
          const isHovered = hovered === i
          const isDimmed  = hovered !== null && !isHovered && isDone

          return (
            <div
              key={i}
              style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid rgba(255,0,0,0.06)' }}
              onMouseEnter={() => isDone && setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div style={{
                fontFamily: "'Black Han Sans',sans-serif",
                fontSize: 'clamp(40px,6vw,80px)',
                color: isHovered ? '#FF0000' : '#FFFFFF',
                opacity: !isDone ? 0.15 : isDimmed ? 0.25 : 1,
                transform: isHovered ? 'scale(1.025) translateX(8px)' : 'scale(1)',
                transformOrigin: 'left center',
                transition: 'color 0.25s ease, opacity 0.25s ease, transform 0.25s ease',
                cursor: isDone ? 'default' : 'default',
                padding: '12px 0',
                lineHeight: 1,
                userSelect: 'none',
                letterSpacing: '-0.01em',
              }}>
                {isDone ? name : displays[i]}
              </div>

              {/* Red underline shoot on hover */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                height: '1px',
                background: '#FF0000',
                width: isHovered ? '100%' : '0%',
                transition: isHovered ? 'width 0.2s ease' : 'width 0s',
              }} />
            </div>
          )
        })}
      </div>
    </section>
  )
}
