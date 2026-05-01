import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import gsap from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(CustomEase, ScrollTrigger)

// Physics-grade easing — no generic ease-in-out anywhere
CustomEase.create('bb-reveal',  '0.22, 1, 0.36, 1')
const EASE_LETTERS = CustomEase.create('bb-letters', '0.16, 1, 0.3, 1')

// ─── Balloon Mesh ────────────────────────────────────────────────────────────
interface BalloonProps {
  position: [number, number, number]
  color: string
  highlightColor: string
  scale: [number, number, number]
  floatSpeed: number
  floatPhase: number
  swayAmp?: number
}

function Balloon({ position, color, highlightColor, scale, floatSpeed, floatPhase, swayAmp = 0.04 }: BalloonProps) {
  const groupRef = useRef<THREE.Group>(null)
  const origin = useRef(new THREE.Vector3(...position))

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = origin.current.y + Math.sin(t * floatSpeed + floatPhase) * 0.28
    groupRef.current.rotation.z = Math.sin(t * floatSpeed * 0.6 + floatPhase) * swayAmp
    groupRef.current.rotation.x = Math.sin(t * floatSpeed * 0.4 + floatPhase + 1) * (swayAmp * 0.5)
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Balloon body */}
      <mesh scale={scale} castShadow>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.28}
          metalness={0.04}
          envMapIntensity={0.6}
        />
      </mesh>
      {/* Highlight sphere (inner glow / shine) */}
      <mesh scale={[scale[0] * 0.42, scale[1] * 0.28, scale[2] * 0.38]} position={[-scale[0] * 0.28, scale[1] * 0.26, scale[2] * 0.72]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color={highlightColor}
          roughness={1}
          metalness={0}
          transparent
          opacity={0.55}
        />
      </mesh>
      {/* Tie knot at bottom */}
      <mesh position={[0, -scale[1] * 1.06, 0]} scale={[0.08, 0.12, 0.08]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={color} roughness={0.6} />
      </mesh>
      {/* String */}
      <mesh position={[0, -scale[1] * 1.14 - 0.4, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.8, 4]} />
        <meshStandardMaterial color="#8A7A70" roughness={1} transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

// ─── Mouse Parallax Camera Rig ────────────────────────────────────────────────
function CameraRig() {
  const { camera, gl } = useThree()
  const mouse = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / gl.domElement.clientWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / gl.domElement.clientHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [gl])

  useFrame(() => {
    target.current.x += (mouse.current.x * 0.4 - target.current.x) * 0.04
    target.current.y += (mouse.current.y * 0.2 - target.current.y) * 0.04
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Scene ────────────────────────────────────────────────────────────────────
const BALLOONS: BalloonProps[] = [
  // Front layer — pinks, blush, rose
  { position: [-3.8, 1.2, -1.5], color: '#F090A8', highlightColor: '#FFE0EC', scale: [0.85, 0.97, 0.85], floatSpeed: 0.45, floatPhase: 0 },
  { position: [3.6, 0.6, -1.8],  color: '#E86080', highlightColor: '#FFD0E0', scale: [0.78, 0.90, 0.78], floatSpeed: 0.52, floatPhase: 1.4 },
  { position: [1.0, 2.4, -1.0],  color: '#F8C0D0', highlightColor: '#FFF5F8', scale: [0.68, 0.80, 0.68], floatSpeed: 0.60, floatPhase: 2.8 },

  // Mid layer — deeper rose + blush white
  { position: [-2.0, -0.4, -3.0], color: '#FFD0DE', highlightColor: '#FFFFFF', scale: [0.92, 1.06, 0.92], floatSpeed: 0.38, floatPhase: 0.6 },
  { position: [2.8,  2.8, -3.2],  color: '#D04868', highlightColor: '#F8B0C8', scale: [0.88, 1.01, 0.88], floatSpeed: 0.42, floatPhase: 1.9 },
  { position: [-0.5, 3.2, -2.8],  color: '#F090A8', highlightColor: '#FFE0EC', scale: [0.62, 0.71, 0.62], floatSpeed: 0.55, floatPhase: 3.2 },
  { position: [4.8, -0.8, -3.5],  color: '#FFF0F4', highlightColor: '#FFFFFF', scale: [0.80, 0.92, 0.80], floatSpeed: 0.48, floatPhase: 2.1 },
  { position: [-4.5, 3.0, -3.8],  color: '#C03858', highlightColor: '#F090A8', scale: [0.72, 0.83, 0.72], floatSpeed: 0.50, floatPhase: 0.3 },

  // Back layer — varied pink tones
  { position: [0.8,  -1.0, -5.5], color: '#F8C8D8', highlightColor: '#FFFFFF', scale: [1.05, 1.21, 1.05], floatSpeed: 0.30, floatPhase: 1.1 },
  { position: [-5.5, 1.5, -6.0],  color: '#E87090', highlightColor: '#FFD8E8', scale: [1.15, 1.32, 1.15], floatSpeed: 0.28, floatPhase: 2.5 },
  { position: [5.8,  2.2, -6.5],  color: '#FFE0E8', highlightColor: '#FFFFFF', scale: [1.00, 1.15, 1.00], floatSpeed: 0.32, floatPhase: 0.8 },
  { position: [-1.8, 4.2, -7.0],  color: '#B82848', highlightColor: '#E87090', scale: [0.95, 1.09, 0.95], floatSpeed: 0.26, floatPhase: 1.7 },
  { position: [2.5, -2.2, -6.0],  color: '#F8A0B8', highlightColor: '#FFE8F0', scale: [1.08, 1.24, 1.08], floatSpeed: 0.34, floatPhase: 3.0 },
]

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} color="#FFF5F8" />
      <directionalLight position={[6, 12, 6]} intensity={1.4} color="#FFFFFF" castShadow />
      <directionalLight position={[-8, 4, -4]} intensity={0.5} color="#FFD0DC" />
      <pointLight position={[0, -4, 2]} intensity={0.3} color="#FFB0C8" />

      <Suspense fallback={null}>
        <Environment preset="sunset" environmentIntensity={0.4} />
      </Suspense>

      {BALLOONS.map((b, i) => (
        <Balloon key={i} {...b} />
      ))}

      <CameraRig />
    </>
  )
}

// ─── Word Mask — overflow:hidden container, inner slides from y:105% ─────────
// This is the "text sliding out from overflow:hidden containers" technique
function MaskedWord({ word, className = '' }: { word: string; className?: string }) {
  return (
    <span
      className="bb-mask"
      style={{ marginRight: '0.22em', lineHeight: 'inherit' }}
    >
      <span className={`bb-mask-inner ${className}`}>
        {word}
      </span>
    </span>
  )
}

// ─── Hero Export ──────────────────────────────────────────────────────────────
export default function BalloonHero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return

    // Strict GSAP directive — overflow:hidden masks, y: '105%' → '0%'
    // Duration: 1.2s, stagger: 0.05s per word, CustomEase physics curve
    const words = Array.from(titleRef.current.querySelectorAll('.bb-mask-inner'))
    gsap.fromTo(
      words,
      { y: '105%' },
      {
        y: '0%',
        stagger: 0.05,
        duration: 1.2,
        ease: EASE_LETTERS,
        delay: 0.2,
      }
    )
  }, [])

  return (
    <section className="bb-hero" id="home">
      {/* Three.js Canvas */}
      <div className="bb-hero__canvas">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 58, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Overlays */}
      <div className="bb-hero__overlay" />
      <div className="bb-hero__noise" />

      {/* Content */}
      <div className="bb-hero__content">
        <p className="bb-hero__eyebrow">Bespoke Balloon Artistry</p>
        <h1
          ref={titleRef}
          className="bb-hero__title"
          aria-label="Where Every Celebration Rises"
        >
          <div><MaskedWord word="WHERE" /></div>
          <div><MaskedWord word="EVERY" /></div>
          <div style={{ fontStyle: 'italic', color: 'var(--bb-rose)' }}>
            <MaskedWord word="CELEBRATION" />
          </div>
          <div><MaskedWord word="RISES" /></div>
        </h1>
        <p className="bb-hero__sub">
          Every arch, wall, and cluster made by hand — designed around your vision, installed with zero stress on your end.
        </p>
        <div className="bb-hero__ctas">
          <a href="#contact" className="bb-btn bb-btn--primary">Book Your Consultation</a>
          <a href="#gallery" className="bb-btn bb-btn--ghost">See the Installations</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="bb-hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <div className="bb-hero__scroll-line" />
      </div>
    </section>
  )
}
