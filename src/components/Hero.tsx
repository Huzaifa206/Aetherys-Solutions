'use client';

import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse-reactive lighting
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (lightRef.current) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        lightRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(255, 61, 0, 0.07), transparent 60%)`;
      }
      if (orb1Ref.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        orb1Ref.current.style.transform = `translate(${x * 30}px, ${y * 20}px)`;
      }
      if (orb2Ref.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        orb2Ref.current.style.transform = `translate(${-x * 20}px, ${-y * 15}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle canvas
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Array<{
      x: number; y: number; vx: number; vy: number;
      size: number; alpha: number; color: string;
    }> = [];

    const colors = ['rgba(255,61,0,', 'rgba(0,245,255,', 'rgba(139,92,246,'];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(245,245,245,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const handleScrollDown = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero} ref={containerRef} id="hero">
      {/* Particle field */}
      <canvas ref={particleCanvasRef} className={styles.particles} />

      {/* Mouse-reactive light */}
      <div ref={lightRef} className={styles.mouseLight} />

      {/* Grid background */}
      <div className={styles.grid} />

      {/* Scanline */}
      <div className={styles.scanline} />

      {/* Floating orbs */}
      <div ref={orb1Ref} className={styles.orb1} />
      <div ref={orb2Ref} className={styles.orb2} />

      {/* Abstract 3D Object */}
      <div className={styles.abstract3d}>
        <div className={styles.ring1} />
        <div className={styles.ring2} />
        <div className={styles.ring3} />
        <div className={styles.core}>
          <div className={styles.coreInner} />
        </div>
        <div className={styles.glowOrb} />
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.satellite} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Label */}
        <div className={styles.label}>
          <span className={styles.labelDot} />
          <span>AI • Web • Automation • Growth</span>
          <span className={styles.labelDot} />
        </div>

        {/* Hero Headline */}
        <h1 className={styles.headline}>
          <span className={styles.headlineTop}>DOMINATING</span>
          <span className={styles.headlineMid}>
            <span className={styles.headlineAccent}>DIGITAL</span>
          </span>
          <span className={styles.headlineBot}>EXPERIENCES</span>
        </h1>

        {/* Sub text */}
        <p className={styles.subtext}>
          We engineer the intersection of intelligence, design, and automation —<br />
          building systems that scale, adapt, and win.
        </p>

        {/* CTAs */}
        <div className={styles.ctas}>
          <button className={styles.ctaPrimary} onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className={styles.ctaBg} />
            <span className={styles.ctaLabel}>Start a Project</span>
            <span className={styles.ctaIcon}>→</span>
          </button>
          <button className={styles.ctaSecondary} onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className={styles.ctaLabel}>Explore Services</span>
            <span className={styles.ctaIcon}>↓</span>
          </button>
        </div>

        {/* Stats row */}
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>100<span className={styles.statUnit}>%</span></span>
            <span className={styles.statLabel}>AI-First Approach</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>5<span className={styles.statUnit}>x</span></span>
            <span className={styles.statLabel}>Faster Delivery</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>∞</span>
            <span className={styles.statLabel}>Scalability Built In</span>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button className={styles.scrollHint} onClick={handleScrollDown}>
        <div className={styles.scrollWheel} />
        <span>Scroll</span>
      </button>

      {/* Corner decorations */}
      <div className={styles.cornerTL} />
      <div className={styles.cornerBR} />

      {/* Side label */}
      <div className={styles.sideLabel}>
        <span>EST. 2024</span>
      </div>
    </section>
  );
}
