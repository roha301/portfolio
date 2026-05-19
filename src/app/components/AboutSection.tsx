'use client';
import React, { useEffect, useRef, useState } from 'react';

const traits = [
  { icon: '01', label: 'Core Focus', value: 'Web Development' },
  { icon: '02', label: 'Programming', value: 'Python + Flask' },
  { icon: '03', label: 'Design', value: 'User Interfaces' },
  { icon: '04', label: 'AI Interest', value: 'Gemini API Integration' },
];

const facts = [
  { label: 'Location', value: 'Panchvati, Nashik' },
  { label: 'Degree', value: 'B.Tech CSD' },
  { label: 'CGPA', value: '7.8' },
  { label: 'Status', value: 'Open to Opportunities' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.72) 0%, rgba(13,13,26,0.78) 100%)' }}
    >
      <div className="slash-divider mb-20" />
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center gap-3 mb-4"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-primary">01 - About</span>
        </div>

        <h2
          className="text-section-title font-black mb-16 gradient-text-anime"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          The Developer
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(-40px)',
              transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
            }}
          >
            <div
              className="relative p-8 rounded-2xl glass-dark border-neon-purple"
              style={{ animation: visible ? 'energy-pulse 3s ease-in-out infinite' : undefined }}
            >
              {['top-0 left-0', 'top-0 right-0', 'bottom-0 left-0', 'bottom-0 right-0'].map((pos, i) => (
                <div
                  key={pos}
                  className={`absolute ${pos} w-4 h-4`}
                  style={{
                    borderTop: i < 2 ? '2px solid #7C3AED' : undefined,
                    borderBottom: i >= 2 ? '2px solid #7C3AED' : undefined,
                    borderLeft: i % 2 === 0 ? '2px solid #7C3AED' : undefined,
                    borderRight: i % 2 === 1 ? '2px solid #7C3AED' : undefined,
                  }}
                />
              ))}

              <p className="text-foreground leading-relaxed mb-4" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
                I&apos;m <strong className="gradient-text-cursed">Rohan Pankaj Ghuge</strong>, a Computer Science and Design
                student at K. K. Wagh Institute of Engineering Education and Research, Nashik.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>
                I am passionate about web development and artificial intelligence, with a focus on creative
                problem-solving and user-centric solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed" style={{ fontSize: 'clamp(0.85rem, 1.3vw, 1rem)' }}>
                My project work includes CyberRakshak, an AI-assisted cybersecurity awareness platform,
                plus inventory and hall reservation systems built for clear, practical workflows.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {facts.map((fact, i) => (
                <div
                  key={fact.label}
                  className="p-3 rounded-xl glass-dark"
                  style={{
                    border: '1px solid rgba(124,58,237,0.2)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.5s ease ${0.4 + i * 0.08}s, transform 0.5s ease ${0.4 + i * 0.08}s`,
                  }}
                >
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-1">{fact.label}</p>
                  <p className="font-semibold text-sm text-foreground">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex flex-col gap-6"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
          >
            <div
              className="relative p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(107,33,168,0.15) 0%, rgba(29,78,216,0.1) 100%)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 80% 20%, rgba(0,191,255,0.3) 0%, transparent 50%)' }}
              />

              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-black"
                  style={{ background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)' }}
                >
                  RG
                </div>
                <div>
                  <p className="font-black text-foreground">PROFILE</p>
                  <p className="text-xs font-mono text-muted-foreground">WEB DEVELOPMENT + AI</p>
                </div>
                <div className="ml-auto">
                  <div
                    className="px-2 py-1 rounded text-xs font-mono font-bold"
                    style={{ background: 'rgba(0,191,255,0.15)', color: '#00BFFF', border: '1px solid rgba(0,191,255,0.3)' }}
                  >
                    CSD
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {traits.map((trait, i) => (
                  <div
                    key={trait.label}
                    className="flex items-center gap-4 p-3 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(124,58,237,0.15)',
                      opacity: visible ? 1 : 0,
                      transition: `opacity 0.5s ease ${0.5 + i * 0.1}s`,
                    }}
                  >
                    <span className="text-sm font-black w-8 text-center text-electric-blue">{trait.icon}</span>
                    <div className="flex-1">
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{trait.label}</p>
                      <p className="font-bold text-sm text-foreground">{trait.value}</p>
                    </div>
                    <div className="w-2 h-2 rounded-full" style={{ background: '#7C3AED', boxShadow: '0 0 8px #7C3AED' }} />
                  </div>
                ))}
              </div>
            </div>

            <div
              className="flex items-center gap-4 p-5 rounded-xl"
              style={{
                background: 'rgba(0,191,255,0.06)',
                border: '1px solid rgba(0,191,255,0.25)',
              }}
            >
              <div className="relative">
                <div className="w-3 h-3 rounded-full bg-electric-blue" />
                <div className="absolute inset-0 rounded-full bg-electric-blue animate-pulse-glow" style={{ transform: 'scale(2)', opacity: 0.3 }} />
              </div>
              <div>
                <p className="font-bold text-sm text-foreground">Available for Opportunities</p>
                <p className="text-xs text-muted-foreground">Open to internships, projects, and entry-level roles</p>
              </div>
              <a
                href="#contact"
                className="ml-auto text-xs font-bold px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{ background: 'rgba(0,191,255,0.15)', color: '#00BFFF', border: '1px solid rgba(0,191,255,0.3)' }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
