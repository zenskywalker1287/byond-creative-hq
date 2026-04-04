import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import HairNav from '../../components/hair/HairNav'
import HairFooter from '../../components/hair/HairFooter'
import AnnouncementBar from '../../components/hair/AnnouncementBar'

const products: Record<string, {
  name: string; tagline: string; price: string; img: string;
  description: string; details: string[]; related: string[];
}> = {
  'brazilian-body-wave': {
    name: 'Brazilian Body Wave', tagline: 'Bouncy + Voluminous Texture', price: '$89',
    img: '/images/brazilian_body_wave.jpeg',
    description: 'Our Brazilian Body Wave bundles are the ultimate in bounce and volume. Sourced from a single donor, this hair is soft, tangle-free, and holds a curl beautifully. Whether you wear it natural or styled, this texture elevates every look.',
    details: ['100% Virgin Brazilian Hair', 'Tangle-free, Shedding-free', 'Can be dyed and bleached', 'Lengths: 12" – 30"', 'Machine double weft'],
    related: ['brazilian-deep-wave', 'brazilian-loose-wave', 'raw-body-wave'],
  },
  'brazilian-deep-wave': {
    name: 'Brazilian Deep Wave', tagline: 'Deep Curl + Long Lasting', price: '$94',
    img: '/images/brazilian_deep_wave_bundles.jpeg',
    description: 'Deep wave bundles with tight, defined curls that hold their pattern wash after wash. This texture gives maximum volume and a lush, full look that turns heads.',
    details: ['100% Virgin Brazilian Hair', 'Deep curl pattern — holds shape', 'Can be coloured and styled', 'Lengths: 12" – 28"', 'Machine double weft'],
    related: ['brazilian-body-wave', 'brazilian-kinky-curly', 'raw-burmese-curl'],
  },
  'brazilian-straight': {
    name: 'Brazilian Straight', tagline: 'Silky Smooth + Natural Shine', price: '$87',
    img: '/images/brazilian_straight_bundles.jpeg',
    description: 'Sleek, silky straight bundles with a natural shine that looks salon-fresh every day. Lay flat, blend seamlessly with your own hair, and style with heat without losing integrity.',
    details: ['100% Virgin Brazilian Hair', 'Natural shine, lays flat', 'Heat friendly up to 450°F', 'Lengths: 10" – 30"', 'Machine double weft'],
    related: ['raw-straight', 'raw-kinky-straight', 'brazilian-body-wave'],
  },
  'brazilian-kinky-curly': {
    name: 'Brazilian Kinky Curly', tagline: 'Natural Coil Pattern', price: '$97',
    img: '/images/brazilian_kinky_curly.jpeg',
    description: 'Bold, defined kinky curls that mimic the texture of natural 4A-4B hair. These bundles blend perfectly with natural hair and maintain their coil pattern when wet.',
    details: ['100% Virgin Brazilian Hair', 'Coily 4A-4B pattern', 'Water-activated curl definition', 'Lengths: 10" – 24"', 'Machine double weft'],
    related: ['raw-burmese-curl', 'brazilian-deep-wave', 'raw-kinky-straight'],
  },
  'brazilian-loose-wave': {
    name: 'Brazilian Loose Wave', tagline: 'Effortless + Romantic Waves', price: '$91',
    img: '/images/brazilian_loose_wave_bundles.jpeg',
    description: 'Soft, romantic loose waves with a natural movement that looks effortlessly beautiful. These bundles are perfect for everyday wear and style beautifully with minimal effort.',
    details: ['100% Virgin Brazilian Hair', 'Loose S-wave pattern', 'Soft, natural movement', 'Lengths: 12" – 28"', 'Machine double weft'],
    related: ['brazilian-body-wave', 'brazilian-deep-wave', 'raw-body-wave'],
  },
  'brazilian-jerry-curl': {
    name: 'Brazilian Jerry Curl', tagline: 'Defined Spiral Curls', price: '$95',
    img: '/images/brazilian_jerry_curl_bundles.jpeg',
    description: 'Classic jerry curl pattern with tight, bouncy spirals. Full of personality and perfect for a bold, voluminous style. Keeps its curl with just a little moisture.',
    details: ['100% Virgin Brazilian Hair', 'Tight spiral curl pattern', 'Moisture-responsive', 'Lengths: 10" – 24"', 'Machine double weft'],
    related: ['brazilian-kinky-curly', 'raw-burmese-curl', 'brazilian-deep-wave'],
  },
  'raw-body-wave': {
    name: 'Raw Body Wave', tagline: '100% Raw Virgin Hair', price: '$119',
    img: '/images/raw_body_wave_bundles.jpeg',
    description: 'Taken directly from a single donor, our raw body wave bundles are unprocessed and in their most natural state. The hair is thicker at the root, tapers naturally, and lasts for years with proper care.',
    details: ['100% Raw Single Donor Hair', 'Unprocessed — no chemicals', 'Thicker, longer lasting than virgin', 'Lengths: 12" – 30"', 'Hand-tied weft'],
    related: ['raw-straight', 'raw-burmese-curl', 'brazilian-body-wave'],
  },
  'raw-burmese-curl': {
    name: 'Raw Burmese Curl', tagline: 'Unprocessed Burmese Texture', price: '$129',
    img: '/images/raw_burmese_curl_bundles.jpeg',
    description: 'Sourced directly from Burma, this raw curl texture is unlike anything else. Naturally soft, full of body, and incredibly durable — these bundles are an investment that pays off for years.',
    details: ['100% Raw Burmese Hair', 'Naturally soft + full curl', 'Unprocessed single donor', 'Lengths: 10" – 26"', 'Hand-tied weft'],
    related: ['raw-body-wave', 'raw-kinky-straight', 'brazilian-kinky-curly'],
  },
  'raw-kinky-straight': {
    name: 'Raw Kinky Straight', tagline: 'Raw + Sleek Straight Finish', price: '$117',
    img: '/images/raw_kinky_straight_bundles.jpeg',
    description: 'The perfect blend — raw hair texture with a sleek, straight finish that sits beautifully. Slight kink gives it body and character. Blends effortlessly with relaxed or texlaxed natural hair.',
    details: ['100% Raw Single Donor Hair', 'Slight kink + straight finish', 'Natural body and movement', 'Lengths: 12" – 28"', 'Machine double weft'],
    related: ['raw-straight', 'brazilian-straight', 'raw-body-wave'],
  },
  'raw-straight': {
    name: 'Raw Straight', tagline: 'Pure + Unprocessed Straight', price: '$114',
    img: '/images/raw_straight_bundles.jpeg',
    description: 'Our raw straight bundles are the purest form of straight hair — unprocessed, full cuticle, single donor. Expect natural lustre, zero shedding, and a lifespan of 3+ years with proper care.',
    details: ['100% Raw Single Donor Hair', 'Full cuticle intact', 'Natural lustre, zero shedding', 'Lengths: 12" – 32"', 'Machine double weft'],
    related: ['raw-kinky-straight', 'brazilian-straight', 'raw-body-wave'],
  },
  'blonde-body-wave-frontal': {
    name: 'Blonde Body Wave Frontal', tagline: '613 Lace Frontal + Body Wave', price: '$149',
    img: '/images/blonde_body_wave_frontal.jpeg',
    description: 'Our 613 blonde body wave lace frontal gives you a flawless hairline and maximum versatility. Pre-bleached to a true honey blonde, this frontal pairs perfectly with your blonde bundles for a seamless install.',
    details: ['13x4 Lace Frontal', '613 Full Honey Blonde', 'Pre-bleached + pre-plucked', 'Body wave texture', 'Lengths: 12" – 22"'],
    related: ['blonde-613-bundles', 'brazilian-body-wave', 'raw-body-wave'],
  },
  'blonde-613-bundles': {
    name: 'Blonde 613 Bundles', tagline: 'Full Honey Blonde Set', price: '$139',
    img: '/images/blonde_brazilian_bundles_613.jpeg',
    description: 'Full honey blonde 613 bundles — bleached to perfection with no brassiness. These bundles are soft, full, and ready to install. Pair with our 613 frontal for a complete blonde look.',
    details: ['100% Virgin Brazilian Hair', '613 Full Honey Blonde', 'Pre-bleached, no brassiness', 'Lengths: 12" – 26"', 'Machine double weft'],
    related: ['blonde-body-wave-frontal', 'brazilian-body-wave', 'raw-body-wave'],
  },
}

