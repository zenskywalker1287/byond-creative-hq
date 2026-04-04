import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

interface ContainerScrollProps {
  titleComponent: React.ReactNode
  children: React.ReactNode
}

export function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.55], [28, 0, 0])
  const scale   = useTransform(scrollYProgress, [0, 0.35, 0.55], [0.92, 1, 1])
  const y       = useTransform(scrollYProgress, [0, 0.35],        [80, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2],          [0, 1])

  return (
    <div
      ref={containerRef}
      style={{
        height: '140vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        padding: '160px 32px 60px',
      }}
    >
      <div style={{ maxWidth: '1100px', width: '100%', position: 'sticky', top: '80px' }}>

        {/* Title above card */}
        <motion.div style={{ opacity, y, textAlign: 'center', marginBottom: '48px' }}>
          {titleComponent}
        </motion.div>

        {/* 3D card */}
        <div style={{ perspective: '1200px' }}>
          <motion.div
            style={{
              rotateX,
              scale,
              transformOrigin: 'top center',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,0,0,0.12)',
            }}
          >
            {children}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
