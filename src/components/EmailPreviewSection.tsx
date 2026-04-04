import { ContainerScroll } from './ui/ContainerScroll'

const FLOW_NODES = [
  { label: 'WELCOME SERIES', stat: '8 emails', note: 'New subscriber → first purchase', color: '#FF0000' },
  { label: 'POST-PURCHASE', stat: '5 emails', note: 'LTV expansion + upsell window', color: '#FFFFFF' },
  { label: 'ABANDON SERIES', stat: '4 emails', note: 'Cart + browse + checkout', color: '#FF0000' },
  { label: 'WIN-BACK FLOW',  stat: '5 emails', note: 'Dormant → reactivated buyer', color: '#FFFFFF' },
  { label: 'VIP TIER',       stat: '6 emails', note: 'High-LTV retention & exclusivity', color: '#FF0000' },
  { label: 'REPLENISHMENT',  stat: '3 emails', note: 'Predictive purchase cycle nudge', color: '#FFFFFF' },
]

export default function EmailPreviewSection() {
  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid rgba(255,0,0,0.08)' }}>
      <ContainerScroll
        titleComponent={
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              color: '#FF0000',
              letterSpacing: '0.3em',
              marginBottom: '20px',
            }}>
              THE ARCHITECTURE
            </div>
            <h2 style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 7rem)',
              lineHeight: 0.88,
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              THE SYSTEM THAT<br />
              <span style={{ color: '#FF0000' }}>PRINTS WHILE YOU SLEEP.</span>
            </h2>
          </div>
        }
      >
        {/* Flow diagram card — dark editorial style */}
        <div style={{
          background: '#0A0F0B',
          minHeight: '500px',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>

          {/* Header bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '24px',
            borderBottom: '1px solid rgba(255,0,0,0.12)',
            marginBottom: '32px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF0000', boxShadow: '0 0 8px rgba(255,0,0,0.6)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(240,237,232,0.15)' }} />
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(240,237,232,0.15)' }} />
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: 'rgba(240,237,232,0.3)',
              letterSpacing: '0.2em',
            }}>
              CMD.CTRL / BACKEND FLOW MAP
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              color: '#FF0000',
              letterSpacing: '0.15em',
              opacity: 0.6,
            }}>
              30 TOUCHPOINTS ACTIVE
            </div>
          </div>

          {/* Flow grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2px',
            flex: 1,
          }}>
            {FLOW_NODES.map((node, i) => (
              <div
                key={i}
                style={{
                  padding: '28px 24px',
                  border: '1px solid rgba(255,0,0,0.08)',
                  background: i === 0 ? 'rgba(255,0,0,0.05)' : 'transparent',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Active pulse for first node */}
                {i === 0 && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#FF0000',
                    boxShadow: '0 0 8px rgba(255,0,0,0.8)',
                    animation: 'pulse 2s ease infinite',
                  }} />
                )}

                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  color: 'rgba(240,237,232,0.3)',
                  letterSpacing: '0.2em',
                }}>
                  F-{String(i + 1).padStart(2, '0')}
                </div>

                <div style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '22px',
                  color: node.color,
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}>
                  {node.label}
                </div>

                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  color: '#FF0000',
                  letterSpacing: '0.1em',
                  opacity: 0.8,
                }}>
                  {node.stat}
                </div>

                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '12px',
                  color: '#FFFFFF',
                  opacity: 0.35,
                  lineHeight: 1.4,
                  marginTop: '4px',
                }}>
                  {node.note}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom metrics bar */}
          <div style={{
            display: 'flex',
            gap: '40px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255,0,0,0.08)',
            marginTop: '24px',
          }}>
            {[
              { label: 'AVG OPEN RATE', value: '44.2%' },
              { label: 'CLICK RATE',    value: '6.8%' },
              { label: 'REVENUE/EMAIL', value: '$3.40' },
              { label: 'TOTAL FLOWS',   value: '6 ACTIVE' },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.18em', marginBottom: '2px' }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '20px', color: '#FF0000', letterSpacing: '0.05em' }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </ContainerScroll>
    </section>
  )
}
