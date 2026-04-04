import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PORTFOLIO_ITEMS = [
  { name: 'Rich Hair City',  url: 'http://localhost:5173', tag: 'E-Commerce',  color: '#1a0a0a', screenshot: '/images/vault-mac-rhc.png'        },
  { name: 'Prestige Auto',   url: null,                    tag: 'Automotive',  color: '#0a0a1a', screenshot: '/images/vault-mac-prestige.png'    },
  { name: 'Blue Wave Spa',   url: null,                    tag: 'Med Spa',     color: '#050f14', screenshot: '/images/vault-mac-bluewave.png'    },
  { name: 'Atlas Realty',    url: null,                    tag: 'Real Estate', color: '#080f08', screenshot: '/images/vault-mac-atlas.png'       },
  { name: 'Coastal Kitchen', url: null,                    tag: 'Restaurant',  color: '#120800', screenshot: '/images/vault-mac-coastal.png'     },
  { name: 'Malibu Brows',    url: null,                    tag: 'Beauty',      color: '#120512', screenshot: '/images/vault-mac-malibu.png'      },
  { name: 'Pacific Thread',  url: null,                    tag: 'Apparel',     color: '#040d18', screenshot: '/images/vault-mac-pacific.png'     },
  { name: 'Soleil Studio',   url: null,                    tag: 'Creative',    color: '#0d0c00', screenshot: '/images/vault-mac-soleil.png'      },
  { name: 'Harbor House',    url: null,                    tag: 'Hospitality', color: '#000d0d', screenshot: '/images/vault-mac-harbor.png'      },
]

