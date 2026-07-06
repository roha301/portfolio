import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import AboutSection from '@/app/components/AboutSection';

export const metadata = {
  title: 'About Me - Rohan Ghuge Portfolio',
  description: 'Learn more about Rohan Ghuge, his journey, background, and passion for software development.',
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <AboutSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
