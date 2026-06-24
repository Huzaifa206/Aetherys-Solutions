'use client';

import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const pillars = [
  { icon: '◈', label: 'AI-First', desc: 'Every solution is engineered with intelligence at its core — not bolted on.' },
  { icon: '◆', label: 'Engineering Excellence', desc: 'Production-grade code, clean architecture, and scalable design patterns.' },
  { icon: '▸', label: 'Fast Execution', desc: 'From concept to deployed product in weeks, not months.' },
  { icon: '⬡', label: 'Modern Stack', desc: 'Next.js, Python, LangChain, Vector DBs, Edge Computing — we speak the language.' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      <div className={styles.container}>
        {/* Label */}
        <div className={`${styles.label} label reveal`}>
          <span>Who We Are</span>
        </div>

        {/* Main Statement */}
        <div className={styles.statement}>
          <h2 className={`${styles.statementText} reveal`}>
            We build scalable digital<br />
            <span className={styles.statementAccent}>systems,</span>{' '}
            not just websites.
          </h2>

          {/* Right side description */}
          <div className={`${styles.statementRight} reveal delay-2`}>
            <p>
              Founded by two engineers obsessed with the intersection of AI and product engineering —
              we don&apos;t do templates, we don&apos;t do generic. Every engagement is a custom-architected
              system built for growth, scale, and measurable ROI.
            </p>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              <span>Available for projects</span>
            </div>
          </div>
        </div>

        {/* Pillars */}
        <div className={styles.pillars}>
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className={`${styles.pillar} reveal delay-${i + 1}`}
            >
              <div className={styles.pillarIcon}>{p.icon}</div>
              <div className={styles.pillarContent}>
                <h3 className={styles.pillarLabel}>{p.label}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
              <div className={styles.pillarLine} />
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className={styles.marqueeWrap}>
          <div className={styles.marquee}>
            {[...Array(3)].map((_, i) => (
              <span key={i} className={styles.marqueeTrack}>
                {['FULL STACK', 'AI SYSTEMS', 'AUTOMATION', 'GROWTH ENGINEERING', 'SaaS PRODUCTS', 'AI AGENTS'].map((t, j) => (
                  <span key={j} className={styles.marqueeItem}>
                    <span className={styles.marqueeDot}>✦</span>
                    {t}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating decorative number */}
      <div className={styles.bigNum}>02</div>
    </section>
  );
}
