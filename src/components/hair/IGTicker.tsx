const HANDLE = '@RICHHAIRCITY'

export default function IGTicker() {
  const items = Array(16).fill(`FOLLOW US ON IG ${HANDLE}`)

  return (
    <div style={{
      background: '#1A1A1A',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div style={{
        display: 'flex',
        animation: 'marquee-right 18s linear infinite',
        width: 'fit-content',
      }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.65)',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}>
            {item}
            <span style={{ color: '#E5187F', fontSize: '14px', lineHeight: 1 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
