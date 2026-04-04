export default function AnnouncementBar() {
  return (
    <div style={{
      background: '#E5187F',
      color: '#fff',
      textAlign: 'center',
      padding: '10px 20px',
      fontSize: '12px',
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: '0.14em',
      fontWeight: 600,
      textTransform: 'uppercase',
      position: 'relative',
      zIndex: 100,
    }}>
      FREE SHIPPING ON ORDERS OVER $150 &nbsp;|&nbsp; SECURE THE CITY STATUS.{' '}
      <a href="/shop" style={{ color: '#fff', textDecoration: 'underline', cursor: 'pointer', fontWeight: 700 }}>
        SHOP NOW →
      </a>
    </div>
  )
}
