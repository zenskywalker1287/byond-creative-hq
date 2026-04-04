import { Link } from 'react-router-dom'
import { Mail, RefreshCw, Target, PenTool, Settings } from 'lucide-react'
import HeroCarousel from '../components/HeroCarousel'
import WingMark from '../components/WingMark'

const heroImages = [
  '/images/flatpack-01.png', '/images/flatpack-02.png', '/images/flatpack-03.png',
  '/images/flatpack-04.png', '/images/flatpack-05.png', '/images/flatpack-06.png',
]

const scopeItems = [
  { icon: Mail, label: 'EMAIL COPY' },
  { icon: RefreshCw, label: 'FLOW SEQUENCES' },
  { icon: Target, label: 'CAMPAIGN STRATEGY' },
  { icon: PenTool, label: 'SUBJECT LINES' },
  { icon: Settings, label: 'RETENTION SYSTEM' },
]

const workImages = [
  '/images/flatpack-01.png', '/images/flatpack-02.png', '/images/flatpack-03.png',
  '/images/flatpack-04.png', '/images/flatpack-05.png', '/images/flatpack-06.png',
]

export default function FlatpackCaseStudy() {
  return (
    <div style={{ minHeight: '100vh', background: '#0A0A0A' }}>

      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid rgba(240,237,232,0.1)',
          padding: '24px 48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/portfolio"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#FF0000',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
          onMouseLeave={e => (e.currentTarget.style.color = '#FF0000')}
        >
          ← BACK TO WORK
        </Link>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(240,237,232,0.4)',
          }}
        >
          CASE STUDY / FLATPACK
        </span>
      </div>

      {/* Hero */}
      <div style={{ padding: '80px 48px', textAlign: 'center' }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: '#FF0000',
            display: 'block',
            marginBottom: '24px',
          }}
        >
          [DTC · FOOD &amp; BEVERAGE]
        </span>
        <h1
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(48px, 8vw, 112px)',
            lineHeight: 0.9,
            color: '#FFFFFF',
            margin: '0 0 16px',
          }}
        >
          FLATPACK.
        </h1>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '22px',
            color: 'rgba(240,237,232,0.6)',
            fontStyle: 'italic',
            maxWidth: '640px',
            margin: '0 auto 32px',
          }}
        >
          $100K from email. One month.
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: 'rgba(240,237,232,0.6)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 2,
            whiteSpace: 'pre-line',
          }}
        >
          {'Most brands treat email like\nan afterthought.\n\nFlatpack let us treat it like\na revenue channel.\n\nThe results speak for themselves.'}
        </p>
      </div>

      {/* Scope Icons */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          padding: '0 24px 80px',
        }}
      >
        {scopeItems.map((item, i) => {
          const Icon = item.icon
          return (
            <div
              key={i}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(240,237,232,0.2)',
                  background: '#0D1A0F',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#FF0000'
                  e.currentTarget.style.boxShadow = '0 0 12px rgba(255,0,0,0.15)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(240,237,232,0.2)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon size={24} strokeWidth={1.2} color="rgba(240,237,232,0.7)" />
              </div>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,232,0.5)',
                  textAlign: 'center',
                  lineHeight: 1.4,
                  maxWidth: '80px',
                }}
              >
                {item.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Hero Carousel */}
      <div style={{ paddingBottom: '64px' }}>
        <HeroCarousel images={heroImages} />
      </div>

      {/* Divider */}
      <div style={{ padding: '0 48px' }}>
        <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
      </div>

      {/* Results Section */}
      <div style={{ padding: '80px 48px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#FFFFFF',
            marginBottom: '48px',
          }}
        >
          THE NUMBERS.
        </h2>
        <div style={{ maxWidth: '800px', margin: '0 auto 32px' }}>
          <img
            src="/images/klaviyo-02.png"
            alt="Flatpack Klaviyo dashboard"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            letterSpacing: '0.2em',
            color: '#FF0000',
            textShadow: '0 0 8px rgba(255,0,0,0.5)',
            marginBottom: '8px',
          }}
        >
          [A$400K TOTAL · A$112K FROM EMAIL · 554% INCREASE]
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            color: '#FF0000',
            textShadow: '0 0 8px rgba(255,0,0,0.4)',
            opacity: 0.7,
          }}
        >
          [REAL ACCOUNT · REAL MONTH · NO MOCKUPS]
        </p>
      </div>

      {/* Divider */}
      <div style={{ padding: '0 48px' }}>
        <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
      </div>

      {/* Creative Section */}
      <div style={{ padding: '80px 48px' }}>
        <h2
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(32px, 5vw, 64px)',
            color: '#FFFFFF',
            textAlign: 'center',
            marginBottom: '48px',
          }}
        >
          THE WORK.
        </h2>
        <div
          style={{ columns: '1', gap: '16px', maxWidth: '1200px', margin: '0 auto' }}
          className="flatpack-grid"
        >
          <style>{`
            @media (min-width: 640px) { .flatpack-grid { columns: 2; } }
            @media (min-width: 1024px) { .flatpack-grid { columns: 3; } }
          `}</style>
          {workImages.map((img, i) => (
            <div key={i} style={{ marginBottom: '16px', breakInside: 'avoid' }}>
              <img
                src={img}
                alt={`Flatpack email creative ${i + 1}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          borderTop: '1px solid rgba(240,237,232,0.1)',
          padding: '48px',
          textAlign: 'center',
        }}
      >
        <Link
          to="/portfolio"
          style={{
            display: 'inline-block',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            letterSpacing: '0.2em',
            color: '#FF0000',
            border: '1px solid rgba(255,0,0,0.3)',
            padding: '16px 32px',
            textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#FFFFFF'
            e.currentTarget.style.borderColor = 'rgba(240,237,232,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = '#FF0000'
            e.currentTarget.style.borderColor = 'rgba(255,0,0,0.3)'
          }}
        >
          ← BACK TO WORK
        </Link>
      </div>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,0,0,0.08)',
          padding: '32px 48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <WingMark size={14} />
          <span style={{ fontFamily: "'Black Han Sans', sans-serif", color: '#FF0000', fontSize: '18px' }}>CMD.CTRL</span>
        </Link>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#FFFFFF', opacity: 0.3, fontSize: '11px' }}>
          © 2026 — CREATIVE BACKEND SYSTEMS
        </span>
      </footer>
    </div>
  )
}
