import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import BalloonHero from '../components/balloons/BalloonHero'
import BalloonFAQ from '../components/balloons/BalloonFAQ'
import BalloonCursor from '../components/balloons/BalloonCursor'
import { CustomEase } from 'gsap/CustomEase'
import '../styles/balloons.css'

gsap.registerPlugin(CustomEase)
const EASE_ENTER = CustomEase.create('bb-enter', '0.16, 1, 0.3, 1')

gsap.registerPlugin(ScrollTrigger)

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const IconArch = () => (
  <svg className="bb-service-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--bb-gold)' }}>
    <path d="M8 40 C8 40, 8 16, 24 16 C40 16, 40 40, 40 40" />
    <circle cx="24" cy="14" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="10" cy="38" r="2.5" fill="currentColor" stroke="none" />
    <circle cx="38" cy="38" r="2.5" fill="currentColor" stroke="none" />
    <line x1="16" y1="18" x2="12" y2="24" />
    <line x1="32" y1="18" x2="36" y2="24" />
  </svg>
)

const IconWall = () => (
  <svg className="bb-service-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--bb-gold)' }}>
    <ellipse cx="12" cy="14" rx="5.5" ry="6.5" />
    <ellipse cx="26" cy="11" rx="5.5" ry="6.5" />
    <ellipse cx="40" cy="14" rx="5.5" ry="6.5" />
    <ellipse cx="19" cy="26" rx="5.5" ry="6.5" />
    <ellipse cx="33" cy="26" rx="5.5" ry="6.5" />
    <ellipse cx="12" cy="38" rx="5.5" ry="6.5" />
    <ellipse cx="26" cy="38" rx="5.5" ry="6.5" />
    <ellipse cx="40" cy="38" rx="5.5" ry="6.5" />
  </svg>
)

const IconOrganic = () => (
  <svg className="bb-service-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--bb-gold)' }}>
    <path d="M24 40 C18 40, 8 34, 8 24 C8 16, 14 10, 22 12 C16 16, 18 24, 24 26 C30 24, 32 16, 26 12 C34 10, 40 16, 40 24 C40 34, 30 40, 24 40Z" />
    <circle cx="24" cy="22" r="3" fill="currentColor" stroke="none" />
  </svg>
)

const IconInstall = () => (
  <svg className="bb-service-card__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ color: 'var(--bb-gold)' }}>
    <rect x="6" y="6" width="36" height="36" rx="2" />
    <path d="M6 18 L42 18" />
    <circle cx="17" cy="29" r="4.5" />
    <circle cx="31" cy="29" r="4.5" />
    <line x1="17" y1="33.5" x2="17" y2="38" />
    <line x1="31" y1="33.5" x2="31" y2="38" />
  </svg>
)

const IconArrow = () => (
  <svg className="bb-service-card__arrow" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <path d="M6 16 L26 16 M18 8 L26 16 L18 24" />
  </svg>
)

const StarIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

