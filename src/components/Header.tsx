'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems?.map((n) => n?.href?.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sections?.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer?.observe(el);
    });
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false);
      window.addEventListener('scroll', close, { once: true });
    }
  }, [menuOpen]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-[1000] transition-all duration-500"
      style={{
        paddingTop: scrolled ? '0.75rem' : '1.25rem',
        paddingBottom: scrolled ? '0.75rem' : '1.25rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        background: scrolled
          ? 'rgba(10,10,15,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(124,58,237,0.2)' : 'none',
        boxShadow: scrolled ? '0 4px 30px rgba(124,58,237,0.1)' : 'none',
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <AppLogo size={36} />
          <span
            className="font-black text-lg tracking-tight gradient-text-anime hidden sm:block"
            style={{ fontFamily: 'var(--font-plus-jakarta-sans)' }}
          >
            Rohan.dev
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems?.map((item) => {
            const isActive = activeSection === item?.href?.replace('#', '');
            return (
              <a
                key={item?.label}
                href={item?.href}
                className="relative px-4 py-2 text-sm font-semibold transition-all duration-300 group"
                style={{
                  color: isActive ? '#00BFFF' : 'rgba(226,232,240,0.7)',
                  textShadow: isActive ? '0 0 15px #00BFFF' : 'none',
                }}
              >
                {item?.label}
                {/* Hover underline */}
                <span
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90deg, #7C3AED, #00BFFF)',
                    width: isActive ? '100%' : undefined,
                  }}
                />
                {/* Glow bg on hover */}
                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'rgba(124,58,237,0.08)' }} />
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/assets/Rohan_Ghuge_Resume.pdf"
            download="Rohan_Ghuge_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-bold rounded-lg transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)',
              color: 'white',
              border: '1px solid rgba(124,58,237,0.5)',
            }}
          >
            <span className="relative z-10">Download Resume</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`} />
          <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`block h-0.5 bg-foreground transition-all duration-300 ${menuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-6'}`} />
        </button>
      </nav>
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(20px)' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-2 border-t border-border">
          {navItems?.map((item) => (
            <a
              key={item?.label}
              href={item?.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 text-base font-semibold border-b border-border/30 last:border-0 transition-colors duration-200"
              style={{ color: 'rgba(226,232,240,0.8)' }}
            >
              <span className="mr-2 text-primary">›</span>
              {item?.label}
            </a>
          ))}
          <a
            href="/assets/Rohan_Ghuge_Resume.pdf"
            download="Rohan_Ghuge_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-2 py-3 text-center font-bold rounded-lg text-white"
            style={{ background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)' }}
          >
            Download Resume
          </a>
        </div>
      </div>
    </header>
  );
}