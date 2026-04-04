const brands = [
  'INNERDOSE', 'KRUPT SPORTS', 'HERO LOUPES', 'PRIME TRAIN',
  'BEST BODY', 'FLATPACK', 'LOVELUGGAGE',
]

const doubled = [...brands, ...brands, ...brands, ...brands]

export default function BrandPillStrip() {
  return (
    <div style={{ padding: '48px 0', textAlign: 'center' }}>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: '#FF0000',
          marginBottom: '32px',
        }}
      >
        [BRANDS WE WROTE FOR]
      </p>

      <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div
          style={{
            display: 'inline-flex',
            animation: 'ticker-left 30s linear infinite',
          }}
        >
          {doubled.map((brand, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(240,237,232,0.8)',
                border: '1px solid rgba(240,237,232,0.2)',
                padding: '8px 20px',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                margin: '0 6px',
              }}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
