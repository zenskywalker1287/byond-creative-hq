import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WingMark from '../components/WingMark'

export default function NotFound() {
  const location = useLocation()

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname)
  }, [location.pathname])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '32px',
      }}
    >
      <WingMark size={48} opacity={0.08} />
      <div
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: 'clamp(96px, 20vw, 200px)',
          color: 'transparent',
          WebkitTextStroke: '2px rgba(255,0,0,0.4)',
          lineHeight: 1,
          marginBottom: '8px',
        }}
      >
        404
      </div>
      <p
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '13px',
          letterSpacing: '0.2em',
          color: 'rgba(240,237,232,0.5)',
          marginBottom: '32px',
        }}
      >
        PAGE NOT FOUND
      </p>
      <Link
        to="/"
        style={{
          fontFamily: "'Black Han Sans', sans-serif",
          fontSize: '18px',
          letterSpacing: '0.1em',
          color: '#0A0A0A',
          background: '#FF0000',
          padding: '14px 36px',
          textDecoration: 'none',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        RETURN HOME
      </Link>
    </div>
  )
}
