import KineticText from './KineticText'

export default function BrandStory() {
  return (
    <section style={{
      background: '#fff',
      padding: '80px 40px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '80px',
      alignItems: 'center',
      maxWidth: '1240px',
      margin: '0 auto',
    }}>
      {/* Left: Image */}
      <div className="brand-story-image" style={{ borderRadius: '20px', overflow: 'hidden', height: '520px' }}>
        <img
          src="/images/generated/rhc-bonus-04-back-of-hair.jpg"
          alt="Rich Hair City brand story"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
        />
      </div>

      {/* Right: Story text */}
      <div className="brand-story-text">
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(40px, 5vw, 68px)',
          color: '#1A1A1A',
          lineHeight: 0.9,
          textTransform: 'uppercase',
          letterSpacing: '-0.01em',
          marginBottom: '32px',
        }}>
          <KineticText text="WE BOTTLED" mode="scramble" style={{ display: 'block' }} /><br />
          <KineticText text="THE LUXURY." mode="scramble" delay={0.3} style={{ display: 'block' }} />
        </h2>

        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#555', marginBottom: '16px' }}>
          "Rich" isn't just a price tag; it's a frequency. Rich Hair City was founded on a singular obsession: bridging the gap between salon-exclusive quality and the woman who demands more from her reflection.
        </p>

        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: 1.8, color: '#555', marginBottom: '16px' }}>
          We source only the most resilient, ethically-harvested raw and virgin hair. Why? Because your hair is the first thing they see before you even speak. It's your armor. It's your statement. It's your city.
        </p>

        <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', lineHeight: 1.8, color: '#999', fontStyle: 'italic', marginBottom: '36px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          OWN THE ROOM. PLAY WITH THE LOOK. HANDLE WITH LUXURY.
        </p>

        <a href="/about" style={{ textDecoration: 'none' }}>
          <button style={{
            background: 'transparent',
            color: '#E5187F',
            border: '2px solid #E5187F',
            padding: '14px 36px',
            borderRadius: '40px',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}>THE MANIFESTO →</button>
        </a>
      </div>
    </section>
  )
}
