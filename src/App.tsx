import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useScrollAnimations } from './hooks/useScrollAnimations'

// Pages
import Portfolio from './pages/Portfolio'
import CaseStudy from './pages/CaseStudy'
import FlatpackCaseStudy from './pages/FlatpackCaseStudy'
import FrontEnd from './pages/FrontEnd'
import NotFound from './pages/NotFound'
import ShopPage from './pages/hair/ShopPage'
import ProductPage from './pages/hair/ProductPage'
import AboutPage from './pages/hair/AboutPage'
import ZatreidePage from './pages/ZatreidePage'
import BubblyBalloonsPage from './pages/BubblyBalloonsPage'

// Hair homepage components
import AnnouncementBar from './components/hair/AnnouncementBar'
import HairNav from './components/hair/HairNav'
import HairHero from './components/hair/HairHero'
import BestSellers from './components/hair/BestSellers'
import BrandStory from './components/hair/BrandStory'
import IngredientTicker from './components/hair/IngredientTicker'
import AllProducts from './components/hair/AllProducts'
import BundleSection from './components/hair/BundleSection'
import IGTicker from './components/hair/IGTicker'
import IGGrid from './components/hair/IGGrid'
import EmailSignup from './components/hair/EmailSignup'
import HairFooter from './components/hair/HairFooter'

function HairHomePage() {
  useScrollAnimations()
  return (
    <div style={{ background: '#fff', minHeight: '100vh', cursor: 'default' }}>
      <AnnouncementBar />
      <HairNav />
      <div className="hair-hero"><HairHero /></div>
      <div className="bestsellers-section"><BestSellers /></div>
      <div className="brand-story-section"><BrandStory /></div>
      <IngredientTicker />
      <div className="all-products-section"><AllProducts /></div>
      <div className="bundle-section"><BundleSection /></div>
      <IGTicker />
      <div className="ig-grid-section"><IGGrid /></div>
      <div className="email-signup-section"><EmailSignup /></div>
      <HairFooter />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HairHomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/zatreides" element={<ZatreidePage />} />
        <Route path="/bubbly-balloons" element={<BubblyBalloonsPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/front-end" element={<FrontEnd />} />
        <Route path="/case-studies/flatpack" element={<FlatpackCaseStudy />} />
        <Route path="/case-studies/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
