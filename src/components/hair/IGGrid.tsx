const photos = [
  { src: '/images/generated/rhc-model-05-burmese-curl.jpg', alt: 'Burmese curl model' },
  { src: '/images/generated/rhc-model-01-kinky-curly.jpg', alt: 'Kinky curly model' },
  { src: '/images/generated/rhc-bundle-01-deep-wave.jpg', alt: 'Deep wave bundle' },
  { src: '/images/generated/rhc-bonus-02-hair-detail.jpg', alt: 'Hair detail close-up' },
  { src: '/images/generated/rhc-model-04-blonde-613.jpg', alt: 'Blonde 613 model' },
  { src: '/images/generated/rhc-bonus-03-seated.jpg', alt: 'Seated lifestyle' },
  { src: '/images/generated/rhc-bonus-05-phone-scroll.jpg', alt: 'Lifestyle model' },
]

export default function IGGrid() {
  return (
    <section style={{ background: '#fff' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '220px',
        gap: '4px',
      }}>
        {/* Tall first cell spanning 2 rows */}
        <div className="ig-grid-item" style={{ gridRow: '1 / 3', overflow: 'hidden' }}>
          <img
            src={photos[0].src}
            alt={photos[0].alt}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </div>

        {/* Remaining cells */}
        {photos.slice(1).map((p, i) => (
          <div key={i} className="ig-grid-item" style={{ overflow: 'hidden' }}>
            <img
              src={p.src}
              alt={p.alt}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
