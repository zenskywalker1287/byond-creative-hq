import KineticText from './KineticText'
import FloatingAssets from './FloatingAssets'

const floaters = [
  {
    src: '/images/generated/rhc-model-05-burmese-curl.jpg',
    alt: 'Curly model',
    animClass: 'float-slow',
    style: {
      right: '-30px',
      top: '30px',
      width: '190px',
      height: '240px',
      borderRadius: '95px 95px 0 0',
      transform: 'rotate(6deg)',
      '--rot': '6deg',
      opacity: 0.88,
      boxShadow: '0 24px 48px rgba(0,0,0,0.28)',
    } as React.CSSProperties,
  },
  {
    src: '/images/generated/rhc-model-04-blonde-613.jpg',
    alt: 'Blonde model',
    animClass: 'float-medium',
    style: {
      right: '170px',
      bottom: '60px',
      width: '120px',
      height: '150px',
      borderRadius: '60px 60px 0 0',
      transform: 'rotate(-8deg)',
      '--rot': '-8deg',
      opacity: 0.75,
      boxShadow: '0 16px 32px rgba(0,0,0,0.22)',
    } as React.CSSProperties,
  },
  {
    src: '/images/generated/rhc-bonus-02-hair-detail.jpg',
    alt: 'Hair detail',
    animClass: 'float-fast',
    style: {
      left: '40px',
      bottom: '80px',
      width: '90px',
      height: '90px',
      borderRadius: '50%',
      transform: 'rotate(12deg)',
      '--rot': '12deg',
      opacity: 0.65,
      boxShadow: '0 12px 24px rgba(0,0,0,0.18)',
    } as React.CSSProperties,
  },
]

export default function HairHero() {
  return (
    <section style={{ padding: '16px', background: '#fff' }}>
      <div style={{
        borderRadius: '24px',
        overflow: 'hidden',
        position: 'relative',
        height: '600px',
        background: 'linear-gradient(135deg, #F8C0D8 0%, #E0E8FF 55%, #D0C8F8 100%)',
      }}>
        {/* Hero bg image */}
        <div className="hair-hero-bg" style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/images/hero.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }} />

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)',
          zIndex: 1,
        }} />

        {/* Floating decorative assets */}
        <FloatingAssets items={floaters} />

        {/* Large transparent brand watermark */}
        <div className="hero-brand-watermark" style={{
          position: 'absolute',
          bottom: 72,
          left: 24,
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(80px, 16vw, 160px)',
          color: 'rgba(255,255,255,0.1)',
          lineHeight: 0.85,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
        }}>
          RICH<br />HAIR<br />CITY
        </div>

        {/* Bottom bar */}
        <div className="hero-bottom-bar" style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(15,10,20,0.42)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '16px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 3,
        }}>
          <div>
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: 'clamp(18px, 3vw, 28px)',
              color: '#fff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              lineHeight: 1,
              marginBottom: '4px',
              overflow: 'hidden',
            }}>
              <KineticText text="WE BOTTLED THE HUSTLE." mode="stagger" delay={0.3} duration={0.5} stagger={0.03} style={{ color: '#fff', fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '0.04em', textTransform: 'uppercase' }} />
            </div>
            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.06em',
              margin: 0,
            }}>Professional-grade virgin hair engineered for the elite.</p>
          </div>
          <a href="/shop" style={{ textDecoration: 'none' }}>
            <button style={{
              background: '#E5187F',
              color: '#fff',
              border: 'none',
              padding: '13px 32px',
              borderRadius: '30px',
              fontFamily: "'Poppins', sans-serif",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>SHOP THE COLLECTION</button>
          </a>
        </div>
      </div>
    </section>
  )
}
