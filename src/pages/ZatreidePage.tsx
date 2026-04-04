import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

import ZCursor     from '../components/zatreides/ZCursor'
import ZNav        from '../components/zatreides/ZNav'
import S01Hero     from '../components/zatreides/S01Hero'
import S02Forty    from '../components/zatreides/S02FortyEight'
import S03Vault    from '../components/zatreides/S03Vault'
import S04FilmReel from '../components/zatreides/S04FilmReel'
import S05Takeover from '../components/zatreides/S05Takeover'
import S06Process  from '../components/zatreides/S06Process'
import S07Personas from '../components/zatreides/S07WhoItsFor'
import S08Proof    from '../components/zatreides/S08SocialProof'
import S09CTA      from '../components/zatreides/S09CTA'
import ZFooter     from '../components/zatreides/ZFooter'

gsap.registerPlugin(ScrollTrigger, CustomEase, MotionPathPlugin)

export default function ZatreidePage() {
  useEffect(() => {
    // Hide system cursor for this page
    document.body.style.cursor = 'none'

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', () => ScrollTrigger.update())
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Refresh after fonts + images settle
    setTimeout(() => ScrollTrigger.refresh(), 500)

    return () => {
      document.body.style.cursor = ''
      lenis.destroy()
      gsap.ticker.remove((time: number) => lenis.raf(time * 1000))
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      style={{
        background: '#080808',
        minHeight: '100vh',
        color: '#f5f5f5',
        overflowX: 'hidden',
        cursor: 'none',
      }}
    >
      <ZCursor />
      <ZNav />
      <S01Hero />
      <S02Forty />
      <S03Vault />
      <S04FilmReel />
      <S05Takeover />
      <S06Process />
      <S07Personas />
      <S08Proof />
      <S09CTA />
      <ZFooter />
    </div>
  )
}
