'use client';

import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

const EMAILJS_SERVICE_ID  = 'service_524qpu8';
const EMAILJS_TEMPLATE_ID = 'template_0nmxvn4';
const EMAILJS_PUBLIC_KEY  = 'ze1dzhlrrqV0ayX7U';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }
      );
      setSent(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Something went wrong. Please email us directly at aetheryssolutions@gmail.com');
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.contact} id="contact" ref={sectionRef}>
      {/* Background effects */}
      <div className={styles.bgGlow} />
      <div className={styles.bgGrid} />

      <div className={styles.container}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <div className={`label reveal`}>
            <span>Let&apos;s Build</span>
          </div>

          <h2 className={`${styles.title} reveal delay-1`}>
            Let&apos;s Build Something<br />
            <span className={styles.titleAccent}>Extraordinary</span>
          </h2>

          <p className={`${styles.desc} reveal delay-2`}>
            Got a project in mind? A problem to solve? An opportunity to seize?
            Tell us about it — we respond within 24 hours.
          </p>

          {/* Contact info */}
          <div className={`${styles.contactInfo} reveal delay-3`}>
            <a href="mailto:aetheryssolutions@gmail.com" className={styles.emailLink}>
              <span className={styles.emailIcon}>✉</span>
              aetheryssolutions@gmail.com
              <span className={styles.emailArrow}>→</span>
            </a>

            <div className={styles.socials}>
              {[
                { label: 'LinkedIn', icon: 'in', href: '#' },
                { label: 'Twitter', icon: '𝕏', href: '#' },
                { label: 'GitHub', icon: '⌥', href: '#' },
                { label: 'Dribbble', icon: '◉', href: '#' },
              ].map(s => (
                <a key={s.label} href={s.href} className={styles.social} aria-label={s.label}>
                  <span className={styles.socialIcon}>{s.icon}</span>
                  <span className={styles.socialLabel}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className={`${styles.decorElement} reveal delay-4`}>
            <div className={styles.decorRing1} />
            <div className={styles.decorRing2} />
            <div className={styles.decorCore}>AETHERYS</div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={`${styles.formWrap} reveal-scale delay-2`}>
          {/* Frame decoration */}
          <div className={styles.formFrame}>
            <span className={styles.frameCornerTL} />
            <span className={styles.frameCornerBR} />
          </div>

          {/* Header */}
          <div className={styles.formHeader}>
            <div className={styles.formHeaderDots}>
              <span /><span /><span />
            </div>
            <span className={styles.formHeaderLabel}>new_project.json</span>
          </div>

          {!sent ? (
            <form className={styles.form} onSubmit={handleSubmit}>
              {/* Name */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <span className={styles.labelNum}>01</span>
                  Your Name
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                  placeholder="Full name"
                  className={styles.input}
                  required
                />
              </div>

              {/* Email */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <span className={styles.labelNum}>02</span>
                  Email Address
                </label>
                <input
                  type="email"
                  value={formState.email}
                  onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  className={styles.input}
                  required
                />
              </div>

              {/* Message */}
              <div className={styles.field}>
                <label className={styles.label}>
                  <span className={styles.labelNum}>03</span>
                  Tell Us About Your Project
                </label>
                <textarea
                  value={formState.message}
                  onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                  placeholder="Describe your vision, goals, and budget (e.g. 10k–20k) — we'll take it from here."
                  className={styles.textarea}
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <button type="submit" className={`${styles.submit} ${sending ? styles.submitting : ''}`} disabled={sending}>
                <span className={styles.submitBg} />
                <span className={styles.submitLabel}>
                  {sending ? 'Sending...' : 'Send Message →'}
                </span>
                {sending && <div className={styles.submitLoader} />}
              </button>

              {/* Error */}
              {error && (
                <p className={styles.errorMsg}>{error}</p>
              )}
            </form>
          ) : (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.successTitle}>Message Received</h3>
              <p className={styles.successDesc}>
                We&apos;ll review your project and get back to you within 24 hours.
                Something extraordinary is about to begin.
              </p>
              <div className={styles.successAccent} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
