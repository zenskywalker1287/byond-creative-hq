import { Link } from 'react-router-dom'

const products = [
  {
    id: 1,
    name: 'RAW BURMESE CURL',
    tagline: '100% Raw Unprocessed Hair',
    price: '$90',
    badge: 'Best Seller',
    slug: 'raw-burmese-curl',
    img: '/images/generated/rhc-bundle-04-raw-stack.jpg',
  },
  {
    id: 2,
    name: 'BRAZILIAN BODY WAVE',
    tagline: 'Bouncy + Voluminous Texture',
    price: '$60',
    badge: null,
    slug: 'brazilian-body-wave',
    img: '/images/generated/rhc-bundle-01-deep-wave.jpg',
  },
  {
    id: 3,
    name: 'RAW KINKY STRAIGHT',
    tagline: 'Sleek + Heat-Defying Texture',
    price: '$90',
    badge: null,
    slug: 'raw-kinky-straight',
    img: '/images/generated/rhc-bundle-03-group-fan.jpg',
  },
  {
    id: 4,
    name: 'BLONDE 613 BUNDLES',
    tagline: 'Platinum Ready · Lifts to Level 10',
    price: '$110',
    badge: 'New',
    slug: 'blonde-613-bundles',
    img: '/images/generated/rhc-flatlay-blonde-bundles.jpg',
  },
  {
    id: 5,
    name: 'BRAZILIAN DEEP WAVE',
    tagline: 'Deep Curl + Long Lasting',
    price: '$65',
    badge: null,
    slug: 'brazilian-deep-wave',
    img: '/images/generated/rhc-flatlay-black-bundles.jpg',
  },
]

export default function BestSellers() {
  return (
    <section style={{ background: '#fff', padding: '56px 0' }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        marginBottom: '28px',
      }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '12px',
          fontWeight: 800,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#1A1A1A',
          margin: 0,
        }}>THE CITY'S FINEST</h2>
        <a href="/shop" style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#1A1A1A',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          cursor: 'pointer',
          textDecoration: 'none',
        }}>VIEW ALL ›</a>
      </div>

      {/* Horizontal scroll rail */}
      <div style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        padding: '0 40px 12px',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      } as React.CSSProperties}>
        {products.map(product => (
          <Link key={product.id} to={`/product/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="bestseller-card" style={{ minWidth: '220px', flexShrink: 0 }}>
            {/* Arch-shaped image */}
            <div style={{
              width: '220px',
              height: '280px',
              borderRadius: '120px 120px 0 0',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(0,0,0,0.06)',
            }}>
              {product.badge && (
                <div style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: '#E5187F',
                  color: '#fff',
                  fontSize: '9px',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  textTransform: 'uppercase',
                  zIndex: 2,
                }}>{product.badge}</div>
              )}
              <img
                src={product.img}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  display: 'block',
                }}
              />
            </div>

            {/* Product info */}
            <div style={{ padding: '14px 4px 4px' }}>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '10px',
                fontStyle: 'italic',
                color: '#E5187F',
                marginBottom: '4px',
              }}>Rich Hair City</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '12px',
                fontWeight: 800,
                color: '#1A1A1A',
                marginBottom: '3px',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}>{product.name}</div>
              <div style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '11px',
                color: '#999',
                marginBottom: '12px',
              }}>{product.tagline}</div>
              <button style={{
                width: '100%',
                background: '#E5187F',
                color: '#fff',
                border: 'none',
                padding: '10px 12px',
                borderRadius: '8px',
                fontFamily: "'Poppins', sans-serif",
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}>
                Add to Cart • {product.price}
              </button>
            </div>
          </div>
          </Link>
        ))}

        {/* View all card */}
        <a href="/shop" style={{ textDecoration: 'none' }}>
          <div style={{
            minWidth: '220px',
            height: '280px',
            flexShrink: 0,
            background: '#FFF5F9',
            borderRadius: '120px 120px 0 0',
            border: '1.5px dashed #E5187F',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: '32px', color: '#E5187F' }}>→</span>
            <span style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: '11px',
              fontWeight: 700,
              color: '#E5187F',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>View All</span>
          </div>
        </a>
      </div>
    </section>
  )
}
