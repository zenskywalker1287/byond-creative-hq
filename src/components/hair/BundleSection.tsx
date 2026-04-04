import KineticText from './KineticText'

export default function BundleSection() {
  return (
    <section style={{
      background: '#D4DFFE',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      alignItems: 'center',
    }}>
      {/* Left: headline */}
      <div>
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(48px, 6.5vw, 88px)',
          color: '#1A1A1A',
          textTransform: 'uppercase',
          lineHeight: 0.88,
          letterSpacing: '-0.02em',
        }}>
          <KineticText text="SECURE" mode="clipwipe" style={{ display: 'block' }} /><br />
          <KineticText text="THE CITY" mode="clipwipe" delay={0.1} style={{ display: 'block' }} /><br />
          <KineticText text="BUNDLE." mode="clipwipe" delay={0.2} style={{ display: 'block' }} />
        </h2>
      </div>

      {/* Right: image + CTA card */}
      <div>
        {/* Bundle image */}
        <div className="bundle-img" style={{
          height: '340px',
          borderRadius: '24px',
          overflow: 'hidden',
          marginBottom: '20px',
        }}>
          <img
            src="/images/generated/rhc-bundle-03-group-fan.jpg"
            alt="Hair bundle lineup"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
          />
        </div>

        {/* Info card */}
        <div style={{
          background: '#fff',
          borderRadius: '20px',
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            color: '#444',
            lineHeight: 1.6,
            flex: 1,
            margin: 0,
          }}>
            Why settle for a piece when you can own the whole block? Our signature 3-bundle deals are precision-matched for maximum volume and seamless blending. The math always favors the bold.
          </p>
          <button style={{
            background: '#E5187F',
            color: '#fff',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '40px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}>SHOP BUNDLE DEALS</button>
        </div>
      </div>
    </section>
  )
}
