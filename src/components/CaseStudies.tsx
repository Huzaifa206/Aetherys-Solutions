'use client';

import { useEffect, useRef } from 'react';
import styles from './CaseStudies.module.css';

const cases = [
  {
    id: 'ai-support',
    tag: 'Concept System',
    num: '01',
    title: 'AI Support Engine',
    desc: 'A multi-agent customer support system that handles 94% of queries autonomously — learning from every interaction to continuously improve.',
    tech: ['GPT-4o', 'LangChain', 'Redis', 'Next.js'],
    metrics: [{ label: 'Ticket Deflection', value: '94%' }, { label: 'Response Time', value: '<3s' }],
    color: 'red',
    gradient: 'linear-gradient(135deg, rgba(255,61,0,0.15) 0%, rgba(10,10,10,0) 60%)',
  },
  {
    id: 'analytics',
    tag: 'Concept System',
    num: '02',
    title: 'Smart Analytics\nDashboard',
    desc: 'Real-time business intelligence with AI-powered anomaly detection, predictive forecasting, and natural language query interface.',
    tech: ['Python', 'ClickHouse', 'React', 'FastAPI'],
    metrics: [{ label: 'Data Points/s', value: '50K+' }, { label: 'Prediction Accuracy', value: '91%' }],
    color: 'cyan',
    gradient: 'linear-gradient(135deg, rgba(0,245,255,0.1) 0%, rgba(10,10,10,0) 60%)',
  },
  {
    id: 'automation',
    tag: 'Concept System',
    num: '03',
    title: 'Enterprise\nAutomation System',
    desc: 'End-to-end workflow automation connecting CRMs, ERPs, and marketing tools — eliminating manual work across entire departments.',
    tech: ['n8n', 'Python', 'Webhooks', 'PostgreSQL'],
    metrics: [{ label: 'Hours Saved/Month', value: '400+' }, { label: 'Error Rate', value: '0.1%' }],
    color: 'purple',
    gradient: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(10,10,10,0) 60%)',
  },
  {
    id: 'ecommerce',
    tag: 'Concept System',
    num: '04',
    title: 'AI E-Commerce\nEngine',
    desc: 'Personalized recommendation engine, dynamic pricing AI, and autonomous inventory management — built for Shopify-scale operations.',
    tech: ['Next.js', 'Pinecone', 'Stripe', 'LangChain'],
    metrics: [{ label: 'Conversion Lift', value: '+34%' }, { label: 'AOV Increase', value: '+22%' }],
    color: 'red',
    gradient: 'linear-gradient(135deg, rgba(255,61,0,0.12) 0%, rgba(10,10,10,0) 60%)',
  },
];

