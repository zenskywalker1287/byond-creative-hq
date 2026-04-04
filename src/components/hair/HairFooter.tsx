const cols = [
  { heading: 'EXPLORE', links: ['Shop All', 'Best Sellers', 'Raw Collection', 'Bundles'] },
  { heading: 'COMPANY', links: ['About', 'The Manifesto', 'PRO / Wholesale', 'Careers'] },
  { heading: 'SUPPORT', links: ['Returns & Shipping', 'Privacy Policy', 'My Account', 'Contact Us'] },
  { heading: 'FOLLOW US', links: ['Instagram', 'Twitter', 'LinkedIn', 'TikTok'] },
]

export default function HairFooter() {
  return (
    <footer style={{
      background: 'linear-gradient(160deg, #E5187F 0%, #F060A0 30%, #FF8AC8 60%, #EED4F8 100%)',
      padding: '64px 48px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Link columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '40px',
        marginBottom: '64px',
        position: 'relative',
        zIndex: 1,
      }}>
        {cols.map(col => (
          <div key={col.heading} className="footer-col">
            <div style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '10px',
              fontWeight: 800,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '18px',
            }}>{col.heading}</div>
            {col.links.map(link => (
              <a key={link} href="#" style={{
                display: 'block',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                color: '#fff',
                marginBottom: '12px',
                cursor: 'pointer',
                textDecoration: 'none',
              }}>{link}</a>
            ))}
          </div>
        ))}
      </div>

      {/* Big logo */}
      <div style={{
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        marginBottom: '28px',
      }}>
        <div className="footer-logo" style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(40px, 9vw, 96px)',
          color: 'rgba(255,255,255,0.95)',
          letterSpacing: '0.03em',
          textTransform: 'uppercase',
          lineHeight: 1,
          textShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}>RICH HAIR CITY</div>
        <div style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '12px',
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.14em',
          marginTop: '10px',
          textTransform: 'uppercase',
        }}>Bottled Hair Rights, Reserved</div>
      </div>

      {/* Bottom bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '24px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Daisy decoration */}
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.22)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '28px',
        }}>🌸</div>

        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '11px',
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>© 2026 Rich Hair City — All Rights Reserved</span>

        {/* Product image slot */}
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255,255,255,0.18)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '8px',
            color: 'rgba(255,255,255,0.4)',
            textAlign: 'center',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            lineHeight: 1.6,
          }}>PRODUCT<br />IMAGE</span>
        </div>
      </div>
    </footer>
  )
}
