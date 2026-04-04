import { useRef, useCallback } from 'react'

interface GlowingEffectProps {
  children: React.ReactNode
  color?: string
  spread?: number
  disabled?: boolean
}

/**
 * Wraps children with a mouse-tracking glow border effect.
 * Requires the wrapper to have position: relative.
 */
export function GlowingEffect({
  children,
  color = 'rgba(255,0,0,0.6)',
  spread = 80,
  disabled = false,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const glowRef      = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !containerRef.current || !glowRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    glowRef.current.style.background =
      `radial-gradient(${spread * 2}px circle at ${x}px ${y}px, ${color} 0%, transparent 100%)`
    glowRef.current.style.opacity = '1'
  }, [disabled, color, spread])

  const handleMouseLeave = useCallback(() => {
    if (!glowRef.current) return
    glowRef.current.style.opacity = '0'
  }, [])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative' }}
    >
      {/* Glow border layer */}
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'inherit',
          pointerEvents: 'none',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
          mask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMask: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}
