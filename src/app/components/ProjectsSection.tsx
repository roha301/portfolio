'use client';

import React, { useEffect, useRef, useState } from 'react';
import MagicBento, { type MagicBentoCard } from '@/app/components/MagicBento';

const projects: MagicBentoCard[] = [
  {
    title: 'CyberRakshak',
    description:
      'Cybersecurity awareness platform with an AI chatbot that educates users about phishing, scams, and safe online practices.',
    label: 'AI Security',
    tech: ['Python', 'Flask', 'Gemini 2.5 Flash API', 'Frontend'],
    image: '/assets/images/cyberrakshak_bg.png',
    status: 'Completed',
    href: 'https://cyberrakshak-five.vercel.app/',
  },
  {
    title: 'Smart Inventory Management',
    description:
      'Inventory management system for Mahavir Provisions to manage products and stock efficiently through a simple web UI.',
    label: 'Inventory',
    tech: ['HTML', 'CSS', 'Frontend'],
    image: '/assets/images/smart_inventory_bg.png',
    status: 'Completed',
  },
  {
    title: 'College Hall Reservation System',
    description:
      'Web-based hall reservation system to manage bookings and reduce scheduling conflicts through a centralized interface.',
    label: 'Booking',
    tech: ['Python', 'Flask', 'Backend'],
    image: '/assets/images/chrs_bg.png',
    status: 'Completed',
    href: 'https://chrs-1.onrender.com/',
  },
  {
    title: 'RecipeVault',
    description:
      'A mobile application for recipe management, allowing users to organize and discover recipes category-wise.',
    label: 'Mobile App',
    tech: ['Flutter', 'Dart', 'Firebase'],
    image: '/assets/images/recipevault_bg.png',
    status: 'Completed',
  },
];

export default function ProjectsSection() {
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
      id="projects"
      ref={sectionRef}
      className="relative py-24 overflow-hidden animate-on-scroll"
      style={{ background: 'linear-gradient(180deg, rgba(10,10,15,0.72) 0%, rgba(13,13,26,0.78) 100%)' }}
    >
      <div className="slash-divider mb-20" />

      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          left: '-20%',
          top: '30%',
          background: 'radial-gradient(circle, rgba(107,33,168,0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div
          className="flex items-center gap-3 mb-4"
          style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          <div className="w-8 h-px" style={{ background: 'linear-gradient(90deg, #7C3AED, transparent)' }} />
          <span className="font-mono text-xs tracking-widest uppercase text-primary">03 - Projects</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <h2
            className="text-section-title font-black gradient-text-cursed"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
            }}
          >
            Projects
          </h2>
        </div>

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s',
          }}
        >
          <MagicBento
            cards={projects}
            textAutoHide
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
}
