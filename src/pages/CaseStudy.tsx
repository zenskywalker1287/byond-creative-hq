import { useParams, Link, Navigate } from 'react-router-dom'
import { getCaseStudyBySlug, getAdjacentStudies } from '../data/caseStudyData'
import type { Deliverable } from '../data/caseStudyData'
import HeroCarousel from '../components/HeroCarousel'
import BrandPillStrip from '../components/BrandPillStrip'
import WingMark from '../components/WingMark'

const DeliverableIcon = ({ item }: { item: Deliverable }) => {
  const Icon = item.icon
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'none',
      }}
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
}

export default function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudyBySlug(slug) : undefined
  if (!study) return <Navigate to="/" replace />
  const { prev, next } = getAdjacentStudies(study.slug)

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
          to="/"
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
          ← BACK TO COMMAND
        </Link>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            letterSpacing: '0.2em',
            color: 'rgba(240,237,232,0.4)',
          }}
        >
          CASE STUDY / {study.name}
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
          [{study.niche}]
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
          {study.headline}
        </h1>
        <p
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '22px',
            color: 'rgba(240,237,232,0.6)',
            fontStyle: 'italic',
            marginBottom: '16px',
            maxWidth: '640px',
            margin: '0 auto 16px',
          }}
        >
          {study.subheadline}
        </p>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: 'rgba(240,237,232,0.6)',
            maxWidth: '560px',
            lineHeight: 1.8,
            margin: '0 auto 48px',
          }}
        >
          {study.context}
        </p>

        {/* Deliverables */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            marginBottom: '48px',
          }}
        >
          {study.deliverables.map((d, i) => (
            <DeliverableIcon key={i} item={d} />
          ))}
        </div>
      </div>

      {/* Image Carousel */}
      {study.heroImages.length > 0 && (
        <div style={{ paddingBottom: '64px' }}>
          <HeroCarousel images={study.heroImages} />
        </div>
      )}

      {/* Divider */}
      <div style={{ padding: '0 48px' }}>
        <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
      </div>

      {/* Sections */}
      <div style={{ padding: '80px 48px', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {study.sections.map((section, i) => (
            <div key={i}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '11px',
                  letterSpacing: '0.2em',
                  color: '#FF0000',
                  display: 'block',
                  marginBottom: '16px',
                }}
              >
                [{String(i + 1).padStart(2, '0')}] {section.title}
              </span>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '14px',
                  color: 'rgba(240,237,232,0.8)',
                  lineHeight: 1.9,
                  maxWidth: '640px',
                  margin: '0 auto',
                }}
              >
                {section.body}
              </p>
            </div>
          ))}

          {/* Stat callout */}
          <div
            style={{
              border: '1px solid rgba(255,0,0,0.3)',
              padding: '48px',
              textAlign: 'center',
              maxWidth: '640px',
              margin: '0 auto',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#FF0000',
                display: 'block',
                marginBottom: '16px',
              }}
            >
              KEY RESULT
            </span>
            <p
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: '#FFFFFF',
                lineHeight: 1,
              }}
            >
              {study.stat}
            </p>
          </div>
        </div>
      </div>

      {/* MKTG-specific brand strip */}
      {study.slug === 'mktg' && (
        <>
          <div style={{ padding: '0 48px' }}>
            <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
          </div>
          <BrandPillStrip />
          <div style={{ padding: '0 48px' }}>
            <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
          </div>
          <div style={{ padding: '80px 48px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              CLIENT WORK.
            </h2>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '20px',
                color: 'rgba(240,237,232,0.6)',
                fontStyle: 'italic',
                marginBottom: '16px',
                maxWidth: '640px',
                margin: '0 auto 16px',
                whiteSpace: 'pre-line',
              }}
            >
              {'Written for the brands inside\none of the world\'s leading\nKlaviyo agencies.'}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#FF0000',
                textShadow: '0 0 8px rgba(255,0,0,0.5)',
              }}
            >
              [IN COLLABORATION WITH MKTG EMAILS]
            </p>
          </div>
        </>
      )}

      {/* Adsumo-specific client work */}
      {study.slug === 'adsumo' && (
        <>
          <div style={{ padding: '0 48px' }}>
            <div style={{ height: '1px', background: 'rgba(240,237,232,0.15)' }} />
          </div>
          <div style={{ padding: '80px 48px', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: 'clamp(32px, 5vw, 64px)',
                color: '#FFFFFF',
                marginBottom: '24px',
              }}
            >
              CLIENT WORK.
            </h2>
            <p
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '20px',
                color: 'rgba(240,237,232,0.6)',
                fontStyle: 'italic',
                maxWidth: '640px',
                margin: '0 auto 16px',
                whiteSpace: 'pre-line',
              }}
            >
              {'Emails written for the brands\ninside Adsumo Digital.'}
            </p>
            <p
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                letterSpacing: '0.2em',
                color: '#FF0000',
                textShadow: '0 0 8px rgba(255,0,0,0.5)',
                marginBottom: '48px',
              }}
            >
              [IN COLLABORATION WITH ADSUMO DIGITAL]
            </p>
            <div
              style={{
                columns: '1',
                gap: '16px',
                maxWidth: '1200px',
                margin: '0 auto',
              }}
              className="adsumo-grid"
            >
              <style>{`
                @media (min-width: 640px) { .adsumo-grid { columns: 2; } }
                @media (min-width: 1024px) { .adsumo-grid { columns: 3; } }
              `}</style>
              {[
                '/images/greengoo-01.png', '/images/greengoo-02.png', '/images/greengoo-03.png', '/images/greengoo-05.png',
                '/images/whiskeyballs-01.png', '/images/whiskeyballs-02.png', '/images/whiskeyballs-03.png', '/images/whiskeyballs-04.png',
                '/images/upairy-01.png', '/images/upairy-02.png',
              ].map((img, i) => (
                <div key={i} style={{ marginBottom: '16px', breakInside: 'avoid' }}>
                  <img
                    src={img}
                    alt={`Adsumo client work ${i + 1}`}
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
        </>
      )}

      {/* Prev / Next */}
      <div
        style={{
          borderTop: '1px solid rgba(240,237,232,0.1)',
          padding: '48px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link
          to={`/case-studies/${prev.slug}`}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: 'rgba(240,237,232,0.4)' }}>←</span>
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(240,237,232,0.4)', display: 'block' }}>PREVIOUS</span>
            <span style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '22px', color: 'rgba(240,237,232,0.7)' }}>{prev.name}</span>
          </div>
        </Link>
        <Link
          to={`/case-studies/${next.slug}`}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', textAlign: 'right' }}
        >
          <div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(240,237,232,0.4)', display: 'block' }}>NEXT</span>
            <span style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '22px', color: 'rgba(240,237,232,0.7)' }}>{next.name}</span>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: 'rgba(240,237,232,0.4)' }}>→</span>
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
