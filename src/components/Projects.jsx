import { useEffect } from 'react';
import witchyGif from '../assets/witchy.gif';
import unityImg from '../assets/UNITY.png';
import gameVid from '../assets/gamevid.mp4';
import fittechImg from '../assets/fittech.png';
import calcuImg from '../assets/CALCU.png';
import snakeImg from '../assets/SNAKE.png';
import ivoryImg from '../assets/ivory.jpg';
import ModelViewer from './ModelViewer';
import terrariumGLB from '../assets/smol_ame_in_an_upcycled_terrarium_hololiveen.glb';

const projects = [
  {
    id: 'unity-2d',
    tag: 'Unity · C# · Indie',
    title: '2D Indie Game in Unity',
    desc: 'A 2D interactive game with dialogues and level design implemented from scratch.',
    featured: true,
    type: 'video',
    src: gameVid,
    alt: '2D Unity game demo',
  },
  {
    id: 'terrarium-model',
    tag: '3D Model · Sketchfab',
    title: 'Smol Ame — Terrarium',
    desc: 'Interactive 3D model viewer. Drag to spin the model around — it auto-rotates when idle.',
    type: 'model',
    glb: terrariumGLB,
    modelScale: 1.1,
    cameraZ: 5,
    offsetX: 0,
    offsetY: -1.5,
    roughness: 1,
    metalness: 0,
    link: 'https://sketchfab.com/3d-models/smol-ame-in-an-upcycled-terrarium-hololiveen-490cecc249d242188fda5ad3160a4b24',
  },
  {
    id: 'fittech',
    tag: 'PHP · SQL',
    title: 'Fittech Website',
    desc: 'FitTech is a full-stack gym management system built with PHP/MySQL and JavaFX, featuring member check-ins, trainer scheduling, a product shop, renewal workflows etc...',
    type: 'img',
    src: fittechImg,
    alt: 'Fittech gym management system screenshot',
    link: 'https://fittech.space/',
  },
  {
    id: 'ivory',
    tag: 'React Native · Supabase · Mobile Dev ',
    title: 'Ivory Tinda And Earn',
    desc: 'Ivory is a mobile app for small food businesses like bakeries, food carts, and vendors. It tracks production, sales, inventory, and automatically calculates costs and profits. It includes low-stock alerts, product templates, batch tracking, sales reports, restocking, and CSV/Excel exports. Built with React Native, Expo, and Supabase for real-time data syncing.',
    type: 'img',
    portrait: true,
    src: ivoryImg,
    alt: 'Ivory project',
     link: 'https://expo.dev/accounts/samyboiryota/projects/ivory-app/builds/2bc094a7-bb9b-45d7-b459-b555829150fc',
  },
  {
    id: 'calculator',
    tag: 'Python · Tkinter',
    title: 'Calculator',
    desc: "GUI calculator built with Python's Tkinter library supporting full arithmetic operations.",
    type: 'img',
    src: calcuImg,
    alt: 'Python Calculator app screenshot',
  },
  {
    id: 'snake',
    tag: 'Python · Pygame',
    title: 'Snake Game',
    desc: 'Classic snake game built in Python using Pygame with score tracking and collision detection.',
    type: 'img',
    src: snakeImg,
    alt: 'Snake game in Python screenshot',
  },
  {
    id: 'horror-game',
    tag: 'Unity · C# · Horror',
    title: 'Horror Game in Unity',
    desc: 'A first-person horror experience built in Unity using C# scripting, lighting, and atmospheric design.',
    type: 'img',
    src: unityImg,
    alt: 'Horror game in Unity screenshot',
    link: 'https://samyyboii.itch.io/wrong-wake',
  },
];

export default function Projects() {
  useEffect(() => {
    const handler = (e) => {
      const card = e.currentTarget;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
    };
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((c) => c.addEventListener('mousemove', handler));
    return () => cards.forEach((c) => c.removeEventListener('mousemove', handler));
  }, []);

  return (
    <section id="projects">
      <div className="wrap">
        <div className="projects-header reveal">
          <img className="section-sprite" src={witchyGif} alt="" aria-hidden="true" />
          <p className="section-label">Selected work</p>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="projects-grid">
          {projects.map((p, i) => {
            const cardClass = `project-card reveal${p.featured ? ' featured' : ''}${p.type === 'model' ? ' model-card' : ''}${p.portrait ? ' portrait' : ''}${
              i % 3 === 1 ? ' reveal-delay-1' : i % 3 === 2 ? ' reveal-delay-2' : ''
            }${p.link ? ' clickable' : ''}`;

            const inner = (
              <>
                <div className={`project-media-wrap${p.type === 'model' ? ' model-media-wrap' : ''}`}>
                  {p.type === 'video' ? (
                    <video
                      className="project-media"
                      autoPlay muted loop playsInline
                      src={p.src}
                      aria-label={p.alt}
                    />
                  ) : p.type === 'model' ? (
                    <ModelViewer
                      url={p.glb}
                      modelScale={p.modelScale}
                      cameraZ={p.cameraZ}
                      offsetX={p.offsetX ?? 0}
                      offsetY={p.offsetY ?? 0}
                      roughness={p.roughness ?? 1}
                      metalness={p.metalness ?? 0}
                      envPreset={p.envPreset ?? 'apartment'}
                      envIntensity={p.envIntensity ?? 2.5}
                      exposure={p.exposure ?? 1.0}
                    />
                  ) : p.src ? (
                    <img className="project-media" src={p.src} alt={p.alt} />
                  ) : null}
                </div>
                <div className="project-body">
                  <p className="project-tag">{p.tag}</p>
                  <h3 className="project-title">
                    {p.title}
                    {p.link && (
                      <span className="project-link-icon" aria-hidden="true">↗</span>
                    )}
                  </h3>
                  <p className="project-desc">{p.desc}</p>
                </div>
              </>
            );

            if (p.type === 'model' && p.link) {
              return (
                <div key={p.id + i} className={cardClass}>
                  <div className="project-media-wrap model-media-wrap">
                    <ModelViewer
                      url={p.glb}
                      modelScale={p.modelScale}
                      cameraZ={p.cameraZ}
                      offsetX={p.offsetX ?? 0}
                      offsetY={p.offsetY ?? 0}
                      roughness={p.roughness ?? 1}
                      metalness={p.metalness ?? 0}
                      envPreset={p.envPreset ?? 'apartment'}
                      envIntensity={p.envIntensity ?? 2.5}
                      exposure={p.exposure ?? 1.0}
                    />
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-body project-body-link"
                  >
                    <p className="project-tag">{p.tag}</p>
                    <h3 className="project-title">
                      {p.title}
                      <span className="project-link-icon" aria-hidden="true">↗</span>
                    </h3>
                    <p className="project-desc">{p.desc}</p>
                  </a>
                </div>
              );
            }

            return p.link ? (
              <a
                key={p.id + i}
                className={cardClass}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {inner}
              </a>
            ) : (
              <div key={p.id + i} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
