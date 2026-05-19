'use client';
import React, { useEffect, useRef, useState } from 'react';

type Phase = 'video' | 'welcome' | 'exiting' | 'done';

export default function DomainExpansionOverlay() {
  const [phase, setPhase] = useState<Phase>('video');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showWorld, setShowWorld] = useState(false);
  const [showLine, setShowLine] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const welcomeTimersRef = useRef<any[]>([]);

  // Clear timers and animation frames ONLY when component unmounts
  useEffect(() => {
    return () => {
      welcomeTimersRef.current.forEach(clearTimeout);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // ── Phase 1: Intro video playback ──
  const handleVideoEnd = () => {
    setPhase('welcome');
  };

  // Fallback timeout in case video fails to load or play
  useEffect(() => {
    if (phase !== 'video') return;
    const fallbackTimer = setTimeout(() => {
      handleVideoEnd();
    }, 10000); // 10 seconds max for intro video
    return () => clearTimeout(fallbackTimer);
  }, [phase]);

  // ── Phase 2: "Welcome to my world" canvas + text sequence ──
  useEffect(() => {
    if (phase !== 'welcome') return;
    if (welcomeTimersRef.current.length > 0) return; // already scheduled

    // Start canvas particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; color: string; size: number;
    }[] = [];
    const colors = ['#7C3AED', '#8B5CF6', '#6B21A8', '#3B82F6', '#00BFFF', '#1D4ED8', '#A78BFA'];

    // Spawn particles in a burst from center
    for (let i = 0; i < 120; i++) {
      const angle = (Math.PI * 2 * i) / 120 + (Math.random() - 0.5) * 0.3;
      const speed = 0.5 + Math.random() * 2.5;
      const maxLife = 0.6 + Math.random() * 0.4;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: maxLife,
        maxLife,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 1.5 + Math.random() * 3.5,
      });
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = 'rgba(10,10,15,0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Expanding energy rings — purple/blue theme
      for (let r = 0; r < 4; r++) {
        const radius = (t * 1.8 + r * 100) % 600;
        const alpha = Math.max(0, 1 - radius / 600);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(124,58,237,${alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Radial energy lines
      for (let i = 0; i < 16; i++) {
        const angle = (Math.PI * 2 * i) / 16 + t * 0.008;
        const len = 80 + Math.sin(t * 0.04 + i) * 60;
        const alpha = 0.2 + Math.sin(t * 0.025 + i) * 0.15;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        const grad = ctx.createLinearGradient(cx, cy, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
        grad.addColorStop(0, `rgba(124,58,237,${alpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(0,191,255,${alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(10,10,15,0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        if (p.life < 0) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 0.5 + Math.random() * 2.5;
          p.x = cx + (Math.random() - 0.5) * 40;
          p.y = cy + (Math.random() - 0.5) * 40;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          p.life = p.maxLife;
        }
        const lifeRatio = p.life / p.maxLife;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * lifeRatio, 0, Math.PI * 2);
        const hexAlpha = Math.floor(lifeRatio * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = p.color + hexAlpha;
        ctx.fill();
      });

      t++;
      animFrameRef.current = requestAnimationFrame(draw);
    }

    draw();

    // Text reveal sequence
    const t1 = setTimeout(() => setShowLine(true), 200);
    const t2 = setTimeout(() => setShowWelcome(true), 500);
    const t3 = setTimeout(() => setShowWorld(true), 1200);
    const t4 = setTimeout(() => setShowParticles(true), 1600);
    const t5 = setTimeout(() => {
      setPhase('exiting');
      (window as any).introComplete = true;
      window.dispatchEvent(new CustomEvent('intro-complete'));
    }, 3600);
    const t6 = setTimeout(() => {
      setPhase('done');
    }, 4800);

    welcomeTimersRef.current = [t1, t2, t3, t4, t5, t6];


  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      className="domain-expansion-overlay noise-overlay"
      style={{
        background: phase === 'video'
          ? '#000000'
          : 'radial-gradient(ellipse at center, #0f0a1a 0%, #080510 50%, #000000 100%)',
      }}
    >

      {/* ═══ Phase 1: Intro Video ═══ */}
      {phase === 'video' && (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={(e) => {
            e.currentTarget.playbackRate = 1.6; // Speed up intro video to 1.6x speed
          }}
          onEnded={handleVideoEnd}
          onError={handleVideoEnd}
          className="absolute inset-0 m-auto w-full h-full max-w-6xl max-h-[85vh] object-contain z-10"
          style={{
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform',
          }}
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
      )}


      {/* ═══ Phase 2: "Welcome to my world" ═══ */}
      {(phase === 'welcome' || phase === 'exiting') && (
        <>
          {/* Ambient background glow */}
          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(124,58,237,0.12) 0%, transparent 60%)',
              animation: phase === 'exiting'
                ? 'domain-exit-bg 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                : undefined,
            }}
          />

          {/* Canvas particle animation */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              animation: phase === 'exiting'
                ? 'domain-exit 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
                : undefined,
            }}
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

            {/* Central energy glow orb */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 350,
                height: 350,
                background:
                  'radial-gradient(circle, rgba(124,58,237,0.6) 0%, rgba(0,191,255,0.25) 40%, rgba(29,78,216,0.08) 60%, transparent 80%)',
                filter: 'blur(25px)',
                animation: 'domain-expand 1s cubic-bezier(0.4,0,0.2,1) forwards',
              }}
            />

            {/* Text content */}
            <div className="relative z-10 flex flex-col items-center gap-5 select-none px-4">
              {/* Top decorative line */}
              <div
                className="flex items-center gap-3"
                style={{
                  opacity: showLine ? 1 : 0,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <div
                  style={{
                    width: showLine ? 80 : 0,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, #7C3AED, #00BFFF)',
                    transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
                <span
                  className="font-mono text-xs tracking-[0.5em] uppercase"
                  style={{
                    color: '#00BFFF',
                    textShadow: '0 0 20px rgba(0,191,255,0.6), 0 0 40px rgba(0,191,255,0.3)',
                  }}
                >
                  ◆ ◆ ◆
                </span>
                <div
                  style={{
                    width: showLine ? 80 : 0,
                    height: 1,
                    background: 'linear-gradient(90deg, #00BFFF, #7C3AED, transparent)',
                    transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                  }}
                />
              </div>

              {/* "WELCOME TO" */}
              <div
                className="font-mono text-sm md:text-base tracking-[0.4em] uppercase"
                style={{
                  color: '#8B5CF6',
                  opacity: showWelcome ? 1 : 0,
                  transform: showWelcome ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  textShadow: '0 0 25px rgba(139,92,246,0.7), 0 0 50px rgba(124,58,237,0.4)',
                }}
              >
                Welcome To
              </div>

              {/* "MY WORLD" — Hero text */}
              <h1
                className="text-center font-black"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  lineHeight: 0.9,
                  letterSpacing: showWorld ? '0.08em' : '0.5em',
                  background: 'linear-gradient(135deg, #7C3AED 0%, #00BFFF 45%, #3B82F6 70%, #8B5CF6 100%)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 0 30px rgba(124,58,237,0.7)) drop-shadow(0 0 60px rgba(0,191,255,0.3))',
                  animation: showWorld
                    ? 'welcome-text 0.9s cubic-bezier(0.4,0,0.2,1) forwards, welcome-gradient 4s ease infinite'
                    : undefined,
                  opacity: showWorld ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                }}
              >
                MY WORLD
              </h1>

              {/* Bottom decorative sub-text */}
              <div
                className="flex items-center gap-3 mt-2"
                style={{
                  opacity: showParticles ? 1 : 0,
                  transform: showParticles ? 'translateY(0)' : 'translateY(15px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(0,191,255,0.6))',
                  }}
                />
                <span
                  className="font-mono text-xs tracking-[0.3em]"
                  style={{
                    color: '#00BFFF',
                    textShadow: '0 0 15px rgba(0,191,255,0.8), 0 0 30px rgba(124,58,237,0.4)',
                  }}
                >
                  ◆ ROHAN PANKAJ GHUGE ◆
                </span>
                <div
                  style={{
                    width: 40,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(0,191,255,0.6), transparent)',
                  }}
                />
              </div>

              {/* Orbiting dots decoration */}
              {showParticles && (
                <div className="absolute pointer-events-none" style={{ width: 280, height: 280 }}>
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: '100%',
                      height: '100%',
                      border: '1px solid rgba(124,58,237,0.2)',
                      animation: 'spin-slow 20s linear infinite',
                    }}
                  >
                    <div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        top: -4,
                        left: '50%',
                        marginLeft: -4,
                        background: '#7C3AED',
                        boxShadow: '0 0 10px #7C3AED, 0 0 20px rgba(124,58,237,0.5)',
                      }}
                    />
                  </div>
                  <div
                    className="absolute rounded-full"
                    style={{
                      inset: -20,
                      border: '1px dashed rgba(0,191,255,0.1)',
                      animation: 'spin-slow 30s linear infinite reverse',
                    }}
                  >
                    <div
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        bottom: -3,
                        right: '30%',
                        background: '#00BFFF',
                        boxShadow: '0 0 8px #00BFFF',
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}