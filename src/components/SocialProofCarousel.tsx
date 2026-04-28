import { AnimatedTestimonials } from './ui/AnimatedTestimonials'

const testimonials = [
  {
    quote: "These guys genuinely understand retention. Our email revenue went from background noise to 40% of total. The briefs, the angles, the sequences — all of it just hits different when someone actually knows DTC.",
    name: 'WILL',
    designation: 'FOUNDER · XYKO · FASHION & LIFESTYLE',
    src: '/slice1.png',
  },
  {
    quote: "Working with CMD.CTRL was the best marketing decision we made this year. The campaigns are intelligent, the creative is sharp, and they actually care about results. Not just deliverables.",
    name: 'ANGUS',
    designation: 'CEO · MKTG EMAILS',
    src: '/slice8.png',
  },
  {
    quote: "We went from barely using email to it being our highest-ROI channel in under 90 days. The win-back alone paid for everything 3x over.",
    name: 'STEPHEN MURPHY',
    designation: 'FOUNDER · MADCOW COLLARS · PET ACCESSORIES',
    src: '/slice15.png',
  },
  {
    quote: "I've worked with agencies that talk a big game. CMD.CTRL just executes. Our Klaviyo revenue is up 554% and the creative quality is something I'm genuinely proud to show people.",
    name: 'SEAN',
    designation: 'FOUNDER · HEALTHMATE SAUNA',
    src: '/slice22.png',
  },
]

export default function SocialProofCarousel() {
  return (
    <section style={{ padding: '120px 32px', background: '#0A0A0A', borderTop: '1px solid rgba(255,0,0,0.08)' }}>

      <div style={{ textAlign: 'center', marginBottom: '72px' }}>
        <div className="section-label" style={{ marginBottom: '16px' }}>
          STRAIGHT FROM THE SOURCE
        </div>
        <h2 style={{ fontFamily: "'Black Han Sans',sans-serif", fontSize: 'clamp(40px,6vw,76px)', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 0.93, margin: 0, textShadow: '0 0 40px rgba(255,0,0,0.2)' }}>
          DON'T TAKE OUR{' '}
          <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontWeight: 700, color: '#FFFFFF', textTransform: 'none' }}>
            word
          </span>
          {' '}FOR IT.
        </h2>
      </div>

      <AnimatedTestimonials
        testimonials={testimonials}
        autoplay
        autoplayInterval={5500}
      />

    </section>
  )
}
