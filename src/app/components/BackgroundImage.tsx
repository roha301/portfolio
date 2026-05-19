'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function BackgroundImage() {
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).introComplete) {
      setMounted(true);
    }
    const handleIntroComplete = () => setMounted(true);
    window.addEventListener('intro-complete', handleIntroComplete);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 18;
      const yPercent = (clientY / window.innerHeight - 0.5) * 18;
      setMousePos({ x: -xPercent, y: -yPercent });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('intro-complete', handleIntroComplete);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 8) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleEnded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
      style={{ zIndex: 0 }}
    >
      <div
        className={`absolute inset-[-48px] transition-opacity duration-[1800ms] ease-out ${
          mounted ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
          transition: 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease',
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-full object-cover"
          style={{
            filter: 'contrast(1.04) brightness(0.80) saturate(1.02)',
          }}
        >
          <source src="/sample.mp4" type="video/mp4" />
        </video>
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,15,0.45) 0%, rgba(10,10,15,0.25) 38%, rgba(10,10,15,0.40) 100%)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 38%, rgba(10,10,15,0.10) 0%, rgba(10,10,15,0.25) 48%, rgba(10,10,15,0.65) 100%)',
        }}
      />
      <div className="absolute inset-0 bg-background/15 pointer-events-none" />
    </div>
  );
}
