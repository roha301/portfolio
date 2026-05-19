'use client';
import React, { useState, useEffect } from 'react';
import AppLogo from '@/components/ui/AppLogo';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(new Date()?.getFullYear()?.toString());
  }, []);

  return (
    <footer
      className="relative border-t py-16 overflow-hidden"
      style={{ borderColor: 'rgba(124,58,237,0.15)', background: '#0a0a0f' }}
    >
      {/* Subtle bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 600,
          height: 200,
          background: 'radial-gradient(ellipse, rgba(107,33,168,0.08) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Pattern 1 — Linear Single-Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + brand */}
          <Link href="/" className="flex items-center gap-2 group">
            <AppLogo size={32} />
            <span className="font-black text-base tracking-tight gradient-text-anime hidden sm:block">
              Rohan.dev
            </span>
          </Link>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: 'About', href: '#about' },
              { label: 'Skills', href: '#skills' },
              { label: 'Projects', href: '#projects' },
              { label: 'Experience', href: '#experience' },
              { label: 'Achievements', href: '#achievements' },
            ]?.map((link) => (
              <a
                key={link?.label}
                href={link?.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link?.label}
              </a>
            ))}
          </div>

          {/* Right — social + copyright */}
          <div className="flex items-center gap-4">
            {[
              {
                href: 'https://github.com/roha301',
                label: 'GitHub',
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                ),
              },
              {
                href: 'https://www.linkedin.com/in/rohan-ghuge21',
                label: 'LinkedIn',
                icon: (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" />
                  </svg>
                ),
              },
            ]?.map((s) => (
              <a
                key={s?.label}
                href={s?.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s?.label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(124,58,237,0.2)' }}
              >
                {s?.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono"
          style={{ borderTop: '1px solid rgba(124,58,237,0.1)' }}
        >
          <span>© {year} Rohan Pankaj Ghuge. All rights reserved.</span>
          <span className="gradient-text-anime font-bold text-xs">
            Built with ⚡ cursed energy &amp; shadow code
          </span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors duration-200">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors duration-200">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}