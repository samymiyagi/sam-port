import { useState, useEffect } from 'react';

const ROLES = [
  'IT Student @ NEUST',
  'Game Developer',
  'Frontend Dev',
  'Python Enthusiast',
  'Full-Stack Learner',
];

export function useTypewriter() {
  const [text, setText] = useState('');

  useEffect(() => {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let timer;

    function loop() {
      const current = ROLES[roleIdx];
      if (!deleting) {
        charIdx++;
        setText(current.slice(0, charIdx));
        if (charIdx === current.length) {
          deleting = true;
          timer = setTimeout(loop, 4000);  // ← was 3000, pause longer after full word
          return;
        }
      } else {
        charIdx--;
        setText(current.slice(0, charIdx));
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
          timer = setTimeout(loop, 1200);  // ← was 800, pause longer before next word
          return;
        }
      }
      timer = setTimeout(loop, deleting ? 120 : 160);  // ← was 80/120, slower typing/deleting
    }

    timer = setTimeout(loop, 1500);  // ← was 1200, slightly longer initial delay
    return () => clearTimeout(timer);
  }, []);

  return text;
}