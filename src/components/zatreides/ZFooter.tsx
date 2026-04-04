const LINKS = {
  Services: ['Custom Websites', '48hr Delivery', 'Creative Retainer', 'Get a Demo'],
  Company:  ['Our Work', 'Process', 'Who It\'s For', 'Contact'],
  Connect:  ['Instagram', 'LinkedIn', 'Twitter/X', 'Email'],
}

export default function ZFooter() {
  return (
    <footer
      style={{
        background: '#040404',
        borderTop: '1px solid rgba(245,245,245,0.06)',
        padding: '64px 40px 40px',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr repeat(3, auto)',
          gap: '64px',
          marginBottom: '64px',
          flexWrap: 'wrap',
        }}>
          {/* Brand */}
          <div>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", sans-serif',
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '-0.022em',
              color: '#fff',
              margin: '0 0 12px',
            }}>
              Zatreides
            </p>
            <p style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.35)',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
              margin: 0,
              maxWidth: '220px',
            }}>
              Custom websites that close deals. Built in 48 hours, starting at $1,500.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([category, links]) => (
            <div key={category}>
              <p style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.02em',
                marginBottom: '16px',
              }}>
                {category}
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.55)',
                        textDecoration: 'none',
                        letterSpacing: '-0.01em',
                        transition: 'color 0.15s ease',
                      }}
                      onMouseOver={e => { e.currentTarget.style.color = '#fff' }}
                      onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          paddingTop: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            © 2025 Zatreides Solutions. All rights reserved.
          </p>
          <p style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.25)',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            <a href="#" style={{ color: 'rgba(245,245,245,0.25)', textDecoration: 'none' }}>Privacy</a>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            <a href="#" style={{ color: 'rgba(245,245,245,0.25)', textDecoration: 'none' }}>Terms</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
