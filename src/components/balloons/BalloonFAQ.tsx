import { useState } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────
const FAQ_DATA = [
  {
    category: "Booking & Pricing",
    items: [
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 3-4 weeks in advance for standard events, and 6-8 weeks for large-scale weddings or corporate installations. Peak season (May-September) fills up quickly - the earlier, the better.",
      },
      {
        q: "Do you require a deposit to hold my date?",
        a: "Yes, we require a 50% deposit to secure your date. The remaining balance is due 7 days before your event. We accept all major credit cards, Venmo, Zelle, and cash.",
      },
      {
        q: "What is your cancellation policy?",
        a: "Cancellations made more than 14 days before the event receive a full deposit refund. Cancellations within 14 days are non-refundable, but we are happy to reschedule you for a future date subject to availability.",
      },
      {
        q: "Do you offer packages or is everything custom-quoted?",
        a: "We offer starting packages for common requests (arches, small columns, garlands) as well as fully custom quotes for larger or more complex installations. Contact us for a complimentary consultation and quote.",
      },
    ],
  },
  {
    category: "Design & Customization",
    items: [
      {
        q: "Can I request specific colors or match a theme?",
        a: "Absolutely. We work from Pantone swatches, HEX codes, inspiration photos, or just a vibe description. Our balloon inventory spans hundreds of colors including standard latex, chrome metallics, transparents, and specialty finishes.",
      },
      {
        q: "Do you offer custom shapes, characters, or branded elements?",
        a: "Yes - we create custom balloon sculptures, number and letter displays, character figures, and branded installations for corporate events. For complex custom pieces, we ask for at least 4 weeks lead time.",
      },
      {
        q: "Can I see a design mockup or mood board before my event?",
        a: "For larger installations (weddings, galas, corporate), we provide a digital design concept as part of your consultation. For standard orders, we work closely with you to ensure we capture your vision before the big day.",
      },
      {
        q: "What balloon finishes do you carry?",
        a: "We carry matte latex, glossy latex, chrome/mirror metallics, pastel mattes, confetti-filled transparents, bubble balloons, foil shapes, and specialty organic-style balloons. We love mixing textures for organic cloud-like arrangements.",
      },
    ],
  },
  {
    category: "Setup & Logistics",
    items: [
      {
        q: "Do you deliver and set up, or is pickup available?",
        a: "Both options are available. For installations like arches, walls, and ceiling decor, we always provide full delivery and setup. Pre-made centerpiece arrangements and balloon bunches can be picked up from our studio.",
      },
      {
        q: "How long does setup take?",
        a: "Setup time depends on the size of the installation. Simple balloon bunches take under an hour. Large arches or balloon walls typically take 2-3 hours. Full venue transformations can require 4-6 hours. We coordinate directly with your venue.",
      },
      {
        q: "How long will my balloons last?",
        a: "Latex balloons indoors last 8-12 hours. Foil/mylar balloons last several days to weeks. We use Hi-Float treatment on all latex to extend float time, and our outdoor installations use specially treated balloons rated for UV and temperature changes.",
      },
      {
        q: "Do you handle teardown after the event?",
        a: "Yes - teardown service is available as an add-on for an additional fee. We will coordinate with your venue to break down and remove all balloon decor at the scheduled time. We also offer eco-friendly balloon disposal.",
      },
    ],
  },
  {
    category: "Events & Service Area",
    items: [
      {
        q: "What types of events do you service?",
        a: "We do it all - weddings, quinceaneras, sweet 16s, baby showers, gender reveals, birthday parties, graduation celebrations, corporate events, grand openings, product launches, bridal showers, and holiday parties.",
      },
      {
        q: "Do you work with outdoor events?",
        a: "Yes, with some planning. Outdoor balloon decor requires consideration of heat, wind, and sun exposure. We recommend morning events for outdoor balloon-heavy setups, and we use reinforced anchoring and UV-treated materials for all outdoor installations.",
      },
      {
        q: "What is your service area?",
        a: "We service the greater metropolitan area and surrounding cities within a 60-mile radius. Travel fees apply for events beyond 25 miles. Contact us to confirm availability in your area.",
      },
    ],
  },
]

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="8" y1="1" x2="8" y2="15" />
    <line x1="1" y1="8" x2="15" y2="8" />
  </svg>
)

const CrossIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="1" y1="1" x2="13" y2="13" />
    <line x1="13" y1="1" x2="1" y2="13" />
  </svg>
)

// ─── Single Item ──────────────────────────────────────────────────────────────
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`bb-faq__item${open ? ' active' : ''}`}
      onClick={() => setOpen(!open)}
    >
      <div className="bb-faq__title">
        <span className="bb-faq__question">{q}</span>
        <button
          className="bb-faq__toggle"
          aria-expanded={open}
          aria-label={open ? 'Collapse' : 'Expand'}
          onClick={(e) => { e.stopPropagation(); setOpen(!open) }}
        >
          <span className={`bb-faq__toggle-icon bb-faq__toggle-icon--plus${open ? ' hidden' : ''}`}>
            <PlusIcon />
          </span>
          <span className={`bb-faq__toggle-icon bb-faq__toggle-icon--cross${open ? '' : ' hidden'}`}>
            <CrossIcon />
          </span>
        </button>
      </div>

      {/* grid-template-rows: 0fr → 1fr trick ripped from Aventura Dental Arts */}
      <div className="bb-faq__body">
        <div className="bb-faq__body-inner">
          <p className="bb-faq__answer">{a}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Category Block ───────────────────────────────────────────────────────────
function CategoryBlock({ category, items }: { category: string; items: { q: string; a: string }[] }) {
  return (
    <div className="bb-faq__category">
      <div className="bb-faq__category-label">{category}</div>
      <div className="bb-faq__list">
        {items.map((item, i) => (
          <AccordionItem key={i} {...item} />
        ))}
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function BalloonFAQ() {
  return (
    <section className="bb-faq" id="faq">
      <div className="bb-faq__header">
        <span className="bb-section-eyebrow">Got Questions?</span>
        <h2 className="bb-section-title">
          Everything You<br /><em>Need to Know</em>
        </h2>
        <p className="bb-section-sub">
          Can't find your answer? <a href="#contact" className="bb-faq__contact-link">Send us a message</a> — we respond within 24 hours.
        </p>
      </div>

      <div className="bb-faq__grid">
        {FAQ_DATA.map((block) => (
          <CategoryBlock key={block.category} {...block} />
        ))}
      </div>
    </section>
  )
}
