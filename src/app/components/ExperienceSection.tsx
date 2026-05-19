'use client';
import React, { useEffect, useRef, useState } from 'react';

interface TimelineItem {
  id: number;
  type: 'experience' | 'education';
  title: string;
  org: string;
  period: string;
  location: string;
  description: string;
  skills?: string[];
  icon: string;
  color: string;
}

const timeline: TimelineItem[] = [
  {
    id: 1,
    type: 'experience',
    title: 'Android App Development',
    org: 'Cognifyz',
    period: 'Dec 2025 - Jan 2026',
    location: 'Nashik, Maharashtra',
    description: 'Completed Android app development work experience, applying app development fundamentals and practical implementation skills.',
    skills: ['Android App Development', 'UI', 'Project Work'],
    icon: 'APP',
    color: '#7C3AED',
  },
  {
    id: 2,
    type: 'experience',
    title: 'Stock Audit',
    org: 'ABB India Limited',
    period: 'Jan 2024',
    location: 'India',
    description: 'Worked on stock audit responsibilities, supporting inventory verification and operational review activities.',
    skills: ['Stock Audit', 'Inventory', 'Operations'],
    icon: 'AUD',
    color: '#3B82F6',
  },
  {
    id: 3,
    type: 'education',
    title: 'B.Tech in Computer Science and Design',
    org: 'K. K. Wagh Institute of Engineering Education and Research',
    period: '2024 - 2027',
    location: 'Nashik, Maharashtra',
    description: 'Pursuing B.Tech in Computer Science and Design with Honors in Quantum Computing. Current CGPA: 7.8.',
    skills: ['Computer Science and Design', 'Quantum Computing', 'CGPA 7.8'],
    icon: 'CSD',
    color: '#00BFFF',
  },
  {
    id: 4,
    type: 'education',
    title: 'Class 12th',
    org: 'Nashik Presidency Junior College',
    period: '2022 - 2023',
    location: 'Nashik, Maharashtra',
    description: 'Completed Class 12th with 67.60%.',
    skills: ['Class 12th', '67.60%'],
    icon: '12',
    color: '#8B5CF6',
  },
  {
    id: 5,
    type: 'education',
    title: 'Class 10th',
    org: 'Ryan International School',
    period: '2010 - 2021',
    location: 'Nashik, Maharashtra',
    description: 'Completed Class 10th with 84.60%.',
    skills: ['Class 10th', '84.60%'],
    icon: '10',
    color: '#22C55E',
  },
];

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'education'>('all');

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

  const filtered = activeTab === 'all' ? timeline : timeline.filter((t) => t.type === activeTab);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(13,13,26,0.78) 0%, rgba(10,10,15,0.72) 100%)' }}
    >
      <div className="slash-divider mb-20" />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          right: '-10%',
          bottom: '10%',
          background: 'radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #00BFFF, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-accent">04 - Journey</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2
            className="text-section-title font-black gradient-text-anime"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Education and Experience
          </h2>

          <div className="flex gap-2">
            {(['all', 'experience', 'education'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest capitalize transition-all duration-300"
                style={{
                  background: activeTab === tab ? 'linear-gradient(135deg, #6B21A8, #1D4ED8)' : 'rgba(255,255,255,0.04)',
                  color: activeTab === tab ? 'white' : 'rgba(148,163,184,0.8)',
                  border: activeTab === tab ? '1px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((item, i) => (
            <article
              key={item.id}
              className="relative p-6 rounded-2xl glass-dark group hover:border-opacity-80 transition-all duration-300"
              style={{
                border: `1px solid ${item.color}30`,
                boxShadow: `0 0 20px ${item.color}10`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              <div className="absolute top-0 left-0 w-1 h-full rounded-l-2xl" style={{ background: `linear-gradient(180deg, ${item.color}, ${item.color}30)` }} />
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <span
                    className="inline-flex px-2 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-widest mb-2"
                    style={{
                      background: item.type === 'experience' ? 'rgba(124,58,237,0.15)' : 'rgba(0,191,255,0.15)',
                      color: item.type === 'experience' ? '#8B5CF6' : '#00BFFF',
                      border: `1px solid ${item.type === 'experience' ? 'rgba(124,58,237,0.3)' : 'rgba(0,191,255,0.3)'}`,
                    }}
                  >
                    {item.type}
                  </span>
                  <h3 className="font-black text-foreground text-base">{item.title}</h3>
                  <p className="font-semibold text-sm" style={{ color: item.color }}>
                    {item.org}
                  </p>
                </div>
                <span className="text-xs font-mono font-black px-2 py-1 rounded" style={{ color: item.color, border: `1px solid ${item.color}40` }}>
                  {item.icon}
                </span>
              </div>

              <div className="flex flex-wrap gap-3 mb-3 text-xs font-mono text-muted-foreground">
                <span>{item.period}</span>
                <span>{item.location}</span>
              </div>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{item.description}</p>

              {item.skills && (
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{ background: `${item.color}12`, color: item.color, border: `1px solid ${item.color}25` }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
