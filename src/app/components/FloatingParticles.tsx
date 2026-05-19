'use client';
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener('resize', resize);

    const colors = ['#7C3AED', '#3B82F6', '#00BFFF', '#8B5CF6', '#6B21A8', '#1D4ED8'];
    const particles: Particle[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push(createParticle(canvas.width, canvas.height, colors));
    }

    function createParticle(w: number, h: number, cols: string[]): Particle {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.3 - Math.random() * 0.7,
        size: 1 + Math.random() * 3,
        color: cols[Math.floor(Math.random() * cols.length)],
        alpha: 0.2 + Math.random() * 0.6,
        life: Math.random(),
        maxLife: 0.8 + Math.random() * 0.4,
      };
    }

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.003;

        if (p.life > p.maxLife || p.y < 0 || p.x < 0 || p.x > canvas.width) {
          particles[idx] = createParticle(canvas.width, canvas.height, colors);
          particles[idx].y = canvas.height + 10;
          return;
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha = lifeRatio < 0.1 ? lifeRatio / 0.1 : lifeRatio > 0.8 ? 1 - (lifeRatio - 0.8) / 0.2 : 1;
        const finalAlpha = p.alpha * fadeAlpha;

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(finalAlpha * 30).toString(16).padStart(2, '0');
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(finalAlpha * 200).toString(16).padStart(2, '0');
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, mixBlendMode: 'screen' }}
    />
  );
}