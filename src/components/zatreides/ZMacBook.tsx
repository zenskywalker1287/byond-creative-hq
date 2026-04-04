import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

// ── MacBook screen: shows Rich Hair City live site ─────────────────────────
function PortalScreen() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000', overflow: 'hidden', position: 'relative' }}>
      {/* Browser chrome */}
      <div style={{
        height: '32px',
        background: '#1c1c1e',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '6px',
        flexShrink: 0,
      }}>
        <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: '#28C840' }} />
        <div style={{
          flex: 1,
          margin: '0 12px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '4px',
          height: '18px',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '8px',
        }}>
          <span style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            fontSize: '9px',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0',
          }}>
            richhaircity.com
          </span>
        </div>
      </div>
      {/* Live site iframe */}
      <iframe
        src="http://localhost:5173"
        style={{
          width: '200%',
          height: '200%',
          border: 'none',
          transformOrigin: '0 0',
          transform: 'scale(0.5)',
          pointerEvents: 'none',
        }}
        title="Rich Hair City"
      />
    </div>
  )
}

// ── Main MacBook component ──────────────────────────────────────────────────
export default function ZMacBook() {
  const containerRef  = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center'],
  })

  // Lid opens: rotateX from -70deg (closed) → 0deg (flat open)
  const lidRotateX   = useTransform(scrollYProgress, [0, 0.85], [-70, 0])
  // Whole scene tilts toward you as lid opens
  const sceneRotateX = useTransform(scrollYProgress, [0, 0.85], [12, 0])
  // Subtle Y rotation for depth
  const sceneRotateY = useTransform(scrollYProgress, [0, 0.85], [-8, -4])
  // Shadow spreads as MacBook opens
  const shadowBlur   = useTransform(scrollYProgress, [0, 0.85], [20, 80])
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.85], [0.2, 0.6])
  // Screen brightness reveals as lid opens
  const screenOpacity = useTransform(scrollYProgress, [0.3, 0.85], [0, 1])

  // Title text reveal
  const titleProgress = useTransform(scrollYProgress, [0, 0.4], [0, 1])
  const titleY        = useTransform(titleProgress, [0, 1], [40, 0])
  const titleOpacity  = useTransform(titleProgress, [0, 1], [0, 1])

  const W = 680  // MacBook width (px)
  const LID_H = 420  // Lid height (px) – approx 16:10 screen

  return (
    <section
      id="macbook"
      style={{
        background: 'linear-gradient(to bottom, #000 0%, #080808 50%, #000 100%)',
        padding: '80px 24px 120px',
        overflow: 'hidden',
      }}
    >
      {/* Section headline */}
      <motion.div
        style={{ opacity: titleOpacity, y: titleY, textAlign: 'center', marginBottom: '80px' }}
      >
        <p style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '12px',
          fontWeight: '600',
          color: '#0071e3',
          letterSpacing: '0.01em',
          marginBottom: '16px',
        }}>
          Built this week.
        </p>
        <h2 style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
          fontSize: 'clamp(40px, 6vw, 80px)',
          lineHeight: 1.0,
          letterSpacing: '-0.03em',
          fontWeight: '700',
          color: '#fff',
          margin: '0 auto',
          maxWidth: '700px',
        }}>
          See what we deliver
          <br />in 48 hours.
        </h2>
        <p style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
          fontSize: '17px',
          fontWeight: '400',
          color: 'rgba(255,255,255,0.5)',
          marginTop: '20px',
          maxWidth: '440px',
          margin: '20px auto 0',
          lineHeight: 1.6,
          letterSpacing: '-0.01em',
        }}>
          Rich Hair City — custom Vite site, delivered in 2 days, built to convert.
        </p>
      </motion.div>

      {/* MacBook scene container */}
      <div
        ref={containerRef}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          perspective: '2400px',
          perspectiveOrigin: '50% 40%',
          minHeight: '560px',
        }}
      >
        {/* Shadow beneath MacBook */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '0px',
            left: '50%',
            translateX: '-50%',
            width: `${W * 0.75}px`,
            height: '20px',
            borderRadius: '50%',
            background: 'rgba(0,113,227,0.25)',
            filter: useTransform(shadowBlur, v => `blur(${v}px)`),
            opacity: shadowOpacity,
            zIndex: 0,
          }}
        />

        {/* MacBook wrapper — 3D scene */}
        <motion.div
          style={{
            width: `${W}px`,
            transformStyle: 'preserve-3d',
            rotateX: sceneRotateX,
            rotateY: sceneRotateY,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* ── LID (screen) ────────────────────────────────────────────────── */}
          <motion.div
            style={{
              width: `${W}px`,
              height: `${LID_H}px`,
              transformOrigin: '50% 100%',
              transformStyle: 'preserve-3d',
              rotateX: lidRotateX,
              position: 'relative',
            }}
          >
            {/* Lid exterior (back of screen — visible when closed) */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(145deg, #2c2c2e 0%, #1c1c1e 60%, #141414 100%)',
              borderRadius: '14px 14px 0 0',
              backfaceVisibility: 'hidden',
            }}>
              {/* Apple-style logo on back */}
              <div style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '50px', height: '50px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '18px',
                  color: 'rgba(255,255,255,0.12)',
                  letterSpacing: '0',
                }}>Z</span>
              </div>
            </div>

            {/* Lid interior (screen face) */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: '#0a0a0a',
                borderRadius: '14px 14px 0 0',
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                padding: '8px',
              }}
            >
              {/* Notch */}
              <div style={{
                position: 'absolute',
                top: 0, left: '50%',
                transform: 'translateX(-50%)',
                width: '120px', height: '18px',
                background: '#000',
                borderRadius: '0 0 12px 12px',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a1a1a' }} />
              </div>
              {/* Screen bezel */}
              <div style={{
                flex: 1,
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <motion.div style={{ width: '100%', height: '100%', opacity: screenOpacity }}>
                  <PortalScreen />
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* ── BASE (keyboard deck) ────────────────────────────────────────── */}
          <div style={{
            width: `${W}px`,
            height: '28px',
            background: 'linear-gradient(to bottom, #2a2a2c, #1c1c1e)',
            borderRadius: '0 0 12px 12px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Keyboard area */}
            <div style={{
              position: 'absolute',
              top: '4px',
              left: '10%',
              width: '80%',
              height: '14px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '4px',
              overflow: 'hidden',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1px',
              padding: '2px',
            }}>
              {Array.from({ length: 68 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === 40 ? '22px' : '5px',
                    height: '3px',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '1px',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>

            {/* Trackpad hint */}
            <div style={{
              position: 'absolute',
              bottom: '4px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100px',
              height: '6px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: '4px',
            }} />

            {/* Bottom edge with feet */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0, right: 0,
              height: '4px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
              borderRadius: '0 0 12px 12px',
            }} />
          </div>
        </motion.div>
      </div>

      {/* Feature bullets below */}
      <motion.div
        style={{ opacity: screenOpacity, textAlign: 'center', marginTop: '60px' }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          flexWrap: 'wrap',
        }}>
          {[
            { label: 'Custom Design', sub: 'No templates. Built from scratch.' },
            { label: '48-Hour Delivery', sub: 'Live URL in two days.' },
            { label: 'Closes Clients', sub: 'Designed to build trust fast.' },
          ].map(feat => (
            <div key={feat.label} style={{ maxWidth: '180px' }}>
              <div style={{
                width: '28px',
                height: '1px',
                background: 'rgba(255,255,255,0.25)',
                marginBottom: '16px',
              }} />
              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '14px',
                fontWeight: '600',
                color: '#fff',
                marginBottom: '6px',
                letterSpacing: '-0.01em',
              }}>
                {feat.label}
              </div>
              <div style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.4)',
                lineHeight: 1.5,
              }}>
                {feat.sub}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
