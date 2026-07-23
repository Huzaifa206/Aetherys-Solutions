'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const LEAD_MARKER = 'LEAD_DATA:';

function extractLead(content: string): { clean: string; lead: Record<string, string> | null } {
  const idx = content.indexOf(LEAD_MARKER);
  if (idx === -1) return { clean: content, lead: null };

  const clean = content.slice(0, idx).trim();
  try {
    const jsonStr = content.slice(idx + LEAD_MARKER.length).trim();
    const lead = JSON.parse(jsonStr);
    return { clean, lead };
  } catch {
    return { clean, lead: null };
  }
}

const WELCOME: Message = {
  role: 'assistant',
  content: "Hi there! 👋 I'm **Aetherys AI** — your digital consultant.\n\nI'm here to help you explore how we can grow your business with our web development, AI solutions, and digital marketing services.\n\nWhat brings you here today?",
  timestamp: new Date(),
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      setHasNewMsg(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendLead = useCallback(async (lead: Record<string, string>) => {
    if (leadSent) return;
    setLeadSent(true);
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
      });
    } catch (e) {
      console.error('Lead send failed:', e);
    }
  }, [leadSent]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role === 'user' || m.role === 'assistant')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Request failed');

      const { clean, lead } = extractLead(data.content);

      const assistantMsg: Message = {
        role: 'assistant',
        content: clean || data.content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMsg]);

      if (lead) {
        await sendLead(lead);
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: "✅ **Perfect!** I've sent all your details to the Aetherys team. They'll be in touch within **24 hours**.\n\nIs there anything else I can help you with?",
          timestamp: new Date(),
        }]);
      }

      if (!open) setHasNewMsg(true);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Apologies, I'm having trouble connecting right now. Please reach out directly at **aetheryssolutions@gmail.com** and we'll get back to you shortly.",
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatContent = (text: string) => {
    // Convert **bold** and newlines to JSX
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Open AI Consultant"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
        {hasNewMsg && !open && <span className={styles.triggerBadge} />}
        {!open && <span className={styles.triggerPulse} />}
      </button>

      {/* Chat window */}
      <div className={`${styles.window} ${open ? styles.windowOpen : ''}`} role="dialog" aria-label="Aetherys AI Consultant">

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
              </svg>
            </div>
            <div>
              <span className={styles.headerName}>Aetherys AI</span>
              <span className={styles.headerStatus}>
                <span className={styles.statusDot} />
                Online · Consultant
              </span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setOpen(false)} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.msgRow} ${msg.role === 'user' ? styles.msgRowUser : styles.msgRowBot}`}>
              {msg.role === 'assistant' && (
                <div className={styles.botAvatar}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                </div>
              )}
              <div className={`${styles.bubble} ${msg.role === 'user' ? styles.bubbleUser : styles.bubbleBot}`}>
                {formatContent(msg.content)}
              </div>
            </div>
          ))}

          {loading && (
            <div className={`${styles.msgRow} ${styles.msgRowBot}`}>
              <div className={styles.botAvatar}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
              </div>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typingBubble}`}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <textarea
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message..."
            rows={1}
            disabled={loading}
          />
          <button
            className={`${styles.sendBtn} ${(!input.trim() || loading) ? styles.sendBtnDisabled : ''}`}
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>

        <div className={styles.footer}>
          Powered by <span>Aetherys AI</span> · Responses may take a few seconds
        </div>
      </div>
    </>
  );
}
