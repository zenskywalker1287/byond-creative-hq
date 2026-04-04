const allProducts = [
  { id: 1, name: 'RAW BURMESE CURL', tagline: 'Single Donor · 100% Unprocessed', price: '$90', img: '/images/raw_burmese_curl_bundles.jpeg' },
  { id: 2, name: 'BRAZILIAN BODY WAVE', tagline: 'Bouncy + Voluminous Texture', price: '$60', img: '/images/brazilian_body_wave.jpeg' },
  { id: 3, name: 'RAW KINKY STRAIGHT', tagline: 'Heat-Defying + Shed-Resistant', price: '$90', img: '/images/raw_kinky_straight_bundles.jpeg' },
  { id: 4, name: 'BLONDE 613 BUNDLES', tagline: 'Lifts to Level 10 Platinum', price: '$110', img: '/images/blonde_brazilian_bundles_613.jpeg' },
]

export default function AllProducts() {
  return (
    <section style={{
      background: '#E8EDFC',
      padding: '64px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Discount badge */}
      <div style={{
        position: 'absolute',
        top: '24px',
        left: '24px',
        background: '#1A1A1A',
        color: '#fff',
        padding: '9px 18px',
        borderRadius: '10px',
        fontSize: '10px',
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 700,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        zIndex: 2,
      }}>RAW & UNPROCESSED · ETHICALLY SOURCED</div>

      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
        {/* Left sidebar */}
        <div style={{ width: '280px', flexShrink: 0, padding: '72px 32px 32px 40px' }}>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#1A1A1A',
            marginBottom: '20px',
          }}>THE VAULT</h2>

          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#666', lineHeight: 2, marginBottom: '24px' }}>
            Single donor raw &amp; virgin hair.<br />
            Tangle-free. Shed-resistant wefts.<br />
            Maintains texture for 3–5 years.
          </div>

          <div style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '22px',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}>
            The Elite Tier.<br />Filter By Origin.
          </div>
        </div>

        {/* Horizontal scroll */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{
            display: 'flex',
            gap: '16px',
            overflowX: 'auto',
            padding: '72px 40px 32px 16px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          } as React.CSSProperties}>
            {allProducts.map(product => (
              <div key={product.id} className="product-card" style={{ minWidth: '224px', flexShrink: 0 }}>
                <div style={{ height: '300px', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
                  <img
                    src={product.img}
                    alt={product.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                  />
                </div>

                <div style={{ background: '#fff', padding: '14px 14px 18px', borderRadius: '0 0 12px 12px' }}>
                  <div style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '13px',
                    fontWeight: 800,
                    color: '#1A1A1A',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '4px',
                  }}>{product.name}</div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#999', marginBottom: '14px' }}>{product.tagline}</div>
                  <button style={{
                    width: '100%',
                    background: '#E5187F',
                    color: '#fff',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '8px',
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}>Add to Cart • {product.price}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