function MacBookCard({ item, index, onHover, isHovered }: {
  item: typeof PORTFOLIO_ITEMS[0] & { screenshot?: string }
  index: number
  onHover: (i: number | null) => void
  isHovered: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotY = ((x - cx) / cx) * 18
    const rotX = -((y - cy) / cy) * 12
    gsap.to(el, {
      rotateY: rotY,
      rotateX: rotX,
      transformPerspective: 1000,
      duration: 0.15,
      ease: 'none',
      overwrite: 'auto',
    })
  }

  function handleMouseLeave() {
    const el = cardRef.current
    if (!el) return
    gsap.to(el, {
      rotateY: 0,
      rotateX: 0,
      transformPerspective: 1000,
      duration: 1.2,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    })
    onHover(null)
  }

  return (
    <div
      ref={cardRef}
      className="vault-mac"
      data-index={index}
      data-cursor
      onMouseEnter={() => onHover(index)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: '#080808',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        cursor: 'none',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.45s ease',
        transform: isHovered ? 'translateY(-16px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 24px 60px rgba(0,0,0,0.7), 0 0 32px rgba(0,113,227,0.25)'
          : '0 8px 28px rgba(0,0,0,0.5)',
      }}
    >
      {/* MacBook image — full width */}
      <img
        src="/images/macbook-open.png"
        alt={`${item.name} on MacBook`}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
        draggable={false}
      />

      {/* Text info below MacBook image */}
      <div style={{
        padding: '10px 14px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}>
        <span style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          color: '#f5f5f5',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}>{item.name}</span>
        <span style={{
          fontFamily: '"Inter", -apple-system, sans-serif',
          fontSize: '11px',
          fontWeight: 400,
          color: '#0071e3',
          letterSpacing: '0.01em',
        }}>{item.tag}</span>
      </div>

      {/* Hover: View Live pill */}
      <div style={{
        position: 'absolute',
        bottom: '12px',
        right: '14px',
        opacity: isHovered ? 1 : 0,
        transform: isHovered ? 'translateY(0)' : 'translateY(4px)',
        transition: 'opacity 0.25s ease, transform 0.25s ease',
        pointerEvents: isHovered ? 'auto' : 'none',
      }}>
        <a
          href={item.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: '11px',
            fontWeight: 600,
            color: '#000000',
            background: '#0071e3',
            padding: '5px 12px',
            borderRadius: '980px',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >View Live →</a>
      </div>
    </div>
  )
}

export default function S03Vault() {
  const sectionRef  = useRef<HTMLDivElement>(null)
  const doorRef     = useRef<HTMLDivElement>(null)
  const wheelRef    = useRef<HTMLDivElement>(null)
  const interiorRef = useRef<HTMLDivElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [vaultOpen, setVaultOpen] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=400%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            if (self.progress > 0.35 && !vaultOpen) setVaultOpen(true)
          },
        }
      })

      // Door falls from top (0 → 0.15)
      tl.fromTo(doorRef.current,
        { y: '-110%' },
        { y: '0%', ease: 'power4.in', duration: 0.15 }
      )

      // Impact: screen shake (0.15 → 0.2)
      tl.to(sectionRef.current, {
        x: 6, duration: 0.01, yoyo: true, repeat: 5, ease: 'none',
      }, '<0.14')

      // Wheel spins (0.15 → 0.3)
      tl.to(wheelRef.current, {
        rotation: 720,
        duration: 0.15,
        ease: 'power2.inOut',
      }, '-=0.05')

      // Door swings open — rotateY toward camera (0.3 → 0.5)
      tl.to(doorRef.current, {
        rotateY: -95,
        transformOrigin: 'left center',
        ease: 'power3.inOut',
        duration: 0.2,
      })

      // Light pours in (0.45 → 0.55)
      tl.to('.vault-light', {
        opacity: 1, scale: 1.3,
        duration: 0.15, ease: 'power2.out',
      }, '-=0.05')

      // Grid of MacBooks rises up (0.5 → 0.7)
      tl.from('.vault-mac', {
        y: 80, opacity: 0, stagger: { each: 0.04, grid: [3, 3], from: 'center' },
        duration: 0.25, ease: 'power3.out',
      }, '-=0.05')

      tl.from('.vault-heading', {
        opacity: 0, y: 20, duration: 0.15, ease: 'power3.out',
      }, '-=0.2')

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      id="work"
      style={{
        height: '100vh',
        background: '#000000',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
      }}
    >
      {/* Vault interior background image */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(/images/vault-interior.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.18,
        filter: 'saturate(0.6)',
      }} />

      {/* Vault glow light */}
      <div className="vault-light" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(0,113,227,0.07) 0%, transparent 65%)',
        opacity: 0, pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Vault door */}
      <div
        ref={doorRef}
        style={{
          position: 'absolute',
          top: 0, left: '-5%',
          width: '110%', height: '100%',
          background: 'linear-gradient(145deg, #1c1c1e 0%, #111 40%, #0a0a0a 100%)',
          zIndex: 10,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 80px rgba(0,0,0,0.9)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Door border */}
        <div style={{
          position: 'absolute', inset: '20px',
          border: '6px solid rgba(0,113,227,0.25)',
          borderRadius: '8px',
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.5)',
        }} />
        <div style={{
          position: 'absolute', inset: '32px',
          border: '2px solid rgba(245,245,245,0.06)',
          borderRadius: '4px',
        }} />

        {/* Wheel */}
        <div
          ref={wheelRef}
          style={{
            width: '160px', height: '160px',
            border: '8px solid rgba(0,113,227,0.5)',
            borderRadius: '50%',
            position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Spokes */}
          {[0, 60, 120, 180, 240, 300].map(deg => (
            <div key={deg} style={{
              position: 'absolute', width: '100%', height: '4px',
              background: 'rgba(0,113,227,0.5)',
              borderRadius: '2px',
              transform: `rotate(${deg}deg)`,
            }} />
          ))}
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%',
            background: '#0071e3', opacity: 0.8,
          }} />
        </div>

        {/* Vault text */}
        <div style={{
          marginTop: '32px',
          fontFamily: '"Inter", sans-serif', fontSize: '14px',
          fontWeight: '600', color: 'rgba(0,113,227,0.5)',
          letterSpacing: '0.2em', textTransform: 'uppercase',
        }}>CLIENT VAULT</div>
      </div>

      {/* Interior content */}
      <div
        ref={interiorRef}
        style={{ position: 'relative', zIndex: 2, width: '100%', padding: '100px 40px 40px' }}
      >
        <div className="vault-heading" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: '600',
            color: '#0071e3', letterSpacing: '0.06em', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>Built this week</p>
          <h2 style={{
            fontFamily: '"Inter", -apple-system, sans-serif',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: '800', letterSpacing: '-0.04em',
            color: '#f5f5f5', lineHeight: 1,
          }}>The Vault.</h2>
        </div>

        {/* 3x3 MacBook grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px 40px',
          maxWidth: '900px',
          margin: '0 auto',
          perspective: '1200px',
        }}>
          {PORTFOLIO_ITEMS.map((item, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'center',
              transform: `
                translateZ(${i === 4 ? '0px' : i % 2 === 0 ? '-30px' : '-15px'})
                rotateX(${i < 3 ? '4deg' : i > 5 ? '-4deg' : '0deg'})
              `,
            }}>
              <MacBookCard
                item={item}
                index={i}
                onHover={setHoveredIndex}
                isHovered={hoveredIndex === i}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
