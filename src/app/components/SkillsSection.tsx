'use client';
import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  color: string;
  category: string;
}

const skills: Skill[] = [
  { name: 'Web Development', level: 88, color: '#00BFFF', category: 'Frontend' },
  { name: 'Mobile Application Development', level: 86, color: '#FF6B35', category: 'Frontend' },
  { name: 'UI Design', level: 84, color: '#8B5CF6', category: 'Design' },
  { name: 'Python Programming', level: 82, color: '#3B82F6', category: 'Backend' },
  { name: 'Flask', level: 78, color: '#22C55E', category: 'Backend' },
  { name: 'Database', level: 74, color: '#F59E0B', category: 'Backend' },
  { name: 'Unity Development', level: 72, color: '#7C3AED', category: 'Tools' },
  { name: 'Data Visualization', level: 70, color: '#06B6D4', category: 'Tools' },
];

const techIcons = [
  { name: 'Python', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', href: 'https://www.python.org/' },
  { name: 'Flask', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg', href: 'https://flask.palletsprojects.com/' },
  { name: 'HTML', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg', href: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'Flutter', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg', href: 'https://flutter.dev/' },
  { name: 'Unity', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg', href: 'https://unity.com/' },
  { name: 'Canva', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg', href: 'https://www.canva.com/' },
  { name: 'AWS Cloud', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg', href: 'https://aws.amazon.com/' },
  { name: 'MongoDB', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg', href: 'https://www.mongodb.com/' },
  { name: 'Kotlin', logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg', href: 'https://kotlinlang.org/' },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'AI', 'Design', 'Tools'];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered = activeCategory === 'All' ? skills : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(13,13,26,0.78) 0%, rgba(10,10,15,0.72) 100%)' }}
    >
      <div className="slash-divider mb-20" />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          right: '-15%',
          top: '20%',
          background: 'radial-gradient(circle, rgba(29,78,216,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #3B82F6, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-secondary">02 - Skills</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <h2
            className="text-section-title font-black gradient-text-shadow"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-4 py-1.5 rounded-full text-xs font-bold font-mono uppercase tracking-widest transition-all duration-300"
                style={{
                  background: activeCategory === cat ? 'linear-gradient(135deg, #6B21A8, #1D4ED8)' : 'rgba(255,255,255,0.04)',
                  color: activeCategory === cat ? 'white' : 'rgba(148,163,184,0.8)',
                  border: activeCategory === cat ? '1px solid rgba(124,58,237,0.6)' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: activeCategory === cat ? '0 0 15px rgba(124,58,237,0.3)' : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-5">
            {filtered.map((skill, i) => (
              <div
                key={skill.name}
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateX(0)' : 'translateX(-30px)',
                  transition: `opacity 0.5s ease ${i * 0.06}s, transform 0.5s ease ${i * 0.06}s`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-sm text-foreground">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold" style={{ color: skill.color, textShadow: `0 0 10px ${skill.color}60` }}>
                      {skill.level}%
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-xs font-mono"
                      style={{ background: `${skill.color}15`, color: skill.color, border: `1px solid ${skill.color}30` }}
                    >
                      {skill.level >= 85 ? 'A' : skill.level >= 75 ? 'B' : 'C'}
                    </span>
                  </div>
                </div>

                <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: visible ? `${skill.level}%` : '0%',
                      background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                      boxShadow: `0 0 10px ${skill.color}60, 0 0 20px ${skill.color}30`,
                    }}
                  />
                  {[25, 50, 75].map((tick) => (
                    <div key={tick} className="absolute top-0 bottom-0 w-px" style={{ left: `${tick}%`, background: 'rgba(255,255,255,0.1)' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(40px)',
              transition: 'opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s',
            }}
          >
            <p className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-6">
              Tech and Certifications
            </p>

            <div className="grid grid-cols-5 gap-4">
              {techIcons.map((tech, i) => (
                <a
                  key={tech.name}
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 group cursor-pointer"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.4s ease ${0.4 + i * 0.05}s, transform 0.4s ease ${0.4 + i * 0.05}s`,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}
                  >
                    <img 
                      src={tech.logoUrl} 
                      alt={tech.name} 
                      className="w-8 h-8 object-contain"
                      style={{ filter: tech.name === 'Flask' || tech.name === 'AWS Cloud' ? 'brightness(0) invert(1)' : 'none' }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground text-center leading-tight group-hover:text-foreground transition-colors duration-200">
                    {tech.name}
                  </span>
                </a>
              ))}
            </div>

            <div
              className="mt-8 p-6 rounded-2xl relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(107,33,168,0.2) 0%, rgba(29,78,216,0.15) 100%)',
                border: '1px solid rgba(124,58,237,0.3)',
              }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 90% 10%, rgba(0,191,255,0.15) 0%, transparent 60%)' }} />
              <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-3">Credentials</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black gradient-text-anime" style={{ lineHeight: 1 }}>
                  3
                </span>
                <div className="pb-1">
                  <p className="font-bold text-foreground">Certifications</p>
                  <p className="text-xs text-muted-foreground">AWS Cloud Foundations, Google GenAI, Tata Data Visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
