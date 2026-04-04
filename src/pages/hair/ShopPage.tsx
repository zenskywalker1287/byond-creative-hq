import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HairNav from '../../components/hair/HairNav'
import HairFooter from '../../components/hair/HairFooter'
import AnnouncementBar from '../../components/hair/AnnouncementBar'

gsap.registerPlugin(ScrollTrigger)

const products = [
  { slug: 'brazilian-body-wave', name: 'Brazilian Body Wave', tagline: 'Bouncy + Voluminous Texture', price: '$89', badge: 'Best Seller', img: '/images/brazilian_body_wave.jpeg', category: 'Brazilian' },
  { slug: 'brazilian-deep-wave', name: 'Brazilian Deep Wave', tagline: 'Deep Curl + Long Lasting', price: '$94', badge: null, img: '/images/brazilian_deep_wave_bundles.jpeg', category: 'Brazilian' },
  { slug: 'brazilian-straight', name: 'Brazilian Straight', tagline: 'Silky Smooth + Natural Shine', price: '$87', badge: null, img: '/images/brazilian_straight_bundles.jpeg', category: 'Brazilian' },
  { slug: 'brazilian-kinky-curly', name: 'Brazilian Kinky Curly', tagline: 'Natural Coil Pattern', price: '$97', badge: null, img: '/images/brazilian_kinky_curly.jpeg', category: 'Brazilian' },
  { slug: 'brazilian-loose-wave', name: 'Brazilian Loose Wave', tagline: 'Effortless + Romantic Waves', price: '$91', badge: null, img: '/images/brazilian_loose_wave_bundles.jpeg', category: 'Brazilian' },
  { slug: 'brazilian-jerry-curl', name: 'Brazilian Jerry Curl', tagline: 'Defined Spiral Curls', price: '$95', badge: null, img: '/images/brazilian_jerry_curl_bundles.jpeg', category: 'Brazilian' },
  { slug: 'raw-body-wave', name: 'Raw Body Wave', tagline: '100% Raw Virgin Hair', price: '$119', badge: 'Raw', img: '/images/raw_body_wave_bundles.jpeg', category: 'Raw' },
  { slug: 'raw-burmese-curl', name: 'Raw Burmese Curl', tagline: 'Unprocessed Burmese Texture', price: '$129', badge: 'Raw', img: '/images/raw_burmese_curl_bundles.jpeg', category: 'Raw' },
  { slug: 'raw-kinky-straight', name: 'Raw Kinky Straight', tagline: 'Raw + Sleek Straight Finish', price: '$117', badge: 'Raw', img: '/images/raw_kinky_straight_bundles.jpeg', category: 'Raw' },
  { slug: 'raw-straight', name: 'Raw Straight', tagline: 'Pure + Unprocessed Straight', price: '$114', badge: 'Raw', img: '/images/raw_straight_bundles.jpeg', category: 'Raw' },
  { slug: 'blonde-body-wave-frontal', name: 'Blonde Body Wave Frontal', tagline: '613 Lace Frontal + Body Wave', price: '$149', badge: 'Hot', img: '/images/blonde_body_wave_frontal.jpeg', category: 'Blonde' },
  { slug: 'blonde-613-bundles', name: 'Blonde 613 Bundles', tagline: 'Full Honey Blonde Set', price: '$139', badge: 'Hot', img: '/images/blonde_brazilian_bundles_613.jpeg', category: 'Blonde' },
]

const categories = ['All', 'Brazilian', 'Raw', 'Blonde']

export default function ShopPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.shop-product-card', {
        y: 50, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.shop-grid', start: 'top 85%' }
      })
      gsap.from('.shop-hero-text', { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <AnnouncementBar />
      <HairNav />

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #E5187F 0%, #FF6BB5 50%, #FFB3D9 100%)',
        padding: '80px 40px 60px',
        textAlign: 'center',
      }}>
        <div className="shop-hero-text">
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', marginBottom: '12px' }}>
            Rich Hair City
          </p>
          <h1 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(56px, 10vw, 120px)',
            color: '#fff',
            textTransform: 'uppercase',
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}>
            THE VAULT.
          </h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '15px', color: 'rgba(255,255,255,0.85)', maxWidth: '460px', margin: '0 auto' }}>
            Filter by origin, texture, or status. Elite hair for the woman who demands more from her reflection.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        padding: '0 40px',
        display: 'flex',
        gap: '32px',
        alignItems: 'center',
      }}>
        {categories.map(cat => (
          <button key={cat} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            background: 'none',
            border: 'none',
            padding: '20px 0',
            color: cat === 'All' ? '#E5187F' : '#999',
            borderBottom: cat === 'All' ? '2px solid #E5187F' : '2px solid transparent',
            cursor: 'pointer',
          }}>{cat}</button>
        ))}
        <span style={{ marginLeft: 'auto', fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#999' }}>
          {products.length} products
        </span>
      </div>

      {/* Product grid */}
      <div className="shop-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        padding: '40px',
        gap: '24px',
      } as React.CSSProperties}>
        {products.map(product => (
          <Link key={product.slug} to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="shop-product-card" style={{ cursor: 'pointer' }}>
              {/* Image */}
              <div style={{
                height: '360px',
                borderRadius: '20px',
                overflow: 'hidden',
                position: 'relative',
                background: 'linear-gradient(135deg, #FFF0F7 0%, #FFE4F2 100%)',
                marginBottom: '16px',
              }}>
                {product.badge && (
                  <div style={{
                    position: 'absolute', top: '14px', left: '14px', zIndex: 2,
                    background: '#E5187F', color: '#fff',
                    fontFamily: "'Poppins', sans-serif", fontSize: '9px', fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    padding: '5px 12px', borderRadius: '20px',
                  }}>{product.badge}</div>
                )}
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
              </div>
              {/* Info */}
              <div style={{ padding: '0 4px' }}>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '10px', color: '#E5187F', fontStyle: 'italic', marginBottom: '4px' }}>
                  Rich Hair City
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '4px' }}>
                  {product.name}
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#999', marginBottom: '14px' }}>
                  {product.tagline}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '16px', fontWeight: 800, color: '#1A1A1A' }}>
                    {product.price}
                  </span>
                  <button style={{
                    background: '#E5187F', color: '#fff', border: 'none',
                    padding: '10px 20px', borderRadius: '20px',
                    fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.07em', textTransform: 'uppercase', cursor: 'pointer',
                  }}>Add to Cart</button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <HairFooter />
    </div>
  )
}
