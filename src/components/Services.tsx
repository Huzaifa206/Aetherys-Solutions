'use client';

import { useEffect, useRef } from 'react';
import styles from './Services.module.css';

const services = [
  {
    num: '01',
    title: 'Full Stack\nDevelopment',
    desc: 'From database architecture to pixel-perfect frontends. We build complete, production-ready digital products using the most modern stacks in existence.',
    tags: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    color: 'red',
    size: 'large',
  },
  {
    num: '02',
    title: 'AI Integration\nSystems',
    desc: 'Embedding intelligence into your existing workflows. LLM pipelines, RAG systems, vector databases, and custom AI APIs that transform how your business operates.',
    tags: ['GPT-4o', 'LangChain', 'Pinecone', 'Python', 'FastAPI'],
    color: 'cyan',
    size: 'medium',
  },
  {
    num: '03',
    title: 'AI Agents &\nAutomation',
    desc: 'Multi-agent orchestration systems that handle complex tasks autonomously. From lead qualification to document processing — your 24/7 AI workforce.',
    tags: ['AutoGen', 'CrewAI', 'n8n', 'Zapier', 'Custom'],
    color: 'purple',
    size: 'medium',
  },
  {
    num: '04',
    title: 'SaaS Product\nDevelopment',
    desc: 'End-to-end SaaS architecture: multi-tenancy, billing, auth, dashboards, and everything in between. Launch fast, scale confidently.',
    tags: ['Stripe', 'Auth.js', 'Prisma', 'Redis', 'Vercel'],
    color: 'cyan',
    size: 'small',
  },
  {
    num: '05',
    title: 'Digital Growth\nEngineering',
    desc: 'Data-driven growth systems combining SEO, performance analytics, conversion optimization, and marketing automation for measurable, compounding growth.',
    tags: ['Analytics', 'SEO', 'A/B Testing', 'CRO', 'Funnels'],
    color: 'red',
    size: 'small',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

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
    <section className={styles.services} id="services" ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`label reveal`}>
            <span>What We Build</span>
          </div>
          <h2 className={`${styles.title} reveal delay-2`}>
            Services
          </h2>
          <p className={`${styles.subtitle} reveal delay-3`}>
            Every service is a full system — not a deliverable, but an engine for growth.
          </p>
        </div>

        {/* Services grid */}
        <div className={styles.grid}>
          {services.map((service, i) => (
            <div
              key={service.num}
              className={`${styles.card} ${styles[`card_${service.size}`]} ${styles[`card_${service.color}`]} reveal delay-${i + 1}`}
            >
              {/* Number */}
              <span className={styles.cardNum}>{service.num}</span>

              {/* Ambient glow */}
              <div className={styles.cardGlow} />

              {/* Content */}
              <div className={styles.cardContent}>
                {/* Color accent dot */}
                <div className={styles.cardAccent} />

                <h3 className={styles.cardTitle}>
                  {service.title.split('\n').map((line, j) => (
                    <span key={j}>{line}<br /></span>
                  ))}
                </h3>

                <p className={styles.cardDesc}>{service.desc}</p>

                <div className={styles.cardTags}>
                  {service.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className={styles.cardArrow}>→</div>
            </div>
          ))}
        </div>
      </div>

      {/* Background text */}
      <div className={styles.bgText}>SERVICES</div>
    </section>
  );
}