export default function CaseStudies() {
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
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.caseStudies} id="case-studies" ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`label reveal`}>
            <span>Concept Systems</span>
          </div>
          <h2 className={`${styles.title} reveal delay-2`}>
            Built to Prove<br />
            <span className={styles.titleStroke}>What&apos;s Possible</span>
          </h2>
          <p className={`${styles.subtitle} reveal delay-3`}>
            These are conceptual systems — blueprints of what we engineer for clients.
            Each represents a category of solution we deliver.
          </p>
        </div>

        {/* Case studies grid */}
        <div className={styles.grid}>
          {cases.map((c, i) => (
            <div
              key={c.id}
              className={`${styles.card} ${styles[`card_${c.color}`]} reveal delay-${(i % 2) + 1}`}
            >
              {/* Background gradient */}
              <div className={styles.cardBg} style={{ background: c.gradient }} />

              {/* Top bar */}
              <div className={styles.cardTop}>
                <span className={`${styles.cardTag} ${styles[`tag_${c.color}`]}`}>{c.tag}</span>
                <span className={styles.cardNum}>{c.num}</span>
              </div>

              {/* Mock UI Visualization */}
              <div className={`${styles.mockui} ${styles[`mockui_${c.color}`]}`}>
                <div className={styles.mockHeader}>
                  <div className={styles.mockDot} />
                  <div className={styles.mockDot} />
                  <div className={styles.mockDot} />
                  <div className={styles.mockTitle}>aetherys_system_{c.id}.exe</div>
                </div>
                <div className={styles.mockBody}>
                  {/* Different mock UIs per card */}
                  {c.id === 'ai-support' && <SupportMock color={c.color} />}
                  {c.id === 'analytics' && <AnalyticsMock color={c.color} />}
                  {c.id === 'automation' && <AutomationMock color={c.color} />}
                  {c.id === 'ecommerce' && <EcommerceMock color={c.color} />}
                </div>
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  {c.title.split('\n').map((line, j) => (
                    <span key={j}>{line}{j === 0 && c.title.includes('\n') && <br />}</span>
                  ))}
                </h3>
                <p className={styles.cardDesc}>{c.desc}</p>

                {/* Metrics */}
                <div className={styles.metrics}>
                  {c.metrics.map(m => (
                    <div key={m.label} className={styles.metric}>
                      <span className={`${styles.metricVal} ${styles[`color_${c.color}`]}`}>{m.value}</span>
                      <span className={styles.metricLabel}>{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className={styles.tech}>
                  {c.tech.map(t => (
                    <span key={t} className={styles.techTag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Mock UI components
function SupportMock({ color }: { color: string }) {
  return (
    <div className={styles.supportMock}>
      {['Query received: Refund status?', 'AI processing...', '✓ Response sent: 2.1s', 'Escalation: 0'].map((line, i) => (
        <div key={i} className={`${styles.logLine} ${i === 1 ? styles[`logActive_${color}`] : ''}`}>
          <span className={styles.logDot} />
          <span>{line}</span>
        </div>
      ))}
      <div className={styles.progressBar}>
        <div className={`${styles.progressFill} ${styles[`fill_${color}`]}`} style={{ width: '94%' }} />
      </div>
      <div className={styles.progressLabel}>94% autonomous resolution rate</div>
    </div>
  );
}

function AnalyticsMock({ color }: { color: string }) {
  const bars = [65, 40, 85, 55, 90, 70, 45, 80];
  return (
    <div className={styles.analyticsMock}>
      <div className={styles.chartBars}>
        {bars.map((h, i) => (
          <div key={i} className={styles.barWrap}>
            <div
              className={`${styles.bar} ${styles[`bar_${color}`]}`}
              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
            />
          </div>
        ))}
      </div>
      <div className={styles.chartLine}>
        <svg viewBox="0 0 100 30" className={styles.lineSvg}>
          <polyline
            points="0,25 15,18 30,22 45,10 60,15 75,5 90,12 100,8"
            fill="none"
            stroke={color === 'cyan' ? 'rgba(0,245,255,0.8)' : 'rgba(255,61,0,0.8)'}
            strokeWidth="1.5"
          />
          <polyline
            points="0,25 15,18 30,22 45,10 60,15 75,5 90,12 100,8"
            fill="none"
            stroke={color === 'cyan' ? 'rgba(0,245,255,0.2)' : 'rgba(255,61,0,0.2)'}
            strokeWidth="6"
          />
        </svg>
      </div>
    </div>
  );
}

function AutomationMock({ color }: { color: string }) {
  const nodes = ['CRM', 'AI Filter', 'Email', 'Slack', 'Report'];
  return (
    <div className={styles.automationMock}>
      <div className={styles.flowNodes}>
        {nodes.map((node, i) => (
          <div key={node} className={styles.flowNodeWrap}>
            <div className={`${styles.flowNode} ${styles[`node_${color}`]}`}>{node}</div>
            {i < nodes.length - 1 && (
              <div className={`${styles.flowEdge} ${styles[`edge_${color}`]}`} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.flowStats}>
        <span className={`${styles.flowStat} ${styles[`color_${color}`]}`}>↗ 400h/mo saved</span>
        <span className={styles.flowStat2}>0 errors today</span>
      </div>
    </div>
  );
}

function EcommerceMock({ color }: { color: string }) {
  return (
    <div className={styles.ecommerceMock}>
      <div className={styles.recs}>
        {['Wireless Headphones', 'Smart Watch Pro', 'USB-C Hub'].map((item, i) => (
          <div key={item} className={styles.recItem}>
            <div className={`${styles.recThumb} ${styles[`thumb_${color}`]}`} />
            <div className={styles.recInfo}>
              <div className={styles.recName}>{item}</div>
              <div className={`${styles.recScore} ${styles[`color_${color}`]}`}>{95 - i * 4}% match</div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.convBadge}>
        <span className={`${styles.convUp} ${styles[`color_${color}`]}`}>↑ +34%</span>
        <span className={styles.convLabel}>Conversion Rate</span>
      </div>
    </div>
  );
}
