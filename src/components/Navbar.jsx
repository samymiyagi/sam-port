import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const bar = document.getElementById('progress-bar');
    const backTop = document.getElementById('back-top');

    function onScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = (window.scrollY / total) * 100;
      bar.style.width = pct + '%';
      nav.classList.toggle('scrolled', window.scrollY > 20);
      backTop.classList.toggle('show', window.scrollY > 400);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav id="main-nav">
      <div className="inner">
        <span className="nav-logo">Sammy.Ryota</span>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </nav>
  );
}
