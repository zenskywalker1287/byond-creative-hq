interface WingMarkProps {
  size?: number
  opacity?: number
  color?: string
}

export default function WingMark({ size = 14, opacity = 1, color = '#FF0000' }: WingMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ opacity, flexShrink: 0 }}
    >
      <path
        d="M2 20C4 16 8 8 12 4C14 6 18 12 22 14C18 14 14 16 12 20C10 16 6 18 2 20Z"
        fill={color}
      />
      <path
        d="M6 18C8 14 10 10 12 6C13 8 16 12 20 14C16 14.5 13 16 12 18C11 16 8 17 6 18Z"
        fill={color}
        opacity="0.5"
      />
    </svg>
  )
}
