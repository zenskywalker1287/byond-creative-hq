import { useState, useEffect, useRef } from 'react'

interface TypewriterTextProps {
  words: string[]
  speed?: number          // ms per character
  deleteSpeed?: number    // ms per character when deleting
  pauseDuration?: number  // ms to pause after fully typed
  style?: React.CSSProperties
  cursorStyle?: React.CSSProperties
  loop?: boolean
}

/**
 * Types and deletes words in sequence with a blinking cursor.
 */
export function TypewriterText({
  words,
  speed = 55,
  deleteSpeed = 30,
  pauseDuration = 1800,
  style,
  cursorStyle,
  loop = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('')
  const [wordIndex, setWordIndex]   = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [cursorVisible, setCursor]  = useState(true)

  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cursorRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    cursorRef.current = setInterval(() => setCursor(v => !v), 530)
    return () => { if (cursorRef.current) clearInterval(cursorRef.current) }
  }, [])

  useEffect(() => {
    const current = words[wordIndex] ?? ''

    const tick = () => {
      if (!isDeleting) {
        if (displayed.length < current.length) {
          setDisplayed(current.slice(0, displayed.length + 1))
          timerRef.current = setTimeout(tick, speed)
        } else {
          timerRef.current = setTimeout(() => setIsDeleting(true), pauseDuration)
        }
      } else {
        if (displayed.length > 0) {
          setDisplayed(current.slice(0, displayed.length - 1))
          timerRef.current = setTimeout(tick, deleteSpeed)
        } else {
          setIsDeleting(false)
          if (loop || wordIndex < words.length - 1) {
            setWordIndex(i => (i + 1) % words.length)
          }
        }
      }
    }

    timerRef.current = setTimeout(tick, isDeleting ? deleteSpeed : speed)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [displayed, isDeleting, wordIndex, words, speed, deleteSpeed, pauseDuration, loop])

  return (
    <span style={style}>
      {displayed}
      <span style={{
        display: 'inline-block',
        width: '2px',
        height: '1em',
        background: 'currentColor',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        opacity: cursorVisible ? 1 : 0,
        transition: 'opacity 0.1s',
        ...cursorStyle,
      }} />
    </span>
  )
}
