'use client';

import { useEffect, useRef } from 'react';
import styles from './Founders.module.css';

const founders = [
  {
    initials: 'HA',
    name: 'Hunain Ahmed',
    role: 'Co-Founder & Lead Engineer',
    bio: 'Full-stack architect obsessed with building systems that scale. Specializes in Next.js, distributed systems, and turning complex requirements into elegant, production-ready code.',
    philosophy: '"The best code is the code that makes itself obsolete — replaced by a smarter system."',
    skills: ['Full Stack Dev', 'System Design', 'API Architecture'],
    color: 'red',
    accent: '#FF3D00',
  },
  {
    initials: 'HS',
    name: 'Huzaifa Ahmed Siddiqui',
    role: 'Co-Founder & AI Systems Lead',
    bio: 'AI engineer who believes automation should amplify human potential, not replace it. Builds production-grade LLM pipelines, agent systems, and intelligent automation that actually works.',
    philosophy: '"We are not building chatbots. We are building cognitive infrastructure for the next era of business."',
    skills: ['LLM Systems', 'Agent Design', 'Growth Strategy'],
    color: 'cyan',
    accent: '#00F5FF',
  },
];

export default function Founders() {
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
    <section className={styles.founders} id="founders" ref={sectionRef}>
      {/* Background elements */}
      <div className={styles.bgLine1} />
      <div className={styles.bgLine2} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`label reveal`}>
            <span>The Team</span>
          </div>
          <h2 className={`${styles.title} reveal delay-2`}>
            Built by Engineers<br />
            <span className={styles.titleAccent}>Who Ship</span>
          </h2>
          <p className={`${styles.subtitle} reveal delay-3`}>
            Two builders from university with one obsession: creating digital systems that redefine
            what&apos;s possible for ambitious businesses.
          </p>
        </div>

        {/* Founders grid */}
        <div className={styles.grid}>
          {founders.map((f, i) => (
            <div
              key={f.name}
              className={`${styles.card} ${styles[`card_${f.color}`]} reveal delay-${i + 1}`}
            >
              {/* Avatar */}
              <div className={styles.avatarWrap}>
                <div className={styles.avatarRing} style={{ '--accent': f.accent } as React.CSSProperties} />
                <div className={styles.avatar} style={{ '--accent': f.accent } as React.CSSProperties}>
                  <span className={styles.initials}>{f.initials}</span>
                  <div className={styles.avatarGlow} style={{ background: `radial-gradient(circle, ${f.accent}30, transparent 70%)` }} />
                </div>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <h3 className={styles.name}>{f.name}</h3>
                  <div className={styles.statusBadge}>
                    <span className={styles.statusDot} style={{ background: f.accent, boxShadow: `0 0 8px ${f.accent}` }} />
                    <span className={styles.statusText}>Available</span>
                  </div>
                </div>
                <p className={`${styles.role} ${styles[`color_${f.color}`]}`}>{f.role}</p>

                {/* Skills */}
                <div className={styles.skills}>
                  {f.skills.map(skill => (
                    <span key={skill} className={`${styles.skill} ${styles[`skill_${f.color}`]}`}>{skill}</span>
                  ))}
                </div>

                {/* Bio */}
                <p className={styles.bio}>{f.bio}</p>

                {/* Philosophy */}
                <blockquote className={`${styles.philosophy} ${styles[`quote_${f.color}`]}`}>
                  {f.philosophy}
                </blockquote>
              </div>

              {/* Decorative elements */}
              <div className={styles.cardLine} style={{ background: f.accent } as React.CSSProperties} />
              <div className={styles.cardNum}>0{i + 1}</div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className={`${styles.statement} reveal delay-3`}>
          <div className={styles.statementLine} />
          <p className={styles.statementText}>
            Both students. Both builders. Zero excuses.
          </p>
          <div className={styles.statementLine} />
        </div>
      </div>
    </section>
  );
}
