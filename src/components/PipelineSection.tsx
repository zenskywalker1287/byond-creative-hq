import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  { num: '01', label: 'STRATEGY',  desc: 'Deep brand & competitor audit. ICP mapping. Revenue-flow blueprint.' },
  { num: '02', label: 'CREATIVE',  desc: 'Copywriting, design, and campaign architecture built to convert.'      },
  { num: '03', label: 'DEPLOY',    desc: 'Technical setup, flows live, deliverability dialled in.'              },
  { num: '04', label: 'OPTIMIZE',  desc: 'A/B tests, segmentation refinement, and scaling what works.'          },
]

// Node X positions as percentages of the SVG width (viewBox 0-1000)
const NODE_X = [90, 340, 660, 910]
const NODE_Y = 40

export default function PipelineSection() {
  const sectionRef  = useRef<HTMLElement>(null)
  const lineRef     = useRef<SVGLineElement>(null)
  const dotRef      = useRef<SVGCircleElement>(null)
  const numRefs     = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const titleRefs   = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null))
  const [activeStage, setActiveStage] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Set initial state
    numRefs.current.forEach(el => { if (el) { el.style.transform = 'scale(0)'; el.style.opacity = '0' } })
    titleRefs.current.forEach(el => { if (el) { el.style.width = '0%'; el.style.opacity = '0' } })

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          end:   'bottom 40%',
          scrub: 0.8,
          onUpdate: self => {
            const stage = Math.min(3, Math.floor(self.progress * 4 + 0.05))
            setActiveStage(stage)
          },
        },
      })

      // Draw the fuse line
      tl.fromTo(lineRef.current,
        { attr: { x2: NODE_X[0] } },
        { attr: { x2: NODE_X[3] }, duration: 4, ease: 'none' },
        0
      )

      // Move the dot along the line (node span = 820 units in SVG viewBox)
      tl.fromTo(dotRef.current,
        { attr: { cx: NODE_X[0] } },
        { attr: { cx: NODE_X[3] }, duration: 4, ease: 'none' },
        0
      )

      // Each stage fires as dot arrives
      STAGES.forEach((_, i) => {
        const t = i * 1.0  // timeline time for each stage

        // Number explodes in
        tl.fromTo(numRefs.current[i],
          { scale: 0, opacity: 0 },
          { scale: 1.1, opacity: 1, duration: 0.15, ease: 'back.out(3)' },
          t + 0.05
        )
        tl.to(numRefs.current[i], { scale: 1, duration: 0.1, ease: 'power1.out' }, t + 0.2)

        // Title types in (width reveal)
        tl.to(titleRefs.current[i], { width: '100%', opacity: 1, duration: 0.3, ease: 'power2.out' }, t + 0.1)
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{ padding: '100px 32px', borderTop: '1px solid rgba(255,0,0,0.08)', background: '#0A0A0A', overflow: 'hidden' }}
    >
      {/* Label */}
      <div style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: '13px', color: '#FF0000', letterSpacing: '0.3em', marginBottom: '80px', textAlign: 'center' }}>
        THE PIPELINE
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Stage labels + numbers row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {STAGES.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              {/* Exploding number */}
              <div
                ref={el => { numRefs.current[i] = el }}
                style={{
                  fontFamily: "'Black Han Sans',sans-serif",
                  fontSize: 'clamp(56px,6vw,80px)',
                  color: activeStage >= i ? '#FF0000' : 'rgba(255,0,0,0.2)',
                  lineHeight: 1,
                  marginBottom: '8px',
                  transition: 'color 0.4s ease',
                  display: 'inline-block',
                }}
              >
                {s.num}
              </div>

              {/* Stage label — typing width reveal */}
              <div style={{ overflow: 'hidden', margin: '0 auto' }}>
                <div
                  ref={el => { titleRefs.current[i] = el }}
                  style={{
                    fontFamily: "'Black Han Sans',sans-serif",
                    fontSize: 'clamp(18px,2.2vw,26px)',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '0%',
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SVG fuse path */}
        <div style={{ position: 'relative', height: '80px' }}>
          <svg
            viewBox="0 0 1000 80"
            preserveAspectRatio="none"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}
          >
            {/* Static dim track */}
            <line x1={NODE_X[0]} y1={NODE_Y} x2={NODE_X[3]} y2={NODE_Y}
              stroke="rgba(255,0,0,0.1)" strokeWidth="1.5"
            />

            {/* Animated fuse line */}
            <line
              ref={lineRef}
              x1={NODE_X[0]} y1={NODE_Y} x2={NODE_X[0]} y2={NODE_Y}
              stroke="#FF0000" strokeWidth="1.5"
            />

            {/* Node circles */}
            {NODE_X.map((cx, i) => (
              <g key={i}>
                <circle cx={cx} cy={NODE_Y} r="8"
                  fill={activeStage >= i ? '#FF0000' : '#0A0A0A'}
                  stroke={activeStage >= i ? '#FF0000' : 'rgba(255,0,0,0.3)'}
                  strokeWidth="1.5"
                  style={{ transition: 'fill 0.3s ease, stroke 0.3s ease' }}
                />
                {activeStage >= i && (
                  <circle cx={cx} cy={NODE_Y} r="16" fill="none" stroke="rgba(255,0,0,0.25)" strokeWidth="1" />
                )}
              </g>
            ))}

            {/* Travelling spark dot */}
            <circle
              ref={dotRef}
              cx={NODE_X[0]} cy={NODE_Y} r="5"
              fill="#FF0000"
              filter="url(#spark-glow)"
            />

            {/* Glow filter */}
            <defs>
              <filter id="spark-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
          </svg>
        </div>

        {/* Stage descriptions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '32px' }}>
          {STAGES.map((s, i) => (
            <p key={i} style={{
              fontFamily: "'Poppins',sans-serif",
              fontSize: '13px',
              color: '#FFFFFF',
              opacity: activeStage >= i ? 0.55 : 0.1,
              lineHeight: 1.6,
              textAlign: 'center',
              transition: 'opacity 0.5s ease',
              margin: 0,
            }}>
              {s.desc}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