// ─── CSS Balloon Cluster (About Section) ─────────────────────────────────────
function BalloonCluster() {
  return (
    <div className="bb-about__balloon-cluster" aria-hidden="true">
      <div className="bb-balloon bb-balloon--light"
        style={{ width: 130, height: 150, top: 40, left: 80, animation: 'bb-float-3 7s cubic-bezier(0.45, 0, 0.55, 1) infinite' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--blush"
        style={{ width: 110, height: 126, top: 20, left: 240, animation: 'bb-float-1 9s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.5s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--pink"
        style={{ width: 95, height: 109, top: 60, right: 20, animation: 'bb-float-2 8s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.8s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--blush"
        style={{ width: 150, height: 172, top: 160, left: 20, animation: 'bb-float-1 8.5s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.4s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--rose"
        style={{ width: 120, height: 138, top: 180, left: 180, animation: 'bb-float-3 7.5s cubic-bezier(0.45, 0, 0.55, 1) infinite 2s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--deep"
        style={{ width: 100, height: 115, top: 200, left: 320, animation: 'bb-float-2 9.5s cubic-bezier(0.45, 0, 0.55, 1) infinite 1s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--light"
        style={{ width: 85, height: 98, top: 330, left: 100, animation: 'bb-float-1 10s cubic-bezier(0.45, 0, 0.55, 1) infinite 0.6s' }}>
        <div className="bb-balloon__shine" />
      </div>
      <div className="bb-balloon bb-balloon--pink"
        style={{ width: 75, height: 86, top: 350, left: 250, animation: 'bb-float-3 8s cubic-bezier(0.45, 0, 0.55, 1) infinite 1.8s' }}>
        <div className="bb-balloon__shine" />
      </div>
    </div>
  )
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
const TICKER_ITEMS = [
  'Balloon Arches', 'Organic Designs', 'Balloon Walls', 'Event Installations',
  'Birthday Parties', 'Weddings', 'Baby Showers', 'Corporate Events',
  'Custom Orders', 'Same-Day Setup', 'Full-Service Styling',
]

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="bb-ticker" aria-hidden="true">
      <div className="bb-ticker__track">
        {doubled.map((item, i) => (
          <span key={i} className="bb-ticker__item">
            {item}
            <span className="bb-ticker__dot" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    Icon: IconArch,
    title: 'Balloon Arches',
    desc: 'Grand entrances and ceremony arches that command attention. Organic, classic, or spiral — designed to frame your most important moments.',
  },
  {
    num: '02',
    Icon: IconWall,
    title: 'Balloon Walls',
    desc: 'Lush, floor-to-ceiling backdrops perfect for photo opportunities. Custom colors and textures tailored to your vision.',
  },
  {
    num: '03',
    Icon: IconOrganic,
    title: 'Organic Designs',
    desc: 'Nature-inspired arrangements with flowing, unpredictable forms. Each installation is one-of-a-kind, never replicated.',
  },
  {
    num: '04',
    Icon: IconInstall,
    title: 'Event Installations',
    desc: 'Full venue transformations — from intimate dinner parties to grand ballroom galas. We handle every detail of your decor.',
  },
]

function Services() {
  return (
    <section className="bb-services" id="services">
      <div className="bb-services__top">
        <div>
          <span className="bb-section-eyebrow">What We Create</span>
          <h2 className="bb-section-title">
            Every Detail,<br /><em>Perfectly Inflated</em>
          </h2>
        </div>
        <p className="bb-services__intro">
          Each installation is designed from scratch — no templates, no catalog orders. We show up early, handle every detail, and leave before your first guest arrives.
        </p>
      </div>

      <div className="bb-services__list">
        {SERVICES.map((s) => (
          <a key={s.num} href="#contact" className="bb-service-row">
            <span className="bb-service-row__num">{s.num}</span>
            <div className="bb-service-row__center">
              <h3 className="bb-service-row__title">{s.title}</h3>
            </div>
            <p className="bb-service-row__desc">{s.desc}</p>
            <span className="bb-service-row__arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 10h14M10 3l7 7-7 7" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

// ─── Gallery ──────────────────────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { bg: 'wedding',   label: 'Wedding',       title: 'Golden Arch Ceremony' },
  { bg: 'baby',      label: 'Baby Shower',   title: 'Blush & Gold Reveal'  },
  { bg: 'birthday',  label: 'Birthday',      title: 'Lavender Dreams'      },
  { bg: 'corporate', label: 'Corporate',     title: 'Brand Activation'     },
  { bg: 'bridal',    label: 'Bridal Shower', title: 'She Said Yes Arch'    },
  { bg: 'sweet16',   label: 'Sweet 16',      title: 'Champagne & Peach'    },
  { bg: 'babyboy',   label: 'Baby Shower',   title: 'Little One Is Coming' },
  { bg: 'party',     label: 'Party',         title: 'Garden Celebration'   },
]

function Gallery() {
  return (
    <section className="bb-gallery" id="gallery">
      <div className="bb-gallery__header">
        <div>
          <span className="bb-section-eyebrow">Our Portfolio</span>
          <h2 className="bb-section-title">From Our Studio<br /><em style={{ color: 'var(--bb-blush)' }}>to Your Celebration</em></h2>
        </div>
        <a href="#contact" className="bb-btn bb-btn--ghost">Book Yours</a>
      </div>
      <div className="bb-gallery__grid">
        {GALLERY_ITEMS.map((item, i) => (
          <div key={i} className="bb-gallery__item">
            <div className={`bb-gallery__item-bg bb-gallery__bg--${item.bg}`} />
            <div className="bb-gallery__item-overlay">
              <span className="bb-gallery__item-label">{item.label}</span>
              <span className="bb-gallery__item-title">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bb-gallery__footer">
        <a href="#contact" className="bb-btn bb-btn--primary">Start Your Design</a>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!statsRef.current) return

    const statEls = Array.from(statsRef.current.querySelectorAll('.bb-stat__num'))
    statEls.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10)
      const obj = { val: 0 }
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate() {
              const span = el.querySelector('.num-val')
              if (span) span.textContent = Math.round(obj.val).toString()
            },
          })
        },
      })
    })
  }, [])

  return (
    <section className="bb-about" id="about">
      <div className="bb-about__content">
        <p className="bb-about__pull-quote">
          We don't just decorate spaces — we craft <strong>emotions you'll remember</strong> long after the last balloon has floated away.
        </p>
        <p className="bb-about__body">
          Founded with a passion for celebration and an obsession with detail, Bubbly Balloons Studio has become the trusted name in balloon artistry across the region. Every installation is hand-designed, color-matched, and set up with white-glove care so you can focus on what matters — the people you're celebrating.
        </p>
        <a href="#contact" className="bb-btn bb-btn--outline-dark">Get in Touch</a>

        <div className="bb-about__stats" ref={statsRef}>
          <div className="bb-stat">
            <div className="bb-stat__num" data-target="500">
              <span className="num-val">0</span><span>+</span>
            </div>
            <div className="bb-stat__label">Events Styled</div>
          </div>
          <div className="bb-stat">
            <div className="bb-stat__num" data-target="8">
              <span className="num-val">0</span>
            </div>
            <div className="bb-stat__label">Years of Artistry</div>
          </div>
          <div className="bb-stat">
            <div className="bb-stat__num" data-target="100">
              <span className="num-val">0</span><span>%</span>
            </div>
            <div className="bb-stat__label">Client Satisfaction</div>
          </div>
        </div>
      </div>

      <BalloonCluster />
    </section>
  )
}

// ─── Process ──────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    title: 'Consultation',
    desc: 'We start with a complimentary design consultation to understand your vision, event theme, and space requirements.',
  },
  {
    num: '02',
    title: 'Custom Design',
    desc: 'Our team crafts a tailored design proposal with color palette, installation layout, and balloon selection.',
  },
  {
    num: '03',
    title: 'Day-of Setup',
    desc: 'We arrive early, handle every detail of installation, and ensure everything looks perfect before your guests arrive.',
  },
  {
    num: '04',
    title: 'Enjoy & Celebrate',
    desc: 'You celebrate. We handle teardown at the end of the event — completely stress-free for you.',
  },
]

function Process() {
  return (
    <section className="bb-process" id="process">
      <div className="bb-process__header">
        <span className="bb-section-eyebrow" style={{ color: 'var(--bb-champagne)' }}>How It Works</span>
        <h2 className="bb-section-title" style={{ color: 'var(--bb-cream)' }}>
          From Vision<br /><em style={{ fontStyle: 'italic', color: 'var(--bb-blush)' }}>to Celebration</em>
        </h2>
      </div>
      <div className="bb-process__grid">
        {STEPS.map((step) => (
          <div key={step.num} className="bb-process__step">
            <div className="bb-process__num">{step.num}</div>
            <h3 className="bb-process__step-title">{step.title}</h3>
            <p className="bb-process__step-desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    text: "The balloon arch at my daughter's wedding was absolutely breathtaking. Every guest asked who designed it. Bubbly Balloons Studio exceeded every expectation.",
    name: 'Sarah M.',
    event: 'Wedding · June 2024',
    initials: 'SM',
    avatarBg: 'linear-gradient(135deg, #F2C4CE, #D07090)',
  },
  {
    text: "I've used Bubbly Balloons for three corporate events now. The professionalism, creativity, and attention to our brand colors is unmatched. They are the best.",
    name: 'David Chen',
    event: 'Corporate Event · March 2024',
    initials: 'DC',
    avatarBg: 'linear-gradient(135deg, #B8D8E8, #5898C8)',
  },
  {
    text: "My daughter's quinceañera was a dream come true. The organic balloon installation transformed the venue into something out of a fairytale. We are forever grateful.",
    name: 'Maria R.',
    event: 'Quinceañera · November 2023',
    initials: 'MR',
    avatarBg: 'linear-gradient(135deg, #C8B8E8, #9888C0)',
  },
]

function Testimonials() {
  return (
    <section className="bb-testimonials" id="testimonials">
      <span className="bb-section-eyebrow">Client Love</span>
      <h2 className="bb-section-title">
        They Said It Better<br /><em>Than We Ever Could</em>
      </h2>
      <div className="bb-testimonials__grid">
        {TESTIMONIALS.map((t, i) => (
          <div key={i} className="bb-testimonial-card">
            <span className="bb-testimonial-card__quote-mark" aria-hidden="true">"</span>
            <p className="bb-testimonial-card__text">{t.text}</p>
            <div className="bb-testimonial-card__stars" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, si) => <StarIcon key={si} />)}
            </div>
            <div className="bb-testimonial-card__author">
              <div
                className="bb-testimonial-card__avatar"
                style={{ background: t.avatarBg }}
                aria-hidden="true"
              >
                {t.initials}
              </div>
              <div>
                <div className="bb-testimonial-card__name">{t.name}</div>
                <div className="bb-testimonial-card__event">{t.event}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTA() {
  const btnRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = btnRef.current
    if (!wrapper) return
    const btn = wrapper.querySelector<HTMLElement>('.bb-btn')
    if (!btn) return

    const onMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
    }

    wrapper.addEventListener('mousemove', onMove)
    wrapper.addEventListener('mouseleave', onLeave)
    return () => {
      wrapper.removeEventListener('mousemove', onMove)
      wrapper.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <section className="bb-cta">
      <div className="bb-cta__bg" aria-hidden="true" />
      <span className="bb-cta__eyebrow">Your Vision. Our Craft.</span>
      <h2 className="bb-cta__title">
        One Conversation Away<br /><em>From the Installation of Your Dreams</em>
      </h2>
      <p className="bb-cta__sub">
        Tell us about your event and we'll reach out within 24 hours to schedule your complimentary design consultation — no commitment required.
      </p>
      <div className="bb-cta__ctas">
        <div ref={btnRef} className="bb-btn-magnetic">
          <a href="#contact" className="bb-btn bb-btn--primary" style={{ fontSize: '12px', padding: '18px 44px' }}>
            Book a Consultation
          </a>
        </div>
        <a href="tel:+15551234567" className="bb-btn bb-btn--ghost">Call Us Directly</a>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg className="bb-contact__detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </svg>
)
const MailIcon = () => (
  <svg className="bb-contact__detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)
const PinIcon = () => (
  <svg className="bb-contact__detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)
const ClockIcon = () => (
  <svg className="bb-contact__detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

function Contact() {
  return (
    <section className="bb-contact" id="contact">
      <div>
        <h2 className="bb-contact__info-title">
          Let's Plan Your<br />Perfect Celebration
        </h2>
        <p className="bb-contact__info-sub">
          Fill out the form and one of our balloon artistry specialists will reach out within 24 hours to schedule your complimentary consultation.
        </p>
        <div className="bb-contact__details">
          <div className="bb-contact__detail">
            <PhoneIcon />
            <div>
              <div className="bb-contact__detail-label">Phone</div>
              <div className="bb-contact__detail-value">(555) 123-4567</div>
            </div>
          </div>
          <div className="bb-contact__detail">
            <MailIcon />
            <div>
              <div className="bb-contact__detail-label">Email</div>
              <div className="bb-contact__detail-value">hello@bubblyballoonsstudio.com</div>
            </div>
          </div>
          <div className="bb-contact__detail">
            <PinIcon />
            <div>
              <div className="bb-contact__detail-label">Service Area</div>
              <div className="bb-contact__detail-value">Greater Metropolitan Area & Surrounding Cities</div>
            </div>
          </div>
          <div className="bb-contact__detail">
            <ClockIcon />
            <div>
              <div className="bb-contact__detail-label">Hours</div>
              <div className="bb-contact__detail-value">Mon–Sat: 9AM–7PM · Sun: By Appointment</div>
            </div>
          </div>
        </div>
      </div>

      <form className="bb-contact__form" onSubmit={(e) => e.preventDefault()}>
        <div className="bb-form-row">
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-first-name">First Name</label>
            <input id="bb-first-name" type="text" className="bb-form-input" placeholder="Sarah" autoComplete="given-name" />
          </div>
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-last-name">Last Name</label>
            <input id="bb-last-name" type="text" className="bb-form-input" placeholder="Johnson" autoComplete="family-name" />
          </div>
        </div>
        <div className="bb-form-row">
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-email">Email Address</label>
            <input id="bb-email" type="email" className="bb-form-input" placeholder="sarah@email.com" autoComplete="email" />
          </div>
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-phone">Phone Number</label>
            <input id="bb-phone" type="tel" className="bb-form-input" placeholder="(555) 000-0000" autoComplete="tel" />
          </div>
        </div>
        <div className="bb-form-group">
          <label className="bb-form-label" htmlFor="bb-event-type">Event Type</label>
          <select id="bb-event-type" className="bb-form-select bb-form-input">
            <option value="">Select your event type…</option>
            <option value="wedding">Wedding</option>
            <option value="birthday">Birthday Party</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="quinceañera">Quinceañera</option>
            <option value="corporate">Corporate Event</option>
            <option value="bridal">Bridal Shower</option>
            <option value="graduation">Graduation</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="bb-form-row">
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-event-date">Event Date</label>
            <input id="bb-event-date" type="date" className="bb-form-input" />
          </div>
          <div className="bb-form-group">
            <label className="bb-form-label" htmlFor="bb-guest-count">Approximate Guest Count</label>
            <select id="bb-guest-count" className="bb-form-select bb-form-input">
              <option value="">Select range…</option>
              <option>Under 25</option>
              <option>25–50</option>
              <option>50–100</option>
              <option>100–200</option>
              <option>200+</option>
            </select>
          </div>
        </div>
        <div className="bb-form-group">
          <label className="bb-form-label" htmlFor="bb-message">Tell Us About Your Vision</label>
          <textarea
            id="bb-message"
            className="bb-form-textarea"
            placeholder="Describe your dream event, color palette, theme, or any inspiration you have in mind…"
            rows={5}
          />
        </div>
        <button type="submit" className="bb-btn bb-btn--dark" style={{ width: '100%', fontSize: '12px', padding: '18px' }}>
          Request My Consultation →
        </button>
        <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--bb-gray-light)', marginTop: '14px', letterSpacing: '0.04em' }}>
          We respond within 24 hours. No spam.
        </p>
      </form>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)
const FBIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
)
const PinIcon2 = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

function Footer() {
  return (
    <footer className="bb-footer">
      <div className="bb-footer__top">
        <div className="bb-footer__brand">
          <div className="bb-footer__logo">
            Bubbly <span>Balloons</span> Studio
          </div>
          <p className="bb-footer__tagline">
            Bespoke balloon artistry for life's most beautiful celebrations. Where every detail floats perfectly.
          </p>
          <div className="bb-footer__social" style={{ marginTop: 28 }}>
            <a href="https://www.bubblyballoonsstudio.com" className="bb-footer__social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <IGIcon />
            </a>
            <a href="https://www.bubblyballoonsstudio.com" className="bb-footer__social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FBIcon />
            </a>
            <a href="https://www.bubblyballoonsstudio.com" className="bb-footer__social-link" aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
              <PinIcon2 />
            </a>
          </div>
        </div>

        <div>
          <div className="bb-footer__col-title">Services</div>
          <ul className="bb-footer__links">
            {['Balloon Arches', 'Balloon Walls', 'Organic Designs', 'Event Installations', 'Custom Orders', 'Corporate Events'].map(l => (
              <li key={l}><a href="#services">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="bb-footer__col-title">Company</div>
          <ul className="bb-footer__links">
            {['About Us', 'Gallery', 'Our Process', 'Testimonials', 'FAQ', 'Blog'].map(l => (
              <li key={l}><a href="#about">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <div className="bb-footer__col-title">Contact</div>
          <ul className="bb-footer__links">
            <li><a href="tel:+15551234567">(555) 123-4567</a></li>
            <li><a href="mailto:hello@bubblyballoonsstudio.com">hello@bubblyballoonsstudio.com</a></li>
            <li><a href="#contact">Book a Consultation</a></li>
            <li><a href="#contact">Get a Quote</a></li>
          </ul>
        </div>
      </div>

      <div className="bb-footer__bottom">
        <p className="bb-footer__copy">© {new Date().getFullYear()} Bubbly Balloons Studio. All rights reserved.</p>
        <div className="bb-footer__bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────
function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return
    const onScroll = () => {
      nav.classList.toggle('bb-nav--scrolled', window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="bb-nav" ref={navRef} role="navigation" aria-label="Main navigation">
      <a href="#home" className="bb-nav__logo" aria-label="Bubbly Balloons Studio - home">
        Bubbly <span>Balloons</span>
      </a>
      <ul className="bb-nav__links">
        {['Services', 'Gallery', 'About', 'Process', 'Contact'].map(link => (
          <li key={link}>
            <a href={`#${link.toLowerCase()}`}>{link}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="bb-nav__cta">Book Now</a>
      <button className="bb-nav__mobile-toggle" aria-label="Open menu">
        <span className="bb-nav__mobile-toggle__line" />
        <span className="bb-nav__mobile-toggle__label">Menu</span>
      </button>
    </nav>
  )
}

// ─── Scroll Reveal Hook — wrapped in gsap.context() for React cleanup ─────────
function useScrollReveal() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service rows: stagger 0.06s, y:48 → 0
      gsap.utils.toArray<Element>('.bb-service-row').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: EASE_ENTER, delay: i * 0.06,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true, invalidateOnRefresh: true } }
        )
      })

      // Gallery items: scale 1.08→1 + y:24 (image unmask feel)
      gsap.utils.toArray<Element>('.bb-gallery__item').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 24, opacity: 0, scale: 1.04 },
          { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: EASE_ENTER, delay: i * 0.04,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true, invalidateOnRefresh: true } }
        )
      })

      // Process steps: slide from left, stagger 0.08s
      gsap.utils.toArray<Element>('.bb-process__step').forEach((el, i) => {
        gsap.fromTo(el,
          { x: -24, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: EASE_ENTER, delay: i * 0.08,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true, invalidateOnRefresh: true } }
        )
      })

      // Testimonials: y:40, stagger 0.1s
      gsap.utils.toArray<Element>('.bb-testimonial-card').forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: EASE_ENTER, delay: i * 0.1,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true, invalidateOnRefresh: true } }
        )
      })

      // Section headers
      gsap.utils.toArray<Element>('.bb-section-title').forEach((el) => {
        gsap.fromTo(el,
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: EASE_ENTER,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true, invalidateOnRefresh: true } }
        )
      })

      // About content, contact form
      ;['.bb-about__content', '.bb-contact__form'].forEach(sel => {
        const el = document.querySelector(sel)
        if (!el) return
        gsap.fromTo(el,
          { y: 36, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.0, ease: EASE_ENTER,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true, invalidateOnRefresh: true } }
        )
      })

      // Hero parallax depth separation — canvas moves slower than text (Z-axis illusion)
      const heroContent = document.querySelector('.bb-hero__content')
      const heroCanvas  = document.querySelector('.bb-hero__canvas')
      const heroSection = document.querySelector('.bb-hero')
      if (heroSection) {
        // Text lifts + fades faster
        if (heroContent) {
          gsap.to(heroContent, {
            y: -64, opacity: 0, ease: 'none',
            scrollTrigger: {
              trigger: heroSection, start: 'center top', end: 'bottom top', scrub: 1,
            },
          })
        }
        // Canvas drifts slower — creates depth between balloons and text
        if (heroCanvas) {
          gsap.to(heroCanvas, {
            y: -28, ease: 'none',
            scrollTrigger: {
              trigger: heroSection, start: 'top top', end: 'bottom top', scrub: 1,
            },
          })
        }
      }

      // Marquee velocity skew — Blueprint 4
      const proxy = { skew: 0 }
      const skewSetter = gsap.quickSetter('.bb-ticker__track', 'skewX', 'deg')
      const clamp = gsap.utils.clamp(-12, 12)
      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -80)
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: 'power3',
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew),
            })
          }
        },
      })
    })

    return () => ctx.revert()
  }, [])
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BubblyBalloonsPage() {
  useScrollReveal()

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time: number) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000))
    }
  }, [])

  return (
    <div className="bb-page">
      <BalloonCursor />
      <Nav />
      <BalloonHero />
      <Ticker />
      <Services />
      <Gallery />
      <About />
      <Process />
      <Testimonials />
      <BalloonFAQ />
      <CTA />
      <Contact />
      <Footer />
    </div>
  )
}
