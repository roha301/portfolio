'use client';
import React, { useEffect, useRef, useState } from 'react';
import AppImage from '@/components/ui/AppImage';

const ROLES = ['Web Developer', 'Python Programmer', 'UI Designer', 'AI Integration Enthusiast'];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayRole, setDisplayRole] = useState('');
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // States and refs for 3D perspective mouse-tilt card
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    const maxTilt = 15; // Max tilt degrees

    setRotateX(-normY * maxTilt);
    setRotateY(normX * maxTilt);
    setGlarePos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).introComplete) {
      setRevealed(true);
      return;
    }
    const handleIntroComplete = () => setRevealed(true);
    window.addEventListener('intro-complete', handleIntroComplete);
    return () => window.removeEventListener('intro-complete', handleIntroComplete);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const role = ROLES[roleIdx];
    if (typing) {
      if (charIdx < role.length) {
        const t = setTimeout(() => {
          setDisplayRole(role.slice(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, 60);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyping(false), 1800);
      return () => clearTimeout(t);
    }

    if (charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayRole(role.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, 35);
      return () => clearTimeout(t);
    }

    setRoleIdx((prev) => (prev + 1) % ROLES.length);
    setTyping(true);
  }, [revealed, typing, charIdx, roleIdx]);

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const mx = (e.clientX / w - 0.5) * 2;
      const my = (e.clientY / h - 0.5) * 2;
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${mx * 30}px, ${my * 20}px)`;
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${mx * -20}px, ${my * 30}px)`;
      if (orb3Ref.current) orb3Ref.current.style.transform = `translate(${mx * 15}px, ${my * -25}px)`;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const heroChars = 'ROHAN'.split('');
  const heroChars2 = 'GHUGE'.split('');

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
      style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(107,33,168,0.14) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(29,78,216,0.12) 0%, transparent 60%), rgba(10,10,15,0.58)' }}
    >
      <div
        ref={orb1Ref}
        className="orb animate-float-orb"
        style={{ width: 500, height: 500, top: '10%', left: '-10%', background: 'radial-gradient(circle, rgba(107,33,168,0.3) 0%, rgba(107,33,168,0.05) 60%, transparent 80%)', transition: 'transform 0.3s ease' }}
      />
      <div
        ref={orb2Ref}
        className="orb animate-float-orb-2"
        style={{ width: 600, height: 600, top: '30%', right: '-15%', background: 'radial-gradient(circle, rgba(29,78,216,0.25) 0%, rgba(29,78,216,0.05) 60%, transparent 80%)', transition: 'transform 0.4s ease' }}
      />
      <div
        ref={orb3Ref}
        className="orb animate-float-orb-3"
        style={{ width: 300, height: 300, bottom: '15%', left: '20%', background: 'radial-gradient(circle, rgba(0,191,255,0.2) 0%, transparent 70%)', transition: 'transform 0.5s ease' }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 flex flex-col gap-6">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase self-start"
              style={{
                border: '1px solid rgba(0,191,255,0.4)',
                color: '#00BFFF',
                background: 'rgba(0,191,255,0.08)',
                textShadow: '0 0 10px rgba(0,191,255,0.5)',
                opacity: revealed ? 1 : 0,
                transition: 'opacity 0.5s ease 0.1s',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-electric-blue animate-pulse-glow" />
              Computer Science and Design Student
            </div>

            <div className="overflow-hidden">
              <div className="flex flex-wrap gap-x-4">
                <div className="flex">
                  {heroChars.map((char, i) => (
                    <span
                      key={i}
                      className="text-hero font-black gradient-text-cursed"
                      style={{
                        display: 'inline-block',
                        animation: revealed ? `hero-char 0.6s cubic-bezier(0.4,0,0.2,1) forwards` : undefined,
                        animationDelay: revealed ? `${i * 0.07}s` : undefined,
                        opacity: revealed ? 0.85 : 0,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="flex">
                  {heroChars2.map((char, i) => (
                    <span
                      key={i}
                      className="text-hero font-black gradient-text-shadow"
                      style={{
                        display: 'inline-block',
                        animation: revealed ? `hero-char 0.6s cubic-bezier(0.4,0,0.2,1) forwards` : undefined,
                        animationDelay: revealed ? `${(i + 5) * 0.07}s` : undefined,
                        opacity: revealed ? 0.85 : 0,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="font-mono text-xl font-medium" style={{ color: '#8B5CF6', minHeight: '2rem' }}>
              <span style={{ textShadow: '0 0 15px rgba(139,92,246,0.6)' }}>{displayRole}</span>
              <span className="inline-block w-0.5 h-5 ml-1 align-middle" style={{ background: '#8B5CF6', animation: 'typing-cursor 1s ease-in-out infinite' }} />
            </div>

            <p
              className="text-muted-foreground leading-relaxed max-w-lg"
              style={{
                opacity: revealed ? 1 : 0,
                transform: revealed ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
              }}
            >
              Passionate about web development and artificial intelligence, with hands-on
              project experience in Flask, Python, cybersecurity awareness, inventory tools,
              and user-focused interface design.
            </p>

            <div className="flex flex-wrap gap-6" style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 1s' }}>
              {[
                { val: '3+', label: 'Projects' },
                { val: '2', label: 'Work Roles' },
                { val: '7.8', label: 'CGPA' },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-3xl font-black gradient-text-anime" style={{ lineHeight: 1 }}>
                    {stat.val}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4" style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.6s ease 1.2s' }}>
              <a
                href="#projects"
                className="relative overflow-hidden px-8 py-3.5 font-bold text-sm rounded-lg text-white group transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #6B21A8, #1D4ED8)',
                  border: '1px solid rgba(124,58,237,0.5)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, #7C3AED, #3B82F6)' }} />
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 font-bold text-sm rounded-lg transition-all duration-300 border"
                style={{
                  borderColor: 'rgba(0,191,255,0.4)',
                  color: '#00BFFF',
                  background: 'rgba(0,191,255,0.06)',
                }}
              >
                Contact Me
              </a>
            </div>
          </div>

          <div
            className="flex-shrink-0 flex flex-col items-center gap-4"
            style={{
              opacity: revealed ? 1 : 0,
              transition: 'opacity 0.8s ease 1.4s',
            }}
          >
            <div className="relative">
              {/* Outer Cosmic Orbiting Rings */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ inset: -30, border: '1px solid rgba(124,58,237,0.25)', animation: 'spin-slow 25s linear infinite' }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ inset: -60, border: '1px dashed rgba(0,191,255,0.12)', animation: 'spin-slow 35s linear infinite reverse' }}
              />
              <div
                className="absolute rounded-full pointer-events-none"
                style={{ inset: -45, background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)', animation: 'shadow-aura 4s ease-in-out infinite' }}
              />

              {/* 3D Glassmorphic Profile Card */}
              <div
                ref={cardRef}
                onMouseMove={handleCardMouseMove}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                className="relative w-72 h-96 md:w-80 md:h-[28rem] rounded-2xl select-none transition-all duration-500 ease-out"
                style={{
                  background: isFlipped
                    ? 'linear-gradient(135deg, rgba(20, 10, 10, 0.28) 0%, rgba(35, 20, 20, 0.18) 100%)'
                    : 'linear-gradient(135deg, rgba(10, 10, 15, 0.22) 0%, rgba(20, 20, 35, 0.12) 100%)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: isFlipped
                    ? '1px solid rgba(239, 68, 68, 0.15)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isFlipped
                    ? (isHovered 
                        ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.35), 0 0 60px rgba(245, 158, 11, 0.2)'
                        : '0 15px 35px rgba(0, 0, 0, 0.35), 0 0 15px rgba(239, 68, 68, 0.15)')
                    : (isHovered 
                        ? '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(124, 58, 237, 0.35), 0 0 60px rgba(0, 191, 255, 0.2)'
                        : '0 15px 35px rgba(0, 0, 0, 0.35), 0 0 15px rgba(124, 58, 237, 0.15)'),
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${isHovered ? 1.04 : 1}, ${isHovered ? 1.04 : 1}, 1)`,
                  transition: 'transform 0.3s ease-out, box-shadow 0.5s ease, border 0.5s ease, background 0.5s ease',
                }}
              >
                {/* Single Card Panel */}
                <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden flex flex-col justify-between">
                  {/* Tech Grid Backdrop Accent */}
                  <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none transition-all duration-500"
                    style={{
                      backgroundImage: isFlipped
                        ? 'linear-gradient(rgba(239,68,68,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.1) 1px, transparent 1px)'
                        : 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                      backgroundSize: '16px 16px',
                    }}
                  />

                  {/* Cyberpunk HUD Corner Brackets */}
                  {['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'].map((pos, i) => (
                    <div
                      key={pos}
                      className={`absolute ${pos} w-3 h-3 pointer-events-none transition-all duration-500 z-20`}
                      style={{
                        borderTop: i < 2 ? `1.5px solid ${isFlipped ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 191, 255, 0.5)'}` : undefined,
                        borderBottom: i >= 2 ? `1.5px solid ${isFlipped ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 191, 255, 0.5)'}` : undefined,
                        borderLeft: i % 2 === 0 ? `1.5px solid ${isFlipped ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 191, 255, 0.5)'}` : undefined,
                        borderRight: i % 2 === 1 ? `1.5px solid ${isFlipped ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 191, 255, 0.5)'}` : undefined,
                        opacity: isHovered ? 0.9 : 0.45,
                        boxShadow: isHovered ? `0 0 8px ${isFlipped ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 191, 255, 0.4)'}` : undefined,
                      }}
                    />
                  ))}

                  {/* Ambient Glowing Aura inside Card */}
                  <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none transition-all duration-500"
                    style={{
                      background: isFlipped
                        ? 'radial-gradient(circle at bottom left, #EF4444 0%, transparent 50%), radial-gradient(circle at top right, #F59E0B 0%, transparent 50%)'
                        : 'radial-gradient(circle at bottom left, #7C3AED 0%, transparent 50%), radial-gradient(circle at top right, #00BFFF 0%, transparent 50%)',
                    }}
                  />

                  {/* HUD Header Info Overlay */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-muted-foreground/60 tracking-widest pointer-events-none z-10">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse-glow transition-all duration-500"
                        style={{
                          background: isFlipped ? '#F59E0B' : '#34D399',
                          boxShadow: isFlipped ? '0 0 6px #F59E0B' : '0 0 6px #34D399',
                        }}
                      />
                      <span className={`transition-colors duration-500 ${isFlipped ? 'text-amber-500' : ''}`}>
                        {isFlipped ? 'AVATAR LINK ACTIVE' : 'SYSTEM ONLINE'}
                      </span>
                    </div>
                    <span className={`transition-colors duration-500 ${isFlipped ? 'text-red-500/60' : 'text-electric-blue/60'}`}>
                      {isFlipped ? 'RG // ALT_UNIT' : 'RG // HERO_UNIT'}
                    </span>
                  </div>

                  {/* Profile Image — crossfade between profile and avatar */}
                  <div className="absolute inset-0 select-none">
                    {/* Profile Photo */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ opacity: isFlipped ? 0 : 1 }}
                    >
                      <AppImage
                        src="/assets/images/profile_nobg.png"
                        alt="Rohan Pankaj Ghuge"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="filter drop-shadow-[0_12px_25px_rgba(124,58,237,0.4)] drop-shadow-[0_6px_12px_rgba(0,191,255,0.2)]"
                        priority
                      />
                    </div>
                    {/* Avatar Image */}
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ opacity: isFlipped ? 1 : 0 }}
                    >
                      <AppImage
                        src="/assets/images/avatar.png"
                        alt="Rohan Pankaj Ghuge Avatar"
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'top' }}
                        className="filter drop-shadow-[0_12px_25px_rgba(239,68,68,0.4)] drop-shadow-[0_6px_12px_rgba(245,158,11,0.2)]"
                        priority
                      />
                    </div>
                  </div>

                  {/* HUD Footer Info Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[9px] text-muted-foreground/60 tracking-widest pointer-events-none z-10">
                    {isFlipped ? (
                      <>
                        <span className="text-[8px] bg-red-500/10 border border-red-500/20 text-red-400 rounded px-1.5 py-0.5">SECURE SYSTEM</span>
                        <span className="text-amber-500/60">AVATAR MODE</span>
                      </>
                    ) : (
                      <>
                        <span className="text-[8px] bg-white/5 border border-white/5 rounded px-1.5 py-0.5">B.TECH CSD</span>
                        <span>FRONTFACE PORTRAIT</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Dynamic Reflection Glare Shine Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 mix-blend-overlay z-30"
                  style={{
                    opacity: isHovered ? 0.32 : 0,
                    background: `radial-gradient(circle 200px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 100%)`,
                  }}
                />
              </div>
            </div>

            {/* Switch to Avatar / Profile Button */}
            <button
              onClick={() => setIsFlipped(prev => !prev)}
              className="group relative overflow-hidden px-6 py-2.5 rounded-lg font-mono text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
              style={{
                border: isFlipped
                  ? '1px solid rgba(239, 68, 68, 0.4)'
                  : '1px solid rgba(0, 191, 255, 0.4)',
                color: isFlipped ? '#F59E0B' : '#00BFFF',
                background: isFlipped
                  ? 'rgba(239, 68, 68, 0.08)'
                  : 'rgba(0, 191, 255, 0.08)',
                textShadow: isFlipped
                  ? '0 0 10px rgba(245, 158, 11, 0.5)'
                  : '0 0 10px rgba(0, 191, 255, 0.5)',
                boxShadow: isFlipped
                  ? '0 0 15px rgba(239, 68, 68, 0.15)'
                  : '0 0 15px rgba(0, 191, 255, 0.15)',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
                  style={{
                    background: isFlipped ? '#F59E0B' : '#00BFFF',
                    boxShadow: isFlipped ? '0 0 6px #F59E0B' : '0 0 6px #00BFFF',
                  }}
                />
                {isFlipped ? 'Switch to Profile' : 'Switch to Avatar'}
              </span>
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: isFlipped
                    ? 'rgba(239, 68, 68, 0.12)'
                    : 'rgba(0, 191, 255, 0.12)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
