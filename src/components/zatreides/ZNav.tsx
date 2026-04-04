import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { LetterStagger } from './ZTextFX'

const LINKS = ['Work', 'Process', 'For You', 'Contact']

export default function ZNav() {
  const navRef = useRef<HTMLElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
    )
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '60px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'background 0.4s ease',
      }}
    >
      <a href="/zatreides" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1px' }}>
        <LetterStagger text="Zatreides" delay={0.4} stagger={0.04} style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.04em', color: '#f5f5f5' }} />
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#0071e3' }}>.</span>
      </a>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        {LINKS.map(link => (
          <a key={link} href={`#${link.toLowerCase().replace(' ', '-')}`} data-cursor
            style={{
              fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
              fontSize: '14px', fontWeight: '400',
              color: 'rgba(245,245,245,0.55)', textDecoration: 'none',
              letterSpacing: '-0.01em', transition: 'color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f5f5f5' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(245,245,245,0.55)' }}
          >{link}</a>
        ))}
        <a href="#contact" data-cursor
          style={{
            fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '13px', fontWeight: '500', color: '#000000',
            background: '#0071e3', padding: '9px 20px', borderRadius: '980px',
            textDecoration: 'none', letterSpacing: '-0.01em',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.opacity = '0.88'
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'
          }}
          onMouseLeave={e => {
            ;(e.currentTarget as HTMLElement).style.opacity = '1'
            ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
          }}
        >Start Your Project</a>
      </div>
    </nav>
  )
}
