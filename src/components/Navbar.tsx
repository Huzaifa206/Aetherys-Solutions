'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'AI System', href: '#ai-showcase' },
  { label: 'Work', href: '#case-studies' },
  { label: 'Founders', href: '#founders' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Magnetic logo effect
  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = logo.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const strength = (100 - dist) / 100;
        logo.style.transform = `translate(${dx * strength * 0.3}px, ${dy * strength * 0.3}px)`;
      } else {
        logo.style.transform = '';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <a ref={logoRef} href="#" className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={styles.logoMark}>A</span>
          <span className={styles.logoText}>AETHERYS</span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <button className={styles.link} onClick={() => handleNav(link.href)}>
                {link.label}
                <span className={styles.linkLine} />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button className={styles.cta} onClick={() => handleNav('#contact')}>
          <span>Start a Project</span>
          <span className={styles.ctaArrow}>→</span>
        </button>

        {/* Mobile Hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileOpen : ''}`}>
        {navLinks.map((link) => (
          <button key={link.label} className={styles.mobileLink} onClick={() => handleNav(link.href)}>
            {link.label}
          </button>
        ))}
        <button className={styles.mobileCta} onClick={() => handleNav('#contact')}>
          Start a Project →
        </button>
      </div>
    </nav>
  );
}
