import { useTypewriter } from '../hooks/useTypewriter';
import Lanyard from './Lanyard';

export default function Hero() {
  const text = useTypewriter();

  return (
    <section id="hero" aria-label="Introduction">

      {/* Desktop lanyard — right half only so left side buttons stay clickable */}
      <div className="lanyard-container" style={{ 
        position: 'absolute',
        top: '-33.8vh',
        right: '-77vw',
        width: '185vw', 
        height: '143vh',
        zIndex: 1,
        pointerEvents: 'none',  // ← outer div blocks nothing
      }}>
        <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
          <Lanyard position={[0, 0, 35]} gravity={[0, -40, 0]} fov={8} />
        </div>
</div>

      {/* Mobile lanyard — shown only on mobile */}
      <div className="lanyard-mobile">
  <div style={{ 
    position: 'absolute',
    top: '-59vh',
    left: '77%',
    transform: 'translateX(-50%)',
    width: '150vw', 
    height: '170vh',
    pointerEvents: 'none',
    zIndex: 1,
  }}>
          <div style={{ pointerEvents: 'auto', width: '100%', height: '100%' }}>
            <Lanyard position={[0, 0, 28]} gravity={[0, -40, 0]} fov={30} />
          </div>
        </div>
      </div>

      {/* Hero content */}
      <div className="hero-content" style={{ position: 'relative', zIndex: 2 }}>
        <p className="hero-eyebrow">
  <span className="eyebrow-line" />
  <span>BSIT · SOFTWARE · <span className="eyebrow-neust">NEUST</span></span>
</p>

        <h1 className="hero-name">
          <span className="line-1">Samuel</span>
          <span className="line-2">Salvatierra</span>
        </h1>

        <div className="hero-role-wrap">
          <span className="prompt">&gt;</span>
          <span id="typewriter">{text}</span>
          <span id="typewriter-cursor" />
        </div>

        <p className="hero-sub">
          Passionate IT student building games,<br />
          office, and web applications.<br />
          Turning ideas into code — one project at a time.
        </p>

        <div className="hero-skills">
          {['HTML / CSS / JS', 'Python', 'Unity / C#', 'C++', 'MySQL', 'Tkinter', 'Pygame'].map(
            (skill) => (
              <span className="skill-pill" key={skill}>{skill}</span>
            )
          )}
        </div>

        <div className="hero-cta">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-ghost"><span>Contact Me</span></a>
        </div>
      </div>

    </section>
  );
}