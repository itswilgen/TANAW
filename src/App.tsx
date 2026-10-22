import { LazyMotion, MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { Hero } from './components/sections/Hero'
import { Nav } from './components/sections/Nav'
import { OriginMarquee } from './components/sections/OriginMarquee'
import { Process } from './components/sections/Process'
import { Signatures } from './components/sections/Signatures'
import { Story } from './components/sections/Story'
import { Visit } from './components/sections/Visit'
import { Footer } from './components/sections/footer/Footer'
import { Menu } from './components/sections/menu/Menu'
import { Space } from './components/sections/space/Space'

const loadMotionFeatures = () => import('./lib/motion-features').then((mod) => mod.default)

export default function App() {
  // Deep links (/#menu): the browser looks for the anchor before React has rendered it.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1))
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
  }, [])

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      {/* "user": with prefers-reduced-motion, Motion drops transforms and keeps opacity fades. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-espresso px-5 py-3 text-oat focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">
          <Hero />
          <Story />
          <OriginMarquee />
          <Signatures />
          <Menu />
          <Process />
          <Space />
          <Visit />
        </main>
        <Footer />
      </MotionConfig>
    </LazyMotion>
  )
}
