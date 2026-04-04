const claims = ['RAW & UNPROCESSED', 'TANGLE-FREE ARCHITECTURE', 'SHED-RESISTANT WEFTS', 'HEAT-DEFYING DURABILITY', 'ETHICALLY SOURCED', 'SALON-GRADE DENSITY']

export default function IngredientTicker() {
  const doubled = [...claims, ...claims, ...claims, ...claims]

  return (
    <div style={{
      background: '#FFF0F7',
      borderTop: '1px solid rgba(229,24,127,0.1)',
      borderBottom: '1px solid rgba(229,24,127,0.1)',
      overflow: 'hidden',
      padding: '14px 0',
    }}>
      <div style={{
        display: 'flex',
        animation: 'marquee-right 24s linear infinite',
        width: 'fit-content',
      }}>
        {doubled.map((claim, i) => (
          <span key={i} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            color: '#E5187F',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }}>
            {claim}
            <span style={{ color: '#FFB8D9', fontSize: '16px', lineHeight: 1 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
