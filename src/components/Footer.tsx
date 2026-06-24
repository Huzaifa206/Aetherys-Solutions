'use client';

import styles from './Footer.module.css';

const links = {
  Services: ['Full Stack Dev', 'AI Integration', 'AI Agents', 'SaaS Products', 'Growth Engineering'],
  Company: ['About Us', 'Founders', 'Process', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topLine} />
      <div className={styles.container}>
        {/* Top row */}
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logoRow}>
              <div className={styles.logoMark}>A</div>
              <span className={styles.logoText}>AETHERYS</span>
            </div>
            <p className={styles.tagline}>
              Engineering intelligence into<br />business systems.
            </p>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Available for new projects in 2025
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([col, items]) => (
            <div key={col} className={styles.linkCol}>
              <h4 className={styles.colTitle}>{col}</h4>
              <ul className={styles.linkList}>
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className={styles.link}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* CTA */}
          <div className={styles.ctaCol}>
            <h4 className={styles.colTitle}>Start a Project</h4>
            <p className={styles.ctaDesc}>Ready to build something extraordinary?</p>
            <button
              className={styles.cta}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get in Touch →
            </button>
            <div className={styles.timezone}>
              <span className={styles.timezoneDot} />
              <span>Available 9AM – 6PM PKT</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom row */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © 2025 Aetherys. Built with obsession.
          </p>
          <div className={styles.bottomRight}>
            <span className={styles.stack}>Next.js · TypeScript · AI-Powered</span>
            <a href="#hero" className={styles.backTop} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Back to top ↑
            </a>
          </div>
        </div>
      </div>

      {/* Big background text */}
      <div className={styles.bgText}>AETHERYS</div>
    </footer>
  );
}
