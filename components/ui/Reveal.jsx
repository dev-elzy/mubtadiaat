"use client";

import { useEffect, useRef } from 'react';

export default function Reveal({ children, className = '', id, style, as: Component = 'div' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            // Optional: observer.unobserve(entry.target) if we only want it to reveal once
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <Component ref={ref} className={`reveal ${className}`} id={id} style={style}>
      {children}
    </Component>
  );
}
