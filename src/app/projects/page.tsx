import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import ProjectsSection from '@/app/components/ProjectsSection';

export const metadata = {
  title: 'My Projects - Rohan Ghuge Portfolio',
  description: 'Browse the portfolio of projects built by Rohan Ghuge, including web apps, mobile apps, and cybersecurity tools.',
};

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden pt-20">
      <BackgroundImage />
      <div className="relative z-10">
        <TargetCursor />
        <FloatingParticles />
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-12">
          <ProjectsSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
