'use client';
import React, { useEffect, useRef, useState } from 'react';

const contactLinks = [
  { name: 'Email', href: 'mailto:rohanghuge21@gmail.com', label: 'rohanghuge21@gmail.com', color: '#8B5CF6' },
  { name: 'Phone', href: 'tel:+919881638744', label: '+91 9881638744', color: '#3B82F6' },
  { name: 'Location', href: 'https://www.google.com/maps/search/Panchvati,Nashik,Maharashtra', label: 'Panchvati, Nashik', color: '#00BFFF' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd5d87403-d7d8-43ff-a311-940c9f2eb486',
          from_name: 'Rohan.dev',
          subject: `New Portfolio Message from ${formState.name}`,
          name: formState.name,
          email: formState.email,
          message: formState.message,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
      } else {
        console.error('Failed to send message', result);
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Something went wrong. Please check your connection.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.72) 0%, rgba(13,13,26,0.82) 100%)' }}
    >
      <div className="slash-divider mb-20" />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 800,
          height: 800,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(107,33,168,0.12) 0%, rgba(29,78,216,0.08) 40%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'shadow-aura 4s ease-in-out infinite',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-primary">05 - Contact</span>
        </div>

        <h2
          className="text-section-title font-black mb-4 gradient-text-anime"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          Contact Me
        </h2>
        <p
          className="text-muted-foreground mb-16 max-w-lg"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s', fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}
        >
          Open to internships, projects, and entry-level opportunities in web development, Python, UI design, and AI-assisted applications.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <div
              className="relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(107,33,168,0.2) 0%, rgba(10,10,15,0.9) 50%, rgba(29,78,216,0.15) 100%)',
                border: '1px solid rgba(124,58,237,0.4)',
                animation: visible ? 'energy-pulse 3s ease-in-out infinite' : undefined,
              }}
            >
              <div className="relative z-10 text-center mb-8">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 font-black"
                  style={{ background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)', boxShadow: '0 0 30px rgba(124,58,237,0.5)' }}
                >
                  RG
                </div>
                <h3 className="font-black text-xl text-foreground mb-1">Rohan Pankaj Ghuge</h3>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Web Developer + AI Enthusiast</p>
                <div
                  className="mt-3 px-4 py-1.5 rounded-full inline-flex items-center gap-2 text-xs font-bold font-mono"
                  style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22C55E' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Available for Opportunities
                </div>
              </div>

              <div className="relative z-10 flex flex-col gap-3">
                {contactLinks.map((info) => (
                  <a
                    key={info.name}
                    href={info.href}
                    target={info.name === 'Location' ? '_blank' : undefined}
                    rel={info.name === 'Location' ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${info.color}30` }}
                  >
                    <span className="text-xs font-mono font-black w-12 text-center" style={{ color: info.color }}>
                      {info.name}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{info.name}</p>
                      <p className="font-semibold text-sm text-foreground truncate">{info.label}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
          >
            {submitted ? (
              <div
                className="h-full flex flex-col items-center justify-center gap-6 p-12 rounded-2xl text-center"
                style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.3)', minHeight: 400 }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl" style={{ background: 'rgba(34,197,94,0.15)', boxShadow: '0 0 30px rgba(34,197,94,0.3)' }}>
                  OK
                </div>
                <div>
                  <h3 className="font-black text-xl text-foreground mb-2">Message Sent</h3>
                  <p className="text-muted-foreground text-sm">Thanks for reaching out. I will respond soon.</p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', message: '' });
                  }}
                  className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                  style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.3)' }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 rounded-2xl glass-dark" style={{ border: '1px solid rgba(124,58,237,0.25)' }}>
                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-muted-foreground transition-all duration-200 outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-muted-foreground transition-all duration-200 outline-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-muted-foreground uppercase tracking-widest mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about the opportunity..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-foreground placeholder-muted-foreground transition-all duration-200 outline-none resize-none"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.25)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="relative overflow-hidden w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all duration-300 group disabled:opacity-70"
                  style={{ background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)', border: '1px solid rgba(124,58,237,0.5)', boxShadow: '0 0 20px rgba(124,58,237,0.3)' }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </button>

                <p className="text-center text-xs text-muted-foreground font-mono">Direct email: rohanghuge21@gmail.com</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
