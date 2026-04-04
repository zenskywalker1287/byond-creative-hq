export default function StatsTicker() {
  const items = [
    'EMAIL BECAME 40% OF TOTAL REVENUE',
    'FLATPACK: $100K FROM EMAIL IN A SINGLE MONTH',
    '1,200+ CREATIVES SHIPPED ACROSS DTC BRANDS',
    '$2M+ IN REVENUE GENERATED',
    '926% EMAIL REVENUE INCREASE — ONE BRAND, ONE MONTH',
    'NZ$126K ATTRIBUTED TO EMAIL — SINGLE CAMPAIGN',
    'A$112K REVENUE — MADCOW COLLARS',
    '554% REVENUE INCREASE — HEALTHMATE',
  ]

  const repeated = [...items, ...items]

  return (
    <div style={{
      width: '100%',
      overflow: 'hidden',
      background: 'rgba(255,0,0,0.06)',
      borderTop: '1px solid rgba(255,0,0,0.2)',
      borderBottom: '1px solid rgba(255,0,0,0.2)',
      padding: '12px 0',
    }}>
      <div style={{
        display: 'flex',
        minWidth: 'max-content',
        animation: 'ticker-right 30s linear infinite',
        willChange: 'transform',
      }}>
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: "'Black Han Sans',sans-serif",
              fontSize: '14px',
              letterSpacing: '0.2em',
              color: '#FF0000',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              padding: '0 32px',
            }}
          >
            {item}
            <span style={{ marginLeft: '32px', opacity: 0.4 }}>→</span>
          </span>
        ))}
      </div>
    </div>
  )
}
