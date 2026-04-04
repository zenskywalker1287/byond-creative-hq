import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HairNav from '../../components/hair/HairNav'
import HairFooter from '../../components/hair/HairFooter'
import AnnouncementBar from '../../components/hair/AnnouncementBar'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: '✦', title: 'EMPIRE BUILDING', body: "We don't just provide hair; we provide the confidence to build your legacy. Your crown is the foundation of your empire." },
  { icon: '✦', title: 'TECHNICAL PRECISION', body: 'Every strand is vetted for density, strength, and luster. No filler bundles. No shortcuts. Only the elite tier.' },
  { icon: '✦', title: 'UNAPOLOGETIC LUXURY', body: "We don't apologize for being the best. Neither should you. Own your room. Own your reflection." },
  { icon: '✦', title: 'ETHICALLY SOURCED', body: 'Single-donor raw hair, harvested responsibly. We went to the source so you never have to question what you\'re wearing.' },
]

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.about-hero-text > *', { y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' })
      gsap.from('.value-card', {
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.values-section', start: 'top 80%' }
      })
      gsap.from('.about-story-image', {
        x: -60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-story-section', start: 'top 75%' }
      })
      gsap.from('.about-story-text', {
        x: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-story-section', start: 'top 75%' }
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <AnnouncementBar />
      <HairNav />

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #2D1A2E 60%, #E5187F 100%)',
        padding: '100px 40px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative large text */}
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(120px, 20vw, 280px)',
          color: 'rgba(255,255,255,0.04)', lineHeight: 1, textTransform: 'uppercase', pointerEvents: 'none',
        }}>RHC</div>

        <div className="about-hero-text" style={{ position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', letterSpacing: '0.24em', color: '#E5187F', textTransform: 'uppercase', marginBottom: '16px' }}>
            Our Story
          </p>
          <h1 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(52px, 10vw, 120px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
            marginBottom: '28px',
          }}>
            THE ARCHITECT<br />OF LUXURY.
          </h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontSize: '16px', color: 'rgba(255,255,255,0.75)',
            maxWidth: '540px', margin: '0 auto', lineHeight: 1.8,
          }}>
            We built a city where quality is the only currency. No middlemen. No fake labels. No low-grade blends.
          </p>
        </div>
      </div>

      {/* Brand story */}
      <div className="about-story-section" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '80px', padding: '100px 40px', maxWidth: '1200px', margin: '0 auto', alignItems: 'center',
      }}>
        <div className="about-story-image">
          <div style={{ borderRadius: '28px', overflow: 'hidden', height: '580px' }}>
            <img
              src="/images/generated/rhc-bonus-04-back-of-hair.jpg"
              alt="Rich Hair City brand story"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
        </div>
        <div className="about-story-text">
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: '#E5187F', textTransform: 'uppercase', marginBottom: '16px' }}>
            Founded with purpose
          </p>
          <h2 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            color: '#1A1A1A', textTransform: 'uppercase',
            lineHeight: 0.9, marginBottom: '28px',
          }}>
            WE BOTTLED<br />THE LUXURY.
          </h2>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: 1.85, color: '#555', marginBottom: '20px' }}>
            Founded by a visionary who saw the "luxury" hair market and realized it was anything but. We stripped away the middleman, the fake labels, and the low-grade blends.
          </p>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: 1.85, color: '#555', marginBottom: '20px' }}>
            We went to the source. We built a city where quality is the only currency — sourcing only the most resilient, ethically-harvested raw and virgin hair.
          </p>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', lineHeight: 1.85, color: '#999', fontStyle: 'italic', marginBottom: '40px' }}>
            "Your hair is the first thing they see before you even speak. It's your armor. It's your statement. It's your city."
          </p>
          <Link to="/shop">
            <button style={{
              background: '#E5187F', color: '#fff', border: 'none',
              padding: '16px 40px', borderRadius: '40px',
              fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
            }}>SHOP THE COLLECTION →</button>
          </Link>
        </div>
      </div>

      {/* Values */}
      <div className="values-section" style={{ background: '#FFF5F9', padding: '80px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: '#E5187F', textTransform: 'uppercase', marginBottom: '12px' }}>
            What we stand for
          </p>
          <h2 style={{
            fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(40px, 5vw, 64px)',
            color: '#1A1A1A', textTransform: 'uppercase', marginBottom: '48px',
          }}>OUR VALUES</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {values.map((v, i) => (
              <div key={i} className="value-card" style={{
                background: '#fff', borderRadius: '20px', padding: '32px 28px',
                border: '1px solid rgba(229, 24, 127, 0.1)',
              }}>
                <div style={{ fontSize: '24px', color: '#E5187F', marginBottom: '16px' }}>{v.icon}</div>
                <h3 style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 800,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px',
                }}>{v.title}</h3>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#666', lineHeight: 1.7 }}>
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        background: '#E5187F', padding: '60px 40px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px',
        textAlign: 'center',
      }}>
        {[
          { num: '5,000+', label: 'Happy Customers' },
          { num: '12', label: 'Bundle Textures' },
          { num: '3+', label: 'Years Life Span' },
        ].map((stat, i) => (
          <div key={i}>
            <div style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: 'clamp(48px, 6vw, 80px)', color: '#fff', lineHeight: 1 }}>
              {stat.num}
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '8px' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ padding: '100px 40px', textAlign: 'center', background: '#fff' }}>
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(48px, 8vw, 96px)',
          color: '#1A1A1A', textTransform: 'uppercase',
          lineHeight: 0.88, marginBottom: '32px',
        }}>READY TO GET<br />YOUR CROWN?</h2>
        <Link to="/shop">
          <button style={{
            background: '#E5187F', color: '#fff', border: 'none',
            padding: '20px 56px', borderRadius: '50px',
            fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700,
            letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
          }}>SHOP ALL BUNDLES →</button>
        </Link>
      </div>

      <HairFooter />
    </div>
  )
}
