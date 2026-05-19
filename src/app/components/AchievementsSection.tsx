'use client';
import React, { useEffect, useRef, useState } from 'react';
import CircularGallery from './CircularGallery';

const achievementItems = [
  { image: '/assets/images/ach-1.jpeg', text: 'Achievement 1' },
  { image: '/assets/images/ach-2.jpeg', text: 'Achievement 2' },
  { image: '/assets/images/ach-3.jpeg', text: 'Achievement 3' },
  { image: '/assets/images/ach-4.jpeg', text: 'Achievement 4' },
  { image: '/assets/images/ach-5.jpeg', text: 'Achievement 5' },
  { image: '/assets/images/ach-6.jpeg', text: 'Achievement 6' },
  { image: '/assets/images/ach-7.jpeg', text: 'Achievement 7' },
  { image: '/assets/images/ach-8.jpeg', text: 'Achievement 8' },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(13,13,26,0.78) 0%, rgba(10,10,15,0.72) 100%)' }}
    >
      <div className="slash-divider mb-20" />

      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          left: '-10%',
          top: '10%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 400,
          height: 400,
          right: '-5%',
          bottom: '20%',
          background: 'radial-gradient(circle, rgba(0,191,255,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex items-center gap-3 mb-4" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}>
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-accent">05 - Achievements</span>
        </div>

        <h2
          className="text-section-title font-black gradient-text-anime mb-6"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          Achievements & Certifications
        </h2>

        <p
          className="text-muted-foreground text-base md:text-lg max-w-2xl mb-10 leading-relaxed"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
          }}
        >
          A gallery of milestones, certifications, and accomplishments earned along my journey. Drag or scroll to explore.
        </p>

        {/* Circular Gallery */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            height: '600px',
            border: '1px solid rgba(124,58,237,0.2)',
            boxShadow: '0 0 40px rgba(124,58,237,0.05), inset 0 0 60px rgba(0,0,0,0.3)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
          }}
        >
          <CircularGallery
            items={achievementItems}
            bend={1}
            borderRadius={0.05}
            scrollSpeed={2}
            scrollEase={0.05}
            textColor="#ffffff"
          />
        </div>
      </div>
    </section>
  );
}
