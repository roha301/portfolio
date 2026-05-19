import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DomainExpansionOverlay from '@/app/components/DomainExpansionOverlay';
import TargetCursor from '@/app/components/TargetCursor';
import FloatingParticles from '@/app/components/FloatingParticles';
import BackgroundImage from '@/app/components/BackgroundImage';
import HeroSection from '@/app/components/HeroSection';
import AboutSection from '@/app/components/AboutSection';
import SkillsSection from '@/app/components/SkillsSection';
import ProjectsSection from '@/app/components/ProjectsSection';
import ExperienceSection from '@/app/components/ExperienceSection';
import AchievementsSection from '@/app/components/AchievementsSection';
import ContactSection from '@/app/components/ContactSection';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Domain Expansion intro overlay */}
      <DomainExpansionOverlay />

      {/* Animated Parallax Background Image */}
      <BackgroundImage />

      <div className="relative z-10">
        {/* Custom Snapping Target Cursor */}
        <TargetCursor />

        {/* Global floating particles */}
        <FloatingParticles />

        {/* Navigation */}
        <Header />

        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <AchievementsSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
