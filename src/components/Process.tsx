'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Process.module.css';

const steps = [
  {
    num: '01',
    phase: 'Discover',
    title: 'Deep Dive into\nYour Problem',
    desc: 'We immerse ourselves in your business context, user behavior, technical constraints, and growth objectives. No assumptions — only data-driven clarity.',
    detail: 'Stakeholder interviews · Technical audit · Competitive analysis · KPI definition',
    color: 'red',
  },
  {
    num: '02',
    phase: 'Design',
    title: 'Architect the\nSystem',
    desc: 'Before a single line of code, we blueprint the full system architecture — data models, API contracts, AI pipelines, and UI flows that scale from day one.',
    detail: 'System architecture · UI/UX wireframes · AI pipeline design · Tech stack selection',
    color: 'cyan',
  },
  {
    num: '03',
    phase: 'Build',
    title: 'Engineer with\nPrecision',
    desc: 'Full-stack development with production-grade standards. CI/CD pipelines, automated testing, and clean, documented code from the start.',
    detail: 'Agile sprints · Code reviews · Automated testing · Live staging environments',
    color: 'red',
  },
  {
    num: '04',
    phase: 'Integrate AI',
    title: 'Embed\nIntelligence',
    desc: 'We inject AI capabilities directly into your product — LLM integrations, autonomous agents, predictive analytics, and intelligent automation layers.',
    detail: 'LLM fine-tuning · Agent orchestration · Vector DB setup · RAG pipelines',
    color: 'purple',
  },
  {
    num: '05',
    phase: 'Deploy',
    title: 'Launch to\nProduction',
    desc: 'Zero-downtime deployments, edge-cached performance, monitoring dashboards, and post-launch support to ensure everything runs at peak performance.',
    detail: 'Edge deployment · Performance monitoring · Error tracking · Load testing',
    color: 'cyan',
  },
  {
    num: '06',
    phase: 'Scale',
    title: 'Grow Without\nLimits',
    desc: 'Continuous optimization, feature iteration, and growth engineering. Your system evolves as your business grows — built for compounding returns.',
    detail: 'A/B testing · Analytics loops · Capacity scaling · Feature roadmap',
    color: 'red',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
              el.classList.add('visible');
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.process} id="process" ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`label reveal`}>
            <span>How We Work</span>
          </div>
          <h2 className={`${styles.title} reveal delay-2`}>
            The Process
          </h2>
        </div>

        {/* Steps Layout */}
        <div className={styles.layout}>
          {/* Left: step list */}
          <div className={styles.stepList}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`${styles.stepItem} ${activeStep === i ? styles.stepActive : ''} ${styles[`step_${step.color}`]} reveal delay-${i % 3 + 1}`}
                onMouseEnter={() => setActiveStep(i)}
              >
                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.stepMeta}>
                  <span className={styles.stepPhase}>{step.phase}</span>
                  <h3 className={styles.stepTitle}>
                    {step.title.split('\n').join(' ')}
                  </h3>
                </div>
                <div className={styles.stepArrow}>→</div>
              </div>
            ))}
          </div>

          {/* Right: detail panel */}
          <div className={styles.detailPanel}>
            <div className={styles.detailSticky}>
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  className={`${styles.detail} ${activeStep === i ? styles.detailActive : ''}`}
                >
                  <div className={styles.detailPhaseTag}>
                    <span className={`${styles.detailPhaseNum} ${styles[`color_${step.color}`]}`}>{step.num}</span>
                    <span className={styles.detailPhaseLabel}>{step.phase}</span>
                  </div>

                  <h3 className={styles.detailTitle}>
                    {step.title.split('\n').map((line, j) => (
                      <span key={j}>{line}<br /></span>
                    ))}
                  </h3>

                  <p className={styles.detailDesc}>{step.desc}</p>

                  <div className={styles.detailTags}>
                    {step.detail.split(' · ').map(tag => (
                      <span key={tag} className={`${styles.detailTag} ${styles[`tagColor_${step.color}`]}`}>{tag}</span>
                    ))}
                  </div>

                  {/* Visual indicator */}
                  <div className={`${styles.detailViz} ${styles[`viz_${step.color}`]}`}>
                    <div className={styles.vizLine} />
                    <div className={styles.vizNode} />
                    <div className={styles.vizLine} />
                    <div className={styles.vizNodeSmall} />
                    <div className={styles.vizLine} />
                    <div className={styles.vizNode} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* BG decoration */}
      <div className={styles.bgNum}>{String(activeStep + 1).padStart(2, '0')}</div>
    </section>
  );
}
