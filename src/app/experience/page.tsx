import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import ExperienceSection from '@/app/components/ExperienceSection';

export const metadata = {
  title: 'Work Experience - Rohan Ghuge Portfolio',
  description: 'View Rohan Ghuge\'s professional background, internships, and work experience.',
};

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <ExperienceSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
