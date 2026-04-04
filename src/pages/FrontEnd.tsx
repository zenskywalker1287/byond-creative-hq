import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'

const CATEGORIES = [
  {
    id: 'education',
    label: 'EDUCATION',
    tag: 'TEACH THEM SOMETHING',
    color: '#FFFFFF',
    angles: [
      'The psychology behind why people buy twice',
      'Why email open rates are a vanity metric (and what matters)',
      'The 3-part anatomy of a flow that retains customers',
      'What most brands get wrong about segmentation',
      'The difference between a sequence and a campaign',
      'Why your welcome flow is the highest-leverage asset you own',
      'How to write subject lines using curiosity gaps',
      'The framework behind 8-figure email programs',
      'What abandoned cart emails should actually say (it\'s not what you think)',
      'The trigger-based email system explained for non-marketers',
      'Why most win-back emails fail in the first sentence',
      'The anatomy of a perfect pre-purchase nurture flow',
      'How to build a content engine inside your backend',
      'Why sending more emails is usually the answer (with nuance)',
      'The role of storytelling in high-converting emails',
      'What SMS and email do together that neither can do alone',
    ],
  },
  {
    id: 'social-proof',
    label: 'SOCIAL PROOF',
    tag: 'PROVE IT',
    color: '#FF0000',
    angles: [
      'How one client went from 15% to 40% email revenue in 90 days',
      'The Black Friday campaign that generated $180K in 72 hours',
      'What our INNERDOSE welcome flow generated vs the old one',
      'Case study: Turning a dead list into a $52K MRR engine',
      'The win-back sequence that reactivated 12.4% of lapsed buyers',
      'Behind the scenes: Building GYMSHARK\'s post-purchase flow',
      'What 30 touchpoints looks like inside Klaviyo',
      'Client result: +340% revenue from flows alone (no new ad spend)',
      'The 6 emails that recovered $180K in abandoned carts',
      'How a 6-email sequence increased LTV by 67%',
      'Why LUMI\'s email revenue tripled after we restructured their flow',
      'Client story: The founder who was leaving money in every touchpoint',
      'Before/after: The subject line test that increased opens by 34%',
      'What our audit uncovered in a 7-figure brand\'s Klaviyo account',
    ],
  },
  {
    id: 'entertainment',
    label: 'ENTERTAINMENT',
    tag: 'MAKE THEM FEEL SOMETHING',
    color: '#FFFFFF',
    angles: [
      'The email I wrote at 2am that generated $47K',
      'A day in the life of building a backend that prints',
      'Every copywriter\'s nightmare: the blank welcome email',
      'Why I turned down a client (and what happened next)',
      'The most embarrassing email mistake I\'ve ever made (and what I learned)',
      'What 100 email audits taught me about the state of ecomm marketing',
      'The story behind the sequence that made a client cry (happy tears)',
      'Why most "email experts" have never actually built a backend',
      'I read 500 welcome emails so you don\'t have to — here\'s what I found',
      'The brand that had 80,000 subscribers and 3% open rates. Here\'s why.',
      'A conversation between me and a brand that thought email was dead',
      'The 30-minute Klaviyo audit that changed everything for a $2M brand',
    ],
  },
  {
    id: 'conversion',
    label: 'CONVERSION',
    tag: 'MAKE THEM BUY',
    color: '#FF0000',
    angles: [
      'The 5 words that will double your email click-through rate',
      'How to write CTAs that feel inevitable, not pushy',
      'The scarcity technique that works without lying',
      'Why your discount-first strategy is training customers to wait',
      'The offer structure behind 8-figure email campaigns',
      'How to price an email sequence that sells itself',
      'The post-purchase window: where most brands leave 40% on the table',
      'Why urgency without narrative falls flat (and what to do instead)',
      'The 7-word subject line formula that outperforms everything else',
      'How to turn a product feature into an emotional reason to buy',
      'The repurchase trigger email that every brand needs but most don\'t have',
      'Why your browse abandonment sequence isn\'t converting (fix this)',
      'The cross-sell email sequence that increases AOV without feeling salesy',
      'How to write product emails for skeptics, not fans',
      'The re-engagement campaign anatomy: Phase 1, 2, 3 explained',
    ],
  },
  {
    id: 'brand-story',
    label: 'BRAND STORY',
    tag: 'BUILD THE MYTHOLOGY',
    color: '#FFFFFF',
    angles: [
      'Why we only work with brands we actually believe in',
      'The philosophy behind treating email as a revenue engine, not a channel',
      'What 3 years of email systems taught me about customer psychology',
      'Why we call it a backend — and what that word means',
      'The CMD.CTRL origin story: why I stopped doing what everyone else was doing',
      'What it takes to build a 30-touchpoint system from scratch',
      'Why we write every word like it\'s a direct conversation',
      'The two things every high-converting email must have',
      'What working with Gymshark, InnerDose, and Lumi taught me',
      'The standard we hold every campaign to (and why it\'s non-negotiable)',
      'Why I turned down a 6-figure retainer (and what I took instead)',
      'What the brands printing 40% from email all have in common',
    ],
  },
  {
    id: 'objection',
    label: 'OBJECTION',
    tag: 'KILL THE DOUBT',
    color: '#FF0000',
    angles: [
      '"Email is dead" — a counterargument backed by $180K campaigns',
      'Why you don\'t need a big list. You need a working backend.',
      '"Our audience doesn\'t read emails" — here\'s the data that disagrees',
      'The truth about Klaviyo: it\'s the tool, not the strategy',
      '"We already do email" — the 5 questions to ask before you say that',
      'Why a 15% email revenue share means you\'re leaving 25% on the table',
      '"We can do it in-house" — here\'s what that actually costs you',
      'Why timing matters more than frequency (the data might shock you)',
      '"Our list is too cold to revive" — every list can be reactivated. Here\'s how.',
      'The "we\'ll just use templates" mistake that\'s costing you conversion',
      '"Email feels like spam to us" — that means your last agency failed you',
      'Why chasing open rates is the wrong game entirely',
      '"We tried email and it didn\'t work" — let\'s diagnose exactly why',
    ],
  },
]

