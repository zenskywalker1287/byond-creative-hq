import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TextRollProps {
  text: string
  style?: React.CSSProperties
  letterStyle?: React.CSSProperties
  staggerDelay?: number   // seconds between each letter
  duration?: number       // seconds per letter animation
  triggerOnce?: boolean
}

/**
 * Animates each letter with a 3-D roll-up entrance from below.
 */
export function TextRoll({
  text,
  style,
  letterStyle,
  staggerDelay = 0.035,
  duration = 0.5,
  triggerOnce = true,
}: TextRollProps) {
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: triggerOnce, margin: '-10% 0px' })

  return (
    <span
      ref={ref}
      style={{
        display: 'inline-block',
        perspective: '600px',
        ...style,
      }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, rotateX: 90, y: '0.3em' }}
          animate={inView
            ? { opacity: 1, rotateX: 0, y: 0 }
            : { opacity: 0, rotateX: 90, y: '0.3em' }
          }
          transition={{
            delay: i * staggerDelay,
            duration,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
            whiteSpace: char === ' ' ? 'pre' : undefined,
            ...letterStyle,
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  )
}
