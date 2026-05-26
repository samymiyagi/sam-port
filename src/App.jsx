import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Silk from './components/Silk';
import ClickSpark from './components/ClickSpark';
import sleepyGif from './assets/sleepy.gif';

export default function App() {
  useScrollReveal();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <ClickSpark
      sparkColor="#5ee7b0"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
      easing="ease-out"
      extraScale={1.2}
    >
      {/* Silk animated background — fixed, sits behind everything */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <Silk
          speed={5}
          scale={1}
          color="#264130"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      {/* UI overlays */}
      <div id="progress-bar" />

      <div className="hero-grid" aria-hidden="true" />
      <div className="glow-orb glow-orb-1" aria-hidden="true" />
      <div className="glow-orb glow-orb-2" aria-hidden="true" />
      <div className="glow-orb glow-orb-3" aria-hidden="true" />

      {/* Floating sprite */}
      <img
        className="floating-sprite"
        src={sleepyGif}
        alt=""
        aria-hidden="true"
      />

      {/* Back to top */}
      <button id="back-top" aria-label="Back to top" onClick={scrollToTop}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6"/>
        </svg>
      </button>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Marquee />
        <div className="section-divider" />
        <Projects />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Contact />
      </main>

      <Footer />
    </ClickSpark>
  );
}