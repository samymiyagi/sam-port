import idleGif from '../assets/idle1.gif';

const details = [
  { key: 'Age',      val: '20' },
  { key: 'Gender',   val: 'Male' },
  { key: 'Birthday', val: 'December 24, 2005' },
  { key: 'Location', val: 'Brgy. Rizal, San Leonardo, Nueva Ecija' },
  { key: 'School',   val: 'NEUST' },
  { key: 'Program',  val: 'BS Information Technology · 2H' },
];

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="reveal">
          <img className="section-sprite2" src={idleGif} alt="" aria-hidden="true" />
          <p className="section-label">Background</p>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-text reveal reveal-delay-1">
            <p>
              Hey, I'm <strong>Sam</strong> — a college student at NEUST pursuing a Bachelor of
              Science in Information Technology. I'm passionate about turning ideas into real,
              working things: games, tools, scripts, websites.
            </p>
            <p>
              I've been exploring different corners of tech: from low-level C++ systems programming
              to game development in Unity, from Python scripts to frontend web work. I love the
              moment when something finally runs.
            </p>
            <div className="goals-block">
              <h4>Career Goals</h4>
              <p>
                My goal is to become a skilled full-stack developer and contribute to meaningful
                projects in the tech industry. I'm eager to continuously learn, grow, and innovate
                through collaboration and hands-on experience.
              </p>
            </div>
          </div>

          <div className="about-details reveal reveal-delay-2">
            {details.map((d) => (
              <div className="detail-row" key={d.key}>
                <span className="detail-key">{d.key}</span>
                <span className="detail-val">{d.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
