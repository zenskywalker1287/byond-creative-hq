import { Search, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'About', href: '/about' },
  { label: 'Pro', href: '#' },
]

export default function HairNav() {
  return (
    <nav style={{
      background: '#fff',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      padding: '0 40px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 99,
    }}>
      {/* Left links */}
      <div style={{ display: 'flex', gap: '36px' }}>
        {navLinks.map(link => (
          <Link key={link.label} to={link.href} style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            color: '#1A1A1A',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            textDecoration: 'none',
          }}>{link.label}</Link>
        ))}
      </div>

      {/* Logo */}
      <a href="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <span className="nav-logo-drip" style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '22px',
          color: '#E5187F',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          display: 'inline-block',
          lineHeight: 1,
        }}>RICH HAIR CITY</span>
      </a>

      {/* Right icons */}
      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', display: 'flex' }}>
          <Search size={18} />
        </button>
        <a href="#" style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: '12px',
          fontWeight: 500,
          color: '#1A1A1A',
          letterSpacing: '0.04em',
          cursor: 'pointer',
          textDecoration: 'none',
        }}>My Account</a>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A1A', position: 'relative', display: 'flex' }}>
          <ShoppingBag size={20} />
          <span style={{
            position: 'absolute', top: '-6px', right: '-6px',
            background: '#E5187F', color: '#fff',
            borderRadius: '50%', width: '16px', height: '16px',
            fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700,
          }}>0</span>
        </button>
      </div>
    </nav>
  )
}
