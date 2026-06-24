'use client';

import { useEffect, useRef } from 'react';
import styles from './AIShowcase.module.css';

const nodes = [
  { id: 'input', label: 'INPUT', sublabel: 'Data & Queries', x: 8, y: 50, color: '#FF3D00' },
  { id: 'process', label: 'AI CORE', sublabel: 'LLM + Reasoning', x: 32, y: 50, color: '#00F5FF' },
  { id: 'agents', label: 'AGENTS', sublabel: 'Multi-Agent Tasks', x: 56, y: 30, color: '#8B5CF6' },
  { id: 'automation', label: 'AUTOMATION', sublabel: 'Workflow Engine', x: 56, y: 70, color: '#8B5CF6' },
  { id: 'output', label: 'OUTPUT', sublabel: 'Business Actions', x: 80, y: 50, color: '#00F5FF' },
  { id: 'growth', label: 'GROWTH', sublabel: 'Compounding ROI', x: 96, y: 50, color: '#FF3D00' },
];

const connections = [
  { from: 'input', to: 'process' },
  { from: 'process', to: 'agents' },
  { from: 'process', to: 'automation' },
  { from: 'agents', to: 'output' },
  { from: 'automation', to: 'output' },
  { from: 'output', to: 'growth' },
];

export default function AIShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.showcase} id="ai-showcase" ref={sectionRef}>
      {/* Background glow effects */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={`label reveal`}>
            <span>Intelligence Architecture</span>
          </div>
          <h2 className={`${styles.title} reveal delay-2`}>
            Engineering Intelligence<br />
            <span className={styles.titleAccent}>into Business Systems</span>
          </h2>
          <p className={`${styles.subtitle} reveal delay-3`}>
            Our AI architecture connects every layer of your business —
            from data ingestion to autonomous action to measurable outcomes.
          </p>
        </div>

        {/* Neural Network Visualization */}
        <div className={`${styles.vizWrapper} reveal-scale delay-2`}>
          {/* Sci-fi frame */}
          <div className={styles.frame}>
            <div className={styles.frameCorner} data-pos="tl" />
            <div className={styles.frameCorner} data-pos="tr" />
            <div className={styles.frameCorner} data-pos="bl" />
            <div className={styles.frameCorner} data-pos="br" />
            <div className={styles.frameLabel}>AETHERYS AI ARCHITECTURE v2.4</div>
            <div className={styles.framePulse}>
              <span className={styles.framePulseDot} />
              LIVE
            </div>
          </div>

          {/* SVG Network */}
          <svg
            ref={svgRef}
            className={styles.network}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="glow-red">
                <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow-cyan">
                <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <marker id="arrow-red" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="rgba(255,61,0,0.6)" />
              </marker>
              <marker id="arrow-cyan" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="rgba(0,245,255,0.6)" />
              </marker>
              <marker id="arrow-purple" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto">
                <path d="M0,0 L4,2 L0,4 Z" fill="rgba(139,92,246,0.6)" />
              </marker>
            </defs>

            {/* Connection paths */}
            {connections.map((conn, i) => {
              const from = nodes.find(n => n.id === conn.from)!;
              const to = nodes.find(n => n.id === conn.to)!;
              const isVertical = Math.abs(from.y - to.y) > 5;
              const color = i % 3 === 0 ? 'rgba(255,61,0,0.4)' : i % 3 === 1 ? 'rgba(0,245,255,0.4)' : 'rgba(139,92,246,0.4)';
              const arrowId = i % 3 === 0 ? 'arrow-red' : i % 3 === 1 ? 'arrow-cyan' : 'arrow-purple';
              const cpx = (from.x + to.x) / 2;
              const d = isVertical
                ? `M ${from.x} ${from.y} C ${cpx} ${from.y}, ${cpx} ${to.y}, ${to.x} ${to.y}`
                : `M ${from.x} ${from.y} L ${to.x} ${to.y}`;

              return (
                <g key={i}>
                  {/* Base line */}
                  <path
                    d={d}
                    stroke="rgba(245,245,245,0.06)"
                    strokeWidth="0.15"
                    fill="none"
                  />
                  {/* Animated flow line */}
                  <path
                    d={d}
                    stroke={color}
                    strokeWidth="0.25"
                    fill="none"
                    strokeDasharray="3 6"
                    markerEnd={`url(#${arrowId})`}
                    className={styles.flowLine}
                    style={{ animationDelay: `${i * 0.7}s` } as React.CSSProperties}
                  />
                  {/* Data packet dot */}
                  <circle r="0.6" fill={color} className={styles.packet} style={{ animationDelay: `${i * 0.7}s`, '--d': d } as React.CSSProperties}>
                    <animateMotion
                      dur={`${2.5 + i * 0.5}s`}
                      repeatCount="indefinite"
                      begin={`${i * 0.7}s`}
                    >
                      <mpath xlinkHref={`#path-${i}`} />
                    </animateMotion>
                  </circle>
                  <path id={`path-${i}`} d={d} fill="none" style={{ display: 'none' }} />
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => (
              <g key={node.id} className={styles.node}>
                {/* Outer ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="5"
                  fill="none"
                  stroke={node.color}
                  strokeWidth="0.2"
                  strokeDasharray="1 2"
                  opacity="0.4"
                  className={styles.nodeRing}
                />
                {/* Core circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.5"
                  fill={`${node.color}22`}
                  stroke={node.color}
                  strokeWidth="0.3"
                  filter={node.color === '#FF3D00' ? 'url(#glow-red)' : 'url(#glow-cyan)'}
                  className={styles.nodeCore}
                />
                {/* Inner dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1"
                  fill={node.color}
                />
              </g>
            ))}
          </svg>

          {/* Node labels (HTML overlay for better text rendering) */}
          <div className={styles.nodeLabels}>
            {nodes.map(node => (
              <div
                key={node.id}
                className={styles.nodeLabel}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <div className={styles.nodeLabelInner} style={{ '--accent': node.color } as React.CSSProperties}>
                  <span className={styles.nodeName}>{node.label}</span>
                  <span className={styles.nodeSub}>{node.sublabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Scanlines */}
          <div className={styles.vizScanlines} />
        </div>

        {/* Bottom metrics */}
        <div className={styles.metrics}>
          {[
            { label: 'Processing Speed', value: '<100ms', color: 'red' },
            { label: 'Accuracy Rate', value: '98.7%', color: 'cyan' },
            { label: 'Automation Rate', value: '94%', color: 'purple' },
            { label: 'Cost Reduction', value: '60–80%', color: 'red' },
          ].map((m, i) => (
            <div key={m.label} className={`${styles.metric} reveal delay-${i + 1}`}>
              <span className={`${styles.metricValue} ${styles[`metric_${m.color}`]}`}>{m.value}</span>
              <span className={styles.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
