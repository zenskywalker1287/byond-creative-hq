import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import WingMark from '../components/WingMark'

type PortfolioItem = {
  id: number
  image: string
  brand: string
  tag: string
  category: 'EMAIL' | 'ADS' | 'SHORT FORM'
}

const items: PortfolioItem[] = Array.from({ length: 44 }, (_, i) => ({
  id: i + 1,
  image: `/slice${i + 1}.png`,
  brand: ['MADCOW', '4AMSKIN', 'XYKO', 'FLATPACK'][i % 4],
  tag: ['WELCOME FLOW', 'CAMPAIGN', 'ABANDONED CART', 'WINBACK', 'LAUNCH'][i % 5],
  category: 'EMAIL',
}))

const tabs = [
  { id: 'ALL', label: 'ALL' },
  { id: 'EMAIL', label: 'EMAIL' },
  { id: 'ADS', label: 'ADS' },
  { id: 'SHORT FORM', label: 'SHORT FORM' },
  { id: 'CREATIVE_WORLD', label: '✦ LATEST CREATIVE WORLD' },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('ALL')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [creativeWorldOpen, setCreativeWorldOpen] = useState(false)

  const filtered =
    activeTab === 'ALL'
      ? items
      : activeTab === 'EMAIL'
        ? items.filter(i => i.category === 'EMAIL')
        : []

  const showEmpty = activeTab === 'ADS' || activeTab === 'SHORT FORM'

  const handleTabClick = (id: string) => {
    if (id === 'CREATIVE_WORLD') { setCreativeWorldOpen(true); return }
    setActiveTab(id)
  }

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') { setSelectedItem(null); setCreativeWorldOpen(false) }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      {/* Header */}
      <div
        style={{
          paddingTop: '80px',
          paddingBottom: '32px',
          textAlign: 'center',
          padding: '80px 24px 32px',
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: '#FF0000',
            marginBottom: '16px',
          }}
        >
          [ZEN RICHARDS · PORTFOLIO]
        </div>
        <h1
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(64px, 12vw, 120px)',
            lineHeight: 0.95,
            color: '#FFFFFF',
            margin: '0 0 16px',
          }}
        >
          THE WORK.
        </h1>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '18px',
            color: '#FFFFFF',
            opacity: 0.6,
            fontStyle: 'italic',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          1,200+ emails and creatives shipped<br />
          across 6, 7 and 8-figure DTC brands.
        </p>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '8px',
          padding: '0 24px 40px',
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '11px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              borderRadius: '999px',
              padding: '10px 24px',
              border: `1px solid ${activeTab === tab.id ? '#FF0000' : 'rgba(240,237,232,0.3)'}`,
              background: activeTab === tab.id ? '#FF0000' : 'transparent',
              color: activeTab === tab.id ? '#0A0A0A' : '#FFFFFF',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ padding: '0 16px 80px' }}>
        {showEmpty ? (
          <div style={{ textAlign: 'center', padding: '128px 0' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '13px',
                color: '#FFFFFF',
              }}
            >
              MORE CREATIVE COMING SOON.
            </span>
            <div style={{ marginTop: '16px' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.3em',
                  color: '#FF0000',
                  border: '1px solid rgba(255,0,0,0.4)',
                  padding: '4px 12px',
                }}
              >
                [CHECK BACK]
              </span>
            </div>
          </div>
        ) : (
          <div style={{ columns: '1', gap: '12px' }} className="portfolio-grid">
            <style>{`
              @media (min-width: 768px) { .portfolio-grid { columns: 2; } }
              @media (min-width: 1024px) { .portfolio-grid { columns: 3; } }
            `}</style>
            {filtered.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                style={{
                  marginBottom: '12px',
                  breakInside: 'avoid',
                  borderRadius: '8px',
                  border: '1px solid transparent',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,237,232,0.4)'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent'
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                <img
                  src={item.image}
                  alt={`${item.brand} ${item.tag}`}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.96)',
          }}
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '18px',
              color: '#FFFFFF',
              zIndex: 10,
              background: 'none',
              border: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF0000')}
            onMouseLeave={e => (e.currentTarget.style.color = '#FFFFFF')}
          >
            [✕]
          </button>
          <div
            style={{
              background: '#fff',
              borderRadius: '12px',
              overflow: 'hidden auto',
              width: '100%',
              maxWidth: '600px',
              maxHeight: '85vh',
              position: 'relative',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                background: '#fff',
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: 'rgba(0,0,0,0.6)',
                }}
              >
                {selectedItem.brand}
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  color: '#FF0000',
                }}
              >
                [{selectedItem.tag}]
              </span>
            </div>
            <img
              src={selectedItem.image}
              alt={`${selectedItem.brand} ${selectedItem.tag}`}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </div>
      )}

      {/* Creative World Modal */}
      {creativeWorldOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.9)',
          }}
          onClick={() => setCreativeWorldOpen(false)}
        >
          <div
            style={{
              background: '#0D1A0F',
              border: '1px solid rgba(240,237,232,0.15)',
              borderRadius: '8px',
              padding: '48px',
              maxWidth: '480px',
              textAlign: 'center',
            }}
            onClick={e => e.stopPropagation()}
          >
            <h2
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(32px, 5vw, 56px)',
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              CREATIVE WORLD 01 — COMING SOON.
            </h2>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '18px',
                color: '#FFFFFF',
                opacity: 0.6,
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}
            >
              Our first brand universe is in production.<br />Check back soon.
            </p>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div style={{ borderTop: '1px solid rgba(240,237,232,0.2)' }}>
        <div style={{ textAlign: 'center', padding: '80px 24px' }}>
          <h2
            style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 0.95,
              color: '#FFFFFF',
            }}
          >
            SEEN ENOUGH?
          </h2>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '18px',
              color: '#FFFFFF',
              opacity: 0.6,
              fontStyle: 'italic',
              marginTop: '16px',
              maxWidth: '400px',
              margin: '16px auto 0',
            }}
          >
            Let's talk about what we can build for your brand.
          </p>
          <Link
            to="/#contact"
            style={{
              display: 'inline-block',
              marginTop: '32px',
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: '18px',
              letterSpacing: '0.1em',
              background: '#FF0000',
              color: '#0A0A0A',
              padding: '14px 40px',
              border: 'none',
              transition: 'transform 0.3s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            START THE CONVERSATION →
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,0,0,0.1)',
          padding: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
          }}
        >
          <WingMark size={14} />
          <span
            style={{
              fontFamily: "'Black Han Sans', sans-serif",
              color: '#FF0000',
              fontSize: '18px',
            }}
          >
            CMD.CTRL
          </span>
        </Link>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            color: '#FFFFFF',
            opacity: 0.3,
            fontSize: '11px',
          }}
        >
          © 2026 — CREATIVE BACKEND SYSTEMS
        </span>
      </footer>
    </div>
  )
}
