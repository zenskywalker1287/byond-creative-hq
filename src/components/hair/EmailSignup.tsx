import { useState } from 'react'

export default function EmailSignup() {
  const [email, setEmail] = useState('')

  return (
    <section style={{
      background: '#fff',
      padding: '80px 40px 120px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Rainbow arch — decorative bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '320px',
        height: '160px',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {[
          { color: '#FF6EB4', w: 320, h: 160 },
          { color: '#C86EFF', w: 256, h: 128 },
          { color: '#6EB4FF', w: 192, h: 96 },
          { color: '#6EFFD8', w: 128, h: 64 },
        ].map((arc, i) => (
          <div key={i} className="email-arc" style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${arc.w}px`,
            height: `${arc.h}px`,
            borderRadius: `${arc.w / 2}px ${arc.w / 2}px 0 0`,
            border: `10px solid ${arc.color}`,
            borderBottom: 'none',
            opacity: 0.7,
          }} />
        ))}
      </div>

      <h2 className="email-heading" style={{
        fontFamily: "'Black Han Sans', sans-serif",
        fontSize: 'clamp(40px, 6vw, 64px)',
        color: '#1A1A1A',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        marginBottom: '12px',
      }}>JOIN THE CITY COUNCIL.</h2>

      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '12px',
        color: '#AAA',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: '36px',
      }}>SIGN UP FOR EXCLUSIVE ACCESS TO RICH HAIR CITY DROPS, PRIVATE SALES, AND LUXURY INSIGHTS.</p>

      <form className="email-form"
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: 'flex',
          maxWidth: '480px',
          margin: '0 auto',
          border: '1.5px solid rgba(0,0,0,0.14)',
          borderRadius: '40px',
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          style={{
            flex: 1,
            padding: '15px 24px',
            border: 'none',
            outline: 'none',
            fontFamily: "'Poppins', sans-serif",
            fontSize: '14px',
            color: '#1A1A1A',
            background: 'transparent',
          }}
        />
        <button type="submit" style={{
          background: '#E5187F',
          color: '#fff',
          border: 'none',
          padding: '15px 24px',
          cursor: 'pointer',
          fontSize: '20px',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>ENTER THE CITY →</button>
      </form>
    </section>
  )
}
