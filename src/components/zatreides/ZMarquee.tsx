// ZMarquee — Trust signal + tech stack ticker
// Runs two rows: one forward, one reverse, with edge fade mask
export default function ZMarquee() {
  const ROW1 = [
    'React + Vite', 'TypeScript', 'GSAP Animations', 'Mobile-First', 'Custom Components',
    'Framer Motion', 'SEO Optimized', 'Fast Load', 'React + Vite', 'TypeScript', 'GSAP Animations', 'Mobile-First',
  ]
  const ROW2 = [
    '48-Hour Delivery', '$1,500 Starting Price', 'No Templates', '7-Day Revisions',
    'Full Code Ownership', 'Live URL Included', '48-Hour Delivery', '$1,500 Starting Price', 'No Templates', '7-Day Revisions',
  ]

  return (
    <div
      style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        background: '#000',
        padding: '28px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Edge fade */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, #000 0%, transparent 10%, transparent 90%, #000 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Row 1 — scrolls right */}
      <div style={{ overflow: 'hidden', marginBottom: '12px' }}>
        <div style={{
          display: 'flex',
          gap: '0',
          animation: 'marquee-right 24s linear infinite',
          width: 'max-content',
        }}>
          {[...ROW1, ...ROW1].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '12px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.35)',
                letterSpacing: '0.01em',
                padding: '0 24px',
                whiteSpace: 'nowrap',
              }}>
                {item}
              </span>
              <span style={{
                width: '3px', height: '3px', borderRadius: '50%',
                background: 'rgba(0,113,227,0.5)',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls left */}
      <div style={{ overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          gap: '0',
          animation: 'marquee-left 20s linear infinite',
          width: 'max-content',
        }}>
          {[...ROW2, ...ROW2].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0', flexShrink: 0 }}>
              <span style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '12px',
                fontWeight: '400',
                color: 'rgba(255,255,255,0.3)',
                letterSpacing: '0.01em',
                padding: '0 24px',
                whiteSpace: 'nowrap',
              }}>
                {item}
              </span>
              <span style={{
                width: '3px', height: '3px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