const allProducts = [
  { slug: 'brazilian-body-wave', img: '/images/brazilian_body_wave.jpeg', name: 'Brazilian Body Wave', price: '$89' },
  { slug: 'brazilian-deep-wave', img: '/images/brazilian_deep_wave_bundles.jpeg', name: 'Brazilian Deep Wave', price: '$94' },
  { slug: 'raw-body-wave', img: '/images/raw_body_wave_bundles.jpeg', name: 'Raw Body Wave', price: '$119' },
]

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? products[slug] : null

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      gsap.from('.product-image', { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out' })
      gsap.from('.product-info', { x: 60, opacity: 0, duration: 0.9, ease: 'power3.out' })
    })
    return () => ctx.revert()
  }, [slug])

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 40px' }}>
        <h1 style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '48px' }}>Product not found</h1>
        <Link to="/shop">← Back to Shop</Link>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff', minHeight: '100vh' }}>
      <AnnouncementBar />
      <HairNav />

      {/* Breadcrumb */}
      <div style={{ padding: '20px 40px', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '12px', color: '#999' }}>
          <Link to="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
          {' '}/{' '}
          <Link to="/shop" style={{ color: '#999', textDecoration: 'none' }}>Shop</Link>
          {' '}/{' '}
          <span style={{ color: '#1A1A1A' }}>{product.name}</span>
        </span>
      </div>

      {/* Product layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '80px',
        padding: '60px 40px',
        maxWidth: '1200px',
        margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* Left: Image */}
        <div className="product-image">
          <div style={{
            borderRadius: '28px',
            overflow: 'hidden',
            height: '600px',
            background: 'linear-gradient(135deg, #FFF0F7 0%, #FFE4F2 100%)',
          }}>
            <img
              src={product.img}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-info">
          <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', color: '#E5187F', fontStyle: 'italic', marginBottom: '8px' }}>
            Rich Hair City
          </div>
          <h1 style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(36px, 4vw, 56px)',
            color: '#1A1A1A',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            letterSpacing: '-0.01em',
            marginBottom: '12px',
          }}>{product.name}</h1>
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#999', marginBottom: '24px' }}>
            {product.tagline}
          </p>

          {/* Price */}
          <div style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: '40px',
            color: '#E5187F',
            marginBottom: '32px',
          }}>{product.price}</div>

          {/* Length selector */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '10px' }}>
              Select Length
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['12"', '14"', '16"', '18"', '20"', '22"', '24"', '26"'].map(len => (
                <button key={len} style={{
                  padding: '8px 14px', borderRadius: '8px', border: '1.5px solid rgba(0,0,0,0.12)',
                  fontFamily: "'Poppins', sans-serif", fontSize: '12px', fontWeight: 600,
                  background: '#fff', color: '#1A1A1A', cursor: 'pointer',
                }}>{len}</button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button style={{
            width: '100%', background: '#E5187F', color: '#fff', border: 'none',
            padding: '18px', borderRadius: '14px',
            fontFamily: "'Poppins', sans-serif", fontSize: '14px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
            marginBottom: '12px',
          }}>Add to Cart — {product.price}</button>
          <button style={{
            width: '100%', background: 'transparent', color: '#1A1A1A',
            border: '1.5px solid rgba(0,0,0,0.14)', padding: '16px', borderRadius: '14px',
            fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
            marginBottom: '32px',
          }}>Buy Now</button>

          {/* Description */}
          <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', lineHeight: 1.8, color: '#555', marginBottom: '28px' }}>
            {product.description}
          </p>

          {/* Details */}
          <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '24px' }}>
            <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '12px' }}>
              Product Details
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {product.details.map((d, i) => (
                <li key={i} style={{
                  fontFamily: "'Poppins', sans-serif", fontSize: '13px', color: '#555',
                  padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.05)',
                  display: 'flex', alignItems: 'center', gap: '10px',
                }}>
                  <span style={{ color: '#E5187F', fontSize: '16px' }}>✓</span> {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* You may also like */}
      <div style={{ background: '#FFF5F9', padding: '60px 40px' }}>
        <h2 style={{
          fontFamily: "'Black Han Sans', sans-serif", fontSize: '36px',
          textTransform: 'uppercase', color: '#1A1A1A', marginBottom: '32px',
        }}>YOU MAY ALSO LIKE</h2>
        <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '12px' }}>
          {allProducts.filter(p => p.slug !== slug).map(p => (
            <Link key={p.slug} to={`/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit', flexShrink: 0 }}>
              <div style={{ width: '240px' }}>
                <div style={{ height: '300px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }} />
                </div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '13px', fontWeight: 800, color: '#1A1A1A', textTransform: 'uppercase', marginBottom: '4px' }}>{p.name}</div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '14px', color: '#E5187F', fontWeight: 700 }}>{p.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <HairFooter />
    </div>
  )
}
