const ITEMS = [
  'HTML','CSS','JavaScript','Python','Unity','C#','C++',
  'MySQL','Git','Pygame','Tkinter','NEUST','BSIT','2025',
];

// Quadruple for seamless loop
const MARQUEE_ITEMS = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS];

export default function Marquee() {
  return (
    <div className="marquee-section" aria-hidden="true">
      <div className="marquee-track" id="marquee-track">
        {MARQUEE_ITEMS.map((item, i) => (
          <span className="marquee-item" key={i}>
            <span className="marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