function CategorySection({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const [expanded, setExpanded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const visibleAngles = expanded ? cat.angles : cat.angles.slice(0, 6)

  return (
    <div
      ref={ref}
      style={{
        borderTop: '1px solid rgba(255,0,0,0.1)',
        paddingTop: '60px',
        paddingBottom: '60px',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(30px)',
        transition: `opacity 0.7s ${index * 0.08}s ease, transform 0.7s ${index * 0.08}s ease`,
      }}
    >
      {/* Category header */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '60px', alignItems: 'start' }}>

        {/* Left: Category identity */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '9px',
            color: '#FF0000',
            letterSpacing: '0.25em',
            marginBottom: '12px',
            opacity: 0.6,
          }}>
            {cat.tag}
          </div>
          <h2 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(48px, 6vw, 80px)',
            color: cat.color,
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
            margin: '0 0 20px',
          }}>
            {cat.label}
          </h2>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            color: 'rgba(240,237,232,0.3)',
            letterSpacing: '0.15em',
          }}>
            {cat.angles.length} ANGLES
          </div>
        </div>

        {/* Right: Angle cards */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {visibleAngles.map((angle, i) => (
              <div
                key={i}
                style={{
                  padding: '20px 24px',
                  border: '1px solid rgba(255,0,0,0.07)',
                  background: 'transparent',
                  display: 'grid',
                  gridTemplateColumns: '28px 1fr auto',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'default',
                  transition: 'background 0.25s ease, border-color 0.25s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,0,0,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,0,0,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,0,0,0.07)'
                }}
              >
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  color: 'rgba(255,0,0,0.35)',
                  letterSpacing: '0.1em',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: '14px',
                  color: '#FFFFFF',
                  opacity: 0.75,
                  lineHeight: 1.45,
                }}>
                  {angle}
                </div>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'rgba(255,0,0,0.25)',
                  flexShrink: 0,
                }} />
              </div>
            ))}
          </div>

          {cat.angles.length > 6 && (
            <button
              onClick={() => setExpanded(v => !v)}
              style={{
                marginTop: '16px',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#FF0000',
                letterSpacing: '0.2em',
                background: 'transparent',
                border: '1px solid rgba(255,0,0,0.25)',
                padding: '10px 20px',
                cursor: 'pointer',
                transition: 'border-color 0.25s ease, background 0.25s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(255,0,0,0.6)'
                e.currentTarget.style.background = 'rgba(255,0,0,0.06)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(255,0,0,0.25)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {expanded ? `COLLAPSE — SHOW FEWER` : `EXPAND — ${cat.angles.length - 6} MORE ANGLES`}
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default function FrontEnd() {
  const totalAngles = CATEGORIES.reduce((sum, c) => sum + c.angles.length, 0)

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: '160px 32px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '32px',
        }}>
          CONTENT SYSTEM
        </div>

        <h1 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(4rem, 11vw, 13rem)',
          lineHeight: 0.87,
          letterSpacing: '-0.01em',
          color: '#FFFFFF',
          margin: '0 0 40px',
        }}>
          THE FRONT<br />
          <span style={{ color: '#FF0000' }}>END.</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start', maxWidth: '900px' }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '16px',
            color: '#FFFFFF',
            opacity: 0.5,
            lineHeight: 1.65,
            margin: 0,
          }}>
            Every email needs a reason to exist. These are the angles — the hooks, the stories, the arguments — that power a backend worth having. {totalAngles}+ content directions engineered to retain, convert, and compound.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CATEGORIES.map(c => (
              <a
                key={c.id}
                href={`#${c.id}`}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,0,0,0.08)',
                  textDecoration: 'none',
                  transition: 'padding-left 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = '8px' }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = '0px' }}
              >
                <span style={{
                  fontFamily: "'Black Han Sans', sans-serif",
                  fontSize: '18px',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                }}>
                  {c.label}
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '9px',
                  color: 'rgba(255,0,0,0.5)',
                  letterSpacing: '0.12em',
                }}>
                  {c.angles.length}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div style={{
        borderTop: '1px solid rgba(255,0,0,0.08)',
        borderBottom: '1px solid rgba(255,0,0,0.08)',
        padding: '24px 32px',
        display: 'flex',
        gap: '60px',
        maxWidth: '1200px',
        margin: '0 auto 0',
      }}>
        {[
          { label: 'TOTAL ANGLES', value: `${totalAngles}+` },
          { label: 'CATEGORIES', value: CATEGORIES.length },
          { label: 'CONTENT TYPE', value: 'EMAIL-NATIVE' },
          { label: 'STRATEGY', value: '30-TOUCHPOINT' },
        ].map(s => (
          <div key={s.label}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', color: 'rgba(240,237,232,0.3)', letterSpacing: '0.18em', marginBottom: '4px' }}>
              {s.label}
            </div>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '24px', color: '#FF0000', letterSpacing: '0.05em' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Category sections */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {CATEGORIES.map((cat, i) => (
          <div key={cat.id} id={cat.id}>
            <CategorySection cat={cat} index={i} />
          </div>
        ))}
      </div>

      {/* CTA Footer */}
      <section style={{
        borderTop: '1px solid rgba(255,0,0,0.1)',
        padding: '120px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: '#FF0000',
          letterSpacing: '0.3em',
          marginBottom: '32px',
        }}>
          READY TO BUILD THE BACKEND?
        </div>
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(3rem, 8vw, 9rem)',
          lineHeight: 0.88,
          color: '#FFFFFF',
          margin: '0 0 48px',
          letterSpacing: '-0.01em',
        }}>
          THE ANGLES ARE<br />
          <span style={{ color: '#FF0000' }}>JUST THE START.</span>
        </h2>
        <Link
          to="/#contact"
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '16px',
            letterSpacing: '0.15em',
            color: '#0A0A0A',
            background: '#FF0000',
            padding: '16px 40px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.85' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
        >
          LET'S BUILD YOUR BACKEND →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0A0A0A',
        borderTop: '1px solid rgba(255,0,0,0.08)',
        padding: '40px 32px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        <span style={{ fontFamily: "'Black Han Sans',sans-serif", color: '#FF0000', fontSize: '20px', letterSpacing: '0.05em' }}>
          CMD.CTRL
        </span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", color: '#FFFFFF', opacity: 0.2, fontSize: '11px', letterSpacing: '0.12em' }}>
          © 2026 — CREATIVE BACKEND SYSTEMS
        </span>
      </footer>
    </div>
  )
}
