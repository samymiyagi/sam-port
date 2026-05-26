const skills = [
  {
    name: 'HTML / CSS / JS',
    sub: 'Frontend Web',
    level: '80%',
    delay: 'reveal-delay-1',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
  },
  {
    name: 'Python',
    sub: 'GUI · Games',
    level: '75%',
    delay: 'reveal-delay-2',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    name: 'Unity / C#',
    sub: '2D · 3D · Horror',
    level: '70%',
    delay: 'reveal-delay-3',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
  },
  {
    name: 'C++',
    sub: 'Systems Programming',
    level: '65%',
    delay: 'reveal-delay-1',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
  },
  {
    name: 'MySQL',
    sub: 'Databases',
    level: '60%',
    delay: 'reveal-delay-2',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
  },
  {
    name: 'Git / GitHub',
    sub: 'Version Control',
    level: '55%',
    delay: 'reveal-delay-3',
    icon: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <div className="reveal">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">Skills</h2>
        </div>
        <div className="skills-grid">
          {skills.map((s) => (
            <div
              key={s.name}
              className={`skill-card reveal ${s.delay}`}
              style={{ '--skill-level': s.level }}
            >
              <div className="skill-card-icon">{s.icon}</div>
              <div className="skill-card-name">{s.name}</div>
              <div className="skill-card-sub">{s.sub}</div>
              <div className="skill-bar-wrap">
                <div className="skill-bar" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
