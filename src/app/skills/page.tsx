import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import SkillsSection from '@/app/components/SkillsSection';

export const metadata = {
  title: 'My Skills - Rohan Ghuge Portfolio',
  description: 'Explore the technical skills, programming languages, and technologies Rohan Ghuge specializes in.',
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <SkillsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
