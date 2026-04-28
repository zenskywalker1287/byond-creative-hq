import { useState, useCallback, useEffect, useRef } from 'react'

const HeroCarousel = ({ images }: { images: string[] }) => {
  const stripRef = useRef<HTMLDivElement>(null)
  const [scrollX, setScrollX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isDecaying, setIsDecaying] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollStart, setScrollStart] = useState(0)
  const velocityRef = useRef(0)
  const lastXRef = useRef(0)
  const lastTimeRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  const isMobile = containerWidth < 640
  const CARD_WIDTH = isMobile ? Math.round(containerWidth * 0.58) : 340
  const CARD_GAP = isMobile ? 10 : 28
  const TOTAL_WIDTH = images.length * (CARD_WIDTH + CARD_GAP)

  useEffect(() => {
    if (stripRef.current) setContainerWidth(stripRef.current.offsetWidth)
    const handleResize = () => {
      if (stripRef.current) setContainerWidth(stripRef.current.offsetWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (containerWidth > 0) {
      const centerCardIndex = Math.floor(images.length / 2)
      const cardCenterPos = centerCardIndex * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
      setScrollX(-(cardCenterPos - containerWidth / 2))
    }
  }, [containerWidth, CARD_WIDTH, CARD_GAP, images.length])

  const wrapScroll = useCallback((x: number) => {
    const min = -(TOTAL_WIDTH - containerWidth / 2)
    const max = containerWidth / 2
    const range = max - min
    if (range <= 0) return x
    return ((x - min) % range + range) % range + min
  }, [TOTAL_WIDTH, containerWidth])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setIsDragging(true)
    setStartX(e.clientX)
    setScrollStart(scrollX)
    lastXRef.current = e.clientX
    lastTimeRef.current = Date.now()
    velocityRef.current = 0
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId)
  }, [scrollX])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return
    const now = Date.now()
    const dt = now - lastTimeRef.current
    const dx = e.clientX - lastXRef.current
    if (dt > 0) velocityRef.current = dx / dt
    lastXRef.current = e.clientX
    lastTimeRef.current = now
    setScrollX(wrapScroll(scrollStart + (e.clientX - startX)))
  }, [isDragging, scrollStart, startX, wrapScroll])

  const handlePointerUp = useCallback(() => {
    setIsDragging(false)
    let v = velocityRef.current * 15
    if (Math.abs(v) < 0.5) return
    setIsDecaying(true)
    const decay = () => {
      if (Math.abs(v) < 0.5) {
        setIsDecaying(false)
        return
      }
      v *= 0.95
      setScrollX(prev => wrapScroll(prev + v))
      rafRef.current = requestAnimationFrame(decay)
    }
    rafRef.current = requestAnimationFrame(decay)
  }, [wrapScroll])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault()
    setScrollX(prev => wrapScroll(prev - e.deltaY * 1.5))
  }, [wrapScroll])

  if (!images.length) return null

  const centerOffset = containerWidth / 2

  return (
    <div
      ref={stripRef}
      style={{
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        overflow: 'hidden',
        padding: '64px 0',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          transform: `translateX(${scrollX}px)`,
          transition: (isDragging || isDecaying) ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          gap: `${CARD_GAP}px`,
        }}
      >
        {images.map((img, i) => {
          const cardCenter = i * (CARD_WIDTH + CARD_GAP) + CARD_WIDTH / 2
          const viewCenter = -scrollX + centerOffset
          let dist = (cardCenter - viewCenter) / (CARD_WIDTH + CARD_GAP)
          const totalCards = images.length
          if (dist > totalCards / 2) dist -= totalCards
          if (dist < -totalCards / 2) dist += totalCards
          const clampedDist = Math.max(-4, Math.min(4, dist))
          const absDist = Math.abs(clampedDist)
          const rotation = isMobile ? clampedDist * 1 : clampedDist * 4
          const lift = isMobile ? 0 : Math.max(0, 30 - absDist * 15)
          const scale = isMobile ? 1 : 1 + Math.max(0, 1 - absDist * 0.3) * 0.08
          const isCenter = Math.abs(dist) < 0.6
          const isHovered = hoveredCard === i
          const cardOpacity = isMobile ? Math.max(0.4, 1 - absDist * 0.2) : 1

          return (
            <div
              key={i}
              style={{
                flexShrink: 0,
                position: 'relative',
                width: CARD_WIDTH,
                opacity: cardOpacity,
                transform: `rotate(${isHovered && !isMobile ? 0 : rotation}deg) translateY(${isHovered && !isMobile ? -40 : -lift}px) scale(${isHovered && !isMobile ? 1.12 : scale})`,
                transition: (isDragging || isDecaying) ? 'none' : 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
                zIndex: isHovered ? 50 : isCenter ? 10 : 1,
                transformOrigin: 'bottom center',
              }}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {isCenter && !isHovered && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-16px',
                    borderRadius: '16px',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    filter: 'blur(24px)',
                    background: 'rgba(255,0,0,0.4)',
                  }}
                />
              )}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  overflow: 'hidden',
                  background: '#0D1A0F',
                  borderRadius: isMobile ? '20px' : '16px',
                  border: '1px solid rgba(240,237,232,0.15)',
                  aspectRatio: '9 / 16',
                }}
              >
                <img
                  src={img}
                  alt={`Email creative ${i + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                  }}
                  loading="lazy"
                  draggable={false}
                />
                {!isCenter && !isHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.4)',
                      pointerEvents: 'none',
                      borderRadius: '16px',
                    }}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HeroCarousel
