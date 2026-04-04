import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  quote: string
  name: string
  designation: string
  src?: string
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  autoplayInterval?: number
}

export function AnimatedTestimonials({
  testimonials,
  autoplay = true,
  autoplayInterval = 5000,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const next = useCallback(() => {
    setDirection(1)
    setActive(i => (i + 1) % testimonials.length)
  }, [testimonials.length])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive(i => (i - 1 + testimonials.length) % testimonials.length)
  }, [testimonials.length])

  useEffect(() => {
    if (!autoplay) return
    const id = setInterval(next, autoplayInterval)
    return () => clearInterval(id)
  }, [autoplay, autoplayInterval, next])

  const variants = {
    enter:  (d: number) => ({ x: d * 60, opacity: 0, scale: 0.97 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit:   (d: number) => ({ x: d * -60, opacity: 0, scale: 0.97 }),
  }

  const t = testimonials[active]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '80px',
      alignItems: 'center',
      maxWidth: '1000px',
      margin: '0 auto',
    }}>

      {/* Left: Image stack */}
      <div style={{ position: 'relative', height: '420px' }}>
        {testimonials.map((item, i) => {
          const offset = i - active
          const isActive = i === active
          return (
            <motion.div
              key={item.name}
              initial={false}
              animate={{
                opacity: isActive ? 1 : Math.abs(offset) === 1 ? 0.35 : 0,
                scale:   isActive ? 1 : 0.92,
                y:       offset * 16,
                zIndex:  isActive ? 10 : testimonials.length - Math.abs(offset),
                rotate:  isActive ? 0 : offset * 2.5,
              }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => {
                setDirection(offset > 0 ? 1 : -1)
                setActive(i)
              }}
            >
              {item.src ? (
                <img
                  src={item.src}
                  alt={item.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)', transition: 'filter 0.5s ease' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: isActive ? 'rgba(255,0,0,0.08)' : 'rgba(26,26,30,0.8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.5s ease',
                }}>
                  <span style={{ fontFamily: "'Black Han Sans', sans-serif", fontSize: '80px', color: isActive ? 'rgba(255,0,0,0.4)' : 'rgba(240,237,232,0.1)', lineHeight: 1 }}>
                    {item.name[0]}
                  </span>
                </div>
              )}
              {/* Gradient overlay */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.6) 0%, transparent 50%)', pointerEvents: 'none' }} />
            </motion.div>
          )
        })}
      </div>

      {/* Right: Text content */}
      <div>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Quote mark */}
            <div style={{
              fontFamily: "'Black Han Sans', sans-serif",
              fontSize: '80px',
              color: 'rgba(255,0,0,0.25)',
              lineHeight: 0.8,
              marginBottom: '16px',
            }}>
              "
            </div>

            <p style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 'clamp(15px, 1.8vw, 19px)',
              color: '#FFFFFF',
              opacity: 0.8,
              lineHeight: 1.65,
              margin: '0 0 32px',
              fontStyle: 'italic',
            }}>
              {t.quote}
            </p>

            <div>
              <div style={{
                fontFamily: "'Black Han Sans', sans-serif",
                fontSize: '18px',
                color: '#FFFFFF',
                letterSpacing: '0.08em',
                marginBottom: '4px',
              }}>
                {t.name}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: '#FF0000',
                letterSpacing: '0.2em',
                opacity: 0.7,
              }}>
                {t.designation}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '40px', alignItems: 'center' }}>
          <button
            onClick={prev}
            style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(255,0,0,0.25)',
              background: 'transparent',
              color: '#FF0000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,0,0,0.6)'; e.currentTarget.style.background = 'rgba(255,0,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,0,0,0.25)'; e.currentTarget.style.background = 'transparent' }}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            onClick={next}
            style={{
              width: '40px', height: '40px',
              border: '1px solid rgba(255,0,0,0.25)',
              background: 'transparent',
              color: '#FF0000',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,0,0,0.6)'; e.currentTarget.style.background = 'rgba(255,0,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,0,0,0.25)'; e.currentTarget.style.background = 'transparent' }}
            aria-label="Next"
          >
            →
          </button>

          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px', marginLeft: '8px' }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > active ? 1 : -1); setActive(i) }}
                style={{
                  width: i === active ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '3px',
                  background: i === active ? '#FF0000' : 'rgba(255,0,0,0.25)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
